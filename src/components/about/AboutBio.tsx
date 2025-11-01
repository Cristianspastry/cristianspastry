'use client'

import { PortableText } from '@portabletext/react'
import { User } from 'lucide-react'
import type { Author } from '@/sanity/lib/types'

interface AboutBioProps {
  author: Author
}

export default function AboutBio({ author }: AboutBioProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100 md:p-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
          <User className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">La Mia Storia</h2>
      </div>

      <div className="prose prose-lg max-w-none">
        <PortableText
          value={author.bio}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="mb-6 text-lg leading-relaxed text-gray-700">{children}</p>
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
            },
            list: {
              bullet: ({ children }) => (
                <ul className="mb-6 ml-6 list-disc space-y-2 text-lg text-gray-700">{children}</ul>
              ),
              number: ({ children }) => (
                <ol className="mb-6 ml-6 list-decimal space-y-2 text-lg text-gray-700">{children}</ol>
              ),
            },
          }}
        />
      </div>
    </section>
  )
}
