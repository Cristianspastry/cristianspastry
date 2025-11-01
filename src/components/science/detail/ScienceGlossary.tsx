'use client'

import { BookMarked } from 'lucide-react'
import type { GlossaryTerm } from '@/sanity/lib/types'

interface ScienceGlossaryProps {
  terms: GlossaryTerm[]
}

export default function ScienceGlossary({ terms }: ScienceGlossaryProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
          <BookMarked className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Glossario</h2>
      </div>

      <div className="space-y-4">
        {terms.map((term, index) => (
          <div key={index} className="rounded-lg border-l-4 border-indigo-500 bg-indigo-50/50 p-4">
            <h3 className="mb-2 text-lg font-bold text-indigo-900">{term.term}</h3>
            <p className="text-gray-700">{term.definition}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
