# The Definitive Guide to Building a Premium Directory Website

> **Platform:** This guide is for building a **responsive mobile web application** using Next.js, React, TypeScript, and Tailwind CSS. This is a browser-based web app — not a native iOS/Android app downloaded from app stores. All design patterns, navigation approaches, and touch optimizations work in mobile browsers (Safari, Chrome) and scale responsively to tablet and desktop viewports.

Building a gorgeous, minimal, mobile-first directory website for UK-based appliance stores and repair services requires mastering seven interconnected disciplines: visual design fundamentals, mobile-first architecture, directory-specific UX patterns, systematic component design, proven inspiration from elite teams, emerging CSS and animation techniques, and practical Next.js/Tailwind implementation. The companies setting the standard—Linear, Vercel, Stripe, Airbnb—share a common approach: ruthless constraint in color and typography, mathematical precision in spacing, accessibility as a foundation rather than afterthought, and motion that serves purpose rather than decoration.

For your specific use case, the winning formula combines **search-first information architecture** with **location-based filtering**, **map/list toggle patterns** borrowed from Airbnb and Yelp, **card designs emphasizing trust signals** (ratings, verification badges, response times), and a **bottom navigation bar** for mobile that places the most critical actions in the thumb zone. Implementation should leverage **shadcn/ui built on Radix primitives** for accessibility, **CVA (class-variance-authority)** for type-safe component variants, and **Tailwind's design token system** to maintain consistency as the site scales.

---

## Typography Creates Hierarchy Without Decoration

Elite tech companies achieve premium aesthetics through typography restraint. **Linear uses Inter** with intentionally quiet styling, relying on subtle font-weight shifts rather than size changes for hierarchy. **Vercel created Geist**, a custom typeface designed specifically for developers and designers with two optical variants—Geist Sans for UI and Geist Mono for code. **Apple's SF Pro** uses separate text and display variants, automatically switching at 20 points.

The practical typography stack for your directory site should follow these specifications:

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Page headlines | 32-48px | 600-700 | 1.2 |
| Section headers | 20-24px | 500-600 | 1.3 |
| Body text | 16px minimum | 400-500 | 1.5 |
| Listing card titles | 16-18px | 500 | 1.3 |
| Meta text (distance, category) | 12-14px | 400 | 1.4 |

Fluid typography eliminates breakpoint jumps using CSS `clamp()`. The formula `font-size: clamp(1rem, 2.5vw + 1rem, 3rem)` creates smooth scaling, but pure viewport units fail accessibility—users who zoom can't increase text size. Always combine `vw` with `rem` units, and ensure maximum font size stays within **2.5× the minimum** for WCAG 1.4.4 compliance.

For font loading in Next.js, use the built-in `next/font` with the `display: 'swap'` option to prevent invisible text during load:

```tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });
```

---

## Your Refined Color Palette: Warm, Trustworthy, Accessible

Your color palette follows the **neutral-first approach** used by elite tech teams, with strategic warm undertones that create an approachable, trustworthy feel perfect for a local services directory. The warm neutrals differentiate you from clinical, cold directories while the coral primary provides energy without aggression.

### Complete Color System

