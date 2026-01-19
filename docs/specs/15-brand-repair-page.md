# SPECIFICATION 15: BRAND REPAIR PAGE

## UK Graded Appliances Directory
**Version:** 1.0 — LOCKED  
**Status:** ✅ APPROVED
**Last Updated:** January 2026
**Dependencies:** Spec 07 (City Hub), Spec 09 (Provider Card), Spec 10 (Repair Category Page), Spec 11 (Provider Profile)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Purpose
The Brand Repair Page is a **brand + location filtered repair listing page** that displays all service providers authorized to repair a specific brand within a specific city. This is a key SEO page designed to capture high-intent searches for manufacturer-authorized repair services.

### 1.2 URL Pattern

```
/{country}/{city}/{brand}-repair/

EXAMPLES:
├── /england/manchester/bosch-repair/
├── /england/birmingham/samsung-repair/
├── /scotland/glasgow/hotpoint-repair/
├── /england/london/lg-repair/
├── /wales/cardiff/miele-repair/
└── /england/leeds/siemens-repair/
```

### 1.3 Strategic Importance

| Factor | Value |
|--------|-------|
| **SEO Priority** | ⭐⭐⭐ High — Brand-specific repair queries |
| **Keyword Volume** | Medium-High — Brand loyalty drives searches |
| **User Intent** | High Trust — Wants manufacturer-authorized |
| **Conversion** | Very High — Pre-qualified by brand |
| **AI Citation** | Strong — Structured, brand authority |

### 1.4 Target Keywords

```
KEYWORD TARGETS — BRAND REPAIR PAGE
═══════════════════════════════════════════════════════════════

BRAND + LOCATION (primary):
├── "bosch repair manchester"
├── "samsung repair birmingham"
├── "hotpoint repair near me"
├── "lg appliance repair london"

BRAND + SERVICE TYPE:
├── "bosch washing machine repair manchester"
├── "samsung fridge repair birmingham"
├── "hotpoint oven repair leeds"

MANUFACTURER-AUTHORIZED:
├── "bosch authorised repair manchester"
├── "samsung certified engineer near me"
├── "official bosch repair service"
├── "manufacturer approved repair"

BRAND + URGENCY:
├── "bosch repair same day manchester"
├── "emergency samsung repair"
├── "bosch engineer call out"

═══════════════════════════════════════════════════════════════
```

### 1.5 Key Differentiator

| Brand Repair Page | Repair Category Page |
|-------------------|----------------------|
| Filters by **brand** (Bosch) | Filters by **category** (washing machines) |
| Shows all appliance types for that brand | Shows all providers for that category |
| Emphasizes **authorization & certification** | Emphasizes **availability & pricing** |
| Trust signal: "Factory Authorized" | Trust signal: "Same-day available" |
| URL: `/{city}/bosch-repair/` | URL: `/{city}/washing-machine-repair/` |

---

## 2. PAGE CONNECTION MAP

### 2.1 Site Hierarchy Position

```
PAGE HIERARCHY — BRAND REPAIR
═══════════════════════════════════════════════════════════════

                         ┌──────────────────┐
                         │     HOMEPAGE     │
                         │        /         │
                         └────────┬─────────┘
                                  │
                                  ▼
                    ┌───────────────────────┐
                    │    COUNTRY PAGE       │
                    │    /england/          │
                    └───────────┬───────────┘
                                │
                                ▼
              ┌─────────────────────────────────┐
              │         CITY HUB               │
              │    /england/manchester/         │
              └──────┬──────────────┬───────────┘
                     │              │
        ┌────────────┼────────────┐ │
        │            │            │ │
        ▼            ▼            ▼ │
  ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ REPAIR   │ │  BRAND   │ │ RETAIL   │
  │ CATEGORY │ │  REPAIR  │ │ CATEGORY │
  │/washing- │ │/bosch-   │ │/washing- │
  │machine-  │ │repair/   │ │machines/ │
  │repair/   │ │          │ │          │
  └────┬─────┘ └────┬─────┘ └──────────┘
       │            │              
       │            │  ◄── THIS SPEC
       │            │
       │            ▼
       │      ┌──────────┐
       └──────│ PROVIDER │
              │ PROFILE  │
              │/provider/│
              │{slug}/   │
              └──────────┘

═══════════════════════════════════════════════════════════════
```

### 2.2 Inbound Links (TO this page)

```
INBOUND LINKS — BRAND REPAIR PAGE
═══════════════════════════════════════════════════════════════

FROM REPAIR CATEGORY PAGE (Spec 10):
─────────────────────────────────────────────────────────────────
/england/manchester/washing-machine-repair/
├── Brand Specialists section
│   └── "Bosch" card → /england/manchester/bosch-repair/
├── Provider Cards
│   └── "✓ Bosch Authorized" badge (optional link)

FROM CITY HUB (Spec 07):
─────────────────────────────────────────────────────────────────
/england/manchester/
├── Repair section
│   └── "Brand-specific repair available" → link to brands

FROM PROVIDER PROFILE (Spec 11):
─────────────────────────────────────────────────────────────────
/provider/midlands-appliance-repairs/
├── Authorized Brands section
│   └── "Bosch Authorized" → /england/manchester/bosch-repair/

FROM OTHER BRAND REPAIR PAGES:
─────────────────────────────────────────────────────────────────
/england/manchester/samsung-repair/
├── Other Brands section
│   └── "Bosch Repair" → /england/manchester/bosch-repair/

FROM NATIONAL BRAND PAGE (Phase 2):
─────────────────────────────────────────────────────────────────
/bosch-repair/ (national)
├── City listings
│   └── "Manchester" → /england/manchester/bosch-repair/

═══════════════════════════════════════════════════════════════
```

### 2.3 Outbound Links (FROM this page)

```
OUTBOUND LINKS — BRAND REPAIR PAGE
═══════════════════════════════════════════════════════════════

TO PROVIDER PROFILE (Spec 11):
─────────────────────────────────────────────────────────────────
├── Provider name links
├── "View Full Profile" buttons
├── Logo clicks

TO REPAIR CATEGORY PAGES (Spec 10):
─────────────────────────────────────────────────────────────────
├── Appliance Categories section
│   └── "Bosch Washing Machine Repair" → /england/manchester/washing-machine-repair/?brand=bosch
│   └── OR direct category → /england/manchester/washing-machine-repair/

TO CITY HUB (Spec 07):
─────────────────────────────────────────────────────────────────
├── Breadcrumbs → /england/manchester/

TO COUNTRY PAGE (Spec 13):
─────────────────────────────────────────────────────────────────
├── Breadcrumbs → /england/

TO OTHER BRAND REPAIR PAGES:
─────────────────────────────────────────────────────────────────
├── Other Brands section
│   └── Links to /england/manchester/samsung-repair/, etc.

TO NEARBY CITIES (same brand):
─────────────────────────────────────────────────────────────────
├── "Bosch Repair in Liverpool" → /england/liverpool/bosch-repair/
├── "Bosch Repair in Leeds" → /england/leeds/bosch-repair/

TO RETAIL (Cross-sell):
─────────────────────────────────────────────────────────────────
├── "Shop Graded Bosch Appliances" → /england/manchester/bosch/
├── OR national → /bosch/

TO EXTERNAL:
─────────────────────────────────────────────────────────────────
├── Official Bosch repair finder (optional)
├── Parts affiliate (eSpares Bosch parts)

═══════════════════════════════════════════════════════════════
```

---

## 3. DATABASE DEPENDENCIES

### 3.1 Tables Used

