# Provider Profile Page Specification

**Version:** 1.2 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED  
**v1.1 Amendment:** Service Area Business (SAB) Schema Compliance  
**v1.2 Amendment:** Entity Authority via Schema.org sameAs — TikTok + Companies House integration for E-E-A-T

---

## Executive Summary

The Provider Profile Page is the **conversion destination** for repair engineers. Unlike category pages (which attract organic traffic), this page is where users make the final decision to call. Every element must build trust and enable action.

### Strategic Role

| Role | Purpose |
|------|---------|
| **Conversion Surface** | Final decision point before call |
| **Trust Builder** | Expanded certifications, reviews, coverage |
| **Entity Page** | Strengthens provider's web presence |
| **Monetization Hub** | Warranty affiliate (D&G), parts affiliate |
| **AI Citation Target** | Structured data for AI assistants |

### URL Pattern

```
PROVIDER PROFILE URL
═══════════════════════════════════════════════════════════════

PATTERN:    /provider/{slug}/

EXAMPLES:
├── /provider/midlands-appliance-repairs/
├── /provider/quick-fix-birmingham/
├── /provider/bosch-authorised-manchester/
└── /provider/joes-domestic-appliance-service/

SLUG RULES:
├── Generated from provider name (+ city if needed for uniqueness)
├── Lowercase, hyphens only
├── Max 60 characters
├── No special characters
├── Unique across all providers

═══════════════════════════════════════════════════════════════
```

### User Journey Context

```
USER JOURNEY TO PROVIDER PROFILE
═══════════════════════════════════════════════════════════════

Broken appliance (urgent need)
    ↓
Search: "washing machine repair manchester"
    ↓
Lands on: Repair Category Page (/england/manchester/washing-machine-repair/)
    ↓
Scans: Provider Cards, filters by same-day
    ↓
Clicks: "View Full Profile" or provider name
    ↓
THIS PAGE: Provider Profile (/provider/midlands-appliance-repairs/)
    ↓
Decision: Reviews look good, Gas Safe certified, same-day available
    ↓
ACTION: 📞 CALL NOW

═══════════════════════════════════════════════════════════════
```

### Key Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Conversion-First** | Call button above the fold, sticky on mobile |
| **Trust-Heavy** | Expanded certifications, reviews prominently displayed |
| **Mobile-Optimized** | 70%+ traffic is mobile, one-tap calling |
| **AI-Extractable** | Structured data, clear facts, Schema.org |
| **Monetization-Ready** | Warranty affiliate optimal placement |
| **SAB Schema Compliant** | (v1.1) GeoCircle for service areas, address hiding for mobile engineers |

---

## Page Connections

```
PAGE CONNECTION MAP — PROVIDER PROFILE
═══════════════════════════════════════════════════════════════

INBOUND LINKS (from):
─────────────────────────────────────────────────────────────────

Provider Card (Spec 09) — on any page
├── Provider name link → /provider/{slug}/
├── "View Full Profile" button → /provider/{slug}/
├── Logo click → /provider/{slug}/
├── Click tracking: profile_view event

Repair Category Page (Spec 10)
├── /england/manchester/washing-machine-repair/
├── Provider Card listings → /provider/{slug}/

City Hub (Spec 07)
├── /england/manchester/
├── Repair section preview cards → /provider/{slug}/

Search Results
├── Provider search results → /provider/{slug}/

Brand Repair Page (Phase 2)
├── /england/manchester/bosch-repair/
├── Brand-authorized provider list → /provider/{slug}/

OUTBOUND LINKS (to):
─────────────────────────────────────────────────────────────────

Repair Category Pages
├── Breadcrumb (optional): Manchester > Washing Machine Repair
├── "Appliances We Repair" section:
│   ├── "Washing Machine Repair" → /england/manchester/washing-machine-repair/
│   ├── "Fridge Freezer Repair" → /england/manchester/fridge-freezer-repair/
│   └── (Each category links to city-specific repair page)

City Hub
├── Breadcrumb: England > Manchester → /england/manchester/
├── Coverage area primary city link
├── "Other providers in Manchester" → /england/manchester/#repairs

Brand Repair Pages (Phase 2)
├── Authorized brands section:
│   ├── "Bosch Authorized" → /england/manchester/bosch-repair/
│   ├── "Samsung Authorized" → /england/manchester/samsung-repair/

Guides
├── Common issues section:
│   ├── "Washing machine not spinning" → /guides/washing-machine-not-spinning/
│   ├── "Fridge not cooling" → /guides/fridge-not-cooling/

External Links (tracked)
├── Provider website → trackClick('website_click')
├── Google Maps directions
├── Gas Safe Register verification
├── Checkatrade profile
├── Facebook page

Affiliate Links (tracked)
├── D&G Warranty → trackAffiliate('dg', 'warranty')
├── eSpares Parts → trackAffiliate('espares', 'parts')
├── AO Care → trackAffiliate('ao', 'warranty')

Internal Cross-sell
├── "Appliance beyond repair?" → /england/manchester/washing-machines/
├── "Other providers" → /england/manchester/#repairs

═══════════════════════════════════════════════════════════════
```

---

## Data Schema Reference

```
SERVICE_PROVIDERS TABLE — ALL FIELDS
═══════════════════════════════════════════════════════════════

CORE IDENTITY:
─────────────────────────────────────────────────────────────
id                          UUID          Primary key
slug                        VARCHAR(255)  URL segment
name                        VARCHAR(255)  Business name
trading_name                VARCHAR(255)  Alternative name

CONTACT (phone is PRIMARY CTA):
─────────────────────────────────────────────────────────────
phone                       VARCHAR(50)   *** REQUIRED ***
phone_secondary             VARCHAR(50)   Alternative number
email                       VARCHAR(255)  Contact email
website                     VARCHAR(500)  Business website

SOCIAL & ENTITY VERIFICATION (v1.2 Enhanced):
─────────────────────────────────────────────────────────────
facebook_url                VARCHAR(500)  Facebook page
tiktok_url                  VARCHAR(500)  TikTok profile (v1.2)
google_maps_url             VARCHAR(500)  Google Maps link

ADDRESS (primary base):
─────────────────────────────────────────────────────────────
address_line1               VARCHAR(255)  Street address
address_line2               VARCHAR(255)  Additional line
city_name                   VARCHAR(200)  City/town
postcode                    VARCHAR(20)   Postcode
latitude                    NUMERIC       For map embed
longitude                   NUMERIC       For map embed

SERVICE AREA BUSINESS (SAB) FIELDS (v1.1):
─────────────────────────────────────────────────────────────
business_location_type      ENUM          'service_area' | 'storefront' | 'both'
                                          DEFAULT 'service_area'
                                          *** CRITICAL FOR SCHEMA OUTPUT ***
service_radius_miles        INTEGER       Service coverage radius (default 20)
                                          Used for GeoCircle in Schema.org

BUSINESS DETAILS:
─────────────────────────────────────────────────────────────
description                 TEXT          Full description
short_description           VARCHAR(500)  Tagline/summary
operating_hours             JSONB         Opening times
years_trading               INTEGER       Experience
number_of_engineers         INTEGER       Team size
company_number              VARCHAR(20)   Companies House
vat_number                  VARCHAR(20)   VAT registration

PRICING:
─────────────────────────────────────────────────────────────
callout_fee_from            NUMERIC       Min callout fee
callout_fee_to              NUMERIC       Max callout fee
no_fix_no_fee               BOOLEAN       Policy flag
free_quotes                 BOOLEAN       Free estimates

AVAILABILITY:
─────────────────────────────────────────────────────────────
offers_same_day             BOOLEAN       Same-day callouts
offers_next_day             BOOLEAN       Next-day available
offers_emergency            BOOLEAN       24/7 emergency
offers_weekend              BOOLEAN       Weekend slots
offers_evening              BOOLEAN       Evening slots
typical_response_time       VARCHAR       "Usually within 2 hours"

CERTIFICATIONS & TRUST (UK-specific):
─────────────────────────────────────────────────────────────
gas_safe_registered         BOOLEAN       Gas Safe badge
gas_safe_number             VARCHAR(50)   Registration number
gas_safe_expiry             DATE          Expiry date
fgas_certified              BOOLEAN       F-Gas for fridges
which_trusted_trader        BOOLEAN       Which? endorsement
checkatrade_member          BOOLEAN       Checkatrade badge
checkatrade_id              VARCHAR(50)   Checkatrade ID
trustatrader_member         BOOLEAN       Trustatrader badge
public_liability_insurance  BOOLEAN       Insurance coverage
insurance_amount            NUMERIC       Coverage amount

WARRANTY ON REPAIRS:
─────────────────────────────────────────────────────────────
warranty_on_repairs_months  INTEGER       e.g., 6 or 12
warranty_on_parts_months    INTEGER       Parts warranty
uses_genuine_parts          BOOLEAN       OEM parts policy

RATINGS:
─────────────────────────────────────────────────────────────
average_rating              NUMERIC(3,2)  e.g., 4.85
review_count                INTEGER       Total reviews

MEDIA:
─────────────────────────────────────────────────────────────
logo_url                    VARCHAR(500)  Business logo
cover_image_url             VARCHAR(500)  Hero image

SCORING:
─────────────────────────────────────────────────────────────
completeness_score          INTEGER       Profile completeness
freshness_score             INTEGER       Last update recency
rating_score                INTEGER       Rating-based score
provider_score              INTEGER       Combined score (computed)

SEO:
─────────────────────────────────────────────────────────────
seo_title                   VARCHAR(255)  Custom title override
seo_meta_description        TEXT          Custom meta override
schema_json                 JSONB         Pre-built schema

STATUS:
─────────────────────────────────────────────────────────────
status                      ENUM          pending/active/claimed/verified
is_active                   BOOLEAN       Currently active
is_verified                 BOOLEAN       Verified by us
is_featured                 BOOLEAN       Featured listing
is_indexable                BOOLEAN       Allow indexing
last_verified_at            TIMESTAMPTZ   Last verification
claimed_by_owner            BOOLEAN       Owner has claimed

═══════════════════════════════════════════════════════════════
```

### Junction Tables

```
JUNCTION TABLES — PROVIDER RELATIONS
═══════════════════════════════════════════════════════════════

1. PROVIDER_SERVICES (Appliances they repair)
─────────────────────────────────────────────────────────────
provider_id                 UUID          → service_providers
appliance_category_id       UUID          → appliance_categories
is_active                   BOOLEAN       Currently offering
offers_same_day             BOOLEAN       Override for this category
offers_next_day             BOOLEAN       Override
emergency_callout           BOOLEAN       Emergency for this category
callout_fee_min             NUMERIC       Category-specific min
callout_fee_max             NUMERIC       Category-specific max
repair_warranty_months      INTEGER       Category-specific warranty
notes                       TEXT          Category notes

2. PROVIDER_COVERAGE_PLACES (Service areas)
─────────────────────────────────────────────────────────────
provider_id                 UUID          → service_providers
place_id                    UUID          → places
is_primary                  BOOLEAN       Main location
additional_callout_fee      NUMERIC       Extra fee for this area
same_day_available          BOOLEAN       Same-day for this area
notes                       TEXT          Coverage notes

3. PROVIDER_BRAND_AUTHORISATIONS (Authorized brands)
─────────────────────────────────────────────────────────────
provider_id                 UUID          → service_providers
brand_id                    UUID          → brands
authorisation_type          VARCHAR       "Authorized", "Certified"
certificate_number          VARCHAR       Certificate reference
valid_from                  DATE          Authorization start
valid_until                 DATE          Authorization expiry
is_verified                 BOOLEAN       Verified by us

═══════════════════════════════════════════════════════════════
```

### Reviews Table

```
REVIEWS TABLE — PROVIDER REVIEWS
═══════════════════════════════════════════════════════════════

POLYMORPHIC REFERENCE:
─────────────────────────────────────────────────────────────
subject_type                ENUM          'provider'
subject_id                  UUID          provider.id

REVIEW CONTENT:
─────────────────────────────────────────────────────────────
rating                      INTEGER       1-5 stars
title                       VARCHAR(255)  Review headline
content                     TEXT          Full review text

REVIEWER:
─────────────────────────────────────────────────────────────
reviewer_name               VARCHAR(200)  "John M."
reviewer_location           VARCHAR(200)  "Manchester"
reviewer_email              VARCHAR(255)  For verification
is_verified_customer        BOOLEAN       Verified purchase

SERVICE DETAILS:
─────────────────────────────────────────────────────────────
appliance_category_id       UUID          What was repaired
service_date                DATE          When service occurred
problem_description         VARCHAR(500)  "Washing machine not spinning"

SUB-RATINGS:
─────────────────────────────────────────────────────────────
rating_value_for_money      INTEGER       1-5
rating_punctuality          INTEGER       1-5
rating_quality              INTEGER       1-5
rating_communication        INTEGER       1-5
would_recommend             BOOLEAN       Recommendation flag

BUSINESS RESPONSE:
─────────────────────────────────────────────────────────────
response                    TEXT          Provider's response
response_at                 TIMESTAMPTZ   When responded

═══════════════════════════════════════════════════════════════
```

