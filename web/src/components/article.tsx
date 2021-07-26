import React, { useState, useEffect } from "react";
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
    if (typeof window && window.location.href.includes("?#") && scrolled) {
      setVisible(true);
      let mySlug = window.location.href.split("?#")[1];
      navigate("#" + mySlug);
      let el = document.getElementById(mySlug + "-h2");
      if (el) {
        el.click();
      }

      let y = window.scrollY - 50; //your current y position on the page
      window.scrollBy(0, y);

      setScrolled(false);
    }
  });
  return (
    <>
      {title && <div className="md:text-desktopCaption">{title}</div>}
      <Accordion allowMultiple={false} className=" w-full">
        {articleItems.length > 0 &&
          articleItems.map((item, index) => (
            <React.Fragment key={item._key}>
              <AccordionItem
                defaultIsOpen={
                  typeof window !== `undefined` && window.location.href.includes(item.customslug)
                    ? false
                    : false
                }
                className={`${index <= visible ? "block" : "hidden"} article-accordion`}
              >
                {({ isExpanded }) => (
                  <>
                    <AccordionHeader id={item._key}>
                      <div
                        className={`article-box flex items-start ${
                          item.pagebreak ? "article-pagebreak" : ""
                        }`}
                      >
                        <table className="w-full">
                          <tr className="flex flex-row -mb-1/4em">
                            <td className="md:w-5/10">
                              <div className="article-tag md:text-tagDt">{item.category}</div>
                              <div id={item.customslug}></div>
                            </td>
                            <td className="flex mr-5 md:ml-0 ml-10">
                              <div className="article-titlebox text-desktopLarge flex align-start tiny:w-372">
                                <div className="flex flex-col">
                                  <div className="m-0 relative normal-case -mt-1/4em md:text-lg flex flex-wrap">
                                    {item.title}
                                    <div className="flag-box w-0 md:w-20 items-start">
                                      {item.flag && item.flag.length > 0}
                                      {
                                        <div
                                          style={{
                                            background: item.flagcolor ? item.flagcolor : "none",
                                          }}
                                          className="flag-bg md:invisible"
                                        >
                                          <div className="flag md:text-flagDt md:h-0 md:w-0">
                                            {item.flag}
                                          </div>
                                        </div>
                                      }
                                    </div>
                                  </div>
                                  {isExpanded && (
                                    <div className="article-subtitle tracking-normal md:m-0 py-3">
                                      {item.subtitle}
                                    </div>
                                  )}
                                </div>
                                {/* {!isExpanded && (
                                  <div className="flag-box w-0 md:w-20 items-start">
                                    {item.flag && item.flag.length > 0}
                                    {
                                      <div
                                        style={{
                                          background: item.flagcolor ? item.flagcolor : "none",
                                        }}
                                        className="flag-bg ml-2 md:invisible"
                                      >
                                        <div className="flag md:text-flagDt md:h-0 md:w-0">
                                          {item.flag}
                                        </div>
                                      </div>
                                    }
                                  </div>
                                )} */}
                              </div>
                              <div className="flag-box w-0 md:w-20 flex -m-2 items-start">
                                {item.flag && item.flag.length > 0}
                                {
                                  <div
                                    style={{
                                      background: item.flagcolor ? item.flagcolor : "none",
                                    }}
                                    className="flag-bg ml-2 invisible md:visible"
                                  >
                                    <div className="flag md:text-flagDt">{item.flag}</div>
                                  </div>
                                }
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </AccordionHeader>

                    <AccordionPanel className="text-tagRnd pb-1em ml-auto mr-auto w-50% md:w-3/4 ">
                      {item.text && <PortableText blocks={item.text} />}
                      <Container>
                        <div>{RenderModules(item.articleModule)}</div>
                      </Container>
                    </AccordionPanel>
                    {isExpanded && (
                      <AccordionHeader className="text-right">
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

              {/*<div>{index < accordionItems.length - 1 && <GridRow></GridRow>}</div>*/}
            </React.Fragment>
          ))}
        {defaultNum && loadNum && visible < articleItems.length - 1 && (
          <div
            onClick={() => setVisible(loadNum + visible)}
            className="text-desktopCaption underline cursor-pointer"
          >
            MORE ↓
          </div>
        )}
      </Accordion>
    </>
  );
};
