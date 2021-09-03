export default {
  name: 'flexImage',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true,
  },
  fields:[
    {
      name:'startColumn',
      type: 'number',
      description: "starting column",
      title: 'starting column (between 1- 20)',
      options: {
        isHighlighted: true,
      },
      validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
    },
    {
      name:'endColumn',
      type: 'number',
      description: "ending column",
      title: 'ending column (between 1- 20)',
      options: {
        isHighlighted: true,
      },
      validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
    },
    {
      name:'startRow',
      type: 'number',
      description: "starting row",
      title: 'starting Row',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'endRow',
      type: 'number',
      description: "ending row",
      title: 'ending Row',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingTop',
      type: 'number',
      description: "padding top",
      title: 'Padding Top',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingBottom',
      type: 'number',
      description: "padding bottom",
      title: 'Padding Bottom',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingLeft',
      type: 'number',
      description: "padding left",
      title: 'Padding Left',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingRight',
      type: 'number',
      description: "padding right",
      title: 'Padding Right',
      options: {
        isHighlighted: true,
      },
    },
    
    {
      name:'startColumnMobile',
      type: 'number',
      description: "starting column for mobile",
      title: 'starting column mobile (between 1- 20)',
      options: {
        isHighlighted: true,
      },
      validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
    },
    {
      name:'endColumnMobile',
      type: 'number',
      description: "ending column for mobile",
      title: 'ending column mobile (between 1- 20)',
      options: {
        isHighlighted: true,
      },
      validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
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
    {
      name:'endRowMobile',
      type: 'number',
      description: "ending row for mobile",
      title: 'ending Row Mobile',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingTopMobile',
      type: 'number',
      description: "padding top Mobile",
      title: 'Padding Top Mobile',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingBottomMobile',
      type: 'number',
      description: "padding bottom Mobile",
      title: 'Padding Bottom Mobile',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingLeftMobile',
      type: 'number',
      description: "padding left Mobile",
      title: 'Padding Left Mobile',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingRightMobile',
      type: 'number',
      description: "padding right Mobile",
      title: 'Padding Right Mobile',
      options: {
        isHighlighted: true,
      },
    },
    
    {
      name:'startColumnTablet',
      type: 'number',
      description: "starting column for tablet",
      title: 'starting column tablet (between 1- 20)',
      options: {
        isHighlighted: true,
      },
      validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
    },
    {
      name:'endColumnTablet',
      type: 'number',
      description: "ending column for tablet",
      title: 'ending column tablet (between 1- 20)',
      options: {
        isHighlighted: true,
      },
      validation: Rule => Rule.max(20).warning('We use a 20 column system on the site')
    },
    {
      name:'startRowTablet',
      type: 'number',
      description: "starting row for tablet",
      title: 'starting Row tablet',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'endRowTablet',
      type: 'number',
      description: "ending row for tablet",
      title: 'ending Row tablet',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingTopTablet',
      type: 'number',
      description: "padding top Tablet",
      title: 'Padding Top Tablet',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingBottomTablet',
      type: 'number',
      description: "padding bottom Tablet",
      title: 'Padding Bottom Tablet',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingLeftTablet',
      type: 'number',
      description: "padding left Tablet",
      title: 'Padding Left Tablet',
      options: {
        isHighlighted: true,
      },
    },
    {
      name:'paddingRightTablet',
      type: 'number',
      description: "padding right Tablet",
      title: 'Padding Right Tablet',
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
    {
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
      title: 'Drop Shadow?',
      name: 'dropShadow',
      type: 'boolean',
      options: {
        isHighlighted: true,
      }
    },
    {
      title: 'Border?',
      name: 'border',
      type: 'boolean',
      options: {
        isHighlighted: true,
      }
    },
    {
      name: 'hoverImage',
      type: 'image',
      title: 'Hover Image (optional)',
      options: {
        isHighlighted: true,
      }
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
      title: 'Lead Image?',
      name: 'lead',
      type: 'boolean',
      options: {
        isHighlighted: true,
      }
    }
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'asset' // Use the userPortait image field as thumbnail
    }
  }
}
