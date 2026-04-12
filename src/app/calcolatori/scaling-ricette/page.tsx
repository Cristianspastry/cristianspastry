'use client'

import { useState } from 'react'
import PageTransition from '@/components/shared/PageTransition'
import { Scale, ArrowLeft, Info, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Ingredient {
  name: string
  amount: number
  unit: string
}

export default function ScalingRicettePage() {
  const [originalServings, setOriginalServings] = useState<string>('4')
  const [targetServings, setTargetServings] = useState<string>('8')
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: 'Farina', amount: 500, unit: 'g' },
    { name: 'Zucchero', amount: 200, unit: 'g' },
    { name: 'Uova', amount: 3, unit: 'pz' },
    { name: 'Burro', amount: 150, unit: 'g' },
  ])
  const [scaledIngredients, setScaledIngredients] = useState<Ingredient[]>([])
  const [scaleFactor, setScaleFactor] = useState<number>(0)

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = [...ingredients]
    if (field === 'amount') {
      newIngredients[index]![field] = typeof value === 'string' ? parseFloat(value) || 0 : value
    } else {
      newIngredients[index]![field] = value as string
    }
    setIngredients(newIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: 0, unit: 'g' }])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const calculateScaling = () => {
    const original = parseFloat(originalServings)
    const target = parseFloat(targetServings)

    if (isNaN(original) || isNaN(target) || original === 0) return

    const factor = target / original
    setScaleFactor(factor)

    const scaled = ingredients.map(ing => ({
      ...ing,
      amount: ing.amount * factor
    }))

    setScaledIngredients(scaled)
  }

  const resetCalculator = () => {
    setOriginalServings('4')
    setTargetServings('8')
    setIngredients([
      { name: 'Farina', amount: 500, unit: 'g' },
      { name: 'Zucchero', amount: 200, unit: 'g' },
      { name: 'Uova', amount: 3, unit: 'pz' },
      { name: 'Burro', amount: 150, unit: 'g' },
    ])
    setScaledIngredients([])
    setScaleFactor(0)
  }

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/calcolatori"
            className="mb-6 inline-flex items-center text-purple-100 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna ai calcolatori
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                Scaling Ricette
              </h1>
              <p className="text-purple-100">
                Adatta automaticamente le quantità per più o meno porzioni
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
            <div className="mb-8 rounded-lg border border-purple-200 bg-purple-50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                <div className="text-sm text-purple-900">
                  <p className="mb-2 font-semibold">Come usare questo calcolatore?</p>
                  <p>
                    Inserisci il numero di porzioni originale della ricetta, il numero di porzioni
                    desiderate, e gli ingredienti con le loro quantità. Il calcolatore modificherà
                    automaticamente tutte le quantità in modo proporzionale.
                  </p>
                </div>
              </div>
            </div>

            {/* Calculator Card */}
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              {/* Servings */}
              <div className="mb-8 grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="original-servings" className="mb-2 font-semibold">
                    Porzioni Originali
                  </Label>
                  <Input
                    id="original-servings"
                    type="number"
                    value={originalServings}
                    onChange={(e) => setOriginalServings(e.target.value)}
                    className="text-lg"
                    min="1"
                  />
                </div>

                <div className="flex items-end justify-center">
                  <div className="rounded-full bg-purple-100 p-3">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                <div>
                  <Label htmlFor="target-servings" className="mb-2 font-semibold">
                    Porzioni Desiderate
                  </Label>
                  <Input
                    id="target-servings"
                    type="number"
                    value={targetServings}
                    onChange={(e) => setTargetServings(e.target.value)}
                    className="text-lg"
                    min="1"
                  />
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Ingredienti Originali
                </h3>
                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="grid gap-3 rounded-lg border border-gray-200 p-4 md:grid-cols-[2fr_1fr_1fr_auto]">
                      <div>
                        <Label htmlFor={`name-${index}`} className="mb-1 text-sm">
                          Nome
                        </Label>
                        <Input
                          id={`name-${index}`}
                          value={ingredient.name}
                          onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                          placeholder="Es: Farina"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`amount-${index}`} className="mb-1 text-sm">
                          Quantità
                        </Label>
                        <Input
                          id={`amount-${index}`}
                          type="number"
                          value={ingredient.amount || ''}
                          onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                          step="0.1"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`unit-${index}`} className="mb-1 text-sm">
                          Unità
                        </Label>
                        <Input
                          id={`unit-${index}`}
                          value={ingredient.unit}
                          onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                          placeholder="g, ml, pz"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeIngredient(index)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={addIngredient}
                  variant="outline"
                  className="mt-4 w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Aggiungi Ingrediente
                </Button>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateScaling}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                Calcola Scaling
              </Button>

              {/* Results */}
              {scaledIngredients.length > 0 && (
                <div className="mt-8 space-y-6">
                  {/* Scale Factor */}
                  <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-center text-white">
                    <div className="mb-2 text-sm font-medium opacity-90">
                      Fattore di Scala
                    </div>
                    <div className="text-5xl font-bold">
                      {scaleFactor.toFixed(2)}x
                    </div>
                    <div className="mt-2 text-sm opacity-90">
                      {scaleFactor > 1 ? `Ricetta aumentata del ${((scaleFactor - 1) * 100).toFixed(0)}%` :
                       scaleFactor < 1 ? `Ricetta ridotta del ${((1 - scaleFactor) * 100).toFixed(0)}%` :
                       'Stesse dimensioni'}
                    </div>
                  </div>

                  {/* Scaled Ingredients */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Ingredienti Adattati ({targetServings} porzioni)
                    </h3>
                    <div className="space-y-2">
                      {scaledIngredients.map((ingredient, index) => (
                        ingredient.name && (
                          <div key={index} className="flex items-center justify-between rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 p-4">
                            <span className="font-medium text-gray-900">
                              {ingredient.name}
                            </span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500">
                                {ingredients[index]!.amount.toFixed(1)} {ingredients[index]!.unit}
                              </span>
                              <svg className="h-4 w-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              <span className="min-w-[100px] text-right text-lg font-bold text-purple-600">
                                {ingredient.amount.toFixed(1)} {ingredient.unit}
                              </span>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Quick Conversions */}
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Conversioni Rapide
                    </h4>
                    <div className="grid gap-2 text-sm md:grid-cols-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doppia ricetta:</span>
                        <span className="font-semibold">x2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tripla ricetta:</span>
                        <span className="font-semibold">x3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Metà ricetta:</span>
                        <span className="font-semibold">x0.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Un terzo:</span>
                        <span className="font-semibold">x0.33</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
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
