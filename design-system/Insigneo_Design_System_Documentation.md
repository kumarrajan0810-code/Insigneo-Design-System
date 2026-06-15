# Insigneo Design System — Official Documentation

> **Source of Truth**: This document reflects the exact values defined in our JSON token system. It is designed to be a living, professional reference for both designers and developers.

---

## 1. Token Architecture
Our design system uses a strict 3-tier token architecture to ensure scalable and maintainable code across iOS, Android, and Web.

- **Primitives:** The raw foundation (e.g., `#142641`, `16px`). *Never hardcode these in UI components.*
- **Semantic:** Context-aware aliases (e.g., `color/bg/primary`, `color/text/inverse`). *Always use these for layout and styling.*
- **Components:** UI-specific overrides (e.g., `button/primary/bg`).


---

## 2. Color System (Primitives)
These are the absolute color values. Use these to configure your theme providers or stylesheets, but **never** use them directly in component code.

### Brand Colors
| Token | Value | Description |
|---|---|---|
| `color/brand/navy-blue` | `#142641` | Primary brand color. Trust, stability, professionalism. |
| `color/brand/bone-blue` | `#E7F1F3` | Secondary brand color. Soft, sophisticated backgrounds. |
| `color/brand/insigneo-blue` | `#00B3E6` | Accent. Innovation, clarity, forward-thinking. |
| `color/brand/sky-blue` | `#A1E3FB` | Accent. Freshness, openness, visual lightness. |

### Blue Scale
| Token | Value |
|---|---|
| `color/blue/50` | `#E9F4FE` |
| `color/blue/100` | `#D2F0FF` |
| `color/blue/200` | `#A1E3FB` |
| `color/blue/300` | `#00B7EB` |
| `color/blue/400` | `#0389C3` |
| `color/blue/500` | `#0666A4` |
| `color/blue/600` | `#003D66` |
| `color/blue/700` | `#0E233F` |
| `color/blue/800` | `#021729` |

### Neutral Scale
| Token | Value |
|---|---|
| `color/neutral/50` | `#F6F5F9` |
| `color/neutral/100` | `#E6E6E8` |
| `color/neutral/200` | `#D7D7DB` |
| `color/neutral/300` | `#C1C1C6` |
| `color/neutral/400` | `#ACACAD` |
| `color/neutral/500` | `#868A93` |
| `color/neutral/600` | `#52585E` |
| `color/neutral/700` | `#2C323A` |
| `color/neutral/800` | `#1C232D` |

### Teal Scale
| Token | Value |
|---|---|
| `color/teal/100` | `#C1EAE6` |
| `color/teal/200` | `#3ECEC6` |
| `color/teal/300` | `#31A49E` |
| `color/teal/400` | `#27827D` |
| `color/teal/500` | `#133E3C` |

### Gold Scale
| Token | Value |
|---|---|
| `color/gold/100` | `#EFDCBF` |
| `color/gold/200` | `#D4B893` |
| `color/gold/300` | `#D2AB7A` |
| `color/gold/400` | `#AE916A` |
| `color/gold/500` | `#634927` |

### Lime Scale
| Token | Value |
|---|---|
| `color/lime/100` | `#D0E5CE` |
| `color/lime/200` | `#AAD493` |
| `color/lime/300` | `#79B858` |
| `color/lime/400` | `#487237` |
| `color/lime/500` | `#284725` |

### Coral Scale
| Token | Value |
|---|---|
| `color/coral/100` | `#E2C0C0` |
| `color/coral/200` | `#DB9191` |
| `color/coral/300` | `#DA5959` |
| `color/coral/400` | `#A82A2A` |
| `color/coral/500` | `#721616` |

### Amber Scale
| Token | Value |
|---|---|
| `color/amber/100` | `#EFDCBF` |
| `color/amber/200` | `#F1C77C` |
| `color/amber/300` | `#E0A734` |
| `color/amber/400` | `#B07A26` |
| `color/amber/500` | `#79500B` |

