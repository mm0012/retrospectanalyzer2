# GitHub 업로드 가이드

## 1. GitHub 저장소 생성
1. GitHub.com에 로그인
2. "New repository" 클릭
3. Repository name: `retro-analysis-app` (또는 원하는 이름)
4. Description: "회고 분석 웹 애플리케이션"
5. Public 또는 Private 선택
6. "Create repository" 클릭

## 2. 로컬에서 Git 초기화 및 업로드

### PowerShell에서 실행할 명령어들:

```powershell
# 1. Git 초기화
git init

# 2. 모든 파일 추가
git add .

# 3. 첫 번째 커밋
git commit -m "Initial commit: 회고 분석 앱 초기 버전"

# 4. GitHub 저장소 연결 (YOUR_USERNAME과 YOUR_REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 5. 기본 브랜치 설정
git branch -M main

# 6. GitHub에 업로드
git push -u origin main
```

## 3. 업로드 후 확인사항
- [ ] 모든 파일이 GitHub에 정상적으로 업로드되었는지 확인
- [ ] README.md 파일이 있는지 확인
- [ ] package.json이 루트에 있는지 확인
- [ ] .gitignore가 제대로 설정되어 있는지 확인

## 4. 주의사항
- `.env` 파일은 보안상 GitHub에 업로드되지 않음 (이미 .gitignore에 포함됨)
- `node_modules` 폴더는 업로드되지 않음 (이미 .gitignore에 포함됨)
- Vercel 배포 시 환경 변수를 별도로 설정해야 함
