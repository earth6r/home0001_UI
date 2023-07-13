export default {
  name: 'howItWorksPage',
  type: 'document',
  title: 'How It Works',
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
    },
    {
      title: 'Text Below Content',
      name: 'text',
      type: 'simpleText'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
