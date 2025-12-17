(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js-enabled');

  const header = document.querySelector('.site-header');
  const navShell = document.querySelector('[data-nav-container]');
  const nav = document.getElementById('site-nav');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navClose = document.querySelector('[data-nav-close]');
  const navOverlay = document.querySelector('[data-nav-overlay]');
  const focusables =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const DESKTOP_WIDTH = 920;
  let lastFocus = null;

  const isMobile = () => window.innerWidth < DESKTOP_WIDTH;
  const navIsOpen = () => navShell?.classList.contains('is-open');

  const announce = (el, message, state = 'success') => {
    if (!el) return;
    el.textContent = message;
    el.classList.remove('sr-only');
    el.setAttribute('data-state', state);
  };

  const syncNavState = (open) => {
    navShell?.classList.toggle('is-open', open);
    nav?.classList.toggle('is-open', open);
    navOverlay?.classList.toggle('is-active', open);
    document.body.classList.toggle('nav-open', open);
    const expanded = open ? 'true' : 'false';
    navToggle?.setAttribute('aria-expanded', expanded);
    nav?.setAttribute('aria-expanded', expanded);
  };

  const trapFocus = (event) => {
    if (event.key !== 'Tab' || !navIsOpen() || !nav) return;
    const items = Array.from(nav.querySelectorAll(focusables)).filter((el) => {
      const isVisible = el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length;
      return isVisible && !el.disabled && el.getAttribute('tabindex') !== '-1';
    });
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape' && navIsOpen()) {
      event.preventDefault();
      closeNav();
      return;
    }
    trapFocus(event);
  };

  const openNav = () => {
    if (!nav || !navShell || !isMobile()) return;
    lastFocus = document.activeElement;
    syncNavState(true);
    document.addEventListener('keydown', handleKeydown);
    const first = nav.querySelector(focusables);
    if (first) first.focus();
  };

  const closeNav = () => {
    syncNavState(false);
    document.removeEventListener('keydown', handleKeydown);
    const target = lastFocus || navToggle || document.body;
    lastFocus = null;
    if (target && typeof target.focus === 'function') {
      target.focus();
    }
  };

  const initNav = () => {
    syncNavState(false);
    if (!nav || !navToggle) return;

    navToggle.addEventListener('click', (event) => {
      event.preventDefault();
      navIsOpen() ? closeNav() : openNav();
    });

    navClose?.addEventListener('click', (event) => {
      event.preventDefault();
      closeNav();
    });

    navOverlay?.addEventListener('click', closeNav);

    nav?.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link && isMobile()) {
        closeNav();
      }
    });

    window.addEventListener('resize', () => {
      if (!isMobile() && navIsOpen()) {
        closeNav();
      } else {
        syncNavState(false);
      }
    });
  };

  const setStickyState = () => {
    if (!header) return;
    const scrolled = window.scrollY > 6;
    header.classList.toggle('is-sticky', scrolled);
  };

  const initStickyHeader = () => {
    if (!header) return;
    setStickyState();
    window.addEventListener(
      'scroll',
      () => window.requestAnimationFrame(setStickyState),
      { passive: true }
    );
  };

  const initAccordions = () => {
    const accordions = Array.from(document.querySelectorAll('details[data-accordion]'));
    if (!accordions.length) return;

    const closeSiblings = (current) => {
      const group = current.closest('[data-accordion-group]');
      if (!group) return;
      accordions.forEach((accordion) => {
        if (accordion !== current && group.contains(accordion)) {
          accordion.removeAttribute('open');
          accordion.classList.remove('is-open');
        }
      });
    };

    accordions.forEach((accordion) => {
      accordion.classList.toggle('is-open', accordion.open);
      accordion.addEventListener('toggle', () => {
        accordion.classList.toggle('is-open', accordion.open);
        if (accordion.open) {
          closeSiblings(accordion);
        }
      });
    });
  };

  const hydrateImages = (img) => {
    const { src, srcset } = img.dataset;
    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
    }
    if (srcset) {
      img.srcset = srcset;
      img.removeAttribute('data-srcset');
    }
  };

  const initLazyImages = () => {
    const lazyImages = Array.from(document.querySelectorAll('img[data-src], img[data-srcset]'));
    if (!lazyImages.length) return;

    lazyImages.forEach((img) => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    });

    if ('loading' in HTMLImageElement.prototype) {
      lazyImages.forEach(hydrateImages);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          hydrateImages(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '120px 0px', threshold: 0.01 }
    );

    lazyImages.forEach((img) => observer.observe(img));
  };

  const buildMailto = (form, data) => {
    const email = form.dataset.contactEmail || 'info@tillerstead.com';
    const subject = encodeURIComponent('New Tillerstead project inquiry');
    const body = [];
    data.forEach((value, key) => {
      if (key === 'form-name' || /^_/.test(key) || key === 'bot-field') return;
      body.push(`${key}: ${String(value)}`);
    });
    const lines = encodeURIComponent(body.join('\r\n\r\n'));
    return `mailto:${email}?subject=${subject}&body=${lines}`;
  };

  const initContactForms = () => {
    const forms = Array.from(document.querySelectorAll('form[data-contact-form]'));
    if (!forms.length) return;

    forms.forEach((form) => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const submit = form.querySelector('button[type="submit"], input[type="submit"]');
        submit?.setAttribute('disabled', 'true');
        const status = form.querySelector('[data-form-status]');
        const data = new FormData(form);
        if (!data.get('form-name') && form.name) data.append('form-name', form.name);
        const encoded = new URLSearchParams(data).toString();
        const action = (form.getAttribute('action') || '').trim();
        const shouldPost = action && !action.startsWith('mailto:');
        let posted = false;

        if (shouldPost) {
          try {
            const response = await fetch(action, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: encoded,
            });
            if (!response.ok) throw new Error(`Status ${response.status}`);
            posted = true;
            announce(status, 'Request received. I will follow up within one business day.');
            form.reset();
            const redirect = data.get('_next');
            if (redirect) {
              setTimeout(() => {
                window.location.href = redirect;
              }, 250);
            }
          } catch (error) {
            console.warn('Form submission failed, falling back to mailto.', error);
          }
        }

        if (!posted) {
          const mailto = buildMailto(form, data);
          announce(
            status,
            `Opening your email app to finish the request. Or email ${form.dataset.contactEmail ||
              'info@tillerstead.com'} directly.`,
            'info'
          );
          setTimeout(() => {
            window.location.href = mailto;
          }, 300);
        }

        submit?.removeAttribute('disabled');
      });
    });
  };

  initNav();
  initStickyHeader();
  initAccordions();
  initLazyImages();
  initContactForms();
})();
