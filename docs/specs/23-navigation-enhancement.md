# Navigation Enhancement Specification

**Version:** 1.0 — DRAFT
**Date:** January 2026
**Status:** 🔄 PENDING APPROVAL
**Dependencies:** Spec 01 (Logo), Spec 02 (Search Bar), Spec 03 (Business Menu), Spec 04 (Auth), Spec 12 (Homepage)

---

## Executive Summary

This specification enhances the global navigation to include **Stores**, **Repairs**, and **Guides** dropdown menus, providing direct category discovery paths alongside the existing search functionality. The navigation adapts between homepage (centered, no search) and other pages (search visible, right-aligned).

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Navigation items | Stores, Repairs, Guides, Business, Login | Clear intent paths for both user types |
| Search bar | Conditional (hidden on homepage) | Homepage hero has search — no duplication |
| Homepage nav layout | Centered | Balanced visual when search is absent |
| Other pages nav layout | Right-aligned | Search takes center, nav stays accessible |
| Dropdown pattern | Reuse BusinessMenu pattern | Consistency, proven accessibility |
| Mobile navigation | Hamburger menu | Space constraints require collapsible nav |
| Category display | Tier-based grouping | Popular categories first, logical hierarchy |
| Guides dropdown | Simple link list | Minimal content currently, expandable later |
| Analytics | nav_click event tracking | Measure navigation effectiveness |

---

## Brand Colors Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Coral | `#e85d4c` | Dropdown triggers, active states, icons |
| Primary Hover | `#d94f3f` | Hover states |
| Surface | `#ffffff` | Dropdown backgrounds |
| Text Primary | `#181111` | Menu item titles |
| Text Muted | `#6b7280` | Menu item descriptions |
| Border | `#ebe5e5` | Dropdown borders, dividers |
| Focus Ring | `rgba(239, 68, 68, 0.5)` | Keyboard focus |

---

## Header Architecture

### Desktop Layout Overview

```
HOMEPAGE (Search hidden, nav centered):
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                         │
│  [LOGO]              [Stores ▼] [Repairs ▼] [Guides] [For Business ▼] [Log in]        │
│                                                                                         │
│    ↑                                    ↑ CENTERED                                ↑     │
│  fixed left                                                                    fixed    │
│                                                                                right    │
└─────────────────────────────────────────────────────────────────────────────────────────┘

OTHER PAGES (Search visible, nav right-aligned):
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                         │
│  [LOGO]  [═══════════ SEARCH BAR ═══════════]  [Stores▼] [Repairs▼] [Guides] [Business▼] [Log in] │
│                                                                                         │
│    ↑               ↑ flex-grow center                              ↑ RIGHT-ALIGNED     │
│  left                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile Layout Overview

```
MOBILE HEADER (All pages):
┌─────────────────────────────────────────┐
│  [LOGO]                    [☰] [Log in] │
└─────────────────────────────────────────┘
         ↓ Hamburger opens
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────────┐  │
│  │ 🛒  Stores                      ▶ │  │
│  │ 🔧  Repairs                     ▶ │  │
│  │ 📚  Guides                      ▶ │  │
│  │ 💼  For Business                ▶ │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

MOBILE SEARCH (non-homepage, below header):
┌─────────────────────────────────────────┐
│  [═══════════ SEARCH BAR ═══════════]   │
└─────────────────────────────────────────┘
```

---

## Navigation States by Page

| Page Type | Logo | Search | Stores | Repairs | Guides | Business | Login | Nav Position |
|-----------|------|--------|--------|---------|--------|----------|-------|--------------|
| Homepage (`/`) | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | **Centered** |
| City Hub | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Right |
| Category Page | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Right |
| Store Profile | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Right |
| Provider Profile | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Right |
| Guides Page | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Right |
| All other pages | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Right |

---

## Component Specifications

### 1. Stores Dropdown

```
STORES DROPDOWN SPECIFICATION
═══════════════════════════════════════════════════════════════

TRIGGER BUTTON:
├── Label:           "Stores"
├── Icon:            ChevronDown (12px, rotates 180° when open)
├── Font size:       14px
├── Font weight:     500 (medium)
├── Color:           #e85d4c (primary coral)
├── Hover:           Underline
├── Padding:         8px 12px
├── Gap:             4px (between text and chevron)
└── Transition:      transform 150ms ease

