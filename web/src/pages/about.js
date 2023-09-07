import React from "react";
import Container from "../components/redesign/Container";
import Layout from "../containers/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import { StandardText } from "../components/global/standardText";

export const query = graphql`
  {
    allSanityAboutPage {
      nodes {
        title
        _rawDescription(resolveReferences: { maxDepth: 10 })
      }
    }
  }
`;

const AboutPageRedesign = ({ data }) => {
  const content = data.allSanityAboutPage.nodes[0];
  useEffect(() => {
    if (typeof window !== undefined) {
      var _hsq = (window._hsq = window._hsq || []);
      _hsq.push(["setPath", "/about"]);
      // _hsq.push(["trackPageView"]);
    }
  }, []);

  return (
    <Layout showPopupNewsletter={true} rnd={false} homes>
      <SEO title={content?.title ?? "About"} />
      <Container>
        <div className="text-mobile-body md:text-desktop-body tracking-body md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu mb-10 md:mb-8">
          <div className="md:col-start-2 md:col-span-1">
            <StandardText data={content._rawDescription} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default AboutPageRedesign;
