# SPECIFICATION 14: RETAIL CATEGORY PAGE

## UK Graded Appliances Directory
**Version:** 1.1 — LOCKED  
**Status:** ✅ APPROVED
**Last Updated:** January 2026
**Dependencies:** Spec 06 (Store Profile), Spec 07 (City Hub), Spec 08 (Store Card)
**Amendment:** v1.1 adds Data-Driven Narrative System to prevent doorway page penalties

---

## 1. EXECUTIVE SUMMARY

### 1.1 Purpose
The Retail Category Page is a **location + appliance category filtered listing page** that displays all stores selling a specific category of graded appliances within a specific city. This is a core SEO page designed to capture high-intent commercial searches.

### 1.2 URL Pattern
```
/{country}/{city}/{category}/

EXAMPLES:
├── /england/manchester/washing-machines/
├── /england/birmingham/fridge-freezers/
├── /scotland/glasgow/american-fridge-freezers/
├── /wales/cardiff/dishwashers/
└── /england/leeds/tumble-dryers/
```

### 1.3 Target Keywords (From Keyword Research)
This page targets **Pattern 1-6 combinations** from keyword research:

| Pattern | Example Keywords |
|---------|-----------------|
| Intent + Category | "graded washing machines", "ex-display fridge freezers" |
| Category + Location | "washing machines manchester", "fridge freezers birmingham" |
| Intent + Category + Location | "graded washing machines manchester", "ex-display dishwashers leeds" |
| Category + Modifier | "cheap washing machines", "fridge freezers with warranty" |
| Brand + Category + Location | "Bosch washing machines manchester" |
| Full Combination | "graded bosch washing machines manchester with free delivery" |

### 1.4 Key Differentiator from Existing Pattern
The playbook contains a **basic** category page. This specification extends it to be a **full SEO-optimized, filter-enabled, conversion-focused** page that:
- Integrates all keyword buckets into content
- Provides comprehensive filtering (brand, grade, delivery, finance, warranty)
- Includes category-specific buying guide content
- Has complete Schema.org ItemList markup
- Cross-sells to repair services
- Handles anti-thin gating properly
- **Generates unique data-driven narratives per city+category (v1.1)**

---

## 2. DATABASE DEPENDENCIES

### 2.1 Primary Tables Used

```sql
-- Location Context
places (id, name, slug, country_id, store_count, provider_count)
countries (id, name, slug)

-- Category Context  
appliance_categories (
  id, name, name_plural, name_singular, slug, tier,
  seo_title_template, seo_meta_template, h1_template, intro_template,
  repair_seo_title_template, repair_h1_template,
  description, buying_guide, repair_guide, common_issues,
  avg_repair_cost_min, avg_repair_cost_max, avg_lifespan_years,
  supports_repair, min_stores_for_index
)

-- Store Data
stores (
  id, place_id, business_name, slug, phone, website,
  address_line1, postcode, latitude, longitude,
  offers_delivery, offers_free_delivery, free_delivery_threshold,
  offers_next_day_delivery, offers_same_day_delivery,
  offers_installation, offers_free_installation,
  offers_old_appliance_removal,
  warranty_months, warranty_type, offers_extended_warranty,
  offers_finance, offers_zero_percent_finance, finance_providers,
  offers_click_collect,
  grades_stocked, brands_stocked,
  average_rating, review_count,
  overall_score, is_featured, is_verified, status
)

-- Junction Tables
store_categories (store_id, category_id, grades_available, price_min, price_max)
store_brands (store_id, brand_id, has_current_stock)

-- Supporting Data
brands (id, name, slug, tier, popularity_score)
grade_levels (code, name, short_description, typical_discount_percent)
faqs (question, answer, category, applies_to_categories, is_repair_faq)

-- Anti-Thin Gating
page_indexability (
  page_type='place_category', place_id, category_id,
  store_count, is_retail_indexable, is_indexable
)
```

### 2.2 Required Supabase Query

```typescript
// Main data fetch for Retail Category Page
const { data } = await supabase
  .from('stores')
  .select(`
    *,
    places!inner(id, name, slug, countries(name, slug)),
    store_categories!inner(
      category_id,
      grades_available,
      price_min,
      price_max,
      appliance_categories!inner(
        id, name, name_plural, slug, tier,
        seo_title_template, h1_template, intro_template,
        buying_guide, supports_repair, common_issues,
        avg_repair_cost_min, avg_repair_cost_max, avg_lifespan_years
      )
    ),
    store_brands(
      brands(id, name, slug, tier)
    )
  `)
  .eq('places.slug', params.city)
  .eq('store_categories.appliance_categories.slug', params.category)
  .eq('is_active', true)
  .in('status', ['active', 'claimed', 'verified'])
  .order('is_featured', { ascending: false })
  .order('overall_score', { ascending: false })
```

---

## 3. PAGE STRUCTURE

### 3.1 Complete Component Hierarchy

```
RetailCategoryPage
├── <Head> (SEO meta tags)
├── SchemaOrg (ItemList + BreadcrumbList + FAQPage)
├── Breadcrumbs
│   └── Home > {Country} > {City} > {Category}
├── PageHeader
│   ├── H1 (from template: "Graded {Category} in {City}")
│   ├── IntroText (from template + dynamic stats)
│   └── QuickStats (store count, avg discount, delivery options)
├── FilterBar
│   ├── BrandFilter (multi-select from store_brands)
│   ├── GradeFilter (from grade_levels)
│   ├── DeliveryFilter (free delivery, next-day, same-day)
│   ├── FinanceFilter (0% finance, Klarna, Clearpay)
│   ├── WarrantyFilter (6m, 12m, 24m+)
│   ├── PriceRangeFilter (from store_categories.price_min/max)
│   └── SortDropdown (relevance, rating, distance, newest)
├── StoreGrid/List
│   ├── StoreCard × N (from Spec 08)
│   │   └── Enhanced with category-specific badges
│   └── EmptyState (if no stores)
├── ContentSection
│   ├── CategoryBuyingGuide (from appliance_categories.buying_guide)
│   ├── GradeExplanationBlock (from grade_levels)
│   └── CategoryFAQs (from faqs WHERE applies_to_categories)
├── CrossSellSection
│   ├── RepairCTA (if category.supports_repair = true)
│   │   └── Link to /{country}/{city}/{category}-repair/
│   └── NearbyLocations (same category, nearby cities)
├── RelatedCategories
│   └── SubcategoriesLinks (if category has children)
└── Footer
```

### 3.2 Visual Layout (Desktop)

