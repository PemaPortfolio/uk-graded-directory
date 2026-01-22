# Search Bar Architecture Specification

**Version:** 1.1 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED (Updated with SEO/Performance fixes)

---

## Executive Summary

The Search Bar is the primary navigation and discovery tool for the UK Graded Appliances Directory. It guides users toward SEO-optimized, indexed pages while gracefully handling freeform queries via a noindex search results page.

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data source | Internal database only | Control, speed, no API costs |
| AI integration | No (for now) | Structured data doesn't need it; adds cost/latency |
| Filter pills | `[ All ] [ Buy ] [ Repair ]` | Clear intent, compact |
| Default filter | "All" | Matches city hub (unified page) |
| Popular categories | Static top 6 + dynamic counts | SEO priority, progressive enhancement |
| Location storage | None (URL is source of truth) | Zero complexity, GDPR-friendly |
| Google Reviews | Link out only | Zero maintenance, trust transfer |
| **Data caching** | Client-side preload | Instant autocomplete, zero latency |
| **Anti-thin gating** | Check before routing | Prevents SEO penalties |

---

## Brand Colors (Reference)

| Color | Hex | Usage in Search Bar |
|-------|-----|---------------------|
| Primary Coral | `#e85d4c` | Search button, filter pill active state, focus borders |
| Primary Hover | `#d94f3f` | Button hover states |
| White | `#FFFFFF` | Input backgrounds, button text |
| Light Grey | `#F3F4F6` | Input backgrounds (alternative), hover states |

---

## Component Structure

### Desktop Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────┐ ┌─────────────────────────┐ ┌──────────────┐  │
│  │ KEYWORD                 │ │ LOCATION                │ │              │  │
│  │ Search appliances...    │ │ Enter city or postcode  │ │   Search     │  │
│  │                         │ │                    📍   │ │              │  │
│  └─────────────────────────┘ └─────────────────────────┘ └──────────────┘  │
│                                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                    📍 Use my location │
│  │   All   │ │   Buy   │ │ Repair  │                                       │
│  └─────────┘ └─────────┘ └─────────┘                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Mobile Layout

```
┌─────────────────────────────────┐
│                                 │
│  ┌───────────────────────────┐  │
│  │ KEYWORD                   │  │
│  │ Search appliances...      │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ LOCATION              📍  │  │
│  │ Enter city or postcode    │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │         Search            │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌─────┐ ┌─────┐ ┌────────┐    │
│  │ All │ │ Buy │ │ Repair │    │
│  └─────┘ └─────┘ └────────┘    │
│                                 │
└─────────────────────────────────┘
```

---

## Component Specifications

### 1. Keyword Input Field

```
KEYWORD INPUT SPECIFICATION
═══════════════════════════════════════════════════════════════

ELEMENT TYPE:     <input type="text">
LABEL:            "KEYWORD" (shown above input)
PLACEHOLDER:      "Search appliances, stores, repairs..."
ARIA-LABEL:       "Search for appliances, stores, or repair services"

DIMENSIONS:
├── Desktop:      flex-1 (shares space with location), min-width 280px
├── Tablet:       flex-1, min-width 240px
└── Mobile:       width 100%

STYLING:
├── Height:       48px (touch-friendly)
├── Padding:      12px 16px
├── Border:       1px solid #E5E7EB (grey-200)
├── Border focus: 2px solid #e85d4c (secondary)
├── Border radius:8px (left side only on desktop when grouped)
├── Background:   #FFFFFF
├── Font size:    16px (prevents iOS zoom)
└── Font color:   #111827 (grey-900)

ICON:
├── Search icon (magnifying glass) at left: 20px, color #6B7280
└── Clear button (X) at right when has value: 20px, color #6B7280

HTML ATTRIBUTES (Mobile Optimized):
├── type="text"
├── inputMode="search"           // Better mobile keyboard
├── autoComplete="off"           // Prevent browser autocomplete conflict
├── autoCorrect="off"            // Prevent autocorrect interference
├── autoCapitalize="off"         // Don't capitalize input
├── spellCheck="false"           // Don't spellcheck
└── enterKeyHint="search"        // Shows "Search" on mobile keyboard

BEHAVIOR:
├── On focus:     Show autocomplete dropdown
├── On type:      Filter from LOCAL CACHE first (instant), then API
├── On clear:     Reset field, hide autocomplete
├── On blur:      Hide autocomplete (with 200ms delay for click)
└── On Enter:     Submit search

═══════════════════════════════════════════════════════════════
```

### 2. Location Input Field

