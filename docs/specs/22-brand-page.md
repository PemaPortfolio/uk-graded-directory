# SPECIFICATION 22: BRAND PAGE

## UK Graded Appliances Directory
**Version:** 1.0 — LOCKED
**Status:** ✅ APPROVED
**Last Updated:** January 2026
**Dependencies:** Spec 06 (Store Profile), Spec 07 (City Hub), Spec 08 (Store Card), Spec 11 (Provider Profile), Spec 15 (Brand Repair Page)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Purpose
The Brand Page is a **brand-focused hub page** that aggregates all stores selling a specific brand and all repair providers authorized for that brand across the UK. This is a key SEO page designed to capture brand-specific retail and repair queries, serving as a central hub for users researching a specific brand.

The specification also covers a **Brands Index Page** that lists all brands in the directory.

### 1.2 URL Patterns

```
BRANDS INDEX:
/brands/

INDIVIDUAL BRAND PAGES:
/brands/{slug}/

EXAMPLES:
├── /brands/bosch/
├── /brands/samsung/
├── /brands/hotpoint/
├── /brands/lg/
├── /brands/miele/
├── /brands/siemens/
├── /brands/beko/
└── /brands/indesit/
```

### 1.3 Strategic Importance

| Factor | Value |
|--------|-------|
| **SEO Priority** | ⭐⭐⭐ High — Brand-specific queries |
| **Keyword Volume** | High — Brand loyalty drives searches |
| **User Intent** | Research — Exploring brand options |
| **Conversion** | Medium-High — Pre-qualified by brand preference |
| **AI Citation** | Strong — Authoritative brand hub, structured data |

### 1.4 Target Keywords

```
KEYWORD TARGETS — BRAND PAGE
═══════════════════════════════════════════════════════════════

BRAND + GRADED (primary):
├── "graded bosch appliances"
├── "ex-display samsung appliances"
├── "factory seconds hotpoint"
├── "bosch graded appliances UK"
├── "samsung ex-display deals"

BRAND + PRODUCT:
├── "graded bosch washing machines"
├── "ex-display samsung fridge freezers"
├── "hotpoint dishwashers graded"

BRAND + LOCATION (feeds to city pages):
├── "graded bosch appliances manchester"
├── "samsung appliances near me"
├── "hotpoint stores UK"

BRAND + REPAIR (cross-sell):
├── "bosch repair UK"
├── "samsung authorized repair"
├── "hotpoint service engineers"

INFORMATIONAL:
├── "is bosch a good brand"
├── "bosch vs samsung appliances"
├── "are graded bosch appliances worth it"

═══════════════════════════════════════════════════════════════
```

### 1.5 Key Differentiator

| Brand Page | Brand Repair Page (Spec 15) |
|------------|----------------------------|
| URL: `/brands/bosch/` | URL: `/{country}/{city}/bosch-repair/` |
| UK-wide brand hub | City-specific repair listings |
| Shows stores + repair providers | Shows only repair providers |
| Links TO brand repair pages | Links FROM brand page |
| National overview | Local service focus |
| Research stage | Service stage |

---

## 2. PAGE CONNECTION MAP

### 2.1 Site Hierarchy Position

```
PAGE HIERARCHY — BRAND PAGE
═══════════════════════════════════════════════════════════════

                         ┌──────────────────┐
                         │     HOMEPAGE     │
                         │        /         │
                         └────────┬─────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
    │   COUNTRY    │    │   BRANDS     │    │   NATIONAL   │
    │    PAGE      │    │   INDEX      │    │   CATEGORY   │
    │  /england/   │    │  /brands/    │    │ /washing-    │
    │              │    │              │    │  machines/   │
    └──────────────┘    └──────┬───────┘    └──────────────┘
                               │
                   ◄── THIS SPEC (index)
                               │
                               ▼
                      ┌──────────────┐
                      │  BRAND PAGE  │
                      │ /brands/     │
                      │  bosch/      │
                      └──────┬───────┘
                             │
             ◄── THIS SPEC (individual)
                             │
      ┌──────────────┬───────┴───────┬──────────────┐
      │              │               │              │
      ▼              ▼               ▼              ▼
┌──────────┐  ┌──────────┐  ┌────────────┐  ┌──────────┐
│  LOCAL   │  │  LOCAL   │  │ BRAND      │  │  STORE   │
│ RETAIL   │  │ REPAIR   │  │ REPAIR     │  │ PROFILE  │
│ /england/│  │ CATEGORY │  │ /england/  │  │ /store/  │
│manchester│  │ PAGE     │  │manchester/ │  │ {slug}/  │
│/washing- │  │          │  │bosch-      │  │          │
│machines/ │  │          │  │repair/     │  │          │
└──────────┘  └──────────┘  └────────────┘  └──────────┘

═══════════════════════════════════════════════════════════════
```

### 2.2 Inbound Links (TO Brand Pages)

```
INBOUND LINKS — BRAND PAGE
═══════════════════════════════════════════════════════════════

FROM HOMEPAGE (Spec 12):
─────────────────────────────────────────────────────────────────
/
├── Popular Brands section
│   └── "Bosch" card → /brands/bosch/
│   └── "Samsung" card → /brands/samsung/
├── Browse by Brand link
│   └── "View all brands" → /brands/

FROM STORE PROFILE (Spec 06):
─────────────────────────────────────────────────────────────────
/store/abc-appliances/
├── Brands We Stock section
│   └── "Bosch" badge → /brands/bosch/

FROM PROVIDER PROFILE (Spec 11):
─────────────────────────────────────────────────────────────────
/provider/midlands-repairs/
├── Authorized Brands section
│   └── "Bosch Authorized" → /brands/bosch/

FROM NATIONAL RETAIL CATEGORY (Spec 17):
─────────────────────────────────────────────────────────────────
/washing-machines/
├── Popular Brands section
│   └── "Bosch" → /brands/bosch/

FROM OTHER BRAND PAGES:
─────────────────────────────────────────────────────────────────
/brands/samsung/
├── Other Brands section
│   └── "Bosch" → /brands/bosch/

FROM FOOTER (Spec 05):
─────────────────────────────────────────────────────────────────
(all pages)
├── Brands column (if added)
│   └── "Bosch" → /brands/bosch/

═══════════════════════════════════════════════════════════════
```

### 2.3 Outbound Links (FROM Brand Pages)

```
OUTBOUND LINKS — BRAND PAGE
═══════════════════════════════════════════════════════════════

TO LOCAL RETAIL CATEGORY PAGES (Spec 14):
─────────────────────────────────────────────────────────────────
├── Find Stores section (by city)
│   └── "Graded Bosch in Manchester" → /england/manchester/washing-machines/?brand=bosch
│   └── "Graded Bosch in Birmingham" → /england/birmingham/washing-machines/?brand=bosch

TO BRAND REPAIR PAGES (Spec 15):
─────────────────────────────────────────────────────────────────
├── Find Repair section (by city)
│   └── "Bosch Repair Manchester" → /england/manchester/bosch-repair/
│   └── "Bosch Repair Birmingham" → /england/birmingham/bosch-repair/

TO NATIONAL RETAIL CATEGORY PAGES (Spec 17):
─────────────────────────────────────────────────────────────────
├── Browse by Category section
│   └── "Graded Bosch Washing Machines" → /washing-machines/?brand=bosch
│   └── "Graded Bosch Fridge Freezers" → /fridge-freezers/?brand=bosch

TO STORE PROFILES (Spec 06):
─────────────────────────────────────────────────────────────────
├── Top Stores section (featured)
│   └── "ABC Appliances" → /store/abc-appliances/

TO COUNTRY PAGES (Spec 13):
─────────────────────────────────────────────────────────────────
├── Popular Cities by Country section
│   └── Country headers → /england/, /scotland/, etc.

TO OTHER BRAND PAGES:
─────────────────────────────────────────────────────────────────
├── Other Brands section (same tier)
│   └── "Samsung" → /brands/samsung/

TO BRANDS INDEX:
─────────────────────────────────────────────────────────────────
├── Breadcrumbs → /brands/

TO EXTERNAL:
─────────────────────────────────────────────────────────────────
├── Official Website link (if available)
│   └── "Visit Bosch UK" → https://www.bosch-home.co.uk/

═══════════════════════════════════════════════════════════════
```

