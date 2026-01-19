# Store Card Component Specification

**Version:** 1.1 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED

**v1.1 Changes:** Added Phase 1 Monetization Integration (warranty affiliate, cross-sell link, affiliate tracking)

---

## Executive Summary

The Store Card is a **reusable component** that displays store information in listing contexts. It is the primary interface element for discovering stores across the platform, appearing on City Pages, Category Pages, Brand Pages, and Search Results.

### Why This Component Matters

| Context | Purpose |
|---------|---------|
| City Page | Main content — list of all retailers |
| Category Page | Filtered list by appliance type |
| Brand Page | Filtered list by brand |
| Search Results | Discovery from header search |
| "Other Stores" | Related stores suggestions |

### Key Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Mobile First** | 70%+ traffic — optimized for touch |
| **Scannable** | Key info visible without interaction |
| **Action-Oriented** | Clear CTAs (Call, View Profile) |
| **Trust Signals** | Badges communicate credibility |
| **Click Tracking** | All interactions logged for monetization |
| **Performance** | Lazy load images, minimal re-renders |
| **Accessibility** | Full keyboard navigation, screen reader support |

### Component Variants

| Variant | Use Case | Complexity |
|---------|----------|------------|
| **Full** | City Page, main listings | All fields |
| **Compact** | "Other Stores", sidebars | Minimal fields |
| **Featured** | Promoted listings | Full + highlight styling |
| **Mini** | Map popups, tooltips | Name + rating only |

---

## Data Schema Reference

```
STORES TABLE — FIELDS USED BY CARD
═══════════════════════════════════════════════════════════════

FROM stores TABLE:
─────────────────────────────────────────────────────────────
id                          UUID          Primary key
slug                        VARCHAR(300)  URL segment
business_name               VARCHAR(300)  Display name
trading_name                VARCHAR(300)  Alternative name
short_description           VARCHAR(300)  Tagline/summary
description                 TEXT          Full description
phone                       VARCHAR(50)   Primary contact
website                     VARCHAR(500)  External link
logo_url                    VARCHAR(500)  Store logo
address_line1               VARCHAR(300)  Street address
postcode                    VARCHAR(20)   Postcode for display
city_name                   VARCHAR(200)  City/town name
year_established            INTEGER       "Est. {year}"

SERVICES (booleans):
─────────────────────────────────────────────────────────────
offers_delivery             BOOLEAN       Delivery available
offers_free_delivery        BOOLEAN       Free delivery
offers_same_day_delivery    BOOLEAN       Same-day option
offers_next_day_delivery    BOOLEAN       Next-day option
offers_installation         BOOLEAN       Installation available
offers_free_installation    BOOLEAN       Free installation
offers_old_appliance_removal BOOLEAN      Removal service
offers_weee_recycling       BOOLEAN       Recycling available
offers_repair_service       BOOLEAN       Repairs badge
offers_finance              BOOLEAN       Finance available
offers_zero_percent_finance BOOLEAN       0% finance
offers_click_collect        BOOLEAN       Click & collect

FINANCE:
─────────────────────────────────────────────────────────────
finance_providers           ENUM[]        [klarna, clearpay, etc.]

WARRANTY:
─────────────────────────────────────────────────────────────
warranty_months             INTEGER       Warranty duration
warranty_type               ENUM          manufacturer|retailer|both|none

RATINGS:
─────────────────────────────────────────────────────────────
average_rating              NUMERIC(3,2)  0.00 to 5.00
review_count                INTEGER       Total reviews

STATUS:
─────────────────────────────────────────────────────────────
status                      ENUM          pending|active|claimed|verified|suspended
is_featured                 BOOLEAN       Promoted listing
is_active                   BOOLEAN       Display on site

COMPUTED/DERIVED:
─────────────────────────────────────────────────────────────
overall_score               INTEGER       Ranking score (0-100)

FROM JUNCTION TABLES:
─────────────────────────────────────────────────────────────
store_categories            Many-to-many  Appliance categories sold
store_brands                Many-to-many  Brands stocked
store_service_areas         Many-to-many  Locations served (count)

═══════════════════════════════════════════════════════════════
```

---

## Component Architecture

```
COMPONENT HIERARCHY
═══════════════════════════════════════════════════════════════

StoreCard (main wrapper)
├── StoreCardHeader
│   ├── StoreLogo
│   ├── StoreNameRating
│   │   ├── StoreName (link)
│   │   ├── RatingDisplay
│   │   └── VerifiedBadge
│   └── FeaturedBadge (conditional)
│
├── StoreCardBody
│   ├── StoreDescription
│   ├── StoreContactInfo
│   │   ├── AddressDisplay
│   │   ├── PhoneDisplay (clickable)
│   │   └── HoursPreview (optional)
│   ├── StoreCategoriesList
│   ├── StoreBrandsList
│   └── ServiceBadges
│       ├── DeliveryBadge
│       ├── WarrantyBadge
│       ├── FinanceBadge
│       └── AdditionalBadges
│
└── StoreCardFooter
    ├── CallButton (CTA)
    └── ViewProfileButton (CTA)

═══════════════════════════════════════════════════════════════
```

---

## Visual Specification — Full Variant

### Desktop Layout

```
STORE CARD — FULL VARIANT (DESKTOP)
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────┐                                                               │
│  │         │   BORSHCH ELECTRIC                              ⭐ 4.8 (342) │
│  │  LOGO   │   ━━━━━━━━━━━━━━━━━━━                                        │
│  │  80×80  │   Est. 1982 • 4 West Midlands locations         ✓ Verified  │
│  └─────────┘                                                               │
│                                                                             │
│  Birmingham's largest independent graded appliance retailer with over 40   │
│  years experience. Specialises in premium brands including Bosch...        │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ 📍 Unit 15, Aston Rd, Birmingham (B6 4RN)   │   🕐 Open today 9-5:30 │ │
│  │ 📞 0121 327 1234                            │   🌐 borshchelectric   │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  WHAT THEY STOCK                                                           │
│  ✓ Washing Machines  ✓ Fridge Freezers  ✓ Dishwashers                     │
│  ✓ Tumble Dryers     ✓ Cookers & Ovens  ✓ American Fridges                │
│                                                                             │
│  TOP BRANDS                                                                │
│  Bosch • Siemens • Neff • Miele • Samsung • LG • AEG                      │
│                                                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ 🚚 Free    │ │ 📋 12-Month│ │ 💳 Finance │ │ ♻️ Recycling│              │
│  │ Delivery   │ │ Warranty   │ │ (Klarna)   │ │ Service    │              │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘              │
│                                                                             │
│  🔧 Also offers: Installation (£29) • Old Appliance Removal • Repairs     │
│                                                                             │
│  ┌───────────────────────┐        ┌─────────────────────────────┐         │
│  │    📞 Call Now        │        │       VIEW FULL PROFILE →   │         │
│  └───────────────────────┘        └─────────────────────────────┘         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

DIMENSIONS:
├── Container width:    100% (fills parent grid)
├── Padding:            24px
├── Border radius:      12px
├── Margin bottom:      16px

═══════════════════════════════════════════════════════════════
```

### Mobile Layout

```
STORE CARD — FULL VARIANT (MOBILE)
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────┐
│                                         │
│  ┌──────┐  BORSHCH ELECTRIC             │
│  │ LOGO │  ━━━━━━━━━━━━━━━              │
│  │60×60 │  ⭐ 4.8 (342) • ✓ Verified   │
│  └──────┘  Est. 1982                    │
│                                         │
│  Birmingham's largest independent       │
│  graded appliance retailer with...      │
│  [Show more]                            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  📍 Aston Rd, Birmingham (B6 4RN)      │
│  📞 0121 327 1234                       │
│  🕐 Open today until 5:30pm            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  WHAT THEY STOCK                        │
│  Washing Machines • Fridge Freezers    │
│  Dishwashers • +3 more                 │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │🚚 Free  │ │📋 12mo  │ │💳 Klarna│   │
│  │Delivery │ │Warranty │ │         │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         📞 CALL NOW             │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      VIEW FULL PROFILE →        │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘

DIMENSIONS:
├── Container width:    100%
├── Padding:            16px
├── Border radius:      12px
├── Logo:               60×60px
├── Buttons:            Full width, stacked

═══════════════════════════════════════════════════════════════
```

---

## Visual Specification — Compact Variant

