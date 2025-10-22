import { Card } from '@/components/ui/card'

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
    { label: 'Calorie', value: nutritionalInfo.calories, unit: 'kcal', color: 'bg-red-100 text-red-800' },
    { label: 'Proteine', value: nutritionalInfo.protein, unit: 'g', color: 'bg-blue-100 text-blue-800' },
    { label: 'Carboidrati', value: nutritionalInfo.carbohydrates, unit: 'g', color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Grassi', value: nutritionalInfo.fat, unit: 'g', color: 'bg-orange-100 text-orange-800' },
    { label: 'Fibre', value: nutritionalInfo.fiber, unit: 'g', color: 'bg-green-100 text-green-800' },
    { label: 'Zuccheri', value: nutritionalInfo.sugar, unit: 'g', color: 'bg-purple-100 text-purple-800' },
  ].filter(item => item.value !== undefined)

  if (nutritionItems.length === 0) return null

  return (
    <Card className="mt-6 p-6">
      <h3 className="mb-4 text-lg font-bold text-primary-900">
        📊 Valori Nutrizionali
      </h3>
      <p className="mb-4 text-sm text-gray-600">Per porzione</p>
      <div className="grid gap-3">
        {nutritionItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{item.label}</span>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${item.color}`}>
              {item.value} {item.unit}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}