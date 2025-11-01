'use client'

import { useState, useEffect } from 'react'
import { TechniqueCard } from './TechniqueCard'
import ListSearchBar from '@/components/shared/list/ListSearchBar'
import { FilterGroup } from '@/components/shared/list/FilterButton'
import ListEmptyState from '@/components/shared/list/ListEmptyState'
import { client } from '@/sanity/lib/client'
import { ALL_TECHNIQUES_QUERY } from '@/sanity/lib/queries'
import type { Technique } from '@/sanity/lib/types'
import { Loader2, Filter, X, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { FilterOption } from '@/components/shared/list/FilterButton'

const ITEMS_PER_PAGE = 12

const difficultyOptions: FilterOption[] = [
  { value: 'all', label: 'Tutte le difficoltà' },
  { value: 'base', label: 'Base' },
  { value: 'intermedio', label: 'Intermedio' },
  { value: 'avanzato', label: 'Avanzato' },
  { value: 'professionale', label: 'Professionale' },
]

const categoryOptions: FilterOption[] = [
  { value: 'all', label: 'Tutte le categorie' },
  { value: 'impasti', label: 'Impasti' },
  { value: 'cottura', label: 'Cottura' },
  { value: 'decorazione', label: 'Decorazione' },
  { value: 'montaggio', label: 'Montaggio' },
  { value: 'conservazione', label: 'Conservazione' },
  { value: 'temperaggio', label: 'Temperaggio' },
  { value: 'lievitazione', label: 'Lievitazione' },
  { value: 'farcitura', label: 'Farcitura' },
  { value: 'modellaggio', label: 'Modellaggio' },
]

export default function TechniquesList() {
  const [techniques, setTechniques] = useState<Technique[]>([])
  const [filteredTechniques, setFilteredTechniques] = useState<Technique[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch techniques from Sanity
  useEffect(() => {
    async function fetchTechniques() {
      try {
        setLoading(true)
        const data = await client.fetch(ALL_TECHNIQUES_QUERY)
        setTechniques(data)
        setFilteredTechniques(data)
      } catch (error) {
        console.error('Error fetching techniques:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTechniques()
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = [...techniques]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (technique) =>
          technique.title.toLowerCase().includes(query) ||
          technique.excerpt?.toLowerCase().includes(query) ||
          technique.tags?.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(
        (technique) => technique.difficulty === selectedDifficulty
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (technique) => technique.category === selectedCategory
      )
    }

    setFilteredTechniques(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedDifficulty, selectedCategory, techniques])

  // Pagination
  const totalPages = Math.ceil(filteredTechniques.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentTechniques = filteredTechniques.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const hasActiveFilters = selectedDifficulty !== 'all' || selectedCategory !== 'all'

  const resetFilters = () => {
    setSelectedDifficulty('all')
    setSelectedCategory('all')
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <ListSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cerca tecniche per nome, descrizione o tag..."
        onClear={() => setSearchQuery('')}
      />

      {/* Filters */}
      <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Filtra Tecniche</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors touch-feedback"
            >
              <X className="h-4 w-4" />
              Rimuovi filtri
            </button>
          )}
        </div>

        {/* Filter Groups */}
        <FilterGroup
          title="Difficoltà"
          options={difficultyOptions}
          activeValue={selectedDifficulty}
          onChange={setSelectedDifficulty}
        />

        <FilterGroup
          title="Categoria"
          options={categoryOptions}
          activeValue={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Filtri attivi:</span>
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
            </div>
          </div>
        )}
      </div>

      {/* Results Info */}
      {filteredTechniques.length > 0 && (
        <div className="text-center text-gray-600">
          <p>
            Mostrate <span className="font-semibold">{filteredTechniques.length}</span>{' '}
            {filteredTechniques.length === 1 ? 'tecnica' : 'tecniche'}
          </p>
        </div>
      )}

      {/* Techniques Grid or Empty State */}
      {currentTechniques.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentTechniques.map((technique, index) => (
            <TechniqueCard key={technique._id} technique={technique} index={index} />
          ))}
        </div>
      ) : (
        <ListEmptyState
          icon={BookOpen}
          title="Nessuna tecnica trovata"
          description="Prova a modificare i filtri o la ricerca per trovare le tecniche che stai cercando."
          hasFilters={hasActiveFilters}
          searchTerm={searchQuery}
          action={
            hasActiveFilters || searchQuery
              ? {
                  label: 'Rimuovi tutti i filtri',
                  onClick: () => {
                    resetFilters()
                    setSearchQuery('')
                  },
                }
              : undefined
          }
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
                    ? 'bg-blue-600 text-white'
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
