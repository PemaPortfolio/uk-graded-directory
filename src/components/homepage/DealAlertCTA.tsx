'use client'

import { useState } from 'react'
import { Check, Bell, Mail, Sparkles } from 'lucide-react'

/**
 * Deal Alert CTA Section (Spec 12 - Section 5)
 *
 * UPGRADED with bold design:
 * - Gradient background with decorative elements
 * - Animated bell icon
 * - Glass-morphism input field
 * - Premium micro-interactions
 */
export default function DealAlertCTA() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)

    // TODO: Integrate with email service
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setEmail('')
  }

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e85d4c] via-[#d94f3f] to-[#c44538]" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-black/5 rounded-full blur-3xl" />
        {/* Floating shapes */}
        <div className="absolute top-10 right-[15%] w-20 h-20 border border-white/10 rounded-2xl rotate-12 animate-float" />
        <div className="absolute bottom-16 left-[10%] w-16 h-16 border border-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-[8%] w-12 h-12 bg-white/5 rounded-xl -rotate-12 animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 text-center">
        {/* Animated icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 animate-pulse-glow">
          <Bell className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Get Exclusive Deal Alerts
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Be first to know about new graded deals in your area
        </p>

        {isSubmitted ? (
          <div className="animate-scale-in">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">You&apos;re on the list!</p>
                <p className="text-white/70 text-sm">Check your inbox for confirmation</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 px-8 bg-white hover:bg-white/90 disabled:bg-white/50 text-[#e85d4c] rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-[#e85d4c]/30 border-t-[#e85d4c] rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Get Alerts
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            No spam, ever
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            Unsubscribe anytime
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            Weekly digest only
          </span>
        </div>

        {/* Subscriber count */}
        <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="flex -space-x-2">
            {['👤', '👤', '👤'].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs">
                {_}
              </div>
            ))}
          </div>
          <span className="text-white/80 text-sm">
            <strong className="text-white">2,400+</strong> savvy shoppers subscribed
          </span>
        </div>
      </div>
    </section>
  )
}
