/* =====================================================================
   EPIC Lab — Publications data
   새 논문을 추가하려면 배열 맨 위에 항목을 하나 추가하면 됩니다.
   img: assets/img/pubs/ 안의 TOC 이미지 파일명 (없으면 null)
   홈의 Recent Publications 에는 배열 맨 위 4개가 자동 표시됩니다.
   authors: † 공동 제1저자, * 교신저자 표시 그대로 입력
   인용 형식(구글사이트와 동일): 저널명, 권, 페이지 (연도) → journal / vol / pages / year 로 나눠 입력
   ===================================================================== */
window.EPIC_PUBS = [
  {
    n: 19, year: 2026, journal: "Small Structures", featured: true,
    title: "Probing interfacial reaction pathways in atomic layer deposition on sulfide superionic conductors",
    authors: "Kyobin Park, Aditya Sundar, Vepa Rozyyev, Anil U. Mane, Donghyeon Kang, Chi Thang Nguyen, Francisco Lagunas, Hacksung Kim, Fulya Dogan, Zachary D. Hood, Peter Zapol, Justin G. Connell*, Jeffrey W. Elam*",
    vol: "7", pages: "e70411",
    url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/sstr.70411",
    img: "p19.jpg", tags: ["ALD", "Sulfide SE", "Surface"]
  },
  {
    n: 18, year: 2026, journal: "Advanced Functional Materials", featured: true,
    title: "Dimethylsulfamoyl fluoride-based electrolyte with dual cathodic-anodic stability for sodium-ion and sodium-metal batteries",
    authors: "Minseon Lee†, Kyobin Park†, Seung Weon Jeong†, Dokyung Kim, Min Pyeong Kim, Seunguk Kim, Juyeop Song, Seunghyeon Jo, Sung You Hong, Young Joo Lee*, Sangheon Lee*, Kyu Tae Lee*",
    vol: "36", pages: "e75549",
    url: "https://doi.org/10.1002/adfm.75549",
    img: "p18.jpg", tags: ["Electrolyte", "Na battery"]
  },
  {
    n: 17, year: 2026, journal: "Journal of Materials Chemistry A",
    title: "A uniform lithium ion flux and robust interphase enabled by an anion anchoring additive for high energy density Si-based anodes",
    authors: "Jinhyung Kim†, SeungEun Yu†, Haein Park, Jaehoon Yoon, Chanho Lee, Ryeowon Kang, Kyobin Park, San Moon, Patrick Joohyun Kim, Seho Sun, Ki-Min Roh, Incheol Jeong*, Dongsoo Lee*, Junghyun Choi*",
    vol: "14", pages: "17831–17845",
    url: "https://pubs.rsc.org/en/content/articlelanding/2026/ta/d6ta01386d",
    img: "p17.jpg", tags: ["Additive", "Si anode"]
  },
  {
    n: 16, year: 2026, journal: "ACS Electrochemistry",
    title: "Stable, efficient iron electrodeposition via anion-directed control of Fe(II) coordination",
    authors: "Jiang Luo, Kyobin Park, Donghyeon Kang, Justin G. Connell*",
    vol: "2", pages: "735–744",
    url: "https://pubs.acs.org/doi/abs/10.1021/acselectrochem.5c00521",
    img: "p16.jpg", tags: ["Electrodeposition", "Solvation"]
  },
  {
    n: 15, year: 2026, journal: "Journal of the American Chemical Society", featured: true,
    title: "The heterogeneous charge transfer mechanism in lithium metal batteries: revealing abnormal lithiophilicity through the Marcus theory",
    authors: "Seunghyeon Jo†, Juyeop Song†, Seung Jae Kwak†, Kyobin Park, Seunguk Kim, Sehyeon Jo, Seonghyun Lee, Gawon Song, Anseong Park, Won Bo Lee*, Kyu Tae Lee*",
    vol: "148", pages: "2930–2941",
    url: "https://pubs.acs.org/doi/abs/10.1021/jacs.5c12858",
    img: "p15.jpg", tags: ["Li metal", "Charge transfer"]
  },
  {
    n: 14, year: 2025, journal: "ACS Applied Materials & Interfaces",
    title: "Chemical vapor transformation of lithium metal: mechanism and enhanced stability",
    authors: "Kyobin Park, Yu Lim Kim, Justin G. Connell, Cong Liu, Hacksung Kim, Sungjoon Kim, Chi Thang Nguyen, Anil U. Mane, Donghyeon Kang, Jeffrey W. Elam*",
    vol: "17", pages: "67763–67775",
    url: "https://pubs.acs.org/doi/abs/10.1021/acsami.5c14245",
    img: "p14.jpg", tags: ["Li metal", "Vapor-phase", "Artificial SEI"]
  },
  {
    n: 13, year: 2025, journal: "Journal of the Electrochemical Society",
    title: "Choline chloride-based water-in-salt electrolyte for efficient iron electrodeposition",
    authors: "Nicholas Sinclair*, Jiang Luo, Kyobin Park, Madaline Oakes, Benjamin Martin, Ashwin Balakrishnan, Justin G. Connell, Donghyeon Kang, Rohan Akolkar*",
    vol: "172", pages: "062503",
    url: "https://iopscience.iop.org/article/10.1149/1945-7111/ade0ee",
    img: "p13.jpg", tags: ["Electrolyte", "Electrodeposition"]
  },
  {
    n: 12, year: 2025, journal: "Advanced Energy Materials",
    title: "Mechano-electrochemical healing at the interphase between LiNi₀.₈Co₀.₁Mn₀.₁O₂ and Li₆PS₅Cl in all-solid-state batteries",
    authors: "Seonghyun Lee, Taehun Kim, Kanghyeon Kim, Gawon Song, Junsung Park, Minseon Lee, Hyeseung Jung, Kyobin Park, Seung Hyun Choi, Juyeop Song, Kyu Tae Lee*",
    vol: "15", pages: "2405782",
    url: "https://advanced.onlinelibrary.wiley.com/doi/abs/10.1002/aenm.202405782",
    img: "p12.jpg", tags: ["All-solid-state", "Interphase", "Pressure"]
  },
  {
    n: 11, year: 2025, journal: "ACS Applied Materials & Interfaces",
    title: "Molecular level understanding of polyethylene terephthalate (PET) depolymerization in base/alcohol hybrid systems",
    authors: "Hyejin Yu†, Younghoon Oh†, Yu Lim Kim, Cong Liu, Kyobin Park, Hyun Gil Cha, Massimiliano Delferro, Donghyeon Kang*",
    vol: "17", pages: "21097–21109",
    url: "https://pubs.acs.org/doi/abs/10.1021/acsami.4c20887",
    img: "p11.jpg", tags: ["Recycling", "Mechanism"]
  },
  {
    n: 10, year: 2024, journal: "Chemistry of Materials",
    title: "Active–inactive molten salt synthesis of Li- and Mn-rich layered oxide single crystals as cathode materials for all-solid-state batteries",
    authors: "Seung Hyun Choi†, Gawon Song†, Kyobin Park, Soon-Kie Hong, Byunghyun Yun, Suyeon Lee, Kyu Tae Lee*",
    vol: "36", pages: "9666–9676",
    url: "https://pubs.acs.org/doi/abs/10.1021/acs.chemmater.4c01762",
    img: "p10.jpg", tags: ["Cathode", "All-solid-state"]
  },
  {
    n: 9, year: 2024, journal: "Advanced Materials",
    title: "Electrolyte design for high-voltage lithium-metal batteries with synthetic sulfonamide-based solvent and electrochemically active additives",
    authors: "Saehun Kim†, Ji Hwan Jeon†, Kyobin Park†, Seong Hyeon Kweon†, Jae-Hwan Hyun, Chaeeun Song, Donghyun Lee, Gawon Song, Seung-Ho Yu, Tae Kyung Lee, Sang Kyu Kwak*, Kyu Tae Lee*, Sung You Hong*, Nam-Soon Choi*",
    vol: "36", pages: "2401615",
    url: "https://advanced.onlinelibrary.wiley.com/doi/abs/10.1002/adma.202401615",
    img: "p09.jpg", tags: ["Electrolyte", "High voltage", "Li metal"]
  },
  {
    n: 8, year: 2023, journal: "Batteries & Supercaps",
    title: "Fast charging lithium metal batteries with liquid and solid-state electrolytes",
    authors: "Kyobin Park†, Juyeop Song†, Kyu Tae Lee*",
    vol: "6", pages: "e202300344",
    url: "https://chemistry-europe.onlinelibrary.wiley.com/doi/10.1002/batt.202300344",
    img: null, tags: ["Review", "Fast charging", "Li metal"]
  },
  {
    n: 7, year: 2023, journal: "Advanced Science", featured: true,
    title: "Operando spatial pressure mapping analysis for prototype lithium metal pouch cells under practical conditions",
    authors: "Kyobin Park, Myungjae Lee, Jongchan Song, A Reum Ha, Seongmin Ha, Seunghyeon Jo, Juyeop Song, Seung Hyun Choi, Wonkeun Kim, Kyunghan Ryu, Jaewook Nam*, Kyu Tae Lee*",
    vol: "10", pages: "2304979",
    url: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202304979",
    img: "p07.jpg", tags: ["Operando", "Pressure", "Pouch cell"]
  },
  {
    n: 6, year: 2023, journal: "Advanced Functional Materials",
    title: "Contrasting miscibility of ionic liquid membranes for nearly perfect proton selectivity in aqueous redox flow batteries",
    authors: "Jungho Lee, Seulwoo Kim, Kyobin Park, Hansol Koo, Chanui Park, Yuwon Park, Won Bo Lee, Young Joo Lee*, Kyu Tae Lee*",
    vol: "33", pages: "2306633",
    url: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/adfm.202306633",
    img: "p06.jpg", tags: ["Redox flow", "Membrane"]
  },
  {
    n: 5, year: 2022, journal: "Advanced Science",
    title: "Correlation between redox potential and solvation structure in biphasic electrolytes for Li metal batteries",
    authors: "Kyobin Park, Dong-Min Kim, Kwang-Ho Ha, Bomee Kwon, Jeonghyeop Lee, Seunghyeon Jo, Xiulei Ji, Kyu Tae Lee*",
    vol: "9", pages: "2203443",
    url: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202203443",
    img: "p05.jpg", tags: ["Solvation", "Electrolyte", "Li metal"]
  },
  {
    n: 4, year: 2022, journal: "Journal of Materials Chemistry A",
    title: "The roles of nucleation and growth kinetics in determining Li metal morphology for Li metal batteries: columnar versus spherical growth",
    authors: "Seunghyeon Jo, Bomee Kwon, Jeongeun Oh, Jeonghyeop Lee, Kyobin Park, Kyu Tae Lee*",
    vol: "10", pages: "5520–5529",
    url: "https://pubs.rsc.org/en/content/articlelanding/2022/ta/d1ta09481e",
    img: "p04.jpg", tags: ["Li metal", "Nucleation"]
  },
  {
    n: 3, year: 2021, journal: "Journal of Materials Chemistry A",
    title: "Janus behaviour of LiFSI- and LiPF₆-based electrolytes for Li metal batteries: chemical corrosion versus galvanic corrosion",
    authors: "Bomee Kwon, Jeonghyeop Lee, Hyunchul Kim, Dong-Min Kim, Kyobin Park, Seunghyeon Jo, Kyu Tae Lee*",
    vol: "9", pages: "24993–25003",
    url: "https://pubs.rsc.org/en/content/articlelanding/2021/ta/d1ta07860g",
    img: "p03.jpg", tags: ["Electrolyte", "Corrosion"]
  },
  {
    n: 2, year: 2021, journal: "Advanced Materials Interfaces",
    title: "Complex growth behavior of Li dendrites in Al₂O₃ nanoparticles-driven viscoelastic electrolytes for lithium metal batteries: dynamic versus quasistatic rheology",
    authors: "Kyobin Park†, Myungjae Lee†, Dong-Min Kim, Bomee Kwon, Jeonghyeop Lee, Seunghyeon Jo, Jaewook Nam*, Kyu Tae Lee*",
    vol: "8", pages: "2100687",
    url: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/admi.202100687",
    img: "p02.jpg", tags: ["Rheology", "Li dendrite"]
  },
  {
    n: 1, year: 2021, journal: "ACS Applied Materials & Interfaces",
    title: "Three-dimensional porous frameworks for Li metal batteries: superconformal versus conformal Li growth",
    authors: "Jeonghyeop Lee†, Eun-Seo Won†, Dong-Min Kim, Hyunchul Kim, Bomee Kwon, Kyobin Park, Seunghyeon Jo, Suyeon Lee, Jong-Won Lee*, Kyu Tae Lee*",
    vol: "13", pages: "33056–33065",
    url: "https://pubs.acs.org/doi/abs/10.1021/acsami.1c07856",
    img: null, tags: ["Li metal", "3D host"]
  }
];
