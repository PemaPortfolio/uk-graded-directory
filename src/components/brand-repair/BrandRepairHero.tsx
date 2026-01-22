import Image from 'next/image'
import { CheckCircle, ShieldCheck } from 'lucide-react'
import type { BrandData, PlaceData, BrandRepairStats } from '@/lib/data/getBrandRepairData'

interface Props {
  brand: BrandData
  place: PlaceData
  stats: BrandRepairStats
}

/**
 * Hero Section for Brand Repair Page (Spec 15)
 */
export default function BrandRepairHero({ brand, place, stats }: Props) {
  return (
    <section className="bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Brand Logo + H1 */}
        <div className="flex items-start gap-6 mb-6">
          {brand.logo_url && (
            <div className="flex-shrink-0">
              <Image
                src={brand.logo_url}
                alt={`${brand.name} logo`}
                width={100}
                height={60}
                className="object-contain"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#e85d4c]">
              {brand.name} Repair in {place.name}
            </h1>
          </div>
        </div>

        {/* Trust Banner */}
        {brand.has_authorised_network ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-green-800 mb-1">
                  Manufacturer-Authorized Engineers
                </h2>
                <p className="text-green-700 text-sm">
                  Our engineers are trained and certified by {brand.name} to repair their full range of appliances using genuine parts.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-blue-800 mb-1">
                  Experienced {brand.name} Specialists
                </h2>
                <p className="text-blue-700 text-sm">
                  Our engineers have extensive experience repairing {brand.name} appliances and use quality replacement parts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Intro Paragraph */}
        <p className="text-lg text-gray-600 leading-relaxed">
          Find {stats.providerCount} {brand.name}-authorized repair engineer{stats.providerCount !== 1 ? 's' : ''} in {place.name}.
          {stats.verifiedCount > 0 && (
            <> {stats.verifiedCount} verified as authorized {brand.name} service partner{stats.verifiedCount !== 1 ? 's' : ''},</>
          )}{' '}
          ensuring quality repairs with genuine parts.
        </p>
      </div>
    </section>
  )
}
