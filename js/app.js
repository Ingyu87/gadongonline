// 모든 JavaScript 코드를 하나로 통합 (원본과 동일하게 작동)
// 모듈 import 제거하고 모든 코드를 직접 포함

// ===== 상수 정의 =====
// 실제 현재 날짜 사용
const VIRTUAL_TODAY = new Date();
const LUNCH_API_CONFIG = {
    KEY: '7b92a71da69f426daa05359d9850c714',
    ATPT_OFCDC_SC_CODE: 'B10',
    SD_SCHUL_CODE: '7130101'
};
const ROOMS = ["컴퓨터1실", "컴퓨터2실", "누리관", "뮤지컬실", "장미홀", "3층 다목적실", "어울림터"];

// 공간별 색상 정의
const ROOM_COLORS = {
    "컴퓨터1실": { bg: "#3b82f6", hover: "#2563eb", tab: "#3b82f6", tabActive: "#1e40af" },
    "컴퓨터2실": { bg: "#0ea5e9", hover: "#0284c7", tab: "#0ea5e9", tabActive: "#0369a1" },
    "누리관": { bg: "#8b5cf6", hover: "#7c3aed", tab: "#8b5cf6", tabActive: "#6d28d9" },
    "뮤지컬실": { bg: "#ec4899", hover: "#db2777", tab: "#ec4899", tabActive: "#be185d" },
    "장미홀": { bg: "#f59e0b", hover: "#d97706", tab: "#f59e0b", tabActive: "#b45309" },
    "3층 다목적실": { bg: "#10b981", hover: "#059669", tab: "#10b981", tabActive: "#047857" },
    "어울림터": { bg: "#06b6d4", hover: "#0891b2", tab: "#06b6d4", tabActive: "#0e7490" }
};
const TIME_OPTIONS = {
    low: [
        { val: "1교시 (09:00~)", text: "1교시 (09:00~09:40)" },
        { val: "2교시 (09:50~)", text: "2교시 (09:50~10:30)" },
        { val: "3교시 (10:40~)", text: "3교시 (10:40~11:20)" },
        { val: "점심시간 (11:20~)", text: "점심시간 (11:20~12:10)" },
        { val: "4교시 (12:10~)", text: "4교시 (12:10~12:50)" },
        { val: "5교시 (13:00~)", text: "5교시 (13:00~13:40)" },
        { val: "방과후", text: "방과후" }
    ],
    high: [
        { val: "1교시 (09:00~)", text: "1교시 (09:00~09:40)" },
        { val: "2교시 (09:50~)", text: "2교시 (09:50~10:30)" },
        { val: "3교시 (10:40~)", text: "3교시 (10:40~11:20)" },
        { val: "4교시 (11:30~)", text: "4교시 (11:30~12:10)" },
        { val: "점심시간 (12:10~)", text: "점심시간 (12:10~13:00)" },
        { val: "5교시 (13:00~)", text: "5교시 (13:00~13:40)" },
        { val: "6교시 (13:50~)", text: "6교시 (13:50~14:30)" },
        { val: "방과후", text: "방과후" }
    ]
};
const ACADEMIC_CALENDAR = {
    "2026-03-03": "입학식(2교시)/시업식(4교시+급식)",
    "2026-03-04": "입학초기적응(1학년,~11,4H)/맞춤형교실 시작",
    "2026-03-05": "학급임원선거",
    "2026-03-09": "진단활동기간(2-6학년,~27)",
    "2026-03-10": "방과후교실 학부모설명회",
    "2026-03-16": "전교임원선거/방과후교실·민참컴퓨터 1기(~5.29)",
    "2026-03-18": "학교설명회/학부모공개수업",
    "2026-03-23": "친구사랑주간(~27)",
    "2026-03-25": "임원교육활동(3-6학년)",
    "2026-04-06": "생명존중교육주간(~10)/PAPS측정기간(3-6학년,~24)",
    "2026-04-13": "학부모상담주간(~24)",
    "2026-04-20": "학교사랑주간(~24)/장애이해교육주간(~24)/기후변화주간(~24)/글샘터행사주간(~24)",
    "2026-04-25": "개교기념일",
    "2026-04-27": "교내체험학습주간(~29)",
    "2026-05-01": "자율휴업일",
    "2026-05-04": "자율휴업일",
    "2026-05-05": "어린이날",
    "2026-05-11": "도토리형제활동(~22)",
    "2026-05-18": "통일교육주간(~22)/컨설팅장학주간(~29)/지능정보서비스 과의존 예방교육(~22)",
    "2026-05-24": "부처님오신날",
    "2026-05-25": "대체공휴일",
    "2026-05-26": "임상장학주간(~29)",
    "2026-06-01": "방과후교실·민참컴퓨터 2기(~8.28)",
    "2026-06-03": "지방선거일",
    "2026-06-06": "현충일",
    "2026-06-08": "동료장학주간(홀수반,~12)/꿈끼탐색주간(~12)/책읽어주는학부모(~12)",
    "2026-06-15": "동료장학주간(짝수반,~19)/사이버폭력예방교육주간(~19)/생존수영(3-4학년,~26,월/화/목)",
    "2026-06-18": "5-6학년 척추측만증 검사",
    "2026-06-22": "1학기학교평가주간(~26)/진단활동주간(1학년,~26)",
    "2026-06-29": "다문화교육주간(~7.3)",
    "2026-07-01": "교직원 성희롱·성매매·성폭력예방교육",
    "2026-07-06": "학년별부서별협의회주간(~10)",
    "2026-07-13": "일람표 제출/방학생활사전교육주간(~17)",
    "2026-07-15": "통지표 제출",
    "2026-07-17": "자율휴업일",
    "2026-07-22": "여름방학식(4교시+급식)",
    "2026-08-19": "개학(4교시)/급식실시",
    "2026-08-20": "2학기 학급임원선거",
    "2026-08-31": "2학기 전교임원선거/방과후교실·민참컴퓨터 3기(~11.20)",
    "2026-09-02": "교직원 심폐소생술 연수",
    "2026-09-07": "꿈빛독서페스티벌주간(~11)",
    "2026-09-09": "임원교육활동(3-6학년)",
    "2026-09-14": "마음키움 사회정서교육주간(~18)",
    "2026-09-24": "추석연휴",
    "2026-09-25": "추석연휴",
    "2026-09-26": "추석연휴",
    "2026-09-28": "자율휴업일",
    "2026-10-03": "개천절",
    "2026-10-05": "대체공휴일",
    "2026-10-09": "한글날",
    "2026-10-16": "대운동회(1-6학년 7h)",
    "2026-10-19": "독도교육주간(~23)/도토리형제활동(~30)/자율장학주간(~23)",
    "2026-10-26": "지능정보서비스 과의존 예방교육(~30)/재난대응안전 한국훈련·소방합동훈련",
    "2026-11-02": "꿈끼탐색주간(~6)",
    "2026-11-09": "방과후교실 공개수업주간(~13)",
    "2026-11-16": "찾아오는 문화예술공연/학교평가·교육과정설문(~20)",
    "2026-11-19": "대학수학능력시험(10시 시작-블록수업)",
    "2026-11-23": "방과후교실·민참컴퓨터 4기(~2.10)/책읽어주는학부모활동(~27)/학년별부서별협의주간(~27)",
    "2026-12-07": "글샘터독서활동주간(~11)",
    "2026-12-09": "교육과정 설계를 위한 전체 협의",
    "2026-12-14": "방학생활사전교육기간(~18)",
    "2026-12-18": "종합일람표 제출",
    "2026-12-24": "겨울방학식(4교시+급식)",
    "2026-12-25": "성탄절",
    "2027-01-29": "개학식(4교시+급식)",
    "2027-02-01": "분반작업(~3)/5-6학년 시수감축(~5)",
    "2027-02-04": "통지표 제출",
    "2027-02-11": "종업식(급식미실시,4h)/졸업식(2h)"
};
const HOLIDAYS = {
    "2026-05-05": true,
    "2026-05-24": true,
    "2026-05-25": true,
    "2026-06-03": true,
    "2026-06-06": true,
    "2026-09-24": true,
    "2026-09-25": true,
    "2026-09-26": true,
    "2026-10-03": true,
    "2026-10-05": true,
    "2026-10-09": true,
    "2026-12-25": true
};
const QUICK_LINKS = [
    { href: "https://docs.google.com/document/d/1zGcVCDbLRsYnf0OcFtCUJeU1mei83fk7F572CvGApOo/edit?tab=t.0", icon: "📅", title: "학교 일일계획", desc: "일일 교육계획 확인", color: "border-orange-400" },
    { href: "https://docs.google.com/document/d/1oIgzFtGgni2EvpAwN4ETwY8qYYAS9HwNRTIuJR8IwUU/edit?tab=t.0", icon: "📝", title: "부장협의록", desc: "회의록 열람", color: "border-orange-400" },
    { href: "https://docs.google.com/spreadsheets/d/1cBH7RpVY5RbUZk74zkz-O1UWL_QSf45RLC6KC-RMFzc/edit?gid=0#gid=0", icon: "🗓️", title: "월중 교육활동계획", desc: "월간 일정 확인", color: "border-orange-400" },
    { href: "https://docs.google.com/spreadsheets/d/1ZwXsUmdrq-km_6U9anPci8i9owxFGUGEZaX3uVYz_28/edit?usp=sharing", icon: "📊", title: "보결배당현황", desc: "2026 보결 배당 현황표", color: "border-orange-400" },
    { href: "https://docs.google.com/spreadsheets/d/1mnx5XHqYTfKql8aXckmYxnUOYIPNvCOwFOUO5MPewOY/edit?gid=1963351363#gid=1963351363", icon: "🚪", title: "학교방문 사전예약", desc: "방문 예약 확인", color: "border-amber-400" },
    { href: "https://docs.google.com/spreadsheets/d/1RKyY217Ops0tDw9a0Vc9lqaHL-BQxLO_xivy1sVmhLU/edit?pli=1&gid=0#gid=0", icon: "💰", title: "예산 모니터링", desc: "예산 사용 내역", color: "border-blue-400" },
    { href: "https://docs.google.com/spreadsheets/d/15g9oZX6oPl4OOTw2jDl01NlfDhe9hlvsrUC68sphYUs/edit?gid=0#gid=0", icon: "✅", title: "법정의무연수", desc: "이수 결과 입력", color: "border-blue-400" },
    { href: "https://drive.google.com/drive/folders/10te4V2iXihOmtr2RfSQLK6dl3cmgHgzM?usp=drive_link", icon: "📂", title: "학교 구글 드라이브", desc: "공유 자료실", color: "border-blue-400" },
    { href: "#", icon: "📚", title: "교과전담 시간표", desc: "시간표 확인", color: "border-purple-400", alert: "추후 구축예정입니다." },
    { href: "#", icon: "👨‍🏫", title: "강사 시간표", desc: "시간표 확인", color: "border-purple-400", alert: "추후 구축예정입니다." },
    { href: "https://gadong-schedule.vercel.app/", icon: "📋", title: "시간표 작성", desc: "스마트 스케줄러", color: "border-amber-400" },
    { href: "https://docs.google.com/spreadsheets/d/1P15fUyPv3kNhjAzbl4f5XdiFAKjRsCaM_1GSav7EJ4Y/edit?usp=sharing", icon: "🛡️", title: "안전점검 체크리스트", desc: "교실·시설 안전점검 기록", color: "border-green-500" }
];

