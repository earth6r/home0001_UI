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
    }
  }
`;
const HowItWorksRedignPage = ({ data }) => {
  const pageTitle = data.sanityHowItWorksPage.title || "How It Works";
  const sections = data.sanityHowItWorksPage._rawSections;
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
        <h2 className=" uppercase mb-10 font-normal text-[0.875rem] md:text-base mt-4 md:mt-0 leading-[120%]">
          {pageTitle}
        </h2>
        <div className="mb-10 md:mb-8">{content}</div>
        <ReserveHomeForm />
      </Container>
      {/* {slug?.current === "homes/how-it-works" && <DepositBlock />} */}
    </Layout>
  );
};

export default HowItWorksRedignPage;
