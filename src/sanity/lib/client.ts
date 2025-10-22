import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,SANITY_API_WRITE_TOKEN } from '../env'


// client per sola lettura 
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})


// client per lettura e scrittura
export const clientWithWrite = createClient({
  projectId,
  dataset:"production",
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: SANITY_API_WRITE_TOKEN ,
})