---

## 3. DATABASE DEPENDENCIES

### 3.1 Tables Used

```sql
-- Primary table
brands (
  id UUID PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  logo_url VARCHAR(500),
  description TEXT,
  tier brand_tier_enum, -- 'premium', 'mid_range', 'value'
  website VARCHAR(500),
  country_of_origin VARCHAR(100),
  has_authorised_network BOOLEAN DEFAULT false,
  store_count INTEGER DEFAULT 0,
  provider_count INTEGER DEFAULT 0,
  popularity_score INTEGER DEFAULT 0,
  seo_title_template VARCHAR(200),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)

-- Junction tables
store_brands (
  store_id UUID REFERENCES stores(id),
  brand_id UUID REFERENCES brands(id),
  has_current_stock BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  PRIMARY KEY (store_id, brand_id)
)

provider_brand_authorisations (
  id UUID PRIMARY KEY,
  provider_id UUID REFERENCES service_providers(id),
  brand_id UUID REFERENCES brands(id),
  authorisation_type VARCHAR(50), -- 'Factory Authorized', 'Certified', 'Trained'
  certificate_number VARCHAR(100),
  valid_from DATE,
  valid_until DATE,
  is_verified BOOLEAN DEFAULT false
)

-- Location tables
places (
  id, country_id, name, slug, latitude, longitude,
  store_count, provider_count, is_active
)

countries (
  id, name, slug, flag_emoji, store_count, provider_count
)

-- Entity tables
stores (
  id, place_id, business_name, slug, average_rating,
  review_count, is_active, status, is_verified
)

service_providers (
  id, place_id, name, slug, average_rating,
  review_count, is_active, status, is_verified
)

-- Categories
appliance_categories (
  id, name, name_plural, slug, tier, icon
)

-- Anti-thin gating
page_indexability (
  page_type = 'brand',
  brand_id,
  store_count, min_stores_required,
  is_indexable, canonical_url
)
```

### 3.2 Brand Data Reference

```
BRANDS — SEEDED DATA
═══════════════════════════════════════════════════════════════

PREMIUM TIER (has_authorised_network = true):
├── Bosch          (popularity: 100, authorized: ✓)
├── Samsung        (popularity: 98, authorized: ✓)
├── Smeg           (popularity: 96, authorized: ✓)
├── LG             (popularity: 94, authorized: ✓)
├── Siemens        (popularity: 92, authorized: ✓)
├── Neff           (popularity: 90, authorized: ✓)
└── Miele          (popularity: 88, authorized: ✓)

MID-RANGE TIER:
├── Hotpoint       (popularity: 85, authorized: ✓)
├── Indesit        (popularity: 83, authorized: ✓)
├── Beko           (popularity: 81, authorized: ✓)
├── Candy          (popularity: 79, authorized: ✗)
├── Hoover         (popularity: 77, authorized: ✗)
├── AEG            (popularity: 75, authorized: ✓)
├── Zanussi        (popularity: 73, authorized: ✗)
├── Whirlpool      (popularity: 71, authorized: ✓)
├── Hisense        (popularity: 69, authorized: ✗)
├── Haier          (popularity: 67, authorized: ✗)
├── Grundig        (popularity: 65, authorized: ✗)
└── Kenwood        (popularity: 63, authorized: ✗)

VALUE TIER:
├── Bush           (popularity: 60, authorized: ✗)
├── Logik          (popularity: 58, authorized: ✗)
├── Montpellier    (popularity: 56, authorized: ✗)
├── Russell Hobbs  (popularity: 54, authorized: ✗)
├── Belling        (popularity: 52, authorized: ✗)
├── Flavel         (popularity: 50, authorized: ✗)
├── Stoves         (popularity: 48, authorized: ✗)
└── Willow         (popularity: 46, authorized: ✗)

TOTAL BRANDS: 27 (7 premium + 12 mid-range + 8 value)

═══════════════════════════════════════════════════════════════
```

### 3.3 Primary Data Query — Brands Index

```typescript
// lib/data/getBrandsIndexData.ts

import { createClient } from '@/lib/supabase/server';

interface BrandsIndexData {
  premiumBrands: Brand[];
  midRangeBrands: Brand[];
  valueBrands: Brand[];
  totalStores: number;
  totalBrands: number;
  stats: BrandsIndexStats;
}

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  tier: 'premium' | 'mid_range' | 'value';
  store_count: number;
  provider_count: number;
  has_authorised_network: boolean;
  country_of_origin: string | null;
}

export async function getBrandsIndexData(): Promise<BrandsIndexData> {
  const supabase = createClient();

  // Get all active brands with store counts
  const { data: brands } = await supabase
    .from('brands')
    .select(`
      id,
      name,
      slug,
      logo_url,
      tier,
      store_count,
      provider_count,
      has_authorised_network,
      country_of_origin,
      popularity_score
    `)
    .eq('is_active', true)
    .gt('store_count', 0) // Only brands with stores
    .order('popularity_score', { ascending: false });

  const allBrands = brands || [];

  // Group by tier
  const premiumBrands = allBrands.filter(b => b.tier === 'premium');
  const midRangeBrands = allBrands.filter(b => b.tier === 'mid_range');
  const valueBrands = allBrands.filter(b => b.tier === 'value');

  // Calculate totals
  const totalStores = allBrands.reduce((sum, b) => sum + (b.store_count || 0), 0);

  return {
    premiumBrands,
    midRangeBrands,
    valueBrands,
    totalStores,
    totalBrands: allBrands.length,
    stats: {
      totalBrands: allBrands.length,
      premiumCount: premiumBrands.length,
      midRangeCount: midRangeBrands.length,
      valueCount: valueBrands.length,
      totalStores,
    }
  };
}
```

### 3.4 Primary Data Query — Individual Brand Page

```typescript
// lib/data/getBrandPageData.ts

import { createClient } from '@/lib/supabase/server';

interface BrandPageData {
  brand: Brand;
  citiesByCountry: CountryWithCities[];
  popularCities: CityWithCounts[];
  topStores: StorePreview[];
  categories: CategoryWithCounts[];
  otherBrands: Brand[];
  stats: BrandPageStats;
  faqs: FAQ[];
  isIndexable: boolean;
}

interface CategoryWithCounts {
  id: string;
  name: string;
  name_plural: string;
  slug: string;
  icon: string;
  store_count: number;
}

interface CityWithCounts {
  id: string;
  name: string;
  slug: string;
  country_slug: string;
  store_count: number;
  provider_count: number;
}

interface BrandPageStats {
  totalStores: number;
  totalProviders: number;
  totalCities: number;
  hasAuthorisedNetwork: boolean;
  avgStoreRating: number | null;
}

export async function getBrandPageData(
  brandSlug: string
): Promise<BrandPageData | null> {
  const supabase = createClient();

  // 1. Get brand details
  const { data: brand, error: brandError } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', brandSlug)
    .eq('is_active', true)
    .single();

  if (brandError || !brand) return null;

  // 2. Get cities with stores selling this brand
  const { data: citiesWithStores } = await supabase
    .rpc('get_cities_with_brand_stores', {
      p_brand_id: brand.id
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
    cities: (citiesWithStores || []).filter(city =>
      city.country_slug === country.slug
    )
  })).filter(group => group.cities.length > 0) || [];

  // 5. Get top 12 cities by store count
  const popularCities = [...(citiesWithStores || [])]
    .sort((a, b) => b.store_count - a.store_count)
    .slice(0, 12);

  // 6. Get top stores for this brand
  const { data: topStores } = await supabase
    .from('stores')
    .select(`
      id,
      business_name,
      slug,
      city_name,
      average_rating,
      review_count,
      is_verified,
      places!inner (
        id,
        name,
        slug,
        countries!inner (slug)
      )
    `)
    .eq('is_active', true)
    .in('status', ['active', 'claimed', 'verified'])
    .in('id',
      supabase
        .from('store_brands')
        .select('store_id')
        .eq('brand_id', brand.id)
        .eq('has_current_stock', true)
    )
    .order('is_verified', { ascending: false })
    .order('average_rating', { ascending: false, nullsFirst: false })
    .limit(6);

  // 7. Get categories with store counts for this brand
  const { data: categories } = await supabase
    .rpc('get_categories_for_brand', {
      p_brand_id: brand.id
    });

  // 8. Get other brands (same tier)
  const { data: otherBrands } = await supabase
    .from('brands')
    .select('id, name, slug, logo_url, tier, store_count')
    .eq('is_active', true)
    .eq('tier', brand.tier)
    .neq('id', brand.id)
    .gt('store_count', 0)
    .order('popularity_score', { ascending: false })
    .limit(6);

  // 9. Get FAQs
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('brand_id', brand.id)
    .eq('page_type', 'brand')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .limit(6);

  // 10. Compute stats
  const totalStores = citiesWithStores?.reduce(
    (sum, city) => sum + city.store_count, 0
  ) || 0;
  const totalProviders = citiesWithStores?.reduce(
    (sum, city) => sum + (city.provider_count || 0), 0
  ) || 0;
  const totalCities = citiesWithStores?.length || 0;

  // 11. Check indexability
  const isIndexable = totalStores >= 2;

  return {
    brand,
    citiesByCountry,
    popularCities,
    topStores: topStores || [],
    categories: categories || [],
    otherBrands: otherBrands || [],
    stats: {
      totalStores,
      totalProviders,
      totalCities,
      hasAuthorisedNetwork: brand.has_authorised_network,
      avgStoreRating: null, // Computed if needed
    },
    faqs: faqs || [],
    isIndexable,
  };
}
```

