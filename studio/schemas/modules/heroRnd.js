export default {
  name: 'heroRnd',
  title: 'Hero (R&D)',
  type: 'object',
  fields: [
    {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'mainImage'
        }
      ]
    },
    {
      name: 'youtubeVideos',
      title: 'YouTube Video IDs',
      type: 'array',
      description: 'Only insert the video ID of the youtube video needed',
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'thumbnails',
      title: 'Video Thumbnails',
      type: 'array',
      of: [
        {
          name: 'image',
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
              validation: Rule =>
                Rule.error('You have to fill out the alternative text.').required()
            }
          ]
        }
      ]
    },
    {
      name: 'titles',
      title: 'Titles',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'showTitles',
      title: 'Show titles on website',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'internalTitle'
    }
  }
}
