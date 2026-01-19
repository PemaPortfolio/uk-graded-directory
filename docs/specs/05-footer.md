# Footer Specification

**Version:** 1.1 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED

---

## Executive Summary

A mobile-first, SEO-optimized footer that displays all 217 UK admin areas organized by country. Designed to maximize internal linking for search engine rankings while maintaining excellent UX on mobile devices.

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Admin areas shown | All 217 | Maximum SEO benefit |
| Organization | By country (4 sections) | Logical, scannable |
| Mobile behavior | Accordion (collapsed by default) | Mobile-first UX |
| Desktop behavior | Expanded by default | Screen space allows |
| HTML structure | Links always in DOM | Crawlers see all links |
| Empty locations | Hidden via `is_active` flag | No thin content links |
| Social media | TikTok, Facebook, YouTube | Traffic acquisition, Schema.org sameAs |

### Verified Data

```
LOCATION DATA FROM DATABASE
═══════════════════════════════════════════════════════════════

ADMIN AREAS BY COUNTRY:
├── England:           152 admin areas
├── Scotland:           32 admin areas
├── Wales:              22 admin areas
├── Northern Ireland:   11 admin areas
└── TOTAL:             217 admin areas

PLACES (Cities/Towns):  564

CATEGORIES:             17 appliance types

═══════════════════════════════════════════════════════════════
```

---

## Footer Structure Overview

```
FOOTER SECTIONS — TOP TO BOTTOM
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│  SECTION 1: MAIN FOOTER                                     │
│  Logo, tagline, quick links, categories, business links    │
├─────────────────────────────────────────────────────────────┤
│  SECTION 2: BROWSE BY REGION                                │
│  All 217 admin areas organized by 4 countries              │
├─────────────────────────────────────────────────────────────┤
│  SECTION 3: POPULAR CITIES                                  │
│  Top 20 cities by population/traffic                       │
├─────────────────────────────────────────────────────────────┤
│  SECTION 4: BOTTOM BAR                                      │
│  Copyright, stats, legal links                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

---

## Section 1: Main Footer

### Desktop Layout (4 Columns)

```
MAIN FOOTER — DESKTOP
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  [LOGO]                Quick Links       Categories        For Business    │
│                                                                             │
│  Find graded           Home              Washing Machines  List Your Store │
│  appliances &          About Us          Fridge Freezers   Claim Business  │
│  trusted repair        Contact Us        Dishwashers       Business FAQ    │
│  services across       How It Works      Tumble Dryers     Advertise       │
│  the UK. Save          Privacy Policy    Cookers & Ovens                   │
│  30-70% off RRP.       Terms of Service  Range Cookers                     │
│                        Cookie Policy     View All →                        │
│  📧 hello@brand.com    Sitemap                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### Mobile Layout (Stacked Accordions)

```
MAIN FOOTER — MOBILE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────┐
│                                         │
│            [LOGO]                       │
│                                         │
│  Find graded appliances & trusted       │
│  repair services across the UK.         │
│  Save 30-70% off RRP.                   │
│                                         │
│  📧 hello@brand.com                     │
│                                         │
├─────────────────────────────────────────┤
│  Quick Links                        [+] │
├─────────────────────────────────────────┤
│  Categories                         [+] │
├─────────────────────────────────────────┤
│  For Business                       [+] │
├─────────────────────────────────────────┤

(Each expands on tap to show links)

═══════════════════════════════════════════
```

### Main Footer Styling

