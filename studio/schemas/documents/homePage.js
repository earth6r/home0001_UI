export default {
  name: 'homePage',
  type: 'document',
  title: 'Home',
  //   __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'citiesList',
      type: 'array',
      title: 'Cities',
      of: [
        {
          type: 'reference',
          to: [{ type: 'cities' }]
        }
      ]
    }
  ]
}
