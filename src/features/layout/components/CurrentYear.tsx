'use client'

/**
 * Componente client-side per mostrare l'anno corrente
 *
 * Con Cache Components, usare new Date() in un Server Component
 * richiede di accedere prima a dati dinamici (cookies, headers, etc).
 * Per evitare questo, il copyright viene renderizzato lato client.
 */
export function CurrentYear() {
  return <>{new Date().getFullYear()}</>
}
