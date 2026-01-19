# Review Display System Specification

**Version:** 1.0 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED  
**Spec Number:** 21  
**Dependencies:** Spec 06 (Store Profile), Spec 08 (Store Card), Spec 09 (Provider Card), Spec 11 (Provider Profile)

---

## 1. Executive Summary

### 1.1 Purpose

This specification defines how customer reviews and ratings are displayed across the UK Graded Appliances platform. It covers the Google Reviews integration strategy, rating display components, Schema.org implementation for SEO, and the approach for handling review data.

### 1.2 Core Strategy Decision

```
REVIEW STRATEGY — FINAL DECISION
═══════════════════════════════════════════════════════════════════════════

QUESTION: Should we build an internal review system?

ANSWER: NO — Link to Google Reviews instead

RATIONALE:
├── Zero maintenance — No moderation, no spam filtering
├── Trust transfer — Google Reviews carry inherent credibility
├── No API costs — No Google Places API needed
├── SEO benefit — Google values businesses with Google Reviews
├── User familiarity — Everyone knows how Google Reviews work
├── Legal simplicity — No liability for user-generated content
└── Phase 1 focus — Core directory functionality first

IMPLEMENTATION:
├── Store rating summary locally (average_rating, review_count)
├── Link to Google for reading/writing reviews
├── Show rating in cards and profile pages
├── Use Schema.org AggregateRating for SEO
└── Keep reviews table for potential future use (Phase 3+)

═══════════════════════════════════════════════════════════════════════════
```

### 1.3 What This Spec Covers

| Component | Description |
|-----------|-------------|
| **Rating Display** | Star rating and review count display |
| **Reviews Section** | Profile page section with Google links |
| **Schema.org** | AggregateRating implementation |
| **Data Sources** | Database fields used |
| **Fallback States** | Handling missing data |
| **Future Path** | Migration if internal reviews added later |

---

## 2. Database Fields

### 2.1 Stores Table

```sql
-- Rating fields (already exist in schema)
stores.google_maps_url    VARCHAR(500)    -- Link to Google Maps listing
stores.average_rating     NUMERIC(3,2)    -- 0.00 to 5.00 (e.g., 4.80)
stores.review_count       INTEGER         -- Total reviews (e.g., 127)
```

### 2.2 Service Providers Table

```sql
-- Rating fields (already exist in schema)
service_providers.google_maps_url    VARCHAR(500)    -- Link to Google Maps listing
service_providers.average_rating     NUMERIC(3,2)    -- 0.00 to 5.00
service_providers.review_count       INTEGER         -- Total reviews
```

### 2.3 Data Entry Approach

```
RATING DATA — HOW IT GETS INTO THE SYSTEM
═══════════════════════════════════════════════════════════════════════════

OPTION 1: Manual Entry by Business Owner (Primary)
├── When: During claim flow / profile editing
├── Fields: google_maps_url, average_rating, review_count
├── Validation: URL must be valid Google Maps URL
├── Trust: Owner self-reports (can be verified)
└── Update frequency: Owner updates when desired

OPTION 2: Admin Data Entry (Seed Data)
├── When: Initial directory population
├── Process: Admin manually looks up Google rating
├── Frequency: One-time or periodic manual updates
└── Use case: Unclaimed business profiles

WHY NOT AUTO-SYNC FROM GOOGLE API:
├── ❌ Google Places API costs money ($17 per 1000 requests)
├── ❌ Requires API key management
├── ❌ Rate limits and quotas
├── ❌ Terms of service complexity
├── ❌ Adds backend complexity
└── ✅ Manual entry is simpler for Phase 1

FUTURE (Phase 3+):
├── Consider Google Places API integration
├── Periodic sync job (weekly/monthly)
├── Data freshness indicators
└── "Last updated" timestamps

═══════════════════════════════════════════════════════════════════════════
```

---

## 3. Rating Display Component

### 3.1 Visual Specifications