```
MAIN FOOTER STYLING
═══════════════════════════════════════════════════════════════

CONTAINER:
├── Background:      #0F172A (slate-900, dark)
├── Padding:         48px 24px (desktop)
├── Padding mobile:  32px 16px
├── Max width:       1280px (centered)
└── Border top:      4px solid #DC2626 (red accent)

LOGO COLUMN:
├── Logo width:      140px (desktop), 120px (mobile)
├── Tagline:         
│   ├── Font size:   14px
│   ├── Color:       #94A3B8 (slate-400)
│   ├── Line height: 1.6
│   └── Max width:   280px
├── Email:           
│   ├── Font size:   14px
│   ├── Color:       #FFFFFF
│   ├── Icon:        📧 or mail icon
│   └── Hover:       #DC2626 (red)

COLUMN HEADERS:
├── Font size:       14px
├── Font weight:     600
├── Color:           #FFFFFF
├── Text transform:  uppercase
├── Letter spacing:  0.05em
├── Margin bottom:   16px

COLUMN LINKS:
├── Font size:       14px
├── Color:           #94A3B8 (slate-400)
├── Line height:     2.2 (generous tap targets)
├── Hover:           #FFFFFF
├── Transition:      color 150ms ease
└── Padding:         4px 0 (mobile: 12px 0 for tap)

MOBILE ACCORDION:
├── Border bottom:   1px solid #334155 (slate-700)
├── Padding:         16px 0
├── Header:          Flex, space-between
├── Icon:            + (collapsed) / − (expanded)
├── Icon color:      #94A3B8
├── Content:         Hidden when collapsed
└── Animation:       height 200ms ease

GRID:
├── Desktop:         4 columns (1fr 1fr 1fr 1fr)
├── Tablet:          2 columns
├── Mobile:          1 column (stacked accordions)
└── Gap:             32px (desktop), 0 (mobile accordions)

═══════════════════════════════════════════════════════════════
```

### Link Lists

```
QUICK LINKS                 CATEGORIES               FOR BUSINESS
─────────────────────────────────────────────────────────────────

• Home                      • Washing Machines       • List Your Store
• About Us                  • Fridge Freezers        • Claim Your Business
• Contact Us                • Dishwashers            • Business Dashboard
• How It Works              • Tumble Dryers          • Business FAQ
• Privacy Policy            • Cookers & Ovens        • Advertise With Us
• Terms of Service          • Range Cookers          
• Cookie Policy             • American Fridges       
• Sitemap                   • View All Categories →  

LINK DESTINATIONS:
─────────────────────────────────────────────────────────────────
Home                    → /
About Us                → /about
Contact Us              → /contact
How It Works            → /how-it-works
Privacy Policy          → /privacy
Terms of Service        → /terms
Cookie Policy           → /cookies
Sitemap                 → /sitemap.xml

Washing Machines        → /washing-machines (category hub)
Fridge Freezers         → /fridge-freezers
(etc.)
View All Categories     → /categories

List Your Store         → /business/add
Claim Your Business     → /business/add (same flow)
Business Dashboard      → /dashboard
Business FAQ            → /business/help
Advertise              → /advertise

═══════════════════════════════════════════════════════════════
```

---

## Section 2: Browse by Region

### Desktop Layout

```
BROWSE BY REGION — DESKTOP (Expanded)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    Browse Graded Appliances by Region                       │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  ENGLAND (152)                                                      [−]    │
│  ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│  Barking and          Bromley             East Sussex          Hounslow    │
│  Dagenham             Buckinghamshire     Enfield              Hull        │
│  Barnet               Bury                Essex                Isle of     │
│  Barnsley             Calderdale          Gateshead            Wight       │
│  Bath and North       Cambridgeshire      Gloucestershire      Islington   │
│  East Somerset        Camden              Greenwich            Kensington  │
│  Bedford              Central             Hackney              and Chelsea │
│  Bexley               Bedfordshire        Halton               Kent        │
│  Birmingham           Cheshire East       Hammersmith          Kingston    │
│  Blackburn with       Cheshire West       and Fulham           upon Thames │
│  Darwen               and Chester         Hampshire            Kirklees    │
│  Blackpool            City of London      Haringey             Knowsley    │
│  Bolton               Cornwall            Harrow               Lambeth     │
│  ...                  ...                 ...                  ...         │
│                                                                             │
│  (All 152 shown in 4-5 columns, alphabetically sorted)                     │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  SCOTLAND (32)                                                      [−]    │
│  ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│  Aberdeen City        East Ayrshire       Highland             Renfrewshire│
│  Aberdeenshire        East                Inverclyde           Scottish    │
│  Angus                Dunbartonshire      Midlothian           Borders     │
│  Argyll and Bute      East Lothian        Moray                Shetland    │
│  Clackmannanshire     East                Na h-Eileanan        Islands     │
│  Dumfries and         Renfrewshire        Siar                 South       │
│  Galloway             Edinburgh           North Ayrshire       Ayrshire    │
│  Dundee City          Falkirk             North                South       │
│                       Fife                Lanarkshire          Lanarkshire │
│                       Glasgow City        Orkney Islands       Stirling    │
│                                           Perth and            West        │
│                                           Kinross              Dunbarton..│
│                                                                West Lothian│
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  WALES (22)                                                         [−]    │
│  ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│  Blaenau Gwent    Carmarthenshire   Flintshire       Neath Port     Swansea│
│  Bridgend         Ceredigion        Gwynedd          Talbot         Torfaen│
│  Caerphilly       Conwy             Isle of          Newport        Vale of│
│  Cardiff          Denbighshire      Anglesey         Pembrokeshire  Glamorgan│
│                                     Merthyr Tydfil   Powys          Wrexham│
│                                     Monmouthshire    Rhondda               │
│                                                      Cynon Taf             │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  NORTHERN IRELAND (11)                                              [−]    │
│  ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│  Antrim and           Belfast             Fermanagh            Mid Ulster  │
│  Newtownabbey         Causeway Coast      and Omagh            Newry,      │
│  Ards and North       and Glens           Lisburn and          Mourne and  │
│  Down                 Derry City and      Castlereagh          Down        │
│  Armagh City,         Strabane            Mid and East                     │
│  Banbridge and                            Antrim                           │
│  Craigavon                                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
```