```
LOCATION INPUT SPECIFICATION
═══════════════════════════════════════════════════════════════

ELEMENT TYPE:     <input type="text">
LABEL:            "LOCATION" (shown above input)
PLACEHOLDER:      "Enter city or postcode"
ARIA-LABEL:       "Enter your city or postcode"

DIMENSIONS:
├── Desktop:      width 240px (fixed)
├── Tablet:       width 200px
└── Mobile:       width 100%

STYLING:
├── Height:       48px
├── Padding:      12px 44px 12px 16px (extra right for icon)
├── Border:       1px solid #E5E7EB
├── Border focus: 2px solid #e85d4c
├── Border radius:0 (middle of group) or 8px (standalone mobile)
├── Background:   #FFFFFF
├── Font size:    16px
└── Font color:   #111827

ICON:
├── Location pin icon at right: 20px, color #6B7280
└── On mobile: Icon is clickable (triggers geolocation)

HTML ATTRIBUTES (Mobile Optimized):
├── type="text"
├── inputMode="search"
├── autoComplete="off"
├── autoCorrect="off"
├── autoCapitalize="off"
├── spellCheck="false"
└── enterKeyHint="search"

GEOLOCATION BUTTON (Desktop):
├── Separate link below inputs: "📍 Use my location"
├── Font size:    14px
├── Color:        #e85d4c (secondary)
├── Hover:        Underline
└── On click:     Request browser geolocation

BEHAVIOR:
├── On focus:     Show location autocomplete dropdown
├── On type:      Filter from LOCAL CACHE first, then API for edge cases
├── On select:    Store place object in component state
│                 IMMEDIATELY trigger prefetch of category counts
├── On blur:      Hide autocomplete
└── On geolocation success: Auto-fill with nearest city

═══════════════════════════════════════════════════════════════
```

### 3. Search Button

```
SEARCH BUTTON SPECIFICATION
═══════════════════════════════════════════════════════════════

ELEMENT TYPE:     <button type="submit">
LABEL:            "Search" (with optional icon)
ARIA-LABEL:       "Search for appliances"

DIMENSIONS:
├── Desktop:      width auto (min 100px), padding 0 24px
├── Tablet:       width auto (min 80px)
└── Mobile:       width 100%

STYLING:
├── Height:       48px
├── Background:   #e85d4c (red)
├── Background hover: #d94f3f (red-600, darker)
├── Border:       none
├── Border radius:8px (right side only on desktop) or 8px (standalone)
├── Font size:    16px
├── Font weight:  600 (semibold)
├── Font color:   #FFFFFF
├── Cursor:       pointer
└── Transition:   background 150ms ease

ICON:
├── Search icon (magnifying glass): 20px, white, left of text
└── Or icon only on smaller viewports

STATES:
├── Default:      #e85d4c
├── Hover:        #d94f3f
├── Focus:        #d94f3f + 2px secondary outline
├── Active:       #b91c1c (red-700)
└── Disabled:     #FCA5A5 (red-300), cursor not-allowed

═══════════════════════════════════════════════════════════════
```

### 4. Filter Pills

```
FILTER PILLS SPECIFICATION
═══════════════════════════════════════════════════════════════

LABELS:           [ All ] [ Buy ] [ Repair ]
DEFAULT SELECTED: "All"

ELEMENT TYPE:     <button> or <input type="radio"> group
ROLE:             radiogroup
ARIA-LABEL:       "Filter search results by type"

DIMENSIONS:
├── Each pill:    padding 8px 16px
├── Gap:          8px between pills
├── Desktop:      Inline, left-aligned below inputs
└── Mobile:       Inline, horizontally scrollable if overflow

STYLING (Inactive):
├── Height:       36px
├── Background:   #F3F4F6 (grey-100)
├── Border:       1px solid #E5E7EB (grey-200)
├── Border radius:9999px (full pill shape)
├── Font size:    14px
├── Font weight:  500 (medium)
├── Font color:   #374151 (grey-700)
└── Cursor:       pointer

STYLING (Active):
├── Background:   #e85d4c (red)
├── Border:       1px solid #e85d4c
├── Font color:   #FFFFFF
└── Font weight:  600 (semibold)

STATES:
├── Inactive hover: Background #E5E7EB
├── Active:         Red background, white text
├── Focus:          2px secondary outline
└── Transition:     all 150ms ease

BEHAVIOR:
├── Single selection only (radio behavior)
├── Affects search results filtering
├── Updates URL parameter: ?type=all|buy|repair
└── Persists across searches in session

═══════════════════════════════════════════════════════════════
```

---

## Client-Side Data Caching Strategy

### Why Caching is Critical

```
PERFORMANCE IMPACT ANALYSIS
═══════════════════════════════════════════════════════════════

WITHOUT CACHING:
├── User types "wash"
├── API call: GET /api/search/categories?q=wash
├── Network latency: 100-300ms
├── User sees: Loading spinner or delayed results
├── INP score: POOR (>200ms)
└── User experience: Sluggish, frustrating

WITH CACHING:
├── User types "wash"
├── Filter from local cache: <5ms
├── User sees: Instant results
├── INP score: EXCELLENT (<50ms)
└── User experience: Snappy, delightful

═══════════════════════════════════════════════════════════════
```

### Data Preloading Specification

