# City Page (City Hub) Specification

**Version:** 1.2 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED  
**v1.1 Amendment:** Data-Driven Narrative System to prevent doorway page penalties (SEO)  
**v1.2 Amendment:** Zero State Pivot Strategy — Nearby stores & repair fallback for cities with no retailers

---

## Executive Summary

The City Page is the **unified hub** for a specific location, combining both graded appliance retailers AND repair services on a single canonical URL. This is a critical architectural decision from v4 to prevent SEO cannibalization between separate "/buy/" and "/repair/" pages.

### Why "City Hub" Architecture?

| Problem (Old) | Solution (v4) |
|---------------|---------------|
| `/buy/manchester/` AND `/repair/manchester/` | Single `/england/manchester/` |
| SEO cannibalization | One canonical URL per city |
| Split authority | Combined link equity |
| Confusing UX | One place for all services |

### Key Principles

| Principle | Implementation |
|-----------|----------------|
| **Unified Hub** | Buy + Repair on same page |
| **SEO First** | Schema.org, FAQs, internal linking |
| **AEO Optimized** | AI-extractable facts, structured data |
| **Mobile First** | 70%+ mobile traffic |
| **Anti-Thin Gating** | Only index if ≥1 store OR ≥1 provider |
| **Conversion Focus** | Email capture, CTAs prominent |
| **Data-Driven Narrative** | Unique intro text per city from live data (v1.1) |
| **Zero State Pivot (v1.2)** | Nearby stores + repair fallback when local stores = 0 |

### Data Sources

```
DATABASE TABLES USED:
├── places              → City information, meta, coordinates
├── countries           → Parent country
├── admin_areas         → Parent admin area (county/council)
├── stores              → Graded appliance retailers
├── service_providers   → Repair engineers
├── appliance_categories → Category taxonomy
├── brands              → Brand taxonomy
├── faqs                → Location FAQs
├── content_blocks      → Templated content
├── deal_alerts         → Email subscriptions
└── store_categories    → Price/grade data for narratives (v1.1)

NARRATIVE SYSTEM (v1.1):
├── lib/seo/narratives/ → Data-driven narrative generation
├── Aggregates data from stores, store_categories, brands
└── Produces unique intro text for each city

ZERO STATE SYSTEM (v1.2):
├── lib/stores/getNearbyStores.ts → Radius-based store fetching
├── get_stores_within_radius()    → PostGIS database function
├── Uses Haversine formula for distance calculation
└── Fetches stores within configurable radius (default 20 miles)
```

---

## URL Structure

```
CITY PAGE URL PATTERN
═══════════════════════════════════════════════════════════════

PATTERN:    /{country}/{city}/

EXAMPLES:
├── /england/manchester/
├── /england/birmingham/
├── /scotland/glasgow/
├── /wales/cardiff/
├── /northern-ireland/belfast/

ROUTING (Next.js App Router):
app/
└── [country]/
    └── [city]/
        └── page.tsx

PARAMS:
├── country: string (country slug from countries table)
└── city: string (place slug from places table)

VALIDATION:
├── Check place.is_active = true
├── Check country slug matches place's country
├── 404 if not found or inactive
└── noindex if is_indexable = false

═══════════════════════════════════════════════════════════════
```

---

## Page Flow & Connections

```
PAGE HIERARCHY & NAVIGATION FLOW
═══════════════════════════════════════════════════════════════

                         ┌──────────────┐
                         │   HOMEPAGE   │
                         │      /       │
                         └──────┬───────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │    COUNTRY PAGE       │
                    │    /england/          │
                    └───────────┬───────────┘
                                │
                                ▼
              ┌─────────────────────────────────┐
              │         CITY PAGE (HUB)         │  ◄── THIS SPEC
              │      /england/birmingham/       │
              └──────┬──────────────┬───────────┘
                     │              │
        ┌────────────┼────────────┐ │
        │            │            │ │
        ▼            ▼            ▼ │
  ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ CATEGORY │ │  BRAND   │ │  REPAIR  │
  │   PAGE   │ │   PAGE   │ │ SERVICE  │
  │/birmingham│ │/birmingham│ │  PAGE   │
  │/washing- │ │/samsung/ │ │/washing- │
  │machines/ │ │          │ │machine-  │
  │          │ │          │ │repair/   │
  └────┬─────┘ └────┬─────┘ └────┬─────┘
       │            │            │
       ▼            ▼            ▼
  ┌──────────┐ ┌──────────┐ ┌──────────┐
  │  STORE   │ │  STORE   │ │ PROVIDER │
  │ PROFILE  │ │ PROFILE  │ │ PROFILE  │
  │ /store/  │ │ /store/  │ │/provider/│
  │ xyz/     │ │ abc/     │ │ joes/    │
  └──────────┘ └──────────┘ └──────────┘

INTERNAL LINKING FROM CITY PAGE:
├── → Category pages (/birmingham/washing-machines/)
├── → Brand pages (/birmingham/samsung/)
├── → Repair service pages (/birmingham/washing-machine-repair/)
├── → Store profile pages (/store/{slug}/)
├── → Provider profile pages (/provider/{slug}/)
├── → Nearby city pages (/wolverhampton/, /coventry/)
├── → Guide pages (/guides/what-are-graded-appliances/)
└── → Parent pages (/, /england/)

═══════════════════════════════════════════════════════════════
```

---

## Page Structure Overview

```
CITY PAGE — SECTION ORDER
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│  NAVBAR (Standard with Search Bar - Spec 02)                │
│  [Logo] [Search Bar] [For Business ▼] [Login]               │
├─────────────────────────────────────────────────────────────┤
│  BREADCRUMBS                                                │
├─────────────────────────────────────────────────────────────┤
│  HERO SECTION                                               │
│  City name, stats, intro text                               │
├─────────────────────────────────────────────────────────────┤
│  REPAIR OR REPLACE CTA (Email Capture)                      │
│  Calculator teaser, email subscription                      │
├─────────────────────────────────────────────────────────────┤
│  QUICK LINKS                                                │
│  Graded Retailers, Appliance Repairs, Buying Guide, Deals  │
├─────────────────────────────────────────────────────────────┤
│  GRADED APPLIANCE RETAILERS                                 │
│  Filters + Store cards (main content)                       │
├─────────────────────────────────────────────────────────────┤
│  APPLIANCE REPAIR SERVICES                                  │
│  Provider cards (preview, link to full repair section)     │
├─────────────────────────────────────────────────────────────┤
│  POPULAR CATEGORIES                                         │
│  Category cards with price hints                           │
├─────────────────────────────────────────────────────────────┤
│  TOP BRANDS AVAILABLE                                       │
│  Brand pills grouped by tier                               │
├─────────────────────────────────────────────────────────────┤
│  WHAT ARE GRADED APPLIANCES?                               │
│  Educational content, grade explanation table              │
├─────────────────────────────────────────────────────────────┤
│  FREQUENTLY ASKED QUESTIONS                                 │
│  Location-specific + generic FAQs (Schema.org FAQPage)     │
├─────────────────────────────────────────────────────────────┤
│  HELPFUL GUIDES                                             │
│  Links to guide articles                                    │
├─────────────────────────────────────────────────────────────┤
│  NEARBY CITIES                                              │
│  Internal linking to other city hubs                       │
├─────────────────────────────────────────────────────────────┤
│  QUICK FACTS (Summary Box)                                  │
│  Stats summary for AEO                                      │
├─────────────────────────────────────────────────────────────┤
│  EMAIL SIGNUP (Bottom CTA)                                  │
│  Deal alerts subscription                                   │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

---

## Section 1: Breadcrumbs

```
BREADCRUMBS
═══════════════════════════════════════════════════════════════

DESKTOP:
🏠 Home  >  England  >  Birmingham

MOBILE:
< England (single back link)

STRUCTURE:
├── Home → /
├── Country → /england/
└── City (current, no link)

NOTE: Admin area NOT shown in breadcrumbs (too deep)
      But used internally for nearby cities logic

SCHEMA.ORG:
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
    { "@type": "ListItem", "position": 2, "name": "England", "item": "/england/" },
    { "@type": "ListItem", "position": 3, "name": "Birmingham" }
  ]
}

STYLING:
├── Font size:       13px
├── Color:           #6B7280 (grey)
├── Link color:      #e85d4c (secondary)
├── Link hover:      Underline
├── Separator:       > (grey)
├── Margin bottom:   16px
└── Mobile:          Back arrow + parent name only

═══════════════════════════════════════════════════════════════
```

---

## Section 2: Hero Section

```
HERO SECTION — WITH DATA-DRIVEN NARRATIVE (v1.1)
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  GRADED APPLIANCES IN BIRMINGHAM                           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                          │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Birmingham has 12 specialist graded appliance         │ │
│  │ retailers serving Birmingham and the wider West       │ │
│  │ Midlands area. Discount Domestics leads with an       │ │
│  │ excellent 4.8-star rating from 127 reviews. Prices    │ │
│  │ start from £189, which is 15% below the national      │ │
│  │ average. 8 stores offer free local delivery.          │ │
│  └───────────────────────────────────────────────────────┘ │
│        ▲                                                    │
│        │                                                    │
│   DATA-DRIVEN NARRATIVE (v1.1)                             │
│   Unique per city, generated from live database            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  🛒 12 Graded        🔧 28 Repair       💰 Save     │   │
│  │     Retailers           Engineers         30-70%   │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 12 graded retailers │ Top: Discount Domestics (4.8★)│   │
│  │ Prices from £189    │ 8 stores with free delivery   │   │
│  └─────────────────────────────────────────────────────┘   │
│        ▲                                                    │
│   KEY FACTS PILLS (v1.1) - For AEO/AI extraction           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA MAPPING:
├── H1:              places.h1_heading OR "Graded Appliances in {name}"
├── Narrative:       getCityNarrative(citySlug).introParagraph (v1.1)
├── Intro fallback:  places.intro_paragraph OR generated template
├── Store count:     places.store_count (computed field)
├── Provider count:  places.provider_count (computed field)
├── Admin area:      admin_areas.name (e.g., "West Midlands")
├── Key facts:       getCityNarrative(citySlug).keyFacts (v1.1)

STATS BOX (3 metrics):
├── Graded Retailers: store_count
├── Repair Engineers: provider_count
└── Save: "30-70%" (static)

STYLING:
├── H1 font size:    36px desktop, 28px mobile
├── H1 font weight:  800
├── H1 color:        #e85d4c (secondary)
├── Narrative:       18px, #4B5563 (grey-600), prose styling (v1.1)
├── Intro text:      18px, #4B5563 (grey-600)
├── Stats box:       Background #F8FAFC (slate-50)
├── Stats box:       Border 1px #E2E8F0 (slate-200)
├── Stats icons:     24px
├── Stats numbers:   Bold, secondary
├── Key facts pills: #EFF6FF bg, #1D4ED8 text, rounded-full (v1.1)
├── Mobile:          Stats stack vertically

═══════════════════════════════════════════════════════════════
```

---

## Section 2.1: Data-Driven Narrative System (v1.1)

```
DATA-DRIVEN NARRATIVE SYSTEM
═══════════════════════════════════════════════════════════════

PURPOSE:
─────────────────────────────────────────────────────────────────
├── Prevent "Doorway Page" / "Thin Content" Google penalties
├── Create UNIQUE text content for every city page
├── Use live database aggregations for accuracy
├── Support AEO (AI Engine Optimization)
└── Improve user experience with local market insights

WHY THIS MATTERS:
─────────────────────────────────────────────────────────────────
Without data-driven narratives, programmatic pages may have:
• Luton and Dunstable share the same 3 stores (radius overlap)
• 95% identical content = Google "doorway page" penalty
• De-indexation risk for thin content

