export default {
  title: 'New Table Cell',
  name: 'newCell',
  type: 'object',
  fields: [
    {
      title: 'Desktop Text',
      name: 'desktopText',
      type: 'string',
      validation: Rule => Rule.min(1).warning('must have a value')
    },
    {
      title: 'Mobile Text',
      name: 'mobileText',
      type: 'string'
    },
    {
      name: 'link',
      title: 'Link (optional)',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'post' }]
    },
    {
      name: 'url',
      title: 'Use this, not link, for now',
      type: 'url'
    }
  ],
  preview: {
    select: {
      value: 'desktopText'
    },
    prepare({ value }) {
      const txt = value
      return {
        title: txt
      }
    }
  }
}
