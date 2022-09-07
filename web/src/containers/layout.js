import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/layout";
import { ThemeProvider } from "@chakra-ui/core";
import { Global, css } from "@emotion/core";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

// Add Sentry to page to catch exceptions from users
// only init in production env
try {
  const currentURL = typeof window !== "undefined" && window.location && window.location.href;
  if (currentURL && !currentURL.match("localhost") && !currentURL.match("staging.earth")) {
    Sentry.init({
      dsn: "https://1cd03b4176dd4fc4a68dca869e1d712e@o914508.ingest.sentry.io/5853521",
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0
    });
  }
} catch (error) {
  console.error("Sentry failed to init: ", error);
}

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
    showThinBanner: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      showthinbanner
    }
    thinBanner: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      thinbanner
    }
    bannerUrl: allSanitySiteSettings {
      edges {
        node {
          _rawUrl(resolveReferences: { maxDepth: 20 })
        }
      }
    }
    bannerUrlTitle: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      bannerUrlTitle
    }
    all: allSanitySiteSettings {
      edges {
        node {
          _rawInfosection(resolveReferences: { maxDepth: 20 })
          _rawNewsletterText(resolveReferences: { maxDepth: 20 })
        }
      }
    }
    belowInfo: allSanitySiteSettings {
      edges {
        node {
          _rawInfosectionBelow(resolveReferences: { maxDepth: 20 })
        }
      }
    }
    infoSection: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
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
    pillColor: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      pillColor
    }
    strikeColor: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      strikeColor
    }
    newsletter: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      newsletterText {
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

    rndFooterMenu: allSanityMenus(filter: { slug: { current: { eq: "rnd-footer" } } }) {
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
  const [showSubNav, setShowSubNav] = useState(0);
  function handleShowNav() {
    setShowNav(true);
    document.body.style.overflow = "hidden";
  }
  function handleHideNav() {
    setShowNav(false);
    document.body.style.overflow = "";
  }
  function handleShowSubNav() {
    setShowSubNav(1);
  }
  function handleHideSubNav() {
    setShowSubNav(2);
  }
  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"'
          );
        }

        return (
          <ThemeProvider>
            <Global styles={GlobalStyles} />
            <Layout
              {...props}
              showPopupNewsletter={props.showPopupNewsletter}
              showThinBanner={props.isCheckout ? false : data.showThinBanner.showthinbanner}
              thinBanner={data.thinBanner.thinbanner}
              bannerUrl={data.bannerUrl.edges[0].node._rawUrl}
              bannerUrlTitle={data.bannerUrlTitle.bannerUrlTitle}
              infoSection={data.all.edges[0].node._rawInfosection}
              infoSectionBelow={data.belowInfo.edges[0].node._rawInfosectionBelow}
              newsletter={data.all.edges[0].node._rawNewsletterText}
              showNav={showNav}
              showSubNav={showSubNav}
              siteTitle={data.site.title}
              pillColor={data.pillColor.pillColor}
              strikeColor={data.strikeColor.strikeColor}
              onHideNav={handleHideNav}
              onShowNav={handleShowNav}
              onHideSubNav={handleHideSubNav}
              onShowSubNav={handleShowSubNav}
              footerMenu={data.footerMenu}
              rndFooterMenu={data.rndFooterMenu}
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
