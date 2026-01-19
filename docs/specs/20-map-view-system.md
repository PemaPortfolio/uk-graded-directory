# Map View System Specification

**Version:** 1.0 — LOCKED  
**Date:** January 2026  
**Status:** ✅ APPROVED  
**Spec Number:** 20  
**Dependencies:** Spec 06 (Store Profile), Spec 08 (Store Card), Spec 09 (Provider Card), Spec 11 (Provider Profile)

---

## 1. Executive Summary

### 1.1 Purpose

The Map View System provides **geographic visualization** of stores and service providers across the platform. It covers two distinct use cases:

1. **Single-Location Maps** — Embed map showing ONE store/provider location on profile pages
2. **Multi-Location Maps** — Interactive map showing MULTIPLE stores/providers on listing pages

### 1.2 Technology Decision

```
MAP TECHNOLOGY DECISION — FINAL
═══════════════════════════════════════════════════════════════════════════

REQUIREMENT FROM STAKEHOLDER:
├── Must be FREE (no paid API)
├── No API key required
├── No usage limits
└── Works at scale (20,000+ pages)

DECISION:
─────────────────────────────────────────────────────────────────────────────

SINGLE-LOCATION MAPS (Profile Pages):
├── Technology: Google Maps Embed (iframe)
├── Cost: £0 — 100% FREE
├── API Key: Not required
├── Already implemented in Specs 06 & 11
└── URL: https://www.google.com/maps?q={lat},{lng}&output=embed

MULTI-LOCATION MAPS (Listing Pages):
├── Technology: Leaflet.js + OpenStreetMap
├── Cost: £0 — 100% FREE  
├── API Key: Not required
├── Usage limits: None
├── Tile provider: OpenStreetMap (free tier)
└── Library: Leaflet.js (open source, MIT license)

WHY LEAFLET + OPENSTREETMAP:
├── ✅ Completely free, forever
├── ✅ No API key required
├── ✅ No usage limits or quotas
├── ✅ Full interactive functionality (zoom, pan, markers, popups)
├── ✅ Custom markers and styling
├── ✅ Marker clustering for performance
├── ✅ Mobile touch support
├── ✅ Accessibility support
├── ✅ 50KB bundle size (lightweight)
├── ✅ Used by major sites: Flickr, Pinterest, Foursquare, Craigslist
└── ⚠️ OpenStreetMap branding required (attribution)

WHY NOT GOOGLE MAPS JAVASCRIPT API:
├── ❌ Requires API key
├── ❌ Has usage limits (28,000 map loads/month free)
├── ❌ Costs money after free tier
└── ❌ Complex billing setup

═══════════════════════════════════════════════════════════════════════════
```

### 1.3 Scope

| Page Type | Map Type | Implementation |
|-----------|----------|----------------|
| Store Profile (`/store/[slug]/`) | Single-location | Google Maps iframe |
| Provider Profile (`/provider/[slug]/`) | Single-location | Google Maps iframe |
| City Hub (`/[country]/[city]/`) | Multi-location | Leaflet + OSM |
| Retail Category (`/[country]/[city]/[category]/`) | Multi-location | Leaflet + OSM |
| Repair Category (`/[country]/[city]/[category]-repair/`) | Multi-location | Leaflet + OSM |
| Brand Repair (`/[country]/[city]/[brand]-repair/`) | Multi-location | Leaflet + OSM |

---

## 2. Single-Location Maps (Profile Pages)

### 2.1 Technology: Google Maps Embed

This approach is **already established** in Spec 06 (Store Profile) and Spec 11 (Provider Profile). This section consolidates and standardizes the implementation.

```
SINGLE-LOCATION MAP — SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

TECHNOLOGY: Google Maps Embed (iframe)
COST: £0 — Completely FREE
API KEY: Not required

FEATURES:
├── Interactive map (zoom, pan, explore)
├── Red pin marks exact location
├── Shows real streets, landmarks, nearby businesses
├── "View larger map" link opens Google Maps
├── Directions link opens Google Maps directions
└── Google branding visible (required)

URL PATTERNS:
─────────────────────────────────────────────────────────────────────────────

EMBED URL (for iframe src):
├── With coordinates (preferred):
│   https://www.google.com/maps?q={latitude},{longitude}&output=embed
│
└── With address (fallback):
    https://www.google.com/maps?q={encodedAddress}&output=embed

DIRECTIONS URL (for "Get Directions" button):
├── With coordinates:
│   https://www.google.com/maps/dir/?api=1&destination={latitude},{longitude}
│
└── With address:
    https://www.google.com/maps/dir/?api=1&destination={encodedAddress}

═══════════════════════════════════════════════════════════════════════════
```

### 2.2 Visual Design

```
SINGLE-LOCATION MAP — VISUAL SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

DESKTOP LAYOUT:
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  📍 Our Location                                                        │
│  ══════════════                                                         │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                                                                   │ │
│  │                                                                   │ │
│  │                    [GOOGLE MAPS EMBED]                           │ │
│  │                                                                   │ │
│  │                    300px height                                   │ │
│  │                                                                   │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  Unit 15, Trafford Park Industrial Estate                              │
│  Manchester, M17 1WA                                                   │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────────────────┐                 │
│  │   📋 Copy       │  │   📍 Get Directions         │                 │
│  └─────────────────┘  └─────────────────────────────┘                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

MOBILE LAYOUT:
┌───────────────────────────────┐
│                               │
│  📍 Our Location              │
│  ══════════════               │
│                               │
│  ┌───────────────────────┐   │
│  │                       │   │
│  │  [GOOGLE MAPS EMBED]  │   │
│  │                       │   │
│  │  200px height         │   │
│  │                       │   │
│  └───────────────────────┘   │
│                               │
│  Unit 15, Trafford Park      │
│  Manchester, M17 1WA         │
│                               │
│  ┌───────────────────────┐   │
│  │  📍 Get Directions    │   │
│  └───────────────────────┘   │
│                               │
│  ┌───────────────────────┐   │
│  │  📋 Copy Address      │   │
│  └───────────────────────┘   │
│                               │
└───────────────────────────────┘

DIMENSIONS:
├── Map container:
│   ├── Desktop height: 300px
│   ├── Mobile height: 200px
│   ├── Width: 100%
│   └── Border radius: 8px (overflow: hidden)
│
├── Section padding:
│   ├── Desktop: 32px
│   └── Mobile: 24px 16px
│
└── Buttons:
    ├── Height: 44px (touch target)
    ├── Desktop: Side by side
    └── Mobile: Stacked, full width

═══════════════════════════════════════════════════════════════════════════
```

### 2.3 React Component

```typescript
// components/maps/SingleLocationMap.tsx

'use client';

import { useState } from 'react';

interface SingleLocationMapProps {
  /** Entity name for accessibility */
  name: string;
  /** Location coordinates (preferred) */
  latitude?: number | null;
  longitude?: number | null;
  /** Address components (fallback) */
  address?: {
    line1?: string;
    line2?: string;
    city: string;
    postcode?: string;
  };
  /** Additional context text */
  contextNote?: string;
  /** Show copy button */
  showCopyButton?: boolean;
}

export function SingleLocationMap({
  name,
  latitude,
  longitude,
  address,
  contextNote,
  showCopyButton = true,
}: SingleLocationMapProps) {
  const [copied, setCopied] = useState(false);

  // Build full address string
  const fullAddress = address
    ? [address.line1, address.line2, address.city, address.postcode]
        .filter(Boolean)
        .join(', ')
    : '';

  // Generate embed URL (prefer coordinates)
  const embedUrl =
    latitude && longitude
      ? `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

  // Generate directions URL
  const directionsUrl =
    latitude && longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
      : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

  // Copy address to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Don't render if no location data
  if (!latitude && !longitude && !fullAddress) {
    return null;
  }

  return (
    <section className="py-8" aria-labelledby="location-heading">
      <h2 id="location-heading" className="text-xl font-bold mb-4 flex items-center gap-2">
        <span aria-hidden="true">📍</span>
        Our Location
      </h2>

      {/* Map Embed */}
      <div className="rounded-lg overflow-hidden mb-4 bg-gray-100">
        <iframe
          src={embedUrl}
          width="100%"
          height="300"
          className="h-[200px] md:h-[300px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing ${name} location in ${address?.city || 'the area'}`}
        />
      </div>

      {/* Address */}
      {address && (
        <address className="not-italic text-gray-700 mb-4">
          {address.line1 && <p>{address.line1}</p>}
          {address.line2 && <p>{address.line2}</p>}
          <p>
            {address.city}
            {address.postcode && `, ${address.postcode}`}
          </p>
        </address>
      )}

      {/* Context Note */}
      {contextNote && (
        <p className="text-sm text-gray-500 mb-4 flex items-start gap-2">
          <span aria-hidden="true">ℹ️</span>
          {contextNote}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {showCopyButton && fullAddress && (
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px]"
            aria-label={copied ? 'Address copied' : 'Copy address to clipboard'}
          >
            <span aria-hidden="true">{copied ? '✓' : '📋'}</span>
            {copied ? 'Copied!' : 'Copy Address'}
          </button>
        )}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1e40af] transition-colors min-h-[44px]"
        >
          <span aria-hidden="true">📍</span>
          Get Directions
        </a>
      </div>
    </section>
  );
}

export default SingleLocationMap;
```

### 2.4 Usage Examples

```typescript
// On Store Profile Page
<SingleLocationMap
  name={store.business_name}
  latitude={store.latitude}
  longitude={store.longitude}
  address={{
    line1: store.address_line1,
    line2: store.address_line2,
    city: store.city_name,
    postcode: store.postcode,
  }}
/>

// On Provider Profile Page
<SingleLocationMap
  name={provider.name}
  latitude={provider.latitude}
  longitude={provider.longitude}
  address={{
    line1: provider.address_line1,
    line2: provider.address_line2,
    city: provider.city_name,
    postcode: provider.postcode,
  }}
  contextNote="This is our base location. We cover all of Birmingham and surrounding areas."
/>
```

---

## 3. Multi-Location Maps (Listing Pages)

### 3.1 Technology: Leaflet.js + OpenStreetMap

```
MULTI-LOCATION MAP — TECHNOLOGY STACK
═══════════════════════════════════════════════════════════════════════════

LIBRARY: Leaflet.js
├── Version: 1.9.4 (latest stable)
├── License: BSD-2-Clause (open source)
├── Bundle size: ~42KB minified + gzipped
├── Documentation: https://leafletjs.com/
└── npm: npm install leaflet react-leaflet

TILE PROVIDER: OpenStreetMap
├── URL: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
├── Cost: FREE (community-funded)
├── Attribution: Required (see below)
└── Usage: Fair use, no hard limits

REQUIRED ATTRIBUTION:
├── Text: "© OpenStreetMap contributors"
├── Link: https://www.openstreetmap.org/copyright
├── Position: Bottom-right corner of map
└── Must be visible at all times

ADDITIONAL LIBRARIES:
├── react-leaflet: React bindings for Leaflet
├── leaflet-markercluster: Marker clustering (optional)
└── @types/leaflet: TypeScript types

npm install leaflet react-leaflet leaflet.markercluster
npm install -D @types/leaflet

═══════════════════════════════════════════════════════════════════════════
```

### 3.2 Feature Overview

```
MULTI-LOCATION MAP — FEATURES
═══════════════════════════════════════════════════════════════════════════

CORE FEATURES:
├── Interactive pan and zoom
├── Custom markers for stores/providers
├── Marker clustering (groups nearby markers)
├── Click marker → show popup with entity card
├── "View Profile" link in popup
├── Current location (with permission)
├── Fit bounds to show all markers
└── Mobile touch gestures

VIEW TOGGLE:
├── List View (default) — vertical list of cards
├── Map View — full map with markers
├── Toggle button in filter bar
└── Persists preference in localStorage

MARKER TYPES:
├── Store marker: 🏪 (retail pin)
├── Provider marker: 🔧 (repair pin)
├── Featured marker: ⭐ (gold pin)
├── Hybrid store: 🏪🔧 (dual badge)
└── Cluster marker: Circle with count

POPUP CONTENT:
├── Mini variant of Store/Provider Card
├── Name, rating, key features
├── "View Profile →" CTA button
└── Max width: 280px

