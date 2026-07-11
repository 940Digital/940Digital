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
   Desktop: fixed 2-panel slide (each section's full 2x2 grid).
   Mobile: cards are re-paginated at runtime into however many "screens" actually
   fit the device's real viewport height (2ish cards per screen, top-aligned),
   since a fixed card count doesn't work across phone sizes. */
(function() {
  const scrollStage = document.getElementById('scrollStage');
  const scrollTrack = document.getElementById('scrollTrack');
  if (!scrollStage || !scrollTrack) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // CSS fallback handles this entirely, no JS needed

  const MOBILE_QUERY = '(max-width: 768px)';
  const PAGE_PADDING_V = 40; // px — matches .mobile-page's top+bottom padding (1.25rem each)
  const PAGE_GAP = 16; // px — matches .mobile-page's gap

  const stickyEl = scrollStage.querySelector('.scroll-stage-sticky');
  const stickyTopOffset = parseFloat(getComputedStyle(stickyEl).top) || 0;
  const originalTrackHTML = scrollTrack.innerHTML;

  let numPages = 2;
  let isMobileMode = null;

  // Measure an element's real height in the exact context it will render in
  // (a .mobile-page of the given theme, at real viewport width) via an
  // isolated off-screen clone — avoids relying on CSS cascade matching
  // between wherever the element currently lives and its final .mobile-page home.
  function measureHeight(el, themeClass) {
    const temp = document.createElement('div');
    temp.className = 'mobile-page ' + themeClass;
    temp.style.position = 'fixed';
    temp.style.top = '-9999px';
    temp.style.left = '0';
    temp.style.width = window.innerWidth + 'px';
    temp.style.visibility = 'hidden';
    const clone = el.cloneNode(true);
    temp.appendChild(clone);
    document.body.appendChild(temp);
    const h = clone.offsetHeight;
    document.body.removeChild(temp);
    return h;
  }

  function paginateSection(headerEl, items, availableHeight, themeClass) {
    const headerHeight = headerEl ? measureHeight(headerEl, themeClass) : 0;
    const itemHeights = items.map(item => measureHeight(item, themeClass));
    const pages = [];
    let idx = 0;
    let isFirst = true;
    while (idx < items.length) {
      const pageItems = [];
      let used = isFirst ? headerHeight : 0;
      while (idx < items.length) {
        const itemH = itemHeights[idx];
        const gapNeeded = used > 0 ? PAGE_GAP : 0;
        if (used + gapNeeded + itemH > availableHeight && pageItems.length > 0) break;
        used += gapNeeded + itemH;
        pageItems.push(items[idx]);
        idx++;
      }
      pages.push({ header: isFirst ? headerEl : null, items: pageItems });
      isFirst = false;
    }
    return pages;
  }

  function buildDesktopLayout() {
    scrollTrack.innerHTML = originalTrackHTML;
    scrollTrack.style.width = '200%';
    Array.from(scrollTrack.children).forEach(panel => { panel.style.flex = ''; });
    scrollStage.style.height = '';
    numPages = 2;
    isMobileMode = false;
  }

  function buildMobileLayout() {
    // Reset to source markup first so measurements reflect real rendering, not a stale rebuild
    scrollTrack.innerHTML = originalTrackHTML;
    scrollTrack.style.width = '';
    scrollStage.style.height = '';

    const availableHeight = stickyEl.getBoundingClientRect().height - PAGE_PADDING_V;

    const servicesSection = scrollTrack.querySelector('.services-section');
    const difSection = scrollTrack.querySelector('.hscroll');
    const servicesHeader = servicesSection.querySelector('.section-header');
    const serviceCards = Array.from(servicesSection.querySelectorAll('.card'));
    const difLabel = difSection.querySelector('.hscroll-label');
    const difPanels = Array.from(difSection.querySelectorAll('.hscroll-panel'));

    const servicePages = paginateSection(servicesHeader, serviceCards, availableHeight, 'mobile-page--sand');
    const difPages = paginateSection(difLabel, difPanels, availableHeight, 'mobile-page--dark');

    const fragment = document.createDocumentFragment();
    function appendPages(pages, themeClass) {
      pages.forEach(page => {
        const pageEl = document.createElement('div');
        pageEl.className = 'mobile-page ' + themeClass;
        if (page.header) pageEl.appendChild(page.header);
        page.items.forEach(item => pageEl.appendChild(item));
        fragment.appendChild(pageEl);
      });
    }
    appendPages(servicePages, 'mobile-page--sand');
    appendPages(difPages, 'mobile-page--dark');

    scrollTrack.innerHTML = '';
    scrollTrack.appendChild(fragment);

    numPages = Math.max(1, servicePages.length + difPages.length);
    scrollTrack.style.width = (numPages * 100) + '%';
    Array.from(scrollTrack.children).forEach(page => {
      page.style.flex = `0 0 ${100 / numPages}%`;
    });

    const stickyHeightPx = stickyEl.getBoundingClientRect().height;
    scrollStage.style.height = (stickyHeightPx * numPages) + 'px';

    isMobileMode = true;
  }

  function updateStage() {
    const rect = scrollStage.getBoundingClientRect();
    const pinnedHeight = stickyEl.offsetHeight;
    const runway = scrollStage.offsetHeight - pinnedHeight - stickyTopOffset;
    let progress = 0;
    if (runway > 0) {
      progress = -rect.top / runway;
      progress = Math.min(1, Math.max(0, progress));
    }
    const maxShiftPct = ((numPages - 1) / numPages) * 100;
    scrollTrack.style.transform = `translateX(-${progress * maxShiftPct}%)`;
  }

  let stageTicking = false;
  window.addEventListener('scroll', () => {
    if (!stageTicking) {
      requestAnimationFrame(() => { updateStage(); stageTicking = false; });
      stageTicking = true;
    }
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const mobileNow = window.matchMedia(MOBILE_QUERY).matches;
      if (mobileNow) {
        buildMobileLayout(); // rebuild regardless — viewport height may have changed (orientation, browser chrome)
      } else if (mobileNow !== isMobileMode) {
        buildDesktopLayout();
      }
      updateStage();
    }, 150);
  });

  if (window.matchMedia(MOBILE_QUERY).matches) {
    buildMobileLayout();
  } else {
    buildDesktopLayout();
  }
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
