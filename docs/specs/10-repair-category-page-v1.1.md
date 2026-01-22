# Repair Category Page Specification

**Version:** 1.1 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED  
**Amendment:** v1.1 adds Data-Driven Narrative System to prevent doorway page penalties

---

## Executive Summary

The Repair Category Page is the **canonical ranking target** for appliance repair keywords in a specific city. This is where programmatic SEO generates organic traffic at scale.

### URL Pattern

```
/{country}/{city}/{category}-repair/

Examples:
├── /england/manchester/washing-machine-repair/
├── /england/birmingham/fridge-freezer-repair/
├── /england/leeds/dishwasher-repair/
└── /england/london/tumble-dryer-repair/
```

### Strategic Importance

| Factor | Value |
|--------|-------|
| **SEO Priority** | ⭐⭐⭐ Highest — Primary ranking target |
| **Keyword Volume** | High — Problem-driven, urgent queries |
| **User Intent** | Urgent — Appliance broken, needs fix |
| **Conversion** | High — Call-to-action focused |
| **AI Citation** | Strong — Structured, answer-first |
| **Data-Driven Narrative** | Unique intro text per city+category (v1.1) |

### Keywords This Page Ranks For

```
KEYWORD TARGETS — REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

SHORT-TAIL (highest volume):
├── "washing machine repair manchester"
├── "fridge freezer repair birmingham"
├── "dishwasher repair leeds"

LONG-TAIL (high intent):
├── "same day washing machine repair manchester"
├── "emergency fridge freezer repair near me"
├── "no fix no fee dishwasher repair birmingham"

PROBLEM-BASED (AI search):
├── "washing machine not spinning manchester"
├── "fridge not cooling birmingham"
├── "dishwasher not draining leeds"

BRAND-SPECIFIC (high trust):
├── "bosch washing machine repair manchester"
├── "samsung fridge repair birmingham"

COMMERCIAL URGENCY:
├── "24/7 appliance repair manchester"
├── "cheap washing machine repair near me"
├── "local appliance engineer birmingham"

═══════════════════════════════════════════════════════════════
```

### Page Connections

```
PAGE CONNECTION MAP
═══════════════════════════════════════════════════════════════

INBOUND LINKS (from):
─────────────────────────────────────────────────────────────────
City Hub (/england/manchester/)
├── "See all 15 washing machine repair engineers →"
├── Repair section preview cards

Provider Cards (on any page)
├── "Appliances We Repair" section
├── "✓ Washing Machine Repair" → this page

Provider Profile (/provider/{slug}/)
├── Breadcrumb: Manchester > Washing Machine Repair
├── Category badges

National Repair Page (/washing-machine-repair/)
├── "Washing Machine Repair in Manchester"

Search Results
├── Category filter results

OUTBOUND LINKS (to):
─────────────────────────────────────────────────────────────────
Provider Profile (/provider/{slug}/)
├── "View Full Profile" buttons
├── Provider name links

City Hub (/england/manchester/)
├── Breadcrumb
├── "Browse all appliance services"

Retail Category (/england/manchester/washing-machines/)
├── Cross-sell: "Time for a new one?"

Brand Repair (/england/manchester/bosch-repair/)
├── Brand specialists section

Guides (/guides/{issue}/)
├── "Washing machine not spinning" → guide
├── Common issues links

Parts Affiliate (eSpares)
├── "Fix it yourself" section

Other Repair Categories
├── "Also need fridge repair? →"

Nearby Cities
├── "Washing machine repair in Liverpool →"

═══════════════════════════════════════════════════════════════
```

---

## URL & Routing Architecture

### URL Construction Logic

```
URL CONSTRUCTION — REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

PATTERN:
/{country.slug}/{place.slug}/{category.slug}-repair/

SLUG TRANSFORMATION:
category.slug "washing-machines" → "washing-machine-repair"
category.slug "fridge-freezers" → "fridge-freezer-repair"
category.slug "dishwashers"     → "dishwasher-repair"

TRANSFORMATION RULE:
1. Take category.slug (e.g., "washing-machines")
2. Remove trailing 's' if plural (→ "washing-machine")
3. Append "-repair" (→ "washing-machine-repair")

EXCEPTION HANDLING:
├── "hobs" → "hob-repair" (not "hob-repair")
├── "cookers" → "cooker-repair"
├── "built-in-ovens" → "oven-repair" (use name_singular for URL)

RECOMMENDED: Store repair_slug in appliance_categories table
Or compute: CONCAT(name_singular.slugified, '-repair')

═══════════════════════════════════════════════════════════════
```

### Next.js Dynamic Route

```
NEXT.JS ROUTING
═══════════════════════════════════════════════════════════════

FILE STRUCTURE:
app/
├── [country]/
│   └── [city]/
│       └── [categoryRepair]/
│           └── page.tsx

ROUTE MATCHING:
/england/manchester/washing-machine-repair/
├── country = "england"
├── city = "manchester"
├── categoryRepair = "washing-machine-repair"

PAGE COMPONENT:
// app/[country]/[city]/[categoryRepair]/page.tsx

interface RepairCategoryPageParams {
  params: {
    country: string;
    city: string;
    categoryRepair: string;  // e.g., "washing-machine-repair"
  };
}

SLUG PARSING:
// Extract category slug from repair URL
const categorySlug = params.categoryRepair.replace('-repair', '');
// "washing-machine-repair" → "washing-machine"
// Then match to category where name_singular slug matches

═══════════════════════════════════════════════════════════════
```

### Canonical URL Rules

```
CANONICAL URL RULES
═══════════════════════════════════════════════════════════════

CANONICAL:
https://ukgradedappliances.com/england/manchester/washing-machine-repair/

REDIRECTS:
/england/manchester/washing-machine-repair  → 301 → /england/manchester/washing-machine-repair/
/manchester/washing-machine-repair/         → 301 → /england/manchester/washing-machine-repair/
/England/Manchester/washing-machine-repair/ → 301 → /england/manchester/washing-machine-repair/

ALTERNATE PATTERNS (301 redirect to canonical):
/england/manchester/washing-machines-repair/ → canonical (common typo)
/england/manchester/wash-machine-repair/     → canonical (abbreviation)

TRAILING SLASH:
Always enforce trailing slash for directory-style URLs.

═══════════════════════════════════════════════════════════════
```

---

## Data Sources & Schema

### Database Tables Used

```
DATA SOURCES — REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

PRIMARY TABLES:
─────────────────────────────────────────────────────────────────

1. appliance_categories
   Fields used:
   ├── id, slug, name, name_plural, name_singular
   ├── tier (for ordering related categories)
   ├── icon (for visual display)
   ├── repair_seo_title_template
   ├── repair_h1_template
   ├── repair_intro_template
   ├── common_issues (TEXT[] — problem-based queries)
   ├── avg_repair_cost_min, avg_repair_cost_max
   ├── avg_lifespan_years
   ├── supports_repair (must be true)
   ├── min_providers_for_index

2. places
   Fields used:
   ├── id, slug, name
   ├── country_id (for URL construction)
   ├── admin_area_id (for nearby cities)
   ├── nearby_places (TEXT[] — predefined nearby cities)
   ├── provider_count (total providers, not per-category)
   ├── latitude, longitude (for distance calculation)
   └── faq_json (may contain repair FAQs)

3. service_providers
   Fields used:
   ├── All fields (full provider data for cards)
   └── Filtered by: is_active = true, status IN ('active','claimed','verified')

JUNCTION TABLES:
─────────────────────────────────────────────────────────────────

4. provider_services
   Purpose: Links providers to appliance categories
   Fields:
   ├── provider_id
   ├── appliance_category_id
   ├── is_active
   ├── offers_same_day (override)
   ├── callout_fee_min, callout_fee_max (override)
   └── repair_warranty_months (override)

5. provider_coverage_places
   Purpose: Links providers to service areas
   Fields:
   ├── provider_id
   ├── place_id
   ├── is_primary
   ├── additional_callout_fee
   └── same_day_available

6. provider_brand_authorisations
   Purpose: Brand-specific repair authority
   Fields:
   ├── provider_id
   ├── brand_id
   └── is_verified

AGGREGATION TABLES:
─────────────────────────────────────────────────────────────────

7. page_indexability
   Purpose: Anti-thin page gating
   Fields:
   ├── page_type = 'repair_category'
   ├── place_id
   ├── category_id
   ├── provider_count
   ├── min_providers_required
   └── is_repair_indexable (computed)

═══════════════════════════════════════════════════════════════
```

### Primary Data Query

```sql
MAIN QUERY — PROVIDERS FOR REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

-- Get providers for a specific category in a specific city
-- This query powers the Provider Card listings

SELECT 
  sp.*,
  
  -- Category-specific overrides from provider_services
  ps.offers_same_day AS category_same_day,
  ps.callout_fee_min AS category_callout_min,
  ps.callout_fee_max AS category_callout_max,
  ps.repair_warranty_months AS category_warranty,
  
  -- Coverage-specific data
  pcp.additional_callout_fee,
  pcp.same_day_available AS coverage_same_day,
  
  -- Aggregated relations (for Provider Card)
  (
    SELECT json_agg(json_build_object(
      'id', ac.id,
      'name', ac.name,
      'name_singular', ac.name_singular,
      'slug', ac.slug,
      'tier', ac.tier
    ))
    FROM provider_services ps2
    JOIN appliance_categories ac ON ps2.appliance_category_id = ac.id
    WHERE ps2.provider_id = sp.id AND ps2.is_active = true
  ) AS repair_categories,
  
  (
    SELECT json_agg(json_build_object(
      'brand_id', b.id,
      'brand_name', b.name,
      'brand_slug', b.slug,
      'is_verified', pba.is_verified
    ))
    FROM provider_brand_authorisations pba
    JOIN brands b ON pba.brand_id = b.id
    WHERE pba.provider_id = sp.id
  ) AS authorized_brands

FROM service_providers sp

-- Must service this category
JOIN provider_services ps 
  ON ps.provider_id = sp.id 
  AND ps.appliance_category_id = :category_id
  AND ps.is_active = true

-- Must cover this city
JOIN provider_coverage_places pcp 
  ON pcp.provider_id = sp.id 
  AND pcp.place_id = :place_id

WHERE 
  sp.is_active = true
  AND sp.status IN ('active', 'claimed', 'verified')

ORDER BY 
  sp.is_featured DESC,
  sp.is_verified DESC,
  sp.average_rating DESC NULLS LAST,
  sp.provider_score DESC

LIMIT :limit
OFFSET :offset;

═══════════════════════════════════════════════════════════════
```

