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

async function createSitePages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPage {
        edges {
          node {
            id
            content {
              main {
                slug {
                  current
                }
              }
            }
            _rawContent(resolveReferences: { maxDepth: 20 })
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const pageEdges = (result.data.allSanityPage || {}).edges || [];

  pageEdges
    // .filter((edge) => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const { id } = edge.node;
      const slug = edge.node.content.main.slug;
      console.log(slug);
      // const dateSegment = format(publishedAt, "YYYY/MM");
      const path = `/${slug.current}/`;

      createPage({
        path,
        component: require.resolve("./src/templates/page.js"),
        context: { id },
      });
    });
}


async function createSiteCheckout(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityCheckout {
        edges {
          node {
            id
            content {
              main {
                slug {
                  current
                }
              }
            }
            _rawGdpr(resolveReferences: { maxDepth: 10 })
            _rawContent(resolveReferences: { maxDepth: 10 })
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const pageEdges = (result.data.allSanityCheckout || {}).edges || [];

  pageEdges
    // .filter((edge) => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const { id } = edge.node;
      const slug = edge.node.content.main.slug;
      // console.log(slug);
      // const dateSegment = format(publishedAt, "YYYY/MM");
      const path = `/checkout/${slug.current}/`;

      createPage({
        path,
        component: require.resolve("./src/templates/checkout.js"),
        context: { id },
      });
    });
}

async function createHomes(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityHome {
        edges {
          node {
            id
            content {
              main {
                slug {
                  current
                }
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const pageEdges = (result.data.allSanityHome || {}).edges || [];

  pageEdges
    // .filter((edge) => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const { id } = edge.node;
      const slug = edge.node.content.main.slug;
      // console.log(slug);
      // const dateSegment = format(publishedAt, "YYYY/MM");
      const path = `/home/${slug.current}/`;

      createPage({
        path,
        component: require.resolve("./src/templates/home.js"),
        context: { id },
      });
    });
}

exports.createPages = async ({ graphql, actions }) => {
  await createBlogPostPages(graphql, actions);
  await createHomes(graphql, actions);
  await createSitePages(graphql, actions);
  await createSiteCheckout(graphql, actions);
  // await createArtistPages(graphql, actions);
};
