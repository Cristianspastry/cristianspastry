'use client'

import { PortableText } from '@portabletext/react'
import { CheckCircle } from 'lucide-react'

interface ScienceConclusionProps {
  content: any[]
}

export default function ScienceConclusion({ content }: ScienceConclusionProps) {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-lg border-2 border-green-200">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Conclusione</h2>
      </div>

      <div className="prose prose-lg max-w-none">
        <PortableText
          value={content}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
              ),
            },
            marks: {
              strong: ({ children }) => (
                <strong className="font-bold text-gray-900">{children}</strong>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>
              ),
            },
          }}
        />
      </div>
    </section>
  )
}
