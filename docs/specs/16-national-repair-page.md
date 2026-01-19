# SPECIFICATION 16: NATIONAL REPAIR PAGE

## UK Graded Appliances Directory
**Version:** 1.0 — LOCKED  
**Status:** ✅ APPROVED
**Last Updated:** January 2026
**Dependencies:** Spec 07 (City Hub), Spec 09 (Provider Card), Spec 10 (Repair Category Page), Spec 11 (Provider Profile), Spec 13 (Country Page)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Purpose
The National Repair Page is a **UK-wide category repair landing page** that aggregates all cities where a specific appliance repair service is available. This is a top-of-funnel SEO page designed to capture broad, non-location-specific repair queries and distribute users to their local repair pages.

### 1.2 URL Pattern

```
/{category}-repair/

EXAMPLES:
├── /washing-machine-repair/
├── /fridge-freezer-repair/
├── /dishwasher-repair/
├── /tumble-dryer-repair/
├── /oven-repair/
├── /american-fridge-freezer-repair/
├── /hob-repair/
└── /tv-repair/
```

### 1.3 Strategic Importance

| Factor | Value |
|--------|-------|
| **SEO Priority** | ⭐⭐⭐ High — Non-location head terms |
| **Keyword Volume** | Very High — Generic repair queries |
| **User Intent** | Research — Exploring options |
| **Conversion** | Medium — Funnels to local pages |
| **AI Citation** | Strong — Overview content, statistics |

### 1.4 Target Keywords

```
KEYWORD TARGETS — NATIONAL REPAIR PAGE
═══════════════════════════════════════════════════════════════

NON-LOCATION (primary):
├── "washing machine repair"
├── "fridge freezer repair"
├── "dishwasher repair UK"
├── "tumble dryer repair"
├── "oven repair service"

GENERIC QUESTIONS:
├── "how much does washing machine repair cost"
├── "is it worth repairing a washing machine"
├── "how to find appliance repair near me"
├── "appliance repair cost UK"

INFORMATIONAL:
├── "washing machine repair costs UK"
├── "fridge repair prices"
├── "average dishwasher repair cost"
├── "appliance repair vs replace"

BRAND + CATEGORY (national):
├── "bosch washing machine repair"
├── "samsung fridge repair"
├── "hotpoint dishwasher repair"

═══════════════════════════════════════════════════════════════
```

### 1.5 Key Differentiator

| National Repair Page | Local Repair Category Page |
|---------------------|---------------------------|
| URL: `/washing-machine-repair/` | URL: `/england/manchester/washing-machine-repair/` |
| Shows ALL cities with service | Shows providers IN one city |
| Generic cost/info content | Specific provider listings |
| Links TO local pages | Links FROM national page |
| High funnel (research) | Low funnel (booking) |
| No provider cards | Full provider cards |

---

## 2. PAGE CONNECTION MAP

### 2.1 Site Hierarchy Position

```
PAGE HIERARCHY — NATIONAL REPAIR PAGE
═══════════════════════════════════════════════════════════════

                         ┌──────────────────┐
                         │     HOMEPAGE     │
                         │        /         │
                         └────────┬─────────┘
                                  │
                      ┌───────────┼───────────┐
                      │           │           │
                      ▼           ▼           ▼
            ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
            │   COUNTRY    │  │   NATIONAL   │  │   NATIONAL   │
            │    PAGE      │  │   CATEGORY   │  │   REPAIR     │
            │  /england/   │  │  (retail)    │  │    PAGE      │
            │              │  │ /washing-    │  │ /washing-    │
            │              │  │  machines/   │  │ machine-     │
            │              │  │              │  │ repair/      │
            └──────┬───────┘  └──────────────┘  └──────┬───────┘
                   │                                    │
                   │            ◄── THIS SPEC ──►      │
                   │                                    │
                   ▼                                    ▼
          ┌───────────────┐               ┌───────────────────┐
          │   CITY HUB    │               │ LOCAL REPAIR PAGE │
          │ /england/     │◄──────────────│ /england/         │
          │  manchester/  │               │  manchester/      │
          │               │               │  washing-machine- │
          │               │               │  repair/          │
          └───────────────┘               └───────────────────┘

═══════════════════════════════════════════════════════════════
```

### 2.2 Inbound Links (TO this page)

```
INBOUND LINKS — NATIONAL REPAIR PAGE
═══════════════════════════════════════════════════════════════

FROM HOMEPAGE (Spec 12):
─────────────────────────────────────────────────────────────────
/
├── Browse by Service section
│   └── "Washing Machine Repair" → /washing-machine-repair/
├── FAQ answers
│   └── "Find {category} repair engineers across the UK"

FROM FOOTER (Spec 05):
─────────────────────────────────────────────────────────────────
(all pages)
├── Repair Services column
│   └── "Washing Machine Repair" → /washing-machine-repair/
│   └── "Fridge Freezer Repair" → /fridge-freezer-repair/

FROM LOCAL REPAIR PAGES (Spec 10):
─────────────────────────────────────────────────────────────────
/england/manchester/washing-machine-repair/
├── Breadcrumbs (optional)
│   └── "UK Washing Machine Repair" → /washing-machine-repair/
├── "Find repair in other cities" section

FROM CITY HUB (Spec 07):
─────────────────────────────────────────────────────────────────
/england/manchester/
├── Repair section header
│   └── "See all UK {category} repair →"

FROM PROVIDER PROFILE (Spec 11):
─────────────────────────────────────────────────────────────────
/provider/joes-repairs/
├── Services section badges
│   └── "Washing Machine Repair" → /washing-machine-repair/

FROM OTHER NATIONAL REPAIR PAGES:
─────────────────────────────────────────────────────────────────
/fridge-freezer-repair/
├── Related Services section
│   └── "Washing Machine Repair" → /washing-machine-repair/

FROM GUIDES:
─────────────────────────────────────────────────────────────────
/guides/washing-machine-not-spinning/
├── CTA section
│   └── "Find a washing machine repair engineer →"

═══════════════════════════════════════════════════════════════
```

### 2.3 Outbound Links (FROM this page)

