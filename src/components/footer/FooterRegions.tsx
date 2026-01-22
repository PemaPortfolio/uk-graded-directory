import { FooterCountry } from '@/types/footer'
import FooterRegionGroup from './FooterRegionGroup'

interface FooterRegionsProps {
  countries: FooterCountry[]
}

/**
 * Browse by Region Section (Spec 05)
 *
 * Displays all 217 admin areas organized by 4 countries.
 * Desktop: Expanded by default
 * Mobile: Collapsed accordions
 *
 * CRITICAL: Links always in DOM for SEO crawlers.
 */
export default function FooterRegions({ countries }: FooterRegionsProps) {
  if (!countries || countries.length === 0) {
    return null
  }

  return (
    <section
      className="bg-slate-800 border-t border-slate-700"
      aria-label="Browse by region"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-lg md:text-xl font-bold text-white text-center mb-6">
          Browse Graded Appliances by Region
        </h2>

        <div className="space-y-0">
          {countries.map((country, index) => (
            <FooterRegionGroup
              key={country.id}
              country={country}
              // England expanded by default on desktop
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