═══════════════════════════════════════════════════════════════════════════
```

### 3.3 Visual Design — Map View

```
MULTI-LOCATION MAP — DESKTOP LAYOUT
═══════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────┐
│  FILTER BAR                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           ┌────────┬────────┐ │
│  │ Brand ▼  │ │ Grade ▼  │ │ Sort ▼   │           │ ☰ List │ 🗺️ Map│ │
│  └──────────┘ └──────────┘ └──────────┘           └────────┴────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                                                                   │ │
│  │                                                                   │ │
│  │                                                                   │ │
│  │                      [LEAFLET MAP]                               │ │
│  │                                                                   │ │
│  │            ┌──────────────────────┐                              │ │
│  │            │ 📍 ABC Appliances    │  ← Marker popup              │ │
│  │            │ ⭐ 4.8 (127 reviews) │                              │ │
│  │            │ 🚚 Free Delivery     │                              │ │
│  │            │                      │                              │ │
│  │     📍     │ [View Profile →]     │                              │ │
│  │            └──────────────────────┘     📍                       │ │
│  │                                              📍                   │ │
│  │       📍                                                          │ │
│  │                     📍                                            │ │
│  │   📍                                                              │ │
│  │                                                                   │ │
│  │                                                                   │ │
│  │  [+] [-]                          © OpenStreetMap contributors   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  Showing 15 stores on map                                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

DIMENSIONS:
├── Map height: 600px (desktop)
├── Map height: 400px (mobile)
├── Full width of content area
└── Border radius: 8px

═══════════════════════════════════════════════════════════════════════════
```

```
MULTI-LOCATION MAP — MOBILE LAYOUT
═══════════════════════════════════════════════════════════════════════════

┌───────────────────────────────┐
│  FILTER BAR                   │
│  ┌───────────┐ ┌───────────┐ │
│  │ Filters ▼ │ │ Sort ▼    │ │
│  └───────────┘ └───────────┘ │
│                               │
│  ┌───────────┬───────────┐   │
│  │  ☰ List   │  🗺️ Map   │   │
│  └───────────┴───────────┘   │
├───────────────────────────────┤
│                               │
│  ┌───────────────────────┐   │
│  │                       │   │
│  │                       │   │
│  │   [LEAFLET MAP]       │   │
│  │                       │   │
│  │   400px height        │   │
│  │                       │   │
│  │      📍               │   │
│  │           📍          │   │
│  │    📍                 │   │
│  │                       │   │
│  │ [+][-]    © OSM       │   │
│  └───────────────────────┘   │
│                               │
│  Showing 15 stores           │
│                               │
│  ┌───────────────────────┐   │
│  │ ▲ View List (15)      │   │  ← Bottom sheet trigger
│  └───────────────────────┘   │
│                               │
└───────────────────────────────┘

MOBILE BEHAVIOR:
├── Map takes full width
├── Tap marker → show popup
├── "View List" button → opens bottom sheet with cards
├── Swipe up on bottom sheet → expands to full list
└── Two-finger pinch to zoom

═══════════════════════════════════════════════════════════════════════════
```

### 3.4 View Toggle Component

```
VIEW TOGGLE — SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

VISUAL:
┌────────────────────────────┐
│                            │
│  ┌──────────┬──────────┐  │
│  │  ☰ List  │  🗺️ Map  │  │
│  └──────────┴──────────┘  │
│                            │
└────────────────────────────┘

STATES:
─────────────────────────────────────────────────────────────────────────────

List Active:
┌──────────┬──────────┐
│ ☰ List   │ 🗺️ Map  │
│ ━━━━━━━━ │          │  ← Underline indicates active
│ #2563eb  │ #6B7280  │
└──────────┴──────────┘

Map Active:
┌──────────┬──────────┐
│ ☰ List   │ 🗺️ Map  │
│          │ ━━━━━━━━ │
│ #6B7280  │ #2563eb  │
└──────────┴──────────┘

