'use client'

/**
 * Marker Popup Component (Spec 20)
 *
 * Popup content for map markers showing mini card.
 */

import Link from 'next/link'
import { Star, BadgeCheck, Truck, Wrench, Clock, Shield } from 'lucide-react'

interface MarkerPopupProps {
  id: string
  name: string
  slug: string
  type: 'store' | 'provider'
  rating?: number | null
  reviewCount?: number
  isVerified?: boolean
  isFeatured?: boolean
  badges?: string[]
  logoUrl?: string | null
}

export function MarkerPopup({
  name,
  slug,
  type,
  rating,
  reviewCount,
  isVerified,
  badges = [],
  logoUrl,
}: MarkerPopupProps) {
  const profileUrl = type === 'store' ? `/store/${slug}/` : `/provider/${slug}/`

  // Get relevant badges to display (max 2)
  const displayBadges = badges.slice(0, 2)

  return (
    <div className="min-w-[240px] max-w-[280px]">
      {/* Header with logo and name */}
      <div className="flex items-start gap-3 mb-3">
        {/* Logo */}
        <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl">
              {type === 'store' ? '🏪' : '🔧'}
            </span>
          )}
        </div>

        {/* Name and rating */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-1">
            {name}
          </h3>

          {/* Rating */}
          {rating && rating > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {rating.toFixed(1)}
              </span>
              {reviewCount && reviewCount > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Verified badge */}
          {isVerified && (
            <div className="flex items-center gap-1 mt-1">
              <BadgeCheck className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs text-green-600 font-medium">Verified</span>
            </div>
          )}
        </div>
      </div>

      {/* Badges */}
      {displayBadges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {displayBadges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300"
            >
              {getBadgeIcon(badge)}
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* CTA Button */}
      <Link
        href={profileUrl}
        className="
          block w-full
          px-4 py-2
          bg-[#e85d4c] hover:bg-[#d94f3f]
          text-white text-sm font-medium text-center
          rounded-md
          transition-colors
        "
      >
        View Profile →
      </Link>
    </div>
  )
}

function getBadgeIcon(badge: string) {
  const lower = badge.toLowerCase()

  if (lower.includes('delivery') || lower.includes('free')) {
    return <Truck className="w-3 h-3" />
  }
  if (lower.includes('same-day') || lower.includes('same day')) {
    return <Clock className="w-3 h-3" />
  }
  if (lower.includes('gas safe') || lower.includes('insured')) {
    return <Shield className="w-3 h-3" />
  }
  if (lower.includes('repair') || lower.includes('warranty')) {
    return <Wrench className="w-3 h-3" />
  }

  return null
}

export default MarkerPopup
