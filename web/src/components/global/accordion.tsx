import React from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@chakra-ui/core";
import PortableText from "../portableText";
import Minus from "../icon/minus";
import Plus from "../icon/plus";

export interface AccordionModuleProps {
  data: {
    title: string;
    accordionItems: any[];
  };
}

export const AccordionModule = ({ data }: AccordionModuleProps) => {
  const { title, accordionItems } = data;
  return (
    <Accordion allowToggle className="my-10 w-full max-w-[19.375rem] md:max-w-[29.25rem]">
      {accordionItems.length > 0 &&
        accordionItems.map(item => (
          <React.Fragment key={item._key}>
            <AccordionItem className="bg-white border border-[#000] px-3 py-[15px] md:py-[1.15rem] text-[0.875rem] md:text-base">
              {/* @ts-ignore */}
              {({ isExpanded }) => (
                <>
                  <AccordionHeader className="flex items-center justify-between hover:bg-white max-h-[1.15rem] p-0">
                    <h2 className="m-0 uppercase  text-[0.875rem] md:text-base">{item.title}</h2>
                    <div className="text-[20px] font-normal">
                      {isExpanded ? <Minus /> : <Plus />}
                    </div>
                  </AccordionHeader>
                  <AccordionPanel className="px-0 py-4 text-[0.875rem] md:text-base">
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
