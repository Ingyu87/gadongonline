# Vercel 환경 변수 설정 가이드

## 🔒 Firebase 설정을 환경 변수로 안전하게 관리

`js/config.js` 파일은 `.gitignore`에 포함되어 GitHub에 올라가지 않습니다.
대신 Vercel 환경 변수를 사용하여 Firebase 설정을 관리합니다.

## 설정 방법

### 1. Vercel 대시보드 접속
1. [Vercel](https://vercel.com) 로그인
2. 프로젝트 선택 (또는 새로 생성)

### 2. 환경 변수 추가
1. 프로젝트 > **Settings** > **Environment Variables** 클릭
2. 다음 변수들을 하나씩 추가:

#### 필수 환경 변수

```
이름: VITE_FIREBASE_API_KEY
값: AIzaSyA1Ah3xbmIyadDzhH_FeUGof6UACbZU7qg
환경: Production, Preview, Development (모두 체크)
```

```
이름: VITE_FIREBASE_AUTH_DOMAIN
값: gadongonline-5da5e.firebaseapp.com
환경: Production, Preview, Development (모두 체크)
```

```
이름: VITE_FIREBASE_PROJECT_ID
값: gadongonline-5da5e
환경: Production, Preview, Development (모두 체크)
```

```
이름: VITE_FIREBASE_STORAGE_BUCKET
값: gadongonline-5da5e.firebasestorage.app
환경: Production, Preview, Development (모두 체크)
```

```
이름: VITE_FIREBASE_MESSAGING_SENDER_ID
값: 66977932038
환경: Production, Preview, Development (모두 체크)
```

```
이름: VITE_FIREBASE_APP_ID
값: 1:66977932038:web:c0675ac71c668c60edf487
환경: Production, Preview, Development (모두 체크)
```

```
이름: VITE_FIREBASE_MEASUREMENT_ID
값: G-K2PESDLH9S
환경: Production, Preview, Development (모두 체크)
```

### 3. 재배포
환경 변수 추가 후:
- 자동으로 재배포되거나
- 수동으로 "Redeploy" 버튼 클릭

## 로컬 개발용 설정

로컬에서 개발할 때는 `js/config.js` 파일을 직접 수정하세요:

```bash
# config.example.js를 복사
cp js/config.example.js js/config.js

# config.js 파일을 열어서 Firebase 설정 입력
```

또는 `.env.local` 파일 생성:

```env
VITE_FIREBASE_API_KEY=AIzaSyA1Ah3xbmIyadDzhH_FeUGof6UACbZU7qg
VITE_FIREBASE_AUTH_DOMAIN=gadongonline-5da5e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gadongonline-5da5e
VITE_FIREBASE_STORAGE_BUCKET=gadongonline-5da5e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=66977932038
VITE_FIREBASE_APP_ID=1:66977932038:web:c0675ac71c668c60edf487
VITE_FIREBASE_MEASUREMENT_ID=G-K2PESDLH9S
```

## 확인 방법

배포 후 브라우저 콘솔에서:
- "Firebase initialized successfully" 메시지 확인
- 예약 기능이 정상 작동하는지 테스트

## 보안 장점

✅ Firebase 설정이 GitHub에 노출되지 않음
✅ 팀원별로 다른 설정 사용 가능
✅ 환경별(개발/프로덕션) 설정 분리 가능
✅ Vercel 대시보드에서만 관리



