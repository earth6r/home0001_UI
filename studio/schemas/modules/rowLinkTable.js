import RowsInput from 'part:@ssfbank/sanity-plugin-byo-table/rows-input'
import widthOptions from '../objects/widthOptions'
export default {
  name: 'rowLinkTable',
  title: 'Row Link Table',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title for Internal Use',
      type: 'string'
    },
    {
      name: 'desktopWidth',
      title: 'Desktop Table Width in vw percent',
      type: 'string',
      options: {
        list: [...widthOptions]
      }
    },
    {
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'newRow'
        }
      ],
      inputComponent: RowsInput
    },
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
