import Tabs from 'sanity-plugin-tabs'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: "content",
      type: "pageContent",
    },
    {
      name:"isrnd",
      type:"boolean",
      title:"Is this an R&D subpage?"
    }
  ],
  preview: {
    select: {
      title: 'content.main.title',
      subtitle: 'heroText',
      media: 'mainImage'
    }
  }
}
