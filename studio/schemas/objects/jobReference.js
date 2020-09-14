export default {
  name: 'jobReference',
  type: 'object',
  title: 'Job reference',
  fields: [
    {
      name: 'job',
      type: 'reference',
      to: [
        {
          type: 'job',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'job.name',
      media: 'job.image.asset',
    },
  },
}
