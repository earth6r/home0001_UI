export default {
  name: 'property',
  title: 'Properties',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'unitTypes',
      title: 'Unit Types',
      type: 'string'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string'
    },
    {
      name: 'image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      type: 'map',
      name: 'map'
    },
    {
      title: 'City',
      name: 'city',
      type: 'reference',
      to: [{type: 'cities'}],
      options: {
        // Here's where you can add the subtitle field
        getOptionLabel: reference => `${reference.title}`
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'city.title'
    }
  }
}
