'use client'

import { Star } from 'lucide-react'
import { RatingDisplay } from './RatingDisplay'
import type { ReviewsSectionProps } from '@/types/reviews'

/**
 * Reviews Section Component (Spec 21)
 *
 * Profile page section that displays rating summary and Google Reviews links.
 * Uses the Google Reviews strategy - no internal review storage.
 *
 * @example
 * <ReviewsSection
 *   entityType="store"
 *   entityName="Best Graded Appliances"
 *   averageRating={4.8}
 *   reviewCount={127}
 *   googleMapsUrl="https://maps.google.com/..."
 * />
 */
export function ReviewsSection({
  entityType,
  entityName,
  averageRating,
  reviewCount,
  googleMapsUrl,
}: ReviewsSectionProps) {
  // Hide section if no data at all
  if (!averageRating && reviewCount === 0 && !googleMapsUrl) {
    return null
  }

  const entityLabel = entityType === 'store' ? 'store' : 'engineer'

  return (
    <section className="py-8 border-b border-gray-200 dark:border-gray-700" aria-labelledby="reviews-heading">
      <h2
        id="reviews-heading"
        className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2"
      >
        <Star className="w-5 h-5 text-amber-400 fill-amber-400" aria-hidden="true" />
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
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2 mt-4">
          <span aria-hidden="true">💡</span>
          <span>
            Reviews are hosted on Google Maps. Click &quot;Read Reviews&quot; to see what
            customers say about {entityName}.
          </span>
        </p>
      )}

      {/* No Google URL state */}
      {!googleMapsUrl && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-4">
          {entityType === 'provider'
            ? `This ${entityLabel} hasn't set up Google Reviews yet. Contact them directly for references.`
            : 'Google Reviews coming soon. Check back later!'}
        </p>
      )}
    </section>
  )
}

export default ReviewsSection
