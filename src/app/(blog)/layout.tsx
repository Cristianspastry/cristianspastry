import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Navbar from "@/components/layout/navBar";
import Footer from "@/components/layout/footer";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Cristian's Pastry | Dolci delizie fatte in casa",
    template: "%s | Cristian's Pastry"
  },
  description: "Scopri le ricette di pasticceria più deliziose e i segreti del mestiere con Cristian's Pastry. Dai classici italiani alle creazioni moderne, tutto fatto in casa con passione.",
  keywords: ['pasticceria', 'dolci', 'ricette', 'dessert', 'torte', 'biscotti', 'Cristian'],
  authors: [{ name: 'Cristian' }],
  creator: 'Cristian',
  publisher: "Cristian's Pastry",
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.cristianspastry.com',
    siteName: "Cristian's Pastry",
    title: "Cristian's Pastry | L'arte della pasticceria fatta in casa",
    description: "Entra nel dolce mondo di Cristian's Pastry: ricette, consigli e tutorial per creare dessert straordinari nella tua cucina.",
    images: [
      {
        url: 'https://www.cristianspastry.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Cristian's Pastry - Deliziosi dolci fatti in casa"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cristian's Pastry | Dolci fatti con amore",
    description: "Ricette di pasticceria, consigli e trucchi del mestiere da Cristian's Pastry. Rendi speciale ogni momento con i nostri dolci.",
    images: ['https://www.cristianspastry.com/twitter-image.jpg'],
    creator: '@CristiansPastry'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
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
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      me: ['your-personal-website-url', 'mailto:your-email@example.com'],
    },
  },
}

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
