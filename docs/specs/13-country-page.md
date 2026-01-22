# SPECIFICATION 13: COUNTRY PAGE

## UK Graded Appliances Directory
**Version:** 1.0 — LOCKED  
**Status:** ✅ APPROVED
**Last Updated:** January 2026
**Dependencies:** Spec 01 (Logo), Spec 02 (Search Bar), Spec 05 (Footer), Spec 07 (City Hub), Spec 08 (Store Card)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Purpose
The Country Page is a **regional landing page** that serves as the entry point for users searching for graded appliances within a specific UK country. It sits between the Homepage and City Hub in the site hierarchy, providing:

1. **Country-level SEO** — Target "graded appliances England/Scotland/Wales" searches
2. **Regional navigation** — Browse all admin areas (councils/counties) within the country
3. **Popular cities** — Quick access to major cities with the most stores
4. **Internal link distribution** — Pass link equity to all child pages
5. **Content hub** — Country-specific FAQs and educational content

### 1.2 URL Pattern
```
/{country}/

EXAMPLES:
├── /england/                → England country page
├── /scotland/               → Scotland country page
├── /wales/                  → Wales country page
└── /northern-ireland/       → Northern Ireland country page
```

### 1.3 Page Position in Site Hierarchy

```
SITE HIERARCHY
═══════════════════════════════════════════════════════════════

                    ┌──────────────────┐
                    │     HOMEPAGE     │
                    │        /         │
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   COUNTRY     │  │   COUNTRY     │  │   COUNTRY     │
│   /england/   │  │  /scotland/   │  │   /wales/     │  ← THIS SPEC
└───────┬───────┘  └───────┬───────┘  └───────┬───────┘
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  CITY HUB     │  │  CITY HUB     │  │  CITY HUB     │
│ /england/     │  │ /scotland/    │  │  /wales/      │
│ manchester/   │  │  glasgow/     │  │  cardiff/     │
└───────────────┘  └───────────────┘  └───────────────┘

═══════════════════════════════════════════════════════════════
```

### 1.4 Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Admin areas** | Show ALL active | Maximum SEO internal linking |
| **Organization** | Alphabetical grid | Scannable, consistent |
| **Popular cities** | Top 12 by store count | Quick access to major hubs |
| **Categories** | Show Tier 1 + Tier 2 | Balanced visibility |
| **Stats** | Dynamic from DB | Real-time social proof |
| **FAQs** | Country-specific | Localized SEO content |
| **Other countries** | Show all 3 others | Cross-linking, no dead ends |

### 1.5 Target Keywords

| Country | Primary Keywords |
|---------|-----------------|
| England | graded appliances England, ex-display appliances England, factory seconds England |
| Scotland | graded appliances Scotland, ex-display appliances Scotland, appliance stores Scotland |
| Wales | graded appliances Wales, ex-display appliances Wales, graded white goods Wales |
| N. Ireland | graded appliances Northern Ireland, ex-display appliances Belfast, factory seconds NI |

---

## 2. DATABASE DEPENDENCIES

### 2.1 Tables Used

```sql
-- Country data
countries (
  id, name, slug, flag_emoji, display_order,
  seo_title, seo_meta_description, h1_heading, intro_paragraph,
  admin_area_count, place_count, store_count, provider_count,
  is_active, is_indexable
)

-- Admin areas within country
admin_areas (
  id, country_id, name, slug,
  place_count, store_count, provider_count,
  is_active, is_indexable, priority_tier
)

-- Cities/towns within country
places (
  id, country_id, admin_area_id, name, slug,
  place_type, population,
  store_count, provider_count,
  is_active, priority_tier
)

-- Categories for browsing
appliance_categories (
  id, name, name_plural, slug, tier, icon,
  display_order, is_active
)

-- FAQs
faqs (
  id, question, answer, category,
  is_repair_faq, is_location_template,
  display_order, is_active
)
```

### 2.2 Verified Data Counts

```
LOCATION DATA BY COUNTRY
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│ Country          │ Admin Areas │ Places │ Stores │ Repair  │
├──────────────────┼─────────────┼────────┼────────┼─────────┤
│ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England      │     152     │  ~420  │  TBD   │  TBD   │
│ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland     │      32     │   ~85  │  TBD   │  TBD   │
│ 🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales        │      22     │   ~40  │  TBD   │  TBD   │
│ 🇬🇧 N. Ireland   │      11     │   ~20  │  TBD   │  TBD   │
├──────────────────┼─────────────┼────────┼────────┼─────────┤
│ TOTAL            │     217     │   565  │        │         │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### 2.3 Required Supabase Queries

```typescript
// lib/data/getCountryPageData.ts

import { createClient } from '@/lib/supabase/server';

