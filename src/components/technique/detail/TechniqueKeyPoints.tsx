'use client'

import { Sparkles } from 'lucide-react'
import type { KeyPoint } from '@/sanity/lib/types'

interface TechniqueKeyPointsProps {
  keyPoints: KeyPoint[]
}

export default function TechniqueKeyPoints({ keyPoints }: TechniqueKeyPointsProps) {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 p-8 shadow-lg border-2 border-yellow-200">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
          <Sparkles className="h-6 w-6 text-yellow-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Punti Chiave</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {keyPoints.map((keyPoint, index) => (
          <div
            key={index}
            className="flex gap-3 rounded-xl bg-white p-4 shadow-sm border border-yellow-100 transition-all hover:shadow-md"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-sm font-bold text-yellow-600">
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed font-semibold">{keyPoint.point}</p>
              {keyPoint.explanation && (
                <p className="mt-2 text-sm text-gray-600">{keyPoint.explanation}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
