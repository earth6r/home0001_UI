import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/layout";
import { ThemeProvider } from "@chakra-ui/core";
import { Global, css } from "@emotion/core";
// import { theme } from "../gatsby-plugin-chakra-ui/theme";
// import { theme } from "../lib/theme";

const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

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

  fragment CheckoutLinkFragment on SanityCheckout {
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
    showThinBanner:  sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      showthinbanner
    }
    thinBanner:  sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      thinbanner
    }
    bannerUrl:  allSanitySiteSettings {
      edges {
        node {
          _rawUrl(resolveReferences: { maxDepth: 20 })
        }
      }
    }
    bannerUrlTitle:  sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      bannerUrlTitle
    }
    all: allSanitySiteSettings {
      edges {
        node {
          _rawInfosection(resolveReferences: { maxDepth: 20 })
        }
      }
    }
    infoSection:  sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      infosection {
        _key
        _rawChildren
        _type
        style
        children {
          _key
          _type
          text
          marks
        }
      }
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
              title
            }
          }
        }
      }
    }

    subMenu: allSanityMenus(filter: { slug: { current: { eq: "submenu" } } }) {
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
              title
            }
          }
        }
      }
    }

    rMenu: allSanityMenus(filter: { slug: { current: { eq: "rnd" } } }) {
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
              title
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
              title
            }
          }
        }
      }
    }
  }
`;

function LayoutContainer(props) {

  const [showNav, setShowNav] = useState(false);
  const [showSubNav, setShowSubNav] = useState(false);
  function handleShowNav() {
    setShowNav(true);
    // console.log("set true");
  }
  function handleHideNav() {
    setShowNav(false);
  }
  function handleShowSubNav() {
    setShowSubNav(true);
    console.log("set true");
  }
  function handleHideSubNav() {
    setShowSubNav(false);
    console.log("set false")
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
          <ThemeProvider>
            <Global styles={GlobalStyles} />
            <Layout
              {...props}
              showThinBanner={data.showThinBanner.showthinbanner}
              thinBanner={data.thinBanner.thinbanner}
              bannerUrl={data.bannerUrl.edges[0].node._rawUrl}
              bannerUrlTitle={data.bannerUrlTitle.bannerUrlTitle}
              infoSection={data.all.edges[0].node._rawInfosection}
              showNav={showNav}
              showSubNav = {showSubNav}
              siteTitle={data.site.title}
              onHideNav={handleHideNav}
              onShowNav={handleShowNav}
              onHideSubNav={handleHideSubNav}
              onShowSubNav={handleShowSubNav}
              footerMenu={data.footerMenu}
              mainMenu={data.mainMenu}
              rMenu={data.rMenu}
              subMenu={data.subMenu}
            />
          </ThemeProvider>
        );
      }}
    />
  );
}

export default LayoutContainer;
