# SPECIFICATION 17: NATIONAL RETAIL CATEGORY PAGE

## UK Graded Appliances Directory
**Version:** 1.0 — LOCKED  
**Status:** ✅ APPROVED
**Last Updated:** January 2026
**Dependencies:** Spec 06 (Store Profile), Spec 07 (City Hub), Spec 08 (Store Card), Spec 13 (Country Page), Spec 14 (Local Retail Category Page)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Purpose
The National Retail Category Page is a **UK-wide appliance category landing page** that aggregates all cities where stores sell a specific category of graded appliances. This is a top-of-funnel SEO page designed to capture broad, non-location-specific retail queries and distribute users to their local retail category pages.

### 1.2 URL Pattern

```
/{category}/

EXAMPLES:
├── /washing-machines/
├── /fridge-freezers/
├── /american-fridge-freezers/
├── /dishwashers/
├── /tumble-dryers/
├── /televisions/
├── /built-in-ovens/
├── /range-cookers/
└── /hobs/
```

### 1.3 Strategic Importance

| Factor | Value |
|--------|-------|
| **SEO Priority** | ⭐⭐⭐ High — Non-location head terms |
| **Keyword Volume** | Very High — Generic retail queries |
| **User Intent** | Research — Exploring options |
| **Conversion** | Medium — Funnels to local pages |
| **AI Citation** | Strong — Overview content, statistics |

### 1.4 Target Keywords

```
KEYWORD TARGETS — NATIONAL RETAIL CATEGORY PAGE
═══════════════════════════════════════════════════════════════

NON-LOCATION (primary):
├── "graded washing machines"
├── "ex-display fridge freezers"
├── "factory seconds dishwashers"
├── "b-grade tumble dryers"
├── "graded appliances UK"

INTENT + CATEGORY:
├── "cheap washing machines UK"
├── "discount fridge freezers"
├── "second hand dishwashers" (semantic match)
├── "refurbished appliances" (semantic match)

INFORMATIONAL:
├── "what are graded appliances"
├── "graded vs new appliances"
├── "b-grade appliance meaning"
├── "ex-display appliance warranty"

COMMERCIAL:
├── "buy graded washing machines"
├── "graded washing machine deals"
├── "washing machines with warranty UK"
├── "appliances with free delivery"

BRAND + CATEGORY (national):
├── "graded bosch washing machines"
├── "ex-display samsung fridge freezers"
├── "factory seconds hotpoint dishwashers"

═══════════════════════════════════════════════════════════════
```

### 1.5 Key Differentiator

| National Retail Category Page | Local Retail Category Page |
|------------------------------|---------------------------|
| URL: `/washing-machines/` | URL: `/england/manchester/washing-machines/` |
| Shows ALL cities with stores | Shows stores IN one city |
| Generic buying guide content | Specific store listings |
| Links TO local pages | Links FROM national page |
| High funnel (research) | Low funnel (shopping) |
| No store cards | Full store cards |

---

## 2. PAGE CONNECTION MAP

### 2.1 Site Hierarchy Position

```
PAGE HIERARCHY — NATIONAL RETAIL CATEGORY PAGE
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
            │    PAGE      │  │   RETAIL     │  │   REPAIR     │
            │  /england/   │  │  CATEGORY    │  │    PAGE      │
            │              │  │ /washing-    │  │ /washing-    │
            │              │  │  machines/   │  │ machine-     │
            │              │  │              │  │ repair/      │
            └──────┬───────┘  └──────┬───────┘  └──────────────┘
                   │                 │
                   │   ◄── THIS SPEC │
                   │                 │
                   ▼                 ▼
          ┌───────────────┐ ┌───────────────────┐
          │   CITY HUB    │ │ LOCAL RETAIL PAGE │
          │ /england/     │◄│ /england/         │
          │  manchester/  │ │  manchester/      │
          │               │ │  washing-machines/│
          └───────────────┘ └─────────┬─────────┘
                                      │
                                      ▼
                            ┌───────────────────┐
                            │   STORE PROFILE   │
                            │  /store/{slug}/   │
                            └───────────────────┘

═══════════════════════════════════════════════════════════════
```

### 2.2 Inbound Links (TO this page)

```
INBOUND LINKS — NATIONAL RETAIL CATEGORY PAGE
═══════════════════════════════════════════════════════════════

FROM HOMEPAGE (Spec 12):
─────────────────────────────────────────────────────────────────
/
├── Browse by Appliance section
│   └── "Washing Machines" → /washing-machines/
├── FAQ answers
│   └── "Find graded {category} across the UK"

FROM FOOTER (Spec 05):
─────────────────────────────────────────────────────────────────
(all pages)
├── Categories column
│   └── "Washing Machines" → /washing-machines/
│   └── "Fridge Freezers" → /fridge-freezers/
│   └── "Dishwashers" → /dishwashers/
│   └── "View All →" → /appliances/

FROM LOCAL RETAIL PAGES (Spec 14):
─────────────────────────────────────────────────────────────────
/england/manchester/washing-machines/
├── Breadcrumbs (optional)
│   └── "UK Washing Machines" → /washing-machines/
├── "Find stores in other cities" section

FROM CITY HUB (Spec 07):
─────────────────────────────────────────────────────────────────
/england/manchester/
├── Buy section header
│   └── "See all UK {category} →"
├── Category cards
│   └── "Washing Machines" badge (optional link)

FROM STORE PROFILE (Spec 06):
─────────────────────────────────────────────────────────────────
/store/abc-appliances/
├── Categories section badges
│   └── "Washing Machines" → /washing-machines/

FROM OTHER NATIONAL RETAIL PAGES:
─────────────────────────────────────────────────────────────────
/fridge-freezers/
├── Related Categories section
│   └── "Washing Machines" → /washing-machines/

FROM NATIONAL REPAIR PAGE (Spec 16):
─────────────────────────────────────────────────────────────────
/washing-machine-repair/
├── Cross-sell section
│   └── "Shop Graded Washing Machines" → /washing-machines/

FROM GUIDES:
─────────────────────────────────────────────────────────────────
/guides/what-are-graded-appliances/
├── Category links
│   └── "Browse graded washing machines →"

═══════════════════════════════════════════════════════════════
```

### 2.3 Outbound Links (FROM this page)

