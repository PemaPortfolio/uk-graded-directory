# Store Profile Page Specification

**Version:** 1.1 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED  
**v1.1 Amendment:** Entity Authority via Schema.org sameAs — TikTok + Companies House integration for E-E-A-T

---

## Executive Summary

The Store Profile Page is the definitive landing page for each graded appliance retailer. Designed for SEO dominance, AEO (AI search) optimization, and mobile-first user experience. Every element serves a purpose: either helping users make decisions or helping search engines understand and rank the page.

### Key Principles

| Principle | Implementation |
|-----------|----------------|
| **AEO-First** | Structured data (Schema.org), clear facts, extractable information |
| **Mobile-First** | 70%+ traffic is mobile, design accordingly |
| **Trust Building** | Badges, warranties, reviews prominently displayed |
| **Conversion Focus** | CTAs visible without scrolling |
| **Internal Linking** | Connect to categories, city, other stores |

### Data Sources

All data comes from the `stores` table and related junction tables:
- `stores` — Core business information
- `store_categories` — Appliances sold (junction)
- `store_brands` — Brands stocked (junction)
- `reviews` — Customer reviews (polymorphic)
- `places` — Location reference

---

## URL Structure

```
STORE PROFILE URL
═══════════════════════════════════════════════════════════════

PATTERN:    /store/{slug}/

EXAMPLES:
├── /store/best-graded-appliances-manchester/
├── /store/abc-appliance-centre/
├── /store/discount-kitchen-warehouse-birmingham/

SLUG RULES:
├── Generated from business_name + city (if needed for uniqueness)
├── Lowercase, hyphens only
├── Max 60 characters
├── No special characters
└── Unique across all stores

═══════════════════════════════════════════════════════════════
```

---

## Page Structure Overview

```
STORE PROFILE PAGE — SECTION ORDER
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│  NAVBAR (Standard with Search Bar - Spec 02)                │
│  [Logo] [Search Bar] [For Business ▼] [Login]               │
├─────────────────────────────────────────────────────────────┤
│  BREADCRUMBS                                                │
├─────────────────────────────────────────────────────────────┤
│  HERO SECTION                                               │
│  Store name, status badges, rating, hero image             │
├─────────────────────────────────────────────────────────────┤
│  QUICK FACTS SIDEBAR (Desktop) / STICKY CTA (Mobile)       │
│  Contact, hours, directions                                 │
├─────────────────────────────────────────────────────────────┤
│  ABOUT THIS STORE                                           │
│  Description, year established                              │
├─────────────────────────────────────────────────────────────┤
│  WHAT THEY SELL                                             │
│  Categories with icons, stock indicator                    │
├─────────────────────────────────────────────────────────────┤
│  SERVICES OFFERED                                           │
│  Delivery, installation, warranty, finance                 │
├─────────────────────────────────────────────────────────────┤
│  BRANDS IN STOCK                                            │
│  Brand logos/names                                          │
├─────────────────────────────────────────────────────────────┤
│  CONDITION & PRICING GUIDE                                  │
│  Grade explanation table                                    │
├─────────────────────────────────────────────────────────────┤
│  WARRANTY & RETURNS                                         │
│  Trust-building information                                 │
├─────────────────────────────────────────────────────────────┤
│  CUSTOMER REVIEWS                                           │
│  Ratings breakdown, review cards                           │
├─────────────────────────────────────────────────────────────┤
│  LOCATION & DIRECTIONS                                      │
│  Map embed, address, parking, transport                    │
├─────────────────────────────────────────────────────────────┤
│  FREQUENTLY ASKED QUESTIONS                                 │
│  Store-specific + generic FAQs                             │
├─────────────────────────────────────────────────────────────┤
│  REPAIR SERVICES (if offers_repair_service = true)         │
│  Call for repair bookings                                   │
├─────────────────────────────────────────────────────────────┤
│  OTHER STORES IN [CITY]                                     │
│  Internal linking to competitors                           │
├─────────────────────────────────────────────────────────────┤
│  EXPLORE MORE                                               │
│  Category links, nearby cities                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

---

## Section 1: Breadcrumbs

```
BREADCRUMBS
═══════════════════════════════════════════════════════════════

DESKTOP:
Home > England > Manchester > Best Graded Appliances

MOBILE:
< Manchester (back link only, saves space)

STRUCTURE:
├── Home → /
├── Country → /england/
├── City → /england/manchester/
└── Store Name (current, no link)

SCHEMA.ORG:
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
    { "@type": "ListItem", "position": 2, "name": "England", "item": "/england/" },
    { "@type": "ListItem", "position": 3, "name": "Manchester", "item": "/england/manchester/" },
    { "@type": "ListItem", "position": 4, "name": "Best Graded Appliances" }
  ]
}

STYLING:
├── Font size:     13px
├── Color:         #6B7280 (grey)
├── Link color:    #e85d4c (secondary)
├── Separator:     > (with spacing)
├── Margin bottom: 16px
└── Mobile:        Single back arrow + city name

═══════════════════════════════════════════════════════════════
```

---

## Section 2: Hero Section

```
HERO SECTION — DESKTOP
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────────────────────┐  ┌───────────────────────────┐│
│  │                                         │  │                           ││
│  │                                         │  │  CONTACT THIS RETAILER    ││
│  │                                         │  │                           ││
│  │          [STORE HERO IMAGE]            │  │  ┌───────────────────────┐││
│  │          (Warehouse/Showroom)          │  │  │  📞 Call 0161 XXX XXXX│││
│  │                                         │  │  └───────────────────────┘││
│  │                                         │  │                           ││
│  │                                         │  │  ┌───────────────────────┐││
│  │  📸 12 Photos                          │  │  │  🌐 Visit Website     │││
│  │                                         │  │  └───────────────────────┘││
│  └─────────────────────────────────────────┘  │                           ││
│                                                │  ┌───────────────────────┐││
│  Best Graded Appliances                ✓ Verified│  │  📍 Get Directions    │││
│  ──────────────────────────────────────────────│  └───────────────────────┘││
│  ⭐ 4.8 (127 reviews)  •  Manchester          │                           ││
│                                                │  ─────────────────────────││
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐│                           ││
│  │12-month │ │ Free    │ │Same-day │ │Repairs││  🕐 OPENING HOURS         ││
│  │warranty │ │Install  │ │Delivery │ │Avail. ││                           ││
│  └─────────┘ └─────────┘ └─────────┘ └───────┘│  Mon-Fri   09:00 - 17:30  ││
│                                                │  Saturday  09:00 - 16:00  ││
│                                                │  Sunday    Closed         ││
│                                                │                           ││
│                                                │  🟢 Open now              ││
│                                                │                           ││
│                                                └───────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

