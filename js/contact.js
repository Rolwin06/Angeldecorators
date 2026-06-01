/* ===================================================================
   contact.js – Contact form handling & toast notifications
   =================================================================== */

import { $ } from './script.js';

/** Show a toast notification for `duration` milliseconds. */
function showToast(message, duration = 3000) {
  const toast   = $('#toast');
  const msgSpan = $('#toastMessage');
  if (!toast || !msgSpan) return;

  msgSpan.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/** Initialise the contact form with validation & simulated submission. */
export function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name  = $('#name').value.trim();
    const phone = $('#phone').value.trim();

    if (!name)  { showToast('Please enter your name.');         $('#name').focus();  return; }
    if (!phone) { showToast('Please enter your phone number.'); $('#phone').focus(); return; }

    // Simulate submission
    const btn = $('#form-submit-btn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled  = true;

    setTimeout(() => {
      showToast('Thank you! We will contact you soon. 🎉');
      form.reset();
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled  = false;
    }, 1500);
  });
}
