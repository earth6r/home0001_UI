import React, { useEffect } from "react";
import Container from "../components/redesign/Container";
import Layout from "../containers/layout";
import SEO from "../components/seo";
import { AccordionModule } from "../components/global/accordion";
import { StandardText } from "../components/global/standardText";
import { graphql } from "gatsby";

const sectionTypeComponentMap = {
  accordion: AccordionModule,
  standardText: StandardText
};

export const query = graphql`
  {
    sanityFaqPage {
      title
      _rawSections
    }
  }
`;
const FaqRedesignPage = ({ data }) => {
  useEffect(() => {
    if (window !== undefined && window._hsq !== undefined) {
      var _hsq = (window._hsq = window._hsq || []);
      _hsq.push(["setPath", "/faq"]);
      _hsq.push(["trackPageView"]);
    }
  }, []);
  const pageTitle = data.sanityFaqPage.title || "FAQ";
  const sections = data.sanityFaqPage._rawSections;
  const content = (sections || []).map(module => {
    const ComponentToRender = sectionTypeComponentMap[module._type];
    return ComponentToRender ? (
      <ComponentToRender key={module._key} type={module._type} data={module} />
    ) : null;
  });
  return (
    <Layout showPopupNewsletter={true} rnd={false} homes>
      <SEO title={pageTitle} />
      <Container>
        <div className="md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu">
          <div className="md:col-start-2 md:col-span-1">
            <h2 className="uppercase tracking-caps leading-none mb-10 md:mb-20 font-normal text-mobile-body md:text-desktop-body">
              {pageTitle}
            </h2>
            <div className="mb-10 md:mb-20 standard-text">{content}</div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default FaqRedesignPage;
