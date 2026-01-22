import { AlertTriangle, ChevronRight } from 'lucide-react'
import type { RepairCategoryData } from '@/lib/data/getRepairCategoryData'

interface Props {
  category: RepairCategoryData
  placeName: string
}

/**
 * Common Issues Section for Repair Category Page (Spec 10)
 *
 * Displays common problems for the appliance category.
 */
export default function CommonIssuesSection({ category, placeName }: Props) {
  const categoryName = category.name_singular || category.name

  // Use common issues from database or defaults
  const issues =
    category.common_issues && category.common_issues.length > 0
      ? category.common_issues
      : getDefaultIssues(category.slug)

  if (issues.length === 0) {
    return null
  }

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-100 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          Common {categoryName} Problems We Fix
        </h2>
      </div>

      <p className="text-gray-600 mb-6">
        Our listed engineers in {placeName} can diagnose and repair these common issues:
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {issues.map((issue, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="text-gray-700">{issue}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function getDefaultIssues(categorySlug: string): string[] {
  const issuesByCategory: Record<string, string[]> = {
    'washing-machines': [
      'Machine not spinning',
      'Not draining properly',
      'Door won\'t open',
      'Leaking water',
      'Loud banging noises',
      'Won\'t start',
      'Error codes showing',
      'Not heating water',
      'Drum not rotating',
    ],
    'fridge-freezers': [
      'Not cooling properly',
      'Freezer not freezing',
      'Ice build-up',
      'Water leaking',
      'Strange noises',
      'Light not working',
      'Door seal damaged',
      'Temperature fluctuations',
      'Compressor issues',
    ],
    dishwashers: [
      'Not cleaning properly',
      'Not draining',
      'Leaking water',
      'Door won\'t close',
      'Not starting',
      'Error codes',
      'Dishes not drying',
      'Bad odours',
      'Salt indicator issues',
    ],
    'tumble-dryers': [
      'Not heating up',
      'Not spinning',
      'Taking too long',
      'Overheating',
      'Strange noises',
      'Not starting',
      'Drum not turning',
      'Condensation issues',
      'Lint filter problems',
    ],
    ovens: [
      'Not heating up',
      'Uneven cooking',
      'Door not closing',
      'Fan not working',
      'Temperature issues',
      'Element replacement',
      'Timer not working',
      'Light not working',
      'Self-clean problems',
    ],
    cookers: [
      'Burners not igniting',
      'Oven not heating',
      'Temperature issues',
      'Grill not working',
      'Timer problems',
      'Door issues',
      'Gas smell',
      'Thermostat faults',
      'Element failures',
    ],
    hobs: [
      'Burner not igniting',
      'Uneven heating',
      'Electric hob not working',
      'Induction issues',
      'Gas smell',
      'Ignition sparking',
      'Control panel faults',
      'Glass damage',
    ],
  }

  return issuesByCategory[categorySlug] || [
    'Not working properly',
    'Strange noises',
    'Error codes',
    'Not starting',
    'Performance issues',
    'Temperature problems',
  ]
}