### Mobile Layout (Accordion)

```
BROWSE BY REGION — MOBILE (Collapsed Default)
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────┐
│                                         │
│    Browse Graded Appliances by Region   │
│                                         │
├─────────────────────────────────────────┤
│  🏴󠁧󠁢󠁥󠁮󠁧󠁿 England (152)                    [+] │
├─────────────────────────────────────────┤
│  🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland (32)                     [+] │
├─────────────────────────────────────────┤
│  🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales (22)                        [+] │
├─────────────────────────────────────────┤
│  🇬🇧 Northern Ireland (11)              [+] │
└─────────────────────────────────────────┘

WHEN EXPANDED (e.g., England tapped):
┌─────────────────────────────────────────┐
│  🏴󠁧󠁢󠁥󠁮󠁧󠁿 England (152)                    [−] │
├─────────────────────────────────────────┤
│                                         │
│  Barking and Dagenham                   │
│  Barnet                                 │
│  Barnsley                               │
│  Bath and North East Somerset           │
│  Bedford                                │
│  Bexley                                 │
│  Birmingham                             │
│  Blackburn with Darwen                  │
│  Blackpool                              │
│  Bolton                                 │
│  ...                                    │
│  (scrollable list, 2 columns)           │
│                                         │
├─────────────────────────────────────────┤
│  🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland (32)                     [+] │
└─────────────────────────────────────────┘

═══════════════════════════════════════════
```

### Browse by Region Styling

```
BROWSE BY REGION STYLING
═══════════════════════════════════════════════════════════════

SECTION CONTAINER:
├── Background:      #1E293B (slate-800, slightly lighter)
├── Padding:         48px 24px (desktop)
├── Padding mobile:  24px 16px
└── Border top:      1px solid #334155 (slate-700)

SECTION TITLE:
├── Font size:       20px (desktop), 18px (mobile)
├── Font weight:     700
├── Color:           #FFFFFF
├── Text align:      center
├── Margin bottom:   32px (desktop), 24px (mobile)

COUNTRY HEADER:
├── Font size:       16px
├── Font weight:     600
├── Color:           #FFFFFF
├── Background:      transparent
├── Padding:         16px 0
├── Border bottom:   1px solid #334155
├── Display:         flex, justify-content: space-between
├── Cursor:          pointer
├── Flag emoji:      Before text, 20px
└── Count badge:     
    ├── Background:  #334155
    ├── Color:       #94A3B8
    ├── Padding:     2px 8px
    ├── Border rad:  12px
    └── Font size:   12px

COUNTRY LINKS GRID:
├── Desktop:         4-5 columns
├── Tablet:          3 columns
├── Mobile:          2 columns
├── Gap:             8px 16px
└── Padding:         16px 0 24px 0

INDIVIDUAL LINK:
├── Font size:       13px (desktop), 14px (mobile)
├── Color:           #94A3B8
├── Line height:     1.4
├── Padding:         6px 0 (mobile: 10px 0)
├── White-space:     nowrap
├── Overflow:        ellipsis (for long names)
├── Hover:           #FFFFFF
└── Transition:      color 150ms ease

EXPAND/COLLAPSE ICON:
├── Size:            24px
├── Color:           #94A3B8
├── Transition:      transform 200ms ease
└── Rotates:         180deg when expanded

MOBILE SCROLL BEHAVIOR:
├── Max height:      400px when expanded
├── Overflow-y:      auto
├── Scroll padding:  16px
└── Smooth scroll:   scroll-behavior: smooth

═══════════════════════════════════════════════════════════════
```

