import { Shield, Flame, CheckCircle, Award, FileCheck } from 'lucide-react'

interface Props {
  provider: {
    gas_safe_registered: boolean
    gas_safe_number: string | null
    fgas_certified: boolean
    which_trusted_trader: boolean
    checkatrade_member: boolean
    checkatrade_id: string | null
    trustatrader_member: boolean
    public_liability_insurance: boolean
    insurance_amount: number | null
  }
}

/**
 * Trust & Certifications Section (Spec 11 - Section 9)
 */
export default function ProviderCertificationsSection({ provider }: Props) {
  const certifications = [
    provider.gas_safe_registered && {
      icon: Shield,
      title: 'Gas Safe Registered',
      description: provider.gas_safe_number
        ? `Registration: ${provider.gas_safe_number}`
        : 'Certified to work on gas appliances',
      variant: 'primary' as const,
    },
    provider.fgas_certified && {
      icon: Flame,
      title: 'F-Gas Certified',
      description: 'Qualified for refrigeration work',
      variant: 'primary' as const,
    },
    provider.which_trusted_trader && {
      icon: Award,
      title: 'Which? Trusted Trader',
      description: 'Endorsed by Which? magazine',
      variant: 'gold' as const,
    },
    provider.checkatrade_member && {
      icon: CheckCircle,
      title: 'Checkatrade Member',
      description: provider.checkatrade_id
        ? `ID: ${provider.checkatrade_id}`
        : 'Verified on Checkatrade',
      variant: 'standard' as const,
    },
    provider.trustatrader_member && {
      icon: CheckCircle,
      title: 'Trustatrader Member',
      description: 'Listed on Trustatrader',
      variant: 'standard' as const,
    },
    provider.public_liability_insurance && {
      icon: FileCheck,
      title: 'Public Liability Insurance',
      description: provider.insurance_amount
        ? `Covered up to £${provider.insurance_amount.toLocaleString()}`
        : 'Fully insured',
      variant: 'standard' as const,
    },
  ].filter(Boolean)

  if (certifications.length === 0) return null

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Trust & Certifications
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert, index) => {
          const { icon: Icon, title, description, variant } = cert as {
            icon: typeof Shield
            title: string
            description: string
            variant: 'primary' | 'gold' | 'standard'
          }

          const variantStyles = {
            primary: 'bg-blue-50 border-blue-200',
            gold: 'bg-amber-50 border-amber-200',
            standard: 'bg-gray-50 border-gray-200',
          }

          const iconStyles = {
            primary: 'text-blue-600',
            gold: 'text-amber-600',
            standard: 'text-gray-600',
          }

          return (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-lg border ${variantStyles[variant]}`}
            >
              <Icon className={`w-6 h-6 flex-shrink-0 ${iconStyles[variant]}`} />
              <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
