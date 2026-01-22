/**
 * Review Types (Spec 21)
 *
 * TypeScript interfaces for the review display system.
 * Uses Google Reviews strategy - linking out to Google Maps.
 */

/**
 * Rating data available on stores and providers
 */
export interface RatingData {
  average_rating: number | null
  review_count: number
  google_maps_url: string | null
}

/**
 * Rating display variants
 */
export type RatingVariant = 'inline' | 'stacked' | 'compact' | 'detailed'

/**
 * Props for rating display component
 */
export interface RatingDisplayProps {
  /** Average rating (0-5) */
  rating: number | null
  /** Total review count */
  reviewCount: number
  /** Display variant */
  variant?: RatingVariant
  /** Google Maps URL for links */
  googleMapsUrl?: string | null
  /** Entity name for accessibility */
  entityName?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * Props for reviews section component
 */
export interface ReviewsSectionProps {
  /** Entity type for copy text */
  entityType: 'store' | 'provider'
  /** Entity name for copy text */
  entityName: string
  /** Average rating (0-5) */
  averageRating: number | null
  /** Total review count */
  reviewCount: number
  /** Google Maps URL */
  googleMapsUrl: string | null
}

/**
 * Schema.org AggregateRating structure
 */
export interface AggregateRatingSchema {
  '@type': 'AggregateRating'
  ratingValue: string
  reviewCount: string
  bestRating: string
  worstRating: string
}

/**
 * Star display calculation result
 */
export interface StarDisplayResult {
  filled: number
  half: boolean
  empty: number
}

/**
 * Review display state for fallback handling
 */
export interface ReviewDisplayState {
  showRating: boolean
  showButtons: boolean
  showFallbackMessage: boolean
  fallbackMessage: string | null
}
