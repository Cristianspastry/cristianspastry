'use client'

import { Clock, Wrench, Lightbulb, DollarSign, Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Technique } from '@/sanity/lib/types'

interface TechniqueInfoProps {
  technique: Technique
}

export default function TechniqueInfo({ technique }: TechniqueInfoProps) {
  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900">Informazioni</h2>

      <div className="space-y-4">
        {/* Execution Time */}
        {technique.executionTime && (
          <div className="flex items-start gap-3 border-b border-gray-100 pb-4">
            <Clock className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Tempo di Esecuzione</p>
              <p className="text-lg font-bold text-gray-900">{technique.executionTime} minuti</p>
            </div>
          </div>
        )}

        {/* Equipment Count */}
        {technique.equipment && technique.equipment.length > 0 && (
          <div className="flex items-start gap-3 border-b border-gray-100 pb-4">
            <Wrench className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Strumenti Necessari</p>
              <p className="text-lg font-bold text-gray-900">
                {technique.equipment.length} {technique.equipment.length === 1 ? 'strumento' : 'strumenti'}
              </p>
            </div>
          </div>
        )}

        {/* Steps Count */}
        {technique.steps && technique.steps.length > 0 && (
          <div className="flex items-start gap-3 border-b border-gray-100 pb-4">
            <Lightbulb className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Passaggi</p>
              <p className="text-lg font-bold text-gray-900">
                {technique.steps.length} {technique.steps.length === 1 ? 'passaggio' : 'passaggi'}
              </p>
            </div>
          </div>
        )}

        {/* Estimated Cost */}
        {technique.estimatedCost && (
          <div className="flex items-start gap-3 border-b border-gray-100 pb-4">
            <DollarSign className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Costo Stimato</p>
              <p className="text-lg font-bold text-gray-900">
                {technique.estimatedCost.currency} {technique.estimatedCost.value}
              </p>
            </div>
          </div>
        )}

        {/* Difficulty Badge */}
        {technique.difficulty && (
          <div className="border-b border-gray-100 pb-4">
            <p className="mb-2 text-sm font-semibold text-gray-700">Difficoltà</p>
            <Badge
              className={`
                ${technique.difficulty === 'base' && 'bg-green-500'}
                ${technique.difficulty === 'intermedio' && 'bg-yellow-500'}
                ${technique.difficulty === 'avanzato' && 'bg-red-500'}
                ${technique.difficulty === 'professionale' && 'bg-purple-500'}
                text-white
              `}
            >
              {technique.difficulty.charAt(0).toUpperCase() + technique.difficulty.slice(1)}
            </Badge>
          </div>
        )}

        {/* Video Tutorial */}
        {/* Video Tutorial */}
        {technique.videoTutorial && (<a

          href = { technique.videoTutorial }
    target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700"
  >
        <Play className="h-5 w-5" />
        <span className="font-semibold">Guarda il Video Tutorial</span>
      </a>
)}
    </div>
    </div >
  )
}