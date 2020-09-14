export default {
  name: 'galleryReference',
  type: 'object',
  title: 'Gallery reference',
  fields: [
    {
      name: 'gallery',
      type: 'reference',
      to: [
        {
          type: 'gallery',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'gallery.name',
      media: 'gallery.image.asset',
    },
  },
}