export async function getCountryPageData(countrySlug: string) {
  const supabase = createClient();

  // 1. Get country details
  const { data: country, error: countryError } = await supabase
    .from('countries')
    .select('*')
    .eq('slug', countrySlug)
    .eq('is_active', true)
    .single();

  if (countryError || !country) {
    return null;
  }

  // 2. Get admin areas for this country
  const { data: adminAreas } = await supabase
    .from('admin_areas')
    .select('id, name, slug, place_count, store_count, provider_count')
    .eq('country_id', country.id)
    .eq('is_active', true)
    .order('name');

  // 3. Get popular cities (top 12 by store count)
  const { data: popularCities } = await supabase
    .from('places')
    .select('id, name, slug, store_count, provider_count, population')
    .eq('country_id', country.id)
    .eq('is_active', true)
    .gt('store_count', 0)
    .order('store_count', { ascending: false })
    .limit(12);

  // 4. Get all other cities for "View All" count
  const { count: totalCities } = await supabase
    .from('places')
    .select('id', { count: 'exact', head: true })
    .eq('country_id', country.id)
    .eq('is_active', true);

  // 5. Get categories (Tier 1 + Tier 2)
  const { data: categories } = await supabase
    .from('appliance_categories')
    .select('id, name, name_plural, slug, icon, tier')
    .is('parent_id', null)
    .eq('is_active', true)
    .in('tier', ['tier_1', 'tier_2', 'tier_3'])
    .order('display_order')
    .limit(9);

  // 6. Get general FAQs (not repair, not location-templated)
  const { data: faqs } = await supabase
    .from('faqs')
    .select('id, question, answer')
    .eq('is_active', true)
    .eq('is_repair_faq', false)
    .eq('is_location_template', false)
    .order('display_order')
    .limit(6);

  // 7. Get other countries for cross-linking
  const { data: otherCountries } = await supabase
    .from('countries')
    .select('name, slug, flag_emoji, place_count, store_count, provider_count')
    .neq('slug', countrySlug)
    .eq('is_active', true)
    .order('display_order');

  return {
    country,
    adminAreas: adminAreas || [],
    popularCities: popularCities || [],
    totalCities: totalCities || 0,
    categories: categories || [],
    faqs: faqs || [],
    otherCountries: otherCountries || [],
  };
}
```

---

## 3. PAGE STRUCTURE

### 3.1 Section Overview

```
COUNTRY PAGE STRUCTURE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│  SECTION 1: NAVBAR (with search bar)                        │
│  [Logo] [Search Bar] [For Business ▼] [Login]              │
├─────────────────────────────────────────────────────────────┤
│  SECTION 2: BREADCRUMBS                                     │
│  🏠 Home > England                                          │
├─────────────────────────────────────────────────────────────┤
│  SECTION 3: HERO                                            │
│  H1 + Intro + Stats Box                                    │
├─────────────────────────────────────────────────────────────┤
│  SECTION 4: BROWSE BY REGION (Admin Areas)                  │
│  All 152 admin areas in alphabetical grid                  │
├─────────────────────────────────────────────────────────────┤
│  SECTION 5: POPULAR CITIES                                  │
│  Top 12 cities by store count                              │
├─────────────────────────────────────────────────────────────┤
│  SECTION 6: BROWSE BY APPLIANCE                             │
│  Category grid (Tier 1 + Tier 2)                           │
├─────────────────────────────────────────────────────────────┤
│  SECTION 7: WHY GRADED (optional)                           │
│  Benefits cards (if not covered on homepage)               │
├─────────────────────────────────────────────────────────────┤
│  SECTION 8: FAQ                                             │
│  Country-relevant FAQs with Schema.org                     │
├─────────────────────────────────────────────────────────────┤
│  SECTION 9: OTHER COUNTRIES                                 │
│  Links to Scotland, Wales, N. Ireland                      │
├─────────────────────────────────────────────────────────────┤
│  SECTION 10: FOOTER (Spec 05)                               │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### 3.2 Complete Desktop Layout

