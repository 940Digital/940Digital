/* ============================================
   940Digital — Site Logic
   ============================================ */

/* --- Config (change these to update site-wide) --- */
const SITE_CONFIG = {
  email: '940digital@gmail.com',
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

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- Hero word cycle: per-letter "assemble" in the mono accent face --- */
const cycleWordEl = document.getElementById('cycleWord');
if (cycleWordEl) {
  const CYCLE_WORDS = ['Presence', 'Momentum', 'Authority', 'Impact', 'Movement', 'Exposure', 'Leverage', 'Futures'];

  function setCycleWord(word) {
    cycleWordEl.classList.remove('in');
    cycleWordEl.innerHTML = '';
    word.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'cw-char';
      span.textContent = ch;
      span.style.animationDelay = (i * 0.028) + 's';
      cycleWordEl.appendChild(span);
    });
    void cycleWordEl.offsetWidth; // force reflow so the animation restarts
    cycleWordEl.classList.add('in');
  }

  if (prefersReducedMotion) {
    cycleWordEl.textContent = CYCLE_WORDS[0];
  } else {
    let cycleIndex = 0;
    setCycleWord(CYCLE_WORDS[cycleIndex]);
    if (CYCLE_WORDS.length > 1) {
      setInterval(() => {
        cycleIndex = (cycleIndex + 1) % CYCLE_WORDS.length;
        setCycleWord(CYCLE_WORDS[cycleIndex]);
      }, 3200);
    }
  }
}

/* --- Scroll-triggered entrance reveals ---
   Card grids get a real stagger (nth-child transition-delay in CSS);
   .reveal-scale / .reveal-side-left / .reveal-side-right / .reveal-mask
   give the page more than one repeated technique, all driven by this same
   reliable IntersectionObserver + CSS-transition toggle. */
if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
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

/* --- Contact form (submits to Formspree) --- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        btn.textContent = 'Sent — we\'ll be in touch';
        btn.style.background = '#16A34A';
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      btn.textContent = 'Something went wrong — try again';
      btn.style.background = '#DC2626';
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  });
}
