import Link from 'next/link'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import type { BrandData, PlaceData, CountryData } from '@/lib/data/getBrandRepairData'

interface Props {
  brand: BrandData
  place: PlaceData
  country: CountryData
}

/**
 * Cross-Sell to Retail Section for Brand Repair Page (Spec 15)
 */
export default function BrandCrossSellRetailSection({ brand, place, country }: Props) {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-[#e85d4c] to-[#d94f3f] rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <ShoppingCart className="w-6 h-6" />
            <h2 className="text-xl font-bold">
              Appliance Beyond Repair?
            </h2>
          </div>

          <p className="text-white/90 mb-4">
            Browse graded {brand.name} appliances with savings of 30-70% off RRP.
          </p>

          <Link
            href={`/${country.slug}/${place.slug}/${brand.slug}/`}
            className="inline-flex items-center gap-2 bg-white text-[#e85d4c] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Browse Graded {brand.name} Appliances in {place.name}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
