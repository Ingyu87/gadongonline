// 모든 JavaScript 코드를 하나로 통합 (원본과 동일하게 작동)
// 모듈 import 제거하고 모든 코드를 직접 포함

// ===== 상수 정의 =====
const VIRTUAL_TODAY = new Date('2025-11-27');
const LUNCH_API_CONFIG = {
    KEY: '7b92a71da69f426daa05359d9850c714',
    ATPT_OFCDC_SC_CODE: 'B10',
    SD_SCHUL_CODE: '7130101'
};
const ROOMS = ["컴퓨터실", "누리관", "뮤지컬실", "장미홀", "3층 다목적실", "어울림터", "글샘터"];
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
    "2025-12-29": "방학생활사전교육(~1.2)", "2026-01-01": "신정", "2026-01-08": "종업식", "2026-01-09": "졸업식"
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
}

// ===== 예약 관련 =====
let currentTab = ROOMS[0];
let selectedEventId = null;
let currentResDate = new Date(VIRTUAL_TODAY);
let firebaseApp = null;
let db = null;
const isFirebaseEnabled = true; // Firebase 활성화

// Firebase 초기화 (간단 버전 - localStorage 우선)
async function initializeFirebase() {
    if (!isFirebaseEnabled) return;
    // Firebase SDK 로드 대기
    let retries = 0;
    while (typeof firebase === 'undefined' && retries < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
    }
    if (typeof firebase === 'undefined') return;
    try {
        // 환경 변수에서 Firebase 설정 가져오기 (Vercel)
        const firebaseConfig = {
            apiKey: window.VITE_FIREBASE_API_KEY || "",
            authDomain: window.VITE_FIREBASE_AUTH_DOMAIN || "",
            projectId: window.VITE_FIREBASE_PROJECT_ID || "",
            storageBucket: window.VITE_FIREBASE_STORAGE_BUCKET || "",
            messagingSenderId: window.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
            appId: window.VITE_FIREBASE_APP_ID || "",
            measurementId: window.VITE_FIREBASE_MEASUREMENT_ID || ""
        };
        if (firebaseConfig.apiKey) {
            firebaseApp = firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            console.log('Firebase initialized successfully');
        }
    } catch (error) {
        console.error('Firebase initialization error:', error);
    }
}
function isFirebaseReady() {
    return isFirebaseEnabled && db !== null;
}
async function getReservations() {
    if (isFirebaseReady()) {
        try {
            const snapshot = await db.collection('reservations').get();
            const reservations = [];
            snapshot.forEach((doc) => {
                reservations.push({ id: doc.id, ...doc.data() });
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
    if (isFirebaseReady()) {
        try {
            await db.collection('reservations').add(reservation);
            await renderResCalendar(currentTab);
            return;
        } catch (error) {
            console.error('Error saving reservation to Firebase:', error);
            showAlert('Firebase 저장 실패. localStorage로 저장합니다.');
        }
    }
    const list = await getReservations();
    list.push(reservation);
    localStorage.setItem('school_reservations', JSON.stringify(list));
    await renderResCalendar(currentTab);
}
async function deleteReservation(reservationId) {
    if (isFirebaseReady()) {
        try {
            await db.collection('reservations').doc(reservationId).delete();
            await renderResCalendar(currentTab);
            return;
        } catch (error) {
            console.error('Error deleting reservation from Firebase:', error);
            showAlert('Firebase 삭제 실패. localStorage에서 삭제합니다.');
        }
    }
    const list = await getReservations();
    const newList = list.filter(r => r.id !== reservationId);
    localStorage.setItem('school_reservations', JSON.stringify(newList));
    await renderResCalendar(currentTab);
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
    const reservations = await getReservations();
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
        const dayEvents = reservations.filter(r => r.date === dateStr && r.space === currentTab);
        dayEvents.forEach(evt => {
            const chip = document.createElement('div');
            chip.className = 'event-chip';
            chip.style.backgroundColor = '#3b82f6';
            const gradeNum = evt.grade.replace('학년','');
            const classNumSimple = evt.classNum === '전체' ? '전' : evt.classNum.replace('반','');
            const periodShort = evt.period.split('교시')[0].replace('점심시간', '점심');
            chip.textContent = `${gradeNum}-${classNumSimple} ${periodShort}`;
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
        const btn = document.createElement('div');
        btn.className = `room-tab ${room === currentTab ? 'active' : ''}`;
        btn.textContent = room;
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
    const isDuplicate = existing.some(r => r.date === date && r.space === space && r.period === period);
    if (isDuplicate) {
        showAlert(`🚫 [예약 실패] 이미 예약된 시간입니다.\n${date} ${space} ${period}`);
        return;
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
    selectedEventId = null;
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
    if (!selectedEventId) return;
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
    if (inputPw !== targetRes.password) {
        showAlert('비밀번호가 일치하지 않습니다.');
        return;
    }
    await deleteReservation(selectedEventId);
    showAlert('삭제되었습니다.');
    closePasswordModal();
    closeDetailModal();
    await renderResCalendar(getCurrentTab());
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

// 앱 초기화
window.onload = async function() {
    initializeFirebase();
    renderQuickLinks();
    initRooms();
    renderTabs();
    await renderResCalendar(ROOMS[0]);
    fetchLunch();
    setupModalCloseHandlers();
};

