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
    callibrationMarks,
    rowNumMobile,
    rowNumTablet,
    texts,
    verticalTexts,
  } = props;
  const myImages = images ? shuffle(images).filter(Boolean) : [];
  const myrandImages = embeds ? shuffle(myImages.concat(embeds)) : myImages;
  const randImages2 = pdfs ? shuffle(myrandImages.concat(pdfs)) : myrandImages;
  const randImages3 = texts ? shuffle(randImages2.concat(texts)) : randImages2;
  const randImages4 = squares ? shuffle(randImages3.concat(squares)) : randImages3;
  const randImages5 = callibrationMarks
    ? shuffle(randImages4.concat(callibrationMarks))
    : randImages4;
  const randImages6 = circleButtons ? shuffle(randImages5.concat(circleButtons)) : randImages5;
  const randImages7 = obroundButtons ? shuffle(randImages6.concat(obroundButtons)) : randImages6;
  const randImages8 = verticalTexts ? shuffle(randImages7.concat(verticalTexts)) : randImages7;
  const randImages = edges ? shuffle(randImages8.concat(edges)) : randImages8;
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

  return (
    <div key={2} style={gridStyle} className="w-full relative flexible-gallery mb-4">
      {randImages &&
        randImages.map((image, index) => {
          // console.log(image);

          let styleObj = {
            gridColumnStart: image._type == "flexEdgetoEdge" ? 1 : image.startColumn,
            gridColumnEnd: image._type == "flexEdgetoEdge" ? 999 : image.endColumn,
            gridRowStart: image.startRow,
            gridRowEnd: image.endRow,
          };
          let styleObjMobile = {
            gridColumnStart: image.startColumnMobile,
            gridColumnEnd: image.endColumnMobile,
            gridRowStart: image.startRowMobile,
            gridRowEnd: image.endRowMobile,
          };
          let styleObjTablet = {
            gridColumnStart: image.startColumnTablet,
            gridColumnEnd: image.endColumnTablet,
            gridRowStart: image.startRowTablet,
            gridRowEnd: image.endRowTablet,
          };

          if (image && image._type == "flexImage") {
            //get ratio of image

            if (image.asset !== undefined) {
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
                    className={`${image.hideDesktop ? "lg:hidden " : ""} ${
                      image.hideTablet ? "md:hidden lg:block " : ""
                    } ${image.hideMobile ? "hidden md:block " : ""} flex-item`}
                    style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
                  >
                    <PageLink className="internal-link z-40 block relative" to={uri + "/" + link}>
                      <div
                        className={`${image.dropShadow ? "drop-shadow" : ""} ${
                          image.border ? " border-img" : ""
                        } ${
                          image.hoverImage ? "hover-hide" : ""
                        } z-40 relative inline-block w-full`}
                      >
                        <Figure node={image} />
                      </div>{" "}
                      {image.caption && (
                        <span className="mt-1 relative z-20 block text-sm">{image.caption}</span>
                      )}
                      {image.hoverImage && (
                        <div
                          className={`${image.dropShadow ? "drop-shadow" : ""} ${
                            image.border ? " border-img" : ""
                          } hover-image w-full inline-block`}
                        >
                          {" "}
                          <Figure node={image.hoverImage} />
                        </div>
                      )}
                    </PageLink>
                  </div>
                );
              } else {
                return (
                  <div
                    key={image._key}
                    className={`${image.hideDesktop ? "lg:hidden " : ""} ${
                      image.hideTablet ? "md:hidden lg:block " : ""
                    } ${image.hideMobile ? "hidden md:block " : ""} flex-item`}
                    style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
                  >
                    <div
                      className={`${image.dropShadow ? "drop-shadow" : ""} ${
                        image.border ? " border-img" : ""
                      } z-40 relative`}
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
          } else if (image._type == "flexEdgetoEdge") {
            return (
              <div
                key={image._key}
                className={`${image.upToNav ? "up-to-nav " : ""} flex-item edge-to-edge`}
                style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
              >
                <Figure node={image} />
              </div>
            );
          } else if (image._type == "flexPdf" && typeof window != `undefined`) {
            return (
              <div
                key={image._key}
                className="flex-item relative z-20"
                style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
              >
                <PdfReader key={image._key} file={image.asset.url} />
              </div>
            );
          } else if (image._type == "flexText") {
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
          } else if (image._type == "flexCircle") {
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
          } else if (image._type == "flexCallibration") {
            let styleObj = {
              gridColumnStart: 1,
              gridColumnEnd: 40,
              gridRowStart: image.startRow,
            };
            let styleObjMobile = {
              gridColumnStart: 1,
              gridColumnEnd: 40,
              gridRowStart: image.startRowMobile,
            };
            let styleObjTablet = {
              gridColumnStart: 1,
              gridColumnEnd: 40,
              gridRowStart: image.startRowTablet,
            };
            return (
              <div
                key={image._key}
                className="flex-item"
                style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
              >
                {" "}
                <GridRow />
              </div>
            );
          } else if (image._type == "flexSquare") {
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
          } else if (image._type == "obroundButton") {
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
          } else if (image._type == "flexVerticalText") {
            return (
              <div
                key={image._key}
                className={`
                  ${image.edgeBind ? "edgeBind--" + image.edgeBind : "" }
                  flex-vertical-text 
                `}
                style={mobile ? styleObjMobile : tablet ? styleObjTablet : styleObj}
              >
                <div style={{ color: `${image.color ? image.color : "inherit"}` }}>
                  <PortableText className="m-0" blocks={image.text} />
                </div>
              </div>
            );
          } else {
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
        })}
    </div>
  );
};

export default FlexGallery;
