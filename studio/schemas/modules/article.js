export default {
  title: 'Article (R&D only)',
  name: 'article',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string'
    },
    {
      name: 'title',
      title: 'Title (optional)',
      type: 'string'
    },
    {
      name: 'defaultNum',
      title: 'Default num of articles to show',
      type: 'number'
    },
    {
      name: 'loadNum',
      title: 'num of articles to show when more is clicked',
      type: 'number'
    },
    {
      name: 'callibrationMark',
      title: 'Show Callibration Marks',
      default: true,
      type: 'boolean'
    },
    {
      name: 'articleItems',
      title: 'Article Items',
      type: 'array',
      of: [{type: 'articleItem'}]
    }
  ],
  preview: {
    select: {
      title: 'internalTitle'
    }
  }
}
