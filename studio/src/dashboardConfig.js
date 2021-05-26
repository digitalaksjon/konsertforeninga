export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '600ee742d04e2ff18e12771b',
                  title: 'Konsertforeninga Nettside',
                  name: 'konsertforeninga',
                  apiId: '461be2c7-8e92-4d12-8120-85350265d64f'
                },
                {
                  buildHookId: '600ee742ad07d4ea04cec520',
                  title: 'Konsertforeninga Studio',
                  name: 'konsertforeninga-studio',
                  apiId: '14e257b5-5079-45f4-bfb6-32474555b2b9'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/digitalaksjon/konsertforeninga',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://konsertforeninga.netlify.app', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Siste konserter', order: 'concertDateTime desc', types: ['concert'] },
      layout: { width: 'medium' }
    }
  ]
}