### Purple Scale
| Token | Value |
|---|---|
| `color/purple/100` | `#E7E5F2` |
| `color/purple/200` | `#B8B5C6` |
| `color/purple/300` | `#89849B` |
| `color/purple/400` | `#59546F` |
| `color/purple/500` | `#2A2343` |

---

## 3. Semantic Colors (Theming)
This is the core of our Dark Mode and theming engine. **Always** use these variables when styling components.

### Bg
| Token | Light Mode Value | Dark Mode Value | Description |
|---|---|---|---|
| `color/bg/primary` | `{color.static.white}` | `{color.blue.800}` | Main app background. |
| `color/bg/secondary` | `{color.brand.bone-blue}` | `{color.blue.700}` | Secondary surface. Cards, sections. |
| `color/bg/tertiary` | `{color.neutral.50}` | `{color.neutral.800}` | Tertiary background. Grouped content. |
| `color/bg/inverse` | `{color.brand.navy-blue}` | `{color.brand.bone-blue}` | Inverse background. Headers, hero sections. |
| `color/bg/accent` | `{color.blue.50}` | `rgba(0, 179, 230, 0.12)` | Accent-tinted background. Highlights, banners. |
| `color/bg/overlay` | `rgba(20, 38, 65, 0.5)` | `rgba(2, 23, 41, 0.7)` | Modal/sheet overlay scrim. |

### Surface
| Token | Light Mode Value | Dark Mode Value | Description |
|---|---|---|---|
| `color/surface/default` | `{color.static.white}` | `{color.neutral.800}` | Base card surface. |
| `color/surface/raised` | `{color.static.white}` | `{color.neutral.700}` | Elevated card (with shadow). |
| `color/surface/sunken` | `{color.brand.bone-blue}` | `{color.blue.800}` | Inset/recessed surface. Input fields. |
| `color/surface/disabled` | `{color.neutral.50}` | `{color.neutral.700}` | Disabled surface. |

### Text
| Token | Light Mode Value | Dark Mode Value | Description |
|---|---|---|---|
| `color/text/primary` | `{color.brand.navy-blue}` | `{color.neutral.50}` | Primary text. Headings, body. |
| `color/text/secondary` | `{color.neutral.600}` | `{color.neutral.300}` | Secondary text. Subtitles, descriptions. |
| `color/text/tertiary` | `{color.neutral.400}` | `{color.neutral.500}` | Tertiary text. Placeholders, hints. |
| `color/text/inverse` | `{color.static.white}` | `{color.brand.navy-blue}` | Text on dark/inverse backgrounds. |
| `color/text/accent` | `{color.brand.insigneo-blue}` | `{color.brand.sky-blue}` | Accent text. Links, interactive labels. |
| `color/text/disabled` | `{color.neutral.300}` | `{color.neutral.600}` | Disabled text. |
| `color/text/on-accent` | `{color.static.white}` | `{color.blue.800}` | Text on accent-colored backgrounds. |

### Icon
| Token | Light Mode Value | Dark Mode Value | Description |
|---|---|---|---|
| `color/icon/primary` | `{color.brand.navy-blue}` | `{color.neutral.100}` |  |
| `color/icon/secondary` | `{color.neutral.500}` | `{color.neutral.400}` |  |
| `color/icon/accent` | `{color.brand.insigneo-blue}` | `{color.brand.sky-blue}` |  |
| `color/icon/inverse` | `{color.static.white}` | `{color.brand.navy-blue}` |  |
| `color/icon/disabled` | `{color.neutral.300}` | `{color.neutral.600}` |  |

### Border
| Token | Light Mode Value | Dark Mode Value | Description |
|---|---|---|---|
| `color/border/default` | `{color.neutral.200}` | `{color.neutral.700}` | Default border. Cards, inputs. |
| `color/border/strong` | `{color.neutral.300}` | `{color.neutral.600}` | Emphasized border. |
| `color/border/subtle` | `{color.neutral.100}` | `{color.neutral.700}` | Subtle divider lines. |
| `color/border/accent` | `{color.brand.insigneo-blue}` | `{color.brand.sky-blue}` | Accent/focused border. |
| `color/border/inverse` | `rgba(255, 255, 255, 0.2)` | `rgba(20, 38, 65, 0.4)` | Border on dark backgrounds. |

