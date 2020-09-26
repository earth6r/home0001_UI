import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/layout";
import { ThemeProvider } from "@chakra-ui/core";
// import { theme } from "../gatsby-plugin-chakra-ui/theme";
// import { theme } from "../lib/theme";

const query = graphql`
  fragment HomeLinkFragment on SanityHome {
    content {
      main {
        title
        slug {
          current
        }
      }
    }
  }

  fragment LinkFragment on SanityPage {
    content {
      main {
        title
        slug {
          current
        }
      }
    }
  }

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
              title
              url
            }
            ... on SanityInternalLink {
              _key
              _type
              link {
                ...LinkFragment
                ...HomeLinkFragment
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
                ...LinkFragment
                ...HomeLinkFragment
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
        // console.log(data);
        return (
          <ThemeProvider>
            <Layout
              {...props}
              showNav={showNav}
              siteTitle={data.site.title}
              onHideNav={handleHideNav}
              onShowNav={handleShowNav}
              footerMenu={data.footerMenu}
              mainMenu={data.mainMenu}
            />
          </ThemeProvider>
        );
      }}
    />
  );
}

export default LayoutContainer;
