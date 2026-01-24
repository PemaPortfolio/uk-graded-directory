import { MapPin, Store, Wrench } from 'lucide-react'

interface LocationsHeroProps {
  stats: {
    totalCities: number
    totalStores: number
    totalProviders: number
  }
}

/**
 * Hero section for the /locations page
 * Displays title, description, and stats row
 */
export default function LocationsHero({ stats }: LocationsHeroProps) {
  return (
    <section className="bg-[#f8f6f6] dark:bg-[#0f0d0d] py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#181111] dark:text-[#f5f0f0] mb-4">
          All UK Locations
        </h1>

        {/* Description */}
        <p className="text-lg text-[#6b7280] dark:text-[#a8a0a0] max-w-3xl mb-8">
          Browse {stats.totalCities.toLocaleString()} cities across England, Scotland, Wales and
          Northern Ireland for graded appliance stores and repair services.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-6 text-sm text-[#6b7280] dark:text-[#a8a0a0]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#e85d4c]" />
            <span>
              <strong className="text-[#181111] dark:text-[#f5f0f0]">4</strong> countries
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#e85d4c]" />
            <span>
              <strong className="text-[#181111] dark:text-[#f5f0f0]">
                {stats.totalCities.toLocaleString()}
              </strong>{' '}
              cities
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-[#e85d4c]" />
            <span>
              <strong className="text-[#181111] dark:text-[#f5f0f0]">
                {stats.totalStores.toLocaleString()}
              </strong>{' '}
              stores
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#e85d4c]" />
            <span>
              <strong className="text-[#181111] dark:text-[#f5f0f0]">
                {stats.totalProviders.toLocaleString()}
              </strong>{' '}
              repair providers
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