```
RATING DISPLAY — VISUAL VARIANTS
═══════════════════════════════════════════════════════════════════════════

VARIANT 1: INLINE (Cards, Search Results)
─────────────────────────────────────────────────────────────────────────────

  ⭐ 4.8 (127)

SPECIFICATIONS:
├── Star: Yellow (#FBBF24 / amber-400)
├── Rating: 16px, font-weight 600, #111827 (gray-900)
├── Count: 14px, font-weight 400, #6B7280 (gray-500)
├── Parentheses included around count
├── Space: 4px between star and rating, 4px between rating and count
└── Total width: Fits inline with other content

─────────────────────────────────────────────────────────────────────────────

VARIANT 2: STACKED (Profile Hero, Featured Cards)
─────────────────────────────────────────────────────────────────────────────

  ⭐ 4.8
  127 reviews

SPECIFICATIONS:
├── Line 1: Star + rating
│   ├── Star: Yellow (#FBBF24)
│   └── Rating: 24px, font-weight 700, #111827
├── Line 2: Review count text
│   ├── Font: 14px, font-weight 400, #6B7280
│   └── Format: "{count} reviews"
└── Alignment: Can be left, center, or right

─────────────────────────────────────────────────────────────────────────────

VARIANT 3: COMPACT (Mini Cards, Map Popups)
─────────────────────────────────────────────────────────────────────────────

  ⭐ 4.8

SPECIFICATIONS:
├── Star: Yellow (#FBBF24)
├── Rating: 14px, font-weight 600, #111827
├── No review count (too compact)
└── Used where space is extremely limited

─────────────────────────────────────────────────────────────────────────────

VARIANT 4: DETAILED (Profile Page Section)
─────────────────────────────────────────────────────────────────────────────

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │   ⭐⭐⭐⭐⭐  4.8 out of 5                                      │
  │                                                                  │
  │   Based on 127 reviews on Google                                │
  │                                                                  │
  │   ┌────────────────────┐  ┌────────────────────────────┐       │
  │   │  📖 Read Reviews   │  │  ✏️ Write a Review         │       │
  │   └────────────────────┘  └────────────────────────────┘       │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘

SPECIFICATIONS:
├── Stars: 5 stars displayed, filled based on rating
│   ├── Filled star: #FBBF24 (amber-400)
│   └── Empty star: #D1D5DB (gray-300)
├── Rating text: "{rating} out of 5"
│   ├── Font: 20px, font-weight 700
│   └── Color: #111827
├── Count text: "Based on {count} reviews on Google"
│   ├── Font: 14px, font-weight 400
│   └── Color: #6B7280
├── Buttons: Secondary background, white text
│   ├── Both link to google_maps_url
│   └── Open in new tab (rel="noopener noreferrer")
└── Container: Light gray background (#F9FAFB), rounded-lg

═══════════════════════════════════════════════════════════════════════════
```

### 3.2 Star Display Logic

```typescript
// Calculate filled vs empty stars
function getStarDisplay(rating: number): { filled: number; half: boolean; empty: number } {
  const filled = Math.floor(rating);
  const decimal = rating - filled;
  const half = decimal >= 0.25 && decimal < 0.75;
  const extraFilled = decimal >= 0.75 ? 1 : 0;
  
  return {
    filled: filled + extraFilled,
    half: half,
    empty: 5 - filled - extraFilled - (half ? 1 : 0),
  };
}

// Examples:
// 4.8 → { filled: 5, half: false, empty: 0 }  (rounds up)
// 4.5 → { filled: 4, half: true, empty: 0 }   (half star)
// 4.2 → { filled: 4, half: false, empty: 1 }  (rounds down)
// 3.7 → { filled: 4, half: false, empty: 1 }  (rounds up)
```

### 3.3 React Component

