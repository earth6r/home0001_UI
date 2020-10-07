import React, { useState, useEffect, useRef } from "react";
import { GalleryImage } from "../gallery-image";
import GridRow from "../grid/grid-row";
import CircleButton from "./circleButton";
var shuffle = require("shuffle-array");

const Gallery = (props) => {
  const { images, url } = props;
  const randImages = images ? shuffle(images) : [];
  const justify = ["justify-start", "justify-center", "justify-between", "justify-end"];
  const [direction, setDirection] = useState();

  // const randImages = images;
  const gridLen = Math.floor(randImages.length / 2);
  let baseWidth = 8;

  const maxLandscapeWidth = 6;
  const maxMobileLandscapeWidth = 4;
  const maxPortraitWidth = 5;
  const maxMobilePortraitWidth = 5;

  const minLandscapeWidth = 4;
  const minPortraitWidth = 3;
  const minMobileLandscapeWidth = 4;
  const minMobilePortraitWidth = 3;

  const maxMargin = 3;
  const minMargin = 0.005;

  let minWidth = 4;

  let remainingMargin = maxMargin;
  let remainingMobileWidth = maxLandscapeWidth;
  let remainingWidth = baseWidth;
  let rows = [];

  let orders = getOrders();
  let remainingOrders = getOrders();

  console.log(url);

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
    <div className="w-full z-30 pt-3 relative">
      <div className={`mx-mobile md:mx-desktop relative flex flex-wrap ${direction}`}>
        {randImages &&
          randImages.map((image, index) => {
            //get ratio of image
            if (image.asset !== undefined) {
              let order = index;
              let ratio =
                image.asset !== undefined
                  ? image.asset.metadata.dimensions.height > image.asset.metadata.dimensions.width
                    ? "portrait"
                    : "landscape"
                  : "portrait";
              //get random width based on portrait vs. landscape
              remainingWidth =
                ratio == "portrait"
                  ? index % 2
                    ? Math.floor(
                        Math.random() * (maxPortraitWidth - remainingWidth) + minPortraitWidth
                      )
                    : Math.floor(
                        Math.random() * (maxPortraitWidth - minPortraitWidth) + minPortraitWidth
                      )
                  : index % 2
                  ? Math.floor(
                      Math.random() * (maxLandscapeWidth - remainingWidth) + minLandscapeWidth
                    )
                  : Math.floor(
                      Math.random() * (maxLandscapeWidth - minLandscapeWidth) + minLandscapeWidth
                    );

              remainingMobileWidth =
                ratio == "portrait"
                  ? index % 2
                    ? Math.floor(
                        Math.random() * (maxMobilePortraitWidth - remainingMobileWidth) +
                          minMobilePortraitWidth
                      )
                    : Math.floor(
                        Math.random() * (maxMobilePortraitWidth - minMobilePortraitWidth) +
                          minMobilePortraitWidth
                      )
                  : index % 2
                  ? Math.floor(
                      Math.random() * (maxMobileLandscapeWidth - remainingMobileWidth) +
                        minMobileLandscapeWidth
                    )
                  : Math.floor(
                      Math.random() * (maxMobileLandscapeWidth - minMobileLandscapeWidth) +
                        minMobileLandscapeWidth
                    );

              remainingMargin =
                index % 2
                  ? Math.random() * (maxMargin - remainingMargin) + minMargin
                  : Math.random() * (maxMargin - minMargin) + minMargin;

              // console.log(remainingWidth);

              // remainingWidth =
              //   index % 2
              //     ? Math.floor(Math.random() * (baseWidth - remainingWidth) + minWidth)
              //     : Math.floor(Math.random() * (baseWidth - minWidth) + minWidth);

              // remainingWidth =
              //   index % 2
              //     ? Math.floor(Math.random() * (baseWidth - remainingWidth) + minWidth)
              //     : Math.floor(Math.random() * (baseWidth - minWidth) + minWidth);

              return (
                <GalleryImage
                  width="1600"
                  remainingWidth={remainingWidth}
                  remainingMobileWidth={remainingMobileWidth}
                  key={image._key}
                  order={order}
                  imageId={image.asset._id}
                  caption={image.caption}
                  remainingMargin={remainingMargin}
                />
              );
            } else {
              return <></>;
            }
          })}
        {/* randomly place circle image in an order between 1 and gallery image set length  */}
        {url !== undefined && randImages.length > 2 ? (
          <div
            className="self-center mx-auto"
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
            className="self-center py-1/2em md:py-1/4em"
            style={{
              order: `${randImages.length + 2}`,
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
