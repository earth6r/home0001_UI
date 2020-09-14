export default {
  name: 'pageItem',
  type: 'object',
  title: 'Page Item',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'Press Year',
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Description',
    },
    {
      name: 'gallery',
      type: 'array',
      of: [{ type: 'artworkImage' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
}
