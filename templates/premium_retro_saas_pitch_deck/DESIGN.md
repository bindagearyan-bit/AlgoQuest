---
name: Premium Retro SaaS Pitch Deck
colors:
  surface: '#faf8ff'
  surface-dim: '#cdd9ff'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8ff'
  surface-container-highest: '#d9e2ff'
  on-surface: '#0d1b37'
  on-surface-variant: '#484551'
  inverse-surface: '#23304d'
  inverse-on-surface: '#edf0ff'
  outline: '#787582'
  outline-variant: '#c9c4d3'
  surface-tint: '#5e52a8'
  primary: '#5b4fa6'
  on-primary: '#ffffff'
  primary-container: '#7469c1'
  on-primary-container: '#fffbff'
  inverse-primary: '#c8bfff'
  secondary: '#aa2d5e'
  on-secondary: '#ffffff'
  secondary-container: '#fc6d9e'
  on-secondary-container: '#6e0035'
  tertiary: '#006950'
  on-tertiary: '#ffffff'
  tertiary-container: '#008466'
  on-tertiary-container: '#f5fff8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5deff'
  primary-fixed-dim: '#c8bfff'
  on-primary-fixed: '#190063'
  on-primary-fixed-variant: '#46398f'
  secondary-fixed: '#ffd9e1'
  secondary-fixed-dim: '#ffb1c6'
  on-secondary-fixed: '#3f001b'
  on-secondary-fixed-variant: '#8a0f47'
  tertiary-fixed: '#79f9ce'
  tertiary-fixed-dim: '#5adcb3'
  on-tertiary-fixed: '#002117'
  on-tertiary-fixed-variant: '#00513d'
  background: '#faf8ff'
  on-background: '#0d1b37'
  surface-variant: '#d9e2ff'
typography:
  headline-xl:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a whimsical yet ultra-polished aesthetic, merging the charm of nostalgic gaming with the structural clarity of a modern pitch-deck UI kit. The brand personality is optimistic, playful, and relentlessly engaging, evoking the feeling of progression found in cozy RPGs coupled with the crisp execution of a top-tier SaaS platform. 

The visual style elevates a playful premise into a polished pitch-deck aesthetic with refined geometric forms and sophisticated pastel gradients. We utilize generous whitespace, refined pastel backdrops, and structured containers to ensure the interface remains legible and professional while retaining its distinctive character.

## Colors

The color system is built around a rich, harmonious palette inspired by twilight skies and vibrant game worlds. The primary purple (`#8B7FD9`) anchors interactive elements, while the secondary magenta (`#FF6FA0`) adds high-energy accents. 

- **Primary:** `#8B7FD9` (Sophisticated pastel purple)
- **Secondary:** `#FF6FA0` (Vibrant magenta/pink)
- **Tertiary (CTA):** `#7FFFD4` (Mint cyan for primary actions)
- **Neutral / Text:** `#1A2744` (Deep navy for ultimate contrast)
- **Supportive Palette:** Success green (`#6FCF97`), Error red (`#EB5757`), and Accent yellow (`#FFD93D`).

## Typography

Typography balances geometric structural modernism with warm, approachable readability. Headlines utilize **Outfit** for clean, striking geometric forms that stand out in pitch decks, while **Plus Jakarta Sans** provides a soft, rounded, and welcoming body font that ensures long-form readability across dashboards and cards. 

Ensure line heights remain generous to maintain an airy, premium feel. Avoid overly tight tracking on headlines; let the geometric forms breathe.

## Layout & Spacing

A fluid grid system organizes content into structured, modern card-based layouts. The design employs a 12-column fluid grid with 24px gutters and generous outer canvas margins to emphasize the polished pitch-deck presentation style.

Spacing follows an 8pt modular scale, ensuring consistent vertical rhythms and predictable padding inside containers. On mobile viewports, the grid collapses into a single-column stack with reduced side margins (`1rem`), while maintaining comfortable component gaps.

## Elevation & Depth

Depth is conveyed through a combination of ambient, low-opacity shadows and layered pastel surfaces. Rather than harsh drop shadows, elements float using diffused, multi-layered shadows tinted with the primary purple hue (`#8B7FD9` at 15% opacity). 

Interactive cards feature a subtle hover lift, transitioning from a flat ambient shadow to a deeper, more pronounced spread. Glassmorphism and frosted layers may be used selectively for floating navigation bars and modal overlays to enhance the polished, multi-dimensional aesthetic.

## Shapes

The shape language is defined by a pill-shaped roundedness level (`3`), giving all primary containers, buttons, and badges fully curved geometries. 

- **Buttons & Badges:** Fully pill-shaped with generous padding.
- **Cards & Containers:** Highly rounded corners (`rounded-xl`) soften the interface, creating an approachable, friendly, and tactile environment. 
- **Inner elements:** Inputs and nested components maintain harmonious concentric curves to reinforce the soft, polished aesthetic.

## Components

### Buttons
Primary action buttons use a vibrant mint/cyan gradient (`#7FFFD4` to `#6EE7E0`) with pill-shaped geometry, featuring a tactile 3D press effect (a solid bottom border/shadow offset that compresses on active state). Secondary buttons utilize translucent pastel fills with deep navy text.

### Cards
Cards are structured as modern SaaS containers featuring soft ambient shadows, generous internal padding, and highly rounded corners. They often include subtle pastel gradient borders or top accent bars.

### Progress Bars
Progress bars mimic segmented retro health-bars, breaking continuous fills into distinct, chunky blocks with gap separators, providing instant, satisfying visual feedback on task completion.

### Input Fields
Inputs feature clean rounded borders, high-contrast placeholder text in deep navy, and glowing primary-purple focus states with soft pastel rings.

### Lists & Checkboxes
Lists incorporate pill-shaped item wrappers with subtle hover states. Checkboxes and radio buttons use bold geometric fills with smooth check/dot animations.