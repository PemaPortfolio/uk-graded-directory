import { CheckCircle, Award, Shield, Wrench, Clock, BadgeCheck } from 'lucide-react'
import type { BrandData } from '@/lib/data/getBrandRepairData'

interface Props {
  brand: BrandData
}

/**
 * Why Choose Authorized Repair Section (Spec 15)
 */
export default function WhyAuthorizedSection({ brand }: Props) {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Genuine Parts',
      description: `Only authentic ${brand.name} replacement parts used`,
    },
    {
      icon: Award,
      title: `Trained by ${brand.name}`,
      description: 'Certified to manufacturer standards',
    },
    {
      icon: Shield,
      title: 'Warranty Safe',
      description: "Won't void your manufacturer warranty",
    },
    {
      icon: Wrench,
      title: 'Diagnostic Expertise',
      description: `Access to ${brand.name} technical data and error codes`,
    },
    {
      icon: Clock,
      title: 'Priority Service',
      description: 'Often faster parts supply from manufacturer',
    },
    {
      icon: BadgeCheck,
      title: 'Quality Guarantee',
      description: 'Repairs backed by 6-12 month warranties',
    },
  ]

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Why Choose {brand.name}-Authorized Repair?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-lg p-2">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
