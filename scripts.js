/* script.js
   Enhances navigation, form validation, scroll reveals, and adds small UI niceties.
   Place in project root and include with: <script src="script.js" defer></script>
*/

(() => {
  'use strict';

  /* -------------------------
     Utility helpers
  --------------------------*/
  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));

  const on = (el, evt, fn) => { if (!el) return; el.addEventListener(evt, fn); };

  const isEmail = (email) => {
    // conservative email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  };

  /* -------------------------
     NAV: mobile menu and active link
  --------------------------*/
  function setupNavigation() {
    const nav = $('.navbar') || $('nav') || null;
    if (!nav) return;

    const navLinks = $$('.nav-links a', nav);
    // Active link based on pathname
    const path = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(a => {
      const href = a.getAttribute('href') || '';
      // normalize
      const linkFile = href.split('/').pop();
      if (linkFile === path || (path === '' && (linkFile === 'index.html' || linkFile === './'))) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });

    // Build hamburger if small screen or if nav not already responsive
    const existingToggle = $('#mobile-nav-toggle');
    if (!existingToggle) {
      const toggle = document.createElement('button');
      toggle.id = 'mobile-nav-toggle';
      toggle.setAttribute('aria-label', 'Toggle navigation');
      toggle.innerHTML = `<span class="hamburger" aria-hidden="true"></span>`;
      // Basic hamburger styles (in case CSS missing)
      const style = document.createElement('style');
      style.innerHTML = `
        #mobile-nav-toggle { background: transparent; border: 0; cursor: pointer; display: none; }
        #mobile-nav-toggle .hamburger { display: block; width: 26px; height: 2px; background: #fff; position: relative; }
        #mobile-nav-toggle .hamburger::before, #mobile-nav-toggle .hamburger::after {
          content: ""; width: 26px; height: 2px; background: #fff; position: absolute; left: 0;
        }
        #mobile-nav-toggle .hamburger::before { top: -8px; }
        #mobile-nav-toggle .hamburger::after { top: 8px; }
        @media(max-width: 840px) { #mobile-nav-toggle { display: block; } .nav-links { display: none; position: absolute; right: 20px; top: 64px; background: rgba(0,0,0,0.85); padding: 12px; border-radius: 10px; flex-direction: column; gap: 10px; } .nav-links.show { display: flex; } }
      `;
      document.head.appendChild(style);
      // Insert toggle into nav bar (before nav-links)
      const navContainer = nav;
      navContainer.insertBefore(toggle, navContainer.firstChild);
      on(toggle, 'click', () => {
        const links = $('.nav-links', navContainer);
        if (!links) return;
        links.classList.toggle('show');
        toggle.classList.toggle('open');
      });
      // close menu on resize (desktop)
      on(window, 'resize', () => {
        const links = $('.nav-links', navContainer);
        if (!links) return;
        if (window.innerWidth > 840) links.classList.remove('show');
      });
      // close when clicking outside
      document.addEventListener('click', (e) => {
        const links = $('.nav-links', navContainer);
        if (!links) return;
        if (!navContainer.contains(e.target)) links.classList.remove('show');
      });
    }
  }

  /* -------------------------
     Smooth scroll for internal anchors
  --------------------------*/
  function setupSmoothScroll() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute('href');
      if (hash === '#' || hash === '#!') return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  }

  /* -------------------------
     Contact Form Validation + UX
  --------------------------*/
  function setupContactForm() {
    const form = $('.contact-form');
    if (!form) return;

    // helper to show inline error under input
    function showError(input, message) {
      removeError(input);
      const el = document.createElement('div');
      el.className = 'field-error';
      el.style.cssText = 'color:#ffcc80;margin-top:6px;font-size:0.95rem';
      el.textContent = message;
      input.insertAdjacentElement('afterend', el);
      input.classList.add('invalid-field');
    }

    function removeError(input) {
      const next = input.nextElementSibling;
      if (next && next.classList && next.classList.contains('field-error')) next.remove();
      input.classList.remove('invalid-field');
    }

    // show toast
    function showToast(message, success = true) {
      let toast = $('#site-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'site-toast';
        toast.style.cssText = 'position:fixed;right:20px;bottom:20px;padding:12px 18px;border-radius:10px;color:#111;font-weight:600;z-index:9999;box-shadow:0 6px 18px rgba(0,0,0,0.25);';
        document.body.appendChild(toast);
      }
      toast.textContent = message;
      toast.style.background = success ? 'linear-gradient(135deg,#a8e6a1,#4caf50)' : 'linear-gradient(135deg,#ffd1a3,#ff9800)';
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
      setTimeout(() => {
        toast.style.transition = 'opacity 400ms, transform 400ms';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(12px)';
      }, 2400);
    }

    on(form, 'submit', (e) => {
      e.preventDefault();

      // fields
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      let ok = true;
      if (!name || name.value.trim().length < 2) {
        showError(name, 'Please enter your full name (2+ characters).');
        ok = false;
      } else removeError(name);

      if (!email || !isEmail(email.value)) {
        showError(email, 'Please enter a valid email address.');
        ok = false;
      } else removeError(email);

      if (!message || message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters.');
        ok = false;
      } else removeError(message);

      if (!ok) {
        showToast('Please fix the errors and try again.', false);
        return;
      }

      // simulate sending (here you can hook an API)
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : null;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      // Simulate network delay
      setTimeout(() => {
        // success
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText || 'Send Message';
        }
        showToast('✅ Message sent! We will be in touch soon.', true);
      }, 1000);
    });

    // validate on input to clear errors as user types
    ['input', 'change'].forEach(evt => {
      form.addEventListener(evt, (e) => {
        const t = e.target;
        if (!t || !t.matches) return;
        if (t.matches('#email')) {
          if (isEmail(t.value)) removeError(t);
        } else if (t.matches('#name')) {
          if (t.value.trim().length > 1) removeError(t);
        } else if (t.matches('#message')) {
          if (t.value.trim().length >= 10) removeError(t);
        }
      }, { passive: true });
    });
  }

  /* -------------------------
     Scroll reveal (fade/slide in)
  --------------------------*/
  function setupRevealOnScroll() {
    const revealItems = $$('.feature-card, .about-card, .contact-form, .hero-text, .map, .features > *');
    if (!revealItems.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => {
      // initial state
      item.classList.add('reveal');
      io.observe(item);
    });

    // minimal CSS injection for reveal animation (so user doesn't have to edit CSS)
    const style = document.createElement('style');
    style.textContent = `
      .reveal { opacity: 0; transform: translateY(18px); transition: opacity 600ms ease, transform 600ms ease; }
      .reveal.reveal-visible { opacity: 1; transform: translateY(0); }
      .reveal-visible.reveal { will-change: transform, opacity; }
    `;
    document.head.appendChild(style);
  }

  /* -------------------------
     Hero subtle parallax
  --------------------------*/
  function setupHeroParallax() {
    const hero = $('.hero');
    if (!hero) return;
    const img = hero.querySelector('img');
    if (!img) return;

    window.addEventListener('scroll', () => {
      const rect = hero.getBoundingClientRect();
      // only when hero in view
      if (rect.bottom > 0) {
        const scrolled = window.scrollY || window.pageYOffset;
        // subtle translate
        const y = Math.min(Math.max(scrolled * 0.12, 0), 60);
        img.style.transform = `translateY(${y}px) scale(1.02)`;
        img.style.transition = 'transform 0.1s linear';
      }
    }, { passive: true });
  }

  /* -------------------------
     Init everything
  --------------------------*/
  function init() {
    setupNavigation();
    setupSmoothScroll();
    setupContactForm();
    setupRevealOnScroll();
    setupHeroParallax();

    // small accessibility improvement: focus visible outline for keyboard users
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing');
    });
  }

  // run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
