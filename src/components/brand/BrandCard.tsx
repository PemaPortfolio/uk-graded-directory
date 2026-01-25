import Link from 'next/link'
import { Store, ChevronRight } from 'lucide-react'
import type { BrandWithStats } from '@/lib/data/getBrandsIndexData'

interface BrandCardProps {
  brand: BrandWithStats
}

/**
 * Brand Card Component
 * Displays a single brand with logo, name, and store count
 */
export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href={`/brands/${brand.slug}/`}
      className="group bg-white dark:bg-[#1a1616] rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-200 flex flex-col items-center text-center"
    >
      {/* Logo or Name */}
      {brand.logo_url ? (
        <div className="h-12 w-full flex items-center justify-center mb-3">
          <img
            src={brand.logo_url}
            alt={brand.name}
            className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all"
          />
        </div>
      ) : (
        <div className="h-12 flex items-center justify-center mb-3">
          <span className="font-bold text-xl text-[#181111] dark:text-[#f5f0f0] group-hover:text-[#e85d4c] transition-colors">
            {brand.name}
          </span>
        </div>
      )}

      {/* Brand name (if logo shown) */}
      {brand.logo_url && (
        <span className="font-semibold text-[#181111] dark:text-[#f5f0f0] group-hover:text-[#e85d4c] transition-colors mb-2">
          {brand.name}
        </span>
      )}

      {/* Store count */}
      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <Store className="w-4 h-4" />
        <span>{brand.store_count} store{brand.store_count !== 1 ? 's' : ''}</span>
      </div>

      {/* View link */}
      <div className="mt-3 flex items-center text-[#e85d4c] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        View <ChevronRight className="w-4 h-4" />
      </div>
    </Link>
  )
}