```sql
-- Primary tables
brands (
  id, name, slug, tier, logo_url, website, country_of_origin,
  description, seo_title_template, popularity_score,
  has_authorised_network, is_active
)

places (
  id, country_id, name, slug, latitude, longitude,
  nearby_places, is_active
)

countries (
  id, name, slug, flag_emoji
)

service_providers (
  id, name, slug, phone, email, website,
  address_line1, city_name, postcode, latitude, longitude,
  description, short_description, years_trading,
  callout_fee_from, callout_fee_to, no_fix_no_fee, free_quotes,
  offers_same_day, offers_next_day, offers_emergency, offers_weekend,
  gas_safe_registered, fgas_certified, which_trusted_trader,
  checkatrade_member, public_liability_insurance,
  warranty_on_repairs_months, warranty_on_parts_months, uses_genuine_parts,
  average_rating, review_count, provider_score,
  is_active, is_verified, is_featured, status
)

-- Junction tables
provider_brand_authorisations (
  id, provider_id, brand_id,
  authorisation_type,  -- 'Factory Authorized', 'Certified', 'Trained'
  certificate_number,
  valid_from, valid_until,
  is_verified
)

provider_services (
  provider_id, appliance_category_id,
  is_active, offers_same_day, callout_fee_min, callout_fee_max,
  repair_warranty_months
)

provider_coverage_places (
  provider_id, place_id,
  is_primary, additional_callout_fee, same_day_available
)

appliance_categories (
  id, name, name_plural, name_singular, slug, tier, icon
)

-- Anti-thin gating
page_indexability (
  page_type = 'brand_repair',
  place_id, brand_id,
  provider_count, min_providers_required,
  is_repair_indexable, canonical_url
)
```

### 3.2 Brand Data Reference

```
BRANDS WITH AUTHORISED NETWORKS
═══════════════════════════════════════════════════════════════

PREMIUM TIER (has_authorised_network = true):
├── Bosch          (popularity: 100)
├── Samsung        (popularity: 98)
├── Smeg           (popularity: 96)
├── LG             (popularity: 94)
├── Siemens        (popularity: 92)
├── Neff           (popularity: 90)
└── Miele          (popularity: 88)

MID-RANGE TIER (has_authorised_network = true):
├── Hotpoint       (popularity: 85)
├── Indesit        (popularity: 83)
├── Beko           (popularity: 81)
├── AEG            (popularity: 75)
└── Whirlpool      (popularity: 71)

TOTAL BRANDS: 27
BRANDS WITH AUTHORISED NETWORKS: 12

═══════════════════════════════════════════════════════════════
```

### 3.3 Primary Data Query

```typescript
// lib/data/getBrandRepairPageData.ts

import { createClient } from '@/lib/supabase/server';

interface BrandRepairPageData {
  brand: Brand;
  place: Place;
  country: Country;
  providers: ProviderWithAuthorization[];
  applianceCategories: ApplianceCategory[];
  otherBrands: BrandWithCount[];
  nearbyCities: CityWithCount[];
  stats: PageStats;
  isIndexable: boolean;
}

export async function getBrandRepairPageData(
  countrySlug: string,
  citySlug: string,
  brandSlug: string
): Promise<BrandRepairPageData | null> {
  const supabase = createClient();

  // 1. Get brand details
  const { data: brand, error: brandError } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', brandSlug)
    .eq('is_active', true)
    .single();

  if (brandError || !brand) return null;

  // 2. Get place (city) details
  const { data: place, error: placeError } = await supabase
    .from('places')
    .select(`
      *,
      countries!inner (id, name, slug, flag_emoji)
    `)
    .eq('slug', citySlug)
    .eq('countries.slug', countrySlug)
    .eq('is_active', true)
    .single();

  if (placeError || !place) return null;

  // 3. Get providers authorized for this brand who cover this city
  const { data: providers } = await supabase
    .from('service_providers')
    .select(`
      *,
      provider_brand_authorisations!inner (
        brand_id,
        authorisation_type,
        certificate_number,
        valid_from,
        valid_until,
        is_verified
      ),
      provider_coverage_places!inner (
        place_id,
        is_primary,
        additional_callout_fee,
        same_day_available
      ),
      provider_services (
        appliance_category_id,
        is_active,
        offers_same_day,
        callout_fee_min,
        callout_fee_max,
        repair_warranty_months,
        appliance_categories (
          id, name, name_singular, slug, tier, icon
        )
      )
    `)
    .eq('provider_brand_authorisations.brand_id', brand.id)
    .eq('provider_coverage_places.place_id', place.id)
    .eq('is_active', true)
    .in('status', ['active', 'claimed', 'verified'])
    .order('is_featured', { ascending: false })
    .order('is_verified', { ascending: false })
    .order('average_rating', { ascending: false, nullsFirst: false })
    .order('provider_score', { ascending: false });

  // 4. Get appliance categories these providers can repair for this brand
  const categoryIds = new Set<string>();
  providers?.forEach(p => {
    p.provider_services?.forEach(ps => {
      if (ps.is_active && ps.appliance_categories) {
        categoryIds.add(ps.appliance_categories.id);
      }
    });
  });

  const { data: categories } = await supabase
    .from('appliance_categories')
    .select('id, name, name_singular, slug, tier, icon')
    .in('id', Array.from(categoryIds))
    .eq('is_active', true)
    .order('tier')
    .order('display_order');

  // 5. Get other brands with providers in this city (for cross-linking)
  const { data: otherBrands } = await supabase
    .rpc('get_brands_with_providers_in_city', { 
      p_place_id: place.id,
      p_exclude_brand_id: brand.id,
      p_limit: 8
    });

  // 6. Get nearby cities with this brand's providers
  const { data: nearbyCities } = await supabase
    .rpc('get_nearby_cities_with_brand_providers', {
      p_place_id: place.id,
      p_brand_id: brand.id,
      p_limit: 6
    });

  // 7. Check indexability
  const providerCount = providers?.length || 0;
  const isIndexable = providerCount >= 3; // Brand repair threshold

  // 8. Compute stats
  const stats = computeStats(providers || []);

  return {
    brand,
    place,
    country: place.countries,
    providers: providers || [],
    applianceCategories: categories || [],
    otherBrands: otherBrands || [],
    nearbyCities: nearbyCities || [],
    stats,
    isIndexable,
  };
}

function computeStats(providers: any[]): PageStats {
  const count = providers.length;
  const verified = providers.filter(p => 
    p.provider_brand_authorisations?.[0]?.is_verified
  ).length;
  const sameDay = providers.filter(p => p.offers_same_day).length;
  
  const fees = providers
    .map(p => p.callout_fee_from)
    .filter(Boolean)
    .sort((a, b) => a - b);
  
  const ratings = providers
    .map(p => p.average_rating)
    .filter(Boolean);
  
  return {
    providerCount: count,
    verifiedCount: verified,
    sameDayCount: sameDay,
    minCalloutFee: fees[0] || null,
    avgRating: ratings.length 
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : null,
  };
}
```

### 3.4 Supporting Database Functions

