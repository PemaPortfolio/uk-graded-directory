'use client'

/**
 * Single Location Map Component (Spec 20)
 *
 * Google Maps embed for store/provider profile pages.
 * Uses free Google Maps iframe - no API key required.
 */

import { useState } from 'react'
import { MapPin, Copy, Check, ExternalLink } from 'lucide-react'

interface Address {
  line1?: string
  line2?: string
  city: string
  postcode?: string
}

interface SingleLocationMapProps {
  name: string
  latitude?: number | null
  longitude?: number | null
  address?: Address
  contextNote?: string
  showCopyButton?: boolean
  className?: string
}

export function SingleLocationMap({
  name,
  latitude,
  longitude,
  address,
  contextNote,
  showCopyButton = true,
  className = '',
}: SingleLocationMapProps) {
  const [copied, setCopied] = useState(false)

  // Build full address string
  const fullAddress = address
    ? [address.line1, address.line2, address.city, address.postcode]
        .filter(Boolean)
        .join(', ')
    : ''

  // Generate embed URL (prefer coordinates)
  const embedUrl =
    latitude && longitude
      ? `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`
      : fullAddress
        ? `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`
        : null

  // Generate directions URL
  const directionsUrl =
    latitude && longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
      : fullAddress
        ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`
        : null

  // Copy address to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Don't render if no location data
  if (!embedUrl) {
    return null
  }

  return (
    <section className={`py-6 ${className}`} aria-labelledby="location-heading">
      <h2
        id="location-heading"
        className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2"
      >
        <MapPin className="w-5 h-5 text-[#e85d4c]" />
        Our Location
      </h2>

      {/* Map Embed */}
      <div className="rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
        <iframe
          src={embedUrl}
          width="100%"
          height="300"
          className="h-[200px] md:h-[300px] w-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing ${name} location in ${address?.city || 'the area'}`}
        />
      </div>

      {/* Address */}
      {address && (
        <address className="not-italic text-gray-700 dark:text-gray-300 mb-4 text-sm">
          {address.line1 && <p>{address.line1}</p>}
          {address.line2 && <p>{address.line2}</p>}
          <p>
            {address.city}
            {address.postcode && `, ${address.postcode}`}
          </p>
        </address>
      )}

      {/* Context Note */}
      {contextNote && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-start gap-2">
          <span className="text-blue-500">ℹ️</span>
          {contextNote}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {showCopyButton && fullAddress && (
          <button
            onClick={handleCopy}
            className="
              flex items-center justify-center gap-2
              px-4 py-3
              border border-gray-300 dark:border-gray-600
              rounded-lg
              text-sm font-medium
              text-gray-700 dark:text-gray-200
              hover:bg-gray-50 dark:hover:bg-gray-800
              transition-colors
              min-h-[44px]
            "
            aria-label={copied ? 'Address copied' : 'Copy address to clipboard'}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Address
              </>
            )}
          </button>
        )}

        {directionsUrl && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center gap-2
              px-4 py-3
              bg-[#e85d4c] hover:bg-[#d94f3f]
              rounded-lg
              text-sm font-medium
              text-white
              transition-colors
              min-h-[44px]
            "
          >
            <ExternalLink className="w-4 h-4" />
            Get Directions
          </a>
        )}
      </div>
    </section>
  )
}

export default SingleLocationMap
