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
    }
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
