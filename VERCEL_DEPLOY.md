# Vercel 배포 가이드

## 방법 1: Vercel 웹사이트에서 배포 (가장 쉬움) ⭐

### 1단계: GitHub에 푸시
```bash
git add .
git commit -m "Firebase 연동 완료"
git push origin main
```

### 2단계: Vercel에 연결
1. [Vercel](https://vercel.com) 접속
2. "Sign Up" 또는 "Log In" (GitHub 계정으로 로그인 권장)
3. "Add New Project" 클릭
4. GitHub 저장소 `Ingyu87/gadongonline` 선택
5. "Import" 클릭

### 3단계: 프로젝트 설정
- **Framework Preset**: `Other` 선택
- **Root Directory**: `./` (기본값 유지)
- **Build Command**: 비워두기 (정적 파일이므로 불필요)
- **Output Directory**: 비워두기

### 4단계: 환경 변수 설정 (필수!)
Firebase 설정을 환경 변수로 추가해야 합니다:
- "Environment Variables" 섹션에서 다음 변수 추가:

> ⚠️ **주의:** 아래 표의 값 예시는 실제 키를 적는 자리가 아니라  
> `YOUR_...` 형태의 **플레이스홀더**입니다.  
> 실제 값은 Firebase Console에서 복사해 **Vercel 화면에만** 입력하세요.

| 변수명 | 값 예시 (실제 값 아님) |
|--------|------------------------|
| `VITE_FIREBASE_API_KEY` | `YOUR_FIREBASE_API_KEY` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `YOUR_FIREBASE_AUTH_DOMAIN` |
| `VITE_FIREBASE_PROJECT_ID` | `YOUR_FIREBASE_PROJECT_ID` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `YOUR_FIREBASE_STORAGE_BUCKET` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `YOUR_FIREBASE_MESSAGING_SENDER_ID` |
| `VITE_FIREBASE_APP_ID` | `YOUR_FIREBASE_APP_ID` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `YOUR_FIREBASE_MEASUREMENT_ID` |

**중요**: 실제 Firebase 값은 GitHub에 적지 말고, Vercel 대시보드(Environment Variables)에만 입력한 뒤  
"Deploy" 버튼을 다시 클릭하거나 재배포해야 합니다.

### 5단계: 배포
- "Deploy" 버튼 클릭
- 자동으로 배포 시작
- 완료되면 URL 제공 (예: `gadongonline.vercel.app`)

## 방법 2: Vercel CLI로 배포

### 1단계: Vercel CLI 설치
```bash
npm i -g vercel
```

### 2단계: 로그인
```bash
vercel login
```

### 3단계: 배포
```bash
vercel
```

처음 배포 시:
- 프로젝트 설정 질문에 답변
- 배포 완료 후 URL 제공

### 4단계: 프로덕션 배포
```bash
vercel --prod
```

## 배포 후 확인사항

### 1. Firebase 도메인 등록
1. Firebase Console > Authentication > 설정
2. "승인된 도메인"에 Vercel 도메인 추가
   - 예: `gadongonline.vercel.app`
   - 예: `gadongonline-git-main-yourname.vercel.app`

### 2. Firestore 보안 규칙 적용
1. Firebase Console > Firestore Database > 규칙
2. `firestore.rules` 파일 내용 복사하여 붙여넣기
3. "게시" 클릭

### 3. 테스트
- 배포된 URL에서 앱 작동 확인
- 예약 추가/삭제 테스트
- 브라우저 콘솔에서 오류 확인

## 자동 배포 설정

GitHub에 푸시하면 자동으로 배포됩니다:
- `main` 브랜치에 푸시 → 프로덕션 배포
- 다른 브랜치에 푸시 → 프리뷰 배포

## 커스텀 도메인 설정 (선택사항)

1. Vercel 대시보드 > 프로젝트 > Settings > Domains
2. 원하는 도메인 입력
3. DNS 설정 안내 따르기

## 문제 해결

### 배포 실패
- `vercel.json` 파일 확인
- 빌드 로그 확인 (Vercel 대시보드)

### Firebase 오류
- Firebase 도메인 등록 확인
- Firestore 보안 규칙 확인
- 브라우저 콘솔 오류 확인

### 환경 변수 문제
- Vercel 대시보드에서 환경 변수 확인
- 재배포 필요할 수 있음

