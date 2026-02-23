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
