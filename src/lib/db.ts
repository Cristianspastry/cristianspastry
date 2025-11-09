/**
 * @fileoverview Database client singleton
 *
 * Prisma client singleton per evitare multiple istanze durante hot reload.
 * Next.js in development mode fa hot reload frequenti che possono causare
 * l'esaurimento delle connessioni al database.
 */

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