```sql
-- Function: Get brands with providers in a city
CREATE OR REPLACE FUNCTION get_brands_with_providers_in_city(
  p_place_id UUID,
  p_exclude_brand_id UUID DEFAULT NULL,
  p_limit INTEGER DEFAULT 8
)
RETURNS TABLE (
  brand_id UUID,
  brand_name VARCHAR,
  brand_slug VARCHAR,
  brand_tier brand_tier_enum,
  logo_url VARCHAR,
  provider_count BIGINT,
  verified_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.id,
    b.name,
    b.slug,
    b.tier,
    b.logo_url,
    COUNT(DISTINCT pba.provider_id) as provider_count,
    COUNT(DISTINCT pba.provider_id) FILTER (WHERE pba.is_verified) as verified_count
  FROM brands b
  JOIN provider_brand_authorisations pba ON pba.brand_id = b.id
  JOIN service_providers sp ON sp.id = pba.provider_id
  JOIN provider_coverage_places pcp ON pcp.provider_id = sp.id
  WHERE 
    pcp.place_id = p_place_id
    AND sp.is_active = true
    AND sp.status IN ('active', 'claimed', 'verified')
    AND b.is_active = true
    AND (p_exclude_brand_id IS NULL OR b.id != p_exclude_brand_id)
  GROUP BY b.id, b.name, b.slug, b.tier, b.logo_url
  HAVING COUNT(DISTINCT pba.provider_id) > 0
  ORDER BY COUNT(DISTINCT pba.provider_id) DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;


-- Function: Get nearby cities with brand providers
CREATE OR REPLACE FUNCTION get_nearby_cities_with_brand_providers(
  p_place_id UUID,
  p_brand_id UUID,
  p_limit INTEGER DEFAULT 6
)
RETURNS TABLE (
  place_id UUID,
  place_name VARCHAR,
  place_slug VARCHAR,
  country_slug VARCHAR,
  provider_count BIGINT,
  distance_km NUMERIC
) AS $$
DECLARE
  v_lat NUMERIC;
  v_lng NUMERIC;
BEGIN
  -- Get origin coordinates
  SELECT latitude, longitude INTO v_lat, v_lng
  FROM places WHERE id = p_place_id;
  
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.slug,
    c.slug as country_slug,
    COUNT(DISTINCT pba.provider_id) as provider_count,
    ROUND(
      (6371 * acos(
        cos(radians(v_lat)) * cos(radians(p.latitude)) *
        cos(radians(p.longitude) - radians(v_lng)) +
        sin(radians(v_lat)) * sin(radians(p.latitude))
      ))::NUMERIC, 1
    ) as distance_km
  FROM places p
  JOIN countries c ON c.id = p.country_id
  JOIN provider_coverage_places pcp ON pcp.place_id = p.id
  JOIN service_providers sp ON sp.id = pcp.provider_id
  JOIN provider_brand_authorisations pba ON pba.provider_id = sp.id
  WHERE 
    pba.brand_id = p_brand_id
    AND p.id != p_place_id
    AND p.is_active = true
    AND sp.is_active = true
    AND sp.status IN ('active', 'claimed', 'verified')
  GROUP BY p.id, p.name, p.slug, c.slug, p.latitude, p.longitude
  HAVING COUNT(DISTINCT pba.provider_id) > 0
  ORDER BY distance_km ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;
```

---

## 4. ANTI-THIN PAGE GATING

### 4.1 Indexability Rules

```
BRAND REPAIR PAGE — ANTI-THIN GATING
═══════════════════════════════════════════════════════════════

MINIMUM REQUIREMENT: 3 authorized providers

Provider Count | Action           | SEO Impact
─────────────────────────────────────────────────────────────────
0 providers    | 302 redirect     | Redirect to city hub
1-2 providers  | noindex, follow  | Show page, don't index
3+ providers   | index, follow    | Full SEO page

REDIRECT TARGET:
0 providers → /england/manchester/ (city hub)

NOINDEX IMPLEMENTATION:
export const metadata = {
  robots: providerCount < 3 ? 'noindex, follow' : 'index, follow',
};

FALLBACK CONTENT (1-2 providers):
Show the providers with message:
"We currently have {n} {brand} authorized engineer(s) in {city}.
Looking for more options? Our general repair engineers can also 
service {brand} appliances. [View all repair engineers →]"

Link to: /england/manchester/washing-machine-repair/?brand=bosch

═══════════════════════════════════════════════════════════════
```

### 4.2 Implementation

```typescript
// lib/pages/checkBrandRepairIndexability.ts

export async function checkBrandRepairIndexability(
  placeId: string,
  brandId: string
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
    .eq('brand_id', brandId)
    .eq('page_type', 'brand_repair')
    .single();

  if (!data) {
    // Count directly if no record
    const { count } = await supabase
      .from('provider_brand_authorisations')
      .select('*', { count: 'exact', head: true })
      .eq('brand_id', brandId)
      .in('provider_id',
        supabase
          .from('provider_coverage_places')
          .select('provider_id')
          .eq('place_id', placeId)
      );

    const providerCount = count || 0;
    return {
      isIndexable: providerCount >= 3,
      providerCount,
      minRequired: 3,
      fallbackAction: providerCount === 0 ? 'redirect' 
        : providerCount < 3 ? 'noindex' 
        : 'show',
    };
  }

  return {
    isIndexable: data.is_repair_indexable,
    providerCount: data.provider_count,
    minRequired: data.min_providers_required || 3,
    fallbackAction: data.is_repair_indexable ? 'show' 
      : data.provider_count === 0 ? 'redirect' 
      : 'noindex',
  };
}
```

---

## 5. PAGE STRUCTURE

### 5.1 Section Overview

