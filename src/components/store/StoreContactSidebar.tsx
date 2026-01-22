'use client'

import { Phone, Globe, MapPin, Mail, Clock } from 'lucide-react'

interface Props {
  store: {
    phone: string | null
    phone_secondary: string | null
    email: string | null
    website: string | null
    address_line1: string | null
    address_line2: string | null
    postcode: string | null
    latitude: number | null
    longitude: number | null
    operating_hours: Record<string, string> | null
  }
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const DAY_LABELS: Record<string, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
}

/**
 * Store Contact Sidebar (Spec 06 - Section 3)
 *
 * Desktop: Sticky sidebar with contact info and hours.
 * Mobile: Converted to sticky bottom CTA bar (separate component).
 */
export default function StoreContactSidebar({ store }: Props) {
  const hasAddress = store.address_line1 || store.postcode
  const hasLocation = store.latitude && store.longitude

  const getGoogleMapsUrl = () => {
    if (hasLocation) {
      return `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`
    }
    if (hasAddress) {
      const address = [store.address_line1, store.postcode].filter(Boolean).join(', ')
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    }
    return null
  }

  return (
    <aside className="hidden lg:block w-80 flex-shrink-0">
      <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">Contact This Retailer</h2>

        {/* Primary CTA - Call */}
        {store.phone && (
          <a
            href={`tel:${store.phone}`}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors mb-3"
          >
            <Phone className="w-5 h-5" />
            Call {store.phone}
          </a>
        )}

        {/* Secondary CTA - Website */}
        {store.website && (
          <a
            href={store.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-[#e85d4c] text-[#e85d4c] rounded-lg font-medium hover:bg-[#e85d4c] hover:text-white transition-colors mb-3"
          >
            <Globe className="w-5 h-5" />
            Visit Website
          </a>
        )}

        {/* Directions */}
        {getGoogleMapsUrl() && (
          <a
            href={getGoogleMapsUrl()!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors mb-4"
          >
            <MapPin className="w-5 h-5" />
            Get Directions
          </a>
        )}

        {/* Divider */}
        <hr className="my-4 border-gray-200" />

        {/* Opening Hours */}
        {store.operating_hours && Object.keys(store.operating_hours).length > 0 && (
          <div className="mb-4">
            <h3 className="flex items-center gap-2 font-medium text-gray-900 mb-3">
              <Clock className="w-4 h-4" />
              Opening Hours
            </h3>
            <div className="space-y-1.5 text-sm">
              {DAYS.map((day) => {
                const hours = store.operating_hours?.[day] || 'Closed'
                return (
                  <div key={day} className="flex justify-between">
                    <span className="text-gray-600">{DAY_LABELS[day]}</span>
                    <span className="text-gray-900">{hours}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Email */}
        {store.email && (
          <a
            href={`mailto:${store.email}`}
            className="flex items-center gap-2 text-sm text-[#e85d4c] hover:underline"
          >
            <Mail className="w-4 h-4" />
            Email enquiry
          </a>
        )}
      </div>
    </aside>
  )
}
