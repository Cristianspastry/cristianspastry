'use client'

import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Layers } from 'lucide-react'
import type { Variation } from '@/sanity/lib/types'

interface TechniqueVariationsProps {
  variations: Variation[]
}

export default function TechniqueVariations({ variations }: TechniqueVariationsProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
          <Layers className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Variazioni</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {variations.map((variation, index) => (
          <div
            key={index}
            className="rounded-xl border-2 border-purple-100 bg-purple-50/50 p-6 transition-all hover:border-purple-200 hover:shadow-md"
          >
            {variation.imageUrl && (
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                <Image
                  src={variation.imageUrl}
                  alt={variation.imageAlt || variation.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <h3 className="mb-3 text-xl font-bold text-gray-900">{variation.name}</h3>
            <div className="prose prose-sm max-w-none text-gray-700">
              <PortableText
                value={variation.description}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="leading-relaxed">{children}</p>
                    ),
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
