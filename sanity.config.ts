'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig, definePlugin} from 'sanity'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'
import type {Plugin} from 'sanity'
import { HomeIcon } from '@sanity/icons'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import { siteConfig } from '@/lib/config'
import { CustomDashboard } from './src/sanity/components/dashboard'
import { bulkPublishAction, bulkUnpublishAction, schedulePublishAction } from './src/sanity/actions'
import { ExtractASINAction } from './src/sanity/actions/ExtractASINAction'

// Plugin personalizzato per la dashboard
const dashboardPlugin = definePlugin({
  name: 'dashboard-plugin',
  studio: {
    components: {
      layout: (props) => {
        // Aggiungi un link alla dashboard nella navbar
        return props.renderDefault(props)
      },
    },
  },
  tools: [
    {
      name: 'dashboard',
      title: 'Dashboard',
      icon: HomeIcon,
      component: CustomDashboard,
    },
  ],
})

export default defineConfig({
  name : 'default',
  title : siteConfig.name,
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    (media as () => Plugin)(),
    // Dashboard personalizzata
    dashboardPlugin(),
  ],
  // Document actions personalizzate
  document: {
    actions: (prev, context) => {
      // Azioni per prodotti Amazon
      if (context.schemaType === 'product') {
        return [
          ...prev,
          ExtractASINAction,
        ]
      }

      // Aggiungi le azioni personalizzate per i tipi di contenuto supportati
      if (['ricetta', 'tecnica', 'scienza'].includes(context.schemaType)) {
        return [
          ...prev,
          bulkPublishAction,
          bulkUnpublishAction,
          schedulePublishAction,
        ]
      }
      return prev
    },
  },
})


