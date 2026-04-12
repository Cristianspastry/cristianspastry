'use client'

import { useState } from 'react'
import PageTransition from '@/components/shared/PageTransition'
import { Droplet, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function IdratazioneImpasstoPage() {
  const [flourWeight, setFlourWeight] = useState<string>('1000')
  const [waterWeight, setWaterWeight] = useState<string>('650')
  const [hydration, setHydration] = useState<number | null>(null)
  const [consistency, setConsistency] = useState<string>('')
  const [doughType, setDoughType] = useState<string>('')

  const calculateHydration = () => {
    const flour = parseFloat(flourWeight)
    const water = parseFloat(waterWeight)

    if (isNaN(flour) || isNaN(water) || flour === 0) return

    const hydrationPercent = (water / flour) * 100
    setHydration(hydrationPercent)

    // Determine consistency based on hydration
    if (hydrationPercent < 50) {
      setConsistency('Molto rigido')
      setDoughType('Pasta frolla, biscotti')
    } else if (hydrationPercent >= 50 && hydrationPercent < 58) {
      setConsistency('Rigido')
      setDoughType('Bagel, pretzel')
    } else if (hydrationPercent >= 58 && hydrationPercent < 65) {
      setConsistency('Standard')
      setDoughType('Pane comune, panini')
    } else if (hydrationPercent >= 65 && hydrationPercent < 75) {
      setConsistency('Morbido')
      setDoughType('Ciabatta, focaccia')
    } else if (hydrationPercent >= 75 && hydrationPercent < 85) {
      setConsistency('Molto morbido')
      setDoughType('Pizza napoletana, pane artigianale')
    } else {
      setConsistency('Liquido/Pastella')
      setDoughType('Crêpes, pancake, pastella per friggere')
    }
  }

  const calculateWaterNeeded = () => {
    const flour = parseFloat(flourWeight)
    const targetHydration = hydration

    if (isNaN(flour) || !targetHydration) return

    const water = (flour * targetHydration) / 100
    setWaterWeight(water.toFixed(1))
  }

  const resetCalculator = () => {
    setFlourWeight('1000')
    setWaterWeight('650')
    setHydration(null)
    setConsistency('')
    setDoughType('')
  }

  const getHydrationColor = (hydrationValue: number) => {
    if (hydrationValue < 50) return 'from-orange-500 to-red-500'
    if (hydrationValue < 65) return 'from-yellow-500 to-orange-500'
    if (hydrationValue < 75) return 'from-green-500 to-cyan-500'
    if (hydrationValue < 85) return 'from-cyan-500 to-blue-500'
    return 'from-blue-500 to-purple-500'
  }

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-900 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/calcolatori"
            className="mb-6 inline-flex items-center text-cyan-100 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna ai calcolatori
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
              <Droplet className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                Idratazione Impasto
              </h1>
              <p className="text-cyan-100">
                Calcola la percentuale di idratazione e la consistenza finale
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
            <div className="mb-8 rounded-lg border border-cyan-200 bg-cyan-50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-600" />
                <div className="text-sm text-cyan-900">
                  <p className="mb-2 font-semibold">Cos'è l'idratazione?</p>
                  <p className="mb-2">
                    L'idratazione è la percentuale di acqua (o liquidi) rispetto al peso della farina.
                    Determina la consistenza finale dell'impasto e il tipo di prodotto che si può realizzare.
                  </p>
                  <p className="font-mono text-xs">
                    Formula: (Peso Acqua ÷ Peso Farina) × 100 = % Idratazione
                  </p>
                </div>
              </div>
            </div>

            {/* Calculator Card */}
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              {/* Inputs */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="flour" className="mb-2 text-lg font-semibold">
                    Farina
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="flour"
                      type="number"
                      value={flourWeight}
                      onChange={(e) => setFlourWeight(e.target.value)}
                      className="text-lg"
                      min="0"
                      step="1"
                    />
                    <span className="flex items-center text-gray-600">grammi</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="water" className="mb-2 text-lg font-semibold">
                    Acqua (o liquidi totali)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="water"
                      type="number"
                      value={waterWeight}
                      onChange={(e) => setWaterWeight(e.target.value)}
                      className="text-lg"
                      min="0"
                      step="1"
                    />
                    <span className="flex items-center text-gray-600">grammi</span>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateHydration}
                className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700"
                size="lg"
              >
                Calcola Idratazione
              </Button>

              {/* Results */}
              {hydration !== null && (
                <div className="mt-8 space-y-6">
                  {/* Hydration Percentage */}
                  <div className={`rounded-xl bg-gradient-to-br ${getHydrationColor(hydration)} p-8 text-center text-white`}>
                    <div className="mb-2 text-sm font-medium opacity-90">
                      Idratazione
                    </div>
                    <div className="mb-4 text-6xl font-bold">
                      {hydration.toFixed(1)}%
                    </div>
                    <div className="text-lg font-semibold">
                      {consistency}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100 p-6">
                      <h4 className="mb-2 font-semibold text-gray-900">
                        Tipo di Impasto
                      </h4>
                      <p className="text-sm text-gray-700">
                        {doughType}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100 p-6">
                      <h4 className="mb-2 font-semibold text-gray-900">
                        Caratteristiche
                      </h4>
                      <p className="text-sm text-gray-700">
                        {hydration < 60 && 'Impasto facile da lavorare, poco appiccicoso'}
                        {hydration >= 60 && hydration < 70 && 'Impasto morbido, facile da modellare'}
                        {hydration >= 70 && hydration < 80 && 'Impasto appiccicoso, richiede esperienza'}
                        {hydration >= 80 && 'Impasto molto idratato, tecnica avanzata'}
                      </p>
                    </div>
                  </div>

                  {/* Hydration Scale */}
                  <div className="rounded-lg border border-gray-200 p-6">
                    <h4 className="mb-4 font-semibold text-gray-900">
                      Scala Idratazione
                    </h4>
                    <div className="space-y-3">
                      {[
                        { range: '< 50%', label: 'Pasta frolla, biscotti', color: 'bg-orange-500' },
                        { range: '50-58%', label: 'Bagel, pretzel', color: 'bg-yellow-500' },
                        { range: '58-65%', label: 'Pane comune, panini', color: 'bg-lime-500' },
                        { range: '65-75%', label: 'Ciabatta, focaccia', color: 'bg-green-500' },
                        { range: '75-85%', label: 'Pizza napoletana', color: 'bg-cyan-500' },
                        { range: '> 85%', label: 'Crêpes, pastella', color: 'bg-blue-500' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                          <span className="font-mono text-sm font-medium text-gray-700">
                            {item.range}
                          </span>
                          <span className="text-sm text-gray-600">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Reverse Calculator */}
              {hydration !== null && (
                <div className="mt-8 rounded-lg border-2 border-dashed border-cyan-300 bg-cyan-50 p-6">
                  <h4 className="mb-4 font-semibold text-gray-900">
                    Calcolo Inverso
                  </h4>
                  <p className="mb-4 text-sm text-gray-600">
                    Modifica l'idratazione desiderata per calcolare l'acqua necessaria:
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={hydration?.toFixed(1) || ''}
                      onChange={(e) => setHydration(parseFloat(e.target.value))}
                      placeholder="% Idratazione"
                      className="flex-1"
                    />
                    <Button
                      onClick={calculateWaterNeeded}
                      variant="outline"
                      className="border-cyan-600 text-cyan-600 hover:bg-cyan-50"
                    >
                      Calcola Acqua
                    </Button>
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
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700"
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
