// components/layout/Header.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Instagram, Facebook, Youtube, Mail, Twitter} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { siteConfig } from '@/lib/config'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

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

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
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
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-medium text-gray-700 transition-colors hover:text-primary-600"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative h-10 w-10 hover:bg-primary-50"
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
                    <X className="h-6 w-6 text-primary-900" strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[320px] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white border-none"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
           
            {/* Menu items con animazioni - spostati più in basso con padding top */}
            <nav className="flex flex-col gap-2 pt-16">
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
            </nav>

            {/* Footer con social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute bottom-6 left-6 right-6"
            >
              <div className="space-y-4">
                {/* Social icons */}
                <div className="flex justify-center gap-4">
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
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
                    title={social.label}
                  >
                    <IconComponent className="h-5 w-5 text-white" strokeWidth={2} />
                  </a>
                )
              })}
                 
                </div>

                {/* Tagline */}
                <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 text-center border border-white/20">
                  <p className="text-sm font-medium text-primary-50">
                    ✨ {siteConfig.name}✨
                  </p>
                  <div className="mt-3 flex justify-center gap-2">
                    <div className="h-1.5 w-10 rounded-full bg-primary-200/50" />
                    <div className="h-1.5 w-10 rounded-full bg-primary-300/60" />
                    <div className="h-1.5 w-10 rounded-full bg-primary-400/70" />
                  </div>
                </div>
              </div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}