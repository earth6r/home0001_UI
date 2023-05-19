export default {
  name: 'propertyType',
  title: 'Property Types',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Internal Title'
    },
    {
      title: 'Available',
      name: 'available',
      type: 'boolean',
      initialValue: true
    },
    {
      title: 'Property Type',
      name: 'propertyType',
      type: 'string',
      initialValue: 'studio',
      options: {
        list: [
          { title: 'STUDIO', value: 'studio' },
          { title: 'STUDIO MAX', value: 'studio-max' },
          { title: '1 BEDROOM', value: 'one-bedroom' },
          { title: '2 BEDROOMS', value: 'two-bedrooms' },
          { title: 'PENTHOUSE', value: 'penthouse' }
        ]
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string'
    },
    {
      name: 'area',
      title: 'Area',
      type: 'string'
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [
        {
          name: 'amenitie',
          type: 'string'
        }
      ]
    },
    {
      type: 'map',
      name: 'map'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          name: 'image',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'description',
      type: 'simpleText'
    },

    {
      name: 'inventory',
      title: 'Inventory',
      type: 'columnHeaderTable'
    },
    {
      title: 'Property',
      name: 'property',
      type: 'reference',
      to: [{ type: 'property' }]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
