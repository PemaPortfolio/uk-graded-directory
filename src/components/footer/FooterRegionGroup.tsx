'use client'

import Link from 'next/link'
import { FooterCountry } from '@/types/footer'
import FooterAccordion from './FooterAccordion'
import CountryFlag from '@/components/ui/CountryFlag'

interface FooterRegionGroupProps {
  country: FooterCountry
  defaultOpen?: boolean
}

/**
 * Single Country Region Group (Spec 05)
 *
 * Displays all admin areas for a country in accordion format.
 * Links are always in DOM for SEO (CSS-only collapse).
 */
export default function FooterRegionGroup({
  country,
  defaultOpen = false,
}: FooterRegionGroupProps) {
  return (
    <FooterAccordion
      title={country.name}
      icon={<CountryFlag country={country.slug} className="w-5 h-4" />}
      count={country.adminAreas.length}
      defaultOpen={defaultOpen}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2">
        {country.adminAreas.map((area) => (
          <Link
            key={area.id}
            href={`/${country.slug}/${area.slug}`}
            className="text-sm text-slate-400 hover:text-white transition-colors py-1 truncate"
            title={area.name}
          >
            {area.name}
          </Link>
        ))}
      </div>
    </FooterAccordion>
  )
}
