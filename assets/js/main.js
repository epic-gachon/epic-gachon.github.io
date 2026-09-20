/* =====================================================================
   EPIC Lab — site behaviour
   nav scroll state · scroll-spy · mobile menu · reveal · lightbox ·
   publications & news rendering from data/*.js
   ===================================================================== */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  // always open a page at the very top unless a #section was requested
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) window.scrollTo(0, 0);
  window.addEventListener("pageshow", () => { if (!location.hash) window.scrollTo(0, 0); });

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const PI = "Kyobin Park";
  const citeOf = (p) => `<i>${esc(p.journal)}</i>, <b>${esc(p.vol)}</b>, ${esc(p.pages)} (${esc(p.year)})`;
  const boldPI = (authors) => esc(authors).replace(new RegExp(PI + "[†*]*", "g"), (m) => `<b>${m}</b>`);

  /* ---------- Nav: solid on scroll ---------- */
  const nav = $(".nav");
  const toTop = $(".to-top");
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("scrolled", y > 24);
    if (toTop) toTop.classList.toggle("show", y > 600);
  };
  /* scroll progress bar under the nav */
  const bar = document.createElement("div"); bar.className = "scroll-progress"; document.body.appendChild(bar);
  const onProgress = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`;
  };
  window.addEventListener("scroll", () => { onScroll(); onProgress(); }, { passive: true });
  window.addEventListener("resize", onProgress);
  onScroll(); onProgress();
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Sub-navigation (Members / News pages): sticky pills + scroll-spy ---------- */
  const subnav = $("#subnav");
  if (subnav) {
    document.documentElement.classList.add("has-subnav");
    const pills = $$("a[data-spy]", subnav);
    const targets = pills.map((a) => $("#" + a.dataset.spy)).filter(Boolean);
    const setActive = (id) => pills.forEach((a) => a.classList.toggle("active", a.dataset.spy === id));
    const spy = () => {
      const line = window.scrollY + parseInt(getComputedStyle(document.documentElement).scrollPaddingTop || "120", 10) + 40;
      let cur = targets[0] && targets[0].id;
      targets.forEach((t) => { if (t.offsetTop <= line) cur = t.id; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 && targets.length) cur = targets[targets.length - 1].id;
      setActive(cur);
    };
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("load", spy);
    spy();
    pills.forEach((a) => a.addEventListener("click", () => setActive(a.dataset.spy)));
  }

  /* ---------- Mobile menu ---------- */
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) { links.classList.remove("open"); toggle.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ---------- Dropdown (touch / keyboard) ---------- */
  $$(".has-sub").forEach((li) => {
    const trigger = $(":scope > a", li);
    trigger.addEventListener("click", (e) => {
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      const coarse = window.matchMedia("(hover: none)").matches;
      if (!mobile && coarse && !li.classList.contains("open")) { e.preventDefault(); li.classList.add("open"); trigger.setAttribute("aria-expanded", "true"); }
    });
    trigger.addEventListener("keydown", (e) => { if (e.key === "ArrowDown") { e.preventDefault(); $(".sub a", li)?.focus(); } });
    document.addEventListener("click", (e) => { if (!li.contains(e.target)) { li.classList.remove("open"); trigger.setAttribute("aria-expanded", "false"); } });
  });

  /* ---------- Scroll-spy (home only) ---------- */
  const spyLinks = $$('.nav-links > li > a[href^="#"]');
  const sections = spyLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  if (sections.length) {
    const setActive = (id) => spyLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
    const pick = () => {
      const line = (window.innerHeight * 0.35);
      let current = null;
      for (const s of sections) { if (s.getBoundingClientRect().top <= line) current = s.id; }
      // at the very bottom, the last section wins
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1].id;
      setActive(current);
    };
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    pick();
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else { reveals.forEach((el) => el.classList.add("in")); }

  /* ---------- Lightbox (glass overlay, spring-in image, keyboard + backdrop close) ---------- */
  const lb = $(".lightbox");
  if (lb) {
    const img = $("img", lb), cap = $(".cap", lb);
    let lastFocus = null;
    const open = (src, caption) => {
      lastFocus = document.activeElement;
      img.src = src; img.alt = caption || ""; cap.textContent = caption || ""; cap.style.display = caption ? "" : "none";
      lb.classList.add("open"); document.body.style.overflow = "hidden";
      requestAnimationFrame(() => lb.classList.add("in"));
      $(".close", lb)?.focus();
    };
    const close = () => {
      if (!lb.classList.contains("open")) return;
      lb.classList.remove("in");
      setTimeout(() => { lb.classList.remove("open"); document.body.style.overflow = ""; img.src = ""; lastFocus && lastFocus.focus && lastFocus.focus(); }, 260);
    };
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-lightbox]");
      if (t) { e.preventDefault(); open(t.getAttribute("data-lightbox"), t.getAttribute("data-caption")); }
    });
    lb.addEventListener("click", (e) => { if (e.target === lb || e.target.closest(".close") || e.target === img) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------- Page transitions: fade-in on arrival, fade-out before leaving ---------- */
  document.documentElement.classList.add("js");
  requestAnimationFrame(() => document.documentElement.classList.add("page-in"));
  window.addEventListener("pageshow", (e) => { if (e.persisted) document.documentElement.classList.remove("page-out"); });
  if (!(document.startViewTransition && CSS.supports && CSS.supports("view-transition-name: x"))) {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (a.target === "_blank" || a.hasAttribute("download") || a.origin !== location.origin) return;
      const url = new URL(a.href);
      if (url.pathname === location.pathname) return;                      // same page (hash / tabs / pager)
      e.preventDefault(); document.documentElement.classList.add("page-out");
      setTimeout(() => { location.href = a.href; }, 220);
    });
  }

  /* ---------- Publications ---------- */
  const pubs = window.EPIC_PUBS || [];
  const pubCard = (p) => `
    <article class="pub-card reveal">
      <div class="thumb">${p.img ? `<img src="assets/img/pubs/${p.img}" alt="" loading="lazy">` : `<span class="nofig">${esc(p.year)}</span>`}</div>
      <div>
        <div class="meta"><span class="journal">${esc(p.journal)}</span><span class="year">${esc(p.year)}</span></div>
        <h4><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)}</a></h4>
        <p class="authors">${boldPI(p.authors)}</p>
        <p class="cite">${citeOf(p)}</p>
      </div>
    </article>`;
  const featuredBox = $("#pub-featured");
  if (featuredBox) featuredBox.innerHTML = pubs.filter((p) => p.featured).slice(0, 4).map(pubCard).join("");
  const recentBox = $("#pub-recent");
  if (recentBox) recentBox.innerHTML = pubs.slice(0, 4).map(pubCard).join("");
  $$("[data-count-pubs]").forEach((el) => { el.textContent = pubs.length; });

  const listBox = $("#pub-list");
  if (listBox) {
    const years = [...new Set(pubs.map((p) => p.year))].sort((a, b) => b - a);
    const recent = years.slice(0, 4);
    const filtersBox = $("#pub-filters");
    const countEl = $("#pub-count");
    const linkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
    const row = (p) => `
      <article class="pub-row" data-pubyear="${p.year}">
        <div class="idx">${String(p.n).padStart(2, "0")}</div>
        <div class="thumb">${p.img ? `<a href="#" data-lightbox="assets/img/pubs/${p.img}" data-caption="${esc(p.journal)} · ${esc(p.year)}"><img src="assets/img/pubs/${p.img}" alt="" loading="lazy"></a>` : `<span class="nofig">${esc(p.year)}</span>`}</div>
        <div>
          <div class="meta"><span class="journal">${esc(p.journal)}</span><span class="year">${esc(p.year)}</span></div>
          <h3><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
          <p class="authors">${boldPI(p.authors)}</p>
          <p class="cite">${citeOf(p)}</p>
          <div class="actions">
            <a class="link" href="${esc(p.url)}" target="_blank" rel="noopener">${linkIcon} Article</a>
          </div>
        </div>
      </article>`;
    const render = (filter) => {
      let list = pubs;
      if (filter === "earlier") list = pubs.filter((p) => !recent.includes(p.year));
      else if (filter !== "all") list = pubs.filter((p) => p.year === Number(filter));
      let html = "", lastYear = null;
      list.forEach((p) => {
        if (p.year !== lastYear) { html += `<div class="year-divider">${p.year}</div>`; lastYear = p.year; }
        html += row(p);
      });
      listBox.innerHTML = html || `<p class="lead">No publications in this range.</p>`;
      if (countEl) countEl.textContent = `${list.length} of ${pubs.length} papers`;
    };
    if (filtersBox) {
      const opts = [["all", "All"], ...recent.map((y) => [String(y), String(y)]), ...(years.length > recent.length ? [["earlier", "Earlier"]] : [])];
      filtersBox.innerHTML = opts.map(([v, l], i) => `<button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${v}" type="button">${l}</button>`).join("");
      filtersBox.addEventListener("click", (e) => {
        const b = e.target.closest(".filter-btn"); if (!b) return;
        $$(".filter-btn", filtersBox).forEach((x) => x.classList.toggle("active", x === b));
        render(b.dataset.filter);
      });
    }
    render("all");
  }

  /* ---------- News ---------- */
  const news = window.EPIC_NEWS || [];
  const newsCard = (n, extra = "") => `
    <article class="news-card reveal ${extra}">
      <div class="media${n.img ? "" : " noimg"}">
        ${n.img ? `<img src="assets/img/${n.img}" alt="" loading="lazy"${n.img.startsWith("pubs/") ? ' class="contain"' : ""}>` : `<span class="big"><small>${esc(n.type)}</small>${esc(n.date)}</span>`}
        ${n.img ? `<span class="tag ${esc(n.type)}">${esc(n.type)}</span>` : ""}
      </div>
      <div class="body">
        <span class="date">${esc(n.date)}</span>
        <h4>${n.link ? `<a href="${esc(n.link)}" ${/^https?:/.test(n.link) ? 'target="_blank" rel="noopener"' : ""}>${esc(n.title)}</a>` : esc(n.title)}</h4>
        <p>${esc(n.text)}</p>
        ${n.link ? `<span class="more">Read more <span aria-hidden="true">→</span></span>` : ""}
      </div>
    </article>`;
  const newsHome = $("#news-home");
  if (newsHome) newsHome.innerHTML = news.slice(0, 3).map((n) => newsCard(n)).join("");
  const newsTotal = news.length;
  const TYPE_KR = { Notice: "공지", Recruiting: "모집", Grant: "과제", Publication: "논문", Seminar: "세미나", Award: "수상", Event: "행사", Talk: "발표" };
  const chev = `<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
  const newsRow = (n, i) => {
    const hasDetail = !!(n.text || n.link || n.img);
    const ext = n.link && /^https?:/.test(n.link) ? ' target="_blank" rel="noopener"' : "";
    return `
      <li class="news-row reveal${hasDetail ? " expandable" : ""}">
        <div class="idx">${String(newsTotal - i).padStart(2, "0")}</div>
        <span class="date">${esc(n.date)}</span>
        <span class="tagcol"><span class="tag ${esc(n.type)}">${esc(TYPE_KR[n.type] || n.type)}</span></span>
        <div class="nr-body">
          <h3>${hasDetail ? `<button type="button" class="nr-toggle" aria-expanded="false"><span>${esc(n.title)}</span>${chev}</button>` : `<span class="nr-title">${esc(n.title)}</span>`}</h3>
          ${hasDetail ? `<div class="nr-detail"><div class="nr-detail-in">
            ${n.text ? `<p>${esc(n.text)}</p>` : ""}
            ${n.img ? `<a class="nr-img" href="#" data-lightbox="assets/img/${esc(n.img)}" data-caption="${esc(n.title)}"><img src="assets/img/${esc(n.img)}" alt="" loading="lazy"></a>` : ""}
            ${n.link ? `<a class="nr-link" href="${esc(n.link)}"${ext}>Read more <span aria-hidden="true">→</span></a>` : ""}
          </div></div>` : ""}
        </div>
      </li>`;
  };
  const bindNewsToggle = (list) => list.addEventListener("click", (e) => {
    const li = e.target.closest(".news-row.expandable");
    if (!li || e.target.closest("a")) return;
    const open = li.classList.toggle("open");
    const btn = li.querySelector(".nr-toggle");
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  const newsAll = $("#news-all");
  if (newsAll) {
    const PER = 8, pages = Math.max(1, Math.ceil(news.length / PER));
    let pager = $("#news-pager");
    if (!pager) { pager = document.createElement("nav"); pager.id = "news-pager"; pager.className = "pager"; pager.setAttribute("aria-label", "News pages"); newsAll.after(pager); }
    const renderPage = (pg, scroll) => {
      pg = Math.min(pages, Math.max(1, pg));
      const start = (pg - 1) * PER;
      newsAll.innerHTML = news.slice(start, start + PER).map((n, i) => newsRow(n, start + i)).join("");
      $$(".reveal", newsAll).forEach((el) => el.classList.add("in"));
      $$(".news-row.expandable", newsAll).forEach((li) => { li.classList.add("open"); const b = $(".nr-toggle", li); if (b) b.setAttribute("aria-expanded", "true"); });
      pager.innerHTML = [
        `<button type="button" class="pg-arrow" data-pg="${pg - 1}" ${pg === 1 ? "disabled" : ""} aria-label="Previous">‹</button>`,
        ...Array.from({ length: pages }, (_, k) => `<button type="button" class="pg-num${k + 1 === pg ? " active" : ""}" data-pg="${k + 1}" ${k + 1 === pg ? 'aria-current="page"' : ""}>${k + 1}</button>`),
        `<button type="button" class="pg-arrow" data-pg="${pg + 1}" ${pg === pages ? "disabled" : ""} aria-label="Next">›</button>`
      ].join("");
      if (scroll) { const top = $("#news") || newsAll; top.scrollIntoView({ behavior: "smooth", block: "start" }); }
      if (pages > 1) history.replaceState(null, "", pg === 1 ? location.pathname : `${location.pathname}?page=${pg}`);
    };
    pager.addEventListener("click", (e) => { const b = e.target.closest("button[data-pg]"); if (b && !b.disabled) renderPage(+b.dataset.pg, true); });
    bindNewsToggle(newsAll);
    renderPage(+(new URLSearchParams(location.search).get("page") || 1), false);
  }
  const noticeBox = $("#news-list");
  if (noticeBox) { noticeBox.innerHTML = news.slice(0, 5).map(newsRow).join(""); bindNewsToggle(noticeBox); }


  /* ---------- Gallery ---------- */
  const gal = window.EPIC_GALLERY || [];
  const galItem = (g) => `
    <a class="gcard reveal" href="#" data-lightbox="assets/img/${esc(g.src)}" data-caption="${esc(g.cap)}${g.date ? " · " + esc(g.date) : ""}">
      <span class="gcard-img"><img src="assets/img/${esc(g.src)}" alt="${esc(g.cap)}" loading="lazy"></span>
      <span class="gcard-title">${esc(g.cap)}</span>
      ${g.date ? `<span class="gcard-date">${esc(g.date)}</span>` : ""}
    </a>`;
  const soon = (label) => `<div class="gcard soon"><span class="gcard-img"><span class="soon-lbl">Coming soon</span></span><span class="gcard-title">${label}</span></div>`;
  const galHome = $("#gallery-home");
  if (galHome) {
    const items = gal.slice(0, 4).map(galItem);
    const fill = ["Lab photos", "Group meetings", "Conferences"].slice(0, Math.max(0, 4 - items.length)).map(soon);
    galHome.innerHTML = items.concat(fill).join("");
  }
  const galAll = $("#gallery-all");
  if (galAll) {
    const items = gal.map(galItem);
    const fill = ["Lab photos", "Group meetings", "Conferences", "Lab life"].slice(0, Math.max(0, 6 - items.length)).map(soon);
    galAll.innerHTML = items.concat(fill).join("");
  }

  /* ---------- Tabs (members page) ---------- */
  const tabBtns = $$(".tab-btn");
  if (tabBtns.length) {
    const show = (id, push) => {
      tabBtns.forEach((b) => { const on = b.dataset.tab === id; b.classList.toggle("active", on); b.setAttribute("aria-selected", String(on)); });
      $$(".tab-panel").forEach((p) => p.classList.toggle("active", p.id === id));
      $$('.nav-links .sub a').forEach((a) => a.classList.toggle("active", a.getAttribute("href").endsWith("#" + id)));
      if (push) history.replaceState(null, "", "#" + id);
    };
    tabBtns.forEach((b) => b.addEventListener("click", () => show(b.dataset.tab, true)));
    const fromHash = () => { const id = location.hash.replace("#", ""); if (id && $("#" + id + ".tab-panel")) show(id, false); };
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  // re-observe dynamically rendered reveals
  $$(".reveal:not(.in)").forEach((el) => {
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const io = new IntersectionObserver((entries) => { entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }); }, { threshold: 0.05 });
    io.observe(el);
  });

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();

/* =====================================================================
   Hero: two species meet at the interphase
   Cyan ions come from the left, lime from the right. Each carries a
   solvation shell, sheds it near the central band, and when a cyan and a
   lime meet there they react: a flash, a ripple on the band, and a bonded
   node that joins the growing interphase network. Pauses off-screen;
   disabled for reduced-motion users.
   ===================================================================== */
(() => {
  const cv = document.querySelector(".hero-atoms");
  if (!cv || !cv.getContext) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = cv.getContext("2d");
  const hero = cv.closest(".hero") || cv.parentElement;
  const CYAN = "25,195,222", LIME = "184,240,75", WHITE = "255,255,255";
  const rnd = (a, b) => a + Math.random() * (b - a);
  let W = 0, H = 0, dpr = 1, raf = 0, running = false, t0 = performance.now(), last = 0;
  let ions = [], ripples = [], nodes = [], flashes = [], IX = 0, N = 10;

  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + "px"; cv.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    IX = W * 0.505; ripples = []; nodes = []; flashes = [];
    N = W < 700 ? 6 : W < 1100 ? 8 : 11;                          // per side
    ions = [];
    for (let i = 0; i < N; i++) { ions.push(makeIon(-1, rnd(0, IX - 60))); ions.push(makeIon(1, rnd(IX + 60, W))); }
  };
  /* side: -1 = cyan from the left, +1 = lime from the right */
  const makeIon = (side, x, y) => {
    const kind = side < 0 ? CYAN : LIME, nsh = side < 0 ? 3 : 4;
    return { side, kind, x, y: y == null ? rnd(H * 0.08, H * 0.92) : y, r: side < 0 ? 3.2 : 3.8,
      vx: -side * rnd(0.04, 0.12), vy: rnd(-0.08, 0.08), ph: rnd(0, 6.28), sol: 1, wait: 0,
      shell: Array.from({ length: nsh }, (_, i) => ({ a: (i / nsh) * 6.28 + rnd(-.3, .3), r: rnd(9, 13), w: rnd(0.015, 0.03) * (Math.random() < .5 ? 1 : -1) })) };
  };
  const react = (a, b) => {
    const x = (a.x + b.x) / 2, y = (a.y + b.y) / 2;
    flashes.push({ x, y, t: 0 });
    ripples.push({ y, t: 0 });
    nodes.push({ x: IX + rnd(-4, 4), y, a: 0 });
    if (nodes.length > 16) nodes.shift();
  };

  const draw = (now) => {
    if (!running) return;
    const t = (now - t0) / 1000, dt = Math.min(2, (now - last) / 16.7 || 1); last = now;
    ctx.clearRect(0, 0, W, H);

    /* ---- interphase band: two-tone glow (cyan side / lime side) + line + ripples ---- */
    const bg = ctx.createLinearGradient(IX - 44, 0, IX + 44, 0);
    bg.addColorStop(0, `rgba(${CYAN},0)`); bg.addColorStop(0.45, `rgba(${CYAN},0.12)`); bg.addColorStop(0.55, `rgba(${LIME},0.12)`); bg.addColorStop(1, `rgba(${LIME},0)`);
    ctx.fillStyle = bg; ctx.fillRect(IX - 44, 0, 88, H);
    const lg = ctx.createLinearGradient(0, 0, 0, H);
    lg.addColorStop(0, `rgba(${WHITE},0)`); lg.addColorStop(0.5, `rgba(${WHITE},0.5)`); lg.addColorStop(1, `rgba(${WHITE},0)`);
    ctx.strokeStyle = lg; ctx.lineWidth = 1.1; ctx.beginPath();
    for (let y = 0; y <= H; y += 6) {
      let x = IX + Math.sin(y * 0.02 + t * 0.8) * 2;
      for (const r of ripples) { const d = Math.abs(y - r.y) - r.t * 3; x += Math.exp(-(d * d) / 260) * 6 * Math.max(0, 1 - r.t / 60); }
      y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    for (let i = ripples.length - 1; i >= 0; i--) { const r = ripples[i]; r.t += dt; const a = Math.max(0, 1 - r.t / 60);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${CYAN},${(0.45 * a).toFixed(3)})`; ctx.beginPath(); ctx.arc(IX, r.y, 4 + r.t * 1.6, Math.PI / 2, Math.PI * 1.5); ctx.stroke();
      ctx.strokeStyle = `rgba(${LIME},${(0.45 * a).toFixed(3)})`; ctx.beginPath(); ctx.arc(IX, r.y, 4 + r.t * 1.6, -Math.PI / 2, Math.PI / 2); ctx.stroke();
      if (r.t > 60) ripples.splice(i, 1); }
    /* reaction flashes */
    for (let i = flashes.length - 1; i >= 0; i--) { const f = flashes[i]; f.t += dt; const a = Math.max(0, 1 - f.t / 30);
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 26); g.addColorStop(0, `rgba(${WHITE},${(0.7 * a).toFixed(3)})`); g.addColorStop(1, `rgba(${WHITE},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f.x, f.y, 26, 0, 6.28); ctx.fill();
      if (f.t > 30) flashes.splice(i, 1); }

    /* ---- interphase network: bonded pairs (half cyan / half lime) ---- */
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]; a.a = Math.min(1, a.a + 0.02 * dt);
      for (let j = i + 1; j < nodes.length; j++) { const b = nodes[j]; const dy = a.y - b.y, dx = a.x - b.x, d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) { ctx.strokeStyle = `rgba(${WHITE},${(0.14 * Math.min(a.a, b.a) * (1 - Math.sqrt(d2) / 120)).toFixed(3)})`; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
      ctx.fillStyle = `rgba(${CYAN},${(0.6 * a.a).toFixed(3)})`; ctx.beginPath(); ctx.arc(a.x - 2.2, a.y, 1.9, 0, 6.28); ctx.fill();
      ctx.fillStyle = `rgba(${LIME},${(0.6 * a.a).toFixed(3)})`; ctx.beginPath(); ctx.arc(a.x + 2.2, a.y, 1.9, 0, 6.28); ctx.fill();
      ctx.strokeStyle = `rgba(${WHITE},${(0.35 * a.a).toFixed(3)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x - 2.2, a.y); ctx.lineTo(a.x + 2.2, a.y); ctx.stroke();
    }

    /* ---- ions: same-side repulsion, cross-side attraction near the band, links ---- */
    for (let i = 0; i < ions.length; i++) for (let j = i + 1; j < ions.length; j++) {
      const a = ions[i], b = ions[j]; const dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy; if (d2 < 1 || d2 > 110 * 110) continue; const d = Math.sqrt(d2);
      let f;
      if (a.side === b.side) f = d < 30 ? 0.06 * (1 - d / 30) : 0;                                  // crowd control
      else { const nearBand = Math.abs(a.x - IX) < 90 && Math.abs(b.x - IX) < 90; f = nearBand ? -0.03 * (1 - d / 110) : 0; }   // partners pull together
      if (f) { const fx = (dx / d) * f, fy = (dy / d) * f; a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy; }
      if (a.side !== b.side && d < 80) { ctx.strokeStyle = `rgba(${WHITE},${(0.12 * (1 - d / 80)).toFixed(3)})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    /* reactions: a cyan and a lime meet inside the band */
    for (let i = 0; i < ions.length; i++) for (let j = i + 1; j < ions.length; j++) {
      const a = ions[i], b = ions[j]; if (a.side === b.side || a.dead || b.dead) continue;
      if (Math.abs(a.x - IX) < 26 && Math.abs(b.x - IX) < 26) { const dx = a.x - b.x, dy = a.y - b.y; if (dx * dx + dy * dy < 40 * 40) { react(a, b); a.dead = b.dead = true; } }
    }
    ions = ions.filter((p) => !p.dead);

    for (const p of ions) {
      p.ph += 0.02 * dt; p.vy += rnd(-0.02, 0.02); p.vy *= 0.97;
      const d = Math.abs(IX - p.x);                              // distance to the band
      p.vx += -p.side * 0.0004 * dt;                             // gentle field pulling toward the band
      if (d < 90) { p.vx *= 0.975; p.sol = Math.max(0, p.sol - 0.02 * dt); } else p.sol = Math.min(1, p.sol + 0.01 * dt);
      if (d < 22) { p.wait += dt; p.vx *= 0.9; if (p.side * (IX - p.x) > 0) p.vx += p.side * 0.02; } // hover at the band, do not cross
      if (p.wait > 420) { p.vx = p.side * 0.5; p.wait = -600; }   // gave up waiting: drift back and retry
      p.x += p.vx * dt; p.y += (p.vy + Math.sin(p.ph) * 0.12) * dt;
      if (p.y < 10) { p.y = 10; p.vy = Math.abs(p.vy); } if (p.y > H - 10) { p.y = H - 10; p.vy = -Math.abs(p.vy); }
      if (p.x < -30 || p.x > W + 30) p.dead = true;
      for (const s of p.shell) {
        s.a += s.w * dt; const rr = s.r * (0.6 + 0.4 * p.sol) + (1 - p.sol) * 10;
        const sx = p.x + Math.cos(s.a) * rr * 0.75, sy = p.y + Math.sin(s.a) * rr;
        const al = 0.55 * (0.2 + 0.8 * p.sol); if (al < 0.03) continue;
        ctx.fillStyle = `rgba(${WHITE},${al.toFixed(3)})`; ctx.beginPath(); ctx.arc(sx, sy, 1.3, 0, 6.28); ctx.fill();
        ctx.strokeStyle = `rgba(${WHITE},${(0.10 * p.sol).toFixed(3)})`; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(sx, sy); ctx.stroke();
      }
      const hg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 14);
      hg.addColorStop(0, `rgba(${p.kind},0.28)`); hg.addColorStop(1, `rgba(${p.kind},0)`);
      ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(p.x, p.y, 14, 0, 6.28); ctx.fill();
      ctx.fillStyle = `rgba(${p.kind},0.92)`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
    }
    ions = ions.filter((p) => !p.dead);
    /* keep both populations topped up from their own edges */
    const nl = ions.filter((p) => p.side < 0).length, nr = ions.length - nl;
    if (nl < N && Math.random() < 0.015) ions.push(makeIon(-1, rnd(-30, -10)));
    if (nr < N && Math.random() < 0.015) ions.push(makeIon(1, rnd(W + 10, W + 30)));
    raf = requestAnimationFrame(draw);
  };
  const start = () => { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(draw); };
  const stop = () => { running = false; cancelAnimationFrame(raf); };
  resize();
  window.addEventListener("resize", () => { clearTimeout(cv._rt); cv._rt = setTimeout(resize, 150); });
  if ("IntersectionObserver" in window) new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? start() : stop())), { threshold: 0.05 }).observe(hero);
  else start();
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
})();
