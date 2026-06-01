/* ===================================================================
   gallery.js – Dynamic gallery, filter buttons & lightbox
   =================================================================== */

import { $, $$ } from './script.js';

let galleryItems   = [];   // current DOM nodes
let currentIndex   = 0;
let visibleImages  = [];

/* ── Helpers ────────────────────────────────────────────────────── */

function getVisible() {
  return galleryItems.filter((el) => !el.classList.contains('hidden'));
}

/* ── Lightbox ───────────────────────────────────────────────────── */

function openLightbox(index) {
  visibleImages = getVisible();
  currentIndex  = index;
  const item    = visibleImages[index];
  const img     = $('img', item);
  const caption = $('h4', item);

  const lbImg     = $('#lightboxImg');
  const lbCaption = $('#lightboxCaption');
  const lightbox  = $('#lightbox');

  lbImg.src  = img.src;
  lbImg.alt  = img.alt;
  lbCaption.textContent = caption ? caption.textContent : '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  $('#lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function navigate(dir) {
  visibleImages = getVisible();
  currentIndex  = (currentIndex + dir + visibleImages.length) % visibleImages.length;

  const item    = visibleImages[currentIndex];
  const img     = $('img', item);
  const caption = $('h4', item);
  const lbImg   = $('#lightboxImg');

  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    $('#lightboxCaption').textContent = caption ? caption.textContent : '';
    lbImg.style.opacity = '1';
  }, 200);
}

/* ── Public init ────────────────────────────────────────────────── */

/**
 * Fetch gallery.json, build filter buttons + gallery grid, wire up lightbox.
 */
export async function initGallery() {
  const grid       = $('#galleryGrid');
  const filtersDiv = $('#galleryFilters');
  if (!grid || !filtersDiv) return;

  try {
    const res  = await fetch('data/gallery.json');
    const data = await res.json();

    /* ── Build filter buttons from unique categories ── */
    const categories = ['all', ...new Set(data.map((d) => d.category))];
    filtersDiv.innerHTML = categories.map((cat) => {
      const label  = cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1);
      const active = cat === 'all' ? ' active' : '';
      return `<button class="filter-btn${active}" data-filter="${cat}" id="filter-${cat}">${label}</button>`;
    }).join('');

    /* ── Build gallery items ── */
    grid.innerHTML = data.map((item) => `
      <div class="gallery-item reveal-scale" data-category="${item.category}">
        <img src="${item.image}" alt="${item.alt}" loading="lazy" />
        <div class="gallery-item-overlay">
          <div class="zoom-icon"><i class="fas fa-search-plus"></i></div>
          <h4>${item.title}</h4>
          <p>${item.label}</p>
        </div>
      </div>
    `).join('');

    /* ── Cache new DOM nodes ── */
    galleryItems = $$('.gallery-item');

    /* ── Filter logic ── */
    $$('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('.filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        galleryItems.forEach((item) => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.classList.remove('hidden');
            item.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });

    /* ── Lightbox click handlers ── */
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const vis = getVisible();
        openLightbox(Math.max(0, vis.indexOf(item)));
      });
    });

  } catch (err) {
    console.error('Failed to load gallery:', err);
  }

  /* ── Lightbox controls (always attach — elements come from gallery.html) ── */
  const lbImg = $('#lightboxImg');
  if (lbImg) lbImg.style.transition = 'opacity 0.2s ease';

  $('#lightboxClose')?.addEventListener('click', closeLightbox);
  $('#lightboxPrev')?.addEventListener('click', () => navigate(-1));
  $('#lightboxNext')?.addEventListener('click', () => navigate(1));

  $('#lightbox')?.addEventListener('click', (e) => {
    if (e.target === $('#lightbox')) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!$('#lightbox')?.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch swipe (mobile)
  let touchStartX = 0;
  $('#lightbox')?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  $('#lightbox')?.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  }, { passive: true });
}