### Critical: HTML Structure for SEO

```html
CRITICAL: LINKS ALWAYS IN DOM FOR CRAWLERS
═══════════════════════════════════════════════════════════════

<!-- 
  IMPORTANT: Links must be in HTML, not loaded via JavaScript
  Collapsed state hides with CSS (max-height: 0), NOT display: none
  This ensures crawlers see all 217 links
-->

<section class="footer-regions" aria-label="Browse by region">
  <h2>Browse Graded Appliances by Region</h2>
  
  <!-- England -->
  <div class="region-group" data-expanded="true">
    <button 
      class="region-header" 
      aria-expanded="true"
      aria-controls="england-links"
    >
      <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿 England</span>
      <span class="count">(152)</span>
      <span class="icon">−</span>
    </button>
    
    <div 
      id="england-links" 
      class="region-links"
      aria-hidden="false"
    >
      <!-- ALL 152 LINKS ALWAYS IN HTML -->
      <a href="/england/barking-and-dagenham/">Barking and Dagenham</a>
      <a href="/england/barnet/">Barnet</a>
      <a href="/england/barnsley/">Barnsley</a>
      <!-- ... all 152 ... -->
    </div>
  </div>
  
  <!-- Scotland, Wales, Northern Ireland follow same pattern -->
  
</section>

CSS FOR COLLAPSE (SEO-SAFE):
═══════════════════════════════════════════════════════════════

/* Links are IN the DOM, just visually hidden */
.region-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px 16px;
  max-height: 2000px; /* Arbitrary large number */
  overflow: hidden;
  transition: max-height 300ms ease, padding 300ms ease;
  padding: 16px 0;
}

.region-links[aria-hidden="true"] {
  max-height: 0;
  padding: 0;
  /* NOT display: none - crawlers still see it */
}

/* Mobile: 2 columns */
@media (max-width: 640px) {
  .region-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

═══════════════════════════════════════════════════════════════
```

---

## Section 3: Popular Cities

```
POPULAR CITIES SECTION
═══════════════════════════════════════════════════════════════

DESKTOP:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                           Popular Cities                                    │
│                                                                             │
│  London      Manchester    Birmingham    Leeds        Glasgow    Liverpool  │
│  Bristol     Edinburgh     Sheffield     Newcastle    Cardiff    Nottingham │
│  Leicester   Belfast       Southampton   Brighton     Plymouth   Stoke      │
│                                                                             │
│                       View all 564 cities →                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

MOBILE:
┌─────────────────────────────────────────┐
│                                         │
│          Popular Cities                 │
│                                         │
│  London          Manchester             │
│  Birmingham      Leeds                  │
│  Glasgow         Liverpool              │
│  Bristol         Edinburgh              │
│  Sheffield       Newcastle              │
│  Cardiff         Nottingham             │
│                                         │
│       View all 564 cities →             │
│                                         │
└─────────────────────────────────────────┘

STYLING:
├── Background:     #0F172A (same as main footer)
├── Padding:        32px 24px
├── Title:          16px, 600 weight, white, center
├── Links grid:     6 columns (desktop), 2 columns (mobile)
├── Link style:     Same as region links
├── "View all":     #DC2626 (red), with arrow icon
└── Border top:     1px solid #334155

LINK DESTINATIONS:
├── London         → /england/london/
├── Manchester     → /england/manchester/
├── etc.
└── View all       → /locations/ (full locations index page)

═══════════════════════════════════════════════════════════════
```

---

## Section 4: Bottom Bar

