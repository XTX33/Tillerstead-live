/* auto-contrast.js — Tillerstead Brand Contrast Auto-Correction
   Scans common text elements and auto-corrects insufficient contrast
   using brand palette + dynamic light/dark adjustments.

   Strategy:
   1. Collect target elements (semantic text + interactive).
   2. Compute contrast ratio between foreground (color) and effective background.
   3. Determine required WCAG ratio (4.5 normal text, 3.0 large/bold text).
   4. If insufficient, attempt brand-preserving correction:
      - Prefer swapping to brand primary / accent if they achieve ratio.
      - Otherwise dynamically lighten/darken current color toward best pole (#000 or #fff)
        until ratio threshold met or max iterations reached.
   5. Apply corrected color via inline style and flag with data-contrast-fixed.
   6. Expose window.autoContrast() & integrate with existing window.applyContrast flow.

   Performance:
   - Runs once after DOMContentLoaded.
   - Can be re-run manually (e.g., after theme toggle) — lightweight (~O(n)).
   - Skips elements with background images/gradients for safety.

   Accessibility:
   - Adds data-contrast-original to preserve original color for future auditing.
   - Logs summary to console in dev environments.

   NOTE: Does not modify elements already marked .c-contrast (handled by contrast.js)
*/

(() => {
  'use strict';

  const BRAND = {
    primary: getCSSVar('--color-primary', '#00a86b'),
    primaryStrong: getCSSVar('--color-primary-strong', '#007a52'),
    accent: getCSSVar('--color-accent', '#8b6f47'),
    surface: getCSSVar('--color-surface', '#fffaf5'),
    surfaceElevated: getCSSVar('--color-surface-elevated', '#ffffff'),
    heading: getCSSVar('--color-heading', '#1a1a1a'),
  };

  function getCSSVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  // Relative luminance helper
  function luminance(hex) {
    const [r, g, b] = hexToRGB(hex).map(c => {
      const srgb = c / 255;
      return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function hexToRGB(hex) {
    let h = hex.replace('#', '').trim();
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    const int = parseInt(h, 16);
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
  }

  function rgbStringToHex(rgb) {
    const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return '#000000';
    return '#' + [m[1], m[2], m[3]].map(x => Number(x).toString(16).padStart(2, '0')).join('');
  }

  function contrastRatio(hex1, hex2) {
    /* auto-contrast.js deprecated: functionality removed per theme simplification.
       Intentionally left as a no-op to avoid 404s if still referenced. */
    // No operation
    const darker = Math.min(l1, l2);
