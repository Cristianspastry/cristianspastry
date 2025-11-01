'use client'

import { useState } from 'react'
import PageTransition from '@/components/shared/PageTransition'
import { Wheat, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function LievitoMadrePage() {
  const [activeTab, setActiveTab] = useState<'refresh' | 'convert'>('refresh')

  // Refresh calculator
  const [starterAmount, setStarterAmount] = useState<string>('100')
  const [hydration, setHydration] = useState<string>('100')
  const [ratio, setRatio] = useState<string>('1:1:1')
  const [refreshResult, setRefreshResult] = useState<{
    starter: number
    flour: number
    water: number
    total: number
  } | null>(null)

  // Conversion calculator
  const [sourdoughAmount, setSourdoughAmount] = useState<string>('200')
  const [sourdoughHydration, setSourdoughHydration] = useState<string>('100')
  const [yeastAmount, setYeastAmount] = useState<number | null>(null)

  const calculateRefresh = () => {
    const starter = parseFloat(starterAmount)
    const ratioValues = ratio.split(':').map(Number)

    if (isNaN(starter) || ratioValues.length !== 3) return

    const [starterRatio, flourRatio, waterRatio] = ratioValues
    if (!starterRatio || !flourRatio || !waterRatio) return

    const flourNeeded = (starter / starterRatio) * flourRatio
    const waterNeeded = (starter / starterRatio) * waterRatio

    setRefreshResult({
      starter: starter,
      flour: flourNeeded,
      water: waterNeeded,
      total: starter + flourNeeded + waterNeeded
    })
  }

  const calculateConversion = () => {
    const sourdough = parseFloat(sourdoughAmount)
    const hydrationPercent = parseFloat(sourdoughHydration)

    if (isNaN(sourdough) || isNaN(hydrationPercent)) return

    // Calcola farina nel lievito madre
    const flourInSourdough = sourdough / (1 + (hydrationPercent / 100))

    // Conversione standard: 1% lievito madre rispetto alla farina = 0.3% lievito di birra
    // Quindi: (farina nel lievito / farina totale ricetta) * 0.3
    // Per semplicità, consideriamo che la farina nel lievito rappresenti circa il 20% della farina totale
    const estimatedYeast = flourInSourdough * 0.015 // 1.5% della farina nel lievito

    setYeastAmount(estimatedYeast)
  }

  const resetRefresh = () => {
    setStarterAmount('100')
    setHydration('100')
    setRatio('1:1:1')
    setRefreshResult(null)
  }

  const resetConversion = () => {
    setSourdoughAmount('200')
    setSourdoughHydration('100')
    setYeastAmount(null)
  }

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/calcolatori"
            className="mb-6 inline-flex items-center text-amber-100 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna ai calcolatori
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
              <Wheat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                Lievito Madre
              </h1>
              <p className="text-amber-100">
                Calcola i rinfreschi e le conversioni con lievito di birra
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto rounded-lg bg-white p-1 shadow">
              <button
                onClick={() => setActiveTab('refresh')}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'refresh'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Rinfresco
              </button>
              <button
                onClick={() => setActiveTab('convert')}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'convert'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Conversione
              </button>
            </div>

            {/* Refresh Tab */}
            {activeTab === 'refresh' && (
              <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
                <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                    <div className="text-sm text-amber-900">
                      <p className="mb-2 font-semibold">Rapporti di rinfresco comuni:</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li><strong>1:1:1</strong> - Mantenimento standard</li>
                        <li><strong>1:2:2</strong> - Rinfresco forte</li>
                        <li><strong>1:5:5</strong> - Riattivazione o preparazione panettone</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="starter-amount">Quantità Lievito Madre</Label>
                      <div className="flex gap-2">
                        <Input
                          id="starter-amount"
                          type="number"
                          value={starterAmount}
                          onChange={(e) => setStarterAmount(e.target.value)}
                          min="0"
                        />
                        <span className="flex items-center text-gray-600">g</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="ratio">Rapporto Rinfresco</Label>
                      <Select value={ratio} onValueChange={setRatio}>
                        <SelectTrigger id="ratio">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1:1:1">1:1:1 (Standard)</SelectItem>
                          <SelectItem value="1:2:2">1:2:2 (Forte)</SelectItem>
                          <SelectItem value="1:3:3">1:3:3 (Molto Forte)</SelectItem>
                          <SelectItem value="1:5:5">1:5:5 (Panettone)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={calculateRefresh}
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    size="lg"
                  >
                    Calcola Rinfresco
                  </Button>

                  {refreshResult && (
                    <div className="space-y-6">
                      <div className="rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 text-white">
                        <h3 className="mb-6 text-center text-xl font-semibold">
                          Ingredienti per il Rinfresco
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-white/20 pb-3">
                            <span className="text-amber-100">Lievito Madre:</span>
                            <span className="text-2xl font-bold">{refreshResult.starter.toFixed(0)}g</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-white/20 pb-3">
                            <span className="text-amber-100">Farina:</span>
                            <span className="text-2xl font-bold">{refreshResult.flour.toFixed(0)}g</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-white/20 pb-3">
                            <span className="text-amber-100">Acqua:</span>
                            <span className="text-2xl font-bold">{refreshResult.water.toFixed(0)}g</span>
                          </div>
                          <div className="flex items-center justify-between border-t-2 border-white/40 pt-4">
                            <span className="text-lg font-semibold">Totale:</span>
                            <span className="text-3xl font-bold">{refreshResult.total.toFixed(0)}g</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-amber-50 p-6">
                        <h4 className="mb-3 font-semibold text-gray-900">Procedimento</h4>
                        <ol className="list-inside list-decimal space-y-2 text-sm text-gray-700">
                          <li>Preleva {refreshResult.starter.toFixed(0)}g di lievito madre maturo</li>
                          <li>Aggiungi {refreshResult.flour.toFixed(0)}g di farina</li>
                          <li>Aggiungi {refreshResult.water.toFixed(0)}g di acqua a temperatura ambiente</li>
                          <li>Impasta fino ad ottenere un composto omogeneo</li>
                          <li>Lascia lievitare a 26-28°C fino al raddoppio (4-6 ore)</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      onClick={resetRefresh}
                      variant="outline"
                      className="flex-1"
                    >
                      Resetta
                    </Button>
                    <Button
                      onClick={() => window.print()}
                      className="flex-1 bg-amber-600 hover:bg-amber-700"
                    >
                      Stampa
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Conversion Tab */}
            {activeTab === 'convert' && (
              <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
                <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                    <div className="text-sm text-amber-900">
                      <p className="mb-2 font-semibold">Conversione Lievito Madre → Lievito di Birra</p>
                      <p>
                        Calcola quanto lievito di birra fresco usare se non hai lievito madre.
                        La conversione è approssimativa e potrebbe richiedere aggiustamenti nei tempi di lievitazione.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="sourdough-amount">Lievito Madre nella Ricetta</Label>
                      <div className="flex gap-2">
                        <Input
                          id="sourdough-amount"
                          type="number"
                          value={sourdoughAmount}
                          onChange={(e) => setSourdoughAmount(e.target.value)}
                          min="0"
                        />
                        <span className="flex items-center text-gray-600">g</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="sourdough-hydration">Idratazione Lievito</Label>
                      <Select value={sourdoughHydration} onValueChange={setSourdoughHydration}>
                        <SelectTrigger id="sourdough-hydration">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50% (Solido)</SelectItem>
                          <SelectItem value="100">100% (Liquido)</SelectItem>
                          <SelectItem value="125">125% (Molto Liquido)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={calculateConversion}
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    size="lg"
                  >
                    Calcola Conversione
                  </Button>

                  {yeastAmount !== null && (
                    <div className="space-y-6">
                      <div className="rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 text-center text-white">
                        <div className="mb-2 text-sm font-medium opacity-90">
                          Lievito di Birra Fresco Necessario
                        </div>
                        <div className="text-6xl font-bold">
                          {yeastAmount.toFixed(1)}g
                        </div>
                        <div className="mt-2 text-sm opacity-90">
                          oppure {(yeastAmount / 3).toFixed(1)}g di lievito secco
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg bg-amber-50 p-6">
                          <h4 className="mb-3 font-semibold text-gray-900">Note Importanti</h4>
                          <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                            <li>Aumenta leggermente la quantità di acqua nella ricetta</li>
                            <li>I tempi di lievitazione saranno più brevi</li>
                            <li>Il sapore sarà meno complesso</li>
                          </ul>
                        </div>

                        <div className="rounded-lg bg-amber-50 p-6">
                          <h4 className="mb-3 font-semibold text-gray-900">Conversioni Rapide</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex justify-between">
                              <span>Lievito fresco:</span>
                              <span className="font-semibold">{yeastAmount.toFixed(1)}g</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Lievito secco:</span>
                              <span className="font-semibold">{(yeastAmount / 3).toFixed(1)}g</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Lievito istantaneo:</span>
                              <span className="font-semibold">{(yeastAmount / 3.5).toFixed(1)}g</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      onClick={resetConversion}
                      variant="outline"
                      className="flex-1"
                    >
                      Resetta
                    </Button>
                    <Button
                      onClick={() => window.print()}
                      className="flex-1 bg-amber-600 hover:bg-amber-700"
                    >
                      Stampa
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
