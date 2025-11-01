import { Clock, Users, ChefHat, Timer, Circle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { Recipe } from '@/sanity/lib/types'

interface RecipeInfoProps {
  recipe: Recipe
  totalTime: number
}

const difficultyLabels = {
  facile: 'Facile',
  medio: 'Medio',
  difficile: 'Difficile',
  professionale: 'Professionale',
}

export function RecipeInfo({ recipe, totalTime }: RecipeInfoProps) {
  return (
    <Card className="p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Tempo preparazione */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <Clock className="h-6 w-6 text-primary-900" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Preparazione</p>
            <p className="text-lg font-bold text-primary-900">{recipe.prepTime} min</p>
          </div>
        </div>

        {/* Tempo cottura */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <ChefHat className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Cottura</p>
            <p className="text-lg font-bold text-primary-900">{recipe.cookTime} min</p>
          </div>
        </div>

        {/* Tempo riposo se presente */}
        {recipe.restTime && recipe.restTime > 0 && (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Timer className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Riposo</p>
              <p className="text-lg font-bold text-primary-900">{recipe.restTime} min</p>
            </div>
          </div>
        )}

        {/* Porzioni */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Porzioni</p>
            <p className="text-lg font-bold text-primary-900">{recipe.servings}</p>
          </div>
        </div>

        {/* Stampo - se presente */}
        {recipe.panSize && (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100">
              <Circle className="h-6 w-6 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Stampo</p>
              <p className="text-lg font-bold text-primary-900">Ø {recipe.panSize} cm</p>
            </div>
          </div>
        )}

        {/* Difficoltà */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
            <span className="text-2xl">⭐</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Difficoltà</p>
            <p className="text-lg font-bold text-primary-900">
              {difficultyLabels[recipe.difficulty as keyof typeof difficultyLabels]}
            </p>
          </div>
        </div>

        {/* Tempo totale */}
        <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <Clock className="h-6 w-6 text-primary-900" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Tempo Totale</p>
            <p className="text-lg font-bold text-primary-900">{totalTime} min</p>
          </div>
        </div>
      </div>
    </Card>
  )
}