The narrative system injects unique, factual, data-driven content
that differentiates each city page.

LOCATION IN PAGE:
─────────────────────────────────────────────────────────────────
├── Immediately after H1 title
├── Before stats box
├── Wrapped in <div className="prose prose-lg">
└── Single paragraph, 2-4 sentences

DATA SOURCE:
─────────────────────────────────────────────────────────────────
├── Import: import { getCityNarrative } from '@/lib/seo/narratives'
├── Call: const narrative = await getCityNarrative(citySlug)
├── Returns: { introParagraph, metaSummary, keyFacts, dataQualityScore }

TEMPLATE VARIATIONS (5 total):
─────────────────────────────────────────────────────────────────
Templates selected deterministically by city slug hash to ensure
different cities get different template structures:

├── Template 1: Store count + top rated + price focus
├── Template 2: Market comparison + services focus
├── Template 3: Inventory + brands focus
├── Template 4: Local market + repair cross-sell
└── Template 5: Savings emphasis + delivery

EXAMPLE OUTPUTS:
─────────────────────────────────────────────────────────────────

Birmingham (Template 1):
"Birmingham has 12 specialist graded appliance retailers 
serving Birmingham and the wider West Midlands area. 
Discount Domestics leads with an excellent 4.8-star rating 
from 127 reviews. Prices start from £189, which is 15% 
below the national average. 8 stores offer free local delivery."

Manchester (Template 2):
"We track 8 verified retailers selling graded appliances in 
Manchester. Local prices are 12% below the UK average. 
Finance including 0% interest available at 5 stores. 
Manchester Graded Appliances is the top-rated option locally."

Luton (Zero-store Template):
"While there are no physical graded appliance retailers 
directly in Luton, we have identified 3 stores within a 
15-mile radius. The nearest stores are in Bedford."

DATA POINTS AGGREGATED:
─────────────────────────────────────────────────────────────────
├── storeCount:              places.store_count
├── providerCount:           places.provider_count
├── topRatedStore:           stores ORDER BY average_rating DESC LIMIT 1
├── cheapestPrice:           MIN(store_categories.price_min)
├── nationalAveragePrice:    AVG across all places (for comparison)
├── storesWithFreeDelivery:  COUNT WHERE offers_free_delivery = true
├── storesWithFinance:       COUNT WHERE offers_finance = true
├── topBrands:               Top 3 brands by store count
├── averageWarrantyMonths:   AVG(warranty_months)

KEY FACTS PILLS:
─────────────────────────────────────────────────────────────────
Display narrative.keyFacts as inline pills below the narrative.
These are optimized for AEO (AI engine extraction).

Example keyFacts array:
[
  "12 graded appliance retailers",
  "28 repair engineers",
  "Top-rated: Discount Domestics (4.8★)",
  "Prices from £189",
  "8 stores with free delivery"
]

Visual:
┌──────────────────────────┐ ┌────────────────────┐
│ 12 graded retailers      │ │ 28 repair engineers│
└──────────────────────────┘ └────────────────────┘
┌────────────────────────────────┐ ┌──────────────────────┐
│ Top: Discount Domestics (4.8★) │ │ Prices from £189     │
└────────────────────────────────┘ └──────────────────────┘

FALLBACK BEHAVIOR:
─────────────────────────────────────────────────────────────────
├── If narrative generation fails → Use static intro template
├── If dataQualityScore < 20 → Use simplified template
├── If storeCount === 0 → Use zero-store template with nearby info
└── Always graceful degradation, never break page

COMPONENT IMPLEMENTATION:
─────────────────────────────────────────────────────────────────

// In CityHero.tsx or CityPage.tsx

import { getCityNarrative, type NarrativeResult } from '@/lib/seo/narratives';

interface HeroProps {
  place: Place;
  narrative: NarrativeResult | null;
}

function CityHero({ place, narrative }: HeroProps) {
  return (
    <section className="mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#e85d4c] mb-4">
        {place.h1_heading || `Graded Appliances in ${place.name}`}
      </h1>
      
      {/* DATA-DRIVEN NARRATIVE */}
      {narrative?.introParagraph ? (
        <div className="prose prose-lg max-w-none mb-6">
          <p className="text-gray-600 text-lg leading-relaxed">
            {narrative.introParagraph}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 text-lg mb-6">
          Find ex-display, graded & factory second appliances from 
          specialist retailers in {place.name}.
        </p>
      )}
      
      {/* KEY FACTS PILLS */}
      {narrative?.keyFacts && narrative.keyFacts.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {narrative.keyFacts.slice(0, 5).map((fact, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 
                         bg-blue-50 text-blue-700 text-sm rounded-full"
            >
              {fact}
            </span>
          ))}
        </div>
      )}
      
      {/* Stats box continues below... */}
    </section>
  );
}

DATA FETCHING:
─────────────────────────────────────────────────────────────────

// In page.tsx
import { getCityNarrative } from '@/lib/seo/narratives';

export default async function CityPage({ params }: Props) {
  // ... existing data fetching ...
  
  // Fetch narrative
  const narrative = await getCityNarrative(params.city);
  
  return (
    <CityHero place={place} narrative={narrative} />
    // ... rest of page ...
  );
}

STYLING:
─────────────────────────────────────────────────────────────────
Narrative paragraph:
├── Font size:      18px
├── Line height:    1.6
├── Color:          #4B5563 (grey-600)
├── Max width:      prose-lg default (65ch)
├── Margin bottom:  24px

Key facts pills:
├── Background:     #EFF6FF (blue-50)
├── Text color:     #1D4ED8 (blue-700)
├── Font size:      14px
├── Padding:        4px 12px
├── Border radius:  9999px (full)
├── Gap:            8px

SEO IMPACT:
─────────────────────────────────────────────────────────────────
| Metric                  | Before         | After (v1.1)    |
|-------------------------|----------------|-----------------|
| Unique text per page    | ~50 words      | ~80-120 words   |
| Content uniqueness      | 10-20%         | 70-90%          |
| Doorway page risk       | HIGH           | LOW             |
| AEO extractable facts   | 0              | 4-6 per page    |
| Meta description quality| Generic        | City-specific   |

═══════════════════════════════════════════════════════════════
```

---

## Section 3: Repair or Replace CTA (Email Capture)

```
REPAIR OR REPLACE CTA — EMAIL CAPTURE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🤔 NOT SURE WHETHER TO REPAIR OR REPLACE?                 │
│                                                             │
│  Our free calculator helps you decide if repair or buying  │
│  graded is better value — launching soon!                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📧 Enter your email...                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                    [NOTIFY ME →]           │
│                                                             │
│  🔒 No spam. Unsubscribe anytime.                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘

PURPOSE:
├── Email list building for future monetization
├── Teaser for Repair or Replace Calculator (Phase 2)
├── User engagement / value proposition

DATABASE:
├── Stores in: deal_alerts table
├── Fields: email, place_ids (include current city)
├── Consent: Checkbox optional (GDPR implied by action)

