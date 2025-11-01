// sanity/components/WorkflowBadge.tsx
import { Badge, Card, Stack, Text, Button, Flex } from '@sanity/ui'
import { CheckmarkIcon, EditIcon, EyeOpenIcon } from '@sanity/icons'

interface WorkflowBadgeProps {
  status?: string
  reviewer?: { name: string }
  onStatusChange?: (newStatus: string) => void
}

export function WorkflowBadge({ status = 'draft', reviewer, onStatusChange }: WorkflowBadgeProps) {
  const statusConfig = {
    draft: { label: 'Bozza', tone: 'default' as const, icon: EditIcon },
    in_review: { label: 'In Revisione', tone: 'caution' as const, icon: EyeOpenIcon },
    approved: { label: 'Approvato', tone: 'positive' as const, icon: CheckmarkIcon },
    published: { label: 'Pubblicato', tone: 'primary' as const, icon: CheckmarkIcon },
    needs_update: { label: 'Da Aggiornare', tone: 'critical' as const, icon: EditIcon },
  }

  const config = statusConfig[status as keyof typeof statusConfig] ?? statusConfig.draft
  const Icon = config.icon

  return (
    <Card padding={3} radius={2} shadow={1} tone={config.tone}>
      <Stack space={3}>
        <Flex align="center" gap={2}>
          <Icon />
          <Badge tone={config.tone} fontSize={1}>
            {config.label}
          </Badge>
        </Flex>

        {reviewer && (
          <Text size={1} muted>
            Revisore: {reviewer.name}
          </Text>
        )}

        {onStatusChange && (
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Cambia stato:
            </Text>
            <Flex gap={2} wrap="wrap">
              {status === 'draft' && (
                <Button
                  text="Invia in revisione"
                  tone="caution"
                  fontSize={1}
                  onClick={() => onStatusChange('in_review')}
                />
              )}
              {status === 'in_review' && (
                <>
                  <Button
                    text="Approva"
                    tone="positive"
                    fontSize={1}
                    onClick={() => onStatusChange('approved')}
                  />
                  <Button
                    text="Richiedi modifiche"
                    tone="critical"
                    fontSize={1}
                    onClick={() => onStatusChange('needs_update')}
                  />
                </>
              )}
              {status === 'approved' && (
                <Button
                  text="Pubblica"
                  tone="primary"
                  fontSize={1}
                  onClick={() => onStatusChange('published')}
                />
              )}
              {status === 'needs_update' && (
                <Button
                  text="Reinvia in revisione"
                  tone="caution"
                  fontSize={1}
                  onClick={() => onStatusChange('in_review')}
                />
              )}
            </Flex>
          </Stack>
        )}
      </Stack>
    </Card>
  )
}
