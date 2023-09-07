import React, { useEffect } from "react";
import Container from "../components/redesign/Container";
import Layout from "../containers/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import HowItWorksComponent from "../components/redesign/HowItWorksComponent";
import { GeneralReservationForm } from "../components/redesign/HowItWorksReservationForm";

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
  useEffect(() => {
    if (window !== undefined && window._hsq !== undefined) {
      var _hsq = (window._hsq = window._hsq || []);
      _hsq.push(["setPath", "/how-it-works"]);
      _hsq.push(["trackPageView"]);
    }
  }, []);
  const pageTitle = data.sanityHowItWorksPage.title || "How it works";

  return (
    <Layout showPopupNewsletter={true} rnd={false} homes>
      <SEO title={pageTitle} />
      <Container>
        <HowItWorksComponent data={data} />
        <GeneralReservationForm data={data.site} />
        <div id="reserve-home-form" />
      </Container>
    </Layout>
  );
};

export default HowItWorksRedignPage;
