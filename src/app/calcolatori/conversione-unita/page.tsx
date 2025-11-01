'use client'

import { useState } from 'react'
import PageTransition from '@/components/shared/PageTransition'
import { ArrowRightLeft, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Conversion factors to grams
const weightConversions: Record<string, number> = {
  'g': 1,
  'kg': 1000,
  'mg': 0.001,
  'oz': 28.3495,
  'lb': 453.592,
  'cup-flour': 125,
  'cup-sugar': 200,
  'cup-butter': 227,
  'cup-liquid': 240,
  'tbsp': 15,
  'tsp': 5,
}

// Conversion factors to ml
const volumeConversions: Record<string, number> = {
  'ml': 1,
  'l': 1000,
  'cup': 240,
  'tbsp': 14.7868,
  'tsp': 4.92892,
  'fl-oz': 29.5735,
}

interface ConversionResult {
  unit: string
  value: number
  label: string
}

export default function ConversioneUnitaPage() {
  const [activeTab, setActiveTab] = useState<'weight' | 'volume' | 'temperature'>('weight')

  // Weight conversion
  const [weightValue, setWeightValue] = useState<string>('100')
  const [weightFromUnit, setWeightFromUnit] = useState<string>('g')
  const [weightResults, setWeightResults] = useState<ConversionResult[]>([])

  // Volume conversion
  const [volumeValue, setVolumeValue] = useState<string>('100')
  const [volumeFromUnit, setVolumeFromUnit] = useState<string>('ml')
  const [volumeResults, setVolumeResults] = useState<ConversionResult[]>([])

  // Temperature conversion
  const [tempValue, setTempValue] = useState<string>('180')
  const [tempFromUnit, setTempFromUnit] = useState<'C' | 'F'>('C')
  const [tempResult, setTempResult] = useState<{ celsius: number; fahrenheit: number } | null>(null)

  const convertWeight = () => {
    const value = parseFloat(weightValue)
    if (isNaN(value)) return

    const valueInGrams = value * weightConversions[weightFromUnit]!

    const results: ConversionResult[] = [
      { unit: 'g', value: valueInGrams, label: 'Grammi' },
      { unit: 'kg', value: valueInGrams / weightConversions['kg']!, label: 'Kilogrammi' },
      { unit: 'oz', value: valueInGrams / weightConversions['oz']!, label: 'Once' },
      { unit: 'lb', value: valueInGrams / weightConversions['lb']!, label: 'Libbre' },
      { unit: 'cup-flour', value: valueInGrams / weightConversions['cup-flour']!, label: 'Tazze (Farina)' },
      { unit: 'cup-sugar', value: valueInGrams / weightConversions['cup-sugar']!, label: 'Tazze (Zucchero)' },
      { unit: 'cup-butter', value: valueInGrams / weightConversions['cup-butter']!, label: 'Tazze (Burro)' },
      { unit: 'tbsp', value: valueInGrams / weightConversions['tbsp']!, label: 'Cucchiai' },
      { unit: 'tsp', value: valueInGrams / weightConversions['tsp']!, label: 'Cucchiaini' },
    ]

    setWeightResults(results.filter(r => r.unit !== weightFromUnit))
  }

  const convertVolume = () => {
    const value = parseFloat(volumeValue)
    if (isNaN(value)) return

    const valueInMl = value * volumeConversions[volumeFromUnit]!

    const results: ConversionResult[] = [
      { unit: 'ml', value: valueInMl, label: 'Millilitri' },
      { unit: 'l', value: valueInMl / volumeConversions['l']!, label: 'Litri' },
      { unit: 'cup', value: valueInMl / (volumeConversions['cup'] ?? 0), label: 'Tazze' },
      { unit: 'tbsp', value: valueInMl / (volumeConversions['tbsp'] ?? 0), label: 'Cucchiai' },
      { unit: 'tsp', value: valueInMl / (volumeConversions['tsp'] ?? 0), label: 'Cucchiaini' },
      { unit: 'fl-oz', value: valueInMl / (volumeConversions['fl-oz'] ?? 0), label: 'Once Fluide' },
    ]

    setVolumeResults(results.filter(r => r.unit !== volumeFromUnit))
  }

  const convertTemperature = () => {
    const value = parseFloat(tempValue)
    if (isNaN(value)) return

    if (tempFromUnit === 'C') {
      setTempResult({
        celsius: value,
        fahrenheit: (value * 9/5) + 32
      })
    } else {
      setTempResult({
        celsius: (value - 32) * 5/9,
        fahrenheit: value
      })
    }
  }

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/calcolatori"
            className="mb-6 inline-flex items-center text-green-100 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna ai calcolatori
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
              <ArrowRightLeft className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                Conversione Unità
              </h1>
              <p className="text-green-100">
                Converti facilmente tra grammi, tazze, cucchiai e temperature
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
                onClick={() => setActiveTab('weight')}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'weight'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Peso
              </button>
              <button
                onClick={() => setActiveTab('volume')}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'volume'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Volume
              </button>
              <button
                onClick={() => setActiveTab('temperature')}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'temperature'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Temperatura
              </button>
            </div>

            {/* Weight Tab */}
            {activeTab === 'weight' && (
              <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    <div className="text-sm text-green-900">
                      <p>
                        Nota: Le conversioni per tazze variano in base all'ingrediente.
                        1 tazza di farina ≈ 125g, 1 tazza di zucchero ≈ 200g, 1 tazza di burro ≈ 227g
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="weight-value">Valore</Label>
                    <Input
                      id="weight-value"
                      type="number"
                      value={weightValue}
                      onChange={(e) => setWeightValue(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight-from">Da</Label>
                    <Select value={weightFromUnit} onValueChange={setWeightFromUnit}>
                      <SelectTrigger id="weight-from">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g">Grammi (g)</SelectItem>
                        <SelectItem value="kg">Kilogrammi (kg)</SelectItem>
                        <SelectItem value="oz">Once (oz)</SelectItem>
                        <SelectItem value="lb">Libbre (lb)</SelectItem>
                        <SelectItem value="cup-flour">Tazze (Farina)</SelectItem>
                        <SelectItem value="cup-sugar">Tazze (Zucchero)</SelectItem>
                        <SelectItem value="cup-butter">Tazze (Burro)</SelectItem>
                        <SelectItem value="tbsp">Cucchiai (tbsp)</SelectItem>
                        <SelectItem value="tsp">Cucchiaini (tsp)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={convertWeight}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700"
                >
                  Converti
                </Button>

                {weightResults.length > 0 && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold">Risultati</h3>
                    <div className="space-y-2">
                      {weightResults.map((result) => (
                        <div
                          key={result.unit}
                          className="flex justify-between rounded-lg bg-gray-50 p-4"
                        >
                          <span className="text-gray-700">{result.label}</span>
                          <span className="font-semibold text-green-600">
                            {result.value.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Volume Tab */}
            {activeTab === 'volume' && (
              <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="volume-value">Valore</Label>
                    <Input
                      id="volume-value"
                      type="number"
                      value={volumeValue}
                      onChange={(e) => setVolumeValue(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="volume-from">Da</Label>
                    <Select value={volumeFromUnit} onValueChange={setVolumeFromUnit}>
                      <SelectTrigger id="volume-from">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ml">Millilitri (ml)</SelectItem>
                        <SelectItem value="l">Litri (l)</SelectItem>
                        <SelectItem value="cup">Tazze (cup)</SelectItem>
                        <SelectItem value="tbsp">Cucchiai (tbsp)</SelectItem>
                        <SelectItem value="tsp">Cucchiaini (tsp)</SelectItem>
                        <SelectItem value="fl-oz">Once Fluide (fl oz)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={convertVolume}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700"
                >
                  Converti
                </Button>

                {volumeResults.length > 0 && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold">Risultati</h3>
                    <div className="space-y-2">
                      {volumeResults.map((result) => (
                        <div
                          key={result.unit}
                          className="flex justify-between rounded-lg bg-gray-50 p-4"
                        >
                          <span className="text-gray-700">{result.label}</span>
                          <span className="font-semibold text-green-600">
                            {result.value.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Temperature Tab */}
            {activeTab === 'temperature' && (
              <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    <div className="text-sm text-green-900">
                      <p className="mb-2">Temperature comuni del forno:</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>Basso: 150°C (300°F)</li>
                        <li>Moderato: 180°C (350°F)</li>
                        <li>Alto: 220°C (425°F)</li>
                        <li>Molto alto: 260°C (500°F)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="temp-value">Temperatura</Label>
                    <Input
                      id="temp-value"
                      type="number"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="temp-from">Unità</Label>
                    <Select value={tempFromUnit} onValueChange={(value: 'C' | 'F') => setTempFromUnit(value)}>
                      <SelectTrigger id="temp-from">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="C">Celsius (°C)</SelectItem>
                        <SelectItem value="F">Fahrenheit (°F)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={convertTemperature}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700"
                >
                  Converti
                </Button>

                {tempResult && (
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6 text-center">
                      <div className="mb-2 text-sm text-gray-600">Celsius</div>
                      <div className="text-4xl font-bold text-green-600">
                        {tempResult.celsius.toFixed(1)}°C
                      </div>
                    </div>
                    <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6 text-center">
                      <div className="mb-2 text-sm text-gray-600">Fahrenheit</div>
                      <div className="text-4xl font-bold text-green-600">
                        {tempResult.fahrenheit.toFixed(1)}°F
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
