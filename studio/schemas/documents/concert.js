import { MdMusicNote } from 'react-icons/md'
import { format } from 'date-fns'

export default {
  name: 'concert',
  type: 'document',
  title: 'Concert',
  icon: MdMusicNote,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel',
      description: 'Navnet på de som holder konserten'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'En kortversjon av tittelen til URL',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Publisert',
      description: 'Denne kan brukes til planlegge publisering av konserter'
    },
    {
      name: 'concertDateTime',
      type: 'datetime',
      title: 'Tidspunkt',
      description: 'Når er konserten?'
    },
    {
      name: 'series',
      type: 'array',
      title: 'Konsertserie',
      of: [
        {
          type: 'reference',
          to: {
            type: 'series'
          }
        }
      ]
    },
    {
      name: 'price',
      type: 'string',
      title: 'Pris',
      description: 'Hva koster konserten?'
    },
    {
      name: 'venue',
      type: 'string',
      title: 'Scene',
      description: 'Hvor avholdes konserten?'
    },
    {
      name: 'ticketURL',
      type: 'string',
      title: 'Billettlink',
      description: 'URL til bilettsalg'
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Bilde'
    },
    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Utdrag',
      description: 'Denne teksten ender opp på Google og når man deler på Facebook.'
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Beskrivelse'
    }
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare({ title = 'No title', publishedAt, slug = {}, media }) {
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`

      return {
        title,
        media,
        subtitle: publishedAt ? dateSegment : 'Missing publishing date'
      }
    }
  }
}
