/**
 * Site Configuration - Configurazione principale del sito
 * 
 * Centralizza tutte le costanti e configurazioni dell'applicazione.
 */

import { CATEGORIES_QUERY } from '@/sanity/lib/queries';
import { Home, BookOpen, Beaker, User, Mail, ChefHat, Package, Calculator } from 'lucide-react';

export const siteConfig = {
  name: "Cristian's Pastry",
  description: "Cristian's Pastry nasce dalla convinzione che dietro ogni dolce perfetto ci sia conoscenza, tecnica e passione. Qui troverai ricette artigianali raccontate nel dettaglio, la scienza che rende possibile ogni trasformazione, e gli strumenti per calcolare, creare e stupire. Benvenuto nel mondo dove la pasticceria diventa arte accessibile.",
  tagline: "La pasticceria spiegata con passione.",
  author: "Cristian Sorrentino",
  
  navigation: [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Ricette', href: '/ricette', icon: ChefHat },
    { name: 'Tecniche', href: '/tecniche', icon: BookOpen },
    { name: 'Scienza', href: '/scienza', icon: Beaker },
    { name: 'Calcolatori', href: '/calcolatori', icon: Calculator },
    { name: 'Strumenti', href: '/strumenti', icon: Package },
    { name: 'Chi Sono', href: '/chi-sono', icon: User },
  ],
  
  social: {
    instagram: {
      url: "https://instagram.com/cristianspastry",
      label: "Instagram"
    },
    youtube: {
      url: "https://youtube.com/@cristianspastry",
      label: "YouTube"
    },
    facebook: {
      url: "https://facebook.com/cristianspastry",
      label: "Facebook"
    },
    x: {
      url: "https://x.com/cristianspastry",
      label: "X"
    },
    tiktok: {
      url: "https://tiktok.com/@cristianspastry",
      label: "TikTok"
    }
  },
  
  contact: {
    email: "info@cristianspastry.com",
    phone: "+39 349 119 3489"
  },
  
  links: {
    home: "/",
    ricette: "/ricette",
    tecniche: "/tecniche",
    scienza: "/scienza",
    calcolatori: "/calcolatori",
    strumenti: "/strumenti",
    chiSono: "/chi-sono",
    search: "/search",
    privacy: "/privacy",
    terms: "/terms",
    cookie: "https://www.iubenda.com/privacy-policy/67085013/cookie-policy"
  },
  
  seo: {
    title: "Cristian's Pastry - Dolci Artigianali",
    description: "Ricette artigianali, scienza della pasticceria e tecniche professionali. Trasforma la tua cucina in un laboratorio dolciario con passione e precisione.",
    keywords: ["dolci", "pasticceria", "ricette", "torte", "biscotti", "artigianale"],
    author: "Cristian Sorrentino",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL
  },
  
  // Query Sanity condivise
  queries: {
    CATEGORIES_QUERY
  }
};

// Route paths constants per evitare hardcoding
export const ROUTES = {
  HOME: '/',
  RECIPES: '/ricette',
  TECHNIQUES: '/tecniche',
  SCIENCE: '/scienza',
  CALCULATORS: '/calcolatori',
  TOOLS: '/strumenti',
  ABOUT: '/chi-sono',
  SEARCH: '/search',
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNOUT: '/auth/signout',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PROFILE: '/profilo',
  ADMIN: '/admin',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;

// Cache configuration
export const CACHE_CONFIG = {
  RECIPES_LIST: 3600, // 1 hour
  RECIPE_DETAIL: 7200, // 2 hours
  CATEGORIES: 86400, // 24 hours
  TECHNIQUES: 7200, // 2 hours
  SCIENCE: 7200, // 2 hours
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 48,
  PAGE_SIZES: [6, 12, 24, 48],
} as const;
