'use client'

import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import ListSearchBar from '@/components/shared/list/ListSearchBar'
import { FilterGroup } from '@/components/shared/list/FilterButton'
import { EmptyState } from '@/components/recipes/shared/EmptyState'
import { Filter, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { FilterOption } from '@/components/shared/list/FilterButton'
import type { Recipe, Category } from '@/sanity/lib/types'

const ITEMS_PER_PAGE = 12

interface RecipesListProps {
  initialRecipes: Recipe[]
  categories: Category[]
}

export default function RecipesList({ initialRecipes, categories }: RecipesListProps) {
  const [recipes] = useState<Recipe[]>(initialRecipes)
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(initialRecipes)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedTime, setSelectedTime] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Build filter options
  const difficultyOptions: FilterOption[] = [
    { value: 'all', label: 'Tutte le difficoltà' },
    { value: 'facile', label: 'Facile' },
    { value: 'media', label: 'Media' },
    { value: 'difficile', label: 'Difficile' },
    { value: 'professionale', label: 'Professionale' },
  ]

  const categoryOptions: FilterOption[] = [
    { value: 'all', label: 'Tutte le categorie' },
    ...categories.map(cat => ({
      value: cat.slug.current,
      label: `${cat.emoji || ''} ${cat.title}`.trim()
    }))
  ]

  const timeOptions: FilterOption[] = [
    { value: 'all', label: 'Qualsiasi tempo' },
    { value: '30', label: 'Fino a 30 min' },
    { value: '60', label: 'Fino a 1 ora' },
    { value: '120', label: 'Fino a 2 ore' },
    { value: '180', label: 'Oltre 2 ore' },
  ]

  // Apply filters
  useEffect(() => {
    let filtered = [...recipes]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.excerpt?.toLowerCase().includes(query) ||
          recipe.ingredients?.some((group) =>
            group.items?.some((item) =>
              item.ingredient?.toLowerCase().includes(query) ||
              item.quantity?.toLowerCase().includes(query)
            )
          )
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (recipe) => recipe.categories?.some((cat) => cat.slug.current === selectedCategory)
      )
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(
        (recipe) => recipe.difficulty === selectedDifficulty
      )
    }

    // Filter by time
    if (selectedTime !== 'all') {
      const maxTime = parseInt(selectedTime)
      filtered = filtered.filter(
        (recipe) => {
          const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)
          return totalTime <= maxTime
        }
      )
    }

    setFilteredRecipes(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedTime, recipes])

  // Pagination
  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasActiveFilters = selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedTime !== 'all'

  const resetFilters = () => {
    setSelectedCategory('all')
    setSelectedDifficulty('all')
    setSelectedTime('all')
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <ListSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cerca ricette per nome, descrizione o ingredienti..."
        onClear={() => setSearchQuery('')}
      />

      {/* Filters */}
      <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-bold text-gray-900">Filtra Ricette</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors touch-feedback"
            >
              <X className="h-4 w-4" />
              Rimuovi filtri
            </button>
          )}
        </div>

        {/* Filter Groups */}
        <FilterGroup
          title="Categoria"
          options={categoryOptions}
          activeValue={selectedCategory}
          onChange={setSelectedCategory}
        />

        <FilterGroup
          title="Difficoltà"
          options={difficultyOptions}
          activeValue={selectedDifficulty}
          onChange={setSelectedDifficulty}
        />

        <FilterGroup
          title="Tempo di Preparazione"
          options={timeOptions}
          activeValue={selectedTime}
          onChange={setSelectedTime}
        />

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Filtri attivi:</span>
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {categoryOptions.find((c) => c.value === selectedCategory)?.label}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedDifficulty !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {difficultyOptions.find((d) => d.value === selectedDifficulty)?.label}
                  <button
                    onClick={() => setSelectedDifficulty('all')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedTime !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {timeOptions.find((t) => t.value === selectedTime)?.label}
                  <button
                    onClick={() => setSelectedTime('all')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Info */}
      {filteredRecipes.length > 0 && (
        <div className="text-center text-gray-600">
          <p>
            Mostrate <span className="font-semibold">{filteredRecipes.length}</span>{' '}
            {filteredRecipes.length === 1 ? 'ricetta' : 'ricette'}
          </p>
        </div>
      )}

      {/* Recipes Grid or Empty State */}
      {currentRecipes.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <EmptyState
          hasFilters={hasActiveFilters}
          searchTerm={searchQuery}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Precedente
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Successiva
          </button>
        </div>
      )}
    </div>
  )
}
