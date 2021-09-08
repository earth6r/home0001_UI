export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.',
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      type: "boolean",
      name: "showthinbanner",
      description: "Show thin banner",
    },
    {
      type: "text",
      name: "thinbanner",
      description: "Content for thin banner",
    },
     {
      name: 'url',
      title: 'Internal link for thin banner (leave blank if none)',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'home' }, { type: 'checkout' }],
    },
    {
      type: "text",
      name: "bannerUrlTitle",
      description: "text for thin banner internal url (leave blank if none)",
    },
    {
      name: 'newsletterText',
      type: 'bodyPortableText',
      title: 'Newsletter text for homes site'
    },
    {
      name: 'infosection',
      type: 'bodyPortableText',
      title: 'Info Section for R & D site'
    },
    {
      name: 'infosectionBelow',
      type: 'bodyPortableText',
      title: '(below newsletter) Info Section for R & D site'
    },
    {
      name: 'pillColor',
      type: 'string',
      title: 'color of the button in the thin banner'
    },
     {
      name: 'strikeColor',
      type: 'string',
      title: 'color of the discount strikethrough'
    },
    {
      name: 'discountCodes',
      type: 'array',
      title: 'discount codes',
      description: 'Add discount codes.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'whatsIncluded',
      type: 'bodyPortableText',
      title: 'whats included description'
    },
    {
      type: "text",
      name: "depositCounter",
      description: "spots left",
    },
    {
      name: 'depositBlockImage',
      type: 'image',
      title: 'Deposit Block Image',
    },
    {
      name: 'exchangeRateUSDBTC',
      type: 'number',
      title: 'BTC exchange rate used across site USD->BTC',
    },
    {
      name: 'exchangeRateUSDETH',
      type: 'number',
      title: 'ETH exchange rate used across site USD->ETH',
    },
  ],
}
