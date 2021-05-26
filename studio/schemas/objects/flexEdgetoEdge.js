export default {
  name: 'flexEdgetoEdge',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true,
  },
  fields:[  
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
              name:'startRowMobile',
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
              title: 'Hide on Mobile?',
              name: 'hideMobile',
              type: 'boolean',
              options: {
                isHighlighted: true,
              }
            },
            {
              title: 'Hide on Tablet?',
              name: 'hideTablet',
              type: 'boolean',
              options: {
                isHighlighted: true,
              }
            },
            {
              title: 'Hide on Desktop?',
              name: 'hideDesktop',
              type: 'boolean',
              options: {
                isHighlighted: true,
              }
            },
            {
              title: 'Top of page (pulls up to nav)?',
              name: 'upToNav',
              type: 'boolean',
              options: {
                isHighlighted: true,
              }
            },
      ],
        preview: {
          select: {
            title: 'alt',
            media: 'asset' // Use the userPortait image field as thumbnail
          }
        }
}