```
HERO SECTION — MOBILE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────┐
│  < Manchester                           │ ← Breadcrumb
├─────────────────────────────────────────┤
│                                         │
│        [HERO IMAGE - FULL WIDTH]       │
│        (swipeable carousel)             │
│                                         │
│        • • • ○ ○  (pagination dots)    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Best Graded Appliances     ✓ Verified │
│                                         │
│  ⭐ 4.8 (127 reviews)                   │
│  📍 Manchester                          │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │12-month │ │Free     │ │Same-day │   │
│  │warranty │ │Install  │ │Delivery │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ✓ Repairs Available             │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘

STICKY CTA BAR (Fixed at bottom):
┌─────────────────────────────────────────┐
│  [📞 Call]         [🌐 Website]        │
└─────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### Hero Section Data Mapping

```
HERO DATA MAPPING
═══════════════════════════════════════════════════════════════

ELEMENT                 DATABASE FIELD              FALLBACK
─────────────────────────────────────────────────────────────
Store name             business_name               (required)
Trading name           trading_name                (hide if null)
Verified badge         status = 'verified'         Hide if not verified
Rating                 average_rating              "New" if null
Review count           review_count                Hide if 0
City                   place.name                  (required)
Warranty badge         warranty_months             Hide if null
Installation badge     offers_free_installation    Hide if false
                       OR offers_installation
Same-day badge         offers_same_day_delivery    Hide if false
Repairs badge          offers_repair_service       Always show (✓ or ✗)

═══════════════════════════════════════════════════════════════
```

### Trust Badges Specification

```
TRUST BADGES (KEY SELLING POINTS)
═══════════════════════════════════════════════════════════════

These badges appear prominently and are critical for conversion.
Maximum 4-5 badges to avoid clutter.

BADGE PRIORITY ORDER (show first available):
1. Warranty        → "{X}-month warranty"
2. Installation    → "Free Install" OR "£{X} Install"
3. Delivery        → "Same-day Delivery" OR "Free Delivery"
4. Repair Service  → "✓ Repairs Available" OR "✗ No Repairs"
5. Finance         → "0% Finance" (if offers_zero_percent_finance)

