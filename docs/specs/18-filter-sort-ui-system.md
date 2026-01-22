# Filter & Sort UI System Specification

**Version:** 1.0 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED  
**Spec Number:** 18

---

## Executive Summary

The Filter & Sort UI System is a **unified component library** that provides consistent filtering and sorting capabilities across all listing pages in the UK Graded Appliances Directory. This specification defines reusable components, mobile patterns, accessibility requirements, and implementation details that connect Specs 07 (City Hub), 10 (Repair Category), 14 (Retail Category), and 15 (Brand Repair).

### Why This Spec Matters

| Problem | Solution |
|---------|----------|
| Filters defined per-page, not unified | Single component library |
| Inconsistent UX between retail/repair | Shared patterns, contextual config |
| No mobile specification | Complete bottom sheet pattern |
| Accessibility gaps | WCAG 2.1 AA compliance |
| SEO concerns with filter URLs | Canonical + noindex strategy |

### Strategic Importance

| Factor | Value |
|--------|-------|
| **UX Priority** | ⭐⭐⭐ Critical — Users expect filtering |
| **SEO Impact** | ⚠️ Careful — Must not create thin pages |
| **Mobile Traffic** | 70%+ — Mobile-first design essential |
| **Conversion** | High — Filters help users find matches |
| **AI Search** | Neutral — AI extracts from base pages |

### Scope

