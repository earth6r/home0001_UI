const pageQuery = `{
    allSanityPage {
      edges {
        node {
          id
          content {
              main {
                slug {
                  current
                }
                title
              }
          }
        }
      }
    }
}`;

const productQuery = `{
  allSanityProduct {
    edges {
      node {
        id
        content {
            main {
              slug {
                current
              }
              title
              mainImage {
                asset {
                  url
                  assetId
                }
              }
            }
            shopify {
              defaultPrice
            }
        }
      }
    }
  }
}`;

const postQuery = `{
  allSanityPost {
    edges {
      node {
        id
        content {
            main {
              slug {
                current
              }
              title
            }
        }
        period
        country
        medium {
          content {
            main {
              title
            }
          }
        }
        category {
          content {
            main {
              title
            }
          }
        }
        mainImage {
          asset {
            url
            assetId
          }
        }
      }
    }
  }
}`;

const journalPostQuery = `{
  allSanityJournalPost {
    edges {
      node {
        id
        content {
            main {
              slug {
                current
              }
              title
            }
        }
        category {
          content {
            main {
              title
            }
          }
        }
        collection {
          content {
            main {
              title
            }
          }
        }
        mainImage {
          asset {
            url
            assetId
          }
        }
      }
    }
  }
}`;

const settings = {};
const queries = [
  {
    query: postQuery,
    indexName: `Posts`,
    transformer: ({ data }) => data.allSanityPost.edges.map(({ node }) => node),
    settings
  },
  {
    query: journalPostQuery,
    indexName: `Journal Posts`,
    transformer: ({ data }) =>
      data.allSanityJournalPost.edges.map(({ node }) => node),
    settings
  },
  {
    query: productQuery,
    indexName: `Products`,
    transformer: ({ data }) =>
      data.allSanityProduct.edges.map(({ node }) => node),
    settings
  },
  {
    query: pageQuery,
    indexName: `Pages`,
    transformer: ({ data }) => data.allSanityPage.edges.map(({ node }) => node),
    settings
  }
  /*
    {
    query: pageQuery,
    indexName: `Pages`,
    transformer: ({ data }) => data.allSanityPage.edges.map(({ node }) => node),
    settings
  }
    {
    query: productQuery,
    indexName: `Products`,
    transformer: ({ data }) =>
      data.allSanityProduct.edges.map(({ node }) => node),
    settings
  }
  {
    query: postQuery,
    indexName: `Posts`,
    transformer: ({ data }) => data.allSanityPost.edges.map(({ node }) => node),
    settings
  },
  
  */
];

module.exports = queries;
