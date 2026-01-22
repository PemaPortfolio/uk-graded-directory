import Link from 'next/link'
import { MapPin, Star, CheckCircle, Zap, Phone, PoundSterling } from 'lucide-react'
import type { SearchResultProvider } from '@/lib/data/getSearchResults'

interface Props {
  provider: SearchResultProvider
}

/**
 * Provider Card for Search Results
 */
export default function SearchProviderCard({ provider }: Props) {
  return (
    <Link
      href={`/provider/${provider.slug}/`}
      className="block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
            <span className="text-3xl">🔧</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#e85d4c] transition-colors">
                  {provider.name}
                </h3>
                {provider.average_rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-900">
                      {provider.average_rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({provider.review_count} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-col items-end gap-1">
                {provider.is_featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                    Featured
                  </span>
                )}
                {provider.is_verified && (
                  <span className="flex items-center gap-1 text-green-600 text-xs">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
              <MapPin className="w-4 h-4" />
              <span>
                {provider.city_name || ''}
                {provider.postcode && `, ${provider.postcode}`}
              </span>
            </div>

            {/* Description */}
            {provider.short_description && (
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {provider.short_description}
              </p>
            )}

            {/* Features */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {provider.offers_same_day && (
                <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                  <Zap className="w-3 h-3" />
                  Same-day
                </span>
              )}
              {provider.offers_emergency && (
                <span className="flex items-center gap-1 text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded">
                  <Phone className="w-3 h-3" />
                  Emergency
                </span>
              )}
              {provider.callout_fee_from && (
                <span className="flex items-center gap-1 text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                  <PoundSterling className="w-3 h-3" />
                  From {provider.callout_fee_from}
                </span>
              )}
              <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded font-medium">
                Repair Engineer
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
