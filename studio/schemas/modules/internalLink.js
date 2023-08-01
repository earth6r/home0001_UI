export default {
  title: 'Internal Link',
  name: 'internalLink',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string'
    },
    {
      name: 'callibrationMark',
      title: 'Show Callibration Marks',
      default: true,
      type: 'boolean'
    },
    {
      name: 'title',
      title: 'Link CTA',
      type: 'string'
    },
    {
      name: 'link',
      title: 'Link',
      type: 'reference',
      to: [
        {type: 'page'},
        {type: 'checkout'},
        {type: 'home'},
        {type: 'aboutPage'},
        {type: 'contactPage'},
        {type: 'faqPage'},
        {type: 'homePage'},
        {type: 'howItWorksPage'},
        {type: 'legalPage'}
      ]
    },
    {
      title: 'Color',
      name: 'color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Black', value: 'black'}
        ], // <-- predefined values
        layout: 'radio', // <-- defaults to 'dropdown'
        default: 'white'
      }
    }
  ],
  preview: {
    select: {
      title: 'internalTitle'
    }
  }
}
