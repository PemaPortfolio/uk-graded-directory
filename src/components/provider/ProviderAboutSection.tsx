import { Calendar, Users } from 'lucide-react'

interface Props {
  provider: {
    business_name: string
    description: string | null
    short_description: string | null
    years_trading: number | null
    number_of_engineers: number | null
  }
}

/**
 * About This Engineer Section (Spec 11 - Section 4)
 */
export default function ProviderAboutSection({ provider }: Props) {
  const description = provider.description || provider.short_description

  if (!description && !provider.years_trading && !provider.number_of_engineers) {
    return null
  }

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        About {provider.business_name}
      </h2>

      {description && (
        <div className="prose prose-gray max-w-none mb-6">
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      )}

      {/* Quick Facts */}
      <div className="flex flex-wrap gap-6">
        {provider.years_trading && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{provider.years_trading} years trading</span>
          </div>
        )}
        {provider.number_of_engineers && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{provider.number_of_engineers} engineer{provider.number_of_engineers > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </section>
  )
}
