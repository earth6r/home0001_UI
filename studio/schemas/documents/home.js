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
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image',
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category',
          },
        },
      ],
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
