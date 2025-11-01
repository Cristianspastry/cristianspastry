'use client'

import { useState } from 'react'
import PageTransition from '@/components/shared/PageTransition'
import { Percent, Info, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Ingredient {
  name: string
  weight: number
  percentage: number
}

export default function BakersPercentagePage() {
  const [flourWeight, setFlourWeight] = useState<number>(1000)
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: 'Acqua', weight: 0, percentage: 0 },
    { name: 'Sale', weight: 0, percentage: 0 },
    { name: 'Lievito', weight: 0, percentage: 0 },
    { name: 'Zucchero', weight: 0, percentage: 0 },
    { name: 'Burro', weight: 0, percentage: 0 },
  ])
  const [totalDoughWeight, setTotalDoughWeight] = useState<number>(0)

  const calculatePercentage = (weight: number): number => {
    if (flourWeight === 0) return 0
    return (weight / flourWeight) * 100
  }

  const calculateWeight = (percentage: number): number => {
    return (percentage * flourWeight) / 100
  }

  const handleFlourChange = (value: string) => {
    const newFlour = parseFloat(value) || 0
    setFlourWeight(newFlour)
    calculateTotals(ingredients, newFlour)
  }

  const handleWeightChange = (index: number, value: string) => {
    const newWeight = parseFloat(value) || 0
    const newIngredients = [...ingredients]
    const ingredient = newIngredients[index]
    if (!ingredient) return
    ingredient.weight = newWeight
    ingredient.percentage = calculatePercentage(newWeight)
    setIngredients(newIngredients)
    calculateTotals(newIngredients, flourWeight)
  }

  const handlePercentageChange = (index: number, value: string) => {
    const newPercentage = parseFloat(value) || 0
    const newIngredients = [...ingredients]
    const ingredient = newIngredients[index]
    if (!ingredient) return
    ingredient.percentage = newPercentage
    ingredient.weight = calculateWeight(newPercentage)
    setIngredients(newIngredients)
    calculateTotals(newIngredients, flourWeight)
  }

  const handleIngredientNameChange = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    const ingredient = newIngredients[index]
    if (!ingredient) return
    ingredient.name = value
    setIngredients(newIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', weight: 0, percentage: 0 }])
  }

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index)
    setIngredients(newIngredients)
    calculateTotals(newIngredients, flourWeight)
  }

  const calculateTotals = (ings: Ingredient[], flour: number) => {
    const total = flour + ings.reduce((sum, ing) => sum + ing.weight, 0)
    setTotalDoughWeight(total)
  }

  const resetCalculator = () => {
    setFlourWeight(1000)
    setIngredients([
      { name: 'Acqua', weight: 0, percentage: 0 },
      { name: 'Sale', weight: 0, percentage: 0 },
      { name: 'Lievito', weight: 0, percentage: 0 },
      { name: 'Zucchero', weight: 0, percentage: 0 },
      { name: 'Burro', weight: 0, percentage: 0 },
    ])
    setTotalDoughWeight(0)
  }

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/calcolatori"
            className="mb-6 inline-flex items-center text-blue-100 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna ai calcolatori
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
              <Percent className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                Baker's Percentage
              </h1>
              <p className="text-blue-100">
                Calcola le percentuali professionali del panettiere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Info Box */}
            <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="text-sm text-blue-900">
                  <p className="mb-2 font-semibold">Come funziona?</p>
                  <p>
                    Il Baker's Percentage è il metodo standard usato dai professionisti per calcolare
                    le ricette. La farina è sempre 100% e tutti gli altri ingredienti sono calcolati
                    come percentuale del peso della farina. Puoi inserire i pesi per calcolare le
                    percentuali, o le percentuali per calcolare i pesi.
                  </p>
                </div>
              </div>
            </div>

            {/* Calculator Card */}
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              {/* Flour Input */}
              <div className="mb-8 rounded-lg bg-blue-50 p-6">
                <Label htmlFor="flour" className="mb-2 text-lg font-semibold text-gray-900">
                  Farina (Base 100%)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="flour"
                    type="number"
                    value={flourWeight}
                    onChange={(e) => handleFlourChange(e.target.value)}
                    className="text-lg font-semibold"
                    min="0"
                  />
                  <span className="text-gray-600">grammi</span>
                  <span className="rounded-full bg-blue-600 px-4 py-2 font-semibold text-white">
                    100%
                  </span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Altri Ingredienti</h3>
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="grid gap-4 rounded-lg border border-gray-200 p-4 md:grid-cols-[2fr_1fr_1fr_auto]">
                    <div>
                      <Label htmlFor={`name-${index}`} className="mb-1 text-sm">
                        Ingrediente
                      </Label>
                      <Input
                        id={`name-${index}`}
                        value={ingredient.name}
                        onChange={(e) => handleIngredientNameChange(index, e.target.value)}
                        placeholder="Nome ingrediente"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`weight-${index}`} className="mb-1 text-sm">
                        Peso (g)
                      </Label>
                      <Input
                        id={`weight-${index}`}
                        type="number"
                        value={ingredient.weight || ''}
                        onChange={(e) => handleWeightChange(index, e.target.value)}
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`percentage-${index}`} className="mb-1 text-sm">
                        Percentuale (%)
                      </Label>
                      <Input
                        id={`percentage-${index}`}
                        type="number"
                        value={ingredient.percentage.toFixed(2) || ''}
                        onChange={(e) => handlePercentageChange(index, e.target.value)}
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeIngredient(index)}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        Rimuovi
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Ingredient Button */}
              <Button
                onClick={addIngredient}
                variant="outline"
                className="mt-4 w-full"
              >
                + Aggiungi Ingrediente
              </Button>

              {/* Results */}
              <div className="mt-8 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Riepilogo</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Farina:</span>
                    <span className="font-semibold">{flourWeight.toFixed(0)}g (100%)</span>
                  </div>
                  {ingredients.map((ing, index) => (
                    ing.name && (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">{ing.name}:</span>
                        <span className="font-semibold">
                          {ing.weight.toFixed(1)}g ({ing.percentage.toFixed(1)}%)
                        </span>
                      </div>
                    )
                  ))}
                  <div className="border-t border-blue-300 pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Peso Totale Impasto:</span>
                      <span className="text-xl font-bold text-blue-600">
                        {totalDoughWeight.toFixed(0)}g
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-4">
                <Button
                  onClick={resetCalculator}
                  variant="outline"
                  className="flex-1"
                >
                  Resetta
                </Button>
                <Button
                  onClick={() => window.print()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Stampa / Salva
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
