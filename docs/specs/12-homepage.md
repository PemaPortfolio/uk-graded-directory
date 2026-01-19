# SPECIFICATION 12: HOMEPAGE

## UK Graded Appliances Directory
**Version:** 1.0 — LOCKED  
**Status:** ✅ APPROVED
**Last Updated:** January 2026
**Dependencies:** Spec 01 (Logo), Spec 02 (Search Bar), Spec 03 (Business/Claim), Spec 04 (Auth), Spec 05 (Footer)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Purpose
The Homepage is the primary landing page and entry point to the UK Graded Appliances Directory. It serves three critical functions:
1. **Capture intent** — Get users to search or browse immediately
2. **Educate newcomers** — Explain what graded appliances are
3. **Distribute link equity** — Internal links to cities, categories, countries

### 1.2 URL
```
https://ukgradedappliances.co.uk/
```

### 1.3 Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Navbar search** | Hidden on homepage | Avoid duplication; hero search is primary CTA |
| **Hero background** | Subtle CSS gradient | Fast load time; no image weight |
| **Stats bar** | Yes | Social proof; builds trust and authority |
| **Dual CTA** | Buy + Repair buttons | Serves both user intents equally |
| **FAQ section** | Yes | SEO/AEO value; featured snippet potential |
| **Hero image** | None | Performance > aesthetics |

### 1.4 Target Keywords

| Priority | Keywords |
|----------|----------|
| Primary | graded appliances UK, graded appliances near me |
| Secondary | ex-display appliances, factory seconds UK, B-grade appliances |
| Long-tail | buy graded washing machine, find appliance repair near me |
| Brand | graded Bosch, graded Samsung UK |

---

## 2. CONDITIONAL NAVBAR BEHAVIOR

### 2.1 Rule

```typescript
// The search bar in the navbar (Spec 02) is HIDDEN on homepage
// It appears on ALL other pages

const Header = () => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <header className="...">
      <Logo />                              {/* Always visible */}
      {!isHomepage && <SearchBar />}        {/* Hidden on homepage */}
      <ForBusinessDropdown />               {/* Always visible */}
      <LoginButton />                       {/* Always visible */}
    </header>
  );
};
```

### 2.2 Navbar States

| Page | Logo | Search | For Business | Login |
|------|------|--------|--------------|-------|
| Homepage (`/`) | ✅ | ❌ | ✅ | ✅ |
| City Hub (`/england/manchester/`) | ✅ | ✅ | ✅ | ✅ |
| Category Page (`/england/manchester/washing-machines/`) | ✅ | ✅ | ✅ | ✅ |
| Store Profile (`/store/abc/`) | ✅ | ✅ | ✅ | ✅ |
| Provider Profile (`/provider/xyz/`) | ✅ | ✅ | ✅ | ✅ |
| All other pages | ✅ | ✅ | ✅ | ✅ |

### 2.3 Visual Comparison