```typescript
// components/reviews/RatingDisplay.tsx

'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

type RatingVariant = 'inline' | 'stacked' | 'compact' | 'detailed';

interface RatingDisplayProps {
  /** Average rating (0-5) */
  rating: number | null;
  /** Total review count */
  reviewCount: number;
  /** Display variant */
  variant?: RatingVariant;
  /** Google Maps URL for links */
  googleMapsUrl?: string | null;
  /** Entity name for accessibility */
  entityName?: string;
  /** Additional CSS classes */
  className?: string;
}

export function RatingDisplay({
  rating,
  reviewCount,
  variant = 'inline',
  googleMapsUrl,
  entityName = 'this business',
  className = '',
}: RatingDisplayProps) {
  // Don't render if no rating
  if (!rating && reviewCount === 0) {
    return null;
  }

  // Format rating to 1 decimal place
  const formattedRating = rating ? rating.toFixed(1) : null;

  // Accessibility label
  const ariaLabel = rating
    ? `Rating: ${formattedRating} out of 5 stars${reviewCount > 0 ? `, ${reviewCount} reviews` : ''}`
    : 'No rating yet';

  // Render based on variant
  switch (variant) {
    case 'compact':
      return (
        <div className={`flex items-center gap-1 ${className}`} aria-label={ariaLabel}>
          <StarIcon className="w-4 h-4 text-amber-400" aria-hidden="true" />
          <span className="text-sm font-semibold text-gray-900">{formattedRating}</span>
        </div>
      );

    case 'stacked':
      return (
        <div className={`text-right ${className}`} aria-label={ariaLabel}>
          <div className="flex items-center justify-end gap-1">
            <StarIcon className="w-5 h-5 text-amber-400" aria-hidden="true" />
            <span className="text-xl font-bold text-gray-900">{formattedRating}</span>
          </div>
          {reviewCount > 0 && (
            <p className="text-sm text-gray-500">{reviewCount} reviews</p>
          )}
        </div>
      );

    case 'detailed':
      return (
        <DetailedRating
          rating={rating}
          reviewCount={reviewCount}
          googleMapsUrl={googleMapsUrl}
          entityName={entityName}
          className={className}
        />
      );

    case 'inline':
    default:
      return (
        <div className={`flex items-center gap-1 ${className}`} aria-label={ariaLabel}>
          <StarIcon className="w-4 h-4 text-amber-400" aria-hidden="true" />
          <span className="text-base font-semibold text-gray-900">{formattedRating}</span>
          {reviewCount > 0 && (
            <span className="text-sm text-gray-500">({reviewCount})</span>
          )}
        </div>
      );
  }
}

// Detailed variant with stars and Google links
function DetailedRating({
  rating,
  reviewCount,
  googleMapsUrl,
  entityName,
  className,
}: {
  rating: number | null;
  reviewCount: number;
  googleMapsUrl?: string | null;
  entityName: string;
  className?: string;
}) {
  const { filled, half, empty } = rating ? getStarDisplay(rating) : { filled: 0, half: false, empty: 5 };

  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      {/* Star Display */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex" aria-hidden="true">
          {/* Filled stars */}
          {Array.from({ length: filled }).map((_, i) => (
            <StarIcon key={`filled-${i}`} className="w-6 h-6 text-amber-400" />
          ))}
          {/* Half star (simplified as filled) */}
          {half && <StarIcon className="w-6 h-6 text-amber-400" />}
          {/* Empty stars */}
          {Array.from({ length: empty }).map((_, i) => (
            <StarOutline key={`empty-${i}`} className="w-6 h-6 text-gray-300" />
          ))}
        </div>
        {rating && (
          <span className="text-xl font-bold text-gray-900">
            {rating.toFixed(1)} out of 5
          </span>
        )}
      </div>

      {/* Review count */}
      <p className="text-sm text-gray-500 mb-4">
        {reviewCount > 0
          ? `Based on ${reviewCount} reviews on Google`
          : 'No reviews yet'}
      </p>

      {/* Action buttons */}
      {googleMapsUrl && (
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
          >
            <span aria-hidden="true">📖</span>
            Read Reviews
            <span className="sr-only">on Google (opens in new tab)</span>
          </a>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563eb] text-white rounded-lg hover:bg-[#1e40af] transition-colors text-sm font-medium"
          >
            <span aria-hidden="true">✏️</span>
            Write a Review
            <span className="sr-only">on Google (opens in new tab)</span>
          </a>
        </div>
      )}

      {/* No Google URL fallback */}
      {!googleMapsUrl && reviewCount === 0 && (
        <p className="text-sm text-gray-500 italic">
          Reviews coming soon. Check back later!
        </p>
      )}
    </div>
  );
}

// Helper function
function getStarDisplay(rating: number) {
  const filled = Math.floor(rating);
  const decimal = rating - filled;
  const half = decimal >= 0.25 && decimal < 0.75;
  const extraFilled = decimal >= 0.75 ? 1 : 0;

  return {
    filled: filled + extraFilled,
    half: half && extraFilled === 0,
    empty: Math.max(0, 5 - filled - extraFilled - (half && extraFilled === 0 ? 1 : 0)),
  };
}

export default RatingDisplay;
```

---

## 4. Reviews Section (Profile Pages)

### 4.1 Store Profile Page Implementation

```
STORE PROFILE — REVIEWS SECTION
═══════════════════════════════════════════════════════════════════════════

LOCATION: After "Warranty & Guarantee" section, before "Location"
SECTION NUMBER: 10 (per Spec 06)

VISUAL DESIGN (Desktop):
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ⭐ Customer Reviews                                                    │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                                                                   │ │
│  │   ⭐⭐⭐⭐⭐  4.8 out of 5                                       │ │
│  │                                                                   │ │
│  │   Based on 127 reviews on Google                                 │ │
│  │                                                                   │ │
│  │   ┌─────────────────┐  ┌─────────────────────────┐              │ │
│  │   │ 📖 Read Reviews │  │ ✏️ Write a Review       │              │ │
│  │   └─────────────────┘  └─────────────────────────┘              │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  💡 Reviews are hosted on Google Maps. Click "Read Reviews" to see     │
│     what customers say about Best Graded Appliances.                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

VISUAL DESIGN (Mobile):
┌───────────────────────────────┐
│                               │
│  ⭐ Customer Reviews          │
│  ═════════════════════════   │
│                               │
│  ⭐⭐⭐⭐⭐  4.8 out of 5     │
│                               │
│  Based on 127 reviews         │
│  on Google                    │
│                               │
│  ┌───────────────────────┐   │
│  │ 📖 Read Reviews       │   │
│  └───────────────────────┘   │
│                               │
│  ┌───────────────────────┐   │
│  │ ✏️ Write a Review     │   │
│  └───────────────────────┘   │
│                               │
└───────────────────────────────┘

DATA SOURCE:
├── stores.average_rating      → Star display + "X out of 5"
├── stores.review_count        → "Based on X reviews on Google"
└── stores.google_maps_url     → Link target for both buttons

FALLBACK STATES:
├── No google_maps_url:
│   ├── Hide "Read Reviews" and "Write a Review" buttons
│   └── Show: "Reviews coming soon"
├── No average_rating:
│   ├── Show empty stars
│   └── Show: "No rating yet"
├── review_count = 0:
│   └── Show: "No reviews yet"
└── All data missing:
    └── Hide entire section

═══════════════════════════════════════════════════════════════════════════
```