```
STORE CARD — COMPACT VARIANT
═══════════════════════════════════════════════════════════════

Desktop (horizontal):
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  ┌──────┐  BORSHCH ELECTRIC              ⭐ 4.8 (342)        │
│  │ LOGO │  Aston, Birmingham             ✓ Verified          │
│  │48×48 │  🚚 Delivery • 📋 12mo Warranty    [View →]        │
│  └──────┘                                                     │
│                                                               │
└───────────────────────────────────────────────────────────────┘

Mobile (vertical):
┌─────────────────────────────┐
│                             │
│  ┌──────┐  BORSHCH ELECTRIC │
│  │ LOGO │  ⭐ 4.8 (342)     │
│  │40×40 │  Aston, Birmingham│
│  └──────┘  ✓ Verified       │
│                             │
│  🚚 Delivery • 📋 12mo      │
│                             │
│  ┌─────────────────────┐   │
│  │     View Profile →  │   │
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘

USE CASES:
├── "Other Stores in [City]" section
├── Sidebar recommendations
├── Search result previews
├── Map marker info windows

═══════════════════════════════════════════════════════════════
```

---

## Visual Specification — Featured Variant

```
STORE CARD — FEATURED VARIANT
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ ★ FEATURED                                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [Same content as Full variant with enhanced styling]                       │
│                                                                             │
│  STYLING DIFFERENCES:                                                       │
│  ├── Border:           2px solid #F59E0B (amber-500)                       │
│  ├── Background:       Linear gradient top: #FFFBEB → #FFFFFF              │
│  ├── Featured badge:   Top-left ribbon "★ FEATURED"                        │
│  ├── Box shadow:       0 4px 20px rgba(245, 158, 11, 0.2)                  │
│  └── Sort position:    Always appears first in listings                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

FEATURED BADGE:
┌──────────────┐
│ ★ FEATURED   │
└──────────────┘
├── Background:    #F59E0B (amber-500)
├── Color:         #78350F (amber-900)
├── Font size:     11px
├── Font weight:   700
├── Padding:       4px 10px
├── Position:      Absolute, top-right corner

═══════════════════════════════════════════════════════════════
```

---

## Visual Specification — Mini Variant

```
STORE CARD — MINI VARIANT
═══════════════════════════════════════════════════════════════

Used in: Map popups, autocomplete dropdowns, tooltips

┌─────────────────────────────────┐
│                                 │
│  ┌────┐ BORSHCH ELECTRIC       │
│  │LOGO│ ⭐ 4.8 • Aston         │
│  │32px│                        │
│  └────┘ [View →]               │
│                                 │
└─────────────────────────────────┘

DIMENSIONS:
├── Logo:        32×32px
├── Padding:     8px 12px
├── Max width:   280px

═══════════════════════════════════════════════════════════════
```

---

## Data Mapping — Complete Field Reference

```
DATA MAPPING — STORE CARD FULL VARIANT
═══════════════════════════════════════════════════════════════

FIELD               SOURCE                          DISPLAY LOGIC
─────────────────────────────────────────────────────────────────

HEADER SECTION:
─────────────────────────────────────────────────────────────────
Logo                stores.logo_url                 Show placeholder if null
                    Placeholder: First 2 letters    #F3F4F6 bg, secondary text
                    of business_name

Business name       stores.business_name            Always show (required)
                    Link: /store/{slug}/            Track: profile_view

Rating              stores.average_rating           Hide entire block if null
                    Format: "⭐ {rating}"           1 decimal place (4.8)

Review count        stores.review_count             Hide if 0 or null
                    Format: "({count})"             Show with rating

Verified badge      stores.status = 'verified'      Hide if not verified
                    Format: "✓ Verified"            Green styling

Featured badge      stores.is_featured              Only show if true
                    Format: "★ Featured"            Amber styling

Established         stores.year_established         Hide if null
                    Format: "Est. {year}"           Only if > 1900

Location count      COUNT(store_service_areas)      Hide if ≤ 1
                    Format: "{N} locations"         Show admin_area name

BODY SECTION:
─────────────────────────────────────────────────────────────────
Description         stores.short_description        Fallback: truncate description
                    OR stores.description[0:200]    Line clamp: 2-3 lines
                    Mobile: "Show more" toggle

Address             stores.address_line1            Hide section if all null
                    + stores.city_name
                    + stores.postcode (in parens)

Phone               stores.phone                    Hide if null
                    Format: tel: link               Track: call_click

Hours preview       stores.operating_hours          Hide if null
                    Show: "Open now" / "Closed"     Parse JSONB for today
                    OR today's hours

Website             stores.website                  Hide if null
                    Format: domain only             Track: website_click
                    (strip https://www.)

CATEGORIES:
─────────────────────────────────────────────────────────────────
Categories          JOIN store_categories           Hide section if none
                    → appliance_categories          Show max 6, then "+N more"
                    Fields: name                    Checkmark list or pills

BRANDS:
─────────────────────────────────────────────────────────────────
Brands              JOIN store_brands               Hide section if none
                    → brands                        Show max 7, then "+N more"
                    Fields: name                    Bullet-separated list

SERVICE BADGES (show if true):
─────────────────────────────────────────────────────────────────
Free Delivery       offers_free_delivery            "🚚 Free Delivery"
                    OR offers_delivery              "🚚 Delivery" (if not free)

Same-day            offers_same_day_delivery        "⚡ Same-day"

Warranty            warranty_months >= 6            "📋 {N}-Month Warranty"
                    Show if ≥ 6 months              Hide if < 6 or null

Finance             offers_finance                  "💳 Finance"
                    offers_zero_percent_finance     "💳 0% Finance" (priority)
                    finance_providers[0]            Show provider (Klarna)

Recycling           offers_weee_recycling           "♻️ Recycling"

Click & Collect     offers_click_collect            "🏪 Click & Collect"

ADDITIONAL SERVICES ("Also offers:" section):
─────────────────────────────────────────────────────────────────
Installation        offers_installation             "Installation"
                    installation_cost               "(£{cost})" if cost set
                    offers_free_installation        "(Free)" if free

Removal             offers_old_appliance_removal    "Old Appliance Removal"

Repairs             offers_repair_service           "Repairs" or badge

CTA BUTTONS:
─────────────────────────────────────────────────────────────────
Call button         stores.phone                    Hide if no phone
                    Action: tel:{phone}             Track: call_click

View Profile        /store/{slug}/                  Always show
                    Action: Link                    Track: profile_view

═══════════════════════════════════════════════════════════════
```

---

## Click Tracking Integration

```
CLICK TRACKING — STORE CARD EVENTS
═══════════════════════════════════════════════════════════════

All interactive elements must log to click_events table.

EVENT TYPES:
─────────────────────────────────────────────────────────────────

1. CALL CLICK
   Trigger:     User clicks phone number or "Call Now" button
   Event type:  'call_click'
   Subject:     { type: 'store', id: store.id }
   Context:     { page_path, page_type, place_id }
   
   Implementation:
   onClick={() => trackClick('call_click', { storeId, phone })}

2. WEBSITE CLICK
   Trigger:     User clicks website link
   Event type:  'website_click'
   Subject:     { type: 'store', id: store.id }
   Context:     { page_path, destination_url }
   
   Implementation:
   onClick={() => trackClick('website_click', { storeId, url })}
   Opens in new tab: target="_blank" rel="noopener"

3. PROFILE VIEW
   Trigger:     User clicks store name or "View Profile" button
   Event type:  'profile_view'
   Subject:     { type: 'store', id: store.id }
   Context:     { page_path, source: 'card_name' | 'card_button' }

TRACKING FUNCTION:
─────────────────────────────────────────────────────────────────

// lib/tracking/trackClick.ts
export async function trackClick(
  eventType: 'call_click' | 'website_click' | 'profile_view' | 'affiliate_click',
  data: {
    subjectType: 'store' | 'provider';
    subjectId: string;
    pagePath?: string;
    pageType?: string;
    placeId?: string;
    destinationUrl?: string;
    affiliatePartner?: string;  // For affiliate_click events
  }
): Promise<void> {
  // Fire and forget — don't block UI
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_type: eventType,
      subject_type: data.subjectType,
      subject_id: data.subjectId,
      page_path: data.pagePath || window.location.pathname,
      page_type: data.pageType,
      place_id: data.placeId,
      session_id: getSessionId(), // From cookie or generated
    }),
  }).catch(() => {
    // Silently fail — tracking should never break UX
  });
}

═══════════════════════════════════════════════════════════════
```

---

## Phase 1 Monetization Integration

