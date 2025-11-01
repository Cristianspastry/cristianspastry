'use client'

import { BookOpen, Wrench, Beaker, TrendingUp } from 'lucide-react'

interface AboutStatsProps {
  recipeCount?: number
  techniqueCount?: number
  scienceCount?: number
}

export default function AboutStats({ recipeCount = 0, techniqueCount = 0, scienceCount = 0 }: AboutStatsProps) {
  const totalContent = recipeCount + techniqueCount + scienceCount

  const stats = [
    {
      icon: TrendingUp,
      value: totalContent,
      label: 'Contenuti Totali',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: BookOpen,
      value: recipeCount,
      label: 'Ricette',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: Wrench,
      value: techniqueCount,
      label: 'Tecniche',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Beaker,
      value: scienceCount,
      label: 'Articoli Scientifici',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ]

  return (
    <section>
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
        I Miei Numeri
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 transition-all hover:shadow-2xl"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-5`} />
            <div className="relative">
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-7 w-7 ${stat.iconColor}`} />
              </div>
              <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
              <div className="mt-2 text-sm font-semibold text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