---

## Page Architecture

### Section Overview

```
PAGE SECTIONS — PROVIDER PROFILE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│  NAVBAR (Standard with Search Bar - Spec 02)                │
│  [Logo] [Search Bar] [For Business ▼] [Login]               │
├─────────────────────────────────────────────────────────────┤
│  1. BREADCRUMB                                              │
│     Home > England > Manchester > Midlands Appliance Repairs│
├─────────────────────────────────────────────────────────────┤
│  2. HERO SECTION                                            │
│     Logo, name, rating, verification badges                │
├─────────────────────────────────────────────────────────────┤
│  3. CONTACT SIDEBAR (Desktop) / STICKY CTA (Mobile)        │
│     Phone, hours, directions                               │
├─────────────────────────────────────────────────────────────┤
│  4. ABOUT THIS ENGINEER                                     │
│     Description, years experience, team size               │
├─────────────────────────────────────────────────────────────┤
│  5. APPLIANCES WE REPAIR                                    │
│     Category links with icons                              │
├─────────────────────────────────────────────────────────────┤
│  6. SERVICE AREAS                                           │
│     Coverage map/list                                       │
├─────────────────────────────────────────────────────────────┤
│  7. AVAILABILITY & RESPONSE                                 │
│     Same-day, emergency, weekend availability              │
├─────────────────────────────────────────────────────────────┤
│  8. BRAND AUTHORIZATIONS                                    │
│     Bosch, Samsung, LG authorized                          │
├─────────────────────────────────────────────────────────────┤
│  9. TRUST & CERTIFICATIONS (Expanded)                       │
│     Gas Safe, F-Gas, Which?, Checkatrade, Insurance        │
├─────────────────────────────────────────────────────────────┤
│  10. PRICING INFORMATION                                    │
│      Callout fees, no fix no fee policy                    │
├─────────────────────────────────────────────────────────────┤
│  11. WARRANTY DETAILS                                       │
│      Repair warranty, parts warranty, genuine parts        │
├─────────────────────────────────────────────────────────────┤
│  12. CUSTOMER REVIEWS                                       │
│      Ratings breakdown, review cards                       │
├─────────────────────────────────────────────────────────────┤
│  13. COMMON ISSUES WE FIX (AI Content)                      │
│      Problem-based queries                                  │
├─────────────────────────────────────────────────────────────┤
│  14. LOCATION & DIRECTIONS                                  │
│      Map embed, address                                     │
├─────────────────────────────────────────────────────────────┤
│  15. FREQUENTLY ASKED QUESTIONS                             │
│      Provider-specific FAQs                                │
├─────────────────────────────────────────────────────────────┤
│  16. PROTECT YOUR APPLIANCE (Warranty Affiliate)            │
│      D&G, AO Care affiliate links — PRIMARY MONETIZATION   │
├─────────────────────────────────────────────────────────────┤
│  17. FIX IT YOURSELF (Parts Affiliate)                      │
│      eSpares parts links                                    │
├─────────────────────────────────────────────────────────────┤
│  18. APPLIANCE BEYOND REPAIR? (Cross-sell)                  │
│      Link to retail category                               │
├─────────────────────────────────────────────────────────────┤
│  19. OTHER REPAIR ENGINEERS IN {CITY}                       │
│      Internal linking to competitors                       │
├─────────────────────────────────────────────────────────────┤
│  20. EXPLORE MORE                                           │
│      Category links, nearby cities                         │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### Mobile Layout

```
MOBILE LAYOUT — PROVIDER PROFILE
═══════════════════════════════════════════════════════════════

CRITICAL: 70%+ traffic is mobile.
Users with broken appliances want ONE-TAP CALLING.

MOBILE ADAPTATIONS:
─────────────────────────────────────────────────────────────

1. HERO
   ├── Logo smaller (60px vs 100px)
   ├── Name + Rating prominent
   ├── Badges in horizontal scroll

2. CONTACT (Sticky Bottom CTA)
   ├── Fixed bottom bar
   ├── "📞 CALL NOW: {phone}"
   ├── Always visible on scroll
   ├── Large tap target (min 48px)

3. SIDEBAR CONTENT
   ├── Moves inline below hero
   ├── Hours collapsible
   ├── Directions → opens Maps app

4. SECTIONS
   ├── Collapsed accordions for:
   │   ├── Service Areas
   │   ├── Certifications
   │   ├── Pricing
   │   ├── FAQs
   ├── Reviews: Show 3, "Load more"

5. MAP
   ├── Static placeholder
   ├── Tap to load interactive

STICKY MOBILE CTA:
─────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   📞 CALL NOW: 0121 XXX XXXX                   ⭐ 4.9      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

STYLING:
├── Background:     #DC2626 (red-600) — urgent color
├── Text:           White, 18px, font-weight 700
├── Height:         64px
├── Fixed:          bottom: 0
├── z-index:        50
├── Box shadow:     0 -4px 12px rgba(0,0,0,0.15)

TRACKING:
├── On tap → trackClick('call_click', {...})

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
Home > England > Manchester > Midlands Appliance Repairs

Mobile:
< Manchester (back link only)

STRUCTURE:
─────────────────────────────────────────────────────────────────

[
  { name: "Home", url: "/" },
  { name: "England", url: "/england/" },
  { name: "Manchester", url: "/england/manchester/" },
  { name: "Midlands Appliance Repairs", url: null }  // Current page
]

NOTE ON BREADCRUMB:
Provider Profile is NOT under a specific repair category.
The breadcrumb goes to city hub, not category page.

If user came from a specific category page, we could show:
Home > England > Manchester > Washing Machine Repair > Provider Name
But this requires referrer tracking and complicates the URL structure.

RECOMMENDED: Simple city-based breadcrumb (matches Store Profile)

SCHEMA.ORG:
─────────────────────────────────────────────────────────────────

{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ukgradedappliances.com/" },
    { "@type": "ListItem", "position": 2, "name": "England", "item": "https://ukgradedappliances.com/england/" },
    { "@type": "ListItem", "position": 3, "name": "Manchester", "item": "https://ukgradedappliances.com/england/manchester/" },
    { "@type": "ListItem", "position": 4, "name": "Midlands Appliance Repairs" }
  ]
}

STYLING:
─────────────────────────────────────────────────────────────────
├── Font size:      14px
├── Color:          #6B7280 (grey-500)
├── Link color:     #2563eb (secondary)
├── Separator:      " > " or "›"
├── Current page:   Not a link, #374151 (grey-700)
├── Container:      bg-white, border-b, py-3

═══════════════════════════════════════════════════════════════
```

### Section 2: Hero Section

```
HERO SECTION — IDENTITY + TRUST SIGNALS
═══════════════════════════════════════════════════════════════

VISUAL (Desktop):
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────┐  MIDLANDS APPLIANCE REPAIRS                      │
│  │ LOGO │  ★★★★★ 4.9 (127 reviews)                        │
│  │100×100│                                                  │
│  └──────┘  ✓ Verified Engineer  ⭐ Featured                │
│                                                             │
│            Est. 2005 • 20 years experience • 4 engineers   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🛡️ Gas Safe  │ ❄️ F-Gas  │ ✓ Which?  │ ✓ Insured  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

VISUAL (Mobile):
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────┐  MIDLANDS APPLIANCE REPAIRS                      │
│  │ LOGO │  ★★★★★ 4.9 (127 reviews)                        │
│  │ 60×60│  ✓ Verified  • Est. 2005                        │
│  └──────┘                                                   │
│                                                             │
│  [🛡️ Gas Safe] [❄️ F-Gas] [✓ Which?] [+2]  ← scroll     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

HERO ELEMENTS:
─────────────────────────────────────────────────────────────────

1. LOGO
   ├── Size: 100×100 (desktop), 60×60 (mobile)
   ├── Border radius: 12px
   ├── Border: 1px solid #E5E7EB
   ├── Object fit: contain
   ├── Fallback: Initials on secondary background

2. PROVIDER NAME
   ├── Font: 28px (desktop), 22px (mobile)
   ├── Weight: 800
   ├── Color: #2563eb (secondary)

