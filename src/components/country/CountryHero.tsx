import { MapPin, Store, Wrench, Percent } from 'lucide-react'

interface Props {
  country: {
    name: string
    flag_emoji: string
    h1_heading: string | null
    intro_paragraph: string | null
    place_count: number
    store_count: number
    provider_count: number
  }
}

/**
 * Country Hero Section (Spec 13)
 *
 * Displays country name with flag, intro text, and stats box.
 */
export default function CountryHero({ country }: Props) {
  // Generate H1 from template if not set
  const h1 = country.h1_heading || `Graded Appliances & Repair in ${country.name}`

  // Generate intro from template if not set
  const intro =
    country.intro_paragraph ||
    `Find ex-display, graded and factory second appliances from trusted retailers across ${country.name}. Compare prices, warranties, and delivery options from hundreds of specialist stores.`

  const stats = [
    {
      icon: MapPin,
      value: `${country.place_count}+`,
      label: 'Locations',
    },
    {
      icon: Store,
      value: `${country.store_count}+`,
      label: 'Stores',
    },
    {
      icon: Wrench,
      value: `${country.provider_count}+`,
      label: 'Engineers',
    },
    {
      icon: Percent,
      value: '30-70%',
      label: 'Savings',
    },
  ]

  return (
    <section className="bg-slate-50 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* H1 with Flag */}
        <div className="flex items-start gap-3 mb-4">
          <span className="text-4xl md:text-5xl">{country.flag_emoji}</span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#e85d4c] leading-tight">
            {h1}
          </h1>
        </div>

        {/* Intro paragraph */}
        <p className="text-lg text-gray-600 max-w-3xl mb-8">{intro}</p>

        {/* Stats Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-[#e85d4c]" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[#e85d4c]">
                  {stat.value}
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
