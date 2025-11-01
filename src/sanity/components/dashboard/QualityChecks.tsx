// sanity/components/dashboard/QualityChecks.tsx
'use client'
import { useEffect, useState } from 'react'
import { Card, Stack, Heading, Box, Text, Flex, Button, Spinner } from '@sanity/ui'
import { useClient } from 'sanity'
import { WarningOutlineIcon, CheckmarkIcon } from '@sanity/icons'

interface QualityIssue {
  label: string
  count: number
  type: 'warning' | 'success'
  query: string
}

export function QualityChecks() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [issues, setIssues] = useState<QualityIssue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQualityChecks() {
      try {
        const checks: QualityIssue[] = [
          {
            label: 'Ricette senza immagine',
            count: await client.fetch('count(*[_type == "ricetta" && !defined(mainImage)])'),
            type: 'warning',
            query: '_type == "ricetta" && !defined(mainImage)',
          },
          {
            label: 'Ricette senza categoria',
            count: await client.fetch(
              'count(*[_type == "ricetta" && (!defined(categories) || count(categories) == 0)])'
            ),
            type: 'warning',
            query: '_type == "ricetta" && (!defined(categories) || count(categories) == 0)',
          },
          {
            label: 'Contenuti senza meta description',
            count: await client.fetch(
              'count(*[_type in ["ricetta", "tecnica", "scienza"] && !defined(seo.metaDescription)])'
            ),
            type: 'warning',
            query: '_type in ["ricetta", "tecnica", "scienza"] && !defined(seo.metaDescription)',
          },
          {
            label: 'Contenuti senza focus keyphrase',
            count: await client.fetch(
              'count(*[_type in ["ricetta", "tecnica", "scienza"] && !defined(seo.focusKeyphrase)])'
            ),
            type: 'warning',
            query: '_type in ["ricetta", "tecnica", "scienza"] && !defined(seo.focusKeyphrase)',
          },
          {
            label: 'Ricette senza ingredienti',
            count: await client.fetch(
              'count(*[_type == "ricetta" && (!defined(ingredients) || count(ingredients) == 0)])'
            ),
            type: 'warning',
            query: '_type == "ricetta" && (!defined(ingredients) || count(ingredients) == 0)',
          },
          {
            label: 'Ricette senza istruzioni',
            count: await client.fetch(
              'count(*[_type == "ricetta" && (!defined(instructions) || count(instructions) == 0)])'
            ),
            type: 'warning',
            query: '_type == "ricetta" && (!defined(instructions) || count(instructions) == 0)',
          },
        ]

        setIssues(checks)
      } catch (error) {
        console.error('Error fetching quality checks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQualityChecks()
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

  const totalIssues = issues.reduce((sum, issue) => sum + issue.count, 0)

  return (
    <Stack space={4}>
      <Flex align="center" justify="space-between">
        <Heading size={2}>⚠️ Quality Checks</Heading>
        {totalIssues === 0 ? (
          <Flex align="center" gap={2}>
            <CheckmarkIcon style={{ color: '#43d675' }} />
            <Text size={1} weight="semibold" style={{ color: '#43d675' }}>
              Tutto OK!
            </Text>
          </Flex>
        ) : (
          <Text size={1} weight="semibold" style={{ color: '#f4b344' }}>
            {totalIssues} problemi trovati
          </Text>
        )}
      </Flex>

      <Card padding={4} radius={3} shadow={1}>
        <Stack space={3}>
          {issues.map((issue, index) => (
            <Box key={index}>
              <Flex align="center" justify="space-between" paddingY={2}>
                <Flex align="center" gap={3}>
                  {issue.count > 0 ? (
                    <WarningOutlineIcon style={{ color: '#f4b344' }} />
                  ) : (
                    <CheckmarkIcon style={{ color: '#43d675' }} />
                  )}
                  <Text size={1}>{issue.label}</Text>
                </Flex>
                <Flex align="center" gap={3}>
                  <Text
                    size={1}
                    weight="bold"
                    style={{ color: issue.count > 0 ? '#f4b344' : '#43d675' }}
                  >
                    {issue.count}
                  </Text>
                  {issue.count > 0 && (
                    <Button
                      text="Visualizza"
                      mode="ghost"
                      fontSize={1}
                      padding={2}
                      onClick={() => {
                        // Navigate to filtered view
                        window.location.href = `/studio/desk?filter=${encodeURIComponent(issue.query)}`
                      }}
                    />
                  )}
                </Flex>
              </Flex>
              {index < issues.length - 1 && (
                <Box paddingTop={2} style={{ borderBottom: '1px solid #e1e3e6' }} />
              )}
            </Box>
          ))}
        </Stack>
      </Card>
    </Stack>
  )
}