---

## Anti-Thin Page Logic

```
ANTI-THIN PAGE GATING
═══════════════════════════════════════════════════════════════

This page implements Google's quality guidelines by preventing
thin content from being indexed. Thin = fewer than 2 providers.

THRESHOLD:
min_providers_for_index = 2 (configurable per category)

CHECK LOGIC:
─────────────────────────────────────────────────────────────────

// lib/pages/checkRepairCategoryIndexability.ts
export async function checkRepairCategoryIndexability(
  placeId: string,
  categoryId: string
): Promise<{
  isIndexable: boolean;
  providerCount: number;
  minRequired: number;
  fallbackAction: 'show' | 'redirect' | 'noindex';
}> {
  const { data } = await supabase
    .from('page_indexability')
    .select('provider_count, min_providers_required, is_repair_indexable')
    .eq('place_id', placeId)
    .eq('category_id', categoryId)
    .eq('page_type', 'repair_category')
    .single();
  
  if (!data) {
    // No record = count providers directly
    const { count } = await supabase
      .from('provider_services')
      .select('*', { count: 'exact', head: true })
      .eq('appliance_category_id', categoryId)
      .eq('is_active', true)
      .in('provider_id', 
        supabase
          .from('provider_coverage_places')
          .select('provider_id')
          .eq('place_id', placeId)
      );
    
    return {
      isIndexable: (count || 0) >= 2,
      providerCount: count || 0,
      minRequired: 2,
      fallbackAction: (count || 0) >= 2 ? 'show' : 'redirect',
    };
  }
  
  return {
    isIndexable: data.is_repair_indexable,
    providerCount: data.provider_count,
    minRequired: data.min_providers_required,
    fallbackAction: data.is_repair_indexable ? 'show' : 'redirect',
  };
}

BEHAVIOR MATRIX:
─────────────────────────────────────────────────────────────────

Provider Count | Action         | SEO Impact
─────────────────────────────────────────────────────────────────
0 providers    | 302 redirect   | Redirect to city hub #repairs
1 provider     | noindex        | Show page but noindex
2+ providers   | index          | Full page, canonical, index
─────────────────────────────────────────────────────────────────

REDIRECT TARGET:
0 providers → /england/manchester/#repairs (city hub with anchor)

NOINDEX IMPLEMENTATION:
// In page metadata
export const metadata = {
  robots: providerCount < 2 ? 'noindex, follow' : 'index, follow',
  // ...
};

FALLBACK CONTENT (1 provider):
Show the single provider with message:
"Looking for more options? Check nearby cities or contact us 
to add your business."

═══════════════════════════════════════════════════════════════
```

---

## Page Architecture

### Section Overview

```
PAGE SECTIONS — REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│  NAVBAR (Standard with Search Bar - Spec 02)                │
│  [Logo] [Search Bar] [For Business ▼] [Login]               │
├─────────────────────────────────────────────────────────────┤
│  1. BREADCRUMB                                              │
│     Home > England > Manchester > Washing Machine Repair    │
├─────────────────────────────────────────────────────────────┤
│  2. HERO / H1                                               │
│     Washing Machine Repair in Manchester                    │
│     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                       │
├─────────────────────────────────────────────────────────────┤
│  3. INTRO PARAGRAPH                                         │
│     Compare 15 washing machine repair engineers in...       │
├─────────────────────────────────────────────────────────────┤
│  4. QUICK STATS BAR                                         │
│     15 Engineers | From £45 | 8 Same-day | 4.7★ Avg        │
├─────────────────────────────────────────────────────────────┤
│  5. FILTER / SORT CONTROLS                                  │
│     [Same-day ▼] [No Fix No Fee ▼] [Brand ▼] Sort: Rating ▼│
├─────────────────────────────────────────────────────────────┤
│  6. PROVIDER LISTINGS                                       │
│     [Provider Card - Full variant]                          │
│     [Provider Card - Full variant]                          │
│     [Provider Card - Full variant]                          │
│     ...                                                     │
├─────────────────────────────────────────────────────────────┤
│  7. PAGINATION / LOAD MORE                                  │
│     [Load More] or [1] [2] [3] ... [8]                     │
├─────────────────────────────────────────────────────────────┤
│  8. COMMON ISSUES SECTION                                   │
│     Common Washing Machine Problems We Fix                  │
│     • Machine not spinning • Not draining • Door won't open│
├─────────────────────────────────────────────────────────────┤
│  9. AVERAGE REPAIR COSTS                                    │
│     What Does Washing Machine Repair Cost in Manchester?    │
│     Typical: £65-£150 | Most common: Drum bearing £90-£130 │
├─────────────────────────────────────────────────────────────┤
│  10. BRAND SPECIALISTS                                      │
│     Looking for brand-specific repair?                      │
│     [Bosch] [Samsung] [LG] [Hotpoint] [Miele]              │
├─────────────────────────────────────────────────────────────┤
│  11. PARTS AFFILIATE                                        │
│     🔧 Prefer to fix it yourself?                          │
│     [Order Washing Machine Parts from eSpares →]           │
├─────────────────────────────────────────────────────────────┤
│  12. CROSS-SELL TO RETAIL                                   │
│     🛒 Appliance beyond repair?                             │
│     [Browse Graded Washing Machines from £149 →]           │
├─────────────────────────────────────────────────────────────┤
│  13. OTHER REPAIR CATEGORIES                                │
│     Also need repair in Manchester?                         │
│     [Fridge Freezer] [Dishwasher] [Tumble Dryer] [Oven]   │
├─────────────────────────────────────────────────────────────┤
│  14. NEARBY CITIES                                          │
│     Washing Machine Repair in Nearby Cities                 │
│     [Liverpool - 35mi] [Leeds - 40mi] [Sheffield - 38mi]   │
├─────────────────────────────────────────────────────────────┤
│  15. FAQS                                                   │
│     Frequently Asked Questions                              │
│     ▼ How much does washing machine repair cost?           │
│     ▼ Can I get same-day repair?                           │
│     ▼ Is it worth repairing my washing machine?            │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### Mobile Layout

```
MOBILE LAYOUT — REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

MOBILE DIFFERENCES:
─────────────────────────────────────────────────────────────────

1. BREADCRUMB
   ├── Truncated: ... > Manchester > Washing Machine Repair
   ├── Horizontal scroll if too long

2. HERO
   ├── H1 font-size: 24px (vs 32px desktop)
   ├── Full width

3. QUICK STATS BAR
   ├── 2x2 grid instead of row
   ├── Or horizontal scroll

4. FILTERS
   ├── Collapsed into "Filters" button
   ├── Opens bottom sheet/modal
   ├── Sort visible, filters hidden

5. PROVIDER CARDS
   ├── Full-width, stacked
   ├── Provider Card mobile variant

6. STICKY CTA (MOBILE ONLY)
   ├── Fixed bottom bar with "📞 Call Top-Rated Engineer"
   ├── Calls first featured/highest-rated provider
   ├── Shows on scroll after first card

7. LOAD MORE
   ├── Full-width button
   ├── "Show 10 more engineers"

8. CONTENT SECTIONS
   ├── Collapsible accordions for:
   │   ├── Common Issues
   │   ├── Repair Costs
   │   ├── Brand Specialists
   │   ├── FAQs

9. NEARBY CITIES
   ├── Horizontal scroll pills

STICKY MOBILE CTA:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│  📞 CALL TOP-RATED ENGINEER                    ⭐ 4.9       │
└─────────────────────────────────────────────────────────────┘

Shows when:
├── User scrolls past first Provider Card
├── At least one provider exists

Links to:
├── tel:{first_featured_or_highest_rated_provider.phone}

Tracks:
├── click_events (call_click)
├── source: 'sticky_mobile_cta'

═══════════════════════════════════════════════════════════════
```

---

## Section Specifications

### Section 1: Breadcrumb

```
BREADCRUMB — NAVIGATION + SEO
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

Desktop:
Home > England > Manchester > Washing Machine Repair

Mobile:
... > Manchester > Washing Machine Repair

STRUCTURE:
─────────────────────────────────────────────────────────────────

[
  { name: "Home", url: "/" },
  { name: "England", url: "/england/" },
  { name: "Manchester", url: "/england/manchester/" },
  { name: "Washing Machine Repair", url: null }  // Current page
]

SCHEMA.ORG:
─────────────────────────────────────────────────────────────────

{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ukgradedappliances.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "England",
      "item": "https://ukgradedappliances.com/england/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Manchester",
      "item": "https://ukgradedappliances.com/england/manchester/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Washing Machine Repair in Manchester"
    }
  ]
}

STYLING:
─────────────────────────────────────────────────────────────────
├── Font size:      14px
├── Color:          #6B7280 (grey-500)
├── Link color:     #2563eb (secondary)
├── Separator:      " > " or "›"
├── Current page:   Not a link, #374151 (grey-700)

═══════════════════════════════════════════════════════════════
```

### Section 2: Hero / H1

```
HERO / H1 — PRIMARY HEADING
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 WASHING MACHINE REPAIR IN MANCHESTER                   │
│  ════════════════════════════════════════                   │
│                                                             │
│  Compare trusted local engineers for fast, reliable repairs │
│                                                             │
└─────────────────────────────────────────────────────────────┘

H1 SOURCE:
─────────────────────────────────────────────────────────────────
FROM: appliance_categories.repair_h1_template
Template: "{name_singular} Repair in {location}"
Result: "Washing Machine Repair in Manchester"

SUBHEADLINE:
─────────────────────────────────────────────────────────────────
Static or from repair_intro_template (first sentence)
"Compare trusted local engineers for fast, reliable repairs"

STYLING:
─────────────────────────────────────────────────────────────────
H1:
├── Font size:      32px (desktop), 24px (mobile)
├── Font weight:    800
├── Color:          #2563eb (secondary)
├── Line height:    1.2
├── Icon:           🔧 (category.icon or default wrench)

Subheadline:
├── Font size:      18px (desktop), 16px (mobile)
├── Font weight:    400
├── Color:          #4B5563 (grey-600)
├── Margin top:     8px

Container:
├── Padding:        32px 0 24px
├── Border bottom:  1px solid #E5E7EB

═══════════════════════════════════════════════════════════════
```

### Section 3: Intro Paragraph (Enhanced v1.1)

```
INTRO PARAGRAPH — AI-EXTRACTABLE CONTENT
═══════════════════════════════════════════════════════════════

