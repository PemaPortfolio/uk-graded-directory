# Provider Card Component Specification

**Version:** 1.1 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED  
**v1.1 Amendment:** Lead-Tracking Phone Display Pattern (RevealPhoneNumber)

---

## Executive Summary

The Provider Card is a **reusable component** that displays repair engineer/service provider information across the platform. Unlike Store Cards (retail browsing), Provider Cards serve **urgent, problem-driven users** who need their appliance fixed.

### Strategic Role (Why This Component Matters)

The Provider Card is NOT just a listing — it is:

| Role | Purpose |
|------|---------|
| **Semantic Authority Unit** | Structured data that Google/AI can understand |
| **AI-Extractable Answer Block** | Feeds ChatGPT, Perplexity, Google AI citations |
| **Internal Linking Engine** | Distributes PageRank to category/brand pages |
| **Conversion Surface** | Optimized for phone calls (primary CTA) |
| **Trust & Verification Container** | Certifications, warranties, insurance |
| **Lead Attribution Asset (v1.1)** | Tracks verified call intents for monetization |

### Key Behavioral Differences: Retail vs Repair

| Aspect | Store Card (Retail) | Provider Card (Repair) |
|--------|---------------------|------------------------|
| **User State** | Browsing, comparing | Urgent, appliance broken |
| **Decision Time** | Days/weeks | Hours, same day |
| **Primary CTA** | Website/Call | **📞 Call NOW** |
| **Trust Signals** | Warranty, delivery | Certifications, insurance |
| **Keywords** | Brand, price | Urgency, location, fault |
| **AI Query Type** | "best graded washing machine" | "washing machine not spinning" |

### Where Provider Cards Appear

| Context | URL Pattern | Card Variant |
|---------|-------------|--------------|
| City Hub (repair section) | `/england/birmingham/` | Compact |
| Repair Category Page | `/england/birmingham/washing-machine-repair/` | Full |
| Brand Repair Page | `/england/birmingham/bosch-repair/` | Full |
| Provider Profile | `/provider/{slug}/` | Hero (profile) |
| Search Results | `/search?q=...` | Compact |

---

## Data Schema Reference

```
SERVICE_PROVIDERS TABLE — FIELDS USED BY CARD
═══════════════════════════════════════════════════════════════

CORE IDENTITY:
─────────────────────────────────────────────────────────────
id                          UUID          Primary key
slug                        VARCHAR(255)  URL segment
name                        VARCHAR(255)  Business name
trading_name                VARCHAR(255)  Alternative name

CONTACT (phone is REQUIRED — primary CTA):
─────────────────────────────────────────────────────────────
phone                       VARCHAR(50)   NOT NULL — Primary CTA
phone_secondary             VARCHAR(50)   Backup number
email                       VARCHAR(255)  For inquiries
website                     VARCHAR(500)  Optional

LOCATION:
─────────────────────────────────────────────────────────────
address_line1               VARCHAR(255)  Base address
city_name                   VARCHAR(200)  Primary city
postcode                    VARCHAR(20)   Postcode
latitude                    NUMERIC       For distance calc
longitude                   NUMERIC       For distance calc

BUSINESS DETAILS:
─────────────────────────────────────────────────────────────
description                 TEXT          Full description
short_description           VARCHAR(500)  Card summary
operating_hours             JSONB         Hours by day
years_trading               INTEGER       "20+ years experience"
number_of_engineers         INTEGER       Team size

PRICING (Key trust signals):
─────────────────────────────────────────────────────────────
callout_fee_from            NUMERIC(8,2)  "From £45"
callout_fee_to              NUMERIC(8,2)  "Up to £75"
no_fix_no_fee               BOOLEAN       Major trust signal
free_quotes                 BOOLEAN       Trust signal

AVAILABILITY (Urgency signals — AI search gold):
─────────────────────────────────────────────────────────────
offers_same_day             BOOLEAN       ⚡ Same-day callouts
offers_next_day             BOOLEAN       Next-day available
offers_emergency            BOOLEAN       🚨 Emergency service
offers_weekend              BOOLEAN       Weekend availability
offers_evening              BOOLEAN       Evening slots
typical_response_time       VARCHAR(100)  "Usually within 2 hours"

CERTIFICATIONS & TRUST (UK-specific — critical for ranking):
─────────────────────────────────────────────────────────────
gas_safe_registered         BOOLEAN       Required for gas appliances
gas_safe_number             VARCHAR(50)   Verifiable number
gas_safe_expiry             DATE          Expiry date
fgas_certified              BOOLEAN       F-Gas for fridges/AC
which_trusted_trader        BOOLEAN       Which? endorsement
checkatrade_member          BOOLEAN       Checkatrade badge
checkatrade_id              VARCHAR(50)   Verifiable ID
trustatrader_member         BOOLEAN       Trustatrader badge
public_liability_insurance  BOOLEAN       Insurance coverage
insurance_amount            NUMERIC(12,2) Coverage amount (£1m+)
is_verified                 BOOLEAN       Our verification

WARRANTY ON REPAIRS:
─────────────────────────────────────────────────────────────
warranty_on_repairs_months  INTEGER       "6-month warranty on repairs"
warranty_on_parts_months    INTEGER       "12-month warranty on parts"
uses_genuine_parts          BOOLEAN       "Uses genuine parts"

RATINGS:
─────────────────────────────────────────────────────────────
average_rating              NUMERIC(3,2)  0.00 to 5.00
review_count                INTEGER       Total reviews

MEDIA:
─────────────────────────────────────────────────────────────
logo_url                    VARCHAR(500)  Provider logo
cover_image_url             VARCHAR(500)  Hero image

STATUS:
─────────────────────────────────────────────────────────────
status                      ENUM          pending|active|claimed|verified
is_featured                 BOOLEAN       Promoted listing
is_active                   BOOLEAN       Display on site

FROM JUNCTION TABLES:
─────────────────────────────────────────────────────────────
provider_services           Many-to-many  Repair categories (CRITICAL)
provider_coverage_places    Many-to-many  Service areas
provider_brand_authorisations Many-to-many  Authorized brands

═══════════════════════════════════════════════════════════════
```

---

## SEO & Keyword Integration

```
KEYWORD STRATEGY — PROVIDER CARD
═══════════════════════════════════════════════════════════════

The Provider Card is a RANKING UNIT that distributes authority.
Every card feeds keywords to canonical pages without duplication.

KEYWORD TYPES EMBEDDED IN ONE CARD:
─────────────────────────────────────────────────────────────────

TYPE                WHERE IT LIVES              EXAMPLE
─────────────────────────────────────────────────────────────────
Short-tail          Card title + category list  "appliance repair"
Long-tail           Category + city links       "washing machine repair manchester"
Geographic          City name + coverage        "appliance repair near me"
Brand repair        Brand badges                "bosch repair manchester"
Problem-based       Expandable issues section   "washing machine not spinning"
Commercial urgency  Service modifiers           "same day appliance repair"

INTERNAL LINKS EMITTED BY ONE CARD:
─────────────────────────────────────────────────────────────────

Each Provider Card creates these SEO-critical internal links:

1. REPAIR CATEGORY PAGES (highest value):
   └── /england/manchester/washing-machine-repair/
   └── /england/manchester/fridge-freezer-repair/
   └── /england/manchester/dishwasher-repair/

2. BRAND REPAIR PAGES (Phase 2, high trust):
   └── /england/manchester/bosch-repair/
   └── /england/manchester/samsung-repair/

3. CITY HUB:
   └── /england/manchester/

4. PROVIDER PROFILE:
   └── /provider/{slug}/

WHY THIS MATTERS:
─────────────────────────────────────────────────────────────────
• Prevents orphan pages
• Builds topic authority clusters  
• Feeds programmatic SEO at scale
• Creates perfect crawl paths
• Distributes PageRank to target pages

ONE CARD = HUNDREDS OF KEYWORDS
─────────────────────────────────────────────────────────────────

A single card for "Joe's Appliance Repairs (Manchester)" feeds:
• washing machine repair manchester
• same day washing machine repair near me
• bosch washing machine repair manchester
• emergency fridge freezer repair
• appliance repair near me
• local white goods engineer manchester
• no fix no fee appliance repair

WITHOUT keyword stuffing. WITHOUT spam. WITHOUT thin content.

═══════════════════════════════════════════════════════════════
```

---

## Component Architecture

```
COMPONENT HIERARCHY
═══════════════════════════════════════════════════════════════

ProviderCard (main wrapper)
├── ProviderCardHeader
│   ├── ProviderLogo
│   ├── ProviderNameRating
│   │   ├── ProviderName (link to profile)
│   │   ├── RatingDisplay
│   │   └── VerifiedBadge
│   ├── FeaturedBadge (conditional)
│   └── BrandAuthorizations (trust signal)
│
├── ProviderCardBody
│   ├── ProviderDescription
│   ├── RepairCategoriesList (MOST IMPORTANT — SEO)
│   │   └── CategoryLink (→ repair category page)
│   ├── UrgencyBadges
│   │   ├── SameDayBadge
│   │   ├── EmergencyBadge
│   │   └── AvailabilityBadges
│   ├── TrustBadges
│   │   ├── CertificationBadges (Gas Safe, F-Gas)
│   │   ├── InsuranceBadge
│   │   └── WarrantyBadge
│   ├── PricingInfo
│   │   ├── CalloutFee
│   │   └── NoFixNoFeeBadge
│   └── CoverageArea
│
├── ProviderCardFooter
│   ├── CallButton (PRIMARY CTA — urgent)
│   ├── ViewProfileButton (secondary)
│   └── CrossSellLink (to retail)
│
└── ProviderCardExpanded (optional)
    └── CommonIssuesFixed (AI search hack)

═══════════════════════════════════════════════════════════════
```

---

## Visual Specification — Full Variant

### Desktop Layout

