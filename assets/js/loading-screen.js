/**
 * Tillerstead Loading Screen
 * Handyman-style tile mortar/stone layer aesthetic with smooth transitions
 * 
 * Features:
 * - Animated tile pattern background
 * - Mortar-spreading progress indicator
 * - Graceful fade-out on page load
 * - Respects prefers-reduced-motion
 * - Accessible and performant
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    minDisplayTime: 800,        // Minimum time to show loading screen (ms)
    fadeOutDuration: 600,        // Fade out animation duration (ms)
    mortarDuration: 2500,        // Mortar animation duration (ms)
    statusMessages: [
      'Preparing your workspace...',
      'Loading tools...',
      'Setting up the foundation...',
      'Almost ready...'
    ]
  };

  // State
  let startTime = Date.now();
  let contentLoaded = false;
  let resourcesLoaded = false;

  /**
   * Create and inject the loading screen HTML
   */
  function createLoadingScreen() {
    const loadingHTML = `
      <div class="ts-loading-screen" id="tsLoadingScreen" role="status" aria-live="polite" aria-label="Loading page">
        <div class="ts-loading-content">
          <div class="ts-loading-logo" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 30h60M20 50h60M20 70h60M30 20v60M50 20v60M70 20v60" 
                    stroke="currentColor" 
                    stroke-width="3" 
                    stroke-linecap="round"
                    style="color: var(--color-primary, #1ac87a);" />
              <rect x="30" y="30" width="18" height="18" 
                    fill="var(--color-primary-soft, rgba(26, 200, 122, 0.3))" 
                    rx="2" />
              <rect x="52" y="52" width="18" height="18" 
                    fill="var(--color-accent-soft, rgba(216, 178, 90, 0.3))" 
                    rx="2" />
            </svg>
          </div>
          <p class="ts-loading-text">Tillerstead</p>
          <div class="ts-mortar-container" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
            <div class="ts-mortar-fill" id="tsMortarFill"></div>
          </div>
          <p class="ts-loading-status" id="tsLoadingStatus">Preparing your workspace...</p>
        </div>
        <div class="ts-tile-layers" aria-hidden="true">
          <div class="ts-tile-layer"></div>
          <div class="ts-tile-layer"></div>
          <div class="ts-tile-layer"></div>
          <div class="ts-tile-layer"></div>
          <div class="ts-tile-layer"></div>
        </div>
      </div>
    `;

    // Insert at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
  }

  /**
   * Update loading status message
   */
  function updateStatus(message) {
    const statusEl = document.getElementById('tsLoadingStatus');
    if (statusEl) {
      statusEl.textContent = message;
    }
  }

  /**
   * Update progress bar value for accessibility
   */
  function updateProgress(percent) {
    const container = document.querySelector('.ts-mortar-container');
    if (container) {
      container.setAttribute('aria-valuenow', Math.round(percent));
    }
  }

  /**
   * Animate status messages during loading
   */
  function animateStatusMessages() {
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (contentLoaded && resourcesLoaded) {
        clearInterval(interval);
        updateStatus('Ready!');
        return;
      }

      messageIndex = (messageIndex + 1) % CONFIG.statusMessages.length;
      updateStatus(CONFIG.statusMessages[messageIndex]);
    }, 1000);

    // Return interval for potential cleanup
    return interval;
  }

  /**
   * Hide the loading screen with smooth transition
   */
  function hideLoadingScreen() {
    const loadingScreen = document.getElementById('tsLoadingScreen');
    if (!loadingScreen) return;

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, CONFIG.minDisplayTime - elapsedTime);

    setTimeout(() => {
      // Update final progress
      updateProgress(100);
      updateStatus('Ready!');

      // Add loaded class to trigger CSS transition
      requestAnimationFrame(() => {
        loadingScreen.classList.add('loaded');

        // Remove from DOM after transition
        setTimeout(() => {
          if (loadingScreen.parentNode) {
            loadingScreen.parentNode.removeChild(loadingScreen);
          }
        }, CONFIG.fadeOutDuration);
      });
    }, remainingTime);
  }

  /**
   * Initialize the loading screen
   */
  function init() {
    // Create loading screen as early as possible
    if (document.body) {
      createLoadingScreen();
    } else {
      // Wait for body if it doesn't exist yet
      document.addEventListener('DOMContentLoaded', createLoadingScreen);
    }

    // Animate status messages
    animateStatusMessages();

    // Simulate progress for mortar animation
    const progressInterval = setInterval(() => {
      if (contentLoaded && resourcesLoaded) {
        clearInterval(progressInterval);
        updateProgress(100);
      }
    }, 100);

    // Handle DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        contentLoaded = true;
        updateProgress(70);
        if (resourcesLoaded) {
          hideLoadingScreen();
        }
      });
    } else {
      contentLoaded = true;
    }

    // Handle full page load (all resources)
    if (document.readyState === 'complete') {
      resourcesLoaded = true;
      if (contentLoaded) {
        hideLoadingScreen();
      }
    } else {
      window.addEventListener('load', () => {
        resourcesLoaded = true;
        updateProgress(90);
        if (contentLoaded) {
          hideLoadingScreen();
        }
      });
    }

    // Fallback: hide after maximum wait time (10 seconds)
    setTimeout(() => {
      if (!resourcesLoaded || !contentLoaded) {
        console.warn('Tillerstead: Loading screen timeout - forcing hide');
        contentLoaded = true;
        resourcesLoaded = true;
        hideLoadingScreen();
      }
    }, 10000);
  }

  // Initialize immediately
  init();

  // Expose control function for manual triggering if needed
  window.tillerstadLoading = {
    hide: hideLoadingScreen,
    updateStatus: updateStatus
  };
})();
