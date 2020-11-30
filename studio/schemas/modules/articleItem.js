export default {
  title: 'Article Item',
  name: 'articleItem',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
    },
    {
      name: 'flag',
      title: 'Article Flag',
      type: 'string',
    },
    {
      name: 'flagcolor',
      title: 'Flag Color Hex (#ffffff)',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'bodyPortableText',
    },
  ],
}
