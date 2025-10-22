import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/admin/'],
      },
    ],
    sitemap: 'https://tuosito.com/sitemap.xml',
  }
}
