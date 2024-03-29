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
      name: 'title',
      type: 'string',
      title: 'Title (internal)',
    },
    {
      name: 'headerRow',
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