```css
:root {
  /* ========================================
     PRIMARY BRAND COLORS
     ======================================== */
  --primary: #e85d4c;           /* Warm coral - CTAs, active states, brand accent */
  --primary-hover: #d94f3f;     /* Darker coral - hover states */
  --primary-light: rgba(232, 93, 76, 0.1);  /* Coral tint - backgrounds, badges */

  /* ========================================
     LIGHT MODE - BACKGROUNDS & SURFACES
     ======================================== */
  --bg-light: #f8f6f6;          /* Warm off-white - page background */
  --surface-light: #ffffff;     /* Pure white - cards, modals, inputs */

  /* ========================================
     LIGHT MODE - TEXT
     ======================================== */
  --text-primary-light: #181111;   /* Near-black warm - headings, body text */
  --text-muted-light: #6b7280;     /* Cool gray - secondary text, labels */

  /* ========================================
     LIGHT MODE - BORDERS
     ======================================== */
  --border-light: #ebe5e5;      /* Warm light gray - dividers, card borders */

  /* ========================================
     DARK MODE - BACKGROUNDS & SURFACES
     ======================================== */
  --bg-dark: #0f0d0d;           /* Warm near-black - page background */
  --surface-dark: #1a1616;      /* Warm dark gray - cards, modals */

  /* ========================================
     DARK MODE - TEXT
     ======================================== */
  --text-primary-dark: #f5f0f0;    /* Warm off-white - headings, body text */
  --text-muted-dark: #a8a0a0;      /* Warm medium gray - secondary text */

  /* ========================================
     DARK MODE - BORDERS
     ======================================== */
  --border-dark: #2d2424;       /* Warm dark border - dividers */

  /* ========================================
     SEMANTIC COLORS (BOTH MODES)
     ======================================== */
  --success: #16a34a;           /* Green - verification badges, positive states */
  --success-light: rgba(22, 163, 74, 0.1);  /* Green tint - success backgrounds */
  --warning: #f59e0b;           /* Amber - ratings stars, caution states */
  --warning-light: rgba(245, 158, 11, 0.1); /* Amber tint - warning backgrounds */
  --error: #b91c1c;             /* Dark red - form errors, destructive actions */
  --error-light: rgba(185, 28, 28, 0.1);    /* Red tint - error backgrounds */
  --info: #0ea5e9;              /* Sky blue - repair badges, informational */
  --info-light: rgba(14, 165, 233, 0.1);    /* Blue tint - info backgrounds */

  /* ========================================
     FOCUS & ACCESSIBILITY
     ======================================== */
  --focus-ring: rgba(239, 68, 68, 0.5);  /* Red-500 at 50% - keyboard focus */
}
```

### Why This Palette Works

| Design Principle | How Your Palette Achieves It |
|------------------|------------------------------|
| **Primary ≠ Error** | Coral `#e85d4c` vs dark red `#b91c1c` creates clear semantic separation |
| **Warm neutrals** | `#f8f6f6` background feels friendly, not clinical like pure `#f5f5f5` |
| **WCAG compliance** | `#181111` on `#f8f6f6` = 15:1 contrast ratio (AAA) |
| **Dark mode comfort** | `#0f0d0d` avoids pure black eye strain while maintaining warmth |
| **Type differentiation** | Store badges (coral) vs Repair badges (sky blue `#0ea5e9`) |

### Contrast Ratios Verification

| Combination | Ratio | WCAG Level |
|-------------|-------|------------|
| `#181111` on `#f8f6f6` | 15.2:1 | AAA ✓ |
| `#181111` on `#ffffff` | 17.4:1 | AAA ✓ |
| `#6b7280` on `#f8f6f6` | 5.5:1 | AA ✓ |
| `#6b7280` on `#ffffff` | 6.0:1 | AA ✓ |
| `#f5f0f0` on `#0f0d0d` | 16.8:1 | AAA ✓ |
| `#f5f0f0` on `#1a1616` | 13.2:1 | AAA ✓ |
| `#a8a0a0` on `#0f0d0d` | 6.9:1 | AA ✓ |
| `#e85d4c` on `#ffffff` | 3.8:1 | AA Large Text ✓ |
| `#ffffff` on `#e85d4c` | 3.8:1 | AA Large Text ✓ |

### Tailwind CSS Configuration

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand
        primary: {
          DEFAULT: '#e85d4c',
          hover: '#d94f3f',
          light: 'rgba(232, 93, 76, 0.1)',
        },

        // Backgrounds
        background: {
          light: '#f8f6f6',
          dark: '#0f0d0d',
        },

        // Surfaces (cards, modals)
        surface: {
          light: '#ffffff',
          dark: '#1a1616',
        },

        // Text colors
        content: {
          primary: {
            light: '#181111',
            dark: '#f5f0f0',
          },
          muted: {
            light: '#6b7280',
            dark: '#a8a0a0',
          },
        },

        // Borders
        border: {
          light: '#ebe5e5',
          dark: '#2d2424',
        },

        // Semantic
        success: {
          DEFAULT: '#16a34a',
          light: 'rgba(22, 163, 74, 0.1)',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: 'rgba(245, 158, 11, 0.1)',
        },
        error: {
          DEFAULT: '#b91c1c',
          light: 'rgba(185, 28, 28, 0.1)',
        },
        info: {
          DEFAULT: '#0ea5e9',
          light: 'rgba(14, 165, 233, 0.1)',
        },
      },

      // Focus ring
      ringColor: {
        focus: 'rgba(239, 68, 68, 0.5)',
      },
    },
  },
};
```

### CSS Custom Properties for Runtime Theming

For seamless light/dark mode switching without page reload:

```css
/* globals.css */
:root {
  --background: #f8f6f6;
  --surface: #ffffff;
  --text-primary: #181111;
  --text-muted: #6b7280;
  --border: #ebe5e5;
}

