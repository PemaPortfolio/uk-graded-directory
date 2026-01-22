import Link from 'next/link'
import { Star, Zap, ArrowRight } from 'lucide-react'

interface Provider {
  id: string
  business_name: string
  slug: string
  average_rating: number | null
  review_count: number
  offers_same_day: boolean
}

interface Props {
  providers: Provider[]
  cityName: string
  countrySlug: string
  citySlug: string
}

/**
 * Other Providers In City Section (Spec 11 - Section 19)
 */
export default function OtherProvidersSection({
  providers,
  cityName,
  countrySlug,
  citySlug,
}: Props) {
  if (providers.length === 0) return null

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Other Repair Engineers in {cityName}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {providers.map((provider) => (
          <Link
            key={provider.id}
            href={`/provider/${provider.slug}/`}
            className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-[#e85d4c]">
                {provider.business_name}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                {provider.average_rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm text-gray-600">
                      {provider.average_rating.toFixed(1)} ({provider.review_count})
                    </span>
                  </div>
                )}
                {provider.offers_same_day && (
                  <span className="flex items-center gap-1 text-xs text-green-700">
                    <Zap className="w-3 h-3" /> Same-day
                  </span>
                )}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#e85d4c]" />
          </Link>
        ))}
      </div>

      <Link
        href={`/${countrySlug}/${citySlug}/#repairs`}
        className="inline-flex items-center gap-1 text-[#e85d4c] font-medium hover:underline"
      >
        View all repair engineers in {cityName}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  )
}
