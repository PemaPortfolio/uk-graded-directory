import Link from 'next/link'
import { MapPin, Store, Wrench, ArrowRight } from 'lucide-react'

interface Country {
  name: string
  slug: string
  flag_emoji: string
  place_count: number
  store_count: number
  provider_count: number
}

interface Props {
  countries: Country[]
}

/**
 * Other Countries Section (Spec 13)
 *
 * Shows links to other UK countries for cross-linking.
 */
export default function OtherCountriesSection({ countries }: Props) {
  if (countries.length === 0) return null

  return (
    <section className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Browse Other Countries
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/${country.slug}/`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#e85d4c] hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{country.flag_emoji}</span>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#e85d4c]">
                  {country.name}
                </h3>
              </div>

              {/* Stats */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{country.place_count} locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-gray-400" />
                  <span>{country.store_count}+ stores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-gray-400" />
                  <span>{country.provider_count} engineers</span>
                </div>
              </div>

              {/* CTA */}
              <span className="inline-flex items-center gap-1 text-[#e85d4c] font-medium text-sm group-hover:underline">
                Browse
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