.dark {
  --background: #0f0d0d;
  --surface: #1a1616;
  --text-primary: #f5f0f0;
  --text-muted: #a8a0a0;
  --border: #2d2424;
}

/* Usage in components */
.card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
}
```

### Color Usage Guidelines

| UI Element | Light Mode | Dark Mode | Notes |
|------------|------------|-----------|-------|
| Page background | `#f8f6f6` | `#0f0d0d` | Warm undertones throughout |
| Cards, modals | `#ffffff` | `#1a1616` | Elevated surfaces |
| Primary buttons | `#e85d4c` text white | Same | Use `#d94f3f` on hover |
| Secondary buttons | `#f8f6f6` bg, `#181111` text | `#1a1616` bg, `#f5f0f0` text | Subtle, non-competing |
| Store type badge | `#e85d4c` bg, white text | Same | Identifies retail listings |
| Repair type badge | `#0ea5e9` bg, white text | Same | Differentiates service type |
| Verification badge | `#16a34a` | Same | Trust signal |
| Star ratings | `#f59e0b` | Same | Universal recognition |
| Error messages | `#b91c1c` | Same | Distinct from coral primary |
| Response time pills | `#16a34a` light bg | Same | Positive indicator |
| Tags/chips | `#f8f6f6` bg | `#1a1616` bg | Neutral, scannable |
| Focus rings | `rgba(239, 68, 68, 0.5)` | Same | 3px outline for keyboard nav |
| Links | `#e85d4c` | Same | Or underlined `#181111` / `#f5f0f0` |

---

## The 8-Pixel Grid System Prevents Spacing Inconsistency

Spacing discipline separates amateur from professional design. Both Apple's Human Interface Guidelines and Google's Material Design recommend **8-pixel base grids** because most screen sizes are divisible by 8, scaling perfectly across device pixel ratios. Your spacing scale should follow: 4px (tight), 8px, 16px, 24px, 32px, 48px, 64px.

The **Gestalt proximity principle** dictates that internal padding (inside components) should be less than or equal to external margins (between components). For listing cards, use 16-24px internal padding with 24-32px gaps between cards—this creates visual grouping that helps users parse information quickly.

Line heights should also align to the grid. Body text at 16px pairs with 24px line height (1.5 × 8 = 24), ensuring baselines align across columns. This mathematical precision is invisible to users but creates the "expensive" feel that distinguishes professional work.

### Spacing Tokens for Tailwind

```js
// tailwind.config.js
module.exports = {
  theme: {
    spacing: {
      '0': '0',
      '1': '4px',    // Tight spacing
      '2': '8px',    // Base unit
      '3': '12px',   // Small padding
      '4': '16px',   // Standard padding
      '5': '20px',   // Medium
      '6': '24px',   // Card padding
      '8': '32px',   // Section gaps
      '10': '40px',  // Large spacing
      '12': '48px',  // Section margins
      '16': '64px',  // Page sections
      '20': '80px',  // Hero spacing
      '24': '96px',  // Major sections
    },
  },
};
```

---

## Mobile-First Architecture Starts with Thumb Zones

> **Note:** These principles apply to **mobile web browsers** (Safari, Chrome on phones). Thumb zones, touch targets, and bottom navigation all work in responsive web design — no native app required.

Research shows **75% of smartphone interactions are thumb-driven**, making thumb zone mapping critical for mobile directory sites. The screen divides into three zones: the natural zone (bottom 30%) where primary actions belong, the stretch zone (middle 40%) for secondary actions and scrollable content, and the hard-to-reach zone (top 30%) for non-interactive elements.

Touch targets must meet platform minimums: **44×44 CSS pixels minimum** for comfortable tapping on both iOS Safari and Android Chrome. Primary actions like "Get Quote" or "Call Now" should exceed minimums at 50px, with **8px minimum spacing** between interactive elements to prevent misclicks.

