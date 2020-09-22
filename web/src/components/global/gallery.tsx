// import cx from "classnames";
// import Img from "gatsby-image";
// @ts-ignore
// import { getFluidGatsbyImage } from "gatsby-source-sanity";
import React, { useState, useLayoutEffect, useRef } from "react";
import { Image } from "../image";

const Gallery = (props) => {
  const { images } = props;
  console.log(images);
  return (
    <div className="w-full pt-3 flex relative flex-wrap md:flex-no-wrap justify-between">
      {images &&
        images.map((image) => (
          <Image key={image._key} imageId={image.asset._id} caption={image.caption} />
          // <div>{image.asset._id}</div>
        ))}
      <div className="grid-marker z-20 grid-marker-1"></div>
      <div className="grid-marker z-20 grid-marker-2"></div>
      <div className="grid-marker z-20 grid-marker-3"></div>
    </div>
  );
};

export default Gallery;
