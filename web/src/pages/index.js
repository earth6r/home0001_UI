import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
// import { InlineWidget } from "react-calendly";

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
    allSanityLanding {
      edges {
        node {
          _rawContent(resolveReferences: { maxDepth: 20 })
        }
      }
    }
  }
`;

const CollectivePage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  let currentLanding;
  data.allSanityLanding.edges.forEach((landing)=>{
    if(landing.node._rawContent.main.title == "Landing"){
      currentLanding = landing;
    }
  })
  const site = (data || {}).site;
  const {
    main: { modules, slug, title },
    meta,
  } = currentLanding.node._rawContent;

  

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  let myTitle = title + " | ";
  if(title == "Landing"){
    myTitle = ""
  }

    
  return (
    <Layout>
      <SEO
        title={myTitle}
        description={site.description}
        keywords={site.keywords}
        image={meta.openImage}
      />
      <Container className="">
        <div className="flex flex-wrap">{RenderModules(modules)}</div>
      </Container>
    </Layout>
  );
};

export default CollectivePage;