```
OUTBOUND LINKS — NATIONAL REPAIR PAGE
═══════════════════════════════════════════════════════════════

TO LOCAL REPAIR PAGES (Spec 10):
─────────────────────────────────────────────────────────────────
├── City listings grid
│   └── "Manchester" → /england/manchester/washing-machine-repair/
│   └── "Birmingham" → /england/birmingham/washing-machine-repair/
│   └── (all 565 places with providers)

TO COUNTRY PAGES (Spec 13):
─────────────────────────────────────────────────────────────────
├── Browse by Country section
│   └── "England" → /england/
│   └── "Scotland" → /scotland/

TO HOMEPAGE:
─────────────────────────────────────────────────────────────────
├── Breadcrumbs → /
├── Logo → /

TO OTHER NATIONAL REPAIR PAGES:
─────────────────────────────────────────────────────────────────
├── Related Repair Services section
│   └── "Fridge Freezer Repair" → /fridge-freezer-repair/
│   └── "Dishwasher Repair" → /dishwasher-repair/

TO NATIONAL RETAIL CATEGORY:
─────────────────────────────────────────────────────────────────
├── Cross-sell section
│   └── "Shop Graded Washing Machines" → /washing-machines/

TO GUIDES:
─────────────────────────────────────────────────────────────────
├── Common Issues section
│   └── "Why won't my washing machine spin?" → /guides/washing-machine-not-spinning/
├── Repair vs Replace section
│   └── "Should I repair or replace?" → /tools/repair-or-replace/

TO EXTERNAL (Affiliate):
─────────────────────────────────────────────────────────────────
├── Parts section
│   └── "Buy washing machine parts" → eSpares.co.uk (affiliate)
├── Warranty section
│   └── "Protect your appliance" → D&G (affiliate)

═══════════════════════════════════════════════════════════════
```

---

## 3. DATABASE DEPENDENCIES

### 3.1 Tables Used

```sql
-- Primary tables
appliance_categories (
  id, name, name_plural, name_singular, slug, tier, icon,
  repair_seo_title_template, repair_h1_template, repair_intro_template,
  common_issues, avg_repair_cost_min, avg_repair_cost_max,
  avg_lifespan_years, supports_repair, is_active
)

countries (
  id, name, slug, flag_emoji, place_count, provider_count
)

places (
  id, country_id, name, slug, provider_count,
  is_active, is_indexable
)

service_providers (
  -- Aggregated counts only
  COUNT(*) as total_providers
)

provider_services (
  provider_id, appliance_category_id, is_active
)

provider_coverage_places (
  provider_id, place_id
)

-- Content
faqs (
  id, question, answer, category_id, page_type
  -- WHERE page_type = 'repair_national'
)

-- Anti-thin gating
page_indexability (
  page_type = 'repair_national',
  category_id,
  provider_count, min_providers_required,
  is_indexable, canonical_url
)
```

### 3.2 Category Data Reference

```
REPAIR CATEGORIES — NATIONAL PAGES
═══════════════════════════════════════════════════════════════

TIER 1 (highest traffic):
├── Washing Machines      → /washing-machine-repair/
├── Fridge Freezers       → /fridge-freezer-repair/
├── American Fridge Freezers → /american-fridge-freezer-repair/

TIER 2 (medium traffic):
├── Dishwashers          → /dishwasher-repair/
├── Tumble Dryers        → /tumble-dryer-repair/
├── Televisions          → /tv-repair/

TIER 3 (lower traffic):
├── Built-in Ovens       → /oven-repair/
├── Range Cookers        → /range-cooker-repair/
├── Hobs                 → /hob-repair/

SUPPLEMENTARY (if volume justifies):
├── Freezers             → /freezer-repair/
├── Washer Dryers        → /washer-dryer-repair/
├── Microwaves           → /microwave-repair/
├── Cooker Hoods         → /cooker-hood-repair/

TOTAL: 9-15 national repair pages

═══════════════════════════════════════════════════════════════
```

### 3.3 Primary Data Query

```typescript
// lib/data/getNationalRepairPageData.ts

import { createClient } from '@/lib/supabase/server';

interface NationalRepairPageData {
  category: ApplianceCategory;
  citiesByCountry: CountryWithCities[];
  popularCities: CityWithProviderCount[];
  totalProviders: number;
  totalCities: number;
  relatedCategories: ApplianceCategory[];
  stats: NationalRepairStats;
  faqs: FAQ[];
  isIndexable: boolean;
}

interface CountryWithCities {
  country: Country;
  cities: CityWithProviderCount[];
}

interface CityWithProviderCount {
  id: string;
  name: string;
  slug: string;
  country_slug: string;
  provider_count: number;
}

export async function getNationalRepairPageData(
  categoryRepairSlug: string
): Promise<NationalRepairPageData | null> {
  const supabase = createClient();

  // 1. Parse category slug from repair URL
  // "washing-machine-repair" → need to match to "washing-machines" category
  const categorySlug = parseCategoryFromRepairSlug(categoryRepairSlug);
  
  // 2. Get category details
  const { data: category, error: categoryError } = await supabase
    .from('appliance_categories')
    .select('*')
    .eq('slug', categorySlug)
    .eq('is_active', true)
    .eq('supports_repair', true)
    .single();

  if (categoryError || !category) return null;

  // 3. Get all cities with providers for this category, grouped by country
  const { data: citiesWithProviders } = await supabase
    .rpc('get_cities_with_repair_providers', {
      p_category_id: category.id
    });

  // 4. Get countries
  const { data: countries } = await supabase
    .from('countries')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  // 5. Aggregate cities by country
  const citiesByCountry = countries?.map(country => ({
    country,
    cities: citiesWithProviders?.filter(city => 
      city.country_slug === country.slug
    ) || []
  })).filter(group => group.cities.length > 0) || [];

  // 6. Get popular cities (top 12 by provider count)
  const popularCities = [...(citiesWithProviders || [])]
    .sort((a, b) => b.provider_count - a.provider_count)
    .slice(0, 12);

  // 7. Calculate totals
  const totalProviders = citiesWithProviders?.reduce(
    (sum, city) => sum + city.provider_count, 0
  ) || 0;
  const totalCities = citiesWithProviders?.length || 0;

  // 8. Get related repair categories (same tier)
  const { data: relatedCategories } = await supabase
    .from('appliance_categories')
    .select('id, name, name_singular, slug, tier, icon')
    .eq('supports_repair', true)
    .eq('is_active', true)
    .neq('id', category.id)
    .in('tier', ['tier_1', 'tier_2', 'tier_3'])
    .order('display_order', { ascending: true })
    .limit(6);

  // 9. Get FAQs for national repair pages
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('category_id', category.id)
    .eq('page_type', 'repair_national')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .limit(8);

  // 10. Check indexability
  const { data: indexability } = await supabase
    .from('page_indexability')
    .select('is_indexable')
    .eq('page_type', 'repair_national')
    .eq('category_id', category.id)
    .single();

  // 11. Compute stats
  const stats: NationalRepairStats = {
    totalProviders,
    totalCities,
    avgCostMin: category.avg_repair_cost_min || 45,
    avgCostMax: category.avg_repair_cost_max || 150,
    avgLifespan: category.avg_lifespan_years || 10,
    commonIssues: category.common_issues || []
  };

  return {
    category,
    citiesByCountry,
    popularCities,
    totalProviders,
    totalCities,
    relatedCategories: relatedCategories || [],
    stats,
    faqs: faqs || [],
    isIndexable: indexability?.is_indexable ?? (totalProviders >= 10)
  };
}

// Helper function to parse category slug from repair URL
function parseCategoryFromRepairSlug(repairSlug: string): string {
  // "washing-machine-repair" → "washing-machines"
  // "fridge-freezer-repair" → "fridge-freezers"
  // "dishwasher-repair" → "dishwashers"
  // "tv-repair" → "televisions"
  
  const slug = repairSlug.replace('-repair', '');
  
  // Special case mappings
  const mappings: Record<string, string> = {
    'washing-machine': 'washing-machines',
    'fridge-freezer': 'fridge-freezers',
    'american-fridge-freezer': 'american-fridge-freezers',
    'dishwasher': 'dishwashers',
    'tumble-dryer': 'tumble-dryers',
    'tv': 'televisions',
    'television': 'televisions',
    'oven': 'built-in-ovens',
    'range-cooker': 'range-cookers',
    'hob': 'hobs',
    'freezer': 'freezers',
    'washer-dryer': 'washer-dryers',
    'microwave': 'microwaves',
    'cooker-hood': 'cooker-hoods',
    'cooker': 'cookers'
  };
  
  return mappings[slug] || slug + 's';
}
```