```
┌────────────────────────────────────────────────────────────────────────┐
│ NAVBAR (Standard with Search Bar - Spec 02)                            │
│ [Logo] [Search Bar] [For Business ▼] [Login]                           │
├────────────────────────────────────────────────────────────────────────┤
│ [Breadcrumbs: Home > England > Manchester > Washing Machines]          │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Graded Washing Machines in Manchester                          [H1]  │
│                                                                        │
│  Find 12 stores selling graded washing machines in Manchester.         │
│  Save 30-70% on ex-display and factory seconds. Compare prices,        │
│  warranties, and delivery options.                                     │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │ 📦 12 Stores  │ 💰 Save 30-70%  │ 🚚 8 with Free Delivery │ ✓    │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│ FILTERS                                                                │
│ ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐ ┌─────┐│
│ │ Brand ▼ │ │ Grade ▼ │ │Delivery ▼│ │Finance ▼│ │Warranty ▼│ │Sort▼││
│ └─────────┘ └─────────┘ └──────────┘ └─────────┘ └──────────┘ └─────┘│
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │ ⭐ FEATURED                                                       │ │
│  │ ┌─────────────────────────────────────────────────────────────┐  │ │
│  │ │ [Store Card - ABC Appliances]  ⭐ 4.8 (42 reviews)          │  │ │
│  │ │ 📍 123 High St, M1 2AB  │ 🚚 Free Delivery │ 💳 0% Finance  │  │ │
│  │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │ │
│  │ │ Washing Machines: A-grade, B-grade │ From £199 │ 12m warranty│  │ │
│  │ │ [Bosch] [Samsung] [Hotpoint] +4 more                        │  │ │
│  │ │                                          [View Store →]     │  │ │
│  │ └─────────────────────────────────────────────────────────────┘  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ [Store Card - Graded King]  ⭐ 4.6 (28 reviews)                 │  │
│  │ ...                                                              │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ [Store Card - Manchester Appliances]  ⭐ 4.4 (15 reviews)       │  │
│  │ ...                                                              │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  [Load More] or [Pagination: 1 2 3 ... 5]                             │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ═══════════════════════════════════════════════════════════════════  │
│                                                                        │
│  BUYING GUIDE: GRADED WASHING MACHINES                          [H2]  │
│  ─────────────────────────────────────────────────────────────────────│
│  When buying a graded washing machine, consider these factors:         │
│                                                                        │
│  • Load capacity: 7kg for couples, 9kg+ for families                  │
│  • Spin speed: 1400rpm is standard, 1600rpm for faster drying         │
│  • Energy rating: Look for A or B rated for lower bills               │
│  • Warranty: Most graded units come with 6-12 months coverage         │
│                                                                        │
│  Average savings on graded washing machines: 30-50% off RRP.          │
│  Most common brands: Bosch, Samsung, Hotpoint, Indesit.               │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  UNDERSTANDING GRADES                                           [H2]  │
│  ─────────────────────────────────────────────────────────────────────│
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐            │
│  │   TATTY     │   A-GRADE   │   B-GRADE   │   C-GRADE   │            │
│  │  PACKAGING  │             │             │             │            │
│  ├─────────────┼─────────────┼─────────────┼─────────────┤            │
│  │ Damaged box │ Minor marks │ Visible     │ Significant │            │
│  │ only        │             │ scratches   │ cosmetic    │            │
│  ├─────────────┼─────────────┼─────────────┼─────────────┤            │
│  │ ~20% off    │ ~30% off    │ ~45% off    │ ~60% off    │            │
│  └─────────────┴─────────────┴─────────────┴─────────────┘            │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  🔧 NEED A REPAIR INSTEAD?                                    [CTA]   │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ If your current washing machine needs fixing, we list trusted   │  │
│  │ repair engineers in Manchester. Compare quotes, check reviews.  │  │
│  │                                                                  │  │
│  │ [Find Washing Machine Repair in Manchester →]                   │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  FREQUENTLY ASKED QUESTIONS                                     [H2]  │
│  ─────────────────────────────────────────────────────────────────────│
│  ▸ What does graded mean for washing machines?                        │
│    Graded washing machines are brand-new units that cannot be sold    │
│    as "new" due to minor cosmetic damage or damaged packaging...      │
│                                                                        │
│  ▸ Do graded washing machines come with a warranty?                   │
│    Yes, most graded washing machines come with warranties...          │
│                                                                        │
│  ▸ Can I get a graded washing machine delivered?                      │
│    Yes, 8 of our 12 listed stores offer delivery to Manchester...     │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  BROWSE NEARBY                                                  [H2]  │
│  ─────────────────────────────────────────────────────────────────────│
│  Graded Washing Machines in:                                          │
│  [Salford] [Stockport] [Bolton] [Oldham] [Bury] [Rochdale]           │
│                                                                        │
│  Other Appliances in Manchester:                                      │
│  [Fridge Freezers] [Dishwashers] [Tumble Dryers] [Cookers]           │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. SEO IMPLEMENTATION

### 4.1 Meta Tags Template

```typescript
// Dynamic meta tag generation
function generateMetadata(place: Place, category: Category, storeCount: number) {
  // Primary title - targets "graded {category} {city}"
  const title = category.seo_title_template
    ?.replace('{location}', place.name)
    || `Graded ${category.name} in ${place.name} | UK Graded Appliances`;

  // Description - includes commercial modifiers from Bucket C
  const description = `Compare ${storeCount} stores selling graded ${category.name_plural?.toLowerCase() || category.name.toLowerCase()} in ${place.name}. Save 30-70% on ex-display, factory seconds & B-grade. Free delivery options available.`;

  // Keywords targeting (for internal use / content optimization)
  const targetKeywords = [
    // Pattern 1: Intent + Category
    `graded ${category.name.toLowerCase()}`,
    `ex-display ${category.name.toLowerCase()}`,
    `factory seconds ${category.name.toLowerCase()}`,
    `b-grade ${category.name.toLowerCase()}`,
    
    // Pattern 2: Category + Location
    `${category.name.toLowerCase()} ${place.name.toLowerCase()}`,
    `${category.name.toLowerCase()} in ${place.name.toLowerCase()}`,
    
    // Pattern 3: Intent + Category + Location
    `graded ${category.name.toLowerCase()} ${place.name.toLowerCase()}`,
    `ex-display ${category.name.toLowerCase()} ${place.name.toLowerCase()}`,
    `cheap ${category.name.toLowerCase()} ${place.name.toLowerCase()}`,
    
    // Pattern 4: Category + Modifier
    `${category.name.toLowerCase()} deals`,
    `${category.name.toLowerCase()} offers`,
    `cheap ${category.name.toLowerCase()}`,
    `${category.name.toLowerCase()} with warranty`,
    `${category.name.toLowerCase()} with free delivery`,
    `${category.name.toLowerCase()} 0% finance`,
  ];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: 'UK Graded Appliances',
      url: `https://ukgradedappliances.co.uk/${place.countries?.slug}/${place.slug}/${category.slug}/`
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `https://ukgradedappliances.co.uk/${place.countries?.slug}/${place.slug}/${category.slug}/`
    },
    robots: {
      index: storeCount >= 2, // Anti-thin gating
      follow: true,
    }
  };
}
```

### 4.2 Schema.org Structured Data

```typescript
// Complete Schema.org markup for Retail Category Page
function generateSchemaOrg(
  place: Place, 
  category: Category, 
  stores: Store[],
  faqs: FAQ[]
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/${place.countries?.slug}/${place.slug}/${category.slug}/`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebPage
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Graded ${category.name} in ${place.name}`,
        description: `Compare ${stores.length} stores selling graded ${category.name.toLowerCase()} in ${place.name}.`,
        isPartOf: { '@id': `${baseUrl}/#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#itemlist` },
      },

      // 2. BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: place.countries?.name,
            item: `${baseUrl}/${place.countries?.slug}/`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: place.name,
            item: `${baseUrl}/${place.countries?.slug}/${place.slug}/`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: category.name,
            item: pageUrl
          }
        ]
      },

      // 3. ItemList (stores)
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#itemlist`,
        name: `Graded ${category.name} Stores in ${place.name}`,
        numberOfItems: stores.length,
        itemListElement: stores.map((store, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'LocalBusiness',
            '@id': `${baseUrl}/store/${store.slug}/#business`,
            name: store.business_name,
            url: `${baseUrl}/store/${store.slug}/`,
            telephone: store.phone,
            address: store.address_line1 ? {
              '@type': 'PostalAddress',
              streetAddress: store.address_line1,
              addressLocality: place.name,
              postalCode: store.postcode,
              addressCountry: 'GB'
            } : undefined,
            geo: store.latitude ? {
              '@type': 'GeoCoordinates',
              latitude: store.latitude,
              longitude: store.longitude
            } : undefined,
            aggregateRating: store.average_rating ? {
              '@type': 'AggregateRating',
              ratingValue: store.average_rating,
              reviewCount: store.review_count || 0,
              bestRating: 5,
              worstRating: 1
            } : undefined,
            priceRange: '££',
            makesOffer: {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: `Graded ${category.name}`,
                category: category.name
              }
            }
          }
        }))
      },

      // 4. FAQPage (if FAQs exist)
      ...(faqs.length > 0 ? [{
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }] : []),

      // 5. Service (for repair cross-sell if supported)
      ...(category.supports_repair ? [{
        '@type': 'Service',
        '@id': `${baseUrl}/${place.countries?.slug}/${place.slug}/${category.slug}-repair/#service`,
        name: `${category.name_singular || category.name} Repair in ${place.name}`,
        serviceType: 'Appliance Repair',
        areaServed: {
          '@type': 'City',
          name: place.name
        },
        url: `${baseUrl}/${place.countries?.slug}/${place.slug}/${category.slug}-repair/`
      }] : [])
    ]
  };
}
```

### 4.3 H-Tag Structure

```
<h1>Graded {Category} in {City}</h1>
  │
  ├── <h2>{N} Stores Selling Graded {Category}</h2>
  │     └── Store cards (no h3 in cards - use div/span)
  │
  ├── <h2>Buying Guide: Graded {Category}</h2>
  │     └── Content from appliance_categories.buying_guide
  │
  ├── <h2>Understanding Grades</h2>
  │     └── Grade level explanations
  │
  ├── <h2>Need a Repair Instead?</h2>
  │     └── Cross-sell CTA (if supports_repair)
  │
  ├── <h2>Frequently Asked Questions</h2>
  │     └── <h3>Question text</h3> for each FAQ
  │
  └── <h2>Browse Nearby</h2>
        └── Nearby city links + related categories
