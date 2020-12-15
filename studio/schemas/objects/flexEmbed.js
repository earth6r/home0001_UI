export default {
  name: 'flexEmbed',
  type: 'object',
  title: 'Embed Code',
  options: {
    hotspot: true,
  },
  fields:[
  			{
              name: 'embedCode',
              type: 'text',
              title: 'Embed code',
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
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true,
              },
            },
            ]
}
