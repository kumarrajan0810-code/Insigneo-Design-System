# Insigneo Design System — Usage Guide

> Extracted from the **Insigneo Brand Guidelines** (59-page PDF).  
> Optimized for **mobile app development** (iOS & Android).  
> Structured for **Figma Variables** import.

---

## Table of Contents

1. [File Structure](#file-structure)
2. [Token Architecture](#token-architecture)
3. [Importing into Figma](#importing-into-figma)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Spacing & Layout](#spacing--layout)
7. [Shadows & Elevation](#shadows--elevation)
8. [Component Tokens](#component-tokens)
9. [Dark Mode](#dark-mode)
10. [Brand Rules & Ratios](#brand-rules--ratios)

---

## File Structure

```
design-system/
├── tokens/
│   ├── primitives.json      ← Raw values (colors, sizes, weights)
│   ├── semantic.json         ← Light + Dark mode usage aliases
│   └── components.json       ← Component-level tokens (button, card, input...)
├── figma/
│   └── figma-variables.json  ← Ready-to-import for Figma Variables / Tokens Studio
├── tokens.css                ← CSS custom properties (web/preview reference)
└── USAGE.md                  ← This file
```

---

## Token Architecture

The system follows a **3-layer architecture** that separates raw values from usage intent:

```
┌─────────────────────────────────────────────┐
│              COMPONENTS                      │
│   button/primary/bg → {interactive/default}  │
│   card/radius → {radius/lg}                  │
├─────────────────────────────────────────────┤
│              SEMANTIC                        │
│   color/text/primary → {navy-blue}  [Light]  │
│   color/text/primary → {neutral/50} [Dark]   │
├─────────────────────────────────────────────┤
│              PRIMITIVES                      │
│   navy-blue = #142641                        │
│   neutral/50 = #F6F5F9                       │
└─────────────────────────────────────────────┘
```

### Why 3 layers?

| Layer | Purpose | Changes when... |
|-------|---------|-----------------|
| **Primitives** | Raw values from brand guidelines | Brand is redesigned |
| **Semantic** | Maps values to contexts (bg, text, border...) | Themes/modes change |
| **Components** | Specific to UI components | Component design evolves |

**Rule**: Design your screens using **Semantic** or **Component** tokens — never reference Primitives directly in your Figma frames.

---

## Importing into Figma

### Option A: Tokens Studio Plugin (Recommended)

1. Install [Tokens Studio for Figma](https://www.figma.com/community/plugin/843461159747178978/Tokens-Studio-for-Figma)
2. Open the plugin → Settings → **Add new** → **Local file**
3. Import all three files:
   - `tokens/primitives.json` → Collection: "Primitives"
   - `tokens/semantic.json` → Collection: "Semantic" (sets: Light, Dark)
   - `tokens/components.json` → Collection: "Components"
4. The plugin will auto-resolve `{references}` between files

### Option B: Figma Variables Import Plugin

1. Install [Variables Import](https://www.figma.com/community/plugin/1256972111705530093/Variables-Import)
2. Open the plugin
3. Import `figma/figma-variables.json`
4. This creates 3 collections automatically:
   - **Primitives** — 1 mode ("Value")
   - **Semantic** — 2 modes ("Light", "Dark")
   - **Components** — 1 mode ("Default")
5. Variables will appear in your Figma file's local variables panel

### Option C: Manual Setup

If you prefer to set up variables manually, use `figma/figma-variables.json` as your reference document. The naming convention uses `/` as the group separator:

```
color/brand/navy-blue
color/text/primary
button/primary/bg
spacing/4
```

---

## Color System

### Primary Brand Colors

| Swatch | Name | HEX | Role | Usage % |
|--------|------|-----|------|---------|
| 🔵 | **Navy Blue** | `#142641` | Primary | **50%** |
| ⚪ | **Bone Blue** | `#E7F1F3` | Secondary | **30%** |
| 🔷 | **Insigneo Blue** | `#00B3E6` | Accent 1 | **10%** |
| 🩵 | **Sky Blue** | `#A1E3FB` | Accent 2 | **10%** |

### Color Scales

Each brand color has a multi-step gradient scale for nuanced usage:

| Scale | Steps | Primary Use |
|-------|-------|-------------|
| **Blue** | 50–800 (9 steps) | Backgrounds, interactive states, elevation |
| **Neutral** | 50–800 (9 steps) | Text, borders, disabled states, shadows |
| **Teal** | 100–500 (5 steps) | Charts, data visualization |
| **Gold** | 100–500 (5 steps) | Charts, premium accents |
| **Lime** | 100–500 (5 steps) | ✅ Positive performance indicators |
| **Coral** | 100–500 (5 steps) | ❌ Negative performance indicators |
| **Amber** | 100–500 (5 steps) | ⚠️ Warnings, charts |
| **Purple** | 100–500 (5 steps) | Charts, data visualization |

### Semantic Color Mapping

Instead of using raw colors, always use semantic tokens:

```
✅ Use: color/text/primary
❌ Avoid: color/brand/navy-blue (directly on a text layer)
```

| What you're styling | Light Mode Token | Dark Mode Token |
|---------------------|-----------------|-----------------|
| Page background | `color/bg/primary` → White | → Blue-800 |
| Card background | `color/surface/default` → White | → Neutral-800 |
| Primary text | `color/text/primary` → Navy Blue | → Neutral-50 |
| Subtle text | `color/text/secondary` → Neutral-600 | → Neutral-300 |
| Links & CTAs | `color/interactive/default` → Insigneo Blue | → Sky Blue |
| Input background | `color/surface/sunken` → Bone Blue | → Blue-800 |
| Divider lines | `color/border/subtle` → Neutral-100 | → Neutral-700 |

### Chart Colors

A 7-color palette for data visualization plus performance indicators:

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `chart/1` | Insigneo Blue | Sky Blue | Primary series |
| `chart/2` | Teal-200 | Teal-200 | Second series |
| `chart/3` | Purple-400 | Purple-200 | Third series |
| `chart/4` | Amber-200 | Amber-200 | Fourth series |
| `chart/5` | Gold-200 | Gold-200 | Fifth series |
| `chart/6` | Sky Blue | Blue-200 | Sixth series |
| `chart/7` | Neutral-500 | Neutral-300 | Seventh series |
| `chart/positive` | Lime-300 | Lime-200 | ↑ Gains |
| `chart/negative` | Coral-300 | Coral-200 | ↓ Losses |

---

## Typography

### Typeface: Inter

**Inter** is the sole typeface for the mobile app. It provides excellent readability at small sizes and has been widely adopted across financial and fintech products.

| Token | Size | Weight | Line Height | Use |
|-------|------|--------|-------------|-----|
| `display` | 40px | Bold (700) | 1.2 | Hero numbers, onboarding headlines |
| `h1` | 28px | Bold (700) | 1.2 | Screen titles |
| `h2` | 24px | SemiBold (600) | 1.3 | Section headings |
| `h3` | 20px | SemiBold (600) | 1.3 | Subsection headings |
| `h4` | 18px | Medium (500) | 1.3 | Card titles, group labels |
| `body-lg` | 16px | Regular (400) | 1.5 | Primary body text |
| `body` | 14px | Regular (400) | 1.4 | Default body, descriptions |
| `caption` | 12px | Regular (400) | 1.4 | Labels, timestamps, metadata |
| `overline` | 10px | SemiBold (600) | 1.4 | Category labels, section markers |
| `data` | 32px | Light (300) | 1.2 | Big numbers, KPIs, portfolio values |

### Typography Rules (from Brand Guidelines)

1. **Sentence case only** — First letter capitalized. Exception: "Insigneo", "Investment Professionals", proper nouns.
2. **Never justify text** — Always left-align.
3. **Never manually alter character spacing** — Use the predefined letter-spacing tokens.
4. **Data numbers** use Light weight for clarity and sophistication.

### Future: Brand Display Font

For brand-led moments (onboarding, marketing banners, empty states), the `display` font family token is currently set to Inter but can be swapped to a serif/display font later without changing any component references.

---

## Spacing & Layout

### Spacing Scale (4px base)

| Token | Value | Common Use |
|-------|-------|------------|
| `spacing/0` | 0px | No space |
| `spacing/1` | 4px | Tight inner padding, icon-to-text gap |
| `spacing/2` | 8px | Inline element gaps, compact padding |
| `spacing/3` | 12px | List item padding, input padding-y |
| `spacing/4` | 16px | Default card padding, screen margins |
| `spacing/5` | 20px | Section spacing |
| `spacing/6` | 24px | Button padding-x, generous spacing |
| `spacing/8` | 32px | Section gaps |
| `spacing/10` | 40px | Large section separation |
| `spacing/12` | 48px | Screen section dividers |
| `spacing/16` | 64px | Major layout gaps |
| `spacing/20` | 80px | Hero spacing, empty states |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `radius/none` | 0px | Sharp corners |
| `radius/xs` | 4px | Subtle rounding, badges |
| `radius/sm` | 8px | Tooltips, small cards |
| `radius/md` | 12px | Buttons, inputs, standard cards |
| `radius/lg` | 16px | Large cards, containers |
| `radius/xl` | 20px | Bottom sheets, modals |
| `radius/2xl` | 24px | Sheet handles |
| `radius/full` | 9999px | Circular elements, pills |

### Mobile Touch Targets

| Token | Value | Standard |
|-------|-------|----------|
| `touch-target/min` | 44px | Apple HIG minimum |
| `touch-target/comfortable` | 48px | Material Design recommended |

**Rule**: All interactive elements (buttons, inputs, list items, toggles) must meet the 44px minimum touch target.

---

## Shadows & Elevation

Shadows use Navy Blue-tinted rgba for brand consistency. In dark mode, they switch to pure black with higher opacity.

| Token | Use |
|-------|-----|
| `shadow/xs` | Cards at rest, subtle lift |
| `shadow/sm` | List items, chips |
| `shadow/md` | Floating cards, dropdowns |
| `shadow/lg` | Modals, bottom sheets |
| `shadow/xl` | Overlays, toasts, highest elevation |

---

## Component Tokens

Pre-defined tokens for the most common mobile UI patterns:

### Button Variants

| Variant | Background | Text | Border | Use |
|---------|-----------|------|--------|-----|
| **Primary** | Insigneo Blue | White | None | Main CTA — "Invest Now", "Continue" |
| **Secondary** | Transparent | Insigneo Blue | Insigneo Blue | Secondary actions — "Learn More" |
| **Ghost** | Transparent | Navy Blue | None | Tertiary — "Cancel", nav items |
| **Destructive** | Coral-300 | White | None | Danger — "Delete Account" |

### Other Components

| Component | Key Tokens | Notes |
|-----------|-----------|-------|
| **Card** | bg, border, radius (16px), padding (16px) | Default shadow-xs; use shadow-md when hovering/focused |
| **Input** | bg (Bone Blue sunken), border, radius (12px), min-height (48px) | Blue accent border on focus; coral border on error |
| **Nav Bar** | bg, title, height (56px) | Blurred bg when scrolled |
| **Tab Bar** | bg, active/inactive icons+labels, height (83px w/ safe area) | Active state uses interactive color |
| **Badge** | bg (Blue-50), text (Blue-600), full radius | Status variants: success, error, warning |
| **List Item** | min-height (48px), divider, padding | Pressed state uses Neutral-50 |
| **Bottom Sheet** | radius (24px), handle, shadow-xl | Handle: Neutral-300, 36×4px |
| **Alert/Toast** | 4 variants (success/error/warning/info) | Each with bg, border, icon, text tokens |

---

## Dark Mode

Dark mode was derived from the existing brand palette:

### Key Decisions

| Element | Light | Dark | Reasoning |
|---------|-------|------|-----------|
| Primary bg | White | Blue-800 (`#021729`) | Deep navy maintains brand identity |
| Card surface | White | Neutral-800 (`#1C232D`) | Slight lift from bg for hierarchy |
| Raised surface | White | Neutral-700 (`#2C323A`) | Higher elevation = lighter shade |
| Primary text | Navy Blue | Neutral-50 (`#F6F5F9`) | Maximum readability |
| Accent/links | Insigneo Blue | Sky Blue (`#A1E3FB`) | Brighter on dark for WCAG contrast |
| Borders | Neutral-200 | Neutral-700 | Subtle, visible but not harsh |
| Status bg | Solid light tints | Low-opacity (15%) | Prevents overpowering dark surfaces |

### Switching Themes

**Figma**: Toggle between "Light" and "Dark" modes in the Semantic variables collection.

**CSS**: Add `data-theme="dark"` to your root element or use `prefers-color-scheme` media query (built into `tokens.css`).

**Flutter**: Map semantic tokens to `ThemeData.light()` / `ThemeData.dark()`.

**React Native**: Map to `useColorScheme()` hook + context provider.

---

## Brand Rules & Ratios

These rules come directly from the brand guidelines and should be maintained in all mobile screens:

### Color Usage Ratios

```
┌──────────────────────────────────────────────────────────┐
│  Navy Blue / Primary Background     ███████████  50%     │
│  Bone Blue / Secondary              ██████       30%     │
│  Insigneo Blue / Accent             ██           10%     │
│  Sky Blue / Accent                  ██           10%     │
└──────────────────────────────────────────────────────────┘
```

### Audience-Specific Emphasis

| Audience | Dominant Color | Supporting | Accent |
|----------|---------------|-----------|--------|
| **Clients** | Bone Blue (60%) | Navy Blue (30%) | Insigneo Blue (10%) |
| **Investment Professionals** | Navy Blue (60%) | Bone Blue (30%) | Insigneo Blue (10%) |

### Do's and Don'ts

✅ **Do:**
- Use Navy Blue as the primary structural color
- Use Bone Blue for breathing space and content-heavy layouts
- Use accent colors sparingly for CTAs, highlights, interactive elements
- Maintain sufficient contrast (WCAG AA minimum)
- Use sentence case for all text

❌ **Don't:**
- Let accent colors dominate a layout
- Use green/red for anything other than performance indicators
- Justify text or manually alter letter spacing
- Use colors outside the defined palette
- Mix brand colors from different hierarchy levels without purpose

---

## Quick Reference: Token Naming Convention

```
{category}/{subcategory}/{variant}

Examples:
  color/text/primary
  color/status/success-bg
  spacing/4
  radius/md
  button/primary/bg
  card/radius
  font-size/lg
  font-weight/semibold
```

The `/` separator maps directly to Figma Variables group structure, so your variables panel will be neatly organized.
