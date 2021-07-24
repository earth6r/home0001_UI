export default {
  title: 'R D Obround Button',
  name: 'rdObroundButton',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'homeLink',
      title: '/collective',
      type: 'boolean',
    },
    {
      name: 'rndLink',
      title: '/',
      type: 'boolean',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'reference',
      to: [{ type: 'landing' }],
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
    },
    {
      name: 'customCircleTextColor',
      title: 'custom text color (#ffff)',
      type: 'string',
    },
    {
      name: 'customCircleColor',
      title: 'custom color (#ffff)',
      type: 'string',
    }
  ],
}
