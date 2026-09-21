/* =====================================================================
   EPIC Lab — News data
   날짜순으로 자동 정렬·번호 매김 (가장 최근이 위, 번호는 오래된 순 01부터).
   date : "YYYY.MM.DD"
   type : "Member"(새 구성원) | "Publication"(논문) | "Press"(학과 뉴스·기사) |
          "Hosted"(Hosted Seminar) | "Invited"(Invited Talk) |
          "Grant"(과제) | "Recruiting"(모집) | "Notice"(공지)
   title: 짧은 제목 / text: 펼치면 보이는 내용 / link: 링크 (사진은 gallery.js에)
   ===================================================================== */
window.EPIC_NEWS = [
  {
    date: "2026.09.01", type: "Recruiting",
    title: "대학원 신입생(석·박사) 및 학부연구생 모집",
    text: "석·박사 대학원생과 학부연구생을 모집합니다. 지원 방법은 홈의 How to apply를 참고하시기 바랍니다.",
    link: "index.html#join"
  },
  {
    date: "2026.08.25", type: "Invited",
    title: "한국전기연구원(KERI) 초청 세미나",
    text: "한국전기연구원 최정희 센터장님의 초청으로 “Characterizing Electrochemical Interfaces across Chemistry and Mechanics”를 주제로 세미나를 진행하였습니다. 초청해주셔서 감사합니다! 🙏"
  },
  {
    date: "2026.08.25", type: "Grant",
    title: "한국연구재단 우수연구-핵심연구(기본연구B) 선정",
    text: "한국연구재단 우수연구-핵심연구(기본연구B) 과제에 선정되었습니다 (2026.09 – 2029.08)."
  },
  {
    date: "2026.05.29", type: "Hosted",
    title: "인하대학교 화학과 김민규 교수님 초청 세미나",
    text: "인하대학교 화학과 김민규 교수님을 초청하여 “Understanding Reaction Dynamics of Composite Electrode for Developing High Performance LIBs”를 주제로 세미나를 개최하였습니다. 방문해주셔서 감사합니다! 👏"
  },
  {
    date: "2026.05.13", type: "Hosted",
    title: "고려대학교 신소재공학과 박혁준 교수님 초청 세미나",
    text: "고려대학교 신소재공학과 박혁준 교수님을 초청하여 “Calcination Process Design of Layered Oxide Cathodes for Advanced Lithium Ion Batteries”를 주제로 세미나를 개최하였습니다. 방문해주셔서 감사합니다! 👏"
  },
  {
    date: "2026.04.13", type: "Invited",
    title: "포항공과대학교(POSTECH) 초청 세미나",
    text: "포항공과대학교 기계공학과 안지환 교수님의 초청으로 “Engineering Electrochemical Interfaces: Bridging Electrolyte Chemistry, Mechanics, and Atomic Layer Deposition”를 주제로 세미나를 진행하였습니다. 초청해주셔서 감사합니다! 🙏"
  },
  {
    date: "2026.03.03", type: "Notice",
    title: "EPIC Lab open",
    text: "2026년 3월 가천대학교 화공생명배터리공학부에서 EPIC Lab이 시작하였습니다."
  },
  {
    date: "2026.02.06", type: "Invited",
    title: "한국기초과학지원연구원(KBSI) 초청 세미나",
    text: "한국기초과학지원연구원 수도권센터 이영주 박사님의 초청으로 “Interfacial Control as a Design Strategy for Next-Generation Batteries”를 주제로 세미나를 진행하였습니다. 초청해주셔서 감사합니다! 🙏"
  }
];
