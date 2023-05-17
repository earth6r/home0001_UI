import React from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@chakra-ui/core";
import PortableText from "../portableText";

export interface AccordionModuleProps {
  data: {
    title: string;
    accordionItems: any[];
  };
}

export const AccordionModule = ({ data }: AccordionModuleProps) => {
  const { title, accordionItems } = data;
  return (
    <Accordion
      allowToggle
      className="w-full grid grid-cols-1 gap-4 md:gap-2 max-w-[19.375rem] md:max-w-[29.25rem]"
    >
      {accordionItems.length > 0 &&
        accordionItems.map(item => (
          <React.Fragment key={item._key}>
            <AccordionItem className="bg-white border border-[#000] px-3 py-[15px] md:py-[1.15rem] text-[14px] md:text-base">
              {/* @ts-ignore */}
              {({ isExpanded }) => (
                <>
                  <AccordionHeader className="relative flex justify-between hover:bg-white max-h-[1.15rem]">
                    <h2 className="m-0 uppercase  text-[14px] md:text-base">{item.title}</h2>
                    <div className="text-[20px] font-normal">{isExpanded ? "-" : "+"}</div>
                  </AccordionHeader>
                  <AccordionPanel className="px-3 py-4">
                    <PortableText blocks={item.text} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </React.Fragment>
        ))}
    </Accordion>
  );
};
