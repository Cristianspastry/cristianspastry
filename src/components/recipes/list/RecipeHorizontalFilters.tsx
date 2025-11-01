// src/components/recipes/HorizontalFilters.tsx - VERSIONE CON FRECCE
'use client'

import { useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Category } from '@/sanity/lib/types'

interface HorizontalFiltersProps {
  categories: Category[]
}

const DIFFICULTIES = [
  { value: 'facile', label: 'Facile', emoji: '🟢' },
  { value: 'media', label: 'Media', emoji: '🟡' },
  { value: 'difficile', label: 'Difficile', emoji: '🔴' },
  {value : 'professionale',label : 'professionale',emoji  : '🔴'}
]

const TIME_OPTIONS = [
  { value: '30', label: 'Fino a 30 min' },
  { value: '60', label: 'Fino a 1 ora' },
  { value: '120', label: 'Fino a 2 ore' },
  { value: '180', label: 'Oltre 2 ore' },
]

export function HorizontalFilters({ categories }: HorizontalFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const currentCategory = searchParams.get('category')
  const currentDifficulty = searchParams.get('difficulty')
  const currentMaxTime = searchParams.get('maxTime')

  const hasActiveFilters = !!(currentCategory ?? currentDifficulty ?? currentMaxTime)

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    params.delete('page')
    router.push(`/ricette?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('difficulty')
    params.delete('maxTime')
    params.delete('page')
    
    const search = searchParams.get('search')
    if (search) {
      params.set('search', search)
    }
    
    router.push(`/ricette?${params.toString()}`)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Categorie con Frecce */}
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-sm font-medium text-muted-foreground">Categoria:</span>
            
            {/* Freccia Sinistra */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('left')}
              className="hidden shrink-0 md:flex"
              aria-label="Scorri categorie a sinistra"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Container Scroll con Fade */}
            <div className="relative flex-1 overflow-hidden">
              {/* Fade Left */}
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent" />
              
              {/* Scroll Container */}
              <div
                ref={scrollContainerRef}
                className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin"
              >
                <Button
                  variant={!currentCategory ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateFilter('category', null)}
                  className="shrink-0 rounded-full"
                >
                  Tutte
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category._id}
                    variant={currentCategory === category.slug.current ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateFilter('category', category.slug.current)}
                    className="shrink-0 rounded-full"
                  >
                    <span className="mr-1.5">{category.emoji}</span>
                    {category.title}
                    {category.recipeCount != null && category.recipeCount > 0 && (
                      <Badge variant="secondary" className="ml-1.5 rounded-full px-1.5 py-0">
                        {category.recipeCount}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
              
              {/* Fade Right */}
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent" />
            </div>

            {/* Freccia Destra */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('right')}
              className="hidden shrink-0 md:flex"
              aria-label="Scorri categorie a destra"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Difficoltà e Tempo */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Filtri:</span>
            
            <Select
              value={currentDifficulty ?? 'all'}
              onValueChange={(value) => updateFilter('difficulty', value === 'all' ? null : value)}
            >
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Tutte le difficoltà" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le difficoltà</SelectItem>
                {DIFFICULTIES.map((difficulty) => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    <span className="flex items-center gap-2">
                      <span>{difficulty.emoji}</span>
                      <span>{difficulty.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={currentMaxTime ?? 'all'}
              onValueChange={(value) => updateFilter('maxTime', value === 'all' ? null : value)}
            >
              <SelectTrigger className="w-[160px] rounded-full">
                <SelectValue placeholder="Qualsiasi tempo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualsiasi tempo</SelectItem>
                {TIME_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="ml-auto gap-2 rounded-full"
              >
                <X className="h-4 w-4" />
                Cancella filtri
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: hsl(var(--muted-foreground) / 0.3) transparent;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: hsl(var(--muted-foreground) / 0.3);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </div>
  )
}