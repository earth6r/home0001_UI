export default {
  name: 'heroRnd',
  title: 'Hero (R&D)',
  type: 'object',
  fields: [
    {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'mainImage'
        }
      ]
    },
    {
      name: 'imageUrls',
      title: 'External Image Urls',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'titles',
      title: 'Titles',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'showTitles',
      title: 'Show titles on website',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'internalTitle'
    }
  }
}