### Interactive
| Token | Light Mode Value | Dark Mode Value | Description |
|---|---|---|---|
| `color/interactive/default` | `{color.brand.insigneo-blue}` | `{color.brand.sky-blue}` | Default interactive color. |
| `color/interactive/hover` | `{color.blue.400}` | `{color.blue.200}` | Hover/pressed state. |
| `color/interactive/active` | `{color.blue.500}` | `{color.blue.100}` | Active/pressed state. |
| `color/interactive/disabled` | `{color.neutral.200}` | `{color.neutral.700}` | Disabled interactive. |
| `color/interactive/focus-ring` | `rgba(0, 179, 230, 0.4)` | `rgba(161, 227, 251, 0.4)` | Focus ring color. |

### Status
| Token | Light Mode Value | Dark Mode Value | Description |
|---|---|---|---|
| `color/status/success/default` | `{color.lime.300}` | `{color.lime.200}` |  |
| `color/status/success/bg` | `{color.lime.100}` | `rgba(121, 184, 88, 0.15)` |  |
| `color/status/success/text` | `{color.lime.500}` | `{color.lime.200}` |  |
| `color/status/error/default` | `{color.coral.300}` | `{color.coral.200}` |  |
| `color/status/error/bg` | `{color.coral.100}` | `rgba(218, 89, 89, 0.15)` |  |
| `color/status/error/text` | `{color.coral.500}` | `{color.coral.200}` |  |
| `color/status/warning/default` | `{color.amber.300}` | `{color.amber.200}` |  |
| `color/status/warning/bg` | `{color.amber.100}` | `rgba(241, 199, 124, 0.15)` |  |
| `color/status/warning/text` | `{color.amber.500}` | `{color.amber.200}` |  |
| `color/status/info/default` | `{color.brand.insigneo-blue}` | `{color.brand.sky-blue}` |  |
| `color/status/info/bg` | `{color.blue.50}` | `rgba(0, 179, 230, 0.12)` |  |
| `color/status/info/text` | `{color.blue.600}` | `{color.blue.200}` |  |

### Chart
| Token | Light Mode Value | Dark Mode Value | Description |
|---|---|---|---|
| `color/chart/1` | `{color.brand.insigneo-blue}` | `{color.brand.sky-blue}` | Primary chart series. |
| `color/chart/2` | `{color.teal.200}` | `{color.teal.200}` | Second series. |
| `color/chart/3` | `{color.purple.400}` | `{color.purple.200}` | Third series. |
| `color/chart/4` | `{color.amber.200}` | `{color.amber.200}` | Fourth series. |
| `color/chart/5` | `{color.gold.200}` | `{color.gold.200}` | Fifth series. |
| `color/chart/6` | `{color.brand.sky-blue}` | `{color.blue.200}` | Sixth series. |
| `color/chart/7` | `{color.neutral.500}` | `{color.neutral.300}` | Seventh series. |
| `color/chart/positive` | `{color.lime.300}` | `{color.lime.200}` | Positive performance indicator. |
| `color/chart/negative` | `{color.coral.300}` | `{color.coral.200}` | Negative performance indicator. |

---

## 4. Typography
Our typography system uses a single typeface (**Inter**) optimized for mobile readability.

### Font Family
- **Primary**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Display**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Mono**: `'SF Mono', 'Roboto Mono', 'Fira Code', monospace`