```
BOTTOM BAR
═══════════════════════════════════════════════════════════════

DESKTOP:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  © 2026 [Brand Name]. All rights reserved.                                 │
│                                                                             │
│  🏪 500+ Stores  •  🔧 200+ Repair Services  •  📍 565 UK Locations  •  💰 Save 30-70%  │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  Follow us:  [TikTok]  [Facebook]  [YouTube]                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

MOBILE:
┌─────────────────────────────────────────┐
│                                         │
│  © 2026 [Brand Name].                   │
│  All rights reserved.                   │
│                                         │
│  🏪 500+ Stores                         │
│  🔧 200+ Repair Services                │
│  📍 565 UK Locations                    │
│  💰 Save 30-70%                         │
│                                         │
│  ─────────────────────────────         │
│                                         │
│  Follow us:                             │
│  [TikTok]  [Facebook]  [YouTube]        │
│                                         │
└─────────────────────────────────────────┘

STYLING:
├── Background:     #020617 (slate-950, darkest)
├── Padding:        24px
├── Text align:     center
├── Copyright:      13px, #64748B (slate-500)
├── Stats:          14px, #94A3B8 (slate-400)
├── Stats icons:    Emoji or icons, adds visual interest
├── Dividers:       • (bullet) on desktop, stacked on mobile
└── Border top:     1px solid #1E293B

STATS ARE DYNAMIC:
├── Query database for actual counts
├── store_count from places aggregated
├── provider_count from places aggregated
├── Update periodically (cache 24h)
└── Shows real numbers for trust

SOCIAL MEDIA ICONS:
├── Position:       Below stats, centered
├── Icon size:      24px (desktop), 28px (mobile)
├── Icon color:     #94A3B8 (slate-400)
├── Hover color:    #FFFFFF (white)
├── Gap between:    16px
├── Tap target:     44px × 44px minimum
├── Icons:          Use Lucide React or brand SVGs
└── Links:          Open in new tab (target="_blank")

SOCIAL LINK CONFIGURATION:
├── TikTok:         https://www.tiktok.com/@{username}
├── Facebook:       https://www.facebook.com/{username}
├── YouTube:        https://www.youtube.com/@{username}
├── Default:        Links hidden if URL not configured
└── Config file:    /config/social.ts

═══════════════════════════════════════════════════════════════
```

---

## Mobile-First Implementation Details

### Touch Targets

```
MOBILE TOUCH TARGET REQUIREMENTS
═══════════════════════════════════════════════════════════════

MINIMUM TAP SIZE: 44px × 44px (Apple HIG)

ACCORDION HEADERS:
├── Height:         56px minimum
├── Padding:        16px
└── Full width tap area

LINKS IN LISTS:
├── Padding:        12px 8px
├── Line height:    24px minimum
└── Touch area extends beyond text

EXPAND/COLLAPSE BUTTON:
├── Size:           44px × 44px
├── Icon centered
└── Visual feedback on tap (opacity: 0.7)

SPACING BETWEEN LINKS:
├── Vertical gap:   8px minimum
└── Prevents mis-taps

═══════════════════════════════════════════════════════════════
```

### Responsive Breakpoints

```
RESPONSIVE BREAKPOINTS
═══════════════════════════════════════════════════════════════

MOBILE:           < 640px
├── Main footer:   Single column, accordions
├── Region links:  2 columns
├── Popular cities: 2 columns
└── Bottom bar:    Stacked

TABLET:           640px - 1024px
├── Main footer:   2 columns
├── Region links:  3 columns
├── Popular cities: 4 columns
└── Bottom bar:    Single line

DESKTOP:          > 1024px
├── Main footer:   4 columns
├── Region links:  4-5 columns
├── Popular cities: 6 columns
└── Bottom bar:    Single line

═══════════════════════════════════════════════════════════════
```

### Mobile Accordion Behavior

```
MOBILE ACCORDION UX
═══════════════════════════════════════════════════════════════

DEFAULT STATE:
├── Main footer sections: ALL COLLAPSED
├── Region sections: ALL COLLAPSED
└── User taps to expand what they need

EXPAND BEHAVIOR:
├── Smooth height animation (200ms)
├── Only one main section open at a time (optional)
├── Multiple region sections can be open
└── Scroll into view if expanded below fold

VISUAL FEEDBACK:
├── Tap: Background briefly highlights (#334155)
├── Icon rotates 180deg
├── aria-expanded updates for screen readers
└── Focus ring visible for accessibility

PERFORMANCE:
├── No JavaScript required for crawlers
├── CSS handles collapse animation
├── Intersection Observer for lazy enhance
└── Works without JS (expanded fallback)

═══════════════════════════════════════════════════════════════
```

---

## SEO Implementation

### Internal Linking Strategy