STYLING:
├── Container: flex, border rounded-lg, overflow hidden
├── Button width: Equal (50% each)
├── Button padding: 8px 16px
├── Font size: 14px
├── Active: Secondary text (#2563eb), 2px bottom border
├── Inactive: Gray text (#6B7280), no border
├── Hover: Light gray background (#F9FAFB)
├── Touch target: 44px minimum height
└── Transition: 150ms ease

BEHAVIOR:
├── Default: List view (SEO-friendly content visible)
├── Click Map → Switch to map view
├── Click List → Switch to list view
├── Preference saved in localStorage
├── URL does NOT change (view is client-side state)
└── Screen readers: "View as list" / "View on map"

═══════════════════════════════════════════════════════════════════════════
```

### 3.5 Marker Design

```
MAP MARKERS — DESIGN SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

STORE MARKER (Default):
─────────────────────────────────────────────────────────────────────────────
      ┌───┐
      │ 🏪 │   ← Emoji or icon
      └─┬─┘
        │     ← Pin stem
        ▼     ← Pin point

SVG SPECIFICATION:
├── Pin color: #2563eb (secondary)
├── Icon: Shopping bag or store icon
├── Size: 32×40px
├── Anchor: Bottom center (pin point)

PROVIDER MARKER:
─────────────────────────────────────────────────────────────────────────────
      ┌───┐
      │ 🔧 │   ← Wrench icon
      └─┬─┘
        │
        ▼

SVG SPECIFICATION:
├── Pin color: #059669 (emerald-600)
├── Icon: Wrench or tool icon
├── Size: 32×40px

FEATURED MARKER:
─────────────────────────────────────────────────────────────────────────────
      ┌───┐
      │ ⭐ │   ← Star or crown
      └─┬─┘
        │
        ▼

SVG SPECIFICATION:
├── Pin color: #F59E0B (amber-500)
├── Icon: Star
├── Size: 36×44px (slightly larger)
├── Z-index: Higher (appears on top)

CLUSTER MARKER:
─────────────────────────────────────────────────────────────────────────────
      ┌─────┐
      │  5  │   ← Count of markers
      └─────┘

SPECIFICATION:
├── Shape: Circle
├── Background: #2563eb (secondary)
├── Text color: White
├── Font: Bold, 14px
├── Size varies by count:
│   ├── 2-9: 40×40px
│   ├── 10-99: 50×50px
│   └── 100+: 60×60px
├── Click → Zoom in to expand cluster
└── Cluster radius: 80px

═══════════════════════════════════════════════════════════════════════════
```

### 3.6 Marker Popup Design

```
MARKER POPUP — SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

STORE POPUP:
─────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────┐
│                                │
│  ┌────┐  ABC APPLIANCES       │
│  │LOGO│  ⭐ 4.8 (127 reviews) │
│  │48px│                       │
│  └────┘  ✓ Verified           │
│                                │
│  🚚 Free Delivery • 12m Warranty│
│                                │
│  ┌────────────────────────┐   │
│  │    View Profile →      │   │
│  └────────────────────────┘   │
│                                │
└────────────────────────────────┘
        ▼
      (arrow pointing to marker)

PROVIDER POPUP:
─────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────┐
│                                │
│  ┌────┐  JOE'S REPAIRS        │
│  │LOGO│  ⭐ 4.9 (89 reviews)  │
│  │48px│                       │
│  └────┘  ✓ Gas Safe           │
│                                │
│  ⚡ Same-Day • From £45       │
│                                │
│  ┌────────────────────────┐   │
│  │    View Profile →      │   │
│  └────────────────────────┘   │
│                                │
└────────────────────────────────┘
        ▼

POPUP SPECIFICATIONS:
├── Max width: 280px
├── Padding: 16px
├── Background: White
├── Border radius: 8px
├── Box shadow: 0 4px 12px rgba(0,0,0,0.15)
├── Arrow: 10px triangle pointing to marker
├── Close button: X in top-right (optional, click outside closes)
├── Logo: 48×48px, rounded-md
├── Name: 16px, font-weight 600, line-clamp-1
├── Rating: 14px, inline with review count
├── Badges: 12px, gray text
├── CTA button: Full width, secondary background, white text

═══════════════════════════════════════════════════════════════════════════
```

### 3.7 React Implementation

```typescript
// components/maps/MultiLocationMap.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components (client-side only)
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Types
interface Location {
  id: string;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  type: 'store' | 'provider';
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  isFeatured?: boolean;
  badges?: string[];
  logoUrl?: string;
}

interface MultiLocationMapProps {
  /** Array of locations to display */
  locations: Location[];
  /** Center coordinates (defaults to first location or UK center) */
  center?: [number, number];
  /** Initial zoom level */
  zoom?: number;
  /** Map height */
  height?: string;
  /** Enable marker clustering */
  enableClustering?: boolean;
  /** Callback when marker is clicked */
  onMarkerClick?: (location: Location) => void;
}

// Default center: UK (approximately)
const UK_CENTER: [number, number] = [54.5, -2.5];
const DEFAULT_ZOOM = 10;

export function MultiLocationMap({
  locations,
  center,
  zoom = DEFAULT_ZOOM,
  height = '600px',
  enableClustering = true,
  onMarkerClick,
}: MultiLocationMapProps) {
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef<any>(null);

  // Ensure we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate center from locations if not provided
  const mapCenter = center || calculateCenter(locations) || UK_CENTER;

  // Calculate bounds to fit all markers
  useEffect(() => {
    if (mapRef.current && locations.length > 1) {
      const bounds = locations.map((loc) => [loc.latitude, loc.longitude] as [number, number]);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations]);

  // Don't render on server
  if (!isClient) {
    return (
      <div 
        className="bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <span className="text-gray-500">Loading map...</span>
      </div>
    );
  }

  // No locations
  if (locations.length === 0) {
    return (
      <div 
        className="bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <span className="text-gray-500">No locations to display</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden" style={{ height }}>
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        scrollWheelZoom={true}
      >
        {/* OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={getMarkerIcon(location)}
            eventHandlers={{
              click: () => onMarkerClick?.(location),
            }}
          >
            <Popup maxWidth={280} closeButton={false}>
              <MarkerPopupContent location={location} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

/**
 * Calculate center point from array of locations
 */
function calculateCenter(locations: Location[]): [number, number] | null {
  if (locations.length === 0) return null;
  
  const sumLat = locations.reduce((sum, loc) => sum + loc.latitude, 0);
  const sumLng = locations.reduce((sum, loc) => sum + loc.longitude, 0);
  
  return [sumLat / locations.length, sumLng / locations.length];
}

/**
 * Get custom marker icon based on location type
 */
function getMarkerIcon(location: Location) {
  // This requires importing L from leaflet
  // Implementation details in next section
  const L = require('leaflet');
  
  const iconUrl = location.isFeatured
    ? '/markers/featured-marker.svg'
    : location.type === 'store'
    ? '/markers/store-marker.svg'
    : '/markers/provider-marker.svg';

  return L.icon({
    iconUrl,
    iconSize: location.isFeatured ? [36, 44] : [32, 40],
    iconAnchor: location.isFeatured ? [18, 44] : [16, 40],
    popupAnchor: [0, -40],
  });
}

/**
 * Popup content component
 */
function MarkerPopupContent({ location }: { location: Location }) {
  return (
    <div className="p-3 min-w-[250px]">
      <div className="flex gap-3 mb-3">
        {/* Logo */}
        <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
          {location.logoUrl ? (
            <img
              src={location.logoUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">
              {location.type === 'store' ? '🏪' : '🔧'}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {location.name}
          </h3>
          {location.rating && (
            <p className="text-sm text-gray-600">
              ⭐ {location.rating}
              {location.reviewCount && (
                <span className="text-gray-400"> ({location.reviewCount} reviews)</span>
              )}
            </p>
          )}
          {location.isVerified && (
            <p className="text-sm text-green-600">✓ Verified</p>
          )}
        </div>
      </div>

      {/* Badges */}
      {location.badges && location.badges.length > 0 && (
        <p className="text-xs text-gray-500 mb-3 truncate">
          {location.badges.slice(0, 3).join(' • ')}
        </p>
      )}

      {/* CTA */}
      <a
        href={`/${location.type}/${location.slug}/`}
        className="block w-full text-center py-2 px-4 bg-[#2563eb] text-white text-sm font-medium rounded-lg hover:bg-[#1e40af] transition-colors"
      >
        View Profile →
      </a>
    </div>
  );
}

export default MultiLocationMap;
```

### 3.8 Leaflet CSS Import

```typescript
// app/layout.tsx or specific page

// Import Leaflet CSS (required)
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});
```

### 3.9 Custom Marker SVGs

```svg
<!-- public/markers/store-marker.svg -->
<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24s16-14 16-24c0-8.837-7.163-16-16-16z" fill="#2563eb"/>
  <circle cx="16" cy="14" r="8" fill="white"/>
  <text x="16" y="18" text-anchor="middle" font-size="12">🏪</text>
</svg>

<!-- public/markers/provider-marker.svg -->
<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24s16-14 16-24c0-8.837-7.163-16-16-16z" fill="#059669"/>
  <circle cx="16" cy="14" r="8" fill="white"/>
  <text x="16" y="18" text-anchor="middle" font-size="12">🔧</text>
</svg>

<!-- public/markers/featured-marker.svg -->
<svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 0C8.059 0 0 8.059 0 18c0 11 18 26 18 26s18-15 18-26c0-9.941-8.059-18-18-18z" fill="#F59E0B"/>
  <circle cx="18" cy="16" r="9" fill="white"/>
  <text x="18" y="20" text-anchor="middle" font-size="14">⭐</text>
</svg>
```

---

## 4. View Toggle Integration

### 4.1 List/Map View Toggle Component

```typescript
// components/maps/ViewToggle.tsx

'use client';

import { useState, useEffect } from 'react';

type ViewMode = 'list' | 'map';

interface ViewToggleProps {
  /** Current view mode */
  view: ViewMode;
  /** Callback when view changes */
  onChange: (view: ViewMode) => void;
  /** Storage key for persistence */
  storageKey?: string;
}

export function ViewToggle({ 
  view, 
  onChange, 
  storageKey = 'preferredView' 
}: ViewToggleProps) {
  // Load preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey) as ViewMode;
    if (saved && saved !== view) {
      onChange(saved);
    }
  }, []);

  // Save preference when changed
  const handleChange = (newView: ViewMode) => {
    localStorage.setItem(storageKey, newView);
    onChange(newView);
  };

  return (
    <div 
      className="inline-flex rounded-lg border border-gray-200 overflow-hidden"
      role="tablist"
      aria-label="View options"
    >
      <button
        role="tab"
        aria-selected={view === 'list'}
        onClick={() => handleChange('list')}
        className={`
          px-4 py-2 text-sm font-medium flex items-center gap-2 min-h-[44px]
          transition-colors
          ${view === 'list'
            ? 'text-[#2563eb] border-b-2 border-[#2563eb] bg-blue-50'
            : 'text-gray-500 hover:bg-gray-50'
          }
        `}
      >
        <span aria-hidden="true">☰</span>
        List
      </button>
      <button
        role="tab"
        aria-selected={view === 'map'}
        onClick={() => handleChange('map')}
        className={`
          px-4 py-2 text-sm font-medium flex items-center gap-2 min-h-[44px]
          transition-colors
          ${view === 'map'
            ? 'text-[#2563eb] border-b-2 border-[#2563eb] bg-blue-50'
            : 'text-gray-500 hover:bg-gray-50'
          }
        `}
      >
        <span aria-hidden="true">🗺️</span>
        Map
      </button>
    </div>
  );
}

export default ViewToggle;
```

### 4.2 Integration with Listing Pages

```typescript
// Example: app/[country]/[city]/[category]/page.tsx

'use client';

import { useState } from 'react';
import { ViewToggle } from '@/components/maps/ViewToggle';
import { MultiLocationMap } from '@/components/maps/MultiLocationMap';
import { StoreCard } from '@/components/store/StoreCard';
import { FilterBar } from '@/components/filters/FilterBar';

interface Props {
  stores: Store[];
  place: Place;
  category: Category;
}

export default function RetailCategoryContent({ stores, place, category }: Props) {
  const [view, setView] = useState<'list' | 'map'>('list');

  // Transform stores to map locations
  const mapLocations = stores
    .filter((store) => store.latitude && store.longitude)
    .map((store) => ({
      id: store.id,
      name: store.business_name,
      slug: store.slug,
      latitude: store.latitude!,
      longitude: store.longitude!,
      type: 'store' as const,
      rating: store.average_rating,
      reviewCount: store.review_count,
      isVerified: store.status === 'verified',
      isFeatured: store.is_featured,
      badges: [
        store.offers_free_delivery && 'Free Delivery',
        store.warranty_months && `${store.warranty_months}m Warranty`,
        store.offers_finance && 'Finance Available',
      ].filter(Boolean) as string[],
      logoUrl: store.logo_url,
    }));

  return (
    <div>
      {/* Filter Bar with View Toggle */}
      <FilterBar>
        {/* ... filter dropdowns ... */}
        <ViewToggle view={view} onChange={setView} />
      </FilterBar>

      {/* Results Count */}
      <p className="text-sm text-gray-600 mb-4">
        Showing {stores.length} stores
        {view === 'map' && mapLocations.length < stores.length && (
          <span> ({mapLocations.length} with location data)</span>
        )}
      </p>

      {/* List View */}
      {view === 'list' && (
        <div className="space-y-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} variant="full" />
          ))}
        </div>
      )}

      {/* Map View */}
      {view === 'map' && (
        <div>
          <MultiLocationMap
            locations={mapLocations}
            height="600px"
            enableClustering={mapLocations.length > 20}
          />
          
          {/* Stores without location data */}
          {mapLocations.length < stores.length && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                {stores.length - mapLocations.length} stores not shown on map (no location data)
              </p>
              <div className="space-y-2">
                {stores
                  .filter((s) => !s.latitude || !s.longitude)
                  .map((store) => (
                    <StoreCard key={store.id} store={store} variant="compact" />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## 5. Page-Specific Implementations

### 5.1 City Hub Page Map

```
CITY HUB MAP — SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

PAGE: /england/manchester/

SHOWS:
├── All stores in Manchester (retail)
├── All providers in Manchester (repair)
├── Mixed markers with type distinction

MARKER TYPES:
├── 🏪 Store marker (secondary)
├── 🔧 Provider marker (green)
├── ⭐ Featured (gold, either type)
└── 🏪🔧 Hybrid store (dual badge — store that also repairs)

FILTER INTEGRATION:
├── "Show Stores" checkbox
├── "Show Repair Engineers" checkbox
├── Both checked by default
└── Updates markers in real-time

DEFAULT BEHAVIOR:
├── Default view: List (SEO content visible)
├── Map shows ALL entities (stores + providers)
├── Fit bounds to show entire city area
└── Initial zoom: ~12 (city level)

═══════════════════════════════════════════════════════════════════════════
```

### 5.2 Retail Category Page Map

```
RETAIL CATEGORY MAP — SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

PAGE: /england/manchester/washing-machines/

SHOWS:
├── Only stores selling washing machines in Manchester
├── Filtered by category
└── Stores only (no providers)

MARKER TYPE:
├── 🏪 Store marker (secondary)
├── ⭐ Featured store (gold)
└── Clusters for dense areas

FILTER INTEGRATION:
├── Brand filter affects markers
├── Grade filter affects markers
├── Delivery filter affects markers
└── Sort does NOT affect map (relevance = map position)

DATA REQUIREMENTS:
├── Stores must have latitude/longitude
├── Filter: store_categories.category_id = {category_id}
├── Filter: stores.place_id = {place_id}
└── Only show stores with has_current_stock = true

═══════════════════════════════════════════════════════════════════════════
```

### 5.3 Repair Category Page Map

```
REPAIR CATEGORY MAP — SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

PAGE: /england/manchester/washing-machine-repair/

SHOWS:
├── Providers offering washing machine repair
├── Coverage area visualization (optional)
└── Providers only (no retail stores)

MARKER TYPE:
├── 🔧 Provider marker (green)
├── ⭐ Featured provider (gold)
├── 🛡️ Gas Safe marker (for gas appliances)
└── Clusters for dense areas

SPECIAL: GAS SAFE EMPHASIS
For gas appliance repair pages (cookers, ovens, hobs):
├── Show Gas Safe badge on marker
├── Filter: "Gas Safe Only" prominent
└── Non-Gas-Safe providers shown with warning

COVERAGE NOTE:
Providers may cover wide areas. Map shows BASE LOCATION.
"This engineer covers all of Greater Manchester."

═══════════════════════════════════════════════════════════════════════════
```

### 5.4 Brand Repair Page Map

```
BRAND REPAIR MAP — SPECIFICATION
═══════════════════════════════════════════════════════════════════════════

PAGE: /england/manchester/bosch-repair/

SHOWS:
├── Providers authorized for Bosch repair
├── Brand authorization emphasis
└── Providers only

MARKER TYPE:
├── 🔧 Provider marker with brand badge
├── ⭐ Featured/Authorized (gold)
└── Shows authorization level

AUTHORIZATION LEVELS:
├── Factory-trained: Gold star
├── Authorized service partner: Secondary badge
├── Uses genuine parts: Parts icon
└── General experience: Standard marker

═══════════════════════════════════════════════════════════════════════════
```

---

## 6. Performance Optimization

### 6.1 Lazy Loading

```typescript
// Only load map when user switches to map view
const [mapLoaded, setMapLoaded] = useState(false);

// When view changes to map
useEffect(() => {
  if (view === 'map' && !mapLoaded) {
    setMapLoaded(true);
  }
}, [view]);

// Render
{view === 'map' && mapLoaded && (
  <MultiLocationMap locations={locations} />
)}
```

### 6.2 Marker Clustering

```typescript
// Use marker clustering for performance with many markers
import MarkerClusterGroup from 'react-leaflet-cluster';

// Wrap markers in cluster group
<MarkerClusterGroup
  chunkedLoading
  spiderfyOnMaxZoom
  showCoverageOnHover={false}
  maxClusterRadius={80}
  disableClusteringAtZoom={16}
>
  {locations.map((loc) => (
    <Marker key={loc.id} position={[loc.latitude, loc.longitude]} />
  ))}
</MarkerClusterGroup>
```

### 6.3 Tile Caching

```typescript
// Browser will cache tiles automatically
// For additional caching, consider:

// Option 1: Use a CDN-backed tile server
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

// Option 2: Use Mapbox free tier (50k loads/month)
const MAPBOX_URL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
```

### 6.4 SSR Considerations

```typescript
// Leaflet requires window object (browser only)
// Always use dynamic import with ssr: false

const MapComponent = dynamic(
  () => import('@/components/maps/MultiLocationMap'),
  { 
    ssr: false,
    loading: () => <MapSkeleton />
  }
);
```

---

## 7. Accessibility Requirements

### 7.1 WCAG 2.1 AA Compliance

```
ACCESSIBILITY REQUIREMENTS
═══════════════════════════════════════════════════════════════════════════

KEYBOARD NAVIGATION:
├── Tab to map → Focus on map container
├── Tab through markers (via list alternative)
├── Enter on marker → Open popup
├── Escape → Close popup
├── Arrow keys → Pan map (when focused)
├── +/- keys → Zoom in/out
└── Skip link: "Skip to map" / "Skip map"

SCREEN READER SUPPORT:
├── Map container: role="application"
├── aria-label: "Map showing {count} locations in {city}"
├── Each marker: aria-label with business name
├── Popup: role="dialog", aria-modal="true"
├── Announce marker count on view switch
└── List alternative always available

ALTERNATIVE ACCESS:
├── List view is default (fully accessible)
├── All information in map is also in list
├── "View as list" always available
└── Screen readers can use list instead of map

COLOR CONTRAST:
├── Marker icons: High contrast against map
├── Popup text: Meets 4.5:1 ratio
├── CTA buttons: Meets 4.5:1 ratio
└── Attribution text: Meets 4.5:1 ratio

MOTION:
├── Respect prefers-reduced-motion
├── Disable smooth pan/zoom animations
├── Instant transitions for reduced motion users

═══════════════════════════════════════════════════════════════════════════
```

### 7.2 Screen Reader Implementation

```typescript
// Accessible map container
<div
  role="application"
  aria-label={`Interactive map showing ${locations.length} ${
    entityType === 'store' ? 'stores' : 'repair engineers'
  } in ${cityName}`}
  tabIndex={0}
>
  <MapContainer ... />
</div>

// Skip link before map
<a 
  href="#after-map" 
  className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white"
>
  Skip map
</a>

// Anchor after map
<div id="after-map" tabIndex={-1} />

// Screen reader announcement on view change
const announceViewChange = (view: 'list' | 'map', count: number) => {
  const message = view === 'map'
    ? `Switched to map view. ${count} locations displayed.`
    : `Switched to list view. ${count} results displayed.`;
  
  // Use aria-live region
  setAnnouncement(message);
};
```

---

## 8. Mobile Considerations

### 8.1 Touch Interactions

```
MOBILE MAP INTERACTIONS
═══════════════════════════════════════════════════════════════════════════

GESTURES:
├── Single tap: Select marker
├── Double tap: Zoom in
├── Two-finger pinch: Zoom in/out
├── Two-finger drag: Pan map
├── Single-finger drag: Pan map (default)
└── Long press: Not used (conflicts with OS)

LEAFLET CONFIGURATION:
├── tap: true
├── tapTolerance: 15 (pixels)
├── touchZoom: true
├── dragging: true
├── bounceAtZoomLimits: true
├── inertia: true
└── inertiaDeceleration: 3000

DISABLE SCROLL HIJACK:
├── scrollWheelZoom: false (by default on mobile)
├── User must use two fingers to zoom
└── Prevents accidental zoom while scrolling page

═══════════════════════════════════════════════════════════════════════════
```

### 8.2 Mobile-Specific UI

```
MOBILE MAP UI
═══════════════════════════════════════════════════════════════════════════

MAP HEIGHT:
├── Portrait: 400px (50% of viewport)
├── Landscape: 300px (to leave room for list)

POPUP BEHAVIOR:
├── Opens at bottom of map
├── Full width minus padding
├── Tap outside to close
├── Swipe down to close

BOTTOM SHEET (Optional):
├── Collapsed: Shows "View list (15)" at bottom
├── Half expanded: Shows first 3-4 cards
├── Full expanded: Full scrollable list
└── Drag handle for interaction

ZOOM CONTROLS:
├── Show +/- buttons on mobile
├── Position: Bottom-right
├── Size: 44×44px (touch target)
└── Opacity: 80% (not fully opaque)

═══════════════════════════════════════════════════════════════════════════
```

---

## 9. Data Requirements

### 9.1 Database Fields Used

```sql
-- STORES (for store maps)
stores.id
stores.business_name
stores.slug
stores.latitude          -- Required for map
stores.longitude         -- Required for map
stores.average_rating
stores.review_count
stores.status
stores.is_featured
stores.logo_url
stores.offers_delivery
stores.offers_free_delivery
stores.warranty_months
stores.offers_finance

-- SERVICE_PROVIDERS (for provider maps)
service_providers.id
service_providers.name
service_providers.slug
service_providers.latitude   -- Required for map
service_providers.longitude  -- Required for map
service_providers.average_rating
service_providers.review_count
service_providers.is_verified
service_providers.is_featured
service_providers.logo_url
service_providers.offers_same_day
service_providers.callout_fee_from
service_providers.gas_safe_registered
```

### 9.2 Query for Map Locations

```typescript
// Get stores with location data for map
async function getStoresForMap(placeId: string, categoryId?: string) {
  let query = supabase
    .from('stores')
    .select(`
      id,
      business_name,
      slug,
      latitude,
      longitude,
      average_rating,
      review_count,
      status,
      is_featured,
      logo_url,
      offers_free_delivery,
      warranty_months,
      offers_finance
    `)
    .eq('place_id', placeId)
    .eq('is_active', true)
    .not('latitude', 'is', null)
    .not('longitude', 'is', null);

  if (categoryId) {
    query = query.in(
      'id',
      supabase
        .from('store_categories')
        .select('store_id')
        .eq('category_id', categoryId)
        .eq('has_current_stock', true)
    );
  }

  return query;
}

// Get providers with location data for map
async function getProvidersForMap(placeId: string, categoryId?: string) {
  let query = supabase
    .from('service_providers')
    .select(`
      id,
      name,
      slug,
      latitude,
      longitude,
      average_rating,
      review_count,
      is_verified,
      is_featured,
      logo_url,
      offers_same_day,
      callout_fee_from,
      gas_safe_registered
    `)
    .eq('place_id', placeId)
    .eq('is_active', true)
    .not('latitude', 'is', null)
    .not('longitude', 'is', null);

  if (categoryId) {
    query = query.in(
      'id',
      supabase
        .from('provider_categories')
        .select('provider_id')
        .eq('category_id', categoryId)
    );
  }

  return query;
}
```

### 9.3 Geocoding Considerations

```
GEOCODING STRATEGY
═══════════════════════════════════════════════════════════════════════════

CURRENT DATA STATE:
├── latitude/longitude fields exist in database
├── Some entries may be NULL
├── Address data always available

GEOCODING OPTIONS:
─────────────────────────────────────────────────────────────────────────────

OPTION 1: Manual Entry (Current)
├── Store/provider owners enter coordinates
├── Or: Extract from Google Maps URL they provide
├── Pros: No API costs
└── Cons: May have gaps

OPTION 2: Batch Geocoding (One-time)
├── Use free tier of geocoding API
├── OpenCage: 2,500 requests/day free
├── Nominatim: 1 request/second, free
├── Run batch job to fill NULL coordinates
└── Pros: Complete data

OPTION 3: On-Demand Geocoding
├── Geocode when store is created/updated
├── Cache result in database
├── Fallback: Don't show on map
└── Pros: Always accurate

RECOMMENDATION:
Use Nominatim (OpenStreetMap's geocoder) for batch filling:
├── FREE
├── No API key required
├── UK address format well supported
├── Rate limit: 1 request/second
└── Run nightly job to geocode new entries

═══════════════════════════════════════════════════════════════════════════
```

---

## 10. Integration with Existing Specs

### 10.1 Spec Cross-References

| Spec | Integration Point |
|------|-------------------|
| **Spec 06 (Store Profile)** | Single-location map component replaces existing implementation |
| **Spec 07 (City Hub)** | Add List/Map toggle for stores + providers sections |
| **Spec 08 (Store Card)** | Mini variant used in map popups |
| **Spec 09 (Provider Card)** | Mini variant used in map popups |
| **Spec 10 (Repair Category)** | Add List/Map toggle for providers |
| **Spec 11 (Provider Profile)** | Single-location map component replaces existing implementation |
| **Spec 14 (Retail Category)** | Add List/Map toggle for stores |
| **Spec 15 (Brand Repair)** | Add List/Map toggle for providers |
| **Spec 18 (Filter & Sort)** | Filters apply to map markers |

### 10.2 Component File Structure

```
PROJECT STRUCTURE — MAP COMPONENTS
═══════════════════════════════════════════════════════════════════════════

src/
├── components/
│   └── maps/
│       ├── SingleLocationMap.tsx      ← Profile page maps
│       ├── MultiLocationMap.tsx       ← Listing page maps
│       ├── ViewToggle.tsx             ← List/Map toggle
│       ├── MapMarker.tsx              ← Custom marker component
│       ├── MarkerPopup.tsx            ← Popup content
│       ├── MapSkeleton.tsx            ← Loading state
│       └── index.ts                   ← Exports
│
├── lib/
│   └── maps/
│       ├── constants.ts               ← UK_CENTER, zoom levels
│       ├── utils.ts                   ← calculateCenter, etc.
│       └── types.ts                   ← Location interfaces
│
├── public/
│   └── markers/
│       ├── store-marker.svg
│       ├── provider-marker.svg
│       └── featured-marker.svg
│
└── styles/
    └── maps.css                       ← Map-specific styles

═══════════════════════════════════════════════════════════════════════════
```

---

## 11. Testing Checklist

### 11.1 Functional Tests

```
FUNCTIONAL TESTING CHECKLIST
═══════════════════════════════════════════════════════════════════════════

SINGLE-LOCATION MAP:
□ Map loads with coordinates
□ Map loads with address fallback
□ Map shows correct location pin
□ Map is interactive (zoom, pan)
□ "Get Directions" opens Google Maps
□ "Copy Address" copies to clipboard
□ Copy button shows "Copied!" feedback
□ Mobile: Smaller height (200px)
□ Lazy loading works (loading="lazy")

MULTI-LOCATION MAP:
□ Map loads with multiple markers
□ Markers positioned correctly
□ Click marker → popup opens
□ Popup shows correct entity info
□ "View Profile" link works
□ Clustering works (20+ markers)
□ Click cluster → zoom in
□ Fit bounds shows all markers
□ Mobile: Touch gestures work
□ Mobile: Two-finger zoom works

VIEW TOGGLE:
□ Default view is List
□ Toggle to Map works
□ Toggle to List works
□ Preference saved in localStorage
□ Preference restored on page load
□ Keyboard accessible (Tab, Enter)

FILTER INTEGRATION:
□ Filters update map markers
□ Filtered-out stores not on map
□ Marker count updates
□ Empty state handled

═══════════════════════════════════════════════════════════════════════════
```

### 11.2 Accessibility Tests

```
ACCESSIBILITY TESTING CHECKLIST
═══════════════════════════════════════════════════════════════════════════

KEYBOARD:
□ Tab to toggle buttons
□ Enter activates toggle
□ Tab to/through map area
□ Escape closes popup
□ Skip link works

SCREEN READER:
□ Map has aria-label with location count
□ Toggle buttons announce state
□ Popup announced as dialog
□ Alternative list always available

COLOR:
□ Markers visible on map
□ Popup text contrast 4.5:1+
□ Button contrast 4.5:1+

MOTION:
□ prefers-reduced-motion respected
□ Animations disabled when preferred

═══════════════════════════════════════════════════════════════════════════
```

### 11.3 Performance Tests

```
PERFORMANCE TESTING CHECKLIST
═══════════════════════════════════════════════════════════════════════════

LOAD TIME:
□ Map loads within 2 seconds
□ Tiles load progressively
□ No blocking of main thread

MARKERS:
□ 10 markers: Instant render
□ 50 markers: <500ms render
□ 100 markers: <1s render (clustered)
□ 500 markers: <2s render (clustered)

MEMORY:
□ No memory leaks on view toggle
□ Cleanup on unmount
□ Efficient marker rendering

CACHING:
□ Tiles cached by browser
□ Subsequent loads faster
□ Offline: Show cached tiles

═══════════════════════════════════════════════════════════════════════════
```

### 11.4 Browser Compatibility

```
BROWSER COMPATIBILITY
═══════════════════════════════════════════════════════════════════════════

DESKTOP:
□ Chrome (latest 2 versions)
□ Firefox (latest 2 versions)
□ Safari (latest 2 versions)
□ Edge (latest 2 versions)

MOBILE:
□ Safari iOS 14+
□ Chrome Android
□ Samsung Internet

KNOWN ISSUES:
├── IE11: Not supported (Leaflet requirement)
└── Old Safari: May have tile loading delays

═══════════════════════════════════════════════════════════════════════════
```

---

## 12. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial specification |

---

## Appendix A: Quick Reference

```
MAP QUICK REFERENCE
═══════════════════════════════════════════════════════════════════════════

SINGLE-LOCATION (Profile Pages):
├── Technology: Google Maps iframe
├── Cost: FREE
├── Embed URL: https://www.google.com/maps?q={lat},{lng}&output=embed
└── Height: 300px desktop, 200px mobile

MULTI-LOCATION (Listing Pages):
├── Technology: Leaflet.js + OpenStreetMap
├── Cost: FREE
├── Tile URL: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
├── Height: 600px desktop, 400px mobile
└── Attribution: Required (© OpenStreetMap contributors)

MARKER COLORS:
├── Store: #2563eb (secondary)
├── Provider: #059669 (green)
├── Featured: #F59E0B (gold)

NPM PACKAGES:
├── leaflet: ^1.9.4
├── react-leaflet: ^4.2.1
└── @types/leaflet: ^1.9.8

═══════════════════════════════════════════════════════════════════════════
```

---

**END OF SPECIFICATION**
