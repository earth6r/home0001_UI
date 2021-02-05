export default {
  title: 'External Link',
  name: 'externalLink',
  type: 'object',
  hidden: true,
  fields: [
  {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Link CTA',
      type: 'string',
    },
    {
      name: 'url', //had to rename this to url because there was a link conflict
      title: 'Link',
      type: 'url',
      description:
        'There is no `link` validation on this so please type accurate urls with https://, mailto:, tel: etc.',
    },
  ],
  preview: {
    select: {
      title: "internalTitle"
    }
  }
}
