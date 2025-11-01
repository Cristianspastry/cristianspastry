// sanity/components/dashboard/RecentActivity.tsx
'use client'
import { useEffect, useState } from 'react'
import { Card, Stack, Heading, Box, Text, Flex, Badge, Spinner } from '@sanity/ui'
import { useClient } from 'sanity'
import { DocumentIcon, EditIcon } from '@sanity/icons'

interface Activity {
  _id: string
  _type: string
  title: string
  _createdAt: string
  _updatedAt: string
  publishedAt?: string
}

export function RecentActivity() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [recentCreated, setRecentCreated] = useState<Activity[]>([])
  const [recentUpdated, setRecentUpdated] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivity() {
      try {
        const [created, updated] = await Promise.all([
          client.fetch(
            `*[_type in ["ricetta", "tecnica", "scienza"]] | order(_createdAt desc)[0...5] {
              _id,
              _type,
              title,
              _createdAt,
              _updatedAt,
              publishedAt
            }`
          ),
          client.fetch(
            `*[_type in ["ricetta", "tecnica", "scienza"]] | order(_updatedAt desc)[0...5] {
              _id,
              _type,
              title,
              _createdAt,
              _updatedAt,
              publishedAt
            }`
          ),
        ])

        setRecentCreated(created)
        setRecentUpdated(updated)
      } catch (error) {
        console.error('Error fetching activity:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ricetta':
        return { label: 'Ricetta', emoji: '🍰', color: 'primary' }
      case 'tecnica':
        return { label: 'Tecnica', emoji: '🔪', color: 'success' }
      case 'scienza':
        return { label: 'Scienza', emoji: '🔬', color: 'warning' }
      default:
        return { label: type, emoji: '📄', color: 'default' }
    }
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Pochi minuti fa'
    if (diffInHours < 24) return `${diffInHours}h fa`
    if (diffInHours < 48) return 'Ieri'
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} giorni fa`
    return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })
  }

  const ActivityList = ({ items, icon: Icon }: { items: Activity[]; icon: typeof DocumentIcon }) => (
    <Stack space={2}>
      {items.map((item) => {
        const typeInfo = getTypeLabel(item._type)
        const isPublished = item.publishedAt && new Date(item.publishedAt) <= new Date()

        return (
          <Card
            key={item._id}
            padding={3}
            radius={2}
            tone="default"
            style={{ cursor: 'pointer', borderLeft: `3px solid #2276fc` }}
            onClick={() => {
              window.location.href = `/studio/desk/${item._type};${item._id}`
            }}
          >
            <Flex align="center" gap={3}>
              <Icon style={{ flexShrink: 0 }} />
              <Stack space={2} flex={1}>
                <Text size={1} weight="semibold">
                  {item.title}
                </Text>
                <Flex align="center" gap={2}>
                  <Text size={0} style={{ color: '#66758d' }}>
                    {typeInfo.emoji} {typeInfo.label}
                  </Text>
                  <Text size={0} muted>
                    •
                  </Text>
                  <Text size={0} muted>
                    {formatDate(item._createdAt)}
                  </Text>
                  {!isPublished && (
                    <>
                      <Text size={0} muted>
                        •
                      </Text>
                      <Badge tone="caution" fontSize={0}>
                        Bozza
                      </Badge>
                    </>
                  )}
                </Flex>
              </Stack>
            </Flex>
          </Card>
        )
      })}
    </Stack>
  )

  return (
    <Stack space={4}>
      <Stack space={4}>
        <Heading size={2}>🆕 Creati di recente</Heading>
        <ActivityList items={recentCreated} icon={DocumentIcon} />
      </Stack>

      <Stack space={4}>
        <Heading size={2}>✏️ Modificati di recente</Heading>
        <ActivityList items={recentUpdated} icon={EditIcon} />
      </Stack>
    </Stack>
  )
}
