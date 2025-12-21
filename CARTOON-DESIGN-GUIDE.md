# 🎬 Tillerstead American Cartoon Design System

**Classic Saturday Morning Vibes Meet Professional Tile Expertise**

---

## 🎨 The Vision

**NOT rainbow chaos. CLASSIC American cartoons.**

Think:
- **Looney Tunes** - Bold primaries, clean outlines
- **Hanna-Barbera** - Limited palette, graphic punch
- **Vintage animation cells** - Clean, bold, memorable
- **Mid-century cartoons** - Fun but focused

---

## 🎯 Color Strategy

### PRIMARY PALETTE (The Big 3)

**Cartoon Blue** - Trust, sky, classic backdrop
```
--cartoon-blue: #4A90E2
```
Use for: Primary buttons, headers, trustworthy elements

**Fire Engine Red** - Energy, action, urgency
```
--cartoon-red: #E63946
```
Use for: CTAs, urgent messages, action elements

**Golden Yellow** - Highlight, value, attention
```
--cartoon-yellow: #FFCA28
```
Use for: POW effects, badges, special highlights

### SUPPORT COLORS (Use Sparingly)

**Grass Green** - Success, fresh, positive
```
--cartoon-green: #4CAF50
```

**Inky Black** - Outlines, text, graphic punch
```
--cartoon-black: #1A1A1A
```

**Pure White** - Clean space, speech bubbles
```
--cartoon-white: #FFFFFF
```

---

## 🎬 Key Design Principles

### 1. **Limited Palette = More Impact**
- Use 2-3 colors per section MAX
- Blue + Yellow? ✅
- Red + White? ✅
- All colors at once? ❌

### 2. **Bold Outlines on Everything**
```scss
border: 3-4px solid var(--cartoon-black);
```

### 3. **Classic Offset Shadows**
```scss
box-shadow: 5px 5px 0 var(--cartoon-black);
```
NOT soft blur shadows. Hard, graphic, cel-animation style.

### 4. **Clean Geometry**
- Rounded corners (8-16px)
- Simple shapes
- No complex patterns
- Clean, graphic punch

---

## 📐 Component Examples

### Hero Section
```html
<section class="hero-cartoon">
  <div class="container">
    <span class="badge-cartoon badge-cartoon-yellow">
      🏅 NJ HIC Licensed
    </span>
    
    <h1 class="hero-cartoon-title">
      TILE WORK THAT LASTS!
    </h1>
    
    <p class="hero-cartoon-subtitle">
      TCNA-compliant installations with flood-tested waterproofing.
      No shortcuts. No surprises. Just tile that actually works.
    </p>
    
    <button class="btn-cartoon btn-cartoon-red btn-cartoon-lg">
      GET YOUR FREE QUOTE! →
    </button>
  </div>
</section>
```

**Result:**
- Blue sky gradient background
- White text with black outline
- Red CTA button pops
- Yellow badge draws eye
- Clean, bold, memorable

### Service Cards
```html
<div class="grid-cartoon">
  <div class="card-cartoon">
    <span class="badge-action">POPULAR!</span>
    <h3>Tile Installation</h3>
    <p>TCNA-compliant tile work that doesn't crack...</p>
    <button class="btn-cartoon btn-cartoon-blue">
      LEARN MORE →
    </button>
  </div>
  
  <div class="card-cartoon card-cartoon-blue">
    <h3>Waterproofing</h3>
    <p>Flood-tested before tile goes down...</p>
    <button class="btn-cartoon btn-cartoon-yellow">
      SEE PHOTOS →
    </button>
  </div>
</div>
```

### Speech Bubbles (Testimonials)
```html
<div class="speech-bubble-cartoon">
  "These guys sent me 47 photos. FORTY-SEVEN! 
  I've never seen documentation like this!"
</div>
```

### Action Words
```html
<span class="action-word pow">POW!</span>
<span class="action-word wham">WHAM!</span>
<span class="action-word boom">BOOM!</span>
```

Use sparingly for impact:
- Project completion: BOOM!
- Zero leaks guarantee: POW!
- Fast turnaround: ZAP!

---

## 🎨 Color Usage Guide

### DO's ✅

**Blue Sections:**
- Hero (sky gradient)
- Trust/credibility sections
- Professional service cards

**Red Elements:**
- Primary CTAs
- Urgent messages ("Limited Time!")
- Action buttons

**Yellow Accents:**
- Badges ("New!", "Popular!")
- Highlights
- POW/BOOM effects
- Small attention-getters

**Green:**
- Success messages only
- "Zero Leaks" badges
- Positive feedback

### DON'Ts ❌

❌ Don't use all colors in one section
❌ Don't use gradients with more than 2 colors
❌ Don't add soft, blurry shadows
❌ Don't use thin borders (3-4px minimum!)
❌ Don't make it look like a children's website

---

## 🎯 Section Color Schemes

### Hero Section
- Background: Blue sky gradient
- Text: White with black outline
- CTA: Red button
- Badge: Yellow

