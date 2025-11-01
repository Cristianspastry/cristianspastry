import { defineField, defineType } from 'sanity'
import { Package } from 'lucide-react'

export const productType = defineType({
  name: 'product',
  title: 'Prodotti Affiliati',
  type: 'document',
  icon: Package,
  fields: [
    defineField({
      name: 'amazonUrl',
      title: 'Link Amazon',
      type: 'url',
      description: '⭐ INIZIA DA QUI: Incolla il link Amazon del prodotto. L\'ASIN verrà estratto automaticamente.',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https'],
      }).custom((url) => {
        if (!url) return true
        if (!url.includes('amazon')) {
          return 'Deve essere un link Amazon valido'
        }
        return true
      }),
    }),
    defineField({
      name: 'asin',
      title: 'ASIN',
      type: 'string',
      description: '🔍 Estratto automaticamente dal link Amazon. Codice prodotto univoco (10 caratteri)',
      readOnly: true,
    }),
    defineField({
      name: 'title',
      title: 'Nome Prodotto',
      type: 'string',
      description: '📝 Inserisci manualmente il nome del prodotto (in futuro: auto-compilato con API Amazon)',
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Crostate perfette', value: 'crostate' },
          { title: 'Ingredienti migliori', value: 'ingredienti' },
          { title: 'Strumenti di cottura', value: 'cottura' },
          { title: 'Tutto per decorare', value: 'decorazione' },
          { title: 'Attrezzatura base', value: 'attrezzatura' },
          { title: 'Elettrodomestici', value: 'elettrodomestici' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Immagine Prodotto',
      type: 'image',
      description: '🖼️ Carica l\'immagine del prodotto (in futuro: auto-caricata con API Amazon)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      description: '📄 Breve descrizione del prodotto (max 200 caratteri)',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'price',
      title: 'Prezzo',
      type: 'string',
      description: '💰 Prezzo da mostrare (es: "29,99€"). Lascia vuoto per nasconderlo. In futuro: aggiornato automaticamente con API',
    }),
    defineField({
      name: 'featured',
      title: 'Prodotto in evidenza',
      type: 'boolean',
      description: 'Mostra questo prodotto in homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordine',
      type: 'number',
      description: 'Ordine di visualizzazione (dal più basso al più alto)',
      initialValue: 0,
    }),
    defineField({
      name: 'ctaText',
      title: 'Testo CTA',
      type: 'string',
      description: 'Testo del bottone (default: "Scopri la selezione")',
      initialValue: 'Scopri la selezione',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data pubblicazione',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
      featured: 'featured',
    },
    prepare({ title, category, media, featured }: { title?: string; category?: string; media?: any; featured?: boolean }) {
      const categoryLabels: Record<string, string> = {
        crostate: '🥧 Crostate',
        ingredienti: '🧈 Ingredienti',
        cottura: '🔥 Cottura',
        decorazione: '🎨 Decorazione',
        attrezzatura: '🔪 Attrezzatura',
        elettrodomestici: '⚡ Elettrodomestici',
      }
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: category ? categoryLabels[category] : 'Nessuna categoria',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Ordine personalizzato',
      name: 'customOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Data pubblicazione (recente)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
