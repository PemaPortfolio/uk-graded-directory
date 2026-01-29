'use client'

import { Banknote, Shield, Truck, CreditCard } from 'lucide-react'

/**
 * Benefits Section (Spec 12 - Section 8)
 *
 * UPGRADED with bold design:
 * - Gradient accent icons
 * - Hover lift animations
 * - Asymmetric layout
 * - Premium card styling with border accents
 */
export default function BenefitsSection() {
  const benefits = [
    {
      icon: Banknote,
      title: 'Save 30-70% Off RRP',
      description: 'Ex-display and factory seconds at huge discounts compared to full retail prices.',
      accent: '#e85d4c',
      stat: '£500+',
      statLabel: 'avg saved',
    },
    {
      icon: Shield,
      title: 'Full Warranty Protection',
      description: '6-24 months manufacturer or retailer warranty included on all graded items.',
      accent: '#16a34a',
      stat: '12mo',
      statLabel: 'min warranty',
    },
    {
      icon: Truck,
      title: 'Delivery & Installation',
      description: 'Most stores offer free delivery over £300, with installation available.',
      accent: '#0ea5e9',
      stat: 'Free',
      statLabel: 'over £300',
    },
    {
      icon: CreditCard,
      title: 'Flexible Finance Options',
      description: 'Klarna, Clearpay, and PayPal Credit available at many retailers.',
      accent: '#8b5cf6',
      stat: '0%',
      statLabel: 'APR available',
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-white relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#f8f6f6] rounded-full text-sm font-medium text-[#6b7280] mb-4">
            Why Buy Graded?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#181111] mb-4">
            Why Should You Buy Graded Appliances?
          </h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto">
            Smart shoppers save thousands on brand-new appliances with minor cosmetic imperfections.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="group relative bg-[#f8f6f6] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-[#ebe5e5] overflow-hidden"
              >
                {/* Accent border on left */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 group-hover:w-1.5"
                  style={{ backgroundColor: benefit.accent }}
                />

                <div className="flex gap-5">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${benefit.accent}15` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: benefit.accent }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#181111] mb-2 group-hover:text-[#e85d4c] transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-[#6b7280] text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Stat badge */}
                  <div className="hidden sm:flex flex-col items-end justify-center text-right">
                    <span className="text-2xl font-bold" style={{ color: benefit.accent }}>
                      {benefit.stat}
                    </span>
                    <span className="text-xs text-[#6b7280] uppercase tracking-wider">
                      {benefit.statLabel}
                    </span>
                  </div>
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-5 transition-opacity duration-300 group-hover:opacity-10"
                  style={{ backgroundColor: benefit.accent }}
                />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#6b7280] mb-4">
            Join <span className="font-semibold text-[#181111]">thousands of UK households</span> saving on quality appliances
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['✓ Same brands', '✓ Full function', '✓ Just cosmetic marks'].map((item) => (
              <span key={item} className="px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-full">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