PURPOSE:
This paragraph is designed to be extracted by AI assistants.
It provides a concise answer to "where can I find {category} 
repair in {city}?"

v1.1 ENHANCEMENT:
─────────────────────────────────────────────────────────────────
Use the Data-Driven Narrative System (getRepairNarrative) to 
generate unique, data-rich intro paragraphs that:
• Prevent doorway page penalties
• Include local market data (pricing, ratings, certifications)
• Cross-sell to retail when appropriate
• Support 5 template variations

VISUAL (with Narrative v1.1):
─────────────────────────────────────────────────────────────────

12 engineers offer washing machine repair in Manchester. 
Callout fees range from £45 to £85. Leeds Appliance Repairs 
leads with 4.9 stars and 15 years experience. 8 offer 
same-day service, 4 are manufacturer certified for Samsung, 
Bosch, and Miele.

VISUAL (Legacy/Fallback):
─────────────────────────────────────────────────────────────────

Compare 15 washing machine repair engineers in Manchester. 
Our directory features verified local engineers offering 
same-day callouts, no fix no fee policies, and warranties 
on all repairs. Average callout fee from £45. Find Bosch, 
Samsung, LG and all-brand specialists.

TEMPLATE (from repair_intro_template or generated):
─────────────────────────────────────────────────────────────────

"Compare {provider_count} {category_singular} repair engineers 
in {city_name}. Our directory features verified local engineers 
offering same-day callouts, no fix no fee policies, and 
warranties on all repairs. Average callout fee from £{avg_callout}. 
Find {top_brands} and all-brand specialists."

DYNAMIC VALUES:
├── provider_count:  COUNT from query
├── category_singular: appliance_categories.name_singular
├── city_name:       places.name
├── avg_callout:     AVG(callout_fee_from) or category default
├── top_brands:      Top 3 brands with authorized providers

STYLING:
─────────────────────────────────────────────────────────────────
├── Font size:      16px
├── Line height:    1.6
├── Color:          #374151 (grey-700)
├── Max width:      720px
├── Margin:         16px 0 24px

SEO NOTE:
─────────────────────────────────────────────────────────────────
This paragraph MUST contain:
├── Primary keyword: "{category} repair {city}"
├── Secondary keywords: "same-day", "local", "engineers"
├── Entity mentions: Brand names
├── Location: City name

AI systems extract this for featured snippets and citations.

═══════════════════════════════════════════════════════════════
```

### Section 3.1: Data-Driven Narrative System (v1.1)

```
DATA-DRIVEN NARRATIVE SYSTEM — REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

PURPOSE:
─────────────────────────────────────────────────────────────────
├── Prevent "Doorway Page" / "Thin Content" Google penalties
├── Create UNIQUE text for every city + repair category
├── Use live database aggregations for accuracy
├── Cross-sell to retail stores when appropriate
└── Support AEO (AI Engine Optimization)

IMPLEMENTATION:
─────────────────────────────────────────────────────────────────
├── Import: import { getRepairNarrative } from '@/lib/seo/narratives'
├── Call: const narrative = await getRepairNarrative(citySlug, categorySlug)
├── Returns: { introParagraph, metaSummary, keyFacts, dataQualityScore }

TEMPLATE VARIATIONS (5 total):
─────────────────────────────────────────────────────────────────
├── Template 1: Provider count + pricing + top rated
├── Template 2: Urgency focus (same-day, emergency)
├── Template 3: Certifications + brands
├── Template 4: Price + replacement cross-sell
└── Template 5: Local coverage + experience

EXAMPLE OUTPUTS:
─────────────────────────────────────────────────────────────────

Manchester (Template 1):
"12 engineers offer washing machine repair in Manchester. 
Callout fees range from £45 to £85. Manchester Appliance 
Repairs leads with 4.9 stars from 156 reviews. 8 offer 
same-day service."

Leeds (Template 2):
"Need urgent washing machine repair in Leeds? 15 local 
engineers available, 10 offering same-day service. 
Callout fees from £45. 4 handle emergency callouts."

Birmingham (Template 3):
"Compare 18 certified washing machine repair engineers in 
Birmingham. 6 certified for Samsung, Bosch, and Miele. 
14 provide 6-month repair warranties."

Liverpool (Template 4):
"Washing machine repair in Liverpool starts from £50. 
8 engineers available. If repair costs exceed value, 
graded replacements start from £189 at 5 local stores."

DATA POINTS AGGREGATED:
─────────────────────────────────────────────────────────────────
├── providerCount:               COUNT providers for this category
├── calloutFeeMin:               MIN(callout_fee_from)
├── calloutFeeMax:               MAX(callout_fee_to)
├── calloutFeeAverage:           AVG(callout_fee_from)
├── topRatedProvider:            ORDER BY average_rating DESC LIMIT 1
├── yearsExperience:             provider.years_experience
├── providersWithSameDay:        COUNT WHERE offers_same_day
├── providersWithEmergency:      COUNT WHERE offers_emergency
├── providersWithWarranty:       COUNT WHERE warranty_months > 0
├── providersWithGasSafe:        COUNT WHERE is_gas_safe_registered
├── providersWithManufacturerCert: COUNT with brand authorisations
├── certifiedBrands:             Brand names from authorisations
├── retailStoreCount:            COUNT stores with this category (cross-sell)
├── avgNewAppliancePrice:        AVG store_categories.price_min (cross-sell)

INTEGRATION IN PAGE:
─────────────────────────────────────────────────────────────────

// In page.tsx
import { getRepairNarrative } from '@/lib/seo/narratives';

export default async function RepairCategoryPage({ params }: Props) {
  // ... existing data fetching ...
  
  // Fetch narrative
  const narrative = await getRepairNarrative(params.city, params.category);
  
  return (
    <section className="mb-8">
      <h1>🔧 {category.name_singular} Repair in {place.name}</h1>
      
      {/* DATA-DRIVEN NARRATIVE */}
      {narrative?.introParagraph ? (
        <div className="prose prose-lg max-w-none mb-6">
          <p className="text-gray-700 text-base leading-relaxed">
            {narrative.introParagraph}
          </p>
        </div>
      ) : (
        <p className="text-gray-700 text-base mb-6">
          Compare {providers.length} {category.name_singular.toLowerCase()} 
          repair engineers in {place.name}...
        </p>
      )}
      
      {/* KEY FACTS PILLS */}
      {narrative?.keyFacts && narrative.keyFacts.length > 0 && (
        <div className="flex flex-wrap gap-2 text-sm mb-6">
          {narrative.keyFacts.slice(0, 4).map((fact, i) => (
            <span 
              key={i}
              className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full"
            >
              {fact}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

META DESCRIPTION USAGE:
─────────────────────────────────────────────────────────────────

const description = narrative?.metaSummary ||
  `Find ${providers.length} ${category.name_singular.toLowerCase()} repair 
   engineers in ${place.name}. Same-day callouts available.`;

RETAIL CROSS-SELL ENHANCEMENT:
─────────────────────────────────────────────────────────────────
Use narrative data for smarter cross-sell:

{narrative?.hasRetailStores && narrative.avgNewAppliancePrice && (
  <CrossSellToRetail
    message={`If repair costs exceed value, graded replacements 
              start from £${narrative.avgNewAppliancePrice} at 
              ${narrative.retailStoreCount} local stores.`}
    link={`/${params.country}/${params.city}/${category.slug}/`}
  />
)}

SEO IMPACT:
─────────────────────────────────────────────────────────────────
| Metric                  | Before         | After (v1.1)    |
|-------------------------|----------------|-----------------|
| Unique text per page    | ~60 words      | ~80-120 words   |
| Content uniqueness      | 15-25%         | 70-90%          |
| Doorway page risk       | HIGH           | LOW             |
| Certification mentions  | Generic        | Specific counts |
| Cross-sell intelligence | None           | Data-driven     |

═══════════════════════════════════════════════════════════════
```

### Section 4: Quick Stats Bar

```
QUICK STATS BAR — AT-A-GLANCE METRICS
═══════════════════════════════════════════════════════════════

PURPOSE:
Provides scannable trust signals and key metrics.
Addresses common questions immediately.

VISUAL (Desktop):
─────────────────────────────────────────────────────────────────

┌────────────────┬────────────────┬────────────────┬────────────────┐
│  👷 15         │  💰 From £45   │  ⚡ 8 Same-day │  ⭐ 4.7 Avg    │
│  Engineers     │  Callout       │  Available     │  Rating        │
└────────────────┴────────────────┴────────────────┴────────────────┘

VISUAL (Mobile):
─────────────────────────────────────────────────────────────────

┌────────────────┬────────────────┐
│  👷 15         │  💰 From £45   │
│  Engineers     │  Callout       │
├────────────────┼────────────────┤
│  ⚡ 8 Same-day │  ⭐ 4.7 Avg    │
│  Available     │  Rating        │
└────────────────┴────────────────┘

METRICS:
─────────────────────────────────────────────────────────────────

1. PROVIDER COUNT
   Value:  COUNT(*) from main query
   Label:  "Engineers" or "Repair Specialists"
   Icon:   👷 or 🔧

2. MINIMUM CALLOUT FEE
   Value:  MIN(callout_fee_from) from providers
   Label:  "From £{value} Callout"
   Icon:   💰
   Fallback: "Prices vary" if all null

3. SAME-DAY COUNT
   Value:  COUNT(*) WHERE offers_same_day = true
   Label:  "{count} Same-day Available"
   Icon:   ⚡
   Hide if: count = 0

4. AVERAGE RATING
   Value:  AVG(average_rating) WHERE average_rating IS NOT NULL
   Label:  "{value} Avg Rating"
   Icon:   ⭐
   Format: 1 decimal place (4.7)
   Hide if: No ratings available

STYLING:
─────────────────────────────────────────────────────────────────
Container:
├── Background:     #F9FAFB (grey-50)
├── Border:         1px solid #E5E7EB
├── Border radius:  8px
├── Padding:        16px 24px
├── Margin:         24px 0

Stat Item:
├── Font size:      24px (value), 13px (label)
├── Font weight:    700 (value), 500 (label)
├── Color:          #2563eb (value), #6B7280 (label)

═══════════════════════════════════════════════════════════════
```

### Section 5: Filter / Sort Controls

```
FILTER & SORT — USER CONTROLS
═══════════════════════════════════════════════════════════════

PURPOSE:
Allow users to narrow down providers based on their needs.
Urgency-focused filters prioritized.

VISUAL (Desktop):
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  FILTER BY:                                                     │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ ⚡ Same-day   │ │ ✓ No Fix No │ │ 🛡️ Gas Safe  │            │
│  │    ☑         │ │   Fee ☐     │ │    ☐         │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────────────────────┐    │
│  │ Brand: All    ▼  │  │ Sort by: Top Rated ▼             │    │
│  └──────────────────┘  └──────────────────────────────────┘    │
│                                                                 │
│  Showing 15 engineers                    [Clear Filters]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

VISUAL (Mobile):
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────┐
│  ┌────────────────────┐  ┌────────────────────┐                │
│  │ 🔽 Filters (3)     │  │ Sort: Top Rated ▼  │                │
│  └────────────────────┘  └────────────────────┘                │
└─────────────────────────────────────────────────────────────────┘

→ "Filters" opens bottom sheet with all options

FILTER OPTIONS:
─────────────────────────────────────────────────────────────────

URGENCY FILTERS (checkboxes):
├── ⚡ Same-day Available
│   Query: offers_same_day = true OR ps.offers_same_day = true
│
├── 🚨 Emergency / 24-7
│   Query: offers_emergency = true
│
├── 📅 Weekend Available
│   Query: offers_weekend = true

TRUST FILTERS (checkboxes):
├── ✓ No Fix No Fee
│   Query: no_fix_no_fee = true
│
├── 🛡️ Gas Safe Registered
│   Query: gas_safe_registered = true
│   Note: Only show if category requires gas (ovens, cookers, hobs)
│
├── ✓ Verified Engineer
│   Query: is_verified = true
│
├── 📋 Warranty on Repairs
│   Query: warranty_on_repairs_months >= 3

BRAND FILTER (dropdown):
├── Options: All Brands, Bosch, Samsung, LG, Hotpoint, etc.
│   Query: JOIN provider_brand_authorisations WHERE brand_id = X
│   Source: Brands with at least 1 authorized provider in this city/category

SORT OPTIONS (dropdown):
├── Top Rated (default)
│   ORDER BY: average_rating DESC NULLS LAST, review_count DESC
│
├── Most Reviews
│   ORDER BY: review_count DESC
│
├── Lowest Callout Fee
│   ORDER BY: callout_fee_from ASC NULLS LAST
│
├── Featured First
│   ORDER BY: is_featured DESC, provider_score DESC

URL STATE:
─────────────────────────────────────────────────────────────────
Filters are reflected in URL for shareability and SEO:

/england/manchester/washing-machine-repair/?same-day=true&sort=rating
/england/manchester/washing-machine-repair/?brand=bosch&verified=true

Note: Filtered pages use canonical to unfiltered version.

IMPLEMENTATION:
─────────────────────────────────────────────────────────────────
├── Use URL search params for state
├── Client-side filtering for small lists (<50)
├── Server-side for large lists (>50)
├── Debounce filter changes (300ms)
├── Show "Showing X of Y engineers"
├── Persist filters in sessionStorage (optional)

═══════════════════════════════════════════════════════════════
```

### Section 6: Provider Listings

```
PROVIDER LISTINGS — MAIN CONTENT
═══════════════════════════════════════════════════════════════

This section displays Provider Cards (from spec 09) in their
full variant.

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Provider Card - Full variant - Featured]                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Provider Card - Full variant]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Provider Card - Full variant]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘

...

PROVIDER CARD PROPS (from this page context):
─────────────────────────────────────────────────────────────────

<ProviderCard
  provider={provider}
  variant="full"
  pageContext={{
    pagePath: `/england/manchester/washing-machine-repair/`,
    pageType: 'repair_category',
    placeId: place.id,
    categoryId: category.id,
    categorySlug: 'washing-machines',
    citySlug: 'manchester',
    countrySlug: 'england',
  }}
  showRepairCategories={true}
  showBrandAuths={true}
  showPricing={true}
  showCertifications={true}
  showPartsAffiliate={true}
  showCrossSellRetail={true}
  storeCount={storeCount}  // For cross-sell logic
/>

SORT ORDER:
─────────────────────────────────────────────────────────────────
1. Featured providers first (is_featured = true)
2. Verified providers (is_verified = true)
3. By average_rating DESC
4. By provider_score DESC

SCHEMA.ORG (ItemList):
─────────────────────────────────────────────────────────────────

{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Washing Machine Repair Engineers in Manchester",
  "numberOfItems": 15,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Midlands Appliance Repairs",
        "url": "https://ukgradedappliances.com/provider/midlands-appliance-repairs/",
        "telephone": "0121-XXX-XXXX",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127"
        }
      }
    },
    // ... more providers
  ]
}