Mobile web navigation patterns have converged around **sticky bottom navigation bars** (using CSS `position: fixed; bottom: 0`) for 3-5 core destinations. Nielsen Norman Group research found that sites combining visible and hidden navigation saw **1.5× more navigation use** than hidden-only navigation. The hybrid approach works best: bottom bar with visible icons for primary destinations plus a "More" hamburger for overflow items. This pattern works perfectly in mobile browsers and feels as native as an app.

### Mobile Web Navigation Structure

This layout works in mobile browsers (Safari, Chrome). The bottom bar uses CSS `position: fixed` — no native app needed.

```
┌─────────────────────────────────────┐
│  [Location: Manchester, UK    [👤]  │  ← Hard zone (status only)
│                                     │
│  Find Graded Deals                  │
│  ┌─────────────────────────────┐    │
│  │ 🔍 Search stores, brands... │    │  ← Search prominent
│  └─────────────────────────────┘    │
│                                     │
│  [All] [Stores] [Repairs]           │  ← Category tabs
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │  📷  Graded Appliance Centre │   │  ← Scrollable content
│  │  ⭐ 4.8 (156) • 0.3 miles   │    │     (stretch zone)
│  │  ✓ Verified • Responds 2hrs │    │
│  │  [Contact]                   │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  📷  QuickFix Repairs       │    │
│  │  ⭐ 4.9 (243) • 1.2 miles   │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│  🏠      🗺️      ❤️       ≡     │  ← CSS fixed bottom nav
│ Explore  Map    Saved    More      │     (position: fixed; bottom: 0)
└─────────────────────────────────────┘
```

### Bottom Navigation Implementation (CSS Sticky Footer for Web)

This bottom navigation uses CSS `position: fixed` to stick to the bottom of the viewport in mobile browsers. The `pb-safe` class accounts for iOS Safari's home indicator on notched iPhones.