BADGE STYLING:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  POSITIVE BADGE (warranty, free install, same-day):        │
│  ├── Background:     #EFF6FF (blue-50)                     │
│  ├── Border:         1px solid #3B82F6 (blue-500)          │
│  ├── Text color:     #1E40AF (blue-800)                    │
│  ├── Font size:      12px                                   │
│  ├── Font weight:    600                                    │
│  ├── Padding:        6px 10px                               │
│  ├── Border radius:  6px                                    │
│  └── Icon:           Before text, 14px                     │
│                                                             │
│  REPAIR BADGE (special treatment):                         │
│  ├── IF true:  Green (#D1FAE5 bg, #065F46 text)           │
│  └── IF false: Grey (#F3F4F6 bg, #6B7280 text)            │
│                                                             │
│  VERIFIED BADGE:                                           │
│  ├── Background:     #e85d4c (secondary)                        │
│  ├── Text color:     #FFFFFF                               │
│  ├── Icon:           ✓ checkmark                           │
│  └── Text:           "Verified"                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

---

## Section 3: Contact Sidebar (Desktop) / Sticky CTA (Mobile)

```
CONTACT SIDEBAR — DESKTOP
═══════════════════════════════════════════════════════════════

┌───────────────────────────────────────┐
│                                       │
│  CONTACT THIS RETAILER               │
│                                       │
│  ┌───────────────────────────────┐   │
│  │  📞 Call 0161 XXX XXXX        │   │ ← Primary CTA (Red)
│  └───────────────────────────────┘   │
│                                       │
│  ┌───────────────────────────────┐   │
│  │  🌐 Visit Website             │   │ ← Secondary CTA (Outline)
│  └───────────────────────────────┘   │
│                                       │
│  ┌───────────────────────────────┐   │
│  │  📍 Get Directions            │   │ ← Secondary CTA (Outline)
│  └───────────────────────────────┘   │
│                                       │
│  ─────────────────────────────────   │
│                                       │
│  🕐 OPENING HOURS                    │
│                                       │
│  Monday      09:00 - 17:30           │
│  Tuesday     09:00 - 17:30           │
│  Wednesday   09:00 - 17:30           │
│  Thursday    09:00 - 17:30           │
│  Friday      09:00 - 17:30           │
│  Saturday    09:00 - 16:00           │
│  Sunday      Closed                  │
│                                       │
│  🟢 Open now (closes at 17:30)       │ ← Dynamic based on time
│                                       │
│  ─────────────────────────────────   │
│                                       │
│  📧 Email enquiry                    │ ← Opens modal/mailto
│                                       │
└───────────────────────────────────────┘

SIDEBAR BEHAVIOR:
├── Position: Sticky (scrolls with page until footer)
├── Top offset: 100px (below header)
├── Width: 320px
└── On mobile: Converts to sticky bottom bar

═══════════════════════════════════════════════════════════════
```

```
STICKY CTA BAR — MOBILE (Fixed Bottom)
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │  📞 Call Now        │  │  🌐 Website         │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

STYLING:
├── Position:       fixed, bottom 0
├── Width:          100%
├── Background:     #FFFFFF
├── Border top:     1px solid #E5E7EB
├── Box shadow:     0 -4px 12px rgba(0,0,0,0.1)
├── Padding:        12px 16px
├── Z-index:        90
├── Buttons:        50% width each, 48px height
├── Call button:    Red background (#DC2626)
├── Website:        Secondary outline (#e85d4c)
└── Safe area:      padding-bottom for iPhone notch

APPEARS:
├── When hero section scrolls out of view
└── Uses Intersection Observer

═══════════════════════════════════════════════════════════════
```

### CTA Click Tracking

```
CLICK TRACKING (MONETIZATION)
═══════════════════════════════════════════════════════════════

ALL CTAs TRACKED IN click_events TABLE:

Call button clicked:
{
  event_type: 'call_click',
  subject_type: 'store',
  subject_id: store.id,
  page_path: '/store/best-graded-appliances/',
  page_type: 'store_profile'
}

Website button clicked:
{
  event_type: 'website_click',
  subject_type: 'store',
  subject_id: store.id,
  page_path: '/store/best-graded-appliances/',
  page_type: 'store_profile'
}

Directions clicked:
{
  event_type: 'directions_click',
  subject_type: 'store',
  subject_id: store.id,
  ...
}

═══════════════════════════════════════════════════════════════
```

---

## Section 4: About This Store

```
ABOUT THIS STORE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  About Best Graded Appliances                              │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Best Graded Appliances is Manchester's premier            │
│  destination for high-quality "scratch and dent" white     │
│  goods. Since 2015, we've specialised in Grade A and       │
│  B-Grade Appliances sourced directly from major            │
│  manufacturers and retailers.                               │
│                                                             │
│  Our 15,000 sq ft Trafford Park Warehouse stocks over     │
│  500 appliances at any time, all tested by our in-house   │
│  engineers and ready for immediate delivery.               │
│                                                             │
│  📅 Established: 2015                                      │
│  📍 Warehouse: 15,000 sq ft showroom                       │
│  ✓ All appliances tested before sale                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA MAPPING:
├── Description:       stores.description
├── Year established:  stores.year_established
├── Additional facts:  Extracted from description or hardcoded

CONTENT GUIDELINES:
├── Minimum: 100 words for SEO value
├── Include: Location, specialties, USPs
├── Tone: Professional but approachable
└── If missing: Show generic text + encourage owner to update

AEO OPTIMIZATION:
├── Use natural language that AI can extract
├── Include factual claims: "Since 2015", "15,000 sq ft"
├── Answer implicit questions: "What does this store sell?"

═══════════════════════════════════════════════════════════════
```

---

## Section 5: What They Sell

```
WHAT THEY SELL
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  What They Sell                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  🧺         │  │  🧊         │  │  🍽️         │        │
│  │  Washing    │  │  Fridge     │  │  Dish-      │        │
│  │  Machines   │  │  Freezers   │  │  washers    │        │
│  │  ✓ In Stock │  │  ✓ In Stock │  │  ✓ In Stock │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  💨         │  │  🇺🇸         │  │  🔥         │        │
│  │  Tumble     │  │  American   │  │  Cookers &  │        │
│  │  Dryers     │  │  Fridges    │  │  Ovens      │        │
│  │  ✓ In Stock │  │  ✓ In Stock │  │  ✗ Not      │        │
│  │             │  │             │  │    Stocked  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                             │
│  Looking for a specific appliance? Call to check stock.   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
├── From store_categories junction table
├── JOIN with appliance_categories for names/icons
├── Show ✓ for categories in store_categories
├── Show ✗ for tier_1/tier_2 categories NOT in store_categories

DISPLAY LOGIC:
├── Show ALL tier_1 categories (always)
├── Show tier_2 categories if store sells them OR if important
├── Hide supplementary unless store sells them
├── Grid: 3 columns desktop, 2 columns mobile

LINKING:
├── Each category card links to store's listings in that category
├── URL: /england/manchester/washing-machines/ (filtered)
└── Helps internal linking and user navigation

CARD STYLING:
├── In Stock:    White bg, secondary border, green checkmark
├── Not Stocked: Grey bg (#F9FAFB), grey text, red X
├── Icon:        From appliance_categories.icon (emoji)
├── Size:        100px × 100px
└── Border radius: 12px

═══════════════════════════════════════════════════════════════
```

---

## Section 6: Services Offered

```
SERVICES OFFERED
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Services Offered                                          │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  DELIVERY                                                   │
│  ─────────────────────────────────────────────────────────  │
│  ✓ Free local delivery (within 30 miles)                   │
│  ✓ Same-day delivery available                             │
│  ✓ Next-day delivery available                             │
│  ○ Nationwide delivery: £49                                │
│                                                             │
│  INSTALLATION                                               │
│  ─────────────────────────────────────────────────────────  │
│  ✓ Free installation on all appliances                     │
│  ✓ Old appliance removal included                          │
│  ✓ WEEE recycling available                                │
│                                                             │
│  PAYMENT OPTIONS                                            │
│  ─────────────────────────────────────────────────────────  │
│  ✓ 0% finance available (subject to status)               │
│  ○ Finance providers: Klarna, Clearpay                    │
│  ✓ Click & Collect available                              │
│                                                             │
│  REPAIRS                                                    │
│  ─────────────────────────────────────────────────────────  │
│  ✓ In-house repair service available                       │
│    Call for repair bookings: 0161 XXX XXXX                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA MAPPING:
─────────────────────────────────────────────────────────────
DELIVERY:
├── offers_delivery           → "Delivery available"
├── offers_free_delivery      → "Free local delivery"
├── free_delivery_threshold   → "Free over £{X}"
├── delivery_radius_miles     → "within {X} miles"
├── offers_same_day_delivery  → "Same-day delivery"
├── offers_next_day_delivery  → "Next-day delivery"
└── delivery_info             → Additional text

INSTALLATION:
├── offers_installation       → "Installation available"
├── offers_free_installation  → "Free installation"
├── installation_cost         → "£{X} installation"
├── offers_old_appliance_removal → "Old appliance removal"
└── offers_weee_recycling     → "WEEE recycling"

PAYMENT:
├── offers_finance            → "Finance available"
├── offers_zero_percent_finance → "0% finance"
├── finance_providers[]       → List providers
├── offers_click_collect      → "Click & Collect"
└── offers_reserve_collect    → "Reserve & Collect"

REPAIRS:
├── offers_repair_service     → Show repair section
└── phone                     → "Call for bookings"

DISPLAY RULES:
├── ✓ = Feature available (green checkmark)
├── ○ = Additional info (neutral bullet)
├── ✗ = Not available (only show if important)
├── Hide entire section if NO features in that category
└── Collapse less important items behind "Show more"

═══════════════════════════════════════════════════════════════
```

---

## Section 7: Brands in Stock

```
BRANDS IN STOCK
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Brands in Stock                                           │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ Bosch  │ │Samsung │ │  LG    │ │Hotpoint│ │ Beko   │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
│                                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │Siemens │ │ Miele  │ │  AEG   │ │Whirlpool│ │Indesit │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
│                                                             │
│  + 5 more brands                       [Show all]          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
├── From store_brands junction table
├── JOIN with brands table for tier/display_order
├── Sort by: tier (premium first), then display_order

DISPLAY:
├── Show top 10 brands by tier
├── "Show all" expands to full list
├── Premium brands: Bold text
├── If brand has logo URL: Show logo
├── Fallback: Text name in pill

LINKING:
├── Each brand can link to filtered view
├── URL: /england/manchester/samsung/ (brand page)
└── Improves internal linking

MOBILE:
├── Horizontal scroll or
├── 3-column grid
└── "Show all" reveals full grid

═══════════════════════════════════════════════════════════════
```

---

## Section 8: Condition & Pricing Guide

```
CONDITION & PRICING GUIDE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Condition & Pricing Guide                                 │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Grade    Description              Savings   Stock  │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  A-Grade  Minor cosmetic marks,    10-30%    ✓     │   │
│  │           fully functional         off RRP          │   │
│  │                                                     │   │
│  │  B-Grade  Light marks, dents,      30-50%    ✓     │   │
│  │           fully functional         off RRP          │   │
│  │                                                     │   │
│  │  C-Grade  Heavier cosmetic         50-70%    ✓     │   │
│  │           damage, works perfectly  off RRP          │   │
│  │                                                     │   │
│  │  Tatty    Damaged packaging        10-20%    ✓     │   │
│  │  Packaging only, appliance perfect off RRP          │   │
│  │                                                     │   │
│  │  Ex-      Showroom models,         15-40%    ✗     │   │
│  │  Display  may have minor wear      off RRP          │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  💡 All graded appliances are fully tested and come       │
│     with a minimum 12-month warranty.                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
├── grades_stocked[] from stores table
├── Grade definitions: Hardcoded educational content
├── Savings ranges: typical_discount_min, typical_discount_max
└── Stock indicator: ✓ if grade in grades_stocked[]

AEO VALUE:
├── Answers: "What is a B-grade appliance?"
├── Answers: "How much can I save?"
├── Educational content Google/AI loves
└── Helps users understand before calling

TABLE STYLING:
├── Zebra striping for rows
├── Bold grade names
├── Green checkmark / red X for stock
├── Responsive: Cards on mobile instead of table

═══════════════════════════════════════════════════════════════
```

---

## Section 9: Warranty & Returns

```
WARRANTY & RETURNS — TRUST SECTION
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│  🛡️                                                         │
│  ─────────────────────────────────────────────────────────  │
│  Warranty & Returns                                        │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  All appliances are sold with a standard 12-month retailer │
│  warranty covering parts and labour. We also offer a       │
│  14-day "no-quibble" returns policy - provided the item    │
│  is returned in its original condition.                    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🛡️ 12-month warranty on all appliances            │   │
│  │  ↩️ 14-day returns policy                           │   │
│  │  🔧 Warranty type: Retailer warranty               │   │
│  │  📋 Extended warranty available                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ℹ️ Warranty information is provided by the retailer.      │
│     Always confirm details before purchase.                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA MAPPING:
├── warranty_months          → "{X}-month warranty"
├── warranty_type            → "Retailer/Manufacturer/Both"
├── offers_extended_warranty → "Extended warranty available"
├── warranty_info            → Additional text (if provided)

STYLING:
├── Background:     #FEF3C7 (amber-100) — Trust color
├── Border left:    4px solid #F59E0B (amber-500)
├── Icon:           🛡️ Shield emoji
└── Prominent position on page

═══════════════════════════════════════════════════════════════
```

---

## Section 10: Customer Reviews

```
CUSTOMER REVIEWS
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Customer Reviews                                          │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌──────────────────────┐  RATING BREAKDOWN                │
│  │                      │  ─────────────────                │
│  │     ⭐ 4.8           │  5 ★ ████████████████ 89        │
│  │    out of 5          │  4 ★ ██████ 24                   │
│  │                      │  3 ★ ██ 8                        │
│  │    127 reviews       │  2 ★ █ 4                         │
│  │                      │  1 ★ █ 2                         │
│  │  93% recommend       │                                  │
│  └──────────────────────┘                                  │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ⭐⭐⭐⭐⭐  "Excellent service and prices"         │   │
│  │                                                     │   │
│  │  Bought a Samsung washing machine, B-grade for     │   │
│  │  £320. Tiny dent on the side but works perfectly.  │   │
│  │  Free delivery and they even took the old one!     │   │
│  │                                                     │   │
│  │  Sarah M. • Manchester • Verified Purchase         │   │
│  │  December 2025                                      │   │
│  │                                                     │   │
│  │  ─────────────────────────────────────────────     │   │
│  │  💬 Response from Best Graded Appliances:          │   │
│  │  "Thank you Sarah! We're glad you're happy..."     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ⭐⭐⭐⭐☆  "Good value, minor delay"              │   │
│  │  ...                                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Load more reviews]                                       │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  📝 Have you shopped here? [Write a review]               │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
├── reviews table WHERE subject_type = 'store' AND subject_id = store.id
├── Only show status = 'approved'
├── Sort by: created_at DESC (newest first)
├── Aggregate: average_rating, review_count from stores table

REVIEW CARD DATA:
├── rating               → Star display
├── title                → Bold headline
├── content              → Review text
├── reviewer_name        → "Sarah M."
├── reviewer_location    → "Manchester"
├── is_verified_customer → "Verified Purchase" badge
├── created_at           → "December 2025"
├── response             → Business reply (if any)
├── response_at          → Response date

PAGINATION:
├── Show first 3 reviews
├── "Load more" adds 5 more
├── Infinite scroll on mobile
└── Total shown in header

SCHEMA.ORG:
{
  "@type": "AggregateRating",
  "ratingValue": 4.8,
  "reviewCount": 127,
  "bestRating": 5,
  "worstRating": 1
}

═══════════════════════════════════════════════════════════════
```

---

## Section 11: Location & Directions

```
LOCATION & DIRECTIONS
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📍 Our Location                                           │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │         [GOOGLE MAPS EMBED - FREE]                 │   │
│  │                                                     │   │
│  │         • Interactive (zoom, pan)                  │   │
│  │         • Shows streets & landmarks                │   │
│  │         • Red pin marks location                   │   │
│  │                    📍                               │   │
│  │                                                     │   │
│  │    ─────────────────────────────────────────────   │   │
│  │    Google                          (branding)      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Unit 15, Trafford Park Industrial Estate                  │
│  Manchester, M17 1WA                                       │
│                                                             │
│  [📋 Copy]  [📍 Get Directions]                           │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  🚗 PARKING                                                │
│  Free customer parking available on site.                  │
│                                                             │
│  🚇 PUBLIC TRANSPORT                                       │
│  Nearest tram: Trafford Park (5 min walk)                 │
│  Buses: 250, 256 stop nearby                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### Map Implementation — FREE Google Embed

```
MAP TECHNOLOGY DECISION
═══════════════════════════════════════════════════════════════

CHOSEN: Google Maps Embed (iframe)
COST:   £0 — 100% FREE
API KEY: Not required

WHY THIS CHOICE:
├── ✅ Completely free, no API costs ever
├── ✅ Interactive map (zoom, pan, explore)
├── ✅ Shows real streets, landmarks, businesses
├── ✅ Red pin marks exact location
├── ✅ No usage limits
├── ✅ Nearly identical to Yelp's implementation
└── ⚠️ Google branding visible (required for free use)

═══════════════════════════════════════════════════════════════
```

### Embed URL Generation

```
GENERATING EMBED URL — TWO METHODS
═══════════════════════════════════════════════════════════════

METHOD 1: Using Coordinates (PREFERRED)
─────────────────────────────────────────────────────────────
If store has latitude/longitude in database:

const embedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;

Example:
https://www.google.com/maps?q=53.4631,-2.2914&output=embed


METHOD 2: Using Address (FALLBACK)
─────────────────────────────────────────────────────────────
If coordinates not available:

const address = encodeURIComponent(
  `${address_line1}, ${city_name}, ${postcode}`
);
const embedUrl = `https://www.google.com/maps?q=${address}&output=embed`;

Example:
https://www.google.com/maps?q=Unit+15+Trafford+Park+Manchester+M17+1WA&output=embed


DIRECTIONS URL (for "Get Directions" button):
─────────────────────────────────────────────────────────────
Opens Google Maps with directions to the store:

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

OR with address:
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

═══════════════════════════════════════════════════════════════
```

### React Component Implementation

```typescript
LOCATION COMPONENT CODE
═══════════════════════════════════════════════════════════════

// components/store-profile/StoreLocationSection.tsx

interface StoreLocationProps {
  store: {
    address_line1?: string;
    address_line2?: string;
    city_name: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
  };
}

export function StoreLocationSection({ store }: StoreLocationProps) {
  // Build full address string
  const fullAddress = [
    store.address_line1,
    store.address_line2,
    store.city_name,
    store.postcode
  ].filter(Boolean).join(', ');

  // Generate embed URL (prefer coordinates)
  const embedUrl = store.latitude && store.longitude
    ? `https://www.google.com/maps?q=${store.latitude},${store.longitude}&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

  // Generate directions URL
  const directionsUrl = store.latitude && store.longitude
    ? `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

  // Copy address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    // Show toast notification
  };

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold mb-4">📍 Our Location</h2>
      
      {/* Map Embed */}
      <div className="rounded-lg overflow-hidden mb-4">
        <iframe
          src={embedUrl}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing ${store.city_name} location`}
        />
      </div>
      
      {/* Address */}
      <address className="not-italic mb-4">
        {store.address_line1 && <p>{store.address_line1}</p>}
        {store.address_line2 && <p>{store.address_line2}</p>}
        <p>{store.city_name}{store.postcode && `, ${store.postcode}`}</p>
      </address>
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={copyAddress}
          className="px-4 py-2 border rounded-lg"
        >
          📋 Copy
        </button>
        <a 
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-secondary text-white rounded-lg"
        >
          📍 Get Directions
        </a>
      </div>
    </section>
  );
}

═══════════════════════════════════════════════════════════════
```

### Mobile Optimization

```
MOBILE BEHAVIOR
═══════════════════════════════════════════════════════════════

DESKTOP:
├── Full interactive map embed (300px height)
├── Address displayed below
├── Copy + Get Directions buttons

MOBILE:
├── Smaller map embed (200px height)
├── OR static placeholder → tap to load map
├── "Get Directions" → Opens native Maps app
├── Copy button → Copies to clipboard

PERFORMANCE OPTIMIZATION:
├── loading="lazy" → Only loads when scrolled into view
├── Below the fold → Doesn't slow initial page load
├── Intersection Observer (optional) → Load on demand

FALLBACK:
├── If iframe blocked (rare)
├── Show address + "Open in Google Maps" link
└── Link always works

═══════════════════════════════════════════════════════════════
```

### Data Mapping

```
DATABASE TO DISPLAY MAPPING
═══════════════════════════════════════════════════════════════

DATABASE FIELD          USED FOR
─────────────────────────────────────────────────────────────
address_line1          Address line 1
address_line2          Address line 2 (if exists)
city_name              City name
postcode               Postcode
latitude               Map center (preferred)
longitude              Map center (preferred)
google_maps_url        NOT USED for embed (generated dynamically)

SCHEMA.ORG OUTPUT:
{
  "@type": "PostalAddress",
  "streetAddress": "{address_line1}",
  "addressLocality": "{city_name}",
  "postalCode": "{postcode}",
  "addressCountry": "GB"
},
"geo": {
  "@type": "GeoCoordinates",
  "latitude": {latitude},
  "longitude": {longitude}
}

═══════════════════════════════════════════════════════════════
```

### Styling

```
LOCATION SECTION STYLING
═══════════════════════════════════════════════════════════════

CONTAINER:
├── Padding:         32px 0 (py-8)
├── Border top:      1px solid #E5E7EB (optional separator)

SECTION TITLE:
├── Font size:       20px
├── Font weight:     700
├── Emoji:           📍 before text
├── Margin bottom:   16px

MAP CONTAINER:
├── Border radius:   8px (rounded-lg)
├── Overflow:        hidden (clips iframe corners)
├── Height:          300px (desktop), 200px (mobile)
├── Width:           100%
├── Margin bottom:   16px

ADDRESS:
├── Font style:      Normal (not italic despite <address> tag)
├── Font size:       15px
├── Line height:     1.6
├── Color:           #374151 (gray-700)
├── Margin bottom:   16px

COPY BUTTON:
├── Background:      #FFFFFF
├── Border:          1px solid #E5E7EB
├── Padding:         8px 16px
├── Border radius:   8px
├── Font size:       14px
├── Hover:           Background #F3F4F6

GET DIRECTIONS BUTTON:
├── Background:      #e85d4c (secondary)
├── Color:           #FFFFFF
├── Padding:         8px 16px
├── Border radius:   8px
├── Font size:       14px
├── Hover:           Background #d94f3f

═══════════════════════════════════════════════════════════════
```

---

## Section 12: FAQ Section

```
FREQUENTLY ASKED QUESTIONS
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Frequently Asked Questions                                │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Does Best Graded Appliances offer delivery?    [+] │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  What warranty do graded appliances come with?  [+] │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Do you offer installation services?            [−] │   │
│  │                                                     │   │
│  │  Yes! Best Graded Appliances offers free            │   │
│  │  installation on all appliances. Our engineers     │   │
│  │  will deliver, install, and test your new          │   │
│  │  appliance, and can remove your old one too.       │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Can I view appliances before buying?           [+] │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  What payment methods do you accept?            [+] │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Do you offer finance options?                  [+] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

FAQ TYPES:
1. STORE-SPECIFIC (generated from data)
   ├── Delivery: Based on offers_delivery, delivery_info
   ├── Installation: Based on offers_installation
   ├── Finance: Based on offers_finance
   └── Warranty: Based on warranty_months, warranty_type

2. GENERIC (hardcoded, always shown)
   ├── "What is a graded appliance?"
   ├── "What's the difference between Grade A and B?"
   └── "Are graded appliances reliable?"

FAQ GENERATION LOGIC:
├── Query faqs table WHERE store_id = {store.id}
├── Merge with generic FAQs
├── Replace {store_name} placeholders
└── Maximum 8 FAQs displayed

SCHEMA.ORG:
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does Best Graded Appliances offer delivery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Free local delivery within 30 miles..."
      }
    }
  ]
}

AEO VALUE:
├── Direct answers for AI search
├── "Does [store] offer delivery?" → Yes/No answer
├── Featured snippet potential
└── Voice search optimization

═══════════════════════════════════════════════════════════════
```

---

## Section 13: Repair Services (Conditional)

```
REPAIR SERVICES — ONLY IF offers_repair_service = true
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 Repair Services                                        │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Best Graded Appliances also offers appliance repair      │
│  and maintenance services. Our experienced engineers      │
│  can fix most major brands.                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │   📞  Call for repair bookings                     │   │
│  │                                                     │   │
│  │   0161 XXX XXXX                                    │   │
│  │                                                     │   │
│  │   [Call Now for Repairs]                           │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Looking for a dedicated repair specialist?                │
│  View all repair services in Manchester →                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DISPLAY CONDITION:
├── ONLY show if stores.offers_repair_service = true
└── Hide entire section if false

LINKING:
├── "View all repair services" → /england/manchester/washing-machine-repair/
└── Improves internal linking to repair pages

═══════════════════════════════════════════════════════════════
```

---

## Section 14: Other Stores in [City]

```
OTHER STORES IN [CITY]
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Other Graded Appliance Stores in Manchester              │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Manchester Appliance Outlet            ⭐ 4.5       │  │
│  │  45 Market Street • 2.3 miles away                  │  │
│  │  [View Store →]                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Discount Kitchen Warehouse             ⭐ 4.3       │  │
│  │  78 Bolton Road, Salford • 4.1 miles away           │  │
│  │  [View Store →]                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  The Scratch & Dent Co.                 ⭐ 4.6       │  │
│  │  12 Industrial Park • 5.8 miles away               │  │
│  │  [View Store →]                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  View all 8 stores in Manchester →                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

QUERY:
SELECT * FROM stores 
WHERE place_id = {current_store.place_id}
  AND id != {current_store.id}
  AND is_active = true
ORDER BY overall_score DESC
LIMIT 3;

DISPLAY:
├── Show top 3 other stores in same city
├── Calculate distance if coordinates available
├── Link to each store profile
├── "View all" links to city hub

PURPOSE:
├── Internal linking (SEO)
├── User comparison (UX)
├── Reduces bounce rate
└── Keeps users on site

═══════════════════════════════════════════════════════════════
```

---

## Section 15: Explore More (Footer Links)

```
EXPLORE MORE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Explore More                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  BROWSE BY CATEGORY IN MANCHESTER                          │
│  Washing Machines • Fridge Freezers • Dishwashers         │
│  Tumble Dryers • American Fridges • Cookers               │
│                                                             │
│  NEARBY CITIES                                             │
│  Salford • Bolton • Stockport • Oldham • Rochdale         │
│                                                             │
│  REPAIR SERVICES                                           │
│  Washing Machine Repair • Fridge Repair • Oven Repair     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

PURPOSE:
├── Maximum internal linking
├── Category pages get link juice
├── Nearby city pages get links
├── Repair pages get links

LINKS:
├── Category: /england/manchester/washing-machines/
├── Nearby city: /england/salford/
├── Repair: /england/manchester/washing-machine-repair/

═══════════════════════════════════════════════════════════════
```

---

## SEO Implementation

### Meta Tags

```
META TAGS — STORE PROFILE
═══════════════════════════════════════════════════════════════

TITLE:
{business_name} - Graded Appliances in {city_name} | UK Graded Appliances

EXAMPLE:
Best Graded Appliances - Graded Appliances in Manchester | UK Graded Appliances

META DESCRIPTION:
{business_name} in {city_name}. {short_description OR first 150 chars of description}. {warranty_months}-month warranty. {categories sold}. Call {phone}.

EXAMPLE:
Best Graded Appliances in Manchester. Save 30-70% on graded washing machines, fridge freezers & more. 12-month warranty. Free delivery & installation. Call 0161 XXX XXXX.

CANONICAL:
https://ukgradedappliances.com/store/{slug}/

OPEN GRAPH:
├── og:title:       {business_name} - Graded Appliances in {city_name}
├── og:description: {meta description}
├── og:image:       {hero image or store logo}
├── og:url:         {canonical}
└── og:type:        business.business

TWITTER:
├── twitter:card:   summary_large_image
├── twitter:title:  {og:title}
└── twitter:description: {og:description}

═══════════════════════════════════════════════════════════════
```

### Schema.org (JSON-LD)

```json
SCHEMA.ORG — STORE PROFILE
═══════════════════════════════════════════════════════════════

{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://ukgradedappliances.com/store/best-graded-appliances/#business",
      "name": "Best Graded Appliances",
      "alternateName": "Best Graded Appliances Manchester",
      "description": "Manchester's premier destination for graded appliances...",
      "url": "https://ukgradedappliances.com/store/best-graded-appliances/",
      "telephone": "+441617XXXXXX",
      "email": "info@bestgradedappliances.co.uk",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Unit 15, Trafford Park Industrial Estate",
        "addressLocality": "Manchester",
        "postalCode": "M17 1WA",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 53.4631,
        "longitude": -2.2914
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "16:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 127,
        "bestRating": 5,
        "worstRating": 1
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Sarah M." },
          "datePublished": "2025-12-15",
          "reviewRating": { "@type": "Rating", "ratingValue": 5 },
          "reviewBody": "Excellent service and prices..."
        }
      ],
      "priceRange": "££",
      "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Finance"],
      "currenciesAccepted": "GBP",
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 53.4631, "longitude": -2.2914 },
        "geoRadius": "30 mi"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Graded Appliances",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Graded Washing Machines" }},
          { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Graded Fridge Freezers" }}
        ]
      },
      "sameAs": [
        "https://www.facebook.com/bestgradedappliances",
        "https://www.tiktok.com/@bestgradedappliances",
        "https://find-and-update.company-information.service.gov.uk/company/12345678"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ukgradedappliances.com/" },
        { "@type": "ListItem", "position": 2, "name": "England", "item": "https://ukgradedappliances.com/england/" },
        { "@type": "ListItem", "position": 3, "name": "Manchester", "item": "https://ukgradedappliances.com/england/manchester/" },
        { "@type": "ListItem", "position": 4, "name": "Best Graded Appliances" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does Best Graded Appliances offer delivery?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes! Free local delivery within 30 miles..." }
        }
      ]
    }
  ]
}

═══════════════════════════════════════════════════════════════
```

### sameAs Entity Authority System (v1.1)

```
SAMEAS ENTITY AUTHORITY — E-E-A-T ENHANCEMENT (v1.1)
═══════════════════════════════════════════════════════════════

PURPOSE:
─────────────────────────────────────────────────────────────────
The "sameAs" property tells search engines that multiple online
presences refer to the SAME real-world business entity. This:

├── Proves the business is REAL (not a fake listing)
├── Links to authoritative sources (government registries)
├── Boosts "Trust" component of E-E-A-T
├── Helps AI systems verify entity information
└── Competitors rarely do this = competitive advantage

THE "KILLER MOVE" — COMPANIES HOUSE LINK:
─────────────────────────────────────────────────────────────────
UK Companies House is a government registry (.gov.uk domain).
Linking to it proves the business is a legal UK entity.

URL Pattern:
https://find-and-update.company-information.service.gov.uk/company/{company_number}

Example:
https://find-and-update.company-information.service.gov.uk/company/12345678

DYNAMIC SAMEAS GENERATION:
─────────────────────────────────────────────────────────────────

// lib/schema/generateStoreSchema.ts

function generateSameAsLinks(store: StoreProfile): string[] {
  const sameAsLinks: string[] = [];
  
  // Social profiles
  if (store.facebook_url) {
    sameAsLinks.push(store.facebook_url);
  }
  if (store.tiktok_url) {
    sameAsLinks.push(store.tiktok_url);
  }
  
  // THE KILLER MOVE — Government-verified entity
  if (store.company_number) {
    sameAsLinks.push(
      `https://find-and-update.company-information.service.gov.uk/company/${store.company_number}`
    );
  }
  
  return sameAsLinks;
}