```
MONETIZATION — STORE CARD (PHASE 1)
═══════════════════════════════════════════════════════════════

This section defines the monetization touchpoints integrated into
the Store Card component. Phase 1 focuses on foundation-building
and low-friction affiliate opportunities.

STRATEGY CONTEXT:
─────────────────────────────────────────────────────────────────
Store Card users are BUYING graded appliances. Their concerns:
├── "Will it break?"        → Warranty affiliate opportunity
├── "Can I afford it?"      → Finance intent tracking
├── "Is this the right move?" → Cross-sell to repair

Revenue streams relevant to Store Card:
├── Warranty Affiliate (D&G)     £15-30/lead   HIGH PRIORITY
├── Call/Website Tracking        Foundation    IMPLEMENTED
├── Finance Intent Tracking      Foundation    PHASE 1
├── Featured Listings            £49-99/month  PHASE 3 (ready)

═══════════════════════════════════════════════════════════════
```

### Warranty Affiliate Integration

```
WARRANTY AFFILIATE — "PROTECT YOUR PURCHASE"
═══════════════════════════════════════════════════════════════

WHY THIS MATTERS:
─────────────────────────────────────────────────────────────────
Graded appliances often have shorter warranties (6 months vs 2 years).
Users are already concerned about buying "not perfect" items.
Extended warranty converts extremely well in this context.

Partner: Domestic & General (D&G)
Payout: £15-30 per qualified lead
Conversion context: High (user already worried about reliability)

DISPLAY LOGIC:
─────────────────────────────────────────────────────────────────
Show warranty affiliate prompt when:
├── warranty_months < 12
├── OR warranty_months IS NULL
├── OR warranty_type = 'retailer' (not manufacturer)

Do NOT show when:
├── warranty_months >= 12 AND warranty_type = 'manufacturer'
├── (Strong warranty already — no need)

VISUAL PLACEMENT:
─────────────────────────────────────────────────────────────────
Location: After service badges, before CTA buttons
Style: Subtle but visible — informational, not pushy

Desktop:
┌─────────────────────────────────────────────────────────────┐
│  [Service badges...]                                        │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ 🛡️ Protect your graded appliance from £3.50/month    │ │
│  │    [Get Breakdown Cover →]                            │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  [Call Now]  [View Profile]                                │
└─────────────────────────────────────────────────────────────┘

Mobile:
┌─────────────────────────────────────────────────────────────┐
│  [Service badges...]                                        │
│                                                             │
│  🛡️ Shorter warranty? Get breakdown cover →               │
│                                                             │
│  [Call Now]                                                 │
│  [View Profile]                                             │
└─────────────────────────────────────────────────────────────┘

STYLING:
─────────────────────────────────────────────────────────────────
Container:
├── Background:     #F0F9FF (sky-50) — trust blue
├── Border:         1px solid #BAE6FD (sky-200)
├── Border radius:  8px
├── Padding:        12px 16px
├── Margin:         16px 0

Text:
├── Icon:           🛡️
├── Main text:      14px, #0C4A6E (sky-900)
├── CTA link:       14px, #0369A1 (sky-700), underline on hover

Mobile:
├── Single line with arrow
├── Full-width tap target
├── Min height: 44px

TRACKING:
─────────────────────────────────────────────────────────────────
On click → Log to affiliate_clicks table:
├── affiliate_partner:  'd&g'
├── product_type:       'extended_warranty'
├── store_id:           Current store
├── place_id:           Current city/place
├── source_page:        page_path
├── category_id:        If on category page

Also log user_intent:
├── intent_type:        'need_warranty'
├── store_id:           Current store

AFFILIATE LINK STRUCTURE:
─────────────────────────────────────────────────────────────────
Base URL: https://www.domgen.com/appliances (example)
Params:   ?ref=ukgradedappliances&utm_source=ukga&utm_medium=card

Link opens in new tab: target="_blank" rel="noopener sponsored"

Note: "sponsored" rel attribute is required for affiliate links
      to comply with Google's guidelines.

═══════════════════════════════════════════════════════════════
```

### Cross-Sell Link to Repair

```
CROSS-SELL — "PREFER TO REPAIR?"
═══════════════════════════════════════════════════════════════

WHY THIS MATTERS:
─────────────────────────────────────────────────────────────────
Some users land on Store Cards but actually have a broken appliance.
They might convert better on the repair side (Provider Cards).
Cross-linking captures this traffic and improves user experience.

DISPLAY LOGIC:
─────────────────────────────────────────────────────────────────
Show cross-sell link when:
├── Page is City Page or Category Page
├── provider_count > 0 for this city (repair providers exist)

Do NOT show when:
├── provider_count = 0 (no repair providers to link to)
├── On Store Profile Page (different context)

VISUAL PLACEMENT:
─────────────────────────────────────────────────────────────────
Location: Card footer, below CTAs (very subtle)
Purpose: Catch wrong-intent visitors, not distract buyers

┌─────────────────────────────────────────────────────────────┐
│  [Call Now]  [View Profile]                                │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  🔧 Not sure you need a new one?                           │
│     Compare repair options in {city} →                     │
└─────────────────────────────────────────────────────────────┘

STYLING:
─────────────────────────────────────────────────────────────────
├── Font size:      13px
├── Color:          #6B7280 (grey-500)
├── Border top:     1px solid #E5E7EB
├── Padding top:    12px
├── Margin top:     16px
├── Hover:          Color → #2563eb (secondary)

LINK TARGET:
─────────────────────────────────────────────────────────────────
From City Page:
├── /england/{city}/#repairs (anchor to repair section)

From Category Page:
├── /england/{city}/{category}-repair/ (e.g., washing-machine-repair)

TRACKING:
─────────────────────────────────────────────────────────────────
On click → Log to click_events:
├── event_type:     'profile_view' (internal navigation)
├── page_path:      Current page
├── metadata:       { cross_sell: 'retail_to_repair' }

Also log user_intent:
├── intent_type:    'need_repair'
├── context:        'cross_sell_from_store_card'

═══════════════════════════════════════════════════════════════
```

### Affiliate Click Tracking

```
AFFILIATE TRACKING — INFRASTRUCTURE
═══════════════════════════════════════════════════════════════

All affiliate interactions must log to affiliate_clicks table.
This enables revenue tracking and conversion optimization.

TRACKING FUNCTION:
─────────────────────────────────────────────────────────────────

// lib/tracking/trackAffiliate.ts
export async function trackAffiliateClick(data: {
  affiliatePartner: 'd&g' | 'ao-care' | 'espares' | 'klarna';
  productType: 'extended_warranty' | 'parts' | 'finance';
  storeId?: string;
  providerId?: string;
  placeId?: string;
  categoryId?: string;
  sourcePage: string;
}): Promise<string> {
  // Generate tracking ID for conversion attribution
  const trackingId = generateTrackingId();
  
  // Fire and forget
  fetch('/api/affiliate-track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      tracking_id: trackingId,
      session_id: getSessionId(),
      clicked_at: new Date().toISOString(),
    }),
  }).catch(() => {});
  
  return trackingId; // Return for URL parameter
}

AFFILIATE LINK BUILDER:
─────────────────────────────────────────────────────────────────

// lib/affiliate/buildAffiliateLink.ts
export function buildAffiliateLink(
  partner: 'd&g' | 'espares' | 'klarna',
  trackingId: string,
  context?: { category?: string; brand?: string }
): string {
  const baseUrls: Record<string, string> = {
    'd&g': 'https://www.domgen.com/appliances',
    'espares': 'https://www.espares.co.uk',
    'klarna': 'https://www.klarna.com/uk',
  };
  
  const url = new URL(baseUrls[partner]);
  url.searchParams.set('ref', 'ukgradedappliances');
  url.searchParams.set('tid', trackingId);
  
  if (context?.category) {
    url.searchParams.set('cat', context.category);
  }
  
  return url.toString();
}

═══════════════════════════════════════════════════════════════
```

---

## Styling Specification

### Color Tokens

```
COLOR TOKENS — STORE CARD
═══════════════════════════════════════════════════════════════

BRAND COLORS (from brand foundation):
├── Secondary:           #2563eb    Primary text, links
├── Red:            #DC2626    Call button, primary CTA
├── White:          #FFFFFF    Backgrounds

NEUTRAL COLORS:
├── Grey-50:        #F9FAFB    Logo placeholder bg
├── Grey-100:       #F3F4F6    Badge backgrounds
├── Grey-200:       #E5E7EB    Borders
├── Grey-500:       #6B7280    Secondary text
├── Grey-600:       #4B5563    Description text
├── Grey-700:       #374151    Address text

STATUS COLORS:
├── Green-100:      #D1FAE5    Verified badge bg
├── Green-500:      #10B981    Verified badge border
├── Green-600:      #059669    Verified badge text
├── Amber-50:       #FFFBEB    Featured card bg
├── Amber-500:      #F59E0B    Featured badge bg
├── Amber-900:      #78350F    Featured badge text

AFFILIATE/WARRANTY COLORS (Phase 1 Monetization):
├── Sky-50:         #F0F9FF    Warranty prompt bg
├── Sky-200:        #BAE6FD    Warranty prompt border
├── Sky-700:        #0369A1    Warranty prompt CTA
├── Sky-900:        #0C4A6E    Warranty prompt text

INTERACTIVE STATES:
├── Hover shadow:   rgba(0,0,0,0.1)
├── Focus ring:     #2563eb (2px outline)
├── Active:         Scale 0.98

═══════════════════════════════════════════════════════════════
```

