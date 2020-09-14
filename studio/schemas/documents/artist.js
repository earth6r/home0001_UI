export default {
  name: 'artist',
  type: 'document',
  title: 'Artist',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image',
    },
    {
      name: 'bio',
      type: 'bioPortableText',
      title: 'Biography',
    },
    {
      name: 'website',
      type: 'url',
      title: 'Artist Website',
    },
    {
      name: 'books',
      type: 'url',
      title: 'Books',
    },
    {
      name: 'guide',
      type: 'array',
      title: 'Guide',
      of: [{ type: 'pageItem' }],
    },
    {
      name: 'survey',
      type: 'array',
      title: 'Survey',
      of: [{ type: 'artworkImage' }],
    },
    {
      name: 'press',
      type: 'array',
      title: 'Press',
      of: [{ type: 'pageItem' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
}
