

export default {
  title: 'Flexible Gallery',
  name: 'flexGallery',
  type: 'object',
  hidden: true,
  fields: [
  { name:'numRows',
      type: 'number',
      title: 'TotalNumber of Rows'
    },
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
          type: 'flexImage',
          
          
        },
      ],
    },
    {
      name: 'embeds',
      title: 'Embed',
      type: 'array',
      of: [
        {
          type: 'flexEmbed',
        },
      ],
    },
    {
      name: 'pdfs',
      title: 'Pdf',
      type: 'array',
      of: [
        {
          type: 'flexPdf',
        },
      ],
    },
   
    {
      name: 'url',
      // label: 'CTA',
      type: 'flexCircle',
      title: 'Circle Button',
    },
  ],
}