### Typography

```
TYPOGRAPHY — STORE CARD
═══════════════════════════════════════════════════════════════

BUSINESS NAME:
├── Font family:    Inter (system fallback)
├── Font size:      20px (desktop), 18px (mobile)
├── Font weight:    700
├── Line height:    1.3
├── Color:          #2563eb (secondary)

RATING:
├── Font size:      18px (desktop), 16px (mobile)
├── Font weight:    700
├── Color:          #374151 (grey-700)

REVIEW COUNT:
├── Font size:      13px
├── Font weight:    400
├── Color:          #6B7280 (grey-500)

DESCRIPTION:
├── Font size:      14px
├── Font weight:    400
├── Line height:    1.5
├── Color:          #4B5563 (grey-600)
├── Line clamp:     3 lines (CSS)

CONTACT INFO:
├── Font size:      14px
├── Font weight:    400
├── Color:          #374151 (grey-700)

SECTION LABELS ("What They Stock"):
├── Font size:      12px
├── Font weight:    600
├── Color:          #6B7280 (grey-500)
├── Text transform: Uppercase
├── Letter spacing: 0.05em

BADGE TEXT:
├── Font size:      12px
├── Font weight:    500
├── Color:          #374151 (grey-700)

BUTTON TEXT:
├── Font size:      14px
├── Font weight:    600

═══════════════════════════════════════════════════════════════
```

### Spacing & Layout

```
SPACING — STORE CARD
═══════════════════════════════════════════════════════════════

CONTAINER:
├── Padding:        24px (desktop), 16px (mobile)
├── Border radius:  12px
├── Margin bottom:  16px
├── Border:         1px solid #E5E7EB

LOGO:
├── Size:           80×80px (desktop), 60×60px (mobile)
├── Border radius:  8px
├── Margin right:   16px

HEADER (name/rating row):
├── Margin bottom:  12px
├── Gap:            8px (between elements)

DESCRIPTION:
├── Margin bottom:  16px

CONTACT BOX:
├── Padding:        12px 16px
├── Border radius:  8px
├── Background:     #F9FAFB
├── Margin bottom:  16px

CATEGORIES/BRANDS:
├── Margin bottom:  16px
├── Label margin:   8px bottom

BADGES CONTAINER:
├── Gap:            8px
├── Flex wrap:      wrap
├── Margin bottom:  16px

INDIVIDUAL BADGE:
├── Padding:        6px 12px
├── Border radius:  6px

BUTTONS CONTAINER:
├── Gap:            12px
├── Margin top:     16px

BUTTON:
├── Padding:        12px 24px (desktop)
├── Padding:        14px 20px (mobile, full width)
├── Border radius:  8px

═══════════════════════════════════════════════════════════════
```

---

## Interactive States

```
INTERACTIVE STATES — STORE CARD
═══════════════════════════════════════════════════════════════

CARD CONTAINER:
─────────────────────────────────────────────────────────────────
Default:
├── Background:     #FFFFFF
├── Border:         1px solid #E5E7EB
├── Box shadow:     none

Hover:
├── Box shadow:     0 4px 12px rgba(0, 0, 0, 0.1)
├── Transform:      translateY(-2px)
├── Transition:     all 200ms ease

Focus (keyboard):
├── Outline:        2px solid #2563eb
├── Outline offset: 2px

FEATURED CARD:
─────────────────────────────────────────────────────────────────
Default:
├── Border:         2px solid #F59E0B
├── Background:     linear-gradient(180deg, #FFFBEB 0%, #FFFFFF 50%)

Hover:
├── Box shadow:     0 4px 20px rgba(245, 158, 11, 0.25)

STORE NAME LINK:
─────────────────────────────────────────────────────────────────
Default:
├── Color:          #2563eb
├── Text decoration: none

Hover:
├── Color:          #1E40AF (blue-800)
├── Text decoration: underline

Focus:
├── Outline:        2px solid #2563eb
├── Border radius:  2px

PHONE NUMBER LINK:
─────────────────────────────────────────────────────────────────
Default:
├── Color:          #374151

Hover:
├── Color:          #2563eb
├── Cursor:         pointer

CALL BUTTON (Primary CTA):
─────────────────────────────────────────────────────────────────
Default:
├── Background:     #DC2626 (red)
├── Color:          #FFFFFF
├── Border:         none

Hover:
├── Background:     #B91C1C (red-700)
├── Transform:      scale(1.02)

Active:
├── Background:     #991B1B (red-800)
├── Transform:      scale(0.98)

Focus:
├── Outline:        2px solid #DC2626
├── Outline offset: 2px

VIEW PROFILE BUTTON (Secondary CTA):
─────────────────────────────────────────────────────────────────
Default:
├── Background:     #FFFFFF
├── Color:          #2563eb
├── Border:         1px solid #2563eb

Hover:
├── Background:     #2563eb
├── Color:          #FFFFFF

Active:
├── Background:     #001544
├── Transform:      scale(0.98)

Focus:
├── Outline:        2px solid #2563eb
├── Outline offset: 2px

SERVICE BADGE:
─────────────────────────────────────────────────────────────────
Default:
├── Background:     #F3F4F6
├── Border:         1px solid #E5E7EB
├── Cursor:         default (not interactive)

(Badges are not clickable — informational only)

═══════════════════════════════════════════════════════════════
```

---

## Mobile-First Implementation

```
MOBILE-FIRST — RESPONSIVE BREAKPOINTS
═══════════════════════════════════════════════════════════════

BREAKPOINTS:
├── Mobile:         < 640px (default styles)
├── Tablet:         640px - 1024px
├── Desktop:        > 1024px

MOBILE (default — write these first):
─────────────────────────────────────────────────────────────────
Container:
├── Padding:        16px
├── Full width

Logo:
├── Size:           60×60px
├── Float or flex alongside name

Header layout:
├── Name + rating inline
├── Verified badge below name

Description:
├── Line clamp:     2 lines
├── "Show more" expandable

Contact:
├── Stack vertically
├── Full-width touch targets

Categories:
├── Show max 4
├── "+X more" toggle

Brands:
├── Hide or show max 4

Badges:
├── Horizontal scroll if overflow
├── OR 2-row wrap

Buttons:
├── Full width
├── Stacked vertically
├── Call button first (primary)
├── Min height: 48px (touch target)

TABLET (sm: 640px+):
─────────────────────────────────────────────────────────────────
Container:
├── Padding:        20px

Logo:
├── Size:           70×70px

Buttons:
├── Side by side
├── 50% width each

DESKTOP (lg: 1024px+):
─────────────────────────────────────────────────────────────────
Container:
├── Padding:        24px

Logo:
├── Size:           80×80px

Contact:
├── 2-column grid

Categories:
├── Show max 6

Brands:
├── Show max 7

Buttons:
├── Auto width
├── Right-aligned

═══════════════════════════════════════════════════════════════
```

### Touch Target Guidelines

```
TOUCH TARGETS — MOBILE ACCESSIBILITY
═══════════════════════════════════════════════════════════════

MINIMUM SIZES (WCAG 2.2 AA):
├── Buttons:        48px × 48px minimum
├── Links:          44px × 44px minimum
├── Spacing:        8px between targets

PHONE NUMBER:
├── Entire row is tappable (not just text)
├── Padding:        12px vertical
├── Visual feedback on tap

BUTTONS:
├── Full width on mobile
├── Height:         52px
├── Clear tap feedback (scale 0.98)

BADGES:
├── NOT tappable (informational)
├── No hover states on mobile

"SHOW MORE" TOGGLE:
├── Tap area:       Full description width
├── Height:         44px
├── Visual indicator (chevron)

═══════════════════════════════════════════════════════════════
```

---

## Accessibility Requirements

