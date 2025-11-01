// sanity/components/dashboard/ContentStats.tsx
'use client'
import { useEffect, useState } from 'react'
import { Card, Grid, Stack, Heading, Spinner, Flex } from '@sanity/ui'
import { useClient } from 'sanity'
import { DashboardWidget } from './DashboardWidget'

interface Stats {
  totalRecipes: number
  publishedRecipes: number
  draftRecipes: number
  totalTechniques: number
  totalScience: number
  recentPublished: number
}

export function ContentStats() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          totalRecipes,
          publishedRecipes,
          draftRecipes,
          totalTechniques,
          totalScience,
          recentPublished,
        ] = await Promise.all([
          // Totale ricette
          client.fetch('count(*[_type == "ricetta"])'),
          // Ricette pubblicate
          client.fetch('count(*[_type == "ricetta" && defined(publishedAt) && publishedAt < now()])'),
          // Ricette bozze
          client.fetch('count(*[_type == "ricetta" && (!defined(publishedAt) || publishedAt > now())])'),
          // Totale tecniche
          client.fetch('count(*[_type == "tecnica"])'),
          // Totale scienza
          client.fetch('count(*[_type == "scienza"])'),
          // Pubblicati ultimi 7 giorni
          client.fetch(
            'count(*[_type in ["ricetta", "tecnica", "scienza"] && publishedAt > now() - 60*60*24*7])'
          ),
        ])

        setStats({
          totalRecipes,
          publishedRecipes,
          draftRecipes,
          totalTechniques,
          totalScience,
          recentPublished,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [client])

  if (loading) {
    return (
      <Card padding={4}>
        <Flex align="center" justify="center" padding={4}>
          <Spinner />
        </Flex>
      </Card>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <Stack space={4}>
      <Heading size={2}>📊 Statistiche Contenuti</Heading>

      <Grid columns={[1, 2, 3]} gap={4}>
        <DashboardWidget
          title="Ricette Totali"
          value={stats.totalRecipes}
          subtitle={`${stats.publishedRecipes} pubblicate • ${stats.draftRecipes} bozze`}
          color="primary"
        />

        <DashboardWidget
          title="Tecniche"
          value={stats.totalTechniques}
          subtitle="Guide e tutorial"
          color="success"
        />

        <DashboardWidget
          title="Articoli Scientifici"
          value={stats.totalScience}
          subtitle="Scienza della pasticceria"
          color="warning"
        />

        <DashboardWidget
          title="Contenuti Totali"
          value={stats.totalRecipes + stats.totalTechniques + stats.totalScience}
          subtitle="Tutti i tipi di contenuto"
          color="default"
        />

        <DashboardWidget
          title="Pubblicati di recente"
          value={stats.recentPublished}
          subtitle="Ultimi 7 giorni"
          color="success"
        />

        <DashboardWidget
          title="Tasso Pubblicazione"
          value={`${Math.round((stats.publishedRecipes / stats.totalRecipes) * 100)}%`}
          subtitle="Ricette pubblicate"
          color={stats.publishedRecipes / stats.totalRecipes > 0.8 ? 'success' : 'warning'}
        />
      </Grid>
    </Stack>
  )
}
