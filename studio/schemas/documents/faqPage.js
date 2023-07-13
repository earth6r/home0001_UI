export default {
  name: 'faqPage',
  type: 'document',
  title: 'FAQ',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      title: 'Content',
      name: 'sections',
      type: 'array',
      of: [
        {
          type: 'standardText'
        },
        {
          type: 'accordion'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
