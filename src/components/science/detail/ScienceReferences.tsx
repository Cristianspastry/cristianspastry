'use client'

import { BookOpen, Link as LinkIcon } from 'lucide-react'
import type { Reference } from '@/sanity/lib/types'

interface ScienceReferencesProps {
  references: Reference[]
}

const referenceTypeLabels: Record<string, string> = {
  book: 'Libro',
  article: 'Articolo',
  website: 'Sito Web',
  video: 'Video',
  other: 'Altro',
}

export default function ScienceReferences({ references }: ScienceReferencesProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
          <BookOpen className="h-6 w-6 text-gray-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Riferimenti</h2>
      </div>

      <ol className="space-y-4">
        {references.map((ref, index) => (
          <li key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-700">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{ref.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold">
                    {referenceTypeLabels[ref.type] || ref.type}
                  </span>
                  {ref.author && <span>Autore: {ref.author}</span>}
                  {ref.year && <span>Anno: {ref.year}</span>}
                </div>
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span>Vai alla fonte</span>
                  </a>
                )}
                {ref.notes && (
                  <p className="mt-2 text-sm italic text-gray-600">{ref.notes}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
