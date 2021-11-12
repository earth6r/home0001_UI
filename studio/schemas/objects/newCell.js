
export default {
  title: 'New Table Cell',
  name: 'newCell',
  type: 'object',
  fields: [
    {
        title: 'Desktop Text',
      name: 'desktopText',
      type: 'string',
    },
    {
        title: 'Mobile Text',
        name: 'mobileText',
        type: 'string',
      },
    {
      name: 'link',
      title: 'Link (optional)',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'post' }],
    },
    {
      name: 'url',
      title: 'Use this, not link, for now',
      type: 'url',
    },
  ],
  preview: {
    select: {
      value: 'Desktop Text',
    },
    prepare({ value }) {
      const txt = value
      return {
        title: txt,
      }
    },
  },
}
