// sanity/components/dashboard/CustomDashboard.tsx
import { Container, Stack, Card, Heading, Text, Grid } from '@sanity/ui'
import { ContentStats } from './ContentStats'
import { QualityChecks } from './QualityChecks'
import { RecentActivity } from './RecentActivity'

export function CustomDashboard() {
  return (
    <Container width={5} style={{ minHeight: '100vh', padding: '2rem' }}>
      <Stack space={5}>
        {/* Header */}
        <Stack space={3}>
          <Heading size={4}>👋 Benvenuto nel tuo Studio</Heading>
          <Text size={2} muted>
            Panoramica generale dei tuoi contenuti e delle attività recenti
          </Text>
        </Stack>

        {/* Statistiche principali */}
        <ContentStats />

        {/* Layout a 2 colonne per Quality Checks e Recent Activity */}
        <Grid columns={[1, 1, 2]} gap={4}>
          <Stack space={4}>
            <QualityChecks />
          </Stack>

          <Stack space={4}>
            <RecentActivity />
          </Stack>
        </Grid>

        {/* Quick Actions */}
        <Card padding={4} radius={3} shadow={1} tone="primary">
          <Stack space={3}>
            <Heading size={2}>🚀 Azioni rapide</Heading>
            <Grid columns={[1, 2, 3]} gap={3}>
              <Card
                padding={3}
                radius={2}
                tone="default"
                style={{ cursor: 'pointer' }}
                onClick={() => (window.location.href = '/studio/desk/ricetta')}
              >
                <Stack space={2}>
                  <Text size={2} weight="semibold">
                    🍰 Nuova Ricetta
                  </Text>
                  <Text size={1} muted>
                    Crea una nuova ricetta
                  </Text>
                </Stack>
              </Card>

              <Card
                padding={3}
                radius={2}
                tone="default"
                style={{ cursor: 'pointer' }}
                onClick={() => (window.location.href = '/studio/desk/tecnica')}
              >
                <Stack space={2}>
                  <Text size={2} weight="semibold">
                    🔪 Nuova Tecnica
                  </Text>
                  <Text size={1} muted>
                    Aggiungi una tecnica
                  </Text>
                </Stack>
              </Card>

              <Card
                padding={3}
                radius={2}
                tone="default"
                style={{ cursor: 'pointer' }}
                onClick={() => (window.location.href = '/studio/desk/scienza')}
              >
                <Stack space={2}>
                  <Text size={2} weight="semibold">
                    🔬 Nuovo Articolo
                  </Text>
                  <Text size={1} muted>
                    Scrivi un articolo
                  </Text>
                </Stack>
              </Card>
            </Grid>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
}
