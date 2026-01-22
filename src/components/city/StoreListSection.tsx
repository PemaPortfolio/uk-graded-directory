import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, Phone, ExternalLink, Truck, Shield, CreditCard, CheckCircle, Store as StoreIcon } from 'lucide-react'

interface StoreData {
  id: string
  business_name: string
  slug: string
  short_description: string | null
  address_line1: string | null
  postcode: string | null
  phone: string | null
  website: string | null
  logo_url: string | null
  average_rating: number | null
  review_count: number
  is_featured: boolean
  status: string
  offers_delivery: boolean
  offers_free_delivery: boolean
  warranty_months: number | null
  offers_finance: boolean
}

interface Props {
  cityName: string
  stores: StoreData[]
}

/**
 * Store List Section (Spec 07 - Section 5)
 *
 * Displays graded appliance retailers in the city with cards.
 */
export default function StoreListSection({ cityName, stores }: Props) {
  if (stores.length === 0) {
    return (
      <section id="retailers" className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Graded Appliance Retailers in {cityName}
          </h2>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 font-medium mb-2">
              No graded retailers found in {cityName}
            </p>
            <p className="text-amber-700 text-sm">
              Check back soon or browse nearby cities for options.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="retailers" className="py-8 md:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Graded Appliance Retailers in {cityName}
        </h2>
        <p className="text-gray-600 mb-6">
          {stores.length} retailer{stores.length !== 1 ? 's' : ''} found
        </p>

        <div className="space-y-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StoreCard({ store }: { store: StoreData }) {
  const isVerified = store.status === 'verified'

  return (
    <div
      className={`bg-white border rounded-xl p-6 transition-all hover:shadow-md ${
        store.is_featured
          ? 'border-amber-400 bg-amber-50/50'
          : 'border-gray-200'
      }`}
    >
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

            {store.is_featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                <Star className="w-3 h-3" /> Featured
              </span>
            )}

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
              <span className="text-gray-500 text-sm">
                ({store.review_count} reviews)
              </span>
            </div>
          )}

          {/* Description */}
          {store.short_description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {store.short_description}
            </p>
          )}

          {/* Info Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            {store.address_line1 && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>
                  {store.address_line1}
                  {store.postcode && ` (${store.postcode})`}
                </span>
              </div>
            )}
            {store.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-gray-400" />
                <a
                  href={`tel:${store.phone}`}
                  className="text-[#e85d4c] hover:underline"
                >
                  {store.phone}
                </a>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {store.offers_free_delivery && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                <Truck className="w-3 h-3" /> Free Delivery
              </span>
            )}
            {store.warranty_months && store.warranty_months >= 12 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                <Shield className="w-3 h-3" /> {store.warranty_months}m Warranty
              </span>
            )}
            {store.offers_finance && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                <CreditCard className="w-3 h-3" /> Finance Available
              </span>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            {store.phone && (
              <a
                href={`tel:${store.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            )}
            <Link
              href={`/store/${store.slug}/`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#e85d4c] text-[#e85d4c] rounded-lg font-medium hover:bg-[#e85d4c] hover:text-white transition-colors"
            >
              View Profile
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
