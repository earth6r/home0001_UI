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
    <Accordion allowMultiple={false} className="max-w-4xl w-full">
      {accordionItems.length > 0 &&
        accordionItems.map((item, index) => (
          <React.Fragment key={item._key}>
            <AccordionItem
              defaultIsOpen={false}
              className="border-none relative block box  rounded-lg"
            >
              {({ isExpanded }) => (
                <>
                  <AccordionHeader className="relative h-2em p-0 pt-1/4em pl-1/2em border-none">
                    <h2 className="m-0">{item.title}</h2>
                    <div style={{ marginTop: "-.075em" }} className="right-0 absolute pr-1em">
                      {isExpanded ? "–" : "+"}
                    </div>
                  </AccordionHeader>
                  <AccordionPanel className="pb-1em">
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