```
INTERNAL LINKING BENEFITS
═══════════════════════════════════════════════════════════════

EVERY PAGE ON SITE LINKS TO:
├── 217 admin area pages (via footer)
├── 20 popular city pages (via footer)
├── 6-8 category pages (via footer)
├── Key business pages (via footer)
└── Legal/info pages (via footer)

TOTAL INTERNAL LINKS PER PAGE: ~250

LINK EQUITY FLOW:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                       Homepage                              │
│                          │                                  │
│    ┌─────────────────────┼─────────────────────┐           │
│    │                     │                     │           │
│    ▼                     ▼                     ▼           │
│  /england/           /scotland/           /wales/          │
│    │                     │                     │           │
│    ├── /england/greater-manchester/            │           │
│    │       │                                   │           │
│    │       ├── /england/manchester/            │           │
│    │       │       │                           │           │
│    │       │       └── /england/manchester/    │           │
│    │       │           washing-machines/       │           │
│    │       │                                   │           │
│    └───────┴───────────────────────────────────┘           │
│                                                             │
│    ALL PAGES INTERLINKED VIA FOOTER                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
```

### Anchor Text Optimization

```
ANCHOR TEXT STRATEGY
═══════════════════════════════════════════════════════════════

ADMIN AREA LINKS:
├── Text: "{Admin Area Name}"
├── URL: /{country}/{admin-area-slug}/
├── Example: "Greater Manchester" → /england/greater-manchester/

CITY LINKS:
├── Text: "{City Name}"
├── URL: /{country}/{city-slug}/
├── Example: "Manchester" → /england/manchester/

CATEGORY LINKS:
├── Text: "{Category Name}"
├── URL: /{category-slug}/
├── Example: "Washing Machines" → /washing-machines/

WHY THIS MATTERS:
├── Google uses anchor text to understand target page
├── Consistent anchor text reinforces topic relevance
├── 217 links × 1000 pages = 217,000 internal signals

═══════════════════════════════════════════════════════════════
```

### Noindex Handling

```
EMPTY LOCATION HANDLING
═══════════════════════════════════════════════════════════════

DATABASE FLAGS:
├── is_active:    Show in footer? (true/false)
├── is_indexable: Allow Google index? (true/false)
├── store_count:  Number of stores
└── provider_count: Number of providers

FOOTER QUERY:
SELECT name, slug, country_slug
FROM admin_areas
WHERE is_active = true
ORDER BY country_id, name;

RESULT:
├── Empty locations NOT shown in footer
├── No links to thin content
├── When store added → is_active = true → appears in footer
└── Fully automated via database triggers

═══════════════════════════════════════════════════════════════
```

---

## Component File Structure

```
COMPONENT STRUCTURE
═══════════════════════════════════════════════════════════════

components/
└── footer/
    ├── Footer.tsx                    # Main container
    ├── FooterMain.tsx                # Section 1: Logo, links
    ├── FooterMainMobile.tsx          # Mobile accordion version
    ├── FooterRegions.tsx             # Section 2: Browse by region
    ├── FooterRegionGroup.tsx         # Individual country group
    ├── FooterPopularCities.tsx       # Section 3: Popular cities
    ├── FooterBottomBar.tsx           # Section 4: Copyright, stats
    └── FooterAccordion.tsx           # Reusable accordion component

lib/
└── footer/
    └── getFooterData.ts              # Fetch locations from DB

types/
└── footer.ts                         # TypeScript interfaces

═══════════════════════════════════════════════════════════════
```

---

## TypeScript Interfaces

```typescript
TYPESCRIPT INTERFACES
═══════════════════════════════════════════════════════════════

// types/footer.ts

export interface FooterAdminArea {
  id: string;
  name: string;
  slug: string;
  countrySlug: string;
  storeCount: number;
  providerCount: number;
}

export interface FooterCountry {
  id: string;
  name: string;
  slug: string;
  flagEmoji: string;
  adminAreas: FooterAdminArea[];
}

export interface FooterCity {
  id: string;
  name: string;
  slug: string;
  countrySlug: string;
  population?: number;
}

export interface FooterStats {
  totalStores: number;
  totalProviders: number;
  totalLocations: number;
}

// Social media link configuration
export interface SocialLink {
  platform: 'tiktok' | 'facebook' | 'youtube';
  url: string;
  label: string;
  icon: string; // Lucide icon name or custom SVG path
}

export interface FooterSocialLinks {
  enabled: boolean;
  links: SocialLink[];
}

export interface FooterData {
  countries: FooterCountry[];
  popularCities: FooterCity[];
  stats: FooterStats;
  socialLinks: FooterSocialLinks;
}

═══════════════════════════════════════════════════════════════
```

