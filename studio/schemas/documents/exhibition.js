export default {
  name: 'exhibition',
  type: 'document',
  title: 'Exhibition',
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
      name: 'description',
      type: 'bodyPortableText',
      title: 'Exhibition Description',
    },
    {
      type: 'exhibitionDetails',
      name: 'details',
      title: 'Exhibition Details',
    },
    {
      name: 'explore',
      type: 'array',
      title: 'Explore',
      of: [
        {
          type: 'mainImage',
        },
        {
          type: 'listPortableText',
        },
      ],
    },
    {
      name: 'installation',
      type: 'array',
      title: 'Installation View',
      of: [
        {
          type: 'mainImage',
        },
      ],
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
