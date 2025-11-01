'use client'

import { LucideIcon } from 'lucide-react'

export interface FilterOption {
  value: string
  label: string
  icon?: LucideIcon
  count?: number
}

interface FilterButtonProps {
  option: FilterOption
  isActive: boolean
  onClick: () => void
  variant?: 'pill' | 'badge'
  showCount?: boolean
}

export default function FilterButton({
  option,
  isActive,
  onClick,
  variant = 'pill',
  showCount = false,
}: FilterButtonProps) {
  const Icon = option.icon

  const baseClasses = 'smooth-hover inline-flex items-center gap-2 font-semibold transition-all focus-ring'

  const variantClasses = {
    pill: 'rounded-full px-4 py-2 text-sm',
    badge: 'rounded-lg px-3 py-1.5 text-xs',
  }

  const stateClasses = isActive
    ? 'bg-primary-900 text-white shadow-md hover:bg-primary-800'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${stateClasses} touch-feedback`}
      aria-pressed={isActive}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{option.label}</span>
      {showCount && option.count !== undefined && (
        <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
          isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {option.count}
        </span>
      )}
    </button>
  )
}

// FilterGroup Component
interface FilterGroupProps {
  title: string
  options: FilterOption[]
  activeValue: string | string[]
  onChange: (value: string) => void
  variant?: 'pill' | 'badge'
  showCount?: boolean
  multiSelect?: boolean
}

export function FilterGroup({
  title,
  options,
  activeValue,
  onChange,
  variant = 'pill',
  showCount = false,
  multiSelect = false,
}: FilterGroupProps) {
  const isActive = (value: string) => {
    if (Array.isArray(activeValue)) {
      return activeValue.includes(value)
    }
    return activeValue === value
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-700">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <FilterButton
            key={option.value}
            option={option}
            isActive={isActive(option.value)}
            onClick={() => onChange(option.value)}
            variant={variant}
            showCount={showCount}
          />
        ))}
      </div>
    </div>
  )
}
