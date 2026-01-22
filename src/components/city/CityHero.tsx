import { Store, Wrench, Percent } from 'lucide-react'

interface Props {
  city: {
    name: string
    h1_heading: string | null
    intro_paragraph: string | null
    store_count: number
    provider_count: number
  }
  adminArea?: {
    name: string
  } | null
}

/**
 * City Hero Section (Spec 07)
 *
 * Displays city name, intro text with data-driven narrative,
 * and stats box with store/provider counts.
 */
export default function CityHero({ city, adminArea }: Props) {
  // Generate H1 from template if not set
  const h1 = city.h1_heading || `Graded Appliances in ${city.name}`

  // Generate intro from template if not set
  const intro =
    city.intro_paragraph ||
    `Find ex-display, graded and factory second appliances from specialist retailers in ${city.name}${adminArea ? ` and the wider ${adminArea.name} area` : ''}. Save 30-70% on washing machines, fridge freezers, dishwashers and more.`

  const stats = [
    {
      icon: Store,
      value: city.store_count,
      label: 'Graded Retailers',
    },
    {
      icon: Wrench,
      value: city.provider_count,
      label: 'Repair Engineers',
    },
    {
      icon: Percent,
      value: '30-70%',
      label: 'Savings',
      isStatic: true,
    },
  ]

  return (
    <section className="bg-slate-50 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#e85d4c] mb-4">
          {h1}
        </h1>

        {/* Intro paragraph */}
        <p className="text-lg text-gray-600 max-w-3xl mb-8 leading-relaxed">
          {intro}
        </p>

        {/* Stats Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-[#e85d4c]" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[#e85d4c]">
                  {stat.isStatic ? stat.value : stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
