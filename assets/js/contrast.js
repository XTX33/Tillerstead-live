/* contrast.js — Tillerstead High-Visibility Contrast System
   Automatically calculates and applies optimal text colors for WCAG compliance
   
   Features:
   - Scans elements with .c-contrast class
   - Computes contrast against background color
   - Chooses optimal pole (black/white) and mix percentage
   - Updates CSS variables for color-mix() function
   - Supports dynamic theme changes
   
   IMPORTANT: This file should only be loaded ONCE per page.
   Do not add duplicate script tags or duplicate implementations.
   
   SAFARI CRASH PREVENTION:
   - Avoid MutationObservers that watch ALL DOM changes and re-apply styles
   - Such observers can create infinite loops: observer triggers on style changes,
     which triggers applyContrast(), which changes styles, which triggers observer again
   - This crashes Safari on iOS with "A problem repeatedly occurred" error
   - Manual calls to window.applyContrast() are safe for theme toggles
*/

/* contrast.js deprecated: high-visibility mix system removed. No-op retained. */
// No operation

