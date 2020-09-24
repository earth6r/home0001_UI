import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/layout";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
    mainMenu: allSanityMenus(filter: { slug: { current: { eq: "main" } } }) {
      edges {
        node {
          items {
            ... on SanityExternalLink {
              _key
              _type
            }
            ... on SanityInternalLink {
              _key
              _type
              link {
                content {
                  main {
                    title
                    slug {
                      current
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    footerMenu: allSanityMenus(filter: { slug: { current: { eq: "footer" } } }) {
      edges {
        node {
          items {
            ... on SanityExternalLink {
              _key
              _type
              title
              url
            }
            ... on SanityInternalLink {
              _key
              _type
              link {
                content {
                  main {
                    title
                    slug {
                      current
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function LayoutContainer(props) {
  const [showNav, setShowNav] = useState(false);
  function handleShowNav() {
    setShowNav(true);
    // console.log("set true");
  }
  function handleHideNav() {
    setShowNav(false);
  }
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"'
          );
        }
        console.log(data);
        return (
          <Layout
            {...props}
            showNav={showNav}
            siteTitle={data.site.title}
            onHideNav={handleHideNav}
            onShowNav={handleShowNav}
            footerMenu={data.footerMenu}
            mainMenu={data.mainMenu}
          />
        );
      }}
    />
  );
}

export default LayoutContainer;
