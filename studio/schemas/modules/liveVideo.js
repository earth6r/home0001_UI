export default {
  name: 'liveVideo',
  title: 'Live Video',
  type: 'object',
  fields: [
    {
      name: 'youtubeVideo',
      title: 'YouTube Video ID',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
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
