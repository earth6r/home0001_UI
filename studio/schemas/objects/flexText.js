export default {
  name: 'flexText',
  type: 'object',
  title: 'Text',
  options: {
    hotspot: true,
  },
  fields:[
  			{
              name: 'text',
              type: 'bodyPortableText',
              title: 'text',
              options: {
                isHighlighted: true,
              },
            },
            {
              name: 'color',
              type: 'string',
              title: 'text color',
              options: {
                isHighlighted: true,
              },
            },
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

{name:'startColumnTablet',
    type: 'number',
    description: "starting column for tablet",
    title: 'starting column tablet (between 1- 20)',
    options: {
      isHighlighted: true,
    },
    validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
  },
  {name:'endColumnTablet',
    type: 'number',
    description: "ending column for tablet",
    title: 'ending column tablet (between 1- 20)',
    options: {
      isHighlighted: true,
    },
    validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
  },
  {name:'startRowTablet',
    type: 'number',
    description: "starting row for tablet",
    title: 'starting Row tablet',
    options: {
      isHighlighted: true,
    },
  },
  {name:'endRowTablet',
    type: 'number',
    description: "ending row for tablet",
    title: 'ending Row tablet',
    options: {
      isHighlighted: true,
    },
  }
            ]
}
