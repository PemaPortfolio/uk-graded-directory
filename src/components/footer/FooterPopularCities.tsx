import Link from 'next/link'
import { FooterCity } from '@/types/footer'

interface FooterPopularCitiesProps {
  cities: FooterCity[]
}

/**
 * Popular Cities Section (Spec 05)
 *
 * Displays top 20 cities by population/traffic.
 * Grid layout: 6 columns (desktop), 2 columns (mobile).
 */
export default function FooterPopularCities({ cities }: FooterPopularCitiesProps) {
  if (!cities || cities.length === 0) {
    return null
  }

  return (
    <section className="bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-base font-semibold text-white text-center mb-6">
          Popular Cities
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/${city.countrySlug}/${city.slug}`}
              className="text-sm text-slate-400 hover:text-white transition-colors text-center py-2"
            >
              {city.name}
            </Link>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/locations"
            className="inline-flex items-center gap-1 text-[#e85d4c] hover:text-[#d94f3f] font-medium text-sm transition-colors"
          >
            View all {cities.length > 0 ? '564' : ''} cities →
          </Link>
        </div>
      </div>
    </section>
  )
}