```
PAGES USING THIS FILTER SYSTEM
═══════════════════════════════════════════════════════════════

PRIMARY (Full Filter Implementation):
├── Retail Category Page (Spec 14)
│   └── /england/manchester/washing-machines/
├── Repair Category Page (Spec 10)
│   └── /england/manchester/washing-machine-repair/
└── Brand Repair Page (Spec 15)
    └── /england/manchester/bosch-repair/

SECONDARY (Basic Filter Implementation):
└── City Hub Page (Spec 07)
    └── /england/manchester/

NOT IN SCOPE:
├── National Hub Pages (aggregation only, no filters)
├── Entity Profile Pages (single item, no filters)
├── Search Results Page (separate search UI)
└── Guide Pages (content only)

═══════════════════════════════════════════════════════════════
```

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Filter State** | URL parameters | Shareable, bookmarkable, SEO-friendly |
| **Mobile Pattern** | Bottom sheet modal | Standard mobile UX, large touch targets |
| **Client/Server** | Hybrid (threshold: 50) | Balance speed vs. data freshness |
| **Indexability** | noindex all filtered URLs | Prevent thin content penalty |
| **Filter Counts** | Show counts per option | Help users avoid 0-result filters |
| **Debounce** | 300ms | Balance responsiveness vs. API load |

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Filter Architecture](#filter-architecture)
3. [URL State Management](#url-state-management)
4. [Component Specifications](#component-specifications)
5. [Mobile Implementation](#mobile-implementation)
6. [Accessibility](#accessibility)
7. [Performance Optimization](#performance-optimization)
8. [Implementation Code](#implementation-code)
9. [Integration Points](#integration-points)
10. [Testing Checklist](#testing-checklist)

---

## Filter Architecture

### 2.1 System Overview

```
FILTER SYSTEM ARCHITECTURE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                     URL PARAMETERS                          │
│  ?brand=bosch,samsung&grade=A-grade&delivery=free&sort=rating│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    useFilters() HOOK                        │
│  ├── parseFiltersFromURL()                                 │
│  ├── buildFilterURL()                                      │
│  ├── applyFilters()                                        │
│  └── clearFilters()                                        │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│   FILTER COMPONENTS     │     │   DATA LAYER            │
│   ├── FilterBar         │     │   ├── Client-side cache │
│   ├── FilterModal       │     │   │   (< 50 items)      │
│   ├── FilterDropdown    │     │   └── Server query      │
│   ├── FilterCheckbox    │     │       (≥ 50 items)      │
│   ├── FilterRange       │     └─────────────────────────┘
│   └── SortDropdown      │
└─────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    FILTERED RESULTS                         │
│  ├── StoreCard[] (Retail)                                  │
│  └── ProviderCard[] (Repair)                               │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### 2.2 Filter Configuration Types

```typescript
// types/filters.ts

/**
 * Base filter option type
 */
interface FilterOption {
  value: string;
  label: string;
  count?: number;        // Number of matching items
  disabled?: boolean;    // Disable if count = 0
  icon?: string;         // Optional emoji/icon
  description?: string;  // Tooltip text
}

/**
 * Filter types supported by the system
 */
type FilterType = 
  | 'multi-select'      // Multiple checkboxes in dropdown
  | 'single-select'     // Radio buttons or dropdown
  | 'checkbox-group'    // Inline checkboxes
  | 'range-slider'      // Dual-handle slider
  | 'toggle'            // Single on/off toggle
  | 'search-select';    // Searchable dropdown (brands)

/**
 * Complete filter definition
 */
interface FilterDefinition {
  id: string;                    // URL parameter key
  label: string;                 // Display label
  type: FilterType;
  options?: FilterOption[];      // For select types
  min?: number;                  // For range slider
  max?: number;                  // For range slider
  step?: number;                 // For range slider
  unit?: string;                 // For range (£, months)
  defaultValue?: string | string[] | number[];
  placeholder?: string;
  showCounts?: boolean;          // Show (N) after each option
  collapsible?: boolean;         // Can collapse on mobile
  priority?: 'high' | 'medium' | 'low';  // Display order
  mobileQuickFilter?: boolean;   // Show as chip above results
  // Database mapping
  dbField?: string;              // Direct field name
  dbOperator?: 'eq' | 'gte' | 'lte' | 'contains' | 'overlaps';
  dbJoinTable?: string;          // For junction table filters
}

/**
 * Sort option definition
 */
interface SortOption {
  value: string;                 // URL parameter value
  label: string;                 // Display label
  field: string;                 // Database field
  direction: 'asc' | 'desc';
  nullsFirst?: boolean;
}

/**
 * Complete filter configuration for a page type
 */
interface FilterConfig {
  pageType: 'retail_category' | 'repair_category' | 'brand_repair' | 'city_hub';
  entityType: 'store' | 'provider';
  filters: FilterDefinition[];
  sortOptions: SortOption[];
  defaultSort: string;
  quickFilters?: string[];       // Filter IDs for mobile chips
}
```

### 2.3 Store Filter Configuration (Retail)

```typescript
// config/filters/storeFilters.ts

import { FilterConfig } from '@/types/filters';

export const STORE_FILTER_CONFIG: FilterConfig = {
  pageType: 'retail_category',
  entityType: 'store',
  defaultSort: 'relevance',
  
  // Mobile quick filter chips
  quickFilters: ['free_delivery', 'zero_finance', 'warranty_12'],
  
  filters: [
    // ══════════════════════════════════════════════════════════
    // BRAND FILTER (Multi-select with search)
    // ══════════════════════════════════════════════════════════
    {
      id: 'brand',
      label: 'Brand',
      type: 'search-select',
      placeholder: 'Search brands...',
      showCounts: true,
      collapsible: true,
      priority: 'high',
      dbJoinTable: 'store_brands',
      // Options populated dynamically from brands table
      // Grouped by tier: Premium, Mid-range, Value
    },
    
    // ══════════════════════════════════════════════════════════
    // GRADE FILTER (Multi-select)
    // ══════════════════════════════════════════════════════════
    {
      id: 'grade',
      label: 'Grade',
      type: 'multi-select',
      showCounts: true,
      priority: 'high',
      dbField: 'grades_stocked',
      dbOperator: 'overlaps',
      options: [
        { 
          value: 'tatty-packaging', 
          label: 'Tatty Packaging', 
          icon: '📦',
          description: 'New with damaged packaging only (~20% off)'
        },
        { 
          value: 'A-grade', 
          label: 'A-Grade', 
          icon: '🅰️',
          description: 'Minor marks, essentially new (~30% off)'
        },
        { 
          value: 'B-grade', 
          label: 'B-Grade', 
          icon: '🅱️',
          description: 'Visible marks on front/sides (~45% off)'
        },
        { 
          value: 'C-grade', 
          label: 'C-Grade', 
          icon: '©️',
          description: 'More significant cosmetic damage (~60% off)'
        },
      ],
    },
    
    // ══════════════════════════════════════════════════════════
    // DELIVERY FILTERS (Checkbox group)
    // ══════════════════════════════════════════════════════════
    {
      id: 'delivery',
      label: 'Delivery',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'high',
      options: [
        { 
          value: 'offers_delivery', 
          label: 'Offers Delivery',
          icon: '🚚'
        },
        { 
          value: 'free_delivery', 
          label: 'Free Delivery',
          icon: '✓',
          // Maps to: offers_free_delivery = true
        },
        { 
          value: 'next_day', 
          label: 'Next Day',
          icon: '⚡',
          // Maps to: offers_next_day_delivery = true
        },
        { 
          value: 'same_day', 
          label: 'Same Day',
          icon: '🏃',
          // Maps to: offers_same_day_delivery = true
        },
      ],
    },
    
    // ══════════════════════════════════════════════════════════
    // FINANCE FILTERS (Checkbox group)
    // ══════════════════════════════════════════════════════════
    {
      id: 'finance',
      label: 'Finance',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'medium',
      options: [
        { 
          value: 'offers_finance', 
          label: 'Finance Available',
          icon: '💳'
        },
        { 
          value: 'zero_percent', 
          label: '0% Finance',
          icon: '✓',
          // Maps to: offers_zero_percent_finance = true
        },
        { 
          value: 'klarna', 
          label: 'Klarna',
          // Maps to: 'klarna' = ANY(finance_providers)
        },
        { 
          value: 'clearpay', 
          label: 'Clearpay',
          // Maps to: 'clearpay' = ANY(finance_providers)
        },
      ],
    },
    
    // ══════════════════════════════════════════════════════════
    // WARRANTY FILTER (Single select / Range)
    // ══════════════════════════════════════════════════════════
    {
      id: 'warranty',
      label: 'Warranty',
      type: 'single-select',
      showCounts: true,
      priority: 'medium',
      dbField: 'warranty_months',
      dbOperator: 'gte',
      options: [
        { value: '0', label: 'Any Warranty' },
        { value: '6', label: '6+ Months' },
        { value: '12', label: '12+ Months', icon: '⭐' },
        { value: '24', label: '24+ Months', icon: '⭐⭐' },
      ],
    },
    
    // ══════════════════════════════════════════════════════════
    // PRICE RANGE FILTER (Dual slider)
    // ══════════════════════════════════════════════════════════
    {
      id: 'price',
      label: 'Price Range',
      type: 'range-slider',
      min: 0,
      max: 2000,
      step: 50,
      unit: '£',
      priority: 'medium',
      collapsible: true,
      // Maps to: store_categories.price_min / price_max
    },
    
    // ══════════════════════════════════════════════════════════
    // SERVICES FILTERS (Checkbox group)
    // ══════════════════════════════════════════════════════════
    {
      id: 'services',
      label: 'Services',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'low',
      collapsible: true,
      options: [
        { 
          value: 'installation', 
          label: 'Installation',
          icon: '🔧',
          // Maps to: offers_installation = true
        },
        { 
          value: 'free_installation', 
          label: 'Free Installation',
          icon: '✓'
        },
        { 
          value: 'removal', 
          label: 'Old Appliance Removal',
          icon: '♻️',
          // Maps to: offers_old_appliance_removal = true
        },
        { 
          value: 'click_collect', 
          label: 'Click & Collect',
          icon: '📍',
          // Maps to: offers_click_collect = true
        },
        { 
          value: 'weee', 
          label: 'WEEE Recycling',
          icon: '♻️'
        },
      ],
    },
    
    // ══════════════════════════════════════════════════════════
    // TRUST FILTER (Checkbox)
    // ══════════════════════════════════════════════════════════
    {
      id: 'verified',
      label: 'Verified Only',
      type: 'toggle',
      priority: 'low',
      mobileQuickFilter: true,
      dbField: 'status',
      // Maps to: status = 'verified'
    },
  ],
  
  // ══════════════════════════════════════════════════════════
  // SORT OPTIONS
  // ══════════════════════════════════════════════════════════
  sortOptions: [
    {
      value: 'relevance',
      label: 'Relevance',
      field: 'overall_score',
      direction: 'desc',
    },
    {
      value: 'rating',
      label: 'Highest Rated',
      field: 'average_rating',
      direction: 'desc',
      nullsFirst: false,
    },
    {
      value: 'reviews',
      label: 'Most Reviewed',
      field: 'review_count',
      direction: 'desc',
    },
    {
      value: 'newest',
      label: 'Newest',
      field: 'created_at',
      direction: 'desc',
    },
  ],
};
```

### 2.4 Provider Filter Configuration (Repair)

```typescript
// config/filters/providerFilters.ts

import { FilterConfig } from '@/types/filters';

export const PROVIDER_FILTER_CONFIG: FilterConfig = {
  pageType: 'repair_category',
  entityType: 'provider',
  defaultSort: 'rating',
  
  // Mobile quick filter chips - URGENCY FOCUSED
  quickFilters: ['same_day', 'no_fix_no_fee', 'verified'],
  
  filters: [
    // ══════════════════════════════════════════════════════════
    // URGENCY FILTERS (Checkbox group) — TOP PRIORITY
    // ══════════════════════════════════════════════════════════
    {
      id: 'availability',
      label: 'Availability',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'high',
      options: [
        { 
          value: 'same_day', 
          label: '⚡ Same-Day',
          icon: '⚡',
          description: 'Available for same-day callout',
          // Maps to: offers_same_day = true
        },
        { 
          value: 'next_day', 
          label: 'Next-Day',
          icon: '📅',
          // Maps to: offers_next_day = true
        },
        { 
          value: 'emergency', 
          label: '🚨 Emergency/24-7',
          icon: '🚨',
          description: 'Out-of-hours emergency service',
          // Maps to: offers_emergency = true
        },
        { 
          value: 'weekend', 
          label: 'Weekend',
          icon: '📆',
          // Maps to: offers_weekend = true
        },
        { 
          value: 'evening', 
          label: 'Evening',
          icon: '🌙',
          // Maps to: offers_evening = true
        },
      ],
    },
    
    // ══════════════════════════════════════════════════════════
    // TRUST FILTERS (Checkbox group) — HIGH PRIORITY
    // ══════════════════════════════════════════════════════════
    {
      id: 'trust',
      label: 'Trust & Guarantees',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'high',
      options: [
        { 
          value: 'no_fix_no_fee', 
          label: '✓ No Fix No Fee',
          icon: '✓',
          description: 'Only pay if repair is successful',
          // Maps to: no_fix_no_fee = true
        },
        { 
          value: 'free_quotes', 
          label: 'Free Quotes',
          icon: '💬',
          // Maps to: free_quotes = true
        },
        { 
          value: 'verified', 
          label: '✓ Verified Engineer',
          icon: '✓',
          description: 'Verified by UK Graded Appliances',
          // Maps to: is_verified = true
        },
        { 
          value: 'insured', 
          label: 'Insured',
          icon: '🛡️',
          description: 'Public liability insurance',
          // Maps to: public_liability_insurance = true
        },
      ],
    },
    
    // ══════════════════════════════════════════════════════════
    // UK CERTIFICATIONS (Checkbox group) — CRITICAL FOR SAFETY
    // ══════════════════════════════════════════════════════════
    {
      id: 'certifications',
      label: 'Certifications',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'high',
      options: [
        { 
          value: 'gas_safe', 
          label: '🛡️ Gas Safe Registered',
          icon: '🛡️',
          description: 'Legally required for gas appliances',
          // Maps to: gas_safe_registered = true
          // Show prominently for: ovens, hobs, cookers, range cookers
        },
        { 
          value: 'fgas', 
          label: 'F-Gas Certified',
          icon: '❄️',
          description: 'Required for refrigeration work',
          // Maps to: fgas_certified = true
          // Show for: fridges, freezers, wine coolers
        },
        { 
          value: 'which_trusted', 
          label: 'Which? Trusted Trader',
          icon: '⭐',
          // Maps to: which_trusted_trader = true
        },
        { 
          value: 'checkatrade', 
          label: 'Checkatrade',
          icon: '✓',
          // Maps to: checkatrade_member = true
        },
        { 
          value: 'trustatrader', 
          label: 'Trustatrader',
          // Maps to: trustatrader_member = true
        },
      ],
    },
    
    // ══════════════════════════════════════════════════════════
    // BRAND AUTHORIZATION (Dropdown)
    // ══════════════════════════════════════════════════════════
    {
      id: 'brand',
      label: 'Brand Specialist',
      type: 'single-select',
      placeholder: 'All Brands',
      showCounts: true,
      priority: 'medium',
      dbJoinTable: 'provider_brand_authorisations',
      // Options populated dynamically from brands with ≥1 authorized provider
      // e.g., "Bosch Authorized (5)", "Samsung Authorized (3)"
    },
    
    // ══════════════════════════════════════════════════════════
    // WARRANTY ON REPAIRS (Single select)
    // ══════════════════════════════════════════════════════════
    {
      id: 'warranty',
      label: 'Repair Warranty',
      type: 'single-select',
      showCounts: true,
      priority: 'medium',
      dbField: 'warranty_on_repairs_months',
      dbOperator: 'gte',
      options: [
        { value: '0', label: 'Any Warranty' },
        { value: '3', label: '3+ Months' },
        { value: '6', label: '6+ Months', icon: '⭐' },
        { value: '12', label: '12+ Months', icon: '⭐⭐' },
      ],
    },
    
    // ══════════════════════════════════════════════════════════
    // CALLOUT FEE RANGE (Slider)
    // ══════════════════════════════════════════════════════════
    {
      id: 'callout',
      label: 'Max Callout Fee',
      type: 'range-slider',
      min: 0,
      max: 150,
      step: 10,
      unit: '£',
      priority: 'low',
      collapsible: true,
      dbField: 'callout_fee_from',
      dbOperator: 'lte',
    },
  ],
  
  // ══════════════════════════════════════════════════════════
  // SORT OPTIONS
  // ══════════════════════════════════════════════════════════
  sortOptions: [
    {
      value: 'rating',
      label: 'Top Rated',
      field: 'average_rating',
      direction: 'desc',
      nullsFirst: false,
    },
    {
      value: 'reviews',
      label: 'Most Reviews',
      field: 'review_count',
      direction: 'desc',
    },
    {
      value: 'callout_low',
      label: 'Lowest Callout Fee',
      field: 'callout_fee_from',
      direction: 'asc',
      nullsFirst: false,
    },
    {
      value: 'featured',
      label: 'Featured First',
      field: 'is_featured',
      direction: 'desc',
    },
  ],
};
```

### 2.5 City Hub Filter Configuration (Simplified)

```typescript
// config/filters/cityHubFilters.ts

import { FilterConfig } from '@/types/filters';

export const CITY_HUB_FILTER_CONFIG: FilterConfig = {
  pageType: 'city_hub',
  entityType: 'store', // Default to stores section
  defaultSort: 'rating',
  
  quickFilters: ['delivery', 'warranty_12', 'finance'],
  
  filters: [
    // ══════════════════════════════════════════════════════════
    // APPLIANCE CATEGORY (Dropdown)
    // ══════════════════════════════════════════════════════════
    {
      id: 'category',
      label: 'Appliance',
      type: 'single-select',
      placeholder: 'All Appliances',
      showCounts: true,
      priority: 'high',
      dbJoinTable: 'store_categories',
      // Options from appliance_categories, filtered by availability
    },
    
    // ══════════════════════════════════════════════════════════
    // BRAND (Dropdown)
    // ══════════════════════════════════════════════════════════
    {
      id: 'brand',
      label: 'Brand',
      type: 'single-select',
      placeholder: 'All Brands',
      showCounts: true,
      priority: 'high',
      dbJoinTable: 'store_brands',
    },
    
    // ══════════════════════════════════════════════════════════
    // FEATURES (Checkboxes - simplified)
    // ══════════════════════════════════════════════════════════
    {
      id: 'features',
      label: 'Features',
      type: 'checkbox-group',
      showCounts: false, // Simplified for city hub
      priority: 'medium',
      options: [
        { value: 'delivery', label: 'Delivery', icon: '🚚' },
        { value: 'warranty_12', label: 'Warranty 12m+', icon: '✓' },
        { value: 'finance', label: 'Finance', icon: '💳' },
      ],
    },
  ],
  
  sortOptions: [
    { value: 'rating', label: 'Rating', field: 'average_rating', direction: 'desc' },
    { value: 'newest', label: 'Newest', field: 'created_at', direction: 'desc' },
  ],
};
```

### 2.6 Filter Data Flow

```
FILTER DATA FLOW DIAGRAM
═══════════════════════════════════════════════════════════════

USER ACTION                    SYSTEM RESPONSE
───────────────────────────────────────────────────────────────

1. Page Load
   │
   ├── Parse URL params ──────► useFilters().parseFiltersFromURL()
   │                            │
   │                            ├── Validate params against config
   │                            ├── Set initial filter state
   │                            └── Trigger data fetch
   │
   └── Fetch filter counts ───► getFilterCounts() API
                                │
                                └── Returns: { filterId: { optionValue: count } }

2. User Selects Filter
   │
   ├── Update local state ────► setFilters({ ...filters, [id]: value })
   │
   ├── Debounce (300ms) ──────► Wait for more inputs
   │
   ├── Update URL ────────────► router.push(buildFilterURL(filters))
   │                            │
   │                            └── URL: ?brand=bosch&grade=A-grade
   │
   └── Fetch results ─────────► IF itemCount < 50: Client filter
                                ELSE: Server query with filters

3. Results Update
   │
   ├── Update result count ───► "Showing 8 of 15 stores"
   │
   ├── Update filter counts ──► Recalculate available counts
   │                            (e.g., "Bosch (5)" → "Bosch (2)")
   │
   └── Disable 0-count ───────► Gray out options with 0 results

4. Clear Filters
   │
   ├── Reset filter state ────► setFilters({})
   │
   ├── Update URL ────────────► router.push(baseURL)
   │
   └── Fetch all results ─────► Show unfiltered list

═══════════════════════════════════════════════════════════════
```

---

## URL State Management

### 3.1 URL Parameter Encoding

```
URL PARAMETER SPECIFICATION
═══════════════════════════════════════════════════════════════

BASE PATTERN:
/{country}/{city}/{category}/?{filters}&sort={sort}

EXAMPLES:
───────────────────────────────────────────────────────────────

Retail Category (Stores):
/england/manchester/washing-machines/?brand=bosch,samsung&grade=A-grade,B-grade&delivery=free&finance=0%25&warranty=12&sort=rating

Repair Category (Providers):
/england/manchester/washing-machine-repair/?availability=same_day&trust=no_fix_no_fee,verified&certifications=gas_safe&sort=rating

Brand Repair:
/england/manchester/bosch-repair/?availability=same_day&warranty=6&sort=reviews

City Hub:
/england/manchester/?category=washing-machines&brand=bosch&features=delivery,finance

ENCODING RULES:
───────────────────────────────────────────────────────────────

PARAMETER        FORMAT                    EXAMPLE
───────────────────────────────────────────────────────────────
Multi-value      Comma-separated          brand=bosch,samsung
Single value     Direct                   warranty=12
Boolean toggle   Presence = true          verified (no value)
Range values     Underscore separator     price=100_500
Sort             sort= prefix             sort=rating
Page             page= prefix             page=2

RESERVED CHARACTERS:
├── Commas (,) separate multi-values
├── Underscores (_) separate range bounds
├── URL encode special chars: % → %25, & → %26

═══════════════════════════════════════════════════════════════
```

### 3.2 Canonical & Indexing Strategy

```
SEO STRATEGY FOR FILTERED PAGES
═══════════════════════════════════════════════════════════════

PRINCIPLE: Filtered pages are for USER CONVENIENCE, not SEO.
           All filtered URLs must be noindex with canonical to base.

IMPLEMENTATION:
───────────────────────────────────────────────────────────────

// In page head (Next.js metadata)
export async function generateMetadata({ params, searchParams }) {
  const hasFilters = Object.keys(searchParams).length > 0;
  const baseUrl = `/${params.country}/${params.city}/${params.category}/`;
  
  return {
    // Always canonical to unfiltered base URL
    alternates: {
      canonical: baseUrl,
    },
    // noindex if ANY filters are applied
    robots: hasFilters 
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

HTML OUTPUT (filtered page):
───────────────────────────────────────────────────────────────

<head>
  <link rel="canonical" href="https://ukgradedappliances.com/england/manchester/washing-machines/" />
  <meta name="robots" content="noindex, follow" />
</head>

WHY THIS APPROACH:
───────────────────────────────────────────────────────────────

✅ Prevents thin content penalty (filter combos create sparse pages)
✅ Prevents duplicate content (100s of filter URLs)
✅ Preserves crawl budget for valuable pages
✅ Maintains link equity on base URLs
✅ Still allows users to share filtered URLs
✅ "follow" allows link discovery through filtered pages

═══════════════════════════════════════════════════════════════
```

### 3.3 URL Parsing & Building Utilities

```typescript
// lib/filters/urlUtils.ts

import { FilterState, FilterConfig } from '@/types/filters';

/**
 * Parse URL search params into filter state
 */
export function parseFiltersFromURL(
  searchParams: URLSearchParams,
  config: FilterConfig
): FilterState {
  const filters: FilterState = {};
  
  config.filters.forEach(filter => {
    const value = searchParams.get(filter.id);
    
    if (!value) return;
    
    switch (filter.type) {
      case 'multi-select':
      case 'checkbox-group':
        // Split comma-separated values
        filters[filter.id] = value.split(',').filter(Boolean);
        break;
        
      case 'range-slider':
        // Parse underscore-separated range
        const [min, max] = value.split('_').map(Number);
        filters[filter.id] = { min, max };
        break;
        
      case 'toggle':
        // Presence = true
        filters[filter.id] = true;
        break;
        
      default:
        // Single value
        filters[filter.id] = value;
    }
  });
  
  // Parse sort
  const sort = searchParams.get('sort');
  if (sort && config.sortOptions.find(s => s.value === sort)) {
    filters._sort = sort;
  }
  
  // Parse page
  const page = searchParams.get('page');
  if (page) {
    filters._page = parseInt(page, 10);
  }
  
  return filters;
}

/**
 * Build URL search params from filter state
 */
export function buildFilterURL(
  baseURL: string,
  filters: FilterState,
  config: FilterConfig
): string {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (key.startsWith('_')) {
      // Handle special keys
      if (key === '_sort' && value !== config.defaultSort) {
        params.set('sort', value as string);
      }
      if (key === '_page' && value > 1) {
        params.set('page', String(value));
      }
      return;
    }
    
    if (value === null || value === undefined) return;
    if (Array.isArray(value) && value.length === 0) return;
    
    const filter = config.filters.find(f => f.id === key);
    if (!filter) return;
    
    switch (filter.type) {
      case 'multi-select':
      case 'checkbox-group':
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(','));
        }
        break;
        
      case 'range-slider':
        if (typeof value === 'object' && 'min' in value) {
          params.set(key, `${value.min}_${value.max}`);
        }
        break;
        
      case 'toggle':
        if (value === true) {
          params.set(key, '1');
        }
        break;
        
      default:
        if (value) {
          params.set(key, String(value));
        }
    }
  });
  
  const queryString = params.toString();
  return queryString ? `${baseURL}?${queryString}` : baseURL;
}

/**
 * Check if any filters are active
 */
export function hasActiveFilters(filters: FilterState): boolean {
  return Object.entries(filters).some(([key, value]) => {
    if (key.startsWith('_')) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return true;
    return Boolean(value);
  });
}

/**
 * Get count of active filters
 */
export function getActiveFilterCount(filters: FilterState): number {
  return Object.entries(filters).reduce((count, [key, value]) => {
    if (key.startsWith('_')) return count;
    if (Array.isArray(value)) return count + value.length;
    if (typeof value === 'object') return count + 1;
    if (value) return count + 1;
    return count;
  }, 0);
}
```

---

## Component Specifications

### 4.1 Component Hierarchy

```
FILTER COMPONENT HIERARCHY
═══════════════════════════════════════════════════════════════

FilterSystem (context provider)
├── FilterBar (desktop) ─────────────────────────────────────┐
│   ├── FilterDropdown × N                                   │
│   │   └── FilterOption × N                                 │
│   ├── FilterCheckboxGroup × N                              │
│   │   └── FilterCheckbox × N                               │
│   ├── FilterRangeSlider × N                                │
│   ├── SortDropdown                                         │
│   │   └── SortOption × N                                   │
│   └── ClearFiltersButton                                   │
│                                                             │
├── FilterMobile (mobile) ───────────────────────────────────┤
│   ├── QuickFilterChips                                     │
│   │   └── FilterChip × N                                   │
│   ├── FilterTriggerButton                                  │
│   ├── SortTriggerButton                                    │
│   └── FilterModal (bottom sheet)                           │
│       ├── FilterModalHeader                                │
│       ├── FilterSections                                   │
│       │   └── FilterSection × N                            │
│       │       └── [FilterDropdown|CheckboxGroup|Slider]    │
│       └── FilterModalFooter                                │
│           ├── ClearFiltersButton                           │
│           └── ApplyFiltersButton                           │
│                                                             │
├── FilterResultsBar ────────────────────────────────────────┤
│   ├── ResultCount ("Showing 8 of 15 stores")               │
│   ├── ActiveFiltersTags                                    │
│   │   └── FilterTag × N (with remove button)               │
│   └── ClearAllButton                                       │
│                                                             │
└── EmptyFilterState ────────────────────────────────────────┘
    ├── EmptyMessage                                         
    ├── ClearFiltersButton                                   
    └── NearbyCitiesSuggestions                              

═══════════════════════════════════════════════════════════════
```

### 4.2 FilterBar (Desktop)

```
FILTER BAR — DESKTOP SPECIFICATION
═══════════════════════════════════════════════════════════════

VISUAL (Retail Category Example):
───────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  FILTER BY:                                                                 │
│                                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │ Brand      ▼ │ │ Grade      ▼ │ │ Delivery   ▼ │ │ Finance    ▼ │       │
│  │ 2 selected   │ │ All          │ │ 1 selected   │ │ All          │       │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                                             │
│  ┌──────────────┐ ┌──────────────────────────────────┐                     │
│  │ Warranty   ▼ │ │ Sort by: Highest Rated ▼        │     [Clear Filters] │
│  │ 12+ Months   │ └──────────────────────────────────┘                     │
│  └──────────────┘                                                           │
│                                                                             │
│  Showing 8 of 15 stores   [Bosch ×] [Samsung ×] [Free Delivery ×]          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

VISUAL (Repair Category Example):
───────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  FILTER BY:                                                                 │
│                                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │ ☑ Same-day │ │ ☐ No Fix    │ │ ☑ Gas Safe  │ │ Brand: All       ▼ │   │
│  │            │ │   No Fee    │ │              │ └─────────────────────┘   │
│  └─────────────┘ └─────────────┘ └─────────────┘                           │
│                                                                             │
│  ┌──────────────────────────────────────────┐                              │
│  │ Sort by: Top Rated ▼                     │            [Clear Filters]  │
│  └──────────────────────────────────────────┘                              │
│                                                                             │
│  Showing 5 of 12 engineers   [⚡ Same-day ×] [🛡️ Gas Safe ×]              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

LAYOUT RULES:
───────────────────────────────────────────────────────────────

CONTAINER:
├── Width:            100%
├── Background:       #FFFFFF
├── Border:           1px solid #E5E7EB (bottom only)
├── Padding:          16px 0 12px
├── Margin bottom:    24px

FILTER SECTION:
├── Display:          flex
├── Flex wrap:        wrap
├── Gap:              12px
├── Align items:      flex-start

LABEL "FILTER BY":
├── Font size:        12px
├── Font weight:      600
├── Color:            #6B7280 (gray-500)
├── Text transform:   uppercase
├── Letter spacing:   0.05em
├── Margin bottom:    12px
├── Full width

SORT SECTION:
├── Margin left:      auto (right-align)
├── Display:          flex
├── Align items:      center
├── Gap:              16px

CLEAR BUTTON:
├── Visibility:       Only show when filters active
├── Position:         Right side of sort section
├── Style:            Text button (no background)

═══════════════════════════════════════════════════════════════
```

### 4.3 FilterDropdown Component

```
FILTER DROPDOWN — SPECIFICATION
═══════════════════════════════════════════════════════════════

STATES:
───────────────────────────────────────────────────────────────

CLOSED (nothing selected):
┌──────────────────┐
│ Brand          ▼ │
│ All Brands       │
└──────────────────┘

CLOSED (with selection):
┌──────────────────┐
│ Brand          ▼ │
│ 2 selected       │
└──────────────────┘

OPEN (multi-select):
┌──────────────────┐
│ Brand          ▲ │
│ 2 selected       │
├──────────────────┤
│ ┌──────────────┐ │
│ │ Search...    │ │
│ └──────────────┘ │
├──────────────────┤
│ PREMIUM          │
│ ☑ Bosch (8)      │
│ ☑ Samsung (5)    │
│ ☐ LG (3)         │
│ ☐ Miele (2)      │
├──────────────────┤
│ MID-RANGE        │
│ ☐ Hotpoint (6)   │
│ ☐ Beko (4)       │
│ ☐ Indesit (3)    │
│ ...              │
├──────────────────┤
│ VALUE            │
│ ☐ Bush (1)       │
│ ☐ Logik (0) ░░░  │  ← Disabled (grayed)
├──────────────────┤
│ [Clear] [Apply]  │
└──────────────────┘

STYLING:
───────────────────────────────────────────────────────────────

TRIGGER BUTTON:
├── Min width:        140px
├── Height:           44px
├── Padding:          8px 12px
├── Background:       #FFFFFF
├── Border:           1px solid #D1D5DB (gray-300)
├── Border radius:    8px
├── Font size:        14px
├── Color:            #374151 (gray-700)
├── Cursor:           pointer

TRIGGER BUTTON (hover):
├── Border color:     #e85d4c (secondary)
├── Background:       #F9FAFB (gray-50)

TRIGGER BUTTON (active/has selection):
├── Border color:     #e85d4c (secondary)
├── Border width:     2px
├── Background:       #EFF6FF (blue-50)

DROPDOWN PANEL:
├── Position:         absolute
├── Top:              calc(100% + 4px)
├── Left:             0
├── Min width:        240px
├── Max width:        320px
├── Max height:       400px
├── Background:       #FFFFFF
├── Border:           1px solid #E5E7EB
├── Border radius:    8px
├── Box shadow:       0 10px 25px rgba(0,0,0,0.1)
├── Z-index:          50
├── Overflow:         auto

SECTION HEADER (tier grouping):
├── Font size:        11px
├── Font weight:      600
├── Color:            #9CA3AF (gray-400)
├── Text transform:   uppercase
├── Padding:          12px 16px 6px
├── Background:       #F9FAFB (gray-50)
├── Sticky:           top: 0

OPTION ROW:
├── Padding:          10px 16px
├── Font size:        14px
├── Color:            #374151
├── Cursor:           pointer
├── Display:          flex
├── Align items:      center
├── Gap:              10px

OPTION ROW (hover):
├── Background:       #F3F4F6 (gray-100)

OPTION ROW (disabled):
├── Color:            #D1D5DB (gray-300)
├── Cursor:           not-allowed
├── Opacity:          0.5

CHECKBOX:
├── Size:             18px × 18px
├── Border:           2px solid #D1D5DB
├── Border radius:    4px
├── Checked bg:       #e85d4c (secondary)
├── Checkmark:        white, 2px stroke

COUNT BADGE:
├── Font size:        12px
├── Color:            #6B7280 (gray-500)
├── Margin left:      auto

FOOTER:
├── Border top:       1px solid #E5E7EB
├── Padding:          12px 16px
├── Display:          flex
├── Justify:          space-between
├── Position:         sticky
├── Bottom:           0
├── Background:       #FFFFFF

═══════════════════════════════════════════════════════════════
```

### 4.4 FilterCheckboxGroup Component

```
CHECKBOX GROUP — SPECIFICATION
═══════════════════════════════════════════════════════════════

VISUAL (Inline):
───────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│  ☑ ⚡ Same-day    ☐ 📅 Next-day    ☑ 🚨 Emergency          │
│  ☐ 📆 Weekend     ☐ 🌙 Evening                              │
└─────────────────────────────────────────────────────────────┘

VISUAL (Stacked in dropdown):
───────────────────────────────────────────────────────────────

┌────────────────────────────────────┐
│ AVAILABILITY                       │
├────────────────────────────────────┤
│ ☑ ⚡ Same-day Available       (5) │
│ ☐ 📅 Next-day Available       (8) │
│ ☑ 🚨 Emergency / 24-7         (2) │
│ ☐ 📆 Weekend Available        (7) │
│ ☐ 🌙 Evening Appointments     (4) │
└────────────────────────────────────┘

STYLING (Inline variant):
───────────────────────────────────────────────────────────────

CONTAINER:
├── Display:          flex
├── Flex wrap:        wrap
├── Gap:              8px 16px
├── Padding:          8px 0

CHECKBOX ITEM:
├── Display:          flex
├── Align items:      center
├── Gap:              6px
├── Padding:          6px 12px
├── Background:       #F9FAFB (gray-50)
├── Border:           1px solid #E5E7EB
├── Border radius:    6px
├── Cursor:           pointer
├── Transition:       all 150ms

CHECKBOX ITEM (hover):
├── Background:       #EFF6FF (blue-50)
├── Border color:     #BFDBFE (blue-200)

CHECKBOX ITEM (checked):
├── Background:       #e85d4c (secondary)
├── Border color:     #e85d4c
├── Color:            #FFFFFF

CHECKBOX INPUT:
├── Width:            16px
├── Height:           16px
├── Accent color:     #e85d4c

LABEL:
├── Font size:        14px
├── Font weight:      500
├── White space:      nowrap
├── User select:      none

ICON:
├── Font size:        14px
├── Margin right:     2px

═══════════════════════════════════════════════════════════════
```

### 4.5 FilterRangeSlider Component

```
RANGE SLIDER — SPECIFICATION
═══════════════════════════════════════════════════════════════

VISUAL:
───────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────┐
│  Price Range                                   │
│                                                │
│  ┌───────┐                      ┌───────┐     │
│  │ £100  │                      │ £500  │     │
│  └───────┘                      └───────┘     │
│                                                │
│       ●━━━━━━━━━━━━━━━━━━━━●                  │
│      100                   500                 │
│  ────────────────────────────────────────     │
│  £0                                 £2,000    │
│                                                │
└────────────────────────────────────────────────┘

STYLING:
───────────────────────────────────────────────────────────────

CONTAINER:
├── Padding:          16px
├── Background:       #FFFFFF

LABEL:
├── Font size:        14px
├── Font weight:      600
├── Color:            #374151
├── Margin bottom:    12px

INPUT BOXES:
├── Width:            80px
├── Height:           36px
├── Border:           1px solid #D1D5DB
├── Border radius:    6px
├── Text align:       center
├── Font size:        14px
├── Color:            #374151

INPUT BOX (focus):
├── Border color:     #e85d4c
├── Outline:          none

SLIDER TRACK:
├── Height:           6px
├── Background:       #E5E7EB (gray-200)
├── Border radius:    3px
├── Margin:           20px 0

SLIDER RANGE (selected):
├── Background:       #e85d4c (secondary)

SLIDER THUMB:
├── Width:            20px
├── Height:           20px
├── Background:       #FFFFFF
├── Border:           2px solid #e85d4c
├── Border radius:    50%
├── Box shadow:       0 2px 4px rgba(0,0,0,0.1)
├── Cursor:           grab

SLIDER THUMB (active):
├── Cursor:           grabbing
├── Box shadow:       0 4px 8px rgba(0,0,0,0.15)

MIN/MAX LABELS:
├── Font size:        12px
├── Color:            #9CA3AF (gray-400)
├── Display:          flex
├── Justify:          space-between

═══════════════════════════════════════════════════════════════
```

### 4.6 SortDropdown Component

```
SORT DROPDOWN — SPECIFICATION
═══════════════════════════════════════════════════════════════

VISUAL:
───────────────────────────────────────────────────────────────

CLOSED:
┌──────────────────────────────────┐
│ Sort by: Highest Rated ▼        │
└──────────────────────────────────┘

OPEN:
┌──────────────────────────────────┐
│ Sort by: Highest Rated ▲        │
├──────────────────────────────────┤
│ ○ Relevance                      │
│ ● Highest Rated           ✓     │
│ ○ Most Reviews                   │
│ ○ Newest                         │
└──────────────────────────────────┘

STYLING:
───────────────────────────────────────────────────────────────

TRIGGER:
├── Display:          inline-flex
├── Align items:      center
├── Gap:              8px
├── Padding:          8px 14px
├── Background:       transparent
├── Border:           1px solid #D1D5DB
├── Border radius:    8px
├── Font size:        14px
├── Color:            #374151
├── Cursor:           pointer

TRIGGER (hover):
├── Background:       #F9FAFB
├── Border color:     #e85d4c

TRIGGER LABEL:
├── Font size:        13px
├── Color:            #6B7280
├── Font weight:      500

TRIGGER VALUE:
├── Font weight:      600
├── Color:            #e85d4c

DROPDOWN:
├── Position:         absolute
├── Top:              calc(100% + 4px)
├── Right:            0
├── Min width:        200px
├── Background:       #FFFFFF
├── Border:           1px solid #E5E7EB
├── Border radius:    8px
├── Box shadow:       0 10px 25px rgba(0,0,0,0.1)
├── Z-index:          50

OPTION:
├── Padding:          12px 16px
├── Font size:        14px
├── Color:            #374151
├── Cursor:           pointer
├── Display:          flex
├── Justify:          space-between
├── Align items:      center

OPTION (hover):
├── Background:       #F3F4F6

OPTION (selected):
├── Color:            #e85d4c
├── Font weight:      600
├── Background:       #EFF6FF

CHECKMARK:
├── Color:            #e85d4c
├── Font size:        16px

═══════════════════════════════════════════════════════════════
```

### 4.7 FilterResultsBar Component

```
FILTER RESULTS BAR — SPECIFICATION
═══════════════════════════════════════════════════════════════

VISUAL:
───────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Showing 8 of 15 stores                                                     │
│                                                                             │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────────┐ ┌─────────────┐ │
│  │ Bosch       × │ │ Samsung     × │ │ Free Delivery   × │ │ Clear All × │ │
│  └───────────────┘ └───────────────┘ └───────────────────┘ └─────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

STYLING:
───────────────────────────────────────────────────────────────

CONTAINER:
├── Padding:          12px 0
├── Display:          flex
├── Flex wrap:        wrap
├── Align items:      center
├── Gap:              8px 12px
├── Border bottom:    1px solid #E5E7EB
├── Margin bottom:    16px

RESULT COUNT:
├── Font size:        14px
├── Color:            #6B7280
├── Flex shrink:      0
├── Margin right:     8px

RESULT COUNT NUMBER:
├── Font weight:      600
├── Color:            #e85d4c

FILTER TAG:
├── Display:          inline-flex
├── Align items:      center
├── Gap:              6px
├── Padding:          4px 8px 4px 10px
├── Background:       #EFF6FF (blue-50)
├── Border:           1px solid #BFDBFE (blue-200)
├── Border radius:    16px
├── Font size:        13px
├── Color:            #1E40AF (blue-800)

FILTER TAG REMOVE:
├── Width:            18px
├── Height:           18px
├── Background:       transparent
├── Border:           none
├── Border radius:    50%
├── Font size:        14px
├── Color:            #6B7280
├── Cursor:           pointer
├── Display:          flex
├── Align items:      center
├── Justify:          center

FILTER TAG REMOVE (hover):
├── Background:       #DBEAFE (blue-100)
├── Color:            #1E40AF

CLEAR ALL BUTTON:
├── Padding:          4px 12px
├── Background:       transparent
├── Border:           1px solid #EF4444 (red-500)
├── Border radius:    16px
├── Font size:        13px
├── Color:            #EF4444
├── Cursor:           pointer
├── Margin left:      auto

CLEAR ALL (hover):
├── Background:       #FEF2F2 (red-50)

═══════════════════════════════════════════════════════════════
```

### 4.8 EmptyFilterState Component

```
EMPTY FILTER STATE — SPECIFICATION
═══════════════════════════════════════════════════════════════

VISUAL:
───────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                         🔍                                  │
│                                                             │
│          No stores match your current filters               │
│                                                             │
│    Your search for Bosch washing machines with free         │
│    delivery in Manchester returned no results.              │
│                                                             │
│    ┌────────────────────────────────────────────────────┐  │
│    │              Clear All Filters                     │  │
│    └────────────────────────────────────────────────────┘  │
│                                                             │
│    ─────────────────── OR ───────────────────              │
│                                                             │
│    Try nearby cities with matching stores:                 │
│                                                             │
│    ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │
│    │ Birmingham    │ │ Liverpool     │ │ Leeds         │  │
│    │ 3 stores      │ │ 2 stores      │ │ 2 stores      │  │
│    │ [View →]      │ │ [View →]      │ │ [View →]      │  │
│    └───────────────┘ └───────────────┘ └───────────────┘  │
│                                                             │
│    ─────────────────────────────────────────────────────   │
│                                                             │
│    Browse all 15 stores in Manchester →                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

STYLING:
───────────────────────────────────────────────────────────────

CONTAINER:
├── Padding:          48px 24px
├── Text align:       center
├── Background:       #F9FAFB (gray-50)
├── Border:           1px dashed #D1D5DB
├── Border radius:    12px
├── Margin:           24px 0

ICON:
├── Font size:        48px
├── Margin bottom:    16px
├── Opacity:          0.5

HEADING:
├── Font size:        20px
├── Font weight:      600
├── Color:            #374151
├── Margin bottom:    8px

DESCRIPTION:
├── Font size:        14px
├── Color:            #6B7280
├── Max width:        400px
├── Margin:           0 auto 24px

CLEAR BUTTON:
├── Padding:          12px 32px
├── Background:       #e85d4c (secondary)
├── Color:            #FFFFFF
├── Border:           none
├── Border radius:    8px
├── Font size:        16px
├── Font weight:      600
├── Cursor:           pointer

CLEAR BUTTON (hover):
├── Background:       #d94f3f (darker secondary)

DIVIDER:
├── Display:          flex
├── Align items:      center
├── Gap:              16px
├── Margin:           32px 0
├── Color:            #9CA3AF

DIVIDER LINE:
├── Flex:             1
├── Height:           1px
├── Background:       #E5E7EB

NEARBY SECTION HEADING:
├── Font size:        14px
├── Color:            #6B7280
├── Margin bottom:    16px

NEARBY CITY CARD:
├── Padding:          16px
├── Background:       #FFFFFF
├── Border:           1px solid #E5E7EB
├── Border radius:    8px
├── Text align:       left
├── Cursor:           pointer

NEARBY CITY CARD (hover):
├── Border color:     #e85d4c
├── Background:       #EFF6FF

BROWSE ALL LINK:
├── Font size:        14px
├── Color:            #e85d4c
├── Text decoration:  underline
├── Margin top:       24px

═══════════════════════════════════════════════════════════════
```
```


---

## Mobile Implementation

### 5.1 Mobile Filter Strategy

```
MOBILE FILTER STRATEGY
═══════════════════════════════════════════════════════════════

KEY PRINCIPLES:
───────────────────────────────────────────────────────────────

1. THUMB-FRIENDLY
   - All touch targets ≥ 48px
   - Actions at bottom of screen (thumb zone)
   - Swipe gestures for common actions

2. PROGRESSIVE DISCLOSURE
   - Quick filter chips visible immediately
   - Full filters in bottom sheet (on demand)
   - Most-used filters first

3. NON-BLOCKING
   - Filters don't cover results until requested
   - Quick chips allow one-tap filtering
   - Apply button confirms full filter changes

4. CONTEXTUAL
   - Repair pages: Urgency filters prominent
   - Retail pages: Price/grade filters prominent
   - Show active filter count on trigger button

═══════════════════════════════════════════════════════════════
```

### 5.2 Mobile Layout Structure

```
MOBILE LAYOUT — VISUAL SPECIFICATION
═══════════════════════════════════════════════════════════════

VIEWPORT (iPhone 14 Pro - 393px):
───────────────────────────────────────────────────────────────

┌─────────────────────────────────────────┐
│ [Header - Spec 01]                      │
├─────────────────────────────────────────┤
│ [Breadcrumb]                            │
├─────────────────────────────────────────┤
│                                         │
│  Graded Washing Machines                │
│  in Manchester                          │
│                                         │
│  15 stores found                        │
│                                         │
├─────────────────────────────────────────┤
│ QUICK FILTERS (horizontal scroll)       │
│                                         │
│ ┌───────────┐ ┌───────────┐ ┌────────┐ │
│ │⚡Same-day │ │ Free Del. │ │ 0% Fin │▶│
│ └───────────┘ └───────────┘ └────────┘ │
│                                         │
├─────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ │
│ │ 🎛️ Filters (2)  │ │ Sort: Rating ▼ │ │
│ └─────────────────┘ └─────────────────┘ │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  [StoreCard 1]                          │
│                                         │
│  [StoreCard 2]                          │
│                                         │
│  [StoreCard 3]                          │
│                                         │
│  ...                                    │
│                                         │
├─────────────────────────────────────────┤
│ [Load More / Pagination]                │
├─────────────────────────────────────────┤
│ [Footer - Spec 05]                      │
└─────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### 5.3 Quick Filter Chips

```
QUICK FILTER CHIPS — SPECIFICATION
═══════════════════════════════════════════════════════════════

VISUAL:
───────────────────────────────────────────────────────────────

Default state (not active):
┌───────────────┐
│ ⚡ Same-day   │
└───────────────┘

Active state:
┌───────────────┐
│ ⚡ Same-day ✓ │  (Secondary background)
└───────────────┘

LAYOUT:
───────────────────────────────────────────────────────────────

CONTAINER:
├── Display:          flex
├── Overflow-x:       auto
├── Gap:              8px
├── Padding:          12px 16px
├── Scroll snap:      x mandatory
├── -webkit-overflow-scrolling: touch
├── scrollbar-width:  none (hide scrollbar)

CHIP:
├── Display:          inline-flex
├── Align items:      center
├── Gap:              6px
├── Padding:          10px 14px
├── Background:       #FFFFFF
├── Border:           1px solid #D1D5DB
├── Border radius:    20px
├── Font size:        14px
├── Font weight:      500
├── Color:            #374151
├── White space:      nowrap
├── Flex shrink:      0
├── Scroll snap:      start
├── Min height:       44px (touch target)

CHIP (active):
├── Background:       #e85d4c (secondary)
├── Border color:     #e85d4c
├── Color:            #FFFFFF

CHIP (pressed):
├── Transform:        scale(0.95)
├── Transition:       transform 100ms

ICON:
├── Font size:        14px

RETAIL PAGE CHIPS (order):
1. Free Delivery
2. 0% Finance
3. 12m+ Warranty
4. Same-Day Delivery
5. Verified

REPAIR PAGE CHIPS (order):
1. ⚡ Same-Day
2. ✓ No Fix No Fee
3. ✓ Verified
4. 🛡️ Gas Safe
5. Weekend

═══════════════════════════════════════════════════════════════
```

### 5.4 Filter/Sort Trigger Buttons

```
FILTER & SORT TRIGGERS — MOBILE SPECIFICATION
═══════════════════════════════════════════════════════════════

VISUAL:
───────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ 🎛️ Filters (2)      │  │ Sort: Rating ▼     │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

LAYOUT:
───────────────────────────────────────────────────────────────

CONTAINER:
├── Display:          flex
├── Gap:              8px
├── Padding:          8px 16px 16px
├── Background:       #FFFFFF
├── Border bottom:    1px solid #E5E7EB
├── Position:         sticky (optional)
├── Top:              0
├── Z-index:          40

FILTER BUTTON:
├── Flex:             1
├── Display:          flex
├── Align items:      center
├── Justify:          center
├── Gap:              8px
├── Height:           48px
├── Background:       #FFFFFF
├── Border:           1px solid #D1D5DB
├── Border radius:    8px
├── Font size:        14px
├── Font weight:      500
├── Color:            #374151

FILTER BUTTON (has active):
├── Border color:     #e85d4c
├── Border width:     2px
├── Background:       #EFF6FF

BADGE:
├── Min width:        20px
├── Height:           20px
├── Background:       #EF4444 (red)
├── Border radius:    10px
├── Font size:        12px
├── Font weight:      600
├── Color:            #FFFFFF
├── Text align:       center
├── Line height:      20px

SORT BUTTON:
├── Flex:             1
├── Display:          flex
├── Align items:      center
├── Justify:          center
├── Gap:              8px
├── Height:           48px
├── Background:       #FFFFFF
├── Border:           1px solid #D1D5DB
├── Border radius:    8px
├── Font size:        14px
├── Color:            #374151

SORT BUTTON LABEL:
├── Color:            #6B7280

SORT BUTTON VALUE:
├── Font weight:      600
├── Color:            #e85d4c

═══════════════════════════════════════════════════════════════
```

### 5.5 Filter Bottom Sheet Modal

```
FILTER BOTTOM SHEET — SPECIFICATION
═══════════════════════════════════════════════════════════════

VISUAL:
───────────────────────────────────────────────────────────────

┌─────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  ← Overlay (dark)
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
├─────────────────────────────────────────┤
│             ═══════════                 │  ← Drag handle
│                                         │
│  Filters                    [✕ Close]  │  ← Header
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ▼ Brand                               │  ← Expandable section
│  ────────────────────────────────────  │
│  ☑ Bosch    ☐ Samsung    ☐ LG         │
│  ☐ Hotpoint ☐ Miele      ☐ AEG        │
│  [Show 15 more brands]                 │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ▼ Grade                               │
│  ────────────────────────────────────  │
│  ☑ A-Grade     ☐ B-Grade              │
│  ☐ C-Grade     ☐ Tatty Packaging      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ▼ Delivery                            │
│  ────────────────────────────────────  │
│  ☑ Free Delivery    ☐ Next Day        │
│  ☐ Same Day                            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ▶ Finance                    [+]      │  ← Collapsed
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ▶ Price Range               [+]      │  ← Collapsed
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │ Clear All   │  │ Show 8 results  │  │  ← Sticky footer
│  └─────────────┘  └─────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

LAYOUT:
───────────────────────────────────────────────────────────────

OVERLAY:
├── Position:         fixed
├── Inset:            0
├── Background:       rgba(0, 0, 0, 0.5)
├── Z-index:          100
├── Backdrop filter:  blur(4px)

SHEET:
├── Position:         fixed
├── Bottom:           0
├── Left:             0
├── Right:            0
├── Max height:       90vh
├── Background:       #FFFFFF
├── Border radius:    16px 16px 0 0
├── Z-index:          101
├── Display:          flex
├── Flex direction:   column
├── Animation:        slide-up 300ms ease-out

DRAG HANDLE:
├── Width:            36px
├── Height:           4px
├── Background:       #D1D5DB
├── Border radius:    2px
├── Margin:           12px auto

HEADER:
├── Display:          flex
├── Justify:          space-between
├── Align items:      center
├── Padding:          0 16px 16px
├── Border bottom:    1px solid #E5E7EB

HEADER TITLE:
├── Font size:        18px
├── Font weight:      600
├── Color:            #111827

CLOSE BUTTON:
├── Width:            40px
├── Height:           40px
├── Background:       transparent
├── Border:           none
├── Font size:        20px
├── Color:            #6B7280

CONTENT:
├── Flex:             1
├── Overflow-y:       auto
├── Padding:          0 16px
├── -webkit-overflow-scrolling: touch

SECTION:
├── Border bottom:    1px solid #E5E7EB
├── Padding:          16px 0

SECTION HEADER:
├── Display:          flex
├── Justify:          space-between
├── Align items:      center
├── Cursor:           pointer
├── Padding:          8px 0

SECTION TITLE:
├── Font size:        16px
├── Font weight:      600
├── Color:            #374151

SECTION TOGGLE:
├── Font size:        20px
├── Color:            #6B7280
├── Transform:        rotate(0deg) / rotate(180deg)
├── Transition:       transform 200ms

SECTION CONTENT:
├── Padding top:      12px
├── Display:          grid
├── Grid columns:     repeat(2, 1fr)
├── Gap:              8px

FOOTER:
├── Position:         sticky
├── Bottom:           0
├── Display:          flex
├── Gap:              12px
├── Padding:          16px
├── Background:       #FFFFFF
├── Border top:       1px solid #E5E7EB
├── Padding bottom:   max(16px, env(safe-area-inset-bottom))

CLEAR BUTTON:
├── Flex:             1
├── Height:           48px
├── Background:       #FFFFFF
├── Border:           1px solid #D1D5DB
├── Border radius:    8px
├── Font size:        16px
├── Font weight:      500
├── Color:            #374151

APPLY BUTTON:
├── Flex:             2
├── Height:           48px
├── Background:       #e85d4c (secondary)
├── Border:           none
├── Border radius:    8px
├── Font size:        16px
├── Font weight:      600
├── Color:            #FFFFFF

APPLY BUTTON (disabled):
├── Background:       #D1D5DB
├── Cursor:           not-allowed

═══════════════════════════════════════════════════════════════
```

### 5.6 Sort Bottom Sheet

```
SORT BOTTOM SHEET — SPECIFICATION
═══════════════════════════════════════════════════════════════

VISUAL:
───────────────────────────────────────────────────────────────

┌─────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
├─────────────────────────────────────────┤
│             ═══════════                 │
│                                         │
│  Sort By                                │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ○  Relevance                    │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ●  Highest Rated            ✓  │   │  ← Selected
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ○  Most Reviewed                │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ○  Newest                       │   │
│  └─────────────────────────────────┘   │
│                                         │
│  (padding for safe area)               │
│                                         │
└─────────────────────────────────────────┘

STYLING:
───────────────────────────────────────────────────────────────

SHEET:
├── Max height:       50vh
├── Padding bottom:   env(safe-area-inset-bottom)

OPTION ROW:
├── Display:          flex
├── Align items:      center
├── Padding:          16px
├── Margin:           0 16px 8px
├── Background:       #F9FAFB
├── Border radius:    8px
├── Cursor:           pointer
├── Min height:       56px

OPTION ROW (selected):
├── Background:       #EFF6FF
├── Border:           2px solid #e85d4c

RADIO:
├── Width:            20px
├── Height:           20px
├── Border:           2px solid #D1D5DB
├── Border radius:    50%
├── Margin right:     12px

RADIO (selected):
├── Border color:     #e85d4c
├── Background:       #e85d4c (with inner white dot)

LABEL:
├── Font size:        16px
├── Color:            #374151

CHECKMARK:
├── Margin left:      auto
├── Color:            #e85d4c
├── Font size:        20px

═══════════════════════════════════════════════════════════════
```

### 5.7 Gesture Interactions

```
GESTURE INTERACTIONS — SPECIFICATION
═══════════════════════════════════════════════════════════════

BOTTOM SHEET GESTURES:
───────────────────────────────────────────────────────────────

SWIPE DOWN TO CLOSE:
├── Trigger:          Drag handle or sheet header
├── Threshold:        Swipe > 100px down
├── Animation:        Sheet slides down, overlay fades
├── Velocity:         If fast swipe, close immediately

SWIPE UP TO EXPAND:
├── Trigger:          Any part of sheet content
├── Threshold:        Swipe > 50px up when not at max
├── Animation:        Sheet expands to max-height

TAP OVERLAY TO CLOSE:
├── Trigger:          Tap on dark overlay
├── Animation:        Sheet slides down, overlay fades

QUICK FILTER CHIP GESTURES:
───────────────────────────────────────────────────────────────

TAP TO TOGGLE:
├── Trigger:          Tap on chip
├── Feedback:         Haptic (light impact)
├── Animation:        Scale down briefly (0.95)
├── Duration:         100ms

HORIZONTAL SCROLL:
├── Trigger:          Swipe left/right on chips area
├── Scroll snap:      Snap to chip start positions
├── Momentum:         iOS-style momentum scrolling
├── Indicator:        Fade gradient on edges (optional)

IMPLEMENTATION:
───────────────────────────────────────────────────────────────

// Framer Motion for bottom sheet
import { motion, useDragControls, PanInfo } from 'framer-motion';

function FilterSheet({ isOpen, onClose }) {
  const handleDragEnd = (event: MouseEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? 0 : '100%' }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      drag="y"
      dragConstraints={{ top: 0 }}
      dragElastic={{ top: 0, bottom: 0.5 }}
      onDragEnd={handleDragEnd}
      className="filter-sheet"
    >
      {/* Sheet content */}
    </motion.div>
  );
}

═══════════════════════════════════════════════════════════════
```

---

## Accessibility

### 6.1 WCAG 2.1 AA Compliance

```
ACCESSIBILITY REQUIREMENTS
═══════════════════════════════════════════════════════════════

LEVEL AA REQUIREMENTS:
───────────────────────────────────────────────────────────────

1. PERCEIVABLE
   ├── 1.4.3 Contrast (Minimum): 4.5:1 for text
   ├── 1.4.4 Resize text: Up to 200% without loss
   └── 1.4.11 Non-text Contrast: 3:1 for UI components

2. OPERABLE
   ├── 2.1.1 Keyboard: All functionality via keyboard
   ├── 2.1.2 No Keyboard Trap: User can navigate away
   ├── 2.4.3 Focus Order: Logical focus sequence
   └── 2.4.7 Focus Visible: Clear focus indicator

3. UNDERSTANDABLE
   ├── 3.2.1 On Focus: No unexpected context changes
   └── 3.2.2 On Input: No unexpected changes without warning

4. ROBUST
   ├── 4.1.1 Parsing: Valid HTML
   └── 4.1.2 Name, Role, Value: Correct ARIA usage

═══════════════════════════════════════════════════════════════
```

### 6.2 Keyboard Navigation

```
KEYBOARD NAVIGATION — SPECIFICATION
═══════════════════════════════════════════════════════════════

FILTER BAR NAVIGATION:
───────────────────────────────────────────────────────────────

TAB ORDER:
1. First filter dropdown
2. Second filter dropdown
3. ... (all filter controls)
4. Sort dropdown
5. Clear filters button (if visible)

WITHIN DROPDOWN:
├── Tab:          Move to next/prev dropdown
├── Enter/Space:  Open dropdown
├── Arrow Down:   Open dropdown / move to next option
├── Arrow Up:     Move to previous option
├── Home:         Move to first option
├── End:          Move to last option
├── Escape:       Close dropdown, return focus to trigger
├── Enter/Space:  Toggle option selection (multi-select)
├── Type chars:   Jump to matching option

WITHIN CHECKBOX GROUP:
├── Tab:          Move to next group
├── Arrow Right:  Move to next checkbox
├── Arrow Left:   Move to previous checkbox
├── Space:        Toggle checkbox
├── Tab out:      Apply filter changes

RANGE SLIDER:
├── Tab:          Focus min handle, then max handle
├── Arrow Left:   Decrease value by step
├── Arrow Right:  Increase value by step
├── Page Down:    Decrease value by large step
├── Page Up:      Increase value by large step
├── Home:         Set to minimum
├── End:          Set to maximum

MOBILE BOTTOM SHEET:
───────────────────────────────────────────────────────────────

TAB ORDER (when open):
1. Close button
2. First filter section
3. ... (all sections)
4. Clear button
5. Apply button

TRAP FOCUS:
├── Focus stays within modal when open
├── Tab wraps from last to first element
├── Shift+Tab wraps from first to last
├── Escape closes modal

═══════════════════════════════════════════════════════════════
```

### 6.3 ARIA Attributes

```
ARIA IMPLEMENTATION — SPECIFICATION
═══════════════════════════════════════════════════════════════

FILTER DROPDOWN:
───────────────────────────────────────────────────────────────

<div class="filter-dropdown">
  <button
    id="brand-filter-trigger"
    aria-haspopup="listbox"
    aria-expanded="false"                    <!-- true when open -->
    aria-controls="brand-filter-listbox"
    aria-label="Filter by brand, 2 selected"  <!-- dynamic -->
  >
    Brand ▼
  </button>
  
  <div
    id="brand-filter-listbox"
    role="listbox"
    aria-labelledby="brand-filter-trigger"
    aria-multiselectable="true"
    hidden                                    <!-- removed when open -->
  >
    <div role="group" aria-label="Premium brands">
      <div
        role="option"
        id="brand-bosch"
        aria-selected="true"
        aria-label="Bosch, 8 stores available"
      >
        ☑ Bosch (8)
      </div>
      <div
        role="option"
        id="brand-samsung"
        aria-selected="true"
        aria-label="Samsung, 5 stores available"
      >
        ☑ Samsung (5)
      </div>
      <!-- ... -->
    </div>
  </div>
</div>

CHECKBOX GROUP:
───────────────────────────────────────────────────────────────

<fieldset role="group" aria-labelledby="delivery-label">
  <legend id="delivery-label">Delivery Options</legend>
  
  <div class="checkbox-group">
    <label>
      <input
        type="checkbox"
        name="delivery"
        value="free_delivery"
        aria-describedby="free-delivery-count"
      />
      <span>Free Delivery</span>
      <span id="free-delivery-count" class="count">(12)</span>
    </label>
    
    <label>
      <input
        type="checkbox"
        name="delivery"
        value="next_day"
        aria-describedby="next-day-count"
      />
      <span>Next Day</span>
      <span id="next-day-count" class="count">(8)</span>
    </label>
  </div>
</fieldset>

RANGE SLIDER:
───────────────────────────────────────────────────────────────

<div
  class="range-slider"
  role="group"
  aria-labelledby="price-range-label"
>
  <span id="price-range-label">Price Range</span>
  
  <input
    type="range"
    id="price-min"
    min="0"
    max="2000"
    value="100"
    aria-label="Minimum price"
    aria-valuemin="0"
    aria-valuemax="2000"
    aria-valuenow="100"
    aria-valuetext="£100"
  />
  
  <input
    type="range"
    id="price-max"
    min="0"
    max="2000"
    value="500"
    aria-label="Maximum price"
    aria-valuemin="0"
    aria-valuemax="2000"
    aria-valuenow="500"
    aria-valuetext="£500"
  />
</div>

FILTER RESULTS BAR:
───────────────────────────────────────────────────────────────

<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="results-bar"
>
  Showing 8 of 15 stores
</div>

<div class="active-filters" aria-label="Active filters">
  <button
    aria-label="Remove Bosch filter"
    class="filter-tag"
  >
    Bosch ×
  </button>
  <button
    aria-label="Remove Samsung filter"
    class="filter-tag"
  >
    Samsung ×
  </button>
  <button
    aria-label="Clear all filters"
    class="clear-all"
  >
    Clear All
  </button>
</div>

MOBILE BOTTOM SHEET:
───────────────────────────────────────────────────────────────

<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="filter-sheet-title"
  class="filter-sheet"
>
  <header>
    <h2 id="filter-sheet-title">Filters</h2>
    <button
      aria-label="Close filters"
      class="close-button"
    >
      ×
    </button>
  </header>
  
  <div class="sheet-content">
    <!-- Filter sections -->
  </div>
  
  <footer>
    <button>Clear All</button>
    <button aria-label="Apply filters and show 8 results">
      Show 8 Results
    </button>
  </footer>
</div>

═══════════════════════════════════════════════════════════════
```

### 6.4 Screen Reader Announcements

```
SCREEN READER ANNOUNCEMENTS
═══════════════════════════════════════════════════════════════

LIVE REGIONS:
───────────────────────────────────────────────────────────────

RESULTS COUNT UPDATE:
// Announce when results change
<div role="status" aria-live="polite">
  Showing {filteredCount} of {totalCount} stores
</div>

FILTER APPLIED:
// Announce when filter is applied
announceSR("Filter applied. Showing 8 results.");

FILTER REMOVED:
// Announce when filter is removed
announceSR("Bosch filter removed. Showing 12 results.");

ALL FILTERS CLEARED:
// Announce when all filters cleared
announceSR("All filters cleared. Showing all 15 stores.");

NO RESULTS:
// Announce when no results
announceSR("No stores match your filters. Try removing some filters.");

IMPLEMENTATION:
───────────────────────────────────────────────────────────────

// hooks/useScreenReaderAnnounce.ts

export function useScreenReaderAnnounce() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', priority);
    el.setAttribute('aria-atomic', 'true');
    el.className = 'sr-only';
    el.textContent = message;
    
    document.body.appendChild(el);
    
    setTimeout(() => {
      document.body.removeChild(el);
    }, 1000);
  }, []);
  
  return announce;
}

// CSS for sr-only
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

═══════════════════════════════════════════════════════════════
```

### 6.5 Focus Management

```
FOCUS MANAGEMENT — SPECIFICATION
═══════════════════════════════════════════════════════════════

FOCUS INDICATOR STYLING:
───────────────────────────────────────────────────────────────

/* All interactive elements */
:focus-visible {
  outline: 2px solid #e85d4c;
  outline-offset: 2px;
}

/* Remove default outline when not keyboard focus */
:focus:not(:focus-visible) {
  outline: none;
}

/* Filter dropdown trigger */
.filter-trigger:focus-visible {
  outline: 2px solid #e85d4c;
  outline-offset: 2px;
  border-color: #e85d4c;
}

/* Checkbox */
input[type="checkbox"]:focus-visible {
  outline: 2px solid #e85d4c;
  outline-offset: 2px;
}

/* Range slider thumb */
input[type="range"]:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px #FFFFFF, 0 0 0 5px #e85d4c;
}

FOCUS TRAP FOR MODALS:
───────────────────────────────────────────────────────────────

// hooks/useFocusTrap.ts

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Save previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;
    
    // Focus first element
    firstElement?.focus();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isActive]);
  
  return containerRef;
}

