export default {
  name: 'aboutPage',
  type: 'document',
  title: 'About',
  //   __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'simpleText'
    }
  ]
}