```
OUTBOUND LINKS — NATIONAL RETAIL CATEGORY PAGE
═══════════════════════════════════════════════════════════════

TO LOCAL RETAIL PAGES (Spec 14):
─────────────────────────────────────────────────────────────────
├── City listings grid
│   └── "Manchester" → /england/manchester/washing-machines/
│   └── "Birmingham" → /england/birmingham/washing-machines/
│   └── (all 565 places with stores)

TO COUNTRY PAGES (Spec 13):
─────────────────────────────────────────────────────────────────
├── Browse by Country section
│   └── "England" → /england/
│   └── "Scotland" → /scotland/

TO HOMEPAGE:
─────────────────────────────────────────────────────────────────
├── Breadcrumbs → /
├── Logo → /

TO OTHER NATIONAL RETAIL PAGES:
─────────────────────────────────────────────────────────────────
├── Related Categories section
│   └── "Fridge Freezers" → /fridge-freezers/
│   └── "Dishwashers" → /dishwashers/

TO NATIONAL BRAND PAGES (Phase 2):
─────────────────────────────────────────────────────────────────
├── Popular Brands section
│   └── "Bosch" → /bosch/
│   └── "Samsung" → /samsung/

TO NATIONAL REPAIR PAGE (Spec 16):
─────────────────────────────────────────────────────────────────
├── Cross-sell section
│   └── "Find {Category} Repair" → /washing-machine-repair/

TO GUIDES:
─────────────────────────────────────────────────────────────────
├── Buying Guide section
│   └── "Complete buying guide" → /guides/buying-graded-appliances/
├── Grade explanations
│   └── "What does A-grade mean?" → /guides/understanding-grades/

TO EXTERNAL (Affiliate):
─────────────────────────────────────────────────────────────────
├── Warranty section
│   └── "Protect your purchase" → D&G (affiliate)

═══════════════════════════════════════════════════════════════
```

---

## 3. DATABASE DEPENDENCIES

### 3.1 Tables Used

```sql
-- Primary tables
appliance_categories (
  id, name, name_plural, name_singular, slug, tier, icon,
  seo_title_template, h1_template, intro_template,
  description, buying_guide, common_issues,
  avg_repair_cost_min, avg_repair_cost_max,
  avg_lifespan_years, is_active, parent_id
)

countries (
  id, name, slug, flag_emoji, place_count, store_count
)

places (
  id, country_id, name, slug, store_count,
  is_active, is_indexable
)

stores (
  id, place_id, business_name, slug,
  grades_stocked, brands_stocked,
  is_active, status
)

store_categories (
  store_id, category_id, has_current_stock,
  grades_available, price_min, price_max
)

brands (
  id, name, slug, tier, popularity_score,
  logo_url, store_count
)

grade_levels (
  code, name, short_description,
  long_description, typical_discount_percent
)

-- Content
faqs (
  id, question, answer, category_id, page_type
  -- WHERE page_type = 'category_national'
)

-- Anti-thin gating
page_indexability (
  page_type = 'category',
  category_id,
  store_count, min_stores_required,
  is_indexable, canonical_url
)
```

### 3.2 Category Data Reference

```
RETAIL CATEGORIES — NATIONAL PAGES
═══════════════════════════════════════════════════════════════

TIER 1 (highest traffic):
├── Washing Machines      → /washing-machines/
├── Fridge Freezers       → /fridge-freezers/
├── American Fridge Freezers → /american-fridge-freezers/

TIER 2 (medium traffic):
├── Dishwashers          → /dishwashers/
├── Tumble Dryers        → /tumble-dryers/
├── Televisions          → /televisions/

TIER 3 (lower traffic):
├── Built-in Ovens       → /built-in-ovens/
├── Range Cookers        → /range-cookers/
├── Hobs                 → /hobs/

SUPPLEMENTARY (if volume justifies):
├── Freezers             → /freezers/
├── Fridges              → /fridges/
├── Wine Coolers         → /wine-coolers/
├── Washer Dryers        → /washer-dryers/
├── Microwaves           → /microwaves/
├── Cookers              → /cookers/
├── Cooker Hoods         → /cooker-hoods/
├── Vacuum Cleaners      → /vacuum-cleaners/

TOTAL: 9-17 national retail category pages

═══════════════════════════════════════════════════════════════
```

### 3.3 Primary Data Query

```typescript
// lib/data/getNationalRetailCategoryData.ts

import { createClient } from '@/lib/supabase/server';

interface NationalRetailCategoryData {
  category: ApplianceCategory;
  citiesByCountry: CountryWithCities[];
  popularCities: CityWithStoreCount[];
  totalStores: number;
  totalCities: number;
  popularBrands: Brand[];
  relatedCategories: ApplianceCategory[];
  subcategories: ApplianceCategory[];
  grades: GradeLevel[];
  stats: NationalRetailStats;
  faqs: FAQ[];
  isIndexable: boolean;
}

interface CountryWithCities {
  country: Country;
  cities: CityWithStoreCount[];
}

interface CityWithStoreCount {
  id: string;
  name: string;
  slug: string;
  country_slug: string;
  store_count: number;
}

interface NationalRetailStats {
  totalStores: number;
  totalCities: number;
  avgDiscountMin: number;
  avgDiscountMax: number;
  avgLifespan: number;
  storesWithFreeDelivery: number;
  storesWithFinance: number;
}

export async function getNationalRetailCategoryData(
  categorySlug: string
): Promise<NationalRetailCategoryData | null> {
  const supabase = createClient();

  // 1. Get category details
  const { data: category, error: categoryError } = await supabase
    .from('appliance_categories')
    .select('*')
    .eq('slug', categorySlug)
    .eq('is_active', true)
    .single();

  if (categoryError || !category) return null;

  // 2. Get all cities with stores for this category, grouped by country
  const { data: citiesWithStores } = await supabase
    .rpc('get_cities_with_retail_stores', {
      p_category_id: category.id
    });

  // 3. Get countries
  const { data: countries } = await supabase
    .from('countries')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  // 4. Aggregate cities by country
  const citiesByCountry = countries?.map(country => ({
    country,
    cities: citiesWithStores?.filter(city => 
      city.country_slug === country.slug
    ) || []
  })).filter(group => group.cities.length > 0) || [];

  // 5. Get popular cities (top 12 by store count)
  const popularCities = [...(citiesWithStores || [])]
    .sort((a, b) => b.store_count - a.store_count)
    .slice(0, 12);

  // 6. Calculate totals
  const totalStores = citiesWithStores?.reduce(
    (sum, city) => sum + city.store_count, 0
  ) || 0;
  const totalCities = citiesWithStores?.length || 0;

  // 7. Get popular brands for this category
  const { data: popularBrands } = await supabase
    .rpc('get_popular_brands_for_category', {
      p_category_id: category.id
    })
    .limit(8);

  // 8. Get related categories (same tier, excluding current)
  const { data: relatedCategories } = await supabase
    .from('appliance_categories')
    .select('id, name, name_plural, slug, tier, icon')
    .eq('is_active', true)
    .neq('id', category.id)
    .is('parent_id', null) // Only top-level categories
    .in('tier', ['tier_1', 'tier_2', 'tier_3'])
    .order('display_order', { ascending: true })
    .limit(6);

  // 9. Get subcategories (if any)
  const { data: subcategories } = await supabase
    .from('appliance_categories')
    .select('id, name, name_plural, slug, icon')
    .eq('parent_id', category.id)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  // 10. Get grade levels
  const { data: grades } = await supabase
    .from('grade_levels')
    .select('*')
    .order('display_order', { ascending: true });

  // 11. Get FAQs for national retail pages
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('category_id', category.id)
    .eq('page_type', 'category_national')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .limit(8);

  // 12. Get aggregate stats for stores in this category
  const { data: storeStats } = await supabase
    .rpc('get_category_store_stats', {
      p_category_id: category.id
    });

  // 13. Check indexability
  const { data: indexability } = await supabase
    .from('page_indexability')
    .select('is_indexable')
    .eq('page_type', 'category')
    .eq('category_id', category.id)
    .single();

  // 14. Compute stats
  const stats: NationalRetailStats = {
    totalStores,
    totalCities,
    avgDiscountMin: 30,  // Static: typical graded discount range
    avgDiscountMax: 70,
    avgLifespan: category.avg_lifespan_years || 10,
    storesWithFreeDelivery: storeStats?.free_delivery_count || 0,
    storesWithFinance: storeStats?.finance_count || 0
  };

  return {
    category,
    citiesByCountry,
    popularCities,
    totalStores,
    totalCities,
    popularBrands: popularBrands || [],
    relatedCategories: relatedCategories || [],
    subcategories: subcategories || [],
    grades: grades || [],
    stats,
    faqs: faqs || [],
    isIndexable: indexability?.is_indexable ?? (totalStores >= 10)
  };
}
```

