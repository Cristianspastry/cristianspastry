import { client } from "@/core/lib/clients"
import { FULL_SITEMAP_QUERY } from "@/features/recipes/services/recipeService"
import type { MetadataRoute } from "next"
import { env } from "process"


interface SitemapEntry {
  slug: string
  _updatedAt: string
  publishedAt?: string
}

interface SitemapData {
  recipes: SitemapEntry[]
  techniques: SitemapEntry[]
  science: SitemapEntry[]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : "http://localhost:3000")
  
  const data: SitemapData = await client.fetch(FULL_SITEMAP_QUERY)

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl ?? 'https://cristianspastry-teal.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/ricette`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tecniche`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/scienza`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const recipeSitemap: MetadataRoute.Sitemap = data.recipes.map((recipe) => ({
    url: `${baseUrl}/ricette/${recipe.slug}`,
    lastModified: new Date(recipe._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const techniqueSitemap: MetadataRoute.Sitemap = data.techniques.map((technique) => ({
    url: `${baseUrl}/tecniche/${technique.slug}`,
    lastModified: new Date(technique._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const scienceSitemap: MetadataRoute.Sitemap = data.science.map((science) => ({
    url: `${baseUrl}/scienza/${science.slug}`,
    lastModified: new Date(science._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...recipeSitemap,
    ...techniqueSitemap,
    ...scienceSitemap,
  ]
}
