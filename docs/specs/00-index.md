# UK Graded Appliances Directory — Design Specifications Index

**Last Updated:** January 2026
**Progress:** 21/23 specs complete (91%)

---

## Approved Specifications

### 🔷 HEADER / NAVIGATION BAR — COMPLETE ✅

The header section has been fully specified. Components listed left to right:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   [LOGO]        [         SEARCH BAR         ]    For Business ▼   Log in  │
│                                                                             │
│    (01)                   (02)                        (03)          (04)    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

| # | Component | Status | File |
|---|-----------|--------|------|
| 01 | Logo Implementation | ✅ LOCKED v1.0 | `01-logo-implementation.md` |
| 02 | Search Bar Architecture | ✅ LOCKED v1.1 | `02-search-bar-architecture.md` |
| 03 | Business Listing & Claim Flow | ✅ LOCKED v1.1 | `03-business-listing-claim-flow.md` |
| 04 | Authentication & Login Flow | ✅ LOCKED v1.0 | `04-authentication-login-flow.md` |

---

### 🔷 FOOTER — COMPLETE ✅

| # | Component | Status | File |
|---|-----------|--------|------|
| 05 | Footer | ✅ LOCKED v1.1 | `05-footer.md` |

---

### 🔷 PROFILE PAGES — COMPLETE ✅

| # | Component | Status | File |
|---|-----------|--------|------|
| 06 | Store Profile Page | ✅ LOCKED v1.0 | `06-store-profile-page.md` |
| 11 | Provider Profile Page | ✅ LOCKED v1.0 | `11-provider-profile-page.md` |

---

### 🔷 REUSABLE COMPONENTS — COMPLETE ✅

| # | Component | Status | File |
|---|-----------|--------|------|
| 08 | Store Card Component | ✅ LOCKED v1.1 | `08-store-card-component.md` |
| 09 | Provider Card Component | ✅ LOCKED v1.0 | `09-provider-card-component.md` |

---

### 🔷 LOCATION PAGES — COMPLETE ✅

| # | Component | Status | File |
|---|-----------|--------|------|
| 12 | Homepage | ✅ LOCKED v1.0 | `12-homepage.md` |
| 13 | Country Page | ✅ LOCKED v1.0 | `13-country-page.md` |
| 07 | City Page (Hub) | ✅ LOCKED v1.0 | `07-city-page.md` |

---

### 🔷 CATEGORY & REPAIR PAGES — COMPLETE ✅

| # | Component | Status | File |
|---|-----------|--------|------|
| 14 | Retail Category Page | ✅ LOCKED v1.0 | `14-retail-category-page.md` |
| 10 | Repair Category Page | ✅ LOCKED v1.0 | `10-repair-category-page.md` |
| 15 | Brand Repair Page | ✅ LOCKED v1.0 | `15-brand-repair-page.md` |
| 16 | National Repair Page | ✅ LOCKED v1.0 | `16-national-repair-page.md` |
| 17 | National Retail Category Page | ✅ LOCKED v1.0 | `17-national-retail-category-page.md` |

---

## Pending Specifications

### 🔷 UI COMPONENTS — IN PROGRESS

| # | Component | Status | File |
|---|-----------|--------|------|
| 18 | Filter & Sort UI | ✅ LOCKED v1.0 | `18-filter-sort-ui-system.md` |
| 19 | Breadcrumbs Navigation | ✅ LOCKED v1.0 | `19-breadcrumbs-navigation.md` |
| 20 | Map View | ✅ LOCKED v1.0 | `20-map-view-system.md` |
| 21 | Review Display | ✅ LOCKED v1.0 | `21-review-display-system.md` |

### 🔷 ADMIN & DASHBOARD

| # | Component | Status | Notes |
|---|-----------|--------|-------|
| 22 | Business Dashboard | 🔄 Pending | Owner management UI |
| 23 | Admin Moderation Panel | 🔄 Pending | Review submissions |

---

## Brand Foundation

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#ef4444` | CTAs, primary buttons, accents |
| Secondary | `#2563eb` | Secondary actions, focus, selection, links |
| Secondary Hover | `#1d4ed8` | Secondary button hover state |
| Secondary Active | `#1e40af` | Secondary button active state |
| Background Light | `#f8f6f6` | Page backgrounds |
| Surface Light | `#ffffff` | Cards, containers |
| Text Dark | `#181111` | Primary text |
| Text Muted | `#6b7280` | Secondary text |
| Border Light | `#ebe5e5` | Light borders |
| Border Dark | `#392828` | Dark borders |
| Surface Dark | `#141010` | Dark mode surfaces |
| Success | `#16a34a` | Success states |
| Warning | `#f59e0b` | Warning states |
| Error | `#dc2626` | Error states |
| Info | `#2563eb` | Info states |

### Typography

*(To be defined)*

### Spacing System

*(To be defined)*

---

## How to Use This Index

1. **Check status** before implementing any component
2. **Read the spec** thoroughly before writing code
3. **Follow exactly** — specs are locked after approval
4. **Request changes** through the design review process if needed

---

## Change Log

