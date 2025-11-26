import { ROOMS, TIME_OPTIONS } from './constants.js';
import { showAlert } from './utils.js';
import { renderResCalendar } from './calendar.js';
import { isFirebaseReady, getFirestore } from './firebase-init.js';
import { isFirebaseEnabled } from './config.js';

let currentTab = ROOMS[0];
let selectedEventId = null;

/**
 * 현재 선택된 탭 가져오기
 */
export function getCurrentTab() {
    return currentTab;
}

/**
 * 현재 선택된 탭 설정
 */
export function setCurrentTab(tab) {
    currentTab = tab;
}

/**
 * 예약 목록 가져오기 (로컬스토리지 또는 Firebase)
 */
export function getReservations() {
    // TODO: Firebase 연동 시 여기서 Firebase에서 데이터 가져오기
    // 현재는 localStorage만 사용 (원본과 동일)
    return JSON.parse(localStorage.getItem('school_reservations') || '[]');
}

/**
 * 예약 저장 (로컬스토리지 또는 Firebase)
 */
async function saveReservation(reservation) {
    if (isFirebaseReady()) {
        try {
            const db = getFirestore();
            const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            const reservationsRef = collection(db, 'reservations');
            await addDoc(reservationsRef, reservation);
            
            // 현재 탭으로 캘린더 다시 렌더링
            renderResCalendar(currentTab);
            return;
        } catch (error) {
            console.error('Error saving reservation to Firebase:', error);
            showAlert('Firebase 저장 실패. localStorage로 저장합니다.');
        }
    }
    
    // localStorage 사용
    const list = await getReservations();
    list.push(reservation);
    localStorage.setItem('school_reservations', JSON.stringify(list));
    
    // 현재 탭으로 캘린더 다시 렌더링
    renderResCalendar(currentTab);
}

/**
 * 예약 삭제
 */
function deleteReservation(reservationId) {
    // TODO: Firebase 연동 시 여기서 Firebase에서 삭제
    // 현재는 localStorage만 사용 (원본과 동일)
    const list = getReservations();
    const newList = list.filter(r => r.id !== reservationId);
    localStorage.setItem('school_reservations', JSON.stringify(newList));
    
    renderResCalendar(currentTab);
}

/**
 * 공간 탭 렌더링
 */
export function renderTabs() {
    const container = document.getElementById('roomTabs');
    if (!container) return;
    
    container.innerHTML = '';
    
    ROOMS.forEach(room => {
        const btn = document.createElement('div');
        btn.className = `room-tab ${room === currentTab ? 'active' : ''}`;
        btn.textContent = room;
        btn.onclick = () => {
            currentTab = room;
            renderTabs();
            renderResCalendar(currentTab);
            const resSpaceSelect = document.getElementById('resSpace');
            if (resSpaceSelect) resSpaceSelect.value = room;
        };
        container.appendChild(btn);
    });
}

/**
 * 공간 선택 옵션 초기화
 */
export function initRooms() {
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

/**
 * 시간 옵션 업데이트
 */
export function updateTimeOptions() {
    const grade = document.getElementById("resGrade")?.value;
    const periodSelect = document.getElementById("resPeriod");
    
    if (!periodSelect) return;
    
    periodSelect.innerHTML = "";
    
    let options = [];
    if (["1학년", "2학년", "3학년"].includes(grade)) {
        options = TIME_OPTIONS.low;
    } else if (["4학년", "5학년", "6학년", "교과", "기타"].includes(grade)) {
        options = TIME_OPTIONS.high;
    } else {
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

/**
 * 예약 모달 열기
 */
export function openReservationModal(dateStr) {
    const resModal = document.getElementById('reservationModal');
    const resSpace = document.getElementById('resSpace');
    const resDate = document.getElementById('resDate');
    
    if (!resModal) return;
    
    if (resSpace) resSpace.value = currentTab;
    if (resDate && dateStr) resDate.value = dateStr;
    
    resModal.classList.remove('hidden');
}

/**
 * 예약 모달 닫기
 */
export function closeReservationModal() {
    const resModal = document.getElementById('reservationModal');
    if (resModal) {
        resModal.classList.add('hidden');
    }
}

/**
 * 예약 추가
 */
export async function addReservation() {
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
    const isDuplicate = existing.some(r => 
        r.date === date && 
        r.space === space && 
        r.period === period
    );

    if (isDuplicate) {
        showAlert(`🚫 [예약 실패] 이미 예약된 시간입니다.\n${date} ${space} ${period}`);
        return;
    }

    const newRes = {
        id: isFirebaseEnabled ? null : Date.now(), // Firebase는 자동 ID 생성
        date: date,
        grade: grade,
        classNum: classNum,
        period: period,
        space: space,
        password: password,
        createdAt: new Date().toISOString()
    };

    await             await saveReservation(newRes);
            showAlert('✅ 예약이 완료되었습니다.');
            
            const passwordInput = document.getElementById('resPassword');
            if (passwordInput) passwordInput.value = '';
            
            setCurrentTab(space);
            renderTabs();
            await renderResCalendar(space);
            closeReservationModal();
}

/**
 * 상세 모달 열기
 */
export function openDetailModal(evt) {
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

/**
 * 상세 모달 닫기
 */
export function closeDetailModal() {
    const detailModal = document.getElementById('detailModal');
    if (detailModal) {
        detailModal.classList.add('hidden');
    }
    selectedEventId = null;
}

/**
 * 비밀번호 모달 열기
 */
export function openPasswordModal() {
    const passwordModal = document.getElementById('passwordModal');
    const deletePasswordInput = document.getElementById('deletePasswordInput');
    
    if (passwordModal) passwordModal.classList.remove('hidden');
    if (deletePasswordInput) deletePasswordInput.value = '';
}

/**
 * 비밀번호 모달 닫기
 */
export function closePasswordModal() {
    const passwordModal = document.getElementById('passwordModal');
    if (passwordModal) passwordModal.classList.add('hidden');
}

/**
 * 예약 삭제 확인
 */
export function confirmDelete() {
    if (!selectedEventId) return;

    const list = getReservations();
    const targetRes = list.find(r => r.id === selectedEventId);
    
    if (!targetRes) {
        showAlert('이미 삭제된 예약입니다.');
        closePasswordModal();
        closeDetailModal();
        renderResCalendar(getCurrentTab());
        return;
    }

    const deletePasswordInput = document.getElementById('deletePasswordInput');
    const inputPw = deletePasswordInput?.value || '';

    if (inputPw !== targetRes.password) {
        showAlert('비밀번호가 일치하지 않습니다.');
        return;
    }

    deleteReservation(selectedEventId);
    showAlert('삭제되었습니다.');
    
    closePasswordModal();
    closeDetailModal();
    renderResCalendar(getCurrentTab());
}

// 전역 함수로 export
window.openReservationModal = openReservationModal;
window.closeReservationModal = closeReservationModal;
window.addReservation = addReservation;
window.updateTimeOptions = updateTimeOptions;
window.openPasswordModal = openPasswordModal;
window.closePasswordModal = closePasswordModal;
window.confirmDelete = confirmDelete;
window.closeDetailModal = closeDetailModal;

