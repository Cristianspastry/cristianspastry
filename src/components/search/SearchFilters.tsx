'use client'

import { ChefHat, BookOpen, Beaker } from 'lucide-react'

interface SearchFiltersProps {
  activeFilter: 'all' | 'recipes' | 'techniques' | 'science'
  onFilterChange: (filter: 'all' | 'recipes' | 'techniques' | 'science') => void
  counts: {
    recipes: number
    techniques: number
    science: number
  }
}

const filters = [
  { key: 'all' as const, label: 'Tutti', icon: null },
  { key: 'recipes' as const, label: 'Ricette', icon: ChefHat, color: 'text-green-600 bg-green-50 border-green-200' },
  { key: 'techniques' as const, label: 'Tecniche', icon: BookOpen, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { key: 'science' as const, label: 'Scienza', icon: Beaker, color: 'text-orange-600 bg-orange-50 border-orange-200' },
]

export default function SearchFilters({ activeFilter, onFilterChange, counts }: SearchFiltersProps) {
  const getCount = (key: string) => {
    if (key === 'all') return counts.recipes + counts.techniques + counts.science
    return counts[key as keyof typeof counts] || 0
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {filters.map((filter) => {
        const Icon = filter.icon
        const count = getCount(filter.key)
        const isActive = activeFilter === filter.key

        return (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            disabled={count === 0 && filter.key !== 'all'}
            className={`
              flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all
              ${isActive
                ? filter.key === 'all'
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : `${filter.color} border-2`
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }
              ${count === 0 && filter.key !== 'all' ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{filter.label}</span>
            <span className={`
              rounded-full px-2 py-0.5 text-xs font-bold
              ${isActive
                ? filter.key === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/50'
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}