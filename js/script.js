/* ===================================================================
   script.js – Main orchestrator
   Loads section partials, initialises shared behaviour, then
   delegates to per-section modules.
   =================================================================== */

/* ── Shared DOM helpers (exported for child modules) ────────────── */
export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Section loader ─────────────────────────────────────────────── */

/** Fetch an HTML partial and inject it into the given container. */
async function loadSection(url, container) {
  try {
    const res  = await fetch(url);
    const html = await res.text();
    container.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    console.error(`Failed to load section ${url}:`, err);
  }
}

/* ── Boot sequence ──────────────────────────────────────────────── */

(async () => {
  'use strict';

  const app = $('#app');

  // 1. Load every section partial in order
  const sections = [
    'sections/home.html',
    'sections/gallery.html',
    'sections/contact.html',
    'sections/footer.html',
  ];

  for (const url of sections) {
    await loadSection(url, app);
  }

  // 2. Import & initialise per-section modules
  const { initHeroParticles, initHeroParallax } = await import('./home.js');
  const { initGallery }                         = await import('./gallery.js');

  initHeroParticles();
  initHeroParallax();
  await initGallery();

  // 3. Shared behaviours (run after DOM is fully populated)

  /* ── Preloader ── */
  const preloader = $('#preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('hidden'), 600);
  }

  /* ── Navbar scroll effect ── */
  const navbar   = $('#navbar');
  const backTop  = $('#backToTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar?.classList.toggle('scrolled', y > 50);
    backTop?.classList.toggle('visible', y > 500);
  }, { passive: true });

  /* ── Active nav-link on scroll ── */
  const navLinks    = $$('.nav-link');
  const sectionEls  = $$('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sectionEls.forEach((sec) => {
      const top = sec.offsetTop;
      const id  = sec.id;
      if (scrollY >= top && scrollY < top + sec.offsetHeight) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { passive: true });

  /* ── Mobile menu ── */
  const hamburger  = $('#hamburger');
  const navMenu    = $('#navMenu');
  const navOverlay = $('#navOverlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  }

  hamburger?.addEventListener('click', toggleMenu);
  navOverlay?.addEventListener('click', toggleMenu);
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) toggleMenu();
    });
  });

  /* ── Smooth scroll for all anchor links ── */
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        const target = $(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* ── Back-to-top button ── */
  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Scroll-reveal (IntersectionObserver) ── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
    );
    $$('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => observer.observe(el));
  }

  /* ── Fallback scroll-reveal (no IO) ── */
  function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;
    $$('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      if (el.getBoundingClientRect().top < trigger) el.classList.add('active');
    });
  }
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll();

})();
