export default {
  title: 'Gallery',
  name: 'gallery',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'images',
      title: 'Image',
      type: 'array',
      of: [
        {
          type: 'mainImage',
        },
      ],
    },
    {
      name: 'url',
      label: 'CTA',
      type: 'circleButton',
    },
  ],
}
