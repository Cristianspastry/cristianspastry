import { defineField, defineType } from 'sanity'

export const scienzaType = defineType({
  name: 'scienza',
  title: 'Scienza della Pasticceria',
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
      description: 'Breve descrizione dell\'articolo (usata per SEO e preview)',
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

    // Tipologia articolo
    defineField({
      name: 'articleType',
      title: 'Tipologia articolo',
      type: 'string',
      options: {
        list: [
          { title: 'Ingredienti', value: 'ingredienti' },
          { title: 'Processi chimici', value: 'processi' },
          { title: 'Reazioni', value: 'reazioni' },
          { title: 'Fisica della pasticceria', value: 'fisica' },
          { title: 'Dietro le quinte', value: 'dietro-quinte' },
          { title: 'Miti da sfatare', value: 'miti' },
          { title: 'Storia e origini', value: 'storia' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'complexity',
      title: 'Complessità',
      type: 'string',
      options: {
        list: [
          { title: 'Base - Facile da capire', value: 'base' },
          { title: 'Intermedio - Richiede attenzione', value: 'intermedio' },
          { title: 'Avanzato - Approfondito', value: 'avanzato' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'readingTime',
      title: 'Tempo di lettura (minuti)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      description: 'Tempo stimato per leggere l\'articolo',
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
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
        {
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
      ],
      description: 'Introduzione che cattura l\'attenzione e presenta l\'argomento',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    // Contenuto principale - Sezioni
    defineField({
      name: 'sections',
      title: 'Sezioni dell\'articolo',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'sectionTitle',
              title: 'Titolo sezione',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'sectionType',
              title: 'Tipo di sezione',
              type: 'string',
              options: {
                list: [
                  { title: 'Testo normale', value: 'text' },
                  { title: 'Spiegazione scientifica', value: 'scientific' },
                  { title: 'Esempio pratico', value: 'example' },
                  { title: 'Curiosità', value: 'curiosity' },
                  { title: 'Mito da sfatare', value: 'myth' },
                  { title: 'Confronto', value: 'comparison' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Contenuto',
              type: 'array',
              of: [
                { 
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                      { title: 'Subscript', value: 'sub' },
                      { title: 'Superscript', value: 'sup' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'URL',
                          },
                        ],
                      },
                    ],
                  },
                },
                {
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
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'highlightBox',
              title: 'Box evidenziato (opzionale)',
              type: 'object',
              description: 'Informazione da evidenziare in questa sezione',
              fields: [
                {
                  name: 'type',
                  title: 'Tipo',
                  type: 'string',
                  options: {
                    list: [
                      { title: '💡 Consiglio', value: 'tip' },
                      { title: '⚠️ Attenzione', value: 'warning' },
                      { title: 'ℹ️ Info', value: 'info' },
                      { title: '🔬 Scienza', value: 'science' },
                    ],
                  },
                },
                {
                  name: 'title',
                  title: 'Titolo',
                  type: 'string',
                },
                {
                  name: 'content',
                  title: 'Contenuto',
                  type: 'text',
                  rows: 4,
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'sectionTitle',
              type: 'sectionType',
            },
            prepare({ title, type }) {
              const typeLabels = {
                text: '📝 Testo',
                scientific: '🔬 Scientifico',
                example: '💡 Esempio',
                curiosity: '✨ Curiosità',
                myth: '❌ Mito',
                comparison: '⚖️ Confronto',
              }
              return {
                title,
                subtitle: typeLabels[type] || type,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      group: 'content',
    }),

    // Elementi chiave
    defineField({
      name: 'keyTakeaways',
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
              title: 'Spiegazione (opzionale)',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'point',
            },
          },
        },
      ],
      description: 'Riassunto dei concetti più importanti',
      group: 'content',
    }),

    // Applicazioni pratiche
    defineField({
      name: 'practicalApplications',
      title: 'Applicazioni pratiche',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titolo',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Descrizione',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'example',
              title: 'Esempio',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      description: 'Come applicare questa conoscenza nella pratica',
      group: 'content',
    }),

    // Esperimenti / Test
    defineField({
      name: 'experiments',
      title: 'Esperimenti o test (opzionale)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titolo esperimento',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'hypothesis',
              title: 'Ipotesi',
              type: 'text',
              rows: 2,
            },
            {
              name: 'method',
              title: 'Metodo',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'results',
              title: 'Risultati',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'conclusion',
              title: 'Conclusione',
              type: 'text',
              rows: 3,
            },
            {
              name: 'images',
              title: 'Immagini',
              type: 'array',
              of: [
                {
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
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'images.0',
            },
          },
        },
      ],
      group: 'content',
    }),

    // Glossario termini tecnici
    defineField({
      name: 'glossary',
      title: 'Glossario (opzionale)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'term',
              title: 'Termine',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'definition',
              title: 'Definizione',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'term',
              subtitle: 'definition',
            },
          },
        },
      ],
      description: 'Spiegazione dei termini tecnici usati nell\'articolo',
      group: 'content',
    }),

    // Fonti e riferimenti
    defineField({
      name: 'references',
      title: 'Fonti e riferimenti',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  { title: 'Libro', value: 'book' },
                  { title: 'Articolo scientifico', value: 'article' },
                  { title: 'Sito web', value: 'website' },
                  { title: 'Video', value: 'video' },
                  { title: 'Altro', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Titolo',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'author',
              title: 'Autore',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'year',
              title: 'Anno',
              type: 'number',
            },
            {
              name: 'notes',
              title: 'Note',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'title',
              author: 'author',
              type: 'type',
            },
            prepare({ title, author, type }) {
              return {
                title,
                subtitle: `${author || ''} - ${type}`,
              }
            },
          },
        },
      ],
      group: 'content',
    }),

    // Conclusione
    defineField({
      name: 'conclusion',
      title: 'Conclusione',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Riassunto finale e riflessioni',
      group: 'content',
    }),

    // Relazioni
    defineField({
      name: 'relatedRecipes',
      title: 'Ricette correlate',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'ricetta' } }],
      description: 'Ricette che utilizzano questi concetti',
      group: 'details',
    }),
    defineField({
      name: 'relatedTechniques',
      title: 'Tecniche correlate',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tecnica' } }],
      description: 'Tecniche spiegate da questo articolo',
      group: 'details',
    }),
    defineField({
      name: 'relatedScience',
      title: 'Articoli correlati',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'scienza' } }],
      description: 'Altri articoli scientifici correlati',
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
      name: 'updatedAt',
      title: 'Ultimo aggiornamento',
      type: 'datetime',
      description: 'Data dell\'ultimo aggiornamento significativo',
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

    // Featured
    defineField({
      name: 'featured',
      title: 'In evidenza',
      type: 'boolean',
      description: 'Mostra questo articolo in evidenza',
      initialValue: false,
      group: 'details',
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
          description: 'Se lasciato vuoto, verrà usato il titolo dell\'articolo',
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
        {
          name: 'canonicalUrl',
          title: 'URL Canonico',
          type: 'url',
          description: 'Se questo contenuto è stato pubblicato altrove originariamente',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      articleType: 'articleType',
      complexity: 'complexity',
    },
    prepare({ title, media, articleType, complexity }) {
      const typeLabels = {
        ingredienti: '🥚 Ingredienti',
        processi: '⚗️ Processi',
        reazioni: '🔥 Reazioni',
        fisica: '⚛️ Fisica',
        'dietro-quinte': '🎬 Dietro le quinte',
        miti: '❌ Miti',
        storia: '📚 Storia',
      }
      return {
        title,
        subtitle: `${typeLabels[articleType] || articleType} - ${complexity || ''}`,
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
      title: 'In evidenza',
      name: 'featured',
      by: [{ field: 'featured', direction: 'desc' }],
    },
  ],
})

export default scienzaType;