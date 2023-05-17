import React from "react";
import Container from "../../components/container";
import Layout from "../../containers/layout";
import SEO from "../../components/seo";
import { RenderModules } from "../../utils/renderModules";
import dummyData from "../../../../dummyData.json";
import DepositBlock from "../../components/DepositBlock";
import { AccordionModule } from "../../components/global/accordion";
import { StandardText } from "../../components/global/standardText";
import { useForm } from "react-hook-form";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@chakra-ui/core";
import { ReserveHomeForm } from "../../components/redesign/ReserveHomeForm";

const sectionTypeComponentMap = {
  accordion: AccordionModule,
  standardText: StandardText
};

const HowItWorksRedignPage = () => {
  const sections = dummyData;
  console.log(sections, "se");
  const content = (sections || []).map(module => {
    const ComponentToRender = sectionTypeComponentMap[module._type];
    return ComponentToRender ? (
      <ComponentToRender key={module._key} type={module._type} data={module} />
    ) : null;
  });
  return (
    <Layout showPopupNewsletter={true} rnd={false}>
      <SEO title="How It works" />
      {/* 
      {page._rawContent.main.title == "Contact" && !isrnd ? (
        <Container>
          <div className="flex flex-wrap w-full">
            {RenderModules([modules[0], modules[1]])}
            <CalendlyContact />
            {RenderModules(modules.slice(2, modules.length))}
          </div>
        </Container>
      ) : (
        <>
          <Container>
            <div className="flex flex-wrap w-full">{RenderModules(modules)}</div>
          </Container>
          {slug?.current === "homes/how-it-works" && <DepositBlock />}
        </>
      )} */}
      <Container>
        <h2 className=" uppercase mt-5 mb-20 font-normal">How it works</h2>
        <div>{content}</div>
        <ReserveHomeForm />
      </Container>
      {/* {slug?.current === "homes/how-it-works" && <DepositBlock />} */}
    </Layout>
  );
};

export default HowItWorksRedignPage;