DROPDOWN MENU:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  POPULAR CATEGORIES                                         │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  🧺  Washing Machines                                       │
│  🧊  Fridge Freezers                                        │
│  🔘  Cookers                                                │
│  🍽️  Dishwashers                                            │
│  💨  Tumble Dryers                                          │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  MORE APPLIANCES                                            │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  🔥  Built-in Ovens                                         │
│  🔘  Hobs                                                   │
│  ❄️  Freezers                                               │
│  🔄  Washer Dryers                                          │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  →  View All Categories                                     │
│  📍  Browse by Location                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

MENU STYLING:
├── Width:           280px
├── Max height:      80vh
├── Overflow:        auto (scrollable if needed)
├── Background:      #ffffff
├── Border:          1px solid #ebe5e5
├── Border radius:   8px
├── Box shadow:      0 10px 25px rgba(0,0,0,0.1)
├── Padding:         8px 0
└── Z-index:         50

SECTION HEADER:
├── Font size:       11px
├── Font weight:     600
├── Color:           #6b7280
├── Text transform:  uppercase
├── Letter spacing:  0.5px
├── Padding:         8px 16px 4px

MENU ITEM:
├── Padding:         10px 16px
├── Icon:            16px, left-aligned, color #6b7280
├── Label:           14px, font-weight 500, color #181111
├── Gap:             12px (between icon and label)
├── Hover:           Background #f8f6f6
├── Active:          Background #ebe5e5
└── Border radius:   0 (full-width highlight)

FOOTER LINKS:
├── Padding:         12px 16px
├── Font weight:     500
├── Color:           #e85d4c
├── Icon:            Arrow right or location pin
└── Hover:           Underline

ROUTES:
├── Washing Machines    → /washing-machines/
├── Fridge Freezers     → /fridge-freezers/
├── Cookers             → /cookers/
├── Dishwashers         → /dishwashers/
├── Tumble Dryers       → /tumble-dryers/
├── Built-in Ovens      → /built-in-ovens/
├── Hobs                → /hobs/
├── Freezers            → /freezers/
├── Washer Dryers       → /washer-dryers/
├── View All Categories → /categories/
└── Browse by Location  → /locations/

═══════════════════════════════════════════════════════════════
```

### 2. Repairs Dropdown

```
REPAIRS DROPDOWN SPECIFICATION
═══════════════════════════════════════════════════════════════

TRIGGER BUTTON:
├── Label:           "Repairs"
├── Icon:            ChevronDown (12px, rotates 180° when open)
├── Font size:       14px
├── Font weight:     500 (medium)
├── Color:           #e85d4c (primary coral)
├── Hover:           Underline
├── Padding:         8px 12px
└── Same styling as Stores dropdown trigger

DROPDOWN MENU:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  REPAIR SERVICES                                            │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  🧺  Washing Machine Repair                                 │
│  🧊  Fridge Freezer Repair                                  │
│  🔘  Cooker & Oven Repair                                   │
│  🍽️  Dishwasher Repair                                      │
│  💨  Tumble Dryer Repair                                    │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  CERTIFICATIONS                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  🔥  Gas Safe Engineers                                     │
│  ❄️  F-Gas Certified                                        │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  →  Find Local Engineers                                    │
│  ⚡  Emergency Repairs                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

MENU STYLING:
└── Same as Stores dropdown

ROUTES:
├── Washing Machine Repair  → /washing-machine-repair/
├── Fridge Freezer Repair   → /fridge-freezer-repair/
├── Cooker & Oven Repair    → /cooker-repair/
├── Dishwasher Repair       → /dishwasher-repair/
├── Tumble Dryer Repair     → /tumble-dryer-repair/
├── Gas Safe Engineers      → /locations/ (filtered)
├── F-Gas Certified         → /locations/ (filtered)
├── Find Local Engineers    → /locations/
└── Emergency Repairs       → /locations/?emergency=true

═══════════════════════════════════════════════════════════════
```

### 3. Guides Dropdown

```
GUIDES DROPDOWN SPECIFICATION
═══════════════════════════════════════════════════════════════

