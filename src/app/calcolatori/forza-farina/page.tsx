'use client'

import { useState } from 'react'
import PageTransition from '@/components/shared/PageTransition'
import { Wheat, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FlourMixResult {
  flour1Grams: number
  flour2Grams: number
  flour1Percentage: number
  flour2Percentage: number
  totalFlour: number
  targetW: number
}

export default function ForzaFarinaPage() {
  // Inputs
  const [flour1W, setFlour1W] = useState<string>('180')
  const [flour2W, setFlour2W] = useState<string>('360')
  const [targetW, setTargetW] = useState<string>('280')
  const [totalFlour, setTotalFlour] = useState<string>('1000')

  // Result
  const [result, setResult] = useState<FlourMixResult | null>(null)

  const calculateMix = () => {
    const w1 = parseFloat(flour1W)
    const w2 = parseFloat(flour2W)
    const wTarget = parseFloat(targetW)
    const total = parseFloat(totalFlour)

    if (isNaN(w1) || isNaN(w2) || isNaN(wTarget) || isNaN(total)) return

    // Validation
    if (wTarget < Math.min(w1, w2) || wTarget > Math.max(w1, w2)) {
      alert('La forza W desiderata deve essere tra le due farine!')
      return
    }

    // Formula: (W1 * X) + (W2 * Y) = W_target
    // Where: X + Y = 1 (percentages sum to 100%)
    // Solving: X = (W2 - W_target) / (W2 - W1)
    //          Y = (W_target - W1) / (W2 - W1)

    const flour1Percentage = ((w2 - wTarget) / (w2 - w1)) * 100
    const flour2Percentage = ((wTarget - w1) / (w2 - w1)) * 100

    const flour1Grams = (flour1Percentage / 100) * total
    const flour2Grams = (flour2Percentage / 100) * total

    setResult({
      flour1Grams: flour1Grams,
      flour2Grams: flour2Grams,
      flour1Percentage: flour1Percentage,
      flour2Percentage: flour2Percentage,
      totalFlour: total,
      targetW: wTarget
    })
  }

  const resetCalculator = () => {
    setFlour1W('180')
    setFlour2W('360')
    setTargetW('280')
    setTotalFlour('1000')
    setResult(null)
  }

  const applyPreset = (preset: string) => {
    switch(preset) {
      case 'pizza-napoletana':
        setFlour1W('260')
        setFlour2W('360')
        setTargetW('300')
        setTotalFlour('1000')
        break
      case 'pane-comune':
        setFlour1W('180')
        setFlour2W('280')
        setTargetW('220')
        setTotalFlour('1000')
        break
      case 'panettone':
        setFlour1W('300')
        setFlour2W('380')
        setTargetW('350')
        setTotalFlour('1000')
        break
      case 'baguette':
        setFlour1W('220')
        setFlour2W('300')
        setTargetW('260')
        setTotalFlour('1000')
        break
      case 'brioche':
        setFlour1W('240')
        setFlour2W('320')
        setTargetW('280')
        setTotalFlour('1000')
        break
    }
  }

  const getWStrengthInfo = (w: number): { label: string; color: string; description: string } => {
    if (w < 170) {
      return {
        label: 'Farina Debole',
        color: 'text-yellow-600 bg-yellow-50',
        description: 'Biscotti, grissini, cialde'
      }
    } else if (w >= 170 && w < 250) {
      return {
        label: 'Farina Media',
        color: 'text-green-600 bg-green-50',
        description: 'Pane comune, focaccia, pizza in teglia'
      }
    } else if (w >= 250 && w < 310) {
      return {
        label: 'Farina Forte',
        color: 'text-blue-600 bg-blue-50',
        description: 'Pizza napoletana, pane francese, babà'
      }
    } else if (w >= 310 && w < 370) {
      return {
        label: 'Farina Molto Forte',
        color: 'text-indigo-600 bg-indigo-50',
        description: 'Panettone, pandoro, brioche ricche'
      }
    } else {
      return {
        label: 'Farina Manitoba',
        color: 'text-purple-600 bg-purple-50',
        description: 'Grandi lievitati, impasti molto ricchi'
      }
    }
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
                Mix Forza W Farina
              </h1>
              <p className="text-amber-100">
                Crea il mix perfetto miscelando farine con diversa forza W
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
            <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                <div className="text-sm text-amber-900">
                  <p className="mb-2 font-semibold">Cos'è la Forza W?</p>
                  <p className="mb-2">
                    La <strong>forza W</strong> misura la capacità della farina di resistere alla lievitazione
                    e trattenere i gas. Più alto è il valore W, più la farina è "forte" e adatta a lievitazioni lunghe
                    e impasti ricchi di grassi e zuccheri.
                  </p>
                  <p>
                    Questo calcolatore ti permette di <strong>mescolare due farine</strong> con forza W diversa
                    per ottenere una forza W intermedia desiderata.
                  </p>
                </div>
              </div>
            </div>

            {/* Calculator Card */}
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Calcola il Mix di Farine
              </h2>

              {/* Inputs */}
              <div className="mb-8 space-y-6">
                {/* Two Flours W Values */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="flour1-w" className="mb-2 font-semibold">
                      Farina 1 - Forza W
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="flour1-w"
                        type="number"
                        value={flour1W}
                        onChange={(e) => setFlour1W(e.target.value)}
                        className="text-lg"
                        min="90"
                        max="450"
                        step="10"
                      />
                      <span className="flex items-center text-gray-600">W</span>
                    </div>
                    {flour1W && (
                      <p className={`mt-1 rounded px-2 py-1 text-xs font-medium ${getWStrengthInfo(parseFloat(flour1W)).color}`}>
                        {getWStrengthInfo(parseFloat(flour1W)).label}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="flour2-w" className="mb-2 font-semibold">
                      Farina 2 - Forza W
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="flour2-w"
                        type="number"
                        value={flour2W}
                        onChange={(e) => setFlour2W(e.target.value)}
                        className="text-lg"
                        min="90"
                        max="450"
                        step="10"
                      />
                      <span className="flex items-center text-gray-600">W</span>
                    </div>
                    {flour2W && (
                      <p className={`mt-1 rounded px-2 py-1 text-xs font-medium ${getWStrengthInfo(parseFloat(flour2W)).color}`}>
                        {getWStrengthInfo(parseFloat(flour2W)).label}
                      </p>
                    )}
                  </div>
                </div>

                {/* Target W and Total Flour */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="target-w" className="mb-2 font-semibold">
                      Forza W Desiderata
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="target-w"
                        type="number"
                        value={targetW}
                        onChange={(e) => setTargetW(e.target.value)}
                        className="text-lg font-bold text-amber-600"
                        min="90"
                        max="450"
                        step="10"
                      />
                      <span className="flex items-center text-gray-600">W</span>
                    </div>
                    {targetW && (
                      <p className={`mt-1 rounded px-2 py-1 text-xs font-medium ${getWStrengthInfo(parseFloat(targetW)).color}`}>
                        {getWStrengthInfo(parseFloat(targetW)).label}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="total-flour" className="mb-2 font-semibold">
                      Farina Totale Necessaria
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="total-flour"
                        type="number"
                        value={totalFlour}
                        onChange={(e) => setTotalFlour(e.target.value)}
                        className="text-lg"
                        min="100"
                        step="100"
                      />
                      <span className="flex items-center text-gray-600">g</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Peso totale della farina nella tua ricetta
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mb-6 rounded-lg bg-amber-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Preset Rapidi:</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('pizza-napoletana')}
                  >
                    Pizza Napoletana (W 300)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('pane-comune')}
                  >
                    Pane Comune (W 220)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('panettone')}
                  >
                    Panettone (W 350)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('baguette')}
                  >
                    Baguette (W 260)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset('brioche')}
                  >
                    Brioche (W 280)
                  </Button>
                </div>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateMix}
                className="w-full bg-amber-600 hover:bg-amber-700"
                size="lg"
              >
                Calcola Mix di Farine
              </Button>

              {/* Results */}
              {result !== null && (
                <div className="mt-8 space-y-6">
                  {/* Main Result Card */}
                  <div className="rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 text-white shadow-lg">
                    <div className="mb-6 text-center">
                      <div className="mb-2 text-sm font-medium opacity-90">
                        Mix per ottenere W {result.targetW}
                      </div>
                      <div className="text-lg font-semibold">
                        con {result.totalFlour}g di farina totale
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Flour 1 */}
                      <div className="rounded-lg bg-white/20 p-4 backdrop-blur">
                        <div className="mb-2 text-sm opacity-90">
                          Farina 1 (W {flour1W})
                        </div>
                        <div className="mb-2 flex items-baseline gap-2">
                          <span className="text-4xl font-bold">{result.flour1Grams.toFixed(0)}</span>
                          <span className="text-xl">grammi</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="opacity-90">Percentuale:</span>
                          <span className="font-bold">{result.flour1Percentage.toFixed(1)}%</span>
                        </div>
                      </div>

                      {/* Flour 2 */}
                      <div className="rounded-lg bg-white/20 p-4 backdrop-blur">
                        <div className="mb-2 text-sm opacity-90">
                          Farina 2 (W {flour2W})
                        </div>
                        <div className="mb-2 flex items-baseline gap-2">
                          <span className="text-4xl font-bold">{result.flour2Grams.toFixed(0)}</span>
                          <span className="text-xl">grammi</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="opacity-90">Percentuale:</span>
                          <span className="font-bold">{result.flour2Percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Formula Explanation */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h4 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                      <Info className="h-5 w-5 text-amber-600" />
                      Come Funziona il Calcolo
                    </h4>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="mb-2 text-sm font-semibold text-gray-700">Formula Matematica:</p>
                        <code className="block rounded bg-gray-100 p-2 text-xs font-mono">
                          (W1 × %1) + (W2 × %2) = W_target
                        </code>
                        <code className="mt-1 block rounded bg-gray-100 p-2 text-xs font-mono">
                          %1 + %2 = 100%
                        </code>
                      </div>

                      <div className="rounded-lg bg-amber-50 p-4 text-sm">
                        <p className="mb-2 font-semibold text-gray-900">Verifica:</p>
                        <p className="text-gray-700">
                          ({flour1W} × {result.flour1Percentage.toFixed(1)}%) +
                          ({flour2W} × {result.flour2Percentage.toFixed(1)}%) =
                          <span className="font-bold text-amber-600"> W {result.targetW}</span>
                        </p>
                      </div>

                      <div className="text-xs text-gray-500">
                        <p>✓ Totale percentuali: {(result.flour1Percentage + result.flour2Percentage).toFixed(1)}%</p>
                        <p>✓ Totale grammi: {(result.flour1Grams + result.flour2Grams).toFixed(0)}g</p>
                      </div>
                    </div>
                  </div>

                  {/* Usage Instructions */}
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      📋 Come Usare Questo Mix
                    </h4>
                    <ol className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2">
                        <span className="font-bold">1.</span>
                        <span>Pesa <strong>{result.flour1Grams.toFixed(0)}g</strong> della farina più debole (W {flour1W})</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold">2.</span>
                        <span>Pesa <strong>{result.flour2Grams.toFixed(0)}g</strong> della farina più forte (W {flour2W})</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold">3.</span>
                        <span>Setaccia insieme le due farine per mescolarle uniformemente</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold">4.</span>
                        <span>Usa questo mix nella tua ricetta come farina unica con W {result.targetW}</span>
                      </li>
                    </ol>
                  </div>

                  {/* Strength Guide */}
                  <div className="rounded-lg border border-gray-200 p-6">
                    <h4 className="mb-4 font-semibold text-gray-900">
                      Guida Forza W
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-3 text-sm">
                        <div>
                          <div className="font-semibold text-yellow-900">W 90-170</div>
                          <div className="text-xs text-yellow-700">Farina Debole</div>
                        </div>
                        <div className="text-xs text-yellow-700">Biscotti, grissini</div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 text-sm">
                        <div>
                          <div className="font-semibold text-green-900">W 170-250</div>
                          <div className="text-xs text-green-700">Farina Media</div>
                        </div>
                        <div className="text-xs text-green-700">Pane comune, focaccia</div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 text-sm">
                        <div>
                          <div className="font-semibold text-blue-900">W 250-310</div>
                          <div className="text-xs text-blue-700">Farina Forte</div>
                        </div>
                        <div className="text-xs text-blue-700">Pizza napoletana, babà</div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-3 text-sm">
                        <div>
                          <div className="font-semibold text-indigo-900">W 310-370</div>
                          <div className="text-xs text-indigo-700">Farina Molto Forte</div>
                        </div>
                        <div className="text-xs text-indigo-700">Panettone, pandoro</div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3 text-sm">
                        <div>
                          <div className="font-semibold text-purple-900">W 370+</div>
                          <div className="text-xs text-purple-700">Manitoba</div>
                        </div>
                        <div className="text-xs text-purple-700">Grandi lievitati</div>
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
                  className="flex-1 bg-amber-600 hover:bg-amber-700"
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