// In schema generation
const schema = {
  "@type": "LocalBusiness",
  "name": store.name,
  // ... other fields ...
  "sameAs": generateSameAsLinks(store).length > 0 
    ? generateSameAsLinks(store) 
    : undefined  // Omit if empty
};

SUPPORTED SAMEAS LINKS:
─────────────────────────────────────────────────────────────────

| Source | Field | URL Pattern | Trust Level |
|--------|-------|-------------|-------------|
| Facebook | facebook_url | https://facebook.com/... | Medium |
| TikTok | tiktok_url | https://tiktok.com/@... | Medium |
| Companies House | company_number | https://find-and-update.company-information.service.gov.uk/company/{number} | HIGH ✓ |

COMPANIES HOUSE VERIFICATION:
─────────────────────────────────────────────────────────────────

Option A: Manual Verification (Phase 1)
├── Store provides company_number during submission
├── Admin verifies at Companies House website
├── If valid → Mark is_verified = true
└── Include in sameAs automatically

Option B: API Verification (Future)
├── Companies House offers FREE API
├── Endpoint: api.company-information.service.gov.uk
├── Can auto-validate company exists
└── Match business name for extra verification

DATA COLLECTION:
─────────────────────────────────────────────────────────────────
When store submits/claims listing, collect:

| Field | Example | Required |
|-------|---------|----------|
| facebook_url | https://facebook.com/mystore | Optional |
| tiktok_url | https://tiktok.com/@mystore | Optional |
| company_number | 12345678 (8 digits) | Optional |

