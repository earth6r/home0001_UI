export default {
  name: 'artistReference',
  type: 'object',
  title: 'Artist reference',
  fields: [
    {
      name: 'artist',
      type: 'reference',
      to: [
        {
          type: 'artist',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'artist.name',
      media: 'artist.image.asset',
    },
  },
}
