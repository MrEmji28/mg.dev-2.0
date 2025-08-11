// ===== Mobile menu (burger) =====
const navToggle = document.querySelector('.nav-toggle');
const siteMenu  = document.getElementById('site-menu');

if (navToggle && siteMenu) {
  navToggle.addEventListener('click', () => {
    const open = siteMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  // Close on link click (mobile)
  siteMenu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    siteMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });

  // Close on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      siteMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // If we resize to desktop, ensure menu is closed
  const mq = window.matchMedia('(min-width: 761px)');
  mq.addEventListener?.('change', (e) => {
    if (e.matches) {
      siteMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ===== Theme toggle (sun/moon icon with persistence) =====
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)');

function applyTheme(mode, persist = true) {
  htmlEl.setAttribute('data-theme', mode);
  themeToggle?.setAttribute(
    'aria-label',
    mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
  if (persist) localStorage.setItem('theme', mode);
}

// Init: saved -> system -> light
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || savedTheme === 'light') {
  applyTheme(savedTheme, false);
} else {
  applyTheme(prefersDark?.matches ? 'dark' : 'light', false);
  // Follow OS changes only if user hasn't picked a theme
  prefersDark?.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light', false);
  });
}

// Toggle on click
themeToggle?.addEventListener('click', () => {
  const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Scrollspy (minimal) =====
const sections = [...document.querySelectorAll('main section[id]')];
const links = new Map([...document.querySelectorAll('.nav-link')]
  .map(a => [a.getAttribute('href')?.slice(1), a]));

if (sections.length && links.size) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach((el, key) => el.classList.toggle('active', key === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => obs.observe(s));
}