EMPTY STATE:
─────────────────────────────────────────────────────────────────
If filters result in 0 providers:

"No engineers match your current filters.
[Clear Filters] or try [expanding to nearby cities]."

═══════════════════════════════════════════════════════════════
```

### Section 7: Pagination

```
PAGINATION / LOAD MORE
═══════════════════════════════════════════════════════════════

STRATEGY:
For this page, we recommend "Load More" over traditional 
pagination because:
├── Better mobile UX
├── Lower cognitive load
├── Users on repair pages want options quickly
├── SEO: All content on one URL (canonical)

VISUAL (Load More):
─────────────────────────────────────────────────────────────────

Showing 10 of 15 engineers

┌─────────────────────────────────────────────────────────────┐
│              SHOW 5 MORE ENGINEERS                         │
└─────────────────────────────────────────────────────────────┘

VISUAL (Traditional Pagination - alternative):
─────────────────────────────────────────────────────────────────

Showing 1-10 of 42 engineers

[← Previous]  [1] [2] [3] ... [5]  [Next →]

IMPLEMENTATION:
─────────────────────────────────────────────────────────────────

INITIAL LOAD:
├── Show 10 providers on first load
├── Preload next 10 in background

LOAD MORE:
├── Fetch next batch (10 more)
├── Append to existing list
├── Update URL: ?page=2 (for back button)
├── Scroll to first new item (optional)

LIMITS:
├── Max 100 providers per page
├── If >100, show top 100 + "Contact us to be listed"

SEO CONSIDERATION:
├── All providers should be server-rendered initially
├── Or use rel="next/prev" if paginated

STYLING:
─────────────────────────────────────────────────────────────────
Button:
├── Width:          100% (mobile), auto (desktop)
├── Padding:        16px 32px
├── Background:     White
├── Border:         2px solid #2563eb
├── Color:          #2563eb
├── Font weight:    600
├── Hover:          Background #2563eb, Color white

═══════════════════════════════════════════════════════════════
```

### Section 8: Common Issues (AI Search Hack)

```
COMMON ISSUES — PROBLEM-BASED CONTENT
═══════════════════════════════════════════════════════════════

PURPOSE:
This section targets problem-based search queries that AI 
assistants love. It positions your page as the answer source.

KEYWORDS TARGETED:
├── "washing machine not spinning"
├── "washing machine not draining"
├── "washing machine making noise"
├── "washing machine door won't open"

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 COMMON WASHING MACHINE PROBLEMS                        │
│  ═══════════════════════════════════                        │
│                                                             │
│  Our Manchester engineers frequently fix these issues:     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ⚠️ Machine not spinning                           │   │
│  │     Usually caused by worn drum bearings or a      │   │
│  │     faulty motor. Typical repair cost: £80-£130.   │   │
│  │     [Find engineer for this issue →]               │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  ⚠️ Water not draining                             │   │
│  │     Often a blocked pump filter or faulty drain    │   │
│  │     pump. Typical repair cost: £50-£90.            │   │
│  │     [Find engineer for this issue →]               │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  ⚠️ Loud banging during spin cycle                 │   │
│  │     Usually drum bearings or shock absorbers.      │   │
│  │     Typical repair cost: £90-£150.                 │   │
│  │     [Find engineer for this issue →]               │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  📖 Read our complete guide: Washing Machine Problems →   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────
FROM: appliance_categories.common_issues (TEXT[])

Example data:
common_issues = [
  "Machine not spinning",
  "Water not draining", 
  "Loud banging noise",
  "Door won't open",
  "Error codes flashing",
  "Leaking water"
]

CONTENT ENHANCEMENT:
For each issue, we add:
├── Brief explanation (static content per category)
├── Typical repair cost (from content database or static)
├── CTA link (scrolls to provider listings with context)

CTA LINK:
─────────────────────────────────────────────────────────────────
"Find engineer for this issue" could:
├── Option A: Scroll to provider listings
├── Option B: Link to /guides/{issue-slug}/
├── Option C: Filter providers (if filter exists)

SCHEMA.ORG:
─────────────────────────────────────────────────────────────────
This content contributes to FAQPage schema:

{
  "@type": "Question",
  "name": "What causes a washing machine to not spin?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Usually caused by worn drum bearings or a faulty motor. 
             Our Manchester engineers can diagnose and repair this issue, 
             typically costing £80-£130."
  }
}

MOBILE:
─────────────────────────────────────────────────────────────────
├── Accordion collapsed by default
├── "Common Problems ▼" header expands list
├── 3 issues visible, "+3 more" expands

═══════════════════════════════════════════════════════════════
```

### Section 9: Average Repair Costs

```
AVERAGE REPAIR COSTS — STRUCTURED DATA
═══════════════════════════════════════════════════════════════

PURPOSE:
Targets "how much does {category} repair cost" queries.
High-value AI citation content.

KEYWORDS TARGETED:
├── "washing machine repair cost uk"
├── "how much to fix washing machine"
├── "appliance repair prices manchester"

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  💰 WASHING MACHINE REPAIR COSTS IN MANCHESTER             │
│  ════════════════════════════════════════════               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  TYPICAL COSTS                                      │   │
│  │  ─────────────────────────────────────              │   │
│  │                                                     │   │
│  │  Callout / Diagnosis:     £45 - £75                │   │
│  │  Average Total Repair:    £85 - £150               │   │
│  │                                                     │   │
│  │  COMMON REPAIRS                                     │   │
│  │  ─────────────────────────────────────              │   │
│  │                                                     │   │
│  │  Drum bearings:           £90 - £130               │   │
│  │  Door seal replacement:   £60 - £90                │   │
│  │  Pump replacement:        £70 - £110               │   │
│  │  Control board:           £120 - £180              │   │
│  │  Motor brushes:           £50 - £80                │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ℹ️ Prices based on Manchester engineer averages.          │
│     Actual costs vary by brand, model, and fault severity. │
│                                                             │
│  💡 TIP: Many engineers offer "No Fix, No Fee" policies —  │
│     you only pay if they successfully repair your appliance.│
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────
FROM appliance_categories:
├── avg_repair_cost_min
├── avg_repair_cost_max

