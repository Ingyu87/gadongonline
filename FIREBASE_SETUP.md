# Firebase 연동 가이드

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `gadong-online`)
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

## 2. Firestore 데이터베이스 설정

1. Firebase Console에서 "Firestore Database" 선택
2. "데이터베이스 만들기" 클릭
3. **프로덕션 모드** 또는 **테스트 모드** 선택
   - 테스트 모드: 처음 30일간 모든 읽기/쓰기 허용
   - 프로덕션 모드: 보안 규칙 설정 필요

### 보안 규칙 (프로덕션 모드 권장)

프로젝트 루트에 `firestore.rules` 파일이 포함되어 있습니다. Firebase Console에서 다음 규칙을 적용하세요:

**Firebase Console > Firestore Database > 규칙 탭**에서 아래 규칙을 복사하여 붙여넣으세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 예약(reservations) 컬렉션 규칙
    match /reservations/{reservationId} {
      // 읽기: 모든 사용자 허용 (공개 캘린더)
      allow read: if true;
      
      // 생성: 모든 사용자 허용 (예약 추가)
      allow create: if true;
      
      // 수정: 모든 사용자 허용 (비밀번호는 앱에서 확인)
      allow update: if true;
      
      // 삭제: 모든 사용자 허용 (비밀번호는 앱에서 확인)
      allow delete: if true;
      
      // 데이터 검증: 필수 필드 확인
      allow create: if request.resource.data.keys().hasAll(['date', 'space', 'grade', 'classNum', 'period', 'password', 'createdAt'])
        && request.resource.data.date is string
        && request.resource.data.space is string
        && request.resource.data.grade is string
        && request.resource.data.classNum is string
        && request.resource.data.period is string
        && request.resource.data.password is string
        && request.resource.data.createdAt is string;
    }
    
    // 다른 컬렉션은 기본적으로 거부
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**참고**: 
- 현재 규칙은 모든 사용자가 읽기/쓰기를 할 수 있도록 설정되어 있습니다.
- 보안이 중요한 경우, Firebase Authentication을 추가하고 `request.auth != null` 조건을 사용하세요.
- 비밀번호 검증은 앱 내에서 처리되므로, Firestore 규칙에서는 모든 사용자에게 삭제 권한을 허용합니다.

## 3. 웹 앱 설정

1. Firebase Console에서 ⚙️ 아이콘 > "프로젝트 설정"
2. "내 앱" 섹션에서 웹 아이콘(</>) 클릭
3. 앱 닉네임 입력 (예: `gadong-dashboard`)
4. "앱 등록" 클릭
5. **설정 정보 복사**

## 4. config.js 파일 업데이트

`js/config.js` 파일을 열고 Firebase 설정을 입력하세요:

```javascript
export const firebaseConfig = {
    apiKey: "AIza...",           // 복사한 apiKey
    authDomain: "xxx.firebaseapp.com",
    projectId: "gadong-online",   // 프로젝트 ID
    storageBucket: "xxx.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};

export const isFirebaseEnabled = true; // true로 변경!
```

## 5. Firestore 컬렉션 구조

예약 데이터는 `reservations` 컬렉션에 저장됩니다:

```
reservations/
  ├── {auto-generated-id}/
  │   ├── date: "2025-11-26"
  │   ├── space: "컴퓨터실"
  │   ├── grade: "3학년"
  │   ├── classNum: "1반"
  │   ├── period: "1교시 (09:00~)"
  │   ├── password: "1234"
  │   └── createdAt: "2025-11-26T09:00:00.000Z"
```

## 6. 테스트

1. `isFirebaseEnabled = true`로 변경
2. 브라우저 콘솔에서 "Firebase initialized successfully" 메시지 확인
3. 예약 추가/삭제 테스트
4. Firebase Console > Firestore에서 데이터 확인

## 7. 보안 규칙 적용

### 방법 1: Firebase Console에서 직접 적용
1. Firebase Console > Firestore Database > 규칙 탭
2. `firestore.rules` 파일의 내용을 복사하여 붙여넣기
3. "게시" 버튼 클릭

### 방법 2: Firebase CLI 사용 (선택사항)
```bash
firebase deploy --only firestore:rules
```

### 규칙 설명
- **현재 규칙 (`firestore.rules`)**: 모든 사용자가 읽기/쓰기 가능 (테스트용)
- **프로덕션 규칙 (`firestore.rules.production`)**: 인증된 사용자만 접근 가능
  - Firebase Authentication 연동 후 사용 권장

## 8. 환경 변수 사용 (선택사항)

보안을 위해 환경 변수를 사용할 수 있습니다:

### Vercel 환경 변수 설정
1. Vercel 대시보드 > 프로젝트 > Settings > Environment Variables
2. 다음 변수 추가:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - 등등...

3. `js/config.js` 수정:
```javascript
export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // ...
};
```

## 문제 해결

### Firebase가 초기화되지 않음
- 브라우저 콘솔 확인
- `isFirebaseEnabled = true` 확인
- Firebase 설정 정보 확인

### 데이터가 저장되지 않음
- Firestore 보안 규칙 확인
- 브라우저 콘솔 오류 확인
- 네트워크 탭에서 요청 확인

### CORS 오류
- Firebase 설정에서 도메인 등록 확인
- Vercel 배포 후 Firebase Console > Authentication > 설정 > 승인된 도메인에 추가

