'use client'

import { useCallback, useEffect } from 'react'
import { StringInputProps, set, unset } from 'sanity'
import { TextInput, Stack, Card, Text, Box } from '@sanity/ui'

// Funzione per estrarre ASIN (duplicata qui per uso in Sanity Studio)
function extractASIN(url: string): string | null {
  if (!url) return null

  try {
    const patterns = [
      /\/dp\/([A-Z0-9]{10})/i,
      /\/product\/([A-Z0-9]{10})/i,
      /\/gp\/product\/([A-Z0-9]{10})/i,
      /\/exec\/obidos\/ASIN\/([A-Z0-9]{10})/i,
      /amazon\.[a-z.]+\/([A-Z0-9]{10})/i,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  } catch (error) {
    return null
  }
}

export function AmazonURLInput(props: StringInputProps) {
  const { value, onChange, elementProps } = props

  // Estrae ASIN quando l'URL cambia
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      onChange(newValue ? set(newValue) : unset())

      // Estrai ASIN e aggiornalo nel documento
      if (newValue) {
        const asin = extractASIN(newValue)
        if (asin) {
          // Aggiorna il campo ASIN nel documento
          // Nota: questo richiede accesso al document context
          setTimeout(() => {
            const form = document.querySelector('[data-testid="field-asin"] input') as HTMLInputElement
            if (form && form.value !== asin) {
              // Trigger change event per Sanity
              const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'value'
              )?.set
              if (nativeInputValueSetter) {
                nativeInputValueSetter.call(form, asin)
                const event = new Event('input', { bubbles: true })
                form.dispatchEvent(event)
              }
            }
          }, 100)
        }
      }
    },
    [onChange]
  )

  const asin = value ? extractASIN(value) : null

  return (
    <Stack space={3}>
      <TextInput
        {...elementProps}
        value={value || ''}
        onChange={handleChange}
        placeholder="https://www.amazon.it/dp/B07VGRJDFY..."
      />

      {value && asin && (
        <Card padding={3} radius={2} tone="positive" border>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              ✅ ASIN estratto con successo
            </Text>
            <Box>
              <Text size={1} muted>
                <strong>ASIN:</strong> {asin}
              </Text>
            </Box>
            <Text size={0} muted>
              Il campo ASIN verrà aggiornato automaticamente quando salvi.
            </Text>
          </Stack>
        </Card>
      )}

      {value && !asin && (
        <Card padding={3} radius={2} tone="caution" border>
          <Text size={1}>
            ⚠️ ASIN non trovato. Verifica che il link sia valido.
          </Text>
        </Card>
      )}
    </Stack>
  )
}
