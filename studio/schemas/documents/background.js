export default {
  name: 'background',
  type: 'document',
  title: 'Bakgrunn',
  fields: [
    {
      name: 'description',
      type: 'text',
      title: 'Beskrivelse'
    },
    
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Bakgrunn'
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Publisert',
    },
  ],
  preview: {
    select: {
      media: 'backgroundImage',
      description: 'description'
    },
    prepare({ description, media }) {
      return {
        title: description,
        media
      }
    }
  }
}
