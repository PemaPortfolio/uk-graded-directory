import Link from 'next/link'
import { MapPin, Users } from 'lucide-react'
import type { BrandData, NearbyCityWithCount } from '@/lib/data/getBrandRepairData'

interface Props {
  brand: BrandData
  nearbyCities: NearbyCityWithCount[]
}

/**
 * Nearby Cities Section for Brand Repair Page (Spec 15)
 */
export default function BrandNearbyCitiesSection({ brand, nearbyCities }: Props) {
  if (nearbyCities.length === 0) return null

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {brand.name} Repair in Nearby Cities
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {nearbyCities.map((city) => (
            <Link
              key={city.id}
              href={`/${city.country_slug}/${city.slug}/${brand.slug}-repair/`}
              className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900 group-hover:text-[#e85d4c] transition-colors">
                  {city.name}
                </span>
                <span className="text-sm text-gray-500">
                  {city.distance_km} km
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{city.provider_count} engineer{city.provider_count !== 1 ? 's' : ''}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
