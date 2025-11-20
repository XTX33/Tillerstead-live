# Tillerstead Accessibility & Developer Tools Guide (Simplified)

## Overview
The Tillerstead site maintains WCAG 2.1 AA accessibility through semantic HTML, high‑contrast design tokens, and manual audits. Previous automated contrast systems and a high contrast mode have been removed to simplify the stack.

---

## 1. Color & Contrast

All body text now uses a single high‑contrast token (`--color-text`). Secondary and subtle tokens were unified/adjusted to remain readable on light parchment backgrounds and within dark overlay cards. No runtime mutation occurs.

Target ratios (manual verification using browser dev tools or external checkers):
- Normal text: 4.5:1 minimum
- Large text (≥18.66px or ≥14px bold): 3.0:1 minimum

Use https://webaim.org/resources/contrastchecker/ for spot checks when adding new colors.

---

## 2. Removed Systems (Historical)

The following previously existed but are now deprecated and inert:
- `auto-contrast.js` (brand color auto-correction)
- `contrast.js` (mix-based precise contrast)
- High Contrast UI toggle / keyboard shortcut

All related scripts and CSS media queries were purged for performance and simplicity. This section documents deprecation only.

---

## 3. Focus & Keyboard

Focus states remain visible using `:focus-visible` with a 3px emerald outline and offset. Test tab order on new interactive components before merging.

---

## 4. Dev Audit Panel

### What It Does
A **browser-based audit dashboard** showing:
1. **SEO summary**: Title length, meta description length, canonical URL presence, OG image URL.
2. Ability to **export summary data as JSON** for logging or further analysis.

### How to Activate
**Via URL Parameter**: Append `?audit=1` to any page URL.
```
https://tillerstead.com/?audit=1
```

**Via Keyboard**: Press **`Alt + Shift + A`** (reloads with audit enabled).

**Via localStorage**:
```javascript
localStorage.setItem('ts:audit', '1');
location.reload();
```

### What You See
A **fixed panel** appears bottom-right with three sections:

#### Accessibility Checks
Manually confirm:
- Single `<h1>` present
- No missing `alt` attributes
- Adequate color contrast (spot check new colors)

#### SEO Summary
Quick reference:
- Title: `"Page Title | Tillerstead LLC"` (length: 42)
- Description: `"Tillerstead LLC provides..."` (length: 154)
- Canonical: Present ✓
- OG Image: `/assets/img/og.jpg`

#### Copy JSON
Click **"Copy JSON"** to export summary data for documenting SEO and structural checks.

### Persistence
Check the **"Persist (localStorage)"** checkbox to keep the audit panel enabled across page reloads (without `?audit=1`).

---

## 5. Dev Audit Script (PowerShell, No Node Required)

### What It Does
A lightweight **static audit tool** that checks HTML files for common accessibility and SEO issues **without requiring Node.js**.

### When to Use
- Quick offline audit of the repo structure.
- Checking before commit for obvious issues.
- CI/CD integration if Node is unavailable.

### How to Run
```powershell
# Navigate to repo root, then:
powershell -ExecutionPolicy Bypass -File scripts/dev-audit.ps1
```

### Output Example
```
=== Tillerstead Dev Audit (Heuristic) ===
File: index.html
  Title length: 42
  Meta description length: 154
  Canonical present: True
  H1 count: 1
  Missing alt images: 0
  Inline color styles (check contrast): 2

File: pages/contact.html
  Title length: 38
  Meta description length: 120
  Canonical present: True
  H1 count: 1
  Missing alt images: 0
  Inline color styles (check contrast): 0
```

### What It Checks
1. **Title length**: 50–60 characters is ideal for SERPs.
2. **Meta description**: 150–160 characters ideal.
3. **Canonical link**: Present or missing.
4. **H1 count**: Should be 1 per page.
5. **Missing `alt` attributes**: All `<img>` tags should have alt text.
6. **Inline color styles**: Flags `style="color: #xxx"` for manual contrast review.

---

## Integration Notes

No active contrast scripts remain. Theme relies purely on static tokens.

---

## Quick Reference: Keyboard Shortcuts

| Shortcut | Action | Use Case |
|----------|--------|----------|
| **Alt + Shift + A** | Toggle Audit Panel | Quick SEO/accessibility structural check |

---

## Common Workflows

### Workflow 1: Testing Accessibility During Development
1. Open page in browser.
2. Tab through interactive elements; verify visible focus outline.
3. Spot check color contrast (browser dev tools / WebAIM).
4. Run audit panel (`Alt + Shift + A`) for structural summary.

### Workflow 2: Auditing a New Feature
1. Build component with semantic HTML.
2. Ensure body text uses tokenized colors (no inline hex unless justified).
3. Append `?audit=1` and reload for summary.
4. Fix any missing `alt`, duplicate `<h1>`, or meta issues.

### Workflow 3: Before Commit (No Node)
```powershell
# Quick scan for obvious issues
pwsh -ExecutionPolicy Bypass -File scripts/dev-audit.ps1

# Fix any flagged issues:
# - Add missing alt attributes
# - Ensure title/description lengths are within SEO range
# - Check inline color style contrast manually or via browser audit panel
```

---

## FAQ

**Q: Are any automated contrast scripts active?**
A: No. All contrast systems were deprecated; rely on manual checks.

**Q: How do I validate contrast?**
A: Use WebAIM’s contrast checker or browser dev tools.

**Q: Can I export audit data?**
A: Yes, via the audit panel’s JSON copy (structural/SEO only).

---

## Next Steps

- **For developers**: Reference this guide in PRs to confirm semantic structure & contrast compliance.
- **For CI/CD**: Use lint + optional audit script before deploy.
