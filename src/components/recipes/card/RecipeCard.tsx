'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { cn, formatDuration } from '@/lib/utils';
import { Recipe, RecipePreview } from '@/sanity/lib/types';


interface RecipeCardProps {
  recipe: Recipe | RecipePreview;
  index?: number;
  className?: string;
}

const difficultyLabels: Record<string, string> = {
  facile: 'Facile',
  media: 'Media',
  difficile: 'Difficile',
  professionale: 'Professionale',
};

/**
 * RecipeCard Component - Card per la visualizzazione delle ricette
 * 
 * Componente riutilizzabile per visualizzare una ricetta in formato card
 * con immagine, titolo, metadati e CTA.
 */
export function RecipeCard({ recipe, index = 0, className }: RecipeCardProps) {
  // Handle both Recipe and RecipePreview types
  const isFullRecipe = 'cookTime' in recipe;
  const totalTime = isFullRecipe
    ? (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0)
    : recipe.prepTime ?? 0;
  
  const imageUrl = isFullRecipe ? recipe.mainImageUrl : recipe.imageUrl;
  const imageAlt = isFullRecipe ? recipe.mainImageAlt : recipe.imageAlt;
  const imageLqip = isFullRecipe ? recipe.mainImageLqip : recipe.imageLqip;

  // Type guard for Recipe
  const fullRecipe = isFullRecipe ? recipe : null;
  const previewCategories =
    !fullRecipe && Array.isArray((recipe as RecipePreview).categories)
      ? (recipe as RecipePreview).categories
      : null;
  const categories = fullRecipe?.categories ?? previewCategories;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn('h-full', className)}
    >
      <Link
        href={`/ricette/${recipe.slug.current}`}
        className="block h-full touch-feedback"
      >
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg hover-lift-lg border border-gray-100">
          {/* Immagine */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt ?? recipe.title ?? 'Ricetta'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                {...(imageLqip
                  ? { placeholder: 'blur', blurDataURL: imageLqip }
                  : {})}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100">
                <span className="text-gray-400">Nessuna immagine</span>
              </div>
            )}

            {/* Badge categoria */}
            {categories?.length && (
              <div className="absolute left-5 top-5">
                <span className="rounded-full bg-primary-900/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                  {categories[0]?.emoji} {categories[0]?.title}
                </span>
              </div>
            )}

            {/* Favorite Button - Placeholder per ora */}
            <div className="absolute right-4 top-4 z-10">
              <button
                className="h-9 w-9 rounded-full bg-white/90 shadow-sm hover:bg-white flex items-center justify-center"
                onClick={(e) => e.preventDefault()}
                aria-label="Aggiungi ai preferiti"
              >
                ❤️
              </button>
            </div>
          </div>

          {/* Contenuto */}
          <div className="flex flex-1 flex-col p-6">
            {/* Titolo */}
            <h3 className="mb-4 line-clamp-2 text-xl font-bold leading-tight text-primary-900 transition-colors group-hover:text-primary-600">
              {recipe.title}
            </h3>

            {/* Meta info */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {totalTime > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary-600" />
                  <span className="font-semibold">{formatDuration(totalTime)}</span>
                </div>
              )}
              {recipe.difficulty && (
                <div className="flex items-center">
                  <span className="font-semibold lowercase text-gray-700">
                    {difficultyLabels[recipe.difficulty] ?? recipe.difficulty}
                  </span>
                </div>
              )}
              {fullRecipe?.servings && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary-600" />
                  <span className="font-semibold">{fullRecipe.servings}</span>
                </div>
              )}
            </div>

            {/* Excerpt */}
            {recipe.excerpt && (
              <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                {recipe.excerpt}
              </p>
            )}

            {/* Footer con CTA */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm font-bold text-primary-900 transition-colors group-hover:text-primary-600">
                Vai alla ricetta
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-900 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-600">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