STYLING:
├── Background:      #FEF3C7 (amber-50)
├── Border:          1px solid #F59E0B (amber-400)
├── Border radius:   12px
├── Padding:         24px
├── Icon:            🤔 (emoji)
├── Headline:        20px, bold
├── Input:           Full width on mobile
├── Button:          Red (#DC2626), white text
├── Privacy text:    12px, grey

DISPLAY LOGIC:
├── Always show (not gated)
├── After submission: "Thanks! We'll notify you when it launches."
├── Store email even if already subscribed (idempotent)

═══════════════════════════════════════════════════════════════
```

---

## Section 4: Quick Links

```
QUICK LINKS — JUMP NAVIGATION
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  QUICK LINKS                                               │
│                                                             │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐    │
│  │ 🛒 Graded     │ │ 🔧 Appliance  │ │ 📖 Buying     │    │
│  │ Retailers    │ │ Repairs       │ │ Guide         │    │
│  │ (12)         │ │ (28)          │ │               │    │
│  └───────────────┘ └───────────────┘ └───────────────┘    │
│                                                             │
│  ┌───────────────┐                                         │
│  │ 🏷️ Best       │                                         │
│  │ Deals         │                                         │
│  │ This Week     │                                         │
│  └───────────────┘                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘

LINKS:
├── Graded Retailers:  #retailers (anchor scroll)
├── Appliance Repairs: #repairs (anchor scroll)
├── Buying Guide:      /guides/what-are-graded-appliances/
├── Best Deals:        #deals OR filtered view (Phase 2)

STYLING:
├── Grid:            4 columns desktop, 2 columns mobile
├── Card bg:         White
├── Card border:     1px #E5E7EB
├── Card hover:      Shadow + slight lift
├── Icon:            24px emoji
├── Label:           14px, bold
├── Count:           12px, grey (in parentheses)

═══════════════════════════════════════════════════════════════
```

---

## Section 5: Graded Appliance Retailers (Main Section)

```
GRADED APPLIANCE RETAILERS — MAIN CONTENT
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🛒 GRADED APPLIANCE RETAILERS IN BIRMINGHAM     <a name>  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━               │
│                                                             │
│  Birmingham is the UK's graded appliance capital, with     │
│  more specialist retailers than any other city. Save       │
│  30-70% on washing machines, fridge freezers, dishwashers  │
│  and more from these trusted local stores.                 │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  FILTER BY:                                                │
│                                                             │
│  Appliance:  [All Appliances      ▼]                       │
│  Brand:      [All Brands          ▼]                       │
│  Features:   ☐ Delivery  ☐ Warranty 12m+  ☐ Finance       │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Showing 12 retailers, sorted by rating                    │
│                                                             │
│  [ STORE CARD 1 ]                                          │
│  [ STORE CARD 2 ]                                          │
│  [ STORE CARD 3 ]                                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Showing 3 of 12 retailers              │   │
│  │              [VIEW ALL 12 RETAILERS →]              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

ANCHOR:
├── id="retailers" for jump link

SECTION INTRO:
├── Source: content_blocks WHERE slug = 'city-retailers-intro'
├── Fallback: Generated template with {city} placeholder
├── Length: 2-3 sentences

═══════════════════════════════════════════════════════════════
```

### Filter Controls

```
FILTER CONTROLS — SPECIFICATION
═══════════════════════════════════════════════════════════════

APPLIANCE DROPDOWN:
├── Options: From appliance_categories WHERE is_active = true
├── Default: "All Appliances"
├── Filter: Shows stores that have this category
├── Query: JOIN store_categories

BRAND DROPDOWN:
├── Options: From brands WHERE is_active = true
├── Default: "All Brands"
├── Filter: Shows stores that stock this brand
├── Query: JOIN store_brands

FEATURE CHECKBOXES:
├── Delivery:        WHERE offers_delivery = true
├── Warranty 12m+:   WHERE warranty_months >= 12
├── Finance:         WHERE offers_finance = true
├── Same-day:        WHERE offers_same_day_delivery = true (optional)

SORT OPTIONS:
├── Default:         "Rating" (average_rating DESC)
├── Options:         Rating, Distance (if geolocation), Newest
├── Mobile:          Sort in separate dropdown

BEHAVIOR:
├── Client-side filtering (if < 50 stores)
├── Server-side with URL params (if > 50 stores)
├── No page reload (smooth filter)
├── Update count: "Showing X of Y retailers"

MOBILE:
├── Filters collapse into "Filter" button
├── Opens slide-out panel or modal
├── Apply/Clear buttons at bottom

═══════════════════════════════════════════════════════════════
```

### Store Card Component

```
STORE CARD — DETAILED SPECIFICATION
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────┐                                               │
│  │         │   BORSHCH ELECTRIC                 ⭐ 4.8     │
│  │  LOGO   │   ━━━━━━━━━━━━━━━━━                (342)     │
│  │         │   Est. 1982 • 4 West Midlands locations      │
│  └─────────┘                        ✓ Verified            │
│                                                             │
│  Birmingham's largest independent graded appliance         │
│  retailer with over 40 years experience. Specialises in   │
│  premium brands including Bosch, Siemens, Neff and Miele. │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📍 Aston, Birmingham (B6)   │ 🕐 Mon-Sat 9-5:30    │   │
│  │ 📞 0121 327 1234            │ 🌐 borshchelectric   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  WHAT THEY STOCK                                           │
│  ✓ Washing Machines  ✓ Fridge Freezers  ✓ Dishwashers     │
│  ✓ Tumble Dryers     ✓ Cookers & Ovens  ✓ American Fridges│
│                                                             │
│  TOP BRANDS                                                │
│  Bosch • Siemens • Neff • Miele • Samsung • LG • AEG      │
│                                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐│
│  │ 🚚 Free    │ │ 📋 12-Month│ │ 💳 Finance │ │♻️ Recycle││
│  │ Delivery   │ │ Warranty   │ │ Available  │ │ Service  ││
│  └────────────┘ └────────────┘ └────────────┘ └──────────┘│
│                                                             │
│  🏷️ ALSO OFFERS: Installation • Old Appliance Removal     │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │   📞 Call Now       │  │   VIEW PROFILE →    │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### Store Card Data Mapping

```
STORE CARD — DATA MAPPING
═══════════════════════════════════════════════════════════════

FIELD                   DATABASE SOURCE              FALLBACK
─────────────────────────────────────────────────────────────
Logo                    stores.logo_url              Placeholder
Business name           stores.business_name         (required)
Rating                  stores.average_rating        Hide if null
Review count            stores.review_count          Hide if 0
Verified badge          stores.status = 'verified'   Hide if not
Featured badge          stores.is_featured           Hide if false
Established             stores.year_established      Hide if null
Locations               COUNT from store_service_areas  Hide if 1
Description             stores.short_description     Truncate description
Address                 stores.address_line1         Hide if null
Postcode                stores.postcode              Hide if null
Phone                   stores.phone                 Hide if null
Website                 stores.website               Hide if null
Hours (summary)         stores.operating_hours       Hide if null
Categories              JOIN store_categories        Hide if none
Brands                  JOIN store_brands            Hide if none
Free delivery badge     offers_free_delivery = true  Hide if false
Warranty badge          warranty_months >= 6         Show months
Finance badge           offers_finance = true        Hide if false
Recycling badge         offers_weee_recycling        Hide if false
Installation            offers_installation          Show in "Also offers"
Removal                 offers_old_appliance_removal Show in "Also offers"
Repairs                 offers_repair_service        Show badge

CTA BUTTONS:
├── Call Now:      tel:{phone} (track click_events)
├── View Profile:  /store/{slug}/

═══════════════════════════════════════════════════════════════
```

### Store Card Styling

```
STORE CARD — STYLING
═══════════════════════════════════════════════════════════════

CONTAINER:
├── Background:      White
├── Border:          1px solid #E5E7EB
├── Border radius:   12px
├── Padding:         24px
├── Margin bottom:   16px
├── Hover:           Box shadow 0 4px 12px rgba(0,0,0,0.1)
├── Transition:      shadow 200ms ease

FEATURED STORE:
├── Border:          2px solid #F59E0B (amber)
├── Background:      #FFFBEB (amber-50)
├── Badge:           "⭐ Featured" top-right

LOGO:
├── Size:            80px × 80px
├── Border radius:   8px
├── Object fit:      contain
├── Background:      #F9FAFB (if no logo)

BUSINESS NAME:
├── Font size:       20px
├── Font weight:     700
├── Color:           #e85d4c (secondary)
├── Link:            → /store/{slug}/

RATING:
├── Font size:       18px
├── Icon:            ⭐ (filled)
├── Review count:    13px, grey, in parentheses

VERIFIED BADGE:
├── Background:      #D1FAE5 (green-100)
├── Border:          1px solid #10B981 (green-500)
├── Text:            "✓ Verified"
├── Font size:       11px
├── Padding:         2px 6px

DESCRIPTION:
├── Font size:       14px
├── Color:           #4B5563 (grey-600)
├── Line clamp:      3 lines

CATEGORIES/BRANDS:
├── Layout:          Inline, comma-separated OR pills
├── Font size:       13px
├── Max show:        6 (then "+X more")

SERVICE BADGES:
├── Background:      #F3F4F6 (grey-100)
├── Border:          1px solid #E5E7EB
├── Padding:         6px 10px
├── Border radius:   6px
├── Font size:       12px
├── Gap:             8px

CALL BUTTON:
├── Background:      #DC2626 (red)
├── Color:           White
├── Padding:         10px 20px
├── Border radius:   8px

VIEW PROFILE BUTTON:
├── Background:      White
├── Border:          1px solid #e85d4c
├── Color:           #e85d4c (secondary)
├── Padding:         10px 20px

MOBILE:
├── Logo:            60px × 60px
├── Stack:           Vertical layout
├── Full-width:      Buttons span 100%
├── Categories:      2-line max, then expand

═══════════════════════════════════════════════════════════════
```

---

## Section 5.1: Zero State — No Local Retailers (v1.2)

```
ZERO STATE STRATEGY — "PIVOT, DON'T ABANDON"
═══════════════════════════════════════════════════════════════

PROBLEM:
─────────────────────────────────────────────────────────────────
User searches "Graded Fridges in [Small Village]" and lands on
a City Page with 0 local stores. Showing "No Results" = 
bounced user = lost conversion opportunity.

SOLUTION (v1.2):
─────────────────────────────────────────────────────────────────
The "Pivot Strategy" — When stores.length === 0:

1. Fetch nearby stores within radius (20 miles default)
2. Fetch local repair engineers (already on page)
3. Render a distinct "ZeroState" UI that:
   ├── Acknowledges no local stores
   ├── Shows nearby stores WITH distance
   ├── Offers repair as alternative
   └── Captures email for future notifications

WHY THIS MATTERS:
─────────────────────────────────────────────────────────────────
├── Traffic retention: Keep users in funnel
├── Conversion: Nearby stores still lead to sales
├── Cross-sell: Repair engineers monetizable
├── SEO: Page still has value (not thin content)
├── Future-proof: Notify user when store opens nearby

═══════════════════════════════════════════════════════════════
```

### Zero State Decision Matrix

```
ZERO STATE DECISION MATRIX (v1.2)
═══════════════════════════════════════════════════════════════

LOCAL STORES │ NEARBY STORES │ PROVIDERS │ ACTION
─────────────┼───────────────┼───────────┼─────────────────────
     0       │      0        │     0     │ Soft 404 (noindex, minimal page)
     0       │      0        │    1+     │ Show repair section prominently
     0       │     1+        │     0     │ Show nearby stores only
     0       │     1+        │    1+     │ FULL ZERO STATE (recommended)
    1+       │      -        │     -     │ Normal page (Section 5)
─────────────────────────────────────────────────────────────────

FULL ZERO STATE INCLUDES:
├── "No graded retailers found in {city}" header
├── Section A: Nearby Stores (with distance, grouped by city)
├── Section B: Local Repair Engineers (pivot to repair)
├── Section C: Email capture for notifications
├── Section D: Nearby cities quick links

═══════════════════════════════════════════════════════════════
```

### Zero State Visual Design (Desktop)

```
ZERO STATE — DESKTOP VISUAL (v1.2)
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🛒 GRADED APPLIANCE RETAILERS IN LUTON          <a name>  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ⚠️ NO GRADED RETAILERS IN LUTON                   │   │
│  │                                                     │   │
│  │  While there are no physical graded appliance      │   │
│  │  retailers directly in Luton, don't worry — we've  │   │
│  │  found great options nearby, and local repair      │   │
│  │  engineers if you need your appliance fixed.       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  📍 NEARBY GRADED RETAILERS                                │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  BEDFORD (8 miles away) — 2 stores                 │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │                                             │   │   │
│  │  │  [LOGO]  BEDFORD GRADED APPLIANCES ⭐ 4.7  │   │   │
│  │  │          📍 8.2 miles from Luton           │   │   │
│  │  │          Free delivery to Luton area       │   │   │
│  │  │          [Call] [View Profile →]           │   │   │
│  │  │                                             │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │                                             │   │   │
│  │  │  [LOGO]  DISCOUNT DOMESTICS       ⭐ 4.5  │   │   │
│  │  │          📍 9.1 miles from Luton           │   │   │
│  │  │          Installation available            │   │   │
│  │  │          [Call] [View Profile →]           │   │   │
│  │  │                                             │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  MILTON KEYNES (22 miles away) — 3 stores          │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  [Collapsed store cards - expandable]       │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  🔧 ALTERNATIVELY: REPAIR YOUR APPLIANCE                   │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Can't travel? These local engineers serve Luton:          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ⭐ 4.9  LUTON APPLIANCE REPAIRS      Same-Day    │   │
│  │          All brands • From £45 callout • Gas Safe │   │
│  │          [📞 Call Now]   [View Profile →]         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [SEE ALL 12 REPAIR ENGINEERS IN LUTON →]                  │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  📧 GET NOTIFIED WHEN STORES OPEN IN LUTON                 │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Be the first to know when a graded appliance      │   │
│  │  retailer opens in Luton.                          │   │
│  │                                                     │   │
│  │  ┌────────────────────────┐  ┌────────────────┐   │   │
│  │  │  Enter your email...   │  │  NOTIFY ME     │   │   │
│  │  └────────────────────────┘  └────────────────┘   │   │
│  │                                                     │   │
│  │  🔒 No spam. Unsubscribe anytime.                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### Zero State Visual Design (Mobile)

```
ZERO STATE — MOBILE VISUAL (v1.2)
═══════════════════════════════════════════════════════════════

Mobile design prioritizes:
├── Thumb-friendly tap targets (min 48px)
├── Single-column layout
├── Collapsible city groups to reduce scroll
├── Sticky "Call" CTA for repair engineers
├── Bottom sheet for email capture

┌─────────────────────────────────┐
│ ← England                       │
├─────────────────────────────────┤
│                                 │
│ GRADED APPLIANCES               │
│ IN LUTON                        │
│ ━━━━━━━━━━━━━━━━━━              │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ⚠️ No graded retailers     │ │
│ │    found in Luton          │ │
│ │                             │ │
│ │ But don't worry — we've    │ │
│ │ found options nearby! ⬇️   │ │
│ └─────────────────────────────┘ │
│                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ 📍 NEARBY STORES                │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 📍 BEDFORD                  │ │
│ │    8 miles • 2 stores    ▼ │ │
│ └─────────────────────────────┘ │
│                                 │
│   ┌───────────────────────────┐ │
│   │ ┌───┐ BEDFORD GRADED     │ │
│   │ │   │ APPLIANCES  ⭐ 4.7 │ │
│   │ └───┘                     │ │
│   │ 📍 8.2 mi from Luton     │ │
│   │ Free delivery to Luton   │ │
│   │                           │ │
│   │ ┌───────────────────────┐ │ │
│   │ │    📞 CALL NOW        │ │ │
│   │ └───────────────────────┘ │ │
│   │ ┌───────────────────────┐ │ │
│   │ │    View Profile →     │ │ │
│   │ └───────────────────────┘ │ │
│   └───────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 📍 MILTON KEYNES            │ │
│ │    22 miles • 3 stores   ▶ │ │
│ └─────────────────────────────┘ │
│                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ 🔧 OR REPAIR YOUR APPLIANCE    │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                 │
│ Local engineers serve Luton:   │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ⭐ 4.9 LUTON APPLIANCE     │ │
│ │        REPAIRS              │ │
│ │ Same-Day • From £45        │ │
│ │ All brands • Gas Safe      │ │
│ │                             │ │
│ │ ┌───────────────────────┐   │ │
│ │ │   📞 CALL NOW         │   │ │
│ │ └───────────────────────┘   │ │
│ └─────────────────────────────┘ │
│                                 │
│ [See all 12 engineers →]       │
│                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ 📧 NOTIFY ME                    │
│                                 │
│ Get notified when stores       │
│ open in Luton.                 │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Enter your email...         │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │        NOTIFY ME            │ │
│ └─────────────────────────────┘ │
│                                 │
│ 🔒 No spam.                    │
│                                 │
└─────────────────────────────────┘

MOBILE-SPECIFIC UX (v1.2):
─────────────────────────────────────────────────────────────────
├── City groups are collapsible accordions
├── Default: First city (nearest) expanded
├── Tap city header to expand/collapse
├── "Call Now" buttons are full-width (easy thumb tap)
├── Distance shown prominently on each store card
├── Repair section has sticky CTA on scroll (optional)
├── Email capture uses native keyboard with email type

═══════════════════════════════════════════════════════════════
```

### Nearby Stores Data Structure

```
NEARBY STORES — DATA STRUCTURE (v1.2)
═══════════════════════════════════════════════════════════════

GROUPING STRATEGY:
─────────────────────────────────────────────────────────────────
Nearby stores are GROUPED BY CITY for better UX:

{
  "nearbyStoreGroups": [
    {
      "city": {
        "id": "uuid",
        "name": "Bedford",
        "slug": "bedford",
        "country_slug": "england",
        "distance_miles": 8.2
      },
      "stores": [
        {
          "id": "uuid",
          "business_name": "Bedford Graded Appliances",
          "distance_miles": 8.2,
          "offers_delivery_to_origin": true,
          // ... other store fields
        },
        {
          "id": "uuid",
          "business_name": "Discount Domestics Bedford",
          "distance_miles": 9.1,
          // ...
        }
      ]
    },
    {
      "city": {
        "name": "Milton Keynes",
        "distance_miles": 22.4
      },
      "stores": [...]
    }
  ]
}

WHY GROUP BY CITY:
─────────────────────────────────────────────────────────────────
├── Reduces cognitive load (user sees "Bedford: 2 stores")
├── Enables collapsible UI on mobile
├── Natural mental model ("I'll drive to Bedford")
├── Allows per-city delivery info
├── Better for SEO (links to city pages)

SORT ORDER:
─────────────────────────────────────────────────────────────────
1. Groups sorted by: nearest city first (min store distance)
2. Stores within group: by rating DESC, then distance ASC

═══════════════════════════════════════════════════════════════
```

### Database Function: get_stores_within_radius

```sql
DATABASE FUNCTION — GET STORES WITHIN RADIUS (v1.2)
═══════════════════════════════════════════════════════════════

-- Function to get stores within a radius of a point
-- Uses Haversine formula for accurate distance calculation

CREATE OR REPLACE FUNCTION get_stores_within_radius(
  origin_lat NUMERIC,
  origin_lng NUMERIC,
  radius_miles INTEGER DEFAULT 20,
  exclude_place_id UUID DEFAULT NULL,
  max_results INTEGER DEFAULT 20
)
RETURNS TABLE (
  store_id UUID,
  business_name VARCHAR(255),
  slug VARCHAR(255),
  short_description TEXT,
  address_line1 VARCHAR(255),
  postcode VARCHAR(20),
  phone VARCHAR(50),
  website VARCHAR(500),
  logo_url VARCHAR(500),
  average_rating NUMERIC(3,2),
  review_count INTEGER,
  is_featured BOOLEAN,
  offers_delivery BOOLEAN,
  offers_free_delivery BOOLEAN,
  warranty_months INTEGER,
  offers_finance BOOLEAN,
  -- Location info
  place_id UUID,
  place_name VARCHAR(200),
  place_slug VARCHAR(200),
  country_slug VARCHAR(100),
  store_lat NUMERIC,
  store_lng NUMERIC,
  -- Computed
  distance_miles NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id AS store_id,
    s.business_name,
    s.slug,
    s.short_description,
    s.address_line1,
    s.postcode,
    s.phone,
    s.website,
    s.logo_url,
    s.average_rating,
    s.review_count,
    s.is_featured,
    s.offers_delivery,
    s.offers_free_delivery,
    s.warranty_months,
    s.offers_finance,
    p.id AS place_id,
    p.name AS place_name,
    p.slug AS place_slug,
    c.slug AS country_slug,
    s.latitude AS store_lat,
    s.longitude AS store_lng,
    -- Haversine formula for distance in miles
    (
      3959 * acos(
        cos(radians(origin_lat)) 
        * cos(radians(s.latitude)) 
        * cos(radians(s.longitude) - radians(origin_lng)) 
        + sin(radians(origin_lat)) 
        * sin(radians(s.latitude))
      )
    )::NUMERIC AS distance_miles
  FROM stores s
  JOIN places p ON s.place_id = p.id
  JOIN countries c ON p.country_id = c.id
  WHERE s.is_active = true
    AND s.latitude IS NOT NULL
    AND s.longitude IS NOT NULL
    AND (exclude_place_id IS NULL OR s.place_id != exclude_place_id)
    -- Filter by radius using Haversine
    AND (
      3959 * acos(
        cos(radians(origin_lat)) 
        * cos(radians(s.latitude)) 
        * cos(radians(s.longitude) - radians(origin_lng)) 
        + sin(radians(origin_lat)) 
        * sin(radians(s.latitude))
      )
    ) <= radius_miles
  ORDER BY distance_miles ASC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql STABLE;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_stores_within_radius TO anon, authenticated;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_stores_lat_lng 
  ON stores(latitude, longitude) 
  WHERE is_active = true AND latitude IS NOT NULL;

═══════════════════════════════════════════════════════════════
```

### TypeScript Implementation: getNearbyStores

```typescript
TYPESCRIPT — getNearbyStores.ts (v1.2)
═══════════════════════════════════════════════════════════════

// lib/stores/getNearbyStores.ts

import { createClient } from '@/lib/supabase/server';
import type { NearbyStoreGroup, NearbyStore } from '@/types/city';

/**
 * Haversine formula for calculating distance between two points
 * Returns distance in miles
 */
export function calculateDistanceMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return Math.round(R * c * 10) / 10; // Round to 1 decimal
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Configuration for nearby stores search
 */
export interface NearbyStoresConfig {
  /** Search radius in miles (default: 20) */
  radiusMiles?: number;
  /** Maximum stores to return (default: 20) */
  maxResults?: number;
  /** Place ID to exclude (current city) */
  excludePlaceId?: string;
}

/**
 * Fetch stores within radius of a location
 * Returns stores grouped by city, sorted by distance
 */
export async function getNearbyStores(
  originLat: number,
  originLng: number,
  config: NearbyStoresConfig = {}
): Promise<NearbyStoreGroup[]> {
  const {
    radiusMiles = 20,
    maxResults = 20,
    excludePlaceId
  } = config;
  
  const supabase = createClient();
  
  // Call database function
  const { data: stores, error } = await supabase
    .rpc('get_stores_within_radius', {
      origin_lat: originLat,
      origin_lng: originLng,
      radius_miles: radiusMiles,
      exclude_place_id: excludePlaceId,
      max_results: maxResults
    });
  
  if (error || !stores || stores.length === 0) {
    return [];
  }
  
  // Group stores by city
  const groupedByCity = stores.reduce((acc, store) => {
    const cityKey = store.place_id;
    
    if (!acc[cityKey]) {
      acc[cityKey] = {
        city: {
          id: store.place_id,
          name: store.place_name,
          slug: store.place_slug,
          country_slug: store.country_slug,
          distance_miles: store.distance_miles
        },
        stores: []
      };
    }
    
    acc[cityKey].stores.push({
      id: store.store_id,
      business_name: store.business_name,
      slug: store.slug,
      short_description: store.short_description,
      address_line1: store.address_line1,
      postcode: store.postcode,
      phone: store.phone,
      website: store.website,
      logo_url: store.logo_url,
      average_rating: store.average_rating,
      review_count: store.review_count,
      is_featured: store.is_featured,
      offers_delivery: store.offers_delivery,
      offers_free_delivery: store.offers_free_delivery,
      warranty_months: store.warranty_months,
      offers_finance: store.offers_finance,
      distance_miles: store.distance_miles,
      place_name: store.place_name,
      place_slug: store.place_slug,
      country_slug: store.country_slug
    });
    
    return acc;
  }, {} as Record<string, NearbyStoreGroup>);
  
  // Convert to array and sort by nearest city
  const groups = Object.values(groupedByCity)
    .map(group => ({
      ...group,
      // Update city distance to minimum store distance
      city: {
        ...group.city,
        distance_miles: Math.min(...group.stores.map(s => s.distance_miles))
      },
      // Sort stores within group: rating desc, then distance asc
      stores: group.stores.sort((a, b) => {
        if (b.average_rating !== a.average_rating) {
          return (b.average_rating || 0) - (a.average_rating || 0);
        }
        return a.distance_miles - b.distance_miles;
      })
    }))
    .sort((a, b) => a.city.distance_miles - b.city.distance_miles);
  
  return groups;
}

/**
 * Check if a store potentially delivers to origin location
 * This is a heuristic - actual delivery areas vary by store
 */
export function storeDeliversToOrigin(
  store: NearbyStore,
  originName: string
): boolean {
  // If store offers free delivery and is within 15 miles, likely delivers
  if (store.offers_free_delivery && store.distance_miles <= 15) {
    return true;
  }
  
  // If store offers delivery and is within 10 miles
  if (store.offers_delivery && store.distance_miles <= 10) {
    return true;
  }
  
  return false;
}

═══════════════════════════════════════════════════════════════
```

### React Component: ZeroStateCitySection

```tsx
REACT COMPONENT — ZeroStateCitySection.tsx (v1.2)
═══════════════════════════════════════════════════════════════

// components/city/ZeroStateCitySection.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, MapPin, Phone, Wrench, Bell } from 'lucide-react';
import StoreCard from '@/components/store/StoreCard';
import ProviderMiniCard from '@/components/provider/ProviderMiniCard';
import EmailCaptureForm from '@/components/forms/EmailCaptureForm';
import { cn } from '@/lib/utils/cn';
import type { NearbyStoreGroup, ProviderListItem, Place } from '@/types/city';

interface ZeroStateCitySectionProps {
  /** Current city (with no stores) */
  place: Place;
  /** Nearby stores grouped by city */
  nearbyStoreGroups: NearbyStoreGroup[];
  /** Local repair providers */
  providers: ProviderListItem[];
  /** Country slug for URL building */
  countrySlug: string;
}

export default function ZeroStateCitySection({
  place,
  nearbyStoreGroups,
  providers,
  countrySlug
}: ZeroStateCitySectionProps) {
  // Track which city groups are expanded (first is expanded by default)
  const [expandedCities, setExpandedCities] = useState<Set<string>>(
    new Set(nearbyStoreGroups.length > 0 ? [nearbyStoreGroups[0].city.id] : [])
  );
  
  const toggleCity = (cityId: string) => {
    setExpandedCities(prev => {
      const next = new Set(prev);
      if (next.has(cityId)) {
        next.delete(cityId);
      } else {
        next.add(cityId);
      }
      return next;
    });
  };
  
  const hasNearbyStores = nearbyStoreGroups.length > 0;
  const hasProviders = providers.length > 0;
  const totalNearbyStores = nearbyStoreGroups.reduce(
    (sum, g) => sum + g.stores.length, 0
  );
  
  return (
    <section id="retailers" className="mb-12">
      {/* Section Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#e85d4c] mb-4">
        🛒 Graded Appliance Retailers in {place.name}
      </h2>
      
      {/* Zero State Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-6 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-semibold text-amber-900 text-lg mb-1">
              No graded retailers found in {place.name}
            </h3>
            <p className="text-amber-800">
              {hasNearbyStores && hasProviders && (
                <>
                  But don't worry — we've found {totalNearbyStores} stores nearby, 
                  plus {providers.length} local repair engineers if you need 
                  your appliance fixed instead.
                </>
              )}
              {hasNearbyStores && !hasProviders && (
                <>
                  But we've found {totalNearbyStores} stores within{' '}
                  {Math.ceil(nearbyStoreGroups[nearbyStoreGroups.length - 1]?.city.distance_miles || 20)} miles.
                </>
              )}
              {!hasNearbyStores && hasProviders && (
                <>
                  However, you can get your appliance repaired by one of our{' '}
                  {providers.length} local engineers.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      
      {/* Section A: Nearby Stores */}
      {hasNearbyStores && (
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-4">
            <MapPin className="w-5 h-5 text-blue-600" />
            Nearby Graded Retailers
          </h3>
          
          <div className="space-y-4">
            {nearbyStoreGroups.map((group) => {
              const isExpanded = expandedCities.has(group.city.id);
              
              return (
                <div 
                  key={group.city.id}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  {/* City Header (Clickable) */}
                  <button
                    type="button"
                    onClick={() => toggleCity(group.city.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4",
                      "bg-gray-50 hover:bg-gray-100 transition-colors",
                      "text-left"
                    )}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">
                          {group.city.name}
                        </span>
                        <span className="text-gray-600 ml-2">
                          {group.city.distance_miles} miles away
                        </span>
                        <span className="text-gray-500 ml-2">
                          • {group.stores.length} {group.stores.length === 1 ? 'store' : 'stores'}
                        </span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {/* Store Cards (Collapsible) */}
                  {isExpanded && (
                    <div className="p-4 bg-white space-y-4">
                      {group.stores.map((store) => (
                        <StoreCard
                          key={store.id}
                          store={store}
                          variant="compact"
                          showDistance={true}
                          originCity={place.name}
                          pageContext={{
                            pagePath: `/${countrySlug}/${place.slug}/`,
                            pageType: 'city_hub',
                            placeId: place.id,
                            citySlug: place.slug,
                            countrySlug
                          }}
                        />
                      ))}
                      
                      {/* Link to city page */}
                      <Link
                        href={`/${group.city.country_slug}/${group.city.slug}/`}
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View all stores in {group.city.name} →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Section B: Local Repair Engineers */}
      {hasProviders && (
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-2">
            <Wrench className="w-5 h-5 text-green-600" />
            {hasNearbyStores ? 'Alternatively: Repair Your Appliance' : 'Repair Your Appliance'}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {hasNearbyStores 
              ? `Can't travel? These local engineers serve ${place.name}:`
              : `Get your appliance fixed by these trusted local engineers in ${place.name}:`
            }
          </p>
          
          <div className="space-y-3">
            {providers.slice(0, 3).map((provider) => (
              <ProviderMiniCard
                key={provider.id}
                provider={provider}
                showCallButton={true}
                pageContext={{
                  pagePath: `/${countrySlug}/${place.slug}/`,
                  pageType: 'city_hub',
                  placeId: place.id,
                  citySlug: place.slug,
                  countrySlug
                }}
              />
            ))}
          </div>
          
          {providers.length > 3 && (
            <Link
              href={`/${countrySlug}/${place.slug}/#repairs`}
              className="inline-flex items-center gap-1 mt-4 text-green-600 hover:text-green-800 font-medium"
            >
              See all {providers.length} repair engineers in {place.name} →
            </Link>
          )}
        </div>
      )}
      
      {/* Section C: Email Notification */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6">
        <div className="flex items-start gap-3 mb-4">
          <Bell className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 text-lg">
              Get Notified When Stores Open in {place.name}
            </h3>
            <p className="text-blue-800 text-sm mt-1">
              Be the first to know when a graded appliance retailer opens near you.
            </p>
          </div>
        </div>
        
        <EmailCaptureForm
          source={`zero_state_${place.slug}`}
          placeId={place.id}
          variant="inline"
          placeholder="Enter your email..."
          buttonText="Notify Me"
          successMessage="We'll notify you when stores open nearby!"
        />
      </div>
    </section>
  );
}

═══════════════════════════════════════════════════════════════
```

### Store Card with Distance (Modification)

```tsx
STORE CARD — DISTANCE DISPLAY MODIFICATION (v1.2)
═══════════════════════════════════════════════════════════════

Add these props to existing StoreCard component:

interface StoreCardProps {
  // ... existing props ...
  
  /** (v1.2) Show distance from origin */
  showDistance?: boolean;
  
  /** (v1.2) Origin city name for distance context */
  originCity?: string;
}

// In StoreCard render, add distance display:

{showDistance && store.distance_miles && (
  <div className="flex items-center gap-1 text-sm text-blue-600 mb-2">
    <MapPin className="w-4 h-4" />
    <span>
      {store.distance_miles} miles from {originCity || 'you'}
    </span>
    {storeDeliversToOrigin(store, originCity) && (
      <span className="ml-2 text-green-600 text-xs font-medium">
        ✓ Likely delivers to {originCity}
      </span>
    )}
  </div>
)}

═══════════════════════════════════════════════════════════════
```

### Conditional Rendering Logic

```typescript
CONDITIONAL RENDERING — PAGE COMPONENT (v1.2)
═══════════════════════════════════════════════════════════════

// In app/[country]/[city]/page.tsx

export default async function CityPage({ params }: Props) {
  const data = await getCityData(params.country, params.city);
  
  if (!data) {
    notFound();
  }
  
  const { place, stores, providers, narrative, nearbyCities, nearbyStoreGroups } = data;
  
  // Determine page state
  const hasLocalStores = stores.length > 0;
  const hasNearbyStores = nearbyStoreGroups.length > 0;
  const hasProviders = providers.length > 0;
  
  return (
    <main>
      {/* Breadcrumbs - always show */}
      <Breadcrumbs ... />
      
      {/* Hero Section - always show */}
      <CityHero place={place} narrative={narrative} />
      
      {/* Quick Links - always show */}
      <QuickLinks ... />
      
      {/* CONDITIONAL: Store Section */}
      {hasLocalStores ? (
        // NORMAL STATE: Show local stores
        <GradedRetailersSection
          stores={stores}
          place={place}
          countrySlug={params.country}
        />
      ) : (
        // ZERO STATE: Show nearby stores + repair pivot
        <ZeroStateCitySection
          place={place}
          nearbyStoreGroups={nearbyStoreGroups}
          providers={providers}
          countrySlug={params.country}
        />
      )}
      
      {/* Repair Services Section */}
      {/* Only show separately if we showed local stores above */}
      {hasLocalStores && hasProviders && (
        <RepairServicesSection ... />
      )}
      
      {/* Rest of page sections... */}
      <CategoriesSection ... />
      <BrandsSection ... />
      <FAQSection ... />
      <NearbyCitiesSection ... />
    </main>
  );
}

═══════════════════════════════════════════════════════════════
```

---

## Section 6: Appliance Repair Services

```
APPLIANCE REPAIR SERVICES — PREVIEW SECTION
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 APPLIANCE REPAIR SERVICES IN BIRMINGHAM     <a name>   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                │
│                                                             │
│  Need your appliance fixed instead? Birmingham has 28      │
│  trusted repair engineers covering washing machines,       │
│  fridges, ovens and more.                                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ⭐ 4.9  MIDLANDS APPLIANCE REPAIRS    All Brands  │   │
│  │         Same-day callouts • 20 years experience    │   │
│  │         From £45 callout fee        [View Profile] │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  ⭐ 4.8  BOSCH AUTHORISED SERVICE    Bosch/Siemens │   │
│  │         Official manufacturer repairs • Parts      │   │
│  │         Fixed price repairs         [View Profile] │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  ⭐ 4.7  QUICK FIX BIRMINGHAM        All Brands    │   │
│  │         Evening & weekend slots • No fix no fee    │   │
│  │         From £55 callout fee        [View Profile] │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌────────────────────────────────────────┐                │
│  │    SEE ALL 28 REPAIR ENGINEERS →       │                │
│  └────────────────────────────────────────┘                │
│                                                             │
│  💡 Not sure if repair is worth it? Our Repair or Replace │
│     Calculator is coming soon — [get notified →]          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

ANCHOR:
├── id="repairs" for jump link

DISPLAY:
├── Show top 3 providers by rating
├── Compact card format (not full cards)
├── "See All" links to repair category page OR expands

PROVIDER MINI CARD DATA:
├── name                     Provider name
├── average_rating           Star rating
├── brands (summary)         "All Brands" OR specific brands
├── short_description        One-liner
├── callout_fee_from         "From £45"
├── offers_same_day          Badge if true
├── no_fix_no_fee            Badge if true

LINK:
├── View Profile:    /provider/{slug}/
├── See All:         /england/birmingham/washing-machine-repair/ (or anchor expand)

═══════════════════════════════════════════════════════════════
```

---

## Section 7: Popular Categories

```
POPULAR CATEGORIES — CATEGORY GRID
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📊 POPULAR APPLIANCE CATEGORIES IN BIRMINGHAM             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━              │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │     🧺      │ │     🧊      │ │     🍽️      │           │
│  │             │ │             │ │             │           │
│  │  Washing    │ │   Fridge    │ │ Dishwashers │           │
│  │  Machines   │ │  Freezers   │ │             │           │
│  │             │ │             │ │             │           │
│  │  from £149  │ │  from £179  │ │  from £169  │           │
│  │  (8 stores) │ │  (10 stores)│ │  (7 stores) │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │     💨      │ │     🇺🇸      │ │     🔥      │           │
│  │             │ │             │ │             │           │
│  │   Tumble    │ │  American   │ │   Ovens &   │           │
│  │   Dryers    │ │  Fridges    │ │   Cookers   │           │
│  │             │ │             │ │             │           │
│  │  from £129  │ │  from £499  │ │  from £199  │           │
│  │  (9 stores) │ │  (6 stores) │ │  (8 stores) │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
├── Categories: appliance_categories WHERE tier IN ('tier_1', 'tier_2')
├── Store count: COUNT stores with this category in this city
├── Price "from": MIN typical_discount_min OR hardcoded estimate

LINK:
├── Each card → /england/birmingham/{category-slug}/

DISPLAY LOGIC:
├── Only show categories with ≥1 store in city
├── Order by: tier (tier_1 first), then display_order
├── Max: 8 categories (2 rows of 4)

STYLING:
├── Grid:          4 columns desktop, 2 columns mobile
├── Card bg:       White
├── Card border:   1px #E5E7EB
├── Icon:          48px emoji (from category.icon)
├── Category name: 16px, bold, secondary
├── Price hint:    14px, grey, "from £X"
├── Store count:   12px, grey, in parentheses
├── Hover:         Shadow + scale(1.02)

═══════════════════════════════════════════════════════════════
```

---

## Section 8: Top Brands Available

```
TOP BRANDS — BRAND GRID
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🏷️ TOP BRANDS AVAILABLE IN BIRMINGHAM                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                     │
│                                                             │
│  PREMIUM BRANDS                                            │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ Miele  │ │ Bosch  │ │Siemens │ │  Neff  │ │  AEG   │   │
│  │4 stores│ │8 stores│ │6 stores│ │5 stores│ │5 stores│   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
│                                                             │
│  MID-RANGE BRANDS                                          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │Samsung │ │   LG   │ │Hotpoint│ │Whirlpool│ │Hisense │   │
│  │10 stores│ │9 stores│ │11 stores│ │7 stores│ │8 stores│  │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
│                                                             │
│  BUDGET BRANDS                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │  Beko  │ │Indesit │ │ Candy  │ │ Hoover │              │
│  │12 stores│ │10 stores│ │8 stores│ │6 stores│             │
│  └────────┘ └────────┘ └────────┘ └────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
├── Brands: brands WHERE is_active = true
├── Grouped by: tier (premium, mid_range, value)
├── Store count: COUNT stores stocking this brand in this city

LINK:
├── Each brand → /england/birmingham/{brand-slug}/

DISPLAY LOGIC:
├── Only show brands with ≥1 store in city
├── Show by tier, then by store count descending
├── Max: 6 per tier

STYLING:
├── Brand pills:   Background #F3F4F6
├── Border:        1px #E5E7EB
├── Padding:       8px 16px
├── Brand name:    14px, bold
├── Store count:   12px, grey
├── Hover:         Background #E5E7EB

═══════════════════════════════════════════════════════════════
```

---

## Section 9: What Are Graded Appliances?

```
EDUCATIONAL CONTENT — GRADED EXPLANATION
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  💡 WHAT ARE GRADED APPLIANCES?                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                            │
│                                                             │
│  Graded appliances are brand new or nearly-new items sold  │
│  at a discount due to minor cosmetic imperfections,        │
│  damaged packaging, or being ex-display models. They       │
│  typically save you 30-70% compared to buying new, while   │
│  offering the same functionality and often full warranty.  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  CONDITION TYPES YOU'LL FIND IN BIRMINGHAM         │   │
│  │                                                     │   │
│  │  ┌─────────────┬────────────────────┬───────────┐  │   │
│  │  │ CONDITION   │ WHAT IT MEANS      │ SAVING    │  │   │
│  │  ├─────────────┼────────────────────┼───────────┤  │   │
│  │  │ Grade A     │ Perfect/near-perfect│ 20-40%   │  │   │
│  │  │ Grade B     │ Light cosmetic marks│ 40-55%   │  │   │
│  │  │ Ex-Display  │ Showroom models    │ 30-50%    │  │   │
│  │  │ Factory Sec │ Failed cosmetic QC │ 40-60%    │  │   │
│  │  │ Refurbished │ Professionally     │ 50-70%    │  │   │
│  │  │             │ restored           │           │  │   │
│  │  └─────────────┴────────────────────┴───────────┘  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  📖 Read our complete guide: What Are Graded Appliances? → │
│                                                             │
└─────────────────────────────────────────────────────────────┘

PURPOSE:
├── Educational for new visitors
├── SEO keyword targeting ("graded appliances", "ex-display", etc.)
├── AEO: Answers "what are graded appliances?"
├── Trust building

DATA SOURCE:
├── Static content (hardcoded OR from content_blocks)
├── Grade table: From grade_levels table or hardcoded

LINK:
├── Guide link → /guides/what-are-graded-appliances/

═══════════════════════════════════════════════════════════════
```

---

## Section 10: Frequently Asked Questions

```
FAQ SECTION — SCHEMA.ORG FAQS
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ❓ FREQUENTLY ASKED QUESTIONS                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                             │
│                                                             │
│  BUYING GRADED APPLIANCES IN BIRMINGHAM                    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▼ Where can I buy graded appliances in Birmingham? │   │
│  │                                                     │   │
│  │    Birmingham has 12 specialist graded appliance    │   │
│  │    retailers, more than any other UK city. Top      │   │
│  │    stores include Borshch Electric, Kingdom         │   │
│  │    Appliances, and several smaller independent      │   │
│  │    dealers. Most are located in the Aston, Tyseley, │   │
│  │    and Erdington areas with free parking.           │   │
│  │                                                     │   │
│  │    [See all 12 Birmingham retailers →]              │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ Do graded appliances come with warranty?         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ Are graded appliances safe to buy?               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [... more FAQs ...]                                       │
│                                                             │
│  APPLIANCE REPAIR IN BIRMINGHAM                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ How much does washing machine repair cost?       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ Can I get same-day appliance repair?             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
├── faqs table WHERE is_location_template = true
├── Replace {city} placeholder with actual city name
├── Group by: category (buying, repair, general)

FAQ STRUCTURE:
├── Question: faqs.question (with {city} replaced)
├── Answer: faqs.answer (with {city} replaced)
├── Category: faqs.category
├── Order: faqs.display_order

SCHEMA.ORG:
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where can I buy graded appliances in Birmingham?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Birmingham has 12 specialist graded appliance retailers..."
      }
    },
    // ... more questions
  ]
}

ACCORDION BEHAVIOR:
├── Default: First FAQ expanded, others collapsed
├── Click: Toggle expand/collapse
├── Animation: Smooth height transition (200ms)
├── Icon: ▼ (down) collapsed, ▲ (up) expanded

═══════════════════════════════════════════════════════════════
```

---

## Section 11: Helpful Guides

```
HELPFUL GUIDES — INTERNAL LINKING
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📖 HELPFUL GUIDES                                         │
│  ━━━━━━━━━━━━━━━━━                                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  📖  What Are Graded Appliances? Complete UK Guide  │   │
│  │      Everything you need to know about buying...    │   │
│  │      [Read Guide →]                                 │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  📖  Graded vs Refurbished: What's the Difference?  │   │
│  │      Understanding UK appliance condition terms...  │   │
│  │      [Read Guide →]                                 │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  📖  Washing Machine Repair Costs UK (2025)         │   │
│  │      How much should you expect to pay...           │   │
│  │      [Read Guide →]                                 │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

PURPOSE:
├── Internal linking to guide pages (SEO value)
├── Educational resource for users
├── Keeps users on site longer

LINKS:
├── /guides/what-are-graded-appliances/
├── /guides/graded-vs-refurbished/
├── /guides/washing-machine-repair-costs/
├── /guides/buying-for-landlords/

═══════════════════════════════════════════════════════════════
```

---

## Section 12: Nearby Cities

```
NEARBY CITIES — INTERNAL LINKING
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🗺️ NEARBY CITIES                                          │
│  ━━━━━━━━━━━━━━━━                                          │
│                                                             │
│  Looking for graded appliances near Birmingham? Check      │
│  these nearby cities with specialist retailers:            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  📍 Wolverhampton      📍 Coventry      📍 Leicester│   │
│  │     14 mi • 4 stores     20 mi • 3 st    42 mi • 6 │   │
│  │     [View →]             [View →]        [View →]  │   │
│  │                                                     │   │
│  │  📍 Nottingham         📍 Derby         📍 Worcester│   │
│  │     52 mi • 2 stores     41 mi • 2 st    28 mi • 1 │   │
│  │     [View →]             [View →]        [View →]  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [🗺️ View all UK cities with graded appliance retailers →] │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
├── Primary: places.nearby_places[] (predefined list)
├── Fallback: Same admin_area + nearby admin_areas
├── Filter: Only show cities with store_count > 0

QUERY LOGIC:
1. Get places WHERE slug IN (current_place.nearby_places)
2. OR get places WHERE admin_area_id = current_admin_area
3. Exclude current city
4. Order by store_count DESC
5. Limit 9

DISTANCE CALCULATION:
├── Use Haversine formula if lat/lng available
├── OR use static data in nearby_places
├── Display: "{X} miles • {Y} stores"

LINKS:
├── Each city → /{country}/{city}/
├── View all → /locations/ OR /{country}/

═══════════════════════════════════════════════════════════════
```

---

## Section 13: Quick Facts Summary

```
QUICK FACTS — AEO SUMMARY BOX (Enhanced v1.1)
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📊 BIRMINGHAM GRADED APPLIANCES: QUICK FACTS              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  🛒 12 Specialist Retailers  📍 UK's Largest Hub   │   │
│  │  🔧 28 Repair Engineers      💰 Save 30-70% vs New │   │
│  │  🏷️ 50+ Brands Available     📋 Most Offer 12m Warranty│
│  │  🚚 Same-Day Delivery Avail  💳 Finance at 8 Stores│   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Last updated: January 2026                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

PURPOSE:
├── AEO optimization (AI can extract these facts)
├── Summary for scanners
├── Social proof / trust

DATA SOURCE (v1.1 Enhancement):
─────────────────────────────────────────────────────────────────
PRIMARY: Use narrative.keyFacts when available
├── narrative.keyFacts provides pre-computed, unique facts
├── Already optimized for AEO extraction
├── Consistent with intro paragraph narrative

FALLBACK: Compute from database if narrative unavailable
├── store_count:           Dynamic from places table
├── provider_count:        Dynamic from places table
├── brands:                COUNT DISTINCT from store_brands
├── stores_with_warranty:  COUNT WHERE warranty_months >= 12
├── stores_with_finance:   COUNT WHERE offers_finance = true
├── stores_with_delivery:  COUNT WHERE offers_same_day_delivery = true

COMPONENT USAGE (v1.1):
─────────────────────────────────────────────────────────────────

<QuickFacts
  cityName={place.name}
  storeCount={place.store_count}
  providerCount={place.provider_count}
  keyFacts={narrative?.keyFacts || []}  // ← v1.1: Pass keyFacts
/>

═══════════════════════════════════════════════════════════════
```

---

## Section 14: Email Signup (Bottom CTA)

```
EMAIL SIGNUP — BOTTOM CTA
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📧 STAY UPDATED                                           │
│  ━━━━━━━━━━━━━━━                                           │
│                                                             │
│  Get notified about new retailers, deals, and our upcoming │
│  Repair or Replace Calculator.                             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ┌────────────────────────────┐  ┌──────────────┐  │   │
│  │  │  Enter your email...       │  │  SUBSCRIBE   │  │   │
│  │  └────────────────────────────┘  └──────────────┘  │   │
│  │                                                     │   │
│  │  🔒 No spam. Unsubscribe anytime.                  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

SAME AS SECTION 3:
├── Stores in deal_alerts table
├── Tags with current city's place_id
├── GDPR compliant

═══════════════════════════════════════════════════════════════
```

---

## SEO Implementation

### Meta Tags

```
META TAGS — CITY PAGE (Enhanced v1.1)
═══════════════════════════════════════════════════════════════

TITLE:
Graded Appliances in {City} | {store_count} Stores | UK Graded Appliances

EXAMPLE:
Graded Appliances in Birmingham | 12 Stores | UK Graded Appliances

META DESCRIPTION (v1.1 Enhancement):
─────────────────────────────────────────────────────────────────
PRIMARY: Use narrative.metaSummary for unique, data-driven description
FALLBACK: Use template if narrative unavailable

Template:
Find {store_count} graded appliance stores and {provider_count} repair 
engineers in {City}. Compare prices, warranties, and services. Save 30-70% 
on washing machines, fridge freezers & more.

Example with narrative.metaSummary:
"Birmingham has 12 specialist graded appliance retailers. Discount 
Domestics leads with 4.8 stars. Prices from £189, 15% below national 
average."

IMPLEMENTATION:
─────────────────────────────────────────────────────────────────

const description = narrative?.metaSummary 
  || place.seo_meta_description
  || `Find ${place.store_count} graded appliance stores and 
      ${place.provider_count} repair engineers in ${place.name}...`;

CANONICAL:
https://ukgradedappliances.com/{country}/{city}/

OPEN GRAPH:
├── og:title:       Graded Appliances in {City}
├── og:description: {meta description - use narrative.metaSummary}
├── og:image:       City hero image OR default
├── og:url:         {canonical}
└── og:type:        website

TWITTER:
├── twitter:card:   summary_large_image
├── twitter:title:  {og:title}
└── twitter:description: {og:description}

ROBOTS:
├── If is_indexable = true:  index, follow
├── If is_indexable = false: noindex, follow

═══════════════════════════════════════════════════════════════
```

### Schema.org (JSON-LD)

```json
SCHEMA.ORG — CITY PAGE
═══════════════════════════════════════════════════════════════

{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ukgradedappliances.com/england/birmingham/#webpage",
      "url": "https://ukgradedappliances.com/england/birmingham/",
      "name": "Graded Appliances in Birmingham",
      "description": "Find 12 graded appliance stores...",
      "isPartOf": {
        "@id": "https://ukgradedappliances.com/#website"
      },
      "about": {
        "@type": "City",
        "name": "Birmingham",
        "containedInPlace": {
          "@type": "Country",
          "name": "England"
        }
      }
    },
    {
      "@type": "ItemList",
      "name": "Graded Appliance Stores in Birmingham",
      "description": "12 specialist retailers selling graded appliances",
      "numberOfItems": 12,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "LocalBusiness",
            "name": "Borshch Electric",
            "url": "https://ukgradedappliances.com/store/borshch-electric/",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": 4.8,
              "reviewCount": 342
            }
          }
        }
        // ... more stores
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
        { "@type": "ListItem", "position": 2, "name": "England", "item": "/england/" },
        { "@type": "ListItem", "position": 3, "name": "Birmingham" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where can I buy graded appliances in Birmingham?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Birmingham has 12 specialist graded appliance retailers..."
          }
        }
        // ... more FAQs
      ]
    }
  ]
}