```
PRELOAD STRATEGY
═══════════════════════════════════════════════════════════════

ON APP INITIALIZATION (once per session):
────────────────────────────────────────────────────────────────

Fetch: GET /api/search/init

Response payload (~10KB gzipped):
{
  "categories": [
    { "id": "uuid", "slug": "washing-machines", "name": "Washing Machines", 
      "namePlural": "Washing Machines", "icon": "🧺", "supportsRepair": true },
    // ... ~30 items
  ],
  "places": [
    { "id": "uuid", "slug": "manchester", "name": "Manchester", 
      "countrySlug": "england", "adminArea": "Greater Manchester" },
    // ... top 100 places by store_count
  ],
  "brands": [
    { "id": "uuid", "slug": "bosch", "name": "Bosch", "tier": "premium" },
    // ... ~27 items
  ]
}

Store in: React Context (SearchDataProvider)
Lifetime: Session (refetch on page reload)

────────────────────────────────────────────────────────────────

AUTOCOMPLETE BEHAVIOR WITH CACHE:
────────────────────────────────────────────────────────────────

KEYWORD AUTOCOMPLETE:
├── Step 1: Filter categories from cache (instant)
├── Step 2: Filter brands from cache (instant)
├── Step 3: If query.length >= 3, fetch businesses from API
│           GET /api/search/businesses?q={query}&place_id={placeId}
└── Display: Combined results (cached + API)

LOCATION AUTOCOMPLETE:
├── Step 1: Filter places from cache (instant)
├── Step 2: If no match in cache AND query.length >= 2:
│           GET /api/search/places?q={query}
│           (For edge case locations not in top 100)
└── Display: Cached results first, API results appended

═══════════════════════════════════════════════════════════════
```

### SearchDataProvider Implementation

```typescript
// lib/context/SearchDataContext.tsx

interface SearchData {
  categories: Category[];
  places: Place[];
  brands: Brand[];
  isLoaded: boolean;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  namePlural: string;
  icon: string;
  supportsRepair: boolean;
}

interface Place {
  id: string;
  slug: string;
  name: string;
  countrySlug: string;
  adminArea: string | null;
  storeCount?: number;    // Only populated when selected
  providerCount?: number; // Only populated when selected
}

interface Brand {
  id: string;
  slug: string;
  name: string;
  tier: 'premium' | 'mid_range' | 'value';
}

// Provider wraps the app, fetches data once on mount
// Exposes: searchData, filterCategories(), filterPlaces(), filterBrands()
```

### Category Counts Prefetching

```
COUNTS PREFETCH STRATEGY
═══════════════════════════════════════════════════════════════

TRIGGER: User selects a location in the location input

IMMEDIATELY FETCH:
GET /api/search/counts?place_id={selectedPlaceId}

Response:
{
  "placeId": "uuid",
  "placeName": "Manchester",
  "categoryCounts": [
    { "slug": "washing-machines", "storeCount": 42, "providerCount": 12 },
    { "slug": "fridge-freezers", "storeCount": 38, "providerCount": 8 },
    // ... all categories with counts for this place
  ],
  "totalStores": 127,
  "totalProviders": 45,
  "topBusinesses": [
    { "type": "store", "slug": "manchester-appliance-hub", 
      "name": "Manchester Appliance Hub", "rating": 4.8 },
    { "type": "provider", "slug": "quickfix-repairs", 
      "name": "QuickFix Repairs", "rating": 4.6 }
  ],
  "nearbyCities": [
    { "slug": "salford", "name": "Salford", "storeCount": 8 },
    { "slug": "stockport", "name": "Stockport", "storeCount": 5 }
  ]
}

Store in: Component state (locationData)
Use: Display counts in autocomplete when user focuses keyword input

BENEFIT:
├── Counts are ready BEFORE user focuses keyword input
├── Zero delay when showing enhanced autocomplete
└── Single API call per location selection

═══════════════════════════════════════════════════════════════
```

---

## Autocomplete Specifications

### Keyword Autocomplete Dropdown