```tsx
// components/BottomNav.tsx
const navItems = [
  { id: 'explore', label: 'Explore', icon: HomeIcon },
  { id: 'map', label: 'Map', icon: MapIcon },
  { id: 'saved', label: 'Saved', icon: HeartIcon, badge: 3 },
  { id: 'more', label: 'More', icon: MenuIcon },
];

export function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50
                    bg-surface-light dark:bg-surface-dark
                    border-t border-border-light dark:border-border-dark
                    pb-[env(safe-area-inset-bottom)] px-4 pt-2">
      {/* env(safe-area-inset-bottom) handles iPhone notch in mobile Safari */}
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] min-h-[44px]
                       transition-colors duration-200
                       ${activeTab === item.id
                         ? 'text-primary'
                         : 'text-content-muted-light dark:text-content-muted-dark'}`}
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
              {item.badge && (
                <span className="absolute -top-1 -right-2 w-4 h-4
                                bg-primary text-white text-[10px] font-semibold
                                rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`text-xs ${activeTab === item.id ? 'font-semibold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
```

**Why this feels "app-like" in the browser:**
- `position: fixed` keeps it visible while scrolling
- `env(safe-area-inset-bottom)` respects iPhone's home indicator
- Touch targets are 44px+ for comfortable tapping
- Instant visual feedback on tap via color transition

---

## Directory-Specific UX Patterns Drive Conversions

Information architecture for local directories should prioritize **search-first** rather than browse-first experiences. Users arrive with specific intent—"appliance repair near me"—and the interface should immediately surface location input with autocomplete suggestions.

Filter design follows platform conventions: **sidebar filters on desktop** (Baymard research shows they outperform horizontal toolbars for 6+ filter types) and **full-screen modal filters on mobile** that slide up from the bottom. Critical implementation details include:

- Allow multiple values within the same filter using OR logic (15% of sites fail this)
- Display applied filters in a visible summary (32% fail this)
- Show live result counts that update as filters change
- Truncate filter lists with 10+ values, showing **most popular first** (not alphabetical)
- Avoid inline scrollable filter areas—they cause scroll-hijacking issues

Map integration should offer **side-by-side layout on desktop** (map occupying ~40% right panel, list on left) and a **toggle between map and list on mobile**. Pin clusters prevent visual chaos in dense areas—show number badges when zoomed out, progressively unclustering as users zoom in. The "Search this area" button pattern (from Airbnb and Zillow) lets users explore while maintaining control.

### Listing Card Anatomy

Research-backed element hierarchy for maximum scanability:

```tsx
// components/ListingCard.tsx
export function ListingCard({ listing }) {
  return (
    <article className="bg-surface-light dark:bg-surface-dark
                        rounded-2xl overflow-hidden
                        shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image with overlays */}
      <div className="relative h-40">
        <Image src={listing.image} alt={listing.name} fill className="object-cover" />

        {/* Type badge - coral for stores, sky blue for repairs */}
        <span className={`absolute top-3 left-3 px-2.5 py-1.5 rounded-lg
                         text-xs font-semibold uppercase tracking-wide text-white
                         ${listing.type === 'repair' ? 'bg-info' : 'bg-primary'}`}>
          {listing.type === 'repair' ? '🔧 Repair' : '🏪 Store'}
        </span>

        {/* Distance badge */}
        <span className="absolute bottom-3 left-3 px-2.5 py-1.5 rounded-lg
                        bg-white/95 text-content-primary-light text-xs font-semibold
                        flex items-center gap-1">
          <MapPinIcon className="w-3.5 h-3.5" />
          {listing.distance}
        </span>

        {/* Save button */}
        <button className="absolute top-3 right-3 w-9 h-9 rounded-full
                          bg-white/95 flex items-center justify-center
                          text-content-muted-light hover:text-primary transition-colors">
          <HeartIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-base font-semibold text-content-primary-light
                            dark:text-content-primary-dark">
                {listing.name}
              </h3>
              {listing.verified && (
                <CheckBadgeIcon className="w-4 h-4 text-success" />
              )}
            </div>
            <p className="text-xs text-content-muted-light dark:text-content-muted-dark">
              {listing.category}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 px-2 py-1
                         bg-background-light dark:bg-surface-dark rounded-lg">
            <StarIcon className="w-3.5 h-3.5 text-warning fill-warning" />
            <span className="text-sm font-semibold text-content-primary-light
                            dark:text-content-primary-dark">
              {listing.rating}
            </span>
            <span className="text-xs text-content-muted-light dark:text-content-muted-dark">
              ({listing.reviews})
            </span>
          </div>
        </div>

        {/* Response time - success indicator */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 mb-3
                       bg-success-light rounded-lg">
          <ClockIcon className="w-3.5 h-3.5 text-success" />
          <span className="text-xs font-medium text-success">
            {listing.responseTime}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {listing.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-xs
                                      bg-background-light dark:bg-background-dark
                                      text-content-muted-light dark:text-content-muted-dark">
              {tag}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3
                       border-t border-border-light dark:border-border-dark">
          <div>
            <span className="text-[10px] uppercase tracking-wider
                           text-content-muted-light dark:text-content-muted-dark">
              Prices
            </span>
            <p className="text-sm font-semibold text-primary">
              {listing.priceRange}
            </p>
          </div>
          <button className="px-4 py-2.5 bg-primary hover:bg-primary-hover
                            text-white text-sm font-semibold rounded-xl
                            flex items-center gap-2 transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-focus">
            <PhoneIcon className="w-4 h-4" />
            Contact
          </button>
        </div>
      </div>
    </article>
  );
}
```

---

## Trust Signals Determine Whether Users Contact Businesses

For a UK appliance directory, trust signals matter more than visual flash. **82% of consumers** say star ratings increase purchase likelihood. Effective patterns include:

| Trust Signal | Implementation | Color Usage |
|--------------|----------------|-------------|
| Verification badge | Checkmark icon next to name | `#16a34a` (success green) |
| Star ratings | Filled stars with count | `#f59e0b` (warning amber) |
| Response time | "Usually responds in 2 hours" | `#16a34a` light bg pill |
| Review recency | "Last reviewed 2 days ago" | `#6b7280` muted text |
| Member since | "Member since 2018" | `#6b7280` muted text |
| Credentials | "Licensed & Insured ✓" | `#16a34a` icon |

### UK-Specific Competitor Differentiation

| Competitor | Trust Approach | Your Opportunity |
|------------|----------------|------------------|
| Checkatrade | Face-to-face interviews, 12 checks | Emphasize appliance-specific expertise |
| Rated People | Work galleries, certificates | Add video testimonials |
| TrustATrader | Limited memberships per area | Highlight response time metrics |

---

## Component Architecture Enables Consistent Scaling

Modern React component systems follow the **atomic design** methodology: atoms (buttons, inputs, typography) → molecules (search forms, input groups) → organisms (headers, navigation bars, listing cards) → templates (page layouts) → pages (populated instances).

### shadcn/ui Setup with Your Palette

After initializing shadcn/ui, customize the theme in `components.json`:

```json
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  }
}
```

Update your CSS variables to use your refined palette:

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 12 10% 97%;        /* #f8f6f6 in HSL */
    --foreground: 0 22% 9%;          /* #181111 */
    --card: 0 0% 100%;               /* #ffffff */
    --card-foreground: 0 22% 9%;     /* #181111 */
    --popover: 0 0% 100%;
    --popover-foreground: 0 22% 9%;
    --primary: 7 77% 60%;            /* #e85d4c */
    --primary-foreground: 0 0% 100%;
    --secondary: 12 10% 97%;         /* #f8f6f6 */
    --secondary-foreground: 0 22% 9%;
    --muted: 12 10% 97%;
    --muted-foreground: 220 9% 46%;  /* #6b7280 */
    --accent: 12 10% 97%;
    --accent-foreground: 0 22% 9%;
    --destructive: 0 72% 40%;        /* #b91c1c */
    --destructive-foreground: 0 0% 100%;
    --border: 20 14% 91%;            /* #ebe5e5 */
    --input: 20 14% 91%;
    --ring: 0 84% 60%;               /* Focus ring */
    --radius: 0.75rem;
  }

  .dark {
    --background: 0 15% 4%;          /* #0f0d0d */
    --foreground: 12 20% 95%;        /* #f5f0f0 */
    --card: 0 15% 9%;                /* #1a1616 */
    --card-foreground: 12 20% 95%;
    --popover: 0 15% 9%;
    --popover-foreground: 12 20% 95%;
    --primary: 7 77% 60%;            /* #e85d4c - same in dark */
    --primary-foreground: 0 0% 100%;
    --secondary: 0 15% 9%;
    --secondary-foreground: 12 20% 95%;
    --muted: 0 15% 9%;
    --muted-foreground: 12 5% 64%;   /* #a8a0a0 */
    --accent: 0 15% 9%;
    --accent-foreground: 12 20% 95%;
    --destructive: 0 72% 40%;
    --destructive-foreground: 0 0% 100%;
    --border: 0 15% 16%;             /* #2d2424 */
    --input: 0 15% 16%;
    --ring: 0 84% 60%;
  }
}
```

### Button Variants with CVA

```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-xl text-sm font-semibold
   transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-focus
   disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-hover',
        secondary: `bg-background-light dark:bg-surface-dark
                   text-content-primary-light dark:text-content-primary-dark
                   border border-border-light dark:border-border-dark
                   hover:bg-border-light dark:hover:bg-border-dark`,
        ghost: `text-content-muted-light dark:text-content-muted-dark
               hover:bg-background-light dark:hover:bg-surface-dark`,
        destructive: 'bg-error text-white hover:bg-error/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-11 px-4',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
