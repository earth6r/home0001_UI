import safeGet from 'lodash/get'

export default {
  title: 'Table Cell',
  name: 'richTableCell',
  type: 'object',
  fields: [
    {
      name: 'value',
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
      title: 'External Link (optional)',
      type: 'url',
    },
  ],
  preview: {
    select: {
      value: 'value',
    },
    prepare({ value }) {
      const txt = value
      return {
        title: txt,
      }
    },
  },
}
