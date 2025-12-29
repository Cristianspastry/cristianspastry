'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Beaker, Clock, BookMarked, FlaskConical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Science, SciencePreview } from '@/sanity/lib/types'

interface ScienceCardProps {
  science: Science | SciencePreview
  index?: number
}

const articleTypeLabels: Record<string, string> = {
  ingredienti: 'Ingredienti',
  processi: 'Processi',
  reazioni: 'Reazioni Chimiche',
  fisica: 'Fisica',
  'dietro-quinte': 'Dietro le Quinte',
  miti: 'Miti da Sfatare',
  storia: 'Storia',
}

const articleTypeColors: Record<string, string> = {
  ingredienti: 'bg-green-600',
  processi: 'bg-blue-700',
  reazioni: 'bg-purple-700',
  fisica: 'bg-cyan-700',
  'dietro-quinte': 'bg-orange-600',
  miti: 'bg-red-600',
  storia: 'bg-yellow-700',
}


const complexityLabels: Record<string, string> = {
  base: 'Base',
  intermedio: 'Intermedio',
  avanzato: 'Avanzato',
}

export function ScienceCard({ science, index = 0 }: ScienceCardProps) {
  // Handle both Science and SciencePreview types
  const isFullScience = 'sections' in science
  const imageUrl = isFullScience ? science.mainImageUrl : science.imageUrl
  const imageAlt = isFullScience ? science.mainImageAlt : undefined
  const fullScience = isFullScience ? science : null
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/scienza/${science.slug.current}`} className="block h-full">
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-100">
          {/* Immagine - aspect ratio più largo */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt || science.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
                <Beaker className="h-16 w-16 text-purple-300" />
              </div>
            )}

            {/* Badge tipo articolo */}
            {science.articleType && (
              <div className="absolute left-5 top-5">
                <span
                  className={`rounded-full ${articleTypeColors[science.articleType] ?? 'bg-purple-700'
                    } px-4 py-2 text-sm font-semibold text-white shadow-md`}
                >

                  {articleTypeLabels[science.articleType] ?? science.articleType}
                </span>
              </div>
            )}

            {/* Badge featured */}
            {science.featured && (
              <div className="absolute right-5 top-5">
                <span className="rounded-full bg-yellow-500/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  ⭐ In Evidenza
                </span>
              </div>
            )}
          </div>

          {/* Contenuto - più padding */}
          <div className="flex flex-1 flex-col p-6">
            {/* Titolo - più grande e bold */}
            <h3 className="mb-4 line-clamp-2 text-xl font-bold leading-tight text-primary-900 transition-colors group-hover:text-purple-600">
              {science.title}
            </h3>

            {/* Meta info - icone più grandi */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {science.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold">{science.readingTime} min</span>
                </div>
              )}
              {science.complexity && (
                <div className="flex items-center">
                  <span className="font-semibold lowercase text-gray-700">
                    {complexityLabels[science.complexity] ?? science.complexity}
                  </span>
                </div>
              )}
              {fullScience?.sections?.length && (
                <div className="flex items-center gap-2">
                  <BookMarked className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold">{fullScience.sections.length} sezioni</span>
                </div>
              )}
              {fullScience?.experiments?.length && (
                <div className="flex items-center gap-2">
                  <FlaskConical className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold">{fullScience.experiments.length} esperimenti</span>
                </div>
              )}
            </div>

            {/* Excerpt */}
            {science.excerpt && (
              <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-700">
                {science.excerpt}
              </p>
            )}

            {/* Tags se presenti */}
            {fullScience?.tags?.length && (
              <div className="mb-4 flex flex-wrap gap-2">
                {fullScience.tags.slice(0, 3).map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Footer con CTA */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm font-bold text-primary-900 transition-colors group-hover:text-purple-600">
                Leggi l&apos;articolo
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-700">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}