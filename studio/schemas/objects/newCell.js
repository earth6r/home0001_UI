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
    },
    {
      title: 'Hide on Mobile?',
      name: 'hideMobile',
      type: 'boolean',
      options: {
        isHighlighted: true
      }
    },
    {
      title: 'Hide on Tablet?',
      name: 'hideTablet',
      type: 'boolean',
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      value: 'desktopText'
    },
    prepare ({value}) {
      const txt = value
      return {
        title: txt
      }
    }
  }
}
