/* main.js — vanilla JavaScript only, no libraries */
'use strict';

/* ---------- Portfolio pop-up (native <dialog>) ---------- */
(function initProjectDialog() {
  const dialog = document.getElementById('project-dialog');
  if (!dialog) return;

  const titleEl = document.getElementById('dialog-title');
  const bodyEl = document.getElementById('dialog-body');
  const linkEl = document.getElementById('dialog-link');
  const closeBtn = document.getElementById('dialog-close');
  let lastTrigger = null;

  document.querySelectorAll('[data-dialog-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      lastTrigger = btn;
      titleEl.textContent = btn.dataset.title;
      bodyEl.textContent = btn.dataset.summary;
      linkEl.href = btn.dataset.href;
      linkEl.setAttribute('aria-label', 'View full details of ' + btn.dataset.title);
      dialog.showModal(); // traps focus and closes on Esc natively
      closeBtn.focus();
    });
  });

  closeBtn.addEventListener('click', () => dialog.close());

  // Close when clicking the backdrop
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  // Return focus to the button that opened the dialog
  dialog.addEventListener('close', () => {
    if (lastTrigger) lastTrigger.focus();
  });
})();

/* ---------- Contact form validation (client side only) ---------- */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const fields = {
    name: {
      el: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate: (v) => (v.trim().length >= 2 ? '' : 'Enter Furqan Haydar Iqbal (at least 2 characters).'),
    },
    email: {
      el: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: (v) => {
        if (!v.trim()) return 'Enter your email address.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
          ? ''
          : 'Enter a valid email address, for example name@example.com.';
      },
    },
    subject: {
      el: document.getElementById('subject'),
      error: document.getElementById('subject-error'),
      validate: (v) => (v ? '' : 'Choose a subject from the list.'),
    },
    message: {
      el: document.getElementById('message'),
      error: document.getElementById('message-error'),
      validate: (v) => (v.trim().length >= 10 ? '' : 'Enter a message of at least 10 characters.'),
    },
  };

  function showError(field, message) {
    field.error.textContent = message;
    field.error.hidden = !message;
    if (message) {
      field.el.setAttribute('aria-invalid', 'true');
    } else {
      field.el.removeAttribute('aria-invalid');
    }
  }

  // Validate a single field when the user leaves it
  Object.values(fields).forEach((field) => {
    field.el.addEventListener('blur', () => showError(field, field.validate(field.el.value)));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.hidden = true;
    status.className = 'form-status';

    let firstInvalid = null;
    const messages = [];

    Object.values(fields).forEach((field) => {
      const message = field.validate(field.el.value);
      showError(field, message);
      if (message) {
        messages.push(message);
        if (!firstInvalid) firstInvalid = field.el;
      }
    });

    if (firstInvalid) {
      status.classList.add('error');
      status.textContent =
        'Your message has not been sent. There ' +
        (messages.length === 1 ? 'is 1 problem' : 'are ' + messages.length + ' problems') +
        ' to fix below.';
      status.hidden = false;
      firstInvalid.focus();
      return;
    }

    // Client side only: no data is sent anywhere.
    const name = fields.name.el.value.trim();
    form.reset();
    status.classList.add('success');
    status.textContent = 'Thank you, ' + name + '. Your message has been recorded (demo only: nothing was sent).';
    status.hidden = false;
  });

  form.addEventListener('reset', () => {
    Object.values(fields).forEach((field) => showError(field, ''));
    status.hidden = true;
  });
})();