```
HOMEPAGE NAVBAR:
┌─────────────────────────────────────────────────────────────────────────────┐
│  [LOGO]                                         For Business ▼    Log in   │
└─────────────────────────────────────────────────────────────────────────────┘

OTHER PAGES NAVBAR:
┌─────────────────────────────────────────────────────────────────────────────┐
│  [LOGO]    [🔍 Search appliances, stores, repairs...]   For Business ▼  Login │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. PAGE STRUCTURE

### 3.1 Section Overview

```
HOMEPAGE STRUCTURE
├── Section 1: Navbar (Spec 04 variant - no search)
├── Section 2: Hero (H1 + Search + Trust + Dual CTA)
├── Section 3: Stats Bar (Social proof)
├── Section 4: Popular Cities (Internal links)
├── Section 5: Browse by Appliance (Category grid)
├── Section 6: Why Buy Graded (Education/Trust)
├── Section 7: Browse by Country (UK geography)
├── Section 8: FAQ (SEO/AEO)
└── Section 9: Footer (Spec 05)
```

### 3.2 Complete Page Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SECTION 1: NAVBAR                                                           │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  [LOGO]                                       For Business ▼    Log in  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 2: HERO (Secondary Gradient Background)                                  │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                         │ │
│ │              Find Graded Appliances & Repairs Near You                 │ │
│ │              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                 │ │
│ │                                                                         │ │
│ │         The UK's largest directory for ex-display, B-grade and         │ │
│ │         factory seconds. Save 30-70% from trusted retailers.           │ │
│ │                                                                         │ │
│ │      ┌───────────────────────────────────────────────────────────┐     │ │
│ │      │ 🔍  Enter your city or postcode (e.g., Manchester, SW1A) │     │ │
│ │      │                                                           │     │ │
│ │      │                                    [Search Nearby →] 🔴   │     │ │
│ │      └───────────────────────────────────────────────────────────┘     │ │
│ │                                                                         │ │
│ │          ✓ Verified Retailers   ✓ Real Warranties   ✓ UK-Wide         │ │
│ │                                                                         │ │
│ │                  [🏪 Buy Graded]      [🔧 Find Repair]                 │ │
│ │                                                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 3: STATS BAR                                                        │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │      1,200+              500+               4                27+        │ │
│ │      Stores           Locations         Countries          Brands      │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 4: POPULAR CITIES                                                   │
│                                                                             │
│   Graded Appliance Stores Near You                        [View all →]     │
│                                                                             │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│   │ London  │ │Manchest-│ │Birming- │ │ Leeds   │ │ Glasgow │ │Liverpool│ │
│   │ 42 stores│ │28 stores│ │24 stores│ │18 stores│ │12 stores│ │15 stores│ │
│   │ 12 repair│ │8 repair │ │6 repair │ │5 repair │ │4 repair │ │6 repair │ │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 5: BROWSE BY APPLIANCE                                              │
│                                                                             │
│   Browse by Appliance Type                                [View all →]     │
│                                                                             │
│   ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐  │
│   │  🧺   │ │  🧊   │ │  🇺🇸   │ │  🍽️   │ │  🌀   │ │  📺   │ │  🔥   │  │
│   │Washing│ │Fridge │ │American│ │ Dish- │ │Tumble │ │  TVs  │ │ Ovens │  │
│   └───────┘ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 6: WHY BUY GRADED                                                   │
│                                                                             │
│   Why Buy Graded Appliances?                                               │
│                                                                             │
│   ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐             │
│   │ 💰 Save 30-70%  │ │ ✓ Full Warranty │ │ 🚚 Free Delivery│             │
│   │ Ex-display at   │ │ 6-24 months     │ │ Most stores     │             │
│   │ fraction of RRP │ │ included        │ │ over £300       │             │
│   └─────────────────┘ └─────────────────┘ └─────────────────┘             │
│                                                                             │
│   ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐             │
│   │ 🔧 Repair Too   │ │ ⭐ Verified     │ │ 📍 UK-Wide      │             │
│   │ Compare local   │ │ Real reviews    │ │ 500+ locations  │             │
│   │ engineers       │ │ from customers  │ │ covered         │             │
│   └─────────────────┘ └─────────────────┘ └─────────────────┘             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 7: BROWSE BY COUNTRY                                                │
│                                                                             │
│   Browse by Country                                                        │
│                                                                             │
│   ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐          │
│   │ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England      │ │ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland     │ │ 🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales        │          │
│   │ 420 locations    │ │ 85 locations     │ │ 40 locations     │          │
│   │ [Browse →]       │ │ [Browse →]       │ │ [Browse →]       │          │
│   └──────────────────┘ └──────────────────┘ └──────────────────┘          │
│                                                                             │
│   ┌──────────────────┐                                                     │
│   │ 🇬🇧 N. Ireland    │                                                     │
│   │ 20 locations     │                                                     │
│   │ [Browse →]       │                                                     │
│   └──────────────────┘                                                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 8: FAQ                                                              │
│                                                                             │
│   Frequently Asked Questions                                               │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐ │
│   │ ▸ What are graded appliances?                                       │ │
│   ├─────────────────────────────────────────────────────────────────────┤ │
│   │ ▸ What's the difference between A-grade, B-grade, and C-grade?     │ │
│   ├─────────────────────────────────────────────────────────────────────┤ │
│   │ ▸ Do graded appliances come with a warranty?                        │ │
│   ├─────────────────────────────────────────────────────────────────────┤ │
│   │ ▸ Can I get graded appliances delivered?                            │ │
│   ├─────────────────────────────────────────────────────────────────────┤ │
│   │ ▸ How do I find appliance repair near me?                           │ │
│   ├─────────────────────────────────────────────────────────────────────┤ │
│   │ ▸ Is it better to repair or replace my appliance?                   │ │
│   └─────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│                        [Read our complete guide →]                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 9: FOOTER (Spec 05)                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. DETAILED SECTION SPECIFICATIONS

### 4.1 Hero Section

**Background:** Secondary CSS gradient (no images).

```css
/* Hero gradient - uses brand color #2563eb */
.hero {
  background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%);
}
```

**H1 Tag:**
```html
<h1>Find Graded Appliances & Repairs Near You</h1>
```

**Subheading:**
```html
<p>The UK's largest directory for ex-display, B-grade and factory seconds. Save 30-70% from trusted retailers.</p>
```

**Search Bar:**
- Uses Spec 02 SearchBar with `variant="hero"` (larger size)
- Placeholder: "Enter your city or postcode (e.g., Manchester, SW1A)"
- Button: "Search Nearby →" with red (#ef4444) background
- Autocomplete enabled

**Trust Badges:**
Three inline badges with green checkmarks:
1. ✓ Verified Retailers
2. ✓ Real Warranties
3. ✓ UK-Wide Coverage

**Dual CTA Buttons:**
```html
<div class="flex gap-4">
  <a href="#browse-appliances" class="btn-white">🏪 Buy Graded</a>
  <a href="#browse-appliances" class="btn-red">🔧 Find Repair</a>
