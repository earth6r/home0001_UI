export default {
  name: 'partner',
  type: 'document',
  title: 'Partner',
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
      name: 'logo',
      title: 'Upload SVG File',
      type: 'image',
    },
    {
      name: 'bio',
      type: 'bioPortableText',
      title: 'Biography',
    },
    {
      name: 'website',
      type: 'url',
      title: 'Partner Website',
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
