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
export async function getReservations() {
    if (isFirebaseReady()) {
        try {
            const db = getFirestore();
            const snapshot = await db.collection('reservations').get();
            
            const reservations = [];
            snapshot.forEach((doc) => {
                const data = doc.data() || {};
                reservations.push({
                    id: doc.id,
                    date: data.date,
                    space: data.space,
                    grade: data.grade,
                    classNum: data.classNum,
                    period: data.period,
                    createdAt: data.createdAt
                });
            });
            
            return reservations;
        } catch (error) {
            console.error('Error fetching reservations from Firebase:', error);
            // Firebase 오류 시 localStorage로 폴백
            return JSON.parse(localStorage.getItem('school_reservations') || '[]');
        }
    }
    
    // localStorage 사용
    return JSON.parse(localStorage.getItem('school_reservations') || '[]');
}

/**
 * 예약 저장 (로컬스토리지 또는 Firebase)
 */
async function saveReservation(reservation) {
    if (isFirebaseReady()) {
        try {
            const res = await fetch('/api/reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'create', ...reservation })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || '예약 저장에 실패했습니다.');
            await renderResCalendar(currentTab);
            return;
        } catch (error) {
            console.error('Error saving reservation to Firebase:', error);
            showAlert(error.message || '예약 저장에 실패했습니다.');
            return;
        }
    }
    
    // localStorage 사용
    const list = await getReservations();
    list.push(reservation);
    localStorage.setItem('school_reservations', JSON.stringify(list));
    
    // 현재 탭으로 캘린더 다시 렌더링
    await renderResCalendar(currentTab);
}

/**
 * 예약 삭제
 */
async function deleteReservation(reservationId, password) {
    if (isFirebaseReady()) {
        try {
            const res = await fetch('/api/reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id: reservationId, password })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || '예약 삭제에 실패했습니다.');
            await renderResCalendar(currentTab);
            return;
        } catch (error) {
            console.error('Error deleting reservation from Firebase:', error);
            showAlert(error.message || '예약 삭제에 실패했습니다.');
            throw error;
        }
    }
    
    // localStorage 사용
    const list = await getReservations();
    const newList = list.filter(r => r.id !== reservationId);
    localStorage.setItem('school_reservations', JSON.stringify(newList));
    
    await renderResCalendar(currentTab);
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

    await saveReservation(newRes);
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
export async function confirmDelete() {
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

    if (!inputPw) {
        showAlert('비밀번호를 입력해주세요.');
        return;
    }

    try {
        await deleteReservation(selectedEventId, inputPw);
    } catch (error) {
        return;
    }
    showAlert('삭제되었습니다.');
    
    closePasswordModal();
    closeDetailModal();
    await renderResCalendar(getCurrentTab());
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