```
PAGE SECTIONS — BRAND REPAIR PAGE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│  1. BREADCRUMB                                              │
│     Home > England > Manchester > Bosch Repair              │
├─────────────────────────────────────────────────────────────┤
│  2. HERO / H1                                               │
│     Bosch Repair in Manchester                              │
│     ━━━━━━━━━━━━━━━━━━━━━━━━━                              │
├─────────────────────────────────────────────────────────────┤
│  3. BRAND TRUST BANNER                                      │
│     [Bosch Logo] Official Bosch-Authorized Engineers        │
├─────────────────────────────────────────────────────────────┤
│  4. INTRO PARAGRAPH                                         │
│     Find 8 Bosch-authorized repair engineers in Manchester..│
├─────────────────────────────────────────────────────────────┤
│  5. QUICK STATS BAR                                         │
│     8 Engineers | 5 Verified | From £55 | 4.8★ Avg         │
├─────────────────────────────────────────────────────────────┤
│  6. FILTER / SORT CONTROLS                                  │
│     [Verified ▼] [Same-day ▼] [Appliance ▼] Sort: Rating ▼ │
├─────────────────────────────────────────────────────────────┤
│  7. PROVIDER LISTINGS                                       │
│     [Provider Card with Brand Auth Badge - Full variant]    │
│     [Provider Card with Brand Auth Badge - Full variant]    │
│     ...                                                     │
├─────────────────────────────────────────────────────────────┤
│  8. APPLIANCE CATEGORIES FOR THIS BRAND                     │
│     What Bosch Appliances Can We Repair?                    │
│     [Washing Machines] [Dishwashers] [Fridges] [Ovens]     │
├─────────────────────────────────────────────────────────────┤
│  9. WHY CHOOSE AUTHORIZED REPAIR                            │
│     Benefits of Bosch-Authorized Engineers                  │
│     ✓ Genuine Parts ✓ Manufacturer Training ✓ Warranty Safe│
├─────────────────────────────────────────────────────────────┤
│  10. AVERAGE REPAIR COSTS                                   │
│     Bosch Repair Costs in Manchester                        │
│     Callout: £55-75 | Typical Repair: £85-160              │
├─────────────────────────────────────────────────────────────┤
│  11. PARTS AFFILIATE                                        │
│     🔧 DIY? Order Genuine Bosch Parts                       │
│     [Shop Bosch Parts at eSpares →]                        │
├─────────────────────────────────────────────────────────────┤
│  12. CROSS-SELL TO RETAIL                                   │
│     🛒 Appliance beyond repair?                             │
│     [Browse Graded Bosch Appliances from £199 →]           │
├─────────────────────────────────────────────────────────────┤
│  13. OTHER BRANDS IN MANCHESTER                             │
│     Also need repair for other brands?                      │
│     [Samsung] [LG] [Hotpoint] [Siemens] [Miele] [AEG]     │
├─────────────────────────────────────────────────────────────┤
│  14. NEARBY CITIES                                          │
│     Bosch Repair in Nearby Cities                           │
│     [Liverpool - 35mi] [Leeds - 40mi] [Sheffield - 38mi]   │
├─────────────────────────────────────────────────────────────┤
│  15. FAQS                                                   │
│     Frequently Asked Questions                              │
│     ▼ Is it worth using an authorized Bosch engineer?      │
│     ▼ Does using non-authorized repair void warranty?      │
│     ▼ How much does Bosch repair cost?                     │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### 5.2 Complete Desktop Layout

```
BRAND REPAIR PAGE — DESKTOP (Bosch Manchester Example)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ [LOGO]    [🔍 Search appliances, stores, repairs...]   For Business ▼  Login │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🏠 Home  >  England  >  Manchester  >  Bosch Repair                       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [Bosch Logo]                                                              │
│                                                                             │
│  BOSCH REPAIR IN MANCHESTER                                                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                        │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ✓ MANUFACTURER-AUTHORIZED ENGINEERS                                │   │
│  │  Our engineers are trained and certified by Bosch to repair their   │   │
│  │  full range of appliances using genuine parts.                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Find 8 Bosch-authorized repair engineers in Manchester. All our listed   │
│  engineers have been verified as authorized Bosch service partners,        │
│  ensuring quality repairs with genuine parts.                              │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  👨‍🔧 8 Engineers  │  ✓ 5 Verified  │  💰 From £55  │  ⭐ 4.8 Avg    │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FILTERS                                                           SORT BY │
│  ─────────────────────────────────────────────────────────────────────     │
│  [Verified Only ▼]  [Same-Day ▼]  [Appliance Type ▼]         [Rating ▼]   │
│                                                                             │
│  Showing 8 Bosch-authorized engineers in Manchester                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ★ FEATURED • BOSCH AUTHORIZED                                       │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │  ⭐ 4.9 (127 reviews)                                              │   │
│  │                                                                     │   │
│  │  MIDLANDS APPLIANCE REPAIRS                    ✓ Bosch Certified   │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━                   Certificate: BSH-12345│   │
│  │                                                                     │   │
│  │  ⚡ Same-day callouts  •  20+ years experience                     │   │
│  │  📍 Manchester, M1  •  Covers 25-mile radius                       │   │
│  │                                                                     │   │
│  │  BOSCH APPLIANCES WE REPAIR:                                       │   │
│  │  ✓ Washing Machines  ✓ Dishwashers  ✓ Fridge Freezers  ✓ Ovens   │   │
│  │                                                                     │   │
│  │  💰 Callout: £55  •  ✓ No fix no fee  •  ✓ 12-month warranty      │   │
│  │     ✓ Uses genuine Bosch parts                                     │   │
│  │                                                                     │   │
│  │  TRUST SIGNALS:                                                    │   │
│  │  [Gas Safe] [Which? Trusted] [Checkatrade 9.8] [£2M Insured]      │   │
│  │                                                                     │   │
│  │  ┌───────────────────────────┐  ┌───────────────────────────┐     │   │
│  │  │  📞 CALL NOW: 0121 XXX   │  │    VIEW FULL PROFILE →    │     │   │
│  │  └───────────────────────────┘  └───────────────────────────┘     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ BOSCH AUTHORIZED                                                    │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │  [Similar structure for each provider...]                          │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ... more provider cards ...                                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔧 BOSCH APPLIANCES WE REPAIR IN MANCHESTER                              │
│  ═══════════════════════════════════════════════                          │
│                                                                             │
│  Our authorized engineers can repair the full range of Bosch appliances:  │
│                                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │     🧺      │ │     🍽️      │ │     🧊      │ │     🔥      │          │
│  │  Washing    │ │ Dishwashers │ │   Fridge    │ │   Ovens &   │          │
│  │  Machines   │ │             │ │  Freezers   │ │   Cookers   │          │
│  │  8 eng.     │ │   7 eng.    │ │   6 eng.    │ │   5 eng.    │          │
│  │  [View →]   │ │  [View →]   │ │  [View →]   │ │  [View →]   │          │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                          │
│  │     🌀      │ │     🍳      │ │     💨      │                          │
│  │   Tumble    │ │    Hobs     │ │   Cooker    │                          │
│  │   Dryers    │ │             │ │   Hoods     │                          │
│  │  4 eng.     │ │   3 eng.    │ │   2 eng.    │                          │
│  │  [View →]   │ │  [View →]   │ │  [View →]   │                          │
│  └─────────────┘ └─────────────┘ └─────────────┘                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ✓ WHY CHOOSE BOSCH-AUTHORIZED REPAIR?                                    │
│  ═══════════════════════════════════════                                   │
│                                                                             │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐  │
│  │                     │ │                     │ │                     │  │
│  │  ✓ GENUINE PARTS   │ │  ✓ TRAINED BY      │ │  ✓ WARRANTY SAFE   │  │
│  │                     │ │     BOSCH          │ │                     │  │
│  │  Only authentic     │ │  Certified to      │ │  Won't void your   │  │
│  │  Bosch replacement  │ │  manufacturer      │ │  manufacturer      │  │
│  │  parts used         │ │  standards         │ │  warranty          │  │
│  │                     │ │                     │ │                     │  │
│  └─────────────────────┘ └─────────────────────┘ └─────────────────────┘  │
│                                                                             │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐  │
│  │                     │ │                     │ │                     │  │
│  │  ✓ DIAGNOSTIC      │ │  ✓ PRIORITY        │ │  ✓ QUALITY         │  │
│  │     EXPERTISE      │ │     SERVICE        │ │     GUARANTEE      │  │
│  │                     │ │                     │ │                     │  │
│  │  Access to Bosch    │ │  Often faster      │ │  Work backed by    │  │
│  │  technical data     │ │  parts supply      │ │  repair warranties │  │
│  │  and error codes    │ │  from manufacturer │ │  6-12 months       │  │
│  │                     │ │                     │ │                     │  │
│  └─────────────────────┘ └─────────────────────┘ └─────────────────────┘  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  💰 BOSCH REPAIR COSTS IN MANCHESTER                                       │
│  ═══════════════════════════════════════                                   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  TYPICAL COSTS FOR BOSCH REPAIRS                                   │   │
│  │  ─────────────────────────────────────                             │   │
│  │                                                                     │   │
│  │  Callout / Diagnosis:        £55 - £75                            │   │
│  │  Average Total Repair:       £95 - £160                           │   │
│  │                                                                     │   │
│  │  Note: Bosch authorized repairs may cost slightly more than        │   │
│  │  non-authorized, but include genuine parts and warranty protection.│   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔧 PREFER TO FIX IT YOURSELF?                                            │
│  ═══════════════════════════════                                           │
│                                                                             │
│  Order genuine Bosch parts from our trusted partner eSpares.              │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────┐    │
│  │          SHOP GENUINE BOSCH PARTS AT ESPARES →                    │    │
│  └───────────────────────────────────────────────────────────────────┘    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🛒 APPLIANCE BEYOND REPAIR?                                              │
│  ════════════════════════════                                              │
│                                                                             │
│  Browse graded Bosch appliances with savings of 30-70% off RRP.           │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────┐    │
│  │      BROWSE GRADED BOSCH APPLIANCES IN MANCHESTER →               │    │
│  └───────────────────────────────────────────────────────────────────┘    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🏷️ REPAIR OTHER BRANDS IN MANCHESTER                                     │
│  ═══════════════════════════════════════                                   │
│                                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ Samsung │ │   LG    │ │Hotpoint │ │ Siemens │ │  Miele  │ │   AEG   │  │
│  │ 6 eng.  │ │ 5 eng.  │ │ 8 eng.  │ │ 4 eng.  │ │ 3 eng.  │ │ 4 eng.  │  │
│  │ [View →]│ │ [View →]│ │ [View →]│ │ [View →]│ │ [View →]│ │ [View →]│  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📍 BOSCH REPAIR IN NEARBY CITIES                                          │
│  ═══════════════════════════════════                                       │
│                                                                             │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐                 │
│  │   Liverpool    │ │     Leeds      │ │   Sheffield    │                 │
│  │    35 miles    │ │    40 miles    │ │    38 miles    │                 │
│  │   5 engineers  │ │   4 engineers  │ │   3 engineers  │                 │
│  │    [View →]    │ │    [View →]    │ │    [View →]    │                 │
│  └────────────────┘ └────────────────┘ └────────────────┘                 │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ❓ FREQUENTLY ASKED QUESTIONS                                             │
│  ═══════════════════════════════                                           │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ▸ Is it worth using a Bosch-authorized engineer?                    │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ Will using a non-authorized engineer void my Bosch warranty?     │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ How much does Bosch repair cost compared to other brands?        │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ Do Bosch-authorized engineers use genuine parts?                  │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ▸ How can I verify an engineer is actually Bosch-authorized?       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [FOOTER - Spec 05]                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
```

---

## 6. SECTION SPECIFICATIONS

### 6.1 Section 1: Breadcrumbs

```
BREADCRUMBS
═══════════════════════════════════════════════════════════════