```

---

## 5. FILTER SYSTEM

### 5.1 Filter Configuration

```typescript
interface FilterConfig {
  // Brand filter - from store_brands junction
  brands: {
    type: 'multi-select';
    source: 'store_brands.brands';
    displayTiers: boolean; // Group by premium/mid_range/value
    showPopularity: boolean; // Sort by popularity_score
  };

  // Grade filter - from grade_levels
  grades: {
    type: 'multi-select';
    options: ['tatty-packaging', 'A-grade', 'B-grade', 'C-grade'];
    labels: ['Tatty Packaging', 'A-Grade', 'B-Grade', 'C-Grade'];
    showDiscounts: boolean; // Show typical discount %
  };

  // Delivery options - from stores
  delivery: {
    type: 'checkbox-group';
    options: [
      { key: 'offers_delivery', label: 'Offers Delivery' },
      { key: 'offers_free_delivery', label: 'Free Delivery' },
      { key: 'offers_next_day_delivery', label: 'Next Day' },
      { key: 'offers_same_day_delivery', label: 'Same Day' },
    ];
  };

  // Finance options - from stores
  finance: {
    type: 'checkbox-group';
    options: [
      { key: 'offers_finance', label: 'Finance Available' },
      { key: 'offers_zero_percent_finance', label: '0% Interest' },
      { key: 'klarna', label: 'Klarna', checkField: 'finance_providers' },
      { key: 'clearpay', label: 'Clearpay', checkField: 'finance_providers' },
    ];
  };

  // Warranty filter - from stores.warranty_months
  warranty: {
    type: 'single-select';
    options: [
      { min: 0, label: 'Any' },
      { min: 6, label: '6+ months' },
      { min: 12, label: '12+ months' },
      { min: 24, label: '24+ months' },
    ];
  };

  // Price range - from store_categories
  priceRange: {
    type: 'range-slider';
    source: 'store_categories.price_min/price_max';
    step: 50;
    currency: 'GBP';
  };

  // Additional services
  services: {
    type: 'checkbox-group';
    options: [
      { key: 'offers_installation', label: 'Installation' },
      { key: 'offers_free_installation', label: 'Free Installation' },
      { key: 'offers_click_collect', label: 'Click & Collect' },
      { key: 'offers_old_appliance_removal', label: 'Old Appliance Removal' },
    ];
  };

  // Sort options
  sort: {
    type: 'single-select';
    options: [
      { key: 'relevance', label: 'Relevance', field: 'overall_score', desc: true },
      { key: 'rating', label: 'Highest Rated', field: 'average_rating', desc: true },
      { key: 'reviews', label: 'Most Reviewed', field: 'review_count', desc: true },
      { key: 'newest', label: 'Newest', field: 'created_at', desc: true },
    ];
  };
}
```

### 5.2 URL Parameter Mapping

```
Base URL: /{country}/{city}/{category}/

With Filters:
/{country}/{city}/{category}/?brand=bosch,samsung&grade=A-grade,B-grade&delivery=free&finance=0%25&warranty=12&sort=rating

