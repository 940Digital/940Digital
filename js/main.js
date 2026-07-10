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

/* --- Reduced motion check --- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- Lenis smooth scroll --- */
let lenisInstance = null;
if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
  lenisInstance = new Lenis({ duration: 1.1 });
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenisInstance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenisInstance.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(t) { lenisInstance.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
}

/* --- Scroll reveals (Intersection Observer) --- */
if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => e.target.classList.toggle('in', e.isIntersecting));
  }, { rootMargin: '0px 0px -18% 0px', threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* --- Horizontal scroll (homepage signature) --- */
if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  const hscroll = document.querySelector('.hscroll');
  if (hscroll) {
    const track = hscroll.querySelector('.hscroll-track');

    const scrollTween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: hscroll,
        pin: true,
        scrub: 0.6,
        end: () => '+=' + (track.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
      }
    });

    gsap.utils.toArray('.hscroll-panel').forEach((panel, i) => {
      gsap.from(panel, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        scrollTrigger: {
          trigger: panel,
          containerAnimation: scrollTween,
          start: 'left 85%',
          toggleActions: 'play reverse play reverse',
        }
      });
    });
  }
}

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
