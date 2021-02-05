export default {
  title: 'Accordion Item',
  name: 'accordionItem',
  type: 'object',
  fields: [
  {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Accordion Title',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'bodyPortableText',
    },
  ],
  preview: {
    select: {
      title: "internalTitle"
    }
  }
}
