(function () {
  'use strict';
  /* 경력 데이터 — 스토리는 story 칸에 쓰면 해당 활동이 큰 카드로 나온다 */
  const CAREER = [
 {
  "y": 2016,
  "org": "서울특별시 내친구서울",
  "role": "어린이 기자",
  "period": "2016 — 2017",
  "tag": "저널리즘",
  "desc": "",
  "story": "서울시 어린이 기자로 활동한 2016년이 이 연표의 첫 줄이다. 통일부, 한국경제신문으로 이어지는 기자 이력은 여기서 시작됐다.",
  "f": true
 },
 {
  "y": 2017,
  "org": "DIAT 디지털정보활용능력",
  "role": "프레젠테이션(PPT) 부문 고급",
  "period": "2017.03.17",
  "tag": "자격",
  "desc": "한국정보통신진흥협회",
  "story": "",
  "f": false
 },
 {
  "y": 2018,
  "org": "키자니아 서울",
  "role": "제9대 어린이 의원",
  "period": "2018 — 2019",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2018,
  "org": "한국청소년상담복지개발원 솔리언 또래상담",
  "role": "과정 수료",
  "period": "2018",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2019,
  "org": "통일부",
  "role": "제8기 어린이 기자",
  "period": "2019 — 2020",
  "tag": "저널리즘",
  "desc": "",
  "story": "제8기 어린이 기자. 2019년부터 1년간 통일부 소속으로 취재했다. 서울시를 넘어 중앙부처 단위로 무대가 넓어진 첫 활동이다.",
  "f": true
 },
 {
  "y": 2019,
  "org": "서울교육대학교 과학영재교육원",
  "role": "소프트웨어 영역 기초과정 수료",
  "period": "2019.04 — 2020.02",
  "tag": "학력",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2020,
  "org": "청소년 언론 '청라온'",
  "role": "선임기자",
  "period": "2020 — 2024",
  "tag": "저널리즘",
  "desc": "주요 사회 현안 심층 취재 및 교육·청년 정책 비평 기사 집필",
  "story": "2020년부터 2024년까지 4년간 청소년 언론 '청라온'에서 선임기자로 기사를 썼다. 사회 이슈와 정책의 이면을 분석하는 글이 주 종목이었다. 이 기간 안에 수완뉴스, 한국경제신문, 에듀뉴스 활동이 겹쳐 있다.",
  "f": true
 },
 {
  "y": 2020,
  "org": "청소년 단체 '유니엄'",
  "role": "대표이사",
  "period": "2020 — 2022",
  "tag": "시민 참여",
  "desc": "조직 운영 총괄 및 청소년 사회참여 프로젝트 기획·실행",
  "story": "2020년부터 2022년까지 청소년 단체 '유니엄'의 대표이사를 맡았다. 청소년 참여·활동 사업을 기획하고 실행하는 일을 총괄했다. 같은 해 시작한 여성가족부 청소년특별회의 활동과 나란히 이어졌다.",
  "f": true
 },
 {
  "y": 2020,
  "org": "여성가족부 제16회 청소년특별회의",
  "role": "본회의 위원 · 온라인소통팀장",
  "period": "2020 — 2021",
  "tag": "시민 참여",
  "desc": "국가 청소년 정책 의제 발굴 및 대정부 제안",
  "story": "제16회 청소년특별회의 본회의 위원으로 선발돼 온라인소통팀장을 맡았다. 국가 청소년 정책 의제를 발굴해 정부에 제안하는 자리였고, 2021년까지 이어졌다.",
  "f": true
 },
 {
  "y": 2020,
  "org": "수완뉴스",
  "role": "청소년 기자",
  "period": "2020 — 2022",
  "tag": "저널리즘",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2020,
  "org": "저작거리 감성매거진 '글로밥상'",
  "role": "필진",
  "period": "2020 — 2022",
  "tag": "저널리즘",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2020,
  "org": "한국미래청년청소년정책연구회",
  "role": "대외소통국장",
  "period": "2020 — 2021",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2020,
  "org": "아동정책영향평가 공모전 슬로건 부문",
  "role": "최우수상 (아동권리보장원장상)",
  "period": "2020.12.17",
  "tag": "수상",
  "desc": "아동권리보장원",
  "story": "",
  "f": false
 },
 {
  "y": 2021,
  "org": "고명중학교",
  "role": "학생회 차장",
  "period": "2021",
  "tag": "학생 자치",
  "desc": "학생 자치 행사 기획 및 부서 간 실무 조율",
  "story": "",
  "f": false
 },
 {
  "y": 2021,
  "org": "청소년기후행동 기후정치크루",
  "role": "",
  "period": "2021 — 2022",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2021,
  "org": "대통령 직속 국가교육회의",
  "role": "국민참여단",
  "period": "2021",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2021,
  "org": "성북구 혁신교육",
  "role": "추진단원",
  "period": "2021",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2021,
  "org": "청소년사회교육혁명포럼 '청춘희망소' 창립준비위원회",
  "role": "홍보소통팀장",
  "period": "2021",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2021,
  "org": "청소년 인권 행동단체 '아수나로'",
  "role": "활동회원",
  "period": "2021",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2021,
  "org": "청소년인권모임",
  "role": "청소년 활동가",
  "period": "2021",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2021,
  "org": "STEMATIX",
  "role": "한국지부 저널리스트",
  "period": "2021",
  "tag": "저널리즘",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2021,
  "org": "아이엠뉴스",
  "role": "시민기자",
  "period": "2021",
  "tag": "저널리즘",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "한국경제신문 주니어 생글생글",
  "role": "기자",
  "period": "2022 — 2024",
  "tag": "저널리즘",
  "desc": "",
  "story": "2022년부터 2024년까지 한국경제신문 주니어 생글생글 기자로 기사를 썼다. '청라온' 선임기자, 에듀뉴스 학생기자와 같은 시기다.",
  "f": true
 },
 {
  "y": 2022,
  "org": "서울특별시교육청 학생참여단",
  "role": "제11·12·13기 위원",
  "period": "2022 — 2025",
  "tag": "시민 참여",
  "desc": "서울 교육 정책 자문 및 학생 인권 의제화",
  "story": "제11기, 제12기, 제13기에 걸쳐 연임하며 2022년부터 2025년까지 활동했다. 서울 교육 정책에 의견을 내고 학생 인권을 의제로 올렸다. 같은 기간 대일외고에서는 안전관리부와 학생회장직을 맡았다.",
  "f": true
 },
 {
  "y": 2022,
  "org": "제19회 전국장애인과 함께하는 문예글짓기 대회",
  "role": "대상 (통일부장관상)",
  "period": "2022.11.07",
  "tag": "수상",
  "desc": "사단법인 한국장애인유권자연맹",
  "story": "2022년 제19회 전국장애인과 함께하는 문예글짓기 대회에서 대상(통일부장관상)을 받았다. 그 해 일곱 편을 출품해 여섯 편이 수상했다.",
  "f": true
 },
 {
  "y": 2022,
  "org": "고명중학교",
  "role": "학생회 생활교육부장",
  "period": "2022",
  "tag": "학생 자치",
  "desc": "자율적 학생 생활 규범 확립 및 교내 문화 개선 캠페인 총괄",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "에듀뉴스",
  "role": "학생기자",
  "period": "2022 — 2024",
  "tag": "저널리즘",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "금융소비자연맹",
  "role": "청소년소비자기자",
  "period": "2022",
  "tag": "저널리즘",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "국민권익위원회 국민생각함",
  "role": "국민패널",
  "period": "2022 — 2025",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "사이버외교사절단 반크",
  "role": "청년공공외교대사 9기",
  "period": "2022",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "청년너울 청소년위원회",
  "role": "위원",
  "period": "2022 — 2023",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "전국학생협회 '새싹'",
  "role": "대외협력실장 · 인사위원장",
  "period": "2022",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "그린피스(Greenpeace)",
  "role": "자원봉사자",
  "period": "2022",
  "tag": "시민 참여",
  "desc": "",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "2022 청소년 세금작품공모전 글짓기 부문",
  "role": "금상 (서울지방국세청장상)",
  "period": "2022.09.30",
  "tag": "수상",
  "desc": "국세청",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "제9회 대한민국청소년기자대상 글 기사 부문",
  "role": "서울시립청소년미디어센터관장상",
  "period": "2022.11.12",
  "tag": "수상",
  "desc": "서울시립청소년미디어센터",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "2022 청소년 소비자 기사·포스터 공모전 기사 부문",
  "role": "장려상 (금융소비자연맹회장상)",
  "period": "2022.12.27",
  "tag": "수상",
  "desc": "금융소비자연맹",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "제7회 전국 감사편지 공모전",
  "role": "장려상 (초록우산 어린이재단회장상)",
  "period": "2022.11.22",
  "tag": "수상",
  "desc": "초록우산 어린이재단",
  "story": "",
  "f": false
 },
 {
  "y": 2022,
  "org": "제8회 극지·해양 도서 독후감 및 콘텐츠 감상문 공모전",
  "role": "입선 (이사장상)",
  "period": "2022.09.16",
  "tag": "수상",
  "desc": "사단법인 극지해양미래포럼",
  "story": "",
  "f": false
 },
 {
  "y": 2023,
  "org": "대일외국어고등학교",
  "role": "학생회 안전관리부 차장",
  "period": "2023 — 2024",
  "tag": "학생 자치",
  "desc": "학생대의원회의 운영 기획 및 교내 안전 정책 수립",
  "story": "",
  "f": false
 },
 {
  "y": 2024,
  "org": "대일외국어고등학교",
  "role": "제40대 총학생회장",
  "period": "2024 — 2025",
  "tag": "학생 자치",
  "desc": "학생 자치 기구 총괄, 학내 거버넌스 개편 및 학생 권익 증진 사업 주도",
  "story": "고명중학교 학생회 차장에서 출발해 생활교육부장, 대일외국어고등학교 안전관리부 차장과 부장을 거쳐 제40대 총학생회장에 올랐다. 학내 거버넌스 개편과 학생 권익 증진 사업을 이끌었다. 임기는 2024년부터 2025년까지다.",
  "f": true
 },
 {
  "y": 2024,
  "org": "대일외국어고등학교",
  "role": "학생회 안전관리부장",
  "period": "2024 — 2025",
  "tag": "학생 자치",
  "desc": "학생대의원회의 의장단 실무 및 학내 안전·생활 규범 정비",
  "story": "",
  "f": false
 },
 {
  "y": 2025,
  "org": "이건호 대일수학 연구팀",
  "role": "문항 출제 · 클리닉 전담 TA",
  "period": "2025 — 현재",
  "tag": "교육",
  "desc": "고등 수학(공통·확률과 통계) 자체 문항 개발 및 소수 정예 밀착 클리닉",
  "story": "2025년부터 문항 출제와 클리닉을 함께 맡고 있다. 공통 과목과 확률과 통계 문항을 직접 개발하고, 소수 정예 클리닉에서 질의응답과 학습 관리를 한다. 지금도 이어지는 활동이다.",
  "f": true
 },
 {
  "y": 2025,
  "org": "성북학림학원",
  "role": "수학 클리닉 전담 TA",
  "period": "2025 — 2026",
  "tag": "교육",
  "desc": "대일외고 윈터스쿨 과정 수학 질의응답 및 개인별 취약점 진단·관리",
  "story": "",
  "f": false
 },
 {
  "y": 2026,
  "org": "대성학력개발연구소",
  "role": "모의고사 검토위원",
  "period": "2026 — 현재",
  "tag": "교육",
  "desc": "전국연합 모의고사 수능 영어 영역 문항 정합성 검토 및 출제 피드백",
  "story": "2026년부터 전국연합 모의고사 수능 영어 영역 문항의 정합성을 검토하고 출제 피드백을 준다. 수학 문항을 만드는 일과 영어 문항을 검토하는 일이 한 사람의 이력에 같이 올라 있다.",
  "f": true
 },
 {
  "y": 2026,
  "org": "진학사 진학레터 '잇다'",
  "role": "전문 에디터",
  "period": "2026",
  "tag": "교육",
  "desc": "학생부종합전형 평가 요소 분석 및 심화 탐구 전략 칼럼 집필",
  "story": "",
  "f": false
 },
 {
  "y": 2026,
  "org": "성평등가족부 청년 공존·공감위원회",
  "role": "제1기 참여위원",
  "period": "2026",
  "tag": "시민 참여",
  "desc": "청년 세대 갈등 해소 및 정책 대안 도출",
  "story": "",
  "f": false
 }
];

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ── render ── */
  const years = [...new Set(CAREER.map(e => e.y))].sort((a, b) => a - b);
  const html = years.map(y => {
    const items = CAREER.filter(e => e.y === y).sort((a, b) => (b.f ? 1 : 0) - (a.f ? 1 : 0));
    return '<section class="yr" id="y' + y + '"><div class="yr-n">' + y + '</div><div class="yr-list">' + items.map(e => {
      if (e.story) {
        return '<article class="ent f"><div class="meta"><span class="tag">' + esc(e.tag) + '</span><span class="per">' + esc(e.period) + '</span></div>' +
          '<span class="org">' + esc(e.org) + '</span>' + (e.role ? '<p class="role">' + esc(e.role) + '</p>' : '') +
          (e.desc ? '<p class="desc">' + esc(e.desc) + '</p>' : '') + '<p class="story">' + esc(e.story) + '</p></article>';
      }
      return '<article class="ent c"><div><span class="org">' + esc(e.org) + '</span>' + (e.role ? ' <span class="role">· ' + esc(e.role) + '</span>' : '') + '</div>' +
        '<span class="per">' + esc(e.period) + '</span>' + (e.desc ? '<p class="desc">' + esc(e.desc) + '</p>' : '') + '</article>';
    }).join('') + '</div></section>';
  }).join('');
  $('#career').innerHTML = html;
  $('#rail').innerHTML = years.map(y => '<a href="#y' + y + '">' + y + '</a>').join('');

  /* ── reveal + active year ── */
  const ents = $$('.ent');
  if (reduce) ents.forEach(e => e.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1, rootMargin: '0px 0px -40px 0px' });
    ents.forEach(e => io.observe(e));
  }
  const links = $$('#rail a');
  const yo = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    $$('.yr').forEach(s => s.classList.toggle('on', s === e.target));
    links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('.yr').forEach(s => yo.observe(s));

  const rail = $('#rail'), firstYr = $('.yr');
  const now = $('.c-now');
  const showRail = () => rail.classList.toggle('show', firstYr.getBoundingClientRect().top < innerHeight * .6 && now.getBoundingClientRect().top > innerHeight * .45);
  addEventListener('scroll', showRail, { passive: true }); showRail();

  /* ── aurora (same shader as the landing) ── */
  const mouse = { nx: .5, ny: .5 };
  addEventListener('pointermove', e => { mouse.nx = e.clientX / innerWidth; mouse.ny = e.clientY / innerHeight; }, { passive: true });
  let scrollProg = 0;
  addEventListener('scroll', () => { scrollProg = Math.min(1, Math.max(0, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight))); }, { passive: true });
  /* ───────── WebGL aurora background ───────── */
  (function () {
    const cv = $('#gl'); if (!cv) return;
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) { cv.style.background = 'radial-gradient(60% 50% at 70% 20%,rgba(59,116,196,.22),transparent),var(--color-bg)'; return; }
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;uniform float s;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*1.5;
  vec2 q=vec2(fbm(p+t*.04),fbm(p+vec2(5.2,1.3)-t*.035));
  float f=fbm(p+2.2*q+vec2(0.,s*1.6));
  vec3 base=vec3(.020,.027,.043);
  vec3 blue=vec3(.231,.455,.769);
  vec3 amber=vec3(.88,.56,.23);
  vec3 c=base;
  c=mix(c,blue*.40,smoothstep(.42,.98,f));
  c+=amber*.12*smoothstep(.55,1.,q.x*q.y*2.4);
  float d=distance(uv,vec2(m.x,1.-m.y));
  c+=blue*.26*exp(-d*d*9.);
  float v=smoothstep(1.25,.25,distance(uv,vec2(.5)));
  c*=mix(.35,1.,v);
  c*=mix(1.,.5,s);
  gl_FragColor=vec4(c,1.);
}`;
    const mk = (type, src) => { const sh = gl.createShader(type); gl.shaderSource(sh, src); gl.compileShader(sh); return sh; };
    const pr = gl.createProgram(); gl.attachShader(pr, mk(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, mk(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { cv.style.background = 'var(--color-bg)'; return; }
    gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(pr, n), ur = U('r'), ut = U('t'), um = U('m'), us = U('s');
    const scale = .5; let mx = .5, my = .5;
    const size = () => { cv.width = Math.max(2, innerWidth * scale); cv.height = Math.max(2, innerHeight * scale); gl.viewport(0, 0, cv.width, cv.height); };
    size(); addEventListener('resize', size);
    const draw = ms => {
      mx = lerp(mx, mouse.nx, .04); my = lerp(my, mouse.ny, .04);
      gl.uniform2f(ur, cv.width, cv.height); gl.uniform1f(ut, ms * .001); gl.uniform2f(um, mx, my); gl.uniform1f(us, scrollProg);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    if (reduce) { draw(8000); return; }
    let on = true;
    document.addEventListener('visibilitychange', () => { on = !document.hidden; });
    const loop = t => { if (on) draw(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  })();
})();
