'use client'

/**
 * Provider Form Step 3: Opening Hours (Spec 03)
 *
 * Weekly operating hours - same as store.
 */

import { OpeningHoursEditor } from '../../shared/OpeningHoursEditor'
import type { ProviderStep3Data, OperatingHours } from '@/types/business'

interface ProviderStep3HoursProps {
  data: Partial<ProviderStep3Data>
  onChange: (data: Partial<ProviderStep3Data>) => void
  errors?: Record<string, string>
  className?: string
}

const DEFAULT_HOURS: OperatingHours = {
  monday: { open: '08:00', close: '18:00' },
  tuesday: { open: '08:00', close: '18:00' },
  wednesday: { open: '08:00', close: '18:00' },
  thursday: { open: '08:00', close: '18:00' },
  friday: { open: '08:00', close: '18:00' },
  saturday: { open: '09:00', close: '14:00' },
  sunday: null,
}

export function ProviderStep3Hours({
  data,
  onChange,
  errors = {},
  className = '',
}: ProviderStep3HoursProps) {
  const currentHours = data.operating_hours || DEFAULT_HOURS

  const handleHoursChange = (hours: OperatingHours) => {
    onChange({ ...data, operating_hours: hours })
  }

  return (
    <div className={className}>
      <OpeningHoursEditor
        value={currentHours}
        onChange={handleHoursChange}
      />

      {errors.operating_hours && (
        <p className="mt-4 text-sm text-red-500">{errors.operating_hours}</p>
      )}
    </div>
  )
}

export default ProviderStep3Hours
