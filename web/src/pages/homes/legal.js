import React from "react";
import { graphql } from "gatsby";

import SEO from "../../components/seo";
import Container from "../../components/container";
import Layout from "../../containers/layout";

import { StandardText } from "../../components/global/standardText";

export const query = graphql`
  {
    allSanityLegalPage {
      nodes {
        title
        _rawDescription(resolveReferences: { maxDepth: 10 })
      }
    }
  }
`;

const LegalPageRedesign = ({ data }) => {
  const content = data.allSanityLegalPage.nodes[0];

  return (
    <Layout showPopupNewsletter={true} rnd={false}>
      <SEO title={content.title} />
      <Container className="flex flex-col h-screen">
        <div className="text-[0.875rem] leading-[135%] max-w-4xl mt-10 ">
          <StandardText data={content._rawDescription} />
        </div>
      </Container>
    </Layout>
  );
};

export default LegalPageRedesign;