### 3.5 Supporting Database Functions

```sql
-- Function: Get cities with stores selling a brand
CREATE OR REPLACE FUNCTION get_cities_with_brand_stores(
  p_brand_id UUID
)
RETURNS TABLE (
  id UUID,
  name VARCHAR(200),
  slug VARCHAR(200),
  country_slug VARCHAR(100),
  store_count BIGINT,
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
    COUNT(DISTINCT s.id) as store_count,
    COUNT(DISTINCT pba.provider_id) as provider_count
  FROM places p
  INNER JOIN countries c ON p.country_id = c.id
  LEFT JOIN stores s ON s.place_id = p.id
    AND s.is_active = true
    AND s.status IN ('active', 'claimed', 'verified')
  LEFT JOIN store_brands sb ON sb.store_id = s.id
    AND sb.brand_id = p_brand_id
    AND sb.has_current_stock = true
  LEFT JOIN provider_coverage_places pcp ON pcp.place_id = p.id
  LEFT JOIN service_providers sp ON sp.id = pcp.provider_id
    AND sp.is_active = true
    AND sp.status IN ('active', 'claimed', 'verified')
  LEFT JOIN provider_brand_authorisations pba ON pba.provider_id = sp.id
    AND pba.brand_id = p_brand_id
  WHERE p.is_active = true
    AND (sb.store_id IS NOT NULL OR pba.provider_id IS NOT NULL)
  GROUP BY p.id, p.name, p.slug, c.slug
  HAVING COUNT(DISTINCT s.id) > 0 OR COUNT(DISTINCT pba.provider_id) > 0
  ORDER BY store_count DESC, name ASC;
$$;


-- Function: Get categories with stores for a brand
CREATE OR REPLACE FUNCTION get_categories_for_brand(
  p_brand_id UUID
)
RETURNS TABLE (
  id UUID,
  name VARCHAR(200),
  name_plural VARCHAR(200),
  slug VARCHAR(200),
  icon VARCHAR(50),
  store_count BIGINT
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    ac.id,
    ac.name,
    ac.name_plural,
    ac.slug,
    ac.icon,
    COUNT(DISTINCT sc.store_id) as store_count
  FROM appliance_categories ac
  INNER JOIN store_categories sc ON sc.category_id = ac.id
  INNER JOIN stores s ON s.id = sc.store_id
  INNER JOIN store_brands sb ON sb.store_id = s.id
  WHERE sb.brand_id = p_brand_id
    AND sb.has_current_stock = true
    AND sc.has_current_stock = true
    AND s.is_active = true
    AND s.status IN ('active', 'claimed', 'verified')
    AND ac.is_active = true
  GROUP BY ac.id, ac.name, ac.name_plural, ac.slug, ac.icon
  ORDER BY store_count DESC, ac.display_order ASC;
$$;
```

---

## 4. ANTI-THIN PAGE GATING

### 4.1 Indexability Rules — Brand Pages

```
BRAND PAGE — ANTI-THIN GATING
═══════════════════════════════════════════════════════════════

MINIMUM REQUIREMENT: 2 stores stocking the brand

Store Count | Action           | SEO Impact
─────────────────────────────────────────────────────────────────
0 stores    | 302 redirect     | Redirect to /brands/
1 store     | noindex, follow  | Show page, don't index
2+ stores   | index, follow    | Full SEO page

REDIRECT TARGET:
0 stores → /brands/ (brands index)

NOINDEX IMPLEMENTATION:
export const metadata = {
  robots: storeCount < 2 ? 'noindex, follow' : 'index, follow',
};

FALLBACK CONTENT (1 store):
Show the single store with message:
"We currently have 1 store stocking {brand} appliances.
Looking for more options? [Browse all stores →]"

═══════════════════════════════════════════════════════════════
```

### 4.2 Indexability Rules — Brands Index

```
BRANDS INDEX — ALWAYS INDEXABLE
═══════════════════════════════════════════════════════════════

The /brands/ index page is always indexable if there is at least
one brand with stores in the directory.

═══════════════════════════════════════════════════════════════
```

### 4.3 Implementation

```typescript
// lib/pages/checkBrandPageIndexability.ts

export async function checkBrandPageIndexability(
  brandId: string
): Promise<{
  isIndexable: boolean;
  storeCount: number;
  minRequired: number;
  fallbackAction: 'show' | 'redirect' | 'noindex';
}> {
  const { data } = await supabase
    .from('page_indexability')
    .select('store_count, min_stores_required, is_indexable')
    .eq('brand_id', brandId)
    .eq('page_type', 'brand')
    .single();

  if (!data) {
    // Count directly if no record
    const { count } = await supabase
      .from('store_brands')
      .select('*', { count: 'exact', head: true })
      .eq('brand_id', brandId)
      .eq('has_current_stock', true)
      .in('store_id',
        supabase
          .from('stores')
          .select('id')
          .eq('is_active', true)
          .in('status', ['active', 'claimed', 'verified'])
      );

    const storeCount = count || 0;
    return {
      isIndexable: storeCount >= 2,
      storeCount,
      minRequired: 2,
      fallbackAction: storeCount === 0 ? 'redirect'
        : storeCount < 2 ? 'noindex'
        : 'show',
    };
  }

  return {
    isIndexable: data.is_indexable,
    storeCount: data.store_count,
    minRequired: data.min_stores_required || 2,
    fallbackAction: data.is_indexable ? 'show'
      : data.store_count === 0 ? 'redirect'
      : 'noindex',
  };
}
```

---

## 5. PAGE STRUCTURE — BRANDS INDEX

### 5.1 Section Overview

