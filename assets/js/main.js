(function () {
  'use strict';
  const $ = s => document.querySelector(s);

  /* mobile menu */
  const toggle = $('#navToggle');
  const setMenu = open => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('nav-open')));
  document.querySelectorAll('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* civic: show more */
  const more = $('#civicMore'), btn = $('#civicToggle');
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    more.style.maxHeight = open ? more.scrollHeight + 'px' : '0';
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? '접기' : '더보기';
  });

  /* board (localStorage, written by admin.html) */
  const PAGE = 5;
  let type = 'newsroom', page = 0;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const items = () => { try { return JSON.parse(localStorage.getItem('portfolioBoards') || '[]'); } catch (e) { return []; } };
  const fmt = iso => { try { const d = new Date(iso), p = n => String(n).padStart(2, '0'); return d.getFullYear() + '.' + p(d.getMonth() + 1) + '.' + p(d.getDate()); } catch (e) { return ''; } };
  function render() {
    const all = items().filter(p => p.board === type).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const shown = all.slice(0, (page + 1) * PAGE);
    const list = $('#boardList'), moreBtn = $('#boardMore');
    if (!shown.length) { list.innerHTML = '<div class="board-empty">아직 등록된 글이 없습니다.</div>'; moreBtn.style.display = 'none'; return; }
    list.innerHTML = shown.map(b => '<div class="board-card"><h4>' + esc(b.title) + '</h4><p>' + esc(b.content) + '</p><time>' + fmt(b.createdAt) + '</time></div>').join('');
    moreBtn.style.display = all.length > shown.length ? 'block' : 'none';
  }
  window.selectBoard = t => {
    type = t; page = 0;
    $('#btnNewsroom').setAttribute('aria-selected', String(t === 'newsroom'));
    $('#btnOpinion').setAttribute('aria-selected', String(t === 'opinion'));
    render();
  };
  window.loadMoreBoard = () => { page++; render(); };
  render();
})();
