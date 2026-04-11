import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { TRPCReactProvider } from "@/trpc/react";
import AuthProvider from "@/features/auth/components/AuthProvider";
import { Header } from "@/features/layout/components/Header";
import { Footer } from "@/features/layout/components/Footer";
import ToastProvider from "@/features/shared/components/ToastProvider";
import { siteConfig } from "@/core/constants/config";
import { StructuredData } from "@/features/shared/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
const facebookApiVersion =
  process.env.NEXT_PUBLIC_FACEBOOK_API_VERSION ?? "v19.0";

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
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${geist.variable} scrollbar-gutter-stable`}>
      <head>
        <StructuredData type="website" />
        <StructuredData type="organization" />
        <meta name="google-site-verification" content="dUN8G5y3wcV9cFpWBe-iwKYreuiJriXxL53A_PzhyLk" />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased text-foreground bg-background">
        {/* Skip to main content link - Best practice for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          Vai al contenuto principale
        </a>

        <Suspense fallback={null}>
          <NuqsAdapter>
            <AuthProvider>
              <TRPCReactProvider>
                {/* Header - navigation landmark */}
                <Header />

                {/* Main content - CRITICAL: main landmark must be direct child of body for best accessibility */}
                <main id="main-content" className="flex-1 pt-2">
                  {children}
                </main>

                {/* Footer - contentinfo landmark */}
                <Footer />

                {/* Toast notifications - outside main flow */}
                <ToastProvider />
              </TRPCReactProvider>
            </AuthProvider>
          </NuqsAdapter>
        </Suspense>

        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />

        {facebookAppId && (
          <>
            <div id="fb-root" />
            <Script id="facebook-sdk" strategy="afterInteractive">
              {`
                window.statusChangeCallback = function(response) {
                  try {
                    if (document && document.documentElement) {
                      document.documentElement.dataset.fbStatus = response.status;
                    }
                  } catch (error) {
                    // ignore
                  }
                  try {
                    window.dispatchEvent(new CustomEvent('fb-login-status', { detail: response }));
                  } catch (error) {
                    // ignore
                  }
                };

                window.checkLoginState = function() {
                  FB.getLoginStatus(function(response) {
                    window.statusChangeCallback(response);
                  });
                };

                window.fbAsyncInit = function() {
                  FB.init({
                    appId: '${facebookAppId}',
                    cookie: true,
                    xfbml: true,
                    version: '${facebookApiVersion}',
                  });
                  FB.AppEvents.logPageView();
                  FB.getLoginStatus(function(response) {
                    window.statusChangeCallback(response);
                  });
                  try {
                    window.dispatchEvent(new Event('fb-sdk-ready'));
                  } catch (error) {
                    // ignore
                  }
                };

                (function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) {return;}
                  js = d.createElement(s); js.id = id;
                  js.src = "https://connect.facebook.net/en_US/sdk.js";
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
