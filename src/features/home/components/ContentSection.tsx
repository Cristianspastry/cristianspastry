'use client'

import Link from 'next/link'
import type { Technique, Science } from '@/sanity/lib/types'
import { TechniqueGrid } from '../technique/TechniqueGrid'
import { ScienceGrid } from '../science/ScienceGrid'

interface ContentSectionProps {
  title: string
  description: string
  items: Technique[] | Science[]
  contentType: 'technique' | 'science'
  viewAllText: string
  backgroundColor?: string
  columns?: 2 | 3 | 4
}

export function ContentSection({
  title,
  description,
  items,
  contentType,
  viewAllText,
  backgroundColor = 'bg-white',
  columns = 3,
}: ContentSectionProps) {
  if (!items || items.length === 0) return null

  const viewAllLink = contentType === 'technique' ? '/tecniche' : '/scienza'

  return (
    <section className={`${backgroundColor} py-16 md:py-24`}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-900 md:text-4xl">
            {title}
          </h2>
          <p className="text-gray-600">{description}</p>
        </div>

        {contentType === 'technique' ? (
          <TechniqueGrid techniques={items as Technique[]} columns={columns} />
        ) : (
          <ScienceGrid articles={items as Science[]} columns={columns} />
        )}

        <div className="mt-12 text-center">
          <Link
            href={viewAllLink}
            className={`inline-flex items-center gap-2 font-medium transition-colors ${
              contentType === 'technique'
                ? 'text-blue-600 hover:text-blue-700'
                : 'text-purple-600 hover:text-purple-700'
            }`}
          >
            {viewAllText}
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}