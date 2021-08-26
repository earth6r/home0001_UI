import React, { useState, useEffect, useRef } from "react";
import { GalleryImage } from "../gallery-image";
import GridRow from "../grid/grid-row";
import ReactHtmlParser from "react-html-parser";
import CircleButton from "./circleButton";
import ObroundButton from "./obroundButton";
import PortableText from "../portableText";
import PdfReader from "./pdfReader";
import clientConfig from "../../../client-config";
import imageUrlBuilder from "@sanity/image-url";
import { PageLink } from "../link";
import Img from "gatsby-image";
import Figure from "../Figure";
import { trimSlashes } from "../../lib/helpers";
// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(clientConfig.sanity);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source);
}
var shuffle = require("shuffle-array");

const FlexGallery = (props) => {
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
    verticalTexts,
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

  
  const justify = ["justify-start", "justify-center", "justify-between", "justify-end"];
  const [direction, setDirection] = useState();
  const [mobile, setMobile] = useState(false);
  const [tablet, setTablet] = useState(false);
  const myRowNum =
    mobile && rowNumMobile ? rowNumMobile : tablet && rowNumTablet ? rowNumTablet : rowNum;
  const [isClient, setClient] = useState(false);
  function showPdf(key) {
    let mykey = document.getElementById(key);
    mykey.style.display = "block";
  }

  let numbOfRows = 100 / myRowNum;
  let rowStyle = 1 + "vw";
  for (var i = myRowNum - 2; i >= 0; i--) {
    rowStyle = rowStyle + " " + 1 + "vw";
  }

  let gridStyle = {
    gridTemplateRows: rowStyle,
  };
  let handleWindowResize = function (event) {
    if (window.innerWidth <= 767) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    if (window.innerWidth > 767 && window.innerWidth <= 1024) {
      setTablet(true);
    } else {
      setTablet(false);
    }
  };
  useEffect(() => {
    setClient(true);
    if (typeof window != `undefined`) {
      if (window.innerWidth <= 767) {
        setMobile(true);
      } else {
        setMobile(false);
      }
      if (window.innerWidth > 767 && window.innerWidth <= 1024) {
        setTablet(true);
      } else {
        setTablet(false);
      }
      window.addEventListener("resize", handleWindowResize);
    }
  });
  if (!isClient) return null;
 
  /* switch statement for handling submodule type */

  function handleSubModule (image){

    if(image){
      /* css grid info */
      let styleObj = {
        gridColumnStart: image._type == "flexEdgetoEdge" ? 1 : image.startColumn,
        gridColumnEnd: image._type == "flexEdgetoEdge" ? 999 : image.endColumn,
        gridRowStart: image.startRow,
        gridRowEnd: image.endRow,
        paddingTop: image.paddingTop + "vw",
        paddingBottom: image.paddingBottom + "vw",
        paddingLeft: image.paddingLeft + "vw",
        paddingRight: image.paddingRight + "vw",
      };
      let styleObjMobile = {
        gridColumnStart: image.startColumnMobile,
        gridColumnEnd: image.endColumnMobile,
        gridRowStart: image.startRowMobile,
        gridRowEnd: image.endRowMobile,
        paddingTop: image.paddingTopMobileMobile + "vw",
        paddingBottom: image.paddingBottomMobile + "vw",
        paddingLeft: image.paddingLeftMobile + "vw",
        paddingRight: image.paddingRightMobile + "vw",
      };
      let styleObjTablet = {
        gridColumnStart: image.startColumnTablet,
        gridColumnEnd: image.endColumnTablet,
        gridRowStart: image.startRowTablet,
        gridRowEnd: image.endRowTablet,
        paddingTop: image.paddingTopTablet + "vw",
        paddingBottom: image.paddingBottomTablet + "vw",
        paddingLeft: image.paddingLeftTablet + "vw",
        paddingRight: image.paddingRightTablet + "vw",
      };
      /* end css grid info */

      /* start of switch statement */
      switch(image._type) {
        /* FLEX IMAGE */
        case "flexImage":
          if (image.asset !== undefined) {
            /* if image is also a link */
            if (image.link) {
              let link = image.link.content.main.slug.current;
              let uri = "";

              switch (image.link._type) {
                case "home":
                  uri = "/home";
                  //   alert("set home");
                  break;
                case "checkout":
                  uri = "/checkout";
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
                flex-item`}
                style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}>
                  <PageLink className="internal-link z-40 block relative" to={uri + "/" + link}>
                    <div
                    className={`
                    ${image.dropShadow ? "drop-shadow" : ""} 
                    ${image.border ? " border-img" : ""} 
                    ${image.hoverImage ? "hover-hide" : ""} 
                    z-40 relative inline-block w-full`}>
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
                      hover-image w-full inline-block`}>
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
                flex-item`}
                style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}>
                  <div
                  className={`
                  ${image.dropShadow ? "drop-shadow" : ""} 
                  ${image.border ? " border-img" : ""} 
                  z-40 relative`}>
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
              style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
            >
              <Figure node={image} />
            </div>
          );
        /* END FLEX EDGE TO EDGE IMAGE */

        /* FLEX PDF */
        case "flexPdf":
          if(typeof window != `undefined`){
            return (
              <div
                key={image._key}
                className="flex-item relative z-20"
                style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
              >
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
              style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
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
                  className="self-center mx-auto z-20 bottom-0 md:relative"
                  style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
                >
                  <CircleButton
                    textColor={image.customCircleTextColor}
                    customColor={image.customCircleColor}
                    color={image.color}
                    title={image.title}
                    url={image.url}
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
                  uri = "/home";
                  break;
                case "checkout":
                  uri = "/checkout";
                  break;
                default:
                  uri = "/";
                  break;
              }

              return (
                <span
                  key={image._key}
                  style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
                  className="flex-item block md:pl-1/10"
                >
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
                <div
                  key={image._key}
                  className="z-20 bottom-0 md:relative"
                  style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
                >
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
        /* END OBROUND BUTTON */

        /* VERTICAL CAPTIONS */
        case "flexVerticalText":
          return (
            <div className={`flex-item z-40 ${image.edgeBind ? "edgeBind--" + image.edgeBind + "-wrapper" : "" }`} 
            style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
            >
              <div
                key={image._key}
                className={`
                  ${image.edgeBind ? "edgeBind--" + image.edgeBind : "" }
                  flex-vertical-text
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
              style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
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
    <div key={2} style={gridStyle} className="w-full relative flexible-gallery mb-4">
      {subModules &&
        subModules.map((image, index) => {
            return(handleSubModule(image))

        })}
    </div>
  );
};

export default FlexGallery;
