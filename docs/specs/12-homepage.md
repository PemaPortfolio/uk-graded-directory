# SPECIFICATION 12: HOMEPAGE

## UK Graded Appliances Directory
**Version:** 2.0 — LOCKED
**Status:** ✅ APPROVED
**Last Updated:** January 2026
**Dependencies:** Spec 01 (Logo), Spec 02 (Search Bar), Spec 03 (Business/Claim), Spec 04 (Auth), Spec 05 (Footer)

### v2.0 Improvements Summary
- **AEO Optimization:** Question-based H2 headings for AI search engine extraction
- **Grade Explainer Section:** HTML table for LLM citation (AEO-critical)
- **Hero Redesign:** Bento stats grid integrated into hero
- **Shortened H1:** "Find Graded Appliances Near You" (removed "& Repairs")
- **Live Market Pulse:** Real-time freshness signals from database
- **Deal Alert CTA:** Email lead capture for price alerts
- **Popular Brands Section:** Premium and mid-range tier showcases
- **Repair Services CTA:** Dedicated section with trust signals
- **Merged Location Navigator:** Combined cities + countries with tabs
- **Enhanced Categories:** Tier system with savings badges
- **Updated FAQs:** Factory seconds and finance questions added

---

## 1. EXECUTIVE SUMMARY

### 1.1 Purpose
The Homepage is the primary landing page and entry point to the UK Graded Appliances Directory. It serves four critical functions:
1. **Capture intent** — Get users to search or browse immediately
2. **Educate newcomers** — Explain what graded appliances are (AEO-critical)
3. **Distribute link equity** — Internal links to cities, categories, countries
4. **Generate leads** — Email capture for deal alerts

### 1.2 URL
```
https://ukgradedappliances.co.uk/
```

### 1.3 Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Navbar search** | Hidden on homepage | Avoid duplication; hero search is primary CTA |
| **Hero background** | Secondary blue gradient `#2563eb → #1d4ed8 → #1e40af` | Brand consistent; uses secondary color palette |
| **Stats display** | Bento grid in hero | Social proof immediately visible |
| **Search button** | Red `#ef4444` "Search Nearby →" | Primary CTA uses primary brand color |
| **Dual CTA** | Subtle repair hook | Retail-first, repair discoverable |
| **H2 headings** | Question-based | AEO optimization for AI search |
| **Grade explainer** | HTML table + cards | LLM extraction for featured snippets |
| **Deal Alert** | Yes | Lead capture for email marketing |
| **FAQ section** | Yes (5 questions) | SEO/AEO value; featured snippet potential |
| **Hero image** | None | Performance > aesthetics |

### 1.4 Target Keywords

| Priority | Keywords |
|----------|----------|
| Primary | graded appliances UK, graded appliances near me |
| Secondary | ex-display appliances, factory seconds UK, B-grade appliances |
| Long-tail | buy graded washing machine, what is a graded appliance |
| Brand | graded Bosch, graded Samsung UK |
| AEO Focus | "what is a graded appliance" — optimized for AI citation |

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

### 3.1 Section Overview (13 Sections)

```
HOMEPAGE STRUCTURE v2.0
├── Section 1:  Announcement Bar (NEW - seasonal campaigns)
├── Section 2:  Header/Navbar (Spec 04 variant - no search)
├── Section 3:  Hero (redesigned + Bento stats)
├── Section 4:  Live Market Pulse (NEW - freshness signals)
├── Section 5:  Grade Explainer (NEW - AEO-critical)
├── Section 6:  Deal Alert CTA (NEW - lead capture)
├── Section 7:  Categories (enhanced with tiers)
├── Section 8:  Location Navigator (merged cities + countries)
├── Section 9:  Benefits (reduced to 4 cards)
├── Section 10: Popular Brands (NEW)
├── Section 11: Repair Services CTA (NEW)
├── Section 12: FAQ (updated questions)
└── Section 13: Footer (Spec 05)
```

