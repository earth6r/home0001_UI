

export default {
  title: 'Flexible Gallery',
  name: 'flexGallery',
  type: 'object',
  hidden: true,
  fields: [
  {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string',
    },
  { name:'numRows',
      type: 'number',
      title: 'TotalNumber of Rows',
      validation: Rule => Rule.max(5000).warning('you should make multiple galleries')
    },
    { name:'numRowsMobile',
      type: 'number',
      title: 'Number of Rows for Mobile',
      validation: Rule => Rule.max(5000).warning('you should make multiple galleries')
    },
    { name:'numRowsTablet',
      type: 'number',
      title: 'Number of Rows for Tablet',
      validation: Rule => Rule.max(5000).warning('you should make multiple galleries')
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
      name: 'edges',
      title: 'Edge to Edge Images',
      type: 'array',
      of: [
        {
          type: 'flexEdgetoEdge',
          
          
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
      name: 'texts',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'flexText',
        },
      ],
    },
    {
      name: 'squares',
      title: 'Square Button',
      type: 'array',
      of: [
        {
          type: 'flexSquare',
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
      name: 'circleButtons',
      title: 'circleButton',
      type: 'array',
      of: [
        {
          type: 'flexCircle',
        },
      ],
    },
    {
      name: 'callibrationMarks',
      title: 'Callibration Marks',
      type: 'array',
      of: [
        {
          type: 'flexCallibration',
        },
      ],
    }
  ],
  preview: {
    select: {
      title: "internalTitle"
    }
  }
}
