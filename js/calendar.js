import { VIRTUAL_TODAY, ACADEMIC_CALENDAR, HOLIDAYS } from './constants.js';
import { getReservations, getCurrentTab, setCurrentTab, openReservationModal, openDetailModal } from './reservation.js';

let currentResDate = new Date(VIRTUAL_TODAY);

/**
 * 예약 캘린더 렌더링
 */
export async function renderResCalendar(selectedTab) {
    if (selectedTab) {
        setCurrentTab(selectedTab);
    }
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

    // 빈 셀 추가
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'bg-gray-50 border-r border-b border-gray-200';
        grid.appendChild(emptyCell);
    }

    // 날짜 셀 추가
    for (let d = 1; d <= lastDate; d++) {
        const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        
        // 날짜 색상 로직
        const dayOfWeek = new Date(y, m, d).getDay();
        const dayNum = document.createElement('div');
        dayNum.className = 'text-sm font-bold mb-1';
        dayNum.textContent = d;
        
        if (dayOfWeek === 0) {
            dayNum.classList.add('text-holiday'); 
        } else if (dayOfWeek === 6) {
            dayNum.classList.add('text-saturday'); 
        } else {
            dayNum.classList.add('text-gray-500'); 
        }
        
        if (HOLIDAYS[dateStr]) {
            dayNum.classList.remove('text-saturday', 'text-gray-500');
            dayNum.classList.add('text-holiday');
        }

        // 가상 오늘 날짜 배경
        if (y === VIRTUAL_TODAY.getFullYear() && 
            m === VIRTUAL_TODAY.getMonth() && 
            d === VIRTUAL_TODAY.getDate()) {
            cell.classList.add('today');
        }
        
        cell.onclick = () => openReservationModal(dateStr);
        cell.appendChild(dayNum);
        
        // 학사 일정 표시
        if (ACADEMIC_CALENDAR[dateStr]) {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'school-event';
            eventDiv.textContent = ACADEMIC_CALENDAR[dateStr];
            cell.appendChild(eventDiv);
        }

        // 예약 이벤트 표시
        const dayEvents = reservations.filter(r => 
            r.date === dateStr && r.space === currentTab
        );
        
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

/**
 * 예약 캘린더 월 변경
 */
export async function changeResMonth(delta) {
    if (delta === 0) {
        currentResDate = new Date(VIRTUAL_TODAY);
    } else {
        currentResDate.setMonth(currentResDate.getMonth() + delta);
    }
    // 현재 선택된 탭으로 캘린더 다시 렌더링
    const currentTab = getCurrentTab();
    await renderResCalendar(currentTab);
}

// 전역 함수로 export
window.changeResMonth = changeResMonth;

