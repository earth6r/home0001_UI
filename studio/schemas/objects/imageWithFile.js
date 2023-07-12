export default {
  name: 'imageWithFile',
  title: 'Image With File',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'file',
      title: 'File',
      type: 'file'
    }
  ]
}