```
BRANDS INDEX PAGE — /brands/
═══════════════════════════════════════════════════════════════

 ┌─────────────────────────────────────────────────────────────┐
 │ 1. NAVBAR (Spec 02)                                         │
 ├─────────────────────────────────────────────────────────────┤
 │ 2. BREADCRUMBS — Home > Brands                              │
 ├─────────────────────────────────────────────────────────────┤
 │ 3. HERO — H1 + stats + intro                                │
 │    "Graded Appliance Brands UK"                             │
 │    🏷️ 27 Brands | 🏪 850+ Stores | 💰 Save 30-70%          │
 ├─────────────────────────────────────────────────────────────┤
 │ 4. PREMIUM BRANDS — Premium tier brands                     │
 │    [Bosch] [Samsung] [LG] [Miele] [Siemens] [Neff] [Smeg]  │
 ├─────────────────────────────────────────────────────────────┤
 │ 5. MID-RANGE BRANDS — Mid-range tier brands                 │
 │    [Hotpoint] [Indesit] [Beko] [AEG] [Whirlpool] ...       │
 ├─────────────────────────────────────────────────────────────┤
 │ 6. VALUE BRANDS — Value tier brands                         │
 │    [Bush] [Russell Hobbs] [Belling] [Montpellier] ...      │
 ├─────────────────────────────────────────────────────────────┤
 │ 7. BROWSE BY CATEGORY — Category cross-links                │
 │    [Washing Machines] [Fridge Freezers] [Dishwashers] ...  │
 ├─────────────────────────────────────────────────────────────┤
 │ 8. FOOTER (Spec 05)                                         │
 └─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### 5.2 Complete Desktop Layout — Brands Index

```
BRANDS INDEX PAGE — DESKTOP
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ [LOGO]    [🔍 Search appliances, stores, repairs...]   For Business ▼  Login │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🏠 Home  >  Brands                                                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                        🏷️                                                   │
│                                                                             │
│           GRADED APPLIANCE BRANDS UK                                        │
│           ━━━━━━━━━━━━━━━━━━━━━━━━━━━                                       │
│                                                                             │
│    Browse graded and ex-display appliances from 27 leading brands.         │
│    Find discounted premium, mid-range and value brands with full           │
│    warranties at stores across the UK.                                      │
│                                                                             │
│    ┌─────────────────────────────────────────────────────────────────┐     │
│    │ 🏷️ 27 Brands    │ 🏪 850+ Stores   │ 💰 Save 30-70%            │     │
│    └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ⭐ PREMIUM BRANDS                                                          │
│  ═══════════════════                                                        │
│                                                                             │
│  High-end brands known for quality, innovation and longevity.              │
│                                                                             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    │
│  │ [BOSCH    │ │ [SAMSUNG  │ │ [LG       │ │ [MIELE    │ │ [SIEMENS  │    │
│  │  LOGO]    │ │  LOGO]    │ │  LOGO]    │ │  LOGO]    │ │  LOGO]    │    │
│  │           │ │           │ │           │ │           │ │           │    │
│  │  Bosch    │ │  Samsung  │ │  LG       │ │  Miele    │ │  Siemens  │    │
│  │  45 stores│ │  38 stores│ │  28 stores│ │  22 stores│ │  18 stores│    │
│  │   [View →]│ │   [View →]│ │   [View →]│ │   [View →]│ │   [View →]│    │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘    │
│  ┌───────────┐ ┌───────────┐                                               │
│  │ [NEFF     │ │ [SMEG     │                                               │
│  │  LOGO]    │ │  LOGO]    │                                               │
│  │  Neff     │ │  Smeg     │                                               │
│  │  15 stores│ │  12 stores│                                               │
│  │   [View →]│ │   [View →]│                                               │
│  └───────────┘ └───────────┘                                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ✓ MID-RANGE BRANDS                                                        │
│  ═══════════════════                                                        │
│                                                                             │
│  Trusted brands offering excellent value for money.                         │
│                                                                             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    │
│  │ [HOTPOINT │ │ [INDESIT  │ │ [BEKO     │ │ [AEG      │ │ [WHIRLPOOL│    │
│  │  LOGO]    │ │  LOGO]    │ │  LOGO]    │ │  LOGO]    │ │  LOGO]    │    │
│  │           │ │           │ │           │ │           │ │           │    │
│  │  Hotpoint │ │  Indesit  │ │  Beko     │ │  AEG      │ │  Whirlpool│    │
│  │  32 stores│ │  28 stores│ │  25 stores│ │  20 stores│ │  18 stores│    │
│  │   [View →]│ │   [View →]│ │   [View →]│ │   [View →]│ │   [View →]│    │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘    │
│  ... (more mid-range brands)                                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  💰 VALUE BRANDS                                                            │
│  ═══════════════                                                            │
│                                                                             │
│  Budget-friendly brands for great savings.                                  │
│                                                                             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    │
│  │  Bush     │ │Russell Hob│ │  Belling  │ │Montpellier│ │   Flavel  │    │
│  │  10 stores│ │  8 stores │ │  7 stores │ │  6 stores │ │  5 stores │    │
│  │   [View →]│ │   [View →]│ │   [View →]│ │   [View →]│ │   [View →]│    │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘    │
│  ... (more value brands)                                                   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔧 BROWSE BY CATEGORY                                                      │
│  ═════════════════════                                                      │
│                                                                             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    │
│  │ 🧺        │ │ 🧊        │ │ 🍽️        │ │ 🌀        │ │ 🔥        │    │
│  │ Washing   │ │ Fridge    │ │ Dish-     │ │ Tumble    │ │ Ovens &   │    │
│  │ Machines  │ │ Freezers  │ │ washers   │ │ Dryers    │ │ Cookers   │    │
│  │ [View →]  │ │ [View →]  │ │ [View →]  │ │ [View →]  │ │ [View →]  │    │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [FOOTER - Spec 05]                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
```

---

## 6. PAGE STRUCTURE — INDIVIDUAL BRAND PAGE

### 6.1 Section Overview

```
BRAND PAGE — /brands/{slug}/
═══════════════════════════════════════════════════════════════

 ┌─────────────────────────────────────────────────────────────┐
 │ 1. NAVBAR (Spec 02)                                         │
 ├─────────────────────────────────────────────────────────────┤
 │ 2. BREADCRUMBS — Home > Brands > Bosch                      │
 ├─────────────────────────────────────────────────────────────┤
 │ 3. HERO — Logo, name, tier badge, stats                     │
 │    [Bosch Logo]                                             │
 │    BOSCH  ⭐ Premium Brand                                  │
 │    🏪 45 Stores | 🔧 28 Repair Centres | 📍 85 Cities      │
 ├─────────────────────────────────────────────────────────────┤
 │ 4. ABOUT SECTION — Brand description                        │
 │    German engineering excellence since 1886...              │
 │    🌍 Germany | 🔗 bosch-home.co.uk                        │
 ├─────────────────────────────────────────────────────────────┤
 │ 5. BROWSE BY CATEGORY — Categories with this brand          │
 │    [Washing Machines (32)] [Dishwashers (28)] ...          │
 ├─────────────────────────────────────────────────────────────┤
 │ 6. FIND STORES — Top cities with stores                     │
 │    Graded Bosch Stores by City                              │
 │    [Manchester (8)] [Birmingham (6)] [London (12)] ...     │
 ├─────────────────────────────────────────────────────────────┤
 │ 7. FIND REPAIR — If has_authorised_network                  │
 │    Bosch Authorized Repair Engineers                        │
 │    [Manchester (5)] [Birmingham (4)] [Leeds (3)] ...       │
 ├─────────────────────────────────────────────────────────────┤
 │ 8. POPULAR CITIES BY COUNTRY — Expandable by country        │
 │    🏴󠁧󠁢󠁥󠁮󠁧󠁿 England: Manchester, Birmingham, London...         │
 │    🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland: Glasgow, Edinburgh...                     │
 ├─────────────────────────────────────────────────────────────┤
 │ 9. OTHER BRANDS — Same tier brands                          │
 │    Also Consider:                                           │
 │    [Samsung] [LG] [Miele] [Siemens]                        │
 ├─────────────────────────────────────────────────────────────┤
 │ 10. FAQ SECTION — Brand-specific FAQs                       │
 │    ▼ Is Bosch a good appliance brand?                      │
 │    ▼ What warranty do graded Bosch appliances have?        │
 ├─────────────────────────────────────────────────────────────┤
 │ 11. FOOTER (Spec 05)                                        │
 └─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### 6.2 Complete Desktop Layout — Individual Brand Page