3. RATING DISPLAY
   ├── Stars: Yellow (#F59E0B)
   ├── Rating value: 20px, weight 700
   ├── Review count: "(127 reviews)" — link to reviews section

4. STATUS BADGES (inline, after rating)
   ├── ✓ Verified Engineer (green badge)
   ├── ⭐ Featured (amber badge)
   ├── 📞 Claimed (blue badge, if claimed_by_owner)

5. EXPERIENCE LINE
   ├── "Est. {year_established} • {years_trading} years • {number_of_engineers} engineers"
   ├── Font: 15px, color grey-600

6. CERTIFICATION BADGES (horizontal row)
   ├── See Section 9 for full specification
   ├── Show top 4-5 certifications
   ├── Mobile: Horizontal scroll

STYLING:
─────────────────────────────────────────────────────────────────
Container:
├── Background:     White
├── Padding:        32px (desktop), 20px (mobile)
├── Border bottom:  1px solid #E5E7EB

Featured Provider:
├── Background:     Linear gradient (green-50 to white)
├── Border left:    4px solid #059669 (green-600)

═══════════════════════════════════════════════════════════════
```

### Section 3: Contact Sidebar (Desktop) / Sticky CTA (Mobile)

```
CONTACT SIDEBAR — PRIMARY CONVERSION ELEMENT
═══════════════════════════════════════════════════════════════

This is WHERE THE CALL HAPPENS. Design for maximum conversion.

VISUAL (Desktop Sidebar):
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────┐
│                                     │
│  CONTACT THIS ENGINEER              │
│  ─────────────────────────────────  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │  📞 CALL NOW                │   │
│  │     0121 XXX XXXX           │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ⚡ Same-day callouts available     │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  🌐 Visit Website →                 │
│                                     │
│  📧 info@midlandsappliance.co.uk   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  OPENING HOURS                      │
│  ┌─────────────────────────────┐   │
│  │ Mon-Fri   08:00 - 18:00     │   │
│  │ Saturday  09:00 - 16:00     │   │
│  │ Sunday    Closed            │   │
│  │                             │   │
│  │ 🟢 Open now (until 18:00)   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  📍 GET DIRECTIONS →                │
│     Aston, Birmingham B6           │
│                                     │
└─────────────────────────────────────┘

SIDEBAR BEHAVIOR:
─────────────────────────────────────────────────────────────────
├── Position: Sticky on desktop (follows scroll)
├── Max scroll: Stops at footer
├── Width: 320px fixed
├── Gap from main content: 32px

CALL BUTTON STYLING:
─────────────────────────────────────────────────────────────────
├── Background:     #DC2626 (red-600) — urgent color
├── Hover:          #B91C1C (red-700)
├── Text:           White, 18px, weight 700
├── Padding:        20px
├── Border radius:  12px
├── Width:          100%
├── Box shadow:     0 4px 6px rgba(220, 38, 38, 0.25)
├── Icon:           📞 or phone SVG

CALL TRACKING:
─────────────────────────────────────────────────────────────────
onClick → {
  trackClick({
    eventType: 'call_click',
    subjectType: 'provider',
    subjectId: provider.id,
    pagePath: `/provider/${provider.slug}/`,
    pageType: 'provider_profile',
  });
}

href → tel:{provider.phone}

OPENING HOURS:
─────────────────────────────────────────────────────────────────
Data source: operating_hours JSONB

Expected format:
{
  "monday": { "open": "08:00", "close": "18:00" },
  "tuesday": { "open": "08:00", "close": "18:00" },
  ...
  "sunday": null  // Closed
}

"Open now" logic:
├── Get current day and time
├── Compare to operating_hours
├── Show: "🟢 Open now (until 18:00)" or "🔴 Closed"

WEBSITE CLICK TRACKING:
─────────────────────────────────────────────────────────────────
onClick → {
  trackClick({
    eventType: 'website_click',
    subjectType: 'provider',
    subjectId: provider.id,
    context: { destination_url: provider.website }
  });
}

target="_blank" rel="noopener noreferrer"

═══════════════════════════════════════════════════════════════
```

### Section 4: About This Engineer

```
ABOUT THIS ENGINEER — DESCRIPTION
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📝 ABOUT MIDLANDS APPLIANCE REPAIRS                       │
│  ════════════════════════════════════                       │
│                                                             │
│  Midlands Appliance Repairs has been serving Birmingham    │
│  and the surrounding West Midlands for over 20 years.      │
│  Our team of 4 experienced engineers specialise in all     │
│  major domestic appliance brands including Bosch, Samsung, │
│  LG, and Hotpoint.                                         │
│                                                             │
│  We pride ourselves on same-day callouts, transparent      │
│  pricing, and a 6-month warranty on all repairs. Our       │
│  engineers are Gas Safe registered and fully insured       │
│  for your peace of mind.                                   │
│                                                             │
│  Whether your washing machine won't spin, your fridge      │
│  isn't cooling, or your oven won't heat, we can diagnose  │
│  and fix the problem quickly and affordably.              │
│                                                             │
│                                          [Show less ▲]     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────
├── Primary: description (TEXT)
├── Fallback: short_description (VARCHAR 500)
├── If both empty: Generate from provider data

EXPAND/COLLAPSE:
─────────────────────────────────────────────────────────────────
├── If description > 300 characters
├── Show first 300 chars + "..."
├── "Read more" expands to full
├── "Show less" collapses

STYLING:
─────────────────────────────────────────────────────────────────
├── Font size: 16px
├── Line height: 1.7
├── Color: #374151 (grey-700)
├── Max width: 720px (for readability)

═══════════════════════════════════════════════════════════════
```

### Section 5: Appliances We Repair

```
APPLIANCES WE REPAIR — SEO INTERNAL LINKS
═══════════════════════════════════════════════════════════════

This section creates internal links to repair category pages.
Critical for SEO and topical authority.

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 APPLIANCES WE REPAIR                                   │
│  ═══════════════════════                                    │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │     🧺      │ │     🧊      │ │     🍽️      │          │
│  │  Washing    │ │   Fridge    │ │ Dishwasher  │          │
│  │  Machines   │ │  Freezers   │ │             │          │
│  │             │ │             │ │             │          │
│  │ ⚡ Same-day │ │ ⚡ Same-day │ │ £55 callout │          │
│  │  [View →]   │ │  [View →]   │ │  [View →]   │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │     💨      │ │     🔥      │ │     🍳      │          │
│  │   Tumble    │ │   Ovens &   │ │    Hobs     │          │
│  │   Dryers    │ │   Cookers   │ │             │          │
│  │             │ │             │ │             │          │
│  │ £50 callout │ │ 🛡️ Gas Safe │ │ 🛡️ Gas Safe │          │
│  │  [View →]   │ │  [View →]   │ │  [View →]   │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────

SELECT 
  ac.id,
  ac.name,
  ac.name_singular,
  ac.slug,
  ac.icon,
  ac.tier,
  ps.offers_same_day,
  ps.callout_fee_min,
  ps.callout_fee_max,
  ps.repair_warranty_months
FROM provider_services ps
JOIN appliance_categories ac ON ps.appliance_category_id = ac.id
WHERE ps.provider_id = :provider_id
  AND ps.is_active = true
  AND ac.supports_repair = true
ORDER BY ac.tier ASC, ac.display_order ASC;

LINK TARGET:
─────────────────────────────────────────────────────────────────
Each category card links to the repair category page
in the provider's PRIMARY city:

"Washing Machines" → /england/{primary_city_slug}/washing-machine-repair/
"Fridge Freezers"  → /england/{primary_city_slug}/fridge-freezer-repair/

CARD ELEMENTS:
─────────────────────────────────────────────────────────────────
├── Icon (from category)
├── Category name
├── Badge 1: ⚡ Same-day (if offers_same_day)
├── Badge 2: £{callout_fee_min} callout (if set)
├── Badge 3: 🛡️ Gas Safe (if gas_safe_registered AND gas appliance)
├── Link: "View more in {city} →"

STYLING:
─────────────────────────────────────────────────────────────────
Card:
├── Background:     White
├── Border:         1px solid #E5E7EB
├── Border radius:  12px
├── Padding:        20px
├── Hover:          Border color #2563eb, shadow

Grid:
├── Desktop: 3 columns
├── Tablet: 2 columns
├── Mobile: 2 columns or horizontal scroll

═══════════════════════════════════════════════════════════════
```

### Section 6: Service Areas

```
SERVICE AREAS — COVERAGE DISPLAY
═══════════════════════════════════════════════════════════════

Shows which cities/areas this provider covers.
Important for local SEO and user understanding.

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📍 SERVICE AREAS                                           │
│  ═══════════════                                            │
│                                                             │
│  We cover Birmingham and surrounding areas within           │
│  approximately 30 miles.                                    │
│                                                             │
│  PRIMARY AREA:                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📍 Birmingham (B postcode areas)                   │   │
│  │     ⚡ Same-day available • No additional fee       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  WE ALSO COVER:                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ Solihull    │ │ Wolverhamp. │ │ Coventry    │          │
│  │ ⚡ Same-day │ │ +£10 fee    │ │ +£15 fee    │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ Walsall     │ │ Dudley      │ │ Sandwell    │          │
│  │ +£5 fee     │ │ +£10 fee    │ │ ⚡ Same-day │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                             │
│  [🗺️ View on map ▼]                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────

SELECT 
  p.id,
  p.name,
  p.slug,
  pcp.is_primary,
  pcp.additional_callout_fee,
  pcp.same_day_available,
  pcp.notes
FROM provider_coverage_places pcp
JOIN places p ON pcp.place_id = p.id
WHERE pcp.provider_id = :provider_id
ORDER BY pcp.is_primary DESC, p.name ASC;

DISPLAY RULES:
─────────────────────────────────────────────────────────────────
├── Primary area first, highlighted
├── Secondary areas in grid
├── Show additional fee if > 0
├── Show same-day badge if available
├── Max 9 areas displayed, "+X more" for rest

OPTIONAL MAP EXPANSION:
─────────────────────────────────────────────────────────────────
If user clicks "View on map":
├── Load map showing coverage area
├── Primary city centered
├── Circle/polygon showing coverage
├── Or pins for each covered city

═══════════════════════════════════════════════════════════════
```

### Section 7: Availability & Response

```
AVAILABILITY & RESPONSE — URGENCY SIGNALS
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ⏰ AVAILABILITY & RESPONSE                                 │
│  ═══════════════════════════                                │
│                                                             │
│  ┌──────────────────────────────┬───────────────────────┐  │
│  │                              │                       │  │
│  │  ⚡ SAME-DAY CALLOUTS        │  🚨 24/7 EMERGENCY    │  │
│  │     Available                │     Available         │  │
│  │                              │                       │  │
│  │  Book before 2pm for        │  Call our emergency   │  │
│  │  same-day service           │  line anytime         │  │
│  │                              │                       │  │
│  ├──────────────────────────────┼───────────────────────┤  │
│  │                              │                       │  │
│  │  📅 NEXT-DAY                 │  🌙 EVENING SLOTS     │  │
│  │     Available                │     Available         │  │
│  │                              │                       │  │
│  │  Guaranteed next working    │  Appointments until   │  │
│  │  day appointments           │  8pm available        │  │
│  │                              │                       │  │
│  └──────────────────────────────┴───────────────────────┘  │
│                                                             │
│  📋 TYPICAL RESPONSE: Usually within 2 hours              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────
├── offers_same_day
├── offers_next_day
├── offers_emergency
├── offers_weekend
├── offers_evening
├── typical_response_time

DISPLAY LOGIC:
─────────────────────────────────────────────────────────────────
├── Only show options that are TRUE
├── 2×2 grid for available options
├── If only 1-2 options, show as prominent cards
├── Hide section if no availability features

STYLING:
─────────────────────────────────────────────────────────────────
Same-day / Emergency:
├── Background: Green-50 / Red-50
├── Icon prominent
├── "Available" badge

Not available:
├── Don't show (not greyed out)

═══════════════════════════════════════════════════════════════
```

### Section 8: Brand Authorizations

```
BRAND AUTHORIZATIONS — TRUST SIGNAL
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🏷️ AUTHORIZED BRAND REPAIRS                               │
│  ════════════════════════════                               │
│                                                             │
│  We are authorized to repair the following brands with     │
│  access to genuine parts and manufacturer training:        │
│                                                             │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐    │
│  │ [Bosch Logo]  │ │[Samsung Logo] │ │  [LG Logo]    │    │
│  │               │ │               │ │               │    │
│  │    BOSCH      │ │   SAMSUNG     │ │      LG       │    │
│  │  Authorized   │ │  Authorized   │ │  Authorized   │    │
│  │  ✓ Verified   │ │  ✓ Verified   │ │               │    │
│  │               │ │               │ │               │    │
│  │  [View Bosch  │ │  [View Samsung│ │  [View LG     │    │
│  │   repairs →]  │ │   repairs →]  │ │   repairs →]  │    │
│  └───────────────┘ └───────────────┘ └───────────────┘    │
│                                                             │
│  ┌───────────────┐ ┌───────────────┐                       │
│  │[Siemens Logo] │ │ [Neff Logo]   │                       │
│  │               │ │               │                       │
│  │   SIEMENS     │ │     NEFF      │                       │
│  │  Authorized   │ │  Authorized   │                       │
│  │               │ │               │                       │
│  └───────────────┘ └───────────────┘                       │
│                                                             │
│  We also repair all other brands — just call for a quote. │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────

SELECT 
  b.id,
  b.name,
  b.slug,
  b.logo_url,
  pba.authorisation_type,
  pba.certificate_number,
  pba.is_verified,
  pba.valid_until
FROM provider_brand_authorisations pba
JOIN brands b ON pba.brand_id = b.id
WHERE pba.provider_id = :provider_id
  AND (pba.valid_until IS NULL OR pba.valid_until > NOW())
ORDER BY b.tier ASC, b.popularity_score DESC;

LINK TARGET (Phase 2):
─────────────────────────────────────────────────────────────────
"View Bosch repairs" → /england/{primary_city}/bosch-repair/

If brand repair page doesn't exist yet:
→ Link to repair category page filtered by brand
→ Or just show brand without link

DISPLAY RULES:
─────────────────────────────────────────────────────────────────
├── Show brand logo if available
├── Show "✓ Verified" if is_verified = true
├── Show authorisation_type (e.g., "Authorized Service Partner")
├── Max 8 brands displayed
├── Premium brands first (Bosch, Miele, Samsung)

STYLING:
─────────────────────────────────────────────────────────────────
Card:
├── Background:     White
├── Border:         1px solid #E5E7EB
├── Border radius:  12px
├── Padding:        20px
├── Text align:     Center

Verified badge:
├── Color:          Green-600
├── Font size:      13px

═══════════════════════════════════════════════════════════════
```

### Section 9: Trust & Certifications (Expanded)

```
TRUST & CERTIFICATIONS — EXPANDED VIEW
═══════════════════════════════════════════════════════════════

This is an EXPANDED version of the badges shown in hero.
Provides full details and verification links.

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🛡️ TRUST & CERTIFICATIONS                                 │
│  ═════════════════════════                                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🛡️ GAS SAFE REGISTERED                             │   │
│  │     ━━━━━━━━━━━━━━━━━━━                              │   │
│  │                                                     │   │
│  │     Registration: #123456                           │   │
│  │     Valid until: March 2026                         │   │
│  │                                                     │   │
│  │     All our engineers are registered with the      │   │
│  │     Gas Safe Register for gas appliance repairs.   │   │
│  │                                                     │   │
│  │     [🔗 Verify on Gas Safe Register →]              │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ❄️ F-GAS CERTIFIED                                 │   │
│  │     ━━━━━━━━━━━━━━━                                  │   │
│  │                                                     │   │
│  │     We hold the required F-Gas certification       │   │
│  │     for working with refrigeration equipment       │   │
│  │     and air conditioning systems.                  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✓ WHICH? TRUSTED TRADER                           │   │
│  │     ━━━━━━━━━━━━━━━━━━━                              │   │
│  │                                                     │   │
│  │     Endorsed by Which? consumer organisation.      │   │
│  │     Vetted for reliability and customer service.   │   │
│  │                                                     │   │
│  │     [🔗 View on Which? →]                           │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✓ CHECKATRADE MEMBER                              │   │
│  │     ━━━━━━━━━━━━━━━━━━                               │   │
│  │                                                     │   │
│  │     Member ID: #789012                              │   │
│  │     Average rating: 9.8/10                         │   │
│  │                                                     │   │
│  │     [🔗 View Checkatrade profile →]                 │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🛡️ FULLY INSURED                                   │   │
│  │     ━━━━━━━━━━━━━━                                   │   │
│  │                                                     │   │
│  │     Public liability insurance: £2,000,000         │   │
│  │                                                     │   │
│  │     We carry comprehensive insurance for your      │   │
│  │     peace of mind and property protection.         │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

VERIFICATION LINKS:
─────────────────────────────────────────────────────────────────

Gas Safe:
https://www.gassaferegister.co.uk/find-an-engineer/?registration={gas_safe_number}

Checkatrade:
https://www.checkatrade.com/trades/{checkatrade_id}

Which? Trusted:
https://trustedtraders.which.co.uk/

DISPLAY LOGIC:
─────────────────────────────────────────────────────────────────
├── Only show certifications that are TRUE
├── Show registration numbers where available
├── Show expiry dates where relevant
├── External links open in new tab with tracking

SCHEMA.ORG CONTRIBUTION:
─────────────────────────────────────────────────────────────────
{
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Gas Safe Register",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Gas Safe Register"
      }
    }
  ]
}

