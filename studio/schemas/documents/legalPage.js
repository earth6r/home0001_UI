export default {
  name: 'legalPage',
  type: 'document',
  title: 'Legal Page',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'description',
      type: 'simpleText'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
