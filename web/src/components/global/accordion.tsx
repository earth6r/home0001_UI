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
  // console.log(data);
  return (
    <Accordion allowMultiple={false} width={"100%"}>
      {accordionItems.length > 0 &&
        accordionItems.map((item, index) => (
          <React.Fragment key={item._key}>
            <AccordionItem defaultIsOpen={false} className="box mb-1 rounded-lg" paddingLeft="0">
              {({ isExpanded }) => (
                <>
                  <AccordionHeader
                    paddingLeft="1em"
                    paddingTop=".75em"
                    paddingBottom=".65em"
                    position="relative"
                  >
                    <h2 className="m-0">{item.title}</h2>
                    <div className="right-0 absolute pr-1em">{isExpanded ? "–" : "+"}</div>
                  </AccordionHeader>
                  <AccordionPanel paddingLeft="1em" className="pb-1em">
                    <PortableText blocks={item.text} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <div>{index < accordionItems.length - 1 && <GridRow></GridRow>}</div>
          </React.Fragment>
        ))}
    </Accordion>
  );
};
