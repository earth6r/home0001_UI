import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";
import ReactGA from 'react-ga';

function SEO({ description, lang, meta, keywords, title, image = null }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        ReactGA.initialize('UA-133011720-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
        const metaDescription = description || (data.site && data.site.description) || "";
        const siteTitle = (data.site && data.site.title) || "";
        const siteAuthor = (data.site && data.site.author && data.site.author.name) || "";
        const metaImage =
          image && image.asset ? imageUrlFor(buildImageObj(image)).width(1200).url() : "";

        return (
          <Helmet
            htmlAttributes={{ lang }}
            title={title === "" ? `Home` : `${title}`}
            titleTemplate={title === `EARTH` ? `EARTH` : `%s | ${siteTitle}`}
            meta={[
              {
                name: "description",
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: `EARTH is a distributed housing collective.`,
              },
              {
                property: "og:description",
                content: metaDescription,
              },
              {
                property: "og:type",
                content: "website",
              },
              {
                property: "og:image",
                content: metaImage,
              },
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
            ].concat(
                keywords && keywords.length > 0
                  ? {
                      name: "keywords",
                      content: keywords.join(", "),
                    }
                  : []
              )
              .concat(meta)}
          >

          <script src="https://www.googleoptimize.com/optimize.js?id=OPT-MWRZP22"></script>

          <meta property="og:title" content="EARTH" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

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
