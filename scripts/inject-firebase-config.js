/**
 * 빌드 시 Vercel 환경 변수를 index.html의 Firebase 설정에 주입합니다.
 * GitHub에는 YOUR_... 플레이스홀더만 있고, 배포 시에만 실제 값이 들어갑니다.
 */
const fs = require('fs');
const path = require('path');

const ENV_MAP = {
  YOUR_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
  YOUR_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  YOUR_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
  YOUR_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  YOUR_FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  YOUR_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
  YOUR_FIREBASE_MEASUREMENT_ID: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

let hasReplacement = false;
for (const [placeholder, value] of Object.entries(ENV_MAP)) {
  if (value != null && value !== '') {
    html = html.split(placeholder).join(value);
    hasReplacement = true;
  }
}

if (hasReplacement) {
  fs.writeFileSync(indexPath, html);
  console.log('Firebase config injected from environment variables.');
} else {
  console.log('No VITE_FIREBASE_* env vars set; index.html unchanged (placeholders kept).');
}
