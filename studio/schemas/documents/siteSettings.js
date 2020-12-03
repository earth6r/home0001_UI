export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.',
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      type: "boolean",
      name: "showthinbanner",
      description: "Show thin banner",
    },
    {
      type: "text",
      name: "thinbanner",
      description: "Content for thin banner",
    },
    {
      name: 'infosection',
      type: 'bodyPortableText',
      title: 'Info Section for R & D site'
    }
  ],
}
