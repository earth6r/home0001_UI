import React from "react";
import { graphql } from "gatsby";
import Container from "../../components/container";
import GraphQLErrorList from "../../components/graphql-error-list";
import SEO from "../../components/seo";
import DepositBlock from "../../components/DepositBlock";
import Layout from "../../containers/layout";
import { RenderModules } from "../../utils/renderModules";

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query CollectivePageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    depositCounter: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      depositCounter
    }
    whatsIncluded: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      whatsIncluded {
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
    depositBlockImage: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      depositBlockImage {
        _key
        _rawAsset
        _rawCrop
        _rawHotspot
        _type
        asset {
          assetId
          url
          _id
        }
        crop {
          bottom
          left
          right
          top
        }
        hotspot {
          height
          width
          x
          y
        }
      }
    }
    allSanityLanding(filter: { content: { main: { title: { eq: "Landing" } } } }) {
      edges {
        node {
          _rawContent(resolveReferences: { maxDepth: 20 })
        }
      }
    }
  }
`;

const CollectivePage = props => {
  const { data, errors } = props;
  let sku = "MEMB001";
  const whatsIncluded = data.whatsIncluded.whatsIncluded;
  const depositCounter = data.depositCounter.depositCounter;
  const depositBlockImage = data.depositBlockImage.depositBlockImage;
  let bitPayID = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_REGULAR_PRICE;
  let bitPayIDDiscounted = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_DISCOUNTED;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const {
    main: { modules, slug, title },
    meta
  } = data.allSanityLanding.edges[0].node._rawContent;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  let myTitle = title + " | ";
  if (title == "Landing") {
    myTitle = "Earth";
  }

  return (
    <Layout blackHeader={false} blackFooter={false} showPopupNewsletter={true}>
      <SEO
        title={myTitle}
        description={site.description}
        keywords={site.keywords}
        image={meta.openImage}
        ogTitle={meta.openTitle}
        ogDescription={meta.openGraphDescription}
      />
      <Container className="">
        <div className="flex flex-wrap">{RenderModules(modules)}</div>
      </Container>
      {title == "Landing" && <DepositBlock />}
    </Layout>
  );
};

export default CollectivePage;
