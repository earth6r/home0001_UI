import cx from "classnames";
import Img from "gatsby-image";
// @ts-ignore
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import React, { useState, useLayoutEffect, useRef } from "react";
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
  const [randWidth, setRandWidth] = useState(0);
  const [randPadding, setRandPadding] = useState(0);
  const ref = useRef();
  let fluidProps;
  let svgProps;

  if (imageId && !/gif/.test(imageId)) {
    fluidProps = getFluidGatsbyImage(imageId, { maxWidth: width || 2400 }, sanityConfig);
  }

  useLayoutEffect(() => {
    console.log(ref.current.offsetWidth);
    setRandWidth(Math.floor(Math.random() * 7) + 3);
    setRandPadding(Math.floor((Math.random() * (randWidth - 10)) / 4));
  }, [ref]);

  return (
    <figure
      className={`${randWidth !== 10 ? `w-${randWidth}/10` : "w-full"} ${`mx${randPadding}/10`}`}
      ref={ref}
    >
      {fluidProps ? (
        <Img className="relative z-20" fluid={fluidProps} alt={alt} defaultFadeIn={200} />
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
      {caption && <figcaption className="mt-1 text-sm">{caption}</figcaption>}
    </figure>
  );
};