═══════════════════════════════════════════════════════════════
```

---

## Anti-Thin Page Gating

```
ANTI-THIN PAGE GATING — CITY PAGE
═══════════════════════════════════════════════════════════════

INDEXABILITY RULE:
├── City page is indexable if:
│   store_count >= 1 OR provider_count >= 1
│
├── If NEITHER: Set is_indexable = false
│   → Add <meta name="robots" content="noindex, follow">
│   → Still render page for users who navigate directly
│   → But don't include in sitemap

COMPUTED FIELD:
├── places.is_indexable is computed by database trigger
├── OR computed at build time

WHY:
├── Prevents Google from indexing empty/thin pages
├── Protects site quality score
├── User can still see page if they navigate there
├── Page becomes indexable when first store/provider added

═══════════════════════════════════════════════════════════════
```

---

## Internal Linking Strategy

```
INTERNAL LINKING — CITY PAGE
═══════════════════════════════════════════════════════════════

FROM CITY PAGE, LINK TO:
─────────────────────────────────────────────────────────────
1. PARENT PAGES
   ├── Home (/)
   └── Country (/england/)

2. CHILD PAGES (Category)
   ├── /england/birmingham/washing-machines/
   ├── /england/birmingham/fridge-freezers/
   └── ... (all active categories)