### 3.4 Database Function for City Provider Counts

```sql
-- Function to get all cities with repair providers for a category
CREATE OR REPLACE FUNCTION get_cities_with_repair_providers(
  p_category_id UUID
)
RETURNS TABLE (
  id UUID,
  name VARCHAR(200),
  slug VARCHAR(200),
  country_slug VARCHAR(100),
  provider_count BIGINT
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    p.id,
    p.name,
    p.slug,
    c.slug as country_slug,
    COUNT(DISTINCT sp.id) as provider_count
  FROM places p
  INNER JOIN countries c ON p.country_id = c.id
  INNER JOIN provider_coverage_places pcp ON pcp.place_id = p.id
  INNER JOIN service_providers sp ON sp.id = pcp.provider_id
  INNER JOIN provider_services ps ON ps.provider_id = sp.id
  WHERE ps.appliance_category_id = p_category_id
    AND ps.is_active = true
    AND sp.is_active = true
    AND sp.status = 'active'
    AND p.is_active = true
  GROUP BY p.id, p.name, p.slug, c.slug
  HAVING COUNT(DISTINCT sp.id) >= 1
  ORDER BY provider_count DESC, p.name ASC;
$$;
```

---

## 4. PAGE STRUCTURE

### 4.1 Section Overview

```
NATIONAL REPAIR PAGE — SECTION ORDER
═══════════════════════════════════════════════════════════════

 ┌─────────────────────────────────────────────────────────────┐
 │ 1. NAVBAR (Spec 02) — WITH search bar                      │
 ├─────────────────────────────────────────────────────────────┤
 │ 2. BREADCRUMBS — Home > Washing Machine Repair             │
 ├─────────────────────────────────────────────────────────────┤
 │ 3. HERO — H1 + stats + intro paragraph                     │
 │    "Washing Machine Repair UK"                             │
 │    🔧 450+ Engineers | 📍 280+ Cities | 💰 From £45        │
 ├─────────────────────────────────────────────────────────────┤
 │ 4. POPULAR CITIES — Top 12 cities by provider count        │
 │    [Manchester] [Birmingham] [London] [Leeds] ...          │
 ├─────────────────────────────────────────────────────────────┤
 │ 5. BROWSE BY COUNTRY — England, Scotland, Wales, N.Ireland │
 │    ├── England (420 cities)                                │
 │    │   └── [City] [City] [City] ... [View All]             │
 │    ├── Scotland (85 cities)                                │
 │    └── ...                                                 │
 ├─────────────────────────────────────────────────────────────┤
 │ 6. REPAIR COSTS — Average costs, what affects price        │
 │    "Average: £45 - £150" + factors list                    │
 ├─────────────────────────────────────────────────────────────┤
 │ 7. COMMON ISSUES — Problems we fix                         │
 │    [Not Spinning] [Not Draining] [Noisy] [Leaking]         │
 ├─────────────────────────────────────────────────────────────┤
 │ 8. WHEN TO REPAIR VS REPLACE — Decision guide              │
 │    Age chart + cost threshold + CTA to calculator          │
 ├─────────────────────────────────────────────────────────────┤
 │ 9. RELATED REPAIR SERVICES — Other categories              │
 │    [Fridge Freezer] [Dishwasher] [Tumble Dryer] ...        │
 ├─────────────────────────────────────────────────────────────┤
 │ 10. DIY PARTS — Affiliate section (eSpares)                │
 │     "Fix it yourself — order genuine parts"                │
 ├─────────────────────────────────────────────────────────────┤
 │ 11. FAQ — National-level questions                         │
 │     Schema.org FAQPage markup                              │
 ├─────────────────────────────────────────────────────────────┤
 │ 12. CROSS-SELL — Beyond repair? Shop graded                │
 │     "Browse Graded Washing Machines"                       │
 ├─────────────────────────────────────────────────────────────┤
 │ 13. FOOTER (Spec 05)                                       │
 └─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### 4.2 Section Details

---

## 5. SECTION SPECIFICATIONS

### Section 1: Navbar

Standard header WITH search bar (unlike homepage which hides it).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [LOGO]    [🔍 Search appliances, stores, repairs...]   For Business ▼  Login │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Reference:** Spec 02 (Search Bar Architecture)

---

### Section 2: Breadcrumbs

**Desktop:**
```
🏠 Home  >  Washing Machine Repair
```

**Mobile:**
```
< Home
```

**Schema.org:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ukgradedappliances.co.uk/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Washing Machine Repair",
      "item": "https://ukgradedappliances.co.uk/washing-machine-repair/"
    }
  ]
}
```

---

### Section 3: Hero

```
HERO SECTION
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧                                                         │
│                                                             │
│  <h1>Washing Machine Repair UK</h1>                        │
│                                                             │
│  Find trusted washing machine repair engineers across       │
│  the United Kingdom. Compare prices, read reviews, and      │
│  book same-day callouts from local professionals.           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🔧 450+        │ 📍 280+        │ 💰 From          │   │
│  │ Engineers      │ Cities         │ £45              │   │
│  │ Nationwide     │ Covered        │ Callout          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│       [🔍 Find Repair Near Me]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

**Styling:**
```css
/* Hero container */
.hero {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 3rem 1.5rem;
  text-align: center;
}

/* Icon */
.hero-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* H1 */
.hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2563eb; /* Secondary */
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 1.875rem;
  }
}

/* Intro text */
.hero-intro {
  font-size: 1.125rem;
  color: #475569;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

/* Stats box */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

@media (max-width: 480px) {
  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
    padding: 1rem;
  }
}

/* Stat item */
.hero-stat {
  text-align: center;
}

.hero-stat-icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.hero-stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
}

.hero-stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

