import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import type { Guide } from '@/lib/data/getGuidesIndexData'

interface GuideCardProps {
  guide: Guide
  variant?: 'default' | 'featured'
}

/**
 * Guide Card Component
 *
 * Displays a guide preview card for the guides index page.
 * Featured variant has a larger layout with image.
 */
export default function GuideCard({ guide, variant = 'default' }: GuideCardProps) {
  const isFeatured = variant === 'featured'

  return (
    <Link
      href={`/guides/${guide.slug}/`}
      className={`group block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-[#e85d4c]/30 transition-all duration-200 ${
        isFeatured ? 'md:flex' : ''
      }`}
    >
      {/* Image (if featured or has image) */}
      {guide.featured_image_url && (
        <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-700 ${
          isFeatured ? 'md:w-2/5 h-48 md:h-auto' : 'h-40'
        }`}>
          <img
            src={guide.featured_image_url}
            alt={guide.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {guide.is_featured && (
            <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white bg-[#e85d4c] rounded-md">
              Featured
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`p-5 ${isFeatured ? 'md:flex-1 md:p-6' : ''}`}>
        {/* Category Tag */}
        {guide.category && (
          <span className="inline-block px-2 py-1 text-xs font-medium text-[#e85d4c] bg-[#e85d4c]/10 rounded-md mb-3">
            {guide.category.name}
          </span>
        )}

        {/* Title */}
        <h2 className={`font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#e85d4c] transition-colors ${
          isFeatured ? 'text-xl md:text-2xl mb-3' : 'text-lg mb-2'
        }`}>
          {guide.title}
        </h2>

        {/* Excerpt */}
        {guide.excerpt && (
          <p className={`text-gray-600 dark:text-gray-300 line-clamp-2 ${
            isFeatured ? 'text-base mb-4' : 'text-sm mb-3'
          }`}>
            {guide.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Reading Time */}
          {guide.reading_time_minutes && (
            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              {guide.reading_time_minutes} min read
            </span>
          )}

          {/* Read More Arrow */}
          <span className="flex items-center gap-1 text-sm font-medium text-[#e85d4c] group-hover:gap-2 transition-all">
            Read More
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
