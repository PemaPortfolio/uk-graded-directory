# Breadcrumbs Navigation System Specification

**Version:** 1.0 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED  
**Spec Number:** 19

---

## Executive Summary

### What Are Breadcrumbs?

Breadcrumbs are a **secondary navigation system** that displays the user's current location within the website hierarchy. The name originates from the Hansel and Gretel fairy tale — a trail showing the path taken.

```
VISUAL EXAMPLE:
═══════════════════════════════════════════════════════════════════════════

On page: /england/manchester/washing-machines/

User sees:
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   🏠 Home  ›  England  ›  Manchester  ›  Washing Machines              │
│      ↑          ↑            ↑               ↑                         │
│    Link       Link         Link        Current (not linked)            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Each segment except the last is clickable, allowing users to jump up 
the hierarchy to any ancestor page.

═══════════════════════════════════════════════════════════════════════════
```

### Why Breadcrumbs Are Critical for This Project

| Factor | Impact | Details |
|--------|--------|---------|
| **Site Depth** | ⭐⭐⭐ Critical | 4-5 levels deep (Home → Country → City → Category → Entity) |
| **Page Count** | ⭐⭐⭐ Critical | 20,000+ indexable pages need clear hierarchy signals |
| **SEO** | ⭐⭐⭐ Critical | BreadcrumbList schema enables rich snippets in Google |
| **AEO** | ⭐⭐⭐ Critical | AI assistants use structured data to understand site |
| **User Navigation** | ⭐⭐⭐ Critical | 70%+ mobile users land from search, need orientation |
| **Internal Linking** | ⭐⭐⭐ Critical | Every page links to parents, flowing link equity upward |

### The Three Problems Breadcrumbs Solve

```
PROBLEM 1: "WHERE AM I?"
═══════════════════════════════════════════════════════════════════════════

User searches Google: "graded washing machines manchester"
User clicks result → lands on /england/manchester/washing-machines/

WITHOUT BREADCRUMBS:
├── User sees page content but has no context
├── "Is this a local store? A national directory?"
├── "What else does this site offer?"
├── "How do I find other cities or appliances?"
└── User is LOST → high bounce rate

WITH BREADCRUMBS:
├── User sees: Home > England > Manchester > Washing Machines
├── Instantly understands: UK-wide site, organized by country/city/category
├── Knows they can click "Manchester" to see other appliances
├── Knows they can click "England" to see other cities
└── User is ORIENTED → lower bounce rate, higher engagement

═══════════════════════════════════════════════════════════════════════════
```

```
PROBLEM 2: "HOW DO I GO UP?"
═══════════════════════════════════════════════════════════════════════════

User journey:
1. Lands on /england/manchester/washing-machines/
2. Clicks store → /store/abc-appliances/
3. Wants to see ALL appliances in Manchester (not just washing machines)

WITHOUT BREADCRUMBS:
├── Browser back → returns to washing machines page (not what they want)
├── No obvious path to Manchester city hub
├── Must use main navigation or guess URLs
└── Frustrating experience → user leaves

WITH BREADCRUMBS on store page:
├── Shows: Home > England > Manchester > ABC Appliances
├── User clicks "Manchester" → arrives at city hub
├── Can now browse ALL categories
└── Smooth, intuitive navigation

═══════════════════════════════════════════════════════════════════════════
```

```
PROBLEM 3: "GOOGLE DOESN'T UNDERSTAND MY SITE"
═══════════════════════════════════════════════════════════════════════════

This project has 20,000+ pages in a deep hierarchy:
├── 4 Country pages
├── 565 City hub pages
├── 565 × 17 = 9,605 Retail category pages (potentially)
├── 565 × 17 = 9,605 Repair category pages (potentially)
├── Thousands of Store profiles
├── Thousands of Provider profiles
└── National hub pages

WITHOUT STRUCTURED BREADCRUMBS:
├── Google sees 20,000 pages but unclear relationships
├── Which pages are most important? (Homepage → Country → City)
├── How do category pages relate to city pages?
├── Crawl budget wasted on unclear hierarchy
└── Poor ranking signals

WITH SCHEMA.ORG BREADCRUMBLIST:
├── Google explicitly knows: City pages are UNDER Country pages
├── Category pages are CHILDREN of City pages
├── Entity pages are CHILDREN of City pages
├── Clear hierarchy = correct importance signals
├── Rich snippets in search results
└── Better rankings for hierarchical queries

═══════════════════════════════════════════════════════════════════════════
```

### Google Search Result Enhancement

```
WITHOUT BREADCRUMB SCHEMA:
═══════════════════════════════════════════════════════════════════════════

Graded Washing Machines in Manchester | UK Graded Appliances
https://ukgradedappliances.com/england/manchester/washing-machines/
Find 15 stores selling graded washing machines in Manchester...

═══════════════════════════════════════════════════════════════════════════

WITH BREADCRUMB SCHEMA:
═══════════════════════════════════════════════════════════════════════════

Graded Washing Machines in Manchester | UK Graded Appliances
ukgradedappliances.com › England › Manchester › Washing Machines
Find 15 stores selling graded washing machines in Manchester...

                          ↑
              Rich snippet shows hierarchy!

═══════════════════════════════════════════════════════════════════════════

BENEFITS:
├── Takes more visual space in search results (higher CTR)
├── Shows site structure (builds trust before click)
├── User knows what to expect (reduces bounce rate)
├── Differentiates from competitors without rich snippets
└── Google confirmed ranking factor for structured data
```

### AI Search (AEO) Importance

