/**
 * TechniquesList Component
 *
 * Componente client per la visualizzazione e il filtraggio delle tecniche di pasticceria.
 * Utilizza URL-based state management per filtri persistenti e condivisibili.
 *
 * @component
 * @architecture
 * - Server Component (page.tsx) fetcha i dati filtrati da Sanity (solo 12 tecniche)
 * - Client Component (questo) gestisce l'UI e la navigazione
 * - Filtri salvati in URL params → shareable, bookmarkable, SEO-friendly
 * - Navigation via router.push() → no full page reload, smooth UX
 *
 * @flow
 * 1. User clicca filtro → updateFilters() aggiorna URL params
 * 2. router.push() triggera navigation (senza reload)
 * 3. Next.js re-fetcha dati server-side con nuovi params
 * 4. Componente re-renderizza con nuovi dati
 */

'use client'

import { useMemo, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TechniqueCard } from './TechniqueCard'
import ListSearchBar from '@/components/shared/list/ListSearchBar'
import { FilterGroup } from '@/components/shared/list/FilterButton'
import ListEmptyState from '@/components/shared/list/ListEmptyState'
import type { Technique } from '@/sanity/lib/types'
import { Filter, X, BookOpen, SlidersHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { FilterOption } from '@/components/shared/list/FilterButton'

const ITEMS_PER_PAGE = 12

interface TechniquesListProps {
  techniques: Technique[]  // Tecniche già filtrate dal server (max 12)
  total: number           // Totale tecniche che matchano i filtri (per paginazione)
  currentPage: number     // Pagina corrente
}

export default function TechniquesList({ techniques, total, currentPage }: TechniquesListProps) {
  // ============================================
  // STATE & HOOKS
  // ============================================
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // ============================================
  // FILTRI DA URL
  // Legge i filtri correnti dai query params
  // ============================================
  const filters = {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'all',
    difficulty: searchParams.get('difficulty') || 'all',
    page: currentPage,
  }

  // ============================================
  // UPDATE FILTERS
  // Aggiorna URL con nuovi filtri e triggera re-fetch server-side
  // ============================================
  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams(searchParams.toString())
    const mergedFilters = { ...filters, ...newFilters }

    // Aggiungi solo params con valori significativi
    Object.entries(mergedFilters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '' && value !== 1) {
        params.set(key, String(value))
      } else {
        params.delete(key)
      }
    })

    // Navigation senza scroll al top (mantieni posizione utente)
    router.push(`/tecniche?${params.toString()}`, { scroll: false })
  }, [searchParams, router, filters])

  // ============================================
  // FILTER OPTIONS
  // Opzioni per i dropdown filtri (memoized)
  // ============================================
  const difficultyOptions: FilterOption[] = useMemo(() => [
    { value: 'all', label: 'Tutte le difficoltà' },
    { value: 'base', label: 'Base' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzato', label: 'Avanzato' },
    { value: 'professionale', label: 'Professionale' },
  ], [])

  const categoryOptions: FilterOption[] = useMemo(() => [
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
  ], [])

  // ============================================
  // DERIVED STATE
  // Calcoli basati su filtri e dati
  // ============================================
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
  const hasActiveFilters = filters.category !== 'all' || filters.difficulty !== 'all'
  const activeFiltersCount = [
    filters.category !== 'all',
    filters.difficulty !== 'all'
  ].filter(Boolean).length

  // ============================================
  // HANDLERS
  // ============================================
  const handlePageChange = (page: number) => {
    updateFilters({ page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetFilters = () => {
    updateFilters({ category: 'all', difficulty: 'all', page: 1 })
  }

  // ============================================
  // RENDER HELPERS
  // ============================================

  /**
   * FiltersContent - Contenuto filtri riutilizzato in mobile drawer e desktop sidebar
   */
  const FiltersContent = () => (
    <>
      {/* Header con reset */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900">Filtra Tecniche</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <X className="h-4 w-4" />
            Rimuovi filtri
          </button>
        )}
      </div>

      {/* Gruppi filtri */}
      <div className="space-y-6">
        <FilterGroup
          title="Difficoltà"
          options={difficultyOptions}
          activeValue={filters.difficulty}
          onChange={(value) => updateFilters({ difficulty: value, page: 1 })}
        />

        <FilterGroup
          title="Categoria"
          options={categoryOptions}
          activeValue={filters.category}
          onChange={(value) => updateFilters({ category: value, page: 1 })}
        />

        {/* Riepilogo filtri attivi con badge removibili */}
        {hasActiveFilters && (
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Filtri attivi:</span>
              {filters.difficulty !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {difficultyOptions.find((d) => d.value === filters.difficulty)?.label}
                  <button
                    onClick={() => updateFilters({ difficulty: 'all', page: 1 })}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.category !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {categoryOptions.find((c) => c.value === filters.category)?.label}
                  <button
                    onClick={() => updateFilters({ category: 'all', page: 1 })}
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
    </>
  )

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="space-y-8">
      {/* Barra di ricerca */}
      <ListSearchBar
        value={filters.search}
        onChange={(value) => updateFilters({ search: value, page: 1 })}
        placeholder="Cerca tecniche per nome, descrizione o tag..."
        onClear={() => updateFilters({ search: '', page: 1 })}
      />

      {/* Mobile: Bottom Sheet Drawer */}
      <div className="md:hidden">
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12 text-base font-semibold shadow-sm"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filtri
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="ml-1 h-5 min-w-5 rounded-full px-1.5">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] overflow-y-auto px-6">
            <SheetHeader className="mb-4">
              <SheetTitle className="sr-only">Filtra Tecniche</SheetTitle>
            </SheetHeader>
            <div className="pb-24">
              <FiltersContent />
            </div>
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t pt-4 pb-6 -mx-6 px-6">
              <Button
                onClick={() => setIsFilterOpen(false)}
                className="w-full h-12 text-base font-semibold"
              >
                Mostra {total} {total === 1 ? 'tecnica' : 'tecniche'}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Sidebar fissa */}
      <div className="hidden md:block rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
        <FiltersContent />
      </div>

      {/* Contatore risultati */}
      {total > 0 && (
        <div className="text-center text-gray-600">
          <p>
            Mostrate <span className="font-semibold">{total}</span>{' '}
            {total === 1 ? 'tecnica' : 'tecniche'}
          </p>
        </div>
      )}

      {/* Grid tecniche o stato vuoto */}
      {techniques.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {techniques.map((technique, index) => (
            <TechniqueCard key={technique._id} technique={technique} index={index} />
          ))}
        </div>
      ) : (
        <ListEmptyState
          icon={BookOpen}
          title="Nessuna tecnica trovata"
          description="Prova a modificare i filtri o la ricerca per trovare le tecniche che stai cercando."
          hasFilters={hasActiveFilters}
          searchTerm={filters.search}
          action={
            hasActiveFilters || filters.search
              ? {
                  label: 'Rimuovi tutti i filtri',
                  onClick: () => {
                    resetFilters()
                    updateFilters({ search: '', page: 1 })
                  },
                }
              : undefined
          }
        />
      )}

      {/* Paginazione */}
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