```
PROVIDER CARD — FULL VARIANT (DESKTOP)
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────┐                                                               │
│  │         │   MIDLANDS APPLIANCE REPAIRS               ⭐ 4.9 (127)      │
│  │  LOGO   │   ━━━━━━━━━━━━━━━━━━━━━━━━━                                  │
│  │  80×80  │   20+ years experience • 4 engineers          ✓ Verified    │
│  └─────────┘                                                               │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Authorized repairs: Bosch • Samsung • LG • Siemens • Hotpoint      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Birmingham's most trusted appliance repair service. Same-day callouts    │
│  available across the West Midlands. All work guaranteed.                 │
│                                                                             │
│  APPLIANCES WE REPAIR (links to category pages)                           │
│  ✓ Washing Machine Repair  ✓ Fridge Freezer Repair  ✓ Dishwasher Repair  │
│  ✓ Tumble Dryer Repair     ✓ Oven & Cooker Repair   ✓ Hob Repair         │
│                                                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ ⚡ Same-day│ │ 🚨 24/7    │ │ 🛡️ Gas Safe│ │ 📋 6-Month │              │
│  │ Callouts   │ │ Emergency  │ │ Registered │ │ Warranty   │              │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘              │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ 💰 From £45 callout fee   │   ✓ No Fix, No Fee   │   ✓ Insured £2m  │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  📍 Serving Birmingham & surrounding areas (15 mile radius)               │
│                                                                             │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐         │
│  │   📞 CALL NOW: 0121 XXX    │  │     VIEW FULL PROFILE →     │         │
│  └─────────────────────────────┘  └─────────────────────────────┘         │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  🛒 Appliance beyond repair? Browse graded replacements from £149 →       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### Mobile Layout

```
PROVIDER CARD — FULL VARIANT (MOBILE)
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────┐
│                                         │
│  ┌──────┐  MIDLANDS APPLIANCE REPAIRS   │
│  │ LOGO │  ━━━━━━━━━━━━━━━━━            │
│  │60×60 │  ⭐ 4.9 (127) • ✓ Verified   │
│  └──────┘  20+ years experience         │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Bosch • Samsung • LG authorized │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Birmingham's most trusted appliance   │
│  repair service. Same-day callouts...  │
│  [Show more]                           │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  APPLIANCES WE REPAIR                   │
│  ✓ Washing Machines • ✓ Fridge Freezers│
│  ✓ Dishwashers • +3 more               │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │⚡ Same- │ │🛡️ Gas   │ │📋 6-mo  │   │
│  │day      │ │Safe     │ │Warranty │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                         │
│  💰 From £45 • ✓ No Fix No Fee         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │     📞 CALL NOW: 0121 XXX       │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      VIEW FULL PROFILE →        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ─────────────────────────────────────  │
│  🛒 Beyond repair? Browse replacements →│
│                                         │
└─────────────────────────────────────────┘

STICKY CTA (Fixed bottom on scroll):
┌─────────────────────────────────────────┐
│        📞 CALL NOW: 0121 XXX XXX       │
└─────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

---

## Visual Specification — Compact Variant

```
PROVIDER CARD — COMPACT VARIANT
═══════════════════════════════════════════════════════════════

Used in: City Hub repair section, search previews, sidebars

Desktop (horizontal):
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│  ⭐ 4.9  MIDLANDS APPLIANCE REPAIRS                Bosch • Samsung • LG  │
│         Same-day callouts • 20 years experience    ✓ Verified           │
│         From £45 • No fix no fee                        [View Profile →] │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘

Mobile (vertical):
┌─────────────────────────────────┐
│                                 │
│  ⭐ 4.9  MIDLANDS APPLIANCE     │
│          REPAIRS                │
│          ━━━━━━━━━━━━           │
│          Bosch • Samsung • LG   │
│          ✓ Verified             │
│                                 │
│  Same-day • 20 years • £45     │
│  ✓ No fix no fee               │
│                                 │
│  ┌─────────────────────────┐   │
│  │     View Profile →      │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

---

## Visual Specification — Featured Variant

```
PROVIDER CARD — FEATURED VARIANT
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ ★ FEATURED ENGINEER                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [Same content as Full variant with enhanced styling]                       │
│                                                                             │
│  STYLING DIFFERENCES:                                                       │
│  ├── Border:           2px solid #059669 (green-600)                       │
│  ├── Background:       Linear gradient top: #ECFDF5 → #FFFFFF              │
│  ├── Featured badge:   Top-left ribbon "★ FEATURED ENGINEER"               │
│  ├── Box shadow:       0 4px 20px rgba(5, 150, 105, 0.2)                   │
│  └── Sort position:    Always appears first in listings                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

WHY GREEN (not amber like stores):
─────────────────────────────────────────────────────────────────
Green = Trust, safety, reliability
This aligns with repair service psychology (user needs reassurance)
Amber = Deals, savings (retail psychology)

═══════════════════════════════════════════════════════════════
```

---

## Repair Categories Section (MOST IMPORTANT FOR SEO)

```
REPAIR CATEGORIES — THE SEO WEAPON
═══════════════════════════════════════════════════════════════

This section is WHERE THE MONEY IS for programmatic SEO.
Each category MUST link to the canonical repair category page.

DISPLAY RULES:
─────────────────────────────────────────────────────────────────
• Show top 3-5 repair categories only
• Ordered by:
  1. Demand (washing machines, fridge freezers first)
  2. Provider specialization
  3. Keyword value (tier_1 > tier_2 > tier_3)
• Each category is a LINK, not just text

VISUAL FORMAT:
─────────────────────────────────────────────────────────────────

APPLIANCES WE REPAIR
✓ Washing Machine Repair  ✓ Fridge Freezer Repair
✓ Dishwasher Repair       ✓ Tumble Dryer Repair
✓ Oven & Cooker Repair    +2 more

LINK STRUCTURE (Critical):
─────────────────────────────────────────────────────────────────

"Washing Machine Repair" → /england/{city}/washing-machine-repair/
"Fridge Freezer Repair"  → /england/{city}/fridge-freezer-repair/
"Dishwasher Repair"      → /england/{city}/dishwasher-repair/