```
BRAND PAGE — DESKTOP (Bosch Example)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ [LOGO]    [🔍 Search appliances, stores, repairs...]   For Business ▼  Login │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🏠 Home  >  Brands  >  Bosch                                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │                                                                    │    │
│  │  [BOSCH LOGO - Large]                                             │    │
│  │                                                                    │    │
│  │  BOSCH                                        ⭐ Premium Brand    │    │
│  │  ━━━━━━━━━                                                        │    │
│  │                                                                    │    │
│  │  ┌───────────────────────────────────────────────────────────┐   │    │
│  │  │ 🏪 45 Stores    │ 🔧 28 Repair    │ 📍 85 Cities         │   │    │
│  │  │    Nationwide   │    Centres      │    Covered           │   │    │
│  │  └───────────────────────────────────────────────────────────┘   │    │
│  │                                                                    │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ℹ️ ABOUT BOSCH                                                             │
│  ═══════════════                                                            │
│                                                                             │
│  Bosch is a German multinational engineering and technology company,        │
│  known for producing high-quality home appliances since 1886. Their        │
│  appliances are renowned for German engineering, innovation, and           │
│  durability. Bosch consistently ranks among the most reliable appliance    │
│  brands in independent testing.                                            │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🌍 Country of Origin: Germany                                      │   │
│  │  🔗 Official Website: bosch-home.co.uk                              │   │
│  │  ✓ Has Authorized Repair Network                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔧 GRADED BOSCH APPLIANCES BY CATEGORY                                    │
│  ═══════════════════════════════════════                                    │
│                                                                             │
│  Find graded Bosch appliances by type:                                     │
│                                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ 🧺          │ │ 🍽️          │ │ 🧊          │ │ 🔥          │          │
│  │ Washing     │ │ Dishwashers │ │ Fridge      │ │ Ovens       │          │
│  │ Machines    │ │             │ │ Freezers    │ │             │          │
│  │             │ │             │ │             │ │             │          │
│  │ 32 stores   │ │ 28 stores   │ │ 22 stores   │ │ 18 stores   │          │
│  │ [Browse →]  │ │ [Browse →]  │ │ [Browse →]  │ │ [Browse →]  │          │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                          │
│  │ 🌀          │ │ 🍳          │ │ 💨          │                          │
│  │ Tumble      │ │ Hobs        │ │ Cooker      │                          │
│  │ Dryers      │ │             │ │ Hoods       │                          │
│  │             │ │             │ │             │                          │
│  │ 15 stores   │ │ 12 stores   │ │ 8 stores    │                          │
│  │ [Browse →]  │ │ [Browse →]  │ │ [Browse →]  │                          │
│  └─────────────┘ └─────────────┘ └─────────────┘                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🏪 FIND GRADED BOSCH STORES BY CITY                                       │
│  ═══════════════════════════════════                                        │
│                                                                             │
│  Top cities with stores stocking graded Bosch appliances:                  │
│                                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │ 📍 London    │ │ 📍 Manchester│ │ 📍 Birmingham│ │ 📍 Leeds     │      │
│  │    12 stores │ │    8 stores  │ │    6 stores  │ │    5 stores  │      │
│  │    [Find →]  │ │    [Find →]  │ │    [Find →]  │ │    [Find →]  │      │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │ 📍 Glasgow   │ │ 📍 Liverpool │ │ 📍 Bristol   │ │ 📍 Sheffield │      │
│  │    4 stores  │ │    4 stores  │ │    3 stores  │ │    3 stores  │      │
│  │    [Find →]  │ │    [Find →]  │ │    [Find →]  │ │    [Find →]  │      │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                                             │
│                          [View all cities ▼]                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔧 BOSCH AUTHORIZED REPAIR ENGINEERS                                       │
│  ═════════════════════════════════════                                      │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ✓ MANUFACTURER-AUTHORIZED SERVICE                                  │   │
│  │  All listed engineers are trained and certified by Bosch            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Find Bosch-authorized repair engineers in your city:                      │
│                                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │ 📍 Manchester│ │ 📍 Birmingham│ │ 📍 London    │ │ 📍 Leeds     │      │
│  │    5 engineers│ │    4 engineers│ │    8 engineers│ │    3 engineers│      │
│  │    [Find →]  │ │    [Find →]  │ │    [Find →]  │ │    [Find →]  │      │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📍 BOSCH STORES & REPAIR BY COUNTRY                                       │
│  ═══════════════════════════════════                                        │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENGLAND (65 cities)                                              │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ London (12) • Manchester (8) • Birmingham (6) • Leeds (5) •        │   │
│  │ Liverpool (4) • Bristol (3) • Sheffield (3) • Newcastle (3) •      │   │
│  │ Nottingham (2) • Leicester (2) • ...                                │   │
│  │                                                                     │   │
│  │ [Show all 65 cities ▼]                                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 SCOTLAND (12 cities)                                             │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ Glasgow (4) • Edinburgh (3) • Aberdeen (2) • Dundee (1) • ...      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🏴󠁧󠁢󠁷󠁬󠁳󠁿 WALES (6 cities)                                                  │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ Cardiff (2) • Swansea (1) • Newport (1) • ...                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🇬🇧 NORTHERN IRELAND (2 cities)                                      │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ Belfast (2) • Derry (1)                                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🏷️ ALSO CONSIDER                                                          │
│  ════════════════                                                           │
│                                                                             │
│  Other premium brands with graded appliances:                              │
│                                                                             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    │
│  │ [SAMSUNG  │ │ [LG       │ │ [MIELE    │ │ [SIEMENS  │ │ [NEFF     │    │
│  │  LOGO]    │ │  LOGO]    │ │  LOGO]    │ │  LOGO]    │ │  LOGO]    │    │
│  │           │ │           │ │           │ │           │ │           │    │
│  │  Samsung  │ │  LG       │ │  Miele    │ │  Siemens  │ │  Neff     │    │
│  │  38 stores│ │  28 stores│ │  22 stores│ │  18 stores│ │  15 stores│    │
│  │   [View →]│ │   [View →]│ │   [View →]│ │   [View →]│ │   [View →]│    │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ❓ FREQUENTLY ASKED QUESTIONS                                              │
│  ═══════════════════════════════                                            │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ▸ Is Bosch a good appliance brand?                                  │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ Do graded Bosch appliances come with a warranty?                 │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ Are graded Bosch appliances the same quality as new?             │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ How much can I save on graded Bosch appliances?                  │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ Does using non-authorized repair void my Bosch warranty?         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [FOOTER - Spec 05]                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
```

---

## 7. SECTION SPECIFICATIONS

### 7.1 Section 2: Breadcrumbs

```
BREADCRUMBS
═══════════════════════════════════════════════════════════════

BRANDS INDEX DESKTOP:
🏠 Home  >  Brands

INDIVIDUAL BRAND DESKTOP:
🏠 Home  >  Brands  >  Bosch

MOBILE:
< Brands (for individual brand)
< Home (for brands index)

STRUCTURE (Individual Brand):
├── Home → /
├── Brands → /brands/
└── Bosch (current, no link)

SCHEMA.ORG:
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
    { "@type": "ListItem", "position": 2, "name": "Brands", "item": "/brands/" },
    { "@type": "ListItem", "position": 3, "name": "Bosch" }
  ]
}

═══════════════════════════════════════════════════════════════
```

### 7.2 Section 3: Hero

