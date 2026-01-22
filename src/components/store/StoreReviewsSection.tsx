'use client'

import { useState } from 'react'
import { Star, CheckCircle, ChevronDown } from 'lucide-react'

interface Review {
  id: string
  rating: number
  title: string | null
  content: string | null
  reviewer_name: string | null
  reviewer_location: string | null
  is_verified_customer: boolean
  created_at: string
  response: string | null
  response_at: string | null
}

interface Props {
  reviews: Review[]
  averageRating: number | null
  reviewCount: number
  storeName: string
}

/**
 * Customer Reviews Section (Spec 06 - Section 10)
 */
export default function StoreReviewsSection({
  reviews,
  averageRating,
  reviewCount,
  storeName,
}: Props) {
  const [showAll, setShowAll] = useState(false)

  if (reviews.length === 0 && reviewCount === 0) return null

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  // Calculate rating distribution (mock for now)
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
    return { rating, count, percentage }
  })

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Average Rating */}
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-gray-900 mb-1">
            {averageRating ? averageRating.toFixed(1) : 'N/A'}
          </div>
          {averageRating && (
            <div className="flex justify-center md:justify-start mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
          <p className="text-sm text-gray-500">Based on {reviewCount} reviews</p>
        </div>

        {/* Rating Distribution */}
        {reviews.length > 0 && (
          <div className="flex-1 space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-12">{rating} star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} storeName={storeName} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          No reviews yet. Be the first to review {storeName}!
        </p>
      )}

      {/* Show More */}
      {reviews.length > 3 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-6 flex items-center gap-1 text-[#e85d4c] font-medium hover:underline"
        >
          Show all {reviews.length} reviews
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </section>
  )
}

function ReviewCard({
  review,
  storeName,
}: {
  review: Review
  storeName: string
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="border border-gray-200 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900">
              {review.reviewer_name || 'Anonymous'}
            </span>
            {review.is_verified_customer && (
              <span className="inline-flex items-center gap-1 text-xs text-green-700">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
          </div>
          {review.reviewer_location && (
            <span className="text-sm text-gray-500">{review.reviewer_location}</span>
          )}
        </div>
        <span className="text-sm text-gray-400">{formatDate(review.created_at)}</span>
      </div>

      {/* Rating */}
      <div className="flex mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= review.rating
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Title */}
      {review.title && (
        <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
      )}

      {/* Content */}
      {review.content && (
        <p className="text-gray-600 text-sm leading-relaxed">{review.content}</p>
      )}

      {/* Response */}
      {review.response && (
        <div className="mt-4 pl-4 border-l-2 border-[#e85d4c]">
          <p className="text-sm font-medium text-gray-900 mb-1">
            Response from {storeName}
          </p>
          <p className="text-sm text-gray-600">{review.response}</p>
          {review.response_at && (
            <span className="text-xs text-gray-400 mt-1 block">
              {formatDate(review.response_at)}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
