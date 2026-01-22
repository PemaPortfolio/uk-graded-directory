import Link from 'next/link'
import Image from 'next/image'
import {
  Star,
  MapPin,
  Phone,
  ExternalLink,
  Truck,
  Shield,
  CreditCard,
  CheckCircle,
  Store as StoreIcon,
  Clock,
  Package,
} from 'lucide-react'
import type { StoreData, CategoryData } from '@/lib/data/getRetailCategoryData'

interface Props {
  stores: StoreData[]
  category: CategoryData
}

/**
 * Store Grid for Retail Category Page (Spec 14)
 *
 * Displays stores as cards with category-specific enhancements.
 */
export default function StoreGrid({ stores, category }: Props) {
  const categoryName = category.name_plural || category.name

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {stores.length} Store{stores.length !== 1 ? 's' : ''} Selling Graded {categoryName}
      </h2>

      <div className="space-y-4">
        {stores.map((store, index) => (
          <StoreCard key={store.id} store={store} position={index} />
        ))}
      </div>
    </section>
  )
}

interface StoreCardProps {
  store: StoreData
  position: number
}

function StoreCard({ store, position }: StoreCardProps) {
  const isVerified = store.status === 'verified'

  return (
    <div
      className={`bg-white border rounded-xl p-6 transition-all hover:shadow-md ${
        store.is_featured ? 'border-amber-400 bg-amber-50/50 ring-1 ring-amber-400' : 'border-gray-200'
      }`}
    >
      {/* Featured badge */}
      {store.is_featured && position === 0 && (
        <div className="mb-4 -mt-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
            <Star className="w-4 h-4 fill-amber-500" /> Featured Store
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          {store.logo_url ? (
            <Image
              src={store.logo_url}
              alt={`${store.business_name} logo`}
              width={80}
              height={80}
              className="w-20 h-20 object-contain rounded-lg border border-gray-200 bg-white"
              unoptimized
            />
          ) : (
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <StoreIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-start gap-2 mb-2">
            <Link
              href={`/store/${store.slug}/`}
              className="text-lg font-bold text-[#e85d4c] hover:underline"
            >
              {store.business_name}
            </Link>

            {isVerified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
          </div>

          {/* Rating */}
          {store.average_rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-medium">{store.average_rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">({store.review_count} reviews)</span>
            </div>
          )}

          {/* Description */}
          {store.short_description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{store.short_description}</p>
          )}

          {/* Address */}
          {store.address_line1 && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>
                {store.address_line1}
                {store.postcode && ` (${store.postcode})`}
              </span>
            </div>
          )}

          {/* Category-specific info */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3 pb-3 border-b border-gray-100">
            {/* Grades available */}
            {(store.categoryData?.grades_available || store.grades_stocked) && (
              <div className="flex items-center gap-1">
                <Package className="w-4 h-4 text-gray-400" />
                <span>
                  {(store.categoryData?.grades_available || store.grades_stocked || [])
                    .slice(0, 3)
                    .join(', ')}
                </span>
              </div>
            )}

            {/* Price range */}
            {store.categoryData?.price_min && (
              <div className="flex items-center gap-1">
                <span className="font-medium text-gray-900">
                  From £{store.categoryData.price_min}
                </span>
              </div>
            )}

            {/* Warranty */}
            {store.warranty_months && (
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-gray-400" />
                <span>{store.warranty_months}m warranty</span>
              </div>
            )}
          </div>

          {/* Service badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {store.offers_free_delivery && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                <Truck className="w-3 h-3" /> Free Delivery
              </span>
            )}
            {store.offers_next_day_delivery && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                <Clock className="w-3 h-3" /> Next Day
              </span>
            )}
            {store.offers_zero_percent_finance && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                <CreditCard className="w-3 h-3" /> 0% Finance
              </span>
            )}
            {store.offers_finance && !store.offers_zero_percent_finance && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                <CreditCard className="w-3 h-3" /> Finance
              </span>
            )}
            {store.offers_installation && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                Installation
              </span>
            )}
            {store.offers_click_collect && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                Click & Collect
              </span>
            )}
          </div>

          {/* Brand chips */}
          {store.brands.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {store.brands.slice(0, 5).map((brand) => (
                <span
                  key={brand.id}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {brand.name}
                </span>
              ))}
              {store.brands.length > 5 && (
                <span className="px-2 py-0.5 text-gray-500 text-xs">
                  +{store.brands.length - 5} more
                </span>
              )}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            {store.phone && (
              <a
                href={`tel:${store.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#e85d4c] text-white rounded-lg font-medium hover:bg-[#d94f3f] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            )}
            <Link
              href={`/store/${store.slug}/`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#e85d4c] text-[#e85d4c] rounded-lg font-medium hover:bg-[#e85d4c] hover:text-white transition-colors"
            >
              View Store
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
