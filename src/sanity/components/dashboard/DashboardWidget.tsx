// sanity/components/dashboard/DashboardWidget.tsx
import { Card, Flex, Stack, Text, Heading, Box } from '@sanity/ui'
import { ComponentType } from 'react'

interface DashboardWidgetProps {
  title: string
  value?: string | number
  subtitle?: string
  icon?: ComponentType
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'default'
  trend?: {
    value: number
    label: string
  }
}

const colorMap = {
  primary: '#2276fc',
  success: '#43d675',
  warning: '#f4b344',
  danger: '#f03e2f',
  default: '#66758d',
}

export function DashboardWidget({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'default',
  trend,
}: DashboardWidgetProps) {
  return (
    <Card padding={4} radius={3} shadow={1} tone="default">
      <Stack space={3}>
        <Flex align="center" justify="space-between">
          <Text size={1} weight="semibold" style={{ color: '#66758d' }}>
            {title}
          </Text>
          {Icon && (
            <Box style={{ color: colorMap[color] }}>
              <Icon />
            </Box>
          )}
        </Flex>

        {value !== undefined && (
          <Heading size={3} style={{ color: colorMap[color] }}>
            {value}
          </Heading>
        )}

        {subtitle && (
          <Text size={1} muted>
            {subtitle}
          </Text>
        )}

        {trend && (
          <Flex align="center" gap={2}>
            <Text
              size={1}
              weight="medium"
              style={{
                color: trend.value >= 0 ? colorMap.success : colorMap.danger,
              }}
            >
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
            </Text>
            <Text size={1} muted>
              {trend.label}
            </Text>
          </Flex>
        )}
      </Stack>
    </Card>
  )
}