```
HERO SECTION — INDIVIDUAL BRAND
═══════════════════════════════════════════════════════════════

CONTENT:
├── Brand logo (from brands.logo_url)
├── H1: Brand Name
├── Tier badge (Premium/Mid-Range/Value)
├── Stats bar (stores, repair centres, cities)
└── Optional CTA: "Find Stores Near Me"

H1 TEMPLATE:
"{brand.name}"

(Simple H1 - the brand name is the main keyword)

TIER BADGE:
├── Premium: ⭐ Premium Brand (gold/yellow styling)
├── Mid-Range: ✓ Mid-Range Brand (blue styling)
├── Value: 💰 Value Brand (green styling)

STATS BAR:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🏪 45 Stores    │  🔧 28 Repair    │  📍 85 Cities        │
│     Nationwide   │     Centres      │     Covered          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

CONDITIONAL DISPLAY:
├── If provider_count = 0 → Don't show "Repair Centres" stat
├── If has_authorised_network = false → Show "Experienced Specialists"
│   instead of "Authorized Repair"

STYLING:
├── Logo:         Max 160px width, centered on mobile
├── H1:           42px desktop, 32px mobile, font-weight 800
├── Tier Badge:   14px uppercase, rounded pill
├── Stats Box:    White background, subtle shadow
├── Mobile:       Logo above H1, stacked vertically

═══════════════════════════════════════════════════════════════
```

### 7.3 Section 4: About Section

```
ABOUT SECTION
═══════════════════════════════════════════════════════════════

CONTENT:
├── Brand description (from brands.description)
├── Country of origin
├── Website link (if available)
├── Authorized network badge (if has_authorised_network)

VISUAL:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ℹ️ ABOUT BOSCH                                             │
│  ═══════════════                                            │
│                                                             │
│  Bosch is a German multinational engineering and           │
│  technology company, known for producing high-quality      │
│  home appliances since 1886...                             │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🌍 Country: Germany                                  │ │
│  │  🔗 Website: bosch-home.co.uk                         │ │
│  │  ✓ Has Authorized Repair Network                      │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DEFAULT DESCRIPTION (if none provided):
"{brand.name} is a {tier} appliance brand. Find graded
{brand.name} appliances at discounted prices from trusted
retailers across the UK."

═══════════════════════════════════════════════════════════════
```

### 7.4 Section 5: Browse by Category

```
BROWSE BY CATEGORY SECTION
═══════════════════════════════════════════════════════════════

PURPOSE:
Internal linking to category pages with brand filter.
Shows which appliance categories this brand offers.

VISUAL:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 GRADED BOSCH APPLIANCES BY CATEGORY                    │
│  ═══════════════════════════════════════                    │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ 🧺          │ │ 🍽️          │ │ 🧊          │           │
│  │ Washing     │ │ Dishwashers │ │ Fridge      │           │
│  │ Machines    │ │             │ │ Freezers    │           │
│  │             │ │             │ │             │           │
│  │ 32 stores   │ │ 28 stores   │ │ 22 stores   │           │
│  │ [Browse →]  │ │ [Browse →]  │ │ [Browse →]  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
get_categories_for_brand() function

LINK TARGETS:
/{category}/?brand={brand_slug}

Example: /washing-machines/?brand=bosch

DISPLAY RULES:
├── Order by store count DESC
├── Show category icon
├── Max 8 categories
├── Hide categories with 0 stores

═══════════════════════════════════════════════════════════════
```

### 7.5 Section 6: Find Stores

```
FIND STORES SECTION
═══════════════════════════════════════════════════════════════

PURPOSE:
Link to local retail pages, filtered by this brand.
Top cities by store count.

VISUAL:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🏪 FIND GRADED BOSCH STORES BY CITY                       │
│  ═══════════════════════════════════                        │
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ 📍 London    │ │ 📍 Manchester│ │ 📍 Birmingham│        │
│  │    12 stores │ │    8 stores  │ │    6 stores  │        │
│  │    [Find →]  │ │    [Find →]  │ │    [Find →]  │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                             │
│                   [View all 85 cities ▼]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

LINK TARGETS:
Primary: /{country}/{city}/
With filter: /{country}/{city}/?brand={brand_slug}

Example: /england/manchester/?brand=bosch

DISPLAY RULES:
├── Top 8-12 cities by store count
├── Show store count per city
├── "View all" expands to show more

═══════════════════════════════════════════════════════════════
```

### 7.6 Section 7: Find Repair (Conditional)

```
FIND REPAIR SECTION (if has_authorised_network = true)
═══════════════════════════════════════════════════════════════

PURPOSE:
Link to brand repair pages for cities with authorized providers.
Only shown if the brand has an authorized repair network.

VISUAL:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 BOSCH AUTHORIZED REPAIR ENGINEERS                       │
│  ═════════════════════════════════════                      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✓ MANUFACTURER-AUTHORIZED SERVICE                  │   │
│  │  All engineers trained and certified by Bosch        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ 📍 Manchester│ │ 📍 Birmingham│ │ 📍 London    │        │
│  │ 5 engineers  │ │ 4 engineers  │ │ 8 engineers  │        │
│  │    [Find →]  │ │    [Find →]  │ │    [Find →]  │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

LINK TARGETS:
Brand Repair Page: /{country}/{city}/{brand}-repair/

Example: /england/manchester/bosch-repair/

CONDITIONAL:
├── Only show if has_authorised_network = true
├── Only show cities with provider_count > 0
├── If no providers at all, hide entire section

═══════════════════════════════════════════════════════════════
```

### 7.7 Section 9: Other Brands

```
OTHER BRANDS SECTION
═══════════════════════════════════════════════════════════════

PURPOSE:
Cross-link to other brands in same tier.
Helps users compare similar quality brands.

VISUAL:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🏷️ ALSO CONSIDER                                          │
│  ════════════════                                           │
│                                                             │
│  Other {tier} brands with graded appliances:               │
│                                                             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│  │ [SAMSUNG] │ │ [LG]      │ │ [MIELE]   │ │ [SIEMENS] │  │
│  │ 38 stores │ │ 28 stores │ │ 22 stores │ │ 18 stores │  │
│  │ [View →]  │ │ [View →]  │ │ [View →]  │ │ [View →]  │  │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
Other brands with same tier, ordered by popularity_score DESC.

DISPLAY RULES:
├── Exclude current brand
├── Same tier only
├── Max 5-6 brands
├── Order by popularity_score DESC
├── Show logo if available

═══════════════════════════════════════════════════════════════
```

---

## 8. SEO IMPLEMENTATION

### 8.1 Meta Tags — Brands Index

```typescript
// app/brands/page.tsx

export async function generateMetadata(): Promise<Metadata> {
  const data = await getBrandsIndexData();

  return {
    title: 'Graded Appliance Brands UK | 27 Leading Brands | Save 30-70%',
    description: `Browse graded appliances from ${data.totalBrands} leading brands at ${data.totalStores}+ UK stores. Premium, mid-range & value brands with full warranties. Save 30-70% on Bosch, Samsung, Hotpoint & more.`,
    keywords: [
      'graded appliance brands UK',
      'ex-display appliance brands',
      'graded bosch appliances',
      'graded samsung appliances',
      'discount appliance brands',
    ],
    alternates: {
      canonical: 'https://ukgradedappliances.co.uk/brands/',
    },
    openGraph: {
      title: 'Graded Appliance Brands UK',
      description: `Browse graded appliances from ${data.totalBrands} leading brands.`,
      url: 'https://ukgradedappliances.co.uk/brands/',
      siteName: 'UK Graded Appliances',
      type: 'website',
    },
  };
}
```

### 8.2 Meta Tags — Individual Brand Page

```typescript
// app/brands/[slug]/page.tsx

export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await getBrandPageData(params.slug);

  if (!data) return {};

  const { brand, stats } = data;

  const title = `Graded ${brand.name} Appliances UK | ${stats.totalStores} Stores | Save 30-70%`;
  const description = `Find graded ${brand.name} appliances from ${stats.totalStores} stores across ${stats.totalCities} UK cities. Ex-display, B-grade & factory seconds with full warranties. ${brand.has_authorised_network ? 'Plus authorized repair services.' : ''}`;

  return {
    title,
    description,
    keywords: [
      `graded ${brand.name.toLowerCase()} appliances`,
      `ex-display ${brand.name.toLowerCase()}`,
      `${brand.name.toLowerCase()} graded appliances UK`,
      `discount ${brand.name.toLowerCase()}`,
      `${brand.name.toLowerCase()} factory seconds`,
    ],
    alternates: {
      canonical: `https://ukgradedappliances.co.uk/brands/${params.slug}/`,
    },
    robots: {
      index: data.isIndexable,
      follow: true,
    },
    openGraph: {
      title: `Graded ${brand.name} Appliances UK`,
      description: `Find graded ${brand.name} appliances from ${stats.totalStores}+ stores.`,
      url: `https://ukgradedappliances.co.uk/brands/${params.slug}/`,
      siteName: 'UK Graded Appliances',
      type: 'website',
      images: brand.logo_url ? [{ url: brand.logo_url }] : undefined,
    },
  };
}
```

### 8.3 Schema.org — Individual Brand Page

```typescript
// lib/schema/brandPageSchema.ts