RESTORE FOCUS ON CLOSE:
───────────────────────────────────────────────────────────────

function FilterModal({ isOpen, onClose, triggerRef }) {
  const modalRef = useFocusTrap(isOpen);
  
  // Restore focus to trigger on close
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen, triggerRef]);
  
  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>
  );
}

═══════════════════════════════════════════════════════════════
```

### 6.6 Reduced Motion Support

```
REDUCED MOTION — SPECIFICATION
═══════════════════════════════════════════════════════════════

MEDIA QUERY:
───────────────────────────────────────────────────────────────

@media (prefers-reduced-motion: reduce) {
  /* Disable animations */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Keep essential state changes */
  .filter-sheet {
    transition: none;
  }
  
  .filter-dropdown-panel {
    animation: none;
  }
  
  .filter-chip {
    transform: none;
  }
}

JAVASCRIPT CHECK:
───────────────────────────────────────────────────────────────

// hooks/usePrefersReducedMotion.ts

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  
  return prefersReducedMotion;
}

// Usage in components
const prefersReducedMotion = usePrefersReducedMotion();

<motion.div
  animate={{ y: isOpen ? 0 : '100%' }}
  transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring' }}
>
  {/* Content */}
</motion.div>

═══════════════════════════════════════════════════════════════
```


---

## Performance Optimization

### 7.1 Client vs Server Filtering Decision

```
CLIENT VS SERVER FILTERING
═══════════════════════════════════════════════════════════════

