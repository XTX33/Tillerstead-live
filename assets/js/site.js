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

  initNav();
  initStickyHeader();
  initAccordions();
})();
