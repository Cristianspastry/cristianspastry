// sanity/actions/schedulePublish.tsx
import type { DocumentActionComponent } from 'sanity'
import { useClient } from 'sanity'
import { CalendarIcon } from '@sanity/icons'
import { useToast, Dialog, Stack, Button, Card, Text, Box } from '@sanity/ui'
import { useState } from 'react'

export const schedulePublishAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: '2024-01-01' })
  const toast = useToast()
  const { type, draft, id } = props
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  // Solo per i tipi di contenuto che supportiamo
  if (!['ricetta', 'tecnica', 'scienza'].includes(type)) {
    return null
  }

  // Solo per bozze
  if (!draft) {
    return null
  }

  const handleSchedule = async () => {
    try {
      if (!selectedDate) {
        toast.push({
          status: 'error',
          title: 'Data mancante',
          description: 'Seleziona una data per la pubblicazione programmata',
        })
        return
      }

      await client
        .patch(id)
        .set({ publishedAt: new Date(selectedDate).toISOString() })
        .commit()

      toast.push({
        status: 'success',
        title: 'Pubblicazione programmata',
        description: `Il contenuto sarà pubblicato il ${new Date(selectedDate).toLocaleDateString('it-IT')}`,
      })

      setDialogOpen(false)
      props.onComplete()
    } catch (error) {
      console.error('Errore durante la programmazione:', error)
      toast.push({
        status: 'error',
        title: 'Errore',
        description: 'Impossibile programmare la pubblicazione',
      })
    }
  }

  return {
    label: 'Programma pubblicazione',
    icon: CalendarIcon,
    tone: 'primary',
    onHandle: () => {
      setDialogOpen(true)
    },
    dialog: isDialogOpen && {
      type: 'dialog',
      onClose: () => setDialogOpen(false),
      header: 'Programma pubblicazione',
      content: (
        <Card padding={4}>
          <Stack space={4}>
            <Text size={1}>
              Seleziona la data e l'ora in cui vuoi pubblicare questo contenuto
            </Text>
            <Box>
              <input
                type="datetime-local"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </Box>
            <Stack space={2}>
              <Button
                text="Programma"
                tone="primary"
                onClick={handleSchedule}
                disabled={!selectedDate}
              />
              <Button text="Annulla" mode="ghost" onClick={() => setDialogOpen(false)} />
            </Stack>
          </Stack>
        </Card>
      ),
    },
  }
}