### 3.2 Complete Page Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SECTION 1: ANNOUNCEMENT BAR (Conditional)                                   │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  🔥 January Sale: 412 new deals added this week — Shop Now →           │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 2: NAVBAR                                                           │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  [LOGO]                                       For Business ▼    Log in  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 3: HERO (Dark Navy Gradient Background)                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                         │ │
│ │  ┌─────────────────────────────────┬─────────────────────────────────┐ │ │
│ │  │                                 │  BENTO STATS GRID               │ │ │
│ │  │  [Trust Badge]                  │  ┌─────────────────────────────┐│ │ │
│ │  │  ⭐ UK's #1 Graded Appliances   │  │ 30-70%      527 Verified   ││ │ │
│ │  │                                 │  │ Avg Savings    Stores      ││ │ │
│ │  │  Find Graded Appliances         │  ├─────────────┬─────────────┤│ │ │
│ │  │  Near You                       │  │ 156 Cities  │ Companies   ││ │ │
│ │  │  ═══════════════════════        │  │ Covered     │ House ✓     ││ │ │
│ │  │                                 │  └─────────────┴─────────────┘│ │ │
│ │  │  Save 30-70% on ex-display,     │                               │ │ │
│ │  │  B-grade & factory seconds      │                               │ │ │
│ │  │                                 │                               │ │ │
│ │  │  ┌───────────────────────────┐  │                               │ │ │
│ │  │  │ 🔍 Enter city or postcode │  │                               │ │ │
│ │  │  │  (e.g. Manchester, SW1A)  │  │                               │ │ │
│ │  │  └───────────────────────────┘  │                               │ │ │
│ │  │  ┌───────────────┐ ┌──────────┐ │                               │ │ │
│ │  │  │Search Nearby→🔴│ │📍 Use    │ │                               │ │ │
│ │  │  │               │ │Location  │ │                               │ │ │
│ │  │  └───────────────┘ └──────────┘ │                               │ │ │
│ │  │                                 │                               │ │ │
│ │  │  Quick: [Washing] [Fridges]     │                               │ │ │
│ │  │         [Ovens]   [Dishwashers] │                               │ │ │
│ │  │                                 │                               │ │ │
│ │  │  — or — Need repair?            │                               │ │ │
│ │  │        Find engineers →         │                               │ │ │
│ │  │                                 │                               │ │ │
│ │  └─────────────────────────────────┴─────────────────────────────────┘ │ │
│ │                                                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 4: LIVE MARKET PULSE                                                │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  📈 This Week: 89 new stores listed • 412 deals added • Manchester     │ │
│ │                trending (+15%)                                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 5: GRADE EXPLAINER (AEO-Critical)                                   │
│                                                                             │
│   What is a Graded Appliance?                                              │
│                                                                             │
│   [Definition paragraph - 40-60 words for AEO extraction]                  │
│                                                                             │
│   ┌───────────────────────────────────────────────────────────────────┐   │
│   │  GRADE        │ CONDITION          │ TYPICAL SAVINGS             │   │
│   ├───────────────┼────────────────────┼─────────────────────────────┤   │
│   │  Tatty Pack   │ Damaged packaging  │ ~20% off RRP                │   │
│   │  A-Grade      │ Like-new condition │ ~30% off RRP                │   │
│   │  B-Grade      │ Minor cosmetic     │ ~45% off RRP                │   │
│   │  C-Grade      │ Visible marks      │ ~60% off RRP                │   │
│   └───────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                         │
│   │ TATTY   │ │ A-GRADE │ │ B-GRADE │ │ C-GRADE │                         │
│   │ ~20% off│ │ ~30% off│ │ ~45% off│ │ ~60% off│                         │
│   │ Perfect │ │ Like new│ │ Minor   │ │ Visible │                         │
│   │ inside  │ │ condition│ │cosmetic│ │ marks   │                         │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 6: DEAL ALERT CTA                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  🔔 Get Deal Alerts                                                     │ │
│ │  Be first to know about new graded deals in your area                  │ │
│ │                                                                         │ │
│ │  [Email input                          ] [Get Alerts 🔵]               │ │
│ │                                                                         │ │
│ │  ✓ No spam  ✓ Unsubscribe anytime  ✓ Weekly digest                    │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 7: CATEGORIES                                                       │
│                                                                             │
│   What Types of Graded Appliances Can You Buy?                             │
│                                                                             │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                         │
│   │ 🧺 WASHING  │ │ 🧊 FRIDGE   │ │ 🍽️ DISH-    │   ← Tier 1             │
│   │  MACHINES   │ │  FREEZERS   │ │  WASHERS    │     (blue border)       │
│   │ Avg 35% off │ │ Avg 40% off │ │ Avg 38% off │                         │
│   └─────────────┘ └─────────────┘ └─────────────┘                         │
│                                                                             │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                         │
│   │ 🌀 TUMBLE   │ │ 🔥 OVENS &  │ │ 🇺🇸 AMERICAN │   ← Tier 2             │
│   │  DRYERS     │ │  COOKERS    │ │  FRIDGES    │                         │
│   └─────────────┘ └─────────────┘ └─────────────┘                         │
│                                                                             │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                         │
│   │ 🔄 WASHER   │ │ 📺 TVs      │ │ ➕ VIEW ALL │   ← Tier 3 + CTA        │
│   │  DRYERS     │ │             │ │             │                         │
│   └─────────────┘ └─────────────┘ └─────────────┘                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 8: LOCATION NAVIGATOR                                               │
│                                                                             │
│   Where Can You Find Graded Appliance Stores?                              │
│                                                                             │
│   ┌──────────┬──────────┬──────────┬───────────────┐                      │
│   │ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England │ 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland │ 🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales  │ 🇬🇧 N. Ireland │  ← Tabs      │
│   └──────────┴──────────┴──────────┴───────────────┘                      │
│                                                                             │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│   │ London  │ │Manchest-│ │Birming- │ │ Leeds   │ │ Bristol │ │Liverpool│ │
│   │ 42 stores│ │er       │ │ham      │ │18 stores│ │15 stores│ │12 stores│ │
│   └─────────┘ │28 stores│ │24 stores│ └─────────┘ └─────────┘ └─────────┘ │
│               └─────────┘ └─────────┘                                      │
│                                                                             │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│   │Sheffield│ │Nottingh-│ │Newcastle│ │Leicester│ │ Oxford  │ │Cambridge│ │
│   │10 stores│ │am       │ │ 8 stores│ │ 9 stores│ │ 6 stores│ │ 5 stores│ │
│   └─────────┘ │11 stores│ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
│               └─────────┘                                                  │
│                                                                             │
│                         [View all 156 cities →]                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 9: BENEFITS                                                         │
│                                                                             │
│   Why Should You Buy Graded Appliances?                                    │
│                                                                             │
│   ┌───────────────────┐ ┌───────────────────┐                              │
│   │ 💰 Save 30-70%    │ │ 🛡️ Full Warranty  │                              │
│   │ Off RRP           │ │ Protection        │                              │
│   │                   │ │                   │                              │
│   │ Ex-display and    │ │ 6-24 months       │                              │
│   │ factory seconds   │ │ manufacturer or   │                              │
│   │ at huge discounts │ │ retailer warranty │                              │
│   └───────────────────┘ └───────────────────┘                              │
│                                                                             │
│   ┌───────────────────┐ ┌───────────────────┐                              │
│   │ 🚚 Delivery &     │ │ 💳 Flexible       │                              │
│   │ Installation      │ │ Finance Options   │                              │
│   │                   │ │                   │                              │
│   │ Most stores offer │ │ Klarna, Clearpay, │                              │
│   │ free delivery     │ │ PayPal Credit     │                              │
│   │ over £300         │ │ available         │                              │
│   └───────────────────┘ └───────────────────┘                              │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 10: POPULAR BRANDS                                                  │
│                                                                             │
│   Which Brands Sell Graded Appliances?                                     │
│                                                                             │
│   Premium Brands                                                           │
│   ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                       │
│   │ BOSCH │ │SAMSUNG│ │  LG   │ │SIEMENS│ │ MIELE │                       │
│   └───────┘ └───────┘ └───────┘ └───────┘ └───────┘                       │
│                                                                             │
│   Mid-Range Brands                                                         │
│   ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                       │
│   │HOTPOINT│ │ BEKO  │ │INDESIT│ │WHIRLPL│ │  AEG  │                       │
│   └───────┘ └───────┘ └───────┘ └───────┘ └───────┘                       │
│                                                                             │
│                         [View all 27+ brands →]                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 11: REPAIR SERVICES CTA                                             │
│                                                                             │
│   Need Appliance Repair Instead?                                           │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐ │
│   │                                                                     │ │
│   │  🔧 Compare trusted local engineers                                │ │
│   │                                                                     │ │
│   │  ✓ Gas Safe Registered  ✓ Same-Day Available  ✓ Warranty on Work  │ │
│   │  ✓ Manufacturer Authorised                                         │ │
│   │                                                                     │ │
│   │  ┌──────────────────────────┐  ┌──────────────────────────┐       │ │
│   │  │ 🔍 Find Repair Engineers │  │ 📖 Repair vs Replace?    │       │ │
│   │  └──────────────────────────┘  └──────────────────────────┘       │ │
│   │                                                                     │ │
│   └─────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 12: FAQ                                                             │
│                                                                             │
│   Common Questions About Graded Appliances                                 │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐ │
│   │ ▸ What does graded mean for appliances?                            │ │
│   ├─────────────────────────────────────────────────────────────────────┤ │
│   │ ▸ What is the difference between A-grade, B-grade and C-grade?    │ │
│   ├─────────────────────────────────────────────────────────────────────┤ │
│   │ ▸ Do graded appliances come with a warranty?                       │ │
│   ├─────────────────────────────────────────────────────────────────────┤ │
│   │ ▸ What does factory seconds mean?                                  │ │
│   ├─────────────────────────────────────────────────────────────────────┤ │
│   │ ▸ Can I buy graded appliances on finance?                          │ │
│   └─────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│                        [Read our complete guide →]                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ SECTION 13: FOOTER (Spec 05)                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. DETAILED SECTION SPECIFICATIONS

