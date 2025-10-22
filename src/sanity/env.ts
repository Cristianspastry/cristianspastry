export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-10-15'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

// Token opzionale - serve solo per operazioni di scrittura server-side
export const SANITY_API_WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}