NEVER link to:
• /provider/{slug}/washing-machines/ (doesn't exist)
• Generic /washing-machine-repair/ (wrong geo)

DATA SOURCE:
─────────────────────────────────────────────────────────────────

SELECT ac.name, ac.slug, ac.name_singular
FROM provider_services ps
JOIN appliance_categories ac ON ps.appliance_category_id = ac.id
WHERE ps.provider_id = {provider_id}
  AND ps.is_active = true
  AND ac.supports_repair = true
ORDER BY ac.tier ASC, ac.display_order ASC
LIMIT 6;

WHY THIS MATTERS:
─────────────────────────────────────────────────────────────────
• Every Provider Card votes for category pages
• Creates crawl paths for Googlebot
• Builds topical authority clusters
• Prevents orphan repair category pages
• AI systems see entity relationships

═══════════════════════════════════════════════════════════════
```

---

## Brand Authorization Section (AI Trust Multiplier)

```
BRAND AUTHORIZATIONS — TRUST SIGNAL
═══════════════════════════════════════════════════════════════

DISPLAY RULES:
─────────────────────────────────────────────────────────────────
• Only show verified or claimed authorizations
• Maximum 5 brands (to avoid clutter)
• Premium brands first (Bosch, Samsung, LG, etc.)

VISUAL FORMAT:
─────────────────────────────────────────────────────────────────

Desktop (inline):
┌─────────────────────────────────────────────────────────────┐
│ Authorized repairs: Bosch • Samsung • LG • Siemens • Neff  │
└─────────────────────────────────────────────────────────────┘

Mobile (pills):
┌──────┐ ┌─────────┐ ┌────┐ ┌─────────┐
│ Bosch│ │ Samsung │ │ LG │ │ Siemens │
└──────┘ └─────────┘ └────┘ └─────────┘

LINK STRUCTURE (Phase 2):
─────────────────────────────────────────────────────────────────

Each brand links to brand repair page:
"Bosch" → /england/{city}/bosch-repair/
"Samsung" → /england/{city}/samsung-repair/

If no brand repair page exists yet, link to provider profile.

WHY THIS MATTERS FOR AI SEARCH:
─────────────────────────────────────────────────────────────────
LLMs strongly prefer brand-specific repair answers.
When someone asks "who repairs Bosch washing machines in Manchester?"
AI systems extract: Provider + Brand + Location + Service

═══════════════════════════════════════════════════════════════
```

---

## Certification Badges (UK-Specific Trust Signals)

```
CERTIFICATION BADGES — TRUST & COMPLIANCE
═══════════════════════════════════════════════════════════════

These badges are CRITICAL for repair providers.
They directly impact:
• User trust → Conversion rate
• Google's local algorithm → Rankings  
• AI trust heuristics → Citations
• Legal compliance (Gas Safe required for gas work)

BADGE PRIORITY ORDER (show first available, max 4):
─────────────────────────────────────────────────────────────────

1. GAS SAFE REGISTERED (highest trust for gas appliances)
   ├── Condition:   gas_safe_registered = true
   ├── Display:     "🛡️ Gas Safe Registered"
   ├── Subtext:     Gas Safe #{gas_safe_number}
   ├── Verify link: https://www.gassaferegister.co.uk/find-an-engineer/
   ├── Style:       Blue background (official color)
   └── Schema:      hasCredential: "Gas Safe Register"

2. F-GAS CERTIFIED (for fridge/AC work)
   ├── Condition:   fgas_certified = true
   ├── Display:     "❄️ F-Gas Certified"
   ├── Style:       Light blue background
   └── Schema:      hasCredential: "F-Gas Certification"

3. WHICH? TRUSTED TRADER
   ├── Condition:   which_trusted_trader = true
   ├── Display:     "✓ Which? Trusted Trader"
   ├── Style:       Red background (Which? brand)
   └── Schema:      endorsedBy: "Which?"

4. CHECKATRADE MEMBER
   ├── Condition:   checkatrade_member = true
   ├── Display:     "✓ Checkatrade"
   ├── Subtext:     ID #{checkatrade_id}
   ├── Verify link: https://www.checkatrade.com/
   └── Schema:      memberOf: "Checkatrade"

5. PUBLIC LIABILITY INSURANCE
   ├── Condition:   public_liability_insurance = true
   ├── Display:     "🛡️ Insured £{amount}"
   ├── Format:      "Insured £2m" (abbreviate millions)
   └── Schema:      insurancePolicy

6. OUR VERIFICATION
   ├── Condition:   is_verified = true
   ├── Display:     "✓ Verified Engineer"
   ├── Style:       Green badge
   └── Schema:      verificationStatus: "Verified"

BADGE STYLING:
─────────────────────────────────────────────────────────────────

GAS SAFE:
├── Background:     #1D4ED8 (blue-700)
├── Text:           #FFFFFF
├── Icon:           🛡️ or flame icon

F-GAS:
├── Background:     #0EA5E9 (sky-500)
├── Text:           #FFFFFF

WHICH? TRUSTED:
├── Background:     #DC2626 (red-600)
├── Text:           #FFFFFF

CHECKATRADE:
├── Background:     #16A34A (green-600)
├── Text:           #FFFFFF

INSURANCE:
├── Background:     #F3F4F6 (grey-100)
├── Border:         1px solid #E5E7EB
├── Text:           #374151

VERIFIED:
├── Background:     #D1FAE5 (green-100)
├── Border:         1px solid #10B981
├── Text:           #065F46

═══════════════════════════════════════════════════════════════
```

---

## Urgency & Availability Badges

```
URGENCY BADGES — CONVERSION DRIVERS
═══════════════════════════════════════════════════════════════

These badges target "urgent need" searches:
• "same day appliance repair"
• "emergency fridge repair"
• "appliance repair near me now"

BADGE PRIORITY ORDER (show first available, max 3):
─────────────────────────────────────────────────────────────────

1. SAME-DAY CALLOUTS (highest urgency signal)
   ├── Condition:   offers_same_day = true
   ├── Display:     "⚡ Same-day Callouts"
   ├── Style:       Amber/orange (urgency color)
   └── Schema:      availabilityStarts: "today"

2. EMERGENCY SERVICE (24/7 or after-hours)
   ├── Condition:   offers_emergency = true
   ├── Display:     "🚨 24/7 Emergency"
   ├── Style:       Red background
   └── Schema:      openingHoursSpecification: 24/7

3. NEXT-DAY AVAILABLE
   ├── Condition:   offers_next_day = true
   ├── Display:     "📅 Next-day Available"
   └── Style:       Blue background

4. WEEKEND AVAILABILITY
   ├── Condition:   offers_weekend = true
   ├── Display:     "📅 Weekends"
   └── Style:       Default

5. EVENING SLOTS
   ├── Condition:   offers_evening = true
   ├── Display:     "🌙 Evenings"
   └── Style:       Default

BADGE STYLING:
─────────────────────────────────────────────────────────────────

SAME-DAY:
├── Background:     #F59E0B (amber-500)
├── Text:           #78350F (amber-900)
├── Animation:      Optional subtle pulse

EMERGENCY:
├── Background:     #DC2626 (red-600)
├── Text:           #FFFFFF
├── Animation:      Optional attention pulse

OTHERS:
├── Background:     #F3F4F6 (grey-100)
├── Border:         1px solid #E5E7EB
├── Text:           #374151

═══════════════════════════════════════════════════════════════
```

---

## Pricing & Trust Section

```
PRICING DISPLAY — TRUST & TRANSPARENCY
═══════════════════════════════════════════════════════════════

CALLOUT FEE:
─────────────────────────────────────────────────────────────────
Condition:     callout_fee_from IS NOT NULL
Display:       "💰 From £{callout_fee_from} callout"
               OR "💰 £{from}-£{to} callout"

Example:       "💰 From £45 callout"

NO FIX NO FEE (Major trust signal):
─────────────────────────────────────────────────────────────────
Condition:     no_fix_no_fee = true
Display:       "✓ No Fix, No Fee"
Style:         Green checkmark, prominent placement
Why:           Removes user risk — huge conversion driver

FREE QUOTES:
─────────────────────────────────────────────────────────────────
Condition:     free_quotes = true
Display:       "✓ Free Quotes"

WARRANTY ON REPAIRS:
─────────────────────────────────────────────────────────────────
Condition:     warranty_on_repairs_months >= 3
Display:       "📋 {N}-Month Warranty on Repairs"

GENUINE PARTS:
─────────────────────────────────────────────────────────────────
Condition:     uses_genuine_parts = true
Display:       "✓ Uses Genuine Parts"

COMBINED DISPLAY (Desktop):
─────────────────────────────────────────────────────────────────
┌───────────────────────────────────────────────────────────────┐
│ 💰 From £45 callout  │  ✓ No Fix No Fee  │  ✓ Insured £2m   │
└───────────────────────────────────────────────────────────────┘

COMBINED DISPLAY (Mobile):
─────────────────────────────────────────────────────────────────
💰 From £45 • ✓ No Fix No Fee • 6-mo warranty

═══════════════════════════════════════════════════════════════
```

---

## Data Mapping — Complete Field Reference

```
DATA MAPPING — PROVIDER CARD FULL VARIANT
═══════════════════════════════════════════════════════════════

FIELD               SOURCE                          DISPLAY LOGIC
─────────────────────────────────────────────────────────────────

HEADER SECTION:
─────────────────────────────────────────────────────────────────
Logo                logo_url                        Show placeholder if null
                    Placeholder: First 2 letters    #F3F4F6 bg, green text

Name                name                            Always show (required)
                    Link: /provider/{slug}/         Track: profile_view

Rating              average_rating                  Hide if null
                    Format: "⭐ {rating}"           1 decimal place

Review count        review_count                    Hide if 0 or null
                    Format: "({count})"

Verified badge      is_verified = true              Hide if not verified
                    Format: "✓ Verified"            Green styling

Featured badge      is_featured = true              Show if featured
                    Format: "★ Featured Engineer"   Green styling

Experience          years_trading                   Hide if null
                    Format: "{N}+ years experience"

Team size           number_of_engineers             Hide if ≤ 1
                    Format: "{N} engineers"

Brand auths         JOIN provider_brand_authorisations  Hide if none
                    → brands                        Max 5, premium first

BODY SECTION:
─────────────────────────────────────────────────────────────────
Description         short_description               Fallback: truncate description
                    OR description[0:200]           Line clamp: 2-3 lines

Repair categories   JOIN provider_services          Hide if none
                    → appliance_categories          Max 6, tier_1 first
                    Each links to repair page       CRITICAL FOR SEO

Urgency badges      offers_same_day, offers_emergency   Show first 3 true
                    offers_weekend, offers_evening

Certification       gas_safe_registered, fgas_certified Show first 4 true
badges              which_trusted_trader, checkatrade
                    public_liability_insurance

Pricing             callout_fee_from                Hide if null
                    no_fix_no_fee                   Highlight if true

Warranty            warranty_on_repairs_months      Hide if null or < 3
                    Format: "{N}-month warranty"

Coverage            city_name + coverage areas      "Serving {city} & area"
                    JOIN provider_coverage_places

CTA BUTTONS:
─────────────────────────────────────────────────────────────────
Call button         phone (REQUIRED)                Always show
                    Action: tel:{phone}             Track: call_click
                    Style: PRIMARY (red, prominent)

View Profile        /provider/{slug}/               Always show
                    Action: Link                    Track: profile_view
                    Style: Secondary (outlined)

CROSS-SELL SECTION:
─────────────────────────────────────────────────────────────────
Parts affiliate     Always show                     "🔧 Fix it yourself? Order parts →"
                    Link: eSpares affiliate         Track: affiliate_click

Retail cross-sell   If store_count > 0 for city    "🛒 Beyond repair? Browse replacements →"
                    Link: /england/{city}/          Track: cross_sell

═══════════════════════════════════════════════════════════════
```

---

## Click Tracking Integration

```
CLICK TRACKING — PROVIDER CARD EVENTS (v1.1 Updated)
═══════════════════════════════════════════════════════════════

All interactive elements must log to click_events table.
Provider cards have HIGHER monetization potential per click.

EVENT TYPES:
─────────────────────────────────────────────────────────────────

1. LEAD REVEAL (v1.1 — NEW — HIGHEST VALUE)
   Trigger:     User clicks "Show Number" to reveal phone
   Event type:  'lead_reveal'
   Subject:     { type: 'provider', id: provider.id }
   Context:     { page_path, page_type, place_id, category_id }
   
   Implementation:
   onClick={() => trackClick('lead_reveal', { 
     subjectType: 'provider',
     subjectId: provider.id,
     placeId: context.placeId,
     categoryId: context.categoryId,
   })}
   
   MONETIZATION VALUE:
   ├── Verified intent to call (not just page view)
   ├── Phase 2: "I sent you 45 verified leads"
   ├── Phase 3: Pay-per-lead billing to providers
   ├── Phase 4: Lead selling to repair networks

2. CALL CLICK (PRIMARY — high value)
   Trigger:     User clicks phone number or "Call Now" button
   Event type:  'call_click'
   Subject:     { type: 'provider', id: provider.id }
   Context:     { page_path, page_type, place_id, category_id }
   
   Implementation:
   onClick={() => trackClick('call_click', { 
     subjectType: 'provider',
     subjectId: provider.id,
     placeId: context.placeId,
     categoryId: context.categoryId, // If on category page
   })}
   
   MONETIZATION NOTE:
   ├── Phase 1: Build call volume data
   ├── Phase 2: Pay-per-call to providers
   ├── Phase 3: Lead selling to repair networks

3. WEBSITE CLICK
   Trigger:     User clicks website link
   Event type:  'website_click'
   Subject:     { type: 'provider', id: provider.id }
   Context:     { page_path, destination_url }

4. PROFILE VIEW
   Trigger:     User clicks provider name or "View Profile"
   Event type:  'profile_view'
   Subject:     { type: 'provider', id: provider.id }
   Context:     { page_path, source: 'card_name' | 'card_button' }

5. AFFILIATE CLICK (Parts — monetization)
   Trigger:     User clicks "Order parts" link
   Event type:  'affiliate_click'
   Subject:     { type: 'provider', id: provider.id }
   Context:     { affiliate_partner: 'espares', product_type: 'parts' }

EVENT VALUE HIERARCHY (v1.1):
─────────────────────────────────────────────────────────────────
lead_reveal  →  HIGHEST (verified intent, billable)
call_click   →  HIGH (actual call attempt)
profile_view →  MEDIUM (engagement)
website_click → MEDIUM (engagement)
affiliate_click → MEDIUM (potential revenue)

═══════════════════════════════════════════════════════════════
```

---

## Phone Number Display Strategy (v1.1) — Lead Attribution

```
PHONE NUMBER DISPLAY — CONTEXT-AWARE LEAD TRACKING (v1.1)
═══════════════════════════════════════════════════════════════

WHY THIS MATTERS (Business Case):
─────────────────────────────────────────────────────────────────
• "I sent you 45 verified call leads" > "I sent you 4,500 impressions"
• Industry standard: Checkatrade, Bark, MyBuilder all use reveal patterns
• Enables Phase 3+ monetization: Pay-per-lead model
• Differentiates intent: reveal click = confirmed intent to call

HOWEVER — CRITICAL UX CONSIDERATION:
─────────────────────────────────────────────────────────────────
Our users have BROKEN APPLIANCES. They are URGENT.
Every additional click costs conversions.

SOLUTION: Context-Aware Phone Display

═══════════════════════════════════════════════════════════════
```

```
PHONE DISPLAY DECISION MATRIX (v1.1)
═══════════════════════════════════════════════════════════════

CONTEXT                    │ DISPLAY MODE │ RATIONALE
───────────────────────────┼──────────────┼──────────────────────
Provider Card (listings)   │ INSTANT      │ User comparing, reduce friction
Provider Profile Page      │ REVEAL       │ User committed, high-quality lead
Featured/Sponsored (Phase 3)│ REVEAL      │ Provider paying, max attribution
Search Results             │ INSTANT      │ User browsing, reduce friction
City Hub (compact cards)   │ INSTANT      │ Preview context, reduce friction

INSTANT MODE:
├── Display: Full number visible
├── Action:  Direct tel: link
├── Track:   'call_click' on click

REVEAL MODE:
├── Display: Partial number "0121 XXX XX..." + [Reveal & Call]
├── Action:  Click → track 'lead_reveal' → show full → trigger tel:
├── Track:   'lead_reveal' (new event type)

═══════════════════════════════════════════════════════════════
```

```
LEAD_REVEAL EVENT TYPE (v1.1) — NEW
═══════════════════════════════════════════════════════════════

DATABASE MIGRATION REQUIRED:
─────────────────────────────────────────────────────────────────

ALTER TYPE click_event_type_enum ADD VALUE 'lead_reveal';

EVENT DEFINITION:
─────────────────────────────────────────────────────────────────
Event:        'lead_reveal'
Description:  User clicked to reveal phone number (confirmed intent)
Value:        Higher than 'call_click' — verified intent to call
Use cases:    Lead selling, provider reporting, conversion attribution

TRACKING PAYLOAD:
─────────────────────────────────────────────────────────────────
{
  event_type: 'lead_reveal',
  subject_type: 'provider',
  subject_id: provider.id,
  place_id: context.placeId,
  appliance_category_id: context.categoryId,
  page_path: '/provider/{slug}/',
  page_type: 'provider_profile',
  session_id: getSessionId(),
  referrer: document.referrer,
}

ANALYTICS HIERARCHY:
─────────────────────────────────────────────────────────────────
page_view → profile_view → lead_reveal → call_click
                              ↑
                         MONETIZABLE EVENT
                         "Verified call intent"

═══════════════════════════════════════════════════════════════
```

```
REVEAL PHONE NUMBER COMPONENT (v1.1) — NEW
═══════════════════════════════════════════════════════════════

FILE: components/ui/RevealPhoneNumber.tsx

PURPOSE:
─────────────────────────────────────────────────────────────────
A reusable, context-aware phone number component that:
• Supports both INSTANT and REVEAL modes
• Tracks lead_reveal events for monetization
• Fires Google Analytics generate_lead event
• Triggers tel: link after reveal

VISUAL — INSTANT MODE (Cards):
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  📞 CALL NOW: 0121 456 7890                        │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Direct tel: link, tracks 'call_click' on click            │
│                                                             │
└─────────────────────────────────────────────────────────────┘

VISUAL — REVEAL MODE (Profile Page):
─────────────────────────────────────────────────────────────────

BEFORE CLICK:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  📞 0121 456 78...        [ SHOW NUMBER & CALL ]   │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Button shows partial number, CTA to reveal                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

AFTER CLICK:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  📞 CALL NOW: 0121 456 7890                        │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Full number shown, tel: link active                       │
│  (Auto-triggers call on mobile)                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘

CLICK SEQUENCE (REVEAL MODE):
─────────────────────────────────────────────────────────────────
1. User clicks [SHOW NUMBER & CALL]
2. Fire: trackClick('lead_reveal', {...})
3. Fire: gtag('event', 'generate_lead', {...})  // Google Analytics
4. Fire: supabase.rpc('track_lead', {...})      // Future RPC
5. Update UI: Show full number
6. Trigger: window.location.href = 'tel:{phone}'

═══════════════════════════════════════════════════════════════
```

```typescript
TYPESCRIPT IMPLEMENTATION — RevealPhoneNumber.tsx (v1.1)
═══════════════════════════════════════════════════════════════

// components/ui/RevealPhoneNumber.tsx

'use client';

import { useState, useCallback } from 'react';
import { trackClick } from '@/lib/tracking/trackClick';
import { cn } from '@/lib/utils/cn';

/**
 * Phone display mode
 * - instant: Show full number, direct tel: link (for cards/listings)
 * - reveal: Show partial number, require click to reveal (for profile pages)
 */
type PhoneDisplayMode = 'instant' | 'reveal';

interface RevealPhoneNumberProps {
  /** Full phone number */
  phone: string;
  /** Provider ID for tracking */
  providerId: string;
  /** Provider slug for tracking context */
  providerSlug: string;
  /** Display mode */
  mode: PhoneDisplayMode;
  /** Page context for tracking */
  pageContext: {
    pagePath: string;
    pageType: string;
    placeId?: string;
    categoryId?: string;
  };
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'compact';
  /** Optional rating to show alongside */
  rating?: number;
  /** Custom class name */
  className?: string;
  /** Callback after reveal (before tel: trigger) */
  onReveal?: () => void;
  /** Callback after call click */
  onCallClick?: () => void;
}

/**
 * Mask phone number for reveal mode
 * "07700 900123" → "07700 900..."
 * "0121 456 7890" → "0121 456 78..."
 */
function maskPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\s+/g, ' ').trim();
  // Show first ~70% of number, mask the rest
  const visibleLength = Math.floor(cleaned.length * 0.7);
  return cleaned.slice(0, visibleLength) + '...';
}

