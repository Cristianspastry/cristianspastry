'use client'

import { Mail, Instagram, Facebook, Youtube, Globe, Twitter } from 'lucide-react'
import type { Author } from '@/sanity/lib/types'

interface AboutContactProps {
  author: Author
}

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
  website: Globe,
}

const socialColors = {
  instagram: 'hover:bg-pink-600',
  facebook: 'hover:bg-blue-600',
  youtube: 'hover:bg-red-600',
  twitter: 'hover:bg-sky-500',
  website: 'hover:bg-purple-600',
}

export default function AboutContact({ author }: AboutContactProps) {
  const hasSocial = author.social && Object.keys(author.social).some(key => author.social?.[key as keyof typeof author.social])

  return (
    <section className="rounded-2xl bg-gradient-to-br from-purple-900 to-purple-800 p-8 shadow-2xl md:p-12">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">Rimaniamo in Contatto</h2>
        <p className="mb-8 text-lg text-purple-200">
          Seguimi sui social media per rimanere aggiornato sulle ultime ricette e consigli!
        </p>

        {/* Email */}
        {author.email && (
          <div className="mb-8">
            <a
              href={`mailto:${author.email}`}
              className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-purple-900 transition-all hover:scale-105 hover:shadow-xl"
            >
              <Mail className="h-5 w-5" />
              <span>{author.email}</span>
            </a>
          </div>
        )}

        {/* Social Links */}
        {hasSocial && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {author.social && Object.entries(author.social).map(([platform, url]) => {
              if (!url) return null
              const Icon = socialIcons[platform as keyof typeof socialIcons]
              const colorClass = socialColors[platform as keyof typeof socialColors]

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 ${colorClass}`}
                  aria-label={platform}
                >
                  <Icon className="h-6 w-6" />
                </a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