### Semantic Typography Hierarchy
| Token | Family | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `display` | `font.family.display` | `font.size.5xl` | `font.weight.bold` | `font.lineHeight.tight` | `font.letterSpacing.tighter` |
| `h1` | `font.family.primary` | `font.size.3xl` | `font.weight.bold` | `font.lineHeight.tight` | `font.letterSpacing.tight` |
| `h2` | `font.family.primary` | `font.size.2xl` | `font.weight.semibold` | `font.lineHeight.snug` | `font.letterSpacing.tight` |
| `h3` | `font.family.primary` | `font.size.xl` | `font.weight.semibold` | `font.lineHeight.snug` | `font.letterSpacing.normal` |
| `h4` | `font.family.primary` | `font.size.lg` | `font.weight.medium` | `font.lineHeight.snug` | `font.letterSpacing.normal` |
| `body-lg` | `font.family.primary` | `font.size.base` | `font.weight.regular` | `font.lineHeight.relaxed` | `font.letterSpacing.normal` |
| `body` | `font.family.primary` | `font.size.sm` | `font.weight.regular` | `font.lineHeight.normal` | `font.letterSpacing.normal` |
| `caption` | `font.family.primary` | `font.size.xs` | `font.weight.regular` | `font.lineHeight.normal` | `font.letterSpacing.wide` |
| `overline` | `font.family.primary` | `font.size.2xs` | `font.weight.semibold` | `font.lineHeight.normal` | `font.letterSpacing.widest` |
| `data` | `font.family.primary` | `font.size.4xl` | `font.weight.light` | `font.lineHeight.tight` | `font.letterSpacing.tighter` |

---

## 5. Spacing & Layout
We use a strict 4px base-unit spacing scale optimized for mobile touch targets.

### Spacing Scale
| Token | Value |
|---|---|
| `spacing/0` | `0px` |
| `spacing/1` | `4px` |
| `spacing/2` | `8px` |
| `spacing/3` | `12px` |
| `spacing/4` | `16px` |
| `spacing/5` | `20px` |
| `spacing/6` | `24px` |
| `spacing/8` | `32px` |
| `spacing/10` | `40px` |
| `spacing/12` | `48px` |
| `spacing/16` | `64px` |
| `spacing/20` | `80px` |

### Border Radius
| Token | Value |
|---|---|
| `radius/none` | `0px` |
| `radius/xs` | `4px` |
| `radius/sm` | `8px` |
| `radius/md` | `12px` |
| `radius/lg` | `16px` |
| `radius/xl` | `20px` |
| `radius/2xl` | `24px` |
| `radius/full` | `9999px` |

---

## 6. Elevation & Shadows
| Token | Value | Description |
|---|---|---|
| `shadow/xs` | `0px 1px 2px 0px rgba(20, 38, 65, 0.05)` | Subtle lift. Cards at rest. |
| `shadow/sm` | `0px 2px 4px -1px rgba(20, 38, 65, 0.06), 0px 1px 2px -1px rgba(20, 38, 65, 0.04)` | Light elevation. List items, chips. |
| `shadow/md` | `0px 4px 8px -2px rgba(20, 38, 65, 0.08), 0px 2px 4px -2px rgba(20, 38, 65, 0.04)` | Medium elevation. Floating cards, dropdowns. |
| `shadow/lg` | `0px 8px 16px -4px rgba(20, 38, 65, 0.10), 0px 4px 6px -4px rgba(20, 38, 65, 0.05)` | High elevation. Modals, bottom sheets. |
| `shadow/xl` | `0px 16px 32px -8px rgba(20, 38, 65, 0.14), 0px 8px 16px -8px rgba(20, 38, 65, 0.06)` | Highest elevation. Overlays, toasts. |

---

## 7. Developer Implementation
### Web (CSS)
We provide a compiled `tokens.css` file. It leverages CSS custom properties and handles dark mode out-of-the-box.
```css
/* Usage Example */
.card {
  background: var(--color-surface-default);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```
### iOS / Android (Native)
The JSON token files in the `tokens/` directory adhere to the W3C DTCG specification. Use **Style Dictionary** to automatically generate your `Color.xcassets`, Swift UI Colors, `colors.xml`, and Compose Objects.
```bash
# Example Style Dictionary compilation
style-dictionary build
```