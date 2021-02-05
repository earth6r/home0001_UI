export default {
  title: 'Image Module',
  name: 'imageModule',
  type: 'object',
  hidden: true,
  fields: [
  {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'callibrationMark',
      title: 'Show Callibration Marks',
      default: true,
      type: 'boolean',
    },
    {
      name: 'caption',
      title: 'Image Caption',
      type: 'text',
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Full', value: 'full' },
          { title: 'Large', value: 'large' },
          { title: 'Medium', value: 'medium' },
          { title: 'Small', value: 'small' },
        ],
        layout: 'dropdown',
      },
    },
  ],
  preview: {
    select: {
      title: "internalTitle"
    }
  }
}
