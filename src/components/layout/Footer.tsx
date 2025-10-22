import Link from 'next/link'
import { Instagram, Facebook, Youtube, Mail, Twitter } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import Script from 'next/script'

export function Footer() {
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
      key: 'x',
      icon: Twitter,
      url: siteConfig.social.x.url,
      label: siteConfig.social.x.label
    },
    {
      key: 'email',
      icon: Mail,
      url: `mailto:${siteConfig.contact.email}`,
      label: 'Email'
    }
  ]
  return (
    <footer className="border-t bg-pastry-50">
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

              <li>
                <Link
                  href="/ricette?category=torte"
                  className="text-gray-600 hover:text-pastry-600"
                >
                  Torte
                </Link>
              </li>
              <li>
                <Link
                  href="/ricette?category=biscotti"
                  className="text-gray-600 hover:text-pastry-600"
                >
                  Biscotti
                </Link>
              </li>
              <li>
                <Link
                  href="/ricette?category=lievitati"
                  className="text-gray-600 hover:text-pastry-600"
                >
                  Lievitati
                </Link>
              </li>
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
          <p>© {new Date().getFullYear()} {siteConfig.name}. Tutti i diritti riservati.</p>
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