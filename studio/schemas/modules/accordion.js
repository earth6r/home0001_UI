export default {
  title: 'Accordion',
  name: 'accordion',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
    },
    {
      name: 'accordionItems',
      title: 'Accordion Items',
      type: 'array',
      of: [{ type: 'accordionItem' }],
    },
  ],
}
