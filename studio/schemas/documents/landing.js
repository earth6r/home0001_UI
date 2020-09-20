import { format } from 'date-fns'

export default {
  name: 'landing',
  type: 'document',
  title: 'Landing',
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
    // {
    //   name: 'excerpt',
    //   type: 'excerptPortableText',
    //   title: 'Excerpt',
    //   description:
    //     'This ends up on summary pages, on Google, when people share your post in social media.',
    // },
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
  // orderings: [
  //   {
  //     name: 'publishingDateAsc',
  //     title: 'Publishing date new–>old',
  //     by: [
  //       {
  //         field: 'publishedAt',
  //         direction: 'asc',
  //       },
  //       {
  //         field: 'title',
  //         direction: 'asc',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'publishingDateDesc',
  //     title: 'Publishing date old->new',
  //     by: [
  //       {
  //         field: 'publishedAt',
  //         direction: 'desc',
  //       },
  //       {
  //         field: 'title',
  //         direction: 'asc',
  //       },
  //     ],
  //   },
  // ],
  preview: {
    select: {
      title: 'pageContent.pageModule.title',
      // publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage',
    },
    prepare({ title = 'No title', slug = {}, media }) {
      //const dateSegment = format(publishedAt, 'YYYY/MM')
      //const path = `/${dateSegment}/${slug.current}/`
      console.log(pageContent)
      return {
        title,
        media,
        //subtitle: publishedAt ? path : 'Missing publishing date',
      }
    },
  },
}
