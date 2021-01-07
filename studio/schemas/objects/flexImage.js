export default {
  name: 'flexImage',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true,
  },
  fields:[
            {name:'startColumn',
              type: 'number',
              description: "starting column",
              title: 'starting column (between 1- 20)',
              options: {
                isHighlighted: true,
              },
              validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
            },
            {name:'endColumn',
              type: 'number',
              description: "ending column",
              title: 'ending column (between 1- 20)',
              options: {
                isHighlighted: true,
              },
              validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
            },
            {name:'startRow',
              type: 'number',
              description: "starting row",
              title: 'starting Row',
              options: {
                isHighlighted: true,
              },
            },
            {name:'endRow',
              type: 'number',
              description: "ending row",
              title: 'ending Row',
              options: {
                isHighlighted: true,
              },
            },
              {name:'startColumnMobile',
    type: 'number',
    description: "starting column for mobile",
    title: 'starting column mobile (between 1- 20)',
    options: {
      isHighlighted: true,
    },
    validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
  },
  {name:'endColumnMobile',
    type: 'number',
    description: "ending column for mobile",
    title: 'ending column mobile (between 1- 20)',
    options: {
      isHighlighted: true,
    },
    validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
  },
  {name:'startRowMobile',
    type: 'number',
    description: "starting row for mobile",
    title: 'starting Row mobile',
    options: {
      isHighlighted: true,
    },
  },
  {name:'endRowMobile',
    type: 'number',
    description: "ending row for mobile",
    title: 'ending Row Mobile',
    options: {
      isHighlighted: true,
    },
  },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true,
              },
            },{
              name: 'link',
              title: 'Link',
              type: 'reference',
              options: {
                        isHighlighted: true,
                      },
              to: [{ type: 'page' }, { type: 'home' }, { type: 'checkout' }],
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
              validation: (Rule) => Rule.error('You have to fill out the alternative text.').required(),
              options: {
                isHighlighted: true,
              },
            },
            {
              title: 'Lead Image?',
              name: 'lead',
              type: 'boolean',
              options: {
                isHighlighted: true,
              }
            }]
}