// ===== 유틸리티 함수 =====
function getFormattedDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
}
function getDisplayDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${y}년 ${m}월 ${d}일 (${days[date.getDay()]})`;
}
function showAlert(msg) {
    const alertModal = document.getElementById('alertModal');
    const alertMessage = document.getElementById('alertMessage');
    if (alertModal && alertMessage) {
        alertMessage.innerText = msg;
        alertModal.classList.remove('hidden');
    }
}
function closeAlert() {
    const alertModal = document.getElementById('alertModal');
    if (alertModal) alertModal.classList.add('hidden');
}

// ===== 급식 관련 =====
let currentLunchDate = new Date(VIRTUAL_TODAY);
function fetchLunch() {
    const dateStr = getFormattedDate(currentLunchDate);
    const displayStr = getDisplayDate(currentLunchDate);
    const dateDisplay = document.getElementById('lunch-date-display');
    const lunchContainer = document.getElementById('lunch-menu');
    if (dateDisplay) dateDisplay.innerText = displayStr;
    if (lunchContainer) lunchContainer.innerText = '데이터를 불러오는 중...';
    const { KEY, ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE } = LUNCH_API_CONFIG;
    const API_URL = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${KEY}&Type=json&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_YMD=${dateStr}&MMEAL_SC_CODE=2`;
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.mealServiceDietInfo) {
                let dishName = data.mealServiceDietInfo[1].row[0].DDISH_NM;
                dishName = dishName.replace(/\([0-9\.]+\)/g, '');
                dishName = dishName.replace(/<br\/>/g, ', ');
                lunchContainer.innerHTML = `<span class="text-school-green font-bold">메뉴:</span> ${dishName}`;
            } else {
                lunchContainer.innerHTML = '급식 정보가 없습니다. (휴일 또는 예정 없음)';
            }
        })
        .catch(error => {
            lunchContainer.innerText = '급식 정보를 불러오지 못했습니다.';
        });
}
function changeLunchDate(offset) {
    currentLunchDate.setDate(currentLunchDate.getDate() + offset);
    fetchLunch();
}
function resetLunchDate() {
    currentLunchDate = new Date(VIRTUAL_TODAY);
    fetchLunch();
    updateTodayButton();
}
function updateTodayButton() {
    const today = new Date();
    const y = String(today.getFullYear()).slice(-2);
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    
    // 급식 오늘 버튼
    const todayBtn = document.getElementById('today-button');
    if (todayBtn) {
        todayBtn.textContent = `오늘(${y}.${m}.${d})`;
    }
}

