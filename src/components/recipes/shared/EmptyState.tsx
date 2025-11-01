// src/components/recipes/EmptyState.tsx
'use client'

import { Search, UtensilsCrossed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface EmptyStateProps {
  hasFilters: boolean
  searchTerm?: string
}

export function EmptyState({ hasFilters, searchTerm }: EmptyStateProps) {
  const router = useRouter()

  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <Search className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">Nessun risultato trovato</h3>
        <p className="mb-6 max-w-md text-sm text-muted-foreground">
          {searchTerm
            ? `Non ci sono ricette che corrispondono a "${searchTerm}" con i filtri selezionati.`
            : 'Non ci sono ricette che corrispondono ai filtri selezionati.'}
        </p>
        <Button onClick={() => router.push('/ricette')} variant="outline">
          Rimuovi tutti i filtri
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
      <UtensilsCrossed className="mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-semibold">Nessuna ricetta disponibile</h3>
      <p className="max-w-md text-sm text-muted-foreground">
        Al momento non ci sono ricette pubblicate. Torna più tardi per scoprire deliziose creazioni!
      </p>
    </div>
  )
}