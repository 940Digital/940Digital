/* ============================================
   940Digital — Site Logic
   ============================================ */

/* --- Config (change these to update site-wide) --- */
const SITE_CONFIG = {
  email: '0nleiter@gmail.com',
  serviceArea: 'DFW, Texas and surrounding areas',
};

/* --- Populate contact info from config --- */
document.querySelectorAll('[data-email]').forEach(el => {
  el.textContent = SITE_CONFIG.email;
  if (el.tagName === 'A') el.href = 'mailto:' + SITE_CONFIG.email;
});
document.querySelectorAll('[data-area]').forEach(el => {
  el.textContent = SITE_CONFIG.serviceArea;
});

/* --- Copyright year --- */
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* --- Hero word cycle --- */
const cycleWordEl = document.getElementById('cycleWord');
if (cycleWordEl) {
  const CYCLE_WORDS = ['Presence', 'Momentum', 'Authority', 'Impact', 'Movement', 'Exposure', 'Leverage', 'Futures'];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && CYCLE_WORDS.length > 1) {
    let cycleIndex = 0;
    setInterval(() => {
      cycleWordEl.classList.add('switching');
      setTimeout(() => {
        cycleIndex = (cycleIndex + 1) % CYCLE_WORDS.length;
        cycleWordEl.textContent = CYCLE_WORDS[cycleIndex];
        cycleWordEl.classList.remove('switching');
      }, 400);
    }, 3200);
  }
}

/* --- Scroll stage: pinned horizontal transition (Services -> The Difference) ---
   Whole-section pin + slide, same on mobile and desktop. Cards are full-size;
   if a section's content is taller than the pinned viewport, the panel itself
   scrolls internally (overflow-y: auto) rather than being clipped or paginated. */
(function() {
  const scrollStage = document.getElementById('scrollStage');
  const scrollTrack = document.getElementById('scrollTrack');
  if (!scrollStage || !scrollTrack) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // CSS fallback handles this entirely, no JS needed

  const stickyEl = scrollStage.querySelector('.scroll-stage-sticky');
  const stickyTopOffset = parseFloat(getComputedStyle(stickyEl).top) || 0;

  function updateStage() {
    const rect = scrollStage.getBoundingClientRect();
    const pinnedHeight = stickyEl.offsetHeight;
    const runway = scrollStage.offsetHeight - pinnedHeight - stickyTopOffset;
    let progress = 0;
    if (runway > 0) {
      progress = -rect.top / runway;
      progress = Math.min(1, Math.max(0, progress));
    }
    scrollTrack.style.transform = `translateX(-${progress * 50}%)`;
  }

  let stageTicking = false;
  window.addEventListener('scroll', () => {
    if (!stageTicking) {
      requestAnimationFrame(() => { updateStage(); stageTicking = false; });
      stageTicking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', updateStage);
  updateStage();
})();

/* --- Nav: sticky shadow on scroll --- */
const nav = document.querySelector('.nav');
if (nav) {
  let ticking = false;
  function checkNavScroll() {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 2px 16px rgba(0,0,0,.3)';
    } else {
      nav.style.boxShadow = 'none';
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(checkNavScroll); ticking = true; }
  }, { passive: true });
}

/* --- Mobile nav toggle --- */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* --- Active nav link --- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === 'index.html' && href === '/')) {
    link.classList.add('active');
  }
});

/* --- Contact form (front-end only) --- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sent — we\'ll be in touch';
    btn.disabled = true;
    btn.style.background = '#16A34A';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}