═══════════════════════════════════════════════════════════════
```

### Section 10: Pricing Information

```
PRICING INFORMATION — TRANSPARENT COSTS
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  💰 PRICING INFORMATION                                     │
│  ═════════════════════                                      │
│                                                             │
│  ┌──────────────────────────────┬───────────────────────┐  │
│  │                              │                       │  │
│  │  CALLOUT FEE                 │  ✓ NO FIX, NO FEE     │  │
│  │                              │                       │  │
│  │  From £45 - £65              │  If we can't fix it,  │  │
│  │                              │  you don't pay.       │  │
│  │  Includes diagnosis and     │                       │  │
│  │  first 30 minutes.          │                       │  │
│  │                              │                       │  │
│  └──────────────────────────────┴───────────────────────┘  │
│                                                             │
│  ✓ FREE QUOTES                                             │
│    Get a no-obligation quote before we start any work.     │
│                                                             │
│  ℹ️ Final cost depends on the fault and parts required.    │
│    We always discuss costs before proceeding with repairs. │
│                                                             │
│  PAYMENT METHODS ACCEPTED:                                  │
│  💳 Card  💵 Cash  🏦 Bank Transfer                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────
├── callout_fee_from
├── callout_fee_to
├── no_fix_no_fee
├── free_quotes

DISPLAY LOGIC:
─────────────────────────────────────────────────────────────────
├── Show fee range: "From £{min} - £{max}"
├── Or just "From £{min}" if no max
├── Highlight "No Fix, No Fee" prominently (green)
├── Show "Free Quotes" if true

═══════════════════════════════════════════════════════════════
```

### Section 11: Warranty Details

```
WARRANTY DETAILS — TRUST BUILDER
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📋 WARRANTY ON REPAIRS                                     │
│  ═════════════════════                                      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ✓ 6-MONTH WARRANTY ON ALL REPAIRS                 │   │
│  │                                                     │   │
│  │  All our repair work comes with a 6-month          │   │
│  │  warranty. If the same fault reoccurs, we'll       │   │
│  │  come back and fix it free of charge.              │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ✓ 12-MONTH WARRANTY ON PARTS                      │   │
│  │                                                     │   │
│  │  Any replacement parts we fit come with a          │   │
│  │  12-month manufacturer's warranty.                 │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ✓ GENUINE PARTS USED                              │   │
│  │                                                     │   │
│  │  We use genuine manufacturer parts wherever        │   │
│  │  possible for the best quality and longevity.      │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────
├── warranty_on_repairs_months (e.g., 6)
├── warranty_on_parts_months (e.g., 12)
├── uses_genuine_parts (boolean)

DISPLAY LOGIC:
─────────────────────────────────────────────────────────────────
├── Only show warranty items with data
├── Format months: "6-MONTH WARRANTY"
├── Show uses_genuine_parts if true

═══════════════════════════════════════════════════════════════
```

### Section 12: Customer Reviews

```
CUSTOMER REVIEWS — SOCIAL PROOF
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ⭐ CUSTOMER REVIEWS                                        │
│  ═══════════════════                                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  OVERALL RATING                                     │   │
│  │  ★★★★★ 4.9 out of 5                                │   │
│  │  Based on 127 reviews                              │   │
│  │                                                     │   │
│  │  BREAKDOWN                                          │   │
│  │  ─────────────────────────────────────             │   │
│  │  Value for money     ★★★★★  4.8                   │   │
│  │  Punctuality         ★★★★★  4.9                   │   │
│  │  Quality of work     ★★★★★  5.0                   │   │
│  │  Communication       ★★★★★  4.9                   │   │
│  │                                                     │   │
│  │  98% would recommend                               │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ★★★★★  "Excellent service"                        │   │
│  │                                                     │   │
│  │  Called in the morning about my washing machine    │   │
│  │  not draining. Engineer arrived same day,          │   │
│  │  diagnosed the problem (blocked pump), and fixed   │   │
│  │  it within an hour. Very professional and          │   │
│  │  friendly. Highly recommend!                       │   │
│  │                                                     │   │
│  │  John M. — Birmingham • December 2025              │   │
│  │  Appliance: Washing Machine                        │   │
│  │                                                     │   │
│  │  ✓ Verified Customer                               │   │
│  │                                                     │   │
│  │  ─────────────────────────────────────────────     │   │
│  │  Response from Midlands Appliance Repairs:        │   │
│  │  "Thank you John! Glad we could help get your     │   │
│  │   washing machine working again."                 │   │
│  │  ─────────────────────────────────────────────     │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ★★★★★  "Fixed my fridge freezer quickly"          │   │
│  │  ...                                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ★★★★☆  "Good service, slightly expensive"         │   │
│  │  ...                                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [LOAD MORE REVIEWS]                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────

-- Summary stats
SELECT 
  AVG(rating) as avg_rating,
  COUNT(*) as total_reviews,
  AVG(rating_value_for_money) as avg_value,
  AVG(rating_punctuality) as avg_punctuality,
  AVG(rating_quality) as avg_quality,
  AVG(rating_communication) as avg_communication,
  COUNT(*) FILTER (WHERE would_recommend = true) * 100.0 / COUNT(*) as recommend_pct
FROM reviews
WHERE subject_type = 'provider'
  AND subject_id = :provider_id
  AND status = 'approved';

-- Individual reviews
SELECT 
  r.*,
  ac.name as appliance_name
FROM reviews r
LEFT JOIN appliance_categories ac ON r.appliance_category_id = ac.id
WHERE r.subject_type = 'provider'
  AND r.subject_id = :provider_id
  AND r.status = 'approved'
ORDER BY r.created_at DESC
LIMIT 5
OFFSET :offset;

REVIEW DISPLAY:
─────────────────────────────────────────────────────────────────
├── Stars + Title
├── Review content (expandable if >300 chars)
├── Reviewer name + location + date
├── Appliance category badge (if set)
├── Verified customer badge (if true)
├── Business response (if exists)

PAGINATION:
─────────────────────────────────────────────────────────────────
├── Initial: 5 reviews
├── Load more: 10 at a time
├── URL: ?reviews_page=2 (for direct linking)

SCHEMA.ORG:
─────────────────────────────────────────────────────────────────
{
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.9,
    "reviewCount": 127,
    "bestRating": 5,
    "worstRating": 1
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "John M." },
      "datePublished": "2025-12-15",
      "reviewRating": { "@type": "Rating", "ratingValue": 5 },
      "reviewBody": "Excellent service..."
    }
  ]
}

═══════════════════════════════════════════════════════════════
```

### Section 13: Common Issues We Fix

```
COMMON ISSUES WE FIX — AI CONTENT
═══════════════════════════════════════════════════════════════

This section targets problem-based AI queries.
"This provider fixes {issue}" → AI citation.

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 COMMON ISSUES WE FIX                                   │
│  ═══════════════════════                                    │
│                                                             │
│  WASHING MACHINES                                           │
│  ├── Machine not spinning                                   │
│  ├── Not draining water                                     │
│  ├── Loud banging during spin cycle                        │
│  ├── Door won't open                                        │
│  └── Error codes flashing                                   │
│                                                             │
│  FRIDGE FREEZERS                                            │
│  ├── Not cooling properly                                   │
│  ├── Making strange noises                                  │
│  ├── Ice building up                                        │
│  ├── Leaking water                                          │
│  └── Temperature fluctuating                                │
│                                                             │
│  DISHWASHERS                                                │
│  ├── Not cleaning dishes properly                           │
│  ├── Not draining                                           │
│  ├── Door seal leaking                                      │
│  └── Not starting                                           │
│                                                             │
│  📖 Read our repair guides →                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────
FROM appliance_categories.common_issues (TEXT[])
For each category the provider services.

SELECT 
  ac.name,
  ac.common_issues
FROM provider_services ps
JOIN appliance_categories ac ON ps.appliance_category_id = ac.id
WHERE ps.provider_id = :provider_id
  AND ps.is_active = true
  AND ac.common_issues IS NOT NULL;

LINK TARGET:
─────────────────────────────────────────────────────────────────
Each issue could link to a guide page:
"Machine not spinning" → /guides/washing-machine-not-spinning/

Or scroll to contact section with pre-filled context.

═══════════════════════════════════════════════════════════════
```

### Section 14: Location & Directions

```
LOCATION & DIRECTIONS — MAP EMBED
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📍 OUR LOCATION                                           │
│  ═══════════════                                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │              [GOOGLE MAPS EMBED]                   │   │
│  │                                                     │   │
│  │              300px height (desktop)                │   │
│  │              200px height (mobile)                 │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Unit 15, Trafford Park Industrial Estate                  │
│  Aston                                                      │
│  Birmingham, B6 4AA                                        │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────────┐             │
│  │   📋 Copy      │  │   📍 Get Directions │             │
│  └─────────────────┘  └─────────────────────┘             │
│                                                             │
│  ℹ️ This is our base location. We cover all of            │
│     Birmingham and surrounding areas.                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

IMPLEMENTATION:
─────────────────────────────────────────────────────────────────
Identical to Store Profile Page (Spec 06).
Use FREE Google Maps embed (not API).

const embedUrl = provider.latitude && provider.longitude
  ? `https://www.google.com/maps?q=${provider.latitude},${provider.longitude}&output=embed`
  : `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

const directionsUrl = provider.latitude && provider.longitude
  ? `https://www.google.com/maps/dir/?api=1&destination=${provider.latitude},${provider.longitude}`
  : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

MOBILE:
─────────────────────────────────────────────────────────────────
├── "Get Directions" → Opens native Maps app
├── Map loads lazily (loading="lazy")
├── Smaller height on mobile (200px)

═══════════════════════════════════════════════════════════════
```

### Section 15: FAQs

```
FREQUENTLY ASKED QUESTIONS — SCHEMA.ORG
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ❓ FREQUENTLY ASKED QUESTIONS                             │
│  ═════════════════════════════                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▼ How much do you charge for a callout?           │   │
│  │                                                     │   │
│  │    Our callout fee is £45-65, which includes       │   │
│  │    diagnosis and the first 30 minutes of labour.   │   │
│  │    We'll always quote final costs before starting  │   │
│  │    any repair work.                                │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ Do you offer same-day callouts?                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ What warranty do you offer on repairs?          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ What areas do you cover?                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ▶ What brands do you repair?                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

FAQ CONTENT (Template-based):
─────────────────────────────────────────────────────────────────

1. "How much do you charge for a callout?"
   Answer: Uses callout_fee_from/to data

2. "Do you offer same-day callouts?"
   Answer: Uses offers_same_day data

3. "What warranty do you offer on repairs?"
   Answer: Uses warranty_on_repairs_months data

4. "What areas do you cover?"
   Answer: Uses coverage_places data

5. "What brands do you repair?"
   Answer: Uses authorized_brands data

SCHEMA.ORG:
─────────────────────────────────────────────────────────────────
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does {provider.name} charge for a callout?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Callout fees are £{min}-£{max}..."
      }
    }
  ]
}

═══════════════════════════════════════════════════════════════
```

### Section 16: Warranty Affiliate (D&G) — PRIMARY MONETIZATION

```
PROTECT YOUR APPLIANCE — WARRANTY AFFILIATE
═══════════════════════════════════════════════════════════════

This is the OPTIMAL PLACEMENT for warranty affiliate.
User just researched repair → "After repair, protect it"

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🛡️ PROTECT YOUR APPLIANCE                                 │
│  ═════════════════════════                                  │
│                                                             │
│  Had your appliance repaired? Protect it from future       │
│  breakdowns with an extended warranty.                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  [D&G Logo]                                        │   │
│  │                                                     │   │
│  │  DOMESTIC & GENERAL APPLIANCE COVER               │   │
│  │  ─────────────────────────────────────             │   │
│  │                                                     │   │
│  │  ✓ No excess on claims                            │   │
│  │  ✓ Unlimited callouts                             │   │
│  │  ✓ Parts and labour included                      │   │
│  │  ✓ Available for appliances up to 8 years old    │   │
│  │                                                     │   │
│  │  From £4.99/month                                  │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐  │   │
│  │  │        GET A QUOTE →                        │  │   │
│  │  └─────────────────────────────────────────────┘  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ℹ️ We may earn a commission if you purchase through       │
│     these links at no extra cost to you.                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

AFFILIATE LINK:
─────────────────────────────────────────────────────────────────
Partner: Domestic & General (D&G)
URL: https://www.domgen.com/products/appliance-cover/
Params: ?utm_source=ukgradedappliances&utm_medium=provider_profile&utm_campaign={provider_slug}

Expected Revenue: £15-30 per lead

TRACKING:
─────────────────────────────────────────────────────────────────
onClick → {
  trackAffiliate({
    partner: 'dg',
    productType: 'warranty',
    providerId: provider.id,
    sourcePage: `/provider/${provider.slug}/`,
  });
}

→ Logs to affiliate_clicks table

DISPLAY RULES:
─────────────────────────────────────────────────────────────────
├── Always show on provider profile pages
├── Position: After reviews section (post-trust building)
├── Include FTC disclosure ("We may earn a commission...")

ALTERNATIVE PARTNERS (A/B test):
─────────────────────────────────────────────────────────────────
├── AO Care (AO.com warranty)
├── Extended Warranty Direct
├── Protect Your Bubble

