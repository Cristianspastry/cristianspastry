'use client'

import { Mail, MapPin, Phone, Instagram, Facebook, Youtube, Globe, Twitter } from 'lucide-react'
import type { Author } from '@/sanity/lib/types'
import { siteConfig } from '@/lib/config'

// Custom TikTok icon component
const Tiktok = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

interface AboutContactSectionProps {
  author: Author
}

const socialIcons = {
  instagram: { icon: Instagram, color: 'hover:bg-pink-600', label: 'Instagram' },
  facebook: { icon: Facebook, color: 'hover:bg-blue-600', label: 'Facebook' },
  youtube: { icon: Youtube, color: 'hover:bg-red-600', label: 'YouTube' },
  tiktok: { icon: Tiktok, color: 'hover:bg-green-500', label: 'TikTok' },
  X: { icon: Twitter, color: 'hover:bg-sky-500', label: 'Twitter' },
  website: { icon: Globe, color: 'hover:bg-purple-600', label: 'Sito Web' },
}


export default function AboutContactSection({ author }: AboutContactSectionProps) {
  const hasSocial = author.social && Object.keys(author.social).some(key => author.social?.[key as keyof typeof author.social])

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Informazioni di Contatto</h2>

      <div className="space-y-6">
        {/* Email */}
        {author.email && (
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-sm font-semibold text-gray-700">Email</h3>
              <a
                href={`mailto:${author.email}`}
                className="text-lg font-medium text-purple-600 hover:text-purple-700 hover:underline"
              >
                {author.email}
              </a>
            </div>
          </div>
        )}

        {/* Phone (placeholder - you can add this to schema if needed) */}
        {/*<div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-100">
            <Phone className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 text-sm font-semibold text-gray-700">Telefono</h3>
            <p className="text-lg font-medium text-gray-900">+39 XXX XXX XXXX</p>
            <p className="text-sm text-gray-500">Disponibile Lun-Ven, 9:00-18:00</p>
          </div>
        </div> */}

        {/* Address (placeholder) */}
       {/* <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100">
            <MapPin className="h-6 w-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 text-sm font-semibold text-gray-700">Indirizzo</h3>
            <p className="text-lg font-medium text-gray-900">Via Roma, 123</p>
            <p className="text-sm text-gray-500">00100 Roma, Italia</p>
          </div>
        </div> */}

        {/* Social Media */}
        {hasSocial && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-700">Seguimi sui Social</h3>
            <div className="flex flex-wrap gap-3">
              {author.social && Object.entries(author.social).map(([platform, url]) => {
                if (!url) return null
                const socialInfo = socialIcons[platform as keyof typeof socialIcons]
                if (!socialInfo) return null
                const Icon = socialInfo.icon

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:text-white ${socialInfo.color}`}
                    aria-label={socialInfo.label}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{socialInfo.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="rounded-lg bg-purple-50 p-4 border border-purple-100">
          <h3 className="mb-2 text-sm font-semibold text-purple-900">Orari di Risposta</h3>
          <p className="text-sm text-purple-700">
            Rispondo a tutte le email entro 24-48 ore lavorative.
            Per richieste urgenti, contattami sui social media!
          </p>
        </div>
      </div>
    </div>
  )
}