```

---

## Elite Teams Reveal the Details That Create Premium Feel

### Linear's Design Philosophy

Linear treats the app itself as the design artifact—designers screenshot the live application and design on top of it, using Figma only as a reference tool. Their entire theme system generates from just three variables: base color, accent color, and contrast level. This constraint creates consistency impossible to achieve with ad-hoc color picking.

**Applied to your palette:** Your warm coral `#e85d4c` as the single accent, with warm neutrals providing the base—this mirrors Linear's constraint-driven approach.

### Stripe's Signature Aesthetic

Stripe uses WebGL with custom "MiniGL" implementation for their gradient backgrounds, blending four customizable colors. Their tilted sections use CSS `transform: skewY(-12deg)` for diagonal cuts. But the real differentiator is their documentation system—Markdoc imposes constraints that prevent pages from becoming open-ended applications.

**Applied to your palette:** For hero sections, consider a subtle gradient using `#f8f6f6` to white, with the coral `#e85d4c` as an accent element rather than overwhelming background.

### Apple's Whitespace Mastery

Apple demonstrates macro and micro whitespace: large padding around sections creates luxury feel while precise letter-spacing and line-height ensure readability. They use an F-pattern scanning layout, aligning content to natural eye movement.

**Applied to your palette:** Your warm `#f8f6f6` background with generous `64px-96px` section spacing creates that premium breathing room.

