export default {
  title: 'Table Cell',
  name: 'inventoryCell',
  type: 'object',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'string',
      validation: Rule => Rule.min(1).warning('must have a value')
    }
  ],
  preview: {
    select: {
      value: 'text'
    },
    prepare({ value }) {
      const txt = value
      return {
        title: txt
      }
    }
  }
}
