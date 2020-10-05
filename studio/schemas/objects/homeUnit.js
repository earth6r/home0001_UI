export default {
  title: 'Home Unit',
  name: 'homeUnit',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'floorPlan',
      type: 'image',
      title: 'Floor Plan',
    },
    {
      name: 'text',
      type: 'bodyPortableText',
      title: 'Description',
    },
    {
      name: 'unit',
      title: 'Unit',
      type: 'string',
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
    },
    {
      title: 'Sold?',
      name: 'sold',
      type: 'boolean',
    },
  ],
}
