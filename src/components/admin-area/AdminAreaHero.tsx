import { MapPin, Store, Wrench, Building2 } from 'lucide-react'

interface AdminAreaHeroProps {
  adminAreaName: string
  countryName: string
  h1Heading?: string | null
  introParagraph?: string | null
  placeCount: number
  storeCount: number
  providerCount: number
  className?: string
}

/**
 * Hero section for Admin Area Pages
 *
 * Shows area name, stats, and intro paragraph
 */
export function AdminAreaHero({
  adminAreaName,
  countryName,
  h1Heading,
  introParagraph,
  placeCount,
  storeCount,
  providerCount,
  className = '',
}: AdminAreaHeroProps) {
  const heading = h1Heading || `Graded Appliances & Repair in ${adminAreaName}`

  const description =
    introParagraph ||
    `Find graded appliance stores and repair engineers across ${placeCount} locations in ${adminAreaName}, ${countryName}. Compare prices, warranties, and delivery options.`

  return (
    <section className={`bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Location badge */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <MapPin className="w-4 h-4" />
        <span>{countryName}</span>
      </div>

      {/* H1 Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {heading}
      </h1>

      {/* Intro paragraph */}
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
        {description}
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#e85d4c]/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#e85d4c]" />
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {placeCount}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Locations
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#e85d4c]/10 flex items-center justify-center">
            <Store className="w-5 h-5 text-[#e85d4c]" />
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {storeCount}+
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Stores
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Wrench className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {providerCount}+
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Repair Services
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminAreaHero
