import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import { Serializer } from "./../utils/serializer";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/core";
import { MdSouth } from 'react-icons/md'
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
              className="article-accordion"
            >
              {({ isExpanded }) => (
                <>
                  <AccordionHeader id={item._key}>
                    <h2 className="m-0 underline -mt-1/4em md:mt-0">{item.title}{item.flag && item.flag.length > 0}{
                      <>
                      <div style={{background: item.flagcolor ? item.flagcolor : "none"}} className="flag inline-block align-top">{item.flag}</div>

                      <div
                      style={{ marginTop: "-.15em" }}
                      className="accordion-icon mt-3 underline block relative text-left md:text-desktopCaption pr-1em"
                    >
                      {isExpanded ? "" : "More ↓"}
                    </div>
                    </>
                    }</h2>
                  </AccordionHeader>
                  
                  <AccordionPanel className="pb-1em pl-20">
                    <PortableText blocks={item.text} />
                    
                  </AccordionPanel>
                  {isExpanded && 
                  <AccordionHeader className="text-right"><div onClick={function(){
                      {item._key}
                    }} className="underline block w-full text-right md:text-desktopCaption">CLOSE</div></AccordionHeader>}
                </>
              )}
            </AccordionItem>
            {/*<div>{index < accordionItems.length - 1 && <GridRow></GridRow>}</div>*/}
          </React.Fragment>
        ))}
    </Accordion>
  );
};
