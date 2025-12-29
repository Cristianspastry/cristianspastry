// components/layout/Header.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Instagram, Facebook, Youtube, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { siteConfig } from '@/lib/config'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

// Lazy load SearchModal - solo quando necessario
const SearchModal = dynamic(() => import('@/components/search/SearchModal'), {
  ssr: false,
})

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
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
    icon: TikTokIcon,
    url: siteConfig.social.tiktok?.url || '#',
    label: siteConfig.social.tiktok?.label || 'TikTok'
  },
  {
    key: 'x',
    icon: XIcon,
    url: siteConfig.social.x.url,
    label: siteConfig.social.x.label
  }
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm h-16">
      <nav className="container mx-auto flex  h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={50}
            height={50}
            priority
            className="h-12 w-12"
            unoptimized
          />
          <span className="text-2xl font-serif font-bold text-primary-900">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {siteConfig.navigation.map((item) => {
            // Check if current page matches this nav item
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-black text-base font-medium transition-colors hover:text-primary-600 py-2 px-1 ${isActive ? 'text-primary-600 font-semibold' : 'text-gray-700'}`}
              >
                <span className={`transition-colors ${isActive ? 'text-primary-600 font-semibold' : 'text-gray-700'}`}>
                  {item.name}
                </span>
                {/* Animated underline */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </Link>
            )
          })}

          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className="h-10 w-10 hover:bg-gray-100"
            aria-label="Cerca"
          >
            <Search className="h-5 w-5 text-gray-700" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 hover:bg-primary-50 transition-all"
              aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
            >
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -180, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Menu className="h-6 w-6 text-primary-900" strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="close"
                    initial={{ rotate: 180, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -180, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <X className="h-6 w-6 text-primary-900" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[320px] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white border-none flex flex-col overflow-y-auto"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            {/* Close button inside menu */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:rotate-90 active:scale-95"
              aria-label="Chiudi menu"
            >
              <X className="h-5 w-5 text-white" strokeWidth={3} />
            </motion.button>

            {/* Menu items con animazioni - scrollabile */}
            <nav className="flex flex-col gap-2 pt-16 flex-1 min-h-0 overflow-y-auto pb-4">
              {siteConfig.navigation.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all hover:bg-white/10 hover:pl-6 active:scale-95"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all group-hover:bg-white/20 group-hover:scale-110">
                        <Icon className="h-5 w-5 text-primary-100" strokeWidth={2} />
                      </div>
                      <span className="text-lg font-semibold text-white">
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                )
              })}

              {/* Search Button in Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: siteConfig.navigation.length * 0.08,
                  duration: 0.4,
                  ease: "easeOut"
                }}
              >
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setIsSearchOpen(true)
                  }}
                  className="group flex w-full items-center gap-4 rounded-xl px-4 py-3.5 transition-all hover:bg-white/10 hover:pl-6 active:scale-95"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all group-hover:bg-white/20 group-hover:scale-110">
                    <Search className="h-5 w-5 text-primary-100" strokeWidth={2} />
                  </div>
                  <span className="text-lg font-semibold text-white">
                    Cerca
                  </span>
                </button>
              </motion.div>
            </nav>

            {/* Footer con social - sempre visibile in fondo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mt-auto pt-8 pb-8 px-6 flex-shrink-0 border-t border-white/10"
            >
              {/* Social icons */}
              <div className="flex justify-center items-center gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  const isExternal = social.key !== 'email'

                  return (
                    <motion.a
                      key={social.key}
                      href={social.url}
                      {...(isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer"
                      })}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.7 + (index * 0.05),
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110 active:scale-95 shadow-lg"
                      title={social.label}
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}