═══════════════════════════════════════════════════════════════
```

### Section 17: Parts Affiliate (eSpares)

```
FIX IT YOURSELF — PARTS AFFILIATE
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔧 FIX IT YOURSELF?                                       │
│  ════════════════════                                       │
│                                                             │
│  If you're handy and want to attempt the repair yourself,  │
│  order genuine parts from our trusted partner eSpares.     │
│                                                             │
│  [Washing Machine Parts]  [Fridge Parts]  [Dishwasher Parts]│
│                                                             │
│  ✓ Free delivery on orders over £35                       │
│  ✓ Next-day delivery available                            │
│  ✓ 365-day returns                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

AFFILIATE LINK:
─────────────────────────────────────────────────────────────────
Partner: eSpares
Base URL: https://www.espares.co.uk/
Category: /search/{category}-parts/
Params: ?utm_source=ukgradedappliances&utm_medium=provider_profile

Expected Revenue: 5-8% commission on parts sales

═══════════════════════════════════════════════════════════════
```

### Section 18: Cross-sell to Retail

```
APPLIANCE BEYOND REPAIR? — CROSS-SELL
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🛒 APPLIANCE BEYOND REPAIR?                               │
│  ═══════════════════════════                                │
│                                                             │
│  If your appliance isn't worth repairing, consider a       │
│  graded replacement. Save 30-70% on brand-new appliances   │
│  with light cosmetic imperfections.                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  GRADED APPLIANCES IN BIRMINGHAM                   │   │
│  │                                                     │   │
│  │  8 local stores • From £149 • Up to 70% off        │   │
│  │                                                     │   │
│  │          [BROWSE GRADED APPLIANCES →]              │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

LINK TARGET:
─────────────────────────────────────────────────────────────────
/england/{primary_city_slug}/

Or specific category if context available:
/england/{primary_city_slug}/washing-machines/

═══════════════════════════════════════════════════════════════
```

### Section 19: Other Providers in {City}

```
OTHER REPAIR ENGINEERS — INTERNAL LINKING
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Other Appliance Repair Engineers in Birmingham            │
│  ─────────────────────────────────────────────              │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Quick Fix Birmingham                  ⭐ 4.7       │  │
│  │  Same-day callouts • From £55 • All brands          │  │
│  │  [View Profile →]                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Bosch Authorised Service              ⭐ 4.8       │  │
│  │  Official Bosch repairs • Genuine parts             │  │
│  │  [View Profile →]                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  West Midlands Appliance Care          ⭐ 4.6       │  │
│  │  Emergency callouts • No fix no fee                 │  │
│  │  [View Profile →]                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  View all 28 repair engineers in Birmingham →             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────

SELECT sp.*, pcp.is_primary
FROM service_providers sp
JOIN provider_coverage_places pcp ON pcp.provider_id = sp.id
WHERE pcp.place_id = :provider_primary_place_id
  AND sp.id != :current_provider_id
  AND sp.is_active = true
  AND sp.status IN ('active', 'claimed', 'verified')
ORDER BY sp.is_featured DESC, sp.average_rating DESC
LIMIT 3;

LINKS:
─────────────────────────────────────────────────────────────────
├── Each provider: /provider/{slug}/
├── "View all": /england/{city}/#repairs (city hub)

═══════════════════════════════════════════════════════════════
```

### Section 20: Explore More

```
EXPLORE MORE — INTERNAL LINKING FOOTER
═══════════════════════════════════════════════════════════════

VISUAL:
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Explore More                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  REPAIR CATEGORIES IN BIRMINGHAM                           │
│  Washing Machine Repair • Fridge Freezer Repair           │
│  Dishwasher Repair • Oven Repair • Tumble Dryer Repair    │
│                                                             │
│  GRADED APPLIANCE STORES IN BIRMINGHAM                    │
│  Browse 8 local retailers with savings up to 70%          │
│                                                             │
│  NEARBY CITIES                                             │
│  Wolverhampton • Coventry • Leicester • Nottingham        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

LINKS:
─────────────────────────────────────────────────────────────────
Repair categories: /england/birmingham/washing-machine-repair/
Stores: /england/birmingham/
Nearby cities: /england/wolverhampton/

═══════════════════════════════════════════════════════════════
```

---

## SEO Implementation

### Meta Tags

```
META TAGS — PROVIDER PROFILE
═══════════════════════════════════════════════════════════════

TITLE:
─────────────────────────────────────────────────────────────────
Template: {name} - Appliance Repair in {city} | Reviews & Contact
Example: Midlands Appliance Repairs - Appliance Repair in Birmingham | Reviews & Contact

Max: 60 characters (truncate name if needed)

Override: seo_title field if set

META DESCRIPTION:
─────────────────────────────────────────────────────────────────
Template: {name} in {city}. ★{rating} ({review_count} reviews). 
{short_description}. Same-day callouts available. Call {phone}.

Example: Midlands Appliance Repairs in Birmingham. ★4.9 (127 reviews). 
Washing machine, fridge, dishwasher repair specialists. Same-day 
callouts available. Call 0121 XXX XXXX.

Max: 155 characters

Override: seo_meta_description field if set

CANONICAL:
─────────────────────────────────────────────────────────────────
<link rel="canonical" href="https://ukgradedappliances.com/provider/{slug}/" />

ROBOTS:
─────────────────────────────────────────────────────────────────
Active provider: <meta name="robots" content="index, follow" />
Inactive/pending: <meta name="robots" content="noindex, follow" />

Check: is_active AND is_indexable AND status IN ('active','claimed','verified')

OPEN GRAPH:
─────────────────────────────────────────────────────────────────
<meta property="og:title" content="{name} - Appliance Repair in {city}" />
<meta property="og:description" content="{meta description}" />
<meta property="og:image" content="{logo_url or cover_image_url or default}" />
<meta property="og:url" content="{canonical}" />
<meta property="og:type" content="business.business" />

TWITTER:
─────────────────────────────────────────────────────────────────
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="{og:title}" />
<meta name="twitter:description" content="{og:description}" />

GEO TAGS:
─────────────────────────────────────────────────────────────────
<meta name="geo.region" content="GB-ENG" />
<meta name="geo.placename" content="{city_name}" />
<meta name="geo.position" content="{latitude};{longitude}" />

═══════════════════════════════════════════════════════════════
```

### Schema.org (Complete) — v1.1 SAB Compliant

```
SCHEMA.ORG — SERVICE AREA BUSINESS (SAB) COMPLIANCE (v1.1)
═══════════════════════════════════════════════════════════════

⚠️  CRITICAL SAB REQUIREMENTS:
─────────────────────────────────────────────────────────────────
Most repair engineers are MOBILE SERVICE PROVIDERS who:
• Work from home (NOT a commercial address)
• Travel TO customers within a service radius
• Do NOT want their home address publicly displayed

CONSEQUENCES OF GETTING THIS WRONG:
• Privacy violation — engineer's home address exposed
• GMB suspension — Google suspends SAB listings with home addresses
• Legal issues — potential GDPR violations
• Engineer churn — they will demand removal from directory

═══════════════════════════════════════════════════════════════
```

```
SCHEMA TYPE DECISION (v1.1)
═══════════════════════════════════════════════════════════════

ALWAYS USE: HomeAndConstructionBusiness

DO NOT USE: LocalBusiness (implies physical storefront)
DO NOT USE: Plumber or Electrician (outside our scope)

Our scope is APPLIANCE REPAIR:
• Washing Machines, Dishwashers, Tumble Dryers
• Fridge Freezers, American Fridge Freezers
• Built-in Ovens, Range Cookers, Hobs, Cookers
• Wine Coolers, Washer Dryers, Microwaves
• Cooker Hoods, Vacuum Cleaners, Televisions

Even Gas Safe registered engineers are APPLIANCE repair
specialists who happen to be certified for gas appliances —
they are NOT plumbers.

═══════════════════════════════════════════════════════════════
```

```
ADDRESS HANDLING LOGIC (v1.1) — CRITICAL
═══════════════════════════════════════════════════════════════

business_location_type    │ Show Address in Schema? │ Show GeoCircle?
──────────────────────────┼─────────────────────────┼─────────────────
service_area (default)    │ ❌ NO — NEVER           │ ✅ YES
storefront                │ ✅ YES                  │ ❌ Optional
both                      │ ✅ YES                  │ ✅ YES

RULES:
1. If business_location_type = 'service_area':
   • Do NOT include "address" object in Schema
   • Do NOT include "geo" coordinates (as they point to home)
   • MUST include "areaServed" with GeoCircle

2. If business_location_type = 'storefront':
   • Include full "address" object
   • Include "geo" coordinates
   • Optional: include "areaServed" if they also travel

3. If business_location_type = 'both':
   • Include "address" (it's a commercial location)
   • Include "areaServed" with GeoCircle

═══════════════════════════════════════════════════════════════
```

```
GEOCIRCLE PATTERN (v1.1) — GOOGLE RECOMMENDED FOR SAB
═══════════════════════════════════════════════════════════════

Instead of listing every city served (which looks spammy),
use a GeoCircle to define the service radius:

"areaServed": {
  "@type": "GeoCircle",
  "geoMidpoint": {
    "@type": "GeoCoordinates",
    "latitude": 52.4862,
    "longitude": -1.8904
  },
  "geoRadius": "32186"  // 20 miles = 32,186 meters
}

CONVERSION: service_radius_miles × 1609.34 = meters

BENEFITS:
✓ Ranks for "[service] in [town]" queries
✓ Without exposing exact location
✓ Cleaner than listing 50+ cities
✓ Google-recommended for SABs

═══════════════════════════════════════════════════════════════
```

```json
COMPLETE SCHEMA — SERVICE_AREA PROVIDER (MOBILE ENGINEER)
═══════════════════════════════════════════════════════════════

{
  "@context": "https://schema.org",
  "@graph": [
    
    // 1. HomeAndConstructionBusiness (Primary) — SAB Compliant
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://ukgradedappliances.com/provider/midlands-appliance-repairs/#business",
      "name": "Midlands Appliance Repairs",
      "alternateName": "Midlands Appliance Repairs Birmingham",
      "description": "Professional appliance repair services in Birmingham...",
      "url": "https://ukgradedappliances.com/provider/midlands-appliance-repairs/",
      "telephone": "+441217XXXXXX",
      "email": "info@midlandsappliance.co.uk",
      "image": "https://ukgradedappliances.com/images/providers/midlands-logo.png",
      "logo": "https://ukgradedappliances.com/images/providers/midlands-logo.png",
      "foundingDate": "2005",
      "numberOfEmployees": "4",
      
      // ⚠️ NO "address" FIELD — This is a service_area business
      // ⚠️ NO "geo" FIELD — Would expose home location
      
      // ✅ USE GeoCircle FOR SERVICE AREA
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 52.4862,
          "longitude": -1.8904
        },
        "geoRadius": "32186"
      },
      
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "16:00"
        }
      ],
      
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "reviewCount": 127,
        "bestRating": 5,
        "worstRating": 1
      },
      
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "John M." },
          "datePublished": "2025-12-15",
          "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
          "reviewBody": "Excellent service. Called in the morning about my washing machine..."
        }
      ],
      
      // Certifications — Use hasCertification (v1.1 recommended over hasCredential)
      "hasCertification": [
        {
          "@type": "Certification",
          "name": "Gas Safe Register",
          "certificationIdentification": "123456",
          "issuedBy": {
            "@type": "Organization",
            "name": "Gas Safe Register",
            "url": "https://www.gassaferegister.co.uk/"
          }
        },
        {
          "@type": "Certification",
          "name": "F-Gas Certification",
          "issuedBy": {
            "@type": "Organization",
            "name": "Environment Agency"
          }
        }
      ],
      
      "memberOf": [
        {
          "@type": "Organization",
          "name": "Which? Trusted Traders",
          "url": "https://trustedtraders.which.co.uk/"
        },
        {
          "@type": "Organization",
          "name": "Checkatrade",
          "url": "https://www.checkatrade.com/"
        }
      ],
      
      // Services offered via OfferCatalog
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Midlands Appliance Repairs Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Washing Machine Repair",
              "serviceType": "Appliance Repair",
              "url": "https://ukgradedappliances.com/england/birmingham/washing-machine-repair/"
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "45",
              "priceCurrency": "GBP",
              "minPrice": "45",
              "maxPrice": "65"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fridge Freezer Repair",
              "serviceType": "Appliance Repair",
              "url": "https://ukgradedappliances.com/england/birmingham/fridge-freezer-repair/"
            }
          }
        ]
      },
      
      "sameAs": [
        "https://www.facebook.com/midlandsappliance",
        "https://www.tiktok.com/@midlandsappliance",
        "https://www.checkatrade.com/trades/midlandsappliance",
        "https://find-and-update.company-information.service.gov.uk/company/12345678"
      ],
      
      "priceRange": "££",
      "paymentAccepted": "Cash, Credit Card, Debit Card, Bank Transfer",
      "currenciesAccepted": "GBP"
    },
    
    // 2. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": "https://ukgradedappliances.com/provider/midlands-appliance-repairs/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ukgradedappliances.com/" },
        { "@type": "ListItem", "position": 2, "name": "England", "item": "https://ukgradedappliances.com/england/" },
        { "@type": "ListItem", "position": 3, "name": "Birmingham", "item": "https://ukgradedappliances.com/england/birmingham/" },
        { "@type": "ListItem", "position": 4, "name": "Midlands Appliance Repairs" }
      ]
    },
    
    // 3. FAQPage
    {
      "@type": "FAQPage",
      "@id": "https://ukgradedappliances.com/provider/midlands-appliance-repairs/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does Midlands Appliance Repairs charge for a callout?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Callout fees are £45-65, which includes diagnosis and the first 30 minutes of labour."
          }
        },
        {
          "@type": "Question",
          "name": "Does Midlands Appliance Repairs offer same-day callouts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, same-day callouts are available. Book before 2pm for same-day service."
          }
        },
        {
          "@type": "Question",
          "name": "What areas does Midlands Appliance Repairs cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We cover Birmingham and surrounding areas within a 20-mile radius, including Solihull, Wolverhampton, Walsall, and West Bromwich."
          }
        }
      ]
    }
  ]
}

