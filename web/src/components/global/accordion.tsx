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
    <Accordion allowToggle className="my-10 w-full">
      {accordionItems.length > 0 &&
        accordionItems.map(item => (
          <React.Fragment key={item._key}>
            <AccordionItem className="bg-white border border-[#000] flex flex-col justify-center text-mobile-body md:text-desktop-body mt-2 first:mt-0">
              {/* @ts-ignore */}
              {({ isExpanded }) => (
                <>
                  <AccordionHeader className="flex items-center justify-between hover:bg-white px-3 py-4 h-full">
                    <h2 className="text-left m-0 uppercase text-mobile-body md:text-desktop-body">
                      {item.title}
                    </h2>
                    <div className="text-[20px] font-normal">
                      {isExpanded ? <Minus /> : <Plus />}
                    </div>
                  </AccordionHeader>
                  <AccordionPanel className="px-3 text-mobile-body md:text-desktop-body">
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
