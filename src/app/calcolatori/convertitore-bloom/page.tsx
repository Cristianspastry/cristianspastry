'use client'

import { useState, useEffect } from 'react'
import PageTransition from '@/components/shared/PageTransition'
import { Droplet, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ConvertitoreBloomPage() {
  // First Calculator - Bloom Conversion
  const [recipeBloom, setRecipeBloom] = useState<string>('160')
  const [recipeGelatin, setRecipeGelatin] = useState<string>('10')
  const [yourBloom, setYourBloom] = useState<string>('160')

  // Second Calculator - Hydration
  const [gelatinAmount, setGelatinAmount] = useState<string>('10')
  const [hydrationBloom, setHydrationBloom] = useState<string>('160')

  // Results
  const [convertedGelatin, setConvertedGelatin] = useState<number | null>(null)
  const [waterAmount, setWaterAmount] = useState<number | null>(null)
  const [totalMass, setTotalMass] = useState<number | null>(null)

  // Convert gelatin between bloom strengths
  const calculateConversion = () => {
    const recipeB = parseFloat(recipeBloom)
    const recipeG = parseFloat(recipeGelatin)
    const yourB = parseFloat(yourBloom)

    if (isNaN(recipeB) || isNaN(recipeG) || isNaN(yourB)) return

    // Formula: (Recipe Weight × Recipe Bloom) ÷ Your Bloom
    const converted = (recipeG * recipeB) / yourB
    setConvertedGelatin(converted)

    // Auto-update hydration calculator with result
    setGelatinAmount(converted.toFixed(1))
  }

  // Calculate hydration
  const calculateHydration = () => {
    const gelatin = parseFloat(gelatinAmount)
    const bloom = parseFloat(hydrationBloom)

    if (isNaN(gelatin) || isNaN(bloom)) return

    // Hydration ratio depends on bloom strength
    let ratio = 5 // Default 5:1 for 160-200 Bloom

    if (bloom < 150) {
      ratio = 6 // Lower bloom needs more water
    } else if (bloom >= 200) {
      ratio = 4 // Higher bloom needs less water
    }

    const water = gelatin * ratio
    const total = gelatin + water

    setWaterAmount(water)
    setTotalMass(total)
  }

  // Auto-calculate when bloom changes in hydration calculator
  useEffect(() => {
    if (gelatinAmount && hydrationBloom) {
      calculateHydration()
    }
  }, [hydrationBloom])

  const resetConversion = () => {
    setRecipeBloom('160')
    setRecipeGelatin('10')
    setYourBloom('160')
    setConvertedGelatin(null)
  }

  const resetHydration = () => {
    setGelatinAmount('10')
    setHydrationBloom('160')
    setWaterAmount(null)
    setTotalMass(null)
  }

  const applyPreset = (preset: string) => {
    switch(preset) {
      case 'panna-cotta':
        setRecipeBloom('160')
        setRecipeGelatin('8')
        break
      case 'mousse':
        setRecipeBloom('160')
        setRecipeGelatin('12')
        break
      case 'bavarian':
        setRecipeBloom('160')
        setRecipeGelatin('15')
        break
      case 'jelly':
        setRecipeBloom('200')
        setRecipeGelatin('20')
        break
    }
  }

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-900 via-pink-800 to-pink-900 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/calcolatori"
            className="mb-6 inline-flex items-center text-pink-100 hover:text-white"
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
                Convertitore Bloom Gelatina
              </h1>
              <p className="text-pink-100">
                Converti gelatine con forza Bloom diversa e calcola l'idratazione
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Info Box */}
            <div className="rounded-lg border border-pink-200 bg-pink-50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-pink-600" />
                <div className="text-sm text-pink-900">
                  <p className="mb-2 font-semibold">Cos'è il Bloom?</p>
                  <p className="mb-2">
                    Il <strong>Bloom</strong> è l'unità di misura che indica la forza gelificante della gelatina.
                    Più alto è il valore Bloom, più forte è la gelatina. I valori comuni sono:
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li><strong>130° Bloom:</strong> Gelatina debole (alcuni fogli commerciali)</li>
                    <li><strong>160° Bloom:</strong> Standard per pasticceria (più comune in ricette professionali)</li>
                    <li><strong>200° Bloom:</strong> Gelatina forte (gelatina in polvere americana)</li>
                    <li><strong>240° Bloom:</strong> Gelatina molto forte (uso industriale)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* First Calculator - Bloom Conversion */}
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-600">
                  1
                </span>
                Conversione Bloom
              </h2>

              <div className="mb-6 space-y-4">
                {/* Recipe Bloom */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="recipe-bloom" className="mb-2 font-semibold">
                      Bloom della Ricetta
                    </Label>
                    <Select value={recipeBloom} onValueChange={setRecipeBloom}>
                      <SelectTrigger id="recipe-bloom">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="130">130° Bloom</SelectItem>
                        <SelectItem value="160">160° Bloom (Standard)</SelectItem>
                        <SelectItem value="200">200° Bloom</SelectItem>
                        <SelectItem value="240">240° Bloom</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="mt-1 text-xs text-gray-500">
                      Il Bloom indicato nella ricetta originale
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="recipe-gelatin" className="mb-2 font-semibold">
                      Gelatina della Ricetta
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="recipe-gelatin"
                        type="number"
                        value={recipeGelatin}
                        onChange={(e) => setRecipeGelatin(e.target.value)}
                        className="text-lg"
                        min="0"
                        step="0.5"
                      />
                      <span className="flex items-center text-gray-600">g</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Quantità indicata nella ricetta
                    </p>
                  </div>
                </div>

                {/* Your Bloom */}
                <div>
                  <Label htmlFor="your-bloom" className="mb-2 font-semibold">
                    Bloom della Tua Gelatina
                  </Label>
                  <Select value={yourBloom} onValueChange={setYourBloom}>
                    <SelectTrigger id="your-bloom">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="130">130° Bloom</SelectItem>
                      <SelectItem value="160">160° Bloom (Standard)</SelectItem>
                      <SelectItem value="200">200° Bloom</SelectItem>
                      <SelectItem value="240">240° Bloom</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="mt-1 text-xs text-gray-500">
                    Il Bloom della gelatina che hai a disposizione
                  </p>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mb-6 rounded-lg bg-pink-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Preset Ricette Comuni:</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('panna-cotta')}
                  >
                    Panna Cotta (8g)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('mousse')}
                  >
                    Mousse (12g)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('bavarian')}
                  >
                    Bavarese (15g)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('jelly')}
                  >
                    Gelatina (20g)
                  </Button>
                </div>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateConversion}
                className="w-full bg-pink-600 hover:bg-pink-700"
                size="lg"
              >
                Calcola Conversione
              </Button>

              {/* Conversion Result */}
              {convertedGelatin !== null && (
                <div className="mt-6">
                  <div className="rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 p-6 text-center text-white shadow-lg">
                    <div className="mb-2 text-sm font-medium opacity-90">
                      Gelatina Necessaria ({yourBloom}° Bloom)
                    </div>
                    <div className="mb-2 flex items-center justify-center gap-3">
                      <span className="text-6xl font-bold">{convertedGelatin.toFixed(1)}</span>
                      <span className="text-2xl">grammi</span>
                    </div>
                    <div className="mt-4 rounded-lg bg-white/20 px-4 py-2 text-sm backdrop-blur">
                      Formula: ({recipeGelatin}g × {recipeBloom}°) ÷ {yourBloom}° = {convertedGelatin.toFixed(1)}g
                    </div>
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <div className="mt-4">
                <Button
                  onClick={resetConversion}
                  variant="outline"
                  className="w-full"
                >
                  Resetta Conversione
                </Button>
              </div>
            </div>

            {/* Second Calculator - Hydration */}
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-600">
                  2
                </span>
                Calcolo Idratazione Gelatina
              </h2>

              <div className="mb-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="gelatin-amount" className="mb-2 font-semibold">
                      Peso Gelatina (Foglio o Polvere)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="gelatin-amount"
                        type="number"
                        value={gelatinAmount}
                        onChange={(e) => setGelatinAmount(e.target.value)}
                        className="text-lg"
                        min="0"
                        step="0.5"
                      />
                      <span className="flex items-center text-gray-600">g</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Peso della gelatina secca (da calcolo precedente o ricetta)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="hydration-bloom" className="mb-2 font-semibold">
                      Bloom Gelatina
                    </Label>
                    <Select value={hydrationBloom} onValueChange={setHydrationBloom}>
                      <SelectTrigger id="hydration-bloom">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="130">130° Bloom (Ratio 6:1)</SelectItem>
                        <SelectItem value="160">160° Bloom (Ratio 5:1)</SelectItem>
                        <SelectItem value="200">200° Bloom (Ratio 4:1)</SelectItem>
                        <SelectItem value="240">240° Bloom (Ratio 4:1)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="mt-1 text-xs text-gray-500">
                      Determina il rapporto di idratazione
                    </p>
                  </div>
                </div>
              </div>

              {/* Info about hydration */}
              <div className="mb-6 rounded-lg bg-blue-50 p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Info className="h-4 w-4 text-blue-600" />
                  Come Idratare la Gelatina
                </h4>
                <ol className="list-inside list-decimal space-y-1 text-sm text-gray-700">
                  <li>Pesa la gelatina in fogli o polvere</li>
                  <li>Immergi in acqua fredda per 5-10 minuti</li>
                  <li>Strizza i fogli o scola la polvere (mantenendo l'acqua assorbita)</li>
                  <li>Sciogli a 50-60°C prima di incorporare nel composto</li>
                </ol>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateHydration}
                className="w-full bg-pink-600 hover:bg-pink-700"
                size="lg"
              >
                Calcola Acqua Necessaria
              </Button>

              {/* Hydration Results */}
              {waterAmount !== null && totalMass !== null && (
                <div className="mt-6 space-y-4">
                  {/* Water Amount */}
                  <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
                    <div className="mb-4 text-center">
                      <div className="mb-1 text-sm font-medium opacity-90">
                        Acqua Necessaria
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-5xl font-bold">{waterAmount.toFixed(0)}</span>
                        <span className="text-xl">grammi</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 rounded-lg bg-white/20 p-3 backdrop-blur">
                      <div className="text-center">
                        <div className="text-xs opacity-90">Gelatina Secca</div>
                        <div className="text-lg font-bold">{gelatinAmount}g</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs opacity-90">Massa Totale</div>
                        <div className="text-lg font-bold">{totalMass.toFixed(0)}g</div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="rounded-lg border border-gray-200 p-6">
                    <h4 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                      <Info className="h-5 w-5 text-pink-600" />
                      Dettagli Idratazione
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between rounded-lg bg-gray-50 p-3 text-sm">
                        <span className="text-gray-700">Gelatina secca:</span>
                        <span className="font-semibold">{gelatinAmount}g</span>
                      </div>
                      <div className="flex justify-between rounded-lg bg-blue-50 p-3 text-sm">
                        <span className="text-gray-700">Acqua fredda:</span>
                        <span className="font-semibold">{waterAmount.toFixed(0)}g</span>
                      </div>
                      <div className="flex justify-between rounded-lg bg-gray-50 p-3 text-sm">
                        <span className="text-gray-700">
                          Rapporto ({hydrationBloom}° Bloom):
                        </span>
                        <span className="font-semibold">
                          {hydrationBloom === '130' && '6:1'}
                          {(hydrationBloom === '160') && '5:1'}
                          {(hydrationBloom === '200' || hydrationBloom === '240') && '4:1'}
                        </span>
                      </div>
                      <div className="flex justify-between rounded-lg bg-pink-50 p-4">
                        <span className="font-bold text-gray-900">Gelatina idratata totale:</span>
                        <span className="text-xl font-bold text-pink-600">
                          {totalMass.toFixed(0)}g
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Usage Tips */}
                  <div className="rounded-lg border border-pink-200 bg-pink-50 p-6">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      💡 Consigli d'Uso
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Temperatura:</strong> Non far bollire la gelatina! Max 60-70°C</p>
                      <p><strong>Timing:</strong> Aggiungi la gelatina quando il composto è a 40-50°C</p>
                      <p><strong>Miscelazione:</strong> Mescola bene per evitare grumi</p>
                      <p><strong>Alternative:</strong> Agar agar (3-4g sostituiscono 10g gelatina)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <div className="mt-4">
                <Button
                  onClick={resetHydration}
                  variant="outline"
                  className="w-full"
                >
                  Resetta Idratazione
                </Button>
              </div>
            </div>

            {/* Bloom Reference Guide */}
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              <h3 className="mb-6 text-xl font-bold text-gray-900">
                Guida Rapida Bloom
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border-2 border-pink-200 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">130° Bloom</h4>
                    <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
                      Debole
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-gray-600">
                    Gelatina più morbida e delicata
                  </p>
                  <p className="text-xs text-gray-500">
                    Rapporto idratazione: 6:1 (acqua:gelatina)
                  </p>
                </div>

                <div className="rounded-lg border-2 border-pink-400 bg-pink-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">160° Bloom</h4>
                    <span className="rounded-full bg-pink-600 px-3 py-1 text-xs font-semibold text-white">
                      Standard
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-gray-600">
                    Più usata in pasticceria professionale
                  </p>
                  <p className="text-xs text-gray-500">
                    Rapporto idratazione: 5:1 (acqua:gelatina)
                  </p>
                </div>

                <div className="rounded-lg border-2 border-pink-500 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">200° Bloom</h4>
                    <span className="rounded-full bg-pink-700 px-3 py-1 text-xs font-semibold text-white">
                      Forte
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-gray-600">
                    Gelatina in polvere americana (Knox)
                  </p>
                  <p className="text-xs text-gray-500">
                    Rapporto idratazione: 4:1 (acqua:gelatina)
                  </p>
                </div>

                <div className="rounded-lg border-2 border-pink-700 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">240° Bloom</h4>
                    <span className="rounded-full bg-pink-900 px-3 py-1 text-xs font-semibold text-white">
                      Molto Forte
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-gray-600">
                    Uso industriale e professionale
                  </p>
                  <p className="text-xs text-gray-500">
                    Rapporto idratazione: 4:1 (acqua:gelatina)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
