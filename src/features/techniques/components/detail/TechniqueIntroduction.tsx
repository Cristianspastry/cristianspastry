'use client'

import { PortableText } from '@portabletext/react'
import { BookOpen } from 'lucide-react'

interface TechniqueIntroductionProps {
  content: any[]
}

export default function TechniqueIntroduction({ content }: TechniqueIntroductionProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          <BookOpen className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Introduzione</h2>
      </div>

      <div className="prose prose-lg max-w-none">
        <PortableText
          value={content}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
              ),
              h2: ({ children }) => (
                <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-3 mt-6 text-xl font-bold text-gray-900">{children}</h3>
              ),
            },
            marks: {
              strong: ({ children }) => (
                <strong className="font-bold text-gray-900">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              code: ({ children }) => (
                <code className="rounded bg-gray-100 px-2 py-1 text-sm text-blue-600">
                  {children}
                </code>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>
              ),
              number: ({ children }) => (
                <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-700">{children}</ol>
              ),
            },
          }}
        />
      </div>
    </section>
  )
}
