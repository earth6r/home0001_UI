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
  const [openArticle, setOpenArticle] = useState(false);
  const mew = defaultNum ? defaultNum : articleItems.length;
  const [visible, setVisible] = useState(mew);

  useEffect(() =>{
      if(typeof window && window.location.href.includes("?#") && scrolled){
        setVisible(true)
        let mySlug = window.location.href.split("?#")[1];
        navigate("#"+mySlug)
        let el = document.getElementById(mySlug + "-h2");
        if(el){
          el.click()
        }
        
        let y = window.scrollY - 50;  //your current y position on the page
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
              defaultIsOpen={typeof window !== `undefined` && window.location.href.includes(item.customslug) ? false : false}
              className={`${index <= visible ? "block" : "hidden"} article-accordion`}
            >
              {({ isExpanded }) => (
                <>

                  <AccordionHeader id={item._key}>
                    <div className={`article-box flex items-start pb-8 md:pb-0 ${item.pagebreak ? "article-pagebreak" : ""}`}>
                      <div id={item.customslug}></div>
                      <div className="article-tag relative md:text-tagDt">{item.category}</div>
                      <div className="article-titlebox grid-cols-1">
                        <div className="article-title m-0 relative text-left normal-case -mt-1/4em mt-0 md:text-lg">{item.title}</div>
                        {item.flag && item.flag.length > 0}{
                          <div  style={{background: item.flagcolor ? item.flagcolor : "none"}} className="flag-bg ml-2 md:invisible">
                            <div className="flag">{item.flag}</div>
                          </div>
                        }
                      </div>
                      <div className="flag-box w-0 md:w-20">
                        {item.flag && item.flag.length > 0}{
                          <div  style={{background: item.flagcolor ? item.flagcolor : "none"}} className="flag-bg ml-2 invisible md:visible">
                            <div className="flag md:text-flagDt">{item.flag}</div>
                          </div>
                        }
                      </div>
                    </div>
                  </AccordionHeader>
                  <AccordionPanel className="text-tagRnd pb-1em ml-auto mr-auto w-50% md:w-3/4 ">
                    <PortableText blocks={item.text} />
                  </AccordionPanel>
                  {isExpanded && 
                  <AccordionHeader className="text-right">
                    <div onClick={function(){
                        {item._key}
                      }} 
                      className="underline block w-full text-right md:text-desktopCaption">
                      CLOSE
                    </div>
                  </AccordionHeader>}
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
