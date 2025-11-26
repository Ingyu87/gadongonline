# 보안 가이드

## ⚠️ 중요: Firebase 설정 정보 보안

**Firebase API 키와 설정 정보는 절대 GitHub에 올리지 마세요!**

## 현재 상황

Firebase 설정 정보가 노출되었을 수 있습니다. 다음 조치를 즉시 취하세요:

### 1. Firebase Console에서 API 키 재생성 (권장)

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 프로젝트 선택: `gadongonline-5da5e`
3. ⚙️ 설정 > 프로젝트 설정
4. "내 앱" 섹션에서 웹 앱 선택
5. "키 다시 만들기" 클릭하여 새 API 키 생성
6. Firestore 보안 규칙에서 도메인 제한 설정

### 2. Firestore 보안 규칙 강화

Firebase Console > Firestore Database > 규칙에서 다음 규칙 적용:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reservations/{reservationId} {
      // API 키 도메인 제한 (Vercel 도메인만 허용)
      allow read: if request.auth != null || 
        request.headers.origin.matches('https://.*\\.vercel\\.app') ||
        request.headers.origin.matches('https://gadong.*');
      
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### 3. 로컬 설정 방법

1. `js/config.example.js` 파일을 복사하여 `js/config.js` 생성:
   ```bash
   cp js/config.example.js js/config.js
   ```

2. `js/config.js` 파일에 실제 Firebase 설정 입력
   - 이 파일은 `.gitignore`에 포함되어 있어 GitHub에 올라가지 않습니다

3. Vercel 배포 시 환경 변수 사용 (권장)

## Vercel 환경 변수 설정

### 1. Vercel 대시보드에서 설정

1. Vercel 프로젝트 > Settings > Environment Variables
2. 다음 변수 추가:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`

### 2. config.js 수정

```javascript
export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const isFirebaseEnabled = true;
```

## 추가 보안 조치

1. **Firebase Console > Authentication > 설정 > 승인된 도메인**
   - Vercel 배포 도메인만 추가
   - 불필요한 도메인 제거

2. **Firebase Console > 프로젝트 설정 > 일반**
   - API 키 제한 설정
   - HTTP 리퍼러(웹사이트) 제한 설정

3. **Firestore 보안 규칙**
   - 읽기/쓰기 권한 최소화
   - 인증 필수 설정 권장

## 이미 GitHub에 올라간 경우

만약 Firebase 설정이 이미 GitHub에 올라갔다면:

1. **GitHub에서 저장소를 Private으로 변경** (즉시)
2. **Firebase API 키 재생성** (위 1번 참조)
3. **Git 히스토리에서 제거** (필요시):
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch js/config.js" \
     --prune-empty --tag-name-filter cat -- --all
   ```
4. **강제 푸시** (주의: 팀원과 협의 필요)

## 참고

- Firebase API 키는 클라이언트에 노출되지만, Firestore 보안 규칙으로 접근을 제한할 수 있습니다
- 환경 변수 사용을 강력히 권장합니다
- 정기적으로 API 키를 재생성하는 것을 권장합니다