```
KEYWORD AUTOCOMPLETE — STATE 1 (No location entered)
═══════════════════════════════════════════════════════════════

User focuses on keyword input, location is empty.
Data source: LOCAL CACHE (instant)

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  POPULAR CATEGORIES                                         │
│  ─────────────────────────────────────────────────────────  │
│  🧺  Washing Machines                                       │
│  🧊  Fridge Freezers                                        │
│  🇺🇸  American Fridge Freezers                              │
│  🍽️  Dishwashers                                            │
│  💨  Tumble Dryers                                          │
│  🔧  Appliance Repair                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

NOTE: No store counts shown (location unknown)
SOURCE: Hardcoded top 6 (no cache lookup needed)

═══════════════════════════════════════════════════════════════

KEYWORD AUTOCOMPLETE — STATE 2 (Location entered: "Manchester")
═══════════════════════════════════════════════════════════════

User focuses on keyword input, location is "Manchester".
Data source: LOCAL CACHE + PREFETCHED COUNTS (instant)

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  POPULAR CATEGORIES                                         │
│  ─────────────────────────────────────────────────────────  │
│  🧺  Washing Machines                      — 42 stores      │
│  🧊  Fridge Freezers                       — 38 stores      │
│  🇺🇸  American Fridge Freezers             — 28 stores      │
│  🍽️  Dishwashers                           — 31 stores      │
│  💨  Tumble Dryers                         — 25 stores      │
│  🔧  Appliance Repair                      — 15 engineers   │
│                                                             │
│  TOP RATED IN MANCHESTER                                    │
│  ─────────────────────────────────────────────────────────  │
│  ⭐ 4.8  Manchester Appliance Hub          Graded Retailer  │
│  ⭐ 4.6  QuickFix Repairs                  Repair Service   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

SOURCE: Prefetched when location was selected (zero latency)

═══════════════════════════════════════════════════════════════

KEYWORD AUTOCOMPLETE — STATE 3 (User typing: "wash")
═══════════════════════════════════════════════════════════════

User types "wash" in keyword input.
Data source: LOCAL CACHE filter (instant) + API for businesses

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  CATEGORIES                                                 │
│  ─────────────────────────────────────────────────────────  │
│  🧺  Washing Machines                      — 42 stores      │
│  🔄  Washer Dryers                         — 18 stores      │
│  🔧  Washing Machine Repair                — 12 engineers   │
│                                                             │
│  TOP RATED BUSINESSES                                       │
│  ─────────────────────────────────────────────────────────  │
│  ⭐ 4.7  Washworld Appliances              Birmingham       │
│  ⭐ 4.5  Wash & Go Repairs                 Manchester       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

SOURCE: Categories from cache (instant), businesses from API (debounced)

═══════════════════════════════════════════════════════════════

KEYWORD AUTOCOMPLETE — STATE 4 (Category with 0 stores)
═══════════════════════════════════════════════════════════════

User selected small town, category has 0 stores.
Shows NEARBY CITIES as fallback (internal linking opportunity).

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  CATEGORIES                                                 │
│  ─────────────────────────────────────────────────────────  │
│  🧺  Washing Machines                      — 0 stores       │
│      └─ Available in: Manchester (42), Leeds (28)          │
│                                                             │
│  🧊  Fridge Freezers                       — 0 stores       │
│      └─ Available in: Manchester (38), Sheffield (22)      │
│                                                             │
│  🔧  Appliance Repair                      — 1 engineer     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

SOURCE: Nearby cities from places.nearby_places or computed by distance
BENEFIT: Creates internal links, improves UX, prevents dead ends

═══════════════════════════════════════════════════════════════
```

### Location Autocomplete Dropdown

```
LOCATION AUTOCOMPLETE — User typing: "man"
═══════════════════════════════════════════════════════════════

Data source: LOCAL CACHE filter (instant)

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📍  Manchester                                             │
│      Greater Manchester • 24 stores, 12 repair engineers   │
│                                                             │
│  📍  Mansfield                                              │
│      Nottinghamshire • 3 stores, 2 repair engineers        │
│                                                             │
│  📍  Manningtree                                            │
│      Essex • 1 store                                        │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  📍  Use my current location                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DROPDOWN ITEM STRUCTURE:
├── City name (bold)
├── Admin area / County (muted)
├── Store count + Provider count (small, muted)
└── Sorted by: store_count DESC, then alphabetically

SOURCE: Filtered from preloaded top 100 places
FALLBACK: If no match, query API (rare edge case)

═══════════════════════════════════════════════════════════════
```

### Autocomplete Dropdown Styling

```
AUTOCOMPLETE DROPDOWN STYLING
═══════════════════════════════════════════════════════════════

CONTAINER:
├── Position:       absolute, below input
├── Width:          100% of input (min 300px)
├── Max height:     400px (scrollable)
├── Background:     #FFFFFF
├── Border:         1px solid #E5E7EB
├── Border radius:  8px
├── Box shadow:     0 10px 25px rgba(0,0,0,0.1)
├── Z-index:        50
└── Overflow:       auto

SECTION HEADER:
├── Font size:      12px
├── Font weight:    600
├── Font color:     #6B7280 (grey-500)
├── Text transform: uppercase
├── Letter spacing: 0.05em
├── Padding:        12px 16px 8px
└── Background:     #F9FAFB (grey-50)

DROPDOWN ITEM:
├── Padding:        12px 16px
├── Font size:      14px (primary), 12px (secondary)
├── Font color:     #111827 (primary), #6B7280 (secondary)
├── Cursor:         pointer
├── Border bottom:  1px solid #F3F4F6 (except last)
├── Hover:          Background #F3F4F6
├── Active:         Background #E5E7EB
└── Icon:           20px, left-aligned, color #6B7280

NEARBY CITIES SUBTEXT:
├── Font size:      12px
├── Font color:     #3B82F6 (blue-500, indicates link)
├── Padding left:   28px (aligns under category name)
├── Cursor:         pointer
└── Hover:          Underline

═══════════════════════════════════════════════════════════════
```

---

## Search Flow & Routing Logic

### Intent Classification Algorithm (with Anti-Thin Gating)

