import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { TECHNIQUE_QUERY } from '@/sanity/lib/queries'
import type { Technique } from '@/sanity/lib/types'
import TechniqueHero from '@/components/technique/detail/TechniqueHero'
import TechniqueInfo from '@/components/technique/detail/TechniqueInfo'
import TechniqueIntroduction from '@/components/technique/detail/TechniqueIntroduction'
import TechniqueEquipment from '@/components/technique/detail/TechniqueEquipment'
import TechniqueSteps from '@/components/technique/detail/TechniqueSteps'
import TechniqueKeyPoints from '@/components/technique/detail/TechniqueKeyPoints'
import TechniqueTroubleshooting from '@/components/technique/detail/TechniqueTroubleshooting'
import TechniqueVariations from '@/components/technique/detail/TechniqueVariations'
import TechniqueRelated from '@/components/technique/detail/TechniqueRelated'

interface TechniquePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: TechniquePageProps): Promise<Metadata> {
  const { slug } = await params
  const technique: Technique | null = await client.fetch(TECHNIQUE_QUERY, {
    slug,
  })

  if (!technique) {
    return {
      title: 'Tecnica non trovata | Cristian\'s Pastry',
    }
  }

  return {
    title: technique.seo?.metaTitle || `${technique.title} | Cristian's Pastry`,
    description: technique.seo?.metaDescription || technique.excerpt,
    openGraph: {
      title: technique.seo?.metaTitle || technique.title,
      description: technique.seo?.metaDescription || technique.excerpt,
      images: technique.seo?.ogImageUrl
        ? [{ url: technique.seo.ogImageUrl }]
        : technique.mainImageUrl
        ? [{ url: technique.mainImageUrl }]
        : [],
      type: 'article',
    },
    keywords: technique.seo?.synonyms || technique.tags,
    robots: technique.seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}

export default async function TechniquePage({ params }: TechniquePageProps) {
  const { slug } = await params
  const technique: Technique | null = await client.fetch(TECHNIQUE_QUERY, {
    slug,
  })

  if (!technique) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <TechniqueHero technique={technique} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Column */}
          <div className="space-y-12 lg:col-span-2">
            {/* Introduction */}
            {technique.introduction && (
              <TechniqueIntroduction content={technique.introduction} />
            )}

            {/* Equipment */}
            {technique.equipment && technique.equipment.length > 0 && (
              <TechniqueEquipment equipment={technique.equipment} />
            )}

            {/* Steps */}
            {technique.steps && technique.steps.length > 0 && (
              <TechniqueSteps steps={technique.steps} />
            )}

            {/* Key Points */}
            {technique.keyPoints && technique.keyPoints.length > 0 && (
              <TechniqueKeyPoints keyPoints={technique.keyPoints} />
            )}

            {/* Troubleshooting */}
            {technique.troubleshooting && technique.troubleshooting.length > 0 && (
              <TechniqueTroubleshooting troubleshooting={technique.troubleshooting} />
            )}

            {/* Variations */}
            {technique.variations && technique.variations.length > 0 && (
              <TechniqueVariations variations={technique.variations} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:col-span-1">
            {/* Info Card */}
            <TechniqueInfo technique={technique} />

            {/* Related Content */}
            <TechniqueRelated technique={technique} />
          </div>
        </div>
      </div>
    </div>
  )
}
