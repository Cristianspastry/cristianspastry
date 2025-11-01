import Link from 'next/link'
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import Script from 'next/script'
import { getAllCategories } from '@/lib/data/categories'
import { CurrentYear } from './CurrentYear'
import { Suspense } from 'react'

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
  // Configurazione dinamica dei social media da mostrare
  const socialLinks = [
    {
      key: 'instagram',
      icon: Instagram,
      url: siteConfig.social.instagram.url,
      label: siteConfig.social.instagram.label
    },
    {
      key: 'facebook',
      icon: Facebook,
      url: siteConfig.social.facebook.url,
      label: siteConfig.social.facebook.label
    },
    {
      key: 'youtube',
      icon: Youtube,
      url: siteConfig.social.youtube.url,
      label: siteConfig.social.youtube.label
    },
    {
      key: 'tiktok',
      icon: Tiktok,
      url: siteConfig.social.tiktok?.url || '#',
      label: siteConfig.social.tiktok?.label || 'TikTok'
    },
    {
      key: 'x',
      icon: XIcon,
      url: siteConfig.social.x.url,
      label: siteConfig.social.x.label
    },
    {
      key: 'email',
      icon: Mail,
      url: `mailto:${siteConfig.contact.email}`,
      label: 'Email'
    }
  ];
  
  return (
    <footer className="border-t bg-pastry-50 min-h-[400px]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-pastry-900">{siteConfig.name}</h3>
            <p className="text-sm text-gray-600">
              {siteConfig.description}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-pastry-900">Navigazione</h4>
            <ul className="space-y-2 text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 hover:text-primary-600">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="https://www.iubenda.com/privacy-policy/67085013" target='_blank' className="text-gray-600 hover:text-primary-600 iubenda-black iubenda-noiframe iubenda-embed iubenda-noiframe hover:underline" title="Privacy Policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="https://www.iubenda.com/privacy-policy/67085013/cookie-policy" target='_blank' className="text-gray-600 hover:text-primary-600 iubenda-black iubenda-noiframe iubenda-embed iubenda-noiframe hover:underline" title="Cookie Policy">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-pastry-900">Categorie</h4>
            <ul className="space-y-2 text-sm">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      href={`/ricette?category=${category.slug.current}`}
                      className="text-gray-600 hover:text-pastry-600"
                    >
                      {category.emoji && <span className="mr-1">{category.emoji}</span>}
                      {category.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">Nessuna categoria disponibile</li>
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-pastry-900">Seguimi</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                const isExternal = social.key !== 'email'

                return (
                  <a
                    key={social.key}
                    href={social.url}
                    {...(isExternal && {
                      target: "_blank",
                      rel: "noopener noreferrer"
                    })}
                    className="text-gray-600 hover:text-primary-600"
                    title={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>© <Suspense fallback="2025"><CurrentYear /></Suspense> {siteConfig.name}. Tutti i diritti riservati.</p>
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
  )
}