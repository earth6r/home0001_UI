export default {
  name: 'liveVideo',
  title: 'Live Video',
  type: 'object',
  fields: [
    {
      name: 'channelId',
      title: 'YouTube Channel ID',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'placeholderImage',
      title: 'Placeholder Image',
      description: 'Image to be displayed when stream is not available',
      type: 'image'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockText'
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'externalLink'
        }
      ]
    }
  ],
  preview: {
    prepare () {
      return {
        title: 'Live Video'
      }
    }
  }
}
