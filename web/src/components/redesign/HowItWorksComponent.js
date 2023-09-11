import React from "react";
import { AccordionModule } from "../../components/global/accordion";
import { StandardText } from "../../components/global/standardText";

const sectionTypeComponentMap = {
  accordion: AccordionModule,
  standardText: StandardText
};

const HowItWorksComponent = ({ data, hasPadding = false }) => {
  const pageTitle = data.sanityHowItWorksPage.title || "How It Works";
  const sections = data.sanityHowItWorksPage._rawSections;
  const text = data.sanityHowItWorksPage._rawText;

  const content = (sections || []).map(module => {
    const ComponentToRender = sectionTypeComponentMap[module._type];
    return ComponentToRender ? (
      <ComponentToRender key={module._key} type={module._type} data={module} />
    ) : null;
  });

  return (
    <div
      className={`md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu ${
        hasPadding ? "pt-6 md:pt-10" : ""
      }`}
    >
      <div className="md:col-start-2 md:col-span-1">
        <h2 className="uppercase tracking-caps leading-none mb-10 font-normal text-mobile-body md:text-desktop-body">
          {pageTitle}
        </h2>
        <div>{content}</div>
        <div className="mb-10 md:mb-20 standard-text">
          <StandardText data={text} />
        </div>
      </div>
    </div>
  );
};

export default HowItWorksComponent;