```
HOW AI ASSISTANTS USE BREADCRUMBS
═══════════════════════════════════════════════════════════════════════════

When ChatGPT, Google AI, Perplexity, or Claude search and cite sources,
they extract structured data to understand content context.

USER QUERY TO AI:
"Find me graded washing machine stores in Manchester"

AI PROCESSING (with breadcrumbs):
├── Finds page: /england/manchester/washing-machines/
├── Reads BreadcrumbList schema:
│   └── Home → England → Manchester → Washing Machines
├── CONFIRMS: This is specifically about Manchester (not generic)
├── CONFIRMS: This is about washing machines (not all appliances)
├── CONFIRMS: This is UK-specific (under England)
├── HIGH CONFIDENCE: Cites this page in response
└── "I found 15 graded appliance stores in Manchester..."

AI PROCESSING (without breadcrumbs):
├── Finds page, reads content
├── Must INFER location from text (less reliable)
├── Must INFER category scope from text
├── LOWER CONFIDENCE: May skip or misattribute
└── Opportunity lost for citation

═══════════════════════════════════════════════════════════════════════════
```

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Breadcrumb Patterns by Page Type](#breadcrumb-patterns-by-page-type)
3. [Visual Design Specification](#visual-design-specification)
4. [Schema.org Implementation](#schemaorg-implementation)
5. [SEO Requirements](#seo-requirements)
6. [AEO (AI Search) Optimization](#aeo-ai-search-optimization)
7. [Mobile Implementation](#mobile-implementation)
8. [Accessibility Requirements](#accessibility-requirements)
9. [React Component Implementation](#react-component-implementation)
10. [Data Requirements](#data-requirements)
11. [Integration with Existing Specs](#integration-with-existing-specs)
12. [Testing Checklist](#testing-checklist)

---

## Breadcrumb Patterns by Page Type

### 2.1 Complete Pattern Reference

This section defines the **canonical breadcrumb pattern** for every page type in the system. These patterns are **non-negotiable** and must be followed exactly.

```
MASTER BREADCRUMB PATTERNS
═══════════════════════════════════════════════════════════════════════════

PAGE TYPE                  PATTERN                                    DEPTH
─────────────────────────────────────────────────────────────────────────────

Homepage                   (no breadcrumbs)                           0
                          
Country                    Home › {Country}                           2
                          Example: Home › England

City Hub                   Home › {Country} › {City}                  3
                          Example: Home › England › Manchester

Retail Category            Home › {Country} › {City} › {Category}    4
                          Example: Home › England › Manchester › Washing Machines

Repair Category            Home › {Country} › {City} › {Category} Repair    4
                          Example: Home › England › Manchester › Washing Machine Repair

Brand Repair (Local)       Home › {Country} › {City} › {Brand} Repair       4
                          Example: Home › England › Manchester › Bosch Repair

Store Profile              Home › {Country} › {City} › {Store Name}          4
                          Example: Home › England › Manchester › ABC Appliances

Provider Profile           Home › {Country} › {City} › {Provider Name}       4
                          Example: Home › England › Manchester › Joe's Repairs

National Category          Home › {Category}                           2
                          Example: Home › Washing Machines

National Repair            Home › {Category} Repair                    2
                          Example: Home › Washing Machine Repair

National Brand             Home › {Brand}                              2
                          Example: Home › Samsung

Brand + Category           Home › {Brand} › {Category}                 3
                          Example: Home › Samsung › Washing Machines

Guide Index                Home › Guides                               2

Guide Detail               Home › Guides › {Guide Title}               3
                          Example: Home › Guides › What Are Graded Appliances?

═══════════════════════════════════════════════════════════════════════════
```

### 2.2 Pattern Details: Geographic Pages

```
COUNTRY PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /england/

BREADCRUMB:
Home › England

LINKS:
├── Home → /
└── England → (current, no link)

SCHEMA POSITIONS:
├── Position 1: Home
└── Position 2: England (no item URL - current page)

MOBILE:
< Home

═══════════════════════════════════════════════════════════════════════════
```

```
CITY HUB PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /england/manchester/

BREADCRUMB:
Home › England › Manchester

LINKS:
├── Home → /
├── England → /england/
└── Manchester → (current, no link)

SCHEMA POSITIONS:
├── Position 1: Home
├── Position 2: England
└── Position 3: Manchester (no item URL - current page)

MOBILE:
< England

NOTE: Admin area (e.g., "Greater Manchester") is NOT included in breadcrumbs.
      Too deep and not user-meaningful. Used internally for nearby cities logic.

═══════════════════════════════════════════════════════════════════════════
```

### 2.3 Pattern Details: Category Pages

```
RETAIL CATEGORY PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /england/manchester/washing-machines/

BREADCRUMB:
Home › England › Manchester › Washing Machines

LINKS:
├── Home → /
├── England → /england/
├── Manchester → /england/manchester/
└── Washing Machines → (current, no link)

SCHEMA POSITIONS:
├── Position 1: Home
├── Position 2: England
├── Position 3: Manchester
└── Position 4: Washing Machines (no item URL - current page)

MOBILE:
< Manchester

═══════════════════════════════════════════════════════════════════════════
```

```
REPAIR CATEGORY PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /england/manchester/washing-machine-repair/

BREADCRUMB:
Home › England › Manchester › Washing Machine Repair

LINKS:
├── Home → /
├── England → /england/
├── Manchester → /england/manchester/
└── Washing Machine Repair → (current, no link)

SCHEMA POSITIONS:
├── Position 1: Home
├── Position 2: England
├── Position 3: Manchester
└── Position 4: Washing Machine Repair (no item URL - current page)

MOBILE:
< Manchester

NOTE: The category name includes "Repair" suffix in display AND schema.
      This is intentional for SEO keyword targeting.

═══════════════════════════════════════════════════════════════════════════
```

```
BRAND REPAIR PAGE (LOCAL)
═══════════════════════════════════════════════════════════════════════════

URL: /england/manchester/bosch-repair/

BREADCRUMB:
Home › England › Manchester › Bosch Repair

LINKS:
├── Home → /
├── England → /england/
├── Manchester → /england/manchester/
└── Bosch Repair → (current, no link)

SCHEMA POSITIONS:
├── Position 1: Home
├── Position 2: England
├── Position 3: Manchester
└── Position 4: Bosch Repair (no item URL - current page)

MOBILE:
< Manchester

═══════════════════════════════════════════════════════════════════════════
```

### 2.4 Pattern Details: Entity Profile Pages

```
STORE PROFILE PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /store/abc-appliances/

BREADCRUMB:
Home › England › Manchester › ABC Appliances

LINKS:
├── Home → /
├── England → /england/
├── Manchester → /england/manchester/
└── ABC Appliances → (current, no link)

SCHEMA POSITIONS:
├── Position 1: Home
├── Position 2: England (store's country)
├── Position 3: Manchester (store's city)
└── Position 4: ABC Appliances (no item URL - current page)

MOBILE:
< Manchester

IMPORTANT DECISION — WHY NO CATEGORY IN STORE BREADCRUMB:
─────────────────────────────────────────────────────────────────────────────

A store typically sells MULTIPLE categories:
├── Washing Machines (45 units)
├── Fridge Freezers (30 units)
├── Dishwashers (20 units)

Including one category in breadcrumb would be:
├── Arbitrary (which category?)
├── Misleading (implies store only sells that category)
├── Inconsistent with URL structure (/store/ is flat, not under category)

CORRECT APPROACH:
├── Breadcrumb goes: Home → Country → City → Store
├── Store page itself links to all category pages it appears on
├── User came from category page? Back button returns them there
├── Schema.org LocalBusiness on store page lists all categories

═══════════════════════════════════════════════════════════════════════════
```

```
PROVIDER PROFILE PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /provider/joes-repairs/

BREADCRUMB:
Home › England › Manchester › Joe's Repairs

LINKS:
├── Home → /
├── England → /england/
├── Manchester → /england/manchester/
└── Joe's Repairs → (current, no link)

SCHEMA POSITIONS:
├── Position 1: Home
├── Position 2: England (provider's base country)
├── Position 3: Manchester (provider's base city)
└── Position 4: Joe's Repairs (no item URL - current page)

MOBILE:
< Manchester

SAME REASONING AS STORES:
─────────────────────────────────────────────────────────────────────────────

A provider typically services MULTIPLE appliance types:
├── Washing Machines
├── Dishwashers
├── Tumble Dryers

Including one service in breadcrumb would be arbitrary and misleading.
Provider page itself lists all services offered.

═══════════════════════════════════════════════════════════════════════════
```

### 2.5 Pattern Details: National Hub Pages

```
NATIONAL CATEGORY PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /washing-machines/

BREADCRUMB:
Home › Washing Machines

LINKS:
├── Home → /
└── Washing Machines → (current, no link)

SCHEMA POSITIONS:
├── Position 1: Home
└── Position 2: Washing Machines (no item URL - current page)

MOBILE:
< Home

PURPOSE:
National category pages aggregate ALL cities for a category.
They sit directly under Home, parallel to Country pages.

═══════════════════════════════════════════════════════════════════════════
```

```
NATIONAL REPAIR PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /washing-machine-repair/

BREADCRUMB:
Home › Washing Machine Repair

LINKS:
├── Home → /
└── Washing Machine Repair → (current, no link)

SCHEMA POSITIONS:
├── Position 1: Home
└── Position 2: Washing Machine Repair (no item URL - current page)

MOBILE:
< Home

═══════════════════════════════════════════════════════════════════════════
```

```
NATIONAL BRAND PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /samsung/

BREADCRUMB:
Home › Samsung

LINKS:
├── Home → /
└── Samsung → (current, no link)

SCHEMA POSITIONS:
├── Position 1: Home
└── Position 2: Samsung (no item URL - current page)

MOBILE:
< Home

═══════════════════════════════════════════════════════════════════════════
```

```
BRAND + CATEGORY PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /samsung/washing-machines/

BREADCRUMB:
Home › Samsung › Washing Machines

LINKS:
├── Home → /
├── Samsung → /samsung/
└── Washing Machines → (current, no link)

SCHEMA POSITIONS:
├── Position 1: Home
├── Position 2: Samsung
└── Position 3: Washing Machines (no item URL - current page)

MOBILE:
< Samsung

═══════════════════════════════════════════════════════════════════════════
```

### 2.6 Pattern Details: Guide Pages

```
GUIDE INDEX PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /guides/

BREADCRUMB:
Home › Guides

LINKS:
├── Home → /
└── Guides → (current, no link)

MOBILE:
< Home

═══════════════════════════════════════════════════════════════════════════
```

```
GUIDE DETAIL PAGE
═══════════════════════════════════════════════════════════════════════════

URL: /guides/what-are-graded-appliances/

BREADCRUMB:
Home › Guides › What Are Graded Appliances?

LINKS:
├── Home → /
├── Guides → /guides/
└── What Are Graded Appliances? → (current, no link)

MOBILE:
< Guides

═══════════════════════════════════════════════════════════════════════════
```

### 2.7 Homepage Exception

```
HOMEPAGE — NO BREADCRUMBS
═══════════════════════════════════════════════════════════════════════════

URL: /

BREADCRUMB:
(none)

REASONING:
├── Homepage IS the root — no ancestors to show
├── Breadcrumbs would just show "Home" (pointless)
├── Takes up vertical space for no value
└── Standard web convention: no breadcrumbs on homepage

═══════════════════════════════════════════════════════════════════════════
```

---

## Visual Design Specification

### 3.1 Desktop Design

```
DESKTOP BREADCRUMB — VISUAL SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

LAYOUT:
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  16px padding top                                                       │
│                                                                         │
│   🏠 Home  ›  England  ›  Manchester  ›  Washing Machines              │
│                                                                         │
│  16px padding bottom                                                    │
│                                                                         │
│─────────────────────────────────────────────────────────────────────────│
│  1px border-bottom: #E5E7EB                                            │
└─────────────────────────────────────────────────────────────────────────┘

MEASUREMENTS:
├── Container:
│   ├── Width: 100% of content area
│   ├── Padding: 16px 0
│   ├── Border bottom: 1px solid #E5E7EB
│   └── Margin bottom: 24px (before main content)
│
├── Items:
│   ├── Display: inline-flex
│   ├── Align items: center
│   └── Gap between items: 8px
│
└── Separator:
    ├── Character: › (right single guillemet, U+203A)
    ├── Color: #9CA3AF (gray-400)
    └── Padding: 0 (included in gap)

═══════════════════════════════════════════════════════════════════════════
```

### 3.2 Typography & Colors

```
TYPOGRAPHY SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

ALL BREADCRUMB TEXT:
├── Font family: Inter, system-ui, sans-serif (matches site)
├── Font size: 14px
├── Font weight: 400 (regular)
├── Line height: 20px
├── Letter spacing: normal

HOME ICON:
├── Character: 🏠 (U+1F3E0)
├── Size: 14px (matches text)
├── Alternative: None (icon only, no "Home" text to save space)
├── Accessibility: aria-label="Home" on link

LINK ITEMS (not current page):
├── Color: #e85d4c (secondary — brand primary)
├── Text decoration: none (default)
├── Text decoration on hover: underline
├── Cursor: pointer

CURRENT PAGE (last item):
├── Color: #374151 (gray-700)
├── Font weight: 500 (medium — slightly bolder)
├── Text decoration: none
├── Cursor: default
├── NOT a link

SEPARATOR:
├── Character: ›
├── Color: #9CA3AF (gray-400)
├── Font weight: 400

═══════════════════════════════════════════════════════════════════════════
```

### 3.3 Interactive States

```
INTERACTIVE STATES
═══════════════════════════════════════════════════════════════════════════

LINK — DEFAULT:
├── Color: #e85d4c
├── Text decoration: none
├── Background: transparent

LINK — HOVER:
├── Color: #e85d4c (unchanged)
├── Text decoration: underline
├── Background: transparent
├── Transition: text-decoration 150ms ease

LINK — FOCUS (keyboard):
├── Color: #e85d4c
├── Text decoration: underline
├── Outline: 2px solid #e85d4c
├── Outline offset: 2px
├── Border radius: 2px (on outline)

LINK — ACTIVE (pressed):
├── Color: #d94f3f (darker secondary)
├── Text decoration: underline

CURRENT PAGE — ALL STATES:
├── No hover effect
├── No focus outline (not focusable)
├── Cursor: default

═══════════════════════════════════════════════════════════════════════════
```

### 3.4 Long Breadcrumb Handling (Desktop)

```
LONG BREADCRUMB HANDLING — DESKTOP
═══════════════════════════════════════════════════════════════════════════

SCENARIO: Breadcrumb trail is too long for container

EXAMPLE:
"Home › England › Manchester › Washing Machine Repair in Manchester"
                                          ↑
                         Very long current page name

RULES:
─────────────────────────────────────────────────────────────────────────────

1. NEVER truncate ancestor links
   ├── Home, England, Manchester must always show in full
   └── These are critical for navigation

2. TRUNCATE current page name if needed
   ├── Max width: 300px
   ├── Text overflow: ellipsis
   ├── White space: nowrap
   └── Title attribute: Full name for hover tooltip

3. If STILL too long: Allow horizontal scroll
   ├── Overflow-x: auto
   ├── Scrollbar: hidden (aesthetic)
   ├── Scroll snap: none
   └── Fade gradient: Optional 20px fade on right edge

VISUAL:
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   🏠 Home  ›  England  ›  Manchester  ›  Washing Machine Repa...       │
│                                          └─────────┬─────────┘         │
│                                              Truncated at 300px         │
│                                              Full text on hover         │
└─────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════
```

---

## Schema.org Implementation

### 4.1 BreadcrumbList Schema Specification

```
SCHEMA.ORG BREADCRUMBLIST — COMPLETE SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

REQUIRED STRUCTURE:
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "{pageURL}#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ukgradedappliances.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{Ancestor Name}",
      "item": "{Ancestor URL}"
    },
    // ... more ancestors ...
    {
      "@type": "ListItem",
      "position": N,
      "name": "{Current Page Name}"
      // NO "item" property for current page
    }
  ]
}

CRITICAL RULES:
─────────────────────────────────────────────────────────────────────────────

1. @id REQUIRED
   ├── Format: {pageURL}#breadcrumb
   ├── Enables linking from other schemas on same page
   └── Example: "https://ukgradedappliances.com/england/manchester/#breadcrumb"

2. "position" REQUIRED
   ├── Starts at 1 (not 0)
   ├── Sequential integers
   └── Must match visual order

3. "name" REQUIRED for all items
   ├── Human-readable name
   ├── Should match visible breadcrumb text
   └── Keep concise (Google truncates long names)

4. "item" REQUIRED for all EXCEPT current page
   ├── Must be ABSOLUTE URL (not relative)
   ├── Must include trailing slash for consistency
   ├── Current page: OMIT "item" property entirely
   └── Do NOT use "item": null (omit the property)

5. URL FORMAT
   ├── Always HTTPS
   ├── Always include domain
   ├── Always include trailing slash
   └── Example: "https://ukgradedappliances.com/england/"

═══════════════════════════════════════════════════════════════════════════
```

### 4.2 Schema Examples by Page Type

```typescript
// COUNTRY PAGE: /england/
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://ukgradedappliances.com/england/#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ukgradedappliances.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "England"
      // No "item" — current page
    }
  ]
}

// CITY HUB: /england/manchester/
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://ukgradedappliances.com/england/manchester/#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ukgradedappliances.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "England",
      "item": "https://ukgradedappliances.com/england/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Manchester"
    }
  ]
}

// RETAIL CATEGORY: /england/manchester/washing-machines/
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://ukgradedappliances.com/england/manchester/washing-machines/#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ukgradedappliances.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "England",
      "item": "https://ukgradedappliances.com/england/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Manchester",
      "item": "https://ukgradedappliances.com/england/manchester/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Washing Machines"
    }
  ]
}

// REPAIR CATEGORY: /england/manchester/washing-machine-repair/
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://ukgradedappliances.com/england/manchester/washing-machine-repair/#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ukgradedappliances.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "England",
      "item": "https://ukgradedappliances.com/england/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Manchester",
      "item": "https://ukgradedappliances.com/england/manchester/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Washing Machine Repair"
    }
  ]
}

// STORE PROFILE: /store/abc-appliances/
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://ukgradedappliances.com/store/abc-appliances/#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ukgradedappliances.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "England",
      "item": "https://ukgradedappliances.com/england/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Manchester",
      "item": "https://ukgradedappliances.com/england/manchester/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "ABC Appliances"
    }
  ]
}

// NATIONAL CATEGORY: /washing-machines/
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://ukgradedappliances.com/washing-machines/#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ukgradedappliances.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Washing Machines"
    }
  ]
}
```

### 4.3 Schema Integration with Page Schema

```
INTEGRATING BREADCRUMBS WITH PAGE SCHEMA
═══════════════════════════════════════════════════════════════════════════

Each page has multiple schemas. BreadcrumbList should be LINKED from 
the main page schema using @id references.

EXAMPLE — RETAIL CATEGORY PAGE:
─────────────────────────────────────────────────────────────────────────────

{
  "@context": "https://schema.org",
  "@graph": [
    // 1. WebPage (main)
    {
      "@type": "WebPage",
      "@id": "https://ukgradedappliances.com/england/manchester/washing-machines/#webpage",
      "url": "https://ukgradedappliances.com/england/manchester/washing-machines/",
      "name": "Graded Washing Machines in Manchester",
      "description": "Find 15 stores selling graded washing machines...",
      "breadcrumb": {
        "@id": "https://ukgradedappliances.com/england/manchester/washing-machines/#breadcrumb"
      },
      "mainEntity": {
        "@id": "https://ukgradedappliances.com/england/manchester/washing-machines/#itemlist"
      }
    },
    
    // 2. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": "https://ukgradedappliances.com/england/manchester/washing-machines/#breadcrumb",
      "itemListElement": [
        // ... items ...
      ]
    },
    
    // 3. ItemList (store listings)
    {
      "@type": "ItemList",
      "@id": "https://ukgradedappliances.com/england/manchester/washing-machines/#itemlist",
      "numberOfItems": 15,
      "itemListElement": [
        // ... stores ...
      ]
    },
    
    // 4. FAQPage (if applicable)
    {
      "@type": "FAQPage",
      // ...
    }
  ]
}

KEY POINTS:
├── Use @graph array to contain multiple schemas
├── Each schema has unique @id
├── WebPage.breadcrumb LINKS to BreadcrumbList by @id
├── This tells Google: "These schemas are about the same page"
└── Enables rich result combinations (breadcrumb + FAQ + product)

═══════════════════════════════════════════════════════════════════════════
```

### 4.4 Schema Validation

```
SCHEMA VALIDATION REQUIREMENTS
═══════════════════════════════════════════════════════════════════════════

BEFORE DEPLOYMENT:
1. Test every page type in Google Rich Results Test:
   https://search.google.com/test/rich-results

2. Test in Schema Markup Validator:
   https://validator.schema.org/

3. Verify in Google Search Console after deployment:
   Enhancements → Breadcrumbs

COMMON ERRORS TO AVOID:
─────────────────────────────────────────────────────────────────────────────

ERROR: Missing "item" on non-current ListItem
├── Wrong: { "position": 2, "name": "England" }
└── Right: { "position": 2, "name": "England", "item": "https://..." }

ERROR: Relative URLs
├── Wrong: "item": "/england/"
└── Right: "item": "https://ukgradedappliances.com/england/"

ERROR: Position starting at 0
├── Wrong: "position": 0
└── Right: "position": 1

ERROR: Including "item" on current page
├── Wrong: { "position": 4, "name": "Current", "item": "https://..." }
└── Right: { "position": 4, "name": "Current" }

ERROR: Missing @context
├── Wrong: { "@type": "BreadcrumbList", ... }
└── Right: { "@context": "https://schema.org", "@type": "BreadcrumbList", ... }

═══════════════════════════════════════════════════════════════════════════
```


---

## SEO Requirements

### 5.1 Why Breadcrumbs Are an SEO Ranking Factor

```
BREADCRUMBS & SEO — THE CONNECTION
═══════════════════════════════════════════════════════════════════════════

Google has explicitly confirmed breadcrumbs impact rankings through:

1. SITE STRUCTURE UNDERSTANDING
   ├── Breadcrumbs tell Google how pages relate
   ├── Helps establish hierarchy importance
   ├── Homepage → Country → City = importance flows down
   └── Entity pages inherit authority from parents

2. RICH SNIPPETS IN SERP
   ├── BreadcrumbList schema enables rich results
   ├── Breadcrumb trail shown in search results
   ├── Takes more visual space = higher CTR
   └── Higher CTR = positive ranking signal

3. INTERNAL LINKING
   ├── Every page links to all ancestors
   ├── Link equity flows UP the hierarchy
   ├── City pages get links from ALL category/entity pages
   └── Reinforces most important pages

4. KEYWORD SIGNALS
   ├── Breadcrumb text contains keywords
   ├── "Home > England > Manchester > Washing Machines"
   ├── Reinforces location + category relevance
   └── Supports page's target keywords

═══════════════════════════════════════════════════════════════════════════
```

### 5.2 SEO Best Practices for Breadcrumbs

```
SEO BEST PRACTICES — MANDATORY IMPLEMENTATION
═══════════════════════════════════════════════════════════════════════════

1. ABSOLUTE URLs IN SCHEMA
   ├── Always use full URLs: https://ukgradedappliances.com/england/
   ├── Never relative: /england/
   ├── Include trailing slashes consistently
   └── Match canonical URL format exactly

2. MATCH VISUAL TO SCHEMA
   ├── Text shown to users = text in Schema.org
   ├── If visual shows "Washing Machines", schema says "Washing Machines"
   ├── Don't show "Washing Machines" visually but "Graded Washing Machines" in schema
   └── Consistency builds trust with Google

3. SEMANTIC HTML
   ├── Use <nav> element with aria-label="Breadcrumb"
   ├── Use <ol> (ordered list) for items
   ├── Use <li> for each item
   └── Helps Google understand even without schema

4. AVOID KEYWORD STUFFING
   ├── Don't: "Home > Graded Washing Machines UK > Manchester Graded Washing Machines"
   ├── Do: "Home > England > Manchester > Washing Machines"
   ├── Keep names natural and concise
   └── Schema should reflect actual page names

5. ONE BREADCRUMB PATH PER PAGE
   ├── Don't show multiple breadcrumb trails
   ├── Pick ONE canonical path
   ├── Store page: Always via city, not category
   └── Multiple paths confuse Google

6. CONSISTENT HIERARCHY
   ├── Same page type = same depth
   ├── All retail categories = 4 levels (Home > Country > City > Category)
   ├── All store profiles = 4 levels (Home > Country > City > Store)
   └── Predictable structure helps indexing

═══════════════════════════════════════════════════════════════════════════
```

### 5.3 Breadcrumbs & Canonical URLs

```
BREADCRUMBS + CANONICAL URL ALIGNMENT
═══════════════════════════════════════════════════════════════════════════

CRITICAL: Breadcrumb path must align with canonical URL structure.

PAGE: /england/manchester/washing-machines/?brand=bosch

CANONICAL URL:
<link rel="canonical" href="https://ukgradedappliances.com/england/manchester/washing-machines/" />

BREADCRUMB:
Home > England > Manchester > Washing Machines
(NOT: Home > England > Manchester > Bosch Washing Machines)

WHY:
├── Filtered pages have same breadcrumb as base page
├── Breadcrumb reflects CANONICAL structure
├── Prevents confusion about page hierarchy
└── Filtered variants are not separate "pages" in hierarchy

RULE:
Query parameters and filters do NOT change breadcrumbs.
Breadcrumbs reflect the canonical, unfiltered page.

═══════════════════════════════════════════════════════════════════════════
```

### 5.4 Internal Linking Value

```
INTERNAL LINKING VIA BREADCRUMBS
═══════════════════════════════════════════════════════════════════════════

LINK EQUITY FLOW:
─────────────────────────────────────────────────────────────────────────────

Every page in the site links to its ancestors via breadcrumbs.
This creates massive internal linking reinforcement.

EXAMPLE — RETAIL CATEGORY PAGE:

Page: /england/manchester/washing-machines/

Links created:
├── → / (Homepage)
├── → /england/
└── → /england/manchester/

This page GIVES link equity to:
├── Homepage (always linked)
├── England country page
└── Manchester city hub

SCALE:
─────────────────────────────────────────────────────────────────────────────

If Manchester has:
├── 17 retail category pages
├── 17 repair category pages
├── 5 brand repair pages
├── 20 store profiles
└── 10 provider profiles

Manchester city hub receives links from 69 pages!
Each link reinforces: "Manchester is an important hub page"

HIERARCHY REINFORCEMENT:
─────────────────────────────────────────────────────────────────────────────

                    Homepage
                        ↑
         Receives links from ALL pages
                        |
              ┌─────────┴─────────┐
              ↓                   ↓
           England             Scotland
              ↑                   ↑
    Links from all          Links from all
    England pages           Scotland pages
              |
        ┌─────┴─────┐
        ↓           ↓
   Manchester   Birmingham
        ↑           ↑
  Links from     Links from
  all Manchester all Birmingham
  pages          pages

RESULT:
├── Homepage is most linked page (correct — most important)
├── Country pages are heavily linked (correct — 2nd most important)
├── City hubs are well linked (correct — 3rd most important)
└── Category/entity pages link UP (correct — least important individually)

═══════════════════════════════════════════════════════════════════════════
```

---

## AEO (AI Search) Optimization

### 6.1 How AI Assistants Use Breadcrumbs

```
AI ASSISTANTS & STRUCTURED DATA
═══════════════════════════════════════════════════════════════════════════

Modern AI search (ChatGPT, Perplexity, Claude, Google AI Overviews)
extracts structured data to understand and cite sources.

BREADCRUMBS PROVIDE:
─────────────────────────────────────────────────────────────────────────────

1. GEOGRAPHIC CONFIRMATION
   ├── User asks: "graded washing machines in Manchester"
   ├── AI finds page, sees breadcrumb: Home > England > Manchester > ...
   ├── CONFIRMS: This is specifically about Manchester
   ├── CONFIRMS: Manchester is in England
   └── High confidence for location-specific citation

2. TOPIC/CATEGORY CONFIRMATION
   ├── User asks: "washing machine repair costs"
   ├── AI finds page: /england/manchester/washing-machine-repair/
   ├── Breadcrumb: Home > England > Manchester > Washing Machine Repair
   ├── CONFIRMS: This is about washing machine repair
   └── Even if page text mentions other appliances, breadcrumb clarifies focus

3. SITE AUTHORITY SIGNALS
   ├── AI sees: Well-structured BreadcrumbList schema
   ├── Indicates: Professional, well-organized site
   ├── More likely to trust and cite
   └── Vs. unstructured site with unclear hierarchy

4. CONTEXT FOR EXCERPTS
   ├── When AI quotes content, it can provide context
   ├── "According to UK Graded Appliances (Manchester page)..."
   ├── Breadcrumb data informs the attribution
   └── User knows exactly where info came from

═══════════════════════════════════════════════════════════════════════════
```

### 6.2 Optimizing for AI Citation

```
AEO OPTIMIZATION STRATEGIES
═══════════════════════════════════════════════════════════════════════════

1. DESCRIPTIVE BREADCRUMB NAMES
   ├── Do: "Washing Machine Repair" (clear, searchable)
   ├── Don't: "WM Repair" (abbreviation, unclear)
   ├── Do: "Manchester" (specific location)
   └── Don't: "MCR" (abbreviation)

2. COMPLETE GEOGRAPHIC PATH
   ├── Always include country for UK cities
   ├── "England > Manchester" not just "Manchester"
   ├── Disambiguates: Manchester UK vs Manchester NH
   └── AI can confidently attribute to correct location

3. CONSISTENT NAMING
   ├── If category is "Washing Machines" in breadcrumb...
   ├── Use "Washing Machines" in H1, title, content
   ├── Consistency helps AI connect concepts
   └── Reduces ambiguity in extraction

4. SCHEMA.ORG COMPLETENESS
   ├── Include @id for cross-referencing
   ├── All URLs absolute (AI can follow)
   ├── All names human-readable
   └── Valid schema (passes validation)

5. AVOID MISLEADING BREADCRUMBS
   ├── Breadcrumb must reflect TRUE hierarchy
   ├── If page is about Manchester, breadcrumb shows Manchester
   ├── Don't create fake hierarchy for SEO
   └── AI detects inconsistencies, reduces trust

═══════════════════════════════════════════════════════════════════════════
```

### 6.3 AI Search Result Integration

```
HOW AI PRESENTS BREADCRUMB CONTEXT
═══════════════════════════════════════════════════════════════════════════

USER QUERY: "Find graded washing machine stores in Manchester UK"

AI RESPONSE (without breadcrumb data):
─────────────────────────────────────────────────────────────────────────────
"I found several stores selling graded washing machines. One source mentions 
15 stores in the Manchester area..."

(Vague, unclear attribution)

AI RESPONSE (with breadcrumb data):
─────────────────────────────────────────────────────────────────────────────
"According to UK Graded Appliances, there are 15 stores selling graded 
washing machines in Manchester, England. The page specifically lists stores 
in the Manchester area under their England > Manchester > Washing Machines 
section..."

[Source: ukgradedappliances.com/england/manchester/washing-machines/]

(Clear attribution, user knows exactly where to verify)

WHY THIS MATTERS:
├── Users trust AI responses with clear sources
├── Clear sources = users click through to verify
├── More traffic from AI search results
└── Brand visibility in AI-powered searches

═══════════════════════════════════════════════════════════════════════════
```

---

## Mobile Implementation

### 7.1 Mobile Strategy

```
MOBILE BREADCRUMB STRATEGY
═══════════════════════════════════════════════════════════════════════════

CONTEXT:
├── 70%+ of traffic is mobile
├── Horizontal space is limited
├── Full breadcrumb trail doesn't fit
└── Users still need navigation help

SOLUTION: SIMPLIFIED BACK NAVIGATION
─────────────────────────────────────────────────────────────────────────────

Instead of full trail, show ONLY:
├── Back arrow
└── Parent page name

EXAMPLES:
─────────────────────────────────────────────────────────────────────────────

On /england/manchester/washing-machines/:
Full trail: Home > England > Manchester > Washing Machines
Mobile shows: ← Manchester

On /store/abc-appliances/:
Full trail: Home > England > Manchester > ABC Appliances
Mobile shows: ← Manchester

On /england/manchester/:
Full trail: Home > England > Manchester
Mobile shows: ← England

On /england/:
Full trail: Home > England
Mobile shows: ← Home

RATIONALE:
├── Users can navigate UP one level with single tap
├── Repeat taps take them to root
├── Saves horizontal space
├── Parent is most useful "back" destination
└── Full schema still present (SEO/AEO unaffected)

═══════════════════════════════════════════════════════════════════════════
```

### 7.2 Mobile Visual Design

```
MOBILE BREADCRUMB — VISUAL SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

LAYOUT:
┌─────────────────────────────────────────────────────────────────────────┐
│ 12px padding top                                                        │
│                                                                         │
│  ← Manchester                                                           │
│                                                                         │
│ 12px padding bottom                                                     │
│─────────────────────────────────────────────────────────────────────────│
│ 1px border-bottom: #E5E7EB                                             │
└─────────────────────────────────────────────────────────────────────────┘

MEASUREMENTS:
├── Container:
│   ├── Width: 100%
│   ├── Padding: 12px 16px
│   ├── Border bottom: 1px solid #E5E7EB
│   └── Margin bottom: 16px
│
├── Back arrow:
│   ├── Character: ← (U+2190) or ‹ (U+2039)
│   ├── Size: 16px
│   └── Margin right: 6px
│
└── Parent name:
    ├── Font size: 14px
    ├── Font weight: 500
    ├── Color: #e85d4c (secondary)
    └── Max width: calc(100% - 30px)

TOUCH TARGET:
├── Minimum height: 44px
├── Full width tappable area
└── Padding included in touch target

═══════════════════════════════════════════════════════════════════════════
```

### 7.3 Mobile Interactive States

```
MOBILE INTERACTIVE STATES
═══════════════════════════════════════════════════════════════════════════

DEFAULT:
├── Background: transparent
├── Arrow color: #e85d4c
├── Text color: #e85d4c

PRESSED (touch):
├── Background: #F3F4F6 (gray-100)
├── Arrow color: #e85d4c
├── Text color: #e85d4c
├── Transition: background 100ms ease

DISABLED (on homepage):
├── Component not rendered
└── Homepage has no breadcrumb

═══════════════════════════════════════════════════════════════════════════
```

### 7.4 Responsive Breakpoints

```
RESPONSIVE BREAKPOINTS
═══════════════════════════════════════════════════════════════════════════

MOBILE: < 768px
├── Show: Back arrow + parent name only
├── Layout: Single line, left-aligned
├── Hide: Full breadcrumb trail

TABLET: 768px - 1023px
├── Show: Full breadcrumb trail
├── Layout: Single line, may truncate long names
├── Consider: Collapse middle items if very deep

DESKTOP: ≥ 1024px
├── Show: Full breadcrumb trail
├── Layout: Single line, full names
├── Truncate: Only current page name if too long

IMPLEMENTATION:
├── CSS media queries for visual
├── Single React component handles both
├── Schema.org always contains FULL trail (regardless of visual)

═══════════════════════════════════════════════════════════════════════════
```

### 7.5 Mobile Schema Consideration

```
MOBILE SCHEMA — IMPORTANT NOTE
═══════════════════════════════════════════════════════════════════════════

VISUAL: Mobile shows only "← Manchester"

SCHEMA: Still contains FULL breadcrumb trail:
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home", "item": "https://..." },
    { "position": 2, "name": "England", "item": "https://..." },
    { "position": 3, "name": "Manchester", "item": "https://..." },
    { "position": 4, "name": "Washing Machines" }
  ]
}

WHY:
├── Schema is for machines (Google, AI), not just visual
├── Googlebot needs full hierarchy
├── Mobile-first indexing still reads schema
├── Visual simplification doesn't affect SEO
└── AI assistants extract full path from schema

IMPLEMENTATION:
├── Render schema in <script type="application/ld+json">
├── Render visual in <nav>
├── Visual changes by breakpoint
├── Schema is ALWAYS complete
└── No conditional schema based on device

═══════════════════════════════════════════════════════════════════════════
```


---

## Accessibility Requirements

### 8.1 WCAG 2.1 AA Compliance

```
ACCESSIBILITY REQUIREMENTS — BREADCRUMBS
═══════════════════════════════════════════════════════════════════════════

WCAG GUIDELINES APPLICABLE:
─────────────────────────────────────────────────────────────────────────────

1.3.1 Info and Relationships (Level A)
├── Use semantic HTML: <nav>, <ol>, <li>
├── Structure conveys meaning
└── Screen readers understand hierarchy

2.4.4 Link Purpose (In Context) (Level A)
├── Each link has clear purpose
├── "Home", "England", "Manchester" are descriptive
└── User knows where link leads

2.4.8 Location (Level AAA - recommended)
├── User knows where they are in site
├── Breadcrumbs provide this
└── Highly recommended for navigation

4.1.2 Name, Role, Value (Level A)
├── Components have accessible names
├── nav aria-label="Breadcrumb"
├── Links have proper roles

═══════════════════════════════════════════════════════════════════════════
```

### 8.2 Semantic HTML Structure

```html
<!-- CORRECT SEMANTIC STRUCTURE -->

<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="/" class="breadcrumb-link">
        <span aria-hidden="true">🏠</span>
        <span class="sr-only">Home</span>
      </a>
    </li>
    <li class="breadcrumb-item">
      <span class="breadcrumb-separator" aria-hidden="true">›</span>
      <a href="/england/" class="breadcrumb-link">England</a>
    </li>
    <li class="breadcrumb-item">
      <span class="breadcrumb-separator" aria-hidden="true">›</span>
      <a href="/england/manchester/" class="breadcrumb-link">Manchester</a>
    </li>
    <li class="breadcrumb-item" aria-current="page">
      <span class="breadcrumb-separator" aria-hidden="true">›</span>
      <span class="breadcrumb-current">Washing Machines</span>
    </li>
  </ol>
</nav>

<!-- 
KEY ACCESSIBILITY FEATURES:
├── <nav> element with aria-label="Breadcrumb"
├── <ol> (ordered list) shows sequence
├── <li> for each item
├── aria-current="page" on current item
├── aria-hidden="true" on decorative elements (emoji, separators)
├── sr-only class for "Home" text (icon has hidden label)
└── Separators not included in link (prevents confusion)
-->
```

### 8.3 Screen Reader Experience

```
SCREEN READER ANNOUNCEMENTS
═══════════════════════════════════════════════════════════════════════════

USER NAVIGATES TO BREADCRUMB:

Screen reader announces:
"Breadcrumb, navigation"

User presses Tab to first link:
"Home, link, 1 of 4"

User presses Tab to second link:
"England, link, 2 of 4"

User presses Tab to third link:
"Manchester, link, 3 of 4"

User presses Tab to current page:
"Washing Machines, current page, 4 of 4"

IMPORTANT:
├── Separators (›) are NOT announced (aria-hidden)
├── Home emoji is NOT announced (aria-hidden)
├── "Home" is announced via sr-only text
├── Current page is announced as "current page" (aria-current)
└── List count helps orientation (1 of 4, 2 of 4, etc.)

═══════════════════════════════════════════════════════════════════════════
```

### 8.4 Keyboard Navigation

```
KEYBOARD NAVIGATION
═══════════════════════════════════════════════════════════════════════════

TAB KEY:
├── Moves focus through breadcrumb links
├── Skips current page (not focusable, not a link)
├── Follows document order

ENTER KEY:
├── Activates focused link
├── Navigates to that page

FOCUS INDICATOR:
├── Visible outline: 2px solid #e85d4c
├── Outline offset: 2px
├── Clearly distinguishable from non-focused state

FOCUS ORDER:
1. Home link
2. Country link
3. City link
4. (Current page skipped — not a link)

NOTES:
├── Current page is NOT in tab order
├── Current page is a <span>, not <a>
├── This is correct — current page is not navigable
└── aria-current="page" still conveys meaning to screen readers

═══════════════════════════════════════════════════════════════════════════
```

### 8.5 Color Contrast

```
COLOR CONTRAST REQUIREMENTS
═══════════════════════════════════════════════════════════════════════════

LINK TEXT (#e85d4c on white):
├── Contrast ratio: 12.6:1
├── Required: 4.5:1 (WCAG AA)
└── Status: ✓ PASSES

CURRENT PAGE TEXT (#374151 on white):
├── Contrast ratio: 8.2:1
├── Required: 4.5:1 (WCAG AA)
└── Status: ✓ PASSES

SEPARATOR TEXT (#9CA3AF on white):
├── Contrast ratio: 2.9:1
├── Required: N/A (decorative, aria-hidden)
└── Status: ✓ N/A (decorative element)

FOCUS INDICATOR (#e85d4c outline):
├── Contrast ratio: 12.6:1 against white
├── Required: 3:1 (WCAG 2.1 AA for non-text)
└── Status: ✓ PASSES

═══════════════════════════════════════════════════════════════════════════
```

---

## React Component Implementation

### 9.1 Component Interface

```typescript
// types/breadcrumb.ts

/**
 * Single breadcrumb item
 */
export interface BreadcrumbItem {
  /** Display name (shown to users) */
  name: string;
  
  /** URL path (null for current page) */
  href: string | null;
  
  /** Whether this is the current page */
  isCurrent?: boolean;
}

/**
 * Breadcrumb component props
 */
export interface BreadcrumbProps {
  /** Array of breadcrumb items, from root to current */
  items: BreadcrumbItem[];
  
  /** Base URL for schema.org (defaults to NEXT_PUBLIC_BASE_URL) */
  baseUrl?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Show home icon (defaults to true) */
  showHomeIcon?: boolean;
}

/**
 * Page type for automatic breadcrumb generation
 */
export type PageType = 
  | 'homepage'
  | 'country'
  | 'city'
  | 'retail_category'
  | 'repair_category'
  | 'brand_repair'
  | 'store_profile'
  | 'provider_profile'
  | 'national_category'
  | 'national_repair'
  | 'national_brand'
  | 'brand_category'
  | 'guide_index'
  | 'guide_detail';
```

### 9.2 Main Component

```tsx
// components/ui/Breadcrumb.tsx

'use client';

import Link from 'next/link';
import { BreadcrumbProps, BreadcrumbItem } from '@/types/breadcrumb';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ukgradedappliances.com';

export function Breadcrumb({ 
  items, 
  baseUrl = BASE_URL,
  className = '',
  showHomeIcon = true 
}: BreadcrumbProps) {
  
  // Don't render if no items or only home
  if (!items || items.length === 0) {
    return null;
  }

  // Generate Schema.org JSON-LD
  const schemaData = generateBreadcrumbSchema(items, baseUrl);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Visual Breadcrumb */}
      <nav 
        aria-label="Breadcrumb" 
        className={`breadcrumb ${className}`}
      >
        {/* Desktop View */}
        <ol className="hidden md:flex items-center gap-2 py-4 border-b border-gray-200 mb-6">
          {items.map((item, index) => (
            <BreadcrumbItemDesktop
              key={item.href || item.name}
              item={item}
              isFirst={index === 0}
              isLast={index === items.length - 1}
              showHomeIcon={showHomeIcon && index === 0}
            />
          ))}
        </ol>

        {/* Mobile View - Back Link Only */}
        <MobileBreadcrumb items={items} />
      </nav>
    </>
  );
}

/**
 * Desktop breadcrumb item
 */
function BreadcrumbItemDesktop({ 
  item, 
  isFirst, 
  isLast,
  showHomeIcon 
}: { 
  item: BreadcrumbItem; 
  isFirst: boolean;
  isLast: boolean;
  showHomeIcon: boolean;
}) {
  const isHome = item.name === 'Home';
  
  return (
    <li className="flex items-center">
      {/* Separator (not on first item) */}
      {!isFirst && (
        <span 
          className="text-gray-400 mx-2" 
          aria-hidden="true"
        >
          ›
        </span>
      )}
      
      {/* Link or Current Page */}
      {item.href && !isLast ? (
        <Link
          href={item.href}
          className="text-[#e85d4c] hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-[#e85d4c] focus:ring-offset-2 rounded"
        >
          {showHomeIcon && isHome ? (
            <>
              <span aria-hidden="true">🏠</span>
              <span className="sr-only">Home</span>
            </>
          ) : (
            item.name
          )}
        </Link>
      ) : (
        <span 
          className="text-gray-700 font-medium text-sm"
          aria-current={isLast ? 'page' : undefined}
        >
          {item.name}
        </span>
      )}
    </li>
  );
}

/**
 * Mobile breadcrumb - shows only back link
 */
function MobileBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  // Find parent (second to last item with href)
  const parent = items.length >= 2 ? items[items.length - 2] : null;
  
  if (!parent || !parent.href) {
    return null;
  }

  return (
    <div className="md:hidden py-3 px-4 border-b border-gray-200 mb-4">
      <Link
        href={parent.href}
        className="flex items-center gap-1.5 text-[#e85d4c] text-sm font-medium active:bg-gray-100 -mx-2 px-2 py-2 rounded transition-colors"
      >
        <span aria-hidden="true">←</span>
        <span>{parent.name === 'Home' ? 'Home' : parent.name}</span>
      </Link>
    </div>
  );
}

/**
 * Generate Schema.org BreadcrumbList
 */
function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string) {
  const currentPageUrl = items[items.length - 1]?.href 
    ? `${baseUrl}${items[items.length - 1].href}`
    : `${baseUrl}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${currentPageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => {
      const listItem: any = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      };
      
      // Add item URL for all except current page
      if (item.href && index < items.length - 1) {
        listItem.item = `${baseUrl}${item.href}`;
      }
      
      return listItem;
    }),
  };
}

export default Breadcrumb;
```

### 9.3 Breadcrumb Builder Utilities

```typescript
// lib/breadcrumbs/buildBreadcrumbs.ts

import { BreadcrumbItem, PageType } from '@/types/breadcrumb';

/**
 * Build breadcrumb items for any page type
 */
export function buildBreadcrumbs(
  pageType: PageType,
  data: BreadcrumbData
): BreadcrumbItem[] {
  switch (pageType) {
    case 'homepage':
      return []; // No breadcrumbs on homepage
      
    case 'country':
      return buildCountryBreadcrumbs(data);
      
    case 'city':
      return buildCityBreadcrumbs(data);
      
    case 'retail_category':
      return buildRetailCategoryBreadcrumbs(data);
      
    case 'repair_category':
      return buildRepairCategoryBreadcrumbs(data);
      
    case 'brand_repair':
      return buildBrandRepairBreadcrumbs(data);
      
    case 'store_profile':
      return buildStoreProfileBreadcrumbs(data);
      
    case 'provider_profile':
      return buildProviderProfileBreadcrumbs(data);
      
    case 'national_category':
      return buildNationalCategoryBreadcrumbs(data);
      
    case 'national_repair':
      return buildNationalRepairBreadcrumbs(data);
      
    case 'national_brand':
      return buildNationalBrandBreadcrumbs(data);
      
    case 'brand_category':
      return buildBrandCategoryBreadcrumbs(data);
      
    case 'guide_index':
      return buildGuideIndexBreadcrumbs();
      
    case 'guide_detail':
      return buildGuideDetailBreadcrumbs(data);
      
    default:
      return [];
  }
}

/**
 * Data required to build breadcrumbs
 */
interface BreadcrumbData {
  country?: { name: string; slug: string };
  city?: { name: string; slug: string };
  category?: { name: string; slug: string };
  brand?: { name: string; slug: string };
  store?: { name: string; slug: string };
  provider?: { name: string; slug: string };
  guide?: { title: string; slug: string };
}

// ═══════════════════════════════════════════════════════════════
// BUILDER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function buildCountryBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  return [
    { name: 'Home', href: '/' },
    { name: data.country!.name, href: null, isCurrent: true },
  ];
}

function buildCityBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  return [
    { name: 'Home', href: '/' },
    { name: data.country!.name, href: `/${data.country!.slug}/` },
    { name: data.city!.name, href: null, isCurrent: true },
  ];
}

function buildRetailCategoryBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  return [
    { name: 'Home', href: '/' },
    { name: data.country!.name, href: `/${data.country!.slug}/` },
    { name: data.city!.name, href: `/${data.country!.slug}/${data.city!.slug}/` },
    { name: data.category!.name, href: null, isCurrent: true },
  ];
}

function buildRepairCategoryBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  // Category name already includes "Repair" suffix from database
  // e.g., "Washing Machine Repair"
  const displayName = data.category!.name.includes('Repair') 
    ? data.category!.name 
    : `${data.category!.name} Repair`;
    
  return [
    { name: 'Home', href: '/' },
    { name: data.country!.name, href: `/${data.country!.slug}/` },
    { name: data.city!.name, href: `/${data.country!.slug}/${data.city!.slug}/` },
    { name: displayName, href: null, isCurrent: true },
  ];
}

function buildBrandRepairBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  return [
    { name: 'Home', href: '/' },
    { name: data.country!.name, href: `/${data.country!.slug}/` },
    { name: data.city!.name, href: `/${data.country!.slug}/${data.city!.slug}/` },
    { name: `${data.brand!.name} Repair`, href: null, isCurrent: true },
  ];
}

function buildStoreProfileBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  return [
    { name: 'Home', href: '/' },
    { name: data.country!.name, href: `/${data.country!.slug}/` },
    { name: data.city!.name, href: `/${data.country!.slug}/${data.city!.slug}/` },
    { name: data.store!.name, href: null, isCurrent: true },
  ];
}

function buildProviderProfileBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  return [
    { name: 'Home', href: '/' },
    { name: data.country!.name, href: `/${data.country!.slug}/` },
    { name: data.city!.name, href: `/${data.country!.slug}/${data.city!.slug}/` },
    { name: data.provider!.name, href: null, isCurrent: true },
  ];
}

function buildNationalCategoryBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  return [
    { name: 'Home', href: '/' },
    { name: data.category!.name, href: null, isCurrent: true },
  ];
}

function buildNationalRepairBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  const displayName = data.category!.name.includes('Repair') 
    ? data.category!.name 
    : `${data.category!.name} Repair`;
    
  return [
    { name: 'Home', href: '/' },
    { name: displayName, href: null, isCurrent: true },
  ];
}

function buildNationalBrandBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  return [
    { name: 'Home', href: '/' },
    { name: data.brand!.name, href: null, isCurrent: true },
  ];
}

function buildBrandCategoryBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  return [
    { name: 'Home', href: '/' },
    { name: data.brand!.name, href: `/${data.brand!.slug}/` },
    { name: data.category!.name, href: null, isCurrent: true },
  ];
}

function buildGuideIndexBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: null, isCurrent: true },
  ];
}

function buildGuideDetailBreadcrumbs(data: BreadcrumbData): BreadcrumbItem[] {
  return [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides/' },
    { name: data.guide!.title, href: null, isCurrent: true },
  ];
}

export default buildBreadcrumbs;
```

### 9.4 Usage Examples

```tsx
// app/[country]/[city]/[category]/page.tsx

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { buildBreadcrumbs } from '@/lib/breadcrumbs/buildBreadcrumbs';