```
COUNTRY PAGE — DESKTOP (England Example)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ [LOGO]    [🔍 Search appliances, stores, repairs...]   For Business ▼  Login │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🏠 Home  >  England                                                       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🏴󠁧󠁢󠁥󠁮󠁧󠁿 GRADED APPLIANCES & REPAIR IN ENGLAND                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                          │
│                                                                             │
│  Find ex-display, graded and factory second appliances from trusted        │
│  retailers across England. Compare prices, warranties, and delivery        │
│  options from hundreds of specialist stores.                               │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  🛒 420+              🏪 890+            🔧 245+          💰 Save   │   │
│  │     Locations            Stores            Engineers        30-70%  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Browse by Region in England                                    [View all] │
│  ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│  Barking and       Barnet          Barnsley        Bath and North          │
│  Dagenham                                          East Somerset           │
│  Bedford           Bexley          Birmingham      Blackburn with          │
│  Blackpool         Bolton          Bournemouth,    Darwen                  │
│  Bracknell         Bradford        Christchurch    Brighton and            │
│  Forest                            and Poole       Hove                    │
│  Brent             Bristol         Bromley         Buckinghamshire         │
│  Bury              Calderdale      Cambridgeshire  Camden                  │
│  Central           Cheshire East   Cheshire West   City of London          │
│  Bedfordshire                      and Chester                             │
│  Cornwall          Coventry        Croydon         Cumberland              │
│  ...               ...             ...             ...                     │
│                                                                             │
│  (All 152 admin areas displayed in 4-column alphabetical grid)             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Popular Cities in England                                      [View all] │
│  ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │  London     │ │ Manchester  │ │ Birmingham  │ │   Leeds     │          │
│  │             │ │             │ │             │ │             │          │
│  │  42 stores  │ │  28 stores  │ │  24 stores  │ │  18 stores  │          │
│  │  12 repair  │ │   8 repair  │ │   6 repair  │ │   5 repair  │          │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │  Liverpool  │ │  Sheffield  │ │  Bristol    │ │ Newcastle   │          │
│  │             │ │             │ │             │ │             │          │
│  │  15 stores  │ │  14 stores  │ │  16 stores  │ │  12 stores  │          │
│  │   6 repair  │ │   4 repair  │ │   5 repair  │ │   4 repair  │          │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ Nottingham  │ │  Leicester  │ │   Coventry  │ │  Brighton   │          │
│  │             │ │             │ │             │ │             │          │
│  │  11 stores  │ │  10 stores  │ │   9 stores  │ │   8 stores  │          │
│  │   3 repair  │ │   4 repair  │ │   3 repair  │ │   2 repair  │          │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Browse by Appliance in England                                 [View all] │
│  ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐   │
│  │  🧺   │ │  🧊   │ │  🇺🇸   │ │  🍽️   │ │  🌀   │ │  📺   │ │  🔥   │   │
│  │Washing│ │Fridge │ │American│ │ Dish- │ │Tumble │ │  TVs  │ │ Ovens │   │
│  │Machine│ │Freezer│ │ Fridge │ │washer │ │ Dryer │ │       │ │       │   │
│  └───────┘ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘   │
│                                                                             │
│  ┌───────┐ ┌───────┐                                                       │
│  │  🍳   │ │  ➕   │                                                       │
│  │ Range │ │ View  │                                                       │
│  │Cookers│ │  All  │                                                       │
│  └───────┘ └───────┘                                                       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Frequently Asked Questions                                                │
│  ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ▸ What are graded appliances?                                       │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ What's the difference between A-grade, B-grade, and C-grade?     │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ Do graded appliances come with a warranty?                        │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ Can I get graded appliances delivered across England?            │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ How do I find appliance repair near me?                           │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ Is it better to repair or replace my appliance?                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                        [Read our complete guide →]                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Browse Other Countries                                                    │
│  ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐           │
│  │ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland     │ │ 🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales        │ │ 🇬🇧 N. Ireland    │           │
│  │                  │ │                  │ │                  │           │
│  │ 85 locations     │ │ 40 locations     │ │ 20 locations     │           │
│  │ 180+ stores      │ │ 95+ stores       │ │ 35+ stores       │           │
│  │                  │ │                  │ │                  │           │
│  │ [Browse →]       │ │ [Browse →]       │ │ [Browse →]       │           │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [FOOTER - Spec 05]                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
```

---

## 4. SECTION SPECIFICATIONS

### 4.1 Section 1: Navbar

**Standard navbar with search bar visible** (unlike homepage which hides it).

```typescript
// Country pages show the search bar in navbar
// This is the standard header, not the homepage variant

<Header />
// Logo | Search Bar | For Business | Login
```

---

### 4.2 Section 2: Breadcrumbs

```
BREADCRUMBS
═══════════════════════════════════════════════════════════════

DESKTOP:
🏠 Home  >  England

MOBILE:
< Home (single back link)

STRUCTURE:
├── Home → /
└── Country (current, no link)

SCHEMA.ORG:
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ukgradedappliances.co.uk/" },
    { "@type": "ListItem", "position": 2, "name": "England" }
  ]
}

STYLING:
├── Font size:       13px
├── Color:           #6B7280 (grey)
├── Link color:      #e85d4c (secondary)
├── Link hover:      Underline
├── Separator:       > (grey)
├── Margin bottom:   16px
└── Mobile:          Back arrow + "Home" only

═══════════════════════════════════════════════════════════════
```

**Component:**