---

## Social Media Configuration

```typescript
SOCIAL MEDIA CONFIGURATION
═══════════════════════════════════════════════════════════════

// config/social.ts

import { FooterSocialLinks } from '@/types/footer';

/**
 * Social Media Configuration
 * 
 * Update these URLs when social accounts are created.
 * Set enabled: false to hide social links entirely.
 * Remove individual links from array to hide specific platforms.
 */
export const socialConfig: FooterSocialLinks = {
  enabled: true, // Set to false to hide all social links
  links: [
    {
      platform: 'tiktok',
      url: '', // TODO: Add TikTok URL when account created
      label: 'Follow us on TikTok',
      icon: 'tiktok', // Custom SVG needed (not in Lucide)
    },
    {
      platform: 'facebook',
      url: '', // TODO: Add Facebook URL when account created
      label: 'Follow us on Facebook',
      icon: 'facebook', // Use Lucide 'Facebook' icon
    },
    {
      platform: 'youtube',
      url: '', // TODO: Add YouTube URL when account created
      label: 'Subscribe on YouTube',
      icon: 'youtube', // Use Lucide 'Youtube' icon
    },
  ],
};

// Helper to get only configured (non-empty) social links
export function getActiveSocialLinks(): FooterSocialLinks {
  return {
    enabled: socialConfig.enabled,
    links: socialConfig.links.filter(link => link.url && link.url.length > 0),
  };
}

═══════════════════════════════════════════════════════════════
```

### Social Media Icons Component

```typescript
// components/footer/SocialLinks.tsx

import Link from 'next/link';
import { Facebook, Youtube } from 'lucide-react';
import { FooterSocialLinks } from '@/types/footer';

// Custom TikTok icon (not in Lucide)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const iconMap = {
  tiktok: TikTokIcon,
  facebook: Facebook,
  youtube: Youtube,
};

interface SocialLinksProps {
  socialLinks: FooterSocialLinks;
}

export default function SocialLinks({ socialLinks }: SocialLinksProps) {
  // Don't render if disabled or no active links
  if (!socialLinks.enabled || socialLinks.links.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <span className="text-sm text-slate-500">Follow us:</span>
      <div className="flex items-center gap-4">
        {socialLinks.links.map((link) => {
          const Icon = iconMap[link.platform];
          return (
            <Link
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-slate-400 hover:text-white transition-colors p-2"
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

### Schema.org sameAs Integration

```typescript
SCHEMA.ORG SOCIAL INTEGRATION
═══════════════════════════════════════════════════════════════

// Add to Organization schema on ALL pages

{
  "@type": "Organization",
  "@id": "https://ukgradedappliances.co.uk/#organization",
  "name": "UK Graded Appliances",
  "url": "https://ukgradedappliances.co.uk/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://ukgradedappliances.co.uk/logo.png"
  },
  "sameAs": [
    "https://www.tiktok.com/@ukgradedappliances",
    "https://www.facebook.com/ukgradedappliances",
    "https://www.youtube.com/@ukgradedappliances"
  ]
}

// Helper function to generate sameAs array
// lib/schema/getSocialSameAs.ts

import { getActiveSocialLinks } from '@/config/social';

export function getSocialSameAs(): string[] {
  const socialLinks = getActiveSocialLinks();
  return socialLinks.links.map(link => link.url).filter(Boolean);
}

// Usage in schema generation
const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "UK Graded Appliances",
  "sameAs": getSocialSameAs(), // Returns [] if no links configured
};

═══════════════════════════════════════════════════════════════
```

---

## Data Fetching

```typescript
DATA FETCHING FOR FOOTER
═══════════════════════════════════════════════════════════════

// lib/footer/getFooterData.ts

import { supabase } from '@/lib/supabase';
import { FooterData } from '@/types/footer';
import { cache } from 'react';

