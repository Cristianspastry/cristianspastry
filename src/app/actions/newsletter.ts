/**
 * @fileoverview Server Actions per gestione newsletter ConvertKit
 *
 * Gestisce l'iscrizione alla newsletter in modo sicuro lato server.
 * Le API keys non vengono mai esposte al client.
 *
 * @see https://developers.convertkit.com/#forms
 */

'use server'

/**
 * Risposta dell'API ConvertKit
 */
interface ConvertKitResponse {
  subscription: {
    id: number
    state: string
    created_at: string
    subscriber: {
      id: number
    }
  }
}

/**
 * Stato dell'operazione di iscrizione
 */
export interface NewsletterSubscribeResult {
  success: boolean
  message: string
  error?: string
}

/**
 * Iscrive un utente alla newsletter tramite ConvertKit
 *
 * @param email - Email dell'utente da iscrivere
 * @returns Risultato dell'operazione con messaggio di feedback
 *
 * @example
 * const result = await subscribeToNewsletter('user@example.com')
 * if (result.success) {
 *   // Mostra messaggio di successo
 * }
 */
export async function subscribeToNewsletter(
  email: string
): Promise<NewsletterSubscribeResult> {
  try {
    // Validazione email lato server
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return {
        success: false,
        message: 'Inserisci un indirizzo email valido',
        error: 'INVALID_EMAIL',
      }
    }

    // Verifica che le credenziali ConvertKit siano configurate
    const apiKey = process.env.CONVERTKIT_API_KEY
    const formId = process.env.CONVERTKIT_FORM_ID

    if (!apiKey || !formId) {
      console.error('ConvertKit non configurato correttamente')
      return {
        success: false,
        message: 'Servizio temporaneamente non disponibile',
        error: 'MISSING_CONFIG',
      }
    }

    // Chiamata API a ConvertKit
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: apiKey,
          email: email,
        }),
      }
    )

    // Gestione risposta
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('ConvertKit API error:', errorData)

      // Email già iscritta
      if (response.status === 400) {
        return {
          success: false,
          message: 'Sei già iscritto alla newsletter!',
          error: 'ALREADY_SUBSCRIBED',
        }
      }

      // Altri errori
      return {
        success: false,
        message: 'Errore durante l\'iscrizione. Riprova più tardi.',
        error: 'API_ERROR',
      }
    }

    const data: ConvertKitResponse = await response.json()

    // Successo
    return {
      success: true,
      message: 'Iscrizione completata! Controlla la tua email per confermare.',
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      message: 'Errore di connessione. Riprova più tardi.',
      error: 'NETWORK_ERROR',
    }
  }
}
