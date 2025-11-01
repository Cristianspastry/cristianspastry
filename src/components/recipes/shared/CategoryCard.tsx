// components/recipes/shared/CategoryCard.tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Category } from '@/sanity/lib/types'
import { ArrowRight } from 'lucide-react'

interface CategoryCardProps {
  category: Category
  index?: number
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const recipeCount = category.recipeCount ?? 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/ricette/categorie/${category.slug.current}`} className="block h-full">
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-100">
          {/* Immagine */}
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary-100 to-amber-100">
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.imageAlt ?? category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-8xl opacity-30">{category.emoji ?? '📁'}</span>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Badge conteggio ricette */}
            <div className="absolute right-4 top-4">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-sm font-bold text-primary-900 backdrop-blur-sm">
                {recipeCount} {recipeCount === 1 ? 'ricetta' : 'ricette'}
              </span>
            </div>
          </div>

          {/* Contenuto */}
          <div className="flex flex-1 flex-col p-6">
            {/* Titolo con emoji */}
            <div className="mb-3 flex items-center gap-3">
              {category.emoji && (
                <span className="text-3xl">{category.emoji}</span>
              )}
              <h3 className="flex-1 text-2xl font-bold leading-tight text-primary-900 transition-colors group-hover:text-primary-600">
                {category.title}
              </h3>
            </div>

            {/* Descrizione */}
            {category.description && (
              <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                {category.description}
              </p>
            )}

            {/* Footer con CTA */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm font-bold text-primary-900 transition-colors group-hover:text-primary-600">
                Scopri le ricette
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-900 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-600">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
