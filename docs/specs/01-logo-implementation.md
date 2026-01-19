# Logo Implementation Specification

**Version:** 1.2 — LOCKED
**Date:** January 2026
**Status:** ✅ APPROVED

---

## Executive Summary

The logo serves as the primary brand identifier and home navigation element across all pages of the UK Graded Appliances Directory. The brand name is **"GRADED"** with tagline **"APPLIANCE HUB"**.

---

## Brand Colors (Logo Only)

| Color | Hex | Usage |
|-------|-----|-------|
| **Logo Red** | `#ea2a33` | Icon background, accent elements |
| **Black** | `#000000` | Wordmark text ("GRADED", "APPLIANCE HUB") |
| **White** | `#FFFFFF` | Inner icon element, reversed variant |

> **Note:** The logo does NOT use Secondary Blue (`#2563eb`). Blue is reserved for UI elements (links, focus states, secondary buttons) — not the logo itself.

---

## Logo Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌──────────┐                                              │
│   │ ▓▓▓▓▓▓▓▓ │   GRADED                                    │
│   │ ▓░░░░░▓▓ │   APPLIANCE HUB                             │
│   │ ▓░░░░░▓▓ │                                              │
│   │ ▓▓▓▓▓▓▓▓ │                                              │
│   └──────────┘                                              │
│      Icon          Wordmark                                 │
│   (Red + White)    (Black text)                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- **Icon:** Rounded red square with white inner rectangle and red accent bars
- **Primary text:** "GRADED" in bold black
- **Secondary text:** "APPLIANCE HUB" in regular black

---

## Logo Behavior

| Property | Value | Notes |
|----------|-------|-------|
| **Clickable** | Yes | Always links to `/` (homepage) |
| **Cursor** | `pointer` | Standard link behavior |
| **Hover** | `opacity: 0.85` | With `150ms` transition |
| **Focus** | `2px red outline` | Uses `#ea2a33` for brand consistency |
| **Link wrapper** | `<Link href="/">` | Next.js Link component |

---

## File Requirements

### Primary Logo Files

```
public/
├── images/
│   └── logo/
│       ├── graded-logo.svg                 # Full logo (icon + wordmark) — DEFAULT
│       ├── graded-logo-white.svg           # White variant for dark backgrounds
│       ├── graded-icon.svg                 # Icon only (red square)
│       ├── graded-icon-white.svg           # Icon only (white, for dark BGs)
│       └── graded-og.png                   # 1200×630 for social sharing
```

### Favicon & App Icons

```
public/
├── favicon.svg                    # Modern browsers (red icon)
├── favicon.ico                    # Legacy browsers (32×32)
├── favicon-96x96.png              # High-DPI favicon (96×96)
├── apple-touch-icon.png           # iOS home screen (180×180)
├── web-app-manifest-192x192.png   # PWA manifest (192×192)
├── web-app-manifest-512x512.png   # PWA manifest + splash (512×512)
└── site.webmanifest               # PWA web app manifest
```

---

## Sizing Specifications

| Breakpoint | Height | Width | Touch Target |
|------------|--------|-------|--------------|
| **Mobile** (< 768px) | 32px | auto | 44×44px min |
| **Tablet** (768-1024px) | 36px | auto | 44×44px min |
| **Desktop** (> 1024px) | 40px | auto | N/A |

---

## Color Variants

### 1. Primary (Default)
- **Icon:** Red (`#ea2a33`) with white inner element
- **Wordmark:** Black (`#000000`)
- **Background:** White or light surfaces
- **Use case:** Default header on light theme

### 2. Reversed (White)
- **Icon:** White (`#FFFFFF`)
- **Wordmark:** White (`#FFFFFF`)
- **Background:** Dark surface (`#141010`), red, or image overlays
- **Use case:** Footer, dark sections, promotional banners

---

## Implementation Code