### 4.1 Announcement Bar (NEW)

**Purpose:** Display seasonal campaigns, promotions, or freshness signals.

**Visibility:** Conditional — only shown when active campaign exists in database.

**Wireframe:**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🔥 January Sale: 412 new deals added this week — Shop Now →               │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Styling:**
```css
.announcement-bar {
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
  color: white;
  padding: 10px 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
}

.announcement-bar a {
  color: white;
  text-decoration: underline;
  margin-left: 8px;
}
```

**Data Source:**
```sql
SELECT message, link_url, link_text, is_active
FROM announcements
WHERE is_active = true
  AND start_date <= NOW()
  AND (end_date IS NULL OR end_date >= NOW())
ORDER BY priority DESC
LIMIT 1;
```

**Dismissal:** Optional close button (X) that sets a cookie to hide for 24 hours.

---

### 4.2 Header/Navbar

See Section 2 above. Uses Spec 04 with search bar hidden on homepage.

---

### 4.3 Hero Section (Redesigned)

**Background:** Secondary blue CSS gradient (brand consistent).

```css
/* Hero gradient - uses brand secondary colors */
.hero {
  background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%);
  min-height: 500px;
}
```

**Layout:** Two-column grid (60/40 split on desktop).

**Left Column Content:**

**Trust Badge:**
```html
<div class="inline-flex items-center gap-2 bg-blue-600/20 px-3 py-1 rounded-full text-sm text-blue-300">
  ⭐ UK's #1 Graded Appliance Directory
</div>
```

**H1 Tag:**
```html
<h1 class="text-4xl md:text-5xl font-bold text-white">
  Find Graded Appliances Near You
</h1>
```

**Subheading:**
```html
<p class="text-lg text-slate-300">
  Save 30-70% on ex-display, B-grade and factory seconds from verified UK retailers.
</p>
```

**Search Bar:**
- Uses Spec 02 SearchBar with `variant="hero"` (larger size)
- Placeholder: "Enter your city or postcode (e.g., Manchester, SW1A)"
- **Button: "Search Nearby →" with RED (`#ef4444`) background** (primary CTA)
- Autocomplete enabled

```html
<div class="flex gap-2">
  <input
    type="text"
    placeholder="Enter your city or postcode (e.g., Manchester, SW1A)"
    class="flex-1 h-14 px-4 rounded-lg text-base"
  />
  <button class="h-14 px-6 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-lg font-medium">
    Search Nearby →
  </button>
</div>
```

**Geolocation Button:**
```html
<button class="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm">
  📍 Use my location
</button>
```

**Quick Category Links:**
```html
<div class="flex flex-wrap gap-2 mt-4">
  <span class="text-slate-400 text-sm">Quick:</span>
  <a href="/washing-machines/" class="text-sm text-white hover:text-blue-300">Washing Machines</a>
  <a href="/fridge-freezers/" class="text-sm text-white hover:text-blue-300">Fridges</a>
  <a href="/ovens-cookers/" class="text-sm text-white hover:text-blue-300">Ovens</a>
  <a href="/dishwashers/" class="text-sm text-white hover:text-blue-300">Dishwashers</a>
</div>
```

**Subtle Repair Hook:**
```html
<div class="mt-6 text-slate-400 text-sm">
  — or — Need repair? <a href="#repair" class="text-blue-400 hover:text-blue-300">Find engineers →</a>
</div>
```

**Right Column: Bento Stats Grid**
```html
<div class="grid grid-cols-2 gap-4">
  <!-- Large stat -->
  <div class="col-span-2 bg-white/10 rounded-xl p-6 text-center">
    <div class="text-4xl font-bold text-white">30-70%</div>
    <div class="text-slate-300 text-sm">Average Savings</div>
  </div>

  <!-- Medium stat -->
  <div class="bg-white/10 rounded-xl p-4 text-center">
    <div class="text-2xl font-bold text-white">527</div>
    <div class="text-slate-300 text-xs">Verified Stores</div>
  </div>

  <!-- Medium stat -->
  <div class="bg-white/10 rounded-xl p-4 text-center">
    <div class="text-2xl font-bold text-white">156</div>
    <div class="text-slate-300 text-xs">UK Cities</div>
  </div>

  <!-- Trust badge -->
  <div class="col-span-2 bg-green-600/20 rounded-xl p-4 flex items-center justify-center gap-2">
    <span class="text-green-400">✓</span>
    <span class="text-green-300 text-sm">Companies House & Gas Safe Verified</span>
  </div>
</div>
```

---

### 4.4 Live Market Pulse (NEW)

**Purpose:** Display freshness signals from database to show platform activity.

**Wireframe:**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📈 This Week: 89 new stores listed • 412 deals added • Manchester         │
│                trending (+15%)                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Data Query:**
```sql
-- New stores this week
SELECT COUNT(*) FROM stores WHERE created_at >= NOW() - INTERVAL '7 days';

-- New deals/products this week (if tracking products)
-- SELECT COUNT(*) FROM products WHERE created_at >= NOW() - INTERVAL '7 days';

-- Trending location (most click growth)
SELECT p.name,
       ROUND((current_clicks::numeric / NULLIF(previous_clicks, 0) - 1) * 100) as growth
FROM (
  SELECT place_id, COUNT(*) as current_clicks
  FROM click_events
  WHERE created_at >= NOW() - INTERVAL '7 days'
  GROUP BY place_id
) current
JOIN (
  SELECT place_id, COUNT(*) as previous_clicks
  FROM click_events
  WHERE created_at >= NOW() - INTERVAL '14 days'
    AND created_at < NOW() - INTERVAL '7 days'
  GROUP BY place_id
) previous ON current.place_id = previous.place_id
JOIN places p ON current.place_id = p.id
ORDER BY growth DESC
LIMIT 1;
```

