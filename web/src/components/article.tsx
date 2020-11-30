import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import { Serializer } from "./../utils/serializer";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/core";
import PortableText from "./portableText";
import GridRow from "./grid/grid-row";

export interface ArticleModuleProps {
  data: {
    articleItems: any[];
  };
}

export const ArticleModule = ({ data }: AccordionModuleProps) => {
  const { articleItems } = data;
  // console.log(data);
  return (
    <Accordion allowMultiple={false} className=" w-full">
      {articleItems.length > 0 &&
        articleItems.map((item, index) => (
          <React.Fragment key={item._key}>
            <AccordionItem
              defaultIsOpen={false}
              className=""
            >
              {({ isExpanded }) => (
                <>
                  <AccordionHeader className="">
                    <h2 className="m-0  -mt-1/4em md:mt-0">{item.title}</h2>
                    <div
                      style={{ marginTop: "-.15em" }}
                      className="accordion-icon right-0 absolute pr-1em"
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
