import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
// import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
// import { InlineWidget } from "react-calendly";

export const query = graphql`
  query PageQuery($id: String!) {
    page: sanityPage(id: { eq: $id }) {
      _rawContent(resolveReferences: { maxDepth: 20 })
      isrnd
    }
  }
`;

const PageTemplate = (props) => {
  const { data, errors } = props;
  const page = data && data.page;
  const {
    main: { modules, slug,title },
    meta,
  } = page._rawContent;
  const isrnd = page.isrnd;

  return (
    <Layout rnd={isrnd}>
      <SEO
        title={title + " | EARTH"}
      />
      <Container>
        <div className="flex flex-wrap w-full">{RenderModules(modules)}</div>
      </Container>
    </Layout>
  );
};

export default PageTemplate;
