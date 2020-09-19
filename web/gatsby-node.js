const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { format } = require("date-fns");

async function createBlogPostPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityPost || {}).edges || [];

  postEdges
    .filter((edge) => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const { id, slug = {}, publishedAt } = edge.node;
      const dateSegment = format(publishedAt, "YYYY/MM");
      const path = `/blog/${dateSegment}/${slug.current}/`;

      createPage({
        path,
        component: require.resolve("./src/templates/blog-post.js"),
        context: { id },
      });
    });
}

// async function createArtistPages(graphql, actions) {
//   const { createPage } = actions;
//   const result = await graphql(`
//     {
//       allSanityArtist(filter: { slug: { current: { ne: null } } }) {
//         edges {
//           node {
//             id
//             slug {
//               current
//             }
//           }
//         }
//       }
//     }
//   `);

//   if (result.errors) throw result.errors;

//   const postEdges = (result.data.allSanityArtist || {}).edges || [];

//   postEdges
//     //.filter(edge => !isFuture(edge.node.publishedAt))
//     .forEach((edge, index) => {
//       const { id, slug = {} } = edge.node;
//       const path = `/artist/${slug.current}/`;

//       createPage({
//         path,
//         component: require.resolve("./src/templates/artist.js"),
//         context: { id },
//       });
//     });
// }

// async function createGalleryPages(graphql, actions) {
//   const { createPage } = actions;
//   const result = await graphql(`
//     {
//       allSanityGallery(filter: { slug: { current: { ne: null } } }) {
//         edges {
//           node {
//             id
//             slug {
//               current
//             }
//           }
//         }
//       }
//     }
//   `);

//   if (result.errors) throw result.errors;

//   const postEdges = (result.data.allSanityGallery || {}).edges || [];

//   postEdges
//     //.filter(edge => !isFuture(edge.node.publishedAt))
//     .forEach((edge, index) => {
//       const { id, slug = {} } = edge.node;
//       const path = `/galleries/${slug.current}/`;

//       createPage({
//         path,
//         component: require.resolve("./src/templates/gallery.js"),
//         context: { id },
//       });
//     });
// }

exports.createPages = async ({ graphql, actions }) => {
  await createBlogPostPages(graphql, actions);
  // await createArtistPages(graphql, actions);
};
