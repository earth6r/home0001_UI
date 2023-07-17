import React from "react";
import Container from "../../components/redesign/Container";
import Layout from "../../containers/layout";
import SEO from "../../components/seo";
import { graphql } from "gatsby";
import HowItWorksComponent from "../../components/redesign/HowItWorksComponent";
import { ReserveHomeForm } from "../../components/redesign/ReserveHomeForm";

export const query = graphql`
  {
    sanityHowItWorksPage {
      title
      _rawSections
      _rawText(resolveReferences: { maxDepth: 10 })
    }
  }
`;
const HowItWorksRedignPage = ({ data }) => {
  const pageTitle = data.sanityHowItWorksPage.title || "How It Works";

  return (
    <Layout showPopupNewsletter={true} rnd={false}>
      <SEO title={pageTitle} />
      <Container>
        <HowItWorksComponent data={data} />
        <ReserveHomeForm />
      </Container>
    </Layout>
  );
};

export default HowItWorksRedignPage;