// ===== 예약 관련 =====
let currentTab = ROOMS[0];
let selectedEventId = null;
let currentResDate = new Date(VIRTUAL_TODAY);
let reservations = [];
let firebaseUnsubscribe = null; // Firebase 실시간 리스너 해제 함수
let firebaseApp = null;
let db = null;
const isFirebaseEnabled = true; // Firebase 활성화

// Firebase 초기화
async function initializeFirebase() {
    if (!isFirebaseEnabled) return;
    
    // Firebase SDK 로드 대기
    let retries = 0;
    while (typeof firebase === 'undefined' && retries < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
    }
    if (typeof firebase === 'undefined') {
        console.log('Firebase SDK not loaded, using localStorage only');
        return;
    }
    
    try {
        // HTML에서 주입된 설정 또는 직접 설정
        let firebaseConfig = window.firebaseConfig;
        
        // Vercel 환경 변수가 없으면 직접 설정 (Vercel은 런타임에 주입 불가)
        // 실제로는 Vercel에서 환경 변수를 HTML에 주입해야 함
        if (!firebaseConfig || !firebaseConfig.apiKey) {
            // Vercel 환경 변수는 클라이언트에서 직접 접근 불가
            // 대신 서버리스 함수를 통해 주입하거나, 빌드 타임에 주입해야 함
            // 임시로 localStorage에서 가져오기 시도
            const savedConfig = localStorage.getItem('firebaseConfig');
            if (savedConfig) {
                firebaseConfig = JSON.parse(savedConfig);
            } else {
                console.log('Firebase config not found, using localStorage only');
                return;
            }
        }
        
        // 이미 초기화된 경우 체크
        try {
            firebaseApp = firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            console.log('Firebase initialized successfully');
        } catch (initError) {
            if (initError.code === 'app/duplicate-app') {
                // 이미 초기화된 경우 기존 인스턴스 사용
                firebaseApp = firebase.app();
                db = firebase.firestore();
                console.log('Using existing Firebase instance');
            } else {
                throw initError;
            }
        }
        // Firebase 초기화 후 실시간 동기화 설정
        setupFirebaseRealtimeSync();
    } catch (error) {
        console.error('Firebase initialization error:', error);
        console.log('Falling back to localStorage');
    }
}
function isFirebaseReady() {
    return isFirebaseEnabled && db !== null;
}

