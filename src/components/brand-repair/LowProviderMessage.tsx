import Link from 'next/link'
import { AlertCircle, ArrowRight } from 'lucide-react'
import type { BrandData, PlaceData, CountryData } from '@/lib/data/getBrandRepairData'

interface Props {
  count: number
  brand: BrandData
  place: PlaceData
  country: CountryData
}

/**
 * Low Provider Count Message for Brand Repair Page (Spec 15)
 * Shown when there are 1-2 providers (not enough for indexing)
 */
export default function LowProviderMessage({ count, brand, place, country }: Props) {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">
                Limited {brand.name} Authorized Engineers
              </h3>
              <p className="text-amber-700 mb-4">
                We currently have {count} {brand.name} authorized engineer{count !== 1 ? 's' : ''} in {place.name}.
                Looking for more options? Our general repair engineers can also service {brand.name} appliances.
              </p>
              <Link
                href={`/${country.slug}/${place.slug}/washing-machine-repair/`}
                className="inline-flex items-center gap-2 text-amber-800 font-semibold hover:text-amber-900 transition-colors"
              >
                View all repair engineers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