/**
 * Format phone for tel: link
 * Removes spaces, ensures proper format
 */
function formatPhoneForTel(phone: string): string {
  return phone.replace(/\s+/g, '').replace(/^0/, '+44');
}

export default function RevealPhoneNumber({
  phone,
  providerId,
  providerSlug,
  mode,
  pageContext,
  variant = 'primary',
  rating,
  className,
  onReveal,
  onCallClick,
}: RevealPhoneNumberProps) {
  const [isRevealed, setIsRevealed] = useState(mode === 'instant');
  const [isLoading, setIsLoading] = useState(false);
  
  const telLink = `tel:${formatPhoneForTel(phone)}`;
  const maskedPhone = maskPhoneNumber(phone);
  
  /**
   * Handle reveal click (for reveal mode)
   */
  const handleReveal = useCallback(async () => {
    if (isRevealed || isLoading) return;
    
    setIsLoading(true);
    
    try {
      // 1. Track lead_reveal event (PRIMARY — monetization event)
      await trackClick('lead_reveal', {
        subjectType: 'provider',
        subjectId: providerId,
        pagePath: pageContext.pagePath,
        pageType: pageContext.pageType,
        placeId: pageContext.placeId,
        categoryId: pageContext.categoryId,
      });
      
      // 2. Fire Google Analytics generate_lead event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          provider_id: providerId,
          provider_slug: providerSlug,
          page_type: pageContext.pageType,
          value: 1,
          currency: 'GBP',
        });
      }
      
      // 3. Console log for development (remove in production)
      console.log(`Lead Tracked: ${providerId}`);
      
      // 4. Callback
      onReveal?.();
      
      // 5. Reveal the number
      setIsRevealed(true);
      
      // 6. Small delay then trigger call (better UX on mobile)
      setTimeout(() => {
        window.location.href = telLink;
      }, 150);
      
    } catch (error) {
      console.error('Failed to track lead:', error);
      // Still reveal and call even if tracking fails
      setIsRevealed(true);
      window.location.href = telLink;
    } finally {
      setIsLoading(false);
    }
  }, [isRevealed, isLoading, providerId, providerSlug, pageContext, telLink, onReveal]);
  
  /**
   * Handle direct call click (for instant mode or after reveal)
   */
  const handleCallClick = useCallback(() => {
    trackClick('call_click', {
      subjectType: 'provider',
      subjectId: providerId,
      pagePath: pageContext.pagePath,
      pageType: pageContext.pageType,
      placeId: pageContext.placeId,
      categoryId: pageContext.categoryId,
    });
    
    onCallClick?.();
  }, [providerId, pageContext, onCallClick]);
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-6',
    secondary: 'bg-green-600 hover:bg-green-700 text-white text-base font-semibold py-3 px-5',
    compact: 'bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4',
  };
  
  // INSTANT MODE: Direct call link
  if (mode === 'instant' || isRevealed) {
    return (
      <a
        href={telLink}
        onClick={handleCallClick}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg',
          'active:scale-[0.98] transition-all',
          'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
          variantStyles[variant],
          className
        )}
        aria-label={`Call now: ${phone}`}
      >
        <span>📞</span>
        <span>CALL NOW: {phone}</span>
        {rating && variant === 'primary' && (
          <span className="ml-2 text-sm opacity-90">⭐ {rating.toFixed(1)}</span>
        )}
      </a>
    );
  }
  
  // REVEAL MODE: Show partial, require click
  return (
    <button
      type="button"
      onClick={handleReveal}
      disabled={isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-3 rounded-lg w-full',
        'active:scale-[0.98] transition-all',
        'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
        'disabled:opacity-70 disabled:cursor-wait',
        variantStyles[variant === 'primary' ? 'secondary' : variant],
        className
      )}
      aria-label="Click to reveal phone number and call"
    >
      <span className="flex items-center gap-2">
        <span>📞</span>
        <span>{maskedPhone}</span>
      </span>
      <span className="bg-white/20 px-3 py-1 rounded text-sm font-bold">
        {isLoading ? 'Loading...' : 'SHOW NUMBER & CALL'}
      </span>
      {rating && (
        <span className="ml-auto text-sm opacity-90">⭐ {rating.toFixed(1)}</span>
      )}
    </button>
  );
}

// Type declaration for gtag (Google Analytics)
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      action: string,
      params: Record<string, unknown>
    ) => void;
  }
}

═══════════════════════════════════════════════════════════════
```

```
USAGE PATTERNS — RevealPhoneNumber (v1.1)
═══════════════════════════════════════════════════════════════

1. PROVIDER CARD (Listings) — INSTANT MODE
─────────────────────────────────────────────────────────────────
Use Case:    User comparing multiple providers
Priority:    Minimize friction, maximize call rate
Mode:        instant

<RevealPhoneNumber
  phone={provider.phone}
  providerId={provider.id}
  providerSlug={provider.slug}
  mode="instant"
  pageContext={{
    pagePath: '/england/birmingham/washing-machine-repair/',
    pageType: 'repair_category',
    placeId: cityId,
    categoryId: categoryId,
  }}
  variant="primary"
/>

2. PROVIDER PROFILE PAGE — REVEAL MODE
─────────────────────────────────────────────────────────────────
Use Case:    User has committed to this specific provider
Priority:    Track high-quality lead intent
Mode:        reveal

<RevealPhoneNumber
  phone={provider.phone}
  providerId={provider.id}
  providerSlug={provider.slug}
  mode="reveal"
  pageContext={{
    pagePath: `/provider/${provider.slug}/`,
    pageType: 'provider_profile',
    placeId: provider.primaryPlaceId,
  }}
  variant="primary"
  rating={provider.average_rating}
/>

3. MOBILE STICKY CTA — INSTANT MODE
─────────────────────────────────────────────────────────────────
Use Case:    Urgent mobile users, one-tap calling critical
Priority:    Maximum conversion, zero friction
Mode:        instant

<RevealPhoneNumber
  phone={provider.phone}
  providerId={provider.id}
  providerSlug={provider.slug}
  mode="instant"
  pageContext={pageContext}
  variant="compact"
  className="w-full"
/>

4. FEATURED/SPONSORED LISTING (Phase 3) — REVEAL MODE
─────────────────────────────────────────────────────────────────
Use Case:    Provider is paying for placement
Priority:    Maximum attribution for billing
Mode:        reveal

<RevealPhoneNumber
  phone={provider.phone}
  providerId={provider.id}
  providerSlug={provider.slug}
  mode="reveal"
  pageContext={pageContext}
  variant="secondary"
  onReveal={() => trackPremiumLead(provider.id)}
/>

═══════════════════════════════════════════════════════════════
```

---

## Phase 1 Monetization Integration

```
MONETIZATION — PROVIDER CARD (PHASE 1)
═══════════════════════════════════════════════════════════════

Provider Card users are FIXING appliances. Their state:
├── Urgent need (appliance broken)
├── Considering: repair vs replace
├── May want to DIY (parts)
├── Need reassurance (will it work?)

MONETIZATION STREAMS:
─────────────────────────────────────────────────────────────────

1. CALL TRACKING (Foundation — builds data)
   Purpose:      Track which providers get calls
   Revenue:      £0 now, data for Phase 2+
   Implementation: call_click logging (done)

2. PARTS AFFILIATE (eSpares) — "Fix It Yourself"
   Purpose:      Capture DIY users who won't call
   Revenue:      5-8% commission on parts sales
   Placement:    Card footer or expandable section
   Link:         eSpares affiliate with category context

3. EXTENDED WARRANTY AFFILIATE (D&G)
   Purpose:      "Repair worked? Protect it now"
   Revenue:      £15-30 per lead
   Placement:    On Provider Profile page (not card)
   Trigger:      After repair category context

4. CROSS-SELL TO RETAIL
   Purpose:      Capture "beyond repair" users
   Revenue:      Keeps user in ecosystem
   Placement:    Card footer (subtle)
   Link:         City hub or category page

═══════════════════════════════════════════════════════════════
```

### Parts Affiliate Integration

```
PARTS AFFILIATE — "FIX IT YOURSELF"
═══════════════════════════════════════════════════════════════

WHY THIS MATTERS:
─────────────────────────────────────────────────────────────────
Some users landing on repair pages want to fix it themselves.
Parts affiliate captures this traffic instead of losing it.
eSpares pays 5-8% commission on parts sales.

DISPLAY LOGIC:
─────────────────────────────────────────────────────────────────
Show parts affiliate when:
├── Always show on Full variant cards
├── On Repair Category pages (highly relevant)
├── On Provider Profile pages

Hide on:
├── Compact variant (too cluttered)
├── City Hub mini cards

VISUAL PLACEMENT:
─────────────────────────────────────────────────────────────────
Location: Expandable footer or dedicated section

Desktop:
┌─────────────────────────────────────────────────────────────┐
│  🔧 PREFER TO FIX IT YOURSELF?                              │
│                                                             │
│  Order genuine parts from eSpares:                          │
│  [Washing Machine Parts] [Fridge Parts] [Dishwasher Parts] │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Mobile (collapsed by default):
┌─────────────────────────────────────────────────────────────┐
│  🔧 Fix it yourself? Order parts from eSpares →            │
└─────────────────────────────────────────────────────────────┘

AFFILIATE LINK STRUCTURE:
─────────────────────────────────────────────────────────────────
Base URL: https://www.espares.co.uk/
Category: /search/{category-slug}/
Params:   ?utm_source=ukgradedappliances&utm_medium=provider_card

Example:
https://www.espares.co.uk/search/washing-machine-parts/?utm_source=ukgradedappliances

TRACKING:
─────────────────────────────────────────────────────────────────
On click → Log to affiliate_clicks table:
├── affiliate_partner:  'espares'
├── product_type:       'parts'
├── provider_id:        Current provider (context)
├── category_id:        If clicked from category context
├── place_id:           Current city
├── source_page:        page_path

═══════════════════════════════════════════════════════════════
```

### Cross-Sell to Retail

```
CROSS-SELL — "BEYOND REPAIR?"
═══════════════════════════════════════════════════════════════

WHY THIS MATTERS:
─────────────────────────────────────────────────────────────────
Some appliances aren't worth repairing.
Cross-selling to graded replacements:
├── Keeps user in ecosystem
├── Feeds Store Card traffic
├── Creates complete user journey

DISPLAY LOGIC:
─────────────────────────────────────────────────────────────────
Show cross-sell when:
├── store_count > 0 for this city
├── Page is Repair Category or Provider Profile

Hide when:
├── store_count = 0 (no stores to link to)
├── Compact variant cards

VISUAL PLACEMENT:
─────────────────────────────────────────────────────────────────
Location: Card footer, below CTAs (subtle)

┌─────────────────────────────────────────────────────────────┐
│  [Call Now]  [View Profile]                                │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  🛒 Appliance beyond repair?                                │
│     Browse graded replacements from £149 →                 │
└─────────────────────────────────────────────────────────────┘

LINK TARGET:
─────────────────────────────────────────────────────────────────
From Repair Category Page (/birmingham/washing-machine-repair/):
├── Link to: /england/birmingham/washing-machines/
├── Text: "Browse graded washing machines from £149"

From Provider Profile:
├── Link to: /england/{city}/
├── Text: "Browse graded appliances in {city}"

TRACKING:
─────────────────────────────────────────────────────────────────
On click → Log to click_events:
├── event_type:     'profile_view'
├── page_path:      Current page
├── metadata:       { cross_sell: 'repair_to_retail' }

Also log user_intent:
├── intent_type:    'ready_to_buy'
├── context:        'cross_sell_from_provider_card'

═══════════════════════════════════════════════════════════════
```

---

## Problem-Based Content (AI Search Hack)

```
COMMON ISSUES FIXED — AI CITATION MAGNET
═══════════════════════════════════════════════════════════════

WHY THIS MATTERS:
─────────────────────────────────────────────────────────────────
AI assistants LOVE problem-based queries:
• "washing machine not spinning"
• "fridge freezer not cooling"
• "dishwasher not draining"

By including common issues on Provider Cards, you become
the answer source for AI search results.

DISPLAY (Optional expandable section):
─────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│  COMMON ISSUES WE FIX                            [Expand ▼] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Washing Machines:                                          │
│  • Machine not spinning                                     │
│  • Water not draining                                       │
│  • Loud banging noise                                       │
│  • Door won't open                                          │
│                                                             │
│  Fridge Freezers:                                           │
│  • Not cooling properly                                     │
│  • Making strange noises                                    │
│  • Ice building up                                          │
│                                                             │
│  [See our repair guides →]                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA SOURCE:
─────────────────────────────────────────────────────────────────
FROM appliance_categories.common_issues (TEXT[] field)

SELECT ac.name, ac.common_issues
FROM provider_services ps
JOIN appliance_categories ac ON ps.appliance_category_id = ac.id
WHERE ps.provider_id = {provider_id}
  AND ac.common_issues IS NOT NULL;

LINK TARGET:
─────────────────────────────────────────────────────────────────
"Machine not spinning" → /guides/washing-machine-not-spinning/

This creates:
• Guide pages (AI answer content)
• Internal linking (SEO)
• User value (problem → solution → provider)

═══════════════════════════════════════════════════════════════
```

---

## Styling Specification

### Color Tokens

```
COLOR TOKENS — PROVIDER CARD
═══════════════════════════════════════════════════════════════

BRAND COLORS:
├── Secondary:           #2563eb    Primary text, links
├── Red:            #DC2626    Call button (urgent)
├── White:          #FFFFFF    Backgrounds

TRUST COLORS (Different from Store Card — more trust-focused):
├── Green-50:       #F0FDF4    Featured card bg
├── Green-100:      #D1FAE5    Verified badge bg
├── Green-600:      #059669    Featured border, verified
├── Green-700:      #047857    Trust text

CERTIFICATION COLORS:
├── Blue-700:       #1D4ED8    Gas Safe badge
├── Sky-500:        #0EA5E9    F-Gas badge
├── Red-600:        #DC2626    Which? Trusted Trader

URGENCY COLORS:
├── Amber-500:      #F59E0B    Same-day badge
├── Red-600:        #DC2626    Emergency badge

NEUTRAL COLORS:
├── Grey-50:        #F9FAFB    Backgrounds
├── Grey-100:       #F3F4F6    Badge backgrounds
├── Grey-200:       #E5E7EB    Borders
├── Grey-500:       #6B7280    Secondary text
├── Grey-600:       #4B5563    Description text
├── Grey-700:       #374151    Primary text

AFFILIATE COLORS:
├── Orange-50:      #FFF7ED    Parts affiliate bg
├── Orange-500:     #F97316    eSpares brand

═══════════════════════════════════════════════════════════════
```

### Typography

```
TYPOGRAPHY — PROVIDER CARD
═══════════════════════════════════════════════════════════════

PROVIDER NAME:
├── Font size:      20px (desktop), 18px (mobile)
├── Font weight:    700
├── Line height:    1.3
├── Color:          #2563eb (secondary)

RATING:
├── Font size:      18px (desktop), 16px (mobile)
├── Font weight:    700
├── Color:          #374151 (grey-700)

BRAND AUTHORIZATIONS:
├── Font size:      13px
├── Font weight:    500
├── Color:          #047857 (green-700)

DESCRIPTION:
├── Font size:      14px
├── Font weight:    400
├── Line height:    1.5
├── Color:          #4B5563 (grey-600)

REPAIR CATEGORIES:
├── Font size:      14px
├── Font weight:    500
├── Color:          #2563eb (secondary) — links
├── Decoration:     Underline on hover

SECTION LABELS:
├── Font size:      12px
├── Font weight:    600
├── Color:          #6B7280 (grey-500)
├── Text transform: Uppercase

BADGE TEXT:
├── Font size:      12px
├── Font weight:    500

PRICING:
├── Font size:      15px
├── Font weight:    600
├── Color:          #374151

CALL BUTTON:
├── Font size:      16px (larger than store — urgency)
├── Font weight:    700

═══════════════════════════════════════════════════════════════
```

---

## TypeScript Interfaces

```typescript
TYPESCRIPT INTERFACES — PROVIDER CARD (v1.1 Updated)
═══════════════════════════════════════════════════════════════

// types/provider-card.ts

/**
 * Phone display mode for RevealPhoneNumber component (v1.1)
 * - instant: Show full number, direct tel: link (for cards/listings)
 * - reveal: Show partial number, require click to reveal (for profile pages)
 */
export type PhoneDisplayMode = 'instant' | 'reveal';

/**
 * Provider data for card display
 */
export interface ProviderCardData {
  // Identity
  id: string;
  slug: string;
  name: string;
  trading_name?: string;
  short_description?: string;
  description?: string;
  logo_url?: string;
  
  // Contact (phone is REQUIRED)
  phone: string;  // NOT optional — primary CTA
  phone_secondary?: string;
  email?: string;
  website?: string;
  
  // Location
  address_line1?: string;
  city_name?: string;
  postcode?: string;
  
  // Business Details
  years_trading?: number;
  number_of_engineers?: number;
  operating_hours?: OperatingHours;
  
  // Pricing
  callout_fee_from?: number;
  callout_fee_to?: number;
  no_fix_no_fee: boolean;
  free_quotes: boolean;
  
  // Availability
  offers_same_day: boolean;
  offers_next_day: boolean;
  offers_emergency: boolean;
  offers_weekend: boolean;
  offers_evening: boolean;
  typical_response_time?: string;
  
