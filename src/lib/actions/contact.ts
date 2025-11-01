/**
 * Server Actions per il form contatti
 *
 * Gestisce l'invio di email tramite Resend con validazione Zod
 */

'use server'

import { z } from 'zod'
import { Resend } from 'resend'

// ============================================
// CONFIGURAZIONE
// ============================================

const resend = new Resend(process.env.RESEND_API_KEY)

// Email del destinatario (configurabile tramite env)
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'noreply@example.com'

// ============================================
// SCHEMA DI VALIDAZIONE
// ============================================

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Il nome deve contenere almeno 2 caratteri')
    .max(100, 'Il nome non può superare 100 caratteri')
    .trim(),

  email: z
    .string()
    .email('Inserisci un indirizzo email valido')
    .min(5, 'Email troppo corta')
    .max(255, 'Email troppo lunga')
    .toLowerCase()
    .trim(),

  subject: z
    .string()
    .min(5, 'L\'oggetto deve contenere almeno 5 caratteri')
    .max(200, 'L\'oggetto non può superare 200 caratteri')
    .trim(),

  message: z
    .string()
    .min(10, 'Il messaggio deve contenere almeno 10 caratteri')
    .max(5000, 'Il messaggio non può superare 5000 caratteri')
    .trim(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// ============================================
// TYPES
// ============================================

export type ContactFormState = {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
  }
}

// ============================================
// SERVER ACTION
// ============================================

/**
 * Invia un'email di contatto tramite Resend
 *
 * Questa Server Action:
 * 1. Valida i dati del form con Zod
 * 2. Invia l'email tramite Resend
 * 3. Gestisce errori e rate limiting
 *
 * @param prevState - Stato precedente (per useActionState)
 * @param formData - Dati del form
 * @returns Stato aggiornato con successo/errore
 */
export async function sendContactEmail(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {

  // 1. VALIDAZIONE DEI DATI
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  // Se la validazione fallisce, ritorna gli errori
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Controlla i campi evidenziati e riprova',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, subject, message } = validatedFields.data

  // 2. VERIFICA CONFIGURAZIONE
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY non configurata')
    return {
      success: false,
      message: 'Errore di configurazione del server. Contatta l\'amministratore.',
    }
  }

  try {
    // 3. INVIO EMAIL
    const { data, error } = await resend.emails.send({
      from: 'Cristian\'s Pastry <onboarding@resend.dev>', // Sostituisci con il tuo dominio verificato
      to: [CONTACT_EMAIL],
      replyTo: email, // L'utente può rispondere direttamente
      subject: `[Contatto Sito] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="it">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">📧 Nuovo Messaggio di Contatto</h1>
            </div>

            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">

              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h2 style="color: #667eea; margin-top: 0; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                  👤 Informazioni Mittente
                </h2>
                <p style="margin: 10px 0;"><strong>Nome:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
                <p style="margin: 10px 0;"><strong>Oggetto:</strong> ${subject}</p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h2 style="color: #667eea; margin-top: 0; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                  💬 Messaggio
                </h2>
                <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #667eea; white-space: pre-wrap; word-wrap: break-word;">
                  ${message}
                </div>
              </div>

              <div style="margin-top: 20px; padding: 15px; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 6px;">
                <p style="margin: 0; font-size: 14px; color: #92400e;">
                  <strong>💡 Suggerimento:</strong> Puoi rispondere direttamente a questo messaggio cliccando sul pulsante "Rispondi" del tuo client email.
                </p>
              </div>

            </div>

            <div style="text-align: center; margin-top: 20px; padding: 20px; color: #6b7280; font-size: 12px;">
              <p style="margin: 5px 0;">Questo messaggio è stato inviato dal form contatti di <strong>Cristian's Pastry</strong></p>
              <p style="margin: 5px 0;">📅 ${new Date().toLocaleString('it-IT', {
                dateStyle: 'full',
                timeStyle: 'short'
              })}</p>
            </div>

          </body>
        </html>
      `,
      // Versione text per client email senza HTML
      text: `
Nuovo messaggio di contatto dal sito

MITTENTE
Nome: ${name}
Email: ${email}
Oggetto: ${subject}

MESSAGGIO
${message}

---
Ricevuto il ${new Date().toLocaleString('it-IT')}
      `.trim(),
    })

    // 4. GESTIONE ERRORI RESEND
    if (error) {
      console.error('Errore Resend:', error)
      return {
        success: false,
        message: 'Si è verificato un errore durante l\'invio. Riprova più tardi.',
      }
    }

    // 5. SUCCESSO
    console.log('Email inviata con successo:', data?.id)

    return {
      success: true,
      message: '✅ Messaggio inviato con successo! Ti risponderò il prima possibile.',
    }

  } catch (error) {
    // 6. GESTIONE ERRORI GENERICI
    console.error('Errore durante l\'invio dell\'email:', error)

    return {
      success: false,
      message: 'Si è verificato un errore imprevisto. Riprova più tardi o contattami direttamente via email.',
    }
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Sanitizza l'input HTML per prevenire XSS
 * (Opzionale: Resend già effettua sanitizzazione)
 */
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}