/* CTA button */
.hero-cta {
  background: #ef4444;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.hero-cta:hover {
  background: #dc2626;
}
```

**Component:**
```tsx
// components/national-repair/NationalRepairHero.tsx

interface NationalRepairHeroProps {
  category: ApplianceCategory;
  stats: NationalRepairStats;
}

export function NationalRepairHero({ category, stats }: NationalRepairHeroProps) {
  return (
    <section className="hero bg-gradient-to-br from-slate-50 to-slate-200 py-12 px-6 text-center">
      {/* Icon */}
      <div className="text-5xl mb-4" aria-hidden="true">
        {category.icon || '🔧'}
      </div>
      
      {/* H1 */}
      <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
        {category.name_singular} Repair UK
      </h1>
      
      {/* Intro paragraph */}
      <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
        Find trusted {category.name_singular.toLowerCase()} repair engineers across 
        the United Kingdom. Compare prices, read reviews, and book same-day 
        callouts from local professionals.
      </p>
      
      {/* Stats box */}
      <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto mb-8 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xl mb-1">🔧</div>
          <div className="text-2xl font-bold text-secondary">{stats.totalProviders}+</div>
          <div className="text-sm text-slate-500">Engineers</div>
        </div>
        <div className="text-center border-x border-slate-200">
          <div className="text-xl mb-1">📍</div>
          <div className="text-2xl font-bold text-secondary">{stats.totalCities}+</div>
          <div className="text-sm text-slate-500">Cities</div>
        </div>
        <div className="text-center">
          <div className="text-xl mb-1">💰</div>
          <div className="text-2xl font-bold text-secondary">£{stats.avgCostMin}</div>
          <div className="text-sm text-slate-500">From</div>
        </div>
      </div>
      
      {/* CTA */}
      <Link
        href="#find-local"
        className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
      >
        <Search className="w-5 h-5 mr-2" />
        Find Repair Near Me
      </Link>
    </section>
  );
}
```

---

### Section 4: Popular Cities

```
POPULAR CITIES SECTION
═══════════════════════════════════════════════════════════════

<h2>Popular Cities for {Category} Repair</h2>

Top 12 cities with most providers, displayed as clickable cards:

┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 📍 Manchester│ │ 📍 Birmingham│ │ 📍 London    │ │ 📍 Leeds     │
│   32 engineers│ │   28 engineers│ │   45 engineers│ │   18 engineers│
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 📍 Glasgow   │ │ 📍 Liverpool │ │ 📍 Sheffield │ │ 📍 Bristol   │
│   15 engineers│ │   14 engineers│ │   12 engineers│ │   11 engineers│
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 📍 Newcastle │ │ 📍 Edinburgh │ │ 📍 Cardiff   │ │ 📍 Nottingham│
│   10 engineers│ │   9 engineers │ │   8 engineers │ │   8 engineers │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

Each card links to: /{country}/{city}/{category}-repair/

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-repair/PopularCitiesSection.tsx

interface PopularCitiesSectionProps {
  cities: CityWithProviderCount[];
  category: ApplianceCategory;
}

