export default {
  title: 'Home Unit',
  name: 'homeUnit',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'floorPlan',
      type: 'image',
      title: 'Floor Plan'
    },
    {
      name: 'floorPlanMobile',
      type: 'image',
      title: 'Floor Plan (for Mobile)'
    },
    {
      name: 'floorPlanCaption',
      type: 'bodyPortableText',
      title: 'Additional floor plan info'
    },
    {
      name: 'text',
      type: 'bodyPortableText',
      title: 'Description'
    },
    {
      name: 'unit',
      title: 'Unit',
      type: 'string'
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'string'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string'
    },
    {
      name: 'richPrice',
      title: 'Price allowing currency exchange',
      type: 'bodyPortableText'
    },
    {
      title: 'Sold?',
      name: 'sold',
      type: 'boolean'
    },
    {
      title: 'Stripe SKU',
      name: 'stripeSKU',
      type: 'string'
    },
    {
      title: 'BitPay ID',
      name: 'bitPayID',
      type: 'text'
    },
    {
      title: 'BitPay ID Discounted',
      name: 'bitPayIDDiscounted',
      type: 'text'
    }
  ]
}