  // Certifications
  gas_safe_registered: boolean;
  gas_safe_number?: string;
  gas_safe_expiry?: string;
  fgas_certified: boolean;
  which_trusted_trader: boolean;
  checkatrade_member: boolean;
  checkatrade_id?: string;
  trustatrader_member: boolean;
  public_liability_insurance: boolean;
  insurance_amount?: number;
  
  // Warranty
  warranty_on_repairs_months?: number;
  warranty_on_parts_months?: number;
  uses_genuine_parts: boolean;
  
  // Ratings
  average_rating?: number;
  review_count: number;
  
  // Status
  status: ProviderStatus;
  is_verified: boolean;
  is_featured: boolean;
  
  // Relations (populated via JOIN)
  repair_categories?: RepairCategorySummary[];
  authorized_brands?: BrandAuthSummary[];
  coverage_areas?: CoverageAreaSummary[];
}

/**
 * Repair category summary for card display
 */
export interface RepairCategorySummary {
  id: string;
  name: string;
  name_singular: string;
  slug: string;
  tier: CategoryTier;
  // Per-category overrides
  offers_same_day?: boolean;
  callout_fee_min?: number;
  callout_fee_max?: number;
}

/**
 * Brand authorization for card display
 */
export interface BrandAuthSummary {
  id: string;
  brand_id: string;
  brand_name: string;
  brand_slug: string;
  authorisation_type?: string;
  is_verified: boolean;
}

/**
 * Coverage area summary
 */
export interface CoverageAreaSummary {
  place_id: string;
  place_name: string;
  is_primary: boolean;
}

/**
 * Provider status enum
 */
export type ProviderStatus = 
  | 'pending' 
  | 'active' 
  | 'claimed' 
  | 'verified' 
  | 'suspended';

/**
 * Category tier enum
 */
export type CategoryTier = 
  | 'tier_1' 
  | 'tier_2' 
  | 'tier_3' 
  | 'supplementary';

/**
 * Provider card component props
 */
export interface ProviderCardProps {
  /** Provider data to display */
  provider: ProviderCardData;
  
  /** Card variant */
  variant?: 'full' | 'compact' | 'featured' | 'mini';
  
  /** Current page context for tracking and links */
  pageContext: {
    pagePath: string;
    pageType: 'city_hub' | 'repair_category' | 'brand_repair' | 'provider_profile' | 'search';
    placeId?: string;
    categoryId?: string;
    categorySlug?: string;
    citySlug: string;
    countrySlug?: string;
  };
  
  /** 
   * Phone display mode (v1.1)
   * - 'instant': Full number visible, direct tel: link (default for cards)
   * - 'reveal': Masked number, click to reveal (for profile pages)
   */
  phoneDisplayMode?: PhoneDisplayMode;
  
  /** Show/hide specific sections */
  showRepairCategories?: boolean;
  showBrandAuths?: boolean;
  showDescription?: boolean;
  showPricing?: boolean;
  showCertifications?: boolean;
  
  /** Maximum items to show */
  maxCategories?: number;
  maxBrands?: number;
  
  /** Monetization options */
  showPartsAffiliate?: boolean;
  showCrossSellRetail?: boolean;
  storeCount?: number;  // For cross-sell logic
  
  /** Custom class name */
  className?: string;
  
  /** Click handlers (optional overrides) */
  onCallClick?: () => void;
  onProfileClick?: () => void;
  onAffiliateClick?: (partner: string) => void;
}

/**
 * Certification badge configuration
 */
export interface CertificationBadge {
  id: string;
  icon: string;
  label: string;
  subtext?: string;
  verifyUrl?: string;
  variant: 'gas_safe' | 'fgas' | 'which' | 'checkatrade' | 'insurance' | 'verified';
  priority: number;
}

/**
 * Urgency badge configuration
 */
export interface UrgencyBadge {
  id: string;
  icon: string;
  label: string;
  variant: 'emergency' | 'same_day' | 'next_day' | 'weekend' | 'evening';
  priority: number;
}

═══════════════════════════════════════════════════════════════
```

---

## React Component Implementation

```tsx
REACT COMPONENT — PROVIDER CARD (v1.1 Updated)
═══════════════════════════════════════════════════════════════

// components/provider/ProviderCard.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { trackClick } from '@/lib/tracking/trackClick';
import { trackAffiliateClick, buildAffiliateLink } from '@/lib/tracking/trackAffiliate';
import { getOpenStatus } from '@/lib/utils/hours';
import { cn } from '@/lib/utils/cn';
import RevealPhoneNumber from '@/components/ui/RevealPhoneNumber'; // v1.1
import type { 
  ProviderCardProps, 
  CertificationBadge, 
  UrgencyBadge 
} from '@/types/provider-card';

