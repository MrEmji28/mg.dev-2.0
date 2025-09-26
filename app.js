// ===== Rocketship Opening Animation =====
window.addEventListener('load', () => {
  const loader = document.querySelector('.rocket-loader');
  const body = document.body;
  
  // Initialize particles
  particlesJS('particles-js', {
    particles: {
      number: { value: 80 },
      color: { value: '#ff7a18' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 6,
        direction: 'top',
        random: false,
        straight: false,
        out_mode: 'out'
      }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false } } },
    retina_detect: true
  });
  
  // Animate rocket
  const rocket = document.querySelector('.rocket');
  rocket.style.animation = 'rocketUp 2.5s ease-out forwards';
  
  // Remove loading class after animation completes
  setTimeout(() => {
    body.classList.remove('loading');
    if (loader) {
      loader.remove();
    }
  }, 3300);
});

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

// ===== Project Modal =====
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');

const projectData = {
  'rondex': {
    title: 'Rondex Enterprises Corp. Inventory and Sales Management System',
    images: ['images/works/rondex_inventory/rondex_home.png', 'images/works/rondex_inventory/rondex_home.png', 'images/works/rondex_inventory/rondex_home.png'],
    description: 'A corporate-focused platform for tracking sales, managing orders, and generating accurate invoices with streamlined reporting.',
    features: ['Inventory Management', 'Sales Tracking', 'Invoice Generation', 'Reporting Dashboard', 'Order Management'],
    technologies: ['PHP', 'Laravel', 'Filament', 'PostgreSQL']
  },
  'jayel': {
    title: 'Jayel Marketing Inventory and Sales Management System',
    images: ['images/works/jayel_inventory/1.png', 'images/works/jayel_inventory/1.png', 'images/works/jayel_inventory/1.png'],
    description: 'A business-driven solution for simplifying inventory control, processing customer orders, and creating invoices with ease.',
    features: ['Inventory Control', 'Customer Orders', 'Invoice Creation', 'Sales Analytics', 'User Management'],
    technologies: ['PHP', 'Laravel', 'Filament', 'PostgreSQL']
  },
  'jumpstart': {
    title: 'JumStart Online Retail',
    images: ['images/works/jumpstart/Home.png', 'images/works/jumpstart/Home.png', 'images/works/jumpstart/Home.png'],
    description: 'E-commerce with product management, payments, and admin tooling.',
    features: ['Product Management', 'Payment Integration', 'Admin Dashboard', 'User Authentication', 'Shopping Cart'],
    technologies: ['Next.js', 'Supabase']
  },
  'abc': {
    title: 'ABC Job Portal',
    images: ['images/works/abc_jobs/abcjobs_home.png', 'images/works/abc_jobs/abcjobs_home.png', 'images/works/abc_jobs/abcjobs_home.png'],
    description: 'Job matching portal with profiles, admin controls, and secure auth.',
    features: ['Job Matching', 'User Profiles', 'Admin Controls', 'Secure Authentication', 'Application Tracking'],
    technologies: ['Next.js', 'Supabase']
  },
  'meals': {
    title: 'Meals on Wheels',
    images: ['images/works/merrymeals.png', 'images/works/merrymeals.png', 'images/works/merrymeals.png'],
    description: 'Accessible meal ordering for seniors/PWD with real-time delivery tracking.',
    features: ['Meal Ordering', 'Delivery Tracking', 'Accessibility Features', 'Senior-Friendly UI', 'Real-time Updates'],
    technologies: ['React', 'Spring Boot', 'MySQL']
  }
};

let currentImageIndex = 0;
let currentImages = [];

function openModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;
  
  currentImages = project.images;
  currentImageIndex = 0;
  
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDescription').textContent = project.description;
  
  const imagesContainer = document.getElementById('modalImages');
  imagesContainer.innerHTML = project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('');
  
  const dotsContainer = document.getElementById('carouselDots');
  dotsContainer.innerHTML = project.images.map((_, i) => `<div class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('');
  
  const featuresList = document.getElementById('modalFeatures');
  featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
  
  const techContainer = document.getElementById('modalTechnologies');
  techContainer.innerHTML = project.technologies.map(tech => `<span>${tech}</span>`).join('');
  
  updateCarousel();
  modal.style.display = 'block';
}

function updateCarousel() {
  const imagesContainer = document.getElementById('modalImages');
  imagesContainer.style.transform = `translateX(-${currentImageIndex * 100}%)`;
  
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentImageIndex);
  });
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  updateCarousel();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  updateCarousel();
}

document.getElementById('nextBtn').addEventListener('click', nextImage);
document.getElementById('prevBtn').addEventListener('click', prevImage);

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('carousel-dot')) {
    currentImageIndex = parseInt(e.target.dataset.index);
    updateCarousel();
  }
});

function closeModal() {
  modal.style.display = 'none';
  currentImageIndex = 0;
}

modalClose.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Add click handlers to eye icons
document.querySelectorAll('.hover-icon-btn[title="View Details"]').forEach((btn, index) => {
  const projectKeys = ['rondex', 'jayel', 'jumpstart', 'abc', 'meals'];
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(projectKeys[index]);
  });
});

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
