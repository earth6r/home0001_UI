export default {
  title: 'Gallery',
  name: 'gallery',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'callibrationMark',
      title: 'Show Callibration Marks',
      default: true,
      type: 'boolean',
    },
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
      name: 'embeds',
      title: 'Embed',
      type: 'array',
      of: [
        {
          type: 'text',
        },
      ],
    },
    {
      name: 'pdfs',
      title: 'Pdf',
      type: 'array',
      of: [
        {
          type: 'file',
        },
      ],
    },
    {
      name: 'textblocks',
      title: 'Text Block (html)',
      type: 'array',
      of: [
        {
          type: 'text',
        },
      ],
    },
    {
      name: 'url',
      // label: 'CTA',
      type: 'circleButton',
      title: 'Circle Button',
    },
  ],
}
