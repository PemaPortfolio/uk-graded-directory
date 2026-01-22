'use client'

import { Star } from 'lucide-react'
import type { RatingDisplayProps, StarDisplayResult } from '@/types/reviews'

/**
 * Calculate filled, half, and empty stars from rating
 */
function getStarDisplay(rating: number): StarDisplayResult {
  const filled = Math.floor(rating)
  const decimal = rating - filled
  const half = decimal >= 0.25 && decimal < 0.75
  const extraFilled = decimal >= 0.75 ? 1 : 0

  return {
    filled: filled + extraFilled,
    half: half && extraFilled === 0,
    empty: Math.max(0, 5 - filled - extraFilled - (half && extraFilled === 0 ? 1 : 0)),
  }
}

/**
 * Rating Display Component (Spec 21)
 *
 * Displays ratings with 4 variants:
 * - inline: Compact for cards and search results
 * - stacked: Two-line for profile hero
 * - compact: Minimal for map popups
 * - detailed: Full section with Google links
 */
export function RatingDisplay({
  rating,
  reviewCount,
  variant = 'inline',
  googleMapsUrl,
  entityName = 'this business',
  className = '',
}: RatingDisplayProps) {
  // Don't render if no rating and no reviews
  if (!rating && reviewCount === 0) {
    return null
  }

  // Format rating to 1 decimal place
  const formattedRating = rating ? rating.toFixed(1) : null

  // Accessibility label
  const ariaLabel = rating
    ? `Rating: ${formattedRating} out of 5 stars${reviewCount > 0 ? `, ${reviewCount} reviews` : ''}`
    : 'No rating yet'

  switch (variant) {
    case 'compact':
      return (
        <div className={`flex items-center gap-1 ${className}`} aria-label={ariaLabel}>
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {formattedRating}
          </span>
        </div>
      )

    case 'stacked':
      return (
        <div className={className} aria-label={ariaLabel}>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {formattedRating}
            </span>
          </div>
          {reviewCount > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {reviewCount} review{reviewCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      )

    case 'detailed':
      return (
        <DetailedRating
          rating={rating}
          reviewCount={reviewCount}
          googleMapsUrl={googleMapsUrl}
          entityName={entityName}
          className={className}
        />
      )

    case 'inline':
    default:
      return (
        <div className={`flex items-center gap-1 ${className}`} aria-label={ariaLabel}>
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
          <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {formattedRating}
          </span>
          {reviewCount > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">({reviewCount})</span>
          )}
        </div>
      )
  }
}

/**
 * Detailed rating variant with 5 stars and Google links
 */
function DetailedRating({
  rating,
  reviewCount,
  googleMapsUrl,
  entityName,
  className = '',
}: {
  rating: number | null
  reviewCount: number
  googleMapsUrl?: string | null
  entityName: string
  className?: string
}) {
  const { filled, half, empty } = rating
    ? getStarDisplay(rating)
    : { filled: 0, half: false, empty: 5 }

  const ariaLabel = rating
    ? `Rating for ${entityName}: ${rating.toFixed(1)} out of 5 stars, based on ${reviewCount} reviews`
    : `No rating yet for ${entityName}`

  return (
    <div
      className={`bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 ${className}`}
      aria-label={ariaLabel}
    >
      {/* Star Display */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex" aria-hidden="true">
          {/* Filled stars */}
          {Array.from({ length: filled }).map((_, i) => (
            <Star key={`filled-${i}`} className="w-6 h-6 text-amber-400 fill-amber-400" />
          ))}
          {/* Half star (rendered as filled for simplicity) */}
          {half && <Star className="w-6 h-6 text-amber-400 fill-amber-400" />}
          {/* Empty stars */}
          {Array.from({ length: empty }).map((_, i) => (
            <Star key={`empty-${i}`} className="w-6 h-6 text-gray-300 dark:text-gray-600" />
          ))}
        </div>
        {rating && (
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {rating.toFixed(1)} out of 5
          </span>
        )}
      </div>

      {/* Review count */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {reviewCount > 0
          ? `Based on ${reviewCount} review${reviewCount !== 1 ? 's' : ''} on Google`
          : 'No reviews yet'}
      </p>

      {/* Action buttons */}
      {googleMapsUrl && (
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            <span aria-hidden="true">📖</span>
            Read Reviews
            <span className="sr-only">on Google (opens in new tab)</span>
          </a>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#e85d4c] text-white rounded-lg hover:bg-[#d94f3f] transition-colors text-sm font-medium"
          >
            <span aria-hidden="true">✏️</span>
            Write a Review
            <span className="sr-only">on Google (opens in new tab)</span>
          </a>
        </div>
      )}

      {/* No Google URL fallback */}
      {!googleMapsUrl && reviewCount === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          Reviews coming soon. Check back later!
        </p>
      )}
    </div>
  )
}

export default RatingDisplay
