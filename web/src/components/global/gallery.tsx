// import cx from "classnames";
// import Img from "gatsby-image";
// @ts-ignore
// import { getFluidGatsbyImage } from "gatsby-source-sanity";
import React, { useState, useLayoutEffect, useRef } from "react";
import { GalleryImage } from "../gallery-image";
import GridRow from "../grid/grid-row";
import CircleButton from "./circleButton";
var shuffle = require("shuffle-array");

const Gallery = (props) => {
  const { images, url } = props;
  const randImages = images ? shuffle(images) : [];
  // const randImages = images;
  const gridLen = Math.floor(randImages.length / 2);
  let baseWidth = 8;
  let minWidth = 2;
  let remainingWidth = baseWidth;
  let rows = [];
  // alert(images.length);
  // console.log(images);
  function row() {
    for (let i = 0; i < gridLen; i++) {
      rows.push(
        <div
          key={`${randImages[i]._key}-grid-$`}
          style={{ top: `${(100 / images.length) * (i + 1)}%` }}
          className="absolute w-full left-0"
        >
          <GridRow />
        </div>
      );
    }
  }
  return (
    <div className="w-full z-30 pt-3 relative">
      <div className="-mx-mobile md:-mx-desktop  flex  flex-wrap justify-center">
        {randImages &&
          randImages.map((image, index) => {
            remainingWidth =
              index % 2
                ? Math.floor(Math.random() * (baseWidth - remainingWidth) + minWidth)
                : Math.floor(Math.random() * (baseWidth - minWidth) + minWidth);

            console.log(`remaining width:${remainingWidth}`);
            return (
              <GalleryImage
                width={remainingWidth}
                key={image._key}
                imageId={image.asset._id}
                caption={image.caption}
              />
            );
          })}
        {url && <CircleButton title={url.title} url={url.url} float={false} />}
      </div>

      <>{rows}</>
    </div>
  );
};

export default Gallery;
