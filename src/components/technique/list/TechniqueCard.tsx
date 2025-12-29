'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, Wrench, Lightbulb } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Technique, TechniquePreview } from '@/sanity/lib/types'

interface TechniqueCardProps {
  technique: Technique | TechniquePreview
  index?: number
}

const difficultyLabels: Record<string, string> = {
  base: 'Base',
  intermedio: 'Intermedio',
  avanzato: 'Avanzato',
  professionale: 'Professionale'
}

const difficultyColors: Record<string, string> = {
  base: 'bg-green-600',
  intermedio: 'bg-yellow-600',
  avanzato: 'bg-red-600',
  professionale: 'bg-purple-600'
}

export function TechniqueCard({ technique, index = 0 }: TechniqueCardProps) {
  // Type guard to check if it's a full Technique
  const isFullTechnique = 'mainImageUrl' in technique
  const imageUrl = isFullTechnique ? technique.mainImageUrl : (technique as TechniquePreview).imageUrl
  const imageAlt = isFullTechnique ? technique.mainImageAlt : technique.title

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/tecniche/${technique.slug.current}`} className="block h-full">
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-100">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                <BookOpen className="h-16 w-16 text-blue-300" />
              </div>
            )}

            {/* Difficulty Badge */}
            {technique.difficulty && (
              <div className="absolute left-5 top-5">
                <span
                  className={`rounded-full ${difficultyColors[technique.difficulty] ?? 'bg-gray-600'
                    } px-4 py-2 text-sm font-semibold text-white shadow-md`}
                >

                  {difficultyLabels[technique.difficulty] ?? technique.difficulty}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            {/* Category */}
            {isFullTechnique && technique.category && (
              <div className="mb-3">
                <span className="rounded-full bg-blue-900/90 px-4 py-1.5 text-sm font-semibold text-white">
                  {technique.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="mb-4 line-clamp-2 text-xl font-bold leading-tight text-primary-900 transition-colors group-hover:text-blue-600">
              {technique.title}
            </h3>

            {/* Meta Info */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-700">
              {technique.executionTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{technique.executionTime} min</span>
                </div>
              )}
              {isFullTechnique && technique.equipment && technique.equipment.length > 0 && (
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{technique.equipment.length} strumenti</span>
                </div>
              )}
              {isFullTechnique && technique.steps && technique.steps.length > 0 && (
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{technique.steps.length} passaggi</span>
                </div>
              )}
            </div>

            {/* Excerpt */}
            {technique.excerpt && (
              <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-700">
                {technique.excerpt}
              </p>
            )}

            {/* Tags */}
            {isFullTechnique && technique.tags && technique.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {technique.tags.slice(0, 3).map((tag: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {technique.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{technique.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Footer CTA */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm font-bold text-primary-900 transition-colors group-hover:text-blue-600">
                Scopri la tecnica
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-700">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
