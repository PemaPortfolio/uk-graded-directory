import { PoundSterling, Check } from 'lucide-react'

interface Props {
  provider: {
    callout_fee_from: number | null
    callout_fee_to: number | null
    no_fix_no_fee: boolean
    free_quotes: boolean
  }
}

/**
 * Pricing Information Section (Spec 11 - Section 10)
 */
export default function ProviderPricingSection({ provider }: Props) {
  const hasCalloutFee = provider.callout_fee_from !== null

  if (!hasCalloutFee && !provider.no_fix_no_fee && !provider.free_quotes) {
    return null
  }

  // Format callout fee display
  const getCalloutFeeText = () => {
    if (provider.callout_fee_from === null) return null

    if (provider.callout_fee_to && provider.callout_fee_to !== provider.callout_fee_from) {
      return `£${provider.callout_fee_from} - £${provider.callout_fee_to}`
    }
    return `From £${provider.callout_fee_from}`
  }

  const calloutFeeText = getCalloutFeeText()

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing Information</h2>

      <div className="space-y-4">
        {/* Callout Fee */}
        {calloutFeeText && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <PoundSterling className="w-6 h-6 text-blue-600" />
            <div>
              <div className="font-semibold text-blue-900 text-lg">
                {calloutFeeText}
              </div>
              <div className="text-sm text-blue-700">Callout fee</div>
            </div>
          </div>
        )}

        {/* Policies */}
        <div className="flex flex-wrap gap-3">
          {provider.no_fix_no_fee && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                No Fix, No Fee
              </span>
            </div>
          )}

          {provider.free_quotes && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Free Quotes
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
