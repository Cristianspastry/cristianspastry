'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Clock, BookOpen } from 'lucide-react'
import type { Technique } from '@/sanity/lib/types'

interface TechniqueHeroProps {
  technique: Technique
}

const difficultyLabels: Record<string, string> = {
  base: 'Base',
  intermedio: 'Intermedio',
  avanzato: 'Avanzato',
  professionale: 'Professionale'
}

const difficultyColors: Record<string, string> = {
  base: 'bg-green-500',
  intermedio: 'bg-yellow-500',
  avanzato: 'bg-red-500',
  professionale: 'bg-purple-500'
}

export default function TechniqueHero({ technique }: TechniqueHeroProps) {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/pastry-pattern.svg')] opacity-10" />

      <div className="container relative mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            {/* Category & Difficulty */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {technique.category && (
                <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold">
                  {technique.category}
                </Badge>
              )}
              {technique.difficulty && (
                <span className={`rounded-full ${
                  difficultyColors[technique.difficulty] ?? 'bg-gray-500'
                } px-4 py-2 text-sm font-semibold text-white`}>
                  {difficultyLabels[technique.difficulty] ?? technique.difficulty}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {technique.title}
            </h1>

            {/* Excerpt */}
            {technique.excerpt && (
              <p className="mb-6 text-lg text-blue-100 md:text-xl">
                {technique.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-sm text-blue-200">
              {technique.executionTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{technique.executionTime} minuti</span>
                </div>
              )}
              {technique.steps && technique.steps.length > 0 && (
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{technique.steps.length} passaggi</span>
                </div>
              )}
              {technique.author && (
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{technique.author.name}</span>
                </div>
              )}
              {technique.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {new Date(technique.publishedAt).toLocaleDateString('it-IT', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {technique.tags && technique.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {technique.tags.map((tag, index) => (
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
            {technique.mainImageUrl ? (
              <Image
                src={technique.mainImageUrl}
                alt={technique.mainImageAlt || technique.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-blue-700">
                <BookOpen className="h-24 w-24 text-blue-400" />
              </div>
            )}
            {technique.mainImageCaption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-sm text-white">{technique.mainImageCaption}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