### 3.4 Database Functions

```sql
-- Function to get all cities with retail stores for a category
CREATE OR REPLACE FUNCTION get_cities_with_retail_stores(
  p_category_id UUID
)
RETURNS TABLE (
  id UUID,
  name VARCHAR(200),
  slug VARCHAR(200),
  country_slug VARCHAR(100),
  store_count BIGINT
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    p.id,
    p.name,
    p.slug,
    c.slug as country_slug,
    COUNT(DISTINCT s.id) as store_count
  FROM places p
  INNER JOIN countries c ON p.country_id = c.id
  INNER JOIN stores s ON s.place_id = p.id
  INNER JOIN store_categories sc ON sc.store_id = s.id
  WHERE sc.category_id = p_category_id
    AND sc.has_current_stock = true
    AND s.is_active = true
    AND s.status IN ('active', 'claimed', 'verified')
    AND p.is_active = true
  GROUP BY p.id, p.name, p.slug, c.slug
  HAVING COUNT(DISTINCT s.id) >= 1
  ORDER BY store_count DESC, p.name ASC;
$$;

-- Function to get popular brands for a category
CREATE OR REPLACE FUNCTION get_popular_brands_for_category(
  p_category_id UUID
)
RETURNS TABLE (
  id UUID,
  name VARCHAR(200),
  slug VARCHAR(200),
  tier brand_tier_enum,
  logo_url VARCHAR(500),
  store_count BIGINT
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    b.id,
    b.name,
    b.slug,
    b.tier,
    b.logo_url,
    COUNT(DISTINCT sb.store_id) as store_count
  FROM brands b
  INNER JOIN store_brands sb ON sb.brand_id = b.id
  INNER JOIN stores s ON s.id = sb.store_id
  INNER JOIN store_categories sc ON sc.store_id = s.id
  WHERE sc.category_id = p_category_id
    AND sb.has_current_stock = true
    AND s.is_active = true
    AND s.status IN ('active', 'claimed', 'verified')
    AND b.is_active = true
  GROUP BY b.id, b.name, b.slug, b.tier, b.logo_url
  ORDER BY store_count DESC, b.popularity_score DESC
  LIMIT 8;
$$;

-- Function to get aggregate store stats for a category
CREATE OR REPLACE FUNCTION get_category_store_stats(
  p_category_id UUID
)
RETURNS TABLE (
  total_count BIGINT,
  free_delivery_count BIGINT,
  finance_count BIGINT,
  verified_count BIGINT
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    COUNT(DISTINCT s.id) as total_count,
    COUNT(DISTINCT s.id) FILTER (WHERE s.offers_free_delivery = true) as free_delivery_count,
    COUNT(DISTINCT s.id) FILTER (WHERE s.offers_finance = true) as finance_count,
    COUNT(DISTINCT s.id) FILTER (WHERE s.status = 'verified') as verified_count
  FROM stores s
  INNER JOIN store_categories sc ON sc.store_id = s.id
  WHERE sc.category_id = p_category_id
    AND sc.has_current_stock = true
    AND s.is_active = true
    AND s.status IN ('active', 'claimed', 'verified');
$$;
```

---

## 4. PAGE STRUCTURE

### 4.1 Section Overview