```typescript
// components/country/CountryBreadcrumbs.tsx

interface Props {
  country: {
    name: string;
    slug: string;
  };
}

export default function CountryBreadcrumbs({ country }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      {/* Desktop */}
      <ol className="hidden md:flex items-center gap-2 text-sm text-gray-500">
        <li>
          <Link href="/" className="text-[#e85d4c] hover:underline">
            🏠 Home
          </Link>
        </li>
        <li className="text-gray-400">{'>'}</li>
        <li className="text-gray-700 font-medium">{country.name}</li>
      </ol>

      {/* Mobile - just back link */}
      <Link href="/" className="md:hidden flex items-center gap-1 text-[#e85d4c] text-sm">
        <span>←</span>
        <span>Home</span>
      </Link>
    </nav>
  );
}
```

---

### 4.3 Section 3: Hero

```
HERO SECTION
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🏴󠁧󠁢󠁥󠁮󠁧󠁿 GRADED APPLIANCES & REPAIR IN ENGLAND                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                   │
│                                                             │
│  Find ex-display, graded and factory second appliances     │
│  from trusted retailers across England. Compare prices,    │
│  warranties, and delivery options from hundreds of         │
│  specialist stores.                                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  🛒 420+       🏪 890+       🔧 245+     💰 Save   │   │
│  │   Locations      Stores       Engineers    30-70%  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA MAPPING:
├── Flag emoji:      countries.flag_emoji
├── H1:              countries.h1_heading OR "Graded Appliances & Repair in {name}"
├── Intro:           countries.intro_paragraph OR generated template
├── Locations:       countries.place_count
├── Stores:          countries.store_count
├── Engineers:       countries.provider_count
└── Discount:        "30-70%" (static)

STYLING:
├── Background:      #F8FAFC (slate-50)
├── Padding:         32px 24px (desktop), 24px 16px (mobile)
├── H1 font size:    36px (desktop), 28px (mobile)
├── H1 font weight:  800
├── H1 color:        #e85d4c (secondary)
├── Flag emoji:      Before H1, 40px
├── Intro text:      18px, #4B5563 (grey-600)
├── Stats box:       White background, rounded-lg, shadow-sm
├── Stats grid:      4 columns desktop, 2x2 mobile
├── Stat number:     Bold, 24px, secondary
├── Stat label:      14px, grey-600

═══════════════════════════════════════════════════════════════
```

**Component:**

```typescript
// components/country/CountryHero.tsx

interface Props {
  country: {
    name: string;
    flag_emoji: string;
    h1_heading: string | null;
    intro_paragraph: string | null;
    place_count: number;
    store_count: number;
    provider_count: number;
  };
}

export default function CountryHero({ country }: Props) {
  // Generate H1 from template if not set
  const h1 = country.h1_heading || `Graded Appliances & Repair in ${country.name}`;
  
  // Generate intro from template if not set
  const intro = country.intro_paragraph || 
    `Find ex-display, graded and factory second appliances from trusted retailers across ${country.name}. Compare prices, warranties, and delivery options from hundreds of specialist stores.`;

  return (
    <section className="bg-slate-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* H1 with Flag */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{country.flag_emoji}</span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#e85d4c]">
            {h1}
          </h1>
        </div>

        {/* Intro paragraph */}
        <p className="text-lg text-gray-600 max-w-3xl mb-6">
          {intro}
        </p>

        {/* Stats Box */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#e85d4c]">
                {country.place_count}+
              </div>
              <div className="text-sm text-gray-600">Locations</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#e85d4c]">
                {country.store_count}+
              </div>
              <div className="text-sm text-gray-600">Stores</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#e85d4c]">
                {country.provider_count}+
              </div>
              <div className="text-sm text-gray-600">Engineers</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#e85d4c]">
                30-70%
              </div>
              <div className="text-sm text-gray-600">Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### 4.4 Section 4: Browse by Region (Admin Areas)

This is the **primary SEO section** — shows ALL admin areas within the country for maximum internal linking.

```
BROWSE BY REGION
═══════════════════════════════════════════════════════════════

