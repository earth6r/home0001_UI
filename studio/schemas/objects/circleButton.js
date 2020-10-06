export default {
  title: 'Circle Button',
  name: 'circleButton',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'home' }, { type: 'checkout' }],
    },
  ],
}
