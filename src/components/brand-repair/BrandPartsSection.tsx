import { Wrench, ExternalLink } from 'lucide-react'
import type { BrandData } from '@/lib/data/getBrandRepairData'

interface Props {
  brand: BrandData
}

/**
 * DIY Parts Affiliate Section for Brand Repair Page (Spec 15)
 */
export default function BrandPartsSection({ brand }: Props) {
  // Generate eSpares affiliate link for the brand
  const esparesUrl = `https://www.espares.co.uk/search/${encodeURIComponent(brand.name.toLowerCase())}+parts`

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Wrench className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">
            Prefer to Fix It Yourself?
          </h2>
        </div>

        <p className="text-gray-600 mb-6">
          Order genuine {brand.name} parts from our trusted partner eSpares.
        </p>

        <a
          href={esparesUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Shop Genuine {brand.name} Parts at eSpares
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}