```
ACCESSIBILITY — STORE CARD (WCAG 2.1 AA)
═══════════════════════════════════════════════════════════════

SEMANTIC HTML:
─────────────────────────────────────────────────────────────────
<article>           Card container (landmark)
<h3>                Store name (within page h2 context)
<address>           Contact information
<ul>                Categories, brands (lists)
<a>                 Interactive links
<button>            CTA buttons

ARIA ATTRIBUTES:
─────────────────────────────────────────────────────────────────
Card:
├── role="article"
├── aria-labelledby="{store-name-id}"

Rating:
├── aria-label="Rating: 4.8 out of 5 stars, 342 reviews"

Verified badge:
├── aria-label="Verified retailer"

Phone link:
├── aria-label="Call Borshch Electric at 0121 327 1234"

Profile link:
├── aria-label="View full profile for Borshch Electric"

Expandable description:
├── aria-expanded="false"
├── aria-controls="{description-id}"

KEYBOARD NAVIGATION:
─────────────────────────────────────────────────────────────────
Tab order:
1. Store name link
2. Phone number link
3. Website link (if present)
4. Call button
5. View Profile button
6. "Show more" toggle (if present)

Enter key:
├── Activates focused link/button

Escape key:
├── Closes expanded description

COLOR CONTRAST:
─────────────────────────────────────────────────────────────────
All text must meet 4.5:1 ratio (AA)

├── Secondary (#2563eb) on white:    ✓ 16.67:1
├── Grey-600 (#4B5563) on white: ✓ 7.17:1
├── Grey-500 (#6B7280) on white: ✓ 5.36:1
├── Red (#DC2626) on white:      ✓ 4.53:1 (borderline)
├── White on red (#DC2626):      ✓ 4.53:1

SCREEN READER EXPERIENCE:
─────────────────────────────────────────────────────────────────
Announcement order:
1. "Article: Borshch Electric"
2. "Rating: 4.8 out of 5 stars, 342 reviews"
3. "Verified retailer"
4. Store description
5. "Address: Unit 15, Aston Road, Birmingham, B6 4RN"
6. "Phone: 0121 327 1234, link"
7. Categories list
8. Service badges (informational)
9. "Call Borshch Electric, button"
10. "View full profile, link"

═══════════════════════════════════════════════════════════════
```

---

## TypeScript Interfaces

```typescript
TYPESCRIPT INTERFACES — STORE CARD
═══════════════════════════════════════════════════════════════

// types/store-card.ts

/**
 * Store data for card display
 * Subset of full Store interface — only fields needed for cards
 */
export interface StoreCardData {
  // Identity
  id: string;
  slug: string;
  business_name: string;
  trading_name?: string;
  short_description?: string;
  description?: string;
  logo_url?: string;
  year_established?: number;
  
  // Contact
  phone?: string;
  website?: string;
  
  // Location
  address_line1?: string;
  city_name?: string;
  postcode?: string;
  
  // Hours
  operating_hours?: OperatingHours;
  
  // Ratings
  average_rating?: number;
  review_count: number;
  
  // Status
  status: StoreStatus;
  is_featured: boolean;
  
  // Services — Delivery
  offers_delivery: boolean;
  offers_free_delivery: boolean;
  offers_same_day_delivery: boolean;
  offers_next_day_delivery: boolean;
  
  // Services — Installation
  offers_installation: boolean;
  offers_free_installation: boolean;
  installation_cost?: number;
  
  // Services — Other
  offers_old_appliance_removal: boolean;
  offers_weee_recycling: boolean;
  offers_click_collect: boolean;
  offers_repair_service: boolean;
  
  // Warranty
  warranty_months?: number;
  warranty_type?: WarrantyType;
  
  // Finance
  offers_finance: boolean;
  offers_zero_percent_finance: boolean;
  finance_providers?: FinanceProvider[];
  
  // Relations (populated via JOIN)
  categories?: CategorySummary[];
  brands?: BrandSummary[];
  location_count?: number;
}

/**
 * Operating hours structure
 */
export interface OperatingHours {
  monday?: string;    // "09:00 - 17:30"
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;    // "Closed" or null
}

/**
 * Category summary for card display
 */
export interface CategorySummary {
  id: string;
  name: string;
  slug: string;
}

/**
 * Brand summary for card display
 */
export interface BrandSummary {
  id: string;
  name: string;
  slug: string;
}

/**
 * Store status enum
 */
export type StoreStatus = 
  | 'pending' 
  | 'active' 
  | 'claimed' 
  | 'verified' 
  | 'suspended';

/**
 * Warranty type enum
 */
export type WarrantyType = 
  | 'manufacturer' 
  | 'retailer' 
  | 'both' 
  | 'none';

/**
 * Finance provider enum
 */
export type FinanceProvider = 
  | 'klarna' 
  | 'clearpay' 
  | 'paypal-credit' 
  | 'v12-finance' 
  | 'hitachi' 
  | 'other';

/**
 * Store card component props
 */
export interface StoreCardProps {
  /** Store data to display */
  store: StoreCardData;
  
  /** Card variant */
  variant?: 'full' | 'compact' | 'featured' | 'mini';
  
  /** Current page context for tracking */
  pageContext?: {
    pagePath: string;
    pageType: string;
    placeId?: string;
  };
  
  /** Show/hide specific sections */
  showCategories?: boolean;
  showBrands?: boolean;
  showDescription?: boolean;
  showContactInfo?: boolean;
  
  /** Maximum items to show */
  maxCategories?: number;
  maxBrands?: number;
  
  /** Custom class name */
  className?: string;
  
  /** Click handlers (optional overrides) */
  onCallClick?: () => void;
  onProfileClick?: () => void;
  onWebsiteClick?: () => void;
  
  /** Phase 1 Monetization Options */
  showWarrantyAffiliate?: boolean;    // Default: true (if warranty < 12mo)
  showCrossSellRepair?: boolean;      // Default: true (if providers exist)
  providerCount?: number;             // Needed for cross-sell logic
  citySlug?: string;                  // For cross-sell link building
  onAffiliateClick?: (partner: string) => void;
}

/**
 * Affiliate click data for tracking
 */
export interface AffiliateClickData {
  affiliatePartner: 'd&g' | 'ao-care' | 'espares' | 'klarna';
  productType: 'extended_warranty' | 'parts' | 'finance';
  storeId?: string;
  providerId?: string;
  placeId?: string;
  categoryId?: string;
  sourcePage: string;
}

/**
 * Service badge configuration
 */
export interface ServiceBadge {
  id: string;
  icon: string;
  label: string;
  variant: 'default' | 'highlight';
  priority: number;
}

═══════════════════════════════════════════════════════════════
```

---

## React Component Implementation

