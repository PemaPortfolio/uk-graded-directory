import Link from 'next/link'
import type { ApplianceCategoryData, GradeLevelData } from '@/lib/data/getNationalRetailCategoryData'

interface Props {
  category: ApplianceCategoryData
  grades: GradeLevelData[]
}

const gradeStyles: Record<string, { icon: string; color: string }> = {
  'tatty-packaging': { icon: '📦', color: 'bg-green-50 border-green-200' },
  'A-grade': { icon: '⭐', color: 'bg-blue-50 border-blue-200' },
  'B-grade': { icon: '✓', color: 'bg-yellow-50 border-yellow-200' },
  'C-grade': { icon: '○', color: 'bg-orange-50 border-orange-200' },
  mixed: { icon: '🔀', color: 'bg-gray-50 border-gray-200' },
}

/**
 * Understanding Grades Section for National Retail Category Page (Spec 17)
 */
export default function UnderstandingGradesSection({ category, grades }: Props) {
  // Filter out mixed grade for display
  const displayGrades = grades.filter((g) => g.code !== 'mixed')

  if (displayGrades.length === 0) return null

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Understanding Graded {category.name}
        </h2>

        <p className="text-gray-600 mb-8 max-w-3xl">
          Graded appliances are brand-new units that cannot be sold as &quot;new&quot; due to minor
          cosmetic imperfections or damaged packaging. They offer significant savings while
          maintaining full functionality and warranty coverage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayGrades.map((grade) => {
            const style = gradeStyles[grade.code] || gradeStyles['mixed']

            return (
              <div
                key={grade.code}
                className={`p-6 rounded-xl border-2 ${style.color}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{style.icon}</span>
                  <span className="font-bold text-gray-900">{grade.name}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {grade.short_description}
                </p>
                <div className="text-lg font-bold text-green-600">
                  ~{grade.typical_discount_percent}% off RRP
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/guides/understanding-grades/"
            className="text-[#e85d4c] hover:text-[#d94f3f] font-medium"
          >
            Learn more about grades &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
