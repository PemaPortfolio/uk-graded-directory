import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import type { RepairCategoryData } from '@/lib/data/getNationalRepairPageData'

interface Props {
  category: RepairCategoryData
  issues: string[]
}

const defaultIssues = [
  'Not starting',
  'Making loud noise',
  'Leaking water',
  'Not heating',
  'Error code showing',
  'Poor performance',
]

/**
 * Common Issues Section for National Repair Page (Spec 16)
 */
export default function CommonIssuesSection({ category, issues }: Props) {
  const categoryName = category.name_singular || category.name
  const displayIssues = issues.length > 0 ? issues : defaultIssues

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Common {categoryName} Problems We Fix
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {displayIssues.slice(0, 6).map((issue, index) => (
            <Link
              key={index}
              href={`/guides/${category.slug}-${issue.toLowerCase().replace(/\s+/g, '-')}/`}
              className="group bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-3">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {issue}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Learn more &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
