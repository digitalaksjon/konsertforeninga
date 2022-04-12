export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Beskrivelse - SEO',
      description: 'Teksten som dukker opp i søkemotorer.'
    },
    {
      name: 'aboutKf',
      type: 'excerptPortableText',
      title: 'Beskrivelse - Om Konsertforeninga',
      description: 'Teksten som dukker opp under Om Konsertforeninga.'
    },
    {
      name: 'invoiceInfo',
      type: 'excerptPortableText',
      title: 'Fakturainformasjon',
      description: 'Teksten som dukker opp under Fakturainformasjon.'
    },
    {
      name: 'invoiceInfoEn',
      type: 'excerptPortableText',
      title: 'Invoice information',
      description: 'Teksten som dukker opp under Invoice.'
    },
    {
      name: 'siteUrl',
      type: 'string',
      title: 'Site URL',
      description: 'Enter the site URL'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publish an author and set a reference to them here.',
      title: 'Author',
      to: [{type: 'author'}]
    }
  ]
}
