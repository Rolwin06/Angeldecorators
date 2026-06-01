/* ===================================================================
   services.js – Dynamic service cards & counter animation
   =================================================================== */

import { $, $$ } from './script.js';

/**
 * Fetch services.json and render service cards into the grid.
 */
export async function initServices() {
  const grid = $('#servicesGrid');
  if (!grid) return;

  try {
    const res  = await fetch('data/services.json');
    const data = await res.json();

    grid.innerHTML = data.map((svc, i) => `
      <div class="service-card reveal" style="transition-delay:${i * 0.1}s">
        <div class="service-icon">
          <i class="${svc.icon}"></i>
        </div>
        <h3>${svc.title}</h3>
        <p>${svc.description}</p>
        <a href="${svc.link}" class="service-link">
          Learn More <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load services:', err);
  }
}

/**
 * Animate counter numbers when the counters section scrolls into view.
 */
export function initCounters() {
  let animated = false;

  function animate() {
    if (animated) return;

    const section = $('#counters');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.85) return;

    animated = true;

    $$('.count').forEach((counter) => {
      const target    = +counter.dataset.target;
      const duration  = 2000;
      const startTime = performance.now();

      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        counter.textContent = Math.round(eased * target) + '+';
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  }

  window.addEventListener('scroll', animate, { passive: true });
  animate(); // check on load in case already visible
}
