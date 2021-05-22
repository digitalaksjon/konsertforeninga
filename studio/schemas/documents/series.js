export default {
  name: 'series',
  type: 'document',
  title: 'Konsertserie',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Description'
    },
    {
      name: 'mainImage',
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