DESKTOP:
🏠 Home  >  England  >  Manchester  >  Bosch Repair

MOBILE:
< Manchester (single back link)

STRUCTURE:
├── Home → /
├── Country → /england/
├── City → /england/manchester/
└── Brand Repair (current, no link)

SCHEMA.ORG:
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
    { "@type": "ListItem", "position": 2, "name": "England", "item": "/england/" },
    { "@type": "ListItem", "position": 3, "name": "Manchester", "item": "/england/manchester/" },
    { "@type": "ListItem", "position": 4, "name": "Bosch Repair" }
  ]
}

═══════════════════════════════════════════════════════════════
```

### 6.2 Section 2: Hero / H1

```
HERO SECTION
═══════════════════════════════════════════════════════════════

CONTENT:
├── Brand logo (from brands.logo_url)
├── H1: "{Brand} Repair in {City}"
├── Trust banner (manufacturer-authorized)
├── Intro paragraph
└── Stats box

H1 TEMPLATE:
"{brand.name} Repair in {place.name}"

Examples:
├── "Bosch Repair in Manchester"
├── "Samsung Repair in Birmingham"
├── "Hotpoint Repair in Leeds"

INTRO TEMPLATE:
"Find {count} {brand.name}-authorized repair engineers in 
{place.name}. All our listed engineers have been verified as 
authorized {brand.name} service partners, ensuring quality 
repairs with genuine parts."

TRUST BANNER:
┌─────────────────────────────────────────────────────────────┐
│  ✓ MANUFACTURER-AUTHORIZED ENGINEERS                        │
│  Our engineers are trained and certified by {brand.name} to │
│  repair their full range of appliances using genuine parts. │
└─────────────────────────────────────────────────────────────┘

CONDITIONAL CONTENT:
If brand.has_authorised_network = true:
  Show "Manufacturer-Authorized" trust banner
If brand.has_authorised_network = false:
  Show "Experienced {brand.name} Specialists" instead

