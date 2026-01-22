import { Zap, Clock, AlertCircle, Calendar, Moon } from 'lucide-react'

interface Props {
  provider: {
    offers_same_day: boolean
    offers_next_day: boolean
    offers_emergency: boolean
    offers_weekend: boolean
    offers_evening: boolean
    typical_response_time: string | null
  }
}

/**
 * Availability & Response Section (Spec 11 - Section 7)
 */
export default function ProviderAvailabilitySection({ provider }: Props) {
  const availabilityItems = [
    provider.offers_same_day && {
      icon: Zap,
      label: 'Same-day callouts available',
      highlight: true,
    },
    provider.offers_next_day && {
      icon: Clock,
      label: 'Next-day appointments',
      highlight: false,
    },
    provider.offers_emergency && {
      icon: AlertCircle,
      label: '24/7 emergency callouts',
      highlight: true,
    },
    provider.offers_weekend && {
      icon: Calendar,
      label: 'Weekend appointments',
      highlight: false,
    },
    provider.offers_evening && {
      icon: Moon,
      label: 'Evening slots available',
      highlight: false,
    },
  ].filter(Boolean)

  if (availabilityItems.length === 0 && !provider.typical_response_time) {
    return null
  }

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Availability & Response
      </h2>

      {provider.typical_response_time && (
        <p className="text-gray-600 mb-4">
          Typical response: <span className="font-medium">{provider.typical_response_time}</span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availabilityItems.map((item, index) => {
          const { icon: Icon, label, highlight } = item as {
            icon: typeof Zap
            label: string
            highlight: boolean
          }
          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                highlight
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  highlight ? 'text-green-600' : 'text-gray-500'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  highlight ? 'text-green-800' : 'text-gray-700'
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
