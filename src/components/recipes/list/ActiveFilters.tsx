// src/components/recipes/ActiveFilters.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Category {
  slug: { current: string }
  title: string
  emoji: string
}

interface ActiveFiltersProps {
  categories: Category[]
}

const DIFFICULTY_LABELS = {
  facile: { label: 'Facile', emoji: '🟢' },
  media: { label: 'Media', emoji: '🟡' },
  difficile: { label: 'Difficile', emoji: '🔴' },
}

const TIME_LABELS: Record<string, string> = {
  '30': 'Fino a 30 min',
  '60': 'Fino a 1 ora',
  '120': 'Fino a 2 ore',
  '180': 'Oltre 2 ore',
}

export function ActiveFilters({ categories }: ActiveFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category')
  const currentDifficulty = searchParams.get('difficulty')
  const currentMaxTime = searchParams.get('maxTime')
  const currentSearch = searchParams.get('search')

  const hasActiveFilters = !!(currentCategory || currentDifficulty || currentMaxTime || currentSearch)

  if (!hasActiveFilters) return null

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    params.delete('page') // Reset page quando rimuovi filtri
    router.push(`/ricette?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push('/ricette')
  }

  const categoryData = categories.find((cat) => cat.slug.current === currentCategory)
  const difficultyData = currentDifficulty ? DIFFICULTY_LABELS[currentDifficulty as keyof typeof DIFFICULTY_LABELS] : null

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-card p-3">
      <span className="text-sm font-medium text-muted-foreground">Filtri attivi:</span>

      {/* Categoria */}
      {categoryData && (
        <Badge variant="secondary" className="gap-1.5 pr-1">
          <span>{categoryData.emoji}</span>
          <span>{categoryData.title}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 rounded-full p-0 hover:bg-background"
            onClick={() => removeFilter('category')}
            aria-label={`Rimuovi filtro ${categoryData.title}`}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Difficoltà */}
      {difficultyData && (
        <Badge variant="secondary" className="gap-1.5 pr-1">
          <span>{difficultyData.emoji}</span>
          <span>{difficultyData.label}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 rounded-full p-0 hover:bg-background"
            onClick={() => removeFilter('difficulty')}
            aria-label={`Rimuovi filtro ${difficultyData.label}`}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Tempo */}
      {currentMaxTime && (
        <Badge variant="secondary" className="gap-1.5 pr-1">
          <span>⏱️</span>
          <span>{TIME_LABELS[currentMaxTime]}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 rounded-full p-0 hover:bg-background"
            onClick={() => removeFilter('maxTime')}
            aria-label="Rimuovi filtro tempo"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Ricerca */}
      {currentSearch && (
        <Badge variant="secondary" className="gap-1.5 pr-1">
          <span>🔍</span>
          <span className="max-w-[150px] truncate">{currentSearch}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 rounded-full p-0 hover:bg-background"
            onClick={() => removeFilter('search')}
            aria-label="Rimuovi ricerca"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Reset tutto */}
      <Button
        variant="ghost"
        size="sm"
        onClick={clearAllFilters}
        className="ml-auto h-7 text-xs"
      >
        Cancella tutto
      </Button>
    </div>
  )
}