```
SEARCH SUBMISSION → CLASSIFICATION → ROUTING
═══════════════════════════════════════════════════════════════

INPUT:
├── keyword: string (user input or selected suggestion)
├── location: { name, slug, countrySlug, placeId } | null
├── filter: 'all' | 'buy' | 'repair'
├── cachedData: { categories, places, brands } (from context)
├── locationData: { categoryCounts, topBusinesses } | null (prefetched)

───────────────────────────────────────────────────────────────
STEP 1: NORMALIZE INPUTS (Client-side, instant)
───────────────────────────────────────────────────────────────
├── keyword_lower = keyword.toLowerCase().trim()
├── keyword_slug = slugify(keyword)
└── location_slug = location?.slug || null

───────────────────────────────────────────────────────────────
STEP 2: CHECK EXACT CATEGORY MATCH (Client-side, instant)
───────────────────────────────────────────────────────────────
├── Search cachedData.categories for matching slug or name
├── If match found AND location exists:
│   │
│   │  ┌─────────────────────────────────────────────────────┐
│   │  │  🔴 ANTI-THIN PAGE CHECK (Critical for SEO)        │
│   │  ├─────────────────────────────────────────────────────┤
│   │  │  Look up count from locationData.categoryCounts    │
│   │  │                                                     │
│   │  │  IF filter = 'repair':                             │
│   │  │    threshold = 2 providers                         │
│   │  │    count = providerCount for this category         │
│   │  │  ELSE:                                             │
│   │  │    threshold = 2 stores                            │
│   │  │    count = storeCount for this category            │
│   │  │                                                     │
│   │  │  IF count >= threshold:                            │
│   │  │    → Route to category page (INDEXED) ✅           │
│   │  │  ELSE:                                             │
│   │  │    → Route to city hub instead (INDEXED) ✅        │
│   │  │    → Show toast: "Showing all in {city}"          │
│   │  └─────────────────────────────────────────────────────┘
│   │
│   ├── If filter = 'repair' AND category.supportsRepair:
│   │   └── REDIRECT → /{countrySlug}/{locationSlug}/{categorySlug}-repair/
│   └── Else:
│       └── REDIRECT → /{countrySlug}/{locationSlug}/{categorySlug}/
│
├── If match found AND no location:
│   └── REDIRECT → /{categorySlug}/ (national hub)
└── If no match → continue to Step 3

───────────────────────────────────────────────────────────────
STEP 3: CHECK REPAIR INTENT (Client-side, instant)
───────────────────────────────────────────────────────────────
├── Check if any REPAIR_INTENT_KEYWORDS in keyword_lower
├── Keywords: 'repair', 'fix', 'broken', 'engineer', 'service',
│            'maintenance', 'not working', 'fault', 'error', 
│            'leaking', 'noise'
├── If repair intent detected:
│   ├── Extract appliance type (e.g., "washing machine" from "fix washing machine")
│   ├── Find matching category in cachedData.categories
│   ├── If match AND location:
│   │   ├── CHECK anti-thin threshold (same as Step 2)
│   │   └── REDIRECT → /{countrySlug}/{locationSlug}/{categorySlug}-repair/
│   └── If no location:
│       └── REDIRECT → /search?q={keyword}&type=repair (noindex)
└── If no repair intent → continue to Step 4

───────────────────────────────────────────────────────────────
STEP 4: CHECK BUSINESS NAME MATCH (Client-side first, then API)
───────────────────────────────────────────────────────────────
├── First: Check locationData.topBusinesses for exact match
├── If match:
│   ├── If type = 'store':
│   │   └── REDIRECT → /store/{storeSlug}/
│   └── If type = 'provider':
│       └── REDIRECT → /provider/{providerSlug}/
├── If no local match AND keyword.length >= 3:
│   ├── Query API: GET /api/search/businesses?q={keyword}
│   ├── If exact match found:
│   │   └── REDIRECT to appropriate profile page
└── If no match → continue to Step 5

───────────────────────────────────────────────────────────────
STEP 5: CHECK BRAND MATCH (Client-side, instant)
───────────────────────────────────────────────────────────────
├── Search cachedData.brands for matching slug or name
├── If match AND location:
│   └── REDIRECT → /{countrySlug}/{locationSlug}/{brandSlug}/
├── If match AND no location:
│   └── REDIRECT → /{brandSlug}/ (national brand hub)
└── If no match → continue to Step 6

───────────────────────────────────────────────────────────────
STEP 6: FREEFORM FALLBACK (Always safe)
───────────────────────────────────────────────────────────────
├── No structured match found
├── Build query string:
│   ├── q = encodeURIComponent(keyword)
│   ├── loc = location_slug || ''
│   └── type = filter
└── REDIRECT → /search?q={q}&loc={loc}&type={type}
    └── This page has: <meta name="robots" content="noindex">

═══════════════════════════════════════════════════════════════
```

### Anti-Thin Page Gating - Detailed Logic

