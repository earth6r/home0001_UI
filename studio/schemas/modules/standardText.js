import React from 'react'

export default {
  title: 'Standard Text',
  name: 'standardText',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'H6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' },
          ],
          // Marks let you mark up inline text in the block editor.
          marks: {
            // Annotations can be any object structure – e.g. a link or a footnote.
            decorators: [
              { value: 'strong', title: 'Strong' },
              { value: 'italic', title: 'Italic' },
              { value: 'underline', title: 'Underline' },
              { value: 'code', title: 'Code' },
              {
                title: 'Inline Snippet',
                value: 'tick',
                blockEditor: {
                  icon: () => 'T',
                  render: (props) => (
                    <span style={{ backgroundColor: '#ccc', fontWeight: '300' }}>
                      {props.children}
                    </span>
                  ),
                },
              },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [
                      { type: 'page' },
                      { type: 'checkout' },
                      { type: 'home' },
                      // other types you may want to link to
                    ],
                  },
                ],
              },
            ],
          },
          of: [{ type: 'authorReference' }],
          of: [{ type: 'partnerReference' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: '',
    },
    prepare(selection) {
      return Object.assign({}, selection, {
        title: 'Standard Text',
      })
    },
  },
}
