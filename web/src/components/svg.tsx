import cx from "classnames";
// import Img from "gatsby-image";
// @ts-ignore
// import { getFluidGatsbyImage } from "gatsby-source-sanity";
import React, { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
};

const builder = imageUrlBuilder(sanityConfig);

const SVG = ({ file }) => {
  // const [loaded, setLoaded] = useState(false);
  // let fluidProps;
  // let svgProps;
  let svg;
  function urlFor(source) {
    return builder.image(source);
  }
  return (
    <img className="p-0 m-0 pointer-events-none" alt="logo" src={urlFor(file.asset._id).url()} />
  );
};

export default SVG;
