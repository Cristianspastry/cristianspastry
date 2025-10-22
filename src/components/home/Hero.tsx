'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChefHat, BookOpen, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-50 md:text-6xl">
            Ogni dolce ha un’anima. Io racconto la sua storia, un morso alla volta.
              
            </h1>
            <p className="mb-8 text-lg text-primary-100 md:text-xl">
            Ricette sincere, passione artigianale e {" "}
            il profumo di un sogno che lievita ogni giorno.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-white text-primary-900 hover:bg-primary-50">
              <Link href="/ricette">
                <ChefHat className="mr-2 h-5 w-5" />
                Esplora Ricette
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-primary-900 hover:bg-white/10">
              <Link href="/tecniche">
                <BookOpen className="mr-2 h-5 w-5" />
                Impara le Tecniche
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid gap-8 md:grid-cols-3"
          >
            <div className="rounded-lg border border-primary-700 bg-primary-800/50 backdrop-blur p-6">
              <ChefHat className="mx-auto mb-4 h-10 w-10 text-primary-200" />
              <h3 className="mb-2 font-semibold text-white">
                Ricette Dettagliate
              </h3>
              <p className="text-sm text-primary-100">
                Istruzioni passo-passo per dolci perfetti
              </p>
            </div>
            <div className="rounded-lg border border-primary-700 bg-primary-800/50 backdrop-blur p-6">
              <BookOpen className="mx-auto mb-4 h-10 w-10 text-primary-200" />
              <h3 className="mb-2 font-semibold text-white">
                Tecniche Professionali
              </h3>
              <p className="text-sm text-primary-100">
                Impara i segreti dei maestri pasticceri
              </p>
            </div>
            <div className="rounded-lg border border-primary-700 bg-primary-800/50 backdrop-blur p-6">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-primary-200" />
              <h3 className="mb-2 font-semibold text-white">
                Scienza del Dolce
              </h3>
              <p className="text-sm text-primary-100">
                Comprendi la chimica e la fisica della pasticceria
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}