### 4.2 Provider Profile Page Implementation

```
PROVIDER PROFILE — REVIEWS SECTION
═══════════════════════════════════════════════════════════════════════════

LOCATION: After "Pricing & Callout Fees" section, before "Coverage Area"
SECTION NUMBER: 12 (per Spec 11)

VISUAL DESIGN (Same as Store, with provider-specific copy):
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ⭐ Customer Reviews                                                    │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                                                                   │ │
│  │   ⭐⭐⭐⭐⭐  4.9 out of 5                                       │ │
│  │                                                                   │ │
│  │   Based on 89 reviews on Google                                  │ │
│  │                                                                   │ │
│  │   ┌─────────────────┐  ┌─────────────────────────┐              │ │
│  │   │ 📖 Read Reviews │  │ ✏️ Write a Review       │              │ │
│  │   └─────────────────┘  └─────────────────────────┘              │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  💡 Reviews are hosted on Google Maps. Click "Read Reviews" to see     │
│     what customers say about Joe's Appliance Repairs.                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

DATA SOURCE:
├── service_providers.average_rating      → Star display
├── service_providers.review_count        → Review count text
└── service_providers.google_maps_url     → Link target

SPECIAL CONSIDERATION FOR PROVIDERS:
├── Some providers may not have Google My Business
├── More likely to have no google_maps_url
├── Fallback more important
└── Consider: "This engineer hasn't set up Google Reviews yet"

═══════════════════════════════════════════════════════════════════════════
```

### 4.3 React Component for Reviews Section

```typescript
// components/reviews/ReviewsSection.tsx

'use client';

import { RatingDisplay } from './RatingDisplay';

interface ReviewsSectionProps {
  /** Entity type for copy text */
  entityType: 'store' | 'provider';
  /** Entity name for copy text */
  entityName: string;
  /** Average rating (0-5) */
  averageRating: number | null;
  /** Total review count */
  reviewCount: number;
  /** Google Maps URL */
  googleMapsUrl: string | null;
}

export function ReviewsSection({
  entityType,
  entityName,
  averageRating,
  reviewCount,
  googleMapsUrl,
}: ReviewsSectionProps) {
  // Hide section if no data at all
  if (!averageRating && reviewCount === 0 && !googleMapsUrl) {
    return null;
  }

  const entityLabel = entityType === 'store' ? 'store' : 'engineer';

  return (
    <section className="py-8" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="text-xl font-bold mb-4 flex items-center gap-2">
        <span aria-hidden="true">⭐</span>
        Customer Reviews
      </h2>

      {/* Rating Display */}
      <RatingDisplay
        rating={averageRating}
        reviewCount={reviewCount}
        variant="detailed"
        googleMapsUrl={googleMapsUrl}
        entityName={entityName}
        className="mb-4"
      />

      {/* Helper text */}
      {googleMapsUrl && (
        <p className="text-sm text-gray-500 flex items-start gap-2 mt-4">
          <span aria-hidden="true">💡</span>
          <span>
            Reviews are hosted on Google Maps. Click "Read Reviews" to see what
            customers say about {entityName}.
          </span>
        </p>
      )}

      {/* No Google URL state */}
      {!googleMapsUrl && (
        <p className="text-sm text-gray-500 italic mt-4">
          {entityType === 'provider'
            ? `This ${entityLabel} hasn't set up Google Reviews yet. Contact them directly for references.`
            : 'Google Reviews coming soon. Check back later!'}
        </p>
      )}
    </section>
  );
}

export default ReviewsSection;
```

---

## 5. Integration with Cards

### 5.1 Store Card Rating Display

```
STORE CARD — RATING INTEGRATION
═══════════════════════════════════════════════════════════════════════════

LOCATION: Header row, after name/badges
SPEC REFERENCE: Spec 08 (Store Card Component)

FULL VARIANT:
┌─────────────────────────────────────────────────────────────────────────┐
│  ┌────┐                                                                 │
│  │LOGO│  STORE NAME HERE               ⭐ 4.8 (127)                    │
│  │48px│  ✓ Verified • Manchester                                       │
│  └────┘                                                                 │
│  ...                                                                    │
└─────────────────────────────────────────────────────────────────────────┘

COMPACT VARIANT:
┌────────────────────────────────────────────┐
│  STORE NAME              ⭐ 4.8 (127)      │
│  Manchester • ✓ Verified                  │
└────────────────────────────────────────────┘

MINI VARIANT (Map Popup):
┌──────────────────────────────┐
│  STORE NAME      ⭐ 4.8     │
└──────────────────────────────┘

USAGE:
<RatingDisplay
  rating={store.average_rating}
  reviewCount={store.review_count}
  variant="inline"  // or "compact" for mini
/>

NOTE: Rating on card is NOT clickable — user clicks card to go to profile,
then can access reviews from profile page.

