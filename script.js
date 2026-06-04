/* ================================================
   VANSHIT SHARMA PORTFOLIO v2 — script.js
   Full-page snap scroll + entrance animations
   ================================================ */

// ─── TYPEWRITER ──────────────────────────────────
(function initTypewriter() {
  const el = document.getElementById('tw');
  if (!el) return;
  const phrases = [
    'devops-engineer',
    'cloud-architect',
    'terraform-wizard',
    'k8s-orchestrator',
    'gcp-specialist',
    'devsecops-enthusiast',
  ];
  let si = 0, ci = 0, del = false;

  function tick() {
    const p = phrases[si];
    if (del) {
      el.textContent = p.slice(0, --ci);
      if (ci < 0) { del = false; si = (si + 1) % phrases.length; ci = 0; setTimeout(tick, 480); return; }
      setTimeout(tick, 42);
    } else {
      el.textContent = p.slice(0, ++ci);
      if (ci > p.length) { del = true; setTimeout(tick, 1800); return; }
      setTimeout(tick, 72);
    }
  }
  setTimeout(tick, 600);
})();

// ─── SNAP SCROLL ENGINE ─────────────────────────
const snapRoot  = document.getElementById('snap-root');
const panels    = Array.from(document.querySelectorAll('.panel'));
const dotItems  = Array.from(document.querySelectorAll('.dot-item'));
const navLinks  = Array.from(document.querySelectorAll('.nav-link'));
const cntCur    = document.getElementById('cnt-cur');
const topNav    = document.getElementById('top-nav');
const scrollHint= document.getElementById('scroll-hint');

const TOTAL = panels.length;
let current = -1;

/**
 * Activates a panel by index, triggering entrance animations
 * and updating all navigation indicators.
 */
function activatePanel(idx) {
  if (idx === current) return;

  // Deactivate old panel
  if (current >= 0) {
    panels[current].classList.remove('active');
    // Reset delays so exit is instant
    panels[current].querySelectorAll('.fe').forEach(el => {
      el.style.transitionDelay = '0s';
    });
  }

  current = idx;
  const panel = panels[idx];

  // Stagger the incoming elements
  const faders = panel.querySelectorAll('.fe');
  faders.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.075}s`;
  });

  // Activate
  panel.classList.add('active');

  // Dot nav
  dotItems.forEach((d, i) => d.classList.toggle('active', i === idx));

  // Top nav links
  navLinks.forEach(l => {
    l.classList.toggle('active', l.dataset.target === panel.id);
  });

  // Section counter
  if (cntCur) cntCur.textContent = String(idx + 1).padStart(2, '0');

  // Nav background
  if (topNav) topNav.classList.toggle('scrolled', idx > 0);

  // Hide scroll hint after first scroll
  if (scrollHint) scrollHint.classList.toggle('gone', idx > 0);
}

// IntersectionObserver — watches which panel is ≥50% visible
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

// ─── DOT NAV CLICKS ─────────────────────────────
dotItems.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    panels[i].scrollIntoView({ behavior: 'smooth' });
  });
});

// ─── TOP NAV LINK CLICKS ────────────────────────
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const panel = document.getElementById(link.dataset.target);
    if (panel) panel.scrollIntoView({ behavior: 'smooth' });
  });
});

// ─── INLINE CTA BUTTONS ─────────────────────────
document.getElementById('h-proj-btn')?.addEventListener('click', () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('about-cta-btn')?.addEventListener('click', () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
});

// ─── HAMBURGER MENU ─────────────────────────────
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
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  menu.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.remove('open');
      ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();

// ─── INITIAL ACTIVATION ──────────────────────────
// Small delay to let fonts/layout settle
setTimeout(() => activatePanel(0), 120);

// ─── KEYBOARD NAVIGATION ─────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault();
    const next = Math.min(current + 1, TOTAL - 1);
    panels[next].scrollIntoView({ behavior: 'smooth' });
  }
  if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault();
    const prev = Math.max(current - 1, 0);
    panels[prev].scrollIntoView({ behavior: 'smooth' });
  }
});

// ─── PROJECT CARD TILT EFFECT ────────────────────
document.querySelectorAll('.pc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease, border-color 0.3s';
    setTimeout(() => card.style.transition = '', 500);
  });
});
