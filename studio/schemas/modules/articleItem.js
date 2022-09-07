export default {
  title: 'Article Item',
  name: 'articleItem',
  type: 'object',
  fields: [
    {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string'
    },
    {
      name: 'category',
      title: 'Article Category',
      type: 'string'
    },
    {
      name: 'title',
      title: 'Article Title',
      type: 'string'
    },
    {
      name: 'subtitle',
      title: 'Article Subtitle',
      type: 'string'
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'mainImage'
    },
    {
      name: 'flag',
      title: 'Article Flag',
      type: 'string'
    },
    {
      name: 'flagcolor',
      title: 'Flag Color Hex (#ffffff)',
      type: 'string'
    },
    {
      name: 'customslug',
      title: 'Fill this out if you want a custom url',
      type: 'string'
    },
    {
      name: 'articleModule',
      title: 'Article Module',
      type: 'moduleContent'
    },
    {
      name: 'pagebreak',
      title: 'Show Pagebreak before Article',
      initialValue: true,
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'internalTitle'
    }
  }
}