| Date | Component | Change |
|------|-----------|--------|
| Jan 2026 | Logo | Initial spec locked (v1.0) |
| Jan 2026 | Search Bar | Initial spec locked (v1.0) |
| Jan 2026 | Search Bar | Updated to v1.1: Added anti-thin gating, client-side caching, SearchAction schema, nearby cities fallback, mobile input optimizations, prefetch strategy |
| Jan 2026 | Business Listing & Claim | Initial spec locked (v1.0) — Add/Claim flow, Store + Provider forms, Email verification, Status workflow |
| Jan 2026 | Business Listing & Claim | Updated to v1.1: Simplified Step 5 (warranty, installation, same-day delivery, repair service), Added repair badge spec for all store cards, Added hybrid stores on repair pages, Added schema alignment check |
| Jan 2026 | Authentication & Login | Initial spec locked (v1.0) — Login/Signup modals, Google OAuth, Forgot password, Supabase Auth integration, Protected routes |
| Jan 2026 | Index | Reorganized to show Header/Navigation Bar as complete section |
| Jan 2026 | Footer | Initial spec locked (v1.0) — All 217 admin areas by country, mobile-first accordions, SEO internal linking, popular cities, dynamic stats |
| Jan 2026 | Store Profile Page | Initial spec locked (v1.0) — Full page layout, hero, contact sidebar, services, brands, grades, warranty, reviews, FAQs, Schema.org, mobile sticky CTA |
| Jan 2026 | Store Profile Page | Updated Location section — Added FREE Google Maps embed implementation details, URL generation logic, React component code |
| Jan 2026 | City Page (Hub) | Initial spec locked (v1.0) — Unified retail+repair hub, store cards, filters, categories, brands, FAQs, nearby cities, email capture, Schema.org |
| Jan 2026 | Store Card Component | v1.0 → v1.1: Added Phase 1 Monetization (warranty affiliate D&G, cross-sell to repair, affiliate tracking infrastructure) |
| Jan 2026 | Provider Card Component | Initial spec locked (v1.0) — SEO-dominant design, repair categories with internal links, brand authorizations, UK certifications (Gas Safe, F-Gas, Which?, Checkatrade), urgency badges, parts affiliate (eSpares), cross-sell to retail, Schema.org (HomeAndConstructionBusiness), problem-based expansion |
| Jan 2026 | Repair Category Page | Initial spec locked (v1.0) — Primary SEO ranking target for repair keywords, Provider Cards (full variant), filters/sort, common issues (AI search), repair costs, brand specialists, parts affiliate, cross-sell to retail, nearby cities, anti-thin gating, Schema.org (Service, ItemList, FAQPage), 15 sections |
| Jan 2026 | Provider Profile Page | Initial spec locked (v1.0) — Conversion destination for repair engineers, 20 sections, expanded certifications (Gas Safe, F-Gas, Which?, Checkatrade), reviews with sub-ratings, warranty affiliate (D&G) optimal placement, parts affiliate (eSpares), Schema.org (HomeAndConstructionBusiness), mobile sticky call CTA, service areas coverage |
| Jan 2026 | Homepage | Initial spec locked (v1.0) — Landing page with dual CTA (Buy + Repair), hero search, stats bar, browse by country/category, FAQ section, email capture |
| Jan 2026 | Country Page | Initial spec locked (v1.0) — Regional landing page, admin areas grid, popular cities, category links, cross-country navigation, 175+ internal links |
| Jan 2026 | Retail Category Page | Initial spec locked (v1.0) — Category + location filtered retail listings, store cards, filters/sort, brand sections, nearby cities |
| Jan 2026 | Brand Repair Page | Initial spec locked (v1.0) — Brand + location filtered repair page, authorized providers, brand certification emphasis, 280+ internal links, Schema.org (WebPage, Service, ItemList, FAQPage) |
| Jan 2026 | National Repair Page | Initial spec locked (v1.0) — UK-wide category repair landing, city aggregation by country, repair costs, common issues, repair vs replace decision guide, 580+ internal links |
| Jan 2026 | National Retail Category Page | Initial spec locked (v1.0) — UK-wide category retail landing, city aggregation by country, grade explanations, buying guide, popular brands, subcategories, 590+ internal links |
| Jan 2026 | Index | Updated to 77% complete (17/22 specs)
| Jan 2026 | Filter & Sort UI | Initial spec locked (v1.0) — Unified filter system for stores and providers, 8 store filter categories, 6 provider filter categories, URL state management, mobile bottom sheet, accessibility (WCAG 2.1 AA), React components, Supabase query builders |
| Jan 2026 | Breadcrumbs Navigation | Initial spec locked (v1.0) — Complete breadcrumb system for all page types, Schema.org BreadcrumbList, SEO best practices, AEO optimization for AI search, mobile back navigation, accessibility compliance, unified React component, builder utilities |
| Jan 2026 | Index | Updated to 83% complete (19/23 specs)
| Jan 2026 | Map View System | Initial spec locked (v1.0) — Single-location maps (FREE Google Maps iframe), multi-location maps (FREE Leaflet.js + OpenStreetMap), List/Map view toggle, marker clustering, custom marker design, popup integration with Store/Provider cards, mobile optimization, accessibility compliance |
| Jan 2026 | Index | Updated to 87% complete (20/23 specs)
| Jan 2026 | Review Display System | Initial spec locked (v1.0) — Google Reviews integration strategy, rating display component (4 variants), reviews section for profile pages, Schema.org AggregateRating, fallback states, accessibility compliance, future internal reviews migration path |
| Jan 2026 | Index | Updated to 91% complete (21/23 specs)