STYLING:
├── Brand logo:      Max 120px width, positioned top-left
├── H1:              36px desktop, 28px mobile, font-weight 800
├── H1 color:        #2563eb (secondary)
├── Trust banner:    Green background (#ECFDF5), green border
├── Intro:           18px, grey-600
├── Mobile:          Logo above H1, stacked vertically

═══════════════════════════════════════════════════════════════
```

### 6.3 Section 5: Quick Stats Bar

```
QUICK STATS BAR
═══════════════════════════════════════════════════════════════

VISUAL:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  👨‍🔧 8 Engineers  │  ✓ 5 Verified  │  💰 From £55  │  ⭐ 4.8  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

STATS DISPLAYED:
├── Engineer Count:    Total providers authorized for this brand
├── Verified Count:    Providers with is_verified = true
├── Min Callout:       MIN(callout_fee_from) from providers
├── Avg Rating:        AVG(average_rating) rounded to 1 decimal

CONDITIONAL DISPLAY:
├── If 0 same-day → Don't show same-day stat
├── If no ratings → Show "New" instead of rating
├── If no callout fees → Show "Varies" instead of price

MOBILE:
2x2 grid layout instead of horizontal

═══════════════════════════════════════════════════════════════
```

### 6.4 Section 6: Filter / Sort Controls

```
FILTER / SORT CONTROLS
═══════════════════════════════════════════════════════════════

FILTERS AVAILABLE:

1. VERIFIED STATUS (dropdown)
   ├── All Engineers (default)
   ├── Verified Only (pba.is_verified = true)
   └── Includes certificate number display

2. AVAILABILITY (dropdown)
   ├── All
   ├── Same-day available
   ├── Next-day available
   └── Emergency (24/7)

3. APPLIANCE TYPE (dropdown)
   ├── All Appliances (default)
   ├── Washing Machines
   ├── Dishwashers
   ├── Fridge Freezers
   └── ... (from provider_services linked categories)

SORT OPTIONS:
├── Top Rated (default) - average_rating DESC
├── Most Reviews - review_count DESC
├── Lowest Callout - callout_fee_from ASC
├── Verified First - is_verified DESC, then rating

URL STATE:
/england/manchester/bosch-repair/?verified=true&appliance=washing-machines&sort=rating

Note: Filtered pages canonical to unfiltered version.

═══════════════════════════════════════════════════════════════
```

### 6.5 Section 7: Provider Listings

```
PROVIDER LISTINGS — WITH BRAND AUTH BADGE
═══════════════════════════════════════════════════════════════

Uses Provider Card (Spec 09) with additional brand context.

ADDITIONAL DISPLAY ELEMENTS FOR BRAND REPAIR:

1. AUTHORIZATION BADGE (prominent):
   ┌─────────────────────────────────────────┐
   │  ✓ BOSCH AUTHORIZED                     │
   │  Certificate: BSH-12345                 │
   │  Verified: January 2026                 │
   └─────────────────────────────────────────┘

2. APPLIANCES FOR THIS BRAND (filtered):
   "BOSCH APPLIANCES WE REPAIR:"
   ✓ Washing Machines  ✓ Dishwashers  ✓ Fridge Freezers

   (Only show categories where this provider has 
   provider_services AND provider_brand_authorisations)

3. GENUINE PARTS INDICATOR:
   "✓ Uses genuine Bosch parts"
   (if service_providers.uses_genuine_parts = true)

CARD PROPS FOR THIS CONTEXT:
<ProviderCard
  provider={provider}
  variant="full"
  brandContext={{
    brandId: brand.id,
    brandName: brand.name,
    brandSlug: brand.slug,
    authorization: provider.provider_brand_authorisations[0],
  }}
  pageContext={{
    pagePath: `/england/manchester/bosch-repair/`,
    pageType: 'brand_repair',
    placeId: place.id,
    brandId: brand.id,
    citySlug: 'manchester',
    countrySlug: 'england',
  }}
  showBrandAuthBadge={true}
  showAppliancesForBrand={true}
  showGenuineParts={true}
  highlightVerified={true}
/>

SORT ORDER:
1. Featured providers (is_featured = true)
2. Verified authorization (pba.is_verified = true)
3. Provider verification (is_verified = true)
4. Average rating DESC
5. Provider score DESC

═══════════════════════════════════════════════════════════════
```

### 6.6 Section 8: Appliance Categories for Brand

```
APPLIANCE CATEGORIES — BRAND SPECIFIC
═══════════════════════════════════════════════════════════════

PURPOSE:
Internal linking to category repair pages.
Shows what appliances the brand manufactures.

VISUAL:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 BOSCH APPLIANCES WE REPAIR IN MANCHESTER               │
│  ════════════════════════════════════════════               │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │     🧺      │ │     🍽️      │ │     🧊      │           │
│  │  Washing    │ │ Dishwashers │ │   Fridge    │           │
│  │  Machines   │ │             │ │  Freezers   │           │
│  │  8 eng.     │ │   7 eng.    │ │   6 eng.    │           │
│  │  [View →]   │ │  [View →]   │ │  [View →]   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA:
Aggregate from provider_services for all providers on this page.

LINK TARGETS:
Option A (Preferred): Category page with brand filter
/england/manchester/washing-machine-repair/?brand=bosch

Option B: Direct to category page
/england/manchester/washing-machine-repair/

COUNT:
Number of providers on THIS page who repair that category.

DISPLAY RULES:
├── Order by provider count DESC
├── Show icon from appliance_categories.icon
├── Max 8 categories
├── Hide categories with 0 providers

═══════════════════════════════════════════════════════════════
```

### 6.7 Section 9: Why Choose Authorized Repair

```
WHY AUTHORIZED REPAIR — TRUST BUILDING CONTENT
═══════════════════════════════════════════════════════════════

PURPOSE:
Educational content for SEO and user trust.
Targets "is authorized repair worth it" queries.

VISUAL:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ✓ WHY CHOOSE BOSCH-AUTHORIZED REPAIR?                     │
│  ═══════════════════════════════════════                    │
│                                                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐│
│  │ ✓ GENUINE PARTS │ │ ✓ TRAINED BY    │ │ ✓ WARRANTY    ││
│  │                 │ │    BOSCH        │ │    SAFE       ││
│  │ Only authentic  │ │ Certified to    │ │ Won't void    ││
│  │ Bosch parts     │ │ manufacturer    │ │ manufacturer  ││
│  │ used            │ │ standards       │ │ warranty      ││
│  └─────────────────┘ └─────────────────┘ └────────────────┘│
│                                                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐│
│  │ ✓ DIAGNOSTIC    │ │ ✓ PRIORITY      │ │ ✓ QUALITY     ││
│  │    EXPERTISE    │ │    SERVICE      │ │    GUARANTEE  ││
│  │                 │ │                 │ │               ││
│  │ Access to Bosch │ │ Often faster    │ │ Repairs backed││
│  │ technical data  │ │ parts supply    │ │ by 6-12 month ││
│  │ and error codes │ │ from factory    │ │ warranties    ││
│  └─────────────────┘ └─────────────────┘ └────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘

CONTENT IS TEMPLATED:
Replace {brand} with brand.name dynamically.

CONDITIONAL:
Only show if brand.has_authorised_network = true.
Otherwise show "Why Choose Experienced Specialists".

═══════════════════════════════════════════════════════════════
```

### 6.8 Section 13: Other Brands

```
OTHER BRANDS — INTERNAL CROSS-LINKING
═══════════════════════════════════════════════════════════════

PURPOSE:
Links to other brand repair pages in same city.
No dead ends for users.

VISUAL:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🏷️ REPAIR OTHER BRANDS IN MANCHESTER                      │
│  ═══════════════════════════════════════                    │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ Samsung │ │   LG    │ │Hotpoint │ │ Siemens │           │
│  │ 6 eng.  │ │ 5 eng.  │ │ 8 eng.  │ │ 4 eng.  │           │
│  │ [View →]│ │ [View →]│ │ [View →]│ │ [View →]│           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
get_brands_with_providers_in_city() function

DISPLAY RULES:
├── Exclude current brand
├── Order by provider_count DESC
├── Max 8 brands
├── Only show brands with at least 1 provider
├── Show brand logo if available

LINK TARGET:
/england/manchester/samsung-repair/

FALLBACK:
If no other brands have authorized providers:
Link to general repair page with message:
"Looking for other brands? [View all repair engineers →]"
→ /england/manchester/washing-machine-repair/

═══════════════════════════════════════════════════════════════
```

---

## 7. SEO IMPLEMENTATION

### 7.1 Meta Tags

```typescript
// Generate meta tags for brand repair page

export function generateBrandRepairMetadata(
  brand: Brand,
  place: Place,
  country: Country,
  stats: PageStats
): Metadata {
  const title = `${brand.name} Repair in ${place.name} | ${stats.providerCount} Authorized Engineers`;
  
  const description = `Compare ${stats.providerCount} ${brand.name}-authorized repair engineers in ${place.name}. ` +
    `${stats.verifiedCount} verified, from £${stats.minCalloutFee}. ` +
    `Same-day callouts, genuine parts, warranty-safe repairs.`;

  return {
    title,
    description,
    keywords: `${brand.name} repair ${place.name}, ${brand.name} engineer ${place.name}, ` +
      `${brand.name} authorized repair, ${brand.name} service ${place.name}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: `https://ukgradedappliances.co.uk/${country.slug}/${place.slug}/${brand.slug}-repair/`,
      images: brand.logo_url ? [{ url: brand.logo_url }] : undefined,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `https://ukgradedappliances.co.uk/${country.slug}/${place.slug}/${brand.slug}-repair/`,
    },
    robots: {
      index: stats.providerCount >= 3,
      follow: true,
    },
  };
}
```

### 7.2 Schema.org Structured Data

```typescript
// Generate schema for brand repair page

function generateBrandRepairSchema(
  brand: Brand,
  place: Place,
  country: Country,
  providers: Provider[],
  stats: PageStats
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `https://ukgradedappliances.co.uk/${country.slug}/${place.slug}/${brand.slug}-repair/#webpage`,
        url: `https://ukgradedappliances.co.uk/${country.slug}/${place.slug}/${brand.slug}-repair/`,
        name: `${brand.name} Repair in ${place.name}`,
        description: `Find ${brand.name}-authorized repair engineers in ${place.name}`,
        isPartOf: { '@id': 'https://ukgradedappliances.co.uk/#website' },
        breadcrumb: { '@id': `.../#breadcrumb` },
      },

      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `.../#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
          { '@type': 'ListItem', position: 2, name: country.name, item: `/${country.slug}/` },
          { '@type': 'ListItem', position: 3, name: place.name, item: `/${country.slug}/${place.slug}/` },
          { '@type': 'ListItem', position: 4, name: `${brand.name} Repair` }
        ]
      },

      // Service (the repair service)
      {
        '@type': 'Service',
        '@id': `.../#service`,
        name: `${brand.name} Appliance Repair`,
        description: `Professional ${brand.name} appliance repair services in ${place.name}`,
        provider: providers.slice(0, 5).map(p => ({
          '@type': 'HomeAndConstructionBusiness',
          name: p.name,
          telephone: p.phone,
          url: `https://ukgradedappliances.co.uk/provider/${p.slug}/`
        })),
        areaServed: {
          '@type': 'City',
          name: place.name,
          containedInPlace: {
            '@type': 'Country',
            name: country.name
          }
        },
        offers: stats.minCalloutFee ? {
          '@type': 'AggregateOffer',
          lowPrice: stats.minCalloutFee,
          priceCurrency: 'GBP',
          offerCount: stats.providerCount
        } : undefined,
      },

      // ItemList (provider listings)
      {
        '@type': 'ItemList',
        '@id': `.../#providerlist`,
        name: `${brand.name} Repair Engineers in ${place.name}`,
        numberOfItems: providers.length,
        itemListElement: providers.map((p, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'HomeAndConstructionBusiness',
            name: p.name,
            url: `https://ukgradedappliances.co.uk/provider/${p.slug}/`,
            telephone: p.phone,
            aggregateRating: p.average_rating ? {
              '@type': 'AggregateRating',
              ratingValue: p.average_rating.toString(),
              reviewCount: p.review_count
            } : undefined,
          }
        }))
      },

      // FAQPage
      {
        '@type': 'FAQPage',
        '@id': `.../#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `Is it worth using a ${brand.name}-authorized engineer?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes, ${brand.name}-authorized engineers are trained by the manufacturer, ` +
                `use genuine parts, and won't void your warranty. They also have access to ` +
                `${brand.name}'s technical documentation and error codes.`
            }
          },
          {
            '@type': 'Question',
            name: `How much does ${brand.name} repair cost in ${place.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${brand.name} repair in ${place.name} typically costs £${stats.minCalloutFee || 55}-£75 ` +
                `for callout/diagnosis, with average total repairs ranging from £95-£160.`
            }
          },
          // ... more FAQs
        ]
      }
    ]
  };
}
```

### 7.3 H-Tag Structure

```
H-TAG HIERARCHY — BRAND REPAIR PAGE
═══════════════════════════════════════════════════════════════