```
NATIONAL RETAIL CATEGORY PAGE — SECTION ORDER
═══════════════════════════════════════════════════════════════

 ┌─────────────────────────────────────────────────────────────┐
 │ 1. NAVBAR (Spec 02) — WITH search bar                      │
 ├─────────────────────────────────────────────────────────────┤
 │ 2. BREADCRUMBS — Home > Washing Machines                   │
 ├─────────────────────────────────────────────────────────────┤
 │ 3. HERO — H1 + stats + intro paragraph                     │
 │    "Graded Washing Machines UK"                            │
 │    🏪 850+ Stores | 📍 320+ Cities | 💰 Save 30-70%        │
 ├─────────────────────────────────────────────────────────────┤
 │ 4. POPULAR CITIES — Top 12 cities by store count           │
 │    [Manchester] [Birmingham] [London] [Leeds] ...          │
 ├─────────────────────────────────────────────────────────────┤
 │ 5. BROWSE BY COUNTRY — England, Scotland, Wales, N.Ireland │
 │    ├── England (420 cities)                                │
 │    │   └── [City] [City] [City] ... [View All]             │
 │    ├── Scotland (85 cities)                                │
 │    └── ...                                                 │
 ├─────────────────────────────────────────────────────────────┤
 │ 6. UNDERSTANDING GRADES — Grade explanations               │
 │    [Tatty Packaging] [A-Grade] [B-Grade] [C-Grade]         │
 ├─────────────────────────────────────────────────────────────┤
 │ 7. BUYING GUIDE — Category-specific tips                   │
 │    What to look for when buying graded {category}          │
 ├─────────────────────────────────────────────────────────────┤
 │ 8. POPULAR BRANDS — Brand links (logos)                    │
 │    [Bosch] [Samsung] [Hotpoint] [LG] [Miele] ...           │
 ├─────────────────────────────────────────────────────────────┤
 │ 9. SUBCATEGORIES — If category has children                │
 │    [50/50 Fridge Freezers] [60/40] [Integrated] ...        │
 ├─────────────────────────────────────────────────────────────┤
 │ 10. RELATED CATEGORIES — Other categories                  │
 │    [Fridge Freezers] [Dishwashers] [Tumble Dryers] ...     │
 ├─────────────────────────────────────────────────────────────┤
 │ 11. NEED A REPAIR? — Cross-sell to repair                  │
 │     "Find {Category} Repair Engineers"                     │
 ├─────────────────────────────────────────────────────────────┤
 │ 12. FAQ — National-level questions                         │
 │     Schema.org FAQPage markup                              │
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
🏠 Home  >  Washing Machines
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
      "name": "Washing Machines",
      "item": "https://ukgradedappliances.co.uk/washing-machines/"
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
│  🧺                                                         │
│                                                             │
│  <h1>Graded Washing Machines UK</h1>                       │
│                                                             │
│  Find graded, ex-display and factory seconds washing        │
│  machines from trusted retailers across the United Kingdom. │
│  Save 30-70% on top brands with full warranties.            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🏪 850+       │ 📍 320+        │ 💰 Save           │   │
│  │ Stores        │ Cities         │ 30-70%            │   │
│  │ Nationwide    │ Covered        │ vs RRP            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│       [🔍 Find Stores Near Me]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

**Styling:**
```css
/* Hero container */
.hero {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
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
  color: #e85d4c; /* Secondary */
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

/* CTA button */
.hero-cta {
  background: #e85d4c;
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
  background: #d94f3f;
}
```

**Component:**
```tsx
// components/national-retail/NationalRetailHero.tsx

interface NationalRetailHeroProps {
  category: ApplianceCategory;
  stats: NationalRetailStats;
}

export function NationalRetailHero({ category, stats }: NationalRetailHeroProps) {
  return (
    <section className="hero bg-gradient-to-br from-sky-50 to-blue-100 py-12 px-6 text-center">
      {/* Icon */}
      <div className="text-5xl mb-4" aria-hidden="true">
        {category.icon || '🧺'}
      </div>
      
      {/* H1 */}
      <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
        Graded {category.name} UK
      </h1>
      
      {/* Intro paragraph */}
      <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
        Find graded, ex-display and factory seconds {category.name_plural?.toLowerCase() || category.name.toLowerCase()} from 
        trusted retailers across the United Kingdom. Save {stats.avgDiscountMin}-{stats.avgDiscountMax}% 
        on top brands with full warranties.
      </p>
      
      {/* Stats box */}
      <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto mb-8 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xl mb-1">🏪</div>
          <div className="text-2xl font-bold text-secondary">{stats.totalStores}+</div>
          <div className="text-sm text-slate-500">Stores</div>
        </div>
        <div className="text-center border-x border-slate-200">
          <div className="text-xl mb-1">📍</div>
          <div className="text-2xl font-bold text-secondary">{stats.totalCities}+</div>
          <div className="text-sm text-slate-500">Cities</div>
        </div>
        <div className="text-center">
          <div className="text-xl mb-1">💰</div>
          <div className="text-2xl font-bold text-secondary">{stats.avgDiscountMin}-{stats.avgDiscountMax}%</div>
          <div className="text-sm text-slate-500">Savings</div>
        </div>
      </div>
      
      {/* CTA */}
      <Link
        href="#find-local"
        className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
      >
        <Search className="w-5 h-5 mr-2" />
        Find Stores Near Me
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

<h2>Popular Cities for Graded {Category}</h2>

Top 12 cities with most stores, displayed as clickable cards:

┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 📍 Manchester│ │ 📍 Birmingham│ │ 📍 London    │ │ 📍 Leeds     │
│   18 stores  │ │   15 stores  │ │   24 stores  │ │   12 stores  │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 📍 Glasgow   │ │ 📍 Liverpool │ │ 📍 Sheffield │ │ 📍 Bristol   │
│   10 stores  │ │   9 stores   │ │   8 stores   │ │   7 stores   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 📍 Newcastle │ │ 📍 Edinburgh │ │ 📍 Cardiff   │ │ 📍 Nottingham│
│   6 stores   │ │   5 stores   │ │   5 stores   │ │   5 stores   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

Each card links to: /{country}/{city}/{category}/

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-retail/PopularCitiesSection.tsx

interface PopularCitiesSectionProps {
  cities: CityWithStoreCount[];
  category: ApplianceCategory;
}

export function PopularCitiesSection({ cities, category }: PopularCitiesSectionProps) {
  return (
    <section className="py-12 px-4 bg-white" id="find-local">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Popular Cities for Graded {category.name}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.slice(0, 12).map((city) => (
            <Link
              key={city.id}
              href={`/${city.country_slug}/${city.slug}/${category.slug}/`}
              className="group p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="font-semibold text-secondary group-hover:text-red-600 transition-colors">
                  {city.name}
                </span>
              </div>
              <div className="text-sm text-slate-500">
                {city.store_count} store{city.store_count !== 1 ? 's' : ''}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Section 5: Browse by Country

```
BROWSE BY COUNTRY SECTION
═══════════════════════════════════════════════════════════════

<h2>Graded {Category} by Country</h2>

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

Each city links to: /{country}/{city}/{category}/

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-retail/BrowseByCountrySection.tsx

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
          Graded {category.name} by Country
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
                        href={`/${country.slug}/${city.slug}/${category.slug}/`}
                        className="text-sm text-slate-700 hover:text-red-600 hover:underline transition-colors"
                      >
                        {city.name}
                        <span className="text-slate-400 ml-1">
                          ({city.store_count})
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

### Section 6: Understanding Grades

```
UNDERSTANDING GRADES SECTION
═══════════════════════════════════════════════════════════════

<h2>Understanding Graded {Category}</h2>

Grade cards showing condition levels and typical discounts:

┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ 📦 TATTY         │ │ ⭐ A-GRADE       │ │ ✓ B-GRADE        │ │ ○ C-GRADE        │
│ PACKAGING        │ │                  │ │                  │ │                  │
│                  │ │ Minor marks,     │ │ Visible          │ │ More significant │
│ Box damaged,     │ │ essentially new  │ │ scratches on     │ │ cosmetic damage  │
│ appliance        │ │                  │ │ front/sides      │ │                  │
│ perfect          │ │                  │ │                  │ │                  │
│                  │ │                  │ │                  │ │                  │
│ ~20% off RRP     │ │ ~30% off RRP     │ │ ~45% off RRP     │ │ ~60% off RRP     │
└──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────────┘

[Learn more about grades →]

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-retail/UnderstandingGradesSection.tsx

interface UnderstandingGradesSectionProps {
  category: ApplianceCategory;
  grades: GradeLevel[];
}

export function UnderstandingGradesSection({ category, grades }: UnderstandingGradesSectionProps) {
  const gradeStyles = {
    'tatty-packaging': { icon: '📦', color: 'bg-green-50 border-green-200' },
    'A-grade': { icon: '⭐', color: 'bg-blue-50 border-blue-200' },
    'B-grade': { icon: '✓', color: 'bg-yellow-50 border-yellow-200' },
    'C-grade': { icon: '○', color: 'bg-orange-50 border-orange-200' },
    'mixed': { icon: '🔀', color: 'bg-slate-50 border-slate-200' }
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Understanding Graded {category.name}
        </h2>
        
        <p className="text-slate-600 mb-8 max-w-3xl">
          Graded appliances are brand-new units that cannot be sold as "new" due to minor
          cosmetic imperfections or damaged packaging. They offer significant savings while
          maintaining full functionality and warranty coverage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {grades.filter(g => g.code !== 'mixed').map((grade) => {
            const style = gradeStyles[grade.code as keyof typeof gradeStyles] || gradeStyles['mixed'];
            
            return (
              <div 
                key={grade.code}
                className={`p-6 rounded-xl border-2 ${style.color}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{style.icon}</span>
                  <span className="font-bold text-secondary">{grade.name}</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  {grade.short_description}
                </p>
                <div className="text-lg font-bold text-green-600">
                  ~{grade.typical_discount_percent}% off RRP
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/guides/understanding-grades/"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Learn more about grades →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

### Section 7: Buying Guide

```
BUYING GUIDE SECTION
═══════════════════════════════════════════════════════════════

<h2>Buying Guide: Graded {Category}</h2>

Category-specific content pulled from appliance_categories.buying_guide:

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  When buying a graded washing machine, consider:            │
│                                                             │
│  ✓ Load capacity: 7kg for couples, 9kg+ for families       │
│  ✓ Spin speed: 1400rpm is standard, 1600rpm dries faster   │
│  ✓ Energy rating: Look for A or B rated for lower bills    │
│  ✓ Warranty: Most come with 6-12 months coverage           │
│  ✓ Delivery: Check if installation is included             │
│                                                             │
│  Average savings: 30-50% off RRP                           │
│  Most common brands: Bosch, Samsung, Hotpoint, Indesit     │
│                                                             │
│                   [Read our complete buying guide →]        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-retail/BuyingGuideSection.tsx

interface BuyingGuideSectionProps {
  category: ApplianceCategory;
}

export function BuyingGuideSection({ category }: BuyingGuideSectionProps) {
  // Default tips if no buying_guide in database
  const defaultTips = [
    'Check the grade carefully and understand what cosmetic damage to expect',
    'Verify warranty coverage — most graded appliances include 6-12 months',
    'Compare delivery options — some stores offer free delivery over a threshold',
    'Look for 0% finance options if spreading the cost',
    'Check if installation and old appliance removal are included'
  ];

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Buying Guide: Graded {category.name}
        </h2>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          {category.buying_guide ? (
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: category.buying_guide }}
            />
          ) : (
            <>
              <p className="text-slate-600 mb-6">
                When buying a graded {category.name_singular?.toLowerCase() || category.name.toLowerCase()}, 
                consider these key factors:
              </p>
              
              <ul className="space-y-3 mb-6">
                {defaultTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-slate-700">{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="font-semibold text-green-800">
                  Average savings on graded {category.name_plural?.toLowerCase() || category.name.toLowerCase()}: 30-70% off RRP
                </div>
              </div>
            </>
          )}

          <div className="text-center pt-4 border-t border-slate-200">
            <Link
              href={`/guides/buying-graded-${category.slug}/`}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Read our complete buying guide →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Section 8: Popular Brands

```
POPULAR BRANDS SECTION
═══════════════════════════════════════════════════════════════

<h2>Popular {Category} Brands</h2>

Brand logos/cards linking to brand pages (Phase 2) or brand filters:

┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ [BOSCH] │ │[SAMSUNG]│ │[HOTPOINT│ │  [LG]   │
│ 45 stores│ │38 stores│ │32 stores│ │28 stores│
└─────────┘ └─────────┘ └─────────┘ └─────────┘
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ [MIELE] │ │ [BEKO]  │ │[SIEMENS]│ │[INDESIT]│
│ 22 stores│ │20 stores│ │18 stores│ │15 stores│
└─────────┘ └─────────┘ └─────────┘ └─────────┘

Links to: /bosch/ or /bosch/washing-machines/ (Phase 2)

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-retail/PopularBrandsSection.tsx

interface PopularBrandsSectionProps {
  brands: Brand[];
  category: ApplianceCategory;
}

export function PopularBrandsSection({ brands, category }: PopularBrandsSectionProps) {
  if (brands.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Popular {category.name} Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {brands.slice(0, 8).map((brand) => (
            <Link
              key={brand.id}
              href={`/${brand.slug}/`}
              className="group bg-slate-50 hover:bg-slate-100 rounded-xl p-6 text-center transition-colors"
            >
              {brand.logo_url ? (
                <img 
                  src={brand.logo_url} 
                  alt={brand.name}
                  className="h-8 mx-auto mb-3 object-contain grayscale group-hover:grayscale-0 transition-all"
                />
              ) : (
                <div className="h-8 flex items-center justify-center mb-3">
                  <span className="font-bold text-xl text-secondary">{brand.name}</span>
                </div>
              )}
              <div className="text-sm text-slate-500">
                {brand.store_count} store{brand.store_count !== 1 ? 's' : ''}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Section 9: Subcategories (Conditional)

```
SUBCATEGORIES SECTION (if category has children)
═══════════════════════════════════════════════════════════════

<h2>Types of {Category}</h2>

Only displayed if appliance_categories.parent_id = this category:

Example for Fridge Freezers:
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ 50/50 Fridge  │ │ 60/40 Fridge  │ │ 70/30 Fridge  │
│ Freezers      │ │ Freezers      │ │ Freezers      │
└───────────────┘ └───────────────┘ └───────────────┘
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Slimline      │ │ Integrated    │ │ Retro         │
│ Fridge Freezers│ │ Fridge Freezers│ │ Fridge Freezers│
└───────────────┘ └───────────────┘ └───────────────┘

Each links to: /{subcategory-slug}/ (if national page exists)
Or to local with filter applied

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-retail/SubcategoriesSection.tsx

interface SubcategoriesSectionProps {
  subcategories: ApplianceCategory[];
  parentCategory: ApplianceCategory;
}

export function SubcategoriesSection({ subcategories, parentCategory }: SubcategoriesSectionProps) {
  if (subcategories.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Types of {parentCategory.name}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {subcategories.map((subcat) => (
            <Link
              key={subcat.id}
              href={`/${subcat.slug}/`}
              className="group bg-white hover:bg-slate-50 rounded-xl p-6 text-center shadow-sm hover:shadow transition-all"
            >
              {subcat.icon && (
                <div className="text-3xl mb-2">{subcat.icon}</div>
              )}
              <div className="font-semibold text-secondary group-hover:text-red-600 transition-colors">
                {subcat.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Section 10: Related Categories

```
RELATED CATEGORIES SECTION
═══════════════════════════════════════════════════════════════

<h2>Other Graded Appliances</h2>

┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ 🧊            │ │ 🍽️            │ │ 🌀            │
│ Fridge Freezers│ │ Dishwashers   │ │ Tumble Dryers │
│               │ │               │ │               │
│ 380 stores    │ │ 290 stores    │ │ 245 stores    │
└───────────────┘ └───────────────┘ └───────────────┘
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ 🔥            │ │ 📺            │ │ 🇺🇸            │
│ Ovens         │ │ TVs           │ │ American      │
│               │ │               │ │ Fridge Freezers│
│ 195 stores    │ │ 150 stores    │ │ 180 stores    │
└───────────────┘ └───────────────┘ └───────────────┘

Each card links to: /{category}/

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-retail/RelatedCategoriesSection.tsx

interface RelatedCategoriesSectionProps {
  categories: ApplianceCategory[];
  currentCategory: ApplianceCategory;
}

export function RelatedCategoriesSection({ 
  categories, 
  currentCategory 
}: RelatedCategoriesSectionProps) {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Other Graded Appliances
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories
            .filter(cat => cat.id !== currentCategory.id)
            .slice(0, 6)
            .map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}/`}
                className="group bg-slate-50 hover:bg-slate-100 rounded-xl p-6 text-center transition-colors"
              >
                <div className="text-4xl mb-3" aria-hidden="true">
                  {category.icon || '📦'}
                </div>
                <div className="font-semibold text-secondary group-hover:text-red-600 transition-colors">
                  {category.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Section 11: Need a Repair? (Cross-Sell)

```
REPAIR CROSS-SELL SECTION
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 Need a Repair Instead?                                  │
│                                                             │
│  If your current {category} needs fixing, find trusted      │
│  repair engineers across the UK. Compare prices, check      │
│  reviews, and book same-day callouts.                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Find {Category} Repair Engineers →]               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Links to: /{category}-repair/ (National Repair Page, Spec 16)

═══════════════════════════════════════════════════════════════
```

**Component:**
```tsx
// components/national-retail/RepairCrossSellSection.tsx

interface RepairCrossSellSectionProps {
  category: ApplianceCategory;
}

export function RepairCrossSellSection({ category }: RepairCrossSellSectionProps) {
  // Only show if category supports repair
  if (!category.supports_repair) return null;

  const repairSlug = category.name_singular
    ? category.name_singular.toLowerCase().replace(/\s+/g, '-') + '-repair'
    : category.slug.replace(/s$/, '') + '-repair';

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-4xl mb-4">🔧</div>
        
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Need a Repair Instead?
        </h2>
        
        <p className="text-slate-600 mb-8 max-w-xl mx-auto">
          If your current {category.name_singular?.toLowerCase() || category.name.toLowerCase()} needs 
          fixing, find trusted repair engineers across the UK. Compare prices, check reviews, 
          and book same-day callouts.
        </p>
        
        <Link
          href={`/${repairSlug}/`}
          className="inline-flex items-center bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          <Wrench className="w-5 h-5 mr-2" />
          Find {category.name_singular || category.name} Repair Engineers
        </Link>
      </div>
    </section>
  );
}
```

---

### Section 12: FAQ

```
FAQ SECTION
═══════════════════════════════════════════════════════════════

<h2>Frequently Asked Questions</h2>

Schema.org FAQPage markup for all questions.

Questions (6-8 relevant to national retail):

1. What does graded {category} mean?
2. What's the difference between A-grade, B-grade, and C-grade?
3. Do graded {category} come with a warranty?
4. Are graded {category} safe to buy?
5. Can I get graded {category} delivered?
6. How much can I save on graded {category}?
7. What brands of graded {category} are available?
8. Where can I buy graded {category} near me?

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
      "name": "What does graded washing machine mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A graded washing machine is a brand-new appliance that cannot be sold as 'new' due to minor cosmetic damage, damaged packaging, or being ex-display. The appliance itself is fully functional with all features working correctly. Graded appliances typically come with warranties and offer significant savings of 30-70% compared to buying new."
      }
    },
    {
      "@type": "Question",
      "name": "Do graded washing machines come with a warranty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most graded washing machines come with warranties ranging from 6 to 24 months, depending on the retailer and the grade. Some 'tatty packaging' grade appliances may even include the full manufacturer warranty as the unit itself is unused and in perfect condition."
      }
    }
  ]
}
```

---

### Section 13: Footer

Standard footer (Spec 05 v1.1).

---

## 6. SEO IMPLEMENTATION

### 6.1 Meta Tags

```typescript
// app/[category]/page.tsx

export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await getNationalRetailCategoryData(params.category);
  
  if (!data) return {};
  
  const { category, totalStores, totalCities, stats } = data;
  
  return {
    title: `Graded ${category.name} UK | ${totalStores}+ Stores | Save ${stats.avgDiscountMin}-${stats.avgDiscountMax}%`,
    description: `Find graded ${category.name_plural?.toLowerCase() || category.name.toLowerCase()} from ${totalStores}+ stores across ${totalCities}+ UK cities. Ex-display, B-grade & factory seconds. Save ${stats.avgDiscountMin}-${stats.avgDiscountMax}% with full warranties.`,
    keywords: [
      `graded ${category.name.toLowerCase()}`,
      `ex-display ${category.name.toLowerCase()}`,
      `factory seconds ${category.name.toLowerCase()}`,
      `b-grade ${category.name.toLowerCase()}`,
      `cheap ${category.name.toLowerCase()} UK`,
      `${category.name.toLowerCase()} deals`,
      `discount ${category.name.toLowerCase()}`
    ],
    alternates: {
      canonical: `https://ukgradedappliances.co.uk/${params.category}/`
    },
    robots: data.isIndexable 
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: `Graded ${category.name} UK | ${totalStores}+ Stores`,
      description: `Find graded ${category.name_plural?.toLowerCase() || category.name.toLowerCase()} from ${totalStores}+ stores across ${totalCities}+ UK cities.`,
      url: `https://ukgradedappliances.co.uk/${params.category}/`,
      siteName: 'UK Graded Appliances',
      type: 'website',
    }
  };
}
```

### 6.2 Schema.org Implementation

```typescript
// lib/schema/nationalRetailCategorySchema.ts

export function generateNationalRetailCategorySchema(
  data: NationalRetailCategoryData,
  url: string
): object {
  const { category, totalStores, totalCities, popularBrands, faqs, citiesByCountry } = data;
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Main WebPage
      {
        '@type': 'WebPage',
        '@id': url,
        'url': url,
        'name': `Graded ${category.name} UK`,
        'description': `Find graded ${category.name_plural?.toLowerCase()} from ${totalStores}+ stores across ${totalCities}+ UK cities.`,
        'isPartOf': {
          '@id': 'https://ukgradedappliances.co.uk/#website'
        },
        'breadcrumb': {
          '@id': `${url}#breadcrumb`
        }
      },
      
      // Product collection
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collection`,
        'name': `Graded ${category.name} Collection`,
        'description': `Browse ${totalStores}+ stores selling graded ${category.name_plural?.toLowerCase()} across the UK.`,
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': citiesByCountry.flatMap(({ country, cities }) =>
            cities.slice(0, 20).map((city, index) => ({
              '@type': 'ListItem',
              'position': index + 1,
              'name': `Graded ${category.name} in ${city.name}`,
              'url': `https://ukgradedappliances.co.uk/${country.slug}/${city.slug}/${category.slug}/`
            }))
          )
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
            'name': category.name,
            'item': url
          }
        ]
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
<h1>Graded {Category} UK</h1>
├── <h2>Popular Cities for Graded {Category}</h2>
├── <h2>Graded {Category} by Country</h2>
├── <h2>Understanding Graded {Category}</h2>
├── <h2>Buying Guide: Graded {Category}</h2>
├── <h2>Popular {Category} Brands</h2>
├── <h2>Types of {Category}</h2> (if subcategories)
├── <h2>Other Graded Appliances</h2>
├── <h2>Need a Repair Instead?</h2>
└── <h2>Frequently Asked Questions</h2>
```

---

## 7. ANTI-THIN PAGE GATING

### 7.1 Indexability Rules

| Condition | Result |
|-----------|--------|
| `totalStores >= 10` | index, follow |
| `totalStores >= 3 AND < 10` | index, follow (with notice) |
| `totalStores < 3` | noindex, follow |
| `totalStores = 0` | Redirect to /appliances/ or 404 |

### 7.2 Implementation

```typescript
// app/[category]/page.tsx

export default async function NationalRetailCategoryPage({ params }: Props) {
  const data = await getNationalRetailCategoryData(params.category);
  
  // Handle not found
  if (!data) {
    notFound();
  }
  
  // Handle zero stores — redirect to generic page
  if (data.totalStores === 0) {
    redirect('/appliances/');
  }
  
  // Render page (noindex handled in generateMetadata)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateNationalRetailCategorySchema(data, 
            `https://ukgradedappliances.co.uk/${params.category}/`
          ))
        }}
      />
      <NationalRetailCategoryPageContent data={data} />
    </>
  );
}
```

---

## 8. NEXT.JS IMPLEMENTATION

### 8.1 File Structure

```
app/
├── [category]/
│   ├── page.tsx           ← National retail category page
│   └── loading.tsx        ← Loading skeleton
│
├── components/
│   └── national-retail/
│       ├── NationalRetailHero.tsx
│       ├── PopularCitiesSection.tsx
│       ├── BrowseByCountrySection.tsx
│       ├── UnderstandingGradesSection.tsx
│       ├── BuyingGuideSection.tsx
│       ├── PopularBrandsSection.tsx
│       ├── SubcategoriesSection.tsx
│       ├── RelatedCategoriesSection.tsx
│       ├── RepairCrossSellSection.tsx
│       └── NationalRetailFAQ.tsx
│
└── lib/
    └── data/
        └── getNationalRetailCategoryData.ts
```

### 8.2 Static Generation

```typescript
// app/[category]/page.tsx

import { createClient } from '@/lib/supabase/server';

export async function generateStaticParams() {
  const supabase = createClient();
  
  // Get all top-level categories
  const { data: categories } = await supabase
    .from('appliance_categories')
    .select('slug')
    .eq('is_active', true)
    .is('parent_id', null) // Only top-level
    .in('tier', ['tier_1', 'tier_2', 'tier_3', 'supplementary']);
  
  if (!categories) return [];
  
  return categories.map(cat => ({
    category: cat.slug
  }));
}

// Expected output:
// [
//   { category: 'washing-machines' },
//   { category: 'fridge-freezers' },
//   { category: 'american-fridge-freezers' },
//   { category: 'dishwashers' },
//   { category: 'tumble-dryers' },
//   { category: 'televisions' },
//   { category: 'built-in-ovens' },
//   { category: 'range-cookers' },
//   { category: 'hobs' },
//   { category: 'freezers' },
//   { category: 'fridges' },
//   { category: 'wine-coolers' },
//   { category: 'washer-dryers' },
//   { category: 'microwaves' },
//   { category: 'cookers' },
//   { category: 'cooker-hoods' },
//   { category: 'vacuum-cleaners' }
// ]

export const revalidate = 3600; // ISR: Revalidate every hour
```

### 8.3 Route Conflict Resolution

**Important:** This route `app/[category]/page.tsx` may conflict with other dynamic routes. 

**Resolution Strategy:**
```typescript
// app/[category]/page.tsx

// At the top of the page component, validate the category slug
const VALID_CATEGORY_SLUGS = [
  'washing-machines',
  'fridge-freezers',
  'american-fridge-freezers',
  'dishwashers',
  'tumble-dryers',
  'televisions',
  'built-in-ovens',
  'range-cookers',
  'hobs',
  'freezers',
  'fridges',
  'wine-coolers',
  'washer-dryers',
  'microwaves',
  'cookers',
  'cooker-hoods',
  'vacuum-cleaners'
];

export default async function NationalRetailCategoryPage({ params }: Props) {
  // Check if this is a valid category slug
  if (!VALID_CATEGORY_SLUGS.includes(params.category)) {
    notFound(); // Let Next.js try other routes or 404
  }
  
  // ... rest of page
}
```

**Alternative: Use route groups**
```
app/
├── (retail)/
│   └── [category]/
│       └── page.tsx       ← /washing-machines/
├── (repair)/
│   └── [categoryRepair]/
│       └── page.tsx       ← /washing-machine-repair/
```

### 8.4 Complete Page Component

```tsx
// app/[category]/page.tsx

import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';

import { getNationalRetailCategoryData } from '@/lib/data/getNationalRetailCategoryData';
import { generateNationalRetailCategorySchema } from '@/lib/schema/nationalRetailCategorySchema';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { NationalRetailHero } from '@/components/national-retail/NationalRetailHero';
import { PopularCitiesSection } from '@/components/national-retail/PopularCitiesSection';
import { BrowseByCountrySection } from '@/components/national-retail/BrowseByCountrySection';
import { UnderstandingGradesSection } from '@/components/national-retail/UnderstandingGradesSection';
import { BuyingGuideSection } from '@/components/national-retail/BuyingGuideSection';
import { PopularBrandsSection } from '@/components/national-retail/PopularBrandsSection';
import { SubcategoriesSection } from '@/components/national-retail/SubcategoriesSection';
import { RelatedCategoriesSection } from '@/components/national-retail/RelatedCategoriesSection';
import { RepairCrossSellSection } from '@/components/national-retail/RepairCrossSellSection';
import { NationalRetailFAQ } from '@/components/national-retail/NationalRetailFAQ';

interface Props {
  params: {
    category: string;
  };
}

export default async function NationalRetailCategoryPage({ params }: Props) {
  const data = await getNationalRetailCategoryData(params.category);

  if (!data) {
    notFound();
  }

  if (data.totalStores === 0) {
    redirect('/appliances/');
  }

  const pageUrl = `https://ukgradedappliances.co.uk/${params.category}/`;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: data.category.name, href: `/${params.category}/` }
  ];

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateNationalRetailCategorySchema(data, pageUrl))
        }}
      />

      <Header />

      <main>
        {/* Section 2: Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Section 3: Hero */}
        <NationalRetailHero 
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

        {/* Section 6: Understanding Grades */}
        <UnderstandingGradesSection 
          category={data.category}
          grades={data.grades}
        />

        {/* Section 7: Buying Guide */}
        <BuyingGuideSection category={data.category} />

        {/* Section 8: Popular Brands */}
        {data.popularBrands.length > 0 && (
          <PopularBrandsSection 
            brands={data.popularBrands} 
            category={data.category} 
          />
        )}

        {/* Section 9: Subcategories */}
        {data.subcategories.length > 0 && (
          <SubcategoriesSection 
            subcategories={data.subcategories}
            parentCategory={data.category}
          />
        )}

        {/* Section 10: Related Categories */}
        {data.relatedCategories.length > 0 && (
          <RelatedCategoriesSection 
            categories={data.relatedCategories} 
            currentCategory={data.category} 
          />
        )}

        {/* Section 11: Repair Cross-Sell */}
        <RepairCrossSellSection category={data.category} />

        {/* Section 12: FAQ */}
        {data.faqs.length > 0 && (
          <NationalRetailFAQ faqs={data.faqs} />
        )}
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
MOBILE WIREFRAME — NATIONAL RETAIL CATEGORY PAGE
═══════════════════════════════════════════════════════════════

┌────────────────────────────────────┐
│ [HEADER WITH HAMBURGER]            │
├────────────────────────────────────┤
│ < Home                             │
├────────────────────────────────────┤
│                🧺                  │
│                                    │
│  Graded Washing Machines UK        │
│                                    │
│  Find graded washing machines      │
│  from trusted retailers...         │
│                                    │
│  ┌──────────────────────────────┐ │
│  │ 🏪 850+ │ 📍 320+ │ 💰 30-70%│ │
│  └──────────────────────────────┘ │
│                                    │
│  [🔍 FIND STORES NEAR ME]         │
├────────────────────────────────────┤
│ POPULAR CITIES                     │
│ ┌────────┐ ┌────────┐             │
│ │Manchest│ │Birmingh│             │
│ │18 store│ │15 store│             │
│ └────────┘ └────────┘             │
│ ┌────────┐ ┌────────┐             │
│ │London  │ │Leeds   │             │
│ │24 store│ │12 store│             │
│ └────────┘ └────────┘             │
│ (scrollable horizontal)           │
├────────────────────────────────────┤
│ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENGLAND                    [▼] │
│ (accordion - collapsed by default) │
├────────────────────────────────────┤
│ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 SCOTLAND                   [▼] │
├────────────────────────────────────┤
│ 🏴󠁧󠁢󠁷󠁬󠁳󠁿 WALES                      [▼] │
├────────────────────────────────────┤
│ 🇬🇧 NORTHERN IRELAND             [▼] │
├────────────────────────────────────┤
│ UNDERSTANDING GRADES               │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐          │
│ │Tatty││ A ││ B ││ C │           │
│ │20% ││30% ││45% ││60% │          │
│ └───┘ └───┘ └───┘ └───┘          │
│ (scrollable horizontal)           │
├────────────────────────────────────┤
│ 📖 BUYING GUIDE               [▼]  │
│ (accordion - collapsed)           │
├────────────────────────────────────┤
│ POPULAR BRANDS                     │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐          │
│ │Bosch││Sam││Hot││ LG │           │
│ └───┘ └───┘ └───┘ └───┘          │
│ (scrollable horizontal)           │
├────────────────────────────────────┤
│ OTHER APPLIANCES                   │
│ ┌───┐ ┌───┐ ┌───┐                 │
│ │Frid│ │Dish│ │Tumb│              │
│ └───┘ └───┘ └───┘                 │
│ (scrollable horizontal)           │
├────────────────────────────────────┤
│ 🔧 NEED A REPAIR?                 │
│ [Find Repair Engineers →]         │
├────────────────────────────────────┤
│ FAQs                          [▼]  │
│ (accordion)                       │
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
- [ ] Page loads for all retail categories
- [ ] Breadcrumbs navigate correctly
- [ ] Stats display accurate totals
- [ ] Popular cities links work
- [ ] Country accordions expand/collapse
- [ ] All city links work (sample 10 per country)
- [ ] Grade cards display correctly
- [ ] Brand links work
- [ ] Subcategory links work (if applicable)
- [ ] Related category links work
- [ ] Repair cross-sell link works
- [ ] FAQ accordion functions

### 10.2 SEO Tests
- [ ] H1 unique and keyword-optimized
- [ ] Meta title under 60 chars
- [ ] Meta description under 160 chars
- [ ] Schema.org validates (WebPage, CollectionPage, BreadcrumbList, FAQPage)
- [ ] Canonical URL correct
- [ ] noindex applied when < 10 stores
- [ ] Redirect works when 0 stores

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
- [ ] Grade cards scrollable on mobile

---

## 11. INTERNAL LINKING SUMMARY

### 11.1 Links FROM National Retail Category Page

| Section | Links To | Estimated Count |
|---------|----------|-----------------|
| Breadcrumbs | Home | 1 |
| Popular Cities | Local retail pages | 12 |
| Browse by Country | Local retail pages | ~300+ |
| Browse by Country | Country pages | 4 |
| Popular Brands | National brand pages | 8 |
| Subcategories | Subcategory pages | 0-6 |
| Related Categories | Other national retail pages | 6 |
| Buying Guide | Guide pages | 1 |
| Understanding Grades | Guide pages | 1 |
| Repair Cross-Sell | National repair page | 1 |
| Footer | All standard footer links | 250+ |

**Total unique internal link destinations: ~590+**

### 11.2 Links TO National Retail Category Page

| Source | Link Location |
|--------|---------------|
| Homepage | Browse by Appliance section |
| Footer (all pages) | Categories column |
| Local Retail Pages | Breadcrumbs (optional) |
| City Hub | Buy section category cards |
| Store Profile | Category badges |
| Other National Retail Pages | Related Categories section |
| National Repair Page | Cross-sell section |
| Guide Pages | Category links |

---

## 12. RELATIONSHIP TO OTHER SPECS

### 12.1 Spec Comparison: National Pages

| Aspect | National Retail (This) | National Repair (Spec 16) |
|--------|------------------------|---------------------------|
| URL | `/{category}/` | `/{category}-repair/` |
| Entity | Stores | Providers |
| Stats | Stores, Cities, Savings % | Engineers, Cities, From £X |
| Unique Sections | Grades, Buying Guide, Brands | Costs, Common Issues, Repair vs Replace |
| Cross-Sell | To Repair | To Retail |
| Schema | CollectionPage, ItemList | Service, ItemList |

### 12.2 Spec Comparison: Local vs National

| Aspect | National Retail (This) | Local Retail (Spec 14) |
|--------|------------------------|------------------------|
| URL | `/{category}/` | `/{country}/{city}/{category}/` |
| Purpose | City aggregation | Store listing |
| Store Cards | None | Full store cards |
| Filters | None | Brand, Grade, Delivery, etc. |
| Content | Grades, Buying Guide | Minimal |
| User Intent | Research | Shopping |

---

## 13. CHANGE LOG

| Date | Version | Change |
|------|---------|--------|
| Jan 2026 | v1.0 | Initial specification |

---

**END OF SPECIFICATION 17: NATIONAL RETAIL CATEGORY PAGE**