export function PopularCitiesSection({ cities, category }: PopularCitiesSectionProps) {
  const repairSlug = getRepairSlug(category.name_singular);
  
  return (
    <section className="py-12 px-4 bg-white" id="find-local">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Popular Cities for {category.name_singular} Repair
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.slice(0, 12).map((city) => (
            <Link
              key={city.id}
              href={`/${city.country_slug}/${city.slug}/${repairSlug}/`}
              className="group p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="font-semibold text-secondary group-hover:text-red-600 transition-colors">
                  {city.name}
                </span>
              </div>
              <div className="text-sm text-slate-500">
                {city.provider_count} engineer{city.provider_count !== 1 ? 's' : ''}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function getRepairSlug(nameSingular: string): string {
  return nameSingular.toLowerCase().replace(/\s+/g, '-') + '-repair';
}
```

---

### Section 5: Browse by Country

```
BROWSE BY COUNTRY SECTION
═══════════════════════════════════════════════════════════════

<h2>{Category} Repair by Country</h2>

Grouped by 4 UK countries with expandable city lists:

┌─────────────────────────────────────────────────────────────┐
│ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENGLAND (320 cities)                                    │
├─────────────────────────────────────────────────────────────┤
│ [A] Aberdeen  [B] Bath  [B] Birmingham  [B] Blackpool  ... │
│ [B] Bolton  [B] Bournemouth  [B] Bradford  [B] Brighton ... │
│ [B] Bristol  [C] Cambridge  [C] Canterbury  ...            │
│                                                             │
│ [Show all 320 cities ▼]                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 SCOTLAND (65 cities)                                     │
├─────────────────────────────────────────────────────────────┤
│ [A] Aberdeen  [D] Dundee  [E] Edinburgh  [G] Glasgow  ...  │
│                                                             │
│ [Show all 65 cities ▼]                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🏴󠁧󠁢󠁷󠁬󠁳󠁿 WALES (32 cities)                                         │
├─────────────────────────────────────────────────────────────┤
│ [C] Cardiff  [S] Swansea  [N] Newport  ...                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🇬🇧 NORTHERN IRELAND (18 cities)                            │
├─────────────────────────────────────────────────────────────┤
│ [B] Belfast  [D] Derry  [L] Lisburn  ...                   │
└─────────────────────────────────────────────────────────────┘

Each city links to: /{country}/{city}/{category}-repair/

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-repair/BrowseByCountrySection.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface BrowseByCountrySectionProps {
  citiesByCountry: CountryWithCities[];
  category: ApplianceCategory;
}

const INITIAL_CITIES_SHOWN = 24;

export function BrowseByCountrySection({ 
  citiesByCountry, 
  category 
}: BrowseByCountrySectionProps) {
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());
  const repairSlug = getRepairSlug(category.name_singular);

  const toggleCountry = (countrySlug: string) => {
    const newExpanded = new Set(expandedCountries);
    if (newExpanded.has(countrySlug)) {
      newExpanded.delete(countrySlug);
    } else {
      newExpanded.add(countrySlug);
    }
    setExpandedCountries(newExpanded);
  };

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary mb-8">
          {category.name_singular} Repair by Country
        </h2>

        <div className="space-y-6">
          {citiesByCountry.map(({ country, cities }) => {
            const isExpanded = expandedCountries.has(country.slug);
            const citiesToShow = isExpanded 
              ? cities 
              : cities.slice(0, INITIAL_CITIES_SHOWN);
            const hasMore = cities.length > INITIAL_CITIES_SHOWN;

            return (
              <div 
                key={country.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Country header */}
                <div className="bg-secondary text-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag_emoji}</span>
                    <span className="font-semibold text-lg">{country.name}</span>
                    <span className="text-slate-300">
                      ({cities.length} cities)
                    </span>
                  </div>
                  <Link
                    href={`/${country.slug}/`}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    View country page →
                  </Link>
                </div>

                {/* Cities grid */}
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {citiesToShow.map((city) => (
                      <Link
                        key={city.id}
                        href={`/${country.slug}/${city.slug}/${repairSlug}/`}
                        className="text-sm text-slate-700 hover:text-red-600 hover:underline transition-colors"
                      >
                        {city.name}
                        <span className="text-slate-400 ml-1">
                          ({city.provider_count})
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Expand/collapse button */}
                  {hasMore && (
                    <button
                      onClick={() => toggleCountry(country.slug)}
                      className="mt-4 flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Show fewer cities
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Show all {cities.length} cities
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

---

### Section 6: Repair Costs

```
REPAIR COSTS SECTION
═══════════════════════════════════════════════════════════════

<h2>How Much Does {Category} Repair Cost?</h2>

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  AVERAGE REPAIR COST                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          £45 - £150                                 │   │
│  │   (based on UK-wide data)                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  WHAT AFFECTS THE PRICE:                                   │
│  ├── ✓ Type of fault (drum, motor, pump, electrics)       │
│  ├── ✓ Age and model of appliance                          │
│  ├── ✓ Parts required                                      │
│  ├── ✓ Engineer's callout fee                              │
│  └── ✓ Location (urban vs rural)                           │
│                                                             │
│  TYPICAL BREAKDOWN:                                         │
│  ├── Callout fee: £45 - £75                                │
│  ├── Labour (per hour): £40 - £80                          │
│  └── Parts: £15 - £200+ (depending on part)                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-repair/RepairCostsSection.tsx

interface RepairCostsSectionProps {
  category: ApplianceCategory;
  stats: NationalRepairStats;
}

export function RepairCostsSection({ category, stats }: RepairCostsSectionProps) {
  const costFactors = [
    'Type of fault (drum, motor, pump, electrics)',
    'Age and model of appliance',
    'Parts required',
    "Engineer's callout fee",
    'Location (urban vs rural)'
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          How Much Does {category.name_singular} Repair Cost?
        </h2>

        {/* Main cost display */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-8 text-center">
          <div className="text-sm text-slate-600 mb-2">Average Repair Cost</div>
          <div className="text-4xl font-bold text-secondary mb-2">
            £{stats.avgCostMin} - £{stats.avgCostMax}
          </div>
          <div className="text-sm text-slate-500">Based on UK-wide data</div>
        </div>

        {/* Cost factors */}
        <div className="mb-8">
          <h3 className="font-semibold text-secondary mb-4">What affects the price:</h3>
          <ul className="space-y-2">
            {costFactors.map((factor, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-slate-700">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Typical breakdown */}
        <div className="bg-slate-50 rounded-lg p-6">
          <h3 className="font-semibold text-secondary mb-4">Typical breakdown:</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Callout fee</span>
              <span className="font-medium">£45 - £75</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Labour (per hour)</span>
              <span className="font-medium">£40 - £80</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Parts</span>
              <span className="font-medium">£15 - £200+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Section 7: Common Issues

```
COMMON ISSUES SECTION
═══════════════════════════════════════════════════════════════

<h2>Common {Category} Problems We Fix</h2>

Issues displayed as cards linking to guides (if available):

┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ ⚠️ Not         │ │ ⚠️ Not         │ │ ⚠️ Making       │
│   Spinning     │ │   Draining     │ │   Loud Noise   │
│                │ │                │ │                │
│ [Learn more →] │ │ [Learn more →] │ │ [Learn more →] │
└────────────────┘ └────────────────┘ └────────────────┘
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ ⚠️ Leaking     │ │ ⚠️ Won't       │ │ ⚠️ Error       │
│   Water        │ │   Start       │ │   Code         │
│                │ │                │ │                │
│ [Learn more →] │ │ [Learn more →] │ │ [Learn more →] │
└────────────────┘ └────────────────┘ └────────────────┘

═══════════════════════════════════════════════════════════════
```

**Data from:** `appliance_categories.common_issues[]`

---

### Section 8: When to Repair vs Replace

```
REPAIR VS REPLACE SECTION
═══════════════════════════════════════════════════════════════

<h2>Should You Repair or Replace Your {Category}?</h2>

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  AVERAGE LIFESPAN: 10-12 years                              │
│                                                             │
│  REPAIR IF:                                   REPLACE IF:   │
│  ├── Under 7 years old                 ├── Over 10 years   │
│  ├── Repair < 50% of new price         ├── Multiple faults │
│  ├── Simple fix (pump, seal)           ├── Major part (drum)│
│  └── First major breakdown             └── Frequent repairs │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Use Our Repair vs Replace Calculator →]           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-repair/RepairVsReplaceSection.tsx

interface RepairVsReplaceSectionProps {
  category: ApplianceCategory;
  stats: NationalRepairStats;
}

export function RepairVsReplaceSection({ category, stats }: RepairVsReplaceSectionProps) {
  const repairReasons = [
    'Under 7 years old',
    'Repair costs less than 50% of new price',
    'Simple fix (pump, seal, belt)',
    'First major breakdown'
  ];

  const replaceReasons = [
    `Over ${stats.avgLifespan || 10} years old`,
    'Multiple faults appearing',
    'Major component failure (drum, motor)',
    'Frequent repairs needed'
  ];

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Should You Repair or Replace Your {category.name_singular}?
        </h2>

        {/* Lifespan indicator */}
        <div className="bg-white rounded-lg p-4 mb-8 text-center">
          <span className="text-slate-600">Average {category.name_singular} Lifespan: </span>
          <span className="font-bold text-secondary">
            {stats.avgLifespan ? `${stats.avgLifespan - 2}-${stats.avgLifespan}` : '10-12'} years
          </span>
        </div>

        {/* Comparison grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Repair column */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔧</span>
              Consider Repairing If...
            </h3>
            <ul className="space-y-3">
              {repairReasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Replace column */}
          <div className="bg-orange-50 rounded-xl p-6">
            <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              Consider Replacing If...
            </h3>
            <ul className="space-y-3">
              {replaceReasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600">✓</span>
                  <span className="text-slate-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Calculator CTA */}
        <div className="text-center">
          <Link
            href="/tools/repair-or-replace/"
            className="inline-flex items-center bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Use Our Repair vs Replace Calculator
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

### Section 9: Related Repair Services

```
RELATED REPAIR SERVICES SECTION
═══════════════════════════════════════════════════════════════

<h2>Other Appliance Repair Services</h2>

┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ 🧊            │ │ 🍽️            │ │ 🌀            │
│ Fridge Freezer│ │ Dishwasher    │ │ Tumble Dryer  │
│ Repair        │ │ Repair        │ │ Repair        │
│               │ │               │ │               │
│ 380 engineers │ │ 290 engineers │ │ 245 engineers │
└───────────────┘ └───────────────┘ └───────────────┘
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ 🔥            │ │ 📺            │ │ 🇺🇸            │
│ Oven          │ │ TV            │ │ American      │
│ Repair        │ │ Repair        │ │ Fridge Repair │
│               │ │               │ │               │
│ 195 engineers │ │ 150 engineers │ │ 180 engineers │
└───────────────┘ └───────────────┘ └───────────────┘

Each card links to: /{category}-repair/

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-repair/RelatedRepairServicesSection.tsx

interface RelatedRepairServicesSectionProps {
  categories: ApplianceCategory[];
  currentCategory: ApplianceCategory;
}

export function RelatedRepairServicesSection({ 
  categories, 
  currentCategory 
}: RelatedRepairServicesSectionProps) {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Other Appliance Repair Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories
            .filter(cat => cat.id !== currentCategory.id)
            .slice(0, 6)
            .map((category) => {
              const repairSlug = getRepairSlug(category.name_singular);
              
              return (
                <Link
                  key={category.id}
                  href={`/${repairSlug}/`}
                  className="group bg-slate-50 hover:bg-slate-100 rounded-xl p-6 text-center transition-colors"
                >
                  <div className="text-4xl mb-3" aria-hidden="true">
                    {category.icon || '🔧'}
                  </div>
                  <div className="font-semibold text-secondary group-hover:text-red-600 transition-colors">
                    {category.name_singular} Repair
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
```

---

### Section 10: DIY Parts (Affiliate)

```
DIY PARTS SECTION — AFFILIATE (eSpares)
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 Fix It Yourself?                                        │
│                                                             │
│  Order genuine {Category} parts with next-day delivery.     │
│  Free repair guides and video tutorials included.           │
│                                                             │
│  Popular parts:                                             │
│  • Door seals & gaskets                                     │
│  • Pumps & motors                                           │
│  • Belts & bearings                                         │
│  • Carbon brushes                                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Shop {Category} Parts at eSpares →]               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Affiliate partner • Earn from qualifying purchases         │
│                                                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

**Affiliate Link Structure:**
```
https://www.espares.co.uk/search/{category-slug}?utm_source=ukgradedappliances&utm_medium=affiliate&utm_campaign=national-repair
```

---

### Section 11: FAQ

```
FAQ SECTION
═══════════════════════════════════════════════════════════════

<h2>Frequently Asked Questions</h2>

Schema.org FAQPage markup for all questions.

Questions (6-8 relevant to national repair):

1. How much does {category} repair cost in the UK?
2. Is it worth repairing an old {category}?
3. How do I find a {category} repair engineer near me?
4. What is the average lifespan of a {category}?
5. Can I get same-day {category} repair?
6. Do repair engineers offer warranties on their work?
7. Should I repair or replace my {category}?
8. What qualifications should a {category} engineer have?

Accordion format with expand/collapse.

═══════════════════════════════════════════════════════════════
```

**Schema.org FAQPage:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does washing machine repair cost in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Washing machine repair in the UK typically costs between £45 and £150, depending on the fault, parts required, and your location. Callout fees usually range from £45-75, with labour charged at £40-80 per hour."
      }
    },
    {
      "@type": "Question",
      "name": "Is it worth repairing an old washing machine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generally, it's worth repairing a washing machine if it's under 7-8 years old and the repair cost is less than 50% of a new machine's price. For older machines with major faults like drum or motor issues, replacement may be more economical."
      }
    }
  ]
}
```

---

### Section 12: Cross-Sell (Retail)

```
CROSS-SELL SECTION
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🛒 Beyond Repair? Save 30-70% on Graded Appliances         │
│                                                             │
│  If your {category} isn't worth fixing, browse our          │
│  directory of graded appliance stores across the UK.        │
│  Find ex-display, B-grade, and factory seconds at           │
│  massive discounts.                                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Browse Graded {Category} →]                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Links to: /{category-plural}/ (national retail category)

═══════════════════════════════════════════════════════════════
```

---

### Section 13: Footer

Standard footer (Spec 05 v1.1).

---

## 6. SEO IMPLEMENTATION

### 6.1 Meta Tags

```typescript
// app/[categoryRepair]/page.tsx

export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await getNationalRepairPageData(params.categoryRepair);
  
  if (!data) return {};
  
  const { category, totalProviders, totalCities, stats } = data;
  
  return {
    title: `${category.name_singular} Repair UK | ${totalProviders}+ Engineers | From £${stats.avgCostMin}`,
    description: `Find trusted ${category.name_singular.toLowerCase()} repair engineers across ${totalCities}+ UK cities. Compare prices, read reviews, book same-day callouts. Average cost £${stats.avgCostMin}-£${stats.avgCostMax}.`,
    keywords: [
      `${category.name_singular.toLowerCase()} repair`,
      `${category.name_singular.toLowerCase()} repair UK`,
      `${category.name_singular.toLowerCase()} repair cost`,
      `${category.name_singular.toLowerCase()} engineer`,
      'appliance repair UK',
      'local appliance repair'
    ],
    alternates: {
      canonical: `https://ukgradedappliances.co.uk/${params.categoryRepair}/`
    },
    robots: data.isIndexable 
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: `${category.name_singular} Repair UK | ${totalProviders}+ Engineers`,
      description: `Find ${category.name_singular.toLowerCase()} repair engineers across ${totalCities}+ UK cities. From £${stats.avgCostMin}.`,
      url: `https://ukgradedappliances.co.uk/${params.categoryRepair}/`,
      siteName: 'UK Graded Appliances',
      type: 'website',
    }
  };
}
```

### 6.2 Schema.org Implementation

```typescript
// lib/schema/nationalRepairSchema.ts

export function generateNationalRepairSchema(
  data: NationalRepairPageData,
  url: string
): object {
  const { category, totalProviders, totalCities, stats, faqs, citiesByCountry } = data;
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Main WebPage
      {
        '@type': 'WebPage',
        '@id': url,
        'url': url,
        'name': `${category.name_singular} Repair UK`,
        'description': `Find ${category.name_singular.toLowerCase()} repair engineers across ${totalCities}+ UK cities.`,
        'isPartOf': {
          '@id': 'https://ukgradedappliances.co.uk/#website'
        },
        'breadcrumb': {
          '@id': `${url}#breadcrumb`
        }
      },
      
      // Service
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        'name': `${category.name_singular} Repair`,
        'description': `Professional ${category.name_singular.toLowerCase()} repair services across the United Kingdom.`,
        'provider': {
          '@type': 'Organization',
          'name': 'UK Graded Appliances Directory'
        },
        'areaServed': {
          '@type': 'Country',
          'name': 'United Kingdom'
        },
        'serviceType': 'Appliance Repair',
        'offers': {
          '@type': 'AggregateOffer',
          'lowPrice': stats.avgCostMin,
          'highPrice': stats.avgCostMax,
          'priceCurrency': 'GBP',
          'offerCount': totalProviders
        }
      },
      
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://ukgradedappliances.co.uk/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': `${category.name_singular} Repair`,
            'item': url
          }
        ]
      },
      
      // ItemList of cities (for rich results)
      {
        '@type': 'ItemList',
        'name': `Cities with ${category.name_singular} Repair Services`,
        'numberOfItems': totalCities,
        'itemListElement': citiesByCountry.flatMap(({ country, cities }) =>
          cities.slice(0, 20).map((city, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': `${category.name_singular} Repair in ${city.name}`,
            'url': `https://ukgradedappliances.co.uk/${country.slug}/${city.slug}/${getRepairSlug(category.name_singular)}/`
          }))
        )
      },
      
      // FAQPage (if FAQs exist)
      ...(faqs.length > 0 ? [{
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }] : [])
    ]
  };
}
```

### 6.3 H-Tag Structure

```html
<h1>{Category} Repair UK</h1>
├── <h2>Popular Cities for {Category} Repair</h2>
├── <h2>{Category} Repair by Country</h2>
├── <h2>How Much Does {Category} Repair Cost?</h2>
├── <h2>Common {Category} Problems We Fix</h2>
├── <h2>Should You Repair or Replace Your {Category}?</h2>
├── <h2>Other Appliance Repair Services</h2>
├── <h2>Fix It Yourself?</h2>
├── <h2>Frequently Asked Questions</h2>
└── <h2>Beyond Repair? Save 30-70% on Graded Appliances</h2>
```

---

## 7. ANTI-THIN PAGE GATING

### 7.1 Indexability Rules

| Condition | Result |
|-----------|--------|
| `totalProviders >= 10` | index, follow |
| `totalProviders >= 3 AND < 10` | index, follow (with notice) |
| `totalProviders < 3` | noindex, follow |
| `totalProviders = 0` | Redirect to /repair-services/ or 404 |

### 7.2 Implementation

```typescript
// app/[categoryRepair]/page.tsx

export default async function NationalRepairPage({ params }: Props) {
  const data = await getNationalRepairPageData(params.categoryRepair);
  
  // Handle not found
  if (!data) {
    notFound();
  }
  
  // Handle zero providers — redirect to generic page
  if (data.totalProviders === 0) {
    redirect('/repair-services/');
  }
  
  // Render page (noindex handled in generateMetadata)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateNationalRepairSchema(data, 
            `https://ukgradedappliances.co.uk/${params.categoryRepair}/`
          ))
        }}
      />
      <NationalRepairPageContent data={data} />
    </>
  );
}
```

---

## 8. NEXT.JS IMPLEMENTATION

### 8.1 File Structure

```
app/
├── [categoryRepair]/
│   ├── page.tsx           ← National repair page
│   └── loading.tsx        ← Loading skeleton
│
├── components/
│   └── national-repair/
│       ├── NationalRepairHero.tsx
│       ├── PopularCitiesSection.tsx
│       ├── BrowseByCountrySection.tsx
│       ├── RepairCostsSection.tsx
│       ├── CommonIssuesSection.tsx
│       ├── RepairVsReplaceSection.tsx
│       ├── RelatedRepairServicesSection.tsx
│       ├── DIYPartsSection.tsx
│       ├── NationalRepairFAQ.tsx
│       └── CrossSellRetailSection.tsx
│
└── lib/
    └── data/
        └── getNationalRepairPageData.ts
