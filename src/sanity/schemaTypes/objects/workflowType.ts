// sanity/schemaTypes/objects/workflowType.ts
import { defineField, defineType } from 'sanity'
import { DocumentIcon, EditIcon, CheckmarkIcon, PublishIcon } from '@sanity/icons'

export const workflowType = defineType({
  name: 'workflow',
  title: 'Workflow',
  type: 'object',
  fields: [
    defineField({
      name: 'status',
      title: 'Stato',
      type: 'string',
      options: {
        list: [
          { title: '✏️ Bozza', value: 'draft' },
          { title: '👀 In Revisione', value: 'in_review' },
          { title: '✅ Approvato', value: 'approved' },
          { title: '🚀 Pubblicato', value: 'published' },
          { title: '🔄 Da Aggiornare', value: 'needs_update' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewer',
      title: 'Revisore Assegnato',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'Autore assegnato alla revisione di questo contenuto',
    }),
    defineField({
      name: 'reviewNotes',
      title: 'Note di Revisione',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'note',
              title: 'Nota',
              type: 'text',
              rows: 3,
            },
            {
              name: 'author',
              title: 'Autore Nota',
              type: 'reference',
              to: [{ type: 'author' }],
            },
            {
              name: 'createdAt',
              title: 'Data',
              type: 'datetime',
              initialValue: () => new Date().toISOString(),
            },
          ],
          preview: {
            select: {
              note: 'note',
              author: 'author.name',
              date: 'createdAt',
            },
            prepare({ note, author, date }) {
              return {
                title: note,
                subtitle: `${author} - ${new Date(date).toLocaleDateString('it-IT')}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'approvedAt',
      title: 'Data Approvazione',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'approvedBy',
      title: 'Approvato da',
      type: 'reference',
      to: [{ type: 'author' }],
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      status: 'status',
      reviewer: 'reviewer.name',
    },
    prepare({ status, reviewer }) {
      const statusLabels: Record<string, string> = {
        draft: '✏️ Bozza',
        in_review: '👀 In Revisione',
        approved: '✅ Approvato',
        published: '🚀 Pubblicato',
        needs_update: '🔄 Da Aggiornare',
      }
      return {
        title: statusLabels[status] || status,
        subtitle: reviewer ? `Revisore: ${reviewer}` : 'Nessun revisore assegnato',
      }
    },
  },
})