TRIGGER BUTTON:
├── Label:           "Guides"
├── Icon:            ChevronDown (12px, rotates 180° when open)
├── Font size:       14px
├── Font weight:     500 (medium)
├── Color:           #e85d4c (primary coral)
├── Hover:           Underline
├── Padding:         8px 12px
└── Same styling as other dropdown triggers

DROPDOWN MENU:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  FEATURED GUIDES                                            │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  📖  What Are Graded Appliances?                            │
│      Complete beginner's guide                              │
│                                                             │
│  📊  A-Grade vs B-Grade vs C-Grade                          │
│      Which grade should you buy?                            │
│                                                             │
│  🔧  Repair or Replace?                                     │
│      Make the right decision                                │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  BROWSE BY TOPIC                                            │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  🛒  Buying Guides                                          │
│  🔧  Repair Guides                                          │
│  📊  Grade Explainers                                       │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  →  View All Guides                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘

MENU ITEM WITH DESCRIPTION:
├── Title:           14px, font-weight 600, color #181111
├── Description:     12px, font-weight 400, color #6b7280
├── Padding:         12px 16px
├── Gap:             2px (between title and description)
└── Hover:           Background #f8f6f6

ROUTES:
├── What Are Graded Appliances  → /guides/what-are-graded-appliances/
├── A-Grade vs B-Grade          → /guides/a-grade-vs-b-grade-vs-c-grade/
├── Repair or Replace           → /guides/repair-or-replace-appliance/
├── Buying Guides               → /guides/?category=buying
├── Repair Guides               → /guides/?category=repair
├── Grade Explainers            → /guides/?category=grades
└── View All Guides             → /guides/

═══════════════════════════════════════════════════════════════
```

### 4. Mobile Navigation

```
MOBILE NAVIGATION SPECIFICATION
═══════════════════════════════════════════════════════════════

HAMBURGER BUTTON:
├── Icon:            Menu (24px, three horizontal lines)
├── Size:            44px × 44px (touch target)
├── Color:           #181111
├── Hover:           Background #f8f6f6
├── Active:          Transforms to X icon
├── Aria-label:      "Open navigation menu"
├── Aria-expanded:   true/false based on state
└── Position:        Right side, before Login button

MOBILE MENU OVERLAY:
├── Position:        Fixed, full screen
├── Background:      #ffffff
├── Z-index:         100
├── Animation:       Slide in from right (300ms ease-out)
└── Close:           Click outside, X button, or Escape key

MOBILE MENU STRUCTURE:
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────────┐  │
│  │                              [✕]  │  │  ← Close button
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 🛒  Stores                      ▶ │  │  ← Expands to show categories
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 🔧  Repairs                     ▶ │  │  ← Expands to show repair types
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 📚  Guides                      ▶ │  │  ← Expands to show guides
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 💼  For Business                ▶ │  │  ← Existing BusinessMenu items
│  └───────────────────────────────────┘  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │        [  Log in / Sign up  ]     │  │  ← Auth CTA (if logged out)
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 👤  My Account                    │  │  ← (if logged in)
│  │ 📊  Dashboard                     │  │
│  │ 🚪  Log out                       │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

MOBILE MENU ITEM:
├── Height:          56px
├── Padding:         16px
├── Font size:       16px
├── Font weight:     500
├── Border bottom:   1px solid #ebe5e5
├── Chevron:         Right-aligned, rotates when expanded
└── Touch target:    Full width, 56px height minimum

EXPANDED SUBMENU:
├── Background:      #f8f6f6
├── Padding:         8px 0 8px 24px (indented)
├── Animation:       Height expand (200ms ease)
└── Items:           Same as desktop dropdown items

BREAKPOINT:
├── Mobile menu:     < 768px (md breakpoint)
└── Desktop nav:     ≥ 768px

═══════════════════════════════════════════════════════════════
```

---

## Implementation Code

### Header Component

```tsx
// src/components/layout/Header.tsx
'use client'

import { usePathname } from 'next/navigation'
import Logo from './Logo'
import SearchBar from '@/components/search/SearchBar'
import StoresMenu from '@/components/nav/StoresMenu'
import RepairsMenu from '@/components/nav/RepairsMenu'
import GuidesMenu from '@/components/nav/GuidesMenu'
import BusinessMenu from '@/components/nav/BusinessMenu'
import LoginButton from '@/components/nav/LoginButton'
import MobileMenuToggle from '@/components/nav/MobileMenuToggle'

