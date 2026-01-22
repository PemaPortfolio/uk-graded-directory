'use client'

/**
 * Opening Hours Editor Component (Spec 03)
 *
 * UI for editing weekly opening hours.
 */

import { useState, useEffect } from 'react'
import type { OperatingHours, DayHours } from '@/types/business'

interface OpeningHoursEditorProps {
  value: OperatingHours
  onChange: (hours: OperatingHours) => void
  className?: string
}

const DAYS = [
  { key: 'monday', label: 'Mon', fullLabel: 'Monday' },
  { key: 'tuesday', label: 'Tue', fullLabel: 'Tuesday' },
  { key: 'wednesday', label: 'Wed', fullLabel: 'Wednesday' },
  { key: 'thursday', label: 'Thu', fullLabel: 'Thursday' },
  { key: 'friday', label: 'Fri', fullLabel: 'Friday' },
  { key: 'saturday', label: 'Sat', fullLabel: 'Saturday' },
  { key: 'sunday', label: 'Sun', fullLabel: 'Sunday' },
] as const

// Generate time options in 30-minute increments
function generateTimeOptions(): string[] {
  const options: string[] = []
  for (let hour = 6; hour <= 22; hour++) {
    for (const minute of ['00', '30']) {
      options.push(`${hour.toString().padStart(2, '0')}:${minute}`)
    }
  }
  return options
}

const TIME_OPTIONS = generateTimeOptions()

const DEFAULT_HOURS: DayHours = { open: '09:00', close: '17:30' }

export function OpeningHoursEditor({
  value,
  onChange,
  className = '',
}: OpeningHoursEditorProps) {
  const [applyToWeekdays, setApplyToWeekdays] = useState(false)

  // Helper to update a single day
  const updateDay = (day: keyof OperatingHours, hours: DayHours | null) => {
    const newHours = { ...value, [day]: hours }

    // If "apply to all weekdays" is checked and this is a weekday
    if (applyToWeekdays && day !== 'saturday' && day !== 'sunday') {
      const weekdays: (keyof OperatingHours)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      weekdays.forEach((weekday) => {
        newHours[weekday] = hours
      })
    }

    onChange(newHours)
  }

  // Helper to toggle a day open/closed
  const toggleDay = (day: keyof OperatingHours) => {
    const currentHours = value[day]
    if (currentHours) {
      updateDay(day, null)
    } else {
      updateDay(day, { ...DEFAULT_HOURS })
    }
  }

  // Handle "apply to weekdays" toggle
  const handleApplyToWeekdaysToggle = (checked: boolean) => {
    setApplyToWeekdays(checked)
    if (checked && value.monday) {
      // Apply Monday's hours to all weekdays
      const weekdays: (keyof OperatingHours)[] = ['tuesday', 'wednesday', 'thursday', 'friday']
      const newHours = { ...value }
      weekdays.forEach((day) => {
        newHours[day] = value.monday ? { ...value.monday } : null
      })
      onChange(newHours)
    }
  }

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
          Set your regular opening hours
        </h3>

        {/* Apply to weekdays checkbox */}
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={applyToWeekdays}
            onChange={(e) => handleApplyToWeekdaysToggle(e.target.checked)}
            className="
              w-4 h-4
              rounded
              border-gray-300 dark:border-gray-600
              text-[#e85d4c]
              focus:ring-[#e85d4c]
            "
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Apply same hours to all weekdays
          </span>
        </label>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Day
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Open
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Opens
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Closes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {DAYS.map(({ key, label, fullLabel }) => {
              const dayKey = key as keyof OperatingHours
              const dayHours = value[dayKey]
              const isOpen = dayHours !== null

              return (
                <tr key={key} className="bg-white dark:bg-gray-900">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 sm:hidden">
                      {label}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 hidden sm:inline">
                      {fullLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={isOpen}
                      onChange={() => toggleDay(dayKey)}
                      className="
                        w-4 h-4
                        rounded
                        border-gray-300 dark:border-gray-600
                        text-[#e85d4c]
                        focus:ring-[#e85d4c]
                      "
                      aria-label={`${fullLabel} open`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    {isOpen ? (
                      <select
                        value={dayHours?.open || ''}
                        onChange={(e) =>
                          updateDay(dayKey, {
                            ...dayHours,
                            open: e.target.value,
                            close: dayHours?.close || '17:30',
                          })
                        }
                        className="
                          w-full px-2 py-1.5
                          text-sm
                          border border-gray-300 dark:border-gray-600
                          rounded
                          bg-white dark:bg-gray-800
                          text-gray-900 dark:text-gray-100
                          focus:outline-none focus:ring-1 focus:ring-[#e85d4c]
                        "
                        aria-label={`${fullLabel} opening time`}
                      >
                        {TIME_OPTIONS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-sm text-gray-400 dark:text-gray-500">
                        Closed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isOpen ? (
                      <select
                        value={dayHours?.close || ''}
                        onChange={(e) =>
                          updateDay(dayKey, {
                            ...dayHours,
                            open: dayHours?.open || '09:00',
                            close: e.target.value,
                          })
                        }
                        className="
                          w-full px-2 py-1.5
                          text-sm
                          border border-gray-300 dark:border-gray-600
                          rounded
                          bg-white dark:bg-gray-800
                          text-gray-900 dark:text-gray-100
                          focus:outline-none focus:ring-1 focus:ring-[#e85d4c]
                        "
                        aria-label={`${fullLabel} closing time`}
                      >
                        {TIME_OPTIONS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OpeningHoursEditor
