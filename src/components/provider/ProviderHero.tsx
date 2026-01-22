import Image from 'next/image'
import { Star, CheckCircle, Shield, Flame, Sparkles, Zap } from 'lucide-react'

interface Props {
  provider: {
    business_name: string
    trading_name: string | null
    logo_url: string | null
    cover_image_url: string | null
    average_rating: number | null
    review_count: number
    status: string
    is_featured: boolean
    is_verified: boolean
    years_trading: number | null
    number_of_engineers: number | null
    gas_safe_registered: boolean
    fgas_certified: boolean
    which_trusted_trader: boolean
    public_liability_insurance: boolean
    offers_same_day: boolean
  }
  cityName: string
}

/**
 * Provider Hero Section (Spec 11 - Section 2)
 *
 * Displays provider identity, trust badges, certifications.
 */
export default function ProviderHero({ provider, cityName }: Props) {
  const isVerified = provider.status === 'verified' || provider.is_verified

  // Build certification badges
  const certBadges = []

  if (provider.gas_safe_registered) {
    certBadges.push({
      icon: Shield,
      label: 'Gas Safe',
      variant: 'cert' as const,
    })
  }

  if (provider.fgas_certified) {
    certBadges.push({
      icon: Flame,
      label: 'F-Gas',
      variant: 'cert' as const,
    })
  }

  if (provider.which_trusted_trader) {
    certBadges.push({
      icon: CheckCircle,
      label: 'Which? Trusted',
      variant: 'cert' as const,
    })
  }

  if (provider.public_liability_insurance) {
    certBadges.push({
      icon: Shield,
      label: 'Insured',
      variant: 'cert' as const,
    })
  }

  return (
    <section className="bg-white border-b border-gray-200">
      {/* Cover Image */}
      {provider.cover_image_url && (
        <div className="relative h-48 md:h-64 bg-gray-100">
          <Image
            src={provider.cover_image_url}
            alt={`${provider.business_name}`}
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
            {provider.logo_url ? (
              <Image
                src={provider.logo_url}
                alt={`${provider.business_name} logo`}
                width={112}
                height={112}
                className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-xl border border-gray-200 bg-white"
                unoptimized
              />
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-400">
                  {provider.business_name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Provider Info */}
          <div className="flex-1">
            {/* Name & Badges */}
            <div className="flex flex-wrap items-start gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {provider.business_name}
              </h1>

              {isVerified && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#e85d4c] text-white text-xs font-medium rounded">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}

              {provider.is_featured && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
            </div>

            {/* Trading Name */}
            {provider.trading_name && provider.trading_name !== provider.business_name && (
              <p className="text-gray-600 text-sm mb-2">
                Trading as {provider.trading_name}
              </p>
            )}

            {/* Rating & Location */}
            <div className="flex flex-wrap items-center gap-4 mb-3">
              {provider.average_rating ? (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold">
                    {provider.average_rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({provider.review_count} reviews)
                  </span>
                </div>
              ) : (
                <span className="text-gray-500">New listing</span>
              )}

              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{cityName}</span>
            </div>

            {/* Experience & Team */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              {provider.years_trading && (
                <span>Est. {new Date().getFullYear() - provider.years_trading} • {provider.years_trading} years experience</span>
              )}
              {provider.number_of_engineers && (
                <span>{provider.number_of_engineers} engineer{provider.number_of_engineers > 1 ? 's' : ''}</span>
              )}
            </div>

            {/* Certification Badges */}
            <div className="flex flex-wrap gap-2">
              {provider.offers_same_day && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-green-50 text-green-800 border border-green-200">
                  <Zap className="w-3.5 h-3.5" />
                  Same-Day
                </span>
              )}

              {certBadges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-blue-50 text-blue-800 border border-blue-200"
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
