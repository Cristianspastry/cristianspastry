'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'

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
}

export function RecipeIngredients({ ingredients, servings: defaultServings }: RecipeIngredientsProps) {
  const [servings, setServings] = useState(defaultServings)

  const adjustQuantity = (quantity: string, ratio: number) => {
    const num = parseFloat(quantity)
    if (isNaN(num)) return quantity
    return (num * ratio).toFixed(num % 1 === 0 ? 0 : 1)
  }

  const ratio = servings / defaultServings

  return (
    <Card className="sticky top-24 p-6">
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
