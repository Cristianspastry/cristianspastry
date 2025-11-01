// src/components/recipes/Pagination.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasMore: boolean
}

export function Pagination({ currentPage, totalPages, hasMore }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/ricette?${params.toString()}`)
  }

  // Calcola quali numeri di pagina mostrare
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showPages = 5 // Numero di pagine da mostrare

    if (totalPages <= showPages + 2) {
      // Se ci sono poche pagine, mostra tutte
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Mostra sempre la prima pagina
      pages.push(1)

      // Calcola range centrale
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Aggiusta se siamo all'inizio o alla fine
      if (currentPage <= 3) {
        end = showPages - 1
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - showPages + 2
      }

      // Aggiungi ellipsis se necessario all'inizio
      if (start > 2) {
        pages.push('...')
      }

      // Aggiungi pagine centrali
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Aggiungi ellipsis se necessario alla fine
      if (end < totalPages - 1) {
        pages.push('...')
      }

      // Mostra sempre l'ultima pagina
      pages.push(totalPages)
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <nav aria-label="Paginazione ricette" className="flex items-center justify-center gap-1">
      {/* Pulsante Precedente */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Pagina precedente"
        className="h-9 w-9"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Numeri di pagina */}
      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-muted-foreground"
            >
              ...
            </span>
          )
        }

        const pageNum = page as number
        const isActive = pageNum === currentPage

        return (
          <Button
            key={pageNum}
            variant={isActive ? 'default' : 'outline'}
            size="icon"
            onClick={() => goToPage(pageNum)}
            aria-label={`Vai alla pagina ${pageNum}`}
            aria-current={isActive ? 'page' : undefined}
            className="h-9 w-9"
          >
            {pageNum}
          </Button>
        )
      })}

      {/* Pulsante Successivo */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasMore}
        aria-label="Pagina successiva"
        className="h-9 w-9"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}