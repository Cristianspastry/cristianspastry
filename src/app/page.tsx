import { FeaturedRecipes } from "@/components/home/FeaturedRecipes"
import { Hero } from "@/components/home/Hero"
import { ContentSection } from "@/components/home/ContentSection"
import { generateHomeMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { getHomePageData } from "@/lib/data/home"



export const revalidate = 3600 // Revalidate ogni ora

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
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Recipes */}
      <FeaturedRecipes recipes={featuredRecipes} />

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
    </>
  )
}