DECISION MATRIX:
───────────────────────────────────────────────────────────────

TOTAL ITEMS        STRATEGY            REASON
───────────────────────────────────────────────────────────────
< 50               Client-side         Instant filtering, no API
50-200             Hybrid              Filter client, paginate server
> 200              Server-side         Too much data for client

IMPLEMENTATION:
───────────────────────────────────────────────────────────────

// hooks/useFilterStrategy.ts

export function useFilterStrategy(totalItems: number) {
  const strategy = useMemo(() => {
    if (totalItems < 50) return 'client';
    if (totalItems <= 200) return 'hybrid';
    return 'server';
  }, [totalItems]);
  
  return strategy;
}

// Usage in page component
const strategy = useFilterStrategy(stores.length);

if (strategy === 'client') {
  // Filter in memory
  const filtered = stores.filter(store => 
    matchesFilters(store, filters)
  );
} else {
  // Fetch from API with filters
  const filtered = await fetchFilteredStores(placeId, categoryId, filters);
}

CLIENT-SIDE FILTERING:
───────────────────────────────────────────────────────────────

// lib/filters/clientFilter.ts

export function filterStoresClient(
  stores: Store[],
  filters: FilterState,
  config: FilterConfig
): Store[] {
  return stores.filter(store => {
    // Check each active filter
    for (const filter of config.filters) {
      const filterValue = filters[filter.id];
      if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) {
        continue;
      }
      
      if (!matchesFilter(store, filter, filterValue)) {
        return false;
      }
    }
    return true;
  });
}

