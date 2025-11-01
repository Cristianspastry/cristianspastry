'use client'

import { useState, useEffect } from 'react'
import { ScienceCard } from './ScienceCard'
import ListSearchBar from '@/components/shared/list/ListSearchBar'
import { FilterGroup } from '@/components/shared/list/FilterButton'
import ListEmptyState from '@/components/shared/list/ListEmptyState'
import { client } from '@/sanity/lib/client'
import { ALL_SCIENCE_QUERY } from '@/sanity/lib/queries'
import type { Science } from '@/sanity/lib/types'
import { Loader2, Filter, X, Beaker } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { FilterOption } from '@/components/shared/list/FilterButton'

const ITEMS_PER_PAGE = 12

const complexityOptions: FilterOption[] = [
  { value: 'all', label: 'Tutte le complessità' },
  { value: 'base', label: 'Base' },
  { value: 'intermedio', label: 'Intermedio' },
  { value: 'avanzato', label: 'Avanzato' },
]

const articleTypeOptions: FilterOption[] = [
  { value: 'all', label: 'Tutti i tipi' },
  { value: 'ingredienti', label: 'Ingredienti' },
  { value: 'processi', label: 'Processi' },
  { value: 'reazioni', label: 'Reazioni Chimiche' },
  { value: 'fisica', label: 'Fisica' },
  { value: 'dietro-quinte', label: 'Dietro le Quinte' },
  { value: 'miti', label: 'Miti e Verità' },
  { value: 'storia', label: 'Storia' },
]

export default function ScienceList() {
  const [articles, setArticles] = useState<Science[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Science[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all')
  const [selectedArticleType, setSelectedArticleType] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch articles from Sanity
  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true)
        const data = await client.fetch(ALL_SCIENCE_QUERY)
        setArticles(data)
        setFilteredArticles(data)
      } catch (error) {
        console.error('Error fetching science articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = [...articles]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt?.toLowerCase().includes(query) ||
          article.tags?.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Filter by complexity
    if (selectedComplexity !== 'all') {
      filtered = filtered.filter(
        (article) => article.complexity === selectedComplexity
      )
    }

    // Filter by article type
    if (selectedArticleType !== 'all') {
      filtered = filtered.filter(
        (article) => article.articleType === selectedArticleType
      )
    }

    setFilteredArticles(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedComplexity, selectedArticleType, articles])

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentArticles = filteredArticles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    )
  }

  const hasActiveFilters = selectedComplexity !== 'all' || selectedArticleType !== 'all'

  const resetFilters = () => {
    setSelectedComplexity('all')
    setSelectedArticleType('all')
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <ListSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cerca articoli scientifici per titolo, descrizione o tag..."
        onClear={() => setSearchQuery('')}
      />

      {/* Filters */}
      <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-orange-600" />
            <h2 className="text-lg font-bold text-gray-900">Filtra Articoli</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors touch-feedback"
            >
              <X className="h-4 w-4" />
              Rimuovi filtri
            </button>
          )}
        </div>

        {/* Filter Groups */}
        <FilterGroup
          title="Complessità"
          options={complexityOptions}
          activeValue={selectedComplexity}
          onChange={setSelectedComplexity}
        />

        <FilterGroup
          title="Tipo di Articolo"
          options={articleTypeOptions}
          activeValue={selectedArticleType}
          onChange={setSelectedArticleType}
        />

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Filtri attivi:</span>
              {selectedComplexity !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {complexityOptions.find((c) => c.value === selectedComplexity)?.label}
                  <button
                    onClick={() => setSelectedComplexity('all')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedArticleType !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {articleTypeOptions.find((t) => t.value === selectedArticleType)?.label}
                  <button
                    onClick={() => setSelectedArticleType('all')}
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
      {filteredArticles.length > 0 && (
        <div className="text-center text-gray-600">
          <p>
            Mostrati <span className="font-semibold">{filteredArticles.length}</span>{' '}
            {filteredArticles.length === 1 ? 'articolo' : 'articoli'}
          </p>
        </div>
      )}

      {/* Articles Grid or Empty State */}
      {currentArticles.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentArticles.map((article, index) => (
            <ScienceCard key={article._id} article={article} index={index} />
          ))}
        </div>
      ) : (
        <ListEmptyState
          icon={Beaker}
          title="Nessun articolo trovato"
          description="Prova a modificare i filtri o la ricerca per trovare gli articoli che stai cercando."
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
                    ? 'bg-orange-600 text-white'
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
