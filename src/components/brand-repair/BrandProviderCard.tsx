import Link from 'next/link'
import {
  Star,
  MapPin,
  Phone,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Award,
  Flame,
} from 'lucide-react'
import type { ProviderWithAuthorization, BrandData, CountryData } from '@/lib/data/getBrandRepairData'

interface Props {
  provider: ProviderWithAuthorization
  brand: BrandData
  countrySlug: string
  citySlug: string
}

/**
 * Provider Card with Brand Authorization Badge (Spec 15)
 */
export default function BrandProviderCard({
  provider,
  brand,
  countrySlug,
  citySlug,
}: Props) {
  const auth = provider.authorization

  // Format warranty display
  const warrantyMonths = provider.warranty_on_repairs_months || provider.warranty_on_parts_months
  const warrantyDisplay = warrantyMonths ? `${warrantyMonths}-month warranty` : null

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header badges */}
      <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {provider.is_featured && (
            <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-xs font-semibold">
              FEATURED
            </span>
          )}
          <span className="flex items-center gap-1">
            <Shield className="w-4 h-4 text-green-400" />
            {brand.name.toUpperCase()} AUTHORIZED
          </span>
        </div>
        {auth.is_verified && (
          <span className="flex items-center gap-1 text-green-400 text-xs">
            <CheckCircle className="w-3 h-3" />
            VERIFIED
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Rating */}
        {provider.average_rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold text-gray-900">{provider.average_rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-500 text-sm">({provider.review_count} reviews)</span>
          </div>
        )}

        {/* Provider Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{provider.name}</h3>

        {/* Authorization Details */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <Award className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-green-800">
                {auth.authorisation_type || `${brand.name} Authorized`}
              </div>
              {auth.certificate_number && (
                <div className="text-green-700">Certificate: {auth.certificate_number}</div>
              )}
            </div>
          </div>
        </div>

        {/* Key features */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          {provider.offers_same_day && (
            <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-1 rounded">
              <Zap className="w-4 h-4" />
              Same-day callouts
            </span>
          )}
          {provider.years_trading && provider.years_trading >= 10 && (
            <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-1 rounded">
              <Clock className="w-4 h-4" />
              {provider.years_trading}+ years experience
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span>{provider.city_name || ''}{provider.postcode ? `, ${provider.postcode}` : ''}</span>
        </div>

        {/* Appliances for this brand */}
        {provider.services.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">
              {brand.name} APPLIANCES WE REPAIR:
            </div>
            <div className="flex flex-wrap gap-2">
              {provider.services.slice(0, 6).map((service) => (
                <span
                  key={service.appliance_category_id}
                  className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded flex items-center gap-1"
                >
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  {service.category_name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pricing & Features */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
          {provider.callout_fee_from && (
            <span className="font-semibold text-gray-900">
              Callout: {provider.callout_fee_from}
            </span>
          )}
          {provider.no_fix_no_fee && (
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              No fix no fee
            </span>
          )}
          {warrantyDisplay && (
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-blue-600" />
              {warrantyDisplay}
            </span>
          )}
        </div>

        {/* Genuine parts indicator */}
        {provider.uses_genuine_parts && (
          <div className="text-sm text-green-700 flex items-center gap-1 mb-4">
            <CheckCircle className="w-4 h-4" />
            Uses genuine {brand.name} parts
          </div>
        )}

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {provider.gas_safe_registered && (
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded flex items-center gap-1">
              <Flame className="w-3 h-3" />
              Gas Safe
            </span>
          )}
          {provider.which_trusted_trader && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              Which? Trusted
            </span>
          )}
          {provider.checkatrade_member && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Checkatrade {provider.checkatrade_rating ? provider.checkatrade_rating.toFixed(1) : ''}
            </span>
          )}
          {provider.public_liability_insurance && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              Fully Insured
            </span>
          )}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {provider.phone && (
            <a
              href={`tel:${provider.phone}`}
              className="flex-1 bg-[#e85d4c] hover:bg-[#d94f3f] text-white font-semibold py-3 px-4 rounded-lg text-center flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          )}
          <Link
            href={`/provider/${provider.slug}/`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-4 rounded-lg text-center transition-colors"
          >
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
