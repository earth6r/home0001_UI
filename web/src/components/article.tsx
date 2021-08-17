import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
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
import { MdSouth } from "react-icons/md";
import PortableText from "./portableText";
import GridRow from "./grid/grid-row";
import { navigate } from "@reach/router";
import { RenderModules } from "../utils/renderModules";
import Container from "./container";

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
  useEffect(() => {
    
        if (typeof window && window.location.href.includes("?article=")) {
          let mySlug = window.location.href.split("?article=")[1].split("&")[0]; //remove url before and after 'article' parameter

          let el = document.getElementById(mySlug);

          

          if (el) {
            //open the article
            el.click();

            //define function to scroll to article
            function findAndScrollSlug(element) {
              let deltaY = element.getBoundingClientRect().top;
              window.scrollBy({top: deltaY, left: 0, behavior: "smooth" });
            }
            
            //run timeout of 0 to have click take effect, then scroll to article when page layout is finished
            setTimeout(function () {
              if(document.readyState === "complete") {
                setTimeout(function () {
                  findAndScrollSlug(el);
                }, 500);  
              }
              window.addEventListener("load", () => {
                setTimeout(function () {
                  findAndScrollSlug(el);
                }, 500);  
              });
            }, 0);      
          }
        }
        
      });
  return (
    <>
      {title && <div className="md:text-desktopCaption">{title}</div>}
      <Accordion allowMultiple={false} allowToggle className=" w-full">
        {articleItems.length > 0 &&
          articleItems.map((item, index) => (
            <React.Fragment key={item._key}>
              <AccordionItem
                defaultIsOpen={
                  typeof window !== `undefined` && window.location.href.includes(item.customslug)
                    ? false
                    : false
                }
                className={`${index <= visible ? "block" : "hidden"} article-accordion `}
              >
                {({ isExpanded }) => (
                  <>
                    <AccordionHeader id={item._key}>
                      <div
                        className={`article-box relative flex items-start ${
                          item.pagebreak ? "article-pagebreak" : ""
                        }`}
                      >
                        <table className="w-full mr-5">
                          <tbody>
                            {/* add -mb-1/4em in tr */}
                            <tr className="flex flex-row md:justify-between">
                              <td className="md:w-4/10">
                                <a id={item.customslug}>
                                <div className="article-tag md:text-tagDt">{item.category}</div>
                                </a>
                              </td>
                              <td className="md:w-10/20 flex flex-col items-start ml-10 md:ml-0">
                                <div className="article-titlebox flex flex-col md:flex-row items-start">
                                  {/* <div className="flex flex-col flex-wrap"> */}
                                  {/* add -mt-1/4em to div  */}
                                  <div className="m-0 article-title relative normal-case md:text-articleTitle">
                                    {ReactHtmlParser(item.title)}
                                  </div>
                                  {item.flag && (
                                    <div className="flag-box pl-0 md:pl-2">
                                      <div
                                        style={{
                                          background: item.flagcolor ? item.flagcolor : "none",
                                        }}
                                        className="flag-bg"
                                      >
                                        <div className="flag md:text-flagDt">{item.flag}</div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {isExpanded && (
                                  <div className="article-subtitle tracking-normal md:m-0 py-3">
                                    {item.subtitle}
                                  </div>
                                )}
                                {/* </div> */}
                                {/* {item.flag && (
                                  <div className="flag-box w-0 md:w-20 -m-2 items-start">
                                    <div
                                      style={{
                                        background: item.flagcolor ? item.flagcolor : "none",
                                      }}
                                      className="flag-bg ml-2 invisible md:visible"
                                    >
                                      <div className="flag md:text-flagDt">{item.flag}</div>
                                    </div>
                                  </div>
                                )} */}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* could become share butten*/}
                      {/* {isExpanded && (
                        <div
                          onClick={function () {
                            {
                              item._key;
                            }
                          }}
                          className="underline block w-full text-right md:text-desktopCaption"
                        >
                          SHARE
                        </div>
                      )} */}
                    </AccordionHeader>
                    <AccordionPanel className="text-tagRnd pb-1em ml-auto mr-auto article-container md:pl-0 md:pr-0">
                      <Container>
                        <div className="">{RenderModules(item.articleModule)}</div>
                      </Container>
                    </AccordionPanel>
                    {isExpanded && (
                      <AccordionHeader>
                        <div
                          onClick={function () {
                            {
                              item._key;
                            }
                          }}
                          className="underline block w-full text-right md:text-desktopCaption"
                        >
                          CLOSE
                        </div>
                      </AccordionHeader>
                    )}
                  </>
                )}
              </AccordionItem>
              {/* was this meant to add space between accordion items? */}
              {/* <div>{index < articleItems.length - 1 && <GridRow></GridRow>}</div> */}
            </React.Fragment>
          ))}
        {/* {defaultNum && loadNum && visible < articleItems.length - 1 && (
          <div
            onClick={() => setVisible(loadNum + visible)}
            className="text-desktopCaption underline cursor-pointer"
          >
            MORE ↓
          </div>
        )} */}
      </Accordion>
    </>
  );
};
