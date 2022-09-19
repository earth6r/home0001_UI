import React from "react";
import ReactHtmlParser from "react-html-parser";
import CircleButton from "./circleButton";
import ObroundButton from "./obroundButton";
import PortableText from "../portableText";
import PdfReader from "./pdfReader";
import { PageLink } from "../link";
import Figure from "../Figure";
import { trimSlashes } from "../../lib/helpers";
import { css } from "@emotion/react";

const gridStyle = (rowNum, rowNumTablet, rowNumMobile) => {
  let rowStyle = 1 + "vw";
  for (var i = rowNum - 2; i >= 0; i--) {
    rowStyle = rowStyle + " " + 1 + "vw";
  }

  let rowStyleTablet = 1 + "vw";
  for (var i = (rowNumTablet ? rowNumTablet : rowNum) - 2; i >= 0; i--) {
    rowStyleTablet = rowStyleTablet + " " + 1 + "vw";
  }

  let rowStyleMobile = 1 + "vw";
  for (var i = (rowNumMobile ? rowNumMobile : rowNum) - 2; i >= 0; i--) {
    rowStyleMobile = rowStyleMobile + " " + 1 + "vw";
  }

  return css`
    grid-template-rows: ${rowStyle};

    @media (max-width: 1024px) {
      grid-template-rows: ${rowStyleTablet};
    }

    @media (max-width: 768px) {
      grid-template-rows: ${rowStyleMobile};
    }
  `;
};

const imageStyle = image => css`
  grid-column-start: ${image._type == "flexEdgetoEdge" ? 1 : image.startColumn};
  grid-column-end: ${image._type == "flexEdgetoEdge" ? 999 : image.endColumn};
  grid-row-start: ${image.startRow};
  grid-row-end: ${image.endRow};
  padding-top: ${image.paddingTop}vw;
  padding-bottom: ${image.paddingBottom}vw;
  padding-left: ${image.paddingLeft}vw;
  padding-right: ${image.paddingRight}vw;

  @media (max-width: 1024px) {
    grid-column-start: ${image.startColumnTablet || "unset"};
    grid-column-end: ${image.endColumnTablet || "unset"};
    grid-row-start: ${image.startRowTablet || "unset"};
    grid-row-end: ${image.endRowTablet || "unset"};
    padding-top: ${image.paddingTopTablet ? image.paddingTopTablet + "vw" : "unset"};
    padding-bottom: ${image.paddingBottomTablet ? image.paddingBottomTablet + "vw" : "unset"};
    padding-left: ${image.paddingLeftTablet ? image.paddingLeftTablet + "vw" : "unset"};
    padding-right: ${image.paddingRightTablet ? image.paddingRightTablet + "vw" : "unset"};
  }

  @media (max-width: 768px) {
    grid-column-start: ${image.startColumnMobile || "unset"};
    grid-column-end: ${image.endColumnMobile || "unset"};
    grid-row-start: ${image.startRowMobile || "unset"};
    grid-row-end: ${image.endRowMobile || "unset"};
    padding-top: ${image.paddingTopMobile ? image.paddingTopMobile + "vw" : "unset"};
    padding-bottom: ${image.paddingBottomMobile ? image.paddingBottomMobile + "vw" : "unset"};
    padding-left: ${image.paddingLeftMobile ? image.paddingLeftMobile + "vw" : "unset"};
    padding-right: ${image.paddingRightMobile ? image.paddingRightMobile + "vw" : "unset"};
  }
`;