FROM providers (aggregated):
├── MIN(callout_fee_from) - for local pricing
├── AVG(callout_fee_from) - for average callout

Common repairs: Static content per category (in CMS or code)

SCHEMA.ORG:
─────────────────────────────────────────────────────────────────

{
  "@type": "Service",
  "name": "Washing Machine Repair",
  "areaServed": {
    "@type": "City",
    "name": "Manchester"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "45",
    "highPrice": "150",
    "priceCurrency": "GBP",
    "offerCount": 15
  }
}

═══════════════════════════════════════════════════════════════
```

### Section 10: Brand Specialists

```
BRAND SPECIALISTS — INTERNAL LINKING
═══════════════════════════════════════════════════════════════

PURPOSE:
Links to brand-specific repair pages (Phase 2).
Captures brand + repair queries.
Creates topical authority.

KEYWORDS TARGETED:
├── "bosch washing machine repair manchester"
├── "samsung appliance repair near me"
├── "lg fridge repair birmingham"

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🏷️ BRAND-SPECIFIC REPAIR IN MANCHESTER                   │
│  ════════════════════════════════════════                   │
│                                                             │
│  Looking for manufacturer-authorised repair?               │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │  Bosch  │ │ Samsung │ │   LG    │ │Hotpoint │          │
│  │ 3 eng.  │ │ 4 eng.  │ │ 2 eng.  │ │ 5 eng.  │          │
│  │ [View →]│ │ [View →]│ │ [View →]│ │ [View →]│          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                       │
│  │ Siemens │ │  Miele  │ │   Neff  │                       │
│  │ 3 eng.  │ │ 1 eng.  │ │ 2 eng.  │                       │
│  │ [View →]│ │ [View →]│ │ [View →]│                       │
│  └─────────┘ └─────────┘ └─────────┘                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────

SELECT 
  b.name,
  b.slug,
  COUNT(DISTINCT pba.provider_id) as engineer_count
FROM brands b
JOIN provider_brand_authorisations pba ON pba.brand_id = b.id
JOIN service_providers sp ON sp.id = pba.provider_id
JOIN provider_services ps ON ps.provider_id = sp.id
JOIN provider_coverage_places pcp ON pcp.provider_id = sp.id
WHERE 
  pcp.place_id = :place_id
  AND ps.appliance_category_id = :category_id
  AND sp.is_active = true
GROUP BY b.id, b.name, b.slug
HAVING COUNT(DISTINCT pba.provider_id) > 0
ORDER BY COUNT(DISTINCT pba.provider_id) DESC
LIMIT 8;

LINK TARGET:
─────────────────────────────────────────────────────────────────
/england/manchester/bosch-repair/

Note: If brand repair page doesn't exist yet (Phase 2), 
link to filtered view:
/england/manchester/washing-machine-repair/?brand=bosch

DISPLAY RULES:
─────────────────────────────────────────────────────────────────
├── Only show brands with at least 1 authorized engineer
├── Order by engineer count DESC
├── Max 8 brands displayed
├── Hide section if no brand specialists found

═══════════════════════════════════════════════════════════════
```

### Section 11: Parts Affiliate

```
PARTS AFFILIATE — MONETIZATION
═══════════════════════════════════════════════════════════════

PURPOSE:
Captures DIY users who want to fix it themselves.
Revenue stream: 5-8% commission from eSpares.

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 PREFER TO FIX IT YOURSELF?                             │
│  ═════════════════════════════                              │
│                                                             │
│  Order genuine washing machine parts from our trusted      │
│  partner eSpares. UK's largest appliance parts retailer.   │
│                                                             │
│  Popular parts for washing machines:                       │
│                                                             │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐    │
│  │ 🔩 Door Seals │ │ ⚙️ Drum       │ │ 💧 Pumps &    │    │
│  │    from £15   │ │ Bearings £35  │ │ Filters £20   │    │
│  │    [Shop →]   │ │    [Shop →]   │ │    [Shop →]   │    │
│  └───────────────┘ └───────────────┘ └───────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │      BROWSE ALL WASHING MACHINE PARTS →             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ✓ Free delivery on orders over £35                       │
│  ✓ Next-day delivery available                            │
│  ✓ 365-day returns policy                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

AFFILIATE LINKS:
─────────────────────────────────────────────────────────────────

BASE URL: https://www.espares.co.uk/
CATEGORY: /search/{category-parts}/
PARAMS:   ?utm_source=ukgradedappliances
          &utm_medium=repair_category_page
          &utm_campaign={category_slug}

Example:
https://www.espares.co.uk/search/washing-machine-parts/?utm_source=ukgradedappliances&utm_medium=repair_category_page

REL ATTRIBUTE:
rel="noopener sponsored"

TRACKING:
─────────────────────────────────────────────────────────────────
On click → affiliate_clicks table:
├── affiliate_partner: 'espares'
├── product_type: 'parts'
├── place_id: current place
├── category_id: current category
├── source_page: page_path

DISPLAY RULES:
─────────────────────────────────────────────────────────────────
├── Always show on repair category pages
├── Show category-specific parts (if mappable)
├── Generic "appliance parts" fallback
├── Mobile: Collapsed by default

═══════════════════════════════════════════════════════════════
```

### Section 12: Cross-Sell to Retail

```
CROSS-SELL TO RETAIL — ECOSYSTEM RETENTION
═══════════════════════════════════════════════════════════════

PURPOSE:
Captures users whose appliance is beyond repair.
Links to retail category page (graded appliances).

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🛒 APPLIANCE BEYOND REPAIR?                               │
│  ════════════════════════════                               │
│                                                             │
│  If your washing machine isn't worth fixing, consider a    │
│  graded replacement. Save 30-70% on brand-new appliances   │
│  with light cosmetic imperfections.                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  GRADED WASHING MACHINES IN MANCHESTER             │   │
│  │  ─────────────────────────────────────              │   │
│  │                                                     │   │
│  │  8 local stores • From £149 • Up to 70% off        │   │
│  │                                                     │   │
│  │  Brands: Samsung, Bosch, LG, Hotpoint, and more    │   │
│  │                                                     │   │
│  │            [BROWSE GRADED WASHING MACHINES →]       │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  💡 Repair vs Replace Calculator coming soon.              │
│     [Get notified when it launches →]                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

LINK TARGET:
─────────────────────────────────────────────────────────────────
/england/manchester/washing-machines/

DATA FOR DISPLAY:
─────────────────────────────────────────────────────────────────
├── store_count: COUNT stores in city with this category
├── min_price: Static or from products (future)
├── top_brands: Top 3-4 brands available

DISPLAY RULES:
─────────────────────────────────────────────────────────────────
├── Only show if store_count > 0 for this category in city
├── Hide if no retail options available
├── Mobile: Card format, not expanded section

TRACKING:
─────────────────────────────────────────────────────────────────
On click → click_events:
├── event_type: 'profile_view' (internal navigation)
├── metadata: { cross_sell: 'repair_to_retail' }

Also → user_intents:
├── intent_type: 'ready_to_buy'
├── context: 'cross_sell_from_repair_category'

═══════════════════════════════════════════════════════════════
```

### Section 13: Other Repair Categories

```
OTHER REPAIR CATEGORIES — INTERNAL LINKING
═══════════════════════════════════════════════════════════════

PURPOSE:
Cross-links to other repair category pages in same city.
Builds topical authority cluster.
Captures multi-appliance repair needs.

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 OTHER APPLIANCE REPAIR IN MANCHESTER                   │
│  ═══════════════════════════════════════                    │
│                                                             │
│  Need more than washing machine repair?                    │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │    🧊       │ │    🍽️       │ │    💨       │          │
│  │   Fridge    │ │ Dishwasher  │ │   Tumble    │          │
│  │  Freezer    │ │   Repair    │ │   Dryer     │          │
│  │   Repair    │ │             │ │   Repair    │          │
│  │  12 eng.    │ │  10 eng.    │ │  8 eng.     │          │
│  │  [View →]   │ │  [View →]   │ │  [View →]   │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │    🔥       │ │    🍳       │ │    📺       │          │
│  │   Oven &    │ │    Hob      │ │    TV       │          │
│  │  Cooker     │ │   Repair    │ │   Repair    │          │
│  │   Repair    │ │             │ │             │          │
│  │  9 eng.     │ │  6 eng.     │ │  4 eng.     │          │
│  │  [View →]   │ │  [View →]   │ │  [View →]   │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────

SELECT 
  ac.name,
  ac.slug,
  ac.icon,
  ac.name_singular,
  COUNT(DISTINCT ps.provider_id) as engineer_count
FROM appliance_categories ac
JOIN provider_services ps ON ps.appliance_category_id = ac.id
JOIN provider_coverage_places pcp ON pcp.provider_id = ps.provider_id
WHERE 
  pcp.place_id = :place_id
  AND ac.supports_repair = true
  AND ac.is_active = true
  AND ac.id != :current_category_id  -- Exclude current category
  AND ps.is_active = true
GROUP BY ac.id
HAVING COUNT(DISTINCT ps.provider_id) >= 2  -- Anti-thin
ORDER BY ac.tier ASC, ac.display_order ASC
LIMIT 6;

LINK TARGET:
─────────────────────────────────────────────────────────────────
/england/manchester/{category-slug}-repair/

Example: /england/manchester/fridge-freezer-repair/

DISPLAY RULES:
─────────────────────────────────────────────────────────────────
├── Exclude current category
├── Only show categories with ≥2 providers (anti-thin)
├── Order by tier (Tier 1 first), then display_order
├── Max 6 categories displayed
├── Mobile: Horizontal scroll or 2x3 grid

═══════════════════════════════════════════════════════════════
```

### Section 14: Nearby Cities

```
NEARBY CITIES — GEOGRAPHIC INTERNAL LINKING
═══════════════════════════════════════════════════════════════

PURPOSE:
Links to same repair category in nearby cities.
Captures "near me" spillover traffic.
Builds geographic authority.

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📍 WASHING MACHINE REPAIR IN NEARBY CITIES                │
│  ═══════════════════════════════════════════                │
│                                                             │
│  Looking for options outside Manchester?                   │
│                                                             │
│  ┌───────────────────┐ ┌───────────────────┐              │
│  │  📍 Liverpool     │ │  📍 Leeds         │              │
│  │     35 miles      │ │     40 miles      │              │
│  │     8 engineers   │ │     12 engineers  │              │
│  │     [View →]      │ │     [View →]      │              │
│  └───────────────────┘ └───────────────────┘              │
│                                                             │
│  ┌───────────────────┐ ┌───────────────────┐              │
│  │  📍 Sheffield     │ │  📍 Birmingham    │              │
│  │     38 miles      │ │     85 miles      │              │
│  │     6 engineers   │ │     15 engineers  │              │
│  │     [View →]      │ │     [View →]      │              │
│  └───────────────────┘ └───────────────────┘              │
│                                                             │
│  [🗺️ View all UK cities for washing machine repair →]     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────

