'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import SearchBar from './SearchBar'
import SearchFilters from './SearchFilters'
import SearchResults from './SearchResults'
import type { SearchResult } from '@/sanity/lib/types'

export default function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [activeFilter, setActiveFilter] = useState<'all' | 'recipes' | 'techniques' | 'science'>(
    (searchParams.get('type') as any) || 'all'
  )
  const [results, setResults] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
      performSearch(q)
    }
  }, [searchParams])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setResults(data)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}${activeFilter !== 'all' ? `&type=${activeFilter}` : ''}`)
    }
  }

  const handleFilterChange = (filter: 'all' | 'recipes' | 'techniques' | 'science') => {
    setActiveFilter(filter)
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}${filter !== 'all' ? `&type=${filter}` : ''}`)
    }
  }

  const totalResults = results
    ? results.recipes.length + results.techniques.length + results.science.length
    : 0

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <SearchBar
        initialValue={query}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* Results Count */}
      {query && (
        <div className="text-center">
          <p className="text-lg text-gray-600">
            {isLoading ? (
              'Ricerca in corso...'
            ) : totalResults > 0 ? (
              <>
                Trovati <span className="font-bold text-gray-900">{totalResults}</span> risultati per{' '}
                <span className="font-bold text-gray-900">"{query}"</span>
              </>
            ) : (
              <>
                Nessun risultato per <span className="font-bold text-gray-900">"{query}"</span>
              </>
            )}
          </p>
        </div>
      )}

      {/* Filters */}
      {results && totalResults > 0 && (
        <SearchFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          counts={{
            recipes: results.recipes.length,
            techniques: results.techniques.length,
            science: results.science.length,
          }}
        />
      )}

      {/* Results */}
      {results && (
        <SearchResults results={results} activeFilter={activeFilter} />
      )}

      {/* Empty State */}
      {!query && !isLoading && (
        <div className="text-center py-16">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            Inizia la tua ricerca
          </h3>
          <p className="text-gray-600">
            Cerca ricette, tecniche di pasticceria o articoli scientifici
          </p>
        </div>
      )}
    </div>
  )
}