3. CHILD PAGES (Brand)
   ├── /england/birmingham/samsung/
   ├── /england/birmingham/bosch/
   └── ... (all brands with ≥1 store)

4. CHILD PAGES (Repair)
   ├── /england/birmingham/washing-machine-repair/
   ├── /england/birmingham/fridge-repair/
   └── ... (all repair services)

5. ENTITY PAGES
   ├── /store/borshch-electric/
   ├── /store/kingdom-appliances/
   ├── /provider/midlands-appliance-repairs/
   └── ... (all stores/providers in city)

6. SIBLING PAGES (Nearby Cities)
   ├── /england/wolverhampton/
   ├── /england/coventry/
   └── ... (nearby cities with stores)

7. GUIDE PAGES
   ├── /guides/what-are-graded-appliances/
   ├── /guides/graded-vs-refurbished/
   └── ... (related guides)

TOTAL INTERNAL LINKS: ~50-100 per city page
PURPOSE: Distribute PageRank, help crawlers, aid navigation

═══════════════════════════════════════════════════════════════
```

---

## Mobile Responsive Design

```
MOBILE RESPONSIVE — CITY PAGE
═══════════════════════════════════════════════════════════════

BREAKPOINTS:
├── Mobile:  < 640px
├── Tablet:  640px - 1024px
├── Desktop: > 1024px

