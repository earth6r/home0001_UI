export default {
  title: "Post Category",
  name: "postCategory",
  type: "object",
  hidden: true,
  fields: [
    {
      name: "title",
      title: "Category Title",
      type: "string",
    },
    {
      name: "description",
      title: "Category Description",
      type: "text",
      rows: 3,
    },
  ],
};