Note: company_number is optional but HIGHLY valuable for E-E-A-T.
Encourage stores to provide it during verification flow.

═══════════════════════════════════════════════════════════════
```

---

## Mobile Responsive Design

```
MOBILE RESPONSIVE BREAKPOINTS
═══════════════════════════════════════════════════════════════

MOBILE:       < 640px
TABLET:       640px - 1024px
DESKTOP:      > 1024px

MOBILE ADAPTATIONS:
─────────────────────────────────────────────────────────────

HERO:
├── Full-width image carousel
├── Swipeable photos
├── Badges wrap to 2 rows
└── Name/rating below image

SIDEBAR:
├── Converts to sticky bottom CTA bar
├── Only Call + Website buttons
├── Hours in collapsible section below hero
└── Directions integrated into map section

CATEGORY GRID:
├── 2 columns (from 3)
├── Smaller icons
└── "Show more" if > 6 categories

SERVICES:
├── Accordion style (collapsed by default)
├── Each service type is collapsible section
└── Reduces initial page height

BRANDS:
├── Horizontal scroll
├── Or 3-column compact grid
└── "Show all" modal

REVIEWS:
├── Full-width cards
├── Load 2 initially (not 3)
└── Infinite scroll

MAP:
├── Static image initially
├── Tap to open Google Maps app
└── Saves data/battery

