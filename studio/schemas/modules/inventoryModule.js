import RowsInput from 'part:@ssfbank/sanity-plugin-byo-table/rows-input'

export default {
  name: 'inventoryModule',
  title: 'Inventory',
  type: 'object',
  fields: [
    {
      name: 'titleInternal',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'headers',
      title: 'Headers',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          type: 'inventoryRow'
        }
      ],
      inputComponent: RowsInput
    }
  ],
  preview: {
    select: {
      title: 'titleInternal'
    }
  }
}