/**
 * Header/Navbar Component (Spec 23)
 *
 * Layout varies by page:
 * - Homepage: Logo left, nav CENTERED, login right (search hidden)
 * - Other pages: Logo left, search center, nav RIGHT (search visible)
 */
export default function Header() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo - Always left */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Search Bar - Hidden on homepage, visible with flex-grow on other pages */}
          {!isHomepage && (
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <SearchBar />
            </div>
          )}

          {/* Navigation - Centered on homepage, right-aligned on other pages */}
          <nav
            className={`hidden md:flex items-center gap-1 ${
              isHomepage
                ? 'absolute left-1/2 -translate-x-1/2'
                : 'ml-auto'
            }`}
          >
            <StoresMenu />
            <RepairsMenu />
            <GuidesMenu />
            <BusinessMenu />
          </nav>

          {/* Right side - Login (always visible) + Mobile toggle */}
          <div className={`flex items-center gap-2 ${isHomepage ? 'ml-auto' : ''}`}>
            <div className="md:hidden">
              <MobileMenuToggle />
            </div>
            <LoginButton />
          </div>
        </div>

        {/* Mobile Search - Hidden on homepage */}
        {!isHomepage && (
          <div className="md:hidden pb-3">
            <SearchBar />
          </div>
        )}
      </div>
    </header>
  )
}
```

### Stores Menu Component

```tsx
// src/components/nav/StoresMenu.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface CategoryItem {
  name: string
  slug: string
  icon: string
}

const popularCategories: CategoryItem[] = [
  { name: 'Washing Machines', slug: 'washing-machines', icon: '🧺' },
  { name: 'Fridge Freezers', slug: 'fridge-freezers', icon: '🧊' },
  { name: 'Cookers', slug: 'cookers', icon: '🔘' },
  { name: 'Dishwashers', slug: 'dishwashers', icon: '🍽️' },
  { name: 'Tumble Dryers', slug: 'tumble-dryers', icon: '💨' },
]

const moreCategories: CategoryItem[] = [
  { name: 'Built-in Ovens', slug: 'built-in-ovens', icon: '🔥' },
  { name: 'Hobs', slug: 'hobs', icon: '🔘' },
  { name: 'Freezers', slug: 'freezers', icon: '❄️' },
  { name: 'Washer Dryers', slug: 'washer-dryers', icon: '🔄' },
]

export default function StoresMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#e85d4c] hover:underline transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Stores
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-[280px] bg-white rounded-lg shadow-lg border border-[#ebe5e5] py-2 z-50">
          {/* Popular Categories */}
          <div className="px-4 py-2">
            <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">
              Popular Categories
            </span>
          </div>
          {popularCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}/`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f8f6f6] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-base">{cat.icon}</span>
              <span className="text-sm font-medium text-[#181111]">{cat.name}</span>
            </Link>
          ))}

          <div className="mx-4 my-2 border-t border-[#ebe5e5]" />

          {/* More Appliances */}
          <div className="px-4 py-2">
            <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">
              More Appliances
            </span>
          </div>
          {moreCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}/`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f8f6f6] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-base">{cat.icon}</span>
              <span className="text-sm font-medium text-[#181111]">{cat.name}</span>
            </Link>
          ))}

          <div className="mx-4 my-2 border-t border-[#ebe5e5]" />

          {/* Footer Links */}
          <Link
            href="/categories/"
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#e85d4c] hover:underline"
            onClick={() => setIsOpen(false)}
          >
            → View All Categories
          </Link>
          <Link
            href="/locations/"
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#e85d4c] hover:underline"
            onClick={() => setIsOpen(false)}
          >
            📍 Browse by Location
          </Link>
        </div>
      )}
    </div>
  )
}
```

### Repairs Menu Component

```tsx
// src/components/nav/RepairsMenu.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface RepairItem {
  name: string
  slug: string
  icon: string
}

const repairServices: RepairItem[] = [
  { name: 'Washing Machine Repair', slug: 'washing-machine-repair', icon: '🧺' },
  { name: 'Fridge Freezer Repair', slug: 'fridge-freezer-repair', icon: '🧊' },
  { name: 'Cooker & Oven Repair', slug: 'cooker-repair', icon: '🔘' },
  { name: 'Dishwasher Repair', slug: 'dishwasher-repair', icon: '🍽️' },
  { name: 'Tumble Dryer Repair', slug: 'tumble-dryer-repair', icon: '💨' },
]