export default function ProviderCard({
  provider,
  variant = 'full',
  pageContext,
  phoneDisplayMode = 'instant', // v1.1: Default to instant for cards
  showRepairCategories = true,
  showBrandAuths = true,
  showDescription = true,
  showPricing = true,
  showCertifications = true,
  maxCategories = 6,
  maxBrands = 5,
  showPartsAffiliate = true,
  showCrossSellRetail = true,
  storeCount,
  className,
  onCallClick,
  onProfileClick,
  onAffiliateClick,
}: ProviderCardProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  // Build certification badges
  const certificationBadges = useMemo(
    () => buildCertificationBadges(provider), 
    [provider]
  );
  
  // Build urgency badges
  const urgencyBadges = useMemo(
    () => buildUrgencyBadges(provider), 
    [provider]
  );
  
  // Handle call click with tracking (PRIMARY CTA)
  const handleCallClick = () => {
    trackClick('call_click', {
      subjectType: 'provider',
      subjectId: provider.id,
      pagePath: pageContext.pagePath,
      pageType: pageContext.pageType,
      placeId: pageContext.placeId,
    });
    onCallClick?.();
  };
  
  // Handle profile click with tracking
  const handleProfileClick = () => {
    trackClick('profile_view', {
      subjectType: 'provider',
      subjectId: provider.id,
      pagePath: pageContext.pagePath,
      pageType: pageContext.pageType,
    });
    onProfileClick?.();
  };
  
  // Handle parts affiliate click
  const handlePartsAffiliateClick = (categorySlug?: string) => {
    trackAffiliateClick({
      affiliatePartner: 'espares',
      productType: 'parts',
      providerId: provider.id,
      placeId: pageContext.placeId,
      categoryId: pageContext.categoryId,
      sourcePage: pageContext.pagePath,
    });
    onAffiliateClick?.('espares');
  };
  
  // Handle cross-sell click
  const handleCrossSellClick = () => {
    trackClick('profile_view', {
      subjectType: 'provider',
      subjectId: provider.id,
      pagePath: pageContext.pagePath,
    });
    // Log intent
    fetch('/api/track-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent_type: 'ready_to_buy',
        provider_id: provider.id,
        context: 'cross_sell_from_provider_card',
      }),
    }).catch(() => {});
  };
  
  // Build repair category link
  const buildRepairCategoryLink = (categorySlug: string) => {
    const country = pageContext.countrySlug || 'england';
    return `/${country}/${pageContext.citySlug}/${categorySlug}-repair/`;
  };
  
  // Render variants
  if (variant === 'mini') {
    return <ProviderCardMini provider={provider} onProfileClick={handleProfileClick} />;
  }
  
  if (variant === 'compact') {
    return (
      <ProviderCardCompact 
        provider={provider}
        pageContext={pageContext}
        onProfileClick={handleProfileClick}
        className={className}
      />
    );
  }
  
  // Full and Featured variants
  const isFeatured = variant === 'featured' || provider.is_featured;
  
  return (
    <article
      className={cn(
        'relative bg-white rounded-xl border transition-all duration-200',
        'hover:shadow-lg hover:-translate-y-0.5',
        isFeatured 
          ? 'border-2 border-green-600 bg-gradient-to-b from-green-50 to-white' 
          : 'border-gray-200',
        className
      )}
      aria-labelledby={`provider-name-${provider.id}`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute -top-3 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          ★ FEATURED ENGINEER
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        {/* Header: Logo + Name + Rating + Brand Auths */}
        <div className="flex gap-4 mb-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {provider.logo_url ? (
              <Image
                src={provider.logo_url}
                alt={`${provider.name} logo`}
                width={80}
                height={80}
                className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-lg object-contain bg-gray-50"
              />
            ) : (
              <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-lg bg-green-50 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-green-700">
                  {provider.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          {/* Name, Rating, Experience */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-2 mb-1">
              <Link
                href={`/provider/${provider.slug}/`}
                onClick={handleProfileClick}
                id={`provider-name-${provider.id}`}
                className="text-lg sm:text-xl font-bold text-secondary hover:text-blue-800 hover:underline"
              >
                {provider.name}
              </Link>
              
              {provider.is_verified && (
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 border border-green-500 rounded">
                  ✓ Verified
                </span>
              )}
            </div>
            
            {/* Rating */}
            {provider.average_rating && (
              <div className="flex items-center gap-1 text-gray-700 mb-1">
                <span className="text-base sm:text-lg font-bold">
                  ⭐ {provider.average_rating.toFixed(1)}
                </span>
                {provider.review_count > 0 && (
                  <span className="text-sm text-gray-500">
                    ({provider.review_count})
                  </span>
                )}
              </div>
            )}
            
            {/* Experience & Team */}
            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
              {provider.years_trading && provider.years_trading > 0 && (
                <span>{provider.years_trading}+ years experience</span>
              )}
              {provider.number_of_engineers && provider.number_of_engineers > 1 && (
                <span>• {provider.number_of_engineers} engineers</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Brand Authorizations */}
        {showBrandAuths && provider.authorized_brands && provider.authorized_brands.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-4">
            <span className="text-sm text-green-700 font-medium">
              Authorized repairs:{' '}
              {provider.authorized_brands.slice(0, maxBrands).map((b, i) => (
                <span key={b.id}>
                  {i > 0 && ' • '}
                  <Link 
                    href={`/${pageContext.countrySlug || 'england'}/${pageContext.citySlug}/${b.brand_slug}-repair/`}
                    className="hover:underline"
                  >
                    {b.brand_name}
                  </Link>
                </span>
              ))}
              {provider.authorized_brands.length > maxBrands && (
                <span className="text-green-600"> +{provider.authorized_brands.length - maxBrands} more</span>
              )}
            </span>
          </div>
        )}
        
        {/* Description */}
        {showDescription && (provider.short_description || provider.description) && (
          <div className="mb-4">
            <p className={cn(
              'text-sm text-gray-600 leading-relaxed',
              !isDescriptionExpanded && 'line-clamp-2 sm:line-clamp-3'
            )}>
              {provider.short_description || provider.description}
            </p>
            {(provider.description?.length || 0) > 150 && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-sm text-secondary font-medium mt-1 hover:underline"
              >
                {isDescriptionExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        )}
        
        {/* Repair Categories (CRITICAL FOR SEO) */}
        {showRepairCategories && provider.repair_categories && provider.repair_categories.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Appliances We Repair
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {provider.repair_categories.slice(0, maxCategories).map((cat) => (
                <Link
                  key={cat.id}
                  href={buildRepairCategoryLink(cat.slug)}
                  className="flex items-center gap-1 text-secondary hover:underline"
                >
                  <span className="text-green-600">✓</span>
                  {cat.name_singular} Repair
                </Link>
              ))}
              {provider.repair_categories.length > maxCategories && (
                <span className="text-gray-500">
                  +{provider.repair_categories.length - maxCategories} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Urgency Badges */}
        {urgencyBadges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {urgencyBadges.slice(0, 3).map((badge) => (
              <span
                key={badge.id}
                className={cn(
                  'inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium',
                  badge.variant === 'emergency' && 'bg-red-600 text-white',
                  badge.variant === 'same_day' && 'bg-amber-500 text-amber-900',
                  !['emergency', 'same_day'].includes(badge.variant) && 'bg-gray-100 text-gray-700 border border-gray-200'
                )}
              >
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </span>
            ))}
          </div>
        )}
        
        {/* Certification Badges */}
        {showCertifications && certificationBadges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {certificationBadges.slice(0, 4).map((badge) => (
              <span
                key={badge.id}
                className={cn(
                  'inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium',
                  badge.variant === 'gas_safe' && 'bg-blue-700 text-white',
                  badge.variant === 'fgas' && 'bg-sky-500 text-white',
                  badge.variant === 'which' && 'bg-red-600 text-white',
                  badge.variant === 'checkatrade' && 'bg-green-600 text-white',
                  badge.variant === 'insurance' && 'bg-gray-100 text-gray-700 border border-gray-200',
                  badge.variant === 'verified' && 'bg-green-100 text-green-700 border border-green-500'
                )}
              >
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </span>
            ))}
          </div>
        )}
        
        {/* Pricing & Trust */}
        {showPricing && (
          <div className="bg-gray-50 rounded-lg px-4 py-3 mb-4">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {provider.callout_fee_from && (
                <span className="font-semibold text-gray-700">
                  💰 From £{provider.callout_fee_from} callout
                </span>
              )}
              {provider.no_fix_no_fee && (
                <span className="text-green-700 font-medium">
                  ✓ No Fix, No Fee
                </span>
              )}
              {provider.warranty_on_repairs_months && provider.warranty_on_repairs_months >= 3 && (
                <span className="text-gray-600">
                  📋 {provider.warranty_on_repairs_months}-month warranty
                </span>
              )}
              {provider.public_liability_insurance && provider.insurance_amount && (
                <span className="text-gray-600">
                  🛡️ Insured £{formatInsurance(provider.insurance_amount)}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Coverage Area */}
        {provider.city_name && (
          <p className="text-sm text-gray-600 mb-4">
            📍 Serving {provider.city_name} & surrounding areas
          </p>
        )}
        
        {/* CTA Buttons (v1.1 Updated) */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          {/* PRIMARY CTA: Phone (using RevealPhoneNumber v1.1) */}
          <div className="flex-1">
            <RevealPhoneNumber
              phone={provider.phone}
              providerId={provider.id}
              providerSlug={provider.slug}
              mode={phoneDisplayMode}
              pageContext={{
                pagePath: pageContext.pagePath,
                pageType: pageContext.pageType,
                placeId: pageContext.placeId,
                categoryId: pageContext.categoryId,
              }}
              variant="primary"
              rating={provider.average_rating}
              onCallClick={onCallClick}
              className="w-full"
            />
          </div>
          
          <Link
            href={`/provider/${provider.slug}/`}
            onClick={handleProfileClick}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-secondary font-semibold border border-secondary rounded-lg hover:bg-secondary hover:text-white active:scale-[0.98] transition-all"
          >
            <span>View Full Profile</span>
            <span>→</span>
          </Link>
        </div>
        
        {/* Monetization Section */}
        <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
          {/* Parts Affiliate */}
          {showPartsAffiliate && (
            <a
              href={buildAffiliateLink('espares', provider.id, { 
                category: pageContext.categorySlug 
              })}
              target="_blank"
              rel="noopener sponsored"
              onClick={() => handlePartsAffiliateClick(pageContext.categorySlug)}
              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700"
            >
              <span>🔧</span>
              <span>Fix it yourself? Order parts from eSpares →</span>
            </a>
          )}
          
          {/* Cross-Sell to Retail */}
          {showCrossSellRetail && storeCount && storeCount > 0 && (
            <Link
              href={`/${pageContext.countrySlug || 'england'}/${pageContext.citySlug}/`}
              onClick={handleCrossSellClick}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-secondary"
            >
              <span>🛒</span>
              <span>Appliance beyond repair? Browse graded replacements from £149 →</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Build certification badges based on provider data
 */
function buildCertificationBadges(provider: ProviderCardData): CertificationBadge[] {
  const badges: CertificationBadge[] = [];
  
  if (provider.gas_safe_registered) {
    badges.push({
      id: 'gas_safe',
      icon: '🛡️',
      label: 'Gas Safe',
      subtext: provider.gas_safe_number ? `#${provider.gas_safe_number}` : undefined,
      verifyUrl: 'https://www.gassaferegister.co.uk/find-an-engineer/',
      variant: 'gas_safe',
      priority: 1,
    });
  }
  
  if (provider.fgas_certified) {
    badges.push({
      id: 'fgas',
      icon: '❄️',
      label: 'F-Gas Certified',
      variant: 'fgas',
      priority: 2,
    });
  }
  
  if (provider.which_trusted_trader) {
    badges.push({
      id: 'which',
      icon: '✓',
      label: 'Which? Trusted',
      variant: 'which',
      priority: 3,
    });
  }
  
  if (provider.checkatrade_member) {
    badges.push({
      id: 'checkatrade',
      icon: '✓',
      label: 'Checkatrade',
      subtext: provider.checkatrade_id ? `#${provider.checkatrade_id}` : undefined,
      variant: 'checkatrade',
      priority: 4,
    });
  }
  
  if (provider.public_liability_insurance && provider.insurance_amount) {
    badges.push({
      id: 'insurance',
      icon: '🛡️',
      label: `Insured £${formatInsurance(provider.insurance_amount)}`,
      variant: 'insurance',
      priority: 5,
    });
  }
  
  return badges.sort((a, b) => a.priority - b.priority);
}

/**
 * Build urgency badges based on provider data
 */
function buildUrgencyBadges(provider: ProviderCardData): UrgencyBadge[] {
  const badges: UrgencyBadge[] = [];
  
  if (provider.offers_same_day) {
    badges.push({
      id: 'same_day',
      icon: '⚡',
      label: 'Same-day Callouts',
      variant: 'same_day',
      priority: 1,
    });
  }
  
  if (provider.offers_emergency) {
    badges.push({
      id: 'emergency',
      icon: '🚨',
      label: '24/7 Emergency',
      variant: 'emergency',
      priority: 2,
    });
  }
  
  if (provider.offers_next_day) {
    badges.push({
      id: 'next_day',
      icon: '📅',
      label: 'Next-day',
      variant: 'next_day',
      priority: 3,
    });
  }
  
  if (provider.offers_weekend) {
    badges.push({
      id: 'weekend',
      icon: '📅',
      label: 'Weekends',
      variant: 'weekend',
      priority: 4,
    });
  }
  
  if (provider.offers_evening) {
    badges.push({
      id: 'evening',
      icon: '🌙',
      label: 'Evenings',
      variant: 'evening',
      priority: 5,
    });
  }
  
  return badges.sort((a, b) => a.priority - b.priority);
}

/**
 * Format insurance amount (e.g., 2000000 → "2m")
 */
function formatInsurance(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)}m`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}k`;
  }
  return amount.toString();
}

═══════════════════════════════════════════════════════════════
```

---

## Schema.org Implementation

```
SCHEMA.ORG — PROVIDER CARD CONTRIBUTION
═══════════════════════════════════════════════════════════════

Each Provider Card contributes partial schema to page-level JSON-LD.
This enables rich snippets and AI citation extraction.

PROVIDER PROFILE PAGE SCHEMA:
─────────────────────────────────────────────────────────────────

{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://ukgradedappliances.com/provider/{slug}/",
  "name": "{provider.name}",
  "description": "{provider.description}",
  "url": "https://ukgradedappliances.com/provider/{slug}/",
  "telephone": "{provider.phone}",
  "image": "{provider.logo_url}",
  
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{provider.address_line1}",
    "addressLocality": "{provider.city_name}",
    "postalCode": "{provider.postcode}",
    "addressCountry": "GB"
  },
  
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{provider.latitude}",
    "longitude": "{provider.longitude}"
  },
  
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{provider.average_rating}",
    "reviewCount": "{provider.review_count}",
    "bestRating": "5",
    "worstRating": "1"
  },
  
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Gas Safe Register",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Gas Safe Register"
      }
    }
  ],
  
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Washing Machine Repair",
        "serviceType": "Appliance Repair"
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "{callout_fee_from}",
        "priceCurrency": "GBP"
      },
      "areaServed": {
        "@type": "City",
        "name": "{city_name}"
      }
    }
  ],
  
  "openingHoursSpecification": [
    // ... from operating_hours
  ]
}

REPAIR CATEGORY PAGE (ItemList):
─────────────────────────────────────────────────────────────────

{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Washing Machine Repair Engineers in {City}",
  "numberOfItems": {provider_count},
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "HomeAndConstructionBusiness",
        "name": "{provider.name}",
        "url": "https://ukgradedappliances.com/provider/{slug}/",
        "telephone": "{provider.phone}",
        "aggregateRating": { ... }
      }
    }
    // ... more providers
  ]
}

═══════════════════════════════════════════════════════════════
```

---

## Data Fetching Query

```typescript
DATA FETCHING — PROVIDER CARD LIST
═══════════════════════════════════════════════════════════════

// lib/providers/getProvidersForCity.ts

import { createClient } from '@/lib/supabase/server';
import type { ProviderCardData } from '@/types/provider-card';