<h1>Bosch Repair in Manchester</h1>
├── <h2>Bosch-Authorized Engineers in Manchester</h2>
│   └── (provider listings section)
├── <h2>Bosch Appliances We Repair in Manchester</h2>
│   └── (appliance categories)
├── <h2>Why Choose Bosch-Authorized Repair?</h2>
│   ├── <h3>Genuine Parts</h3>
│   ├── <h3>Trained by Bosch</h3>
│   ├── <h3>Warranty Safe</h3>
│   └── ... (6 benefits)
├── <h2>Bosch Repair Costs in Manchester</h2>
├── <h2>Repair Other Brands in Manchester</h2>
├── <h2>Bosch Repair in Nearby Cities</h2>
└── <h2>Frequently Asked Questions</h2>
    ├── <h3>Is it worth using a Bosch-authorized engineer?</h3>
    └── ... (FAQ questions)

═══════════════════════════════════════════════════════════════
```

---

## 8. COMPLETE PAGE COMPONENT

```typescript
// app/[country]/[city]/[brand]-repair/page.tsx

import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getBrandRepairPageData } from '@/lib/data/getBrandRepairPageData';
import { checkBrandRepairIndexability } from '@/lib/pages/checkBrandRepairIndexability';
import { generateBrandRepairMetadata, generateBrandRepairSchema } from '@/lib/seo/brandRepair';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import BrandRepairHero from '@/components/brandRepair/BrandRepairHero';
import QuickStatsBar from '@/components/shared/QuickStatsBar';
import FilterSortControls from '@/components/shared/FilterSortControls';
import ProviderListings from '@/components/brandRepair/ProviderListings';
import ApplianceCategoriesSection from '@/components/brandRepair/ApplianceCategoriesSection';
import WhyAuthorizedSection from '@/components/brandRepair/WhyAuthorizedSection';
import RepairCostsSection from '@/components/brandRepair/RepairCostsSection';
import PartsAffiliateSection from '@/components/shared/PartsAffiliateSection';
import CrossSellRetailSection from '@/components/shared/CrossSellRetailSection';
import OtherBrandsSection from '@/components/brandRepair/OtherBrandsSection';
import NearbyCitiesSection from '@/components/brandRepair/NearbyCitiesSection';
import FAQSection from '@/components/shared/FAQSection';
import SchemaOrg from '@/components/seo/SchemaOrg';

interface Props {
  params: { 
    country: string;
    city: string;
  };
}

// Extract brand slug from URL path
function extractBrandSlug(path: string): string | null {
  // Path format: /england/manchester/bosch-repair
  // Extract "bosch" from "bosch-repair"
  const match = path.match(/\/([^/]+)-repair\/?$/);
  return match ? match[1] : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Note: In Next.js 15, you'd access the full path differently
  // This is simplified for illustration
  const brandSlug = 'bosch'; // Would extract from URL
  
  const data = await getBrandRepairPageData(
    params.country,
    params.city,
    brandSlug
  );
  
  if (!data) return {};
  
  return generateBrandRepairMetadata(
    data.brand,
    data.place,
    data.country,
    data.stats
  );
}

export default async function BrandRepairPage({ params }: Props) {
  const brandSlug = 'bosch'; // Would extract from URL path
  
  // Fetch all data
  const data = await getBrandRepairPageData(
    params.country,
    params.city,
    brandSlug
  );
  
  if (!data) {
    notFound();
  }
  
  // Check indexability
  const indexability = await checkBrandRepairIndexability(
    data.place.id,
    data.brand.id
  );
  
  // Handle redirects for 0 providers
  if (indexability.fallbackAction === 'redirect') {
    redirect(`/${params.country}/${params.city}/`);
  }
  
  const {
    brand,
    place,
    country,
    providers,
    applianceCategories,
    otherBrands,
    nearbyCities,
    stats,
    isIndexable,
  } = data;
  
  // Generate schema
  const schema = generateBrandRepairSchema(brand, place, country, providers, stats);
  
  // Generate FAQs for this brand
  const faqs = generateBrandRepairFAQs(brand, place, stats);

  return (
    <>
      <SchemaOrg data={schema} />
      <Header />
      
      <main>
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: country.name, href: `/${country.slug}/` },
            { label: place.name, href: `/${country.slug}/${place.slug}/` },
            { label: `${brand.name} Repair` },
          ]}
        />
        
        {/* Hero */}
        <BrandRepairHero
          brand={brand}
          place={place}
          stats={stats}
        />
        
        {/* Quick Stats */}
        <QuickStatsBar
          stats={[
            { icon: '👨‍🔧', value: stats.providerCount, label: 'Engineers' },
            { icon: '✓', value: stats.verifiedCount, label: 'Verified' },
            { icon: '💰', value: `£${stats.minCalloutFee}`, label: 'From' },
            { icon: '⭐', value: stats.avgRating || 'New', label: 'Avg' },
          ]}
        />
        
        {/* Filters */}
        <FilterSortControls
          filters={[
            { id: 'verified', label: 'Verified', options: ['All', 'Verified Only'] },
            { id: 'availability', label: 'Availability', options: ['All', 'Same-day', 'Next-day'] },
            { id: 'appliance', label: 'Appliance', options: ['All', ...applianceCategories.map(c => c.name)] },
          ]}
          sortOptions={[
            { id: 'rating', label: 'Top Rated' },
            { id: 'reviews', label: 'Most Reviews' },
            { id: 'price', label: 'Lowest Callout' },
            { id: 'verified', label: 'Verified First' },
          ]}
          resultCount={providers.length}
          resultLabel={`${brand.name}-authorized engineers`}
        />
        
        {/* Provider Listings */}
        <ProviderListings
          providers={providers}
          brand={brand}
          place={place}
          country={country}
        />
        
        {/* Low Provider Count Message */}
        {!isIndexable && providers.length > 0 && (
          <LowProviderCountMessage
            count={providers.length}
            brand={brand}
            place={place}
            country={country}
          />
        )}
        
        {/* Appliance Categories */}
        <ApplianceCategoriesSection
          brand={brand}
          place={place}
          country={country}
          categories={applianceCategories}
        />
        
        {/* Why Authorized */}
        {brand.has_authorised_network && (
          <WhyAuthorizedSection brand={brand} />
        )}
        
        {/* Repair Costs */}
        <RepairCostsSection
          brand={brand}
          place={place}
          stats={stats}
        />
        
        {/* Parts Affiliate */}
        <PartsAffiliateSection
          brandSlug={brand.slug}
          brandName={brand.name}
        />
        
        {/* Cross-Sell Retail */}
        <CrossSellRetailSection
          brandSlug={brand.slug}
          brandName={brand.name}
          citySlug={place.slug}
          countrySlug={country.slug}
        />
        
        {/* Other Brands */}
        <OtherBrandsSection
          brands={otherBrands}
          place={place}
          country={country}
        />
        
        {/* Nearby Cities */}
        <NearbyCitiesSection
          cities={nearbyCities}
          brand={brand}
        />
        
        {/* FAQs */}
        <FAQSection faqs={faqs} />
      </main>
      
      <Footer />
    </>
  );
}