function matchesFilter(store: Store, filter: FilterDefinition, value: any): boolean {
  switch (filter.id) {
    case 'brand':
      return value.some((brand: string) => 
        store.brands_stocked?.includes(brand)
      );
    
    case 'grade':
      return value.some((grade: string) => 
        store.grades_stocked?.includes(grade)
      );
    
    case 'delivery':
      if (value.includes('free_delivery') && !store.offers_free_delivery) return false;
      if (value.includes('next_day') && !store.offers_next_day_delivery) return false;
      if (value.includes('same_day') && !store.offers_same_day_delivery) return false;
      return true;
    
    case 'warranty':
      return (store.warranty_months || 0) >= parseInt(value);
    
    case 'price':
      const { min, max } = value;
      if (store.price_min && store.price_min > max) return false;
      if (store.price_max && store.price_max < min) return false;
      return true;
    
    default:
      return true;
  }
}

═══════════════════════════════════════════════════════════════
```

### 7.2 Debouncing Strategy

```
DEBOUNCING — SPECIFICATION
═══════════════════════════════════════════════════════════════

TIMING:
───────────────────────────────────────────────────────────────

FILTER TYPE          DEBOUNCE      REASON
───────────────────────────────────────────────────────────────
Checkbox toggle      0ms           Instant feedback expected
Dropdown select      0ms           Explicit user action
Range slider drag    300ms         Many events during drag
Text search          400ms         Wait for typing to finish
URL update           300ms         Batch multiple filter changes

IMPLEMENTATION:
───────────────────────────────────────────────────────────────

// hooks/useDebounce.ts

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

// hooks/useDebouncedCallback.ts

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}

// Usage in filter system
const { filters, setFilters } = useFilters();

// Debounced URL update
const debouncedFilters = useDebounce(filters, 300);

useEffect(() => {
  const url = buildFilterURL(baseURL, debouncedFilters, config);
  router.replace(url, { scroll: false });
}, [debouncedFilters]);

// Immediate filter application for UI
useEffect(() => {
  if (strategy === 'client') {
    const filtered = filterStoresClient(stores, filters, config);
    setFilteredStores(filtered);
  }
}, [filters]); // No debounce for immediate UI update

═══════════════════════════════════════════════════════════════
```

### 7.3 Filter Count Caching

```
FILTER COUNT OPTIMIZATION
═══════════════════════════════════════════════════════════════

STRATEGY:
Precompute filter counts on page load, update dynamically as filters change.

IMPLEMENTATION:
───────────────────────────────────────────────────────────────

// types/filterCounts.ts

interface FilterCounts {
  [filterId: string]: {
    [optionValue: string]: number;
  };
}

// lib/filters/computeFilterCounts.ts

export function computeFilterCounts(
  items: Store[] | Provider[],
  config: FilterConfig,
  currentFilters: FilterState
): FilterCounts {
  const counts: FilterCounts = {};
  
  // For each filter, count how many items would match
  // if ONLY that filter option was added to current filters
  for (const filter of config.filters) {
    counts[filter.id] = {};
    
    if (!filter.options) continue;
    
    for (const option of filter.options) {
      // Create hypothetical filter state with this option
      const hypotheticalFilters = {
        ...currentFilters,
        [filter.id]: [option.value], // Add this option
      };
      
      // Count matching items
      const matchCount = items.filter(item =>
        matchesFilters(item, hypotheticalFilters, config)
      ).length;
      
      counts[filter.id][option.value] = matchCount;
    }
  }
  
  return counts;
}

