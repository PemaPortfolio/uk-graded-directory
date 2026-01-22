/**
 * Benefits Section (Spec 12 - Section 8)
 *
 * 4 benefit cards explaining why to buy graded appliances.
 * 2x2 grid on desktop, single column on mobile.
 */
export default function BenefitsSection() {
  const benefits = [
    {
      icon: '💰',
      title: 'Save 30-70% Off RRP',
      description: 'Ex-display and factory seconds at huge discounts compared to full retail prices.',
    },
    {
      icon: '🛡️',
      title: 'Full Warranty Protection',
      description: '6-24 months manufacturer or retailer warranty included on all graded items.',
    },
    {
      icon: '🚚',
      title: 'Delivery & Installation',
      description: 'Most stores offer free delivery over £300, with installation available.',
    },
    {
      icon: '💳',
      title: 'Flexible Finance Options',
      description: 'Klarna, Clearpay, and PayPal Credit available at many retailers.',
    },
  ]

  return (
    <section className="py-12 lg:py-16 bg-[#f8f6f6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Question-based H2 for AEO */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#181111] mb-8">
          Why Should You Buy Graded Appliances?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-[#181111] mb-2">
                {benefit.title}
              </h3>
              <p className="text-[#6b7280]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
