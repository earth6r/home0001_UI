export default {
  name: 'gallery',
  type: 'document',
  title: 'Gallery',
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
      type: 'bioPortableText',
      title: 'Description',
    },
    {
      name: 'location',
      type: 'bioPortableText',
      title: 'Location',
    },
    {
      name: 'locationMap',
      type: 'url',
      title: 'Location Google Map',
    },
    {
      name: 'hours',
      type: 'array',
      title: 'Hours',
      of: [{ type: 'hoursItem' }],
    },
    {
      name: 'hoursInformation',
      type: 'bodyPortableText',
      title: 'Hours Information',
    },
    {
      type: 'contactItem',
      name: 'contact',
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