FAQs:
├── Accordion (collapsed)
├── Only show 4 initially
└── "View all FAQs" for rest

OTHER STORES:
├── Horizontal scroll cards
├── Or single-column list
└── Smaller cards

═══════════════════════════════════════════════════════════════
```

---

## Component File Structure

```
COMPONENT STRUCTURE
═══════════════════════════════════════════════════════════════

app/
└── store/
    └── [slug]/
        └── page.tsx                    # Main page component

components/
└── store-profile/
    ├── StoreProfilePage.tsx            # Main container
    ├── StoreHero.tsx                   # Hero section
    ├── StoreHeroMobile.tsx             # Mobile hero variant
    ├── StoreContactSidebar.tsx         # Desktop sidebar
    ├── StoreStickyCtaBar.tsx           # Mobile sticky bar
    ├── StoreAbout.tsx                  # About section
    ├── StoreCategoriesGrid.tsx         # What they sell
    ├── StoreServicesSection.tsx        # Services offered
    ├── StoreBrandsSection.tsx          # Brands in stock
    ├── StoreGradeGuide.tsx             # Condition/pricing
    ├── StoreWarrantySection.tsx        # Warranty & returns
    ├── StoreReviewsSection.tsx         # Customer reviews
    ├── StoreReviewCard.tsx             # Individual review
    ├── StoreLocationSection.tsx        # Map & directions
    ├── StoreFaqSection.tsx             # FAQs
    ├── StoreRepairSection.tsx          # Repair services (conditional)
    ├── StoreOtherStores.tsx            # Other stores in city
    ├── StoreExploreMore.tsx            # Category/city links
    └── StoreTrustBadges.tsx            # Badge components

