import React from "react";
import Container from "../../components/container";
import Layout from "../../containers/layout";
import SEO from "../../components/seo";
import { graphql } from "gatsby";
import { StandardText } from "../../components/global/standardText";

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

  return (
    <Layout showPopupNewsletter={true} rnd={false}>
      <SEO title={content.title} />
      <Container className="flex flex-col h-screen">
        <div className="text-[0.875rem] max-w-md mt-10 tracking-body">
          <StandardText data={content._rawDescription} />
        </div>
      </Container>
    </Layout>
  );
};

export default AboutPageRedesign;