```

### 8.2 Static Generation

```typescript
// app/[categoryRepair]/page.tsx

import { createClient } from '@/lib/supabase/server';

export async function generateStaticParams() {
  const supabase = createClient();
  
  // Get all repair-enabled categories
  const { data: categories } = await supabase
    .from('appliance_categories')
    .select('name_singular')
    .eq('is_active', true)
    .eq('supports_repair', true)
    .in('tier', ['tier_1', 'tier_2', 'tier_3']);
  
  if (!categories) return [];
  
  // Generate repair slugs
  return categories.map(cat => ({
    categoryRepair: getRepairSlug(cat.name_singular)
  }));
}

// Expected output:
// [
//   { categoryRepair: 'washing-machine-repair' },
//   { categoryRepair: 'fridge-freezer-repair' },
//   { categoryRepair: 'dishwasher-repair' },
//   { categoryRepair: 'tumble-dryer-repair' },
//   { categoryRepair: 'oven-repair' },
//   { categoryRepair: 'american-fridge-freezer-repair' },
//   { categoryRepair: 'hob-repair' },
//   { categoryRepair: 'tv-repair' },
//   { categoryRepair: 'range-cooker-repair' }
// ]

export const revalidate = 3600; // ISR: Revalidate every hour
```

### 8.3 Complete Page Component

```tsx
// app/[categoryRepair]/page.tsx