lib/
└── store/
    ├── getStoreBySlug.ts               # Fetch store data
    ├── getStoreReviews.ts              # Fetch reviews
    ├── getOtherStores.ts               # Fetch competitor stores
    ├── generateStoreMeta.ts            # Meta tag generation
    └── generateStoreSchema.ts          # Schema.org generation

types/
└── store.ts                            # TypeScript interfaces

═══════════════════════════════════════════════════════════════
```

---

## TypeScript Interfaces

```typescript
TYPESCRIPT INTERFACES
═══════════════════════════════════════════════════════════════

// types/store.ts

export interface Store {
  id: string;
  slug: string;
  business_name: string;
  trading_name?: string;
  phone?: string;
  email?: string;
  website?: string;
  
  // Address
  address_line1?: string;
  address_line2?: string;
  city_name: string;
  county?: string;
  postcode?: string;
  latitude?: number;
  longitude?: number;
  
  // Details
  description?: string;
  short_description?: string;
  operating_hours?: OperatingHours;
  year_established?: number;
  
  // Services
  offers_delivery: boolean;
  delivery_radius_miles?: number;
  offers_free_delivery: boolean;
  free_delivery_threshold?: number;
  offers_same_day_delivery: boolean;
  offers_next_day_delivery: boolean;
  offers_installation: boolean;
  offers_free_installation: boolean;
  installation_cost?: number;
  offers_old_appliance_removal: boolean;
  offers_weee_recycling: boolean;
  offers_finance: boolean;
  offers_zero_percent_finance: boolean;
  finance_providers?: string[];
  offers_click_collect: boolean;
  offers_repair_service: boolean;
  
