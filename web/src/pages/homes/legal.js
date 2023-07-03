import React from "react";
import { graphql } from "gatsby";

import SEO from "../../components/seo";
import Container from "../../components/redesign/container";
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
      <Container>
        <div className="text-[0.875rem] leading-[135%] md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu mb-10 md:mb-8">
          <div className="md:col-start-2 md:col-span-1">
            <StandardText data={content._rawDescription} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default LegalPageRedesign;
