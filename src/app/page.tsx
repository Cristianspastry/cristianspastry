import { FeaturedRecipes } from "@/components/home/FeaturedRecipes"
import { Hero } from "@/components/home/Hero"
import { ContentSection } from "@/components/home/ContentSection"
import { generateHomeMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { getHomePageData } from "@/lib/data/home"
import PageTransition from "@/components/shared/PageTransition"

// ❌ RIMOSSO: export const revalidate = 3600
// ✅ Cache gestita tramite 'use cache' in getHomePageData()

// ============================================
// METADATA
// ============================================

export const metadata: Metadata = generateHomeMetadata()



// ============================================
// PAGE
// ============================================

export default async function HomePage() {
  const { featuredRecipes, latestTechniques, latestScience } = await getHomePageData()

  return (
    <PageTransition>
      {/* Hero Section */}
      <Hero />

      {/* Spacer decorativo */}
      <div className="h-12 md:h-20 bg-gradient-to-b from-white to-gray-50/30" aria-hidden="true" />

      {/* Featured Recipes */}
      <FeaturedRecipes recipes={featuredRecipes} />

      {/* Separator decorativo */}
      <div className="relative py-12 md:py-16" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/20 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
        </div>
      </div>

      {/* Latest Techniques */}
      <ContentSection
        title="Tecniche di Pasticceria"
        description="Impara le tecniche fondamentali e avanzate della pasticceria professionale"
        items={latestTechniques}
        contentType="technique"
        viewAllText="Scopri tutte le tecniche"
        backgroundColor="bg-white"
        columns={3}
      />

      {/* Separator decorativo */}
      <div className="relative py-12 md:py-16" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-gray-50" />
        <div className="container mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
      </div>

      {/* Latest Science Articles */}
      <ContentSection
        title="La Scienza della Pasticceria"
        description="Scopri la scienza e la chimica dietro le tue ricette preferite"
        items={latestScience}
        contentType="science"
        viewAllText="Esplora tutti gli articoli scientifici"
        backgroundColor="bg-gray-50"
        columns={3}
      />
    </PageTransition>
  )
}