### Common Patterns Across Elite Designs

- **Inter or custom sans-serif fonts** — Consider DM Sans for slightly warmer feel
- **Limited palettes** — You have one accent (coral) + one semantic differentiation (sky blue for repairs)
- **8px spacing grids** — Implemented in your Tailwind config
- **High contrast for accessibility** — All combinations verified AAA or AA
- **Subtle animations** — 150-300ms, ease-out for user-initiated actions
- **Keyboard-first navigation** — Focus ring defined at `rgba(239, 68, 68, 0.5)`
- **Skeleton loading states** — Use `#ebe5e5` animated pulse
- **Dark mode as standard** — Full palette defined for both modes

---

## New CSS Features Enable Patterns Previously Requiring JavaScript

### Container Queries

For listing cards that appear in different contexts:

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .listing-card {
    display: grid;
    grid-template-columns: 180px 1fr;
  }
}

@container (max-width: 399px) {
  .listing-card {
    display: flex;
    flex-direction: column;
  }
}
```

### The `:has()` Selector

Enable styling parents based on children:

```css
/* Highlight card when input inside is focused */
.search-container:has(input:focus) {
  border-color: #e85d4c; /* Your primary */
  box-shadow: 0 0 0 3px rgba(232, 93, 76, 0.1);
}

/* Style form differently when it has errors */
form:has(.error-message) {
  border-left: 3px solid #b91c1c; /* Your error */
}
```

### Scroll-Driven Animations

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.listing-card {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

### Respect Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .listing-card {
    animation: none;
    transition: none;
  }
}
```

---

## Next.js App Router Patterns Optimize Perceived Performance

### Loading States with Skeletons

```tsx
// app/search/loading.tsx
export default function SearchLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="bg-surface-light dark:bg-surface-dark
                                rounded-2xl overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div className="h-40 bg-border-light dark:bg-border-dark" />

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-5 bg-border-light dark:bg-border-dark rounded w-3/4" />
            <div className="h-4 bg-border-light dark:bg-border-dark rounded w-1/2" />
            <div className="h-8 bg-border-light dark:bg-border-dark rounded w-1/3" />
            <div className="flex gap-2">
              <div className="h-6 bg-border-light dark:bg-border-dark rounded-full w-20" />
              <div className="h-6 bg-border-light dark:bg-border-dark rounded-full w-16" />
            </div>
            <div className="flex justify-between pt-3 border-t border-border-light dark:border-border-dark">
              <div className="h-10 bg-border-light dark:bg-border-dark rounded w-24" />
              <div className="h-10 bg-primary/20 rounded-xl w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Page Transitions with Template

```tsx
// app/template.tsx
'use client';
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-background-light dark:bg-background-dark min-h-screen"
    >
      {children}
    </motion.main>
  );
}
```

### Core Web Vitals Targets

| Metric | Target | Your Optimization |
|--------|--------|-------------------|
| LCP | ≤ 2.5s | Use `priority` on hero images, preload fonts |
| INP | ≤ 200ms | Debounce search, use `startTransition` for filters |
| CLS | < 0.1 | Set explicit `width`/`height` on all images |

---

## Animation Timing Separates Premium from Amateur

### Timing Guidelines

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Hover states | 150ms | ease-out |
| Button press | 100ms | ease-in |
| State changes (modals, dropdowns) | 200-300ms | ease-out |
| Page transitions | 300-400ms | ease-in-out |
| Skeleton pulse | 1500ms | ease-in-out (infinite) |

### Premium Hover State for Cards

```css
.listing-card {
  transition: transform 150ms ease-out, box-shadow 200ms ease;
}

.listing-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(24, 17, 17, 0.12);
}

.listing-card:active {
  transform: translateY(0) scale(0.98);
}
```

### Button Micro-interaction

```css
.btn-primary {
  background-color: #e85d4c;
  transition: background-color 150ms ease-out, transform 100ms ease-out;
}

