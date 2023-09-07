import React, { useEffect } from "react";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Container from "../components/redesign/Container";
import Layout from "../containers/layout";

import { StandardText } from "../components/global/standardText";

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
  if (typeof window !== undefined && window._hsq !== undefined) {
    var _hsq = (window._hsq = window._hsq || []);
    _hsq.push(["setPath", "/legal"]);
    _hsq.push(["trackPageView"]);
  }
  const content = data.allSanityLegalPage.nodes[0];

  return (
    <Layout showPopupNewsletter={true} rnd={false} homes>
      <SEO title={content?.title ?? "Legal"} />
      <Container>
        <div className="text-mobile-body md:text-desktop-body md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu mb-10 md:mb-8">
          <div className="md:col-start-2 md:col-span-1">
            <StandardText data={content._rawDescription} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default LegalPageRedesign;