</div>
```

---

### 4.2 Stats Bar

**Purpose:** Social proof showing platform scale.

| Stat | Label | Source |
|------|-------|--------|
| 1,200+ | Stores Listed | COUNT from `stores` table |
| 500+ | UK Locations | COUNT from `places` table |
| 4 | Countries | Static (England, Scotland, Wales, N. Ireland) |
| 27+ | Brands | COUNT from `brands` table |

**Component:**
```typescript
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
  {stats.map(stat => (
    <div key={stat.label}>
      <div className="text-2xl md:text-3xl font-bold text-[#2563eb]">{stat.value}</div>
      <div className="text-sm text-gray-600">{stat.label}</div>
    </div>
  ))}
</div>
```

---

### 4.3 Popular Cities

**Purpose:** Internal links to City Hub pages (Spec 07).

**Data Query:**
```sql
SELECT id, name, slug, store_count, provider_count, countries.slug as country_slug
FROM places
JOIN countries ON places.country_id = countries.id
WHERE is_active = true AND store_count > 0
ORDER BY store_count DESC
LIMIT 12
```

**Grid Layout:**
- Desktop: 6 columns
- Tablet: 3 columns
- Mobile: 2 columns

**Card Content:**
- City name (linked to `/{country}/{city}/`)
- Store count
- Repair count

---

### 4.4 Browse by Appliance

**Purpose:** Internal links to category pages. Visual browsing.

**Categories to Display (Tier 1 + Tier 2):**

| Icon | Name | Slug |
|------|------|------|
| 🧺 | Washing Machines | washing-machines |
| 🧊 | Fridge Freezers | fridge-freezers |
| 🇺🇸 | American Fridge Freezers | american-fridge-freezers |
| 🍽️ | Dishwashers | dishwashers |
| 🌀 | Tumble Dryers | tumble-dryers |
| 📺 | TVs | tvs |
| 🔥 | Ovens & Cookers | ovens-cookers |
| ➕ | View All | /appliances |

**Grid Layout:**
- Desktop: 8 columns (single row)
- Tablet: 4 columns
- Mobile: 3 columns

---

### 4.5 Why Buy Graded

**Purpose:** Education and trust building. Keyword-rich content.

**Benefits (6 cards):**

| Icon | Title | Description |
|------|-------|-------------|
| 💰 | Save 30-70% | Ex-display and factory seconds at a fraction of retail price |
| ✓ | Full Warranty | 6-24 months warranty included on all graded appliances |
| 🚚 | Free Delivery | Most stores offer free delivery over £300 |
| 🔧 | Repair Service | Need a fix? Compare trusted local engineers too |
| ⭐ | Verified Stores | Real reviews from real customers |
| 📍 | UK-Wide | 500+ locations across England, Scotland, Wales |

**Grid Layout:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

---

### 4.6 Browse by Country

**Purpose:** UK geography navigation. Internal links to country pages (Spec 13).

**Countries:**

| Flag | Name | Locations | Link |
|------|------|-----------|------|
| 🏴󠁧󠁢󠁥󠁮󠁧󠁿 | England | 420 | /england/ |
| 🏴󠁧󠁢󠁳󠁣󠁴󠁿 | Scotland | 85 | /scotland/ |
| 🏴󠁧󠁢󠁷󠁬󠁳󠁿 | Wales | 40 | /wales/ |
| 🇬🇧 | Northern Ireland | 20 | /northern-ireland/ |

**Grid Layout:**
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 2 columns

---

### 4.7 FAQ Section

**Purpose:** SEO (featured snippets), AEO (AI search engines), user education.

**Homepage FAQs (6 items):**

1. **What are graded appliances?**
   Graded appliances are brand-new items that cannot be sold as "new" due to minor cosmetic imperfections, damaged packaging, or being ex-display models. They are fully functional, often come with manufacturer warranties, and offer savings of 30-70% off RRP.

2. **What's the difference between A-grade, B-grade, and C-grade?**
   A-grade appliances have minimal cosmetic imperfections and are essentially new. B-grade items have noticeable marks or dents on visible surfaces but work perfectly. C-grade appliances have more significant cosmetic damage but are fully functional.

3. **Do graded appliances come with a warranty?**
   Yes, most graded appliances come with warranties. A-grade items often have full manufacturer warranties. B-grade and C-grade typically come with retailer warranties of 6-12 months.

4. **Can I get graded appliances delivered?**
   Yes, most graded appliance retailers offer delivery services across the UK. Many offer free delivery over a certain order value (typically £300-500).

5. **How do I find appliance repair near me?**
   Use our directory to search for repair engineers in your area. Enter your city or postcode, click "Find Repair", and compare trusted local engineers.

6. **Is it better to repair or replace my appliance?**
   Generally, if the repair cost exceeds 50% of a new appliance price, or if the appliance is over 8-10 years old, replacement may be more economical.

**Schema.org FAQPage markup required.**

---

## 5. SEO IMPLEMENTATION

### 5.1 Meta Tags

```html
<title>UK Graded Appliances | Find Ex-Display & Factory Seconds Near You</title>
<meta name="description" content="Find graded appliances and repair services across the UK. Compare 1,200+ stores selling ex-display, B-grade and factory seconds. Save 30-70% with full warranties.">
<link rel="canonical" href="https://ukgradedappliances.co.uk/">
```

### 5.2 Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ukgradedappliances.co.uk/#website",
      "url": "https://ukgradedappliances.co.uk/",
      "name": "UK Graded Appliances",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ukgradedappliances.co.uk/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://ukgradedappliances.co.uk/#organization",
      "name": "UK Graded Appliances",
      "url": "https://ukgradedappliances.co.uk/"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are graded appliances?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Graded appliances are brand-new items..."
          }
        }
      ]
    }
  ]
}
```

