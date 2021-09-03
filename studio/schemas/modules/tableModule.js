import RowsInput from 'part:@ssfbank/sanity-plugin-byo-table/rows-input'

export default {
  title: 'Table',
  name: 'richTable',
  type: 'document',
  fields: [
    {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string',
    },
    {
      name: 'callibrationMark',
      title: 'Show Callibration Marks',
      default: true,
      type: 'boolean',
    },
    {
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'richTableRow',
        },
      ],
      inputComponent: RowsInput,
    },
  ],
  preview: {
    select: {
      title: 'internalTitle',
    },
  },
}