  // Stock
  grades_stocked: GradeLevel[];
  typical_discount_min?: number;
  typical_discount_max?: number;
  
  // Warranty
  warranty_months?: number;
  warranty_type?: WarrantyType;
  offers_extended_warranty: boolean;
  warranty_info?: string;
  
  // Ratings
  average_rating?: number;
  review_count: number;
  
  // Status
  status: StoreStatus;
  is_verified: boolean;
  is_featured: boolean;
  
  // Relations
  place: Place;
  categories: ApplianceCategory[];
  brands: Brand[];
  
  // Social & Entity Verification (v1.1 Enhanced)
  facebook_url?: string;
  tiktok_url?: string;              // (v1.1) Added for sameAs
  google_maps_url?: string;
  
  // Business Registration (v1.1) — For Entity Authority
  company_number?: string;          // UK Companies House number (8 digits)
  vat_number?: string;              // VAT registration number
}

export interface StoreReview {
  id: string;
  rating: number;
  title?: string;
  content?: string;
  reviewer_name?: string;
  reviewer_location?: string;
  is_verified_customer: boolean;
  response?: string;
  response_at?: string;
  created_at: string;
}

export type GradeLevel = 'A-grade' | 'B-grade' | 'C-grade' | 'tatty-packaging' | 'mixed';
export type WarrantyType = 'retailer' | 'manufacturer' | 'both' | 'none';
export type StoreStatus = 'pending' | 'active' | 'claimed' | 'verified' | 'suspended';

═══════════════════════════════════════════════════════════════
```

---

## Implementation Checklist

### Phase 1: Core Structure
- [ ] URL routing `/store/[slug]/`
- [ ] Data fetching (getStoreBySlug)
- [ ] Hero section (desktop + mobile)
- [ ] Trust badges
- [ ] Contact sidebar / sticky CTA
- [ ] Meta tags and basic Schema.org

### Phase 2: Content Sections
- [ ] About section
- [ ] Categories grid
- [ ] Services section
- [ ] Brands section
- [ ] Grade guide table
- [ ] Warranty section

### Phase 3: Reviews & Interactive
- [ ] Reviews section with pagination
- [ ] Map embed (lazy loaded)
- [ ] FAQ accordion
- [ ] Click tracking integration

### Phase 4: Internal Linking
- [ ] Other stores in city
- [ ] Explore more section
- [ ] Breadcrumbs
- [ ] Repair section (conditional)

### Phase 5: Polish
- [ ] Mobile optimization
- [ ] Performance audit (Core Web Vitals)
- [ ] Accessibility audit
- [ ] Full Schema.org implementation
- [ ] AEO testing

---

**END OF STORE PROFILE PAGE SPECIFICATION**

═══════════════════════════════════════════════════════════════
Document Status: ✅ LOCKED
Version: 1.1
v1.1 Amendment: Entity Authority via sameAs (TikTok + Companies House)
Approved: January 2026
Next: Implementation Phase 1

v1.1 CHANGELOG:
─────────────────────────────────────────────────────────────────
├── Added tiktok_url to TypeScript interface
├── Added company_number to TypeScript interface  
├── Added vat_number to TypeScript interface
├── Updated Schema.org sameAs example with TikTok + Companies House
├── Added Section: "sameAs Entity Authority System (v1.1)"
├── Documented dynamic sameAs generation logic
├── Documented Companies House verification process
└── Removed instagram_url (replaced with tiktok_url per requirements)

WHY THIS MATTERS (E-E-A-T):
─────────────────────────────────────────────────────────────────
├── Companies House link proves business is legal UK entity
├── Government .gov.uk domain = HIGH trust signal
├── AI systems can verify entity from authoritative source
├── Competitors rarely implement this = competitive advantage
└── Boosts "Trust" component of Google's E-E-A-T framework
═══════════════════════════════════════════════════════════════
