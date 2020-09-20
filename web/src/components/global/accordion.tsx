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
        accordionItems.map((item) => (
          <AccordionItem
            defaultIsOpen={false}
            className="box mb-10"
            paddingLeft="0"
            key={item._key}
          >
            {({ isExpanded }) => (
              <>
                <AccordionHeader paddingLeft="1em" position="relative">
                  <div>{item.title}</div>
                  <div className="right-0 absolute">{isExpanded ? "+" : "-"}</div>
                </AccordionHeader>
                <AccordionPanel paddingLeft="1em" pb={4}>
                  <PortableText blocks={item.text} />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
    </Accordion>
  );
};
