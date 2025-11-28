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
const ROOMS = ["컴퓨터실", "누리관", "뮤지컬실", "장미홀", "3층 다목적실", "어울림터", "글샘터"];

// 공간별 색상 정의
const ROOM_COLORS = {
    "컴퓨터실": { bg: "#3b82f6", hover: "#2563eb", tab: "#3b82f6", tabActive: "#1e40af" },
    "누리관": { bg: "#8b5cf6", hover: "#7c3aed", tab: "#8b5cf6", tabActive: "#6d28d9" },
    "뮤지컬실": { bg: "#ec4899", hover: "#db2777", tab: "#ec4899", tabActive: "#be185d" },
    "장미홀": { bg: "#f59e0b", hover: "#d97706", tab: "#f59e0b", tabActive: "#b45309" },
    "3층 다목적실": { bg: "#10b981", hover: "#059669", tab: "#10b981", tabActive: "#047857" },
    "어울림터": { bg: "#06b6d4", hover: "#0891b2", tab: "#06b6d4", tabActive: "#0e7490" },
    "글샘터": { bg: "#6366f1", hover: "#4f46e5", tab: "#6366f1", tabActive: "#4338ca" }
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
    "2025-03-03": "입학식/시업식", "2025-03-17": "친구사랑주간(~21)", "2025-03-19": "학부모총회",
    "2025-04-07": "생명존중교육주간(~11)", "2025-04-14": "글샘터행사주간(~18)", "2025-04-21": "보호자상담/학교사랑(~25)",
    "2025-04-25": "개교기념일", "2025-05-01": "근로자의 날", "2025-05-02": "재량휴업일",
    "2025-05-05": "어린이날", "2025-05-06": "대체공휴일", "2025-05-19": "도토리형제/컨설팅장학(~23)",
    "2025-05-27": "4학년 현장체험", "2025-05-28": "5학년 현장체험", "2025-06-06": "현충일",
    "2025-06-09": "꿈끼탐색/책읽어주는보호자(~13)", "2025-06-16": "다문화교육주간(~20)", "2025-06-18": "심폐소생술 연수",
    "2025-06-23": "학교평가/진단활동(~27)", "2025-07-07": "학년부서협의(~11)", "2025-07-14": "방학생활사전교육(~18)",
    "2025-07-24": "6학년 현장체험", "2025-07-25": "여름방학식", "2025-08-15": "광복절",
    "2025-08-20": "개학식", "2025-09-08": "꿈빛독서페스티벌(~12)", "2025-09-30": "3학년 현장체험",
    "2025-10-03": "개천절", "2025-10-06": "추석", "2025-10-07": "추석 연휴", "2025-10-08": "추석 연휴",
    "2025-10-09": "한글날", "2025-10-10": "재량휴업일", "2025-10-13": "독도교육주간(~17)",
    "2025-10-17": "대운동회", "2025-10-20": "도토리형제/자율장학(~24)", "2025-10-24": "1학년 현장체험",
    "2025-10-31": "2학년 현장체험", "2025-11-03": "꿈끼탐색주간(~7)", "2025-11-10": "친구사랑주간(~14)",
    "2025-11-17": "학교평가설문주간(~21)", "2025-11-24": "책읽어주는보호자(~28)", "2025-12-01": "학년부서협의(~5)",
    "2025-12-08": "글샘터독서주간(~12)", "2025-12-15": "정보통신윤리교육(~19)", "2025-12-25": "성탄절",
    "2025-12-29": "방학생활사전교육(~1.2)", "2026-01-01": "신정", "2026-01-08": "종업식/졸업식"
};
const HOLIDAYS = {
    "2024-12-25": true, "2025-01-01": true, "2025-01-28": true, "2025-01-29": true, "2025-01-30": true,
    "2025-03-01": true, "2025-05-02": true, "2025-05-05": true, "2025-05-06": true, "2025-06-06": true,
    "2025-08-15": true, "2025-10-03": true, "2025-10-05": true, "2025-10-06": true, "2025-10-07": true,
    "2025-10-08": true, "2025-10-09": true, "2025-10-10": true, "2025-12-25": true, "2026-01-01": true
};
const QUICK_LINKS = [
    { href: "https://docs.google.com/document/d/1Wnd6cs723AkUyk4pK5HLxfnjPIwLH0JTT6JFNDzP7RU/edit?tab=t.0", icon: "📅", title: "학교 일일계획", desc: "일일 교육계획 확인", color: "border-orange-400" },
    { href: "https://docs.google.com/document/d/1oIgzFtGgni2EvpAwN4ETwY8qYYAS9HwNRTIuJR8IwUU/edit?tab=t.0", icon: "📝", title: "부장협의록", desc: "회의록 열람", color: "border-orange-400" },
    { href: "https://docs.google.com/spreadsheets/d/1chyxgT9loUloJilTIGXWb-xMV1p2R5uKRYijkC3xGdU/edit?gid=0#gid=0", icon: "🗓️", title: "월중 교육활동계획", desc: "월간 일정 확인", color: "border-orange-400" },
    { href: "#visitReservationSection", icon: "🚪", title: "학교방문 사전예약", desc: "방문 예약 확인", color: "border-amber-400", scroll: true },
    { href: "#", icon: "🏫", title: "자율사업운영제", desc: "운영 현황", color: "border-blue-400", alert: "추후 구축예정입니다." },
    { href: "https://docs.google.com/spreadsheets/d/1RKyY217Ops0tDw9a0Vc9lqaHL-BQxLO_xivy1sVmhLU/edit?pli=1&gid=0#gid=0", icon: "💰", title: "학생참여형 예산", desc: "예산 사용 내역", color: "border-blue-400" },
    { href: "#", icon: "💳", title: "학급운영비 현황", desc: "잔액 확인", color: "border-blue-400", alert: "추후 구축예정입니다." },
    { href: "https://docs.google.com/spreadsheets/d/15g9oZX6oPl4OOTw2jDl01NlfDhe9hlvsrUC68sphYUs/edit?gid=0#gid=0", icon: "✅", title: "법정의무연수", desc: "이수 결과 입력", color: "border-blue-400" },
    { href: "https://drive.google.com/drive/folders/10te4V2iXihOmtr2RfSQLK6dl3cmgHgzM?usp=drive_link", icon: "📂", title: "학교 구글 드라이브", desc: "공유 자료실", color: "border-blue-400" },
    { href: "#", icon: "📚", title: "교과전담 시간표", desc: "시간표 확인", color: "border-purple-400", alert: "추후 구축예정입니다." },
    { href: "#", icon: "👨‍🏫", title: "강사 시간표", desc: "시간표 확인", color: "border-purple-400", alert: "추후 구축예정입니다." }
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
        emptyCell.className = 'bg-gray-50 border-r border-b border-gray-200';
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
    
    // 연속 3주 체크 (현재 예약 기준으로 앞뒤 2주 확인)
    const hasPrevWeek1 = samePattern.some(r => r.date === formatDateStr(prevWeek1));
    const hasPrevWeek2 = samePattern.some(r => r.date === formatDateStr(prevWeek2));
    const hasNextWeek1 = samePattern.some(r => r.date === formatDateStr(nextWeek1));
    const hasNextWeek2 = samePattern.some(r => r.date === formatDateStr(nextWeek2));
    
    // 3주 연속이 되는 경우: (2주전+1주전+현재) or (1주전+현재+1주후) or (현재+1주후+2주후)
    const isThreeConsecutive = (hasPrevWeek2 && hasPrevWeek1) || (hasPrevWeek1 && hasNextWeek1) || (hasNextWeek1 && hasNextWeek2);
    
    if (isThreeConsecutive) {
        showAlert(`⚠️ [알림] ${grade} ${classNum}이(가) ${space}를 3주 연속 같은 요일/시간에 예약합니다.\n\n🙏 다른 반을 배려해주세요!`);
        // 알림만 띄우고 예약은 진행 (경고만 함)
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
    const MASTER_KEY = '2025'; // 마스터키
    
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

// ===== 학교방문 사전예약확인 =====
const VISIT_SHEET_ID = '1mnx5XHqYTfKql8aXckmYxnUOYIPNvCOwFOUO5MPewOY';

// 월별 시트 GID 매핑 (Google Sheets의 각 탭 gid)
const VISIT_SHEET_GIDS = {
    '7월': '1963351363',
    '8월': '0',  // 기본 시트 또는 실제 gid로 변경 필요
    '9월': '0',
    '10월': '0',
    '11월': '0',
    '12월': '0',
    '2026년 1월': '0',
    '2026년 2월': '0'
};

let currentVisitMonth = '7월';

function renderVisitMonthTabs() {
    const container = document.getElementById('visitMonthTabs');
    if (!container) return;
    
    container.innerHTML = '';
    
    // 현재 월 계산
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentYear = now.getFullYear();
    
    // 표시할 월 목록 (현재 월 기준으로 앞뒤로)
    const months = [];
    
    // 2025년 월들
    for (let m = 7; m <= 12; m++) {
        months.push({ label: `${m}월`, year: 2025, month: m });
    }
    // 2026년 월들
    months.push({ label: '2026년 1월', year: 2026, month: 1 });
    months.push({ label: '2026년 2월', year: 2026, month: 2 });
    
    // 현재 날짜에 맞는 기본 탭 설정
    if (currentYear === 2025 && currentMonth >= 7 && currentMonth <= 12) {
        currentVisitMonth = `${currentMonth}월`;
    } else if (currentYear === 2026 && currentMonth <= 2) {
        currentVisitMonth = `2026년 ${currentMonth}월`;
    } else {
        currentVisitMonth = '7월'; // 기본값
    }
    
    months.forEach(({ label }) => {
        const btn = document.createElement('button');
        btn.className = `visit-month-tab ${label === currentVisitMonth ? 'active' : ''}`;
        btn.textContent = label;
        btn.onclick = () => selectVisitMonth(label);
        container.appendChild(btn);
    });
    
    // 현재 월 탭으로 스크롤
    setTimeout(() => {
        const activeTab = container.querySelector('.visit-month-tab.active');
        if (activeTab) {
            activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }, 100);
}

function selectVisitMonth(month) {
    currentVisitMonth = month;
    
    // 탭 스타일 업데이트
    const tabs = document.querySelectorAll('.visit-month-tab');
    tabs.forEach(tab => {
        if (tab.textContent === month) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // iframe 소스 업데이트
    updateVisitSheetFrame(month);
}

function updateVisitSheetFrame(month) {
    const iframe = document.getElementById('visitSheetFrame');
    if (!iframe) return;
    
    // 월에 해당하는 gid 가져오기 (시트 탭 이름과 매핑)
    // Google Sheets URL의 gid 파라미터를 변경하여 다른 탭으로 이동
    const gid = VISIT_SHEET_GIDS[month] || '1963351363';
    
    // iframe 소스 변경 (embed 형식)
    iframe.src = `https://docs.google.com/spreadsheets/d/${VISIT_SHEET_ID}/htmlembed?gid=${gid}&single=true&widget=false&chrome=false`;
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
        } else if (link.scroll) {
            // 페이지 내 스크롤 링크
            linkCard.onclick = (e) => {
                e.preventDefault();
                const target = document.querySelector(link.href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
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
    window.onclick = function(event) {
        const resModal = document.getElementById('reservationModal');
        const detailModal = document.getElementById('detailModal');
        const alertModal = document.getElementById('alertModal');
        const passwordModal = document.getElementById('passwordModal');
        if (event.target == resModal) closeReservationModal();
        if (event.target == detailModal) closeDetailModal();
        if (event.target == alertModal) closeAlert();
        if (event.target == passwordModal) closePasswordModal();
    };
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
window.selectVisitMonth = selectVisitMonth;

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
    
    // 학교방문 사전예약확인 탭 초기화
    renderVisitMonthTabs();
    
    console.log('앱 초기화 완료');
};