DESKTOP (4-5 columns, alphabetical):
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Browse by Region in England                    [View all → │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Barking and       Barnet          Barnsley       Bath and │
│  Dagenham                                         North    │
│  Bedford           Bexley          Birmingham     East     │
│                                                   Somerset │
│  Blackburn with    Blackpool       Bolton        Bourne-   │
│  Darwen                                          mouth     │
│  ...               ...             ...           ...       │
│                                                             │
│  (All admin areas in alphabetical order)                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

MOBILE (2 columns, scrollable or collapsed):
┌─────────────────────────────────────────┐
│                                         │
│  Browse by Region         [Show all ▼] │
│  ─────────────────────────────────────  │
│                                         │
│  Barking and     Barnet                │
│  Dagenham                              │
│  Barnsley        Bath and North        │
│                  East Somerset         │
│  Bedford         Bexley                │
│  Birmingham      Blackburn with        │
│                  Darwen                │
│  ...             ...                   │
│                                         │
│  (Initially show 20, expand on tap)    │
│                                         │
└─────────────────────────────────────────┘

LINK DESTINATION:
├── Each admin area links to: /{country}/{admin-area}/
├── Example: /england/greater-manchester/
└── Note: Admin area pages may have limited content initially

STYLING:
├── Section bg:      White
├── Padding:         48px 24px (desktop), 32px 16px (mobile)
├── H2 font size:    24px (desktop), 20px (mobile)
├── H2 font weight:  700
├── Grid:            4-5 columns desktop, 2 columns mobile
├── Gap:             12px 24px
├── Link font size:  14px
├── Link color:      #4B5563 (grey-600)
├── Link hover:      #e85d4c (secondary), underline
├── Line height:     1.6 (generous for readability)

═══════════════════════════════════════════════════════════════
```

**Component:**

```typescript
// components/country/BrowseByRegionSection.tsx

interface AdminArea {
  id: string;
  name: string;
  slug: string;
  store_count: number;
  provider_count: number;
}

interface Props {
  countrySlug: string;
  countryName: string;
  adminAreas: AdminArea[];
}

export default function BrowseByRegionSection({ 
  countrySlug, 
  countryName, 
  adminAreas 
}: Props) {
  const [showAll, setShowAll] = useState(false);
  
  // On mobile, show limited initially
  const displayAreas = showAll ? adminAreas : adminAreas.slice(0, 20);
  const hasMore = adminAreas.length > 20;

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Browse by Region in {countryName}
          </h2>
          <span className="text-sm text-gray-500">
            {adminAreas.length} regions
          </span>
        </div>

        {/* Admin Areas Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-2">
          {displayAreas.map((area) => (
            <Link
              key={area.id}
              href={`/${countrySlug}/${area.slug}/`}
              className="text-sm text-gray-600 hover:text-[#e85d4c] hover:underline py-1"
            >
              {area.name}
            </Link>
          ))}
        </div>

        {/* Show More (Mobile) */}
        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-6 text-[#e85d4c] font-medium text-sm hover:underline md:hidden"
          >
            Show all {adminAreas.length} regions ▼
          </button>
        )}
      </div>
    </section>
  );
}
```

---

### 4.5 Section 5: Popular Cities

```
POPULAR CITIES
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Popular Cities in England                      [View all] │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   London    │ │ Manchester  │ │ Birmingham  │           │
│  │  42 stores  │ │  28 stores  │ │  24 stores  │           │
│  │  12 repair  │ │   8 repair  │ │   6 repair  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│  ... (12 total in 4 columns)                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA:
├── Source:         places table, filtered by country_id
├── Order:          store_count DESC
├── Limit:          12
├── Link:           /{country}/{city}/ (city hub)

CARD CONTENT:
├── City name:      Bold, secondary on hover
├── Store count:    "{n} stores"
├── Provider count: "{n} repair"

STYLING:
├── Section bg:     #F8FAFC (slate-50)
├── Card bg:        White
├── Card border:    1px #E2E8F0
├── Card hover:     Shadow-md, border secondary
├── Grid:           4 columns desktop, 2 columns mobile
├── Gap:            16px

═══════════════════════════════════════════════════════════════
```

**Component:**

```typescript
// components/country/PopularCitiesSection.tsx

interface City {
  id: string;
  name: string;
  slug: string;
  store_count: number;
  provider_count: number;
}

interface Props {
  countrySlug: string;
  countryName: string;
  cities: City[];
  totalCities: number;
}

