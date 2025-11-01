import { Card } from '@/components/ui/card'
import { Flame, Beef, Wheat, Droplet, Apple, Salad } from 'lucide-react'

interface NutritionalInfo {
  calories?: number
  protein?: number
  carbohydrates?: number
  fat?: number
  fiber?: number
  sugar?: number
}

interface RecipeNutritionProps {
  nutritionalInfo: NutritionalInfo
}

export function RecipeNutrition({ nutritionalInfo }: RecipeNutritionProps) {
  const nutritionItems = [
    { 
      label: 'Calorie', 
      value: nutritionalInfo.calories, 
      unit: 'kcal', 
      icon: Flame,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    { 
      label: 'Proteine', 
      value: nutritionalInfo.protein, 
      unit: 'g', 
      icon: Beef,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      label: 'Carboidrati', 
      value: nutritionalInfo.carbohydrates, 
      unit: 'g', 
      icon: Wheat,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    { 
      label: 'Grassi', 
      value: nutritionalInfo.fat, 
      unit: 'g', 
      icon: Droplet,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    { 
      label: 'Fibre', 
      value: nutritionalInfo.fiber, 
      unit: 'g', 
      icon: Salad,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    { 
      label: 'Zuccheri', 
      value: nutritionalInfo.sugar, 
      unit: 'g', 
      icon: Apple,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
  ].filter(item => item.value !== undefined)

  if (nutritionItems.length === 0) return null

  return (
    <Card className="mt-6 overflow-hidden">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-4">
        <h3 className="text-lg font-bold text-white">
          📊 Valori Nutrizionali
        </h3>
        <p className="text-sm text-primary-100">Per porzione (100 gr) </p>
      </div>

      {/* Contenuto */}
      <div className="p-4">
        <div className="space-y-3">
          {nutritionItems.map((item) => {
            const Icon = item.icon
            return (
              <div 
                key={item.label} 
                className={`flex items-center justify-between rounded-xl border-2 ${item.borderColor} ${item.bgColor} p-4 transition-all hover:shadow-md`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white ${item.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-gray-900">{item.label}</span>
                </div>
                <span className={`text-xl font-bold ${item.color}`}>
                  {item.value} <span className="text-sm font-normal">{item.unit}</span>
                </span>
              </div>
            )
          })}
        </div>

        {/* Note aggiuntive */}
        <div className="mt-4 rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-600 text-center">
            💡 I valori nutrizionali sono approssimativi e possono variare in base agli ingredienti utilizzati
          </p>
        </div>
      </div>
    </Card>
  )
}