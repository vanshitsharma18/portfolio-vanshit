/* ================================================
   VANSHIT SHARMA PORTFOLIO — script.js
   ================================================ */

// ─── TYPEWRITER ──────────────────────────────────────
(function initTypewriter() {
  const el = document.getElementById('tw');
  if (!el) return;
  const phrases = ['devops-engineer','cloud-architect','terraform-wizard','k8s-orchestrator','gcp-specialist','devsecops-practitioner'];
  let si = 0, ci = 0, del = false;
  function tick() {
    const p = phrases[si];
    if (del) {
      el.textContent = p.slice(0, --ci);
      if (ci < 0) { del = false; si = (si + 1) % phrases.length; ci = 0; setTimeout(tick, 480); return; }
      setTimeout(tick, 40);
    } else {
      el.textContent = p.slice(0, ++ci);
      if (ci > p.length) { del = true; setTimeout(tick, 1800); return; }
      setTimeout(tick, 70);
    }
  }
  setTimeout(tick, 600);
})();

// ─── SNAP SCROLL ENGINE ──────────────────────────────
const snapRoot   = document.getElementById('snap-root');
const panels     = Array.from(document.querySelectorAll('.panel'));
const dotItems   = Array.from(document.querySelectorAll('.dot-item'));
const navLinks   = Array.from(document.querySelectorAll('.nav-link'));
const cntCur     = document.getElementById('cnt-cur');
const scrollHint = document.getElementById('scroll-hint');
const TOTAL = panels.length;
let current = -1;

function activatePanel(idx) {
  if (idx === current) return;
  if (current >= 0) {
    panels[current].classList.remove('active');
    panels[current].querySelectorAll('.fe').forEach(el => { el.style.transitionDelay = '0s'; });
  }
  current = idx;
  const panel = panels[idx];
  panel.querySelectorAll('.fe').forEach((el, i) => { el.style.transitionDelay = `${i * 0.07}s`; });
  panel.classList.add('active');
  dotItems.forEach((d, i) => d.classList.toggle('active', i === idx));
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.target === panel.id));
  if (cntCur) cntCur.textContent = String(idx + 1).padStart(2, '0');
  if (scrollHint) scrollHint.classList.toggle('gone', idx > 0);
}

// IntersectionObserver
const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const idx = panels.indexOf(entry.target);
        if (idx !== -1) activatePanel(idx);
      }
    });
  },
  { root: snapRoot, threshold: 0.5 }
);
panels.forEach(p => io.observe(p));

// ─── DOT NAV CLICKS ─────────────────────────────────
dotItems.forEach((dot, i) => {
  dot.addEventListener('click', () => panels[i].scrollIntoView({ behavior: 'smooth' }));
});

// ─── TOP NAV CLICKS ─────────────────────────────────
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const panel = document.getElementById(link.dataset.target);
    if (panel) panel.scrollIntoView({ behavior: 'smooth' });
    // Close mobile menu
    document.getElementById('nav-links')?.classList.remove('open');
    resetHam();
  });
});

// ─── HERO CTABUTTONS ────────────────────────────────
document.getElementById('h-proj-btn')?.addEventListener('click', () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
});

// ─── HAMBURGER ──────────────────────────────────────
function resetHam() {
  document.querySelectorAll('.ham span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}
(function initHam() {
  const ham  = document.getElementById('ham');
  const menu = document.getElementById('nav-links');
  if (!ham || !menu) return;
  ham.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    const spans = ham.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else { resetHam(); }
  });
  menu.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.remove('open');
      resetHam();
    });
  });
})();

// ─── KEYBOARD NAV ───────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault();
    panels[Math.min(current + 1, TOTAL - 1)]?.scrollIntoView({ behavior: 'smooth' });
  }
  if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault();
    panels[Math.max(current - 1, 0)]?.scrollIntoView({ behavior: 'smooth' });
  }
});

// ─── PROJECT CARD TILT ──────────────────────────────
document.querySelectorAll('.pc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease, border-color 0.3s';
    setTimeout(() => card.style.transition = '', 500);
  });
});

// ─── INITIAL ACTIVATION ─────────────────────────────
setTimeout(() => activatePanel(0), 120);
