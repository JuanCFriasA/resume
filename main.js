/* ═══════════════════════════════════════
   RESUME — EDITORIAL PRINT STYLE
   main.js
═══════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const dot    = cursor.querySelector('.c-dot');
  const cross  = cursor.querySelector('.c-cross');
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animateCross() {
    cx += (mx - cx) * 0.1;
    cy += (my - cy) * 0.1;
    cross.style.left = cx + 'px';
    cross.style.top  = cy + 'px';
    requestAnimationFrame(animateCross);
  })();
})();

/* ── SCROLL PROGRESS ── */
(function initProgress() {
  const bar = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* ── SECTION REVEAL ── */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section').forEach(s => observer.observe(s));
})();

/* ── SKILL DOTS ANIMATION ──
   Dev skills use orange (--accent), IT skills use blue (--accent-it)
   We detect which wrap the entry belongs to via .skills-wrap--it
── */
(function initSkillDots() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;

      const entry   = e.target;
      const level   = parseInt(entry.dataset.level || '0', 10);
      const isIT    = entry.closest('.skills-wrap--it') !== null;
      const fillClass = isIT ? 'filled-it' : 'filled';
      const dots    = entry.querySelectorAll('.dot-item');

      dots.forEach((d, i) => {
        setTimeout(() => {
          if (i < level) d.classList.add(fillClass);
        }, i * 80);
      });

      observer.unobserve(entry);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.skill-entry').forEach(el => observer.observe(el));
})();

/* ── ACTIVE NAV ── */
(function initNav() {
  const links    = document.querySelectorAll('#nav a');
  const sections = document.querySelectorAll('.section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();

/* ── LIVE DATE ── */
(function setDate() {
  const el = document.querySelector('.nav-date');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
})();

/* ── CERT PROGRESS BARS ── */
(function initCertBars() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const fill = e.target.querySelector('.cert-progress-fill');
      if (fill) fill.style.width = fill.dataset.pct + '%';
      observer.unobserve(e.target);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.cert-card').forEach(el => observer.observe(el));
})();