═══════════════════════════════════════════════════════════════
```

```json
ALTERNATIVE SCHEMA — STOREFRONT PROVIDER (HAS PHYSICAL SHOP)
═══════════════════════════════════════════════════════════════

If business_location_type = 'storefront' or 'both', THEN include address:

{
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://ukgradedappliances.com/provider/birmingham-appliance-centre/#business",
  "name": "Birmingham Appliance Centre",
  
  // ✅ INCLUDE address — they have a commercial storefront
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 High Street",
    "addressLocality": "Birmingham",
    "postalCode": "B1 1AA",
    "addressCountry": "GB"
  },
  
  // ✅ INCLUDE geo — it's a public commercial location
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 52.4862,
    "longitude": -1.8904
  },
  
  // If business_location_type = 'both', ALSO include areaServed
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 52.4862,
      "longitude": -1.8904
    },
    "geoRadius": "24140"
  }
  
  // ... rest of schema
}

═══════════════════════════════════════════════════════════════
```

### sameAs Entity Authority System (v1.2)

```
SAMEAS ENTITY AUTHORITY — E-E-A-T ENHANCEMENT (v1.2)
═══════════════════════════════════════════════════════════════

PURPOSE:
─────────────────────────────────────────────────────────────────
The "sameAs" property tells search engines that multiple online
presences refer to the SAME real-world business entity. This:

├── Proves the provider is REAL (not a fake listing)
├── Links to authoritative sources (government registries)
├── Boosts "Trust" component of E-E-A-T
├── Helps AI systems verify entity information
└── Competitors rarely do this = competitive advantage

THE "KILLER MOVE" — COMPANIES HOUSE LINK:
─────────────────────────────────────────────────────────────────
UK Companies House is a government registry (.gov.uk domain).
Linking to it proves the provider is a legal UK entity.

URL Pattern:
https://find-and-update.company-information.service.gov.uk/company/{company_number}

Example:
https://find-and-update.company-information.service.gov.uk/company/12345678

DYNAMIC SAMEAS GENERATION:
─────────────────────────────────────────────────────────────────

// lib/schema/generateProviderSchema.ts

function generateSameAsLinks(provider: ProviderProfileData): string[] {
  const sameAsLinks: string[] = [];
  
  // Social profiles
  if (provider.facebook_url) {
    sameAsLinks.push(provider.facebook_url);
  }
  if (provider.tiktok_url) {
    sameAsLinks.push(provider.tiktok_url);
  }
  
  // Trade directories (if available)
  if (provider.checkatrade_url) {
    sameAsLinks.push(provider.checkatrade_url);
  }
  if (provider.trustatrader_url) {
    sameAsLinks.push(provider.trustatrader_url);
  }
  
  // THE KILLER MOVE — Government-verified entity
  if (provider.company_number) {
    sameAsLinks.push(
      `https://find-and-update.company-information.service.gov.uk/company/${provider.company_number}`
    );
  }
  
  return sameAsLinks;
}

// In schema generation
const schema = {
  "@type": "HomeAndConstructionBusiness",
  "name": provider.name,
  // ... other fields ...
  "sameAs": generateSameAsLinks(provider).length > 0 
    ? generateSameAsLinks(provider) 
    : undefined  // Omit if empty
};

SUPPORTED SAMEAS LINKS FOR PROVIDERS:
─────────────────────────────────────────────────────────────────

| Source | Field | URL Pattern | Trust Level |
|--------|-------|-------------|-------------|
| Facebook | facebook_url | https://facebook.com/... | Medium |
| TikTok | tiktok_url | https://tiktok.com/@... | Medium |
| Checkatrade | checkatrade_url | https://checkatrade.com/trades/... | Medium-High |
| Trustatrader | trustatrader_url | https://trustatrader.com/... | Medium-High |
| Companies House | company_number | https://find-and-update.company-information.service.gov.uk/company/{number} | HIGH ✓ |

Note: Trade directories (Checkatrade, Trustatrader) are particularly 
valuable for repair providers as they show verified trade credentials.

COMPANIES HOUSE VERIFICATION:
─────────────────────────────────────────────────────────────────

Option A: Manual Verification (Phase 1)
├── Provider provides company_number during submission
├── Admin verifies at Companies House website
├── If valid → Mark is_verified = true
└── Include in sameAs automatically

Option B: API Verification (Future)
├── Companies House offers FREE API
├── Endpoint: api.company-information.service.gov.uk
├── Can auto-validate company exists
└── Match business name for extra verification

DATA COLLECTION:
─────────────────────────────────────────────────────────────────
When provider submits/claims listing, collect:

| Field | Example | Required |
|-------|---------|----------|
| facebook_url | https://facebook.com/myprovider | Optional |
| tiktok_url | https://tiktok.com/@myprovider | Optional |
| company_number | 12345678 (8 digits) | Optional |

Note: company_number is optional but HIGHLY valuable for E-E-A-T.
Encourage providers to provide it during verification flow.

═══════════════════════════════════════════════════════════════
```

---

## TypeScript Interfaces

```typescript
TYPESCRIPT INTERFACES — PROVIDER PROFILE PAGE
═══════════════════════════════════════════════════════════════

// types/provider-profile-page.ts

import type { ProviderCardData } from './provider-card';

/**
 * Complete provider data for profile page
 * Extends ProviderCardData with additional profile-specific data
 */
export interface ProviderProfileData extends ProviderCardData {
  // Extended fields not in card
  address_line2?: string;
  facebook_url?: string;
  tiktok_url?: string;              // (v1.2) Added for sameAs Entity Authority
  google_maps_url?: string;
  latitude?: number;
  longitude?: number;
  company_number?: string;          // Companies House number (8 digits) for sameAs
  vat_number?: string;
  cover_image_url?: string;
  
  // SAB Fields (v1.1)
  business_location_type: BusinessLocationType;
  service_radius_miles: number;
  
  // Expanded relations
  reviews: ReviewData[];
  reviewStats: ReviewStats;
}

/**
 * Business location type for SAB Schema compliance (v1.1)
 * Determines whether address is shown in Schema.org output
 */
export type BusinessLocationType = 'service_area' | 'storefront' | 'both';

/**
 * SAB Schema configuration (v1.1)
 * Controls Schema.org output based on business type
 */
export interface SABSchemaConfig {
  showAddress: boolean;
  showGeoCircle: boolean;
  geoRadiusMeters: number;
}

/**
 * Review data with all fields
 */
export interface ReviewData {
  id: string;
  rating: number;
  title?: string;
  content?: string;
  reviewer_name?: string;
  reviewer_location?: string;
  is_verified_customer: boolean;
  service_date?: string;
  problem_description?: string;
  appliance_category_name?: string;
  
  // Sub-ratings
  rating_value_for_money?: number;
  rating_punctuality?: number;
  rating_quality?: number;
  rating_communication?: number;
  would_recommend?: boolean;
  
  // Business response
  response?: string;
  response_at?: string;
  
  created_at: string;
}

/**
 * Aggregated review statistics
 */
export interface ReviewStats {
  average_rating: number;
  total_reviews: number;
  avg_value_for_money?: number;
  avg_punctuality?: number;
  avg_quality?: number;
  avg_communication?: number;
  recommend_percentage?: number;
  
  // Rating distribution
  rating_distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

/**
 * Coverage area with full details
 */
export interface CoverageAreaFull {
  place_id: string;
  place_name: string;
  place_slug: string;
  is_primary: boolean;
  additional_callout_fee?: number;
  same_day_available: boolean;
  country_slug: string;
}

/**
 * Repair category with full details
 */
export interface RepairCategoryFull {
  id: string;
  name: string;
  name_singular: string;
  slug: string;
  icon?: string;
  tier: 'tier_1' | 'tier_2' | 'tier_3' | 'supplementary';
  common_issues?: string[];
  
  // Per-category overrides
  offers_same_day?: boolean;
  callout_fee_min?: number;
  callout_fee_max?: number;
  repair_warranty_months?: number;
}

/**
 * Brand authorization with full details
 */
export interface BrandAuthFull {
  id: string;
  brand_id: string;
  brand_name: string;
  brand_slug: string;
  brand_logo_url?: string;
  authorisation_type?: string;
  certificate_number?: string;
  is_verified: boolean;
  valid_until?: string;
}

/**
 * Operating hours structure
 */
export interface OperatingHours {
  monday?: DayHours | null;
  tuesday?: DayHours | null;
  wednesday?: DayHours | null;
  thursday?: DayHours | null;
  friday?: DayHours | null;
  saturday?: DayHours | null;
  sunday?: DayHours | null;
}

export interface DayHours {
  open: string;  // "09:00"
  close: string; // "17:30"
}

/**
 * Other providers for comparison section
 */
export interface OtherProviderSummary {
  id: string;
  slug: string;
  name: string;
  average_rating?: number;
  review_count: number;
  offers_same_day: boolean;
  callout_fee_from?: number;
  short_description?: string;
}

/**
 * Page props
 */
export interface ProviderProfilePageProps {
  params: {
    slug: string;
  };
}

/**
 * Complete page data
 */
export interface ProviderProfilePageData {
  provider: ProviderProfileData;
  repairCategories: RepairCategoryFull[];
  coverageAreas: CoverageAreaFull[];
  authorizedBrands: BrandAuthFull[];
  reviews: ReviewData[];
  reviewStats: ReviewStats;
  otherProviders: OtherProviderSummary[];
  primaryCity: {
    id: string;
    name: string;
    slug: string;
    countrySlug: string;
    storeCount: number;
  };
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  isIndexable: boolean;
}

═══════════════════════════════════════════════════════════════
```

---

## React Page Component

```tsx
REACT PAGE COMPONENT — PROVIDER PROFILE
═══════════════════════════════════════════════════════════════

// app/provider/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumb from '@/components/common/Breadcrumb';
import ProviderHero from '@/components/provider/profile/ProviderHero';
import ContactSidebar from '@/components/provider/profile/ContactSidebar';
import AboutSection from '@/components/provider/profile/AboutSection';
import RepairCategoriesSection from '@/components/provider/profile/RepairCategoriesSection';
import ServiceAreasSection from '@/components/provider/profile/ServiceAreasSection';
import AvailabilitySection from '@/components/provider/profile/AvailabilitySection';
import BrandAuthSection from '@/components/provider/profile/BrandAuthSection';
import CertificationsSection from '@/components/provider/profile/CertificationsSection';
import PricingSection from '@/components/provider/profile/PricingSection';
import WarrantySection from '@/components/provider/profile/WarrantySection';
import ReviewsSection from '@/components/provider/profile/ReviewsSection';
import CommonIssuesSection from '@/components/provider/profile/CommonIssuesSection';
import LocationSection from '@/components/provider/profile/LocationSection';
import FAQSection from '@/components/common/FAQSection';
import WarrantyAffiliate from '@/components/monetization/WarrantyAffiliate';
import PartsAffiliate from '@/components/monetization/PartsAffiliate';
import CrossSellRetail from '@/components/provider/profile/CrossSellRetail';
import OtherProviders from '@/components/provider/profile/OtherProviders';
import ExploreMore from '@/components/provider/profile/ExploreMore';
import MobileStickyCallCTA from '@/components/provider/MobileStickyCallCTA';

import { getProviderProfileData } from '@/lib/providers/getProviderProfileData';
import { generateProviderProfileSchema } from '@/lib/schema/providerProfileSchema';
import { generateProviderFAQs } from '@/lib/content/generateProviderFAQs';
import type { ProviderProfilePageProps } from '@/types/provider-profile-page';

// Generate static params for top providers
export async function generateStaticParams() {
  // Return top 500 providers by score
  // Others generated on-demand
}

// Generate metadata
export async function generateMetadata({
  params,
}: ProviderProfilePageProps): Promise<Metadata> {
  const data = await getProviderProfileData(params.slug);
  
  if (!data) return {};
  
  return {
    title: data.seoTitle,
    description: data.seoDescription,
    alternates: {
      canonical: data.canonicalUrl,
    },
    robots: data.isIndexable ? 'index, follow' : 'noindex, follow',
    openGraph: {
      title: data.seoTitle,
      description: data.seoDescription,
      url: data.canonicalUrl,
      type: 'website',
      images: data.provider.logo_url ? [{ url: data.provider.logo_url }] : [],
    },
  };
}

export default async function ProviderProfilePage({
  params,
}: ProviderProfilePageProps) {
  // Fetch complete provider data
  const data = await getProviderProfileData(params.slug);
  
  if (!data) {
    notFound();
  }
  
  const { provider, repairCategories, coverageAreas, authorizedBrands, 
          reviews, reviewStats, otherProviders, primaryCity } = data;
  
  // Build breadcrumb
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'England', url: '/england/' },
    { name: primaryCity.name, url: `/england/${primaryCity.slug}/` },
    { name: provider.name, url: null },
  ];
  
  // Generate schema
  const schemaJson = generateProviderProfileSchema(data);
  
  // Generate FAQs
  const faqs = generateProviderFAQs(provider, primaryCity);
  
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
        
        {/* Hero Section */}
        <ProviderHero provider={provider} reviewStats={reviewStats} />
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            
            {/* Main Column (2/3) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* About */}
              <AboutSection provider={provider} />
              
              {/* Appliances We Repair */}
              {repairCategories.length > 0 && (
                <RepairCategoriesSection 
                  categories={repairCategories}
                  provider={provider}
                  primaryCity={primaryCity}
                />
              )}
              
              {/* Service Areas */}
              {coverageAreas.length > 0 && (
                <ServiceAreasSection areas={coverageAreas} />
              )}
              
              {/* Availability */}
              <AvailabilitySection provider={provider} />
              
              {/* Brand Authorizations */}
              {authorizedBrands.length > 0 && (
                <BrandAuthSection 
                  brands={authorizedBrands}
                  primaryCity={primaryCity}
                />
              )}
              
              {/* Certifications */}
              <CertificationsSection provider={provider} />
              
              {/* Pricing */}
              <PricingSection provider={provider} />
              
              {/* Warranty */}
              <WarrantySection provider={provider} />
              
              {/* Reviews */}
              <ReviewsSection 
                reviews={reviews}
                stats={reviewStats}
                providerId={provider.id}
                providerSlug={provider.slug}
              />
              
              {/* Common Issues */}
              {repairCategories.some(c => c.common_issues?.length) && (
                <CommonIssuesSection categories={repairCategories} />
              )}
              
              {/* Location */}
              <LocationSection provider={provider} />
              
              {/* FAQs */}
              {faqs.length > 0 && (
                <FAQSection title="Frequently Asked Questions" faqs={faqs} />
              )}
              
              {/* Warranty Affiliate (D&G) */}
              <WarrantyAffiliate 
                providerId={provider.id}
                providerSlug={provider.slug}
              />
              
              {/* Parts Affiliate */}
              <PartsAffiliate 
                categories={repairCategories}
                providerId={provider.id}
              />
              
              {/* Cross-sell to Retail */}
              {primaryCity.storeCount > 0 && (
                <CrossSellRetail 
                  cityName={primaryCity.name}
                  citySlug={primaryCity.slug}
                  storeCount={primaryCity.storeCount}
                />
              )}
              
              {/* Other Providers */}
              {otherProviders.length > 0 && (
                <OtherProviders 
                  providers={otherProviders}
                  cityName={primaryCity.name}
                  citySlug={primaryCity.slug}
                />
              )}
              
              {/* Explore More */}
              <ExploreMore 
                categories={repairCategories}
                primaryCity={primaryCity}
                coverageAreas={coverageAreas}
              />
              
            </div>
            
            {/* Sidebar (1/3) - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <ContactSidebar 
                  provider={provider}
                  reviewStats={reviewStats}
                />
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Mobile Sticky CTA */}
        <MobileStickyCallCTA 
          phone={provider.phone}
          providerId={provider.id}
          providerSlug={provider.slug}
          rating={provider.average_rating}
        />
      </div>
    </>
  );
}

