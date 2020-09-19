import cx from "classnames";
import Img from "gatsby-image";
// @ts-ignore
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import React, { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
};

const builder = imageUrlBuilder(sanityConfig);

export const Image = ({
  imageId,
  className,
  width,
  alt,
  src,
  caption,
}: {
  imageId?: string;
  width?: number;
  alt?: string;
  className?: string;
  src?: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  let fluidProps;

  if (imageId && !/gif/.test(imageId)) {
    fluidProps = getFluidGatsbyImage(imageId, { maxWidth: width || 2400 }, sanityConfig);
  }

  return (
    <figure>
      {fluidProps ? (
        <Img fluid={fluidProps} alt={alt} defaultFadeIn={200} />
      ) : (
        <img
          alt={alt}
          src={src ? src : undefined}
          className={cx("x y block", {
            "is-loaded": loaded,
          })}
          onLoad={() => {
            setLoaded(true);
          }}
        />
      )}
      {caption && <figcaption className="mt-1">{caption}</figcaption>}
    </figure>
  );
};
