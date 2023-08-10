import React from "react";
import { graphql } from "gatsby";

import SEO from "../../components/seo";
import Layout from "../../containers/layout";
import Container from "../../components/redesign/Container";

import { StandardText } from "../../components/global/standardText";
import { NewsLetterForm } from "../../components/redesign/NewsLetterForm";

const sectionTypeComponentMap = {
  newsletterForm: NewsLetterForm,
  standardText: StandardText
};

export const query = graphql`
  {
    sanityNewsLetter {
      title
      _rawSections
    }
  }
`;

const NewsLetterPageRedesign = ({ data }) => {
  const pageTitle = data.sanityNewsLetter.title || "How It Works";
  const sections = data.sanityNewsLetter._rawSections;
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
        <div className="md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu mb-10 md:mb-8">
          <div className="md:col-start-2 md:col-span-1">{content}</div>
        </div>
      </Container>
    </Layout>
  );
};

export default NewsLetterPageRedesign;
