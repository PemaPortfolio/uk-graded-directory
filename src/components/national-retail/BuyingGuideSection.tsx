import Link from 'next/link'
import { Check } from 'lucide-react'
import type { ApplianceCategoryData } from '@/lib/data/getNationalRetailCategoryData'

interface Props {
  category: ApplianceCategoryData
}

const defaultTips = [
  'Check the grade carefully and understand what cosmetic damage to expect',
  'Verify warranty coverage — most graded appliances include 6-12 months',
  'Compare delivery options — some stores offer free delivery over a threshold',
  'Look for 0% finance options if spreading the cost',
  'Check if installation and old appliance removal are included',
]

/**
 * Buying Guide Section for National Retail Category Page (Spec 17)
 */
export default function BuyingGuideSection({ category }: Props) {
  const categoryName = category.name_singular?.toLowerCase() || category.name.toLowerCase()
  const categoryNamePlural = category.name_plural?.toLowerCase() || category.name.toLowerCase()

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Buying Guide: Graded {category.name}
        </h2>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          {category.buying_guide ? (
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: category.buying_guide }}
            />
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                When buying a graded {categoryName}, consider these key factors:
              </p>

              <ul className="space-y-3 mb-6">
                {defaultTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="font-semibold text-green-800">
                  Average savings on graded {categoryNamePlural}: 30-70% off RRP
                </div>
              </div>
            </>
          )}

          <div className="text-center pt-4 border-t border-gray-200">
            <Link
              href={`/guides/buying-graded-${category.slug}/`}
              className="text-[#e85d4c] hover:text-[#d94f3f] font-medium"
            >
              Read our complete buying guide &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
