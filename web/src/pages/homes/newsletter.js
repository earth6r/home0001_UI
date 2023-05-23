import React from "react";
import { graphql } from "gatsby";

import SEO from "../../components/seo";
import Layout from "../../containers/layout";
import Container from "../../components/container";

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
    <Layout showPopupNewsletter={true} rnd={false}>
      <SEO title={pageTitle} />
      <Container>
        <div className="mb-10 md:mb-8 ma">{content}</div>
      </Container>
    </Layout>
  );
};

export default NewsLetterPageRedesign;