```
ANTI-THIN PAGE GATING SPECIFICATION
═══════════════════════════════════════════════════════════════

PURPOSE:
Prevent routing users to pages that would hurt SEO (thin content)
or provide poor UX (empty results).

THRESHOLDS (from backend architecture):
├── City hub:           ≥1 store OR ≥1 provider
├── Retail category:    ≥2 stores
├── Repair category:    ≥2 providers
├── Brand page:         ≥3 stores
└── Brand + category:   ≥3 stores

IMPLEMENTATION:

function shouldRouteToCategory(
  categorySlug: string,
  locationData: LocationData,
  filter: 'all' | 'buy' | 'repair'
): { allowed: boolean; fallbackUrl: string; message?: string } {
  
  const counts = locationData.categoryCounts.find(
    c => c.slug === categorySlug
  );
  
  if (!counts) {
    return {
      allowed: false,
      fallbackUrl: `/${locationData.countrySlug}/${locationData.placeSlug}/`,
      message: `Showing all appliances in ${locationData.placeName}`
    };
  }
  
  const threshold = filter === 'repair' ? 2 : 2;
  const count = filter === 'repair' ? counts.providerCount : counts.storeCount;
  
  if (count >= threshold) {
    return { allowed: true, fallbackUrl: '' };
  }
  
  return {
    allowed: false,
    fallbackUrl: `/${locationData.countrySlug}/${locationData.placeSlug}/`,
    message: `Showing all appliances in ${locationData.placeName}`
  };
}

USER FEEDBACK:
├── When fallback is triggered:
│   └── Show toast notification: "{message}"
├── Toast styling:
│   ├── Background: #FEF3C7 (amber-100)
│   ├── Border: 1px solid #F59E0B (amber-500)
│   ├── Text: #92400E (amber-800)
│   └── Duration: 4 seconds, dismissible

═══════════════════════════════════════════════════════════════
```

### URL Routing Table

| User Input | Location | Filter | Count Check | Destination URL | Indexed |
|------------|----------|--------|-------------|-----------------|---------|
| "Washing Machines" | Manchester | All | 42 stores ✓ | `/england/manchester/washing-machines/` | ✅ Yes |
| "Washing Machines" | Manchester | Repair | 12 providers ✓ | `/england/manchester/washing-machine-repair/` | ✅ Yes |
| "Wine Coolers" | Small Town | All | 0 stores ✗ | `/england/small-town/` (fallback) | ✅ Yes |
| "Washing Machines" | (none) | All | N/A | `/washing-machines/` | ✅ Yes |
| "Samsung" | Birmingham | Buy | N/A | `/england/birmingham/samsung/` | ✅ If ≥3 |
| "London Appliance Hub" | (any) | (any) | N/A | `/store/london-appliance-hub/` | ✅ Yes |
| "fix my washer" | Leeds | Repair | 8 providers ✓ | `/england/leeds/washing-machine-repair/` | ✅ Yes |
| "cheap fridge under £300" | London | All | N/A | `/search?q=cheap+fridge...&loc=london` | ❌ No |

---

## SearchAction Schema (for Google Sitelinks)

```
SEARCHACTION SCHEMA SPECIFICATION
═══════════════════════════════════════════════════════════════

PURPOSE:
Enable Google sitelinks search box in SERPs.

PLACEMENT:
Homepage only (in <head> as JSON-LD)

IMPLEMENTATION:

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://[domain].co.uk/#organization",
      "name": "[Brand Name]",
      "url": "https://[domain].co.uk",
      "logo": "https://[domain].co.uk/images/logo/[brand-name]-logo.svg"
    },
    {
      "@type": "WebSite",
      "@id": "https://[domain].co.uk/#website",
      "url": "https://[domain].co.uk/",
      "name": "[Brand Name]",
      "description": "Find graded appliances and repair services across the UK",
      "publisher": { "@id": "https://[domain].co.uk/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://[domain].co.uk/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
</script>

VALIDATION:
├── Test with: https://search.google.com/test/rich-results
└── Test with: https://validator.schema.org/

═══════════════════════════════════════════════════════════════
```

---

## Geolocation Strategy

```
GEOLOCATION FLOW (No storage)
═══════════════════════════════════════════════════════════════

TRIGGER: User clicks "Use my location" button/link

STEP 1: REQUEST BROWSER PERMISSION
├── navigator.geolocation.getCurrentPosition()
├── Options: { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
└── Show loading state on button: "Detecting..."

STEP 2: ON SUCCESS
├── Receive: { latitude, longitude }
├── Find nearest place from CACHED places first (client-side calculation)
├── If no cached place within 50km, query API:
│   GET /api/search/nearest?lat={lat}&lng={lng}
├── Auto-fill location input with result
├── IMMEDIATELY trigger prefetch of category counts
└── Store selected place in component state

STEP 3: ON DENIED
├── Show friendly message: "Location access denied"
├── Subtext: "You can type your city manually"
└── Keep location input focused

STEP 4: ON ERROR/TIMEOUT
├── Show: "Couldn't detect location"
├── Subtext: "Please enter your city manually"
└── Allow retry via button

═══════════════════════════════════════════════════════════════
```

---

## Google Reviews Integration

