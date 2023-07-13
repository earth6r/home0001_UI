import React from "react";
import Container from "../../components/redesign/Container";
import Layout from "../../containers/layout";
import SEO from "../../components/seo";
import { RenderModules } from "../../utils/renderModules";
import dummyData from "../../../../dummyData.json";
import DepositBlock from "../../components/DepositBlock";
import { AccordionModule } from "../../components/global/accordion";
import { StandardText } from "../../components/global/standardText";
import { useForm } from "react-hook-form";
import { ReserveHomeForm } from "../../components/redesign/ReserveHomeForm";
import { graphql } from "gatsby";

const sectionTypeComponentMap = {
  accordion: AccordionModule,
  standardText: StandardText
};

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
  const sections = data.sanityHowItWorksPage._rawSections;
  const text = data.sanityHowItWorksPage._rawText;

  console.log(text);
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
        <div className="md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu">
          <div className="md:col-start-2 md:col-span-1">
            <h2 className="uppercase tracking-caps mb-10 md:mb-20 font-normal text-mobile-body md:text-desktop-body">
              {pageTitle}
            </h2>
            <div>{content}</div>
            <div className="mb-10 md:mb-20">
              <StandardText data={text} />
            </div>
          </div>
        </div>
        <ReserveHomeForm />
      </Container>
    </Layout>
  );
};

export default HowItWorksRedignPage;