**Styling:**
```css
.market-pulse {
  background: #f8f6f6;
  border-top: 1px solid #ebe5e5;
  border-bottom: 1px solid #ebe5e5;
  padding: 16px 24px;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.market-pulse .stat {
  font-weight: 600;
  color: #181111;
}

.market-pulse .trend-up {
  color: #16a34a;
}
```

---

### 4.5 Grade Explainer (NEW — AEO-Critical)

**Purpose:** Define graded appliances for SEO featured snippets and AI/LLM extraction.

**H2 Tag (Question-based for AEO):**
```html
<h2>What is a Graded Appliance?</h2>
```

**Definition Paragraph (Answer Nugget — 40-60 words):**
```html
<p class="text-lg text-gray-700 max-w-3xl">
  <strong>A graded appliance</strong> is a brand-new product that cannot be sold as
  "new" due to minor cosmetic imperfections, damaged packaging, or being an
  ex-display model. Graded appliances are fully functional, typically come with
  manufacturer warranties, and offer savings of 30-70% compared to full retail prices.
</p>
```

**HTML TABLE (Critical for LLM Extraction):**
```html
<table class="w-full border-collapse mt-8">
  <thead>
    <tr class="bg-gray-100">
      <th class="border border-gray-300 px-4 py-3 text-left">Grade</th>
      <th class="border border-gray-300 px-4 py-3 text-left">Condition</th>
      <th class="border border-gray-300 px-4 py-3 text-left">Typical Savings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 px-4 py-3 font-medium">Tatty Packaging</td>
      <td class="border border-gray-300 px-4 py-3">Damaged box only, appliance perfect</td>
      <td class="border border-gray-300 px-4 py-3">~20% off RRP</td>
    </tr>
    <tr class="bg-gray-50">
      <td class="border border-gray-300 px-4 py-3 font-medium">A-Grade</td>
      <td class="border border-gray-300 px-4 py-3">Like-new, minimal imperfections</td>
      <td class="border border-gray-300 px-4 py-3">~30% off RRP</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-3 font-medium">B-Grade</td>
      <td class="border border-gray-300 px-4 py-3">Minor cosmetic marks on visible surfaces</td>
      <td class="border border-gray-300 px-4 py-3">~45% off RRP</td>
    </tr>
    <tr class="bg-gray-50">
      <td class="border border-gray-300 px-4 py-3 font-medium">C-Grade</td>
      <td class="border border-gray-300 px-4 py-3">Visible dents or scratches</td>
      <td class="border border-gray-300 px-4 py-3">~60% off RRP</td>
    </tr>
  </tbody>
</table>
```

**Visual Grade Cards:**
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
  <div class="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
    <div class="text-xs font-medium text-green-600 uppercase tracking-wide">Tatty Packaging</div>
    <div class="text-2xl font-bold text-green-700 mt-1">~20% off</div>
    <div class="text-sm text-gray-600 mt-2">Perfect inside, box damaged</div>
  </div>

  <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
    <div class="text-xs font-medium text-blue-600 uppercase tracking-wide">A-Grade</div>
    <div class="text-2xl font-bold text-blue-700 mt-1">~30% off</div>
    <div class="text-sm text-gray-600 mt-2">Like-new condition</div>
  </div>

  <div class="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-center">
    <div class="text-xs font-medium text-amber-600 uppercase tracking-wide">B-Grade</div>
    <div class="text-2xl font-bold text-amber-700 mt-1">~45% off</div>
    <div class="text-sm text-gray-600 mt-2">Minor cosmetic marks</div>
  </div>

  <div class="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center">
    <div class="text-xs font-medium text-orange-600 uppercase tracking-wide">C-Grade</div>
    <div class="text-2xl font-bold text-orange-700 mt-1">~60% off</div>
    <div class="text-sm text-gray-600 mt-2">Visible dents/scratches</div>
  </div>
</div>
```

---

### 4.6 Deal Alert CTA (NEW)

**Purpose:** Lead capture for email marketing and deal notifications.

**Wireframe:**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🔔 Get Deal Alerts                                                         │
│  Be first to know about new graded deals in your area                      │
│                                                                             │
│  [Email input                          ] [Get Alerts 🔵]                   │
│                                                                             │
│  ✓ No spam  ✓ Unsubscribe anytime  ✓ Weekly digest                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

**HTML:**
```html
<section class="bg-blue-50 py-12">
  <div class="max-w-2xl mx-auto text-center px-4">
    <div class="text-3xl mb-2">🔔</div>
    <h2 class="text-2xl font-bold text-gray-900">Get Deal Alerts</h2>
    <p class="text-gray-600 mt-2">Be first to know about new graded deals in your area</p>

    <form class="flex gap-2 mt-6 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        required
        class="flex-1 h-12 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
      <button
        type="submit"
        class="h-12 px-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg font-medium"
      >
        Get Alerts
      </button>
    </form>

    <div class="flex justify-center gap-6 mt-4 text-sm text-gray-500">
      <span>✓ No spam</span>
      <span>✓ Unsubscribe anytime</span>
      <span>✓ Weekly digest</span>
    </div>
  </div>
</section>
```

**Form Handling:** Integrates with email service (Mailchimp, ConvertKit, or custom).

---

### 4.7 Categories (Enhanced)

**Purpose:** Internal links to category pages with tier system.

**H2 Tag (Question-based for AEO):**
```html
<h2>What Types of Graded Appliances Can You Buy?</h2>
```

**Categories with Tier System:**

| Tier | Categories | Display |
|------|------------|---------|
| Tier 1 | Washing Machines, Fridge Freezers, Dishwashers | Blue border, "Avg X% off" badge |
| Tier 2 | Tumble Dryers, Ovens & Cookers, American Fridges | Standard |
| Tier 3 | Washer Dryers, TVs | Standard |
| CTA | View All | Primary button style |

**Grid Layout:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 2 columns

**Card Component:**
```html
<!-- Tier 1 card (with savings badge) -->
<a
  href="/washing-machines/"
  class="block p-6 bg-white rounded-xl border-2 border-blue-500 hover:shadow-lg transition-shadow"
