import React, { useState, useEffect, useRef } from "react";
import { GalleryImage } from "../gallery-image";
import GridRow from "../grid/grid-row";
import ReactHtmlParser from "react-html-parser";
import CircleButton from "./circleButton";
var shuffle = require("shuffle-array");

const Gallery = (props) => {
  const { images, url, embeds } = props;
  const randImages = images ? shuffle(images.concat(embeds)).filter(Boolean) : []; 
  const justify = ["justify-start", "justify-center", "justify-between", "justify-end"];
  const [direction, setDirection] = useState();

  // const randImages = images;
  const gridLen = Math.floor(randImages.length / 2);
  let baseWidth = 8;

  //desktop landscape
  const minLandscapeWidth = 8;
  const maxLandscapeWidth = 10;

  //mobile landscape
  const minMobileLandscapeWidth = 9;
  const maxMobileLandscapeWidth = 14;

  //mobile lead landscape
  const minMobileLeadLandscapeWidth = 17;
  const maxMobileLeadLandscapeWidth = 19;

  //desktop portrait
  const minPortraitWidth = 5;
  const maxPortraitWidth = 7;

  //mobile portrait
  const minMobilePortraitWidth = 7;
  const maxMobilePortraitWidth = 10;

  //mobile lead portrait
  const minMobileLeadPortraitWidth = 14;
  const maxMobileLeadPortraitWidth = 16;

  const maxMargin = 1;
  const minMargin = 0.1;

  let minWidth = 4;

  let remainingMargin = maxMargin;
  let remainingMobileWidth = maxLandscapeWidth;
  let remainingWidth = baseWidth;
  let rows = [];

  let orders = getOrders();
  let remainingOrders = getOrders();

  // console.log(props);

  function getOrders() {
    let temp_orders = [];
    for (let i = 0; i < images.length; i++) {
      temp_orders.push(i);
    }
    return temp_orders;
  }

  function row() {
    for (let i = 0; i < gridLen; i++) {
      return (
        <div
          key={`${randImages[i]._key}-grid-$`}
          style={{ top: `${(100 / images.length) * (i + 1)}%` }}
          className="absolute w-full pointer-events-none left-0 z-0"
        >
          <GridRow />
        </div>
      );
    }
  }
  useEffect(() => {
    setDirection(justify[Math.round(Math.random() * justify.length)]);
  }, []);
  return (
    <div className="w-full z-40 relative">
      <div className={`mx-mobile md:mx-desktop relative flex flex-wrap ${direction}`}>
        {randImages &&
          randImages.map((image, index) => {
            if(image && (image._type == "mainImage")){
            //get ratio of image
              if (image.asset !== undefined) {
                let order = index;
                let ratio =
                  image.asset !== undefined
                    ? image.asset.metadata.dimensions.height > image.asset.metadata.dimensions.width
                      ? "portrait"
                      : "landscape"
                    : "portrait";
                remainingWidth =
                  ratio == "portrait"
                    ? Math.floor(
                        Math.random() * (maxPortraitWidth - minPortraitWidth) + minPortraitWidth
                      )
                    : Math.floor(
                        Math.random() * (maxLandscapeWidth - minLandscapeWidth) + minLandscapeWidth
                      );
                if (!image.lead) {
                  remainingMobileWidth =
                    ratio == "portrait"
                      ? Math.floor(
                          Math.random() * (maxMobilePortraitWidth - minMobilePortraitWidth) +
                            minMobilePortraitWidth
                        )
                      : Math.floor(
                          Math.random() * (maxMobileLandscapeWidth - minMobileLandscapeWidth) +
                            minMobileLandscapeWidth
                        );
                } else {
                  remainingMobileWidth =
                    ratio == "portrait"
                      ? Math.floor(
                          Math.random() * (maxMobileLeadPortraitWidth - minMobileLeadPortraitWidth) +
                            minMobileLeadPortraitWidth
                        )
                      : Math.floor(
                          Math.random() *
                            (maxMobileLeadLandscapeWidth - minMobileLeadLandscapeWidth) +
                            minMobileLeadLandscapeWidth
                        );
                }

                return (
                  <GalleryImage
                    width="1399"
                    remainingWidth={remainingWidth}
                    remainingMobileWidth={remainingMobileWidth}
                    key={image._key}
                    order={order}
                    imageId={image.asset._id}
                    caption={image.caption}
                    lead={image.lead}
                    ratio={ratio}
                    remainingMargin={remainingMargin}
                  />
                );
              } else {
                return <></>;
              }

            } else {
              return(
                <div className="gallery-image w-9/20 md:w-8/20 md:py-0 self-undefined mx-auto">{ReactHtmlParser(image)}</div>
              )
            }
          })}
        {/* randomly place circle image in an order between 1 and gallery image set length  */}
        {url !== undefined && randImages.length > 2 ? (
          <div
            className="self-center mx-auto z-40 sticky bottom-0 md:relative"
            style={{
              order: `${Math.floor(Math.random() * randImages.length - 2)}`,
            }}
          >
            {url.title !== undefined && (
              <CircleButton title={url.title} url={url.url} float={true} />
            )}
          </div>
        ) : (
          <div
            className="self-center py-1 md:py-1em mx-auto z-50 sticky md:relative"
            style={{
              order: `${Math.floor(Math.random() * randImages.length)}`,
              bottom: "1em",
              top: "1em",
            }}
          >
            {url !== undefined && url.title !== undefined && (
              <CircleButton title={url.title} url={url.url} float={false} />
            )}
          </div>
        )}
      </div>

      <>{row()}</>
    </div>
  );
};

export default Gallery;
