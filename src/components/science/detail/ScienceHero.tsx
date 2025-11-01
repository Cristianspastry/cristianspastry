'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Clock, BookOpen } from 'lucide-react'
import type { Science } from '@/sanity/lib/types'

interface ScienceHeroProps {
  article: Science
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
  reazioni: 'Reazioni Chimiche',
  fisica: 'Fisica',
  'dietro-quinte': 'Dietro le Quinte',
  miti: 'Miti e Verità',
  storia: 'Storia',
}

export default function ScienceHero({ article }: ScienceHeroProps) {
  return (
    <section className="relative bg-gradient-to-r from-orange-900 via-orange-800 to-orange-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/pastry-pattern.svg')] opacity-10" />

      <div className="container relative mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            {/* Article Type & Complexity */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {article.articleType && (
                <Badge className="bg-orange-600 text-white px-4 py-2 text-sm font-semibold">
                  {articleTypeLabels[article.articleType] ?? article.articleType}
                </Badge>
              )}
              {article.complexity && (
                <span className={`rounded-full ${
                  complexityColors[article.complexity] ?? 'bg-gray-500'
                } px-4 py-2 text-sm font-semibold text-white`}>
                  {complexityLabels[article.complexity] ?? article.complexity}
                </span>
              )}
              {article.featured && (
                <Badge className="bg-yellow-500 text-white px-4 py-2 text-sm font-semibold">
                  In Evidenza
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="mb-6 text-lg text-orange-100 md:text-xl">
                {article.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-sm text-orange-200">
              {article.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{article.readingTime} min di lettura</span>
                </div>
              )}
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{article.author.name}</span>
                </div>
              )}
              {article.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString('it-IT', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl lg:aspect-square">
            {article.mainImageUrl ? (
              <Image
                src={article.mainImageUrl}
                alt={article.mainImageAlt || article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-orange-700">
                <BookOpen className="h-24 w-24 text-orange-400" />
              </div>
            )}
            {article.mainImageCaption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-sm text-white">{article.mainImageCaption}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