// Cache for 1 hour (revalidate)
export const getFooterData = cache(async (): Promise<FooterData> => {
  
  // Get admin areas grouped by country
  const { data: adminAreas } = await supabase
    .from('admin_areas')
    .select(`
      id,
      name,
      slug,
      store_count,
      provider_count,
      countries!inner (
        id,
        name,
        slug,
        flag_emoji
      )
    `)
    .eq('is_active', true)
    .order('name');

  // Get popular cities (top 20 by population or store count)
  const { data: cities } = await supabase
    .from('places')
    .select('id, name, slug, country_slug, population')
    .eq('is_active', true)
    .order('population', { ascending: false })
    .limit(20);

  // Get aggregate stats
  const { data: stats } = await supabase
    .rpc('get_footer_stats');

  // Transform to grouped structure
  const countries = groupByCountry(adminAreas);

  return {
    countries,
    popularCities: cities || [],
    stats: stats || { totalStores: 0, totalProviders: 0, totalLocations: 565 }
  };
});

// Helper to group admin areas by country
function groupByCountry(adminAreas: any[]): FooterCountry[] {
  // ... grouping logic
}

═══════════════════════════════════════════════════════════════
```

---

## Accessibility

```
ACCESSIBILITY REQUIREMENTS
═══════════════════════════════════════════════════════════════

LANDMARKS:
├── <footer role="contentinfo">
├── <nav aria-label="Footer navigation">
└── <section aria-label="Browse by region">

ACCORDION:
├── aria-expanded on trigger button
├── aria-controls linking to content
├── aria-hidden on content panel
├── Keyboard: Enter/Space toggles
└── Focus management on expand

LINKS:
├── Descriptive text (no "click here")
├── Underline on focus/hover
├── Sufficient color contrast (4.5:1)
└── Focus ring visible

RESPONSIVE:
├── Content reflows, no horizontal scroll
├── Touch targets 44px minimum
└── Text scalable to 200%

SCREEN READER:
├── Announce section changes
├── Count in country headers helpful
├── Skip link to footer optional
└── Logical reading order

═══════════════════════════════════════════════════════════════
```

---

## Performance

```
PERFORMANCE OPTIMIZATIONS
═══════════════════════════════════════════════════════════════

SERVER-SIDE RENDERING:
├── Footer data fetched at build time
├── ISR (Incremental Static Regeneration)
├── Revalidate every 1 hour
└── No client-side fetch required

CACHING:
├── Footer data cached in React cache()
├── CDN caches rendered HTML
├── Database query cached
└── Invalidate on store/location changes

LAZY LOADING:
├── Footer not above fold
├── Can use Intersection Observer
├── Defer non-critical JS
└── CSS-only collapse (no JS required)

HTML SIZE:
├── ~217 links × ~50 bytes = ~11KB
├── Gzipped: ~2-3KB
├── Acceptable for SEO benefit
└── Cached across pages

═══════════════════════════════════════════════════════════════
```

---

## Implementation Checklist

### Phase 1: Core Footer
- [ ] Main footer structure (4 columns)
- [ ] Mobile accordion version
- [ ] Styling (dark theme)
- [ ] Quick links, categories, business links
- [ ] Logo and tagline

### Phase 2: Browse by Region
- [ ] Fetch admin areas from database
- [ ] Group by country
- [ ] Desktop expanded view (4-5 columns)
- [ ] Mobile accordion (collapsed default)
- [ ] Expand/collapse functionality
- [ ] CSS-only collapse (SEO safe)

### Phase 3: Popular Cities & Bottom Bar
- [ ] Popular cities section
- [ ] Dynamic stats from database
- [ ] Bottom bar with copyright
- [ ] Trust signals

### Phase 4: Social Media Integration
- [ ] Create social config file (`/config/social.ts`)
- [ ] Build SocialLinks component
- [ ] Add TikTok custom SVG icon
- [ ] Integrate into FooterBottomBar
- [ ] Add Schema.org `sameAs` to Organization
- [ ] Test with empty URLs (should hide)

### Phase 5: Polish
- [ ] Accessibility audit
- [ ] Mobile testing (various devices)
- [ ] Performance optimization
- [ ] Cross-browser testing

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 2026 | Initial specification |
| 1.1 | Jan 2026 | Added social media infrastructure: TikTok, Facebook, YouTube icons in bottom bar; Social config file; Schema.org sameAs integration; SocialLinks component |

---

**END OF FOOTER SPECIFICATION**

═══════════════════════════════════════════════════════════════
Document Status: ✅ LOCKED
Version: 1.1
Approved: January 2026
Next: Implementation Phase 1
═══════════════════════════════════════════════════════════════
