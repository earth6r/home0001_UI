import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
// import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
// import { InlineWidget } from "react-calendly";

export const query = graphql`
  query InfoQuery($id: String!) {
    page: sanityPage(id: { eq: $id }) {
      _rawContent(resolveReferences: { maxDepth: 20 })
    }
  }
`;

const InfoTemplate = (props) => {
  const { data, errors } = props;
  const page = data && data.page;
  const {
    main: { modules, slug },
    meta,
  } = page._rawContent;
  // console.log(data);

  return (
    <Layout rnd={true}>
      {/*<SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
        image={meta.openImage}
      />*/}
      <Container>
        <div className="flex flex-wrap w-full">{RenderModules(modules)}</div>
      </Container>
    </Layout>
  );
};

export default InfoTemplate;
