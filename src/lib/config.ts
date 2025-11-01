import { CATEGORIES_QUERY } from '@/sanity/lib/queries';
import {Home, BookOpen, Beaker, User, Mail, ChefHat, Package,Calculator } from 'lucide-react'
import { env } from 'process';

export const siteConfig = {
    name: "Cristian's Pastry",
    description: "Dolci artigianali tra tradizione e passione",
    tagline: "Dolci artigianali tra tradizione e passione.",
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
      contatti: "/contatti",
      chiSono: "/chi-sono",
      scienzaDellaPasticceria: "/scienzadellapasticceria",
      tecniche: "/tecniche",
      search: "/search",
      privacy: "/privacy",
      cookie: "/cookie"
    },
    seo: {
      title: "Cristian's Pastry - Dolci Artigianali",
      description: "Scopri ricette di dolci artigianali, tecniche di pasticceria e la passione per i dolci fatti in casa.",
      keywords: ["dolci", "pasticceria", "ricette", "torte", "biscotti", "artigianale"],
      author: "Cristian Sorrentino",
      siteUrl: env.NEXT_PUBLIC_SITE_URL
    },
    CATEGORIES_QUERY
  }; 