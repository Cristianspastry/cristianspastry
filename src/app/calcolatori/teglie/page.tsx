'use client'

import { useState } from 'react'
import PageTransition from '@/components/shared/PageTransition'
import { Square, ArrowLeft, Info, Circle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function TeglieCalcoloPage() {
  const [panType, setPanType] = useState<'rectangular' | 'round'>('rectangular')

  // Rectangular pan
  const [length, setLength] = useState<string>('30')
  const [width, setWidth] = useState<string>('20')
  const [height, setHeight] = useState<string>('5')

  // Round pan
  const [diameter, setDiameter] = useState<string>('24')
  const [roundHeight, setRoundHeight] = useState<string>('5')

  // Common settings
  const [gramsPerLiter, setGramsPerLiter] = useState<string>('600')
  const [fillPercentage, setFillPercentage] = useState<string>('60')

  const [result, setResult] = useState<{
    volume: number
    fillVolume: number
    doughWeight: number
  } | null>(null)

  const calculateDough = () => {
    let volumeLiters: number

    if (panType === 'rectangular') {
      const l = parseFloat(length)
      const w = parseFloat(width)
      const h = parseFloat(height)

      if (isNaN(l) || isNaN(w) || isNaN(h)) return

      // Volume in cubic cm, convert to liters
      volumeLiters = (l * w * h) / 1000
    } else {
      const d = parseFloat(diameter)
      const h = parseFloat(roundHeight)

      if (isNaN(d) || isNaN(h)) return

      // Volume of cylinder: π * r² * h
      const radius = d / 2
      volumeLiters = (Math.PI * radius * radius * h) / 1000
    }

    const fill = parseFloat(fillPercentage) / 100
    const gpl = parseFloat(gramsPerLiter)

    if (isNaN(fill) || isNaN(gpl)) return

    const fillVolume = volumeLiters * fill
    const doughWeight = fillVolume * gpl

    setResult({
      volume: volumeLiters,
      fillVolume: fillVolume,
      doughWeight: doughWeight
    })
  }

  const resetCalculator = () => {
    setPanType('rectangular')
    setLength('30')
    setWidth('20')
    setHeight('5')
    setDiameter('24')
    setRoundHeight('5')
    setGramsPerLiter('600')
    setFillPercentage('60')
    setResult(null)
  }

  const applyPreset = (preset: string) => {
    switch(preset) {
      case 'pizza-tray':
        setPanType('round')
        setDiameter('30')
        setRoundHeight('2')
        setFillPercentage('80')
        break
      case 'bread-loaf':
        setPanType('rectangular')
        setLength('25')
        setWidth('12')
        setHeight('8')
        setFillPercentage('70')
        break
      case 'focaccia':
        setPanType('rectangular')
        setLength('40')
        setWidth('30')
        setHeight('3')
        setFillPercentage('80')
        break
      case 'round-cake':
        setPanType('round')
        setDiameter('24')
        setRoundHeight('7')
        setFillPercentage('50')
        break
    }
  }

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/calcolatori"
            className="mb-6 inline-flex items-center text-indigo-100 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna ai calcolatori
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
              <Square className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                Calcolo Teglie e Stampi
              </h1>
              <p className="text-indigo-100">
                Determina quanto impasto serve per la tua teglia
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
            <div className="mb-8 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
                <div className="text-sm text-indigo-900">
                  <p className="mb-2 font-semibold">Come funziona?</p>
                  <p className="mb-2">
                    Questo calcolatore determina la quantità di impasto necessaria in base al volume
                    della teglia. La percentuale di riempimento dipende dal tipo di prodotto:
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Pane in cassetta: 70-80%</li>
                    <li>Focaccia/Pizza: 75-85%</li>
                    <li>Torte: 50-60%</li>
                    <li>Panettone: 40-50%</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Calculator Card */}
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              {/* Pan Type Selection */}
              <div className="mb-6">
                <Label className="mb-3 font-semibold">Tipo di Teglia</Label>
                <RadioGroup value={panType} onValueChange={(value: 'rectangular' | 'round') => setPanType(value)}>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rectangular" id="rectangular" />
                      <Label htmlFor="rectangular" className="flex items-center gap-2 cursor-pointer">
                        <Square className="h-4 w-4" />
                        Rettangolare
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="round" id="round" />
                      <Label htmlFor="round" className="flex items-center gap-2 cursor-pointer">
                        <Circle className="h-4 w-4" />
                        Rotonda
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Rectangular Pan Inputs */}
              {panType === 'rectangular' && (
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="length" className="mb-2 font-semibold">
                      Lunghezza
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="length"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="text-lg"
                        min="0"
                        step="0.5"
                      />
                      <span className="flex items-center text-gray-600">cm</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="width" className="mb-2 font-semibold">
                      Larghezza
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="text-lg"
                        min="0"
                        step="0.5"
                      />
                      <span className="flex items-center text-gray-600">cm</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="height" className="mb-2 font-semibold">
                      Altezza
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="text-lg"
                        min="0"
                        step="0.5"
                      />
                      <span className="flex items-center text-gray-600">cm</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Round Pan Inputs */}
              {panType === 'round' && (
                <div className="mb-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="diameter" className="mb-2 font-semibold">
                      Diametro
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="diameter"
                        type="number"
                        value={diameter}
                        onChange={(e) => setDiameter(e.target.value)}
                        className="text-lg"
                        min="0"
                        step="0.5"
                      />
                      <span className="flex items-center text-gray-600">cm</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="round-height" className="mb-2 font-semibold">
                      Altezza
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="round-height"
                        type="number"
                        value={roundHeight}
                        onChange={(e) => setRoundHeight(e.target.value)}
                        className="text-lg"
                        min="0"
                        step="0.5"
                      />
                      <span className="flex items-center text-gray-600">cm</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Settings */}
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Impostazioni Avanzate</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="grams-per-liter" className="mb-2 text-sm">
                      Grammi per Litro di Impasto
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="grams-per-liter"
                        type="number"
                        value={gramsPerLiter}
                        onChange={(e) => setGramsPerLiter(e.target.value)}
                        min="400"
                        max="800"
                        step="10"
                      />
                      <span className="flex items-center text-sm text-gray-600">g/L</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Tipicamente 550-650 g/L per impasti lievitati
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="fill-percentage" className="mb-2 text-sm">
                      Percentuale Riempimento
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="fill-percentage"
                        type="number"
                        value={fillPercentage}
                        onChange={(e) => setFillPercentage(e.target.value)}
                        min="20"
                        max="100"
                        step="5"
                      />
                      <span className="flex items-center text-sm text-gray-600">%</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Lascia spazio per la lievitazione
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mb-6 rounded-lg bg-indigo-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Preset Rapidi:</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('pizza-tray')}
                  >
                    Teglia Pizza (Ø30cm)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('bread-loaf')}
                  >
                    Pane in Cassetta
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('focaccia')}
                  >
                    Focaccia (40×30cm)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('round-cake')}
                  >
                    Torta Tonda (Ø24cm)
                  </Button>
                </div>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateDough}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                size="lg"
              >
                Calcola Quantità Impasto
              </Button>

              {/* Results */}
              {result !== null && (
                <div className="mt-8 space-y-6">
                  {/* Main Result */}
                  <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 p-8 text-center text-white shadow-lg">
                    <div className="mb-2 text-sm font-medium opacity-90">
                      Peso Impasto Necessario
                    </div>
                    <div className="mb-2 flex items-center justify-center gap-3">
                      <span className="text-7xl font-bold">{result.doughWeight.toFixed(0)}</span>
                      <span className="text-3xl">grammi</span>
                    </div>
                    <div className="mt-4 text-lg font-medium opacity-90">
                      Per riempire al {fillPercentage}% la teglia
                    </div>
                  </div>

                  {/* Details */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h4 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                      <Info className="h-5 w-5 text-indigo-600" />
                      Dettagli Calcolo
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between rounded-lg bg-gray-50 p-3 text-sm">
                        <span className="text-gray-700">Volume totale teglia:</span>
                        <span className="font-semibold">{result.volume.toFixed(2)} litri</span>
                      </div>
                      <div className="flex justify-between rounded-lg bg-gray-50 p-3 text-sm">
                        <span className="text-gray-700">Volume da riempire ({fillPercentage}%):</span>
                        <span className="font-semibold">{result.fillVolume.toFixed(2)} litri</span>
                      </div>
                      <div className="flex justify-between rounded-lg bg-gray-50 p-3 text-sm">
                        <span className="text-gray-700">Densità impasto:</span>
                        <span className="font-semibold">{gramsPerLiter} g/litro</span>
                      </div>
                      <div className="flex justify-between rounded-lg bg-indigo-50 p-4">
                        <span className="font-bold text-gray-900">Peso impasto finale:</span>
                        <span className="text-xl font-bold text-indigo-600">
                          {result.doughWeight.toFixed(0)}g
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-6">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Consigli Pratici
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>💡 Per pane in cassetta: riempi al 70-80% per una cupola perfetta</p>
                      <p>💡 Per focaccia: riempi all'80-85% per uno spessore uniforme</p>
                      <p>💡 Per torte alte: riempi al 50-60% per evitare fuoriuscite</p>
                      <p>💡 Aggiungi 10-15% in più se l'impasto è poco idratato</p>
                    </div>
                  </div>

                  {/* Common Pan Sizes */}
                  <div className="rounded-lg border border-gray-200 p-6">
                    <h4 className="mb-4 font-semibold text-gray-900">
                      Teglie Comuni
                    </h4>
                    <div className="grid gap-3 text-sm md:grid-cols-2">
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <span className="text-gray-700">Pizza Tonda Ø30cm:</span>
                        <span className="font-semibold">250-300g</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <span className="text-gray-700">Teglia 40×30cm:</span>
                        <span className="font-semibold">800-1000g</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <span className="text-gray-700">Pane Cassetta 25cm:</span>
                        <span className="font-semibold">600-700g</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <span className="text-gray-700">Torta Ø24cm:</span>
                        <span className="font-semibold">500-600g</span>
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
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
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