// Firebase 실시간 동기화 설정
function setupFirebaseRealtimeSync() {
    if (!isFirebaseReady()) return;
    
    // 기존 리스너 해제
    if (firebaseUnsubscribe) {
        firebaseUnsubscribe();
        firebaseUnsubscribe = null;
    }
    
    try {
        // 실시간 리스너 설정
        firebaseUnsubscribe = db.collection('reservations').onSnapshot(
            async (snapshot) => {
                const newReservations = [];
                snapshot.forEach((doc) => {
                    // doc.data()의 id(null)가 doc.id를 덮어쓰지 않도록 순서 변경
                    newReservations.push({ ...doc.data(), id: doc.id });
                });
                reservations = newReservations;
                console.log('Firebase 실시간 업데이트:', newReservations.length, '개 예약');
                // 캘린더 다시 렌더링 (async로 처리)
                await renderResCalendar(getCurrentTab());
            },
            async (error) => {
                console.error('Firebase 실시간 동기화 오류:', error);
                // 오류 발생 시 localStorage에서 로드
                reservations = JSON.parse(localStorage.getItem('school_reservations') || '[]');
                await renderResCalendar(getCurrentTab());
            }
        );
        console.log('Firebase 실시간 동기화 활성화');
    } catch (error) {
        console.error('Firebase 실시간 동기화 설정 오류:', error);
    }
}

