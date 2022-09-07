// @ts-nocheck
import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@chakra-ui/core";
import { RenderModules } from "../utils/renderModules";
import Container from "./container";
import Figure from "./Figure";

export interface ArticleModuleProps {
  data: {
    title: any;
    articleItems: any[];
    defaultNum: any;
  };
}

export const ArticleModule = ({ data }: ArticleModuleProps) => {
  const { articleItems, title, defaultNum } = data;
  const mew = defaultNum ? defaultNum : articleItems.length;
  const [articlesImages, setArticlesImages] = useState(undefined);
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());

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
          window.scrollBy({ top: deltaY, left: 0, behavior: "smooth" });
        }

        //run timeout of 0 to have click take effect, then scroll to article when page layout is finished
        setTimeout(function() {
          if (document.readyState === "complete") {
            setTimeout(function() {
              findAndScrollSlug(el);
            }, 500);
          }
          window.addEventListener("load", () => {
            setTimeout(function() {
              findAndScrollSlug(el);
            }, 500);
          });
        }, 0);
      }
    }

    const images = [];
    articleItems.forEach(articleItem => {
      if (articleItem.mainImage) {
        images.push({
          articleId: articleItem._key,
          image: articleItem.mainImage,
          justify: Math.floor(Math.random() * 3)
        });
      }
      articleItem.articleModule.forEach(module => {
        if (module._type === "articleSection") {
          if (module.mainImage) {
            images.push({
              articleId: articleItem._key,
              image: module.mainImage,
              justify: Math.floor(Math.random() * 3)
            });
          }

          module.content.forEach(block => {
            if (block._type === "articleImage") {
              images.push({
                articleId: articleItem._key,
                image: block,
                justify: Math.floor(Math.random() * 3)
              });
            }
          });
        }
      });
    });

    setArticlesImages(images);
  }, []);

  const onClickArticleImage = articleId => {
    const article = document.getElementById(articleId);

    if (article) {
      article.click();
    }
  };

  const onExpandItem = (articleId: string, isExpanded: boolean) => {
    const newExpandedArticles = new Set(expandedArticles);
    if (isExpanded) {
      newExpandedArticles.add(articleId);

      const article = document.getElementById(articleId);

      if (article) {
        article.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      newExpandedArticles.delete(articleId);
    }

    setExpandedArticles(newExpandedArticles);
  };

  return (
    <>
      {title && <div className="md:text-desktopCaption">{title}</div>}
      <Accordion allowMultiple className="w-full flex flex-col gap-5">
        {articleItems.length > 0 &&
          articleItems.map((item, index) => (
            <React.Fragment key={item._key}>
              <AccordionItem
                defaultIsOpen={
                  typeof window !== `undefined` && window.location.href.includes(item.customslug)
                    ? true
                    : false
                }
                id={item._key}
                onChange={(isExpanded: boolean) => onExpandItem(item._key, isExpanded)}
                className={`${index <= mew ? "block" : "hidden"} article-accordion`}
              >
                {({ isExpanded }) => (
                  <>
                    <AccordionHeader id={item._key}>
                      <div className={`article-box relative flex items-start`}>
                        <table className="w-full">
                          <tbody>
                            <tr className="flex flex-col md:flex-row md:justify-between gap-5 md:gap-0">
                              <td className="md:w-1/5">
                                <a id={item.customslug}>
                                  <div className="article-tag">{item.category}</div>
                                </a>
                              </td>
                              <td className="md:w-4/5 flex flex-col items-start">
                                <div className="article-titlebox flex flex-col md:flex-row items-start">
                                  <div
                                    className={`article-title relative normal-case ${
                                      isExpanded ? "no-underline" : ""
                                    }`}
                                  >
                                    {ReactHtmlParser(item.title)}
                                  </div>
                                  {item.flag && (
                                    <div className="flag-box pl-0 md:pl-2">
                                      <div
                                        style={{
                                          background: item.flagcolor ? item.flagcolor : "none"
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
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionHeader>
                    <AccordionPanel className="text-tagRnd pb-1em ml-auto mr-auto article-container md:pl-0 md:pr-0">
                      <Container>
                        {item.mainImage ? (
                          <>
                            <div className="article-main-image">
                              {item.mainImage.caption ? (
                                <span className="article-image-caption">
                                  {item.mainImage.caption}
                                </span>
                              ) : null}
                              <Figure node={item.mainImage} />
                            </div>
                          </>
                        ) : null}
                        <div className="mt-6">{RenderModules(item.articleModule)}</div>
                      </Container>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </React.Fragment>
          ))}
      </Accordion>
      <div className="flex flex-col gap-20 article-image-stream">
        {articlesImages
          ? articlesImages.map(({ articleId, image, justify }, index) => {
              if (expandedArticles.has(articleId)) {
                return null;
              }

              return (
                <div
                  className={`w-full flex ${
                    justify === 0
                      ? "justify-start"
                      : justify === 1
                      ? "justify-center"
                      : "justify-end"
                  }`}
                  key={index}
                >
                  <div
                    className="cursor-pointer md:w-1/2"
                    onClick={() => onClickArticleImage(articleId)}
                  >
                    <Figure node={image} />
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};
