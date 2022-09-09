import React from 'react'

export default {
  title: 'Standard Text',
  name: 'standardText',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'internalTitle',
      title: 'Title for Internal Use',
      type: 'string'
    },
    {
      name: 'callibrationMark',
      title: 'Show Callibration Marks',
      default: true,
      type: 'boolean'
    },
    {
      name: 'cssClassInject',
      title: 'add css classes, like tailwind',
      default: '',
      type: 'string'
    },
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'H6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'}
          ],
          // Marks let you mark up inline text in the block editor.
          marks: {
            // Annotations can be any object structure – e.g. a link or a footnote.
            decorators: [
              {value: 'strong', title: 'Strong'},
              {value: 'italic', title: 'Italic'},
              {value: 'underline', title: 'Underline'},
              {value: 'code', title: 'Code'},
              {
                title: 'Inline Snippet',
                value: 'tick',
                blockEditor: {
                  icon: () => 'T',
                  render: (props) => (
                    <span style={{backgroundColor: '#ccc', fontWeight: '300'}}>
                      {props.children}
                    </span>
                  )
                }
              }
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
                    validation: Rule => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  }
                ]
              },
              {
                name: 'mapLink',
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
                name: 'contactPopup',
                type: 'object',
                title: 'Contact Popup',
                fields: [
                  {
                    name: 'title',
                    type: 'string',
                    title: 'Title'
                  },
                  {
                    name: 'subtitle',
                    type: 'text',
                    title: 'Subtitle'
                  }
                ]
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
                    description: 'amount in usd to be displayed in bitcoin'
                  },
                  {
                    name: 'decimalPlaces',
                    title: 'Decimal Places',
                    type: 'number',
                    description: 'positive for number of decimal places, negative for rounding zeros'
                  }
                ]
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
                    description: 'amount in usd to be displayed in etherium'
                  },
                  {
                    name: 'decimalPlaces',
                    title: 'Decimal Places',
                    type: 'number',
                    description: 'positive for number of decimal places, negative for rounding zeros'
                  }
                ]
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
                      {type: 'page'},
                      {type: 'checkout'},
                      {type: 'home'}
                      // other types you may want to link to
                    ]
                  }
                ]
              }
            ]
          },
          of: [{type: 'authorReference'}],
          of: [{type: 'partnerReference'}]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'internalLink'
    },
    prepare (selection) {
      return Object.assign({}, selection, {
        title: 'Standard Text'
      })
    }
  }
}