export async function getProvidersForCity(placeId: string): Promise<ProviderCardData[]> {
  const supabase = createClient();
  
  const { data: providers, error } = await supabase
    .from('service_providers')
    .select(`
      id,
      slug,
      name,
      trading_name,
      short_description,
      description,
      logo_url,
      phone,
      phone_secondary,
      email,
      website,
      address_line1,
      city_name,
      postcode,
      years_trading,
      number_of_engineers,
      operating_hours,
      callout_fee_from,
      callout_fee_to,
      no_fix_no_fee,
      free_quotes,
      offers_same_day,
      offers_next_day,
      offers_emergency,
      offers_weekend,
      offers_evening,
      typical_response_time,
      gas_safe_registered,
      gas_safe_number,
      gas_safe_expiry,
      fgas_certified,
      which_trusted_trader,
      checkatrade_member,
      checkatrade_id,
      trustatrader_member,
      public_liability_insurance,
      insurance_amount,
      warranty_on_repairs_months,
      warranty_on_parts_months,
      uses_genuine_parts,
      average_rating,
      review_count,
      status,
      is_verified,
      is_featured,
      provider_services (
        appliance_categories (
          id,
          name,
          name_singular,
          slug,
          tier
        ),
        offers_same_day,
        callout_fee_min,
        callout_fee_max
      ),
      provider_brand_authorisations (
        brands (
          id,
          name,
          slug
        ),
        authorisation_type,
        is_verified
      ),
      provider_coverage_places (
        places (
          id,
          name
        ),
        is_primary
      )
    `)
    .eq('place_id', placeId)
    .eq('is_active', true)
    .in('status', ['active', 'claimed', 'verified'])
    .order('is_featured', { ascending: false })
    .order('is_verified', { ascending: false })
    .order('average_rating', { ascending: false, nullsFirst: false })
    .order('provider_score', { ascending: false });
  
  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
  
  // Transform the data
  return (providers || []).map(provider => ({
    ...provider,
    repair_categories: provider.provider_services
      ?.map((ps: any) => ({
        ...ps.appliance_categories,
        offers_same_day: ps.offers_same_day,
        callout_fee_min: ps.callout_fee_min,
        callout_fee_max: ps.callout_fee_max,
      }))
      .filter(Boolean)
      .sort((a: any, b: any) => {
        const tierOrder = { tier_1: 0, tier_2: 1, tier_3: 2, supplementary: 3 };
        return (tierOrder[a.tier] || 4) - (tierOrder[b.tier] || 4);
      }) || [],
    authorized_brands: provider.provider_brand_authorisations
      ?.map((pba: any) => ({
        id: pba.brands?.id,
        brand_id: pba.brands?.id,
        brand_name: pba.brands?.name,
        brand_slug: pba.brands?.slug,
        authorisation_type: pba.authorisation_type,
        is_verified: pba.is_verified,
      }))
      .filter((b: any) => b.id) || [],
    coverage_areas: provider.provider_coverage_places
      ?.map((pcp: any) => ({
        place_id: pcp.places?.id,
        place_name: pcp.places?.name,
        is_primary: pcp.is_primary,
      }))
      .filter((c: any) => c.place_id) || [],
  }));
}

// For repair category page
export async function getProvidersForCategory(
  placeId: string,
  categoryId: string
): Promise<ProviderCardData[]> {
  const supabase = createClient();
  
  const { data: providers, error } = await supabase
    .from('service_providers')
    .select(`
      *,
      provider_services!inner (
        appliance_categories (*)
      ),
      provider_brand_authorisations (brands (*)),
      provider_coverage_places (places (*))
    `)
    .eq('place_id', placeId)
    .eq('is_active', true)
    .eq('provider_services.appliance_category_id', categoryId)
    .eq('provider_services.is_active', true)
    .in('status', ['active', 'claimed', 'verified'])
    .order('is_featured', { ascending: false })
    .order('average_rating', { ascending: false, nullsFirst: false });
  
  // ... transform and return
}

═══════════════════════════════════════════════════════════════
```

---

## Component File Structure

```
COMPONENT FILE STRUCTURE (v1.1 Updated)
═══════════════════════════════════════════════════════════════

components/
├── provider/
│   ├── ProviderCard.tsx          # Main component (all variants)
│   ├── ProviderCardCompact.tsx   # Compact variant (extracted)
│   ├── ProviderCardMini.tsx      # Mini variant (extracted)
│   ├── ProviderCardSkeleton.tsx  # Loading skeleton
│   ├── CertificationBadges.tsx   # Badge component
│   ├── UrgencyBadges.tsx         # Urgency badge component
│   ├── RepairCategoriesList.tsx  # Category links (SEO critical)
│   └── index.ts                  # Barrel exports
└── ui/
    ├── RevealPhoneNumber.tsx     # (v1.1) Context-aware phone component
    └── index.ts                  # Barrel exports

lib/
├── providers/
│   ├── getProvidersForCity.ts    # Fetch by city
│   ├── getProvidersForCategory.ts # Fetch by category
│   └── getProvidersByBrand.ts    # Fetch by brand (Phase 2)
├── tracking/
│   ├── trackClick.ts             # Click event logging (incl. 'lead_reveal')
│   └── trackAffiliate.ts         # Affiliate tracking
└── utils/
    ├── hours.ts                  # Operating hours utilities
    ├── phone.ts                  # (v1.1) Phone masking utilities
    └── cn.ts                     # Class name utility

types/
└── provider-card.ts              # TypeScript interfaces (incl. PhoneDisplayMode)

═══════════════════════════════════════════════════════════════
```

---

## Implementation Checklist

### Phase 1: Core Component
- [ ] TypeScript interfaces defined
- [ ] Base ProviderCard component
- [ ] Logo with placeholder fallback
- [ ] Name link with tracking
- [ ] Rating display
- [ ] Verified badge
- [ ] Featured badge

### Phase 2: Trust & Certifications
- [ ] Certification badges builder
- [ ] Gas Safe badge with verify link
- [ ] F-Gas badge
- [ ] Which? Trusted Trader badge
- [ ] Checkatrade badge
- [ ] Insurance badge

### Phase 3: SEO-Critical Content
- [ ] Repair categories list with links
- [ ] Brand authorizations with links
- [ ] Coverage area display
- [ ] Description with expand/collapse

### Phase 4: Urgency & Pricing
- [ ] Urgency badges (same-day, emergency)
- [ ] Pricing display
- [ ] No fix no fee badge
- [ ] Warranty display

### Phase 5: CTAs & Tracking (v1.1 Updated)
- [ ] RevealPhoneNumber component
- [ ] Instant mode (full number, direct call)
- [ ] Reveal mode (masked, click to reveal)
- [ ] lead_reveal event tracking
- [ ] call_click event tracking
- [ ] View Profile button with tracking
- [ ] Google Analytics generate_lead integration

### Phase 5.1: Lead Tracking Infrastructure (v1.1)
- [ ] Database migration: ADD 'lead_reveal' to click_event_type_enum
- [ ] trackClick support for 'lead_reveal' event
- [ ] Phone masking utility function
- [ ] RevealPhoneNumber unit tests
- [ ] Lead tracking analytics dashboard (Phase 2)

### Phase 6: Monetization
- [ ] Parts affiliate link (eSpares)
- [ ] Cross-sell link to retail
- [ ] Affiliate tracking

### Phase 7: Variants & Polish
- [ ] Compact variant (with instant mode)
- [ ] Mini variant (with instant mode)
- [ ] Featured styling
- [ ] Skeleton loader
- [ ] Mobile optimization
- [ ] Accessibility audit

---

## Usage Examples

```tsx
USAGE EXAMPLES (v1.1 Updated)
═══════════════════════════════════════════════════════════════

// City Hub Repair Section — Compact variant, INSTANT phone
<div className="space-y-3">
  <h2>Appliance Repair Services in Birmingham</h2>
  {providers.slice(0, 3).map((provider) => (
    <ProviderCard
      key={provider.id}
      provider={provider}
      variant="compact"
      phoneDisplayMode="instant"  // v1.1: Direct call, no friction
      pageContext={{
        pagePath: '/england/birmingham/',
        pageType: 'city_hub',
        placeId: cityId,
        citySlug: 'birmingham',
      }}
      storeCount={storeCount}
    />
  ))}
</div>

// Repair Category Page — Full variant, INSTANT phone (user comparing)
{providers.map((provider) => (
  <ProviderCard
    key={provider.id}
    provider={provider}
    variant="full"
    phoneDisplayMode="instant"  // v1.1: User comparing, reduce friction
    pageContext={{
      pagePath: '/england/birmingham/washing-machine-repair/',
      pageType: 'repair_category',
      placeId: cityId,
      categoryId: categoryId,
      categorySlug: 'washing-machines',
      citySlug: 'birmingham',
    }}
    storeCount={storeCount}
    showPartsAffiliate={true}
    showCrossSellRetail={true}
  />
))}

// Provider Profile Page — Use RevealPhoneNumber directly with REVEAL mode
// (Not using ProviderCard here, but direct component usage)
<RevealPhoneNumber
  phone={provider.phone}
  providerId={provider.id}
  providerSlug={provider.slug}
  mode="reveal"  // v1.1: User committed, track lead intent
  pageContext={{
    pagePath: `/provider/${provider.slug}/`,
    pageType: 'provider_profile',
    placeId: provider.primaryPlaceId,
  }}
  variant="primary"
  rating={provider.average_rating}
/>

// Brand Repair Page — Full variant with brand context
{providers.map((provider) => (
  <ProviderCard
    key={provider.id}
    provider={provider}
    variant="full"
    phoneDisplayMode="instant"  // v1.1: Still comparing by brand
    pageContext={{
      pagePath: '/england/birmingham/bosch-repair/',
      pageType: 'brand_repair',
      placeId: cityId,
      citySlug: 'birmingham',
    }}
    showBrandAuths={false}  // Already on brand page
  />
))}

// Featured/Sponsored Listing (Phase 3) — REVEAL mode for attribution
{featuredProviders.map((provider) => (
  <ProviderCard
    key={provider.id}
    provider={provider}
    variant="featured"
    phoneDisplayMode="reveal"  // v1.1: Provider paying, max attribution
    pageContext={pageContext}
    storeCount={storeCount}
  />
))}

═══════════════════════════════════════════════════════════════
```

---

**END OF PROVIDER CARD COMPONENT SPECIFICATION**

═══════════════════════════════════════════════════════════════
Document Status: ✅ LOCKED
Version: 1.1
Original: January 2026
v1.1 Amendment: January 2026 — Lead-Tracking Phone Display Pattern
Next: Repair Category Page Specification

v1.1 CHANGELOG:
─────────────────────────────────────────────────────────────────
├── Added PhoneDisplayMode type ('instant' | 'reveal')
├── Added RevealPhoneNumber component specification
├── Added 'lead_reveal' event type (higher value than call_click)
├── Added phoneDisplayMode prop to ProviderCardProps
├── Added Phone Number Display Strategy section
├── Updated Click Tracking section with event hierarchy
├── Updated Implementation Checklist with Phase 5.1
├── Updated Usage Examples with mode context
├── Added database migration for lead_reveal enum

CONTEXT-AWARE PHONE DISPLAY SUMMARY:
─────────────────────────────────────────────────────────────────
│ Page Type              │ Mode    │ Rationale                 │
├────────────────────────┼─────────┼───────────────────────────┤
│ Provider Cards         │ instant │ User comparing, low friction │
│ Provider Profile       │ reveal  │ User committed, track lead │
│ Featured/Sponsored     │ reveal  │ Provider paying, attribution │
│ Mobile Sticky CTA      │ instant │ Urgent users, one-tap call  │
═══════════════════════════════════════════════════════════════
