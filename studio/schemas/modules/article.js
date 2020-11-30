import React from 'react'

export default {
  title: 'Article (R&D only)',
  name: 'article',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'callibrationMark',
      title: 'Show Callibration Marks',
      default: true,
      type: 'boolean',
    },
    {
      name: 'articleItems',
      title: 'Article Items',
      type: 'array',
      of: [{ type: 'articleItem' }],
    }
  ],
  preview: {
    select: {
      title: '',
    },
    prepare(selection) {
      return Object.assign({}, selection, {
        title: 'Articles',
      })
    },
  },
}
