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
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with Geist fonts
│   ├── page.tsx      # Homepage
│   └── globals.css   # Tailwind imports
├── lib/
│   └── supabase/     # Supabase client utilities
└── types/            # TypeScript definitions

docs/
├── specs/            # 21 locked UI specifications (see 00-index.md)
├── backend/          # Database migrations
└── guides/           # Implementation guides
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

All UI specs are in `docs/specs/`. Reference `00-index.md` for the master list. 21 of 23 specs are locked and should be followed exactly:

- Header components (logo, search, auth, business menu)
- Profile pages (store, provider)
- Location pages (homepage, country, city)
- Category pages (retail, repair, national)
- Reusable components (cards, filters, breadcrumbs, maps, reviews)

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
- 30 appliance categories (tier_1, tier_2, tier_3, supplementary)
- 27 brands (premium, mid_range, value)
- 5 grade levels (tatty-packaging, A-grade, B-grade, C-grade, mixed)
- 13 FAQs (retail and repair)
