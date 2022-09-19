export default {
  title: 'Table Cell',
  name: 'richTableCell',
  type: 'object',
  fields: [
    {
      name: 'value',
      type: 'string'
    },
    {
      name: 'link',
      title: 'Link (optional)',
      type: 'reference',
      to: [{type: 'page'}, {type: 'post'}]
    },
    {
      name: 'url',
      title: 'Use this, not link, for now',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel']
        })
    }
  ],
  preview: {
    select: {
      value: 'value'
    },
    prepare ({value}) {
      const txt = value
      return {
        title: txt
      }
    }
  }
}
