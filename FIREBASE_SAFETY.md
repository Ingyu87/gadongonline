# Firebase API 키 보안 안내

## ✅ 좋은 소식: Firebase 웹 앱 API 키는 공개되어도 안전합니다!

### 왜 안전한가요?

1. **Firebase 웹 앱 API 키는 클라이언트용입니다**
   - 웹 앱은 브라우저에서 실행되므로 API 키가 노출되는 것이 정상입니다
   - 모든 Firebase 웹 앱의 API 키는 공개되어 있습니다

2. **실제 보안은 Firestore 규칙이 담당합니다**
   - API 키가 있어도 Firestore 보안 규칙을 통과해야 데이터에 접근할 수 있습니다
   - 보안 규칙이 올바르게 설정되어 있으면 안전합니다

3. **서버 키와는 다릅니다**
   - ⚠️ **서버 키(Server Key)**는 절대 공개하면 안 됩니다
   - 웹 앱 API 키는 클라이언트용이므로 공개되어도 괜찮습니다

## 🔒 보안을 강화하는 방법

### 1. Firestore 보안 규칙 강화 (가장 중요!)

현재 `firestore.rules` 파일에 보안 규칙이 설정되어 있습니다.
Firebase Console에서 이 규칙을 적용하세요:

1. Firebase Console > Firestore Database > 규칙 탭
2. `firestore.rules` 파일 내용 복사하여 붙여넣기
3. "게시" 버튼 클릭

### 2. API 키 제한 설정 (선택사항)

Google Cloud Console에서 API 키 사용을 제한할 수 있습니다:

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트: `gadongonline-5da5e` 선택
3. "API 및 서비스" > "사용자 인증 정보"
4. API 키 선택 > "애플리케이션 제한사항" 설정
   - HTTP 리퍼러(웹사이트) 제한: Vercel 도메인만 허용
   - API 제한: Firestore API만 허용

### 3. 도메인 제한 (권장)

Firebase Console > Authentication > 설정 > 승인된 도메인에서:
- Vercel 배포 도메인만 추가
- 불필요한 도메인 제거

## 📝 결론

**현재 Firebase 설정을 그대로 사용해도 안전합니다!**

- ✅ API 키는 공개되어도 괜찮음 (웹 앱용)
- ✅ Firestore 보안 규칙으로 데이터 보호
- ✅ `js/config.js`는 `.gitignore`에 포함되어 GitHub에 올라가지 않음

**중요한 것:**
1. Firestore 보안 규칙을 Firebase Console에 적용
2. 불필요한 권한은 제거
3. 정기적으로 보안 규칙 검토

## 🚨 절대 하지 말아야 할 것

- ❌ 서버 키(Server Key) 공개
- ❌ 관리자 권한이 있는 계정 정보 공개
- ❌ Firestore 보안 규칙을 `allow read, write: if true`로 설정 (모든 접근 허용)



