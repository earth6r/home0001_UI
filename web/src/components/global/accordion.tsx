import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import { Serializer } from "../../utils/serializer";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/core";
import PortableText from "../portableText";
import GridRow from "../grid/grid-row";

export interface AccordionModuleProps {
  data: {
    accordionItems: any[];
  };
}

export const AccordionModule = ({ data }: AccordionModuleProps) => {
  const { accordionItems } = data;

  return (
    <Accordion allowMultiple={false} className=" w-full">
      {accordionItems.length > 0 &&
        accordionItems.map((item, index) => (
          <React.Fragment key={item._key}>
            <AccordionItem
              defaultIsOpen={false}
              className="border-none relative block accordion box max-w-4xl lg:ml-1/10 mb-1em rounded-lg"
            >
              {({ isExpanded }) => (
                <>
                  <AccordionHeader className="accordion relative  h-2em p-0 pt-4.5 md:pt-1/2em pl-1/2em border-none">
                    <h2 className="-mt-1/4em md:mt-3 title">{item.title}</h2>
                    <div
                      
                      className="accordion-icon md:mt-0 right-0 absolute pr-1em"
                    >
                      {isExpanded ? "–" : "+"}
                    </div>
                  </AccordionHeader>
                  <AccordionPanel className="pb-1em">
                    <PortableText blocks={item.text} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            {/*<div>{index < accordionItems.length - 1 && <GridRow></GridRow>}</div>*/}
          </React.Fragment>
        ))}
    </Accordion>
  );
};
