import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";
// import ReactGA from 'react-ga';

function SEO({ description, lang, meta, keywords, title, image = null, ogTitle, ogDescription }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        // ReactGA.initialize('UA-133011720-1');
        // ReactGA.pageview(window.location.pathname + window.location.search);
        const metaDescription = description || (data.site && data.site.description) || "";
        const siteTitle = (data.site && data.site.title) || "";
        const siteAuthor = (data.site && data.site.author && data.site.author.name) || "";
        const metaImage =
          image && image.asset ? imageUrlFor(buildImageObj(image)).width(1200).url() : "";

        return (
          <Helmet
            htmlAttributes={{ lang }}
            title={title === "" ? `Earth` : `${title}`}
            titleTemplate={title === `Earth` || title === 'EARTH' ? title : `%s | ${siteTitle}`}
            meta={[
              {
                name: "twitter:card",
                content: "summary",
              },
              {
                name: "twitter:creator",
                content: siteAuthor,
              },
              {
                name: "twitter:title",
                content: "EARTH",
              },
              {
                name: "twitter:description",
                content: metaDescription,
              },
            ].concat(meta)}
          >

          <link rel="stylesheet" href="/fonts/fonts.css"></link>
          <link rel="preload" href="/fonts/fonts.css" as="style"></link>
          <script src="https://www.googleoptimize.com/optimize.js?id=OPT-MWRZP22" async></script>
          <meta name="description" content={metaDescription} />
          <meta name="keywords" content={keywords && keywords.length > 0 ? keywords.join(", ") : ""} />
          <meta property='og:type' content="website" />
          <meta property="og:title" content={ogTitle ?? 'Earth'} />
          <meta property="og:description" content={ogDescription ?? metaDescription} />
          <meta property="og:image" content={metaImage} />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"/>
          <meta name="robots" content="noindex,nofollow" />
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
    }
  }
`;
