import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { SCIENCE_QUERY } from '@/sanity/lib/queries'
import type { Science } from '@/sanity/lib/types'
import ScienceHero from '@/components/science/detail/ScienceHero'
import ScienceInfo from '@/components/science/detail/ScienceInfo'
import ScienceIntroduction from '@/components/science/detail/ScienceIntroduction'
import ScienceSections from '@/components/science/detail/ScienceSections'
import ScienceKeyTakeaways from '@/components/science/detail/ScienceKeyTakeaways'
import SciencePracticalApplications from '@/components/science/detail/SciencePracticalApplications'
import ScienceExperiments from '@/components/science/detail/ScienceExperiments'
import ScienceGlossary from '@/components/science/detail/ScienceGlossary'
import ScienceReferences from '@/components/science/detail/ScienceReferences'
import ScienceConclusion from '@/components/science/detail/ScienceConclusion'
import ScienceRelated from '@/components/science/detail/ScienceRelated'

interface SciencePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: SciencePageProps): Promise<Metadata> {
  const { slug } = await params
  const article: Science | null = await client.fetch(SCIENCE_QUERY, {
    slug,
  })

  if (!article) {
    return {
      title: 'Articolo non trovato | Cristian\'s Pastry',
    }
  }

  return {
    title: article.seo?.metaTitle || `${article.title} | Cristian's Pastry`,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      images: article.seo?.ogImageUrl
        ? [{ url: article.seo.ogImageUrl }]
        : article.mainImageUrl
        ? [{ url: article.mainImageUrl }]
        : [],
      type: 'article',
    },
    keywords: article.seo?.synonyms || article.tags,
    robots: article.seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}

export default async function SciencePage({ params }: SciencePageProps) {
  const { slug } = await params
  const article: Science | null = await client.fetch(SCIENCE_QUERY, {
    slug,
  })

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <ScienceHero article={article} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Column */}
          <div className="space-y-12 lg:col-span-2">
            {/* Introduction */}
            {article.introduction && (
              <ScienceIntroduction content={article.introduction} />
            )}

            {/* Sections */}
            {article.sections && article.sections.length > 0 && (
              <ScienceSections sections={article.sections} />
            )}

            {/* Key Takeaways */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <ScienceKeyTakeaways keyTakeaways={article.keyTakeaways} />
            )}

            {/* Practical Applications */}
            {article.practicalApplications && article.practicalApplications.length > 0 && (
              <SciencePracticalApplications applications={article.practicalApplications} />
            )}

            {/* Experiments */}
            {article.experiments && article.experiments.length > 0 && (
              <ScienceExperiments experiments={article.experiments} />
            )}

            {/* Glossary */}
            {article.glossary && article.glossary.length > 0 && (
              <ScienceGlossary terms={article.glossary} />
            )}

            {/* Conclusion */}
            {article.conclusion && (
              <ScienceConclusion content={article.conclusion} />
            )}

            {/* References */}
            {article.references && article.references.length > 0 && (
              <ScienceReferences references={article.references} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:col-span-1">
            {/* Info Card */}
            <ScienceInfo article={article} />

            {/* Related Content */}
            <ScienceRelated article={article} />
          </div>
        </div>
      </div>
    </div>
  )
}