═══════════════════════════════════════════════════════════════════════════
```

### 5.2 Provider Card Rating Display

```
PROVIDER CARD — RATING INTEGRATION
═══════════════════════════════════════════════════════════════════════════

LOCATION: Header row, after name/experience
SPEC REFERENCE: Spec 09 (Provider Card Component)

FULL VARIANT:
┌─────────────────────────────────────────────────────────────────────────┐
│  ┌────┐                                                                 │
│  │LOGO│  PROVIDER NAME HERE            ⭐ 4.9 (89)                     │
│  │48px│  ✓ Gas Safe • 15 years exp.                                    │
│  └────┘                                                                 │
│  ...                                                                    │
└─────────────────────────────────────────────────────────────────────────┘

COMPACT VARIANT:
┌────────────────────────────────────────────┐
│  PROVIDER NAME           ⭐ 4.9 (89)      │
│  ✓ Gas Safe • Manchester                  │
└────────────────────────────────────────────┘

USAGE:
<RatingDisplay
  rating={provider.average_rating}
  reviewCount={provider.review_count}
  variant="inline"
/>

═══════════════════════════════════════════════════════════════════════════
```

---

## 6. Schema.org Implementation

### 6.1 AggregateRating Schema

```
SCHEMA.ORG — AGGREGATE RATING
═══════════════════════════════════════════════════════════════════════════

PURPOSE:
├── Enables Google rich snippets (stars in search results)
├── Improves click-through rate from SERP
├── AI search engines can extract rating data
└── Required for LocalBusiness/HomeAndConstructionBusiness schemas

IMPLEMENTATION:
├── Include in every Store Profile page
├── Include in every Provider Profile page
├── Only include if average_rating exists
└── Nest within primary entity schema

