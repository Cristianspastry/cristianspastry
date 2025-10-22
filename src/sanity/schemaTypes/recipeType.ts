import { defineField, defineType } from 'sanity'

export const recipeType = defineType({
  name: 'ricetta',
  title: 'Ricette',
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
      description: 'Breve descrizione della ricetta (usata per SEO e preview)',
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
    defineField({
      name: 'difficulty',
      title: 'Difficoltà',
      type: 'string',
      options: {
        list: [
          { title: 'Facile', value: 'facile' },
          { title: 'Medio', value: 'medio' },
          { title: 'Difficile', value: 'difficile' },
          { title: 'Professionale', value: 'professionale' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'prepTime',
      title: 'Tempo di preparazione (minuti)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      group: 'details',
    }),
    defineField({
      name: 'cookTime',
      title: 'Tempo di cottura (minuti)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      group: 'details',
    }),
    defineField({
      name: 'restTime',
      title: 'Tempo di riposo (minuti)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      description: 'Tempo di riposo in frigo, lievitazione, ecc.',
      group: 'details',
    }),
    defineField({
      name: 'servings',
      title: 'Porzioni',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      group: 'details',
    }),
    defineField({
      name: 'categories',
      title: 'Categorie',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule) => Rule.required().min(1),
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
    
    // Ingredienti
    defineField({
      name: 'ingredients',
      title: 'Ingredienti',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'group',
              title: 'Gruppo (opzionale)',
              type: 'string',
              description: 'Es: "Per la base", "Per la crema", ecc.',
            },
            {
              name: 'items',
              title: 'Lista ingredienti',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'quantity',
                      title: 'Quantità',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'unit',
                      title: 'Unità di misura',
                      type: 'string',
                      options: {
                        list: ['g', 'kg', 'ml', 'l', 'n°', 'cucchiaio', 'cucchiaino', 'q.b.', 'pizzico'],
                      },
                    },
                    {
                      name: 'ingredient',
                      title: 'Ingrediente',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'notes',
                      title: 'Note',
                      type: 'string',
                      description: 'Es: "a temperatura ambiente", "setacciata"',
                    },
                  ],
                  preview: {
                    select: {
                      quantity: 'quantity',
                      unit: 'unit',
                      ingredient: 'ingredient',
                    },
                    prepare({ quantity, unit, ingredient }) {
                      return {
                        title: `${quantity}${unit ? ' ' + unit : ''} ${ingredient}`,
                      }
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              group: 'group',
              items: 'items',
            },
            prepare({ group, items }: { group?: string; items?: unknown[] }) {
              return {
                title: group ?? 'Ingredienti',
                subtitle: `${Array.isArray(items) ? items.length : 0} ingredienti`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      group: 'content',
    }),

    // Procedimento
    defineField({
      name: 'instructions',
      title: 'Procedimento',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titolo fase (opzionale)',
              type: 'string',
              description: 'Es: "Preparazione della base", "Cottura"',
            },
            {
              name: 'steps',
              title: 'Passi',
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
                      name: 'description',
                      title: 'Descrizione',
                      type: 'text',
                      rows: 4,
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
                    {
                      name: 'tip',
                      title: 'Consiglio (opzionale)',
                      type: 'text',
                      rows: 2,
                    },
                  ],
                  preview: {
                    select: {
                      description: 'description',
                      image: 'image',
                    },
                    prepare({ description, image }) {
                      return {
                        title: description?.substring(0, 60) + (description?.length > 60 ? '...' : ''),
                        media: image,
                      }
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: 'title',
              steps: 'steps',
            },
            prepare({ title, steps }) {
              return {
                title: title || 'Fase di preparazione',
                subtitle: `${steps?.length || 0} passi`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      group: 'content',
    }),

    // Note e consigli
    defineField({
      name: 'tips',
      title: 'Consigli dello chef',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'storage',
      title: 'Conservazione',
      type: 'text',
      rows: 3,
      description: 'Come conservare il prodotto finito',
      group: 'details',
    }),
    defineField({
      name: 'variations',
      title: 'Varianti',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Possibili varianti della ricetta',
      group: 'content',
    }),

    // Relazioni
    defineField({
      name: 'relatedTechniques',
      title: 'Tecniche correlate',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tecnica' } }],
      group: 'details',
    }),
    defineField({
      name: 'relatedScience',
      title: 'Scienza correlata',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'scienza' } }],
      group: 'details',
    }),
    defineField({
      name: 'relatedRecipes',
      title: 'Ricette correlate',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'ricetta' } }],
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
          description: 'Se lasciato vuoto, verrà usato il titolo della ricetta',
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

    // Schema.org Recipe Structured Data
    defineField({
      name: 'nutritionalInfo',
      title: 'Informazioni nutrizionali (opzionale)',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'calories',
          title: 'Calorie (kcal)',
          type: 'number',
        },
        {
          name: 'protein',
          title: 'Proteine (g)',
          type: 'number',
        },
        {
          name: 'carbohydrates',
          title: 'Carboidrati (g)',
          type: 'number',
        },
        {
          name: 'fat',
          title: 'Grassi (g)',
          type: 'number',
        },
        {
          name: 'fiber',
          title: 'Fibre (g)',
          type: 'number',
        },
        {
          name: 'sugar',
          title: 'Zuccheri (g)',
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
      prepTime: 'prepTime',
    },
    prepare({ title, media, difficulty, prepTime }) {
      return {
        title,
        subtitle: `${difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : ''} - ${prepTime}min`,
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
  ],
})

export default recipeType