```tsx
// components/layout/Logo.tsx
import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  variant?: 'default' | 'white'
  className?: string
}

export default function Logo({ variant = 'default', className }: LogoProps) {
  const logoSrc = variant === 'white'
    ? '/images/logo/graded-logo-white.svg'
    : '/images/logo/graded-logo.svg'

  return (
    <Link
      href="/"
      aria-label="Graded Appliance Hub - Home"
      className={`
        inline-flex items-center
        transition-opacity duration-150
        hover:opacity-85
        focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:ring-offset-2
        ${className}
      `}
    >
      <Image
        src={logoSrc}
        alt="Graded - Find graded appliances near you"
        width={200}
        height={40}
        priority
        className="h-8 w-auto md:h-9 lg:h-10"
      />
    </Link>
  )
}
```

---

## SEO Requirements

### Alt Text
```
"Graded - Find graded appliances near you"
```

### Aria Label (on Link)
```
"Graded Appliance Hub - Home"
```

### Organization Schema Reference
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Graded Appliance Hub",
  "url": "https://gradedappliancehub.co.uk",
  "logo": "https://gradedappliancehub.co.uk/images/logo/graded-logo.svg"
}
```

---

## Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| **Touch target** | Minimum 44×44px clickable area |
| **Focus visible** | 2px red (`#ea2a33`) outline with offset |
| **Alt text** | Descriptive, includes brand name |
| **Aria-label** | On link wrapper, indicates home navigation |
| **Color contrast** | Black text on white: 21:1 ✅ / Red on white: 4.5:1 ✅ |

---

## File Naming Convention

All logo files use **kebab-case** with the brand name prefix:

```
graded-logo.svg             ✅ Correct
graded-logo-white.svg       ✅ Correct
graded-icon.svg             ✅ Correct
Graded-Logo.svg             ❌ Wrong (case)
logo.svg                    ❌ Wrong (not descriptive)
```

---

## Logo Status

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   LOGO DESIGN: ✅ FINALIZED & IMPLEMENTED                     ║
║                                                               ║
║   Source file: GRADED.svg                                    ║
║   Brand: "GRADED" + "APPLIANCE HUB"                          ║
║                                                               ║
║   Delivered assets:                                           ║
║   ├── ✅ graded-logo.svg (red icon + black text)             ║
║   ├── ✅ graded-logo-white.svg (white variant)               ║
║   ├── ✅ graded-icon.svg (icon only, red)                    ║
║   ├── ✅ graded-icon-white.svg (icon only, white)            ║
║   └── ⏳ graded-og.png 1200×630 (requires image editor)      ║
║                                                               ║
║   Favicon & PWA assets:                                       ║
║   ├── ✅ favicon.svg (red icon, modern browsers)             ║
║   ├── ✅ favicon.ico (legacy browsers)                       ║
║   ├── ✅ favicon-96x96.png (high-DPI favicon)                ║
║   ├── ✅ apple-touch-icon.png (iOS home screen)              ║
║   ├── ✅ web-app-manifest-192x192.png (PWA)                  ║
║   ├── ✅ web-app-manifest-512x512.png (PWA)                  ║
║   └── ✅ site.webmanifest (PWA manifest)                     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

**END OF LOGO SPECIFICATION**

═══════════════════════════════════════════════════════════════
Document Status: ✅ LOCKED
Version: 1.2
Approved: January 2026
Design: ✅ Finalized
═══════════════════════════════════════════════════════════════

---

## Changelog

### v1.1 → v1.2
| Section | Change |
|---------|--------|
| **Brand Colors** | Updated to actual SVG colors: `#ea2a33` (red), `#000000` (black), `#ffffff` (white) |
| **Logo Anatomy** | Added new section showing logo structure |
| **File Requirements** | Changed prefix from `[brand-name]` to `graded` |
| **Color Variants** | Updated to match actual logo: red icon + black text (not dark text) |
| **Implementation Code** | Updated file paths and focus ring color to `#ea2a33` |
| **SEO Requirements** | Updated brand name to "Graded Appliance Hub" |
| **Logo Status** | Added source file reference and asset checklist |

### v1.0 → v1.1
- Removed Secondary Blue as logo color
- Changed from "pending" to "finalized" status
