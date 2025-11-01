'use client'

import { useState } from 'react'
import PageTransition from '@/components/shared/PageTransition'
import { Clock, ArrowLeft, Info, Thermometer } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface TimeResult {
  hours: number
  minutes: number
  totalMinutes: number
  temperature: number
  yeastType: string
  yeastAmount: number
  recommendation: string
}

export default function TempiLievitazionePage() {
  const [yeastType, setYeastType] = useState<'fresh' | 'dry' | 'sourdough'>('fresh')
  const [yeastAmount, setYeastAmount] = useState<string>('20')
  const [flourWeight, setFlourWeight] = useState<string>('1000')
  const [temperature, setTemperature] = useState<string>('24')
  const [desiredRise, setDesiredRise] = useState<string>('2')

  const [results, setResults] = useState<TimeResult[]>([])

  const calculateFermentationTime = () => {
    const flour = parseFloat(flourWeight)
    const yeast = parseFloat(yeastAmount)
    const temp = parseFloat(temperature)
    const rise = parseFloat(desiredRise)

    if (isNaN(flour) || isNaN(yeast) || isNaN(temp) || isNaN(rise)) return

    // Calculate yeast percentage
    let yeastPercentage = (yeast / flour) * 100

    // Adjust for yeast type
    if (yeastType === 'dry') {
      yeastPercentage = yeastPercentage * 2.5 // Dry yeast is more concentrated
    } else if (yeastType === 'sourdough') {
      yeastPercentage = yeastPercentage * 0.3 // Sourdough is less active
    }

    // Base time at 24°C with 2% yeast for double rise (120 minutes)
    const baseTime = 120
    const baseTemp = 24
    const baseYeast = 2
    const baseRise = 2

    // Temperature factor: every 5°C changes time by ~50%
    const tempFactor = Math.pow(1.5, (baseTemp - temp) / 5)

    // Yeast factor: inverse relationship
    const yeastFactor = baseYeast / yeastPercentage

    // Rise factor: exponential relationship
    const riseFactor = Math.log2(rise) / Math.log2(baseRise)

    // Calculate time
    let totalMinutes = baseTime * tempFactor * yeastFactor * riseFactor

    // Generate recommendations
    let recommendation = ''
    if (totalMinutes < 60) {
      recommendation = '⚠️ Lievitazione molto rapida. Attento a non far sovralievitare!'
    } else if (totalMinutes < 120) {
      recommendation = '✅ Tempo ideale per una lievitazione controllata'
    } else if (totalMinutes < 360) {
      recommendation = '💡 Lievitazione moderata, ottima per sviluppare sapore'
    } else if (totalMinutes < 720) {
      recommendation = '❄️ Lievitazione lenta, ideale per frigo. Ottimo sapore!'
    } else {
      recommendation = '🕐 Lievitazione molto lunga. Considera il frigo per evitare sovralievitazione'
    }

    const result: TimeResult = {
      totalMinutes: Math.round(totalMinutes),
      hours: Math.floor(totalMinutes / 60),
      minutes: Math.round(totalMinutes % 60),
      temperature: temp,
      yeastType: yeastType,
      yeastAmount: yeast,
      recommendation: recommendation
    }

    // Calculate times for different temperatures
    const temperatures = [18, 20, 22, 24, 26, 28]
    const tempResults: TimeResult[] = temperatures.map(t => {
      const tFactor = Math.pow(1.5, (baseTemp - t) / 5)
      const tMinutes = baseTime * tFactor * yeastFactor * riseFactor

      let rec = ''
      if (tMinutes < 60) rec = '⚠️ Molto rapida'
      else if (tMinutes < 120) rec = '✅ Ideale'
      else if (tMinutes < 360) rec = '💡 Moderata'
      else if (tMinutes < 720) rec = '❄️ Lenta/Frigo'
      else rec = '🕐 Molto lunga'

      return {
        totalMinutes: Math.round(tMinutes),
        hours: Math.floor(tMinutes / 60),
        minutes: Math.round(tMinutes % 60),
        temperature: t,
        yeastType: yeastType,
        yeastAmount: yeast,
        recommendation: rec
      }
    })

    setResults(tempResults)
  }

  const resetCalculator = () => {
    setYeastType('fresh')
    setYeastAmount('20')
    setFlourWeight('1000')
    setTemperature('24')
    setDesiredRise('2')
    setResults([])
  }

  const applyPreset = (preset: string) => {
    switch(preset) {
      case 'quick-bread':
        setYeastType('fresh')
        setYeastAmount('30')
        setTemperature('28')
        setDesiredRise('2')
        break
      case 'standard-bread':
        setYeastType('fresh')
        setYeastAmount('20')
        setTemperature('24')
        setDesiredRise('2')
        break
      case 'slow-rise':
        setYeastType('fresh')
        setYeastAmount('5')
        setTemperature('20')
        setDesiredRise('2')
        break
      case 'cold-ferment':
        setYeastType('fresh')
        setYeastAmount('2')
        setTemperature('4')
        setDesiredRise('2')
        break
      case 'sourdough':
        setYeastType('sourdough')
        setYeastAmount('200')
        setTemperature('22')
        setDesiredRise('2')
        break
    }
  }

  const formatTime = (hours: number, minutes: number): string => {
    if (hours === 0) return `${minutes} minuti`
    if (minutes === 0) return `${hours} ${hours === 1 ? 'ora' : 'ore'}`
    return `${hours}h ${minutes}min`
  }

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/calcolatori"
            className="mb-6 inline-flex items-center text-orange-100 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna ai calcolatori
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                Tempi di Lievitazione
              </h1>
              <p className="text-orange-100">
                Calcola i tempi perfetti in base a temperatura e lievito
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
            <div className="mb-8 rounded-lg border border-orange-200 bg-orange-50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
                <div className="text-sm text-orange-900">
                  <p className="mb-2 font-semibold">Come funziona?</p>
                  <p className="mb-2">
                    Il tempo di lievitazione dipende da tre fattori principali:
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li><strong>Temperatura:</strong> più alta = lievitazione più rapida</li>
                    <li><strong>Quantità di lievito:</strong> più lievito = tempo ridotto</li>
                    <li><strong>Tipo di lievito:</strong> fresco, secco o pasta madre hanno forze diverse</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Calculator Card */}
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              {/* Inputs Grid */}
              <div className="mb-8 space-y-6">
                {/* Yeast Type and Amount */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="yeast-type" className="mb-2 font-semibold">
                      Tipo di Lievito
                    </Label>
                    <Select value={yeastType} onValueChange={(value: 'fresh' | 'dry' | 'sourdough') => setYeastType(value)}>
                      <SelectTrigger id="yeast-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresh">Lievito Fresco di Birra</SelectItem>
                        <SelectItem value="dry">Lievito Secco</SelectItem>
                        <SelectItem value="sourdough">Lievito Madre (Pasta Madre)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="yeast-amount" className="mb-2 font-semibold">
                      Quantità Lievito
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="yeast-amount"
                        type="number"
                        value={yeastAmount}
                        onChange={(e) => setYeastAmount(e.target.value)}
                        className="text-lg"
                        min="0"
                        step="1"
                      />
                      <span className="flex items-center text-gray-600">g</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {yeastType === 'fresh' && 'Tipicamente 10-25g per kg di farina'}
                      {yeastType === 'dry' && 'Tipicamente 3-7g per kg di farina'}
                      {yeastType === 'sourdough' && 'Tipicamente 150-300g per kg di farina'}
                    </p>
                  </div>
                </div>

                {/* Flour and Temperature */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="flour" className="mb-2 font-semibold">
                      Peso Farina
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="flour"
                        type="number"
                        value={flourWeight}
                        onChange={(e) => setFlourWeight(e.target.value)}
                        className="text-lg"
                        min="100"
                        step="100"
                      />
                      <span className="flex items-center text-gray-600">g</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="temperature" className="mb-2 flex items-center gap-2 font-semibold">
                      <Thermometer className="h-4 w-4 text-orange-600" />
                      Temperatura Ambiente
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="temperature"
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="text-lg"
                        min="4"
                        max="35"
                        step="1"
                      />
                      <span className="flex items-center text-gray-600">°C</span>
                    </div>
                  </div>
                </div>

                {/* Desired Rise */}
                <div>
                  <Label htmlFor="rise" className="mb-2 font-semibold">
                    Lievitazione Desiderata
                  </Label>
                  <Select value={desiredRise} onValueChange={setDesiredRise}>
                    <SelectTrigger id="rise">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.5">50% (x1.5) - Lievitazione parziale</SelectItem>
                      <SelectItem value="2">100% (x2) - Lievitazione doppia</SelectItem>
                      <SelectItem value="2.5">150% (x2.5) - Lievitazione abbondante</SelectItem>
                      <SelectItem value="3">200% (x3) - Lievitazione tripla</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="mt-1 text-xs text-gray-500">
                    Raddoppio (x2) è lo standard per la maggior parte dei pani
                  </p>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mb-6 rounded-lg bg-orange-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Preset Rapidi:</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('quick-bread')}
                  >
                    Pane Rapido (1-2h)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('standard-bread')}
                  >
                    Pane Standard (2-3h)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('slow-rise')}
                  >
                    Lievitazione Lenta (8-12h)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('cold-ferment')}
                  >
                    Maturazione Frigo (24-72h)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('sourdough')}
                  >
                    Pasta Madre
                  </Button>
                </div>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateFermentationTime}
                className="w-full bg-orange-600 hover:bg-orange-700"
                size="lg"
              >
                Calcola Tempi di Lievitazione
              </Button>

              {/* Results */}
              {results.length > 0 && (
                <div className="mt-8 space-y-6">
                  {/* Results Table */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Tempi di Lievitazione per Diverse Temperature
                    </h3>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="w-full">
                        <thead className="bg-orange-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                              Temperatura
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                              Tempo
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                              Indicazione
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {results.map((result, index) => (
                            <tr
                              key={index}
                              className={result.temperature === parseFloat(temperature) ? 'bg-orange-100' : 'bg-white hover:bg-gray-50'}
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <Thermometer className="h-4 w-4 text-orange-600" />
                                  <span className="font-semibold">{result.temperature}°C</span>
                                  {result.temperature === parseFloat(temperature) && (
                                    <span className="ml-2 rounded-full bg-orange-600 px-2 py-0.5 text-xs text-white">
                                      Selezionata
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 font-semibold text-orange-600">
                                {formatTime(result.hours, result.minutes)}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {result.recommendation}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      💡 Consigli Pratici
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Poke Test:</strong> Premi delicatamente l'impasto. Se torna lentamente, è pronto!</p>
                      <p><strong>Lievitazioni lunghe:</strong> Sviluppano più sapore e digeribilità</p>
                      <p><strong>Frigo:</strong> Usa 4-8°C per lievitazioni da 12 a 72 ore</p>
                      <p><strong>Estate:</strong> Riduci il lievito del 20-30% quando fa caldo</p>
                      <p><strong>Inverno:</strong> Aumenta leggermente il lievito o usa un ambiente più caldo</p>
                    </div>
                  </div>

                  {/* Temperature Guide */}
                  <div className="rounded-lg border border-gray-200 p-6">
                    <h4 className="mb-4 font-semibold text-gray-900">
                      Guida Temperature
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 text-sm">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          4-8°C (Frigo)
                        </span>
                        <span className="text-gray-600">Maturazione lenta 12-72h</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-cyan-50 p-3 text-sm">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-cyan-500"></div>
                          18-20°C (Fresco)
                        </span>
                        <span className="text-gray-600">Lievitazione lenta 6-10h</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 text-sm">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          22-26°C (Ambiente)
                        </span>
                        <span className="text-gray-600">Lievitazione standard 2-4h</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3 text-sm">
                        <span className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                          27-30°C (Caldo)
                        </span>
                        <span className="text-gray-600">Lievitazione rapida 1-2h</span>
                      </div>
                    </div>
                  </div>

                  {/* Recipe Summary */}
                  <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-6">
                    <h4 className="mb-3 font-semibold text-gray-900">Riepilogo Ricetta</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Farina:</span>
                        <span className="font-semibold">{flourWeight}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">
                          {yeastType === 'fresh' && 'Lievito Fresco:'}
                          {yeastType === 'dry' && 'Lievito Secco:'}
                          {yeastType === 'sourdough' && 'Lievito Madre:'}
                        </span>
                        <span className="font-semibold">
                          {yeastAmount}g ({((parseFloat(yeastAmount) / parseFloat(flourWeight)) * 100).toFixed(2)}%)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Temperatura:</span>
                        <span className="font-semibold">{temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Lievitazione:</span>
                        <span className="font-semibold">
                          {desiredRise === '1.5' && '+50%'}
                          {desiredRise === '2' && 'Raddoppio'}
                          {desiredRise === '2.5' && '+150%'}
                          {desiredRise === '3' && 'Triplo'}
                        </span>
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
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
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
