import Link from 'next/link'
import Image from 'next/image'
import {
  Star,
  MapPin,
  Phone,
  ExternalLink,
  Wrench,
  Shield,
  CheckCircle,
  Zap,
  Clock,
  BadgeCheck,
  Award,
} from 'lucide-react'
import type { ProviderData, RepairCategoryData } from '@/lib/data/getRepairCategoryData'

interface Props {
  providers: ProviderData[]
  category: RepairCategoryData
}

/**
 * Provider Grid for Repair Category Page (Spec 10)
 *
 * Displays repair engineers as cards.
 */
export default function ProviderGrid({ providers, category }: Props) {
  const categoryName = category.name_singular || category.name

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {providers.length} {categoryName} Repair Engineer{providers.length !== 1 ? 's' : ''}
      </h2>

      <div className="space-y-4">
        {providers.map((provider, index) => (
          <ProviderCard key={provider.id} provider={provider} position={index} />
        ))}
      </div>
    </section>
  )
}

interface ProviderCardProps {
  provider: ProviderData
  position: number
}

function ProviderCard({ provider, position }: ProviderCardProps) {
  const isVerified = provider.status === 'verified'

  return (
    <div
      className={`bg-white border rounded-xl p-6 transition-all hover:shadow-md ${
        provider.is_featured
          ? 'border-blue-400 bg-blue-50/30 ring-1 ring-blue-400'
          : 'border-gray-200'
      }`}
    >
      {/* Featured badge */}
      {provider.is_featured && position === 0 && (
        <div className="mb-4 -mt-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            <Star className="w-4 h-4 fill-blue-500" /> Featured Engineer
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          {provider.logo_url ? (
            <Image
              src={provider.logo_url}
              alt={`${provider.business_name} logo`}
              width={80}
              height={80}
              className="w-20 h-20 object-contain rounded-lg border border-gray-200 bg-white"
              unoptimized
            />
          ) : (
            <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center">
              <Wrench className="w-8 h-8 text-blue-400" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-start gap-2 mb-2">
            <Link
              href={`/provider/${provider.slug}/`}
              className="text-lg font-bold text-blue-600 hover:underline"
            >
              {provider.business_name}
            </Link>

            {isVerified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}

            {provider.gas_safe_registered && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                <BadgeCheck className="w-3 h-3" /> Gas Safe
              </span>
            )}
          </div>

          {/* Rating & Experience */}
          <div className="flex flex-wrap items-center gap-4 mb-2">
            {provider.average_rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-medium">{provider.average_rating.toFixed(1)}</span>
                <span className="text-gray-500 text-sm">({provider.review_count} reviews)</span>
              </div>
            )}
            {provider.years_trading && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Award className="w-4 h-4 text-gray-400" />
                <span>{provider.years_trading} years trading</span>
              </div>
            )}
          </div>

          {/* Description */}
          {provider.short_description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{provider.short_description}</p>
          )}

          {/* Location & Contact */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            {provider.address_line1 && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>
                  {provider.address_line1}
                  {provider.postcode && ` (${provider.postcode})`}
                </span>
              </div>
            )}
          </div>

          {/* Pricing & Availability */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3 pb-3 border-b border-gray-100">
            {provider.callout_fee_from && (
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">
                  £{provider.callout_fee_from}
                  {provider.callout_fee_to && provider.callout_fee_to !== provider.callout_fee_from
                    ? ` - £${provider.callout_fee_to}`
                    : ''}
                </span>
                <span>callout</span>
              </div>
            )}

            {provider.typical_response_time && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{provider.typical_response_time}</span>
              </div>
            )}

            {provider.warranty_on_repairs_months && provider.warranty_on_repairs_months > 0 && (
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-gray-400" />
                <span>{provider.warranty_on_repairs_months}m warranty</span>
              </div>
            )}
          </div>

          {/* Service badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {provider.offers_same_day && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                <Zap className="w-3 h-3" /> Same Day
              </span>
            )}
            {provider.offers_emergency && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">
                Emergency
              </span>
            )}
            {provider.no_fix_no_fee && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                No Fix No Fee
              </span>
            )}
            {provider.free_quotes && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                Free Quotes
              </span>
            )}
            {provider.offers_weekend && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                Weekends
              </span>
            )}
            {provider.checkatrade_member && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">
                Checkatrade
              </span>
            )}
            {provider.which_trusted_trader && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full">
                Which? Trusted
              </span>
            )}
          </div>

          {/* Authorized brands */}
          {provider.authorizedBrands.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {provider.authorizedBrands.slice(0, 5).map((brand) => (
                <span
                  key={brand.id}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {brand.name}
                </span>
              ))}
              {provider.authorizedBrands.length > 5 && (
                <span className="px-2 py-0.5 text-gray-500 text-xs">
                  +{provider.authorizedBrands.length - 5} more
                </span>
              )}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            {provider.phone && (
              <a
                href={`tel:${provider.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            )}
            <Link
              href={`/provider/${provider.slug}/`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
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