-- Get nearby cities with providers for this category
WITH nearby AS (
  SELECT unnest(nearby_places) as nearby_slug
  FROM places WHERE id = :place_id
)
SELECT 
  p.name,
  p.slug,
  p.latitude,
  p.longitude,
  COUNT(DISTINCT ps.provider_id) as engineer_count
FROM places p
JOIN nearby n ON p.slug = n.nearby_slug
JOIN provider_coverage_places pcp ON pcp.place_id = p.id
JOIN provider_services ps ON ps.provider_id = pcp.provider_id
WHERE 
  ps.appliance_category_id = :category_id
  AND ps.is_active = true
GROUP BY p.id
HAVING COUNT(DISTINCT ps.provider_id) >= 2  -- Anti-thin
ORDER BY engineer_count DESC
LIMIT 6;

DISTANCE CALCULATION:
─────────────────────────────────────────────────────────────────
Use Haversine formula if lat/lng available:

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

LINK TARGET:
─────────────────────────────────────────────────────────────────
/england/liverpool/washing-machine-repair/
/england/leeds/washing-machine-repair/

"View all UK cities" → /washing-machine-repair/ (national page)

═══════════════════════════════════════════════════════════════
```

### Section 15: FAQs

```
FAQS — SCHEMA.ORG STRUCTURED DATA
═══════════════════════════════════════════════════════════════

PURPOSE:
Targets FAQ-style search queries.
Provides structured data for rich results.
AI citation magnet.

KEYWORDS TARGETED:
├── "how much does washing machine repair cost"
├── "is it worth repairing a washing machine"
├── "can I get same day washing machine repair"
├── "how long does washing machine repair take"

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ❓ FREQUENTLY ASKED QUESTIONS                             │
│  ═════════════════════════════                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▼ How much does washing machine repair cost        │   │
│  │    in Manchester?                                   │   │
│  │                                                     │   │
│  │    Typical washing machine repair in Manchester     │   │
│  │    costs £85-£150 including parts and labour.      │   │
│  │    Callout fees start from £45. Many engineers     │   │
│  │    offer "no fix, no fee" policies.                │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ Is it worth repairing my washing machine?       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ Can I get same-day washing machine repair?      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ How do I find a Gas Safe engineer?              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ What warranty do I get on repairs?              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

FAQ CONTENT (Template-based):
─────────────────────────────────────────────────────────────────

1. "How much does {category} repair cost in {city}?"
   Answer: "Typical {category} repair in {city} costs 
   £{avg_min}-£{avg_max} including parts and labour. 
   Callout fees start from £{min_callout}. Many engineers 
   offer 'no fix, no fee' policies."

2. "Is it worth repairing my {category}?"
   Answer: "Generally, if your {category} is less than 
   {avg_lifespan/2} years old and the repair costs less 
   than 50% of a new appliance, repair is worthwhile. 
   Consider the age, condition, and energy efficiency 
   when deciding."

3. "Can I get same-day {category} repair?"
   Answer: "Yes, {same_day_count} of our {provider_count} 
   {city} engineers offer same-day callouts. Book early 
   in the day for best availability."

4. "How do I find a Gas Safe engineer?" (for gas appliances)
   Answer: "All gas appliance repairs must be done by 
   Gas Safe registered engineers. {gas_safe_count} 
   engineers in our {city} directory are Gas Safe 
   registered. Look for the Gas Safe badge on their profile."

5. "What warranty do I get on repairs?"
   Answer: "Most {city} engineers offer 3-12 month 
   warranties on repairs. Check each engineer's profile 
   for their specific warranty terms."

SCHEMA.ORG:
─────────────────────────────────────────────────────────────────

{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does washing machine repair cost in Manchester?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typical washing machine repair in Manchester costs £85-£150..."
      }
    },
    // ... more questions
  ]
}

═══════════════════════════════════════════════════════════════
```

---

## SEO Implementation

### Meta Tags

```
META TAGS — REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

TITLE TAG:
─────────────────────────────────────────────────────────────────
Template: "{Category} Repair in {City} | {N} Engineers | From £{price}"
Example:  "Washing Machine Repair in Manchester | 15 Engineers | From £45"

Source: appliance_categories.repair_seo_title_template
With dynamic values: provider_count, min_callout

Max length: 60 characters

META DESCRIPTION:
─────────────────────────────────────────────────────────────────
Template: "Compare {N} {category_singular} repair engineers in {city}. 
Same-day callouts, verified engineers, warranties on repairs. 
Find {brand_list} specialists."

Example: "Compare 15 washing machine repair engineers in Manchester. 
Same-day callouts, verified engineers, warranties on repairs. 
Find Bosch, Samsung, LG specialists."

Max length: 155 characters

CANONICAL URL:
─────────────────────────────────────────────────────────────────
<link rel="canonical" href="https://ukgradedappliances.com/england/manchester/washing-machine-repair/" />

ROBOTS:
─────────────────────────────────────────────────────────────────
indexable (≥2 providers):   <meta name="robots" content="index, follow" />
thin (<2 providers):         <meta name="robots" content="noindex, follow" />

OPEN GRAPH:
─────────────────────────────────────────────────────────────────
<meta property="og:title" content="Washing Machine Repair in Manchester" />
<meta property="og:description" content="Compare 15 trusted engineers..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ukgradedappliances.com/england/manchester/washing-machine-repair/" />
<meta property="og:image" content="/og/repair-category.jpg" />

TWITTER CARD:
─────────────────────────────────────────────────────────────────
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Washing Machine Repair in Manchester" />
<meta name="twitter:description" content="Compare 15 trusted engineers..." />

GEO TAGS:
─────────────────────────────────────────────────────────────────
<meta name="geo.region" content="GB-ENG" />
<meta name="geo.placename" content="Manchester" />
<meta name="geo.position" content="53.4808;-2.2426" />

═══════════════════════════════════════════════════════════════
```

### Schema.org (Complete)

```json
SCHEMA.ORG — REPAIR CATEGORY PAGE (COMPLETE)
═══════════════════════════════════════════════════════════════

