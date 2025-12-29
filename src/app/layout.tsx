import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { TRPCReactProvider } from "@/trpc/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ToastProvider from "@/components/shared/ToastProvider";
import { siteConfig } from "@/lib/config";
import { StructuredData } from "@/components/seo/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'pasticceria',
    'ricette dolci',
    'torte',
    'crostate',
    'biscotti',
    'pasticceria italiana',
    'tecniche pasticceria',
    'scienza della pasticceria',
    'Cristian Sorrentino',
    'dolci artigianali',
    'ricette professionali',
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Dolci Artigianali`,
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    creator: '@cristianspastry',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${geist.variable} scrollbar-gutter-stable`}>
      <head>
        <StructuredData type="website" />
        <StructuredData type="organization" />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* Skip to main content link - Best practice for keyboard navigation */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          Vai al contenuto principale
        </a>

        <Suspense fallback={null}>
          <NuqsAdapter>
            <TRPCReactProvider>
              {/* Header - navigation landmark */}
              <Header />
              
              {/* Main content - CRITICAL: main landmark must be direct child of body for best accessibility */}
              <main id="main-content" className="flex-1 pt-16">
                {children}
              </main>
              
              {/* Footer - contentinfo landmark */}
              <Footer />
              
              {/* Toast notifications - outside main flow */}
              <ToastProvider />
            </TRPCReactProvider>
          </NuqsAdapter>
        </Suspense>
      </body>
    </html>
  );
}