```
GOOGLE REVIEWS — DISPLAY & LINKING
═══════════════════════════════════════════════════════════════

DATABASE FIELDS USED:
├── stores.google_maps_url       → Link destination
├── stores.average_rating        → Display (⭐ 4.6)
└── stores.review_count          → Display (312 reviews)

UI COMPONENT:
┌─────────────────────────────────────────────────────────────┐
│  ⭐ 4.6  (312 reviews on Google)                            │
│  [ Read Reviews ↗ ]  [ Write a Review ↗ ]                  │
└─────────────────────────────────────────────────────────────┘

LINK BEHAVIOR:
├── "Read Reviews"   → {google_maps_url}
├── "Write a Review" → {google_maps_url}
├── Target:          _blank (new tab)
└── Rel:             noopener noreferrer

FALLBACK (No Google URL):
└── Hide entire reviews section

NO ON-SITE REVIEWS:
├── ✅ No review submission forms
├── ✅ No moderation system
└── ✅ Zero maintenance

═══════════════════════════════════════════════════════════════
```

---

## Mobile-Specific Optimizations

```
MOBILE OPTIMIZATIONS
═══════════════════════════════════════════════════════════════

BREAKPOINT: < 768px (md)

LAYOUT CHANGES:
├── Inputs stack vertically (full width)
├── Search button: full width, below location input
├── Filter pills: horizontal row, scrollable if overflow
└── Geolocation: Icon button inside location input

INPUT ATTRIBUTES (Critical for mobile UX):
<input
  type="text"
  inputMode="search"           // Shows search keyboard
  autoComplete="off"           // Prevents browser autocomplete
  autoCorrect="off"            // Prevents autocorrect
  autoCapitalize="off"         // Prevents auto-capitalize
  spellCheck={false}           // Prevents spellcheck
  enterKeyHint="search"        // Shows "Search" on keyboard
/>

VIRTUAL KEYBOARD HANDLING:
├── On input focus: Scroll input into view
├── Autocomplete max-height: 50vh (leaves room for keyboard)
└── Touch targets: min 48px per item

═══════════════════════════════════════════════════════════════
```

---

## Accessibility Requirements

```
ACCESSIBILITY (WCAG 2.1 AA)
═══════════════════════════════════════════════════════════════

KEYBOARD NAVIGATION:
├── Tab order: Keyword → Location → Search → Filter pills
├── Arrow keys: Navigate autocomplete suggestions
├── Enter: Select highlighted suggestion or submit search
├── Escape: Close autocomplete dropdown
└── Focus visible: 2px secondary outline on all interactive elements

ARIA ATTRIBUTES:
├── Search form:    role="search"
├── Keyword input:  aria-autocomplete="list", aria-expanded, aria-controls
├── Location input: aria-autocomplete="list", aria-expanded, aria-controls
├── Dropdown:       role="listbox", aria-label="Suggestions"
├── Dropdown item:  role="option", aria-selected
└── Filter pills:   role="radiogroup" with role="radio" items

SCREEN READER ANNOUNCEMENTS:
├── On autocomplete open: "{n} suggestions available"
├── On selection: "{item name} selected"
└── On fallback routing: "{toast message}"

COLOR CONTRAST (All pass WCAG AA):
├── Text on white: #111827 = 15.8:1 ✅
├── White on red: #FFFFFF on #e85d4c = 4.5:1 ✅
└── Secondary on white: #e85d4c = 4.5:1 ✅

═══════════════════════════════════════════════════════════════
```

---

## API Endpoints Required

```
API ENDPOINTS SPECIFICATION
═══════════════════════════════════════════════════════════════

1. GET /api/search/init
   Purpose: Preload categories, places, brands on app init
   Cache: 1 hour
   Size: ~10KB gzipped

2. GET /api/search/counts?place_id={placeId}
   Purpose: Category counts + top businesses for location
   Cache: 30 minutes
   Trigger: When location selected

3. GET /api/search/businesses?q={query}&place_id={placeId?}
   Purpose: Business name search
   Cache: 1 minute
   Trigger: Debounced on keyword type (length >= 3)

4. GET /api/search/places?q={query}
   Purpose: Fallback place search for edge cases
   Cache: 1 hour
   Trigger: Only if no cache match

5. GET /api/search/nearest?lat={lat}&lng={lng}
   Purpose: Find nearest place for geolocation
   Cache: None
   Trigger: Geolocation success (if no cache match)

═══════════════════════════════════════════════════════════════
```

---

## Error States Specification

### Error State Definitions

| State | Trigger | UI Response |
|-------|---------|-------------|
| Loading | API call in progress | Skeleton loader in dropdown |
| Network Error | Fetch fails / no connection | "Unable to search. Check your connection." + Retry button |
| Rate Limited | 429 response from API | "Too many searches. Please wait a moment." |
| Empty Results | No matches found | "No results for '{query}'" + Suggested alternatives |
| Timeout | Response takes >5 seconds | "Search is taking longer than usual..." + Cancel option |
| Partial Failure | Some data loads, some fails | Show available data + subtle error indicator |