export default function PopularCitiesSection({ 
  countrySlug, 
  countryName, 
  cities, 
  totalCities 
}: Props) {
  return (
    <section className="py-8 md:py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Popular Cities in {countryName}
          </h2>
          <Link
            href={`/${countrySlug}/`}
            className="text-sm text-[#e85d4c] font-medium hover:underline hidden md:block"
          >
            View all {totalCities} cities →
          </Link>
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/${countrySlug}/${city.slug}/`}
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-[#e85d4c] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-[#e85d4c] mb-2">
                {city.name}
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>{city.store_count} stores</div>
                <div>{city.provider_count} repair</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 text-center md:hidden">
          <Link
            href={`/${countrySlug}/`}
            className="text-[#e85d4c] font-medium hover:underline"
          >
            View all {totalCities} cities →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

### 4.6 Section 6: Browse by Appliance

```
BROWSE BY APPLIANCE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Browse by Appliance in England                 [View all] │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐        │
│  │  🧺   │ │  🧊   │ │  🇺🇸   │ │  🍽️   │ │  🌀   │        │
│  │Washing│ │Fridge │ │American│ │ Dish- │ │Tumble │        │
│  │Machine│ │Freezer│ │ Fridge │ │washer │ │ Dryer │        │
│  └───────┘ └───────┘ └───────┘ └───────┘ └───────┘        │
│                                                             │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                   │
│  │  📺   │ │  🔥   │ │  🍳   │ │  ➕   │                   │
│  │  TVs  │ │ Ovens │ │ Range │ │ View  │                   │
│  │       │ │       │ │Cookers│ │  All  │                   │
│  └───────┘ └───────┘ └───────┘ └───────┘                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

LINK DESTINATION:
├── Option A: /{category}/ (national category page)
├── Option B: /{country}/{popular-city}/{category}/ (local category)
└── Recommendation: Use national /{category}/ for SEO

STYLING:
├── Same as homepage Browse by Appliance section
├── 8-9 items in grid
├── Last item = "View All" card

═══════════════════════════════════════════════════════════════
```

**Component:**

```typescript
// components/country/BrowseByApplianceSection.tsx
// (Reuse from homepage with country context)

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface Props {
  countryName: string;
  categories: Category[];
}

export default function BrowseByApplianceSection({ 
  countryName, 
  categories 
}: Props) {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Browse by Appliance in {countryName}
          </h2>
          <Link
            href="/appliances/"
            className="text-sm text-[#e85d4c] font-medium hover:underline hidden md:block"
          >
            View all categories →
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}/`}
              className="group flex flex-col items-center p-3 md:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 hover:shadow-sm transition-all text-center"
            >
              <span className="text-2xl md:text-3xl mb-2">{category.icon}</span>
              <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-[#e85d4c]">
                {category.name.split(' ')[0]}
              </span>
            </Link>
          ))}
          
          {/* View All Card */}
          <Link
            href="/appliances/"
            className="group flex flex-col items-center justify-center p-3 md:p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all text-center"
          >
            <span className="text-2xl md:text-3xl mb-2">➕</span>
            <span className="text-xs md:text-sm font-medium text-gray-600">
              View All
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

### 4.7 Section 7: FAQ

```
FAQ SECTION
═══════════════════════════════════════════════════════════════

Standard FAQ accordion with 6 questions.
Same structure as homepage FAQ, but with country-contextualized answers.

QUESTIONS:
1. What are graded appliances?
2. What's the difference between A-grade, B-grade, and C-grade?
3. Do graded appliances come with a warranty?
4. Can I get graded appliances delivered across {Country}?
5. How do I find appliance repair near me?
6. Is it better to repair or replace my appliance?

SCHEMA.ORG FAQPage markup required.

═══════════════════════════════════════════════════════════════
```

**Component:** Reuse FAQSection from homepage with country-specific context.

---

### 4.8 Section 8: Other Countries

```
OTHER COUNTRIES
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Browse Other Countries                                    │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌──────────────────┐ ┌──────────────────┐                 │
│  │ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland     │ │ 🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales        │                 │
│  │                  │ │                  │                 │
│  │ 85 locations     │ │ 40 locations     │                 │
│  │ 180+ stores      │ │ 95+ stores       │                 │
│  │ 62 engineers     │ │ 28 engineers     │                 │
│  │                  │ │                  │                 │
│  │ [Browse →]       │ │ [Browse →]       │                 │
│  └──────────────────┘ └──────────────────┘                 │
│                                                             │
│  ┌──────────────────┐                                      │
│  │ 🇬🇧 N. Ireland    │                                      │
│  │                  │                                      │
│  │ 20 locations     │                                      │
│  │ 35+ stores       │                                      │
│  │ 12 engineers     │                                      │
│  │                  │                                      │
│  │ [Browse →]       │                                      │
│  └──────────────────┘                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

PURPOSE:
├── No dead ends — user can always explore other countries
├── Internal linking — pass link equity between country pages
├── UX — complete UK coverage awareness

STYLING:
├── Section bg:     #F8FAFC (slate-50)
├── Card bg:        White
├── Grid:           3 columns desktop, 2 columns tablet, 1 mobile
├── Card content:   Flag + name + stats + CTA

═══════════════════════════════════════════════════════════════
```

**Component:**

```typescript
// components/country/OtherCountriesSection.tsx

interface Country {
  name: string;
  slug: string;
  flag_emoji: string;
  place_count: number;
  store_count: number;
  provider_count: number;
}

interface Props {
  countries: Country[];
}

export default function OtherCountriesSection({ countries }: Props) {
  if (countries.length === 0) return null;

  return (
    <section className="py-8 md:py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Browse Other Countries
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/${country.slug}/`}
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-[#e85d4c] hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{country.flag_emoji}</span>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#e85d4c]">
                  {country.name}
                </h3>
              </div>
              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <div>{country.place_count} locations</div>
                <div>{country.store_count}+ stores</div>
                <div>{country.provider_count} engineers</div>
              </div>
              <span className="text-[#e85d4c] font-medium text-sm group-hover:underline">
                Browse →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 5. SEO IMPLEMENTATION

### 5.1 Meta Tags

```typescript
// Generate meta tags for country page

export function generateCountryMetadata(country: Country): Metadata {
  const title = country.seo_title || 
    `Graded Appliances & Repair in ${country.name} | UK Graded Appliances`;
  
  const description = country.seo_meta_description ||
    `Find ${country.store_count}+ graded appliance stores and ${country.provider_count}+ repair engineers across ${country.place_count}+ locations in ${country.name}. Compare prices, warranties, and delivery options.`;

  return {
    title,
    description,
    keywords: `graded appliances ${country.name}, ex-display appliances ${country.name}, factory seconds ${country.name}, appliance repair ${country.name}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: `https://ukgradedappliances.co.uk/${country.slug}/`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://ukgradedappliances.co.uk/${country.slug}/`,
    },
    robots: {
      index: country.is_indexable,
      follow: true,
    },
  };
}
```

### 5.2 Schema.org Structured Data

```typescript
// Generate schema for country page

function generateCountrySchema(country: Country, faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `https://ukgradedappliances.co.uk/${country.slug}/#webpage`,
        url: `https://ukgradedappliances.co.uk/${country.slug}/`,
        name: `Graded Appliances & Repair in ${country.name}`,
        description: `Find graded appliance stores and repair engineers across ${country.name}.`,
        isPartOf: { '@id': 'https://ukgradedappliances.co.uk/#website' },
        breadcrumb: { '@id': `https://ukgradedappliances.co.uk/${country.slug}/#breadcrumb` },
      },

      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `https://ukgradedappliances.co.uk/${country.slug}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://ukgradedappliances.co.uk/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: country.name
          }
        ]
      },

      // FAQPage (if FAQs present)
      ...(faqs.length > 0 ? [{
        '@type': 'FAQPage',
        '@id': `https://ukgradedappliances.co.uk/${country.slug}/#faq`,
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }] : [])
    ]
  };
}
```

### 5.3 H-Tag Structure

```
<h1>Graded Appliances & Repair in {Country}</h1>
├── <h2>Browse by Region in {Country}</h2>
├── <h2>Popular Cities in {Country}</h2>
├── <h2>Browse by Appliance in {Country}</h2>
├── <h2>Frequently Asked Questions</h2>
└── <h2>Browse Other Countries</h2>
```

---

## 6. MOBILE RESPONSIVE DESIGN

### 6.1 Mobile Layout

```
MOBILE (< 768px)
┌────────────────────────────────────┐
│ [LOGO]  [🔍]    [Biz ▼] [Login]   │
├────────────────────────────────────┤
│ < Home                             │
├────────────────────────────────────┤
│ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 GRADED APPLIANCES &         │
│    REPAIR IN ENGLAND              │
│                                    │
│ Find ex-display appliances...     │
│                                    │
│ ┌────────────────────────────────┐│
│ │ 420+      890+      245+  30%  ││
│ │ Locations Stores  Repair Save  ││
│ └────────────────────────────────┘│
├────────────────────────────────────┤
│ Browse by Region       [Show all ▼]│
│ ─────────────────────────────────  │
│ Barking and     Barnet            │
│ Dagenham                          │
│ Barnsley        Bath and NE       │
│ Bedford         Bexley            │
│ ... (20 shown, tap to expand)     │
├────────────────────────────────────┤
│ Popular Cities          [View all]│
│ ─────────────────────────────────  │
│ ┌──────────┐ ┌──────────┐        │
│ │ London   │ │Manchester│        │
│ │ 42 stores│ │ 28 stores│        │
│ └──────────┘ └──────────┘        │
│ ... (2 columns)                   │
├────────────────────────────────────┤
│ Browse by Appliance               │
│ ─────────────────────────────────  │
│ ┌───┐ ┌───┐ ┌───┐                │
│ │🧺│ │🧊│ │🇺🇸│                │
│ └───┘ └───┘ └───┘                │
│ (3 columns)                       │
├────────────────────────────────────┤
│ FAQs (accordion)                  │
├────────────────────────────────────┤
│ Other Countries                   │
│ ┌────────────────────────────────┐│
│ │ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland                 ││
│ │ 85 locations • 180+ stores    ││
│ └────────────────────────────────┘│
│ (stacked cards)                   │
├────────────────────────────────────┤
│ [FOOTER]                          │
└────────────────────────────────────┘
```

### 6.2 Touch Targets

All interactive elements: **minimum 48px × 48px**

---

## 7. COMPLETE PAGE COMPONENT

```typescript
// app/[country]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCountryPageData } from '@/lib/data/getCountryPageData';
import { generateCountryMetadata, generateCountrySchema } from '@/lib/seo/country';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CountryBreadcrumbs from '@/components/country/CountryBreadcrumbs';
import CountryHero from '@/components/country/CountryHero';
import BrowseByRegionSection from '@/components/country/BrowseByRegionSection';
import PopularCitiesSection from '@/components/country/PopularCitiesSection';
import BrowseByApplianceSection from '@/components/country/BrowseByApplianceSection';
import FAQSection from '@/components/shared/FAQSection';
import OtherCountriesSection from '@/components/country/OtherCountriesSection';
import SchemaOrg from '@/components/seo/SchemaOrg';

