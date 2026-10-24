/* ═══════════════════════════════════════════════
   LDG NOIR — motion & graphics
   gsap · ScrollTrigger · Lenis (MIT/free) + custom WebGL / Canvas
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';
  window.__ldgReady = true;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* LDG symbol geometry (shared by every graphic) */
  const LDG_PATHS = [
    'M48.72,34.11c2.55,0,6.14-1.32,8.48-2.49l-4.69-7.83a12.15,12.15,0,0,1-6.27,1.78h-36V0H0V34.13',
    'M23,21.27H33.19V8.64H47.83s8.06.28,8.06,9.05c0,7.36,6,16.44,21.71,16.44H99.15V12.89H77.24l-5.38,7.62H89v5.06H72.9a8.84,8.84,0,0,1-6.78-9C66.12,9,60.22,0,46.76,0H23V21',
    'M72.61,0H100.3L93.48,9.18H74.56a6.24,6.24,0,0,0-1.46.18,6.54,6.54,0,0,0-3.41,2.19s-1.57-6.31-5.08-8.42C64.61,3.13,70.6.1,72.61,0Z'
  ].map(d => new Path2D(d));
  const LDG_W = 100.3, LDG_H = 34.13;

  const mouse = { x: innerWidth / 2, y: innerHeight / 2, nx: .5, ny: .5 };
  addEventListener('pointermove', e => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    mouse.nx = e.clientX / innerWidth; mouse.ny = e.clientY / innerHeight;
  }, { passive: true });

  let scrollVel = 0, scrollProg = 0;

  /* ───────── Lenis smooth scroll ───────── */
  let lenis = null;
  if (!reduce && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: .09, wheelMultiplier: .95 });
    if (hasGSAP) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    lenis.stop();
  }
  const scrollTo = (target, opts) => {
    if (lenis) lenis.scrollTo(target, Object.assign({ duration: 1.4, easing: t => 1 - Math.pow(1 - t, 4) }, opts));
    else (typeof target === 'number' ? window.scrollTo({ top: target, behavior: 'smooth' }) : target.scrollIntoView({ behavior: 'smooth' }));
  };
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const t = id.length > 1 && $(id);
    if (!t) return;
    e.preventDefault();
    closeMenu();
    scrollTo(t, { offset: 0 });
  }));

  /* ───────── nav / menu ───────── */
  const navToggle = $('#navToggle');
  function closeMenu() { document.body.classList.remove('nav-open'); navToggle.setAttribute('aria-expanded', 'false'); }
  navToggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  /* ───────── scroll state: progress bar + velocity ───────── */
  const progressEl = $('#progress');
  let lastY = scrollY;
  function onScrollFrame() {
    const y = scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    scrollProg = clamp(y / max, 0, 1);
    progressEl.style.transform = 'scaleX(' + scrollProg.toFixed(4) + ')';
    scrollVel = lerp(scrollVel, y - lastY, .2);
    lastY = y;
  }
  (hasGSAP ? (f => gsap.ticker.add(f)) : (f => { const r = () => { f(); requestAnimationFrame(r); }; r(); }))(onScrollFrame);

  /* ───────── reveal on scroll (+ sibling stagger) ───────── */
  $$('.grid-cards, .mini-grid, .bento, .practice').forEach(g =>
    Array.from(g.children).forEach((c, i) => { c.style.transitionDelay = (i % 4) * 90 + 'ms'; }));
  const revealObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -50px 0px' });
  $$('.reveal').forEach(el => revealObs.observe(el));

  /* ───────── spotlight cards ───────── */
  document.addEventListener('pointermove', e => {
    const c = e.target.closest && e.target.closest('.card');
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  /* ───────── custom cursor + magnetic ───────── */
  if (finePointer && !reduce && hasGSAP) {
    const cur = $('#cursor'), dot = $('#cursorDot');
    const cx = gsap.quickTo(cur, 'x', { duration: .45, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: .45, ease: 'power3' });
    const dx = gsap.quickTo(dot, 'x', { duration: .1 }), dy = gsap.quickTo(dot, 'y', { duration: .1 });
    addEventListener('pointermove', e => { cx(e.clientX); cy(e.clientY); dx(e.clientX); dy(e.clientY); cur.classList.add('is-on'); dot.classList.add('is-on'); }, { passive: true });
    document.addEventListener('pointerover', e => {
      const t = e.target.closest && e.target.closest('a,button,[data-cursor]');
      if (t) {
        const label = t.getAttribute('data-cursor');
        cur.setAttribute('data-label', label || '');
        cur.classList.toggle('is-link', !!label);
        cur.classList.toggle('is-hover', !label);
      } else { cur.classList.remove('is-link', 'is-hover'); }
    });
    document.documentElement.addEventListener('pointerleave', () => { cur.classList.remove('is-on'); dot.classList.remove('is-on'); });

    $$('.mag').forEach(el => {
      const qx = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1,.5)' }), qy = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1,.5)' });
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * .22); qy((e.clientY - r.top - r.height / 2) * .35); });
      el.addEventListener('pointerleave', () => { qx(0); qy(0); });
    });
  }

  /* ───────── hero title: split + cursor-reactive variable font ───────── */
  const chars = [];
  $$('[data-split]').forEach((ln, li) => {
    const txt = ln.textContent;
    ln.textContent = '';
    txt.split('').forEach(ch => {
      const s = document.createElement('span');
      s.className = 'ch'; s.textContent = ch; s.dataset.line = li;
      ln.appendChild(s); chars.push(s);
    });
  });
  function heroReactive() {
    if (reduce || !finePointer) return;
    const stage = $('#heroStage'); if (!stage) return;
    const r = stage.getBoundingClientRect();
    if (r.bottom < 0) return;
    chars.forEach(c => {
      if (c.dataset.line === '1') return; // serif line has no width axis
      const b = c.getBoundingClientRect();
      const d = Math.hypot(mouse.x - (b.left + b.width / 2), mouse.y - (b.top + b.height / 2));
      const target = lerp(84, 125, clamp(d / 340, 0, 1));
      const cur = parseFloat(c._w || 125);
      const next = lerp(cur, target, .14);
      c._w = next;
      c.style.fontVariationSettings = "'wdth' " + next.toFixed(1);
    });
  }
  if (hasGSAP && !reduce) gsap.ticker.add(heroReactive);

  /* plate parallax */
  if (hasGSAP && !reduce && finePointer) {
    $$('.plate').forEach(p => {
      const depth = parseFloat(p.dataset.depth || 0);
      const qx = gsap.quickTo(p, 'x', { duration: 1.1, ease: 'power3' }), qy = gsap.quickTo(p, 'y', { duration: 1.1, ease: 'power3' });
      addEventListener('pointermove', () => { qx((mouse.nx - .5) * depth); qy((mouse.ny - .5) * depth); }, { passive: true });
    });
  }

  /* ───────── LDG echo trail ───────── */
  (function () {
    const host = $('#trail'); if (!host) return;
    const N = 10, NS = 'http://www.w3.org/2000/svg', layers = [];
    for (let i = 0; i < N; i++) {
      const s = document.createElementNS(NS, 'svg');
      s.setAttribute('viewBox', '0 0 100.3 34.13');
      const u = document.createElementNS(NS, 'use'); u.setAttribute('href', '#ldg');
      s.appendChild(u);
      const k = i / (N - 1);
      const r = Math.round(lerp(255, 59, k)), g = Math.round(lerp(255, 116, k)), b = Math.round(lerp(255, 196, k));
      s.style.fill = 'rgb(' + r + ',' + g + ',' + b + ')';
      s.style.opacity = (1 - k * .88).toFixed(2);
      s.style.filter = 'blur(' + (k * 5).toFixed(1) + 'px)';
      host.appendChild(s); layers.push(s);
    }
    layers[0].style.filter = 'none';
    let t = 0, spread = 7, rot = -18;
    const render = () => {
      const targetSpread = 7 + clamp(Math.abs(scrollVel) * 1.4, 0, 40) + Math.abs(mouse.nx - .5) * 20;
      spread = lerp(spread, targetSpread, .08);
      rot += .12 + scrollVel * .05;
      layers.forEach((s, i) => {
        const a = rot - i * spread, sc = 1 + i * .035;
        s.style.transform = 'rotate(' + a.toFixed(2) + 'deg) scale(' + sc.toFixed(3) + ')';
      });
    };
    if (reduce || !hasGSAP) { render(); return; }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) gsap.ticker.add(render); else gsap.ticker.remove(render);
    }));
    io.observe(host);
  })();

  /* ───────── particle LDG (Canvas 2D) ───────── */
  function particleLogo(canvas, o) {
    const ctx = canvas.getContext('2d');
    const P = [];
    let w = 0, h = 0, dpr = 1, running = false, scatter = 0, raf = 0;
    const off = document.createElement('canvas'), octx = off.getContext('2d', { willReadFrequently: true });

    function build() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      const lw = Math.min(w * o.width, o.maxWidth || 1e9), sc = lw / LDG_W, lh = LDG_H * sc;
      const ox = o.anchor === 'right' ? w - lw - w * .06 : (w - lw) / 2, oy = o.anchor === 'right' ? (h - lh) / 2 : (h - lh) / 2;
      off.width = Math.ceil(w); off.height = Math.ceil(h);
      octx.clearRect(0, 0, off.width, off.height);
      octx.save(); octx.translate(ox, oy); octx.scale(sc, sc); octx.fillStyle = '#fff';
      LDG_PATHS.forEach(p => octx.fill(p)); octx.restore();
      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const pts = [], step = Math.max(2, Math.round(Math.sqrt((lw * lh) / o.count)));
      for (let y = 0; y < off.height; y += step) for (let x = 0; x < off.width; x += step)
        if (data[(y * off.width + x) * 4 + 3] > 128) pts.push([x + (Math.random() - .5) * step * .6, y + (Math.random() - .5) * step * .6]);
      P.length = 0;
      pts.forEach(([tx, ty]) => {
        P.push({ x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0, tx, ty, k: (tx - ox) / lw, s: 1 + Math.random() * 1.4, ph: Math.random() * 6.28 });
      });
    }

    function frame(time) {
      const rect = canvas.getBoundingClientRect();
      const mx = mouse.x - rect.left, my = mouse.y - rect.top;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      const sc = typeof o.scatter === 'function' ? o.scatter() : scatter;
      const R = o.radius || 90;
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const hold = 1 - sc;
        const ax = (p.tx - p.x) * .035 * hold, ay = (p.ty - p.y) * .035 * hold;
        p.vx += ax + Math.cos(time * .0006 + p.ph) * (.03 + sc * .12);
        p.vy += ay + Math.sin(time * .0007 + p.ph) * (.03 + sc * .12);
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < R * R && d2 > .01) { const d = Math.sqrt(d2), f = (1 - d / R) * 2.2; p.vx += dx / d * f; p.vy += dy / d * f; }
        p.vx *= .9; p.vy *= .9; p.x += p.vx; p.y += p.vy;
        const k = clamp(p.k, 0, 1);
        const rr = Math.round(lerp(110, 255, k * k)), gg = Math.round(lerp(163, 190, k)), bb = Math.round(lerp(240, 120, k * k));
        ctx.fillStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + (.7 + .3 * Math.sin(time * .002 + p.ph)).toFixed(2) + ')';
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      if (running) raf = requestAnimationFrame(frame);
    }
    build();
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 200); });
    if (reduce) { P.forEach(p => { p.x = p.tx; p.y = p.ty; }); frame(0); return { rebuild: build }; }
    new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(frame); }
      else if (!e.isIntersecting) { running = false; cancelAnimationFrame(raf); }
    })).observe(canvas);
    return { rebuild: build, setScatter: v => { scatter = v; } };
  }
  const heroP = $('#heroParticles') && particleLogo($('#heroParticles'), { count: 2600, width: .82, radius: 80 });
  let contactProg = 0;
  if ($('#contactParticles')) particleLogo($('#contactParticles'), { count: 5200, width: .62, maxWidth: 1000, anchor: 'right', radius: 130, scatter: () => 1 - contactProg });

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

  /* ───────── marquee (velocity-reactive) ───────── */
  (function () {
    const track = $('#marqueeTrack'); if (!track || reduce || !hasGSAP) return;
    let x = 0, dir = 1;
    gsap.ticker.add(() => {
      const half = track.scrollWidth / 2;
      const v = -.7 - Math.abs(scrollVel) * .5;
      dir = scrollVel < -.2 ? -1 : 1;
      x += v * dir;
      if (x <= -half) x += half; if (x > 0) x -= half;
      track.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0) skewX(' + clamp(-scrollVel * .35, -9, 9).toFixed(2) + 'deg)';
    });
  })();

  /* ───────── about: scroll-lit quote ───────── */
  const quote = $('#aboutQuote');
  if (quote) {
    const words = quote.textContent.trim().split(/\s+/);
    quote.textContent = '';
    const spans = words.map((w, i) => { const s = document.createElement('span'); s.className = 'w'; s.textContent = w; quote.appendChild(s); if (i < words.length - 1) quote.appendChild(document.createTextNode(' ')); return s; });
    if (hasGSAP && !reduce) {
      ScrollTrigger.create({ trigger: quote, start: 'top 82%', end: 'bottom 48%', onUpdate: s => spans.forEach((w, i) => w.classList.toggle('on', i / spans.length < s.progress * 1.02)) });
    } else spans.forEach(s => s.classList.add('on'));
  }

  /* ───────── stats counter ───────── */
  const statsGrid = $('#statsGrid');
  if (statsGrid) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const els = $$('.count'), dur = 1600, st = performance.now();
      const step = now => {
        const t = Math.min(1, (now - st) / dur), ev = 1 - Math.pow(1 - t, 4);
        els.forEach(el => { el.textContent = Math.round(+el.dataset.target * ev); });
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), { threshold: .3 });
    io.observe(statsGrid);
  }

  /* ───────── ScrollTrigger scenes ───────── */
  if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);
    if (!reduce) {
      // timeline progress lines
      $$('.tl').forEach(tl => gsap.to($('.tl-line i', tl), { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 65%', scrub: .4 } }));
      // hero title parallax-out
      gsap.to('#heroTitle', { yPercent: -14, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-copy', { yPercent: -30, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
      // footer mark
      gsap.fromTo('.footer-mark', { yPercent: 35, opacity: .2 }, { yPercent: 0, opacity: .92, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top 100%', end: 'bottom bottom', scrub: true } });
      // contact particle assemble
      ScrollTrigger.create({ trigger: '#contact', start: 'top 85%', end: 'top 15%', scrub: true, onUpdate: s => { contactProg = s.progress; } });
    } else contactProg = 1;

    // pinned horizontal press rail (desktop)
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const rail = $('#pressRail'), pin = $('#pressPin');
      const dist = () => Math.max(0, rail.scrollWidth - innerWidth);
      const tween = gsap.to(rail, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: pin, start: 'top 12%', end: () => '+=' + dist(), pin: true, scrub: .6, invalidateOnRefresh: true, anticipatePin: 1 } });
      gsap.from('.press-card', { opacity: .15, y: 40, stagger: .06, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: pin, start: 'top 80%' } });
      return () => { tween.kill(); gsap.set(rail, { clearProps: 'all' }); };
    });
    addEventListener('load', () => ScrollTrigger.refresh());
    document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
  } else contactProg = 1;

  /* ───────── civic toggle ───────── */
  let civicOpen = false;
  window.toggleCivic = function () {
    civicOpen = !civicOpen;
    const m = $('#civicMore');
    m.style.maxHeight = civicOpen ? m.scrollHeight + 'px' : '0';
    $('#civicToggle').textContent = civicOpen ? '접기 ↑' : '더보기 ↓';
    setTimeout(() => hasGSAP && ScrollTrigger.refresh(), 750);
  };

  /* ───────── board (localStorage) ───────── */
  const BOARD_PAGE_SIZE = 5;
  let boardType = 'newsroom', boardPage = 0;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const getBoardItems = () => { try { return JSON.parse(localStorage.getItem('portfolioBoards') || '[]'); } catch (e) { return []; } };
  const formatDate = iso => { try { const d = new Date(iso), p = n => String(n).padStart(2, '0'); return d.getFullYear() + '.' + p(d.getMonth() + 1) + '.' + p(d.getDate()); } catch (e) { return ''; } };
  function renderBoard() {
    const filtered = getBoardItems().filter(p => p.board === boardType).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const visible = filtered.slice(0, (boardPage + 1) * BOARD_PAGE_SIZE);
    const list = $('#boardList'), more = $('#boardMore');
    if (!visible.length) { list.innerHTML = '<div class="board-empty">아직 등록된 글이 없습니다.</div>'; more.style.display = 'none'; return; }
    list.innerHTML = visible.map(b => '<div class="board-card"><h4>' + esc(b.title) + '</h4><p>' + esc(b.content) + '</p><time>' + formatDate(b.createdAt) + '</time></div>').join('');
    more.style.display = filtered.length > visible.length ? 'block' : 'none';
  }
  window.selectBoard = function (type) {
    boardType = type; boardPage = 0;
    $('#btnNewsroom').className = 'btn ' + (type === 'newsroom' ? 'btn-accent' : 'btn-secondary');
    $('#btnOpinion').className = 'btn ' + (type === 'opinion' ? 'btn-accent' : 'btn-secondary');
    renderBoard();
  };
  window.loadMoreBoard = function () { boardPage++; renderBoard(); if (hasGSAP) setTimeout(() => ScrollTrigger.refresh(), 50); };
  renderBoard();

  /* ───────── preloader → hero intro ───────── */
  const loader = $('#loader');
  function startSite() {
    document.body.classList.remove('is-loading');
    if (lenis) lenis.start();
    loader.style.display = 'none';
  }
  if (!hasGSAP || reduce) { startSite(); return; }

  gsap.set(chars, { yPercent: 70, opacity: 0, rotate: 5 });
  gsap.set('.plate', { opacity: 0, scale: .86, y: 40 });
  gsap.set(['.hero-copy', '.hero-meta', '.scroll-cue', '#nav'], { opacity: 0 });

  const paths = $$('.loader-logo path');
  const counter = { v: 0 };
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
  tl.to(paths, { strokeDashoffset: 0, duration: 1.3, stagger: .18 }, 0)
    .to(counter, { v: 100, duration: 1.8, ease: 'power1.inOut', onUpdate: () => { $('#loaderNum').textContent = String(Math.round(counter.v)).padStart(3, '0'); $('#loaderBar').style.transform = 'scaleX(' + counter.v / 100 + ')'; } }, 0)
    .to(paths, { fillOpacity: 1, strokeOpacity: 0, duration: .6, stagger: .1 }, 1.1)
    .to('.loader > *', { opacity: 0, y: -20, duration: .45, ease: 'power2.in', stagger: .04 }, 2.0)
    .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: .9, ease: 'power4.inOut', onStart: () => { loader.style.clipPath = 'inset(0 0 0% 0)'; } }, 2.25)
    .add(() => { startSite(); }, 2.4)
    .to(chars, { yPercent: 0, opacity: 1, rotate: 0, duration: 1.1, ease: 'expo.out', stagger: .055 }, 2.5)
    .to('.plate', { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: 'expo.out', stagger: .12 }, 2.7)
    .to(['.hero-copy', '.hero-meta', '.scroll-cue', '#nav'], { opacity: 1, duration: 1, stagger: .08 }, 3.0)
    .add(() => { gsap.set(['.hero-copy', '.hero-meta', '.scroll-cue', '#nav', '.plate'], { clearProps: 'opacity' }); }, 4.2);
})();