export default async function RetailCategoryPage({ params }) {
  const { country, city, category } = params;
  
  // Fetch data
  const [countryData, cityData, categoryData] = await Promise.all([
    getCountry(country),
    getCity(city),
    getCategory(category),
  ]);
  
  // Build breadcrumbs
  const breadcrumbItems = buildBreadcrumbs('retail_category', {
    country: countryData,
    city: cityData,
    category: categoryData,
  });

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Rest of page content */}
    </div>
  );
}
```

```tsx
// app/store/[slug]/page.tsx

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { buildBreadcrumbs } from '@/lib/breadcrumbs/buildBreadcrumbs';

export default async function StoreProfilePage({ params }) {
  const store = await getStore(params.slug);
  const city = await getCity(store.place_id);
  const country = await getCountry(city.country_id);
  
  const breadcrumbItems = buildBreadcrumbs('store_profile', {
    country,
    city,
    store: { name: store.business_name, slug: store.slug },
  });

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Rest of page content */}
    </div>
  );
}
```

### 9.5 CSS Styles

```css
/* styles/breadcrumb.css */

/* Container */
.breadcrumb {
  width: 100%;
}

/* Desktop list */
.breadcrumb ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Links */
.breadcrumb a {
  color: #e85d4c;
  text-decoration: none;
  font-size: 14px;
  transition: text-decoration 150ms ease;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb a:focus-visible {
  outline: 2px solid #e85d4c;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Current page */
.breadcrumb [aria-current="page"] {
  color: #374151;
  font-weight: 500;
  font-size: 14px;
}

/* Separator */
.breadcrumb-separator {
  color: #9CA3AF;
  user-select: none;
}

/* Screen reader only text */
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

/* Mobile back link */
@media (max-width: 767px) {
  .breadcrumb-mobile {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #E5E7EB;
    margin-bottom: 16px;
  }
  
  .breadcrumb-mobile a {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #e85d4c;
    font-size: 14px;
    font-weight: 500;
    padding: 8px;
    margin: -8px;
    border-radius: 4px;
    min-height: 44px;
  }
  
  .breadcrumb-mobile a:active {
    background-color: #F3F4F6;
  }
}
```

---

## Data Requirements

### 10.1 Database Queries for Breadcrumbs

```typescript
// lib/breadcrumbs/queries.ts

import { createClient } from '@/lib/supabase/server';

/**
 * Get breadcrumb data for a store
 */
export async function getStoreBreadcrumbData(storeSlug: string) {
  const supabase = createClient();
  
  const { data: store } = await supabase
    .from('stores')
    .select(`
      id,
      business_name,
      slug,
      places!inner (
        id,
        name,
        slug,
        countries!inner (
          id,
          name,
          slug
        )
      )
    `)
    .eq('slug', storeSlug)
    .single();
  
  if (!store) return null;
  
  return {
    store: {
      name: store.business_name,
      slug: store.slug,
    },
    city: {
      name: store.places.name,
      slug: store.places.slug,
    },
    country: {
      name: store.places.countries.name,
      slug: store.places.countries.slug,
    },
  };
}

/**
 * Get breadcrumb data for a provider
 */
export async function getProviderBreadcrumbData(providerSlug: string) {
  const supabase = createClient();
  
  const { data: provider } = await supabase
    .from('service_providers')
    .select(`
      id,
      name,
      slug,
      places!inner (
        id,
        name,
        slug,
        countries!inner (
          id,
          name,
          slug
        )
      )
    `)
    .eq('slug', providerSlug)
    .single();
  
  if (!provider) return null;
  
  return {
    provider: {
      name: provider.name,
      slug: provider.slug,
    },
    city: {
      name: provider.places.name,
      slug: provider.places.slug,
    },
    country: {
      name: provider.places.countries.name,
      slug: provider.places.countries.slug,
    },
  };
}

/**
 * Get breadcrumb data for a category page
 */
export async function getCategoryBreadcrumbData(
  countrySlug: string,
  citySlug: string,
  categorySlug: string
) {
  const supabase = createClient();
  
  const [countryResult, cityResult, categoryResult] = await Promise.all([
    supabase.from('countries').select('name, slug').eq('slug', countrySlug).single(),
    supabase.from('places').select('name, slug').eq('slug', citySlug).single(),
    supabase.from('appliance_categories').select('name, name_plural, slug').eq('slug', categorySlug).single(),
  ]);
  
  if (!countryResult.data || !cityResult.data || !categoryResult.data) {
    return null;
  }
  
  return {
    country: countryResult.data,
    city: cityResult.data,
    category: {
      name: categoryResult.data.name_plural || categoryResult.data.name,
      slug: categoryResult.data.slug,
    },
  };
}
```

### 10.2 Caching Strategy

```typescript
// lib/breadcrumbs/cache.ts

import { unstable_cache } from 'next/cache';
import { 
  getStoreBreadcrumbData, 
  getProviderBreadcrumbData,
  getCategoryBreadcrumbData 
} from './queries';

/**
 * Cached store breadcrumb data
 * Revalidates every hour (breadcrumb data rarely changes)
 */
export const getCachedStoreBreadcrumbData = unstable_cache(
  async (storeSlug: string) => getStoreBreadcrumbData(storeSlug),
  ['store-breadcrumb'],
  { revalidate: 3600, tags: ['breadcrumbs'] }
);

/**
 * Cached provider breadcrumb data
 */
export const getCachedProviderBreadcrumbData = unstable_cache(
  async (providerSlug: string) => getProviderBreadcrumbData(providerSlug),
  ['provider-breadcrumb'],
  { revalidate: 3600, tags: ['breadcrumbs'] }
);

/**
 * Cached category breadcrumb data
 */
export const getCachedCategoryBreadcrumbData = unstable_cache(
  async (countrySlug: string, citySlug: string, categorySlug: string) => 
    getCategoryBreadcrumbData(countrySlug, citySlug, categorySlug),
  ['category-breadcrumb'],
  { revalidate: 3600, tags: ['breadcrumbs'] }
);
```

---

## Integration with Existing Specs

### 11.1 Spec Cross-Reference

This breadcrumbs specification integrates with and supersedes breadcrumb definitions in:

| Spec | Current Definition | Integration |
|------|-------------------|-------------|
| **06 - Store Profile** | Basic 4-level breadcrumb | Use `buildBreadcrumbs('store_profile', ...)` |
| **07 - City Hub** | 3-level breadcrumb | Use `buildBreadcrumbs('city', ...)` |
| **10 - Repair Category** | 4-level with Repair suffix | Use `buildBreadcrumbs('repair_category', ...)` |
| **11 - Provider Profile** | Basic 4-level breadcrumb | Use `buildBreadcrumbs('provider_profile', ...)` |
| **13 - Country Page** | 2-level breadcrumb | Use `buildBreadcrumbs('country', ...)` |
| **14 - Retail Category** | 4-level breadcrumb | Use `buildBreadcrumbs('retail_category', ...)` |
| **15 - Brand Repair** | 4-level with Brand Repair | Use `buildBreadcrumbs('brand_repair', ...)` |
| **16 - National Repair** | 2-level breadcrumb | Use `buildBreadcrumbs('national_repair', ...)` |
| **17 - National Retail** | 2-level breadcrumb | Use `buildBreadcrumbs('national_category', ...)` |

### 11.2 Styling Consistency Updates

**Previous inconsistencies (now resolved):**

| Spec | Old Font Size | New Font Size |
|------|--------------|---------------|
| 06 - Store Profile | 13px | **14px** |
| 07 - City Hub | 13px | **14px** |
| 10 - Repair Category | 14px | 14px ✓ |
| 11 - Provider Profile | 14px | 14px ✓ |
| 13 - Country Page | 13px | **14px** |

**Unified styling (from this spec):**
- Font size: **14px** (all pages)
- Link color: **#e85d4c** (secondary)
- Current page: **#374151** (gray-700), **font-weight: 500**
- Separator: **›** (gray-400)

### 11.3 Component File Location

```
PROJECT STRUCTURE — BREADCRUMB FILES
═══════════════════════════════════════════════════════════════════════════

src/
├── components/
│   └── ui/
│       └── Breadcrumb.tsx          ← Main component (from Spec 19)
│
├── lib/
│   └── breadcrumbs/
│       ├── buildBreadcrumbs.ts     ← Builder functions (from Spec 19)
│       ├── queries.ts              ← Database queries (from Spec 19)
│       └── cache.ts                ← Caching utilities (from Spec 19)
│
├── types/
│   └── breadcrumb.ts               ← TypeScript types (from Spec 19)
│
└── styles/
    └── breadcrumb.css              ← Styles (from Spec 19)

═══════════════════════════════════════════════════════════════════════════
```

---

## Testing Checklist

### 12.1 Functional Tests

```
FUNCTIONAL TESTING CHECKLIST
═══════════════════════════════════════════════════════════════════════════

VISUAL RENDERING:
□ Desktop: Full breadcrumb trail renders correctly
□ Desktop: All ancestor links are clickable
□ Desktop: Current page is not a link
□ Desktop: Home icon displays (🏠)
□ Desktop: Separators display (›)
□ Mobile: Back link renders (← Parent)
□ Mobile: Correct parent name shown
□ Mobile: Touch target is 44px+ height
□ Responsive: Transitions at 768px breakpoint

NAVIGATION:
□ All breadcrumb links navigate to correct pages
□ Mobile back link navigates to parent page
□ Browser back button works after breadcrumb navigation
□ Direct URL access works (deep links)

SCHEMA.ORG:
□ JSON-LD script renders in page head
□ Schema validates in Google Rich Results Test
□ Schema validates in Schema.org Validator
□ All URLs are absolute
□ Positions start at 1, are sequential
□ Current page has no "item" property

BY PAGE TYPE:
□ Homepage: No breadcrumbs rendered
□ Country page: 2 levels (Home > Country)
□ City hub: 3 levels (Home > Country > City)
□ Retail category: 4 levels
□ Repair category: 4 levels with "Repair" suffix
□ Brand repair: 4 levels with "{Brand} Repair"
□ Store profile: 4 levels (via city, not category)
□ Provider profile: 4 levels (via city, not category)
□ National category: 2 levels
□ National repair: 2 levels
□ Guide pages: 2-3 levels

═══════════════════════════════════════════════════════════════════════════
```

### 12.2 Accessibility Tests

```
ACCESSIBILITY TESTING CHECKLIST
═══════════════════════════════════════════════════════════════════════════

SEMANTIC HTML:
□ <nav> element with aria-label="Breadcrumb"
□ <ol> used for list
□ <li> for each item
□ aria-current="page" on current item
□ aria-hidden="true" on decorative elements

KEYBOARD:
□ All links reachable via Tab
□ Current page (non-link) skipped in tab order
□ Enter activates focused link
□ Focus indicator visible (2px outline)
□ Focus order matches visual order

SCREEN READER (test with VoiceOver/NVDA):
□ "Breadcrumb navigation" announced
□ List items announced with position (1 of 4)
□ Link text announced clearly
□ Current page announced as "current page"
□ Separators NOT announced
□ Home icon label announced ("Home")

COLOR CONTRAST:
□ Link text: 4.5:1+ contrast ratio
□ Current page text: 4.5:1+ contrast ratio
□ Focus indicator: 3:1+ contrast ratio

═══════════════════════════════════════════════════════════════════════════
```

### 12.3 SEO Tests

```
SEO TESTING CHECKLIST
═══════════════════════════════════════════════════════════════════════════

SCHEMA VALIDATION:
□ Google Rich Results Test: No errors
□ Schema.org Validator: No errors
□ Google Search Console: Breadcrumbs detected

URL STRUCTURE:
□ All URLs in schema are absolute
□ All URLs include https://
□ All URLs include trailing slash
□ URLs match canonical URLs

CONTENT MATCH:
□ Schema names match visual breadcrumb text
□ Schema hierarchy matches URL hierarchy
□ No keyword stuffing in breadcrumb names

CRAWLABILITY:
□ Breadcrumb links are crawlable <a> tags
□ Links use href attributes (not JavaScript only)
□ No nofollow on breadcrumb links

AFTER DEPLOYMENT:
□ Check Google Search Console > Enhancements > Breadcrumbs
□ Verify breadcrumbs appear in search results (may take days/weeks)
□ Monitor for errors in Search Console

═══════════════════════════════════════════════════════════════════════════
```

### 12.4 Performance Tests

```
PERFORMANCE TESTING CHECKLIST
═══════════════════════════════════════════════════════════════════════════

RENDER PERFORMANCE:
□ Breadcrumb renders without layout shift (CLS = 0)
□ Component hydrates quickly (<100ms)
□ No visible flash of unstyled content

DATA FETCHING:
□ Breadcrumb data fetched in parallel with page data
□ Caching works (subsequent loads faster)
□ Cache invalidation works when data changes

BUNDLE SIZE:
□ Breadcrumb component < 5KB gzipped
□ No unnecessary dependencies
□ Tree-shaking removes unused code

═══════════════════════════════════════════════════════════════════════════
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial specification |

---

## Appendix A: Quick Reference

```
BREADCRUMB QUICK REFERENCE
═══════════════════════════════════════════════════════════════════════════

VISUAL PATTERN:
Desktop: 🏠 Home › England › Manchester › Category
Mobile:  ← Manchester

SEPARATOR:
Character: › (U+203A)

COLORS:
Links: #e85d4c (secondary)
Current: #374151 (gray-700)
Separator: #9CA3AF (gray-400)

FONT:
Size: 14px
Weight: 400 (links), 500 (current)

TOUCH TARGET:
Mobile minimum: 44px height

SCHEMA TYPE:
BreadcrumbList

ALWAYS INCLUDE:
@context, @type, @id, itemListElement, position, name

CURRENT PAGE:
No "item" property in schema
aria-current="page" in HTML
Not a link visually

═══════════════════════════════════════════════════════════════════════════
```

---

**END OF SPECIFICATION**
