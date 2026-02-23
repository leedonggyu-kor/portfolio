# LDG Portfolio (Next.js)

## GitHub Pages 배포 가이드

이 프로젝트는 GitHub Pages 호스팅을 위해 정적 export 모드로 설정되어 있습니다.

### 핵심 설정
- `output: 'export'`
- `trailingSlash: true`
- `images.unoptimized: true`
- `basePath` / `assetPrefix`를 `NEXT_PUBLIC_BASE_PATH`로 제어
- export 후 `out/.nojekyll` 자동 생성

## 로컬 실행
```bash
npm install
npm run dev
```

## 정적 export
```bash
npm run export
```
결과물은 `out/` 폴더에 생성됩니다.

## GitHub Pages (Project Pages) 예시
레포가 `https://github.com/<user>/<repo>`라면 `<repo>` 경로로 배포되어야 하므로:

```bash
NEXT_PUBLIC_BASE_PATH=/<repo> npm run export
```

이후 `out/` 내용을 `gh-pages` 브랜치(또는 Actions artifact)로 배포하면 됩니다.

## GitHub Pages (User/Org Pages)
`<user>.github.io` 루트에 배포하는 경우 base path가 필요 없어서:

```bash
npm run export
```


## "예전 페이지가 보이는" 문제 해결 체크리스트

`https://<user>.github.io/<repo>/`에서 예전 `index.html`이 보이는 가장 흔한 원인은 **Pages 소스가 main/root로 설정**되어 있고, Next export 결과물(`out/`)은 배포되지 않았기 때문입니다.

이 저장소는 `.github/workflows/deploy-pages.yml`로 배포하도록 구성했습니다.

1. GitHub 저장소 **Settings → Pages → Build and deployment**에서 Source를 **GitHub Actions**로 설정
2. `main` 브랜치에 push
3. **Actions 탭에서 `Deploy Next.js static export to GitHub Pages` 워크플로 성공 확인**
4. 배포 URL 재접속 (강력 새로고침 권장)

참고:
- Project Pages는 자동으로 `NEXT_PUBLIC_BASE_PATH=/<repo>`를 사용해 빌드합니다.
- 아직도 예전 화면이면 브라우저 캐시 또는 이전 gh-pages artifact가 남았는지 확인하세요.
