export default {
  name: 'newsLetter',
  type: 'document',
  title: 'News Letter',
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
          type: 'newsletterForm'
        },
        {
          type: 'standardText'
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
