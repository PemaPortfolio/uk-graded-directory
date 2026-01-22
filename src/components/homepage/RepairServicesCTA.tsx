import Link from 'next/link'
import { Wrench, BookOpen } from 'lucide-react'

/**
 * Repair Services CTA Section (Spec 12 - Section 10)
 *
 * Dedicated section for repair services with trust signals.
 * ID="repair" for anchor link from hero.
 */
export default function RepairServicesCTA() {
  const trustSignals = [
    'Gas Safe Registered',
    'Same-Day Available',
    'Warranty on Work',
    'Manufacturer Authorised',
  ]

  return (
    <section id="repair" className="py-12 lg:py-16 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Question-based H2 for AEO */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Need Appliance Repair Instead?
        </h2>

        <p className="text-slate-300 mb-6">
          Compare trusted local engineers for all major appliance brands.
        </p>

        {/* Trust Signals */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {trustSignals.map((signal) => (
            <span
              key={signal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm"
            >
              <span className="text-green-400">✓</span> {signal}
            </span>
          ))}
        </div>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/repair"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e85d4c] hover:bg-[#d94f3f] rounded-lg font-medium transition-colors"
          >
            <Wrench className="w-5 h-5" />
            Find Repair Engineers
          </Link>
          <Link
            href="/guides/repair-vs-replace"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Repair vs Replace Guide
          </Link>
        </div>
      </div>
    </section>
  )
}