const certifications: RepairItem[] = [
  { name: 'Gas Safe Engineers', slug: 'gas-safe', icon: '🔥' },
  { name: 'F-Gas Certified', slug: 'f-gas', icon: '❄️' },
]

export default function RepairsMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#e85d4c] hover:underline transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Repairs
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-[280px] bg-white rounded-lg shadow-lg border border-[#ebe5e5] py-2 z-50">
          {/* Repair Services */}
          <div className="px-4 py-2">
            <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">
              Repair Services
            </span>
          </div>
          {repairServices.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}/`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f8f6f6] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-sm font-medium text-[#181111]">{item.name}</span>
            </Link>
          ))}

          <div className="mx-4 my-2 border-t border-[#ebe5e5]" />

          {/* Certifications */}
          <div className="px-4 py-2">
            <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">
              Certifications
            </span>
          </div>
          {certifications.map((item) => (
            <Link
              key={item.slug}
              href={`/locations/?certification=${item.slug}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f8f6f6] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-sm font-medium text-[#181111]">{item.name}</span>
            </Link>
          ))}

          <div className="mx-4 my-2 border-t border-[#ebe5e5]" />

          {/* Footer Links */}
          <Link
            href="/locations/"
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#e85d4c] hover:underline"
            onClick={() => setIsOpen(false)}
          >
            → Find Local Engineers
          </Link>
          <Link
            href="/locations/?emergency=true"
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#e85d4c] hover:underline"
            onClick={() => setIsOpen(false)}
          >
            ⚡ Emergency Repairs
          </Link>
        </div>
      )}
    </div>
  )
}
```

### Guides Menu Component

```tsx
// src/components/nav/GuidesMenu.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface GuideItem {
  title: string
  description: string
  slug: string
}

interface CategoryItem {
  name: string
  slug: string
  icon: string
}

const featuredGuides: GuideItem[] = [
  {
    title: 'What Are Graded Appliances?',
    description: 'Complete beginner\'s guide',
    slug: 'what-are-graded-appliances',
  },
  {
    title: 'A-Grade vs B-Grade vs C-Grade',
    description: 'Which grade should you buy?',
    slug: 'a-grade-vs-b-grade-vs-c-grade',
  },
  {
    title: 'Repair or Replace?',
    description: 'Make the right decision',
    slug: 'repair-or-replace-appliance',
  },
]

const guideCategories: CategoryItem[] = [
  { name: 'Buying Guides', slug: 'buying', icon: '🛒' },
  { name: 'Repair Guides', slug: 'repair', icon: '🔧' },
  { name: 'Grade Explainers', slug: 'grades', icon: '📊' },
]