{
  "@context": "https://schema.org",
  "@graph": [
    
    // 1. WebPage
    {
      "@type": "WebPage",
      "@id": "https://ukgradedappliances.com/england/manchester/washing-machine-repair/#webpage",
      "url": "https://ukgradedappliances.com/england/manchester/washing-machine-repair/",
      "name": "Washing Machine Repair in Manchester | 15 Engineers | From £45",
      "description": "Compare 15 washing machine repair engineers in Manchester...",
      "isPartOf": {
        "@id": "https://ukgradedappliances.com/#website"
      },
      "breadcrumb": {
        "@id": "https://ukgradedappliances.com/england/manchester/washing-machine-repair/#breadcrumb"
      },
      "mainEntity": {
        "@id": "https://ukgradedappliances.com/england/manchester/washing-machine-repair/#service"
      }
    },
    
    // 2. Service
    {
      "@type": "Service",
      "@id": "https://ukgradedappliances.com/england/manchester/washing-machine-repair/#service",
      "name": "Washing Machine Repair in Manchester",
      "serviceType": "Appliance Repair",
      "description": "Professional washing machine repair services in Manchester...",
      "areaServed": {
        "@type": "City",
        "name": "Manchester",
        "containedInPlace": {
          "@type": "Country",
          "name": "United Kingdom"
        }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Washing Machine Repair Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Washing Machine Callout & Diagnosis"
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "45",
              "priceCurrency": "GBP",
              "minPrice": "45",
              "maxPrice": "75"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Washing Machine Repair (typical)"
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "minPrice": "85",
              "maxPrice": "150",
              "priceCurrency": "GBP"
            }
          }
        ]
      },
      "provider": {
        "@id": "https://ukgradedappliances.com/england/manchester/washing-machine-repair/#providerlist"
      }
    },
    
    // 3. ItemList (Providers)
    {
      "@type": "ItemList",
      "@id": "https://ukgradedappliances.com/england/manchester/washing-machine-repair/#providerlist",
      "name": "Washing Machine Repair Engineers in Manchester",
      "numberOfItems": 15,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "HomeAndConstructionBusiness",
            "name": "Midlands Appliance Repairs",
            "url": "https://ukgradedappliances.com/provider/midlands-appliance-repairs/",
            "telephone": "+44-121-XXX-XXXX",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Manchester",
              "addressCountry": "GB"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            }
          }
        }
        // ... more providers
      ]
    },
    
    // 4. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": "https://ukgradedappliances.com/england/manchester/washing-machine-repair/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ukgradedappliances.com/" },
        { "@type": "ListItem", "position": 2, "name": "England", "item": "https://ukgradedappliances.com/england/" },
        { "@type": "ListItem", "position": 3, "name": "Manchester", "item": "https://ukgradedappliances.com/england/manchester/" },
        { "@type": "ListItem", "position": 4, "name": "Washing Machine Repair" }
      ]
    },
    
    // 5. FAQPage
    {
      "@type": "FAQPage",
      "@id": "https://ukgradedappliances.com/england/manchester/washing-machine-repair/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does washing machine repair cost in Manchester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Typical washing machine repair in Manchester costs £85-£150 including parts and labour. Callout fees start from £45."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get same-day washing machine repair in Manchester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, 8 of our 15 Manchester engineers offer same-day callouts. Book early in the day for best availability."
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

## TypeScript Interfaces

```typescript
TYPESCRIPT INTERFACES — REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

// types/repair-category-page.ts

import type { ProviderCardData } from './provider-card';

/**
 * Page params from Next.js route
 */
export interface RepairCategoryPageParams {
  country: string;   // "england"
  city: string;      // "manchester"
  categoryRepair: string;  // "washing-machine-repair"
}

/**
 * Complete page data for repair category
 */
export interface RepairCategoryPageData {
  // Core entities
  place: PlaceData;
  category: CategoryData;
  country: CountryData;
  
  // Providers
  providers: ProviderCardData[];
  totalProviderCount: number;
  
  // Aggregated stats
  stats: RepairCategoryStats;
  
  // Related data
  brandSpecialists: BrandSpecialistData[];
  otherCategories: OtherCategoryData[];
  nearbyCities: NearbyCityData[];
  faqs: FAQ[];
  
  // Indexability
  isIndexable: boolean;
  fallbackAction?: 'redirect' | 'noindex';
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  h1: string;
  introText: string;
}

/**
 * Place/city data
 */
export interface PlaceData {
  id: string;
  slug: string;
  name: string;
  latitude?: number;
  longitude?: number;
  storeCount: number;  // For cross-sell
}

/**
 * Category data with repair-specific fields
 */
export interface CategoryData {
  id: string;
  slug: string;
  name: string;
  namePlural: string;
  nameSingular: string;
  icon?: string;
  tier: 'tier_1' | 'tier_2' | 'tier_3' | 'supplementary';
  
  // Repair templates
  repairSeoTitleTemplate?: string;
  repairH1Template?: string;
  repairIntroTemplate?: string;
  
  // Problem-based content
  commonIssues?: string[];
  avgRepairCostMin?: number;
  avgRepairCostMax?: number;
  avgLifespanYears?: number;
  
  // Thresholds
  minProvidersForIndex: number;
}

/**
 * Country data
 */
export interface CountryData {
  slug: string;
  name: string;
}

/**
 * Aggregated stats for quick stats bar
 */
export interface RepairCategoryStats {
  providerCount: number;
  minCalloutFee?: number;
  avgCalloutFee?: number;
  sameDayCount: number;
  emergencyCount: number;
  verifiedCount: number;
  avgRating?: number;
  noFixNoFeeCount: number;
  gasSafeCount: number;
}

/**
 * Brand specialist data
 */
export interface BrandSpecialistData {
  brandId: string;
  brandName: string;
  brandSlug: string;
  engineerCount: number;
  hasRepairPage: boolean;  // If brand repair page exists
}

/**
 * Other category in same city
 */
export interface OtherCategoryData {
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  categoryIcon?: string;
  engineerCount: number;
  repairUrl: string;  // Pre-built URL
}

/**
 * Nearby city with same category
 */
export interface NearbyCityData {
  placeId: string;
  placeName: string;
  placeSlug: string;
  distanceMiles?: number;
  engineerCount: number;
  repairUrl: string;  // Pre-built URL
}

/**
 * FAQ item
 */
export interface FAQ {
  question: string;
  answer: string;
  category?: 'cost' | 'availability' | 'process' | 'trust';
}

/**
 * Filter state
 */
export interface RepairCategoryFilters {
  sameDay?: boolean;
  emergency?: boolean;
  weekend?: boolean;
  noFixNoFee?: boolean;
  gasSafe?: boolean;
  verified?: boolean;
  warrantyOnRepairs?: boolean;
  brand?: string;
  sort?: 'rating' | 'reviews' | 'price' | 'featured';
}

/**
 * Page component props
 */
export interface RepairCategoryPageProps {
  params: RepairCategoryPageParams;
  searchParams?: Record<string, string>;
}

═══════════════════════════════════════════════════════════════
```

---

## React Page Component

```tsx
REACT PAGE COMPONENT — REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

// app/[country]/[city]/[categoryRepair]/page.tsx

import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

import Breadcrumb from '@/components/common/Breadcrumb';
import PageHero from '@/components/common/PageHero';
import QuickStatsBar from '@/components/repair/QuickStatsBar';
import ProviderFilters from '@/components/repair/ProviderFilters';
import ProviderList from '@/components/repair/ProviderList';
import CommonIssues from '@/components/repair/CommonIssues';
import RepairCosts from '@/components/repair/RepairCosts';
import BrandSpecialists from '@/components/repair/BrandSpecialists';
import PartsAffiliate from '@/components/repair/PartsAffiliate';
import CrossSellRetail from '@/components/repair/CrossSellRetail';
import OtherRepairCategories from '@/components/repair/OtherRepairCategories';
import NearbyCities from '@/components/repair/NearbyCities';
import FAQSection from '@/components/common/FAQSection';
import MobileStickyCallCTA from '@/components/repair/MobileStickyCallCTA';

import { getRepairCategoryPageData } from '@/lib/pages/getRepairCategoryPageData';
import { generateRepairCategorySchema } from '@/lib/schema/repairCategorySchema';
import type { RepairCategoryPageProps } from '@/types/repair-category-page';

// Generate static params for top cities/categories (ISR)
export async function generateStaticParams() {
  // Return top 100 city/category combinations
  // Others will be generated on-demand
}

// Generate metadata
export async function generateMetadata({
  params,
}: RepairCategoryPageProps): Promise<Metadata> {
  const data = await getRepairCategoryPageData(params);
  
  if (!data) return {};
  
  return {
    title: data.seoTitle,
    description: data.seoDescription,
    alternates: {
      canonical: data.canonicalUrl,
    },
    robots: data.isIndexable ? 'index, follow' : 'noindex, follow',
    openGraph: {
      title: data.h1,
      description: data.seoDescription,
      url: data.canonicalUrl,
      type: 'website',
    },
  };
}

export default async function RepairCategoryPage({
  params,
  searchParams,
}: RepairCategoryPageProps) {
  // Fetch page data
  const data = await getRepairCategoryPageData(params);
  
  // Handle not found
  if (!data) {
    notFound();
  }
  
  // Handle redirect for thin pages
  if (data.fallbackAction === 'redirect') {
    redirect(`/${params.country}/${params.city}/#repairs`);
  }
  
  // Build breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: data.country.name, url: `/${data.country.slug}/` },
    { name: data.place.name, url: `/${data.country.slug}/${data.place.slug}/` },
    { name: `${data.category.nameSingular} Repair`, url: null },
  ];
  
  // Generate schema
  const schemaJson = generateRepairCategorySchema(data);
  
  // Get top provider for mobile sticky CTA
  const topProvider = data.providers[0];
  
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Hero / H1 */}
        <PageHero
          icon={data.category.icon || '🔧'}
          title={data.h1}
          subtitle="Compare trusted local engineers for fast, reliable repairs"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Intro Paragraph */}
          <p className="text-gray-700 text-base leading-relaxed max-w-3xl mb-8">
            {data.introText}
          </p>
          
          {/* Quick Stats Bar */}
          <QuickStatsBar stats={data.stats} categoryName={data.category.nameSingular} />
          
          {/* Filters */}
          <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse rounded" />}>
            <ProviderFilters
              initialFilters={searchParams}
              hasSameDayProviders={data.stats.sameDayCount > 0}
              hasGasSafeProviders={data.stats.gasSafeCount > 0}
              brands={data.brandSpecialists}
            />
          </Suspense>
          
          {/* Provider Listings */}
          <div className="mt-6">
            <ProviderList
              providers={data.providers}
              totalCount={data.totalProviderCount}
              pageContext={{
                pagePath: data.canonicalUrl,
                pageType: 'repair_category',
                placeId: data.place.id,
                categoryId: data.category.id,
                categorySlug: data.category.slug,
                citySlug: data.place.slug,
                countrySlug: data.country.slug,
              }}
              storeCount={data.place.storeCount}
            />
          </div>
          
          {/* Common Issues Section */}
          {data.category.commonIssues && data.category.commonIssues.length > 0 && (
            <CommonIssues
              categoryName={data.category.nameSingular}
              cityName={data.place.name}
              issues={data.category.commonIssues}
            />
          )}
          
          {/* Repair Costs */}
          <RepairCosts
            categoryName={data.category.nameSingular}
            cityName={data.place.name}
            avgMin={data.category.avgRepairCostMin}
            avgMax={data.category.avgRepairCostMax}
            minCallout={data.stats.minCalloutFee}
          />
          
          {/* Brand Specialists */}
          {data.brandSpecialists.length > 0 && (
            <BrandSpecialists
              brands={data.brandSpecialists}
              cityName={data.place.name}
              citySlug={data.place.slug}
              countrySlug={data.country.slug}
            />
          )}
          
          {/* Parts Affiliate */}
          <PartsAffiliate
            categoryName={data.category.nameSingular}
            categorySlug={data.category.slug}
          />
          
          {/* Cross-Sell to Retail */}
          {data.place.storeCount > 0 && (
            <CrossSellRetail
              categoryName={data.category.nameSingular}
              cityName={data.place.name}
              citySlug={data.place.slug}
              countrySlug={data.country.slug}
              storeCount={data.place.storeCount}
            />
          )}
          
          {/* Other Repair Categories */}
          {data.otherCategories.length > 0 && (
            <OtherRepairCategories
              categories={data.otherCategories}
              cityName={data.place.name}
            />
          )}
          
          {/* Nearby Cities */}
          {data.nearbyCities.length > 0 && (
            <NearbyCities
              cities={data.nearbyCities}
              categoryName={data.category.nameSingular}
              currentCity={data.place.name}
            />
          )}
          
          {/* FAQs */}
          {data.faqs.length > 0 && (
            <FAQSection
              title="Frequently Asked Questions"
              faqs={data.faqs}
            />
          )}
        </div>
        
        {/* Mobile Sticky CTA */}
        {topProvider && (
          <MobileStickyCallCTA
            provider={topProvider}
            categoryName={data.category.nameSingular}
          />
        )}
      </div>
    </>
  );
}

═══════════════════════════════════════════════════════════════
```

---

## Data Fetching

```typescript
DATA FETCHING — REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

// lib/pages/getRepairCategoryPageData.ts

import { createClient } from '@/lib/supabase/server';
import type { 
  RepairCategoryPageData, 
  RepairCategoryPageParams 
} from '@/types/repair-category-page';

