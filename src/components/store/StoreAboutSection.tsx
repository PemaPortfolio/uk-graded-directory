import { Calendar } from 'lucide-react'

interface Props {
  store: {
    business_name: string
    description: string | null
    short_description: string | null
    year_established: number | null
  }
}

/**
 * About This Store Section (Spec 06 - Section 4)
 */
export default function StoreAboutSection({ store }: Props) {
  const description = store.description || store.short_description

  if (!description && !store.year_established) return null

  const currentYear = new Date().getFullYear()
  const yearsInBusiness = store.year_established
    ? currentYear - store.year_established
    : null

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        About {store.business_name}
      </h2>

      {description && (
        <div className="prose prose-gray max-w-none mb-6">
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      )}

      {/* Quick Facts */}
      <div className="flex flex-wrap gap-4">
        {store.year_established && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Established: {store.year_established}</span>
            {yearsInBusiness && yearsInBusiness > 0 && (
              <span className="text-gray-400">
                ({yearsInBusiness} years in business)
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
