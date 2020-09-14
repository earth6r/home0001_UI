export default {
  name: 'listPortableText',
  type: 'object',
  title: 'List Item',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Description',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
}
