'use client'

import { Printer, Share2, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Recipe } from '@/sanity/lib/types'

interface RecipeActionsProps {
  recipe: Recipe
}

export function RecipeActions({ recipe }: RecipeActionsProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing', error)
      }
    } else {
      // Fallback: copia link
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copiato negli appunti!')
      } catch (error) {
        alert('Impossibile copiare il link negli appunti.')
        console.error('Clipboard copy failed:', error)
      }
    }
  } // <-- QUESTA PARENTESI MANCAVA!

  const handleSave = () => {
    // Implementa la logica di salvataggio (localStorage, database, ecc.)
    alert('Ricetta salvata!')
  }

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      <Button
        onClick={handlePrint}
        variant="outline"
        className="gap-2"
      >
        <Printer className="h-4 w-4" />
        Stampa
      </Button>
      <Button
        onClick={handleShare}
        variant="outline"
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        Condividi
      </Button>
      {/*
      TODO: Implementare la logica di salvataggio della ricetta
      in localStorage O DATABASE CON NEXT AUTH;
      <Button
        onClick={handleSave}
        variant="outline"
        className="gap-2"
      >
        <Bookmark className="h-4 w-4" />
        Salva
      </Button>*/}
    </div>
  )
}