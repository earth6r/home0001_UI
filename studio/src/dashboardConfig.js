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
                  buildHookId: '',
                  title: 'Earth Sanity Studio',
                  name: 'earth-v1-studio',
                  apiId: '',
                },
                {
                  buildHookId: '5f6683be8466db46fb09dd6b',
                  title: 'Earth Website',
                  name: 'earth-v1',
                  apiId: '70ce073f-c55c-4a10-9731-f12d74316845',
                },
                {
                  buildHookId: '5fbf03636132448ec5f9643f',
                  title: 'Earth Staging Website',
                  name: 'earth-v1',
                  apiId: '70ce073f-c55c-4a10-9731-f12d74316845',
                },
              ],
            },
          },
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/DanielHirunrusme/earth',
            category: 'Code',
          },
          { title: 'Frontend', value: '', category: 'apps' },
        ],
      },
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' },
    },
  ],
}