### 5.3 H-Tag Hierarchy

```
<h1>Find Graded Appliances & Repairs Near You</h1>
├── <h2>Graded Appliance Stores Near You</h2>
├── <h2>Browse by Appliance Type</h2>
├── <h2>Why Buy Graded Appliances?</h2>
│   ├── <h3>Save 30-70%</h3>
│   ├── <h3>Full Warranty</h3>
│   └── ...
├── <h2>Browse by Country</h2>
└── <h2>Frequently Asked Questions</h2>
    ├── <h3>What are graded appliances?</h3>
    └── ...
```

---

## 6. MOBILE RESPONSIVE DESIGN

### 6.1 Mobile Layout (< 768px)

```
┌────────────────────────────────┐
│ [LOGO]       [Biz ▼] [Login]  │ ← Compact navbar, no search
├────────────────────────────────┤
│ Find Graded Appliances        │
│ & Repairs Near You            │
│                               │
│ Save 30-70% from trusted      │
│ UK retailers.                 │
│                               │
│ ┌───────────────────────────┐ │
│ │ 🔍 Enter city/postcode    │ │ ← Full-width input
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │    [Search Nearby →]      │ │ ← Full-width button
│ └───────────────────────────┘ │
│                               │
│ ✓ Verified ✓ Warranty ✓ UK   │
│                               │
│ [🏪 Buy]      [🔧 Repair]    │ ← Side by side
├────────────────────────────────┤
│ 1,200+  500+   4    27+      │ ← 2x2 grid for stats
│ Stores  Places Countries Brands│
├────────────────────────────────┤
│ Stores Near You               │
│ ┌──────┐ ┌──────┐            │ ← 2 columns
│ │London│ │Manch.│            │
│ └──────┘ └──────┘            │
│     [View all 500+ →]        │
├────────────────────────────────┤
│ Browse by Appliance           │
│ ┌───┐ ┌───┐ ┌───┐            │ ← 3 columns
│ │🧺│ │🧊│ │🇺🇸│            │
│ └───┘ └───┘ └───┘            │
├────────────────────────────────┤
│ Why Graded? (stacked cards)   │
├────────────────────────────────┤
│ Browse by Country (2x2 grid)  │
├────────────────────────────────┤
│ FAQs (accordion)              │
├────────────────────────────────┤
│ [FOOTER]                      │
└────────────────────────────────┘
```