### Services Section
- Background: White/cream
- Cards: White with black outlines
- Accents: Blue headers
- CTAs: Blue buttons

### Testimonials Section
- Background: Light blue tint
- Bubbles: White with black outlines
- Text: Black
- Accents: Yellow badges

### CTA Section
- Background: Red or yellow
- Text: White (on red) or Black (on yellow)
- Button: Blue (stands out on red/yellow)

---

## 📏 Typography

### Display Font (Headings, Buttons)
**Bangers** or **Impact**
- All caps for major headings
- Bold, graphic, immediate impact
- 90s cartoon energy

### Handwritten Font (Subtitles, Speech Bubbles)
**Patrick Hand** or **Comic Sans MS** (yes, really!)
- Adds warmth and personality
- Good for speech bubbles
- Use for casual copy

### Body Font (Content)
**Inter** or system fonts
- Clean, readable
- Professional
- Modern touch

---

## 🎪 Layout Examples

### Homepage Structure

```
┌─────────────────────────────────────┐
│ HERO (Blue Sky Gradient)           │
│ • Yellow badge                      │
│ • White text w/ black outline       │
│ • Red CTA button                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ SERVICES (White background)         │
│ • 3 cards with black outlines       │
│ • Blue headers                      │
│ • Blue buttons                      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ HOW IT WORKS (Light blue tint)      │
│ • 3 steps with numbers              │
│ • Yellow starburst accents          │
│ • Simple graphics                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ TESTIMONIALS (White background)     │
│ • Speech bubbles                    │
│ • White bubbles, black outlines     │
│ • Yellow "5 stars" badges           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ CTA (Red background)                │
│ • Big white text                    │
│ • Yellow button (POW!)              │
└─────────────────────────────────────┘
```

---

## ✨ Special Effects (Use Sparingly)

### 1. Halftone Dots
Classic comic book Ben-Day dots
```html
<div class="halftone-pattern"></div>
```
Use: Background decoration, subtle texture

### 2. Speed Lines
Cartoon motion effect
```html
<div class="motion-lines"></div>
```
Use: Decorative accents, "fast service" sections

### 3. Starburst
Classic attention-grabber
```html
<div class="starburst"></div>
```
Use: "New!", "Sale!", corner decorations

---

## 🎬 Animation Guidelines

### DO Animate:
✅ Hover states (subtle bounce)
✅ Button clicks (quick squash)
✅ Card entrances (pop-in)
✅ Scroll reveals (fade + slide)

### DON'T Animate:
❌ Background colors (jarring)
❌ Multiple things at once (chaos)
❌ Page load (wait for user action)
❌ Everything (exhausting)

---

## 📱 Mobile Considerations

### Adjustments for Small Screens:
- Reduce border thickness slightly (3px instead of 4px)
- Smaller action words
- Single column layouts
- Bigger touch targets (48px minimum)
- Maintain bold aesthetic

---

## 🎯 Brand Balance

```
80% Clean, Professional Layout
15% Bold Color (Blue, Red, Yellow)
5% Cartoon Fun (POW effects, speech bubbles)
───────────────────────────────────────
100% Memorable Professional Brand
```

---

## 🚀 Quick Start

### 1. Import Tokens
```scss
@import '00-settings/tokens-cartoon';
@import '30-components/cartoon-components';
```

### 2. Update Hero
```html
<section class="hero-cartoon">
  <span class="badge-cartoon badge-cartoon-yellow">🏅 Licensed</span>
  <h1 class="hero-cartoon-title">TILE THAT LASTS!</h1>
  <p class="hero-cartoon-subtitle">TCNA-compliant, flood-tested, documented.</p>
  <button class="btn-cartoon btn-cartoon-red btn-cartoon-lg">
    GET YOUR QUOTE! →
  </button>
</section>
```

### 3. Style Service Cards
```html
<div class="card-cartoon">
  <h3>Waterproof Showers</h3>
  <p>Flood-tested before tile...</p>
  <button class="btn-cartoon btn-cartoon-blue">LEARN MORE</button>
</div>
```

---

## ✅ Final Checklist

Before launching:
- [ ] Only 2-3 colors per section
- [ ] All borders are 3-4px thick
- [ ] All shadows are hard offset (not blur)
- [ ] Speech bubbles have tails
- [ ] Action words used sparingly
- [ ] Text has good contrast
- [ ] Mobile tested
- [ ] Feels fun but professional
- [ ] NOT a rainbow
- [ ] Classic cartoon vibe ✓

---

## 🎨 Color Combinations That Work

### Blue + Yellow
Hero sections, trust + value

### Red + White
CTAs, urgent messages

### Blue + White
Services, professional sections

### Yellow + Black
Badges, warnings, attention

### Red + Yellow
Special offers (use sparingly!)

---

**The result: A tile contractor website that's professional, memorable, and FUN—without looking like a kids' playroom!** 🎬

Classic American cartoon aesthetic = Bold, clean, graphic, MEMORABLE! 🚀