MOBILE ADAPTATIONS:
─────────────────────────────────────────────────────────────

HERO:
├── H1 font size: 28px (from 36px)
├── Stats box: Stack vertically
├── Intro: Shorter (truncate or hide)

FILTERS:
├── Collapse into "Filter" button
├── Opens slide-out panel
├── Full-width dropdowns
├── "Apply Filters" button at bottom

STORE CARDS:
├── Full-width (single column)
├── Logo: 60px (from 80px)
├── Stack content vertically
├── Buttons: Full-width, stacked
├── Categories: Collapse to 2 lines + "Show more"

CATEGORY GRID:
├── 2 columns (from 4)
├── Smaller icons: 36px

BRAND PILLS:
├── Horizontal scroll
├── Or wrap with "Show all" toggle

FAQS:
├── Full accordion (all collapsed initially)
├── Larger tap targets (48px min height)

NEARBY CITIES:
├── Horizontal scroll carousel
├── Or 2-column grid

EMAIL SIGNUP:
├── Stack vertically
├── Full-width input and button

═══════════════════════════════════════════════════════════════
```

---

## Component File Structure

```
COMPONENT STRUCTURE — CITY PAGE (v1.2 Updated)
═══════════════════════════════════════════════════════════════

app/
└── [country]/
    └── [city]/
        └── page.tsx                    # Main page component

