import { Wrench, ExternalLink } from 'lucide-react'
import type { RepairCategoryData } from '@/lib/data/getNationalRepairPageData'

interface Props {
  category: RepairCategoryData
}

const commonParts = [
  'Door seals & gaskets',
  'Pumps & motors',
  'Belts & bearings',
  'Carbon brushes',
]

/**
 * DIY Parts Section for National Repair Page (Spec 16)
 * Affiliate section for eSpares
 */
export default function DIYPartsSection({ category }: Props) {
  const categoryName = category.name_singular || category.name

  // Generate affiliate link
  const affiliateLink = `https://www.espares.co.uk/search/${category.slug}?utm_source=ukgradedappliances&utm_medium=affiliate&utm_campaign=national-repair`

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Fix It Yourself?
            </h2>
          </div>

          <p className="text-gray-600 mb-6">
            Order genuine {categoryName.toLowerCase()} parts with next-day delivery.
            Free repair guides and video tutorials included.
          </p>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Popular parts:</h3>
            <ul className="grid grid-cols-2 gap-2">
              {commonParts.map((part, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="text-blue-500">•</span>
                  {part}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Shop {categoryName} Parts at eSpares
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>

          <p className="text-xs text-gray-500 mt-4">
            Affiliate partner • We may earn from qualifying purchases
          </p>
        </div>
      </div>
    </section>
  )
}
