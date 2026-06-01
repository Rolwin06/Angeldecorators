/* ===================================================================
   home.js – Hero section: particles & parallax
   =================================================================== */

import { $ } from './script.js';

/** Create floating particles in the hero section. */
export function initHeroParticles() {
  const container = $('#heroParticles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 15 : 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left            = `${Math.random() * 100}%`;
    particle.style.animationDelay  = `${Math.random() * 6}s`;
    particle.style.animationDuration = `${4 + Math.random() * 4}s`;
    particle.style.width = particle.style.height = `${2 + Math.random() * 3}px`;

    // Vary colour between gold & accent
    if (Math.random() > 0.6) particle.style.background = '#d4576b';

    container.appendChild(particle);
  }
}

/** Subtle parallax scroll on the hero background image. */
export function initHeroParallax() {
  const heroBg = $('.hero-bg img');
  if (!heroBg || window.innerWidth <= 768) return;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight) {
      heroBg.style.transform = `scale(1.1) translateY(${scroll * 0.15}px)`;
    }
  }, { passive: true });
}