import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';

import { getNationalRepairPageData } from '@/lib/data/getNationalRepairPageData';
import { generateNationalRepairSchema } from '@/lib/schema/nationalRepairSchema';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { NationalRepairHero } from '@/components/national-repair/NationalRepairHero';
import { PopularCitiesSection } from '@/components/national-repair/PopularCitiesSection';
import { BrowseByCountrySection } from '@/components/national-repair/BrowseByCountrySection';
import { RepairCostsSection } from '@/components/national-repair/RepairCostsSection';
import { CommonIssuesSection } from '@/components/national-repair/CommonIssuesSection';
import { RepairVsReplaceSection } from '@/components/national-repair/RepairVsReplaceSection';
import { RelatedRepairServicesSection } from '@/components/national-repair/RelatedRepairServicesSection';
import { DIYPartsSection } from '@/components/national-repair/DIYPartsSection';
import { NationalRepairFAQ } from '@/components/national-repair/NationalRepairFAQ';
import { CrossSellRetailSection } from '@/components/national-repair/CrossSellRetailSection';

interface Props {
  params: {
    categoryRepair: string;
  };
}

export default async function NationalRepairPage({ params }: Props) {
  const data = await getNationalRepairPageData(params.categoryRepair);

  if (!data) {
    notFound();
  }

  if (data.totalProviders === 0) {
    redirect('/repair-services/');
  }

  const pageUrl = `https://ukgradedappliances.co.uk/${params.categoryRepair}/`;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: `${data.category.name_singular} Repair`, href: `/${params.categoryRepair}/` }
  ];

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateNationalRepairSchema(data, pageUrl))
        }}
      />

      <Header />

      <main>
        {/* Section 2: Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Section 3: Hero */}
        <NationalRepairHero 
          category={data.category} 
          stats={data.stats} 
        />

        {/* Section 4: Popular Cities */}
        <PopularCitiesSection 
          cities={data.popularCities} 
          category={data.category} 
        />

        {/* Section 5: Browse by Country */}
        <BrowseByCountrySection 
          citiesByCountry={data.citiesByCountry} 
          category={data.category} 
        />

        {/* Section 6: Repair Costs */}
        <RepairCostsSection 
          category={data.category} 
          stats={data.stats} 
        />

        {/* Section 7: Common Issues */}
        {data.stats.commonIssues.length > 0 && (
          <CommonIssuesSection 
            category={data.category} 
            issues={data.stats.commonIssues} 
          />
        )}

        {/* Section 8: Repair vs Replace */}
        <RepairVsReplaceSection 
          category={data.category} 
          stats={data.stats} 
        />

        {/* Section 9: Related Repair Services */}
        {data.relatedCategories.length > 0 && (
          <RelatedRepairServicesSection 
            categories={data.relatedCategories} 
            currentCategory={data.category} 
          />
        )}

        {/* Section 10: DIY Parts (Affiliate) */}
        <DIYPartsSection category={data.category} />

        {/* Section 11: FAQ */}
        {data.faqs.length > 0 && (
          <NationalRepairFAQ faqs={data.faqs} />
        )}

        {/* Section 12: Cross-Sell Retail */}
        <CrossSellRetailSection category={data.category} />
      </main>

      <Footer />
    </>
  );
}

