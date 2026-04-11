'use client'

import { useState, useMemo } from 'react'
import type { RecipeFilters } from '../types'

interface UseRecipeFiltersOptions {
  initialFilters?: Partial<RecipeFilters>
}

export function useRecipeFilters(options: UseRecipeFiltersOptions = {}) {
  const [filters, setFilters] = useState<RecipeFilters>({
    search: '',
    categories: [],
    difficulty: [],
    maxTime: undefined,
    sortBy: 'publishedAt',
    sortOrder: 'desc',
    ...options.initialFilters,
  })

  const updateFilter = <K extends keyof RecipeFilters>(key: K, value: RecipeFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      categories: [],
      difficulty: [],
      maxTime: undefined,
      sortBy: 'publishedAt',
      sortOrder: 'desc',
    })
  }

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.categories.length > 0 ||
      filters.difficulty.length > 0 ||
      filters.maxTime !== undefined
    )
  }, [filters])

  return {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  }
}