>
  <div class="text-3xl mb-2">🧺</div>
  <h3 class="font-semibold text-gray-900">Washing Machines</h3>
  <div class="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
    Avg 35% off
  </div>
</a>

<!-- Tier 2/3 card (no savings badge) -->
<a
  href="/tumble-dryers/"
  class="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
>
  <div class="text-3xl mb-2">🌀</div>
  <h3 class="font-semibold text-gray-900">Tumble Dryers</h3>
</a>
```

**Savings Badges Data:**
```sql
-- Calculate average savings per category (if price data exists)
-- Otherwise use static estimates based on industry data
SELECT
  c.name,
  c.slug,
  ROUND(AVG((original_price - sale_price) / original_price * 100)) as avg_savings
FROM appliance_categories c
JOIN products p ON p.category_id = c.id
WHERE p.original_price > 0 AND p.sale_price > 0
GROUP BY c.id;
```

---

### 4.8 Location Navigator (Merged Cities + Countries)

**Purpose:** Combined navigation for cities and countries with tab interface.

**H2 Tag (Question-based for AEO):**
```html
<h2>Where Can You Find Graded Appliance Stores?</h2>
```

**Tab Interface:**
```html
<div class="border-b border-gray-200">
  <nav class="flex gap-0" aria-label="Countries">
    <button
      class="px-6 py-3 text-sm font-medium border-b-2 border-blue-500 text-blue-600"
      aria-selected="true"
    >
      🏴󠁧󠁢󠁥󠁮󠁧󠁿 England
    </button>
    <button
      class="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
      aria-selected="false"
    >
      🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland
    </button>
    <button
      class="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
      aria-selected="false"
    >
      🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales
    </button>
    <button
      class="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
      aria-selected="false"
    >
      🇬🇧 N. Ireland
    </button>
  </nav>
</div>
```

**Cities Grid (filtered by selected country):**
```html
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
  <a href="/england/london/" class="group">
    <div class="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
      <div class="font-medium text-gray-900 group-hover:text-blue-600">London</div>
      <div class="text-sm text-gray-500">42 stores</div>
    </div>
  </a>
  <!-- More city cards -->
</div>
```

**Data Query:**
```sql
SELECT
  p.id,
  p.name,
  p.slug,
  p.store_count,
  p.provider_count,
  c.slug as country_slug,
  c.name as country_name
FROM places p
JOIN countries c ON p.country_id = c.id
WHERE p.is_active = true AND p.store_count > 0
ORDER BY p.store_count DESC
LIMIT 60;
```

**"View All" Button:**
```html
<div class="text-center mt-8">
  <a
    href="/locations/"
    class="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700"
  >
    View all 156 cities →
  </a>
</div>
```

---

### 4.9 Benefits (Reduced to 4 Cards)

**Purpose:** Education and trust building with focused messaging.

**H2 Tag (Question-based for AEO):**
```html
<h2>Why Should You Buy Graded Appliances?</h2>
```

**Benefits (4 cards):**

| Icon | Title | Description |
|------|-------|-------------|
| 💰 | Save 30-70% Off RRP | Ex-display and factory seconds at huge discounts compared to full retail prices |
| 🛡️ | Full Warranty Protection | 6-24 months manufacturer or retailer warranty included on all graded items |
| 🚚 | Delivery & Installation | Most stores offer free delivery over £300, with installation available |
| 💳 | Flexible Finance Options | Klarna, Clearpay, and PayPal Credit available at many retailers |

**Grid Layout:**
- Desktop: 2 columns (2×2 grid)
- Tablet: 2 columns
- Mobile: 1 column

**Card Component:**
```html
<div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
  <div class="text-3xl mb-4">💰</div>
  <h3 class="text-lg font-semibold text-gray-900">Save 30-70% Off RRP</h3>
  <p class="text-gray-600 mt-2">
    Ex-display and factory seconds at huge discounts compared to full retail prices.
  </p>
</div>
```

---

### 4.10 Popular Brands (NEW)

**Purpose:** Showcase well-known brands to build trust and target brand keywords.

**H2 Tag (Question-based for AEO):**
```html
<h2>Which Brands Sell Graded Appliances?</h2>
```

**Brand Tiers:**

| Tier | Brands |
|------|--------|
| Premium | Bosch, Samsung, LG, Siemens, Miele |
| Mid-Range | Hotpoint, Beko, Indesit, Whirlpool, AEG |

**HTML Structure:**
```html
<section class="py-12 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-2xl font-bold text-center text-gray-900 mb-8">
      Which Brands Sell Graded Appliances?
    </h2>

    <!-- Premium Brands -->
    <div class="mb-8">
      <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
        Premium Brands
      </h3>
      <div class="grid grid-cols-5 gap-4">
        <a href="/brands/bosch/" class="flex items-center justify-center h-20 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
          <span class="font-semibold text-gray-700">BOSCH</span>
        </a>
        <a href="/brands/samsung/" class="flex items-center justify-center h-20 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
          <span class="font-semibold text-gray-700">SAMSUNG</span>
        </a>
        <!-- More brands -->
      </div>
    </div>

    <!-- Mid-Range Brands -->
    <div>
      <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
        Mid-Range Brands
      </h3>
      <div class="grid grid-cols-5 gap-4">
        <a href="/brands/hotpoint/" class="flex items-center justify-center h-20 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
          <span class="font-semibold text-gray-700">HOTPOINT</span>
        </a>
        <!-- More brands -->
      </div>
    </div>

    <div class="text-center mt-8">
      <a href="/brands/" class="text-blue-600 hover:text-blue-700 font-medium">
        View all 27+ brands →
      </a>
    </div>
  </div>
</section>
```

**Data Query:**
```sql
SELECT name, slug, tier, logo_url
FROM brands
WHERE is_active = true
ORDER BY
  CASE tier
    WHEN 'premium' THEN 1
    WHEN 'mid_range' THEN 2
    ELSE 3
  END,
  name;
