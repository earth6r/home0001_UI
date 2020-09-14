export default {
  name: 'job',
  type: 'document',
  title: 'Job',
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
    /*{
      name: 'image',
      type: 'mainImage',
      title: 'Image',
    },*/
    {
      name: 'location',
      type: 'reference',
      to: [{ type: 'gallery' }],
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Job Description',
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