export { generateStaticParams, generateMetadata };
export const revalidate = 3600;
```

---

## 9. MOBILE RESPONSIVE DESIGN

### 9.1 Mobile Layout

```
MOBILE WIREFRAME — NATIONAL REPAIR PAGE
═══════════════════════════════════════════════════════════════

┌────────────────────────────────────┐
│ [HEADER WITH HAMBURGER]            │
├────────────────────────────────────┤
│ < Home                             │
├────────────────────────────────────┤
│                🔧                  │
│                                    │
│  Washing Machine Repair UK         │
│                                    │
│  Find trusted washing machine      │
│  repair engineers across the UK.   │
│                                    │
│  ┌──────────────────────────────┐ │
│  │ 🔧 450+ │ 📍 280+ │ 💰 £45  │ │
│  └──────────────────────────────┘ │
│                                    │
│  [🔍 FIND REPAIR NEAR ME]         │
├────────────────────────────────────┤
│ POPULAR CITIES                     │
│ ┌────────┐ ┌────────┐             │
│ │Manchest│ │Birmingh│             │
│ │32 eng. │ │28 eng. │             │
│ └────────┘ └────────┘             │
│ ┌────────┐ ┌────────┐             │
│ │London  │ │Leeds   │             │
│ │45 eng. │ │18 eng. │             │
│ └────────┘ └────────┘             │
│ (scrollable horizontal)           │
├────────────────────────────────────┤
│ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENGLAND                    [▼] │
│ (accordion - collapsed by default) │
├────────────────────────────────────┤
│ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 SCOTLAND                   [▼] │
│ (accordion - collapsed by default) │
├────────────────────────────────────┤
│ 🏴󠁧󠁢󠁷󠁬󠁳󠁿 WALES                      [▼] │
│ (accordion - collapsed by default) │
├────────────────────────────────────┤
│ 🇬🇧 NORTHERN IRELAND             [▼] │
│ (accordion - collapsed by default) │
├────────────────────────────────────┤
│ 💰 REPAIR COSTS                    │
│                                    │
│     £45 - £150                    │
│                                    │
│ What affects price:                │
│ ✓ Type of fault                   │
│ ✓ Age and model                   │
│ ...                               │
├────────────────────────────────────┤
│ ⚠️ COMMON ISSUES              [▼]  │
│ (accordion - collapsed)           │
├────────────────────────────────────┤
│ 🔧 REPAIR VS REPLACE          [▼]  │
│ (accordion - collapsed)           │
├────────────────────────────────────┤
│ OTHER REPAIR SERVICES              │
│ ┌───┐ ┌───┐ ┌───┐                 │
│ │Frid│ │Dish│ │Tumb│              │
│ └───┘ └───┘ └───┘                 │
│ (scrollable horizontal)           │
├────────────────────────────────────┤
│ 🔧 FIX IT YOURSELF?               │
│ [Shop Parts at eSpares →]         │
├────────────────────────────────────┤
│ FAQs                          [▼]  │
│ (accordion)                       │
├────────────────────────────────────┤
│ 🛒 BEYOND REPAIR?                 │
│ [Browse Graded Appliances →]      │
├────────────────────────────────────┤
│ [FOOTER]                          │
└────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### 9.2 Touch Targets

All interactive elements: **minimum 48px × 48px**

---

## 10. TESTING CHECKLIST

### 10.1 Functional Tests
- [ ] Page loads for all repair categories
- [ ] Breadcrumbs navigate correctly
- [ ] Stats display accurate totals
- [ ] Popular cities links work
- [ ] Country accordions expand/collapse
- [ ] All city links work (sample 10 per country)
- [ ] Related repair links work
- [ ] Parts affiliate link tracks correctly
- [ ] Cross-sell retail link works
- [ ] FAQ accordion functions

### 10.2 SEO Tests
- [ ] H1 unique and keyword-optimized
- [ ] Meta title under 60 chars
- [ ] Meta description under 160 chars
- [ ] Schema.org validates (WebPage, Service, BreadcrumbList, ItemList, FAQPage)
- [ ] Canonical URL correct
- [ ] noindex applied when < 10 providers
- [ ] Redirect works when 0 providers

### 10.3 Performance Tests
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Total page weight < 500KB
- [ ] ISR working (1 hour revalidation)

### 10.4 Mobile Tests
- [ ] Touch targets ≥ 48px
- [ ] No horizontal scroll
- [ ] Accordions work correctly
- [ ] Hero CTA prominent and tappable
- [ ] City cards scrollable on mobile

---

## 11. INTERNAL LINKING SUMMARY

### 11.1 Links FROM National Repair Page

| Section | Links To | Estimated Count |
|---------|----------|-----------------|
| Breadcrumbs | Home | 1 |
| Popular Cities | Local repair pages | 12 |
| Browse by Country | Local repair pages | ~300+ |
| Browse by Country | Country pages | 4 |
| Related Services | Other national repair pages | 6 |
| Common Issues | Guide pages | 6 |
| Repair vs Replace | Calculator tool | 1 |
| DIY Parts | eSpares (external affiliate) | 1 |
| Cross-Sell | National retail category | 1 |
| Footer | All standard footer links | 250+ |

**Total unique internal link destinations: ~580+**

### 11.2 Links TO National Repair Page

| Source | Link Location |
|--------|---------------|
| Homepage | Browse by Service section |
| Footer (all pages) | Repair Services column |
| Local Repair Pages | Breadcrumbs (optional) |
| City Hub | Repair section "See UK-wide" link |
| Provider Profile | Service badges |
| Other National Repair Pages | Related Services section |
| Guide Pages | CTA sections |

---

## 12. CHANGE LOG

| Date | Version | Change |
|------|---------|--------|
| Jan 2026 | v1.0 | Initial specification |

---

**END OF SPECIFICATION 16: NATIONAL REPAIR PAGE**
