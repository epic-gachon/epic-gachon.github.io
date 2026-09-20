/* =====================================================================
   EPIC Lab — News data
   제목은 한글로 간략하게, 상세 내용은 text 에 (클릭하면 펼쳐짐).
   새 소식을 추가하려면 배열 맨 위에 항목을 하나 추가하면 됩니다.
   date : "YYYY.MM.DD" 또는 "YYYY.MM"
   type : "Notice"(공지) | "Recruiting"(모집) | "Grant"(과제) | "Publication"(논문) | "Seminar"(세미나) | "Award"(수상)
   text : 상세 내용 (클릭하면 펼쳐짐, 비워두면 제목만 표시)
   img  : assets/img/ 기준 상대 경로 (없으면 null)
   link : 외부 링크 (없으면 null)
   ===================================================================== */
window.EPIC_NEWS = [
  {
    date: "2026.09", type: "Grant",
    title: "한국연구재단 기본연구B 신규 과제 선정",
    text: "한국연구재단 개인기초연구사업 기본연구B에 선정되었습니다 (2026.09 – 2029.08).",
    img: null, link: null
  },
  {
    date: "2026.09", type: "Recruiting",
    title: "대학원 신입생(석·박사) 및 학부연구생 모집",
    text: "석·박사 대학원생과 학부연구생을 모집합니다. 지원 방법은 홈의 How to apply를 참고하시기 바랍니다.",
    img: null, link: "index.html#join"
  },
  {
    date: "2026.03", type: "Notice",
    title: "EPIC Lab open",
    text: "2026년 3월 가천대학교 화공생명배터리공학부에서 EPIC Lab이 시작하였습니다.",
    img: null, link: null
  }
];
