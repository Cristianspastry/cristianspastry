import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, SANITY_API_WRITE_TOKEN } from '../env'

const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504])
const RETRYABLE_CODES = new Set([
  'EAI_AGAIN',
  'ENOTFOUND',
  'ECONNRESET',
  'ETIMEDOUT',
  'ECONNREFUSED',
])

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const isRetryableNetworkError = (error: unknown) => {
  if (!error || typeof error !== 'object') return false
  const err = error as { message?: string; cause?: { code?: string }; code?: string }
  const code = err.cause?.code ?? err.code
  if (code && RETRYABLE_CODES.has(code)) return true
  return Boolean(err.message && err.message.toLowerCase().includes('fetch failed'))
}

const fetchWithRetry: typeof fetch = async (input, init) => {
  const maxAttempts = 3
  let attempt = 0
  let delayMs = 250

  while (attempt < maxAttempts) {
    attempt += 1
    try {
      const response = await fetch(input, init)
      if (!RETRYABLE_STATUS.has(response.status) || attempt >= maxAttempts) {
        return response
      }
    } catch (error) {
      if (!isRetryableNetworkError(error) || attempt >= maxAttempts) {
        throw error
      }
    }

    await sleep(delayMs)
    delayMs *= 2
  }

  return fetch(input, init)
}

// client per sola lettura
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // use CDN for read-only to reduce errors and improve latency
  fetch: fetchWithRetry as any,
})

// client per lettura e scrittura
export const clientWithWrite = createClient({
  projectId,
  dataset: 'production',
  apiVersion,
  useCdn: false, // keep direct API for writes
  token: SANITY_API_WRITE_TOKEN,
  fetch: fetchWithRetry as any,
})
