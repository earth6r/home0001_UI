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
  console.log(data);
  return (
    <Accordion allowMultiple={false}>
      {accordionItems.length > 0 &&
        accordionItems.map((item, index) => (
          <>
            <AccordionItem
              defaultIsOpen={false}
              className="box my-3"
              paddingLeft="0"
              key={item._key}
            >
              {({ isExpanded }) => (
                <>
                  <AccordionHeader paddingTop=".5em" paddingBottom=".375em" position="relative">
                    <h2 className="m-0">{item.title}</h2>
                    <div className="right-0 absolute pr-1/2em">{isExpanded ? "-" : "+"}</div>
                  </AccordionHeader>
                  <AccordionPanel paddingLeft=".5em" pb={4}>
                    <PortableText blocks={item.text} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <div>{index < accordionItems.length - 1 && <GridRow></GridRow>}</div>
          </>
        ))}
    </Accordion>
  );
};
