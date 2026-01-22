import { Truck, Wrench, CreditCard, Check } from 'lucide-react'

interface Props {
  store: {
    phone: string | null
    offers_delivery: boolean
    offers_free_delivery: boolean
    free_delivery_threshold: number | null
    delivery_radius_miles: number | null
    offers_same_day_delivery: boolean
    offers_next_day_delivery: boolean
    offers_installation: boolean
    offers_free_installation: boolean
    installation_cost: number | null
    offers_old_appliance_removal: boolean
    offers_weee_recycling: boolean
    offers_finance: boolean
    offers_zero_percent_finance: boolean
    finance_providers: string[] | null
    offers_click_collect: boolean
    offers_repair_service: boolean
  }
}

/**
 * Services Offered Section (Spec 06 - Section 6)
 */
export default function StoreServicesSection({ store }: Props) {
  const deliveryServices = [
    store.offers_free_delivery && {
      label: `Free local delivery${store.delivery_radius_miles ? ` (within ${store.delivery_radius_miles} miles)` : ''}`,
      available: true,
    },
    store.offers_same_day_delivery && {
      label: 'Same-day delivery available',
      available: true,
    },
    store.offers_next_day_delivery && {
      label: 'Next-day delivery available',
      available: true,
    },
    store.offers_delivery &&
      !store.offers_free_delivery && {
        label: 'Delivery available',
        available: true,
      },
  ].filter(Boolean)

  const installationServices = [
    store.offers_free_installation && {
      label: 'Free installation on all appliances',
      available: true,
    },
    store.offers_installation &&
      !store.offers_free_installation && {
        label: `Installation available${store.installation_cost ? ` from £${store.installation_cost}` : ''}`,
        available: true,
      },
    store.offers_old_appliance_removal && {
      label: 'Old appliance removal included',
      available: true,
    },
    store.offers_weee_recycling && {
      label: 'WEEE recycling available',
      available: true,
    },
  ].filter(Boolean)

  const paymentServices = [
    store.offers_zero_percent_finance && {
      label: '0% finance available (subject to status)',
      available: true,
    },
    store.offers_finance &&
      !store.offers_zero_percent_finance && {
        label: 'Finance available',
        available: true,
      },
    store.finance_providers &&
      store.finance_providers.length > 0 && {
        label: `Finance providers: ${store.finance_providers.join(', ')}`,
        available: true,
      },
    store.offers_click_collect && {
      label: 'Click & Collect available',
      available: true,
    },
  ].filter(Boolean)

  const hasAnyServices =
    deliveryServices.length > 0 ||
    installationServices.length > 0 ||
    paymentServices.length > 0 ||
    store.offers_repair_service

  if (!hasAnyServices) return null

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Services Offered</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Delivery */}
        {deliveryServices.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
              <Truck className="w-5 h-5 text-[#e85d4c]" />
              Delivery
            </h3>
            <ul className="space-y-2">
              {deliveryServices.map((service, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {(service as { label: string }).label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Installation */}
        {installationServices.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
              <Wrench className="w-5 h-5 text-[#e85d4c]" />
              Installation
            </h3>
            <ul className="space-y-2">
              {installationServices.map((service, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {(service as { label: string }).label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Payment */}
        {paymentServices.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
              <CreditCard className="w-5 h-5 text-[#e85d4c]" />
              Payment Options
            </h3>
            <ul className="space-y-2">
              {paymentServices.map((service, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {(service as { label: string }).label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Repairs */}
        {store.offers_repair_service && (
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
              <Wrench className="w-5 h-5 text-[#e85d4c]" />
              Repairs
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                In-house repair service available
              </li>
              {store.phone && (
                <li className="text-sm text-gray-600 ml-6">
                  Call for repair bookings:{' '}
                  <a href={`tel:${store.phone}`} className="text-[#e85d4c] hover:underline">
                    {store.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
