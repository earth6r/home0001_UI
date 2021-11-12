import RowsInput from 'part:@ssfbank/sanity-plugin-byo-table/rows-input'

export default {
    name: 'columnHeaderTable',
  title: 'Column Header Table',
  type: 'object',
  fields: [
    {
      name: 'titleInternal',
      title: 'Title for Internal Use',
      type: 'string',
    },
    {
        name: 'title',
        title: 'Title top of Table',
        type: 'string',
      },
    {
      name: 'headers',
      title: 'Column Headers',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'newRow',
        },
      ],
      inputComponent: RowsInput,
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