Parameter Mapping:
├── brand      → store_brands.brand_id (via slug lookup)
├── grade      → stores.grades_stocked @> ARRAY[...]
├── delivery   → stores.offers_free_delivery = true
├── finance    → stores.offers_zero_percent_finance = true
├── warranty   → stores.warranty_months >= N
├── price_min  → store_categories.price_min >= N
├── price_max  → store_categories.price_max <= N
├── services   → stores.offers_installation, etc.
└── sort       → ORDER BY field DESC/ASC
```

### 5.3 Filter Implementation

```typescript
// Server-side filter application
async function fetchFilteredStores(
  placeId: string,
  categoryId: string,
  filters: URLSearchParams
) {
  let query = supabase
    .from('stores')
    .select(`
      *,
      store_categories!inner(
        category_id,
        grades_available,
        price_min,
        price_max
      ),
      store_brands(
        brands(id, slug)
      )
    `)
    .eq('place_id', placeId)
    .eq('store_categories.category_id', categoryId)
    .eq('is_active', true)
    .in('status', ['active', 'claimed', 'verified']);

  // Brand filter
  const brandSlugs = filters.get('brand')?.split(',');
  if (brandSlugs?.length) {
    // Filter via store_brands junction
    query = query.in('store_brands.brands.slug', brandSlugs);
  }

  // Grade filter
  const grades = filters.get('grade')?.split(',');
  if (grades?.length) {
    query = query.overlaps('grades_stocked', grades);
  }

  // Delivery filters
  if (filters.get('delivery') === 'free') {
    query = query.eq('offers_free_delivery', true);
  }
  if (filters.get('delivery') === 'next-day') {
    query = query.eq('offers_next_day_delivery', true);
  }

  // Finance filter
  if (filters.get('finance') === '0%') {
    query = query.eq('offers_zero_percent_finance', true);
  }

  // Warranty filter
  const minWarranty = parseInt(filters.get('warranty') || '0');
  if (minWarranty > 0) {
    query = query.gte('warranty_months', minWarranty);
  }

  // Price range (from store_categories)
  const priceMin = parseInt(filters.get('price_min') || '0');
  const priceMax = parseInt(filters.get('price_max') || '999999');
  if (priceMin > 0) {
    query = query.gte('store_categories.price_min', priceMin);
  }
  if (priceMax < 999999) {
    query = query.lte('store_categories.price_max', priceMax);
  }

  // Sorting
  const sort = filters.get('sort') || 'relevance';
  switch (sort) {
    case 'rating':
      query = query.order('average_rating', { ascending: false, nullsFirst: false });
      break;
    case 'reviews':
      query = query.order('review_count', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      // Relevance: featured first, then score
      query = query
        .order('is_featured', { ascending: false })
        .order('overall_score', { ascending: false });
  }

  return query;
}
```

---

## 6. CONTENT SECTIONS

### 6.0 Data-Driven Narrative System (v1.1)

```
DATA-DRIVEN NARRATIVE SYSTEM — RETAIL CATEGORY PAGE
═══════════════════════════════════════════════════════════════

PURPOSE:
─────────────────────────────────────────────────────────────────
├── Prevent "Doorway Page" / "Thin Content" Google penalties
├── Create UNIQUE text for every city + category combination
├── Use live database aggregations for accuracy
├── Replace basic generateIntroText() with data-rich narratives
└── Support AEO (AI Engine Optimization)

WHY THIS MATTERS:
─────────────────────────────────────────────────────────────────
Without data-driven narratives:
• /england/luton/washing-machines/ and 
  /england/dunstable/washing-machines/ may share the same stores
• Nearly identical content = Google "doorway page" penalty
• De-indexation risk for programmatic SEO pages

IMPLEMENTATION:
─────────────────────────────────────────────────────────────────
├── Import: import { getCategoryNarrative } from '@/lib/seo/narratives'
├── Call: const narrative = await getCategoryNarrative(citySlug, categorySlug)
├── Returns: { introParagraph, metaSummary, keyFacts, dataQualityScore }

TEMPLATE VARIATIONS (5 total):
─────────────────────────────────────────────────────────────────
├── Template 1: Store count + price range + top store
├── Template 2: Price comparison + savings emphasis
├── Template 3: Brands + delivery focus
├── Template 4: Full market overview
└── Template 5: Repair cross-sell integration

EXAMPLE OUTPUTS:
─────────────────────────────────────────────────────────────────

Manchester + Washing Machines (Template 1):
"In Manchester, 8 stores stock graded washing machines. Prices 
range from £189 to £599, depending on grade and brand. Manchester 
Graded is the highest-rated with 4.7 stars from 89 reviews. 
Multiple grades available: A-grade, B-grade, and ex-display."

Leeds + Fridge Freezers (Template 2):
"Compare graded fridge freezers from 5 Leeds retailers. Average 
prices are 12% below the national average. Save 30-70% compared 
to buying new. Finance options at 3 stores including 0% interest 
and Klarna."

Birmingham + Dishwashers (Template 5):
"Birmingham has 6 stores selling graded dishwashers. Prices range 
from £149 to £449. 12 repair engineers also available locally if 
repair is more cost-effective."

DATA POINTS AGGREGATED:
─────────────────────────────────────────────────────────────────
├── storeCount:           COUNT stores with this category
├── priceMin:             MIN(store_categories.price_min)
├── priceMax:             MAX(store_categories.price_max)
├── priceAverage:         AVG(store_categories.price_min)
├── nationalAveragePrice: AVG across all cities (for comparison)
├── topRatedStore:        stores ORDER BY average_rating DESC LIMIT 1
├── gradesAvailable:      DISTINCT grades from store_categories
├── topBrands:            Top 3 brands for this category
├── storesWithFreeDelivery: COUNT WHERE offers_free_delivery
├── storesWithFinance:    COUNT WHERE offers_finance
├── repairProviderCount:  COUNT providers for repair cross-sell

INTEGRATION IN PAGE:
─────────────────────────────────────────────────────────────────

// In page.tsx
import { getCategoryNarrative } from '@/lib/seo/narratives';

export default async function RetailCategoryPage({ params }: Props) {
  // ... existing data fetching ...
  
  // Fetch narrative (replaces generateIntroText)
  const narrative = await getCategoryNarrative(params.city, params.category);
  
  return (
    <section className="mb-8">
      <h1>Graded {category.name_plural} in {place.name}</h1>
      
      {/* DATA-DRIVEN NARRATIVE */}
      {narrative?.introParagraph ? (
        <div className="prose prose-lg max-w-none mb-6">
          <p className="text-gray-600 text-lg leading-relaxed">
            {narrative.introParagraph}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 text-lg mb-6">
          {generateIntroText(place, category, stores, stats)}
        </p>
      )}
      
      {/* KEY FACTS PILLS */}
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
          🛒 {stores?.length || 0} stores
        </span>
        {narrative?.keyFacts?.slice(0, 3).map((fact, i) => (
          <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
            {fact}
          </span>
        ))}
      </div>
    </section>
  );
}

META DESCRIPTION USAGE:
─────────────────────────────────────────────────────────────────

const description = narrative?.metaSummary ||
  category.seo_meta_template?.replace('{location}', place.name) ||
  `Compare graded ${category.name_plural.toLowerCase()} from ${stores?.length} retailers in ${place.name}.`;

ANTI-THIN GATING ENHANCEMENT:
─────────────────────────────────────────────────────────────────
Use narrative.dataQualityScore for more nuanced indexability:

if (narrative.dataQualityScore >= 40) {
  // Full index, rich content
  robots: { index: true, follow: true }
} else if (narrative.dataQualityScore >= 20) {
  // Index but thin content warning
  robots: { index: true, follow: true }
} else {
  // Noindex - insufficient data
  robots: { index: false, follow: true }
}

═══════════════════════════════════════════════════════════════
```

### 6.1 Dynamic Intro Text Generator (DEPRECATED — Use Narrative System)

> ⚠️ **DEPRECATED in v1.1**: This basic template function is retained for 
> fallback purposes only. Use `getCategoryNarrative()` from the narrative 
> system (Section 6.0) as the PRIMARY source of intro text. The narrative 
> system provides richer, more unique content that prevents doorway page 
> penalties.

```typescript
// DEPRECATED: Use getCategoryNarrative() instead
// Retained as fallback if narrative system fails
function generateIntroText(
  place: Place,
  category: Category,
  stores: Store[],
  stats: PageStats
): string {
  // Start with category template or generate
  let intro = category.intro_template
    ?.replace('{location}', place.name)
    || `Looking for graded ${category.name_plural?.toLowerCase() || category.name.toLowerCase()} in ${place.name}?`;

  // Add dynamic stats
  intro += ` We list ${stores.length} trusted stores selling ex-display, factory seconds and B-grade ${category.name_plural?.toLowerCase() || category.name.toLowerCase()}.`;

  // Add delivery info if available
  if (stats.storesWithFreeDelivery > 0) {
    intro += ` ${stats.storesWithFreeDelivery} stores offer free delivery to ${place.name}.`;
  }

  // Add finance info if available
  if (stats.storesWithFinance > 0) {
    intro += ` Finance options including 0% interest and Klarna available.`;
  }

  // Add typical discount (from grade_levels)
  intro += ` Save 30-70% on RRP with full warranties.`;

  return intro;
}

// RECOMMENDED v1.1: Use this instead
import { getCategoryNarrative } from '@/lib/seo/narratives';
const narrative = await getCategoryNarrative(citySlug, categorySlug);
const introText = narrative?.introParagraph || generateIntroText(...);
```

### 6.2 Category-Specific FAQ Generation

```typescript
// Fetch and customize FAQs for category + location
async function getCategoryFAQs(
  categoryId: string,
  placeName: string
): Promise<FAQ[]> {
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .or(`applies_to_categories.cs.{${categoryId}},applies_to_categories.is.null`)
    .eq('is_repair_faq', false)
    .eq('is_active', true)
    .order('display_order')
    .limit(6);

  // Customize FAQ answers with location
  return faqs?.map(faq => ({
    ...faq,
    answer: faq.is_location_template
      ? faq.answer.replace('{location}', placeName)
      : faq.answer
  })) || [];
}
```

### 6.3 Grade Explanation Block

```typescript
// Component for grade explanation
function GradeExplanationBlock() {
  return (
    <section>
      <h2>Understanding Appliance Grades</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gradeData.map(grade => (
          <div key={grade.code} className="p-4 border rounded">
            <h3 className="font-bold">{grade.name}</h3>
            <p className="text-sm text-gray-600">{grade.short_description}</p>
            <p className="text-lg font-semibold text-green-600">
              ~{grade.typical_discount_percent}% off
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Grade data from grade_levels table
const gradeData = [
  {
    code: 'tatty-packaging',
    name: 'Tatty Packaging',
    short_description: 'New with damaged packaging only',
    typical_discount_percent: 20
  },
  {
    code: 'A-grade',
    name: 'A-Grade',
    short_description: 'Minor marks, essentially new',
    typical_discount_percent: 30
  },
  {
    code: 'B-grade',
    name: 'B-Grade',
    short_description: 'Visible marks on front/sides',
    typical_discount_percent: 45
  },
  {
    code: 'C-grade',
    name: 'C-Grade',
    short_description: 'More significant cosmetic damage',
    typical_discount_percent: 60
  }
];
```

---

## 7. ANTI-THIN PAGE GATING (Enhanced v1.1)

### 7.1 Indexability Rules

```typescript
// Check if page should be indexed (Enhanced v1.1)
async function checkPageIndexability(
  placeId: string,
  categoryId: string,
  narrative?: NarrativeResult | null  // v1.1: Include narrative
): Promise<{ 
  isIndexable: boolean; 
  storeCount: number;
  dataQualityScore?: number;  // v1.1
}> {
  // Option 1: Check page_indexability table (pre-computed)
  const { data: indexData } = await supabase
    .from('page_indexability')
    .select('store_count, is_retail_indexable')
    .eq('page_type', 'place_category')
    .eq('place_id', placeId)
    .eq('category_id', categoryId)
    .single();

  if (indexData) {
    return {
      isIndexable: indexData.is_retail_indexable,
      storeCount: indexData.store_count,
      dataQualityScore: narrative?.dataQualityScore  // v1.1
    };
  }

  // Option 2: Compute on-the-fly
  const { count } = await supabase
    .from('store_categories')
    .select('store_id', { count: 'exact', head: true })
    .eq('category_id', categoryId)
    .eq('stores.place_id', placeId)
    .eq('stores.is_active', true);

  const minRequired = 2; // From appliance_categories.min_stores_for_index

  // v1.1: Enhanced indexability using dataQualityScore
  const storeBasedIndexable = (count || 0) >= minRequired;
  const qualityBasedIndexable = (narrative?.dataQualityScore || 0) >= 20;

  return {
    isIndexable: storeBasedIndexable || qualityBasedIndexable,
    storeCount: count || 0,
    dataQualityScore: narrative?.dataQualityScore  // v1.1
  };
}

// v1.1: Enhanced indexability decision matrix
/*
┌─────────────────────┬──────────────────┬────────────────────┐
│ Store Count         │ Data Quality     │ Action             │
├─────────────────────┼──────────────────┼────────────────────┤
│ 0 stores            │ Any              │ noindex + fallback │
│ 1 store             │ < 20             │ noindex            │
│ 1 store             │ >= 20            │ index (narrative)  │
│ 2+ stores           │ < 40             │ index (basic)      │
│ 2+ stores           │ >= 40            │ index (rich)       │
└─────────────────────┴──────────────────┴────────────────────┘
*/
```

### 7.2 Thin Page Handling

```typescript
// In page component
export default async function RetailCategoryPage({ params }: Props) {
  const { isIndexable, storeCount } = await checkPageIndexability(
    place.id,
    category.id
  );

  return (
    <>
      {/* Conditional noindex for thin pages */}
      {!isIndexable && (
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
      )}

      {/* Show page but with helpful message if thin */}
      {storeCount === 0 && (
        <EmptyStateWithAlternatives
          category={category}
          place={place}
          nearbyCities={nearbyCities}
        />
      )}

      {storeCount === 1 && (
        <SingleStoreWithSuggestions
          store={stores[0]}
          category={category}
          place={place}
        />
      )}

      {storeCount >= 2 && (
        <FullStoreListing stores={stores} />
      )}
    </>
  );
}
```

### 7.3 Empty State Component

```typescript
function EmptyStateWithAlternatives({
  category,
  place,
  nearbyCities
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        No stores currently listing graded {category.name.toLowerCase()} in {place.name}
      </h2>
      
      <div className="space-y-6">
        {/* Email alert CTA */}
        <div>
          <p className="text-gray-600 mb-3">
            Want to be notified when stores list {category.name.toLowerCase()} here?
          </p>
          <EmailAlertSignup
            categoryId={category.id}
            placeId={place.id}
          />
        </div>

        {/* Nearby alternatives */}
        {nearbyCities.length > 0 && (
          <div>
            <p className="text-gray-600 mb-3">
              Try nearby areas:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {nearbyCities.map(city => (
                <Link
                  key={city.id}
                  href={`/${place.countries?.slug}/${city.slug}/${category.slug}/`}
                  className="px-4 py-2 bg-white border rounded hover:bg-blue-50"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All stores in city */}
        <div>
          <Link
            href={`/${place.countries?.slug}/${place.slug}/`}
            className="text-blue-600 hover:underline"
          >
            ← View all graded appliance stores in {place.name}
          </Link>
        </div>

        {/* Repair alternative */}
        {category.supports_repair && (
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <p className="text-gray-600 mb-2">
              Need your current {category.name_singular?.toLowerCase()} repaired?
            </p>
            <Link
              href={`/${place.countries?.slug}/${place.slug}/${category.slug}-repair/`}
              className="text-blue-600 font-medium hover:underline"
            >
              Find {category.name_singular} repair in {place.name} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 8. CROSS-LINKING STRATEGY

### 8.1 Internal Links Map

```
RETAIL CATEGORY PAGE LINKS TO:
├── Breadcrumbs
│   ├── Home (/)
│   ├── Country (/{country}/)
│   └── City Hub (/{country}/{city}/)
│
├── Store Cards
│   └── Store Profile (/store/{slug}/)
│
├── Filters (when applied)
│   └── Same page with query params
│
├── Related Categories
│   ├── Subcategories (/{country}/{city}/{subcategory}/)
│   └── Parent category (/{country}/{city}/{parent}/)
│
├── Nearby Cities
│   └── Same category in nearby city (/{country}/{nearby-city}/{category}/)
│
├── Repair Cross-Sell
│   └── Repair service page (/{country}/{city}/{category}-repair/)
│
├── Other Categories in City
│   └── Different category (/{country}/{city}/{other-category}/)
│
└── National Category (optional)
    └── /{category}/ (national page)

PAGES THAT LINK TO RETAIL CATEGORY PAGE:
├── City Hub (/{country}/{city}/)
│   └── "Browse by Appliance" section
├── Country Page (/{country}/)
│   └── Featured categories
├── Home Page (/)
│   └── Popular categories
├── Store Profile (/store/{slug}/)
│   └── "Appliances Stocked" links
├── Repair Service Page
│   └── "Buy a Replacement" cross-sell
└── National Category (/{category}/)
    └── City-specific links
```

### 8.2 Contextual Link Implementation

```typescript
// Related categories section
function RelatedCategoriesSection({
  category,
  place,
  countrySlug
}: RelatedCategoriesProps) {
  // Get subcategories
  const { data: subcategories } = await supabase
    .from('appliance_categories')
    .select('id, name, slug')
    .eq('parent_id', category.id)
    .eq('is_active', true)
    .order('display_order');

  // Get sibling categories (same tier, different category)
  const { data: siblings } = await supabase
    .from('appliance_categories')
    .select('id, name, slug, icon')
    .eq('tier', category.tier)
    .neq('id', category.id)
    .is('parent_id', null)
    .eq('is_active', true)
    .order('display_order')
    .limit(6);

  return (
    <section>
      {subcategories?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">
            Browse {category.name} by Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {subcategories.map(sub => (
              <Link
                key={sub.id}
                href={`/${countrySlug}/${place.slug}/${sub.slug}/`}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-3">
          Other Appliances in {place.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          {siblings.map(cat => (
            <Link
              key={cat.id}
              href={`/${countrySlug}/${place.slug}/${cat.slug}/`}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 9. MOBILE RESPONSIVENESS

### 9.1 Mobile Layout

```
MOBILE (< 768px)
┌────────────────────────────────┐
│ < Home > England > Manchester  │  ← Horizontal scroll
├────────────────────────────────┤
│                                │
│ Graded Washing Machines        │
│ in Manchester                  │
│                                │
│ 12 stores • Save 30-70%       │
│                                │
├────────────────────────────────┤
│ [Filters ▼]  [Sort ▼]          │  ← Sticky on scroll
├────────────────────────────────┤
│ ┌────────────────────────────┐ │
│ │ ABC Appliances   ⭐ 4.8    │ │
│ │ 📍 M1 2AB                  │ │
│ │ 🚚 Free Delivery           │ │
│ │ [Bosch][Samsung]+4         │ │
│ │          [View →]          │ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ Graded King      ⭐ 4.6    │ │
│ │ ...                        │ │
│ └────────────────────────────┘ │
│                                │
│        [Load More]             │
│                                │
├────────────────────────────────┤
│ ━━━━━ Buying Guide ━━━━━━━━━━ │
│ [Expandable accordion]         │
├────────────────────────────────┤
│ ━━━━━ Grades Explained ━━━━━━ │
│ [Horizontal scroll cards]      │
├────────────────────────────────┤
│ ┌────────────────────────────┐ │
│ │ 🔧 Need a Repair?          │ │
│ │ [Find Repair Engineers →]  │ │
│ └────────────────────────────┘ │
├────────────────────────────────┤
│ ━━━━━━━━ FAQs ━━━━━━━━━━━━━━ │
│ ▸ What does graded mean?      │
│ ▸ Do they have warranty?      │
│ ▸ Can I get delivery?         │
├────────────────────────────────┤
│ Nearby: [Salford][Bolton]...  │
└────────────────────────────────┘
```

### 9.2 Mobile Filter Sheet

```typescript
// Mobile filter implementation using sheet/drawer
function MobileFilterSheet({
  isOpen,
  onClose,
  filters,
  onApply
}: MobileFilterProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filter Stores</SheetTitle>
        </SheetHeader>
        
        <div className="overflow-y-auto py-4">
          {/* Brand filter with checkboxes */}
          <FilterSection title="Brand">
            {brands.map(brand => (
              <Checkbox
                key={brand.id}
                label={brand.name}
                checked={filters.brands.includes(brand.slug)}
                onChange={(checked) => toggleBrand(brand.slug, checked)}
              />
            ))}
          </FilterSection>

          {/* Grade filter */}
          <FilterSection title="Grade">
            {grades.map(grade => (
              <Checkbox
                key={grade.code}
                label={`${grade.name} (~${grade.discount}% off)`}
                checked={filters.grades.includes(grade.code)}
                onChange={(checked) => toggleGrade(grade.code, checked)}
              />
            ))}
          </FilterSection>

          {/* Delivery options */}
          <FilterSection title="Delivery">
            <Checkbox label="Free Delivery" ... />
            <Checkbox label="Next Day" ... />
            <Checkbox label="Same Day" ... />
          </FilterSection>

          {/* Finance options */}
          <FilterSection title="Finance">
            <Checkbox label="0% Interest" ... />
            <Checkbox label="Klarna" ... />
            <Checkbox label="Clearpay" ... />
          </FilterSection>

          {/* Warranty */}
          <FilterSection title="Minimum Warranty">
            <RadioGroup value={filters.warranty} onValueChange={setWarranty}>
              <Radio value="0" label="Any" />
              <Radio value="6" label="6+ months" />
              <Radio value="12" label="12+ months" />
              <Radio value="24" label="24+ months" />
            </RadioGroup>
          </FilterSection>
        </div>

        <SheetFooter className="sticky bottom-0 bg-white border-t p-4">
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
          <Button onClick={() => { onApply(filters); onClose(); }}>
            Show {filteredCount} Stores
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

---

## 10. ANALYTICS & TRACKING

### 10.1 Event Tracking

```typescript
// Track key events for this page type
const trackingEvents = {
  // Page view (automatic)
  pageView: {
    event: 'page_view',
    page_type: 'retail_category',
    place_id: place.id,
    category_id: category.id,
    store_count: stores.length,
  },

  // Filter usage
  filterApplied: {
    event: 'filter_applied',
    filter_type: 'brand' | 'grade' | 'delivery' | 'finance' | 'warranty',
    filter_value: string[],
    results_count: number,
  },

  // Store card click
  storeCardClick: {
    event: 'store_card_click',
    store_id: store.id,
    position: index,
    source_page: 'retail_category',
    category_id: category.id,
  },

  // Repair CTA click
  repairCtaClick: {
    event: 'repair_cta_click',
    source_category: category.slug,
    source_place: place.slug,
  },

  // Email alert signup
  alertSignup: {
    event: 'deal_alert_signup',
    category_id: category.id,
    place_id: place.id,
    source_page: 'retail_category_empty_state',
  },
};

// Log to click_events table
async function logClickEvent(eventData: ClickEventData) {
  await supabase.from('click_events').insert({
    event_type: eventData.event_type,
    subject_type: eventData.subject_type,
    subject_id: eventData.subject_id,
    place_id: eventData.place_id,
    appliance_category_id: eventData.category_id,
    page_path: eventData.page_path,
    page_type: 'retail_category',
    session_id: getSessionId(),
  });
}
```

### 10.2 User Intent Tracking

```typescript
// Track user intent for monetization insights
async function trackUserIntent(
  intentType: IntentType,
  context: IntentContext
) {
  await supabase.from('user_intents').insert({
    intent_type: intentType, // 'compare', 'ready_to_buy', 'need_delivery', 'need_finance'
    place_id: context.placeId,
    category_id: context.categoryId,
    page_url: window.location.href,
    referrer: document.referrer,
    metadata: {
      filters_used: context.activeFilters,
      stores_viewed: context.viewedStoreIds,
      time_on_page: context.timeOnPage,
    },
  });
}

// Infer intent from behavior
function inferUserIntent(behavior: UserBehavior): IntentType {
  if (behavior.clickedFinanceFilter) return 'need_finance';
  if (behavior.clickedDeliveryFilter) return 'need_delivery';
  if (behavior.viewedMultipleStores) return 'compare';
  if (behavior.clickedPhone || behavior.clickedWebsite) return 'ready_to_buy';
  return 'browse';
}
```

---

## 11. PERFORMANCE OPTIMIZATION

### 11.1 Static Generation Strategy

```typescript
// Generate static params for high-priority combinations
export async function generateStaticParams() {
  const supabase = createClient();

  // Get all places with active stores
  const { data: places } = await supabase
    .from('places')
    .select('slug, country_id, countries(slug)')
    .eq('is_active', true)
    .gt('store_count', 0);

  // Get tier 1 and tier 2 categories (high priority)
  const { data: categories } = await supabase
    .from('appliance_categories')
    .select('slug')
    .in('tier', ['tier_1', 'tier_2'])
    .is('parent_id', null)
    .eq('is_active', true);

  // Generate combinations
  const params: Params[] = [];
  
  for (const place of places || []) {
    for (const category of categories || []) {
      params.push({
        country: place.countries?.slug,
        city: place.slug,
        category: category.slug,
      });
    }
  }

  return params;
}

// ISR configuration
export const revalidate = 3600; // 1 hour for category pages

// For high-traffic pages, can reduce to 600 (10 min)
export const dynamicParams = true; // Allow on-demand generation
```

### 11.2 Data Fetching Optimization

```typescript
// Parallel data fetching
async function fetchPageData(params: Params) {
  const supabase = createClient();

  // Parallel fetch all required data
  const [
    placeResult,
    categoryResult,
    storesResult,
    faqsResult,
    gradesResult,
    nearbyCitiesResult,
  ] = await Promise.all([
    // Place data
    supabase
      .from('places')
      .select('*, countries(name, slug)')
      .eq('slug', params.city)
      .single(),

    // Category data
    supabase
      .from('appliance_categories')
      .select('*')
      .eq('slug', params.category)
      .single(),

    // Stores (main query)
    supabase
      .from('stores')
      .select(`
        *,
        store_categories!inner(category_id, grades_available, price_min, price_max),
        store_brands(brands(id, name, slug))
      `)
      .eq('store_categories.appliance_categories.slug', params.category)
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('overall_score', { ascending: false }),

    // FAQs
    supabase
      .from('faqs')
      .select('*')
      .eq('is_repair_faq', false)
      .eq('is_active', true)
      .order('display_order')
      .limit(6),

    // Grades
    supabase
      .from('grade_levels')
      .select('*')
      .eq('is_active', true)
      .order('display_order'),

    // Nearby cities
    supabase
      .from('places')
      .select('id, name, slug')
      .eq('admin_area_id', params.adminAreaId)
      .neq('slug', params.city)
      .eq('is_active', true)
      .limit(6),
  ]);

  return {
    place: placeResult.data,
    category: categoryResult.data,
    stores: storesResult.data,
    faqs: faqsResult.data,
    grades: gradesResult.data,
    nearbyCities: nearbyCitiesResult.data,
  };
}
```

---

## 12. COMPLETE PAGE COMPONENT

```typescript
// app/[country]/[city]/[category]/page.tsx

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StoreCard from '@/components/store/StoreCard'
import SchemaOrg from '@/components/seo/SchemaOrg'
import FilterBar from '@/components/filters/FilterBar'
import GradeExplanationBlock from '@/components/content/GradeExplanationBlock'
import CategoryBuyingGuide from '@/components/content/CategoryBuyingGuide'
import FAQSection from '@/components/content/FAQSection'
import RepairCrossell from '@/components/cta/RepairCrossSell'
import NearbyLocations from '@/components/navigation/NearbyLocations'
import RelatedCategories from '@/components/navigation/RelatedCategories'
import EmptyState from '@/components/states/EmptyState'

type Props = {
  params: { country: string; city: string; category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ... metadata generation as shown in Section 4.1
}

export default async function RetailCategoryPage({ params, searchParams }: Props) {
  const supabase = createClient()

  // Fetch all page data in parallel
  const pageData = await fetchPageData(params);
  
  const { place, category, stores, faqs, grades, nearbyCities } = pageData;

  // Validate data
  if (!place || !category) notFound();
  if (place.countries?.slug !== params.country) notFound();

  // Apply filters from searchParams
  const filteredStores = applyFilters(stores, searchParams);

  // Check indexability
  const isIndexable = filteredStores.length >= 2;

  // Calculate page stats
  const stats = calculatePageStats(filteredStores);

  // Generate schema
  const schemaData = generateSchemaOrg(place, category, filteredStores, faqs);

  // Generate dynamic content
  const introText = generateIntroText(place, category, filteredStores, stats);
  const h1 = category.h1_template?.replace('{location}', place.name)
    || `Graded ${category.name} in ${place.name}`;

  return (
    <>
      {/* Conditional noindex */}
      {!isIndexable && (
        <head>
          <meta name="robots" content="noindex, follow" />
        </head>
      )}

      <SchemaOrg data={schemaData} />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: place.countries?.name, href: `/${params.country}` },
          { label: place.name, href: `/${params.country}/${params.city}` },
          { label: category.name }
        ]} />

        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{h1}</h1>
          <p className="text-gray-600 mb-6">{introText}</p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1">
              📦 {filteredStores.length} Stores
            </span>
            <span className="flex items-center gap-1">
              💰 Save 30-70%
            </span>
            {stats.storesWithFreeDelivery > 0 && (
              <span className="flex items-center gap-1">
                🚚 {stats.storesWithFreeDelivery} with Free Delivery
              </span>
            )}
            {stats.storesWithFinance > 0 && (
              <span className="flex items-center gap-1">
                💳 {stats.storesWithFinance} with Finance
              </span>
            )}
          </div>
        </header>

        {/* Filter Bar */}
        <FilterBar
          stores={stores}
          activeFilters={searchParams}
          categoryId={category.id}
          placeId={place.id}
        />

        {/* Store Listing */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            {filteredStores.length} Stores Selling Graded {category.name}
          </h2>

          {filteredStores.length > 0 ? (
            <div className="grid gap-4">
              {filteredStores.map((store, index) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  categoryContext={category}
                  position={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              category={category}
              place={place}
              nearbyCities={nearbyCities}
            />
          )}
        </section>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Buying Guide */}
          {category.buying_guide && (
            <CategoryBuyingGuide
              categoryName={category.name}
              content={category.buying_guide}
            />
          )}

          {/* Grade Explanation */}
          <GradeExplanationBlock grades={grades} />

          {/* Repair Cross-Sell */}
          {category.supports_repair && (
            <RepairCrossSell
              category={category}
              place={place}
              countrySlug={params.country}
            />
          )}

          {/* FAQs */}
          {faqs.length > 0 && (
            <FAQSection
              faqs={faqs}
              categoryName={category.name}
              placeName={place.name}
            />
          )}

          {/* Nearby & Related */}
          <NearbyLocations
            currentPlace={place}
            categorySlug={category.slug}
            nearbyCities={nearbyCities}
          />

          <RelatedCategories
            currentCategory={category}
            place={place}
            countrySlug={params.country}
          />
        </div>
      </div>
    </>
  );
}

export const revalidate = 3600; // 1 hour ISR
```

---

## 13. TESTING CHECKLIST

### 13.1 Functional Tests
- [ ] Page loads correctly with valid country/city/category
- [ ] 404 returned for invalid combinations
- [ ] Filters update URL without page reload
- [ ] All filter combinations work correctly
- [ ] Sort options change store order correctly
- [ ] Store cards link to correct store profiles
- [ ] Breadcrumbs navigate correctly
- [ ] Repair cross-sell only shows when category.supports_repair = true
- [ ] Empty state shows correct alternatives
- [ ] Mobile filter sheet opens/closes correctly

### 13.2 SEO Tests
- [ ] Meta title follows template and includes location
- [ ] Meta description includes store count and modifiers
- [ ] Meta description uses narrative.metaSummary when available (v1.1)
- [ ] H1 is unique and keyword-optimized
- [ ] H-tag hierarchy is correct (h1 > h2 > h3)
- [ ] Schema.org validates without errors
- [ ] Canonical URL is correct
- [ ] noindex applied when store_count < 2 AND dataQualityScore < 20 (v1.1)
- [ ] Internal links use correct href format
- [ ] Images have alt text

### 13.3 Performance Tests
- [ ] Page loads under 3s on 3G
- [ ] LCP under 2.5s
- [ ] CLS under 0.1
- [ ] FID under 100ms
- [ ] All images lazy-loaded except above-fold
- [ ] Critical CSS inlined
- [ ] JS bundle size reasonable

### 13.4 Accessibility Tests
- [ ] All interactive elements keyboard accessible
- [ ] ARIA labels on filter controls
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader can navigate filters
- [ ] Focus visible on all interactive elements

### 13.5 Narrative System Tests (v1.1)
- [ ] Narrative generates for city+category combinations with stores
- [ ] Narrative generates for city+category with zero stores (fallback)
- [ ] generateIntroText() fallback works when narrative is null
- [ ] Different template selected for different city+category combinations
- [ ] Key facts pills render correctly below narrative
- [ ] narrative.metaSummary used in meta description
- [ ] National price comparison accurate
- [ ] Repair cross-sell uses narrative.repairProviderCount
- [ ] dataQualityScore correctly influences indexability

### 13.6 Security Tests
- [ ] Cannot access draft stores via direct URL (returns 404)
- [ ] Cannot modify store data without ownership
- [ ] Click events are rate-limited (max 60/minute per session)
- [ ] Store slugs cannot collide with category/brand slugs
- [ ] Claim flow requires authentication
- [ ] Claim approval is atomic (no race conditions)
- [ ] Filter parameters are sanitized (no SQL injection via URL)
- [ ] XSS prevention in store names/descriptions

### 13.7 Error Handling Tests
- [ ] Network timeout shows retry UI after 5 seconds
- [ ] Supabase 429 rate limit shows friendly "slow down" message
- [ ] Empty results show alternative suggestions (nearby cities, broader category)
- [ ] Partial data load shows available sections + error indicator for failed sections
- [ ] Invalid filter combinations gracefully reset to defaults
- [ ] Browser back/forward maintains filter state correctly
- [ ] Deep links with invalid parameters show helpful error, not crash
- [ ] Offline state detected and communicated to user

---

## 14. DEPLOYMENT NOTES

### 14.1 Required Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_SITE_URL=https://ukgradedappliances.co.uk
```

### 14.2 Database Indexes Required
```sql
-- Ensure these indexes exist for performance
CREATE INDEX IF NOT EXISTS idx_store_categories_category ON store_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_stores_place_active ON stores(place_id, is_active);
CREATE INDEX IF NOT EXISTS idx_stores_overall_score ON stores(overall_score DESC);
CREATE INDEX IF NOT EXISTS idx_page_indexability_place_cat ON page_indexability(place_id, category_id);
```

### 14.3 Cache Strategy
- ISR: 1 hour for category pages
- Client-side: Filter results cached in memory
- API: Supabase connection pooling enabled

---

## 15. FUTURE ENHANCEMENTS (Post-MVP)

1. **Map View** - Toggle between list and map view of stores
2. **Compare Mode** - Select up to 3 stores to compare side-by-side
3. **Price Alerts** - Notify when stores update prices for category
4. **Stock Notifications** - Alert when new stock arrives
5. **Verified Stock Badges** - Real-time stock verification
6. **User Reviews on Page** - Aggregate reviews for stores with this category
7. **Seasonal Banners** - Black Friday, January Sale promotions
8. **Brand Filtering from URL** - /{country}/{city}/{category}/{brand}/

---

**END OF SPECIFICATION**

═══════════════════════════════════════════════════════════════
Document Status: ✅ LOCKED
Version: 1.1
Amendment: Data-Driven Narrative System added; generateIntroText deprecated
Approved: January 2026
═══════════════════════════════════════════════════════════════

---

## APPENDIX: KEYWORD INTEGRATION MATRIX

| Page Element | Keyword Buckets Used | Example |
|--------------|---------------------|---------|
| Title | A + B + Location | "Graded Washing Machines in Manchester" |
| H1 | A + B + Location | "Graded Washing Machines in Manchester" |
| Intro | A + B + C + Location | "Find 12 stores selling graded, ex-display and factory seconds washing machines in Manchester. Save 30-70%..." |
| Filter labels | C | "Free Delivery", "0% Finance", "12m Warranty" |
| Store badges | A + C | "B-Grade Available", "Klarna Accepted" |
| Buying guide | B | "When buying a graded washing machine..." |
| FAQs | A + B | "What does graded mean for washing machines?" |
| Nearby links | B + Location | "Graded Washing Machines in Salford" |
| Repair CTA | B + Location | "Washing Machine Repair in Manchester" |
| Schema | A + B + D + Location | ItemList with LocalBusiness entries |

This ensures all four keyword buckets are naturally integrated without keyword stuffing, targeting the full range of search queries from the keyword research document.
