export default {
  title: 'Article Section (R&D only)',
  name: 'articleSection',
  type: 'object',
  fields: [
    {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string'
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      description: 'Optional image to display on the left of a section',
      type: 'mainImage'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'imagePortableText',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'internalTitle'
    }
  }
}