export default function GuidesMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#e85d4c] hover:underline transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Guides
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-[300px] bg-white rounded-lg shadow-lg border border-[#ebe5e5] py-2 z-50">
          {/* Featured Guides */}
          <div className="px-4 py-2">
            <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">
              Featured Guides
            </span>
          </div>
          {featuredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}/`}
              className="block px-4 py-3 hover:bg-[#f8f6f6] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="block text-sm font-semibold text-[#181111]">
                {guide.title}
              </span>
              <span className="block text-xs text-[#6b7280] mt-0.5">
                {guide.description}
              </span>
            </Link>
          ))}

          <div className="mx-4 my-2 border-t border-[#ebe5e5]" />

          {/* Browse by Topic */}
          <div className="px-4 py-2">
            <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">
              Browse by Topic
            </span>
          </div>
          {guideCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/guides/?category=${cat.slug}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f8f6f6] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-base">{cat.icon}</span>
              <span className="text-sm font-medium text-[#181111]">{cat.name}</span>
            </Link>
          ))}

          <div className="mx-4 my-2 border-t border-[#ebe5e5]" />

          {/* Footer Link */}
          <Link
            href="/guides/"
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#e85d4c] hover:underline"
            onClick={() => setIsOpen(false)}
          >
            → View All Guides
          </Link>
        </div>
      )}
    </div>
  )
}
```

### Mobile Menu Toggle Component

```tsx
// src/components/nav/MobileMenuToggle.tsx
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import MobileMenu from './MobileMenu'

export default function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-[#f8f6f6] transition-colors"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-6 h-6 text-[#181111]" />
      </button>

      {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
    </>
  )
}
```

### Mobile Menu Component

```tsx
// src/components/nav/MobileMenu.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, ChevronRight, ChevronDown } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'

interface MobileMenuProps {
  onClose: () => void
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const { user, signOut } = useAuth()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-[300px] bg-white shadow-xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#ebe5e5]">
          <span className="text-lg font-semibold text-[#181111]">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#f8f6f6]"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="py-2">
          {/* Stores Section */}
          <div>
            <button
              onClick={() => toggleSection('stores')}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#f8f6f6]"
            >
              <span className="flex items-center gap-3">
                <span>🛒</span>
                <span className="font-medium">Stores</span>
              </span>
              {expandedSection === 'stores' ? (
                <ChevronDown className="w-5 h-5 text-[#6b7280]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#6b7280]" />
              )}
            </button>
            {expandedSection === 'stores' && (
              <div className="bg-[#f8f6f6] py-2">
                <Link href="/washing-machines/" className="block px-8 py-3" onClick={onClose}>
                  Washing Machines
                </Link>
                <Link href="/fridge-freezers/" className="block px-8 py-3" onClick={onClose}>
                  Fridge Freezers
                </Link>
                <Link href="/categories/" className="block px-8 py-3 text-[#e85d4c] font-medium" onClick={onClose}>
                  View All Categories →
                </Link>
              </div>
            )}
          </div>

          {/* Repairs Section */}
          <div>
            <button
              onClick={() => toggleSection('repairs')}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#f8f6f6]"
            >
              <span className="flex items-center gap-3">
                <span>🔧</span>
                <span className="font-medium">Repairs</span>
              </span>
              {expandedSection === 'repairs' ? (
                <ChevronDown className="w-5 h-5 text-[#6b7280]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#6b7280]" />
              )}
            </button>
            {expandedSection === 'repairs' && (
              <div className="bg-[#f8f6f6] py-2">
                <Link href="/washing-machine-repair/" className="block px-8 py-3" onClick={onClose}>
                  Washing Machine Repair
                </Link>
                <Link href="/fridge-freezer-repair/" className="block px-8 py-3" onClick={onClose}>
                  Fridge Freezer Repair
                </Link>
                <Link href="/locations/" className="block px-8 py-3 text-[#e85d4c] font-medium" onClick={onClose}>
                  Find Local Engineers →
                </Link>
              </div>
            )}
          </div>

          {/* Guides Section */}
          <div>
            <button
              onClick={() => toggleSection('guides')}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#f8f6f6]"
            >
              <span className="flex items-center gap-3">
                <span>📚</span>
                <span className="font-medium">Guides</span>
              </span>
              {expandedSection === 'guides' ? (
                <ChevronDown className="w-5 h-5 text-[#6b7280]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#6b7280]" />
              )}
            </button>
            {expandedSection === 'guides' && (
              <div className="bg-[#f8f6f6] py-2">
                <Link href="/guides/what-are-graded-appliances/" className="block px-8 py-3" onClick={onClose}>
                  What Are Graded Appliances?
                </Link>
                <Link href="/guides/" className="block px-8 py-3 text-[#e85d4c] font-medium" onClick={onClose}>
                  View All Guides →
                </Link>
              </div>
            )}
          </div>

          {/* For Business Section */}
          <div>
            <button
              onClick={() => toggleSection('business')}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#f8f6f6]"
            >
              <span className="flex items-center gap-3">
                <span>💼</span>
                <span className="font-medium">For Business</span>
              </span>
              {expandedSection === 'business' ? (
                <ChevronDown className="w-5 h-5 text-[#6b7280]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#6b7280]" />
              )}
            </button>
            {expandedSection === 'business' && (
              <div className="bg-[#f8f6f6] py-2">
                <Link href="/business/add" className="block px-8 py-3" onClick={onClose}>
                  Add or Claim Your Business
                </Link>
                <Link href="/dashboard" className="block px-8 py-3" onClick={onClose}>
                  Business Dashboard
                </Link>
                <Link href="/business/help" className="block px-8 py-3" onClick={onClose}>
                  Help for Businesses
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Auth Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#ebe5e5] bg-white">
          {user ? (
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="block w-full py-3 px-4 text-center bg-[#e85d4c] text-white rounded-lg font-medium"
                onClick={onClose}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  signOut()
                  onClose()
                }}
                className="block w-full py-3 px-4 text-center border border-[#ebe5e5] rounded-lg font-medium"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="block w-full py-3 px-4 text-center bg-[#e85d4c] text-white rounded-lg font-medium"
              onClick={onClose}
            >
              Log in / Sign up
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
```

---

## Analytics Integration

### Navigation Click Tracking

```typescript
// src/lib/analytics/trackNavClick.ts
import { createClient } from '@/lib/supabase/client'

interface NavClickEvent {
  navItem: 'stores' | 'repairs' | 'guides' | 'business' | 'login'
  dropdownItem?: string
  pagePath: string
}

export async function trackNavClick(event: NavClickEvent) {
  const supabase = createClient()

  await supabase.from('click_events').insert({
    event_type: 'nav_click',
    page_path: event.pagePath,
    page_type: 'navigation',
    // Store nav item info in referrer field for simplicity
    referrer: `nav:${event.navItem}${event.dropdownItem ? `:${event.dropdownItem}` : ''}`,
    clicked_at: new Date().toISOString(),
  })
}
```

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| **Keyboard Navigation** | Tab through all nav items, Enter/Space to activate |
| **Focus Visible** | 2px focus ring with `rgba(239, 68, 68, 0.5)` |
| **Aria Labels** | All buttons have descriptive aria-labels |
| **Aria Expanded** | Dropdown triggers announce expanded state |
| **Aria Haspopup** | Dropdown triggers indicate popup menu |
| **Escape to Close** | All dropdowns close on Escape key |
| **Focus Trap** | Mobile menu traps focus within panel |
| **Screen Reader** | Menu items announced with proper roles |

### Focus Order

1. Logo (home link)
2. Search bar (if visible)
3. Stores dropdown
4. Repairs dropdown
5. Guides dropdown
6. For Business dropdown
7. Login button

---

## Testing Checklist

### Functional Tests

- [ ] All dropdown triggers open/close correctly
- [ ] Click outside closes dropdowns
- [ ] Escape key closes dropdowns
- [ ] Only one dropdown open at a time
- [ ] All links navigate to correct routes
- [ ] Mobile hamburger toggle works
- [ ] Mobile menu accordion expands/collapses
- [ ] Mobile menu closes on navigation
- [ ] Search bar hidden on homepage
- [ ] Nav centered on homepage
- [ ] Nav right-aligned on other pages

### Responsive Tests

- [ ] Desktop (≥1024px): Full nav visible
- [ ] Tablet (768-1023px): Full nav visible
- [ ] Mobile (<768px): Hamburger menu only
- [ ] Mobile search bar below header (non-homepage)

### Accessibility Tests

- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader announces states
- [ ] Color contrast meets AA standards
- [ ] Touch targets ≥44×44px on mobile

### Cross-Browser Tests

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## Integration with Other Specs

| Spec | Integration Point |
|------|-------------------|
| **Spec 01** (Logo) | Logo component unchanged, positioned left |
| **Spec 02** (Search Bar) | Conditional visibility preserved |
| **Spec 03** (Business Menu) | Integrated into nav, pattern reused |
| **Spec 04** (Auth/Login) | LoginButton unchanged, positioned right |
| **Spec 05** (Footer) | Nav and footer links should complement, not duplicate |
| **Spec 12** (Homepage) | Homepage-specific centered nav behavior |
| **Spec 18** (Filters) | Dropdown items may link to filtered pages |
| **Spec 19** (Breadcrumbs) | Breadcrumbs appear below header, not in nav |

---

## Future Enhancements

| Enhancement | Priority | Notes |
|-------------|----------|-------|
| Search within dropdowns | Medium | Filter categories in Stores/Repairs |
| Recently visited | Low | Show user's recent category pages |
| Personalized suggestions | Low | Based on location/browsing history |
| Mega menu variant | Low | For large screens with many categories |
| Bottom navigation (mobile) | Medium | Quick access to key sections |

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| Jan 2026 | 1.0 | Initial specification |