components/
├── city/
│   ├── CityPage.tsx                    # Main container
│   ├── CityHero.tsx                    # Hero section
│   ├── CityStats.tsx                   # Stats box
│   ├── RepairOrReplaceCTA.tsx          # Email capture
│   ├── QuickLinks.tsx                  # Jump navigation
│   ├── RetailersSection.tsx            # Stores section (normal state)
│   ├── ZeroStateCitySection.tsx        # (v1.2) Zero state component
│   ├── StoreFilters.tsx                # Filter controls
│   ├── StoreCard.tsx                   # Store card component
│   ├── StoreCardCompact.tsx            # Compact variant
│   ├── RepairSection.tsx               # Providers preview
│   ├── ProviderMiniCard.tsx            # Compact provider card
│   ├── CategoryGrid.tsx                # Category cards
│   ├── CategoryCard.tsx                # Single category
│   ├── BrandGrid.tsx                   # Brand pills
│   ├── GradeExplanation.tsx            # Educational content
│   ├── CityFAQSection.tsx              # FAQs with accordion
│   ├── GuidesSection.tsx               # Guide links
│   ├── NearbyCities.tsx                # Nearby cities
│   ├── QuickFacts.tsx                  # Summary box
│   └── EmailSignup.tsx                 # Bottom CTA
└── forms/
    └── EmailCaptureForm.tsx            # (v1.2) Reusable email form

lib/
├── city/
│   ├── getCityData.ts                  # Fetch city + stores + providers
│   ├── getStoresByCity.ts              # Fetch stores with filters
│   ├── getProvidersByCity.ts           # Fetch providers
│   ├── getCategoryStats.ts             # Category counts
│   ├── getBrandStats.ts                # Brand counts
│   ├── getCityFAQs.ts                  # Location FAQs
│   ├── getNearbyCities.ts              # Nearby cities
│   └── generateCitySchema.ts           # Schema.org generation
├── stores/
│   └── getNearbyStores.ts              # (v1.2) Radius-based store fetching
├── utils/
│   └── distance.ts                     # (v1.2) Haversine distance calculation
└── seo/
    └── narratives/                     # (v1.1) Data-Driven Narrative System
        ├── index.ts                    # Main exports & convenience functions
        ├── types.ts                    # TypeScript interfaces
        ├── templates.ts                # 5 template variations per page type
        ├── utils.ts                    # Formatting, interpolation helpers
        ├── generateCityNarrative.ts    # City Hub page narratives
        ├── generateCategoryNarrative.ts # Retail Category page narratives
        ├── generateRepairNarrative.ts  # Repair Category page narratives
        └── queries.ts                  # Supabase aggregation queries

types/
└── city.ts                             # TypeScript interfaces (incl. NearbyStore v1.2)

sql/
└── functions/
    └── get_stores_within_radius.sql    # (v1.2) Database function

═══════════════════════════════════════════════════════════════
```

---

## TypeScript Interfaces

```typescript
TYPESCRIPT INTERFACES — CITY PAGE (v1.2 Updated)
═══════════════════════════════════════════════════════════════

// types/city.ts

export interface CityPageData {
  place: Place;
  country: Country;
  adminArea?: AdminArea;
  stores: StoreListItem[];
  providers: ProviderListItem[];
  categories: CategoryWithCount[];
  brands: BrandWithCount[];
  faqs: FAQ[];
  nearbyCities: NearbyCityItem[];
  stats: CityStats;
  narrative: NarrativeResult | null;  // (v1.1) Data-driven narrative
  nearbyStoreGroups: NearbyStoreGroup[];  // (v1.2) Nearby stores for zero state
}

// (v1.1) Narrative system result type
export interface NarrativeResult {
  /** Main narrative paragraph for intro section */
  introParagraph: string;
  /** Shorter summary for meta description */
  metaSummary: string;
  /** Array of extractable facts for AEO */
  keyFacts: string[];
  /** Which template variation was used (1-5) */
  templateVariation: number;
  /** Data completeness score (0-100) */
  dataQualityScore: number;
}

// (v1.2) Nearby store with distance information
export interface NearbyStore {
  id: string;
  slug: string;
  business_name: string;
  short_description?: string;
  address_line1?: string;
  postcode?: string;
  phone?: string;
  website?: string;
  logo_url?: string;
  average_rating?: number;
  review_count: number;
  is_featured: boolean;
  offers_delivery: boolean;
  offers_free_delivery: boolean;
  warranty_months?: number;
  offers_finance: boolean;
  /** Distance from origin in miles */
  distance_miles: number;
  /** City where store is located */
  place_name: string;
  place_slug: string;
  country_slug: string;
}

// (v1.2) Nearby stores grouped by city
export interface NearbyStoreGroup {
  city: {
    id: string;
    name: string;
    slug: string;
    country_slug: string;
    /** Distance to nearest store in this city */
    distance_miles: number;
  };
  stores: NearbyStore[];
}

// (v1.2) Configuration for nearby stores fetch
export interface NearbyStoresConfig {
  /** Search radius in miles (default: 20) */
  radiusMiles?: number;
  /** Maximum total stores to return (default: 20) */
  maxResults?: number;
  /** Place ID to exclude (current city) */
  excludePlaceId?: string;
}

export interface Place {
  id: string;
  name: string;
  slug: string;
  place_type: 'city' | 'town' | 'area';
  latitude?: number;
  longitude?: number;
  population?: number;
  h1_heading?: string;
  intro_paragraph?: string;
  seo_title?: string;
  seo_meta_description?: string;
  store_count: number;
  provider_count: number;
  is_active: boolean;
  is_indexable: boolean;
}

export interface StoreListItem {
  id: string;
  slug: string;
  business_name: string;
  short_description?: string;
  address_line1?: string;
  postcode?: string;
  phone?: string;
  website?: string;
  logo_url?: string;
  average_rating?: number;
  review_count: number;
  year_established?: number;
  status: StoreStatus;
  is_featured: boolean;
  
  // Services
  offers_delivery: boolean;
  offers_free_delivery: boolean;
  offers_same_day_delivery: boolean;
  offers_installation: boolean;
  offers_free_installation: boolean;
  offers_finance: boolean;
  offers_zero_percent_finance: boolean;
  offers_repair_service: boolean;
  offers_weee_recycling: boolean;
  warranty_months?: number;
  