// Optimized version using memoization
export function useFilterCounts(
  items: Store[] | Provider[],
  config: FilterConfig,
  filters: FilterState
) {
  return useMemo(() => {
    return computeFilterCounts(items, config, filters);
  }, [items, filters]);
}

DATABASE PRECOMPUTATION (for large datasets):
───────────────────────────────────────────────────────────────

-- Supabase function to get filter counts
CREATE OR REPLACE FUNCTION get_store_filter_counts(
  p_place_id UUID,
  p_category_id UUID
) RETURNS JSONB AS $$
DECLARE
  v_result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'brand', (
      SELECT jsonb_object_agg(b.slug, cnt)
      FROM (
        SELECT b.slug, COUNT(DISTINCT s.id) as cnt
        FROM brands b
        JOIN store_brands sb ON sb.brand_id = b.id
        JOIN stores s ON s.id = sb.store_id
        JOIN store_categories sc ON sc.store_id = s.id
        WHERE s.place_id = p_place_id
          AND sc.category_id = p_category_id
          AND s.is_active = true
        GROUP BY b.slug
      ) sub
    ),
    'grade', (
      SELECT jsonb_object_agg(grade, cnt)
      FROM (
        SELECT unnest(grades_stocked) as grade, COUNT(*) as cnt
        FROM stores s
        JOIN store_categories sc ON sc.store_id = s.id
        WHERE s.place_id = p_place_id
          AND sc.category_id = p_category_id
          AND s.is_active = true
        GROUP BY grade
      ) sub
    ),
    'delivery', jsonb_build_object(
      'free_delivery', (
        SELECT COUNT(*) FROM stores s
        JOIN store_categories sc ON sc.store_id = s.id
        WHERE s.place_id = p_place_id
          AND sc.category_id = p_category_id
          AND s.offers_free_delivery = true
          AND s.is_active = true
      ),
      'next_day', (
        SELECT COUNT(*) FROM stores s
        JOIN store_categories sc ON sc.store_id = s.id
        WHERE s.place_id = p_place_id
          AND sc.category_id = p_category_id
          AND s.offers_next_day_delivery = true
          AND s.is_active = true
      )
    )
  ) INTO v_result;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql;

═══════════════════════════════════════════════════════════════
```

### 7.4 Prefetch Strategy

```
PREFETCH STRATEGY
═══════════════════════════════════════════════════════════════

WHAT TO PREFETCH:
───────────────────────────────────────────────────────────────

ON PAGE LOAD:
├── Filter counts for all options
├── Brand list with counts
├── First page of results (unfiltered)
└── Nearby cities with counts (for empty state)

ON FILTER HOVER:
├── Results for that filter option (after 200ms hover)
└── Updated counts for other filters

ON MOBILE:
├── Load all data on initial fetch
├── Filter client-side for instant feel
└── No prefetch on hover (no hover on mobile)

IMPLEMENTATION:
───────────────────────────────────────────────────────────────

// Page-level prefetch
export async function generateStaticParams() {
  // Generate static params for common filter combinations
  return [
    { country: 'england', city: 'manchester', category: 'washing-machines' },
    // ... other high-traffic routes
  ];
}

// ISR with 1-hour revalidation
export const revalidate = 3600;

// Data fetching with prefetch
async function getPageData(params) {
  const [stores, filterCounts, brands] = await Promise.all([
    fetchStores(params.city, params.category),
    fetchFilterCounts(params.city, params.category),
    fetchBrandsWithCounts(params.city, params.category),
  ]);
  
  return { stores, filterCounts, brands };
}

// Client-side prefetch on hover
function FilterOption({ option, onHover }) {
  const prefetchTimeout = useRef<NodeJS.Timeout>();
  
  const handleMouseEnter = () => {
    prefetchTimeout.current = setTimeout(() => {
      // Prefetch results for this filter
      router.prefetch(`${baseUrl}?${option.id}=${option.value}`);
    }, 200);
  };
  
  const handleMouseLeave = () => {
    if (prefetchTimeout.current) {
      clearTimeout(prefetchTimeout.current);
    }
  };
  
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {option.label}
    </div>
  );
}

═══════════════════════════════════════════════════════════════
```

### 7.5 Progressive Enhancement

```
PROGRESSIVE ENHANCEMENT
═══════════════════════════════════════════════════════════════

NO-JS FALLBACK:
───────────────────────────────────────────────────────────────

<!-- Server-rendered form fallback -->
<noscript>
  <form action="" method="GET" class="filter-form">
    <fieldset>
      <legend>Brand</legend>
      <select name="brand" multiple>
        <option value="bosch">Bosch (8)</option>
        <option value="samsung">Samsung (5)</option>
        <!-- ... -->
      </select>
    </fieldset>
    
    <fieldset>
      <legend>Delivery</legend>
      <label>
        <input type="checkbox" name="delivery" value="free" />
        Free Delivery
      </label>
      <!-- ... -->
    </fieldset>
    
    <button type="submit">Apply Filters</button>
  </form>
</noscript>

HYDRATION STRATEGY:
───────────────────────────────────────────────────────────────

// Server Component (initial render)
export default async function CategoryPage({ params, searchParams }) {
  // Parse filters from URL on server
  const filters = parseFiltersFromURL(searchParams);
  
  // Fetch data server-side
  const stores = await fetchFilteredStores(params, filters);
  const counts = await fetchFilterCounts(params);
  
  return (
    <FilterProvider initialFilters={filters} initialCounts={counts}>
      <FilterBar />
      <StoreList stores={stores} />
    </FilterProvider>
  );
}

// Client Component (hydrates with interactivity)
'use client';
function FilterBar() {
  const { filters, setFilters } = useFilters();
  
  // Client-side interactivity after hydration
  return (
    <div className="filter-bar">
      {/* Interactive filter components */}
    </div>
  );
}

LOADING STATES:
───────────────────────────────────────────────────────────────

// Skeleton loading for filter bar
function FilterBarSkeleton() {
  return (
    <div className="filter-bar-skeleton">
      <div className="skeleton-dropdown" />
      <div className="skeleton-dropdown" />
      <div className="skeleton-dropdown" />
      <div className="skeleton-sort" />
    </div>
  );
}

// Suspense boundary
<Suspense fallback={<FilterBarSkeleton />}>
  <FilterBar />
</Suspense>

═══════════════════════════════════════════════════════════════
```

---

## Implementation Code

### 8.1 Filter Context Provider

```typescript
// contexts/FilterContext.tsx

'use client';

import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FilterConfig, FilterState, FilterCounts } from '@/types/filters';
import { parseFiltersFromURL, buildFilterURL, hasActiveFilters, getActiveFilterCount } from '@/lib/filters/urlUtils';

interface FilterContextValue {
  // State
  filters: FilterState;
  counts: FilterCounts;
  config: FilterConfig;
  
  // Computed
  hasActiveFilters: boolean;
  activeFilterCount: number;
  
  // Actions
  setFilter: (filterId: string, value: any) => void;
  toggleFilterOption: (filterId: string, optionValue: string) => void;
  clearFilter: (filterId: string) => void;
  clearAllFilters: () => void;
  setSort: (sortValue: string) => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

// Reducer for filter state
type FilterAction = 
  | { type: 'SET_FILTER'; filterId: string; value: any }
  | { type: 'TOGGLE_OPTION'; filterId: string; optionValue: string }
  | { type: 'CLEAR_FILTER'; filterId: string }
  | { type: 'CLEAR_ALL' }
  | { type: 'SET_SORT'; value: string };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, [action.filterId]: action.value };
      
    case 'TOGGLE_OPTION': {
      const current = state[action.filterId] as string[] || [];
      const isSelected = current.includes(action.optionValue);
      return {
        ...state,
        [action.filterId]: isSelected
          ? current.filter(v => v !== action.optionValue)
          : [...current, action.optionValue],
      };
    }
    
    case 'CLEAR_FILTER': {
      const { [action.filterId]: _, ...rest } = state;
      return rest;
    }
    
    case 'CLEAR_ALL':
      return { _sort: state._sort }; // Preserve sort
      
    case 'SET_SORT':
      return { ...state, _sort: action.value };
      
    default:
      return state;
  }
}

interface FilterProviderProps {
  children: React.ReactNode;
  config: FilterConfig;
  initialFilters?: FilterState;
  initialCounts?: FilterCounts;
}

export function FilterProvider({
  children,
  config,
  initialFilters = {},
  initialCounts = {},
}: FilterProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize from URL if no initial filters provided
  const initialState = useMemo(() => {
    if (Object.keys(initialFilters).length > 0) {
      return initialFilters;
    }
    return parseFiltersFromURL(searchParams, config);
  }, []);
  
  const [filters, dispatch] = useReducer(filterReducer, initialState);
  const [counts, setCounts] = useState<FilterCounts>(initialCounts);
  
  // Sync URL with filter state (debounced)
  const debouncedFilters = useDebounce(filters, 300);
  
  useEffect(() => {
    const url = buildFilterURL(pathname, debouncedFilters, config);
    router.replace(url, { scroll: false });
  }, [debouncedFilters, pathname, router, config]);
  
  // Actions
  const setFilter = useCallback((filterId: string, value: any) => {
    dispatch({ type: 'SET_FILTER', filterId, value });
  }, []);
  
  const toggleFilterOption = useCallback((filterId: string, optionValue: string) => {
    dispatch({ type: 'TOGGLE_OPTION', filterId, optionValue });
  }, []);
  
  const clearFilter = useCallback((filterId: string) => {
    dispatch({ type: 'CLEAR_FILTER', filterId });
  }, []);
  
  const clearAllFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);
  
  const setSort = useCallback((value: string) => {
    dispatch({ type: 'SET_SORT', value });
  }, []);
  
  // Computed values
  const value = useMemo<FilterContextValue>(() => ({
    filters,
    counts,
    config,
    hasActiveFilters: hasActiveFilters(filters),
    activeFilterCount: getActiveFilterCount(filters),
    setFilter,
    toggleFilterOption,
    clearFilter,
    clearAllFilters,
    setSort,
  }), [filters, counts, config, setFilter, toggleFilterOption, clearFilter, clearAllFilters, setSort]);
  
  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
}
```

### 8.2 Filter Bar Component

```tsx
// components/filters/FilterBar.tsx

'use client';

import { useFilters } from '@/contexts/FilterContext';
import { FilterDropdown } from './FilterDropdown';
import { FilterCheckboxGroup } from './FilterCheckboxGroup';
import { FilterRangeSlider } from './FilterRangeSlider';
import { SortDropdown } from './SortDropdown';
import { ClearFiltersButton } from './ClearFiltersButton';

export function FilterBar() {
  const { config, hasActiveFilters } = useFilters();
  
  // Group filters by priority
  const highPriorityFilters = config.filters.filter(f => f.priority === 'high');
  const mediumPriorityFilters = config.filters.filter(f => f.priority === 'medium');
  const lowPriorityFilters = config.filters.filter(f => f.priority === 'low');
  
  return (
    <div className="filter-bar">
      <div className="filter-bar-label">FILTER BY:</div>
      
      <div className="filter-bar-controls">
        {/* High priority filters */}
        <div className="filter-group filter-group-high">
          {highPriorityFilters.map(filter => (
            <FilterControl key={filter.id} filter={filter} />
          ))}
        </div>
        
        {/* Medium priority filters */}
        <div className="filter-group filter-group-medium">
          {mediumPriorityFilters.map(filter => (
            <FilterControl key={filter.id} filter={filter} />
          ))}
        </div>
        
        {/* Sort and clear */}
        <div className="filter-bar-actions">
          <SortDropdown />
          {hasActiveFilters && <ClearFiltersButton />}
        </div>
      </div>
    </div>
  );
}

function FilterControl({ filter }: { filter: FilterDefinition }) {
  switch (filter.type) {
    case 'multi-select':
    case 'search-select':
    case 'single-select':
      return <FilterDropdown filter={filter} />;
      
    case 'checkbox-group':
      return <FilterCheckboxGroup filter={filter} />;
      
    case 'range-slider':
      return <FilterRangeSlider filter={filter} />;
      
    case 'toggle':
      return <FilterToggle filter={filter} />;
      
    default:
      return null;
  }
}
```

### 8.3 Filter Dropdown Component

```tsx
// components/filters/FilterDropdown.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { useFilters } from '@/contexts/FilterContext';
import { FilterDefinition, FilterOption } from '@/types/filters';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface FilterDropdownProps {
  filter: FilterDefinition;
}