```

---

### 4.11 Repair Services CTA (NEW)

**Purpose:** Dedicated section for repair services with trust signals.

**H2 Tag (Question-based for AEO):**
```html
<h2>Need Appliance Repair Instead?</h2>
```

**HTML Structure:**
```html
<section class="py-12 bg-slate-900 text-white" id="repair">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-2xl font-bold mb-4">Need Appliance Repair Instead?</h2>

    <p class="text-slate-300 mb-6">
      Compare trusted local engineers for all major appliance brands.
    </p>

    <!-- Trust Signals -->
    <div class="flex flex-wrap justify-center gap-4 mb-8">
      <span class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
        <span class="text-green-400">✓</span> Gas Safe Registered
      </span>
      <span class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
        <span class="text-green-400">✓</span> Same-Day Available
      </span>
      <span class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
        <span class="text-green-400">✓</span> Warranty on Work
      </span>
      <span class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
        <span class="text-green-400">✓</span> Manufacturer Authorised
      </span>
    </div>

    <!-- Dual CTAs -->
    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <a
        href="/repair/"
        class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ef4444] hover:bg-[#dc2626] rounded-lg font-medium"
      >
        🔧 Find Repair Engineers
      </a>
      <a
        href="/guides/repair-vs-replace/"
        class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg font-medium"
      >
        📖 Repair vs Replace Guide
      </a>
    </div>
  </div>
</section>
```

---

### 4.12 FAQ Section (Updated)

**Purpose:** SEO (featured snippets), AEO (AI search engines), user education.

**H2 Tag (Question-based for AEO):**
```html
<h2>Common Questions About Graded Appliances</h2>
```

**Homepage FAQs (5 items — updated from v1):**

1. **What does graded mean for appliances?**
   A graded appliance is a brand-new product that cannot be sold as "new" due to minor cosmetic imperfections, damaged packaging, or being an ex-display model. They are fully functional, often include manufacturer warranties, and offer savings of 30-70% compared to full retail prices.

2. **What is the difference between A-grade, B-grade and C-grade?**
   A-grade appliances have minimal cosmetic imperfections and are essentially like-new. B-grade items have noticeable marks or dents on visible surfaces but work perfectly. C-grade appliances have more significant cosmetic damage but remain fully functional. Tatty packaging means only the box is damaged.

3. **Do graded appliances come with a warranty?**
   Yes, most graded appliances come with warranties. A-grade items often retain full manufacturer warranties. B-grade and C-grade typically come with retailer warranties of 6-12 months. Always check the specific warranty offered by each retailer.

4. **What does factory seconds mean?**
   Factory seconds are products that did not pass final quality inspection due to minor cosmetic defects. They never left the factory as "new" stock but are fully functional. Factory seconds typically offer savings of 20-40% and may include manufacturer warranty.

5. **Can I buy graded appliances on finance?**
   Yes, many graded appliance retailers offer finance options including Klarna, Clearpay, and PayPal Credit. Interest-free options are often available for orders over £300. Finance availability varies by retailer, so check individual store pages for details.

**Schema.org FAQPage markup required.**

**Accordion Component:**
```html
<div class="max-w-3xl mx-auto">
  <div class="border-b border-gray-200">
    <button
      class="w-full flex justify-between items-center py-4 text-left"
      aria-expanded="false"
      aria-controls="faq-1"
    >
      <span class="font-medium text-gray-900">What does graded mean for appliances?</span>
      <span class="text-gray-400">▸</span>
    </button>
    <div id="faq-1" class="pb-4 text-gray-600 hidden">
      A graded appliance is a brand-new product...
    </div>
  </div>
  <!-- More FAQ items -->
</div>
```

---

### 4.13 Footer (Spec 05)

**Reference:** See Specification 05 for complete footer implementation.

The footer includes:
- Main footer (4 columns: Logo/tagline, Quick Links, Categories, For Business)
- Browse by Region (all 217 admin areas)
- Popular Cities (top 20)
- Bottom bar (copyright, stats, social links)

**Do NOT duplicate footer content in this spec.**

---

## 5. SEO IMPLEMENTATION

### 5.1 Meta Tags

```html
<title>Graded Appliances UK | Find Discounted Washing Machines, Fridges & More Near You</title>
<meta name="description" content="Compare 527+ verified stores selling graded, ex-display and factory seconds appliances across the UK. Save 30-70% on washing machines, fridge freezers, dishwashers and more. Full warranties included.">
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
      "url": "https://ukgradedappliances.co.uk/",
      "sameAs": [
        "https://www.tiktok.com/@ukgradedappliances",
        "https://www.facebook.com/ukgradedappliances",
        "https://www.youtube.com/@ukgradedappliances"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does graded mean for appliances?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A graded appliance is a brand-new product that cannot be sold as 'new' due to minor cosmetic imperfections, damaged packaging, or being an ex-display model. They are fully functional, often include manufacturer warranties, and offer savings of 30-70% compared to full retail prices."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between A-grade, B-grade and C-grade?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A-grade appliances have minimal cosmetic imperfections and are essentially like-new. B-grade items have noticeable marks or dents on visible surfaces but work perfectly. C-grade appliances have more significant cosmetic damage but remain fully functional."
          }
        },
        {
          "@type": "Question",
          "name": "Do graded appliances come with a warranty?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, most graded appliances come with warranties. A-grade items often retain full manufacturer warranties. B-grade and C-grade typically come with retailer warranties of 6-12 months."
          }
        },
        {
          "@type": "Question",
          "name": "What does factory seconds mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Factory seconds are products that did not pass final quality inspection due to minor cosmetic defects. They never left the factory as 'new' stock but are fully functional."
          }
        },
        {
          "@type": "Question",
          "name": "Can I buy graded appliances on finance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, many graded appliance retailers offer finance options including Klarna, Clearpay, and PayPal Credit. Interest-free options are often available for orders over £300."
          }
        }
      ]
    },
    {
      "@type": "ItemList",
      "name": "Graded Appliance Categories",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Washing Machines",
          "url": "https://ukgradedappliances.co.uk/washing-machines/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Fridge Freezers",
          "url": "https://ukgradedappliances.co.uk/fridge-freezers/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Dishwashers",
          "url": "https://ukgradedappliances.co.uk/dishwashers/"
        }
      ]
    },
    {
      "@type": "Table",
      "name": "Graded Appliance Grades Comparison",
      "about": "Comparison of different graded appliance grades and their typical savings"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://ukgradedappliances.co.uk/"
        }
      ]
    }
  ]
}
```

### 5.3 H-Tag Hierarchy (Updated for AEO)

```
<h1>Find Graded Appliances Near You</h1>
├── <h2>What is a Graded Appliance?</h2>
│   ├── <h3>Tatty Packaging</h3>
│   ├── <h3>A-Grade</h3>
│   ├── <h3>B-Grade</h3>
│   └── <h3>C-Grade</h3>
├── <h2>What Types of Graded Appliances Can You Buy?</h2>
│   ├── <h3>Washing Machines</h3>
│   ├── <h3>Fridge Freezers</h3>
│   └── ...
├── <h2>Where Can You Find Graded Appliance Stores?</h2>
├── <h2>Why Should You Buy Graded Appliances?</h2>
│   ├── <h3>Save 30-70% Off RRP</h3>
│   ├── <h3>Full Warranty Protection</h3>
│   ├── <h3>Delivery & Installation</h3>
│   └── <h3>Flexible Finance Options</h3>
├── <h2>Which Brands Sell Graded Appliances?</h2>
│   ├── <h3>Premium Brands</h3>
│   └── <h3>Mid-Range Brands</h3>
├── <h2>Need Appliance Repair Instead?</h2>
└── <h2>Common Questions About Graded Appliances</h2>
    ├── <h3>What does graded mean for appliances?</h3>
    ├── <h3>What is the difference between A-grade, B-grade and C-grade?</h3>
    └── ...
