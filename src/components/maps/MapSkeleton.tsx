'use client'

/**
 * Map Skeleton Component (Spec 20)
 *
 * Loading state for map components.
 */

import { Loader2 } from 'lucide-react'

interface MapSkeletonProps {
  height?: string
  className?: string
}

export function MapSkeleton({ height = '400px', className = '' }: MapSkeletonProps) {
  return (
    <div
      className={`
        relative
        bg-gray-100 dark:bg-gray-800
        rounded-lg
        overflow-hidden
        animate-pulse
        ${className}
      `}
      style={{ height }}
    >
      {/* Grid pattern to simulate map tiles */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-px opacity-20">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-300 dark:bg-gray-700"
          />
        ))}
      </div>

      {/* Center loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#e85d4c] animate-spin" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Loading map...
          </span>
        </div>
      </div>

      {/* Fake zoom controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="w-8 h-8 bg-white dark:bg-gray-700 rounded shadow-sm" />
        <div className="w-8 h-8 bg-white dark:bg-gray-700 rounded shadow-sm" />
      </div>

      {/* Fake attribution */}
      <div className="absolute bottom-2 right-2">
        <div className="h-4 w-32 bg-white/50 dark:bg-gray-700/50 rounded" />
      </div>
    </div>
  )
}

export default MapSkeleton