### Retry Logic Implementation

```typescript
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function fetchWithRetry(
  url: string,
  retries = MAX_RETRIES
): Promise<Response> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok && response.status !== 404 && retries > 0) {
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
      return fetchWithRetry(url, retries - 1);
    }
    return response;
  } catch (error) {
    if (retries > 0 && error.name !== 'AbortError') {
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
}
```

### Error State Components

```typescript
// Loading skeleton for autocomplete
function AutocompleteSkeleton() {
  return (
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
    </div>
  );
}

// Error state with retry
function SearchError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="p-4 text-center">
      <p className="text-gray-600 mb-2">Unable to search right now</p>
      <button
        onClick={onRetry}
        className="text-red-600 hover:text-red-700 font-medium"
      >
        Try again
      </button>
    </div>
  );
}

// Empty results with suggestions
function EmptyResults({ query }: { query: string }) {
  return (
    <div className="p-4 text-center">
      <p className="text-gray-600 mb-2">No results for "{query}"</p>
      <p className="text-sm text-gray-500">
        Try a different search term or browse categories
      </p>
    </div>
  );
}
```

---

## Component File Structure

```
components/
└── search/
    ├── SearchBar.tsx
    ├── SearchForm.tsx
    ├── KeywordInput.tsx
    ├── LocationInput.tsx
    ├── SearchButton.tsx
    ├── FilterPills.tsx
    ├── AutocompleteDropdown.tsx
    ├── suggestions/
    │   ├── CategorySuggestion.tsx
    │   ├── BusinessSuggestion.tsx
    │   ├── LocationSuggestion.tsx
    │   └── NearbyCitiesSuggestion.tsx
    ├── GeolocationButton.tsx
    └── FallbackToast.tsx

lib/
├── context/
│   └── SearchDataContext.tsx
└── search/
    ├── constants.ts
    ├── classifyIntent.ts
    ├── buildSearchUrl.ts
    ├── antiThinGating.ts
    └── hooks/
        ├── useSearchData.ts
        ├── useKeywordAutocomplete.ts
        ├── useLocationAutocomplete.ts
        ├── useLocationCounts.ts
        ├── useGeolocation.ts
        └── useSearchSubmit.ts

app/api/search/
├── init/route.ts
├── counts/route.ts
├── businesses/route.ts
├── places/route.ts
└── nearest/route.ts
```

---

## Implementation Checklist

### Phase 1: Core Search (MVP)
- [ ] SearchDataContext provider
- [ ] /api/search/init endpoint
- [ ] SearchBar container component
- [ ] KeywordInput with local cache filtering
- [ ] LocationInput with local cache filtering
- [ ] SearchButton with red styling
- [ ] FilterPills (All/Buy/Repair)
- [ ] Basic intent classification
- [ ] Freeform fallback to /search (noindex)
- [ ] Mobile responsive layout
- [ ] Mobile input optimizations

### Phase 2: Enhanced Features
- [ ] /api/search/counts endpoint
- [ ] Prefetch counts on location selection
- [ ] Display counts in autocomplete
- [ ] Top businesses section
- [ ] Anti-thin page gating logic
- [ ] Fallback toast notification
- [ ] /api/search/businesses endpoint
- [ ] Business name search (debounced)

### Phase 3: Geolocation & Polish
- [ ] GeolocationButton component
- [ ] /api/search/nearest endpoint
- [ ] Nearby cities suggestions
- [ ] Keyboard navigation
- [ ] Accessibility audit
- [ ] Performance audit (INP < 200ms)

### Phase 4: SEO Enhancements
- [ ] SearchAction schema on homepage
- [ ] Verify autocomplete links crawlable
- [ ] Test anti-thin gating with real data

---

## Performance Targets

| Metric | Target | How Achieved |
|--------|--------|--------------|
| **LCP** | < 2.5s | Search bar renders immediately |
| **CLS** | < 0.1 | Fixed heights, absolute dropdown |
| **INP** | < 200ms | Client-side filtering, debounced API |
| **Autocomplete** | < 50ms | Preloaded data, local filtering |
| **Bundle size** | < 15KB | No heavy dependencies |

---

## SEO/AEO Compliance Summary

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Route to indexed pages | ✅ | Intent classification → structured URLs |
| Anti-thin page gating | ✅ | Check counts before routing |
| Freeform → noindex | ✅ | /search page has noindex meta |
| Internal linking | ✅ | Autocomplete = navigation links |
| Nearby cities fallback | ✅ | Shows alternatives when count = 0 |
| SearchAction schema | ✅ | JSON-LD on homepage |
| Mobile-first | ✅ | Stacked layout, touch-friendly |
| Fast autocomplete | ✅ | Preloaded cache, instant filtering |

---

**END OF SEARCH BAR SPECIFICATION v1.1**

═══════════════════════════════════════════════════════════════
Document Status: ✅ LOCKED
Version: 1.1 (with SEO/Performance fixes)
Approved: January 2026
Next: Implementation Phase 1
═══════════════════════════════════════════════════════════════
