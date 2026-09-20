# EPIC Lab 홈페이지 (site/)

가천대학교 EPIC Lab 홈페이지 소스입니다. 순수 HTML/CSS/JS 정적 사이트이며 GitHub Pages에 그대로 올리면 동작합니다.

## 구조

```
site/
├─ index.html          홈 (Hero · Join us · News | Gallery · Research · Members · Publications · Contact 를 한 페이지에 모두 표시)
├─ research.html       연구 분야 3 pillars
├─ members.html        Professor / Members / Alumni (스크롤, #professor #members #alumni 앵커)
├─ publications.html   전체 논문 목록 (연도 필터, TOC 이미지 클릭 확대)
├─ news.html           뉴스 통합 리스트 (과제·강연·세미나·수상·모집 모두)
├─ gallery.html        사진 갤러리
├─ contact.html        연락처 · 지도
├─ funding.html        Projects & Funding (News 하위 메뉴) — 새 과제는 <article class="project"> 블록 복사
├─ data/
│   ├─ publications.js ★ 논문 데이터 — 새 논문은 배열 맨 위에 추가 (journal·vol·pages·year → "저널명, 권, 페이지 (연도)"로 표시)
│   ├─ news.js         ★ 뉴스 데이터 — 새 소식은 배열 맨 위에 추가
│   └─ gallery.js      ★ 갤러리 사진 — assets/img/gallery/ 에 넣고 항목 추가
└─ assets/
    ├─ css/style.css   전체 스타일
    ├─ js/main.js      scroll-spy · 모바일 메뉴 · 라이트박스 · 데이터 렌더링
    └─ img/            이미지 (pubs/ = 논문 TOC, research/ = 연구분야)
```

홈의 News/Gallery, 뉴스 페이지, 논문 목록은 모두 `data/*.js`에서 자동으로 채워집니다.
→ **평소 업데이트는 `data/news.js`, `data/publications.js`, `data/gallery.js` 세 파일만 고치면 됩니다.**

## 자주 하는 업데이트

- **뉴스 추가**: `data/news.js` 배열 맨 위에 항목 추가. `img`는 `assets/img/` 기준 경로 (예: `"news/2026-workshop.jpg"`).
- **논문 추가**: `data/publications.js` 배열 맨 위에 항목 추가. TOC 이미지는 `assets/img/pubs/pNN.jpg`로 저장 후 `img: "pNN.jpg"`. 홈에 노출하려면 `featured: true` (최대 4개).
- **교수 사진**: `assets/img/pi.jpg` 교체 시 같은 파일명으로 덮어쓰기 (4:5 비율 권장).
- **학생 추가**: `members.html`과 `index.html` 두 곳의 `.members-grid` 카드를 복사해 이름·과정 입력 (홈에도 같은 블록이 있음).
- **과제 추가**: `funding.html`의 `<article class="project">` 블록 복사.

## GitHub Pages 배포 (최초 1회, 약 5분)

1. https://github.com 계정 생성 (예: `epic-lab-gachon`).
2. 새 저장소 생성 — 이름을 `epic-lab-gachon.github.io`로 하면 주소가 `https://epic-lab-gachon.github.io` 가 됩니다. (Public)
3. 이 `site/` 폴더 안의 파일 전부를 저장소 루트에 업로드 (웹에서 "Add file → Upload files"로 드래그 앤 드롭 가능).
4. 저장소 Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `(root)` → Save.
5. 1–2분 후 위 주소로 접속 확인.

이후 업데이트는 GitHub 웹에서 `data/news.js` 등을 직접 편집(연필 아이콘)하고 Commit 하면 1분 내 반영됩니다.

## 기존 Google Sites 처리

`sites.google.com/view/epic-lab` 홈 상단에 "새 홈페이지로 이동 → https://epic-lab-gachon.github.io" 버튼을 하나 남겨두면 됩니다. (학과 홈페이지 등에 등록된 링크가 있으면 새 주소로 교체.)

## 로컬 미리보기

폴더에서 `python -m http.server 8000` 실행 후 http://localhost:8000 접속. (`index.html`을 더블클릭해도 열리지만 Google Maps 지도는 서버로 열어야 표시됩니다.)