### 6.2 Touch Targets

All interactive elements: **minimum 48px × 48px**

```css
.btn, .card-link, .faq-toggle {
  min-height: 48px;
}

.search-input {
  min-height: 48px;
  font-size: 16px; /* Prevents iOS zoom */
}
```

---

## 7. PERFORMANCE REQUIREMENTS

### 7.1 Core Web Vitals

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |

### 7.2 Optimization Strategies

1. **No hero image** — CSS gradient only (~0.5KB vs 50-200KB for images)
2. **ISR caching** — Revalidate every 1 hour
3. **Server components** — Minimal client-side JS
4. **Lazy load** — Images below fold
5. **Prefetch** — Popular city links

---

## 8. DATA FETCHING

```typescript
// app/page.tsx
export const revalidate = 3600; // ISR: 1 hour

async function getHomepageData() {
  const supabase = createClient();

  const [stats, cities, categories, countries] = await Promise.all([
    // Stats
    Promise.all([
      supabase.from('stores').select('id', { count: 'exact', head: true }),
      supabase.from('places').select('id', { count: 'exact', head: true }),
      supabase.from('brands').select('id', { count: 'exact', head: true }),
    ]),

    // Popular cities (top 12 by store count)
    supabase
      .from('places')
      .select('id, name, slug, store_count, provider_count, countries(slug)')
      .eq('is_active', true)
      .gt('store_count', 0)
      .order('store_count', { ascending: false })
      .limit(12),

    // Categories (tier 1 + 2)
    supabase
      .from('appliance_categories')
      .select('id, name, slug, icon')
      .is('parent_id', null)
      .in('tier', ['tier_1', 'tier_2'])
      .order('display_order')
      .limit(8),

    // Countries
    supabase
      .from('countries')
      .select('name, slug, flag_emoji, place_count, store_count, provider_count')
      .eq('is_active', true)
      .order('display_order'),
  ]);

  return { stats, cities, categories, countries };
}
```

---

## 9. INTERNAL LINKING

### 9.1 Links FROM Homepage

| Section | Links To | Count |
|---------|----------|-------|
| Popular Cities | City Hub pages | 12 |
| Categories | National category pages | 8 |
| Countries | Country pages | 4 |
| FAQs | Guide page | 1 |
| Search | Search results | Dynamic |

### 9.2 Links TO Homepage

- All pages via Logo click (Spec 01)
- All breadcrumbs "Home" link
- Footer site name/logo
- 404 page "Return home"

---

## 10. TESTING CHECKLIST

### Functional
- [ ] Navbar search hidden on homepage
- [ ] Navbar search visible on other pages
- [ ] Hero search works with autocomplete
- [ ] All city cards link correctly
- [ ] All category cards link correctly
- [ ] All country cards link correctly
- [ ] FAQ accordions work
- [ ] Stats display correctly

### SEO
- [ ] H1 exists and is unique
- [ ] Schema.org validates
- [ ] Meta tags correct
- [ ] Canonical URL set

### Performance
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] No hero image requests

### Mobile
- [ ] Touch targets ≥ 48px
- [ ] No horizontal scroll
- [ ] Grids collapse properly

---

## 11. CHANGE LOG

| Date | Version | Change |
|------|---------|--------|
| Jan 2026 | v1.0 | Initial specification |

---

**END OF SPECIFICATION 12: HOMEPAGE**
