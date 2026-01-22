'use client'

/**
 * Store Form Step 3: Opening Hours (Spec 03)
 *
 * Weekly operating hours.
 */

import { OpeningHoursEditor } from '../../shared/OpeningHoursEditor'
import type { StoreStep3Data, OperatingHours } from '@/types/business'

interface StoreStep3HoursProps {
  data: Partial<StoreStep3Data>
  onChange: (data: Partial<StoreStep3Data>) => void
  errors?: Record<string, string>
  className?: string
}

const DEFAULT_HOURS: OperatingHours = {
  monday: { open: '09:00', close: '17:30' },
  tuesday: { open: '09:00', close: '17:30' },
  wednesday: { open: '09:00', close: '17:30' },
  thursday: { open: '09:00', close: '17:30' },
  friday: { open: '09:00', close: '17:30' },
  saturday: { open: '09:00', close: '16:00' },
  sunday: null,
}

export function StoreStep3Hours({
  data,
  onChange,
  errors = {},
  className = '',
}: StoreStep3HoursProps) {
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

export default StoreStep3Hours
