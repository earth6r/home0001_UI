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
        name: 'tableSpacer',
        title: 'Space between Title and Table in vh percent',
        type: 'string'
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
      title: 'titleInternal',
    },
  },
}
