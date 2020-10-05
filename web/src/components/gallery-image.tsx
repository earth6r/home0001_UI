import cx from "classnames";
import Img from "gatsby-image";
// @ts-ignore
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import React, { useState, useEffect, useRef } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
};

const builder = imageUrlBuilder(sanityConfig);

export const GalleryImage = ({
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
  const [randMobileWidth, setRandMobileWidth] = useState(0);
  const [randPullX, setRandPullX] = useState(0);
  const [randPullY, setRandPullY] = useState(0);
  const [randSpeed, setRandSpeed] = useState(0);
  const [randPadding, setRandPadding] = useState(0);
  const ref = useRef();
  const [elementTop, setElementTop] = useState(0);
  const { scrollY } = useViewportScroll();
  let fluidProps;
  let randP = Math.floor((Math.random() * width) / 2);
  let randX = Math.random() * (width / 4);
  let randMobileX = Math.random() * (width / 2);
  let randY = Math.random() * 6;
  let randMobileY = Math.random() * 20;
  let svgProps;

  if (imageId && !/gif/.test(imageId)) {
    fluidProps = getFluidGatsbyImage(imageId, { maxWidth: 2400 }, sanityConfig);
  }

  const y = useTransform(scrollY, [elementTop, elementTop + 2], [0.1 - randSpeed, 0.2], {
    clamp: false,
  });

  useEffect(() => {
    // console.log(ref.current.offsetWidth);

    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    setRandPullX(Math.random() * 20 * plusOrMinus);
    setRandPullY(Math.random() * 20 * plusOrMinus);
    setRandSpeed(Math.random() * 0.2 * plusOrMinus);
    setRandWidth(Math.floor(Math.random() * 4) + 2);
    setRandMobileWidth(Math.floor(Math.random() * 8) + 2);
    setRandPadding(Math.floor(Math.random() * (width / 4)));
    setLoaded(true);
    console.log(randPullX);
  }, [ref]);

  return (
    <figure
      className={`w-${width}/10 px-2`}
      ref={ref}
      style={{ margin: `${randY}rem ${randX}rem 0` }}
    >
      {fluidProps ? (
        <div>
          <Img className="relative z-10" fluid={fluidProps} alt={alt} defaultFadeIn={200} />
          {caption && (
            <figcaption className="mt-3/4em text-mobileCaption md:text-desktopCaption">
              {caption}
            </figcaption>
          )}
        </div>
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
    </figure>
  );
};
