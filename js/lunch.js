import { VIRTUAL_TODAY, LUNCH_API_CONFIG } from './constants.js';
import { getFormattedDate, getDisplayDate, showAlert } from './utils.js';

let currentLunchDate = new Date(VIRTUAL_TODAY);

/**
 * 급식 정보 가져오기
 */
export function fetchLunch() {
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
                // 알레르기 번호 제거 정규식
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

/**
 * 급식 날짜 변경
 */
export function changeLunchDate(offset) {
    currentLunchDate.setDate(currentLunchDate.getDate() + offset);
    fetchLunch();
}

/**
 * 급식 날짜를 오늘로 리셋
 */
export function resetLunchDate() {
    currentLunchDate = new Date(VIRTUAL_TODAY);
    fetchLunch();
}

// 전역 함수로 export (HTML에서 직접 호출하기 위해)
window.changeLunchDate = changeLunchDate;
window.resetLunchDate = resetLunchDate;

