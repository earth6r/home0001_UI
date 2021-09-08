import ButtonRenderer from './buttonRenderer'
import ImageRenderer from './imageRenderer'
import CircleRenderer from './circleRenderer'

export default {
  name: 'bodyPortableText',
  type: 'array',
  title: 'Post body',
  of: [
    {
      type: 'block',
      title: 'Block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'grey', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
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
                name: 'homeLink',
                title: '/collective',
                type: 'boolean',
              },
              {
                name: 'rndLink',
                title: '/',
                type: 'boolean',
              },
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
              {
                name: 'title',
                title: 'Title',
                type: 'string',
              },
            ],
          },
          {
            name: 'currencyTranslatorUSDBTC',
            type: 'object',
            title: '$->BTC',
            fields: [
              {
                name: 'amountUSD',
                title: 'Dollars',
                type: 'number',
                description: "amount in usd to be displayed in bitcoin",
              },
              {
                name: 'decimalPlaces',
                title: 'Decimal Places',
                type: 'number',
                description: "positive for number of decimal places, negative for rounding zeros",
              },
            ],
          },
          {
            name: 'currencyTranslatorUSDETH',
            type: 'object',
            title: '$->ETH',
            fields: [
              {
                name: 'amountUSD',
                title: 'Dollars',
                type: 'number',
                description: "amount in usd to be displayed in etherium",
              },
              {
                name: 'decimalPlaces',
                title: 'Decimal Places',
                type: 'number',
                description: "positive for number of decimal places, negative for rounding zeros",
              },
            ],
          },
          {
            name:'mapLink',
            type: 'object',
            title: 'Map Link',
            fields: [
              {
                name: 'lat',
                type: 'string',
                title: 'latitude'
              },
              {
                name: 'long',
                type: 'string',
                title: 'longitude'
              }
            ]
          },
          {
            name: 'buttonLink',
            type: 'object',
            title: 'Button Link',
             blockEditor: {
              render: ButtonRenderer
            },
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
          {
            name: 'circleLink',
            type: 'object',
            title: 'Circle Button Link',
             blockEditor: {
              render: CircleRenderer
            },
            fields: [
              {
                name: 'homeLink',
                title: '/collective',
                type: 'boolean',
              },
              {
                name: 'rndLink',
                title: '/',
                type: 'boolean',
              },
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
              {
                title: 'Color',
                name: 'color',
                type: 'string',
                options: {
                  list: [
                    {title: 'White', value: 'white'},
                    {title: 'Black', value: 'black'}
                  ], // <-- predefined values
                  layout: 'radio', // <-- defaults to 'dropdown'
                  default: 'white'
                }
              },
            ],
          },
        ],
      },
      of: [{ type: 'partnerReference' },
        {
          name: 'pdf',
          title: 'Pdf',
          type: 'file',
          fields: [
            {
              type: 'text',
              name: 'iframeCaption',
              title: 'Iframe Caption text',
              description: 'caption for html iframe',
              options: {
                isHighlighted: true
              }
            }
          ]
        },
        { type: 'object',
          name: 'iframe',
          fields: [
            {
              type: 'text',
              name: 'iframeCode',
              title: 'Iframe code',
              description: 'code for html iframe',
              options: {
                isHighlighted: true
              }
            },
            {
              type: 'text',
              name: 'iframeCaption',
              title: 'Iframe Caption text',
              description: 'caption for html iframe',
              options: {
                isHighlighted: true
              }
            }
          ]

        },
        {
          type: 'image',
          fields: [
            {
              type:'boolean',
              name: 'fullwidth',
              title: 'Should img be full width'
            },
            {
              type: 'text',
              name: 'captionText',
              title: 'Caption text',
              description: 'caption for image',
              options: {
                isHighlighted: true
              }
            },
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: `Some of your visitors cannot see images, 
                be they blind, color-blind, low-sighted; 
                alternative text is of great help for those 
                people that can rely on it to have a good idea of 
                what\'s on your page.`,
              options: {
                isHighlighted: true
              }
            }
          ]
        },
         { type: 'object',
          name: 'priceBreakdownLine',
          fields: [
            {
              type: 'text',
              name: 'left',
              title: 'left Column',
              description: 'left',
              options: {
                isHighlighted: true
              }
            },
            {
              type: 'text',
              name: 'right',
              title: 'right Column',
              description: 'right',
              options: {
                isHighlighted: true
              }
            },
            {
              type: 'boolean',
              name: 'border',
              title: 'border',
              description: 'border bottom',
              options: {
                isHighlighted: true
              }
            }
          ]

        }],
    },
    
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    // {
    //   type: 'mainImage',
    //   options: { hotspot: true },
    // },
  ],
}
