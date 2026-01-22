'use client'

import { Phone, Star } from 'lucide-react'

interface Props {
  phone: string | null
  averageRating: number | null
}

/**
 * Provider Mobile Sticky CTA Bar (Spec 11)
 *
 * Fixed bottom bar with call button on mobile.
 * Red background for urgency (broken appliance = urgent need).
 */
export default function ProviderMobileCTA({ phone, averageRating }: Props) {
  if (!phone) return null

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-red-600 text-white shadow-[0_-4px_12px_rgba(0,0,0,0.15)] z-50 safe-area-pb">
      <a
        href={`tel:${phone}`}
        className="flex items-center justify-between px-4 py-4"
      >
        <div className="flex items-center gap-3">
          <Phone className="w-6 h-6" />
          <span className="font-bold text-lg">Call Now: {phone}</span>
        </div>
        {averageRating && (
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-white" />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
          </div>
        )}
      </a>
    </div>
  )
}