═══════════════════════════════════════════════════════════════
```

---

## Data Fetching

```typescript
DATA FETCHING — PROVIDER PROFILE PAGE
═══════════════════════════════════════════════════════════════

// lib/providers/getProviderProfileData.ts

import { createClient } from '@/lib/supabase/server';
import type { ProviderProfilePageData } from '@/types/provider-profile-page';

export async function getProviderProfileData(
  slug: string
): Promise<ProviderProfilePageData | null> {
  const supabase = createClient();
  
  // 1. Get provider with basic data
  const { data: provider, error } = await supabase
    .from('service_providers')
    .select(`
      *,
      place:places!place_id(
        id, name, slug,
        country:countries(slug)
      )
    `)
    .eq('slug', slug)
    .single();
  
  if (error || !provider) return null;
  
  // Check if indexable
  const isIndexable = provider.is_active && 
                      provider.is_indexable && 
                      ['active', 'claimed', 'verified'].includes(provider.status);
  
  // 2. Get repair categories
  const { data: categories } = await supabase
    .from('provider_services')
    .select(`
      offers_same_day,
      callout_fee_min,
      callout_fee_max,
      repair_warranty_months,
      appliance_categories(
        id, name, name_singular, slug, icon, tier, common_issues
      )
    `)
    .eq('provider_id', provider.id)
    .eq('is_active', true);
  
  // 3. Get coverage areas
  const { data: coverage } = await supabase
    .from('provider_coverage_places')
    .select(`
      is_primary,
      additional_callout_fee,
      same_day_available,
      places(
        id, name, slug,
        country:countries(slug)
      )
    `)
    .eq('provider_id', provider.id)
    .order('is_primary', { ascending: false });
  
  // 4. Get brand authorizations
  const { data: brands } = await supabase
    .from('provider_brand_authorisations')
    .select(`
      authorisation_type,
      certificate_number,
      is_verified,
      valid_until,
      brands(id, name, slug, logo_url)
    `)
    .eq('provider_id', provider.id)
    .or('valid_until.is.null,valid_until.gt.now()');
  
  // 5. Get reviews with stats
  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      *,
      appliance_categories(name)
    `)
    .eq('subject_type', 'provider')
    .eq('subject_id', provider.id)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(10);
  
  // Calculate review stats
  const reviewStats = calculateReviewStats(reviews || []);
  
  // 6. Get other providers in same city
  const primaryPlace = coverage?.find(c => c.is_primary)?.places || provider.place;
  
  const { data: otherProviders } = await supabase
    .from('service_providers')
    .select(`
      id, slug, name, average_rating, review_count,
      offers_same_day, callout_fee_from, short_description
    `)
    .neq('id', provider.id)
    .eq('is_active', true)
    .in('status', ['active', 'claimed', 'verified'])
    .in('id', 
      supabase
        .from('provider_coverage_places')
        .select('provider_id')
        .eq('place_id', primaryPlace?.id)
    )
    .order('is_featured', { ascending: false })
    .order('average_rating', { ascending: false, nullsFirst: false })
    .limit(3);
  
  // 7. Build SEO content
  const seoTitle = provider.seo_title || 
    `${provider.name} - Appliance Repair in ${primaryPlace?.name || 'UK'} | Reviews & Contact`;
  
  const seoDescription = provider.seo_meta_description ||
    `${provider.name} in ${primaryPlace?.name}. ★${provider.average_rating || 'N/A'} (${provider.review_count} reviews). ${provider.short_description || 'Professional appliance repairs'}. Call ${provider.phone}.`;
  
  return {
    provider: {
      ...provider,
      reviews: reviews || [],
      reviewStats,
    },
    repairCategories: transformCategories(categories || []),
    coverageAreas: transformCoverage(coverage || []),
    authorizedBrands: transformBrands(brands || []),
    reviews: reviews || [],
    reviewStats,
    otherProviders: otherProviders || [],
    primaryCity: {
      id: primaryPlace?.id,
      name: primaryPlace?.name,
      slug: primaryPlace?.slug,
      countrySlug: primaryPlace?.country?.slug || 'england',
      storeCount: 0, // Would need separate query
    },
    seoTitle,
    seoDescription,
    canonicalUrl: `https://ukgradedappliances.com/provider/${slug}/`,
    isIndexable,
  };
}

function calculateReviewStats(reviews: any[]): ReviewStats {
  if (reviews.length === 0) {
    return {
      average_rating: 0,
      total_reviews: 0,
      rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }
  
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalRating = 0;
  let totalValue = 0, countValue = 0;
  let totalPunctuality = 0, countPunctuality = 0;
  let totalQuality = 0, countQuality = 0;
  let totalComm = 0, countComm = 0;
  let recommendCount = 0;
  
  for (const review of reviews) {
    totalRating += review.rating;
    distribution[review.rating as 1|2|3|4|5]++;
    
    if (review.rating_value_for_money) { totalValue += review.rating_value_for_money; countValue++; }
    if (review.rating_punctuality) { totalPunctuality += review.rating_punctuality; countPunctuality++; }
    if (review.rating_quality) { totalQuality += review.rating_quality; countQuality++; }
    if (review.rating_communication) { totalComm += review.rating_communication; countComm++; }
    if (review.would_recommend) recommendCount++;
  }
  
  return {
    average_rating: totalRating / reviews.length,
    total_reviews: reviews.length,
    avg_value_for_money: countValue > 0 ? totalValue / countValue : undefined,
    avg_punctuality: countPunctuality > 0 ? totalPunctuality / countPunctuality : undefined,
    avg_quality: countQuality > 0 ? totalQuality / countQuality : undefined,
    avg_communication: countComm > 0 ? totalComm / countComm : undefined,
    recommend_percentage: (recommendCount / reviews.length) * 100,
    rating_distribution: distribution,
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
└── provider/
    └── [slug]/
        ├── page.tsx              # Main page component
        ├── loading.tsx           # Loading skeleton
        └── not-found.tsx         # 404 page

components/
├── provider/
│   ├── profile/
│   │   ├── ProviderHero.tsx
│   │   ├── ContactSidebar.tsx
│   │   ├── AboutSection.tsx
│   │   ├── RepairCategoriesSection.tsx
│   │   ├── ServiceAreasSection.tsx
│   │   ├── AvailabilitySection.tsx
│   │   ├── BrandAuthSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── WarrantySection.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── CommonIssuesSection.tsx
│   │   ├── LocationSection.tsx
│   │   ├── CrossSellRetail.tsx
│   │   ├── OtherProviders.tsx
│   │   ├── ExploreMore.tsx
│   │   └── index.ts
│   ├── ProviderCard.tsx          # From Spec 09
│   ├── MobileStickyCallCTA.tsx
│   └── index.ts
├── monetization/
│   ├── WarrantyAffiliate.tsx     # D&G affiliate
│   ├── PartsAffiliate.tsx        # eSpares affiliate
│   └── index.ts
└── common/
    ├── Breadcrumb.tsx
    ├── FAQSection.tsx
    └── StarRating.tsx

lib/
├── providers/
│   ├── getProviderProfileData.ts
│   ├── getProvidersForCity.ts    # From Spec 10
│   └── getProvidersForCategory.ts
├── schema/
│   ├── providerProfileSchema.ts
│   ├── repairCategorySchema.ts
│   └── ProviderSchema.tsx        # (v1.1) SAB-compliant Schema component
├── content/
│   └── generateProviderFAQs.ts
└── tracking/
    ├── trackClick.ts
    └── trackAffiliate.ts

types/
├── provider-profile-page.ts
└── provider-card.ts

═══════════════════════════════════════════════════════════════
```

---

## Click Tracking Implementation

```typescript
CLICK TRACKING — PROVIDER PROFILE PAGE
═══════════════════════════════════════════════════════════════

// lib/tracking/trackClick.ts

interface TrackClickParams {
  eventType: 'call_click' | 'website_click' | 'profile_view' | 'affiliate_click';
  subjectType: 'provider' | 'store';
  subjectId: string;
  placeId?: string;
  categoryId?: string;
  pagePath: string;
  pageType: string;
  context?: Record<string, any>;
}

export async function trackClick(params: TrackClickParams): Promise<void> {
  // Client-side tracking
  if (typeof window === 'undefined') return;
  
  try {
    await fetch('/api/track/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: params.eventType,
        subject_type: params.subjectType,
        subject_id: params.subjectId,
        place_id: params.placeId,
        appliance_category_id: params.categoryId,
        page_path: params.pagePath,
        page_type: params.pageType,
        session_id: getSessionId(),
        referrer: document.referrer,
        ...params.context,
      }),
    });
  } catch (error) {
    console.error('Failed to track click:', error);
  }
}

// lib/tracking/trackAffiliate.ts

interface TrackAffiliateParams {
  partner: 'dg' | 'ao' | 'espares';
  productType: 'warranty' | 'parts';
  providerId?: string;
  storeId?: string;
  placeId?: string;
  categoryId?: string;
  sourcePage: string;
}

export async function trackAffiliate(params: TrackAffiliateParams): Promise<void> {
  if (typeof window === 'undefined') return;
  
  try {
    await fetch('/api/track/affiliate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        affiliate_partner: params.partner,
        product_type: params.productType,
        provider_id: params.providerId,
        store_id: params.storeId,
        place_id: params.placeId,
        category_id: params.categoryId,
        source_page: params.sourcePage,
        session_id: getSessionId(),
      }),
    });
  } catch (error) {
    console.error('Failed to track affiliate click:', error);
  }
}

