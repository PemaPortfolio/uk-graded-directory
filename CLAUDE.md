# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UK Graded Appliances Directory - A Next.js marketplace for graded appliance retailers and repair service providers across the UK. Dual-sided platform covering retail (stores selling graded/ex-display appliances) and repair (service engineers).

## Tech Stack

- **Framework:** Next.js 16.1.1 with App Router
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth with Google OAuth

## Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [country]/          # Dynamic country/city/category routes
│   ├── api/                # API routes (search classification)
│   ├── auth/               # Auth callback handler
│   ├── brands/             # Brand pages (/brands/ and /brands/{slug}/)
│   ├── business/           # Business add/claim flows
│   ├── categories/         # Categories index page
│   ├── locations/          # All UK cities grouped by country
│   ├── login/              # Login page
│   ├── provider/           # Provider profile pages
│   ├── search/             # Search results page
│   ├── store/              # Store profile pages
│   ├── layout.tsx          # Root layout with Geist fonts
│   ├── page.tsx            # Homepage
│   └── globals.css         # Tailwind imports
├── components/             # React components by feature
│   ├── admin-area/         # Admin area page components
│   ├── auth/               # Auth modal, forms, user menu
│   ├── brand/              # Brand page components (index + individual)
│   ├── brand-repair/       # Brand repair page components
│   ├── business/           # Business add/claim flow components
│   ├── categories/         # Categories index page components
│   ├── city/               # City page components
│   ├── country/            # Country page components
│   ├── filters/            # Filter bar, modals, sort dropdowns
│   ├── footer/             # Site footer
│   ├── homepage/           # Homepage sections
│   ├── layout/             # Layout wrapper components
│   ├── locations/          # Locations page components
│   ├── maps/               # Single/multi location maps
│   ├── national-repair/    # National repair category components
│   ├── national-retail/    # National retail category components
│   ├── nav/                # Navigation, header, business menu
│   ├── provider/           # Provider profile components
│   ├── repair-category/    # Repair category page components
│   ├── retail-category/    # Retail category page components
│   ├── reviews/            # Review display, ratings, sections
│   ├── search/             # Search bar, results, suggestions
│   └── store/              # Store profile components
├── config/                 # Configuration files
│   ├── filters/            # Store/provider filter configs
│   └── social.ts           # Social media links
├── hooks/                  # Custom React hooks
│   └── useAuthModal.ts     # Auth modal state hook
├── lib/                    # Utility libraries
│   ├── auth/               # Auth context provider
│   ├── data/               # Data fetching utilities
│   ├── filters/            # Filter state management
│   ├── footer/             # Footer data
│   ├── schema/             # Schema.org builders
│   ├── search/             # Search classification logic
│   ├── supabase/           # Supabase client utilities
│   └── utils/              # General utilities
├── types/                  # TypeScript definitions
│   ├── auth.ts             # Auth types
│   ├── business.ts         # Business form types
│   ├── filters.ts          # Filter/sort types
│   ├── footer.ts           # Footer types
│   └── reviews.ts          # Review types
└── middleware.ts           # Auth middleware for protected routes

docs/
├── specs/                  # 22 locked UI specifications (see 00-index.md)
├── backend/                # Database migrations
└── guides/                 # Implementation guides
```

## Database Schema

Migration v5 is complete with 30 tables. Key entities:

- **Location hierarchy:** `countries` → `admin_areas` → `places`
- **Businesses:** `stores` (retail), `service_providers` (repair)
- **Taxonomy:** `appliance_categories`, `brands` with `slug_registry` for URL collision prevention
- **Reviews:** Polymorphic `reviews` table with anti-spam fields
- **Analytics:** `click_events` with GDPR consent tracking

All tables have RLS policies enabled. Use Supabase MCP for database operations.

## Architecture Patterns

### URL Slugs
The `slug_registry` table prevents collisions across categories, brands, stores, and providers. All slugs must be unique globally.

### Polymorphic Tables
`reviews` and `click_events` use `subject_type` ('store' | 'provider') with `subject_id` for flexible references.

### Anti-Thin Content
`page_indexability` table gates SEO indexing based on minimum store/provider counts per location.

### Geo Queries
Use `haversine_distance_miles()` and `calculate_bounding_box()` functions for proximity searches.

## Design Specifications

All UI specs are in `docs/specs/`. Reference `00-index.md` for the master list. All 22 specs are locked and should be followed exactly:

- **Header:** Logo (01), Search Bar (02), Auth/Login (04), Business Listing/Claim (03)
- **Profile Pages:** Store Profile (06), Provider Profile (11)
- **Location Pages:** Homepage (12), Country (13), City (07)
- **Category Pages:** Retail Category (14), Repair Category (10), National Retail (17), National Repair (16), Brand Repair (15)
- **Brand Pages:** Brand Page (22) - Brands index `/brands/` and individual brand pages `/brands/{slug}/`
- **Reusable Components:** Store Card (08), Provider Card (09), Filter/Sort UI (18), Breadcrumbs (19), Map View (20), Review Display (21), Footer (05)

## Design System

For comprehensive design guidelines including typography, spacing, animations, mobile patterns, and component architecture, see `docs/guides/design-system.md`.

## Brand Colors

### Primary Brand
- **Primary:** Coral `#e85d4c` (CTAs, primary buttons, store badges, links)
- **Primary Hover:** `#d94f3f`
- **Primary Light:** `rgba(232, 93, 76, 0.1)` (backgrounds, badges)

### Light Mode
- **Background:** `#f8f6f6` (warm off-white)
- **Surface:** `#ffffff` (cards, modals, inputs)
- **Text Primary:** `#181111` (headings, body text)
- **Text Muted:** `#6b7280` (secondary text, labels)
- **Border:** `#ebe5e5` (dividers, card borders)

### Dark Mode
- **Background:** `#0f0d0d` (warm near-black)
- **Surface:** `#1a1616` (cards, modals)
- **Text Primary:** `#f5f0f0` (headings, body text)
- **Text Muted:** `#a8a0a0` (secondary text)
- **Border:** `#2d2424` (dividers)

### Semantic Colors
- **Success:** `#16a34a` (verification badges, positive states)
- **Warning:** `#f59e0b` (star ratings, caution states)
- **Error:** `#b91c1c` (form errors, destructive actions - distinct from primary)
- **Info:** `#0ea5e9` (repair badges, informational)

### Focus & Accessibility
- **Focus Ring:** `rgba(239, 68, 68, 0.5)` (keyboard navigation)

## Import Aliases

Use `@/*` for imports from `src/`:
```typescript
import { createClient } from '@/lib/supabase/client'
```

## Seed Data

Database includes pre-seeded reference data:
- 4 UK countries
- 217 admin areas
- 563 places
- 29 appliance categories (tier_1, tier_2, tier_3, supplementary) - TV/Television removed
- 27 brands (premium, mid_range, value)
- 5 grade levels (tatty-packaging, A-grade, B-grade, C-grade, mixed)
- 13 FAQs (retail and repair)