async function getReservations() {
    if (isFirebaseReady()) {
        try {
            const snapshot = await db.collection('reservations').get();
            const reservations = [];
            snapshot.forEach((doc) => {
                // doc.data()의 id(null)가 doc.id를 덮어쓰지 않도록 순서 변경
                reservations.push({ ...doc.data(), id: doc.id });
            });
            return reservations;
        } catch (error) {
            console.error('Error fetching reservations from Firebase:', error);
            return JSON.parse(localStorage.getItem('school_reservations') || '[]');
        }
    }
    return JSON.parse(localStorage.getItem('school_reservations') || '[]');
}
async function saveReservation(reservation) {
    // Firebase가 준비되지 않았으면 초기화 시도
    if (!isFirebaseReady() && isFirebaseEnabled) {
        await initializeFirebase();
    }
    
    if (isFirebaseReady()) {
        try {
            // Firebase에 저장 (실시간 동기화가 자동으로 화면 업데이트)
            await db.collection('reservations').add(reservation);
            console.log('Firebase에 예약 저장 완료');
            // 실시간 동기화가 있으면 자동으로 renderResCalendar가 호출되므로 여기서는 호출하지 않음
            return;
        } catch (error) {
            console.error('Error saving reservation to Firebase:', error);
            showAlert('Firebase 저장 실패. localStorage로 저장합니다.');
        }
    }
    // Firebase가 없으면 localStorage 사용 (로컬 개발용)
    const list = await getReservations();
    list.push(reservation);
    localStorage.setItem('school_reservations', JSON.stringify(list));
    reservations = list; // 전역 변수 업데이트
    await renderResCalendar(getCurrentTab());
}
async function deleteReservation(reservationId) {
    // Firebase가 준비되지 않았으면 초기화 시도
    if (!isFirebaseReady() && isFirebaseEnabled) {
        await initializeFirebase();
    }
    
    if (isFirebaseReady()) {
        try {
            // Firebase에서 삭제 (실시간 동기화가 자동으로 화면 업데이트)
            await db.collection('reservations').doc(reservationId).delete();
            console.log('Firebase에서 예약 삭제 완료:', reservationId);
            // 실시간 동기화가 있으면 자동으로 renderResCalendar가 호출되므로 여기서는 호출하지 않음
            return;
        } catch (error) {
            console.error('Error deleting reservation from Firebase:', error);
            // Firebase 삭제 실패 시 localStorage로 폴백
        }
    }
    // Firebase가 없으면 localStorage에서 삭제
    const list = await getReservations();
    const newList = list.filter(r => r.id !== reservationId);
    localStorage.setItem('school_reservations', JSON.stringify(newList));
    reservations = newList; // 전역 변수 업데이트
    await renderResCalendar(getCurrentTab());
}
function getCurrentTab() { return currentTab; }
function setCurrentTab(tab) { currentTab = tab; }
async function renderResCalendar(selectedTab) {
    if (selectedTab) setCurrentTab(selectedTab);
    const currentTab = getCurrentTab();
    const grid = document.getElementById('resCalendarGrid');
    const title = document.getElementById('resCalendarTitle');
    if (!grid || !title) return;
    grid.innerHTML = '';
    const y = currentResDate.getFullYear();
    const m = currentResDate.getMonth();
    title.textContent = `${y}년 ${m + 1}월`;
    const firstDay = new Date(y, m, 1).getDay();
    const lastDate = new Date(y, m + 1, 0).getDate();
    // reservations는 실시간 동기화로 자동 업데이트됨
    // 하지만 초기 로드나 Firebase가 없을 경우 직접 로드
    if (reservations.length === 0 || !isFirebaseReady()) {
        reservations = await getReservations();
    }
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day calendar-day--empty bg-gray-50 border-r border-b border-gray-200';
        emptyCell.setAttribute('aria-hidden', 'true');
        grid.appendChild(emptyCell);
    }
    for (let d = 1; d <= lastDate; d++) {
        const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        const dayOfWeek = new Date(y, m, d).getDay();
        const dayNum = document.createElement('div');
        dayNum.className = 'text-sm font-bold mb-1';
        dayNum.textContent = d;
        if (dayOfWeek === 0) dayNum.classList.add('text-holiday');
        else if (dayOfWeek === 6) dayNum.classList.add('text-saturday');
        else dayNum.classList.add('text-gray-500');
        if (HOLIDAYS[dateStr]) {
            dayNum.classList.remove('text-saturday', 'text-gray-500');
            dayNum.classList.add('text-holiday');
        }
        if (y === VIRTUAL_TODAY.getFullYear() && m === VIRTUAL_TODAY.getMonth() && d === VIRTUAL_TODAY.getDate()) {
            cell.classList.add('today');
        }
        cell.onclick = () => openReservationModal(dateStr);
        cell.appendChild(dayNum);
        if (ACADEMIC_CALENDAR[dateStr]) {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'school-event';
            eventDiv.textContent = ACADEMIC_CALENDAR[dateStr];
            cell.appendChild(eventDiv);
        }
        // 현재 탭의 예약만 표시
        const dayEvents = reservations.filter(r => r.date === dateStr && r.space === currentTab);
        
        // 공간별 색상 적용
        const roomColor = ROOM_COLORS[currentTab] || { bg: "#3b82f6", hover: "#2563eb" };
        
        dayEvents.forEach(evt => {
            const chip = document.createElement('div');
            chip.className = 'event-chip';
            chip.style.backgroundColor = roomColor.bg;
            chip.style.borderLeft = `3px solid ${roomColor.hover}`;
            chip.style.fontWeight = '600';
            chip.style.padding = '4px 8px';
            chip.style.marginTop = '3px';
            chip.style.borderRadius = '6px';
            chip.style.boxShadow = `0 2px 4px ${roomColor.bg}40`;
            
            const gradeNum = evt.grade.replace('학년','');
            const classNumSimple = evt.classNum === '전체' ? '전' : evt.classNum.replace('반','');
            const periodShort = evt.period.split('교시')[0].replace('점심시간', '점심').replace('방과후', '방과후');
            
            // 더 명확한 표시: "4-1 2교시" 형식
            const periodText = evt.period.includes('교시') ? evt.period.split(' ')[0] : evt.period.replace('점심시간', '점심').replace('방과후', '방과후');
            chip.innerHTML = `
                <div style="font-size: 11px; line-height: 1.4; font-weight: 600;">
                    ${gradeNum}-${classNumSimple} ${periodText}
                </div>
            `;
            
            chip.onmouseenter = () => {
                chip.style.backgroundColor = roomColor.hover;
                chip.style.transform = 'scale(1.02)';
            };
            chip.onmouseleave = () => {
                chip.style.backgroundColor = roomColor.bg;
                chip.style.transform = 'scale(1)';
            };
            
            chip.onclick = (e) => {
                e.stopPropagation();
                openDetailModal(evt);
            };
            cell.appendChild(chip);
        });
        grid.appendChild(cell);
    }
}
async function changeResMonth(delta) {
    if (delta === 0) currentResDate = new Date(VIRTUAL_TODAY);
    else currentResDate.setMonth(currentResDate.getMonth() + delta);
    await renderResCalendar(getCurrentTab());
}
function renderTabs() {
    const container = document.getElementById('roomTabs');
    if (!container) return;
    container.innerHTML = '';
    ROOMS.forEach(room => {
        const btn = document.createElement('button');
        const isActive = room === currentTab;
        const colors = ROOM_COLORS[room] || { tab: "#7dc242", tabActive: "#569e38" };
        
        if (isActive) {
            btn.className = `room-tab active`;
            btn.style.backgroundColor = colors.tab;
            btn.style.borderColor = colors.tab;
            btn.style.color = 'white';
            btn.style.boxShadow = `0 4px 6px ${colors.tab}40`;
        } else {
            btn.className = `room-tab`;
            btn.style.backgroundColor = '#f3f4f6';
            btn.style.borderColor = colors.tab;
            btn.style.color = colors.tab;
            btn.style.boxShadow = 'none';
        }
        
        btn.textContent = room;
        
        btn.onmouseenter = () => {
            if (!isActive) {
                btn.style.backgroundColor = `${colors.tab}15`;
            }
        };
        btn.onmouseleave = () => {
            if (!isActive) {
                btn.style.backgroundColor = '#f3f4f6';
            }
        };
        
        btn.onclick = async () => {
            setCurrentTab(room);
            renderTabs();
            await renderResCalendar(room);
            const resSpaceSelect = document.getElementById('resSpace');
            if (resSpaceSelect) resSpaceSelect.value = room;
        };
        container.appendChild(btn);
    });
}
function initRooms() {
    const select = document.getElementById('resSpace');
    if (!select) return;
    select.innerHTML = '';
    ROOMS.forEach(room => {
        const opt = document.createElement('option');
        opt.value = room;
        opt.text = room;
        select.add(opt);
    });
}
function updateTimeOptions() {
    const grade = document.getElementById("resGrade")?.value;
    const periodSelect = document.getElementById("resPeriod");
    if (!periodSelect) return;
    periodSelect.innerHTML = "";
    let options = [];
    if (["1학년", "2학년", "3학년"].includes(grade)) options = TIME_OPTIONS.low;
    else if (["4학년", "5학년", "6학년", "교과", "기타"].includes(grade)) options = TIME_OPTIONS.high;
    else {
        const defaultOpt = document.createElement("option");
        defaultOpt.text = "학년을 먼저 선택하세요";
        periodSelect.add(defaultOpt);
        return;
    }
    options.forEach(opt => {
        const el = document.createElement("option");
        el.value = opt.val;
        el.text = opt.text;
        periodSelect.add(el);
    });
}
function openReservationModal(dateStr) {
    const resModal = document.getElementById('reservationModal');
    const resSpace = document.getElementById('resSpace');
    const resDate = document.getElementById('resDate');
    if (!resModal) return;
    if (resSpace) resSpace.value = currentTab;
    if (resDate && dateStr) resDate.value = dateStr;
    resModal.classList.remove('hidden');
}
function closeReservationModal() {
    const resModal = document.getElementById('reservationModal');
    if (resModal) resModal.classList.add('hidden');
}
async function addReservation() {
    const date = document.getElementById('resDate')?.value;
    const grade = document.getElementById('resGrade')?.value;
    const classNum = document.getElementById('resClass')?.value;
    const period = document.getElementById('resPeriod')?.value;
    const space = document.getElementById('resSpace')?.value;
    const password = document.getElementById('resPassword')?.value;
    if (!date || !grade || !period || !password) {
        showAlert('모든 항목을 입력해주세요.');
        return;
    }
    const existing = await getReservations();
    
    // 1. 같은 장소, 같은 날짜, 같은 시간 중복 체크
    const isDuplicate = existing.some(r => r.date === date && r.space === space && r.period === period);
    if (isDuplicate) {
        showAlert(`🚫 [예약 실패] 이미 예약된 시간입니다.\n${date} ${space} ${period}`);
        return;
    }
    
    // 2. 같은 학년반이 같은 날짜, 같은 시간에 다른 장소를 이미 예약한 경우 막기
    const sameClassSameTime = existing.some(r => 
        r.date === date && 
        r.period === period && 
        r.grade === grade && 
        r.classNum === classNum && 
        r.space !== space
    );
    if (sameClassSameTime) {
        showAlert(`🚫 [예약 실패] ${grade} ${classNum}은(는) 이미 같은 시간에 다른 공간을 예약했습니다.\n같은 시간에 여러 장소를 예약할 수 없습니다.`);
        return;
    }
    
    // 3. 같은 장소를 매주 같은 요일, 같은 시간에 3주 연속 예약 체크
    const reservationDate = new Date(date);
    const dayOfWeek = reservationDate.getDay();
    
    // 이전 2주, 다음 2주 날짜 계산
    const prevWeek1 = new Date(reservationDate);
    prevWeek1.setDate(prevWeek1.getDate() - 7);
    const prevWeek2 = new Date(reservationDate);
    prevWeek2.setDate(prevWeek2.getDate() - 14);
    const nextWeek1 = new Date(reservationDate);
    nextWeek1.setDate(nextWeek1.getDate() + 7);
    const nextWeek2 = new Date(reservationDate);
    nextWeek2.setDate(nextWeek2.getDate() + 14);
    
    const formatDateStr = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    // 같은 학년반이 같은 장소, 같은 요일, 같은 시간에 예약한 내역 찾기
    const samePattern = existing.filter(r => 
        r.space === space && 
        r.period === period && 
        r.grade === grade && 
        r.classNum === classNum
    );
    
    // 날짜 문자열에 N주 더한 날짜 문자열 반환
    const addWeeks = (dateStr, weeks) => {
        const d = new Date(dateStr);
        d.setDate(d.getDate() + 7 * weeks);
        return formatDateStr(d);
    };
    
    // 4주 연속 여부: 이번 예약까지 포함한 날짜 집합에서 연속 4주가 있으면 막기
    const datesInPattern = new Set(samePattern.map(r => r.date));
    datesInPattern.add(date);
    const hasFourConsecutive = () => {
        for (const d of datesInPattern) {
            const d1 = d;
            const d2 = addWeeks(d1, 1);
            const d3 = addWeeks(d1, 2);
            const d4 = addWeeks(d1, 3);
            if (datesInPattern.has(d2) && datesInPattern.has(d3) && datesInPattern.has(d4)) return true;
        }
        return false;
    };
    if (hasFourConsecutive()) {
        showAlert(`🚫 [예약 불가] ${grade} ${classNum}은(는) ${space}를 같은 요일/시간에 이미 4주 연속 예약되어 있습니다.\n다음 달부터 다시 예약해 주세요.`);
        return;
    }
    
    // 연속 3주 체크 (현재 예약 기준으로 앞뒤 2주 확인) — 경고만
    const hasPrevWeek1 = samePattern.some(r => r.date === formatDateStr(prevWeek1));
    const hasPrevWeek2 = samePattern.some(r => r.date === formatDateStr(prevWeek2));
    const hasNextWeek1 = samePattern.some(r => r.date === formatDateStr(nextWeek1));
    const hasNextWeek2 = samePattern.some(r => r.date === formatDateStr(nextWeek2));
    const isThreeConsecutive = (hasPrevWeek2 && hasPrevWeek1) || (hasPrevWeek1 && hasNextWeek1) || (hasNextWeek1 && hasNextWeek2);
    if (isThreeConsecutive) {
        showAlert(`⚠️ [알림] ${grade} ${classNum}이(가) ${space}를 3주 연속 같은 요일/시간에 예약합니다.\n\n🙏 다른 반을 배려해주세요!`);
    }
    
    const newRes = {
        id: isFirebaseEnabled ? null : Date.now(),
        date: date, grade: grade, classNum: classNum, period: period, space: space, password: password,
        createdAt: new Date().toISOString()
    };
    await saveReservation(newRes);
    showAlert('✅ 예약이 완료되었습니다.');
    const passwordInput = document.getElementById('resPassword');
    if (passwordInput) passwordInput.value = '';
    setCurrentTab(space);
    renderTabs();
    await renderResCalendar(space);
    closeReservationModal();
}
function openDetailModal(evt) {
    selectedEventId = evt.id;
    const detailModal = document.getElementById('detailModal');
    const detailContent = document.getElementById('detailContent');
    if (!detailModal || !detailContent) return;
    detailContent.innerHTML = `
        <div class="grid grid-cols-3 gap-3 text-sm">
            <div class="text-gray-500">날짜</div>
            <div class="col-span-2 font-bold">${evt.date}</div>
            <div class="text-gray-500">공간</div>
            <div class="col-span-2 font-bold text-school-green text-lg">${evt.space}</div>
            <div class="text-gray-500">대상</div>
            <div class="col-span-2">${evt.grade} ${evt.classNum}</div>
            <div class="text-gray-500">시간</div>
            <div class="col-span-2 font-medium">${evt.period}</div>
        </div>
    `;
    detailModal.classList.remove('hidden');
}
function closeDetailModal() {
    const detailModal = document.getElementById('detailModal');
    if (detailModal) detailModal.classList.add('hidden');
    // selectedEventId는 여기서 null로 설정하지 않음 (삭제 시 필요)
}
function openPasswordModal() {
    const passwordModal = document.getElementById('passwordModal');
    const deletePasswordInput = document.getElementById('deletePasswordInput');
    if (passwordModal) passwordModal.classList.remove('hidden');
    if (deletePasswordInput) deletePasswordInput.value = '';
}
function closePasswordModal() {
    const passwordModal = document.getElementById('passwordModal');
    if (passwordModal) passwordModal.classList.add('hidden');
}
async function confirmDelete() {
    if (!selectedEventId) {
        console.error('selectedEventId가 없습니다.');
        showAlert('삭제할 예약을 선택해주세요.');
        return;
    }
    
    const list = await getReservations();
    const targetRes = list.find(r => r.id === selectedEventId);
    if (!targetRes) {
        showAlert('이미 삭제된 예약입니다.');
        closePasswordModal();
        closeDetailModal();
        await renderResCalendar(getCurrentTab());
        return;
    }
    
    const deletePasswordInput = document.getElementById('deletePasswordInput');
    const inputPw = deletePasswordInput?.value || '';
    const MASTER_KEY = '2026'; // 마스터키 (코드 내부에서만 사용)
    
    // 일반 비밀번호 또는 마스터키 확인
    if (inputPw !== targetRes.password && inputPw !== MASTER_KEY) {
        showAlert('비밀번호가 일치하지 않습니다.');
        return;
    }
    
    try {
        await deleteReservation(selectedEventId);
        selectedEventId = null; // 삭제 완료 후 초기화
        showAlert('삭제되었습니다.');
        closePasswordModal();
        closeDetailModal();
        // Firebase 실시간 동기화가 있으면 자동으로 업데이트되므로 여기서는 호출하지 않음
        // Firebase가 없을 경우를 대비해 약간의 지연 후 렌더링
        if (!isFirebaseReady()) {
            await renderResCalendar(getCurrentTab());
        }
    } catch (error) {
        console.error('삭제 중 오류:', error);
        showAlert('삭제 중 오류가 발생했습니다.');
    }
}

