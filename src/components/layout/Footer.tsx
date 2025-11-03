/**
 * Footer Component
 *
 * Footer moderno e funzionale per Cristian's Pastry
 *
 * STRUTTURA:
 * - 5 colonne desktop (Brand, Navigazione, Categorie A, Categorie B, Newsletter)
 * - Stack verticale su mobile
 * - Pre-footer con separator visivo
 * - Footer bottom con copyright e link legali
 *
 * FEATURES:
 * - Newsletter subscription form
 * - Social icons con hover effects
 * - Categorie divise in due colonne bilanciate
 * - Accessibilità WCAG AA
 * - Responsive design
 */

import Link from 'next/link'
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import Script from 'next/script'
import { getAllCategories } from '@/lib/data/categories'
import { CurrentYear } from './CurrentYear'
import { Suspense } from 'react'
import NewsletterForm from './NewsletterForm'

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

// Custom X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export async function Footer() {
  // Fetch categories dynamically
  const categories = await getAllCategories()

  // Dividi le categorie in due colonne bilanciate
  const midPoint = Math.ceil(categories.length / 2)
  const categoriesColumnA = categories.slice(0, midPoint)
  const categoriesColumnB = categories.slice(midPoint)

  // Configurazione social media
  const socialLinks = [
    {
      key: 'instagram',
      icon: Instagram,
      url: siteConfig.social.instagram.url,
      label: 'Instagram'
    },
    {
      key: 'facebook',
      icon: Facebook,
      url: siteConfig.social.facebook.url,
      label: 'Facebook'
    },
    {
      key: 'youtube',
      icon: Youtube,
      url: siteConfig.social.youtube.url,
      label: 'YouTube'
    },
    {
      key: 'tiktok',
      icon: Tiktok,
      url: siteConfig.social.tiktok?.url || '#',
      label: 'TikTok'
    },
    {
      key: 'x',
      icon: XIcon,
      url: siteConfig.social.x.url,
      label: 'X'
    }
  ];

  return (
    <>
      {/* Separator visivo */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

      {/* Footer principale */}
      <footer className="bg-gradient-to-b from-white to-primary-50/30 text-gray-800">
        <div className="container mx-auto px-4 py-16">
          {/* Grid principale - 5 colonne desktop */}
          <div className="grid gap-12 lg:grid-cols-5 md:grid-cols-2">

            {/* COLONNA 1: Brand Identity */}
            <div className="space-y-6 lg:col-span-1">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent mb-2">
                  {siteConfig.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ricette artigianali e scienza della pasticceria. Dove la tecnica incontra la passione.
                </p>
              </div>
            </div>

            {/* COLONNA 2: Navigazione */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-gray-900 tracking-wide">Navigazione</h4>
              <ul className="space-y-3 text-sm">
                {siteConfig.navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary-600 transition-all duration-300" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLONNA 3: Categorie A */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-gray-900 tracking-wide">Le Nostre Creazioni</h4>
              <ul className="space-y-3 text-sm">
                {categoriesColumnA.map((category) => (
                  <li key={category._id}>
                    <Link
                      href={`/ricette?category=${category.slug.current}`}
                      className="text-gray-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary-600 transition-all duration-300" />
                      {category.emoji && <span className="text-base">{category.emoji}</span>}
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLONNA 4: Categorie B */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-gray-900 tracking-wide">Scopri di Più</h4>
              <ul className="space-y-3 text-sm">
                {categoriesColumnB.map((category) => (
                  <li key={category._id}>
                    <Link
                      href={`/ricette?category=${category.slug.current}`}
                      className="text-gray-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary-600 transition-all duration-300" />
                      {category.emoji && <span className="text-base">{category.emoji}</span>}
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLONNA 5: Engagement & Newsletter */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-gray-900 tracking-wide">Resta Connesso</h4>

              {/* Newsletter form */}
              <div className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ricevi ricette esclusive e consigli direttamente nella tua inbox
                </p>
                <NewsletterForm />
              </div>

              {/* Social Icons */}
              <div className="pt-4">
                <p className="text-sm text-gray-600 mb-4">Seguimi sui social</p>
                <div className="flex gap-4 flex-wrap">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={social.key}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                        title={social.label}
                        aria-label={social.label}
                      >
                        <div className="w-11 h-11 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-500/50">
                          <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {social.label}
                        </span>
                      </a>
                    )
                  })}
                  {/* Email separato */}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="group relative"
                    title="Email"
                    aria-label="Contattaci via email"
                  >
                    <div className="w-11 h-11 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-500/50">
                      <Mail className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Email
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-600">
            {/* Copyright */}
            <div className="flex items-center gap-2">
              <p>© <Suspense fallback="2025"><CurrentYear /></Suspense> {siteConfig.name}</p>
              <span className="hidden md:inline">•</span>
              <p className="hidden md:block">Tutti i diritti riservati</p>
            </div>

            {/* Link legali */}
            <div className="flex items-center gap-6">
              <Link
                href="https://www.iubenda.com/privacy-policy/67085013"
                target='_blank'
                className="hover:text-primary-600 transition-colors iubenda-black iubenda-noiframe iubenda-embed"
                title="Privacy Policy"
              >
                Privacy Policy
              </Link>
              <Link
                href="https://www.iubenda.com/privacy-policy/67085013/cookie-policy"
                target='_blank'
                className="hover:text-primary-600 transition-colors iubenda-black iubenda-noiframe iubenda-embed"
                title="Cookie Policy"
              >
                Cookie Policy
              </Link>
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>in Naples</span>
            </div>
          </div>
        </div>

        {/* Iubenda Scripts */}
        <Script
          id="iubenda-loader-pp"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              '(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);',
          }}
        />
        <Script
          id="iubenda-loader-cp"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              '(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);',
          }}
        />
      </footer>
    </>
  )
}