```

---

## 6. AEO (ANSWER ENGINE OPTIMIZATION) STRATEGY

### 6.1 Purpose
Optimize content for AI search engines (ChatGPT, Perplexity, Google AI Overview) to cite UK Graded Appliances as an authoritative source.

### 6.2 Content Patterns

**Answer Nuggets:** Each section starts with a concise 40-60 word definition paragraph that can be directly extracted.

**Question-Based H2s:** All main section headings are phrased as questions users might ask.

**HTML Tables:** Grade comparison table uses proper HTML `<table>` elements for structured data extraction.

**Definition Lists:** Key terms defined with `<strong>` emphasis for term highlighting.

### 6.3 Target AEO Queries

| Query | Section | Answer Source |
|-------|---------|---------------|
| "What is a graded appliance?" | Grade Explainer | Definition paragraph |
| "What does A-grade mean?" | Grade Explainer | Table row |
| "Where to buy graded appliances UK?" | Location Navigator | City list |
| "Best brands for graded appliances?" | Popular Brands | Brand tiers |
| "Are graded appliances worth it?" | Benefits | 4 cards content |

---

## 7. WORD COUNT GUIDELINES

### 7.1 Target Word Count
**Total:** 2,000-3,000 words (excluding navigation and footer)

### 7.2 Breakdown by Section

| Section | Target Words |
|---------|--------------|
| Hero | 50-75 |
| Live Market Pulse | 20-30 |
| Grade Explainer | 300-400 |
| Deal Alert CTA | 30-50 |
| Categories | 100-150 |
| Location Navigator | 50-75 |
| Benefits | 200-250 |
| Popular Brands | 100-150 |
| Repair Services CTA | 75-100 |
| FAQ | 500-600 |
| **Total** | **1,425-1,880** |

Additional copy can be added to introductory paragraphs in each section to reach 2,000+ words.

---

## 8. INTERNAL LINKING STRATEGY

### 8.1 Target Link Count
**100-150 internal links** from the homepage (excluding footer).

### 8.2 Link Budget

| Section | Links | Destinations |
|---------|-------|--------------|
| Quick Categories (Hero) | 4 | Category pages |
| Repair Hook (Hero) | 1 | /repair/ |
| Grade Explainer | 4 | Individual grade guide pages |
| Categories Grid | 9 | Category pages |
| Location Navigator | 60 | City pages |
| Benefits | 4 | Guide pages (optional) |
| Popular Brands | 10 | Brand pages |
| Repair CTA | 2 | /repair/, guide page |
| FAQ | 5 | Full answer pages |
| Footer (Spec 05) | 217+ | Admin area pages |
| **Total (excl. footer)** | **~99** | |

### 8.3 Links FROM Homepage

| Section | Links To | Count |
|---------|----------|-------|
| Quick Categories | Category hubs | 4 |
| Categories Grid | National category pages | 9 |
| Location Navigator | City Hub pages | 60 |
| Popular Brands | Brand pages | 10 |
| Repair CTA | Repair section, guide | 2 |
| FAQ | Full guide pages | 5 |
| Footer (Spec 05) | Admin areas, cities, categories | 250+ |

### 8.4 Links TO Homepage

- All pages via Logo click (Spec 01)
- All breadcrumbs "Home" link
- Footer site name/logo
- 404 page "Return home"

---

## 9. MOBILE RESPONSIVE DESIGN

### 9.1 Mobile Layout (< 768px)

```
┌────────────────────────────────┐
│ 🔥 January Sale — Shop Now    │ ← Announcement bar
├────────────────────────────────┤
│ [LOGO]       [Biz ▼] [Login]  │ ← Compact navbar, no search
├────────────────────────────────┤
│                                │
│ ⭐ UK's #1 Directory          │
│                                │
│ Find Graded Appliances        │
│ Near You                       │
│                                │
│ Save 30-70% on ex-display...  │
│                                │
│ ┌───────────────────────────┐ │
│ │ 🔍 Enter postcode/city    │ │ ← Full-width input
│ └───────────────────────────┘ │
│                                │
│ ┌──────────────┐ ┌───────────┐│
│ │Search Nearby→│ │📍 Location││ ← Side by side buttons
│ └──────────────┘ └───────────┘│
│                                │
│ Quick: Washing • Fridges      │ ← Wrap to 2 lines
│        Ovens • Dishwashers    │
│                                │
│ — or — Need repair? →         │
│                                │
├────────────────────────────────┤
│ BENTO STATS (2×2 grid)        │ ← Moves below hero content
│ ┌──────────────────────────┐  │
│ │ 30-70% Average Savings   │  │
│ ├─────────────┬────────────┤  │
│ │ 527 Stores  │ 156 Cities │  │
│ └─────────────┴────────────┘  │
├────────────────────────────────┤
│ 📈 This Week: 89 new stores  │ ← Market pulse
├────────────────────────────────┤
│ What is a Graded Appliance?   │
│ [Definition paragraph]        │
│ [Grade table - scrollable]    │
│ [Grade cards - 2 columns]     │
├────────────────────────────────┤
│ 🔔 Get Deal Alerts            │
│ [Email input]                 │
│ [Get Alerts button]           │
├────────────────────────────────┤
│ What Types Can You Buy?       │
│ [Category cards - 2 columns]  │
├────────────────────────────────┤
│ Where Can You Find Stores?    │
│ [Country tabs - scrollable]   │
│ [City cards - 2 columns]      │
├────────────────────────────────┤
│ Why Buy Graded?               │
│ [Benefit cards - 1 column]    │
├────────────────────────────────┤
│ Which Brands?                 │
│ [Brand logos - 3 columns]     │
├────────────────────────────────┤
│ Need Repair Instead?          │
│ [Trust badges - wrap]         │
│ [CTA buttons - stacked]       │
├────────────────────────────────┤
│ Common Questions              │
│ [FAQ accordion]               │
├────────────────────────────────┤
│ [FOOTER - Spec 05]            │
└────────────────────────────────┘
```

### 9.2 Touch Targets

All interactive elements: **minimum 48px × 48px**

```css
.btn, .card-link, .faq-toggle, .tab-button {
  min-height: 48px;
}