```tsx
REACT COMPONENT — STORE CARD
═══════════════════════════════════════════════════════════════

// components/store/StoreCard.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { trackClick } from '@/lib/tracking/trackClick';
import { trackAffiliateClick, buildAffiliateLink } from '@/lib/tracking/trackAffiliate';
import { getOpenStatus, getTodayHours } from '@/lib/utils/hours';
import { cn } from '@/lib/utils/cn';
import type { StoreCardProps, ServiceBadge } from '@/types/store-card';

export default function StoreCard({
  store,
  variant = 'full',
  pageContext,
  showCategories = true,
  showBrands = true,
  showDescription = true,
  showContactInfo = true,
  maxCategories = 6,
  maxBrands = 7,
  className,
  onCallClick,
  onProfileClick,
  onWebsiteClick,
  // Phase 1 Monetization props
  showWarrantyAffiliate = true,
  showCrossSellRepair = true,
  providerCount,
  citySlug,
  onAffiliateClick,
}: StoreCardProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  // Determine if store is verified
  const isVerified = store.status === 'verified';
  
  // Determine open/closed status
  const openStatus = useMemo(() => 
    store.operating_hours ? getOpenStatus(store.operating_hours) : null,
    [store.operating_hours]
  );
  
  // Build service badges
  const serviceBadges = useMemo(() => buildServiceBadges(store), [store]);
  
  // Build additional services list
  const additionalServices = useMemo(() => buildAdditionalServices(store), [store]);
  
  // Handle call click with tracking
  const handleCallClick = () => {
    trackClick('call_click', {
      subjectType: 'store',
      subjectId: store.id,
      pagePath: pageContext?.pagePath,
      pageType: pageContext?.pageType,
      placeId: pageContext?.placeId,
    });
    onCallClick?.();
  };
  
  // Handle profile click with tracking
  const handleProfileClick = () => {
    trackClick('profile_view', {
      subjectType: 'store',
      subjectId: store.id,
      pagePath: pageContext?.pagePath,
      pageType: pageContext?.pageType,
    });
    onProfileClick?.();
  };
  
  // Handle website click with tracking
  const handleWebsiteClick = () => {
    trackClick('website_click', {
      subjectType: 'store',
      subjectId: store.id,
      pagePath: pageContext?.pagePath,
      destinationUrl: store.website,
    });
    onWebsiteClick?.();
  };
  
  // Handle affiliate click with tracking (Phase 1 Monetization)
  const handleAffiliateClick = (partner: string, productType: string) => {
    trackClick('affiliate_click', {
      subjectType: 'store',
      subjectId: store.id,
      pagePath: pageContext?.pagePath,
      affiliatePartner: partner,
    });
    // Also log to affiliate_clicks table for revenue tracking
    trackAffiliateClick({
      affiliatePartner: partner as any,
      productType: productType as any,
      storeId: store.id,
      placeId: pageContext?.placeId,
      sourcePage: pageContext?.pagePath || '',
    });
    onAffiliateClick?.(partner);
  };
  
  // Track cross-sell clicks (Phase 1 Monetization)
  const trackCrossSell = (direction: 'retail_to_repair' | 'repair_to_retail') => {
    trackClick('profile_view', {
      subjectType: 'store',
      subjectId: store.id,
      pagePath: pageContext?.pagePath,
    });
    // Log user intent for analytics
    fetch('/api/track-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent_type: 'need_repair',
        store_id: store.id,
        context: direction,
      }),
    }).catch(() => {});
  };
  
  // Render based on variant
  if (variant === 'mini') {
    return <StoreCardMini store={store} onProfileClick={handleProfileClick} />;
  }
  
  if (variant === 'compact') {
    return (
      <StoreCardCompact 
        store={store} 
        isVerified={isVerified}
        onProfileClick={handleProfileClick}
        className={className}
      />
    );
  }
  
  // Full and Featured variants
  const isFeatured = variant === 'featured' || store.is_featured;
  
  return (
    <article
      className={cn(
        'relative bg-white rounded-xl border transition-all duration-200',
        'hover:shadow-lg hover:-translate-y-0.5',
        isFeatured 
          ? 'border-2 border-amber-500 bg-gradient-to-b from-amber-50 to-white' 
          : 'border-gray-200',
        className
      )}
      aria-labelledby={`store-name-${store.id}`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute -top-3 right-4 bg-amber-500 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
          ★ FEATURED
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        {/* Header: Logo + Name + Rating */}
        <div className="flex gap-4 mb-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {store.logo_url ? (
              <Image
                src={store.logo_url}
                alt={`${store.business_name} logo`}
                width={80}
                height={80}
                className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-lg object-contain bg-gray-50"
              />
            ) : (
              <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-secondary">
                  {store.business_name.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          {/* Name, Rating, Badges */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-2 mb-1">
              <Link
                href={`/store/${store.slug}/`}
                onClick={handleProfileClick}
                id={`store-name-${store.id}`}
                className="text-lg sm:text-xl font-bold text-secondary hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 rounded"
              >
                {store.business_name}
              </Link>
              
              {isVerified && (
                <span 
                  className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 border border-green-500 rounded"
                  aria-label="Verified retailer"
                >
                  ✓ Verified
                </span>
              )}
            </div>
            
            {/* Rating */}
            {store.average_rating && (
              <div 
                className="flex items-center gap-1 text-gray-700 mb-1"
                aria-label={`Rating: ${store.average_rating} out of 5 stars, ${store.review_count} reviews`}
              >
                <span className="text-base sm:text-lg font-bold">
                  ⭐ {store.average_rating.toFixed(1)}
                </span>
                {store.review_count > 0 && (
                  <span className="text-sm text-gray-500">
                    ({store.review_count})
                  </span>
                )}
              </div>
            )}
            
            {/* Established & Locations */}
            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
              {store.year_established && store.year_established > 1900 && (
                <span>Est. {store.year_established}</span>
              )}
              {store.location_count && store.location_count > 1 && (
                <span>• {store.location_count} locations</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Description */}
        {showDescription && (store.short_description || store.description) && (
          <div className="mb-4">
            <p className={cn(
              'text-sm text-gray-600 leading-relaxed',
              !isDescriptionExpanded && 'line-clamp-2 sm:line-clamp-3'
            )}>
              {store.short_description || store.description}
            </p>
            {(store.description?.length || 0) > 150 && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-sm text-secondary font-medium mt-1 hover:underline"
                aria-expanded={isDescriptionExpanded}
              >
                {isDescriptionExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        )}
        
        {/* Contact Info Box */}
        {showContactInfo && (store.address_line1 || store.phone) && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {store.address_line1 && (
                <div className="flex items-start gap-2">
                  <span className="text-base">📍</span>
                  <span className="text-gray-700">
                    {store.address_line1}
                    {store.city_name && `, ${store.city_name}`}
                    {store.postcode && ` (${store.postcode})`}
                  </span>
                </div>
              )}
              
              {store.phone && (
                <a
                  href={`tel:${store.phone}`}
                  onClick={handleCallClick}
                  className="flex items-center gap-2 text-gray-700 hover:text-secondary"
                  aria-label={`Call ${store.business_name} at ${store.phone}`}
                >
                  <span className="text-base">📞</span>
                  <span>{store.phone}</span>
                </a>
              )}
              
              {openStatus && (
                <div className="flex items-center gap-2">
                  <span className="text-base">🕐</span>
                  <span className={cn(
                    'font-medium',
                    openStatus.isOpen ? 'text-green-600' : 'text-gray-500'
                  )}>
                    {openStatus.isOpen ? `Open until ${openStatus.closingTime}` : 'Closed'}
                  </span>
                </div>
              )}
              
              {store.website && (
                <a
                  href={store.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWebsiteClick}
                  className="flex items-center gap-2 text-gray-700 hover:text-secondary"
                >
                  <span className="text-base">🌐</span>
                  <span className="truncate">
                    {new URL(store.website).hostname.replace('www.', '')}
                  </span>
                </a>
              )}
            </div>
          </div>
        )}
        
        {/* Categories */}
        {showCategories && store.categories && store.categories.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              What They Stock
            </h4>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-700">
              {store.categories.slice(0, maxCategories).map((cat) => (
                <span key={cat.id} className="flex items-center gap-1">
                  <span className="text-green-600">✓</span> {cat.name}
                </span>
              ))}
              {store.categories.length > maxCategories && (
                <span className="text-gray-500">
                  +{store.categories.length - maxCategories} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Brands */}
        {showBrands && store.brands && store.brands.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Top Brands
            </h4>
            <p className="text-sm text-gray-700">
              {store.brands.slice(0, maxBrands).map(b => b.name).join(' • ')}
              {store.brands.length > maxBrands && ` +${store.brands.length - maxBrands} more`}
            </p>
          </div>
        )}
        
        {/* Service Badges */}
        {serviceBadges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {serviceBadges.map((badge) => (
              <span
                key={badge.id}
                className={cn(
                  'inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium',
                  badge.variant === 'highlight' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                )}
              >
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </span>
            ))}
          </div>
        )}
        
        {/* Additional Services */}
        {additionalServices.length > 0 && (
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium">🔧 Also offers:</span>{' '}
            {additionalServices.join(' • ')}
          </p>
        )}
        
        {/* Phase 1 Monetization: Warranty Affiliate Prompt */}
        {showWarrantyAffiliate !== false && shouldShowWarrantyPrompt(store) && (
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-sky-900">
                🛡️ Protect your graded appliance from £3.50/month
              </span>
              <a
                href={buildAffiliateLink('d&g', store.id)}
                target="_blank"
                rel="noopener sponsored"
                onClick={() => handleAffiliateClick('d&g', 'extended_warranty')}
                className="text-sm text-sky-700 font-medium hover:underline whitespace-nowrap"
              >
                Get Cover →
              </a>
            </div>
          </div>
        )}
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          {store.phone && (
            <a
              href={`tel:${store.phone}`}
              onClick={handleCallClick}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Call ${store.business_name}`}
            >
              <span>📞</span>
              <span>Call Now</span>
            </a>
          )}
          
          <Link
            href={`/store/${store.slug}/`}
            onClick={handleProfileClick}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-secondary font-semibold border border-secondary rounded-lg hover:bg-secondary hover:text-white active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            aria-label={`View full profile for ${store.business_name}`}
          >
            <span>View Full Profile</span>
            <span>→</span>
          </Link>
        </div>
        
        {/* Phase 1 Monetization: Cross-Sell to Repair */}
        {showCrossSellRepair !== false && providerCount && providerCount > 0 && citySlug && (
          <div className="border-t border-gray-200 pt-3 mt-4">
            <Link
              href={`/england/${citySlug}/#repairs`}
              className="text-sm text-gray-500 hover:text-secondary"
              onClick={() => trackCrossSell('retail_to_repair')}
            >
              🔧 Not sure you need a new one? Compare repair options →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

/**
 * Check if warranty affiliate prompt should show
 * Show when warranty is weak or missing
 */
function shouldShowWarrantyPrompt(store: StoreCardData): boolean {
  // Show if warranty < 12 months or not specified
  if (!store.warranty_months || store.warranty_months < 12) {
    return true;
  }
  // Show if only retailer warranty (not manufacturer)
  if (store.warranty_type === 'retailer') {
    return true;
  }
  return false;
}

/**
 * Build service badges based on store data
 */
function buildServiceBadges(store: StoreCardData): ServiceBadge[] {
  const badges: ServiceBadge[] = [];
  
  // Delivery
  if (store.offers_free_delivery) {
    badges.push({ id: 'delivery', icon: '🚚', label: 'Free Delivery', variant: 'highlight', priority: 1 });
  } else if (store.offers_delivery) {
    badges.push({ id: 'delivery', icon: '🚚', label: 'Delivery', variant: 'default', priority: 1 });
  }
  
  // Same-day
  if (store.offers_same_day_delivery) {
    badges.push({ id: 'sameday', icon: '⚡', label: 'Same-day', variant: 'highlight', priority: 2 });
  }
  
  // Warranty
  if (store.warranty_months && store.warranty_months >= 6) {
    badges.push({ 
      id: 'warranty', 
      icon: '📋', 
      label: `${store.warranty_months}-Month Warranty`, 
      variant: 'default', 
      priority: 3 
    });
  }
  
  // Finance
  if (store.offers_zero_percent_finance) {
    badges.push({ id: 'finance', icon: '💳', label: '0% Finance', variant: 'highlight', priority: 4 });
  } else if (store.offers_finance) {
    const provider = store.finance_providers?.[0];
    const providerLabel = provider ? ` (${capitalizeFirst(provider)})` : '';
    badges.push({ id: 'finance', icon: '💳', label: `Finance${providerLabel}`, variant: 'default', priority: 4 });
  }
  
  // Recycling
  if (store.offers_weee_recycling) {
    badges.push({ id: 'recycling', icon: '♻️', label: 'Recycling', variant: 'default', priority: 5 });
  }
  
  // Click & Collect
  if (store.offers_click_collect) {
    badges.push({ id: 'clickcollect', icon: '🏪', label: 'Click & Collect', variant: 'default', priority: 6 });
  }
  
  // Repairs
  if (store.offers_repair_service) {
    badges.push({ id: 'repairs', icon: '🔧', label: 'Repairs', variant: 'default', priority: 7 });
  }
  
  // Sort by priority and limit to 5
  return badges.sort((a, b) => a.priority - b.priority).slice(0, 5);
}

/**
 * Build additional services list
 */
function buildAdditionalServices(store: StoreCardData): string[] {
  const services: string[] = [];
  
  if (store.offers_installation) {
    if (store.offers_free_installation) {
      services.push('Installation (Free)');
    } else if (store.installation_cost) {
      services.push(`Installation (£${store.installation_cost})`);
    } else {
      services.push('Installation');
    }
  }
  
  if (store.offers_old_appliance_removal) {
    services.push('Old Appliance Removal');
  }
  
  return services;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
}

═══════════════════════════════════════════════════════════════
```

---

## Compact Variant Implementation

```tsx
COMPACT VARIANT COMPONENT
═══════════════════════════════════════════════════════════════

// components/store/StoreCardCompact.tsx

interface StoreCardCompactProps {
  store: StoreCardData;
  isVerified: boolean;
  onProfileClick: () => void;
  className?: string;
}

function StoreCardCompact({ 
  store, 
  isVerified, 
  onProfileClick,
  className 
}: StoreCardCompactProps) {
  return (
    <article
      className={cn(
        'flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200',
        'hover:shadow-md transition-shadow',
        className
      )}
      aria-labelledby={`store-compact-${store.id}`}
    >
      {/* Logo */}
      {store.logo_url ? (
        <Image
          src={store.logo_url}
          alt=""
          width={48}
          height={48}
          className="w-12 h-12 rounded-lg object-contain bg-gray-50 flex-shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-secondary">
            {store.business_name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Link
            href={`/store/${store.slug}/`}
            onClick={onProfileClick}
            id={`store-compact-${store.id}`}
            className="font-semibold text-secondary hover:underline truncate"
          >
            {store.business_name}
          </Link>
          {isVerified && (
            <span className="text-green-600 text-xs">✓</span>
          )}
        </div>
        
        {store.average_rating && (
          <div className="text-sm text-gray-600 mb-0.5">
            ⭐ {store.average_rating.toFixed(1)}
            {store.review_count > 0 && ` (${store.review_count})`}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          {store.city_name}
          {store.warranty_months && store.warranty_months >= 6 && (
            <span> • {store.warranty_months}mo warranty</span>
          )}
        </div>
      </div>
      
      {/* Action */}
      <Link
        href={`/store/${store.slug}/`}
        onClick={onProfileClick}
        className="flex-shrink-0 text-sm text-secondary font-medium hover:underline"
      >
        View →
      </Link>
    </article>
  );
}

export { StoreCardCompact };

═══════════════════════════════════════════════════════════════
```

---

## Mini Variant Implementation

```tsx
MINI VARIANT COMPONENT
═══════════════════════════════════════════════════════════════

// components/store/StoreCardMini.tsx

interface StoreCardMiniProps {
  store: StoreCardData;
  onProfileClick: () => void;
}

function StoreCardMini({ store, onProfileClick }: StoreCardMiniProps) {
  return (
    <div className="flex items-center gap-2 p-2 max-w-[280px]">
      {store.logo_url ? (
        <Image
          src={store.logo_url}
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded object-contain bg-gray-50"
        />
      ) : (
        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
          <span className="text-xs font-bold text-secondary">
            {store.business_name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <Link
          href={`/store/${store.slug}/`}
          onClick={onProfileClick}
          className="font-medium text-sm text-secondary hover:underline block truncate"
        >
          {store.business_name}
        </Link>
        <div className="text-xs text-gray-500">
          {store.average_rating && `⭐ ${store.average_rating.toFixed(1)}`}
          {store.city_name && ` • ${store.city_name}`}
        </div>
      </div>
    </div>
  );
}

export { StoreCardMini };

═══════════════════════════════════════════════════════════════
```

---

## Utility Functions

```typescript
UTILITY FUNCTIONS — STORE CARD
═══════════════════════════════════════════════════════════════

// lib/utils/hours.ts

import type { OperatingHours } from '@/types/store-card';

interface OpenStatus {
  isOpen: boolean;
  closingTime?: string;
  nextOpenTime?: string;
}

/**
 * Get current open/closed status based on operating hours
 */
export function getOpenStatus(hours: OperatingHours): OpenStatus {
  const now = new Date();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = dayNames[now.getDay()] as keyof OperatingHours;
  
  const todayHours = hours[today];
  
  if (!todayHours || todayHours.toLowerCase() === 'closed') {
    return { isOpen: false };
  }
  
  // Parse hours like "09:00 - 17:30"
  const match = todayHours.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
  if (!match) {
    return { isOpen: false };
  }
  
  const [, openHour, openMin, closeHour, closeMin] = match;
  const openTime = parseInt(openHour) * 60 + parseInt(openMin);
  const closeTime = parseInt(closeHour) * 60 + parseInt(closeMin);
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const isOpen = currentTime >= openTime && currentTime < closeTime;
  
  return {
    isOpen,
    closingTime: isOpen ? `${closeHour}:${closeMin}` : undefined,
  };
}

/**
 * Get today's hours as a string
 */
export function getTodayHours(hours: OperatingHours): string | null {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = dayNames[new Date().getDay()] as keyof OperatingHours;
  return hours[today] || null;
}

// lib/utils/cn.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

═══════════════════════════════════════════════════════════════
```

---

## Data Fetching Query

```typescript
DATA FETCHING — STORE CARD LIST
═══════════════════════════════════════════════════════════════

// lib/stores/getStoresForCity.ts

import { createClient } from '@/lib/supabase/server';
import type { StoreCardData } from '@/types/store-card';

export async function getStoresForCity(placeId: string): Promise<StoreCardData[]> {
  const supabase = createClient();
  
  const { data: stores, error } = await supabase
    .from('stores')
    .select(`
      id,
      slug,
      business_name,
      trading_name,
      short_description,
      description,
      logo_url,
      year_established,
      phone,
      website,
      address_line1,
      city_name,
      postcode,
      operating_hours,
      average_rating,
      review_count,
      status,
      is_featured,
      offers_delivery,
      offers_free_delivery,
      offers_same_day_delivery,
      offers_next_day_delivery,
      offers_installation,
      offers_free_installation,
      installation_cost,
      offers_old_appliance_removal,
      offers_weee_recycling,
      offers_click_collect,
      offers_repair_service,
      warranty_months,
      warranty_type,
      offers_finance,
      offers_zero_percent_finance,
      finance_providers,
      store_categories (
        appliance_categories (
          id,
          name,
          slug
        )
      ),
      store_brands (
        brands (
          id,
          name,
          slug
        )
      )
    `)
    .eq('place_id', placeId)
    .eq('is_active', true)
    .in('status', ['active', 'claimed', 'verified'])
    .order('is_featured', { ascending: false })
    .order('overall_score', { ascending: false });
  
  if (error) {
    console.error('Error fetching stores:', error);
    return [];
  }
  
  // Transform the data to flatten nested relations
  return (stores || []).map(store => ({
    ...store,
    categories: store.store_categories
      ?.map((sc: any) => sc.appliance_categories)
      .filter(Boolean) || [],
    brands: store.store_brands
      ?.map((sb: any) => sb.brands)
      .filter(Boolean) || [],
  }));
}

═══════════════════════════════════════════════════════════════
```

---

## Component File Structure

```
COMPONENT FILE STRUCTURE
═══════════════════════════════════════════════════════════════

components/
└── store/
    ├── StoreCard.tsx           # Main component (all variants)
    ├── StoreCardCompact.tsx    # Compact variant (extracted)
    ├── StoreCardMini.tsx       # Mini variant (extracted)
    ├── StoreCardSkeleton.tsx   # Loading skeleton
    └── index.ts                # Barrel exports

lib/
├── stores/
│   ├── getStoresForCity.ts     # Fetch stores by city
│   ├── getStoresByCategory.ts  # Fetch by category
│   └── getStoresByBrand.ts     # Fetch by brand
├── tracking/
│   └── trackClick.ts           # Click event logging
└── utils/
    ├── hours.ts                # Operating hours utilities
    └── cn.ts                   # Class name utility

types/
└── store-card.ts               # TypeScript interfaces

═══════════════════════════════════════════════════════════════
```

---

## Performance Optimizations

```
PERFORMANCE — STORE CARD
═══════════════════════════════════════════════════════════════

IMAGE LOADING:
├── Use Next.js Image component
├── Lazy load logos (loading="lazy")
├── Placeholder blur for logos
├── Serve WebP format via CDN
├── Sizes: 80×80, 60×60, 48×48, 32×32

RENDERING:
├── useMemo for derived data (badges, services)
├── Avoid inline object creation in props
├── Extract pure components (badges, buttons)
├── Use CSS containment: content-visibility

INTERACTION:
├── Debounce click tracking (100ms)
├── Fire-and-forget tracking (no await)
├── Optimistic UI for expand/collapse

LIST RENDERING:
├── Use React.memo on StoreCard
├── Key by store.id (stable)
├── Virtual scrolling for 50+ items (react-window)

CSS:
├── Purge unused Tailwind classes
├── Critical CSS inline
├── No layout shift (set explicit dimensions)

═══════════════════════════════════════════════════════════════
```

---

## Testing Requirements

```
TESTING — STORE CARD
═══════════════════════════════════════════════════════════════

UNIT TESTS (Jest + React Testing Library):
─────────────────────────────────────────────────────────────────
├── Renders store name correctly
├── Renders rating when present
├── Hides rating when null
├── Shows verified badge when status = 'verified'
├── Shows featured styling when is_featured = true
├── Truncates description to 3 lines
├── Expands description on "Show more" click
├── Builds correct service badges
├── Limits categories to maxCategories
├── Limits brands to maxBrands
├── Phone link has correct href
├── Profile link has correct href
├── Website link opens in new tab

INTEGRATION TESTS:
─────────────────────────────────────────────────────────────────
├── Click tracking fires on Call button
├── Click tracking fires on Profile link
├── Click tracking fires on Website link
├── Compact variant renders correctly
├── Mini variant renders correctly
├── Featured variant has correct styling

MONETIZATION TESTS (Phase 1):
─────────────────────────────────────────────────────────────────
├── Warranty prompt shows when warranty_months < 12
├── Warranty prompt hides when warranty_months >= 12 AND manufacturer
├── Affiliate click tracking fires correctly
├── Affiliate link includes correct tracking parameters
├── Cross-sell link shows when providerCount > 0
├── Cross-sell link hides when providerCount = 0
├── Cross-sell tracking fires correctly

ACCESSIBILITY TESTS (jest-axe):
─────────────────────────────────────────────────────────────────
├── No accessibility violations
├── All interactive elements focusable
├── ARIA labels present
├── Color contrast passes

VISUAL REGRESSION (Chromatic/Percy):
─────────────────────────────────────────────────────────────────
├── Full variant - desktop
├── Full variant - mobile
├── Compact variant
├── Mini variant
├── Featured variant
├── Hover states
├── Focus states

═══════════════════════════════════════════════════════════════
```

---

## Implementation Checklist

### Phase 1: Core Component
- [ ] TypeScript interfaces defined
- [ ] Base StoreCard component
- [ ] Logo with placeholder fallback
- [ ] Name link with tracking
- [ ] Rating display
- [ ] Verified badge
- [ ] Featured badge

### Phase 2: Body Content
- [ ] Description with expand/collapse
- [ ] Contact info box
- [ ] Categories list
- [ ] Brands list
- [ ] Service badges builder

### Phase 3: CTAs & Tracking
- [ ] Call button with tracking
- [ ] View Profile button with tracking
- [ ] Website link with tracking
- [ ] trackClick utility function

### Phase 4: Variants
- [ ] Compact variant
- [ ] Mini variant
- [ ] Featured styling
- [ ] Skeleton loader

### Phase 5: Mobile Optimization
- [ ] Responsive breakpoints
- [ ] Touch targets (48px minimum)
- [ ] Full-width buttons
- [ ] Horizontal badge scroll

### Phase 6: Testing & Polish
- [ ] Unit tests
- [ ] Accessibility audit
- [ ] Performance audit
- [ ] Visual regression tests

### Phase 7: Monetization Integration (v1.1)
- [ ] Warranty affiliate prompt component
- [ ] shouldShowWarrantyPrompt logic
- [ ] trackAffiliateClick function
- [ ] buildAffiliateLink utility
- [ ] Cross-sell link to repair
- [ ] trackCrossSell function
- [ ] Affiliate tracking tests

---

## Usage Examples

```tsx
USAGE EXAMPLES
═══════════════════════════════════════════════════════════════

// City Page — Full variant with monetization
import StoreCard from '@/components/store/StoreCard';

{stores.map((store) => (
  <StoreCard
    key={store.id}
    store={store}
    variant="full"
    pageContext={{
      pagePath: `/england/birmingham/`,
      pageType: 'city_hub',
      placeId: cityId,
    }}
    // Phase 1 Monetization props
    providerCount={cityData.provider_count}  // For cross-sell
    citySlug="birmingham"                     // For cross-sell link
    showWarrantyAffiliate={true}              // Show warranty D&G prompt
    showCrossSellRepair={true}                // Show "prefer to repair?" link
  />
))}

// Category Page — Full variant with filter
{filteredStores.map((store) => (
  <StoreCard
    key={store.id}
    store={store}
    variant="full"
    showBrands={false}  // Hide brands on category page
    pageContext={{
      pagePath: `/england/birmingham/washing-machines/`,
      pageType: 'category',
      placeId: cityId,
    }}
    providerCount={cityData.provider_count}
    citySlug="birmingham"
  />
))}

// Other Stores Section — Compact variant (no monetization prompts)
<div className="space-y-3">
  <h3>Other Stores in Manchester</h3>
  {otherStores.map((store) => (
    <StoreCard
      key={store.id}
      store={store}
      variant="compact"
      showWarrantyAffiliate={false}  // Clean compact cards
      showCrossSellRepair={false}
    />
  ))}
</div>

// Map Popup — Mini variant
<MapPopup>
  <StoreCard store={hoveredStore} variant="mini" />
</MapPopup>

═══════════════════════════════════════════════════════════════
```

---

**END OF STORE CARD COMPONENT SPECIFICATION**

═══════════════════════════════════════════════════════════════
Document Status: ✅ LOCKED
Version: 1.1 (Phase 1 Monetization Added)
Approved: January 2026
Next: Provider Card Specification
═══════════════════════════════════════════════════════════════
