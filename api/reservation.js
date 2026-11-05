// Vercel Serverless Function: 공간 예약 생성/삭제 (무료 Hobby, Firebase Functions 대신)
// POST /api/reservation  { action: 'create'|'delete'|'migrate', ... }
// 환경변수: FIREBASE_SERVICE_ACCOUNT_JSON (Sensitive)
const crypto = require('node:crypto');
const admin = require('firebase-admin');

const PW_ITER = 120000, PW_LEN = 32, PW_DIGEST = 'sha256';
const MAX_FAILS = 5, LOCK_MS = 5 * 60 * 1000;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function app() {
  if (!admin.apps.length) {
    const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}');
    admin.initializeApp({ credential: admin.credential.cert(sa) });
  }
  return admin;
}
class HttpError extends Error { constructor(status, msg) { super(msg); this.status = status; } }

const hashPw = (pw, salt) => crypto.pbkdf2Sync(String(pw), salt, PW_ITER, PW_LEN, PW_DIGEST).toString('hex');
function makePw(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  return { passwordHash: hashPw(pw, salt), passwordSalt: salt, passwordHashVersion: 1 };
}
function checkPw(pw, data) {
  if (data.passwordHash && data.passwordSalt) {
    const a = Buffer.from(hashPw(pw, data.passwordSalt), 'hex');
    const b = Buffer.from(String(data.passwordHash), 'hex');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }
  if (data.password) return String(data.password) === String(pw);
  return false;
}
function assertPassword(pw) {
  const s = String(pw || '');
  if (s.length < 4 || s.length > 64) throw new HttpError(400, '비밀번호는 4~64자로 입력해주세요.');
}
function publicReservation(id, data) {
  return {
    id,
    date: data.date || '',
    space: data.space || '',
    grade: data.grade || '',
    classNum: data.classNum || '',
    period: data.period || '',
    createdAt: data.createdAt || '',
  };
}

async function migratePlaintext(db) {
  const snap = await db.collection('reservations').get();
  let n = 0;
  for (const d of snap.docs) {
    const data = d.data() || {};
    const upd = {};
    if (data.password && !data.passwordHash) Object.assign(upd, makePw(String(data.password)));
    if (data.password) upd.password = admin.firestore.FieldValue.delete();
    if (Object.keys(upd).length) {
      await d.ref.update(upd);
      n++;
    }
  }
  return n;
}

const actions = {
  async create(a, db, body) {
    const date = String(body.date || '').trim();
    const space = String(body.space || '').trim();
    const grade = String(body.grade || '').trim();
    const classNum = String(body.classNum || '').trim();
    const period = String(body.period || '').trim();
    const password = String(body.password || '');
    if (!date || !space || !grade || !period) throw new HttpError(400, '모든 항목을 입력해주세요.');
    if (!DATE_RE.test(date)) throw new HttpError(400, '날짜 형식이 올바르지 않습니다.');
    if (space.length > 40 || grade.length > 20 || classNum.length > 20 || period.length > 40) {
      throw new HttpError(400, '입력값이 너무 깁니다.');
    }
    assertPassword(password);
    const dup = await db.collection('reservations')
      .where('date', '==', date).where('space', '==', space).where('period', '==', period).limit(1).get();
    if (!dup.empty) throw new HttpError(409, `이미 예약된 시간입니다.\n${date} ${space} ${period}`);
    const hashed = makePw(password);
    const ref = await db.collection('reservations').add({
      date, space, grade, classNum, period,
      ...hashed,
      createdAt: new Date().toISOString(),
    });
    return { ok: true, reservation: publicReservation(ref.id, { date, space, grade, classNum, period, createdAt: new Date().toISOString() }) };
  },

  async delete(a, db, body) {
    const id = String(body.id || body.reservationId || '');
    const password = String(body.password || '');
    if (!id) throw new HttpError(400, '예약 정보가 없습니다.');
    assertPassword(password);
    const ref = db.collection('reservations').doc(id);
    const lockRef = db.collection('reservation_locks').doc(id);
    const [doc, lock] = await Promise.all([ref.get(), lockRef.get()]);
    if (!doc.exists) throw new HttpError(404, '이미 삭제된 예약입니다.');
    const now = Date.now();
    const lockedUntil = lock.exists ? (lock.get('lockedUntil') || 0) : 0;
    if (lockedUntil > now) {
      throw new HttpError(429, `비밀번호를 여러 번 틀렸어요. ${Math.ceil((lockedUntil - now) / 60000)}분 뒤에 다시 해 보세요.`);
    }
    const data = doc.data() || {};
    if (!checkPw(password, data)) {
      const fails = (lock.exists && lockedUntil <= now && lockedUntil !== 0 ? 0 : (lock.exists ? lock.get('fails') || 0 : 0)) + 1;
      await lockRef.set(fails >= MAX_FAILS ? { fails: 0, lockedUntil: now + LOCK_MS } : { fails, lockedUntil: 0 });
      if (fails >= MAX_FAILS) throw new HttpError(429, '비밀번호를 5번 틀려서 5분 동안 잠겼어요.');
      throw new HttpError(401, `비밀번호가 일치하지 않습니다. (${fails}/${MAX_FAILS})`);
    }
    // 평문 비밀번호가 남아 있으면 삭제 전에 지우지만, 문서를 삭제하므로 별도 이전은 생략
    await Promise.all([ref.delete(), lock.exists ? lockRef.delete() : null]);
    return { ok: true };
  },

  async migrate(a, db) {
    const migrated = await migratePlaintext(db);
    return { ok: true, migrated };
  },
};

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST만 허용됩니다.' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const fn = actions[body.action];
    if (!fn) throw new HttpError(400, '알 수 없는 요청입니다.');
    const a = app();
    return res.status(200).json(await fn(a, a.firestore(), body, req));
  } catch (e) {
    if (!(e instanceof HttpError)) console.error('reservation error:', e);
    return res.status(e.status || 500).json({ error: e instanceof HttpError ? e.message : '서버 오류가 발생했습니다.' });
  }
}
