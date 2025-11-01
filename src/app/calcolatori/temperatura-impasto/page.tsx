'use client'

import { useState } from 'react'
import PageTransition from '@/components/shared/PageTransition'
import { Timer, ArrowLeft, Info, Thermometer } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function TemperaturaImpastoPage() {
  const [targetTemp, setTargetTemp] = useState<string>('26')
  const [roomTemp, setRoomTemp] = useState<string>('20')
  const [flourTemp, setFlourTemp] = useState<string>('20')
  const [friction, setFriction] = useState<string>('25')
  const [waterTemp, setWaterTemp] = useState<number | null>(null)
  const [recommendations, setRecommendations] = useState<string[]>([])

  const calculateWaterTemp = () => {
    const target = parseFloat(targetTemp)
    const room = parseFloat(roomTemp)
    const flour = parseFloat(flourTemp)
    const frictionFactor = parseFloat(friction)

    if (isNaN(target) || isNaN(room) || isNaN(flour) || isNaN(frictionFactor)) return

    // Formula: Temperatura Acqua = (Temperatura Desiderata × 3) - Temp. Ambiente - Temp. Farina - Fattore Frizione
    const calculatedWaterTemp = (target * 3) - room - flour - frictionFactor

    setWaterTemp(calculatedWaterTemp)

    // Generate recommendations
    const recs: string[] = []

    if (calculatedWaterTemp < 5) {
      recs.push('⚠️ Temperatura troppo bassa! Usa acqua ghiacciata o aggiungi ghiaccio tritato.')
    } else if (calculatedWaterTemp < 10) {
      recs.push('❄️ Usa acqua molto fredda di frigo (4-8°C).')
    } else if (calculatedWaterTemp < 20) {
      recs.push('🧊 Usa acqua fredda di rubinetto.')
    } else if (calculatedWaterTemp <= 35) {
      recs.push('✅ Temperatura acqua ideale, usa acqua tiepida.')
    } else if (calculatedWaterTemp <= 45) {
      recs.push('🔥 Usa acqua calda, ma attenzione a non superare i 45°C.')
    } else {
      recs.push('⚠️ Temperatura troppo alta! Rischio di danneggiare il lievito. Riconsidera i parametri.')
    }

    // Additional tips based on target temperature
    if (target < 22) {
      recs.push('💡 Temperatura bassa: ideale per lievitazioni lunghe in frigo.')
    } else if (target >= 22 && target <= 26) {
      recs.push('💡 Temperatura standard: ottima per la maggior parte degli impasti.')
    } else if (target > 26 && target <= 30) {
      recs.push('💡 Temperatura alta: lievitazione rapida, attenzione al controllo.')
    } else {
      recs.push('⚠️ Temperatura molto alta: rischio di sovralievitazione.')
    }

    setRecommendations(recs)
  }

  const resetCalculator = () => {
    setTargetTemp('26')
    setRoomTemp('20')
    setFlourTemp('20')
    setFriction('25')
    setWaterTemp(null)
    setRecommendations([])
  }

  const getTempColor = (temp: number) => {
    if (temp < 10) return 'from-blue-500 to-cyan-500'
    if (temp < 20) return 'from-cyan-500 to-teal-500'
    if (temp <= 35) return 'from-green-500 to-emerald-500'
    if (temp <= 45) return 'from-orange-500 to-red-500'
    return 'from-red-600 to-red-800'
  }

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/calcolatori"
            className="mb-6 inline-flex items-center text-red-100 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna ai calcolatori
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
              <Thermometer className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                Temperatura Finale Impasto
              </h1>
              <p className="text-red-100">
                Calcola la temperatura dell'acqua per ottenere l'impasto perfetto
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
            <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                <div className="text-sm text-red-900">
                  <p className="mb-2 font-semibold">Come funziona?</p>
                  <p className="mb-2">
                    La temperatura finale dell'impasto influenza la velocità di lievitazione e lo sviluppo
                    del glutine. Questo calcolatore usa la <strong>regola del 3</strong> per determinare
                    la temperatura ottimale dell'acqua.
                  </p>
                  <p className="font-mono text-xs">
                    Formula: Temp. Acqua = (Temp. Desiderata × 3) - Temp. Ambiente - Temp. Farina - Fattore Frizione
                  </p>
                </div>
              </div>
            </div>

            {/* Calculator Card */}
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              {/* Inputs Grid */}
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="target-temp" className="mb-2 flex items-center gap-2 font-semibold">
                    <Thermometer className="h-4 w-4 text-red-600" />
                    Temperatura Desiderata Impasto
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="target-temp"
                      type="number"
                      value={targetTemp}
                      onChange={(e) => setTargetTemp(e.target.value)}
                      className="text-lg"
                      min="15"
                      max="35"
                      step="0.5"
                    />
                    <span className="flex items-center text-gray-600">°C</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Tipicamente 24-26°C per impasti standard
                  </p>
                </div>

                <div>
                  <Label htmlFor="room-temp" className="mb-2 font-semibold">
                    Temperatura Ambiente
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="room-temp"
                      type="number"
                      value={roomTemp}
                      onChange={(e) => setRoomTemp(e.target.value)}
                      className="text-lg"
                      min="10"
                      max="35"
                      step="0.5"
                    />
                    <span className="flex items-center text-gray-600">°C</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Temperatura della stanza di lavoro
                  </p>
                </div>

                <div>
                  <Label htmlFor="flour-temp" className="mb-2 font-semibold">
                    Temperatura Farina
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="flour-temp"
                      type="number"
                      value={flourTemp}
                      onChange={(e) => setFlourTemp(e.target.value)}
                      className="text-lg"
                      min="10"
                      max="30"
                      step="0.5"
                    />
                    <span className="flex items-center text-gray-600">°C</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Di solito uguale alla temperatura ambiente
                  </p>
                </div>

                <div>
                  <Label htmlFor="friction" className="mb-2 font-semibold">
                    Fattore Frizione
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="friction"
                      type="number"
                      value={friction}
                      onChange={(e) => setFriction(e.target.value)}
                      className="text-lg"
                      min="0"
                      max="40"
                      step="1"
                    />
                    <span className="flex items-center text-gray-600">°C</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Impasto a mano: 15-20°C | Planetaria: 20-30°C
                  </p>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Preset Rapidi:</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTargetTemp('24')
                      setFriction('15')
                    }}
                  >
                    Impasto a Mano
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTargetTemp('26')
                      setFriction('25')
                    }}
                  >
                    Planetaria Standard
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTargetTemp('28')
                      setFriction('30')
                    }}
                  >
                    Spirale Veloce
                  </Button>
                </div>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateWaterTemp}
                className="w-full bg-red-600 hover:bg-red-700"
                size="lg"
              >
                Calcola Temperatura Acqua
              </Button>

              {/* Results */}
              {waterTemp !== null && (
                <div className="mt-8 space-y-6">
                  {/* Water Temperature Result */}
                  <div className={`rounded-xl bg-gradient-to-br ${getTempColor(waterTemp)} p-8 text-center text-white shadow-lg`}>
                    <div className="mb-2 text-sm font-medium opacity-90">
                      Temperatura Acqua Necessaria
                    </div>
                    <div className="mb-2 flex items-center justify-center gap-3">
                      <Thermometer className="h-12 w-12" />
                      <span className="text-7xl font-bold">{waterTemp.toFixed(1)}</span>
                      <span className="text-3xl">°C</span>
                    </div>
                    <div className="mt-4 text-lg font-medium opacity-90">
                      {waterTemp <= 35 ? '✓ Temperatura sicura' : '⚠ Attenzione: temperatura elevata'}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h4 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                      <Info className="h-5 w-5 text-red-600" />
                      Raccomandazioni
                    </h4>
                    <div className="space-y-3">
                      {recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="flex gap-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700"
                        >
                          <span className="flex-shrink-0">{index + 1}.</span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Temperature Guide */}
                  <div className="rounded-lg border border-gray-200 p-6">
                    <h4 className="mb-4 font-semibold text-gray-900">
                      Guida Temperature Impasto
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          18-22°C
                        </span>
                        <span className="text-gray-600">Lievitazione lenta/frigo</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          24-26°C
                        </span>
                        <span className="text-gray-600">Ideale per la maggior parte degli impasti</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                          27-29°C
                        </span>
                        <span className="text-gray-600">Lievitazione rapida</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          &gt; 30°C
                        </span>
                        <span className="text-gray-600">Rischio per il lievito</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="rounded-lg bg-red-50 p-6">
                    <h4 className="mb-3 font-semibold text-gray-900">Dettaglio Calcolo</h4>
                    <div className="space-y-2 font-mono text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Temp. Desiderata × 3:</span>
                        <span className="font-semibold">{(parseFloat(targetTemp) * 3).toFixed(1)}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span>- Temp. Ambiente:</span>
                        <span className="font-semibold">-{parseFloat(roomTemp).toFixed(1)}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span>- Temp. Farina:</span>
                        <span className="font-semibold">-{parseFloat(flourTemp).toFixed(1)}°C</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>- Fattore Frizione:</span>
                        <span className="font-semibold">-{parseFloat(friction).toFixed(1)}°C</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="font-bold">= Temp. Acqua:</span>
                        <span className="text-lg font-bold text-red-600">{waterTemp.toFixed(1)}°C</span>
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
                  className="flex-1 bg-red-600 hover:bg-red-700"
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
