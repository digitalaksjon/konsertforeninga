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
      type: 'text',
      title: 'Description'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Som e frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96
      }
    }
  ]
}
