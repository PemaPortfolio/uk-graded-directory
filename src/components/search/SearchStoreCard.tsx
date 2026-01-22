import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, CheckCircle, Truck } from 'lucide-react'
import type { SearchResultStore } from '@/lib/data/getSearchResults'

interface Props {
  store: SearchResultStore
}

/**
 * Store Card for Search Results
 */
export default function SearchStoreCard({ store }: Props) {
  return (
    <Link
      href={`/store/${store.slug}/`}
      className="block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {store.logo_url ? (
              <Image
                src={store.logo_url}
                alt={`${store.name} logo`}
                width={64}
                height={64}
                className="rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                  {store.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#e85d4c] transition-colors">
                  {store.name}
                </h3>
                {store.average_rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-900">
                      {store.average_rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({store.review_count} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-col items-end gap-1">
                {store.is_featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                    Featured
                  </span>
                )}
                {store.is_verified && (
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
                {store.city_name || ''}
                {store.postcode && `, ${store.postcode}`}
              </span>
            </div>

            {/* Description */}
            {store.short_description && (
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {store.short_description}
              </p>
            )}

            {/* Delivery badges */}
            <div className="flex items-center gap-2 mt-3">
              {store.has_delivery_nationwide && (
                <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                  <Truck className="w-3 h-3" />
                  Nationwide delivery
                </span>
              )}
              {store.has_delivery_local && !store.has_delivery_nationwide && (
                <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                  <Truck className="w-3 h-3" />
                  Local delivery
                </span>
              )}
              <span className="text-xs text-[#e85d4c] bg-red-50 px-2 py-1 rounded font-medium">
                Graded Retailer
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