interface Props {
  params: { country: string };
}

// Valid country slugs
const VALID_COUNTRIES = ['england', 'scotland', 'wales', 'northern-ireland'];

export async function generateStaticParams() {
  return VALID_COUNTRIES.map(country => ({ country }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getCountryPageData(params.country);
  if (!data) return {};
  return generateCountryMetadata(data.country);
}

export default async function CountryPage({ params }: Props) {
  // Validate country slug
  if (!VALID_COUNTRIES.includes(params.country)) {
    notFound();
  }

  // Fetch all data
  const data = await getCountryPageData(params.country);
  
  if (!data) {
    notFound();
  }

  const { 
    country, 
    adminAreas, 
    popularCities, 
    totalCities, 
    categories, 
    faqs, 
    otherCountries 
  } = data;

  // Generate schema
  const schema = generateCountrySchema(country, faqs);

  return (
    <>
      <SchemaOrg data={schema} />
      <Header />
      
      <main>
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 pt-4">
          <CountryBreadcrumbs country={country} />
        </div>

        {/* Hero */}
        <CountryHero country={country} />

        {/* Browse by Region */}
        <BrowseByRegionSection
          countrySlug={country.slug}
          countryName={country.name}
          adminAreas={adminAreas}
        />

        {/* Popular Cities */}
        <PopularCitiesSection
          countrySlug={country.slug}
          countryName={country.name}
          cities={popularCities}
          totalCities={totalCities}
        />

        {/* Browse by Appliance */}
        <BrowseByApplianceSection
          countryName={country.name}
          categories={categories}
        />

        {/* FAQ */}
        {faqs.length > 0 && (
          <FAQSection faqs={faqs} />
        )}

        {/* Other Countries */}
        <OtherCountriesSection countries={otherCountries} />
      </main>

      <Footer />
    </>
  );
}

export const revalidate = 3600; // ISR: 1 hour
```

---

## 8. INTERNAL LINKING SUMMARY

### 8.1 Links FROM Country Page

| Section | Links To | Count |
|---------|----------|-------|
| Breadcrumbs | Homepage | 1 |
| Browse by Region | Admin area pages | 152 (England) |
| Popular Cities | City hub pages | 12 |
| Browse by Appliance | National category pages | 9 |
| FAQ | Guide pages | 1 |
| Other Countries | Other country pages | 3 |
| Footer | All standard footer links | 250+ |

**Total internal links per country page: ~175+ unique destinations**

### 8.2 Links TO Country Page

| Source | Link Location |
|--------|---------------|
| Homepage | Browse by Country section |
| City Hub pages | Breadcrumbs |
| Category pages | Breadcrumbs |
| Footer | Browse by Region section |
| Other Country pages | Other Countries section |

---

## 9. TESTING CHECKLIST

### 9.1 Functional Tests
- [ ] All 4 country pages load correctly
- [ ] Breadcrumbs navigate properly
- [ ] Stats display correct counts
- [ ] All admin area links work
- [ ] All city links work
- [ ] All category links work
- [ ] FAQ accordion works
- [ ] Other countries links work

### 9.2 SEO Tests
- [ ] Unique H1 per country
- [ ] Meta title under 60 chars
- [ ] Meta description under 160 chars
- [ ] Schema.org validates
- [ ] Canonical URL correct
- [ ] Internal links pass equity

### 9.3 Performance Tests
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Total page weight < 500KB
- [ ] ISR working (1 hour revalidation)

### 9.4 Mobile Tests
- [ ] Touch targets ≥ 48px
- [ ] No horizontal scroll
- [ ] Regions expand/collapse
- [ ] Cards display correctly

---

## 10. CHANGE LOG

| Date | Version | Change |
|------|---------|--------|
| Jan 2026 | v1.0 | Initial specification |

---

**END OF SPECIFICATION 13: COUNTRY PAGE**
