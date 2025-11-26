import { QUICK_LINKS, ROOMS } from './constants.js';
import { fetchLunch } from './lunch.js';
import { renderTabs, initRooms, closeReservationModal, closeDetailModal, closePasswordModal } from './reservation.js';
import { renderResCalendar } from './calendar.js';
import { showAlert, closeAlert } from './utils.js';
import { initializeFirebase } from './firebase-init.js';

/**
 * 바로가기 링크 렌더링
 */
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

/**
 * 모달 외부 클릭 시 닫기
 */
function setupModalCloseHandlers() {
    window.onclick = function(event) {
        const resModal = document.getElementById('reservationModal');
        const detailModal = document.getElementById('detailModal');
        const alertModal = document.getElementById('alertModal');
        const passwordModal = document.getElementById('passwordModal');
        
        if (event.target == resModal) {
            closeReservationModal();
        }
        if (event.target == detailModal) {
            closeDetailModal();
        }
        if (event.target == alertModal) {
            closeAlert();
        }
        if (event.target == passwordModal) {
            closePasswordModal();
        }
    };
}

/**
 * 앱 초기화
 */
window.onload = function() {
    // Firebase 초기화 (비동기, 백그라운드)
    initializeFirebase();
    
    // 바로가기 링크 렌더링
    renderQuickLinks();
    
    // 공간 초기화
    initRooms();
    
    // 탭 렌더링
    renderTabs();
    
    // 캘린더 렌더링 (첫 번째 공간으로)
    renderResCalendar(ROOMS[0]);
    
    // 급식 정보 로드
    fetchLunch();
    
    // 모달 핸들러 설정
    setupModalCloseHandlers();
};

// 전역 함수로 export
window.showAlert = showAlert;
window.closeAlert = closeAlert;

