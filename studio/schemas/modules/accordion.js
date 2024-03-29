export default {
  title: 'Accordion',
  name: 'accordion',
  type: 'object',
  fields: [
   {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
    },
    {
      name: 'callibrationMark',
      title: 'Show Callibration Marks',
      default: true,
      type: 'boolean',
    },
    {
      name: 'accordionItems',
      title: 'Accordion Items',
      type: 'array',
      of: [{ type: 'accordionItem' }],
    },
  ],
  preview: {
    select: {
      title: "internalTitle"
    }
  }
}
