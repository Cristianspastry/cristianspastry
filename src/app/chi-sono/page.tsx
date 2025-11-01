import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { AUTHOR_QUERY } from '@/sanity/lib/queries'
import type { Author } from '@/sanity/lib/types'
import AboutHero from '@/components/about/AboutHero'
import AboutBio from '@/components/about/AboutBio'
import AboutExpertise from '@/components/about/AboutExpertise'
import AboutContactSection from '@/components/about/AboutContactSection'
import ContactForm from '@/components/about/ContactForm'
import PageTransition from '@/components/shared/PageTransition'

export const metadata: Metadata = {
  title: 'Chi Sono | Cristian\'s Pastry',
  description: 'Scopri la storia di Cristian, pasticcere professionista e appassionato di scienza della pasticceria.',
  keywords: [
    'Cristian pasticcere',
    'pasticcere professionista',
    'chef pasticceria',
    'biografia chef',
  ],
  openGraph: {
    title: 'Chi Sono | Cristian\'s Pastry',
    description: 'Scopri la storia di Cristian, pasticcere professionista e appassionato di scienza della pasticceria.',
    type: 'profile',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Cristian Sorrentino - Pasticcere',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chi Sono | Cristian\'s Pastry',
    description: 'Scopri la storia di Cristian, pasticcere professionista.',
    images: ['/og-image.svg'],
  },
}

export default async function AboutPage() {
  // Fetch main author - try specific slug first, then fallback to first author
  let author: Author | null = await client.fetch(
    AUTHOR_QUERY,
    { slug: 'cristian' } // Modify with your actual author slug
  )

  // If author with specific slug doesn't exist, get the first author
  if (!author) {
    author = await client.fetch(`*[_type == "author"][0]{
      _id,
      name,
      slug,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      bio,
      role,
      expertise,
      social,
      email,
      "recipeCount": count(*[_type == "ricetta" && author._ref == ^._id]),
      "techniqueCount": count(*[_type == "tecnica" && author._ref == ^._id]),
      "scienceCount": count(*[_type == "scienza" && author._ref == ^._id])
    }`)
  }

  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Nessun autore configurato</p>
          <p className="text-sm text-gray-500">
            Crea un autore in Sanity CMS per visualizzare questa pagina
          </p>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <AboutHero author={author} />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-6xl space-y-16">
            {/* Bio Section */}
            <AboutBio author={author} />

            {/* Expertise Section */}
            {author.expertise && author.expertise.length > 0 && (
              <AboutExpertise expertise={author.expertise} />
            )}

            {/* Contact Section with Social and Form */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Social Links */}
              <AboutContactSection author={author} />

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