export function generateBrandPageSchema(
  data: BrandPageData,
  url: string
): object {
  const { brand, stats, citiesByCountry, faqs, categories } = data;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url: url,
        name: `Graded ${brand.name} Appliances UK`,
        description: `Find graded ${brand.name} appliances from ${stats.totalStores} stores across ${stats.totalCities} UK cities.`,
        isPartOf: { '@id': 'https://ukgradedappliances.co.uk/#website' },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },

      // Brand entity
      {
        '@type': 'Brand',
        '@id': `${url}#brand`,
        name: brand.name,
        logo: brand.logo_url,
        url: brand.website,
        description: brand.description,
        ...(brand.country_of_origin && {
          foundingLocation: {
            '@type': 'Country',
            name: brand.country_of_origin,
          },
        }),
      },

      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://ukgradedappliances.co.uk/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Brands',
            item: 'https://ukgradedappliances.co.uk/brands/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: brand.name,
          },
        ],
      },

      // ItemList — Cities with stores
      {
        '@type': 'ItemList',
        '@id': `${url}#citylist`,
        name: `${brand.name} Stores by City`,
        numberOfItems: stats.totalCities,
        itemListElement: citiesByCountry.flatMap(({ country, cities }) =>
          cities.slice(0, 20).map((city, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: `Graded ${brand.name} in ${city.name}`,
            url: `https://ukgradedappliances.co.uk/${country.slug}/${city.slug}/`,
          }))
        ),
      },

      // FAQPage
      ...(faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${url}#faq`,
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}
```

### 8.4 H-Tag Structure

```
H-TAG HIERARCHY — BRAND PAGE
═══════════════════════════════════════════════════════════════

<h1>Bosch</h1>
├── <h2>About Bosch</h2>
├── <h2>Graded Bosch Appliances by Category</h2>
├── <h2>Find Graded Bosch Stores by City</h2>
├── <h2>Bosch Authorized Repair Engineers</h2> (if applicable)
├── <h2>Bosch Stores & Repair by Country</h2>
│   ├── <h3>England</h3>
│   ├── <h3>Scotland</h3>
│   ├── <h3>Wales</h3>
│   └── <h3>Northern Ireland</h3>
├── <h2>Also Consider</h2>
└── <h2>Frequently Asked Questions</h2>

═══════════════════════════════════════════════════════════════
```

---

## 9. NEXT.JS IMPLEMENTATION

### 9.1 File Structure

```
app/
├── brands/
│   ├── page.tsx              ← Brands index /brands/
│   ├── loading.tsx           ← Loading skeleton
│   └── [slug]/
│       ├── page.tsx          ← Individual brand /brands/bosch/
│       └── loading.tsx       ← Loading skeleton
│
├── components/
│   └── brand/
│       ├── BrandsIndexHero.tsx
│       ├── BrandTierSection.tsx
│       ├── BrandCard.tsx
│       ├── BrandPageHero.tsx
│       ├── BrandAboutSection.tsx
│       ├── BrandCategoriesSection.tsx
│       ├── BrandStoresSection.tsx
│       ├── BrandRepairSection.tsx
│       ├── BrandCitiesByCountry.tsx
│       ├── OtherBrandsSection.tsx
│       └── BrandFAQ.tsx
│
└── lib/
    └── data/
        ├── getBrandsIndexData.ts
        └── getBrandPageData.ts
```

### 9.2 Static Generation

```typescript
// app/brands/[slug]/page.tsx

import { createClient } from '@/lib/supabase/server';

export async function generateStaticParams() {
  const supabase = createClient();

  // Get all active brands with at least 1 store
  const { data: brands } = await supabase
    .from('brands')
    .select('slug')
    .eq('is_active', true)
    .gt('store_count', 0);

  if (!brands) return [];

  return brands.map(brand => ({
    slug: brand.slug
  }));
}

// Expected output:
// [
//   { slug: 'bosch' },
//   { slug: 'samsung' },
//   { slug: 'hotpoint' },
//   { slug: 'lg' },
//   { slug: 'miele' },
//   { slug: 'siemens' },
//   { slug: 'beko' },
//   { slug: 'indesit' },
//   ... (27 total)
// ]

export const revalidate = 3600; // ISR: Revalidate every hour
```

### 9.3 Complete Page Component — Brands Index

```tsx
// app/brands/page.tsx

import { Metadata } from 'next';
import { getBrandsIndexData } from '@/lib/data/getBrandsIndexData';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BrandsIndexHero } from '@/components/brand/BrandsIndexHero';
import { BrandTierSection } from '@/components/brand/BrandTierSection';
import { CategoryCrossLinks } from '@/components/shared/CategoryCrossLinks';

export const revalidate = 3600;

export default async function BrandsIndexPage() {
  const data = await getBrandsIndexData();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Brands' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Graded Appliance Brands UK',
            description: 'Browse all appliance brands with graded products',
            url: 'https://ukgradedappliances.co.uk/brands/',
          }),
        }}
      />

      <Header />

      <main>
        <Breadcrumbs items={breadcrumbItems} />

        <BrandsIndexHero stats={data.stats} />

        <BrandTierSection
          title="Premium Brands"
          subtitle="High-end brands known for quality, innovation and longevity."
          brands={data.premiumBrands}
          tierIcon="⭐"
        />

        <BrandTierSection
          title="Mid-Range Brands"
          subtitle="Trusted brands offering excellent value for money."
          brands={data.midRangeBrands}
          tierIcon="✓"
        />

        <BrandTierSection
          title="Value Brands"
          subtitle="Budget-friendly brands for great savings."
          brands={data.valueBrands}
          tierIcon="💰"
        />

        <CategoryCrossLinks />
      </main>

      <Footer />
    </>
  );
}
```

### 9.4 Complete Page Component — Individual Brand

```tsx
// app/brands/[slug]/page.tsx

import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';

import { getBrandPageData } from '@/lib/data/getBrandPageData';
import { generateBrandPageSchema } from '@/lib/schema/brandPageSchema';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BrandPageHero } from '@/components/brand/BrandPageHero';
import { BrandAboutSection } from '@/components/brand/BrandAboutSection';
import { BrandCategoriesSection } from '@/components/brand/BrandCategoriesSection';
import { BrandStoresSection } from '@/components/brand/BrandStoresSection';
import { BrandRepairSection } from '@/components/brand/BrandRepairSection';
import { BrandCitiesByCountry } from '@/components/brand/BrandCitiesByCountry';
import { OtherBrandsSection } from '@/components/brand/OtherBrandsSection';
import { BrandFAQ } from '@/components/brand/BrandFAQ';

interface Props {
  params: {
    slug: string;
  };
}

export default async function BrandPage({ params }: Props) {
  const data = await getBrandPageData(params.slug);

  if (!data) {
    notFound();
  }

  // Redirect if no stores
  if (data.stats.totalStores === 0) {
    redirect('/brands/');
  }

  const pageUrl = `https://ukgradedappliances.co.uk/brands/${params.slug}/`;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Brands', href: '/brands/' },
    { label: data.brand.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBrandPageSchema(data, pageUrl)),
        }}
      />

      <Header />

      <main>
        <Breadcrumbs items={breadcrumbItems} />

        <BrandPageHero brand={data.brand} stats={data.stats} />

        <BrandAboutSection brand={data.brand} />

        {data.categories.length > 0 && (
          <BrandCategoriesSection
            brand={data.brand}
            categories={data.categories}
          />
        )}

        <BrandStoresSection
          brand={data.brand}
          cities={data.popularCities}
          totalCities={data.stats.totalCities}
        />

        {data.brand.has_authorised_network && data.stats.totalProviders > 0 && (
          <BrandRepairSection
            brand={data.brand}
            cities={data.popularCities.filter((c) => c.provider_count > 0)}
          />
        )}

        <BrandCitiesByCountry
          brand={data.brand}
          citiesByCountry={data.citiesByCountry}
        />

        {data.otherBrands.length > 0 && (
          <OtherBrandsSection
            currentBrand={data.brand}
            otherBrands={data.otherBrands}
          />
        )}

        {data.faqs.length > 0 && <BrandFAQ faqs={data.faqs} />}
      </main>

      <Footer />
    </>
  );
}