export async function getRepairCategoryPageData(
  params: RepairCategoryPageParams
): Promise<RepairCategoryPageData | null> {
  const supabase = createClient();
  
  // 1. Parse category slug from repair URL
  // "washing-machine-repair" → "washing-machine"
  const categorySlug = params.categoryRepair.replace('-repair', '');
  
  // 2. Get place data
  const { data: place } = await supabase
    .from('places')
    .select(`
      id,
      slug,
      name,
      latitude,
      longitude,
      store_count,
      nearby_places,
      country:countries(slug, name)
    `)
    .eq('slug', params.city)
    .single();
  
  if (!place) return null;
  
  // 3. Get category data
  const { data: category } = await supabase
    .from('appliance_categories')
    .select(`
      id,
      slug,
      name,
      name_plural,
      name_singular,
      icon,
      tier,
      repair_seo_title_template,
      repair_h1_template,
      repair_intro_template,
      common_issues,
      avg_repair_cost_min,
      avg_repair_cost_max,
      avg_lifespan_years,
      min_providers_for_index
    `)
    .or(`slug.eq.${categorySlug},name_singular.ilike.%${categorySlug.replace(/-/g, ' ')}%`)
    .eq('supports_repair', true)
    .single();
  
  if (!category) return null;
  
  // 4. Get providers with aggregated data
  const { data: providers, count: totalCount } = await supabase
    .from('service_providers')
    .select(`
      *,
      provider_services!inner(
        offers_same_day,
        callout_fee_min,
        callout_fee_max,
        repair_warranty_months,
        appliance_categories(
          id, name, name_singular, slug, tier
        )
      ),
      provider_coverage_places!inner(
        additional_callout_fee,
        same_day_available
      ),
      provider_brand_authorisations(
        brands(id, name, slug),
        is_verified
      )
    `, { count: 'exact' })
    .eq('provider_services.appliance_category_id', category.id)
    .eq('provider_services.is_active', true)
    .eq('provider_coverage_places.place_id', place.id)
    .eq('is_active', true)
    .in('status', ['active', 'claimed', 'verified'])
    .order('is_featured', { ascending: false })
    .order('is_verified', { ascending: false })
    .order('average_rating', { ascending: false, nullsFirst: false })
    .order('provider_score', { ascending: false })
    .limit(50);
  
  // 5. Check indexability
  const providerCount = totalCount || 0;
  const isIndexable = providerCount >= category.min_providers_for_index;
  const fallbackAction = providerCount === 0 ? 'redirect' : 
                         providerCount < 2 ? 'noindex' : undefined;
  
  // 6. Calculate stats
  const stats = calculateStats(providers || []);
  
  // 7. Get brand specialists
  const brandSpecialists = await getBrandSpecialists(
    supabase, place.id, category.id
  );
  
  // 8. Get other categories
  const otherCategories = await getOtherCategories(
    supabase, place.id, category.id, params.country
  );
  
  // 9. Get nearby cities
  const nearbyCities = await getNearbyCities(
    supabase, place, category.id, params.country
  );
  
  // 10. Generate SEO content
  const h1 = (category.repair_h1_template || '{name_singular} Repair in {location}')
    .replace('{name_singular}', category.name_singular)
    .replace('{location}', place.name);
  
  const seoTitle = (category.repair_seo_title_template || 
    '{name_singular} Repair in {location} | {count} Engineers')
    .replace('{name_singular}', category.name_singular)
    .replace('{location}', place.name)
    .replace('{count}', String(providerCount));
  
  const introText = generateIntroText(category, place, stats);
  
  // 11. Generate FAQs
  const faqs = generateFAQs(category, place, stats);
  
  return {
    place: {
      id: place.id,
      slug: place.slug,
      name: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
      storeCount: place.store_count || 0,
    },
    category: {
      id: category.id,
      slug: category.slug,
      name: category.name,
      namePlural: category.name_plural,
      nameSingular: category.name_singular,
      icon: category.icon,
      tier: category.tier,
      commonIssues: category.common_issues,
      avgRepairCostMin: category.avg_repair_cost_min,
      avgRepairCostMax: category.avg_repair_cost_max,
      avgLifespanYears: category.avg_lifespan_years,
      minProvidersForIndex: category.min_providers_for_index,
    },
    country: {
      slug: place.country?.slug || params.country,
      name: place.country?.name || 'England',
    },
    providers: transformProviders(providers || []),
    totalProviderCount: providerCount,
    stats,
    brandSpecialists,
    otherCategories,
    nearbyCities,
    faqs,
    isIndexable,
    fallbackAction,
    seoTitle,
    seoDescription: `Compare ${providerCount} ${category.name_singular.toLowerCase()} repair engineers in ${place.name}. Same-day callouts, verified engineers, warranties on repairs.`,
    canonicalUrl: `https://ukgradedappliances.com/${params.country}/${params.city}/${params.categoryRepair}/`,
    h1,
    introText,
  };
}

// Helper functions
function calculateStats(providers: any[]): RepairCategoryStats {
  return {
    providerCount: providers.length,
    minCalloutFee: Math.min(...providers
      .map(p => p.callout_fee_from)
      .filter(Boolean)) || undefined,
    avgCalloutFee: providers.length > 0
      ? providers.reduce((sum, p) => sum + (p.callout_fee_from || 0), 0) / 
        providers.filter(p => p.callout_fee_from).length
      : undefined,
    sameDayCount: providers.filter(p => p.offers_same_day).length,
    emergencyCount: providers.filter(p => p.offers_emergency).length,
    verifiedCount: providers.filter(p => p.is_verified).length,
    avgRating: providers.length > 0
      ? providers.reduce((sum, p) => sum + (p.average_rating || 0), 0) / 
        providers.filter(p => p.average_rating).length
      : undefined,
    noFixNoFeeCount: providers.filter(p => p.no_fix_no_fee).length,
    gasSafeCount: providers.filter(p => p.gas_safe_registered).length,
  };
}

═══════════════════════════════════════════════════════════════
```

---

## Component File Structure

```
COMPONENT FILE STRUCTURE
═══════════════════════════════════════════════════════════════

app/
└── [country]/
    └── [city]/
        └── [categoryRepair]/
            ├── page.tsx              # Main page component
            ├── loading.tsx           # Loading skeleton
            └── not-found.tsx         # 404 page

components/
├── repair/
│   ├── QuickStatsBar.tsx             # Stats bar component
│   ├── ProviderFilters.tsx           # Filter/sort controls
│   ├── ProviderList.tsx              # Provider cards list
│   ├── CommonIssues.tsx              # Problem-based section
│   ├── RepairCosts.tsx               # Cost breakdown
│   ├── BrandSpecialists.tsx          # Brand links
│   ├── PartsAffiliate.tsx            # eSpares affiliate
│   ├── CrossSellRetail.tsx           # Link to retail
│   ├── OtherRepairCategories.tsx     # Other categories
│   ├── NearbyCities.tsx              # Nearby cities
│   ├── MobileStickyCallCTA.tsx       # Sticky mobile button
│   └── index.ts                      # Barrel exports
├── provider/
│   └── ProviderCard.tsx              # From spec 09
└── common/
    ├── Breadcrumb.tsx
    ├── PageHero.tsx
    └── FAQSection.tsx

lib/
├── pages/
│   └── getRepairCategoryPageData.ts  # Data fetching
├── schema/
│   └── repairCategorySchema.ts       # Schema.org generator
└── utils/
    └── haversine.ts                  # Distance calculation

types/
└── repair-category-page.ts           # TypeScript interfaces

═══════════════════════════════════════════════════════════════
```

---

## Implementation Checklist

### Phase 1: Core Page Structure
- [ ] Page route setup ([country]/[city]/[categoryRepair])
- [ ] Data fetching function
- [ ] Breadcrumb component
- [ ] Hero/H1 component
- [ ] Intro paragraph generation

### Phase 1.1: Data-Driven Narrative (v1.1)
- [ ] Import getRepairNarrative from lib/seo/narratives
- [ ] Fetch narrative data in page component
- [ ] Display narrative.introParagraph after H1
- [ ] Render keyFacts as pills (orange styling)
- [ ] Handle fallback when narrative is null
- [ ] Use narrative.metaSummary in meta description
- [ ] Test different templates for different cities
- [ ] Verify zero-provider fallback template

### Phase 2: Provider Listings
- [ ] Quick Stats Bar component
- [ ] Filter/Sort controls
- [ ] Provider List with ProviderCard
- [ ] Pagination / Load More
- [ ] Empty state handling

### Phase 3: Content Sections
- [ ] Common Issues section
- [ ] Repair Costs section
- [ ] Brand Specialists section
- [ ] Other Repair Categories
- [ ] Nearby Cities
- [ ] FAQ Section

### Phase 4: Monetization
- [ ] Parts Affiliate section (eSpares)
- [ ] Cross-sell to Retail section (enhanced with narrative v1.1)
- [ ] Click tracking integration

### Phase 5: SEO & Schema
- [ ] Meta tags generation (with narrative.metaSummary v1.1)
- [ ] Schema.org JSON-LD
- [ ] Canonical URL handling
- [ ] Robots meta (noindex for thin)

### Phase 6: Mobile Optimization
- [ ] Mobile sticky call CTA
- [ ] Responsive filter modal
- [ ] Touch-friendly cards
- [ ] Performance optimization

### Phase 7: Anti-Thin Logic
- [ ] Indexability check
- [ ] Redirect for 0 providers
- [ ] noindex for 1 provider
- [ ] Fallback content

### Phase 8: Narrative Testing (v1.1)
- [ ] Narrative generates for city+category WITH providers
- [ ] Narrative generates for city+category with ZERO providers
- [ ] Fallback displays when narrative fetch fails
- [ ] Different template selected for different city+category slugs
- [ ] Key facts pills render correctly (orange styling)
- [ ] narrative.metaSummary used in meta description
- [ ] Retail cross-sell uses narrative.retailStoreCount
- [ ] Retail cross-sell uses narrative.avgNewAppliancePrice
- [ ] Certification counts accurate (Gas Safe, F-Gas, manufacturer)
- [ ] Top-rated provider data accurate

---

## Testing Requirements

```
TESTING — REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════

UNIT TESTS:
├── URL slug parsing (washing-machine-repair → washing-machines)
├── Stats calculation
├── Filter logic
├── Schema.org generation
├── FAQ generation

INTEGRATION TESTS:
├── Data fetching with real data
├── Anti-thin redirect behavior
├── Filter URL state
├── Pagination

E2E TESTS:
├── Page loads with correct data
├── Filters work correctly
├── Provider Card click tracking
├── Parts affiliate link tracking
├── Cross-sell link tracking
├── Mobile sticky CTA visibility

SEO TESTS:
├── Correct meta tags
├── Schema.org validates
├── Canonical URL correct
├── noindex for thin pages
├── Internal links work

PERFORMANCE TESTS:
├── LCP < 2.5s
├── FID < 100ms
├── CLS < 0.1
├── Server response < 200ms

═══════════════════════════════════════════════════════════════
```

---

**END OF REPAIR CATEGORY PAGE SPECIFICATION**

═══════════════════════════════════════════════════════════════
Document Status: ✅ LOCKED
Version: 1.1
Amendment: Data-Driven Narrative System added
Approved: January 2026
Next: Provider Profile Page Specification
═══════════════════════════════════════════════════════════════
