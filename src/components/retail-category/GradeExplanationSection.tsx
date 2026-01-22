import { Tag, Package, CheckCircle } from 'lucide-react'
import type { GradeData } from '@/lib/data/getRetailCategoryData'

interface Props {
  grades: GradeData[]
}

/**
 * Grade Explanation Section for Retail Category Page (Spec 14)
 *
 * Explains the different appliance grades and typical discounts.
 */
export default function GradeExplanationSection({ grades }: Props) {
  // Default grades if none provided
  const displayGrades =
    grades.length > 0
      ? grades
      : [
          {
            code: 'tatty-packaging',
            name: 'Tatty Packaging',
            short_description: 'New with damaged packaging only',
            typical_discount_percent: 20,
            display_order: 1,
          },
          {
            code: 'A-grade',
            name: 'A-Grade',
            short_description: 'Minor marks, essentially new',
            typical_discount_percent: 30,
            display_order: 2,
          },
          {
            code: 'B-grade',
            name: 'B-Grade',
            short_description: 'Visible marks on front/sides',
            typical_discount_percent: 45,
            display_order: 3,
          },
          {
            code: 'C-grade',
            name: 'C-Grade',
            short_description: 'More significant cosmetic damage',
            typical_discount_percent: 60,
            display_order: 4,
          },
        ]

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <Tag className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Understanding Appliance Grades</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Graded appliances are brand-new products that cannot be sold as &quot;new&quot; due to minor cosmetic
        issues or damaged packaging. All units are fully functional and tested.
      </p>

      {/* Grade cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayGrades.slice(0, 4).map((grade) => (
          <GradeCard key={grade.code} grade={grade} />
        ))}
      </div>

      {/* Key points */}
      <div className="mt-6 bg-green-50 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-3">All Graded Appliances Include:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            Full manufacturer warranty or retailer guarantee
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            Complete testing before sale
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            Same features and performance as new
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            Significant savings compared to RRP
          </li>
        </ul>
      </div>
    </section>
  )
}

function GradeCard({ grade }: { grade: GradeData }) {
  // Color coding based on grade
  const getGradeColors = (code: string) => {
    switch (code) {
      case 'tatty-packaging':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'A-grade':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'B-grade':
        return 'bg-amber-50 border-amber-200 text-amber-800'
      case 'C-grade':
        return 'bg-orange-50 border-orange-200 text-orange-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const colors = getGradeColors(grade.code)

  return (
    <div className={`rounded-xl border p-4 ${colors}`}>
      <div className="flex items-center gap-2 mb-2">
        <Package className="w-5 h-5" />
        <h3 className="font-bold">{grade.name}</h3>
      </div>
      <p className="text-sm opacity-90 mb-3">{grade.short_description}</p>
      <div className="text-lg font-bold">~{grade.typical_discount_percent}% off</div>
    </div>
  )
}