// ===== 메인 초기화 =====
function renderQuickLinks() {
    const container = document.getElementById('quickLinks');
    if (!container) return;
    container.innerHTML = '';
    QUICK_LINKS.forEach(link => {
        const linkCard = document.createElement('a');
        linkCard.href = link.href;
        linkCard.className = `link-card border-l-4 ${link.color}`;
        if (link.alert) {
            linkCard.href = '#';
            linkCard.onclick = (e) => {
                e.preventDefault();
                showAlert(link.alert);
                return false;
            };
        } else {
            linkCard.target = '_blank';
        }
        linkCard.innerHTML = `
            <div class="flex items-center">
                <span class="link-icon">${link.icon}</span>
                <div>
                    <div class="link-title">${link.title}</div>
                    <div class="link-desc">${link.desc}</div>
                </div>
            </div>
            <span class="text-gray-400">→</span>
        `;
        container.appendChild(linkCard);
    });
}
function setupModalCloseHandlers() {
    // 모달 배경 클릭 시 닫기 (이벤트 위임 사용)
    document.addEventListener('click', function(event) {
        const resModal = document.getElementById('reservationModal');
        const detailModal = document.getElementById('detailModal');
        const alertModal = document.getElementById('alertModal');
        const passwordModal = document.getElementById('passwordModal');
        
        // 모달 배경(overlay) 자체를 클릭했을 때만 닫기
        if (event.target === resModal) closeReservationModal();
        if (event.target === detailModal) closeDetailModal();
        if (event.target === alertModal) closeAlert();
        if (event.target === passwordModal) closePasswordModal();
    });
}