═══════════════════════════════════════════════════════════════
```

---

## SAB Schema Generation (v1.1)

```typescript
SAB-COMPLIANT SCHEMA GENERATION (v1.1)
═══════════════════════════════════════════════════════════════

// lib/schema/ProviderSchema.tsx

import type { ProviderProfileData, BusinessLocationType } from '@/types/provider-profile-page';

const MILES_TO_METERS = 1609.34;
const DEFAULT_SERVICE_RADIUS_MILES = 20;

/**
 * Determine if address should be shown in Schema based on business type
 */
function shouldShowAddress(locationType: BusinessLocationType, hasAddress: boolean): boolean {
  return (locationType === 'storefront' || locationType === 'both') && hasAddress;
}

/**
 * Generate GeoCircle for service area
 */
function generateGeoCircle(
  latitude: number,
  longitude: number,
  radiusMiles: number
): object {
  return {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    },
    geoRadius: Math.round(radiusMiles * MILES_TO_METERS).toString(),
  };
}

/**
 * Generate SAB-compliant Schema for provider
 */
export function generateProviderSchema(provider: ProviderProfileData): object {
  const locationType = provider.business_location_type || 'service_area';
  const hasValidAddress = !!(provider.address_line1 && provider.city_name);
  const showAddress = shouldShowAddress(locationType, hasValidAddress);
  
  // Build base schema
  const schema: Record<string, any> = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': `https://ukgradedappliances.com/provider/${provider.slug}/#business`,
    name: provider.name,
    url: `https://ukgradedappliances.com/provider/${provider.slug}/`,
    telephone: provider.phone,
  };
  
  // Optional fields
  if (provider.email) schema.email = provider.email;
  if (provider.description) schema.description = provider.description;
  if (provider.logo_url) {
    schema.logo = provider.logo_url;
    schema.image = provider.logo_url;
  }
  if (provider.years_trading) {
    schema.foundingDate = (new Date().getFullYear() - provider.years_trading).toString();
  }
  if (provider.number_of_engineers) {
    schema.numberOfEmployees = provider.number_of_engineers.toString();
  }
  
  // =========================================================================
  // ADDRESS HANDLING — SAB CRITICAL LOGIC
  // =========================================================================
  
  if (showAddress) {
    // ONLY include address for storefront or both types
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: [provider.address_line1, provider.address_line2]
        .filter(Boolean).join(', '),
      addressLocality: provider.city_name,
      postalCode: provider.postcode,
      addressCountry: 'GB',
    };
    
    // Also include geo for storefronts (it's a commercial location)
    if (provider.latitude && provider.longitude) {
      schema.geo = {
        '@type': 'GeoCoordinates',
        latitude: provider.latitude,
        longitude: provider.longitude,
      };
    }
  }
  
  // =========================================================================
  // AREA SERVED — Always include GeoCircle for service_area and both types
  // =========================================================================
  
  if (locationType !== 'storefront' && provider.latitude && provider.longitude) {
    const radiusMiles = provider.service_radius_miles || DEFAULT_SERVICE_RADIUS_MILES;
    schema.areaServed = generateGeoCircle(
      provider.latitude,
      provider.longitude,
      radiusMiles
    );
  }
  
  // =========================================================================
  // RATINGS
  // =========================================================================
  
  if (provider.average_rating && provider.review_count > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: provider.average_rating,
      reviewCount: provider.review_count,
      bestRating: 5,
      worstRating: 1,
    };
  }
  
  // =========================================================================
  // CERTIFICATIONS (Use hasCertification, not hasCredential)
  // =========================================================================
  
  const certifications: object[] = [];
  
  if (provider.gas_safe_registered && provider.gas_safe_number) {
    certifications.push({
      '@type': 'Certification',
      name: 'Gas Safe Register',
      certificationIdentification: provider.gas_safe_number,
      issuedBy: {
        '@type': 'Organization',
        name: 'Gas Safe Register',
        url: 'https://www.gassaferegister.co.uk/',
      },
    });
  }
  
  if (provider.fgas_certified) {
    certifications.push({
      '@type': 'Certification',
      name: 'F-Gas Certification',
      issuedBy: {
        '@type': 'Organization',
        name: 'Environment Agency',
      },
    });
  }
  
  if (provider.checkatrade_member && provider.checkatrade_id) {
    certifications.push({
      '@type': 'Certification',
      name: 'Checkatrade Member',
      certificationIdentification: provider.checkatrade_id,
      issuedBy: {
        '@type': 'Organization',
        name: 'Checkatrade',
        url: 'https://www.checkatrade.com/',
      },
    });
  }
  
  if (provider.which_trusted_trader) {
    certifications.push({
      '@type': 'Certification',
      name: 'Which? Trusted Trader',
      issuedBy: {
        '@type': 'Organization',
        name: 'Which?',
        url: 'https://trustedtraders.which.co.uk/',
      },
    });
  }
  
  if (certifications.length > 0) {
    schema.hasCertification = certifications;
  }
  
  // Standard fields
  schema.currenciesAccepted = 'GBP';
  schema.paymentAccepted = 'Cash, Credit Card, Debit Card, Bank Transfer';
  
  return schema;
}

/**
 * React component for rendering Schema
 */
export default function ProviderSchemaComponent({ 
  provider 
}: { 
  provider: ProviderProfileData 
}) {
  const schema = generateProviderSchema(provider);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}

═══════════════════════════════════════════════════════════════
```

---

## Database Migration (v1.1)

```sql
DATABASE MIGRATION — SAB SUPPORT FIELDS (v1.1)
═══════════════════════════════════════════════════════════════

-- Add business location type enum
DO $$ BEGIN
  CREATE TYPE business_location_type_enum AS ENUM (
    'service_area',  -- Mobile engineer (default) — NO address in Schema
    'storefront',    -- Has physical shop — Include address
    'both'           -- Shop + mobile service — Include both
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Add new columns to service_providers
ALTER TABLE service_providers 
  ADD COLUMN IF NOT EXISTS business_location_type 
    business_location_type_enum DEFAULT 'service_area',
  ADD COLUMN IF NOT EXISTS service_radius_miles 
    INTEGER DEFAULT 20;

-- Comments
COMMENT ON COLUMN service_providers.business_location_type IS 
  'SAB compliance: service_area=no address in schema, storefront=include address';

COMMENT ON COLUMN service_providers.service_radius_miles IS 
  'Service coverage radius in miles. Converted to meters for Schema GeoCircle.';

-- Constraint
ALTER TABLE service_providers 
  ADD CONSTRAINT check_service_radius_reasonable 
  CHECK (service_radius_miles IS NULL OR 
         (service_radius_miles >= 1 AND service_radius_miles <= 100));

═══════════════════════════════════════════════════════════════
```

---

## Implementation Checklist

### Phase 1: Core Page Structure
- [ ] Next.js route setup (provider/[slug])
- [ ] Data fetching function
- [ ] Breadcrumb component
- [ ] Hero section with rating/badges

### Phase 1.1: SAB Database Setup (v1.1)
- [ ] Run migration: add business_location_type enum
- [ ] Run migration: add service_radius_miles column
- [ ] Set default business_location_type = 'service_area' for existing providers
- [ ] Verify constraint on service_radius_miles (1-100)

### Phase 2: Contact & Conversion
- [ ] Contact sidebar (desktop)
- [ ] Mobile sticky call CTA
- [ ] Call click tracking
- [ ] Website click tracking
- [ ] Opening hours with "Open now"

### Phase 3: Service Information
- [ ] About section
- [ ] Repair categories with links
- [ ] Service areas display
- [ ] Availability badges
- [ ] Brand authorizations

### Phase 4: Trust Building
- [ ] Certifications (expanded)
- [ ] Pricing information
- [ ] Warranty details
- [ ] Gas Safe verification link
- [ ] Checkatrade verification link

### Phase 5: Reviews
- [ ] Review stats summary
- [ ] Sub-ratings breakdown
- [ ] Individual review cards
- [ ] Business responses
- [ ] Load more pagination

### Phase 6: Additional Content
- [ ] Common issues section
- [ ] Location with map embed
- [ ] FAQs (generated)
- [ ] Other providers

### Phase 7: Monetization
- [ ] Warranty affiliate (D&G)
- [ ] Parts affiliate (eSpares)
- [ ] Affiliate click tracking
- [ ] Cross-sell to retail

### Phase 8: SEO & Schema — SAB COMPLIANT (v1.1)
- [ ] Meta tags generation
- [ ] Schema.org JSON-LD with SAB logic
- [ ] **Verify: service_area providers have NO address in Schema**
- [ ] **Verify: GeoCircle used instead of city list**
- [ ] Canonical URL
- [ ] robots meta
- [ ] Open Graph tags

### Phase 9: Mobile & Polish
- [ ] Mobile responsive
- [ ] Accordion sections
- [ ] Performance optimization
- [ ] Accessibility audit

---

## Testing Requirements

```
TESTING — PROVIDER PROFILE PAGE (v1.1 Updated)
═══════════════════════════════════════════════════════════════

UNIT TESTS:
├── Review stats calculation
├── FAQ generation
├── Opening hours "Open now" logic
├── Schema.org generation
├── URL construction for links
├── (v1.1) SAB schema type determination
├── (v1.1) GeoCircle radius calculation (miles → meters)
├── (v1.1) shouldShowAddress() logic

INTEGRATION TESTS:
├── Data fetching with real provider
├── Click tracking submission
├── Affiliate tracking submission
├── Reviews pagination
├── (v1.1) Schema renders correctly for service_area provider
├── (v1.1) Schema renders correctly for storefront provider
├── (v1.1) Schema renders correctly for both type provider

E2E TESTS:
├── Page loads with correct data
├── Call button works (tel: link)
├── Website link tracking fires
├── Affiliate links track and redirect
├── Reviews load more works
├── Map embed loads
├── Mobile sticky CTA visible

SEO TESTS:
├── Meta tags present
├── Schema.org validates
├── Canonical URL correct
├── noindex for inactive providers
├── (v1.1) service_area Schema has NO address field
├── (v1.1) service_area Schema has GeoCircle areaServed
├── (v1.1) storefront Schema has address field
├── (v1.1) Schema type is HomeAndConstructionBusiness (not LocalBusiness)

SAB COMPLIANCE TESTS (v1.1):
├── Provider with business_location_type='service_area':
│   ├── ❌ NO "address" in Schema.org output
│   ├── ❌ NO "geo" coordinates exposed
│   ├── ✅ HAS "areaServed" with GeoCircle
│   ├── ✅ GeoCircle geoRadius is in meters
├── Provider with business_location_type='storefront':
│   ├── ✅ HAS "address" in Schema.org output
│   ├── ✅ HAS "geo" coordinates
│   ├── ❌ NO "areaServed" (optional)
├── Provider with business_location_type='both':
│   ├── ✅ HAS "address" in Schema.org output
│   ├── ✅ HAS "geo" coordinates
│   ├── ✅ HAS "areaServed" with GeoCircle

PERFORMANCE TESTS:
├── LCP < 2.5s
├── FID < 100ms
├── CLS < 0.1
├── Map loads lazily

═══════════════════════════════════════════════════════════════
```

---

**END OF PROVIDER PROFILE PAGE SPECIFICATION**

═══════════════════════════════════════════════════════════════
Document Status: ✅ LOCKED
Version: 1.2
Original: January 2026
v1.1 Amendment: January 2026 — SAB Schema Compliance
v1.2 Amendment: January 2026 — Entity Authority via sameAs (TikTok + Companies House)
Connected Specs: 
├── Spec 09: Provider Card Component
├── Spec 10: Repair Category Page
├── Spec 07: City Page Hub
├── Spec 06: Store Profile Page (v1.1 — same Entity Authority pattern)

v1.1 CHANGELOG:
├── Added business_location_type field (service_area|storefront|both)
├── Added service_radius_miles field
├── Updated Schema.org to use GeoCircle for areaServed
├── Added SAB address hiding logic (no address for service_area)
├── Changed hasCredential to hasCertification
├── Added SAB-specific tests to Testing Requirements
├── Added Phase 1.1 to Implementation Checklist

v1.2 CHANGELOG:
├── Added tiktok_url to SOCIAL section in database schema
├── Added tiktok_url to ProviderProfileData TypeScript interface
├── Updated Schema.org sameAs example with TikTok + Companies House
├── Added Section: "sameAs Entity Authority System (v1.2)"
├── Documented dynamic sameAs generation logic
├── Documented Companies House verification process
├── Added trade directory support (Checkatrade, Trustatrader)

WHY ENTITY AUTHORITY MATTERS (E-E-A-T):
─────────────────────────────────────────────────────────────────
├── Companies House link proves provider is legal UK entity
├── Government .gov.uk domain = HIGH trust signal
├── AI systems can verify entity from authoritative source
├── Competitors rarely implement this = competitive advantage
├── Trade directories add extra credibility for repair providers
└── Boosts "Trust" component of Google's E-E-A-T framework
═══════════════════════════════════════════════════════════════
