'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Beaker } from 'lucide-react'
import { motion } from 'framer-motion'
import RecipeCard from '@/components/recipes/list/RecipeCard'
import { ScienceCard } from '@/components/science/ScienceCard'
import type { RecipePreview, TechniquePreview, SciencePreview } from '@/sanity/lib/types'
import { TechniqueCard } from '@/components/technique/list/TechniqueCard'

interface RecipeRelatedProps {
  relatedRecipes?: RecipePreview[]
  relatedTechniques?: TechniquePreview[]
  relatedScience?: SciencePreview[]
}

export function RecipeRelated({ relatedRecipes, relatedTechniques, relatedScience }: RecipeRelatedProps) {
  const hasRelated = (relatedRecipes?.length ?? 0) + (relatedTechniques?.length ?? 0) + (relatedScience?.length ?? 0) > 0

  if (!hasRelated) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="mt-16 space-y-12">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold text-primary-900 md:text-4xl">
          Approfondisci
        </h2>
        <p className="text-gray-600">
          Scopri contenuti correlati per migliorare le tue abilità in pasticceria
        </p>
      </div>

      {/* Ricette correlate - usando RecipeCard esistente */}
      {relatedRecipes && relatedRecipes.length > 0 && (
        <div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-primary-900">
              🍰 Ricette Correlate
            </h3>
            <p className="mt-1 text-gray-600">
              Altre ricette che potrebbero interessarti
            </p>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {relatedRecipes.map((recipe, index) => (
              <RecipeCard 
                key={recipe._id} 
                recipe={recipe}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Tecniche correlate - usando TechniqueCard esistente */}
      {relatedTechniques && relatedTechniques.length > 0 && (
        <div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-primary-900">
              📚 Tecniche di Pasticceria
            </h3>
            <p className="mt-1 text-gray-600">
              Impara le tecniche utilizzate in questa ricetta
            </p>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {relatedTechniques.map((technique, index) => (
              <TechniqueCard 
                key={technique._id} 
                technique={technique}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Scienza correlata - usando ScienceCard esistente */}
      {relatedScience && relatedScience.length > 0 && (
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <Beaker className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-900">
                La Scienza della Pasticceria
              </h3>
              <p className="text-gray-600">
                Comprendi la scienza dietro questa ricetta
              </p>
            </div>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {relatedScience.map((article, index) => (
              <ScienceCard 
                key={article._id} 
                science={article}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* CTA finale */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-50 to-amber-50 p-8 text-center shadow-lg">
        <h3 className="mb-3 text-2xl font-bold text-primary-900">
          Vuoi esplorare altre ricette?
        </h3>
        <p className="mb-6 text-gray-700">
          Scopri tutte le nostre ricette di pasticceria e trova l&apos;ispirazione per i tuoi dolci
        </p>
        <Link href="/ricette">
          <Button size="lg" className="gap-2 shadow-md">
            Esplora tutte le ricette
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}