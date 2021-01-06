export default {
  title: 'Pane',
  name: 'pane',
  type: 'object',
  fields: [
    {name:'color',
     title: 'Flag Color Hex (#ffffff)',
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