export { generateStaticParams, generateMetadata };
export const revalidate = 3600;
```

---

## 10. MOBILE RESPONSIVE DESIGN

### 10.1 Mobile Layout — Brand Page

```
MOBILE LAYOUT — BRAND PAGE (< 768px)
═══════════════════════════════════════════════════════════════

┌────────────────────────────────────┐
│ [HEADER WITH HAMBURGER]            │
├────────────────────────────────────┤
│ < Brands                           │
├────────────────────────────────────┤
│                                    │
│  [BOSCH LOGO - Centered]           │
│                                    │
│  BOSCH                             │
│  ⭐ Premium Brand                  │
│                                    │
│  ┌──────────────────────────────┐ │
│  │ 🏪 45     │ 🔧 28   │ 📍 85  │ │
│  │ Stores   │ Repair  │ Cities │ │
│  └──────────────────────────────┘ │
│                                    │
├────────────────────────────────────┤
│ ABOUT BOSCH                   [▼] │
│ (accordion - collapsed)           │
├────────────────────────────────────┤
│ GRADED BOSCH BY CATEGORY          │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐          │
│ │🧺 │ │🍽️ │ │🧊 │ │🔥 │          │
│ └───┘ └───┘ └───┘ └───┘          │
│ (scrollable horizontal)           │
├────────────────────────────────────┤
│ FIND BOSCH STORES                 │
│ ┌────────────────────────────────┐│
│ │ 📍 London • 12 stores    [→]  ││
│ ├────────────────────────────────┤│
│ │ 📍 Manchester • 8 stores [→]  ││
│ ├────────────────────────────────┤│
│ │ 📍 Birmingham • 6 stores [→]  ││
│ └────────────────────────────────┘│
│ [View all 85 cities ▼]           │
├────────────────────────────────────┤
│ 🔧 BOSCH AUTHORIZED REPAIR        │
│ ┌────────────────────────────────┐│
│ │ ✓ Manufacturer-Authorized     ││
│ └────────────────────────────────┘│
│ ┌────────────────────────────────┐│
│ │ 📍 Manchester • 5 eng.   [→]  ││
│ ├────────────────────────────────┤│
│ │ 📍 Birmingham • 4 eng.   [→]  ││
│ └────────────────────────────────┘│
├────────────────────────────────────┤
│ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENGLAND                  [▼] │
│ (accordion - collapsed)           │
├────────────────────────────────────┤
│ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 SCOTLAND                 [▼] │
├────────────────────────────────────┤
│ 🏴󠁧󠁢󠁷󠁬󠁳󠁿 WALES                    [▼] │
├────────────────────────────────────┤
│ 🇬🇧 N. IRELAND               [▼] │
├────────────────────────────────────┤
│ ALSO CONSIDER                     │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐          │
│ │Sam│ │ LG│ │Mie│ │Sie│          │
│ └───┘ └───┘ └───┘ └───┘          │
│ (scrollable horizontal)           │
├────────────────────────────────────┤
│ FAQs                          [▼] │
│ (accordion)                       │
├────────────────────────────────────┤
│ [FOOTER]                          │
└────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### 10.2 Touch Targets

All interactive elements: **minimum 48px × 48px**

---

## 11. TESTING CHECKLIST

### 11.1 Functional Tests
- [ ] Brands index loads with all brands
- [ ] Brand tier sections display correctly
- [ ] Individual brand pages load for all 27 brands
- [ ] Breadcrumbs navigate correctly
- [ ] Brand logos display (with fallback for missing)
- [ ] Stats display accurate counts
- [ ] Category links work with brand filter
- [ ] Store city links work
- [ ] Repair city links work (if applicable)
- [ ] Country accordions expand/collapse
- [ ] Other brands links work
- [ ] FAQ accordion functions

### 11.2 SEO Tests
- [ ] H1 unique and keyword-optimized
- [ ] Meta title under 60 chars
- [ ] Meta description under 160 chars
- [ ] Schema.org validates (WebPage, Brand, BreadcrumbList, ItemList, FAQPage)
- [ ] Canonical URL correct
- [ ] noindex applied when < 2 stores
- [ ] Redirect works when 0 stores

### 11.3 Performance Tests
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Total page weight < 500KB
- [ ] ISR working (1 hour revalidation)
- [ ] Brand logos lazy loaded

### 11.4 Mobile Tests
- [ ] Touch targets ≥ 48px
- [ ] No horizontal scroll
- [ ] Accordions work correctly
- [ ] Brand cards scrollable on mobile
- [ ] Category cards scrollable on mobile

---

## 12. INTERNAL LINKING SUMMARY

### 12.1 Links FROM Individual Brand Page

| Section | Links To | Estimated Count |
|---------|----------|-----------------|
| Breadcrumbs | Home, Brands Index | 2 |
| Categories | National category pages with brand filter | ~7 |
| Find Stores | City hub pages | ~12 |
| Find Repair | Brand repair pages | ~8 (if applicable) |
| Cities by Country | City hub pages | ~85 |
| Cities by Country | Country pages | 4 |
| Other Brands | Other brand pages | ~5 |
| About | External brand website | 1 |
| Footer | All standard footer links | 250+ |

**Total unique internal link destinations per brand page: ~330+**

### 12.2 Links FROM Brands Index

| Section | Links To | Estimated Count |
|---------|----------|-----------------|
| Breadcrumbs | Home | 1 |
| Premium Brands | Individual brand pages | 7 |
| Mid-Range Brands | Individual brand pages | 10 |
| Value Brands | Individual brand pages | 10 |
| Browse by Category | National category pages | ~8 |
| Footer | All standard footer links | 250+ |

**Total unique internal link destinations from brands index: ~280+**

### 12.3 Links TO Brand Pages

| Source | Link Location |
|--------|---------------|
| Homepage | Popular Brands section |
| Store Profile | Brands We Stock badges |
| Provider Profile | Authorized Brands badges |
| National Retail Category | Popular Brands section |
| Other Brand Pages | Other Brands section |
| Footer (if added) | Brands column |

---

## 13. RELATIONSHIP TO OTHER SPECS

### 13.1 Brand Page vs Brand Repair Page

| Aspect | Brand Page (This Spec) | Brand Repair Page (Spec 15) |
|--------|------------------------|----------------------------|
| URL | `/brands/bosch/` | `/england/manchester/bosch-repair/` |
| Scope | National overview | City-specific |
| Primary Entity | Brand + Stores | Providers |
| Purpose | Brand hub & discovery | Service listings |
| Links To | City pages, categories | Provider profiles |
| Stats | Stores, Providers, Cities | Providers, Verified, Fees |

### 13.2 Brand Page vs National Retail Category Page

| Aspect | Brand Page (This Spec) | National Retail (Spec 17) |
|--------|------------------------|---------------------------|
| URL | `/brands/bosch/` | `/washing-machines/` |
| Primary Filter | Brand | Category |
| Shows | All categories for brand | All cities for category |
| User Intent | Brand loyalty | Category research |
| Cross-Links | Categories with brand filter | Brands section |

---

## 14. CHANGE LOG

| Date | Version | Change |
|------|---------|--------|
| Jan 2026 | v1.0 | Initial specification |

---

**END OF SPECIFICATION 22: BRAND PAGE**