.search-input {
  min-height: 48px;
  font-size: 16px; /* Prevents iOS zoom */
}

.email-input {
  min-height: 48px;
  font-size: 16px;
}
```

### 9.3 Mobile Table Handling

Grade comparison table on mobile:
```css
@media (max-width: 640px) {
  .grade-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .grade-table {
    min-width: 500px;
  }
}
```

---

## 10. PERFORMANCE REQUIREMENTS

### 10.1 Core Web Vitals

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID/INP | < 100ms |
| CLS | < 0.1 |

### 10.2 Optimization Strategies

1. **No hero image** — CSS gradient only (~0.5KB vs 50-200KB for images)
2. **ISR caching** — Revalidate every 1 hour
3. **Server components** — Minimal client-side JS
4. **Lazy load** — Images below fold (brand logos, etc.)
5. **Prefetch** — Popular city links
6. **Font optimization** — Geist fonts preloaded
7. **Critical CSS** — Inline above-fold styles

---

## 11. DATA FETCHING

```typescript
// app/page.tsx
export const revalidate = 3600; // ISR: 1 hour

async function getHomepageData() {
  const supabase = createClient();

  const [
    announcement,
    stats,
    marketPulse,
    cities,
    categories,
    countries,
    brands,
  ] = await Promise.all([
    // Active announcement
    supabase
      .from('announcements')
      .select('message, link_url, link_text')
      .eq('is_active', true)
      .lte('start_date', new Date().toISOString())
      .or(`end_date.is.null,end_date.gte.${new Date().toISOString()}`)
      .order('priority', { ascending: false })
      .limit(1)
      .single(),

    // Stats
    Promise.all([
      supabase.from('stores').select('id', { count: 'exact', head: true }),
      supabase.from('places').select('id', { count: 'exact', head: true }).gt('store_count', 0),
      supabase.from('brands').select('id', { count: 'exact', head: true }),
    ]),

    // Market pulse (new stores this week)
    supabase
      .from('stores')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),

    // Popular cities (top 60 by store count)
    supabase
      .from('places')
      .select('id, name, slug, store_count, provider_count, countries(slug, name)')
      .eq('is_active', true)
      .gt('store_count', 0)
      .order('store_count', { ascending: false })
      .limit(60),

    // Categories (tier 1, 2, 3)
    supabase
      .from('appliance_categories')
      .select('id, name, slug, icon, tier')
      .is('parent_id', null)
      .in('tier', ['tier_1', 'tier_2', 'tier_3'])
      .order('display_order')
      .limit(9),

    // Countries
    supabase
      .from('countries')
      .select('id, name, slug, flag_emoji, place_count, store_count, provider_count')
      .eq('is_active', true)
      .order('display_order'),

    // Brands (by tier)
    supabase
      .from('brands')
      .select('id, name, slug, tier, logo_url')
      .eq('is_active', true)
      .in('tier', ['premium', 'mid_range'])
      .order('tier')
      .order('name'),
  ]);

  return {
    announcement: announcement.data,
    stats: {
      stores: stats[0].count || 0,
      cities: stats[1].count || 0,
      brands: stats[2].count || 0,
    },
    newStoresThisWeek: marketPulse.count || 0,
    cities: cities.data || [],
    categories: categories.data || [],
    countries: countries.data || [],
    brands: brands.data || [],
  };
}
```

---

## 12. TESTING CHECKLIST

### Functional
- [ ] Announcement bar displays when active campaign exists
- [ ] Announcement bar hidden when no active campaign
- [ ] Navbar search hidden on homepage
- [ ] Navbar search visible on other pages
- [ ] Hero search works with autocomplete
- [ ] Geolocation button requests permission and works
- [ ] Quick category links navigate correctly
- [ ] Repair hook link navigates to #repair section
- [ ] Bento stats display dynamic counts
- [ ] Market pulse shows weekly stats
- [ ] Grade explainer table renders correctly
- [ ] Deal alert form submits email
- [ ] Category cards link correctly with tier styling
- [ ] Location navigator tabs switch countries
- [ ] City cards filter by selected country
- [ ] Benefits cards display correctly
- [ ] Brand logos link to brand pages
- [ ] Repair CTA buttons work
- [ ] FAQ accordions expand/collapse

### SEO
- [ ] H1 exists and is unique
- [ ] All H2s are question-based
- [ ] Schema.org validates (FAQPage, ItemList, Table, BreadcrumbList)
- [ ] Meta tags correct
- [ ] Canonical URL set
- [ ] Internal links count: 100-150 (excluding footer)

### AEO
- [ ] Grade explainer has HTML table
- [ ] Definition paragraph is 40-60 words
- [ ] All sections have answer nugget format

### Performance
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] No hero image requests
- [ ] Fonts preloaded

### Mobile
- [ ] Touch targets ≥ 48px
- [ ] No horizontal scroll
- [ ] Grids collapse properly
- [ ] Grade table scrolls horizontally
- [ ] Country tabs scroll horizontally
- [ ] Bento stats move below hero content

---

## 13. CHANGE LOG

| Date | Version | Change |
|------|---------|--------|
| Jan 2026 | v1.0 | Initial specification |
| Jan 2026 | v2.0 | Major update: AEO optimization with question-based H2s; Grade Explainer section with HTML table; Hero redesign (bento stats grid); Shortened H1 (removed "& Repairs"); Live Market Pulse for freshness signals; Deal Alert CTA for lead capture; Popular Brands section with tiers; Repair Services CTA with trust signals; Merged Location Navigator with country tabs; Reduced Benefits to 4 cards with finance option; Updated FAQs (5 questions including factory seconds and finance); Enhanced categories with tier system and savings badges; Updated meta tags and expanded Schema.org (ItemList, Table, BreadcrumbList); Added AEO strategy section; Added word count guidelines; Expanded internal linking strategy (100-150 links) |

---

**END OF SPECIFICATION 12: HOMEPAGE**
