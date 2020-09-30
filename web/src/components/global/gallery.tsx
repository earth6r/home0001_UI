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
  console.log(props);
  return (
    <div style={{ mixBlendMode: "multiply" }} className="w-full z-30 pt-3 relative">
      <div className="-mx-mobile md:-mx-desktop  flex  flex-wrap justify-center">
        {randImages &&
          randImages.map((image) => (
            <GalleryImage key={image._key} imageId={image.asset._id} caption={image.caption} />
            // <div>{image.asset._id}</div>
          ))}
        {url && <CircleButton title={url.title} url={url.url} float={false} />}
      </div>

      {randImages &&
        randImages.splice(0, Math.floor(images.length / 2)).map((image, index) => (
          <div
            key={`${image._key}-grid-$`}
            style={{ top: `${(100 / images.length) * (index + 1)}%` }}
            className="absolute w-full left-0"
          >
            <GridRow />
          </div>
        ))}
    </div>
  );
};

export default Gallery;
