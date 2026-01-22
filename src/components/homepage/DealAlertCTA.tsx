'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

/**
 * Deal Alert CTA Section (Spec 12 - Section 5)
 *
 * Lead capture for email marketing and deal notifications.
 */
export default function DealAlertCTA() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)

    // TODO: Integrate with email service (Mailchimp, ConvertKit, etc.)
    // For now, simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setEmail('')
  }

  return (
    <section className="py-12 bg-blue-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-3xl mb-2">🔔</div>
        <h2 className="text-2xl font-bold text-[#181111]">Get Deal Alerts</h2>
        <p className="text-[#6b7280] mt-2">
          Be first to know about new graded deals in your area
        </p>

        {isSubmitted ? (
          <div className="flex items-center justify-center gap-2 mt-6 text-green-600">
            <Check className="w-5 h-5" />
            <span>Thanks! You&apos;re on the list.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 mt-6 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-6 bg-[#e85d4c] hover:bg-[#d94f3f] disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Get Alerts'}
            </button>
          </form>
        )}

        <div className="flex justify-center gap-6 mt-4 text-sm text-[#6b7280]">
          <span className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-600" /> No spam
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-600" /> Unsubscribe anytime
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-600" /> Weekly digest
          </span>
        </div>
      </div>
    </section>
  )
}
