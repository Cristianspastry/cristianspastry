import { defineField, defineType } from 'sanity'

export const tecnicaType = defineType({
  name: 'tecnica',
  title: 'Tecniche',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenuto', default: true },
    { name: 'details', title: 'Dettagli' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Contenuto Principale
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required().max(80).warning('Il titolo dovrebbe essere sotto i 80 caratteri per la SEO'),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Descrizione breve',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(160).warning('La descrizione dovrebbe essere sotto i 160 caratteri'),
      description: 'Breve descrizione della tecnica (usata per SEO e preview)',
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Immagine principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Testo alternativo',
          validation: (Rule) => Rule.required(),
          description: 'Importante per SEO e accessibilità',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Didascalia',
        },
      ],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    // Dettagli Tecnica
    defineField({
      name: 'difficulty',
      title: 'Livello di difficoltà',
      type: 'string',
      options: {
        list: [
          { title: 'Base', value: 'base' },
          { title: 'Intermedio', value: 'intermedio' },
          { title: 'Avanzato', value: 'avanzato' },
          { title: 'Professionale', value: 'professionale' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'executionTime',
      title: 'Tempo di esecuzione (minuti)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      description: 'Tempo medio necessario per eseguire la tecnica',
      group: 'details',
    }),
    defineField({
      name: 'category',
      title: 'Categoria tecnica',
      type: 'string',
      options: {
        list: [
          { title: 'Lavorazione impasti', value: 'impasti' },
          { title: 'Cottura', value: 'cottura' },
          { title: 'Decorazione', value: 'decorazione' },
          { title: 'Montaggio', value: 'montaggio' },
          { title: 'Conservazione', value: 'conservazione' },
          { title: 'Temperaggio', value: 'temperaggio' },
          { title: 'Lievitazione', value: 'lievitazione' },
          { title: 'Farcitura', value: 'farcitura' },
          { title: 'Modellaggio', value: 'modellaggio' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'details',
    }),

    // Introduzione
    defineField({
      name: 'introduction',
      title: 'Introduzione',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Cos\'è questa tecnica e perché è importante',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    // Attrezzatura necessaria
    defineField({
      name: 'equipment',
      title: 'Attrezzatura necessaria',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nome',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Descrizione',
              type: 'text',
              rows: 2,
            },
            {
              name: 'required',
              title: 'Obbligatorio',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'image',
              title: 'Immagine (opzionale)',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Testo alternativo',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'name',
              required: 'required',
              media: 'image',
            },
            prepare({ title, required, media }) {
              return {
                title,
                subtitle: required ? 'Obbligatorio' : 'Opzionale',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      group: 'content',
    }),

    // Procedimento passo-passo
    defineField({
      name: 'steps',
      title: 'Procedimento',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stepNumber',
              title: 'Numero passo',
              type: 'number',
              readOnly: true,
              hidden: true,
            },
            {
              name: 'title',
              title: 'Titolo passo',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Descrizione',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Immagine',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Testo alternativo',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Didascalia',
                },
              ],
            },
            {
              name: 'video',
              title: 'Video (opzionale)',
              type: 'url',
              description: 'Link a video YouTube o Vimeo',
            },
            {
              name: 'tips',
              title: 'Consigli per questo passo',
              type: 'array',
              of: [{ type: 'text' }],
            },
            {
              name: 'commonMistakes',
              title: 'Errori comuni',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'mistake',
                      title: 'Errore',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'solution',
                      title: 'Soluzione',
                      type: 'text',
                      rows: 2,
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: 'mistake',
                      subtitle: 'solution',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      group: 'content',
    }),

    // Punti chiave
    defineField({
      name: 'keyPoints',
      title: 'Punti chiave da ricordare',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'point',
              title: 'Punto chiave',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'explanation',
              title: 'Spiegazione',
              type: 'text',
              rows: 3,
            },
          ],
          preview: {
            select: {
              title: 'point',
              subtitle: 'explanation',
            },
          },
        },
      ],
      group: 'content',
    }),

    // Variazioni
    defineField({
      name: 'variations',
      title: 'Variazioni della tecnica',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nome variazione',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Descrizione',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Immagine (opzionale)',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Testo alternativo',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image',
            },
          },
        },
      ],
      group: 'content',
    }),

    // Troubleshooting
    defineField({
      name: 'troubleshooting',
      title: 'Risoluzione problemi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'problem',
              title: 'Problema',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'cause',
              title: 'Causa',
              type: 'text',
              rows: 2,
            },
            {
              name: 'solution',
              title: 'Soluzione',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'problem',
              subtitle: 'solution',
            },
          },
        },
      ],
      group: 'content',
    }),

    // Video tutorial
    defineField({
      name: 'videoTutorial',
      title: 'Video tutorial completo',
      type: 'url',
      description: 'Link a video YouTube o Vimeo che mostra l\'intera tecnica',
      group: 'content',
    }),

    // Relazioni
    defineField({
      name: 'relatedRecipes',
      title: 'Ricette che usano questa tecnica',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'ricetta' } }],
      group: 'details',
    }),
    defineField({
      name: 'relatedScience',
      title: 'Scienza correlata',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'scienza' } }],
      description: 'Articoli scientifici che spiegano questa tecnica',
      group: 'details',
    }),
    defineField({
      name: 'prerequisiteTechniques',
      title: 'Tecniche prerequisito',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tecnica' } }],
      description: 'Tecniche da conoscere prima di questa',
      group: 'details',
    }),
    defineField({
      name: 'advancedTechniques',
      title: 'Tecniche avanzate successive',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tecnica' } }],
      description: 'Tecniche da imparare dopo questa',
      group: 'details',
    }),

    // Pubblicazione
    defineField({
      name: 'publishedAt',
      title: 'Data di pubblicazione',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Autore',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60).warning('Dovrebbe essere sotto i 60 caratteri'),
          description: 'Se lasciato vuoto, verrà usato il titolo della tecnica',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160).warning('Dovrebbe essere sotto i 160 caratteri'),
          description: 'Se lasciato vuoto, verrà usata la descrizione breve',
        },
        {
          name: 'focusKeyphrase',
          title: 'Parola chiave principale',
          type: 'string',
          description: 'Parola chiave per cui vuoi posizionarti',
        },
        {
          name: 'synonyms',
          title: 'Sinonimi',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Sinonimi della parola chiave principale',
        },
        {
          name: 'ogImage',
          title: 'Immagine Open Graph',
          type: 'image',
          description: 'Immagine per social media (se diversa dall\'immagine principale)',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Testo alternativo',
            },
          ],
        },
        {
          name: 'noIndex',
          title: 'No Index',
          type: 'boolean',
          description: 'Impedisci ai motori di ricerca di indicizzare questa pagina',
          initialValue: false,
        },
      ],
    }),

    // Schema.org HowTo Structured Data
    defineField({
      name: 'estimatedCost',
      title: 'Costo stimato (opzionale)',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'currency',
          title: 'Valuta',
          type: 'string',
          initialValue: 'EUR',
        },
        {
          name: 'value',
          title: 'Valore',
          type: 'number',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      difficulty: 'difficulty',
      category: 'category',
    },
    prepare({ title, media, difficulty, category }) {
      return {
        title,
        subtitle: `${difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : ''} - ${category || ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Data di pubblicazione, più recente',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Titolo, A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Difficoltà',
      name: 'difficultyAsc',
      by: [{ field: 'difficulty', direction: 'asc' }],
    },
  ],
})

export default tecnicaType