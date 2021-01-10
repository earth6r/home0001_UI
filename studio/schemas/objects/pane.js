export default {
  title: 'Pane',
  name: 'pane',
  type: 'object',
  fields: [
  {
    name:'offset',
    title:'offset in pixels(i.e. 112)',
    type: 'number',
  },
  {
    name:'mobileOffset',
    title:'mobile offset in pixels(i.e. 112)',
    type: 'number',
  },
    {name:'color',
     title: ' Color Hex (#ffffff)',
     type: 'string'
  	},
  {
      name: 'modules',
      title: 'Modules',
      type: 'paneContent',
      fieldset: 'modules',
    },
	],
	fieldsets: [
    {
      name: 'modules',
      title: 'Page Modules',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
}
