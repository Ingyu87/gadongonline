// 유틸리티 함수들

/**
 * 날짜를 YYYYMMDD 형식으로 변환
 */
export function getFormattedDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
}

/**
 * 날짜를 표시 형식으로 변환 (예: 2025년 11월 26일 (수))
 */
export function getDisplayDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${y}년 ${m}월 ${d}일 (${days[date.getDay()]})`;
}

/**
 * 알림 모달 표시
 */
export function showAlert(msg) {
    const alertModal = document.getElementById('alertModal');
    const alertMessage = document.getElementById('alertMessage');
    if (alertModal && alertMessage) {
        alertMessage.innerText = msg;
        alertModal.classList.remove('hidden');
    }
}

/**
 * 알림 모달 닫기
 */
export function closeAlert() {
    const alertModal = document.getElementById('alertModal');
    if (alertModal) {
        alertModal.classList.add('hidden');
    }
}




