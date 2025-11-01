'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Science } from '@/sanity/lib/types'

interface ScienceCardProps {
  article: Science
  index?: number
}

const complexityLabels: Record<string, string> = {
  base: 'Base',
  intermedio: 'Intermedio',
  avanzato: 'Avanzato',
}

const complexityColors: Record<string, string> = {
  base: 'bg-green-500',
  intermedio: 'bg-yellow-500',
  avanzato: 'bg-red-500',
}

const articleTypeLabels: Record<string, string> = {
  ingredienti: 'Ingredienti',
  processi: 'Processi',
  reazioni: 'Reazioni',
  fisica: 'Fisica',
  'dietro-quinte': 'Dietro le Quinte',
  miti: 'Miti',
  storia: 'Storia',
}

export function ScienceCard({ article, index = 0 }: ScienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/scienza/${article.slug.current}`} className="block h-full">
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-100">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {article.mainImageUrl ? (
              <Image
                src={article.mainImageUrl}
                alt={article.mainImageAlt || article.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
                <BookOpen className="h-16 w-16 text-orange-300" />
              </div>
            )}

            {/* Complexity Badge */}
            {article.complexity && (
              <div className="absolute left-5 top-5">
                <span className={`rounded-full ${
                  complexityColors[article.complexity] ?? 'bg-gray-500'
                } px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm shadow-lg`}>
                  {complexityLabels[article.complexity] ?? article.complexity}
                </span>
              </div>
            )}

            {/* Featured Badge */}
            {article.featured && (
              <div className="absolute right-5 top-5">
                <span className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm shadow-lg">
                  In Evidenza
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            {/* Article Type */}
            {article.articleType && (
              <div className="mb-3">
                <span className="rounded-full bg-orange-900/90 px-4 py-1.5 text-sm font-semibold text-white">
                  {articleTypeLabels[article.articleType] ?? article.articleType}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="mb-4 line-clamp-2 text-xl font-bold leading-tight text-primary-900 transition-colors group-hover:text-orange-600">
              {article.title}
            </h3>

            {/* Meta Info */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {article.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="font-semibold">{article.readingTime} min</span>
                </div>
              )}
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-orange-600" />
                  <span className="font-semibold">{article.author.name}</span>
                </div>
              )}
            </div>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                {article.excerpt}
              </p>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {article.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{article.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Footer CTA */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm font-bold text-primary-900 transition-colors group-hover:text-orange-600">
                Leggi l'articolo
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-700">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