const FlexGallery = props => {
  const {
    images,
    circleButtons,
    obroundButtons,
    embeds,
    squares,
    pdfs,
    rowNum,
    edges,
    rowNumMobile,
    rowNumTablet,
    texts,
    verticalTexts
  } = props;

  // Join all submodules into an array

  let subModules = [
    images,
    circleButtons,
    obroundButtons,
    embeds,
    squares,
    pdfs,
    edges,
    texts,
    verticalTexts
  ];

  subModules = Array.prototype.concat.apply([], subModules); //concat all submodules into a 1-dimensional array
  subModules = subModules.filter(e => e != null); //filter out anything that is undefined

  /* switch statement for handling submodule type */
  function handleSubModule(image) {
    if (image) {
      /* start of switch statement */
      switch (image._type) {
        /* FLEX IMAGE */
        case "flexImage":
          if (image.asset !== undefined) {
            /* if image is also a link */
            if (image.link) {
              let link = image.link.content.main.slug.current;
              let uri = "";

              switch (image.link._type) {
                case "home":
                  uri = "/homes/locations";
                  //   alert("set home");
                  break;
                case "checkout":
                  uri = "/homes/checkout";
                  break;
                default:
                  uri = "";
                  break;
              }

              return (
                <div
                  key={image._key}
                  className={`
                    ${image.hideDesktop ? "lg:hidden " : ""}
                    ${image.hideTablet ? "md:hidden lg:block " : ""}
                    ${image.hideMobile ? "hidden md:block " : ""}
                    flex-item overflow-hidden`}
                  css={imageStyle(image)}
                >
                  <PageLink className="internal-link z-40 block relative" to={uri + "/" + link}>
                    <div
                      className={`
                    ${image.dropShadow ? "drop-shadow" : ""}
                    ${image.border ? " border-img" : ""}
                    ${image.hoverImage ? "hover-hide" : ""}
                    z-40 relative inline-block w-full`}
                    >
                      <Figure node={image} />
                    </div>{" "}
                    {image.caption && (
                      <span className="mt-1 relative z-20 block text-sm">{image.caption}</span>
                    )}
                    {image.hoverImage && (
                      <div
                        className={`
                      ${image.dropShadow ? "drop-shadow" : ""}
                      ${image.border ? " border-img" : ""}
                      hover-image w-full inline-block`}
                      >
                        {" "}
                        <Figure node={image.hoverImage} />
                      </div>
                    )}
                  </PageLink>
                </div>
              );
            } else {
              /* if image is not a link */
              return (
                <div
                  key={image._key}
                  className={`
                    ${image.hideDesktop ? "lg:hidden " : ""}
                    ${image.hideTablet ? "md:hidden lg:block " : ""}
                    ${image.hideMobile ? "hidden md:block " : ""}
                    flex-item overflow-hidden`}
                  css={imageStyle(image)}
                >
                  <div
                    className={`
                  ${image.dropShadow ? "drop-shadow" : ""}
                  ${image.border ? " border-img" : ""}
                  z-40 relative`}
                  >
                    <Figure node={image} />
                  </div>{" "}
                  {image.caption && (
                    <span className="mt-1 block text-sm z-20 relative">{image.caption}</span>
                  )}
                </div>
              );
            }
          } else {
            return <></>;
          }
        /* END FLEX IMAGE */

        /* FLEX EDGE TO EDGE IMAGE */
        case "flexEdgetoEdge":
          return (
            <div
              key={image._key}
              className={`${image.upToNav ? "up-to-nav " : ""} flex-item edge-to-edge`}
              css={imageStyle(image)}
            >
              <Figure node={image} />
            </div>
          );
        /* END FLEX EDGE TO EDGE IMAGE */

        /* FLEX PDF */
        case "flexPdf":
          if (typeof window != `undefined`) {
            return (
              <div key={image._key} className="flex-item relative z-20" css={imageStyle(image)}>
                <PdfReader key={image._key} file={image.asset.url} />
              </div>
            );
          }
        /*END FLEX PDF*/

        /* FLEX TEXT */
        case "flexText":
          return (
            <div
              key={image._key}
              className={`${
                image.highZindex ? "high-z-index " : "z-20 "
              } flex-item flex-text relative`}
              css={imageStyle(image)}
            >
              <div style={{ color: `${image.color ? image.color : "inherit"}` }}>
                {" "}
                <PortableText blocks={image.text} />
              </div>
            </div>
          );
        /* END FLEX TEXT*/

        /* FLEX CIRCLE */
        case "flexCircle":
          return (
            <>
              {image !== undefined && image.title && (
                <div
                  key={image._key}
                  className="self-center mx-auto z-60 bottom-0 md:relative"
                  css={imageStyle(image)}
                >
                  <CircleButton
                    textColor={image.customCircleTextColor}
                    customColor={image.customCircleColor}
                    color={image.color}
                    title={image.title}
                    url={image.url}
                    checkoutModule={image.checkoutModule}
                    float={true}
                  />
                </div>
              )}
            </>
          );
        /* END FLEX CIRCLE */

        /* FLEX SQUARE */
        case "flexSquare":
          const title = image.title;
          const color = image.color;
          const link = image.link;

          let slug =
            link !== undefined
              ? link.content !== undefined
                ? link.content.main.slug.current
                : link.current
              : null;

          let uri = "";
          if (link !== undefined && title) {
            switch (link._type) {
              case "home":
                uri = "/homes/locations";
                break;
              case "checkout":
                uri = "/homes/checkout";
                break;
              default:
                uri = "/";
                break;
            }

            return (
              <span key={image._key} css={imageStyle(image)} className="flex-item block md:pl-1/10">
                <PageLink
                  className={`${
                    color === "black" ? "bg-black hover:bg-black text-white" : ""
                  } box rounded-md w-full block text-center leading-none h-2em  flex items-center justify-center text-mobileBody md:text-desktopBody z-20 relative uppercase`}
                  to={`${trimSlashes(uri)}/${slug}`}
                >
                  <span className="-mt-1/4em md:mt-0">{title}</span>
                </PageLink>
              </span>
            );
          } else {
            return <></>;
          }
        /*END FLEX SQUARE*/

        /* obroundButton */
        case "obroundButton":
          return (
            <>
              {image !== undefined && image.title && (
                <div key={image._key} className="z-20 bottom-0 md:relative" css={imageStyle(image)}>
                  <ObroundButton
                    textColor={image.customTextColor}
                    customColor={image.customColor}
                    title={image.title}
                    url={image.url}
                  />
                </div>
              )}
            </>
          );
        /* end obroundButton */

        /* VERTICAL CAPTIONS */
        case "flexVerticalText":
          return (
            <div
              className={`flex-item z-40 ${
                image.edgeBind ? "edgeBind--" + image.edgeBind + "-wrapper" : ""
              }`}
              css={imageStyle(image)}
            >
              <div
                key={image._key}
                className={`
                  ${image.edgeBind ? "edgeBind--" + image.edgeBind : ""}
                  flex-vertical-text text-mobileNav md:text-desktopNav
                `}
              >
                <div style={{ color: `${image.color ? image.color : "inherit"}` }}>
                  <PortableText className="m-0" blocks={image.text} />
                </div>
              </div>
            </div>
          );
        /* END VERTICAL CAPTIONS*/

        default:
          return (
            <div
              css={imageStyle(image)}
              key={image._key}
              className="flex-item html-text z-20 relative"
            >
              {ReactHtmlParser(image.embedCode)}
            </div>
          );
      }
      /* end of switch statement */
    }
  }

  return (
    <div
      key={2}
      css={gridStyle(rowNum, rowNumTablet, rowNumMobile)}
      className="w-full relative flexible-gallery"
    >
      {subModules &&
        subModules.map((image, index) => {
          return handleSubModule(image);
        })}
    </div>
  );
};

export default FlexGallery;
