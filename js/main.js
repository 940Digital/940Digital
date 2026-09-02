/* ============================================
   940Digital | Site Logic
   ============================================ */

/* --- Config (change these to update site-wide) --- */
/* Service area is intentionally NOT here: it is hardcoded into each page's
   footer and contact block so the location keywords sit in server-rendered
   HTML rather than being injected after load. Update it in the markup. */
const SITE_CONFIG = {
  email: '940digital@gmail.com',
};

/* --- Populate contact info from config --- */
document.querySelectorAll('[data-email]').forEach(el => {
  el.textContent = SITE_CONFIG.email;
  if (el.tagName === 'A') el.href = 'mailto:' + SITE_CONFIG.email;
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

/* --- Hero background: drifting node network on canvas ---
   No photography. Just a field of slow-moving dots that link to nearby
   neighbors with fading lines, in the brand's blue accent. Pauses when
   the tab is hidden or the hero scrolls out of view; renders one static
   frame (no rAF loop) under prefers-reduced-motion. */
const heroCanvas = document.getElementById('heroCanvas');
if (heroCanvas) {
  const ctx = heroCanvas.getContext('2d');
  const heroSection = heroCanvas.closest('.hero');
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let nodes = [];
  let rafId = null;
  let running = false;

  function sizeCanvas() {
    const rect = heroSection.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    heroCanvas.width = Math.round(w * dpr);
    heroCanvas.height = Math.round(h * dpr);
    heroCanvas.style.width = w + 'px';
    heroCanvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seedNodes() {
    const density = 15000; // px^2 per node, fewer nodes on small screens
    const count = Math.max(26, Math.min(110, Math.round((w * h) / density)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.6,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const maxDist = Math.min(160, w * 0.16);

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.4;
          ctx.strokeStyle = 'rgba(49,148,224,' + alpha + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(196,199,206,.68)';
      ctx.fill();
    }
  }

  function step() {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    draw();
    if (running) rafId = requestAnimationFrame(step);
  }

  function start() {
    if (running || prefersReducedMotion) return;
    running = true;
    rafId = requestAnimationFrame(step);
  }
  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  sizeCanvas();
  seedNodes();
  draw();

  if (!prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? start() : stop()));
    }, { threshold: 0 });
    io.observe(heroSection);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (heroSection.getBoundingClientRect().bottom > 0) start();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        sizeCanvas();
        seedNodes();
        draw();
      }, 150);
    });
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

/* --- "How it works" timeline: bar loads in blue, dots light up as it
   reaches them. Separate from .reveal since it's a fill/activate effect,
   not a fade. See the .timeline::after / .timeline-dot rules in CSS.
   Under reduced motion, CSS shows the completed state directly (no JS). */
if (!prefersReducedMotion) {
  const timelineEl = document.querySelector('.timeline');
  if (timelineEl) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0.3 });
    timelineObserver.observe(timelineEl);
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

/* Contact form submission is handled by the dedicated inline script on
   contact.html (Altcha verification + /api/submit-contact). A duplicate
   generic handler used to live here and raced against it on every submit,
   flashing a false "Something went wrong" on the button before the real
   handler reported success a moment later. Removed 2026-08-04. */