// ISR: Revalidate every hour
export const revalidate = 3600;
```

---

## 9. MOBILE RESPONSIVE DESIGN

### 9.1 Mobile Layout

```
MOBILE LAYOUT (< 768px)
═══════════════════════════════════════════════════════════════

┌────────────────────────────────────┐
│ [LOGO]  [🔍]    [Biz ▼] [Login]   │
├────────────────────────────────────┤
│ < Manchester                       │
├────────────────────────────────────┤
│ [Bosch Logo]                       │
│                                    │
│ BOSCH REPAIR IN                    │
│ MANCHESTER                         │
│ ━━━━━━━━━━━━━━━━━━                │
│                                    │
│ ┌────────────────────────────────┐│
│ │ ✓ MANUFACTURER-AUTHORIZED     ││
│ │ Our engineers are trained...  ││
│ └────────────────────────────────┘│
│                                    │
│ Find 8 Bosch-authorized repair... │
│                                    │
├────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐        │
│ │ 8 Eng.   │ │ 5 Verif. │        │
│ └──────────┘ └──────────┘        │
│ ┌──────────┐ ┌──────────┐        │
│ │ £55 From │ │ ⭐ 4.8   │        │
│ └──────────┘ └──────────┘        │
├────────────────────────────────────┤
│ FILTERS           [Sort: Rating ▼]│
│ [Verified ▼] [Same-day ▼]         │
│ [Appliance ▼]                     │
│                                    │
│ Showing 8 engineers               │
├────────────────────────────────────┤
│ ┌────────────────────────────────┐│
│ │ ★ FEATURED • BOSCH AUTHORIZED ││
│ │                                ││
│ │ ⭐ 4.9 (127)                   ││
│ │ MIDLANDS APPLIANCE REPAIRS    ││
│ │ ━━━━━━━━━━━━━━━━━━            ││
│ │                                ││
│ │ ✓ Bosch Certified             ││
│ │ Certificate: BSH-12345        ││
│ │                                ││
│ │ ⚡ Same-day • 20+ years        ││
│ │ 📍 Manchester, M1             ││
│ │                                ││
│ │ BOSCH APPLIANCES:             ││
│ │ ✓ Washing  ✓ Dishwasher       ││
│ │ ✓ Fridge   ✓ Oven             ││
│ │                                ││
│ │ 💰 £55 • No fix no fee        ││
│ │ ✓ Genuine Bosch parts         ││
│ │                                ││
│ │ [Gas Safe] [Which?] [9.8]     ││
│ │                                ││
│ │ ┌────────────────────────────┐││
│ │ │   📞 CALL: 0121 XXX        │││
│ │ └────────────────────────────┘││
│ │ ┌────────────────────────────┐││
│ │ │    VIEW PROFILE →          │││
│ │ └────────────────────────────┘││
│ └────────────────────────────────┘│
│                                    │
│ [More provider cards...]          │
├────────────────────────────────────┤
│ BOSCH APPLIANCES WE REPAIR        │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐         │
│ │🧺│ │🍽️│ │🧊│ │🔥│         │
│ └───┘ └───┘ └───┘ └───┘         │
│ (scrollable horizontal)           │
├────────────────────────────────────┤
│ ✓ WHY BOSCH-AUTHORIZED?     [▼]  │
│ (accordion - collapsed)           │
├────────────────────────────────────┤
│ 💰 REPAIR COSTS              [▼]  │
│ (accordion - collapsed)           │
├────────────────────────────────────┤
│ 🔧 DIY? ORDER PARTS              │
│ [Shop Bosch Parts →]             │
├────────────────────────────────────┤
│ 🛒 BEYOND REPAIR?                │
│ [Browse Graded Bosch →]          │
├────────────────────────────────────┤
│ OTHER BRANDS                      │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐         │
│ │Sam│ │ LG│ │Hot│ │Sie│         │
│ └───┘ └───┘ └───┘ └───┘         │
│ (scrollable horizontal)           │
├────────────────────────────────────┤
│ BOSCH REPAIR NEARBY              │
│ ┌────────────────────────────────┐│
│ │ Liverpool • 35mi • 5 eng.     ││
│ └────────────────────────────────┘│
│ ┌────────────────────────────────┐│
│ │ Leeds • 40mi • 4 eng.         ││
│ └────────────────────────────────┘│
├────────────────────────────────────┤
│ FAQs                         [▼]  │
│ (accordion)                       │
├────────────────────────────────────┤
│ [FOOTER]                          │
└────────────────────────────────────┘

STICKY CTA (on scroll):
┌────────────────────────────────────┐
│      📞 CALL BOSCH ENGINEER       │
└────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### 9.2 Touch Targets

All interactive elements: **minimum 48px × 48px**

---

## 10. TESTING CHECKLIST

### 10.1 Functional Tests
- [ ] Page loads for all brands with authorized networks
- [ ] Breadcrumbs navigate correctly
- [ ] Provider cards display brand authorization badge
- [ ] Filters work correctly (verified, same-day, appliance)
- [ ] Sort options update listings
- [ ] Appliance category links work
- [ ] Other brands links work
- [ ] Nearby cities links work
- [ ] Parts affiliate links track correctly
- [ ] Cross-sell retail links work
- [ ] Call button works on mobile

### 10.2 SEO Tests
- [ ] H1 unique and keyword-optimized
- [ ] Meta title under 60 chars
- [ ] Meta description under 160 chars
- [ ] Schema.org validates (WebPage, Service, ItemList, FAQPage)
- [ ] Canonical URL correct
- [ ] noindex applied when < 3 providers
- [ ] Redirect works when 0 providers

### 10.3 Performance Tests
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Total page weight < 500KB
- [ ] ISR working (1 hour revalidation)

### 10.4 Mobile Tests
- [ ] Touch targets ≥ 48px
- [ ] No horizontal scroll
- [ ] Filters usable on small screens
- [ ] Call button prominent and functional
- [ ] Accordions work for content sections

---

## 11. INTERNAL LINKING SUMMARY

### 11.1 Links FROM Brand Repair Page

| Section | Links To | Count |
|---------|----------|-------|
| Breadcrumbs | Home, Country, City Hub | 3 |
| Provider Cards | Provider Profiles | ~8 |
| Appliance Categories | Category Repair Pages | ~7 |
| Other Brands | Other Brand Repair Pages | ~6 |
| Nearby Cities | Same Brand Other Cities | ~6 |
| Cross-Sell | Retail Brand Pages | 1 |
| Parts Affiliate | eSpares (external) | 1 |
| Footer | All standard footer links | 250+ |

**Total unique internal link destinations: ~280+**

### 11.2 Links TO Brand Repair Page

| Source | Link Location |
|--------|---------------|
| Repair Category Page | Brand Specialists section |
| City Hub | Repair section brand cards |
| Provider Profile | Authorized Brands badges |
| Other Brand Repair Pages | Other Brands section |
| National Brand Page (Phase 2) | City listings |

---

## 12. CHANGE LOG

| Date | Version | Change |
|------|---------|--------|
| Jan 2026 | v1.0 | Initial specification |

---

**END OF SPECIFICATION 15: BRAND REPAIR PAGE**
