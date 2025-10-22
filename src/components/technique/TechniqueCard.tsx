'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, Wrench, Lightbulb } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Technique } from '@/sanity/lib/types'

interface TechniqueCardProps {
  technique: Technique
  index?: number
}

const difficultyLabels = {
  base: 'Base',
  intermedio: 'Intermedio',
  avanzato: 'Avanzato',
  professionale: 'Professionale'
}

const difficultyColors = {
  base: 'bg-green-500',
  intermedio: 'bg-yellow-500',
  avanzato: 'bg-red-500',
  professionale: 'bg-purple-500'
}

export function TechniqueCard({ technique, index = 0 }: TechniqueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/tecniche/${technique.slug.current}`} className="block h-full">
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-100">
          {/* Immagine - aspect ratio più largo */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {technique.mainImageUrl ? (
              <Image
                src={technique.mainImageUrl}
                alt={technique.mainImageAlt || technique.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                <BookOpen className="h-16 w-16 text-blue-300" />
              </div>
            )}
            
            {/* Badge difficoltà */}
            {technique.difficulty && (
              <div className="absolute left-5 top-5">
                <span className={`rounded-full ${
                  difficultyColors[technique.difficulty] || ''
                } px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm`}>
                  {difficultyLabels[technique.difficulty] || technique.difficulty}
                </span>
              </div>
            )}

           
          </div>

          {/* Contenuto - più padding */}
          <div className="flex flex-1 flex-col p-6">
            {/* Categoria */}
            {technique.category && (
              <div className="mb-3">
                <span className="rounded-full bg-blue-900/90 px-4 py-1.5 text-sm font-semibold text-white">
                  {technique.category}
                </span>
              </div>
            )}

            {/* Titolo - più grande e bold */}
            <h3 className="mb-4 line-clamp-2 text-xl font-bold leading-tight text-primary-900 transition-colors group-hover:text-blue-600">
              {technique.title}
            </h3>

            {/* Meta info - icone più grandi */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {technique.executionTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{technique.executionTime} min</span>
                </div>
              )}
              {technique.equipment && technique.equipment.length > 0 && (
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{technique.equipment.length} strumenti</span>
                </div>
              )}
              {technique.steps && technique.steps.length > 0 && (
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{technique.steps.length} passaggi</span>
                </div>
              )}
            </div>

            {/* Excerpt */}
            {technique.excerpt && (
              <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                {technique.excerpt}
              </p>
            )}

            {/* Tags se presenti */}
            {technique.tags && technique.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {technique.tags.slice(0, 3).map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Footer con CTA */}
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