export function FilterDropdown({ filter }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useFocusTrap(isOpen);
  
  const { filters, counts, toggleFilterOption, setFilter, clearFilter } = useFilters();
  
  const selectedValues = (filters[filter.id] as string[]) || [];
  const filterCounts = counts[filter.id] || {};
  
  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current && 
        !triggerRef.current.contains(e.target as Node) &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);
  
  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);
  
  const handleOptionToggle = (optionValue: string) => {
    if (filter.type === 'single-select') {
      setFilter(filter.id, optionValue);
      setIsOpen(false);
    } else {
      toggleFilterOption(filter.id, optionValue);
    }
  };
  
  const handleClear = () => {
    clearFilter(filter.id);
  };
  
  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return filter.placeholder || `All ${filter.label}`;
    }
    if (selectedValues.length === 1) {
      const option = filter.options?.find(o => o.value === selectedValues[0]);
      return option?.label || selectedValues[0];
    }
    return `${selectedValues.length} selected`;
  };
  
  // Group options by tier if available (for brands)
  const groupedOptions = filter.options?.reduce((groups, option) => {
    const tier = option.tier || 'default';
    if (!groups[tier]) groups[tier] = [];
    groups[tier].push(option);
    return groups;
  }, {} as Record<string, FilterOption[]>);
  
  return (
    <div className="filter-dropdown">
      <button
        ref={triggerRef}
        className={`filter-dropdown-trigger ${selectedValues.length > 0 ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${filter.id}-listbox`}
        aria-label={`Filter by ${filter.label}${selectedValues.length > 0 ? `, ${selectedValues.length} selected` : ''}`}
      >
        <span className="filter-dropdown-label">{filter.label}</span>
        <span className="filter-dropdown-value">{getDisplayText()}</span>
        <span className="filter-dropdown-icon">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div
          ref={panelRef}
          id={`${filter.id}-listbox`}
          role="listbox"
          aria-labelledby={`${filter.id}-trigger`}
          aria-multiselectable={filter.type === 'multi-select'}
          className="filter-dropdown-panel"
        >
          {/* Search input for searchable dropdowns */}
          {filter.type === 'search-select' && (
            <div className="filter-dropdown-search">
              <input
                type="text"
                placeholder={filter.placeholder || 'Search...'}
                className="filter-dropdown-search-input"
                autoFocus
              />
            </div>
          )}
          
          {/* Options grouped by tier */}
          {Object.entries(groupedOptions || {}).map(([tier, options]) => (
            <div key={tier} className="filter-dropdown-group">
              {tier !== 'default' && (
                <div className="filter-dropdown-group-header" role="presentation">
                  {tier.toUpperCase()}
                </div>
              )}
              {options.map(option => {
                const count = filterCounts[option.value] || 0;
                const isSelected = selectedValues.includes(option.value);
                const isDisabled = count === 0 && !isSelected;
                
                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={isDisabled}
                    className={`filter-dropdown-option ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                    onClick={() => !isDisabled && handleOptionToggle(option.value)}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
                        e.preventDefault();
                        handleOptionToggle(option.value);
                      }
                    }}
                    tabIndex={isDisabled ? -1 : 0}
                  >
                    {filter.type !== 'single-select' && (
                      <span className={`filter-checkbox ${isSelected ? 'checked' : ''}`}>
                        {isSelected && '✓'}
                      </span>
                    )}
                    {option.icon && <span className="filter-option-icon">{option.icon}</span>}
                    <span className="filter-option-label">{option.label}</span>
                    {filter.showCounts && (
                      <span className="filter-option-count">({count})</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          
          {/* Footer with Clear/Apply */}
          {filter.type === 'multi-select' && (
            <div className="filter-dropdown-footer">
              <button
                className="filter-dropdown-clear"
                onClick={handleClear}
                disabled={selectedValues.length === 0}
              >
                Clear
              </button>
              <button
                className="filter-dropdown-apply"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

### 8.4 Mobile Filter Sheet Component

```tsx
// components/filters/FilterMobile.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilters } from '@/contexts/FilterContext';
import { QuickFilterChips } from './QuickFilterChips';
import { FilterSection } from './FilterSection';
import { SortSheet } from './SortSheet';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function FilterMobile() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const { config, hasActiveFilters, activeFilterCount, clearAllFilters } = useFilters();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const sheetRef = useFocusTrap(isFilterOpen);
  
  const currentSort = config.sortOptions.find(s => s.value === filters._sort) 
    || config.sortOptions.find(s => s.value === config.defaultSort);
  
  return (
    <div className="filter-mobile">
      {/* Quick filter chips */}
      <QuickFilterChips />
      
      {/* Trigger buttons */}
      <div className="filter-mobile-triggers">
        <button
          className={`filter-mobile-trigger ${hasActiveFilters ? 'active' : ''}`}
          onClick={() => setIsFilterOpen(true)}
          aria-label={`Filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ''}`}
        >
          <span className="filter-icon">🎛️</span>
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="filter-badge">{activeFilterCount}</span>
          )}
        </button>
        
        <button
          className="filter-mobile-trigger"
          onClick={() => setIsSortOpen(true)}
        >
          <span className="sort-label">Sort:</span>
          <span className="sort-value">{currentSort?.label}</span>
          <span className="sort-icon">▼</span>
        </button>
      </div>
      
      {/* Filter bottom sheet */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="filter-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
              onClick={() => setIsFilterOpen(false)}
            />
            
            {/* Sheet */}
            <motion.div
              ref={sheetRef}
              className="filter-sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="filter-sheet-title"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={
                prefersReducedMotion 
                  ? { duration: 0 } 
                  : { type: 'spring', damping: 25, stiffness: 300 }
              }
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setIsFilterOpen(false);
                }
              }}
            >
              {/* Drag handle */}
              <div className="filter-sheet-handle" />
              
              {/* Header */}
              <div className="filter-sheet-header">
                <h2 id="filter-sheet-title">Filters</h2>
                <button
                  className="filter-sheet-close"
                  onClick={() => setIsFilterOpen(false)}
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>
              
              {/* Content */}
              <div className="filter-sheet-content">
                {config.filters.map(filter => (
                  <FilterSection key={filter.id} filter={filter} />
                ))}
              </div>
              
              {/* Footer */}
              <div className="filter-sheet-footer">
                <button
                  className="filter-sheet-clear"
                  onClick={clearAllFilters}
                  disabled={!hasActiveFilters}
                >
                  Clear All
                </button>
                <button
                  className="filter-sheet-apply"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Sort bottom sheet */}
      <SortSheet isOpen={isSortOpen} onClose={() => setIsSortOpen(false)} />
    </div>
  );
}
```

### 8.5 Supabase Query Builder

```typescript
// lib/filters/supabaseQueryBuilder.ts

import { SupabaseClient } from '@supabase/supabase-js';
import { FilterState, FilterConfig } from '@/types/filters';

export function buildFilteredStoreQuery(
  supabase: SupabaseClient,
  placeId: string,
  categoryId: string,
  filters: FilterState,
  config: FilterConfig
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
        brands(id, slug, name)
      )
    `)
    .eq('place_id', placeId)
    .eq('store_categories.category_id', categoryId)
    .eq('is_active', true)
    .in('status', ['active', 'claimed', 'verified']);
  
  // Apply each filter
  for (const filter of config.filters) {
    const value = filters[filter.id];
    if (!value || (Array.isArray(value) && value.length === 0)) continue;
    
    query = applyFilter(query, filter, value);
  }
  
  // Apply sorting
  const sortValue = filters._sort || config.defaultSort;
  const sortOption = config.sortOptions.find(s => s.value === sortValue);
  
  if (sortOption) {
    if (sortOption.value === 'relevance') {
      // Relevance: featured first, then by score
      query = query
        .order('is_featured', { ascending: false })
        .order('overall_score', { ascending: false });
    } else {
      query = query.order(sortOption.field, {
        ascending: sortOption.direction === 'asc',
        nullsFirst: sortOption.nullsFirst ?? false,
      });
    }
  }
  
  return query;
}

function applyFilter(query: any, filter: FilterDefinition, value: any) {
  switch (filter.id) {
    case 'brand':
      // Filter via store_brands junction
      return query.in('store_brands.brands.slug', value);
    
    case 'grade':
      // Overlaps with grades_stocked array
      return query.overlaps('grades_stocked', value);
    
    case 'delivery':
      // Apply each delivery filter
      if (value.includes('free_delivery')) {
        query = query.eq('offers_free_delivery', true);
      }
      if (value.includes('next_day')) {
        query = query.eq('offers_next_day_delivery', true);
      }
      if (value.includes('same_day')) {
        query = query.eq('offers_same_day_delivery', true);
      }
      return query;
    
    case 'finance':
      if (value.includes('offers_finance')) {
        query = query.eq('offers_finance', true);
      }
      if (value.includes('zero_percent')) {
        query = query.eq('offers_zero_percent_finance', true);
      }
      if (value.includes('klarna')) {
        query = query.contains('finance_providers', ['klarna']);
      }
      if (value.includes('clearpay')) {
        query = query.contains('finance_providers', ['clearpay']);
      }
      return query;
    
    case 'warranty':
      const minWarranty = parseInt(value);
      if (minWarranty > 0) {
        return query.gte('warranty_months', minWarranty);
      }
      return query;
    
    case 'price':
      if (value.min > 0) {
        query = query.gte('store_categories.price_min', value.min);
      }
      if (value.max < 10000) {
        query = query.lte('store_categories.price_max', value.max);
      }
      return query;
    
    case 'verified':
      return query.eq('status', 'verified');
    
    default:
      return query;
  }
}

// Provider query builder
export function buildFilteredProviderQuery(
  supabase: SupabaseClient,
  placeId: string,
  categoryId: string,
  filters: FilterState,
  config: FilterConfig
) {
  let query = supabase
    .from('service_providers')
    .select(`
      *,
      provider_services!inner(
        appliance_category_id,
        offers_same_day,
        callout_fee_min
      ),
      provider_coverage_places!inner(
        place_id
      ),
      provider_brand_authorisations(
        brands(id, slug, name),
        is_verified
      )
    `)
    .eq('provider_coverage_places.place_id', placeId)
    .eq('provider_services.appliance_category_id', categoryId)
    .eq('is_active', true)
    .in('status', ['active', 'claimed', 'verified']);
  
  // Apply filters
  for (const filter of config.filters) {
    const value = filters[filter.id];
    if (!value || (Array.isArray(value) && value.length === 0)) continue;
    
    query = applyProviderFilter(query, filter, value);
  }
  
  // Apply sorting
  const sortValue = filters._sort || config.defaultSort;
  const sortOption = config.sortOptions.find(s => s.value === sortValue);
  
  if (sortOption) {
    query = query.order(sortOption.field, {
      ascending: sortOption.direction === 'asc',
      nullsFirst: sortOption.nullsFirst ?? false,
    });
  }
  
  return query;
}

function applyProviderFilter(query: any, filter: FilterDefinition, value: any) {
  switch (filter.id) {
    case 'availability':
      if (value.includes('same_day')) {
        query = query.eq('offers_same_day', true);
      }
      if (value.includes('next_day')) {
        query = query.eq('offers_next_day', true);
      }
      if (value.includes('emergency')) {
        query = query.eq('offers_emergency', true);
      }
      if (value.includes('weekend')) {
        query = query.eq('offers_weekend', true);
      }
      if (value.includes('evening')) {
        query = query.eq('offers_evening', true);
      }
      return query;
    
    case 'trust':
      if (value.includes('no_fix_no_fee')) {
        query = query.eq('no_fix_no_fee', true);
      }
      if (value.includes('verified')) {
        query = query.eq('is_verified', true);
      }
      if (value.includes('insured')) {
        query = query.eq('public_liability_insurance', true);
      }
      return query;
    
    case 'certifications':
      if (value.includes('gas_safe')) {
        query = query.eq('gas_safe_registered', true);
      }
      if (value.includes('fgas')) {
        query = query.eq('fgas_certified', true);
      }
      if (value.includes('which_trusted')) {
        query = query.eq('which_trusted_trader', true);
      }
      if (value.includes('checkatrade')) {
        query = query.eq('checkatrade_member', true);
      }
      return query;
    
    case 'warranty':
      const minWarranty = parseInt(value);
      if (minWarranty > 0) {
        return query.gte('warranty_on_repairs_months', minWarranty);
      }
      return query;
    
    case 'callout':
      return query.lte('callout_fee_from', value.max);
    
    case 'brand':
      return query.eq('provider_brand_authorisations.brands.slug', value);
    
    default:
      return query;
  }
}
```


---

## Integration Points

### 9.1 Integration with Spec 07 (City Hub)

```
CITY HUB FILTER INTEGRATION
═══════════════════════════════════════════════════════════════

LOCATION: /england/manchester/ (Retailers Section)

FILTER SCOPE:
├── Simplified filter set (category, brand, features)
├── Not full filter system (user can drill into category pages)
└── Inline filters only (no bottom sheet needed for small set)

IMPLEMENTATION:
───────────────────────────────────────────────────────────────

// app/[country]/[city]/page.tsx

import { FilterProvider } from '@/contexts/FilterContext';
import { CITY_HUB_FILTER_CONFIG } from '@/config/filters/cityHubFilters';
import { InlineFilters } from '@/components/filters/InlineFilters';

export default async function CityPage({ params }) {
  const stores = await fetchStoresForCity(params.city);
  const counts = await fetchFilterCountsForCity(params.city);
  
  return (
    <FilterProvider 
      config={CITY_HUB_FILTER_CONFIG}
      initialCounts={counts}
    >
      <section id="retailers">
        <h2>Graded Appliance Retailers in {city.name}</h2>
        
        {/* Simplified inline filters */}
        <InlineFilters>
          <FilterDropdown filterId="category" />
          <FilterDropdown filterId="brand" />
          <FilterCheckboxGroup filterId="features" />
        </InlineFilters>
        
        <StoreList stores={stores} />
        
        <Link href={`/${params.country}/${params.city}/washing-machines/`}>
          View all washing machine stores →
        </Link>
      </section>
    </FilterProvider>
  );
}

FILTER BEHAVIOR ON CITY HUB:
───────────────────────────────────────────────────────────────

1. Category dropdown selection → Redirect to category page
   Example: Select "Washing Machines" → /england/manchester/washing-machines/

2. Brand dropdown + no category → Show all stores with that brand
   Example: Select "Bosch" → Filter stores showing Bosch

3. Feature checkboxes → Filter inline (no redirect)
   Example: Check "Free Delivery" → Filter visible stores

4. "View all" links → Navigate to specific category pages

═══════════════════════════════════════════════════════════════
```

### 9.2 Integration with Spec 10 (Repair Category)

```
REPAIR CATEGORY FILTER INTEGRATION
═══════════════════════════════════════════════════════════════

LOCATION: /england/manchester/washing-machine-repair/

FILTER CONFIGURATION:
├── Use PROVIDER_FILTER_CONFIG
├── Urgency filters prominent (same-day, emergency)
├── Certification filters shown (Gas Safe, F-Gas)
└── Full mobile bottom sheet support

IMPLEMENTATION:
───────────────────────────────────────────────────────────────

// app/[country]/[city]/[category]-repair/page.tsx

import { FilterProvider } from '@/contexts/FilterContext';
import { PROVIDER_FILTER_CONFIG } from '@/config/filters/providerFilters';
import { FilterBar } from '@/components/filters/FilterBar';
import { FilterMobile } from '@/components/filters/FilterMobile';
import { FilterResultsBar } from '@/components/filters/FilterResultsBar';

export default async function RepairCategoryPage({ params, searchParams }) {
  const config = { ...PROVIDER_FILTER_CONFIG };
  
  // Show Gas Safe filter only for gas appliances
  if (isGasAppliance(params.category)) {
    config.filters = config.filters.map(f => 
      f.id === 'certifications' 
        ? { ...f, options: f.options.filter(o => o.value === 'gas_safe' || o.value !== 'fgas') }
        : f
    );
  }
  
  const filters = parseFiltersFromURL(searchParams, config);
  const providers = await fetchFilteredProviders(params, filters);
  const counts = await fetchProviderFilterCounts(params);
  
  return (
    <FilterProvider 
      config={config}
      initialFilters={filters}
      initialCounts={counts}
    >
      {/* Desktop filter bar */}
      <div className="hidden md:block">
        <FilterBar />
      </div>
      
      {/* Mobile filters */}
      <div className="md:hidden">
        <FilterMobile />
      </div>
      
      {/* Results bar */}
      <FilterResultsBar 
        totalCount={providers.total}
        entityName="engineers"
      />
      
      {/* Provider list */}
      <ProviderList providers={providers.data} />
      
      {/* Empty state */}
      {providers.data.length === 0 && (
        <EmptyFilterState 
          entityName="engineers"
          nearbyPlaces={nearbyPlaces}
        />
      )}
    </FilterProvider>
  );
}

CONDITIONAL FILTERS:
───────────────────────────────────────────────────────────────

Gas appliances (ovens, hobs, cookers, range cookers):
├── Show "Gas Safe Registered" filter prominently
├── Add warning badge if uncertified providers shown
└── Prioritize certified providers in sort

Refrigeration (fridges, freezers, wine coolers):
├── Show "F-Gas Certified" filter
└── Note importance for refrigerant handling

All categories:
├── Same-day / Emergency filters
├── No fix no fee
├── Verified engineers

═══════════════════════════════════════════════════════════════
```

### 9.3 Integration with Spec 14 (Retail Category)

```
RETAIL CATEGORY FILTER INTEGRATION
═══════════════════════════════════════════════════════════════

LOCATION: /england/manchester/washing-machines/

FILTER CONFIGURATION:
├── Use STORE_FILTER_CONFIG
├── Grade filter prominent (unique to graded appliances)
├── Brand filter with tier grouping
└── Price range slider for category

IMPLEMENTATION:
───────────────────────────────────────────────────────────────

// app/[country]/[city]/[category]/page.tsx

import { FilterProvider } from '@/contexts/FilterContext';
import { STORE_FILTER_CONFIG } from '@/config/filters/storeFilters';
import { FilterBar } from '@/components/filters/FilterBar';
import { FilterMobile } from '@/components/filters/FilterMobile';
import { FilterResultsBar } from '@/components/filters/FilterResultsBar';
import { buildFilteredStoreQuery } from '@/lib/filters/supabaseQueryBuilder';

export default async function RetailCategoryPage({ params, searchParams }) {
  const config = { ...STORE_FILTER_CONFIG };
  
  // Load dynamic brand options for this category/location
  const availableBrands = await fetchBrandsForCategory(params.city, params.category);
  config.filters = config.filters.map(f => 
    f.id === 'brand' 
      ? { ...f, options: availableBrands }
      : f
  );
  
  // Set price range based on category typical prices
  const priceRange = await getCategoryPriceRange(params.category);
  config.filters = config.filters.map(f => 
    f.id === 'price' 
      ? { ...f, min: priceRange.min, max: priceRange.max }
      : f
  );
  
  const filters = parseFiltersFromURL(searchParams, config);
  const stores = await fetchFilteredStores(params, filters);
  const counts = await fetchStoreFilterCounts(params);
  
  return (
    <FilterProvider 
      config={config}
      initialFilters={filters}
      initialCounts={counts}
    >
      {/* SEO: canonical and robots */}
      <head>
        <link rel="canonical" href={`/${params.country}/${params.city}/${params.category}/`} />
        {Object.keys(searchParams).length > 0 && (
          <meta name="robots" content="noindex, follow" />
        )}
      </head>
      
      {/* Desktop filter bar */}
      <div className="hidden md:block">
        <FilterBar />
      </div>
      
      {/* Mobile filters */}
      <div className="md:hidden">
        <FilterMobile />
      </div>
      
      {/* Results bar with active filters */}
      <FilterResultsBar 
        totalCount={stores.total}
        entityName="stores"
      />
      
      {/* Store list */}
      <StoreList stores={stores.data} />
      
      {/* Pagination */}
      {stores.total > 10 && (
        <Pagination 
          currentPage={filters._page || 1}
          totalPages={Math.ceil(stores.total / 10)}
        />
      )}
      
      {/* Empty state */}
      {stores.data.length === 0 && (
        <EmptyFilterState 
          entityName="stores"
          nearbyPlaces={nearbyPlaces}
          suggestedCategory={relatedCategories[0]}
        />
      )}
    </FilterProvider>
  );
}

═══════════════════════════════════════════════════════════════
```

### 9.4 Integration with Spec 15 (Brand Repair)

```
BRAND REPAIR FILTER INTEGRATION
═══════════════════════════════════════════════════════════════

LOCATION: /england/manchester/bosch-repair/

FILTER CONFIGURATION:
├── Subset of PROVIDER_FILTER_CONFIG
├── Brand filter pre-selected and hidden
├── Focus on availability and certifications
└── Show brand authorization status prominently

IMPLEMENTATION:
───────────────────────────────────────────────────────────────

// app/[country]/[city]/[brand]-repair/page.tsx

import { FilterProvider } from '@/contexts/FilterContext';
import { PROVIDER_FILTER_CONFIG } from '@/config/filters/providerFilters';

export default async function BrandRepairPage({ params, searchParams }) {
  // Remove brand filter (already filtered by URL)
  const config = {
    ...PROVIDER_FILTER_CONFIG,
    filters: PROVIDER_FILTER_CONFIG.filters.filter(f => f.id !== 'brand'),
  };
  
  // Pre-filter to brand-authorized providers
  const filters = {
    ...parseFiltersFromURL(searchParams, config),
    _brandAuthorized: params.brand, // Internal filter
  };
  
  const providers = await fetchBrandAuthorizedProviders(
    params.city, 
    params.brand, 
    filters
  );
  
  return (
    <FilterProvider 
      config={config}
      initialFilters={filters}
    >
      <h1>{params.brand} Repair in {city.name}</h1>
      
      {/* Show brand authorization badge */}
      <p>
        All engineers below are authorized {params.brand} repair specialists.
      </p>
      
      {/* Filters (without brand dropdown) */}
      <FilterBar />
      
      <ProviderList providers={providers} showBrandAuth={true} />
    </FilterProvider>
  );
}

═══════════════════════════════════════════════════════════════
```

### 9.5 CSS File Structure

```
CSS ORGANIZATION
═══════════════════════════════════════════════════════════════

FILE STRUCTURE:
───────────────────────────────────────────────────────────────

styles/
├── filters/
│   ├── _variables.css          // Filter-specific CSS variables
│   ├── filter-bar.css          // Desktop filter bar
│   ├── filter-dropdown.css     // Dropdown component
│   ├── filter-checkbox.css     // Checkbox group component
│   ├── filter-range.css        // Range slider component
│   ├── filter-mobile.css       // Mobile bottom sheet
│   ├── filter-chips.css        // Quick filter chips
│   ├── filter-results.css      // Results bar and tags
│   └── filter-empty.css        // Empty state
└── globals.css                 // Imports all filter styles

TAILWIND CONFIG (if using Tailwind):
───────────────────────────────────────────────────────────────

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'filter-active': '#EFF6FF',
        'filter-border-active': '#e85d4c',
        'filter-count': '#6B7280',
      },
      spacing: {
        'filter-chip': '44px',      // Touch target height
        'filter-dropdown': '400px', // Max dropdown height
      },
      animation: {
        'sheet-up': 'sheetUp 300ms ease-out',
        'sheet-down': 'sheetDown 300ms ease-in',
      },
    },
  },
};

═══════════════════════════════════════════════════════════════
```

---

## Testing Checklist

### 10.1 Functional Testing

```
FUNCTIONAL TEST CASES
═══════════════════════════════════════════════════════════════

FILTER OPERATIONS:
───────────────────────────────────────────────────────────────

□ Single filter selection updates results
□ Multiple filter selections work together (AND logic)
□ Filter removal updates results
□ "Clear All" removes all filters
□ Filter counts update after selection
□ 0-count options are disabled/grayed
□ Sort changes update results order
□ Pagination works with filters
□ URL updates reflect filter state
□ Page refresh preserves filter state (from URL)
□ Browser back/forward works with filter history
□ Direct URL with filters works correctly

MOBILE SPECIFIC:
───────────────────────────────────────────────────────────────

□ Quick filter chips toggle correctly
□ Filter button shows active count badge
□ Bottom sheet opens smoothly
□ Bottom sheet closes on overlay tap
□ Bottom sheet closes on swipe down
□ Collapsible sections expand/collapse
□ "Apply" button closes sheet and updates
□ "Clear All" in sheet works
□ Sort sheet opens and closes correctly
□ Safe area insets respected

EDGE CASES:
───────────────────────────────────────────────────────────────

□ No results shows empty state
□ Empty state "Clear Filters" works
□ Empty state nearby cities links work
□ Very long filter option labels truncate
□ Many selected filters don't break layout
□ Large number of options scrolls in dropdown
□ Search in searchable dropdown works
□ Special characters in filter values handled
□ Unicode/emoji in labels render correctly

═══════════════════════════════════════════════════════════════
```

### 10.2 Accessibility Testing

```
ACCESSIBILITY TEST CASES (WCAG 2.1 AA)
═══════════════════════════════════════════════════════════════

KEYBOARD NAVIGATION:
───────────────────────────────────────────────────────────────

□ All filters reachable via Tab
□ Dropdown opens with Enter/Space
□ Arrow keys navigate dropdown options
□ Escape closes dropdown
□ Focus returns to trigger after close
□ Checkbox toggles with Space
□ Range slider adjustable with arrows
□ Mobile sheet traps focus when open
□ Focus returns to trigger after sheet close

SCREEN READER:
───────────────────────────────────────────────────────────────

□ Filter labels announced
□ Selected state announced
□ Count announced per option
□ Disabled options announced as disabled
□ Results count announced (live region)
□ Filter applied/removed announced
□ Empty state announced
□ Modal dialog role announced
□ Required fields announced

VISUAL:
───────────────────────────────────────────────────────────────

□ Focus indicators visible (2px solid)
□ Color contrast 4.5:1 minimum for text
□ Color contrast 3:1 for UI components
□ Selected state distinguishable without color
□ Disabled state distinguishable without color
□ Text resizable to 200% without loss
□ Touch targets 44px minimum

MOTION:
───────────────────────────────────────────────────────────────

□ Animations respect prefers-reduced-motion
□ No content flashes > 3 times/second
□ No essential info conveyed only by motion

═══════════════════════════════════════════════════════════════
```

### 10.3 Performance Testing

```
PERFORMANCE TEST CASES
═══════════════════════════════════════════════════════════════

CORE WEB VITALS TARGETS:
───────────────────────────────────────────────────────────────

□ LCP (Largest Contentful Paint) < 2.5s
□ FID (First Input Delay) < 100ms
□ CLS (Cumulative Layout Shift) < 0.1
□ Filter interaction < 100ms response

LOAD TESTING:
───────────────────────────────────────────────────────────────

□ Page with 10 stores loads < 2s
□ Page with 50 stores loads < 3s
□ Page with 100 stores loads < 4s
□ Filter counts load in parallel
□ No layout shift when counts load

CLIENT-SIDE FILTERING:
───────────────────────────────────────────────────────────────

□ Filter 50 items < 50ms
□ Filter 100 items < 100ms
□ Filter 200 items < 200ms
□ UI remains responsive during filter

NETWORK:
───────────────────────────────────────────────────────────────

□ Filter change on 3G < 2s
□ Filter change on slow 4G < 1s
□ Debouncing prevents excessive API calls
□ Prefetch improves subsequent loads

═══════════════════════════════════════════════════════════════
```

### 10.4 SEO Testing

```
SEO TEST CASES
═══════════════════════════════════════════════════════════════

INDEXABILITY:
───────────────────────────────────────────────────────────────

□ Base URL (no filters) has index, follow
□ Filtered URL has noindex, follow
□ Filtered URL has canonical to base URL
□ Canonical URL is absolute (includes domain)
□ No duplicate canonical tags

CRAWLABILITY:
───────────────────────────────────────────────────────────────

□ Filter links use proper <a> tags
□ JavaScript-rendered content in HTML source
□ No essential content in JavaScript only
□ robots.txt doesn't block filter URLs
□ sitemap excludes filtered URLs

STRUCTURED DATA:
───────────────────────────────────────────────────────────────

□ Schema.org ItemList present
□ ItemList count reflects filtered results
□ BreadcrumbList unchanged by filters
□ No schema validation errors

MOBILE SEO:
───────────────────────────────────────────────────────────────

□ Mobile-first content matches desktop
□ Filter UI doesn't block content
□ No intrusive interstitials from filters
□ Mobile-friendly test passes

═══════════════════════════════════════════════════════════════
```

### 10.5 Browser Compatibility

```
BROWSER COMPATIBILITY MATRIX
═══════════════════════════════════════════════════════════════

DESKTOP BROWSERS:
───────────────────────────────────────────────────────────────

Browser              Version      Status
─────────────────────────────────────────
Chrome               Latest 2     ✓ Required
Firefox              Latest 2     ✓ Required
Safari               Latest 2     ✓ Required
Edge                 Latest 2     ✓ Required
Safari (macOS)       14+          ✓ Required

MOBILE BROWSERS:
───────────────────────────────────────────────────────────────

Browser              Version      Status
─────────────────────────────────────────
Safari (iOS)         14+          ✓ Required
Chrome (Android)     Latest       ✓ Required
Samsung Internet     Latest       ✓ Required
Firefox (Android)    Latest       ○ Nice to have

FEATURES REQUIRING FALLBACKS:
───────────────────────────────────────────────────────────────

Feature              Fallback
─────────────────────────────────────────
CSS :has()           JavaScript check
CSS container-type   Media queries
backdrop-filter      Solid background
scroll-snap          Graceful degradation
CSS gap (flexbox)    Margins

═══════════════════════════════════════════════════════════════
```

---

## Appendix A: Filter Configuration Quick Reference

```
QUICK REFERENCE — ALL FILTER CONFIGURATIONS
═══════════════════════════════════════════════════════════════

STORE FILTERS (RETAIL):
───────────────────────────────────────────────────────────────

ID            TYPE              DB FIELD                PRIORITY
─────────────────────────────────────────────────────────────────
brand         search-select     store_brands            high
grade         multi-select      grades_stocked          high
delivery      checkbox-group    offers_*_delivery       high
finance       checkbox-group    offers_*_finance        medium
warranty      single-select     warranty_months         medium
price         range-slider      store_categories.*      medium
services      checkbox-group    offers_*                low
verified      toggle            status                  low

PROVIDER FILTERS (REPAIR):
───────────────────────────────────────────────────────────────

ID             TYPE             DB FIELD                PRIORITY
─────────────────────────────────────────────────────────────────
availability   checkbox-group   offers_*                high
trust          checkbox-group   no_fix_no_fee, etc.     high
certifications checkbox-group   gas_safe_*, fgas_*, etc high
brand          single-select    provider_brand_auth     medium
warranty       single-select    warranty_on_repairs_*   medium
callout        range-slider     callout_fee_from        low

CITY HUB FILTERS:
───────────────────────────────────────────────────────────────

ID            TYPE              DB FIELD                PRIORITY
─────────────────────────────────────────────────────────────────
category      single-select     store_categories        high
brand         single-select     store_brands            high
features      checkbox-group    offers_*                medium

═══════════════════════════════════════════════════════════════
```

---

## Appendix B: Component File Index

```
COMPONENT FILE INDEX
═══════════════════════════════════════════════════════════════

CONTEXT & HOOKS:
contexts/FilterContext.tsx ............. Main filter state provider
hooks/useFilters.ts .................... Filter state hook
hooks/useFilterCounts.ts ............... Filter count computation
hooks/useDebounce.ts ................... Debounce utility
hooks/useFocusTrap.ts .................. Modal focus management
hooks/usePrefersReducedMotion.ts ....... Motion preference
hooks/useScreenReaderAnnounce.ts ....... SR announcements

COMPONENTS - DESKTOP:
components/filters/FilterBar.tsx ....... Desktop filter bar
components/filters/FilterDropdown.tsx .. Dropdown component
components/filters/FilterCheckboxGroup.tsx .. Checkbox group
components/filters/FilterRangeSlider.tsx ... Range slider
components/filters/FilterToggle.tsx .... Toggle switch
components/filters/SortDropdown.tsx .... Sort selector
components/filters/ClearFiltersButton.tsx .. Clear button

COMPONENTS - MOBILE:
components/filters/FilterMobile.tsx .... Mobile filter system
components/filters/QuickFilterChips.tsx  Quick filter chips
components/filters/FilterSheet.tsx ..... Bottom sheet modal
components/filters/FilterSection.tsx ... Collapsible section
components/filters/SortSheet.tsx ....... Sort bottom sheet

COMPONENTS - SHARED:
components/filters/FilterResultsBar.tsx  Results count bar
components/filters/FilterTag.tsx ....... Active filter tag
components/filters/EmptyFilterState.tsx  Empty state

UTILITIES:
lib/filters/urlUtils.ts ................ URL parsing/building
lib/filters/clientFilter.ts ............ Client-side filtering
lib/filters/supabaseQueryBuilder.ts .... Server-side queries

CONFIG:
config/filters/storeFilters.ts ......... Store filter config
config/filters/providerFilters.ts ...... Provider filter config
config/filters/cityHubFilters.ts ....... City hub filter config

TYPES:
types/filters.ts ....................... Filter type definitions

═══════════════════════════════════════════════════════════════
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial specification |

---

**END OF SPECIFICATION**
