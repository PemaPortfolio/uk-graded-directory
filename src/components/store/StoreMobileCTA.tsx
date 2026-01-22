'use client'

import { Phone, Globe } from 'lucide-react'

interface Props {
  phone: string | null
  website: string | null
}

/**
 * Mobile Sticky CTA Bar (Spec 06)
 *
 * Fixed bottom bar with call and website buttons on mobile.
 */
export default function StoreMobileCTA({ phone, website }: Props) {
  if (!phone && !website) return null

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-50 safe-area-pb">
      <div className="flex gap-3 p-3">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-medium"
          >
            <Phone className="w-5 h-5" />
            Call
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-[#e85d4c] text-[#e85d4c] rounded-lg font-medium"
          >
            <Globe className="w-5 h-5" />
            Website
          </a>
        )}
      </div>
    </div>
  )
}
