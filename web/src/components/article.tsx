import React, { useState, useEffect }  from "react";
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
import { navigate } from '@reach/router';

export interface ArticleModuleProps {
  data: {
    title: any;
    articleItems: any[];
  };
}

export const ArticleModule = ({ data }: AccordionModuleProps) => {
  const { articleItems, title, defaultNum, loadNum } = data;
  const [scrolled, setScrolled] = useState(true);
  const mew = defaultNum ? defaultNum : articleItems.length;
  const [visible, setVisible] = useState(mew);

  useEffect(() =>{
      if(typeof window && window.location.href.includes("?#") && scrolled){
        let mySlug = window.location.href.split("?#")[1];
        navigate("#"+mySlug)
        let y = window.scrollY + 100;  //your current y position on the page
        window.scrollBy(0,y)

        setScrolled(false)
      }

  })
  return (
    <>
    {title &&
      <div className="md:text-desktopCaption">{title}</div>
    }
    <Accordion allowMultiple={false} className=" w-full">

      {articleItems.length > 0 &&
        articleItems.map((item, index) => (
          <React.Fragment key={item._key}>
            <AccordionItem
              defaultIsOpen={typeof window !== `undefined` && window.location.href.includes(item.customslug) ? true : false}
              className={`${index <= visible ? "block" : "hidden"} article-accordion`}
            >
              {({ isExpanded }) => (
                <>

                  <AccordionHeader id={item._key}>
                    <h2 className="m-0 underline text-left normal-case -mt-1/4em md:mt-0">{item.title}{item.flag && item.flag.length > 0}{
                      <>
                      <div style={{background: item.flagcolor ? item.flagcolor : "none"}} className="flag inline-block align-top">{item.flag}</div>

                      <div
                      style={{ marginTop: "-.15em" }}
                      className="accordion-icon mt-3 underline block relative text-left md:text-desktopCaption pr-1em"
                    >
               
                    </div>
                    </>
                    }</h2>
                    <div id={item.customslug}></div>
                  </AccordionHeader>
                  
                  <AccordionPanel className="pb-1em md:pl-16 md:pr-40 md:w-3/4 ">
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
        { (defaultNum && loadNum && (visible < articleItems.length - 1)) &&
          <div onClick={()=> setVisible(loadNum+visible)} className="text-desktopCaption underline cursor-pointer">MORE ↓</div>
        }
       
        
    </Accordion>
    </>
  );
};