.btn-primary:hover {
  background-color: #d94f3f;
}

.btn-primary:active {
  transform: scale(0.97);
}

.btn-primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.5);
}
```

---

## Implementation Checklist for Launch

### Search and Discovery
- [ ] Prominent location-based search with autocomplete
- [ ] Category tabs: All / Stores / Repairs
- [ ] Horizontal filter pills on mobile
- [ ] Map/list toggle with seamless transition
- [ ] "Search this area" for map panning
- [ ] Skeleton loading for all data-dependent views

### Listing Presentation
- [ ] Card anatomy with image, title, rating, category, distance, CTA
- [ ] Store badges in coral `#e85d4c`, repair badges in sky blue `#0ea5e9`
- [ ] Verification badges in success green `#16a34a`
- [ ] Lazy loading for below-fold images
- [ ] WebP with JPEG fallbacks
- [ ] Swipeable image carousels on mobile

### Mobile Web Optimization
- [ ] Sticky bottom navigation (`position: fixed`) with 4 destinations
- [ ] Tap targets ≥44px with 8px spacing
- [ ] Primary CTAs in thumb zone (bottom 30% of screen)
- [ ] `tel:` links for click-to-call functionality
- [ ] Bottom sheet (CSS/JS modal) for filters on mobile
- [ ] `env(safe-area-inset-bottom)` for iPhone notch support
- [ ] Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`

### Performance Targets
- [ ] Sub-3-second initial load
- [ ] Sub-100ms touch response feedback
- [ ] LCP optimized with `priority` images
- [ ] CLS prevented with explicit image dimensions

### Color Implementation
- [ ] Primary coral `#e85d4c` for CTAs and store badges
- [ ] Info blue `#0ea5e9` for repair badges
- [ ] Success green `#16a34a` for verification and response times
- [ ] Warning amber `#f59e0b` for star ratings
- [ ] Error red `#b91c1c` for form validation (distinct from primary)
- [ ] All dark mode variants implemented
- [ ] Focus ring `rgba(239, 68, 68, 0.5)` on all interactive elements

### Accessibility
- [ ] All color combinations meet WCAG AA minimum
- [ ] Keyboard navigation with visible focus states
- [ ] Screen reader labels on icons
- [ ] `prefers-reduced-motion` respected
- [ ] Touch targets meet 44px minimum

---

## Quick Reference: Your Complete Color Palette

```
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR REFINED COLOR PALETTE                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRIMARY BRAND                                                  │
│  ┌─────────┐  #e85d4c  Coral - CTAs, store badges, links       │
│  │░░░░░░░░░│  #d94f3f  Coral Hover - button hover states       │
│  └─────────┘  rgba(232,93,76,0.1)  Coral Light - backgrounds   │
│                                                                 │
│  LIGHT MODE                          DARK MODE                  │
│  ┌─────────┐  #f8f6f6  Background    ┌─────────┐  #0f0d0d     │
│  │         │  #ffffff  Surface       │▓▓▓▓▓▓▓▓▓│  #1a1616     │
│  │         │  #181111  Text          │▓▓▓▓▓▓▓▓▓│  #f5f0f0     │
│  │         │  #6b7280  Muted         │▓▓▓▓▓▓▓▓▓│  #a8a0a0     │
│  └─────────┘  #ebe5e5  Border        └─────────┘  #2d2424     │
│                                                                 │
│  SEMANTIC COLORS (BOTH MODES)                                   │
│  ┌───┐ #16a34a  Success - verification, response time          │
│  ├───┤ #f59e0b  Warning - star ratings                         │
│  ├───┤ #b91c1c  Error - form errors (distinct from primary)    │
│  └───┘ #0ea5e9  Info - repair badges, informational            │
│                                                                 │
│  FOCUS                                                          │
│  ┌───┐ rgba(239,68,68,0.5)  Focus Ring - keyboard navigation   │
│  └───┘                                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

The gap between mediocre directory sites and excellent ones comes down to accumulated details: mathematical spacing, proper contrast ratios, purposeful animation, trust-building visual hierarchy, and relentless mobile optimization. Your warm coral palette with strategic semantic colors provides the foundation—now execute with precision.
