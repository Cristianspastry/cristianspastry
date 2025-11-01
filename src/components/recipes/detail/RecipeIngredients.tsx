'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Minus, Circle } from 'lucide-react'

interface Ingredient {
  quantity: string
  unit?: string
  ingredient: string
  notes?: string
}

interface IngredientGroup {
  group?: string
  items: Ingredient[]
}

interface RecipeIngredientsProps {
  ingredients: IngredientGroup[]
  servings: number
  panSize?: number // Dimensione stampo opzionale
}

export function RecipeIngredients({ 
  ingredients, 
  servings: defaultServings,
  panSize: defaultPanSize
}: RecipeIngredientsProps) {
  const [servings, setServings] = useState(defaultServings)

  const adjustQuantity = (quantity: string, ratio: number) => {
    const num = parseFloat(quantity)
    if (isNaN(num)) return quantity
    return (num * ratio).toFixed(num % 1 === 0 ? 0 : 1)
  }

  // Calcola la dimensione dello stampo in base alla proporzione delle porzioni
  const calculatePanSize = (newServings: number, basePanSize: number): number => {
    // Calcolo basato sulla superficie: nuovo_diametro = base_diametro * sqrt(nuove_porzioni / base_porzioni)
    const ratio = newServings / defaultServings
    const newSize = basePanSize * Math.sqrt(ratio)
    
    // Arrotonda al numero pari più vicino
    const roundedSize = Math.round(newSize / 2) * 2
    
    // Limita solo il minimo a 18 cm
    return Math.max(18, roundedSize)
  }

  const ratio = servings / defaultServings
  const currentPanSize = defaultPanSize ? calculatePanSize(servings, defaultPanSize) : null

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary-900">Ingredienti</h2>
        
        {/* Calcolatore porzioni */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setServings(Math.max(1, servings - 1))}
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-[60px] text-center font-bold text-primary-900">
            {servings} {servings === 1 ? 'porzione' : 'porzioni'}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setServings(servings + 1)}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Indicatore Stampo - Se presente */}
      {currentPanSize && (
        <div className="mb-6 rounded-xl border-2 border-primary-200 bg-gradient-to-r from-primary-50 to-blue-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-900">
                <Circle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Stampo consigliato</p>
                <p className="text-2xl font-bold text-primary-900">Ø {currentPanSize} cm</p>
              </div>
            </div>
            {servings !== defaultServings && defaultPanSize && (
              <div className="text-right">
                <p className="text-xs text-gray-500">Stampo originale</p>
                <p className="text-sm font-semibold text-gray-700">Ø {defaultPanSize} cm</p>
              </div>
            )}
          </div>
          
          {/* Info aggiuntiva sul calcolo */}
          {servings !== defaultServings && (
            <div className="mt-3 rounded-lg bg-white/60 p-2">
              <p className="text-xs text-gray-600">
                💡 Lo stampo è calcolato proporzionalmente in base alle porzioni. 
                Dimensione minima: 18 cm (numeri pari).
              </p>
            </div>
          )}
        </div>
      )}

      <div className="space-y-6">
        {ingredients.map((group, groupIdx) => (
          <div key={groupIdx}>
            {/* Titolo gruppo se presente */}
            {group.group && (
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                {group.group}
              </h3>
            )}
            
            {/* Lista ingredienti */}
            <ul className="space-y-3">
              {group.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full border-2 border-primary-600" />
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <span className="font-semibold text-primary-900">
                        {adjustQuantity(item.quantity, ratio)}
                        {item.unit && ` ${item.unit}`}
                      </span>
                      <span className="text-gray-700">{item.ingredient}</span>
                    </div>
                    {item.notes && (
                      <p className="mt-1 text-sm italic text-gray-500">{item.notes}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {servings !== defaultServings && (
        <Button
          variant="ghost"
          onClick={() => setServings(defaultServings)}
          className="mt-4 w-full text-sm"
        >
          Ripristina porzioni originali
        </Button>
      )}
    </Card>
  )
}