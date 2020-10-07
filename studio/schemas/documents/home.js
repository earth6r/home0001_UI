import { format } from 'date-fns'

export default {
  name: 'home',
  type: 'document',
  title: 'Home',
  fields: [
    {
      name: 'content',
      type: 'pageContent',
    },
    // {
    //   name: 'mainImage',
    //   type: 'mainImage',
    //   title: 'Main image',
    // },
    // {
    //   name: 'categories',
    //   type: 'array',
    //   title: 'Categories',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: {
    //         type: 'category',
    //       },
    //     },
    //   ],
    // },
    {
      name: 'specSheet',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'richTable',
        },
      ],
    },
    {
      type: 'string',
      name: 'unitsTitle',
      title: 'Units Title',
    },
    {
      type: 'string',
      name: 'unitsSubtitle',
      title: 'Units Subtitle',
    },
    {
      type: 'array',
      name: 'units',
      title: 'Units',
      of: [{ type: 'homeUnit' }],
    },
    {
      name: 'homeModules',
      title: 'Additional Home Modules',
      type: 'moduleContent',
      // fieldset: 'modules',
    },
  ],
  preview: {
    select: {
      title: 'content.main.title',
      slug: 'slug',
      media: 'mainImage',
    },
    prepare({ title = 'No title', slug = {}, media }) {
      return {
        title,
        media,
      }
    },
  },
}
