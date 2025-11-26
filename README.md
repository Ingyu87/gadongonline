# 서울가동초등학교 교무업무 대시보드

서울가동초등학교 교무업무 지원을 위한 웹 대시보드입니다.

## 주요 기능

- 🍱 **급식 정보**: NEIS API를 통한 실시간 급식 메뉴 조회
- 📅 **공간 예약**: 학교 내 공간 예약 및 관리 시스템
- 🔗 **바로가기 링크**: 자주 사용하는 문서 및 시스템 바로가기
- 📆 **학사 일정**: 학사 일정 캘린더 표시

## 기술 스택

- HTML5
- CSS3 (Tailwind CSS)
- Vanilla JavaScript (ES6 Modules)
- Firebase (예정)
- Vercel (배포)

## 프로젝트 구조

```
gadong-online/
├── index.html          # 메인 HTML 파일
├── css/
│   └── style.css      # 커스텀 스타일
├── js/
│   ├── config.js      # Firebase 설정
│   ├── constants.js   # 상수 정의
│   ├── utils.js       # 유틸리티 함수
│   ├── lunch.js       # 급식 관련 기능
│   ├── calendar.js    # 캘린더 렌더링
│   ├── reservation.js # 예약 관리
│   └── main.js        # 메인 초기화
├── vercel.json        # Vercel 배포 설정
└── README.md
```

## 로컬 개발

1. 저장소 클론
```bash
git clone <repository-url>
cd gadong-online
```

2. 로컬 서버 실행
```bash
# Python 3
python -m http.server 8000

# 또는 Node.js (http-server 설치 필요)
npx http-server
```

3. 브라우저에서 `http://localhost:8000` 접속

## Firebase 연동

### ⚠️ 보안 주의사항
**Firebase 설정 정보는 절대 GitHub에 올리지 마세요!**

### 설정 방법

1. **로컬 개발**
   ```bash
   cp js/config.example.js js/config.js
   ```
   `js/config.js` 파일에 실제 Firebase 설정 입력 (이 파일은 .gitignore에 포함됨)

2. **Vercel 배포 (권장)**
   - Vercel 대시보드 > Settings > Environment Variables에서 환경 변수 설정
   - `SECURITY.md` 파일 참고

3. **Firebase 프로젝트 생성**
   - `FIREBASE_SETUP.md` 파일 참고

4. **활성화**
   - `js/config.js`의 `isFirebaseEnabled`를 `true`로 변경

## 배포

### Vercel 배포

1. GitHub에 저장소 푸시
2. [Vercel](https://vercel.com)에 로그인
3. 새 프로젝트 생성 및 GitHub 저장소 연결
4. 자동 배포 완료

### 수동 배포

```bash
vercel
```

## 라이선스

이 프로젝트는 서울가동초등학교 내부 사용을 위한 것입니다.

