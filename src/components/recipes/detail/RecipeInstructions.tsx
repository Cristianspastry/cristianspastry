'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'

import type { InstructionPhase } from '@/sanity/lib/types'
import { Button } from '@/components/ui/button'

interface RecipeInstructionsProps {
  instructions: InstructionPhase[]
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const toggleStep = (phaseIdx: number, stepIdx: number) => {
    const key = `${phaseIdx}-${stepIdx}`
    setCompletedSteps(prev => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }

  const isStepCompleted = (phaseIdx: number, stepIdx: number) => {
    return completedSteps.has(`${phaseIdx}-${stepIdx}`)
  }

  let globalStepNumber = 1

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-primary-900">Procedimento</h2>
        {completedSteps.size > 0 && (
          <Button
            variant="ghost"
            onClick={() => setCompletedSteps(new Set())}
            className="text-sm"
          >
            Reset progressi
          </Button>
        )}
      </div>

      {instructions.map((phase, phaseIdx) => (
        <Card key={phaseIdx} className="p-6">
          {/* Titolo fase se presente */}
          {phase.title && (
            <h3 className="mb-6 text-xl font-bold text-primary-900">
              {phase.title}
            </h3>
          )}

          {/* Steps */}
          <div className="space-y-6">
            {phase.steps.map((step, stepIdx) => {
              const stepNumber = globalStepNumber++
              const isCompleted = isStepCompleted(phaseIdx, stepIdx)

              return (
                <motion.div
                  key={stepIdx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: stepIdx * 0.1 }}
                  className={`group relative ${isCompleted ? 'opacity-60' : ''}`}
                >
                  <div className="flex gap-4">
                    {/* Numero step con checkbox */}
                    <button
                      onClick={() => toggleStep(phaseIdx, stepIdx)}
                      className="flex-shrink-0 transition-transform hover:scale-110"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900 text-lg font-bold text-white">
                          {stepNumber}
                        </div>
                      )}
                    </button>

                    {/* Contenuto step */}
                    <div className="flex-1">
                      <p className={`mb-4 text-lg leading-relaxed ${isCompleted ? 'line-through' : 'text-gray-900'}`}>
                        {step.description}
                      </p>

                      {/* Immagine step se presente */}
                      {step.image && (
                        <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
                          <Image
                            src={step.image.url}
                            alt={step.image.alt ?? `Passo ${stepNumber}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Tip se presente */}
                      {step.tip && (
                        <div className="flex gap-3 rounded-lg bg-yellow-50 p-4">
                          <Lightbulb className="h-5 w-5 flex-shrink-0 text-yellow-600" />
                          <p className="text-sm italic text-gray-700">{step.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Linea connettore */}
                  {stepIdx < phase.steps.length - 1 && (
                    <div className="ml-5 mt-2 h-6 w-0.5 bg-gray-200" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </Card>
      ))}
    </div>
  )
}