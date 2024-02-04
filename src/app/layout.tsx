
import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/layout/navBar/navBar'
import { siteMetaData } from '@/utils/siteMetaData'
import { cx } from '@/utils'
import Script from 'next/script'
import Footer from '@/components/layout/footer/footer'
import RecipeCard from '@/components/card/recipe/recipeCard'
import RecentPostSection from '@/components/home/RecentPostSection'
import { Router, useRouter } from 'next/router'

const metadata: Metadata = {
  metadataBase: new URL(siteMetaData.siteUrl),
  title: {
    template: `%s | ${siteMetaData.title}`,
    default: siteMetaData.title, // a default is required when creating a template
  },
  description: siteMetaData.description,
  openGraph: {
    title: siteMetaData.title,
    description: siteMetaData.description,
    url: siteMetaData.siteUrl,
    siteName: siteMetaData.title,
    images: [siteMetaData.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetaData.title,
    images: [siteMetaData.socialBanner],
  },
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const Meta = () => {
    return (
      <>
        <meta name={"Cristian Sorrentino"} content={"Cristian Sorrentino"} />
        <meta name={"description"} content={metadata.description?.toString()} />
        <title>{siteMetaData.title}</title>
      </>
    );
  }

  return (
    <>
      <html lang={siteMetaData.language} suppressHydrationWarning className=' scroll-smooth'>
        <Meta/>
        <body className=' bg-gray-50 w-full antialiased flex flex-col min-h-full min-w-full h-full max-w-screen-xl'>
          <NavBar/>
          {children}
          <Footer/>
        </body>
      </html>
    </>

  )
}
