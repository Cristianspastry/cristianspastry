/**
 * Core Libraries - Configurazioni e client per servizi esterni
 * 
 * Centralizza tutte le connessioni a database, CMS e servizi esterni.
 */

// ============================================
// SANITY CMS CLIENT
// ============================================

import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, SANITY_API_WRITE_TOKEN } from '@/sanity/env';

const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);
const RETRYABLE_CODES = new Set([
  'EAI_AGAIN',
  'ENOTFOUND',
  'ECONNRESET',
  'ETIMEDOUT',
  'ECONNREFUSED',
]);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableNetworkError = (error: unknown) => {
  if (!error || typeof error !== 'object') return false;
  const err = error as { message?: string; cause?: { code?: string }; code?: string };
  const code = err.cause?.code ?? err.code;
  if (code && RETRYABLE_CODES.has(code)) return true;
  return Boolean(err.message && err.message.toLowerCase().includes('fetch failed'));
};

const fetchWithRetry: typeof fetch = async (input, init) => {
  const maxAttempts = 3;
  let attempt = 0;
  let delayMs = 250;

  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      const response = await fetch(input, init);
      if (!RETRYABLE_STATUS.has(response.status) || attempt >= maxAttempts) {
        return response;
      }
    } catch (error) {
      if (!isRetryableNetworkError(error) || attempt >= maxAttempts) {
        throw error;
      }
    }

    await sleep(delayMs);
    delayMs *= 2;
  }

  return fetch(input, init);
};

/**
 * Sanity client per operazioni di lettura (usa CDN)
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  fetch: fetchWithRetry as any,
});

/**
 * Sanity client per operazioni di scrittura (no CDN, con token)
 */
export const sanityWriteClient = createClient({
  projectId,
  dataset: 'production',
  apiVersion,
  useCdn: false,
  token: SANITY_API_WRITE_TOKEN,
  fetch: fetchWithRetry as any,
});

// ============================================
// PRISMA DATABASE CLIENT
// ============================================

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma client singleton per evitare multiple istanze durante hot reload
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// ============================================
// EXPORT PER BACKWARD COMPATIBILITY
// ============================================

// Export alias per mantenere compatibilità con il codice esistente
export const client = sanityClient;
export const clientWithWrite = sanityWriteClient;
export const db = prisma;