// 전역 함수로 등록
window.changeLunchDate = changeLunchDate;
window.resetLunchDate = resetLunchDate;
window.changeResMonth = changeResMonth;
window.openReservationModal = openReservationModal;
window.closeReservationModal = closeReservationModal;
window.addReservation = addReservation;
window.updateTimeOptions = updateTimeOptions;
window.openPasswordModal = openPasswordModal;
window.closePasswordModal = closePasswordModal;
window.confirmDelete = confirmDelete;
window.closeDetailModal = closeDetailModal;
window.showAlert = showAlert;
window.closeAlert = closeAlert;

// 앱 초기화
window.onload = async function() {
    console.log('앱 초기화 시작');
    
    // 먼저 초기 데이터 로드 (Firebase 초기화 전)
    reservations = await getReservations();
    console.log('초기 예약 로드:', reservations.length, '개');
    
    // Firebase 초기화
    await initializeFirebase();
    
    // Firebase 초기화 후 실시간 동기화가 설정되어야 함
    if (isFirebaseReady()) {
        console.log('Firebase 준비 완료, 실시간 동기화 활성화됨');
        // Firebase에서 최신 데이터 다시 로드
        reservations = await getReservations();
        console.log('Firebase에서 예약 로드:', reservations.length, '개');
    } else {
        console.log('Firebase 미사용, localStorage 사용 중');
    }
    
    renderQuickLinks();
    initRooms();
    renderTabs();
    await renderResCalendar(ROOMS[0]);
    fetchLunch();
    updateTodayButton();
    setupModalCloseHandlers();
    
    console.log('앱 초기화 완료');
};

