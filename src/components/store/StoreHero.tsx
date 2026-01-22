import Image from 'next/image'
import { Star, CheckCircle, Shield, Truck, Wrench, CreditCard, Sparkles } from 'lucide-react'

interface Props {
  store: {
    business_name: string
    trading_name: string | null
    logo_url: string | null
    cover_image_url: string | null
    average_rating: number | null
    review_count: number
    status: string
    is_featured: boolean
    is_verified: boolean
    warranty_months: number | null
    offers_free_installation: boolean
    offers_same_day_delivery: boolean
    offers_repair_service: boolean
    offers_zero_percent_finance: boolean
  }
  cityName: string
}

/**
 * Store Hero Section (Spec 06 - Section 2)
 *
 * Displays store identity, trust badges, and rating.
 */
export default function StoreHero({ store, cityName }: Props) {
  const isVerified = store.status === 'verified' || store.is_verified

  // Build badges array
  const badges = []

  if (store.warranty_months) {
    badges.push({
      icon: Shield,
      label: `${store.warranty_months}-month warranty`,
      variant: 'positive' as const,
    })
  }

  if (store.offers_free_installation) {
    badges.push({
      icon: Wrench,
      label: 'Free Install',
      variant: 'positive' as const,
    })
  }

  if (store.offers_same_day_delivery) {
    badges.push({
      icon: Truck,
      label: 'Same-day Delivery',
      variant: 'positive' as const,
    })
  }

  if (store.offers_zero_percent_finance) {
    badges.push({
      icon: CreditCard,
      label: '0% Finance',
      variant: 'positive' as const,
    })
  }

  badges.push({
    icon: Wrench,
    label: store.offers_repair_service ? 'Repairs Available' : 'No Repairs',
    variant: store.offers_repair_service ? ('repair' as const) : ('neutral' as const),
  })

  return (
    <section className="bg-white border-b border-gray-200">
      {/* Cover Image */}
      {store.cover_image_url && (
        <div className="relative h-48 md:h-64 bg-gray-100">
          <Image
            src={store.cover_image_url}
            alt={`${store.business_name} showroom`}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            {store.logo_url ? (
              <Image
                src={store.logo_url}
                alt={`${store.business_name} logo`}
                width={112}
                height={112}
                className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-xl border border-gray-200 bg-white"
                unoptimized
              />
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-400">
                  {store.business_name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Store Info */}
          <div className="flex-1">
            {/* Name & Badges */}
            <div className="flex flex-wrap items-start gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {store.business_name}
              </h1>

              {isVerified && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#e85d4c] text-white text-xs font-medium rounded">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}

              {store.is_featured && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
            </div>

            {/* Trading Name */}
            {store.trading_name && store.trading_name !== store.business_name && (
              <p className="text-gray-600 text-sm mb-2">
                Trading as {store.trading_name}
              </p>
            )}

            {/* Rating & Location */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {store.average_rating ? (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold">
                    {store.average_rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({store.review_count} reviews)
                  </span>
                </div>
              ) : (
                <span className="text-gray-500">New listing</span>
              )}

              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{cityName}</span>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              {badges.slice(0, 5).map((badge, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md ${
                    badge.variant === 'positive'
                      ? 'bg-blue-50 text-blue-800 border border-blue-200'
                      : badge.variant === 'repair'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  <badge.icon className="w-3.5 h-3.5" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
