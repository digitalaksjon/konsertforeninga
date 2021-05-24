export default {
  name: 'background',
  type: 'document',
  title: 'Bakgrunn',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Beskrivelse'
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Bilde'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96
      }
    }
  ]
}
