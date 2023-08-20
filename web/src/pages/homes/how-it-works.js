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
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      _rawWhatsIncluded(resolveReferences: { maxDepth: 10 })
      exchangeRateUSDBTC
      exchangeRateUSDETH
      reserveHomeForm {
        title
        _rawSubtitle(resolveReferences: { maxDepth: 10 })
        priceCaption
        _rawCheckboxText(resolveReferences: { maxDepth: 10 })
      }
    }
  }
`;
const HowItWorksRedignPage = ({ data }) => {
  const pageTitle = data.sanityHowItWorksPage.title || "How it works";

  return (
    <Layout showPopupNewsletter={true} rnd={false} homes>
      <SEO title={pageTitle} />
      <Container>
        <HowItWorksComponent data={data} />
        <ReserveHomeForm data={data.site} />
      </Container>
    </Layout>
  );
};

export default HowItWorksRedignPage;