═══════════════════════════════════════════════════════════════════════════
```

### 6.2 Store Profile Schema

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ukgradedappliances.com/store/best-graded-manchester/#business",
  "name": "Best Graded Appliances Manchester",
  "description": "Specialising in graded and ex-display appliances...",
  "url": "https://ukgradedappliances.com/store/best-graded-manchester/",
  "telephone": "+44 161 123 4567",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Unit 15, Trafford Park",
    "addressLocality": "Manchester",
    "postalCode": "M17 1WA",
    "addressCountry": "GB"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

### 6.3 Provider Profile Schema

```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://ukgradedappliances.com/provider/joes-appliance-repairs/#business",
  "name": "Joe's Appliance Repairs",
  "description": "Professional appliance repair services...",
  "url": "https://ukgradedappliances.com/provider/joes-appliance-repairs/",
  "telephone": "+44 121 987 6543",
  "areaServed": {
    "@type": "City",
    "name": "Birmingham"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "89",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

### 6.4 TypeScript Helper

```typescript
// lib/schema/aggregateRating.ts

interface AggregateRatingSchema {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
  worstRating: string;
}

export function buildAggregateRating(
  averageRating: number | null,
  reviewCount: number
): AggregateRatingSchema | undefined {
  // Only include if we have a rating
  if (!averageRating || averageRating === 0) {
    return undefined;
  }

  return {
    '@type': 'AggregateRating',
    ratingValue: averageRating.toFixed(1),
    reviewCount: String(reviewCount || 0),
    bestRating: '5',
    worstRating: '1',
  };
}

// Usage in page schema:
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: store.business_name,
  // ... other fields
  aggregateRating: buildAggregateRating(store.average_rating, store.review_count),
};
```

---

## 7. Google Maps URL Handling

### 7.1 URL Validation

```typescript
// lib/reviews/googleMapsUrl.ts

/**
 * Validate that a URL is a valid Google Maps URL
 */
export function isValidGoogleMapsUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  
  try {
    const parsed = new URL(url);
    const validHosts = [
      'google.com',
      'www.google.com',
      'google.co.uk',
      'www.google.co.uk',
      'maps.google.com',
      'maps.google.co.uk',
      'goo.gl', // Short URLs
    ];
    
    return validHosts.some(host => 
      parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
    );
  } catch {
    return false;
  }
}

/**
 * Get the reviews URL from a Google Maps URL
 * Note: Both "Read Reviews" and "Write a Review" use the same URL
 * Google handles the rest
 */
export function getGoogleReviewsUrl(googleMapsUrl: string | null): string | null {
  if (!googleMapsUrl || !isValidGoogleMapsUrl(googleMapsUrl)) {
    return null;
  }
  return googleMapsUrl;
}
```

### 7.2 Link Attributes

```typescript
// All Google Review links must include these attributes:
const googleReviewLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

// Example usage:
<a
  href={googleMapsUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  Read Reviews
</a>
```

---

## 8. Fallback States

### 8.1 State Matrix

```
FALLBACK STATE HANDLING
═══════════════════════════════════════════════════════════════════════════

STATE 1: All Data Present ✅
├── average_rating: 4.8
├── review_count: 127
├── google_maps_url: "https://..."
└── DISPLAY: Full rating display with buttons

─────────────────────────────────────────────────────────────────────────────

STATE 2: Rating Only (No Google URL)
├── average_rating: 4.5
├── review_count: 32
├── google_maps_url: null
└── DISPLAY:
    ├── Show stars and rating
    ├── Show "32 reviews"
    ├── Hide action buttons
    └── Show: "Google Reviews coming soon"

─────────────────────────────────────────────────────────────────────────────

STATE 3: Google URL Only (No Rating Data)
├── average_rating: null
├── review_count: 0
├── google_maps_url: "https://..."
└── DISPLAY:
    ├── Show: "See our reviews on Google"
    └── Show action buttons

─────────────────────────────────────────────────────────────────────────────

STATE 4: No Data At All
├── average_rating: null
├── review_count: 0
├── google_maps_url: null
└── DISPLAY:
    ├── Cards: Hide rating entirely
    └── Profile: Hide reviews section entirely

═══════════════════════════════════════════════════════════════════════════
```

### 8.2 Conditional Rendering Logic

```typescript
// Helper to determine what to show
interface ReviewDisplayState {
  showRating: boolean;
  showButtons: boolean;
  showFallbackMessage: boolean;
  fallbackMessage: string | null;
}

export function getReviewDisplayState(
  averageRating: number | null,
  reviewCount: number,
  googleMapsUrl: string | null,
  entityType: 'store' | 'provider'
): ReviewDisplayState {
  const hasRating = averageRating !== null && averageRating > 0;
  const hasReviews = reviewCount > 0;
  const hasGoogleUrl = googleMapsUrl !== null && googleMapsUrl.length > 0;

  // State 1: Full data
  if (hasRating && hasGoogleUrl) {
    return {
      showRating: true,
      showButtons: true,
      showFallbackMessage: false,
      fallbackMessage: null,
    };
  }

  // State 2: Rating but no URL
  if (hasRating && !hasGoogleUrl) {
    return {
      showRating: true,
      showButtons: false,
      showFallbackMessage: true,
      fallbackMessage: 'Google Reviews coming soon. Check back later!',
    };
  }

  // State 3: URL but no rating
  if (!hasRating && hasGoogleUrl) {
    return {
      showRating: false,
      showButtons: true,
      showFallbackMessage: true,
      fallbackMessage: 'See what customers say about us on Google.',
    };
  }

  // State 4: No data
  return {
    showRating: false,
    showButtons: false,
    showFallbackMessage: false,
    fallbackMessage: null,
  };
}
```

---

## 9. Accessibility Requirements

### 9.1 WCAG 2.1 AA Compliance

```
ACCESSIBILITY REQUIREMENTS
═══════════════════════════════════════════════════════════════════════════

SCREEN READER SUPPORT:
├── Star icons: aria-hidden="true" (decorative)
├── Rating text: Include full context
│   └── "Rating: 4.8 out of 5 stars, 127 reviews"
├── Buttons: Include destination in accessible name
│   └── "Read Reviews on Google (opens in new tab)"
└── Section: Proper heading hierarchy

KEYBOARD NAVIGATION:
├── Buttons: Fully focusable and activatable
├── Links: Standard link behavior
├── Focus indicators: 2px outline, visible
└── Tab order: Logical flow

COLOR CONTRAST:
├── Star color (#FBBF24): Decorative, not sole indicator
├── Rating text: Meets 4.5:1 against background
├── Button text: Meets 4.5:1 (white on secondary)
└── Fallback text: Meets 4.5:1

EXAMPLE ACCESSIBLE MARKUP:
─────────────────────────────────────────────────────────────────────────────

<div role="region" aria-label="Customer reviews for Best Graded Appliances">
  <h2 id="reviews-heading">Customer Reviews</h2>
  
  <div aria-label="Rating: 4.8 out of 5 stars, based on 127 reviews">
    <span aria-hidden="true">⭐⭐⭐⭐⭐</span>
    <span>4.8 out of 5</span>
  </div>
  
  <p>Based on 127 reviews on Google</p>
  
  <a href="..." target="_blank" rel="noopener noreferrer">
    Read Reviews
    <span class="sr-only">on Google (opens in new tab)</span>
  </a>
  
  <a href="..." target="_blank" rel="noopener noreferrer">
    Write a Review
    <span class="sr-only">on Google (opens in new tab)</span>
  </a>
</div>

═══════════════════════════════════════════════════════════════════════════
```

---

## 10. SEO & AEO Considerations

### 10.1 SEO Benefits

```
SEO IMPACT OF REVIEWS
═══════════════════════════════════════════════════════════════════════════

GOOGLE RICH SNIPPETS:
├── AggregateRating schema enables star display in SERP
├── Increases click-through rate by 10-30%
├── Visual differentiation from competitors
└── Requires: rating + review count

SEARCH RESULT EXAMPLE:
┌─────────────────────────────────────────────────────────────────────────┐
│  Best Graded Appliances Manchester                                     │
│  ukgradedappliances.com › store › best-graded-manchester              │
│  ⭐⭐⭐⭐⭐ Rating: 4.8 · 127 reviews                                   │
│  Graded appliances, ex-display, and factory seconds. Free delivery...  │
└─────────────────────────────────────────────────────────────────────────┘

LOCAL SEO:
├── Google values businesses with Google Reviews
├── Review quantity is ranking factor
├── Review recency matters
└── Linking to Google Maps reinforces local presence

═══════════════════════════════════════════════════════════════════════════
```

### 10.2 AEO (AI Search) Benefits

```
AEO IMPACT OF REVIEWS
═══════════════════════════════════════════════════════════════════════════

AI SEARCH ENGINES USE RATINGS FOR:
├── Trust signals — Higher rated businesses cited more
├── Comparison queries — "Best appliance store in Manchester"
├── Recommendation queries — AI cites highly-rated options
└── Filtering — Some AI systems filter by minimum rating

STRUCTURED DATA EXTRACTION:
├── AI can extract: "4.8 stars from 127 reviews"
├── Enables: "According to customer reviews on UK Graded Appliances..."
├── Attribution: Rating data cited with source
└── Comparison: AI can compare multiple stores' ratings

EXAMPLE AI RESPONSE:
─────────────────────────────────────────────────────────────────────────────

User: "What's the best graded appliance store in Manchester?"

AI: "Based on customer reviews, Best Graded Appliances Manchester is 
highly rated with 4.8 stars from 127 reviews according to UK Graded 
Appliances directory. They offer free delivery and 12-month warranties..."

─────────────────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════════════
```

---

## 11. Future Migration Path

### 11.1 Phase 3+ Internal Reviews

```
FUTURE: INTERNAL REVIEW SYSTEM (Phase 3+)
═══════════════════════════════════════════════════════════════════════════

IF INTERNAL REVIEWS ARE ADDED LATER:
├── Database schema already exists (reviews table)
├── Polymorphic design supports stores + providers
├── Sub-ratings structure defined (value, quality, etc.)
├── Moderation workflow designed
└── Triggers for aggregation exist

MIGRATION PATH:
1. Keep Google Reviews as primary source
2. Add "Reviews on UK Graded Appliances" section
3. Show both Google + internal reviews
4. Internal reviews need moderation workflow
5. Update average_rating calculation:
   └── Weighted average of Google + internal

WHAT WOULD NEED TO BE BUILT:
├── Review submission form
├── Email verification for reviewers
├── Moderation admin panel (Spec 23)
├── Review card display component
├── Pagination for reviews
├── Business response feature
├── Review notification emails
└── Review request emails (post-purchase)

RECOMMENDATION:
├── Phase 1-2: Google Reviews only (current spec)
├── Phase 3: Consider internal reviews
├── Decision factors:
│   ├── Traffic volume (worth the effort?)
│   ├── User demand (do users want to review on-site?)
│   ├── Competitive advantage (do competitors have this?)
│   └── Maintenance burden (moderation resources)
└── Re-evaluate at 10,000+ monthly visitors

═══════════════════════════════════════════════════════════════════════════
```

---

## 12. Component File Structure

```
PROJECT STRUCTURE — REVIEW COMPONENTS
═══════════════════════════════════════════════════════════════════════════

src/
├── components/
│   └── reviews/
│       ├── RatingDisplay.tsx         ← All rating display variants
│       ├── ReviewsSection.tsx        ← Profile page reviews section
│       └── index.ts                  ← Exports
│
├── lib/
│   ├── reviews/
│   │   ├── googleMapsUrl.ts          ← URL validation helpers
│   │   └── displayState.ts           ← Fallback state logic
│   │
│   └── schema/
│       └── aggregateRating.ts        ← Schema.org builder
│
└── types/
    └── reviews.ts                    ← TypeScript interfaces

═══════════════════════════════════════════════════════════════════════════
```

---

## 13. TypeScript Interfaces

```typescript
// types/reviews.ts

/**
 * Rating data available on stores and providers
 */
export interface RatingData {
  average_rating: number | null;
  review_count: number;
  google_maps_url: string | null;
}

/**
 * Props for rating display component
 */
export interface RatingDisplayProps {
  rating: number | null;
  reviewCount: number;
  variant?: 'inline' | 'stacked' | 'compact' | 'detailed';
  googleMapsUrl?: string | null;
  entityName?: string;
  className?: string;
}

/**
 * Props for reviews section component
 */
export interface ReviewsSectionProps {
  entityType: 'store' | 'provider';
  entityName: string;
  averageRating: number | null;
  reviewCount: number;
  googleMapsUrl: string | null;
}

/**
 * Schema.org AggregateRating structure
 */
export interface AggregateRatingSchema {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
  worstRating: string;
}
```

---

## 14. Testing Checklist

### 14.1 Functional Tests

```
FUNCTIONAL TESTING CHECKLIST
═══════════════════════════════════════════════════════════════════════════

RATING DISPLAY:
□ Inline variant renders correctly
□ Stacked variant renders correctly
□ Compact variant renders correctly
□ Detailed variant renders correctly
□ Star count matches rating value
□ Rating rounds to 1 decimal place
□ Review count formatted correctly
□ Zero rating handled gracefully
□ Null rating handled gracefully
□ Zero reviews handled gracefully

REVIEWS SECTION:
□ Section appears on Store Profile
□ Section appears on Provider Profile
□ "Read Reviews" opens Google Maps in new tab
□ "Write a Review" opens Google Maps in new tab
□ Fallback message shows when no Google URL
□ Section hidden when no data at all
□ Helper text displays correctly

GOOGLE URL HANDLING:
□ Valid Google Maps URLs accepted
□ Invalid URLs rejected
□ Null/empty URLs handled
□ Various Google URL formats work (goo.gl, maps.google.com, etc.)

CARD INTEGRATION:
□ Rating shows in Store Card (Full)
□ Rating shows in Store Card (Compact)
□ Rating shows in Provider Card (Full)
□ Rating shows in Provider Card (Compact)
□ Rating hidden when no data

═══════════════════════════════════════════════════════════════════════════
```

### 14.2 Accessibility Tests

```
ACCESSIBILITY TESTING CHECKLIST
═══════════════════════════════════════════════════════════════════════════

SCREEN READER:
□ Rating announced with full context
□ Stars not announced (decorative)
□ Buttons include "opens in new tab" context
□ Section has proper heading
□ Landmark region labeled

KEYBOARD:
□ All buttons focusable
□ Focus indicators visible
□ Tab order logical
□ Enter activates buttons

COLOR:
□ Text contrast meets 4.5:1
□ Focus indicator visible
□ Rating readable without color (number present)

═══════════════════════════════════════════════════════════════════════════
```

### 14.3 Schema Validation

```
SCHEMA TESTING CHECKLIST
═══════════════════════════════════════════════════════════════════════════

VALIDATION TOOLS:
□ Google Rich Results Test passes
□ Schema.org Validator passes
□ No errors in AggregateRating
□ Rating within valid range (1-5)

RICH SNIPPET PREVIEW:
□ Stars appear in Google preview
□ Review count appears
□ No warnings in Search Console

═══════════════════════════════════════════════════════════════════════════
```

---

## 15. Integration with Existing Specs

### 15.1 Updates to Existing Specs

```
SPEC UPDATES — CLARIFYING GOOGLE REVIEWS APPROACH
═══════════════════════════════════════════════════════════════════════════

SPEC 06 (Store Profile Page):
├── Section 10 (Customer Reviews): NOW REFERENCES THIS SPEC
├── Remove: Internal review display mockups
├── Add: Google Reviews integration per this spec
└── Schema: Use AggregateRating builder from this spec

SPEC 08 (Store Card Component):
├── Rating display: Use RatingDisplay component from this spec
├── Clarify: Rating not clickable on card (go to profile)
└── Variant: Use "inline" variant

SPEC 09 (Provider Card Component):
├── Rating display: Use RatingDisplay component from this spec
├── Same clarifications as Spec 08
└── Variant: Use "inline" variant

SPEC 11 (Provider Profile Page):
├── Section 12 (Customer Reviews): NOW REFERENCES THIS SPEC
├── Remove: Internal review display mockups
├── Add: Google Reviews integration per this spec
└── Schema: Use AggregateRating builder from this spec

═══════════════════════════════════════════════════════════════════════════
```

### 15.2 Cross-Reference Table

| Spec | Section | Update |
|------|---------|--------|
| **06** | Section 10 | Replace internal reviews with Google Reviews section |
| **06** | Schema | Use `buildAggregateRating()` helper |
| **08** | Rating display | Use `<RatingDisplay variant="inline" />` |
| **09** | Rating display | Use `<RatingDisplay variant="inline" />` |
| **11** | Section 12 | Replace internal reviews with Google Reviews section |
| **11** | Schema | Use `buildAggregateRating()` helper |

---

## 16. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial specification — Google Reviews integration |

---

## Appendix A: Quick Reference

```
REVIEW SYSTEM — QUICK REFERENCE
═══════════════════════════════════════════════════════════════════════════

STRATEGY: Link to Google Reviews (no internal storage)

DATABASE FIELDS:
├── average_rating    NUMERIC(3,2)    0.00-5.00
├── review_count      INTEGER         Total reviews
└── google_maps_url   VARCHAR(500)    Google Maps link

DISPLAY VARIANTS:
├── inline:   ⭐ 4.8 (127)           — Cards, search
├── stacked:  ⭐ 4.8 / 127 reviews   — Profile hero
├── compact:  ⭐ 4.8                 — Map popups
└── detailed: Stars + buttons        — Profile section

SCHEMA.ORG:
{
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
}

COMPONENTS:
├── RatingDisplay.tsx     — All rating variants
├── ReviewsSection.tsx    — Profile page section
└── aggregateRating.ts    — Schema builder

═══════════════════════════════════════════════════════════════════════════
```

---

**END OF SPECIFICATION**
