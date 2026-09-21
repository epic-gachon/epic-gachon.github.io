# EPIC Lab Homepage

가천대학교 화공생명배터리공학부 EPIC Lab (Prof. Kyobin Park) 홈페이지. 정적 HTML/CSS/JS 사이트이며 GitHub Pages로 배포됩니다.

- 주소: https://epic-gachon.github.io

## 구조

```
index.html          홈
research.html       Research
members.html        Professor / Members
publications.html   전체 논문 (연도 필터)
news.html           News · Research projects
gallery.html        Gallery
contact.html        Contact · 지도
funding.html        news.html#funding 으로 이동 (예전 주소 호환용)
data/
  publications.js   논문 목록
  news.js           뉴스
  gallery.js        갤러리 사진 { src, date: "YYYY.MM.DD", title }
assets/
  css/style.css
  js/main.js
  img/              pubs/ (논문 TOC), gallery/, research/ 등
```

## 업데이트

- 뉴스, 논문, 갤러리는 `data/*.js` 배열 맨 위에 항목을 추가하면 홈과 각 페이지에 반영됩니다.
- 논문 TOC 이미지는 `assets/img/pubs/pNN.jpg`로 저장하고 `img: "pNN.jpg"`로 지정합니다.
- GitHub에서 파일을 수정하고 Commit 하면 1분 안팎으로 사이트에 반영됩니다.

## 로컬 미리보기

```
python -m http.server 8000
```
후 http://localhost:8000 접속.
