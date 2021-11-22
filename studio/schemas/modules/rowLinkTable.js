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
    // {
    //   name: 'alt',
    //   type: 'string',
    //   title: 'Alternative text',
    //   description: 'Important for SEO and accessiblity.',
    //   validation: (Rule) => Rule.error('You have to fill out the alternative text.').required(),
    //   options: {
    //     isHighlighted: true,
    //   },
    // },
    {
      title: 'Hide on Mobile?',
      name: 'hideMobile',
      type: 'boolean',
      options: {
        isHighlighted: true,
      }
    },
    {
      title: 'Hide on Tablet?',
      name: 'hideTablet',
      type: 'boolean',
      options: {
        isHighlighted: true,
      }
    },
    {
      title: 'Hide on Desktop?',
      name: 'hideDesktop',
      type: 'boolean',
      options: {
        isHighlighted: true,
      }
    },
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
