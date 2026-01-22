import Link from 'next/link'
import { Star, Phone, Zap, Shield, ExternalLink } from 'lucide-react'

interface Provider {
  id: string
  business_name: string
  slug: string
  short_description: string | null
  phone: string | null
  average_rating: number | null
  review_count: number
  is_gas_safe: boolean
  offers_same_day: boolean
  callout_fee: number | null
}

interface Props {
  cityName: string
  providers: Provider[]
  countrySlug: string
  citySlug: string
}

/**
 * Repair Services Section (Spec 07 - Section 6)
 *
 * Displays appliance repair service providers in the city.
 */
export default function RepairServicesSection({
  cityName,
  providers,
  countrySlug,
  citySlug,
}: Props) {
  if (providers.length === 0) {
    return null
  }

  return (
    <section id="repairs" className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Appliance Repair Services in {cityName}
        </h2>
        <p className="text-gray-600 mb-6">
          {providers.length} engineer{providers.length !== 1 ? 's' : ''} available
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {providers.slice(0, 4).map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        {providers.length > 4 && (
          <div className="text-center">
            <Link
              href={`/${countrySlug}/${citySlug}/appliance-repair/`}
              className="inline-flex items-center gap-2 text-[#e85d4c] font-medium hover:underline"
            >
              See all {providers.length} repair engineers
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <Link
            href={`/provider/${provider.slug}/`}
            className="font-bold text-gray-900 hover:text-[#e85d4c]"
          >
            {provider.business_name}
          </Link>

          {/* Rating */}
          {provider.average_rating && (
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-medium text-sm">
                {provider.average_rating.toFixed(1)}
              </span>
              <span className="text-gray-500 text-xs">
                ({provider.review_count})
              </span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-col gap-1">
          {provider.offers_same_day && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
              <Zap className="w-3 h-3" /> Same-Day
            </span>
          )}
          {provider.is_gas_safe && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
              <Shield className="w-3 h-3" /> Gas Safe
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {provider.short_description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {provider.short_description}
        </p>
      )}

      {/* Callout fee */}
      {provider.callout_fee !== null && (
        <p className="text-sm text-gray-600 mb-3">
          From <span className="font-medium">£{provider.callout_fee}</span> callout
        </p>
      )}

      {/* CTAs */}
      <div className="flex flex-wrap gap-2">
        {provider.phone && (
          <a
            href={`tel:${provider.phone}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        )}
        <Link
          href={`/provider/${provider.slug}/`}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:border-[#e85d4c] hover:text-[#e85d4c] transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  )
}