  // Relations (populated)
  categories: CategorySummary[];
  brands: BrandSummary[];
}

export interface ProviderListItem {
  id: string;
  slug: string;
  name: string;
  short_description?: string;
  phone: string;
  average_rating?: number;
  review_count: number;
  callout_fee_from?: number;
  offers_same_day: boolean;
  no_fix_no_fee: boolean;
  is_verified: boolean;
  brands_summary: string[]; // Top 3 brand names
}

export interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  icon: string;
  tier: 'tier_1' | 'tier_2' | 'tier_3' | 'supplementary';
  store_count: number;
  price_from?: number;
}

export interface BrandWithCount {
  id: string;
  name: string;
  slug: string;
  tier: 'premium' | 'mid_range' | 'value';
  store_count: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface NearbyCityItem {
  id: string;
  name: string;
  slug: string;
  country_slug: string;
  store_count: number;
  distance_miles?: number;
}

export interface CityStats {
  storeCount: number;
  providerCount: number;
  brandCount: number;
  storesWithWarranty: number;
  storesWithFinance: number;
  storesWithSameDay: number;
}

export interface StoreFilters {
  category?: string;
  brand?: string;
  hasDelivery?: boolean;
  hasWarranty12?: boolean;
  hasFinance?: boolean;
  sortBy: 'rating' | 'newest' | 'name';
}

═══════════════════════════════════════════════════════════════
```

---

## Data Fetching

```typescript
DATA FETCHING — CITY PAGE (v1.2 Updated)
═══════════════════════════════════════════════════════════════

// lib/city/getCityData.ts

import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { getNearbyStores } from '@/lib/stores/getNearbyStores';  // (v1.2)
import { getCityNarrative } from '@/lib/seo/narratives';  // (v1.1)
import type { CityPageData, NearbyStoreGroup } from '@/types/city';

export const getCityData = cache(async (
  countrySlug: string,
  citySlug: string
): Promise<CityPageData | null> => {
  const supabase = createClient();
  
  // 1. Get place with country and admin_area
  const { data: place, error } = await supabase
    .from('places')
    .select(`
      *,
      countries!inner(id, name, slug),
      admin_areas(id, name, slug)
    `)
    .eq('slug', citySlug)
    .eq('is_active', true)
    .single();
  
  if (error || !place) return null;
  
  // Validate country matches
  if (place.countries.slug !== countrySlug) return null;
  
  // 2. Get local stores (ranked)
  const { data: stores } = await supabase
    .from('stores')
    .select(`
      id, slug, business_name, short_description,
      address_line1, postcode, phone, website, logo_url,
      average_rating, review_count, year_established,
      status, is_featured,
      offers_delivery, offers_free_delivery, offers_same_day_delivery,
      offers_installation, offers_free_installation,
      offers_finance, offers_zero_percent_finance,
      offers_repair_service, offers_weee_recycling,
      warranty_months,
      store_categories(appliance_categories(id, name, slug)),
      store_brands(brands(id, name, slug))
    `)
    .eq('place_id', place.id)
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('overall_score', { ascending: false });
  
  const localStores = stores || [];
  
  // ═══════════════════════════════════════════════════════════════
  // (v1.2) ZERO STATE: Fetch nearby stores if no local stores
  // ═══════════════════════════════════════════════════════════════
  let nearbyStoreGroups: NearbyStoreGroup[] = [];
  
  if (localStores.length === 0 && place.latitude && place.longitude) {
    // No local stores — fetch nearby stores within radius
    nearbyStoreGroups = await getNearbyStores(
      place.latitude,
      place.longitude,
      {
        radiusMiles: 20,          // 20 mile radius
        maxResults: 20,           // Max 20 stores
        excludePlaceId: place.id  // Exclude current city
      }
    );
  }
  // ═══════════════════════════════════════════════════════════════
  
  // 3. Get providers (top 5 for preview)
  // (v1.2) Fetch more if zero stores — providers become primary content
  const providerLimit = localStores.length === 0 ? 10 : 5;
  
  const { data: providers } = await supabase
    .from('service_providers')
    .select(`
      id, slug, name, short_description, phone,
      average_rating, review_count,
      callout_fee_from, offers_same_day, no_fix_no_fee, is_verified
    `)
    .eq('is_active', true)
    .contains('coverage_place_ids', [place.id])
    .order('average_rating', { ascending: false })
    .limit(providerLimit);
  
  // 4. Get category stats
  const { data: categories } = await supabase
    .rpc('get_category_stats_for_place', { place_id: place.id });
  
  // 5. Get brand stats
  const { data: brands } = await supabase
    .rpc('get_brand_stats_for_place', { place_id: place.id });
  
  // 6. Get FAQs
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_location_template', true)
    .eq('is_active', true)
    .order('display_order');
  
  // Replace {city} placeholders in FAQs
  const processedFaqs = faqs?.map(faq => ({
    ...faq,
    question: faq.question.replace(/{city}/g, place.name),
    answer: faq.answer.replace(/{city}/g, place.name)
  }));
  
  // 7. Get nearby cities
  const { data: nearbyCities } = await supabase
    .from('places')
    .select('id, name, slug, countries(slug), store_count')
    .eq('admin_area_id', place.admin_area_id)
    .eq('is_active', true)
    .neq('id', place.id)
    .gt('store_count', 0)
    .order('store_count', { ascending: false })
    .limit(9);
  
  // 8. (v1.1) Get narrative
  const narrative = await getCityNarrative(citySlug);
  
  return {
    place,
    country: place.countries,
    adminArea: place.admin_areas,
    stores: localStores,
    providers: providers || [],
    categories: categories || [],
    brands: brands || [],
    faqs: processedFaqs || [],
    nearbyCities: nearbyCities || [],
    nearbyStoreGroups,  // (v1.2) Empty array if local stores exist
    narrative,  // (v1.1)
    stats: {
      storeCount: place.store_count,
      providerCount: place.provider_count,
      brandCount: brands?.length || 0,
      storesWithWarranty: localStores.filter(s => s.warranty_months >= 12).length,
      storesWithFinance: localStores.filter(s => s.offers_finance).length,
      storesWithSameDay: localStores.filter(s => s.offers_same_day_delivery).length
    }
  };
});

═══════════════════════════════════════════════════════════════
```

---

## Implementation Checklist

### Phase 1: Core Structure
- [ ] URL routing `[country]/[city]/page.tsx`
- [ ] Data fetching (getCityData)
- [ ] Hero section with stats
- [ ] Breadcrumbs
- [ ] Meta tags and basic Schema.org
- [ ] Anti-thin page gating (noindex)

### Phase 1.1: Data-Driven Narrative (v1.1)
- [ ] Import getCityNarrative from lib/seo/narratives
- [ ] Fetch narrative data in page component
- [ ] Display narrative.introParagraph after H1
- [ ] Render keyFacts as pills below narrative
- [ ] Handle fallback when narrative is null
- [ ] Use narrative.metaSummary in meta description
- [ ] Test different templates for different cities
- [ ] Verify zero-store fallback template

### Phase 2: Retailers Section
- [ ] Store cards component
- [ ] Filter controls (category, brand, features)
- [ ] Sort functionality
- [ ] "View All" / Load more
- [ ] Featured store highlighting

### Phase 3: Supporting Sections
- [ ] Repair services preview
- [ ] Category grid
- [ ] Brand pills
- [ ] What are graded appliances (educational)

### Phase 4: FAQs & Content
- [ ] FAQ accordion with Schema.org
- [ ] Helpful guides section
- [ ] Quick facts summary (with keyFacts integration v1.1)

### Phase 5: Internal Linking
- [ ] Nearby cities
- [ ] Email signup CTAs
- [ ] Link to category/brand/repair pages

### Phase 6: Polish
- [ ] Mobile optimization
- [ ] Filter slide-out panel
- [ ] Performance audit
- [ ] Accessibility audit

### Phase 7: Narrative Testing (v1.1)
- [ ] Narrative generates for cities WITH stores
- [ ] Narrative generates for cities with ZERO stores
- [ ] Fallback displays when narrative fetch fails
- [ ] Different template selected for different city slugs
- [ ] Key facts pills render correctly
- [ ] Meta description uses narrative.metaSummary
- [ ] Page renders without errors if narrative is null
- [ ] National average price comparison is accurate

### Phase 1.2: Zero State Implementation (v1.2)
- [ ] Create database function `get_stores_within_radius`
- [ ] Create `lib/stores/getNearbyStores.ts` with Haversine calculation
- [ ] Create `ZeroStateCitySection.tsx` component
- [ ] Add collapsible city group UI (mobile-first)
- [ ] Update `getCityData` to conditionally fetch nearby stores
- [ ] Add distance display to StoreCard component
- [ ] Create email capture form for notifications
- [ ] Update `CityPageData` interface with `nearbyStoreGroups`
- [ ] Test zero state renders when stores.length === 0
- [ ] Verify providers are shown more prominently in zero state

### Phase 8: Zero State Testing (v1.2)
- [ ] **City with 0 stores, 0 nearby, 0 providers**: Shows soft 404 message
- [ ] **City with 0 stores, nearby stores, 0 providers**: Shows nearby stores only
- [ ] **City with 0 stores, 0 nearby, has providers**: Shows repair section prominently
- [ ] **City with 0 stores, nearby stores, has providers**: Full zero state UI
- [ ] Distance calculation is accurate (spot-check with Google Maps)
- [ ] Stores are grouped by city correctly
- [ ] City groups sort by nearest first
- [ ] Stores within group sort by rating then distance
- [ ] Collapsible accordions work on mobile (tap to expand/collapse)
- [ ] "Call Now" buttons have adequate tap target size (48px min)
- [ ] Email capture form submits correctly
- [ ] Links to nearby city pages work
- [ ] Links to provider profiles work
- [ ] Page does not break if lat/lng is null (graceful degradation)
- [ ] Schema.org still valid for zero-state pages

---

**END OF CITY PAGE SPECIFICATION**

═══════════════════════════════════════════════════════════════
Document Status: ✅ LOCKED
Version: 1.2
v1.1 Amendment: Data-Driven Narrative System added
v1.2 Amendment: Zero State Pivot Strategy added
Approved: January 2026
Next: Implementation Phase 1

v1.2 CHANGELOG:
─────────────────────────────────────────────────────────────────
├── Added Key Principle: Zero State Pivot (v1.2)
├── Added Data Source: Zero State System (getNearbyStores)
├── Added Section 5.1: Zero State — No Local Retailers
├── Added Zero State Decision Matrix
├── Added Desktop & Mobile visual specifications
├── Added Nearby Stores data structure (grouped by city)
├── Added Database function: get_stores_within_radius (SQL)
├── Added TypeScript: getNearbyStores.ts implementation
├── Added React component: ZeroStateCitySection.tsx
├── Added StoreCard distance display modification
├── Added Conditional rendering logic for page component
├── Updated TypeScript interfaces: NearbyStore, NearbyStoreGroup
├── Updated Data Fetching with conditional nearby stores logic
├── Added Phase 1.2: Zero State Implementation checklist
├── Added Phase 8: Zero State Testing checklist

MOBILE-FIRST CONSIDERATIONS (v1.2):
─────────────────────────────────────────────────────────────────
├── City groups are collapsible accordions (reduce scroll)
├── First/nearest city expanded by default
├── Tap city header to expand/collapse (no separate button)
├── "Call Now" buttons are full-width (easy thumb tap)
├── Minimum tap target size: 48px
├── Distance shown prominently on each store card
├── Email capture uses native keyboard with email input type
├── Single-column layout throughout
═══════════════════════════════════════════════════════════════
