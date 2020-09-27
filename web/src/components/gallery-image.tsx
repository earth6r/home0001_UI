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
  const [randX, setRandX] = useState(0);
  const [randY, setRandY] = useState(0);
  const [randSpeed, setRandSpeed] = useState(0);
  const [randPadding, setRandPadding] = useState(0);
  const ref = useRef();
  const [elementTop, setElementTop] = useState(0);
  const { scrollY } = useViewportScroll();
  let fluidProps;
  let svgProps;

  if (imageId && !/gif/.test(imageId)) {
    fluidProps = getFluidGatsbyImage(imageId, { maxWidth: width || 2400 }, sanityConfig);
  }

  const y = useTransform(scrollY, [elementTop, elementTop + 2], [0.1 - randSpeed, 0.2], {
    clamp: false,
  });

  useEffect(() => {
    // console.log(ref.current.offsetWidth);
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    setRandX(Math.random() * 2 * plusOrMinus);
    setRandY(Math.random() * 2 * plusOrMinus);
    setRandSpeed(Math.random() * 0.2 * plusOrMinus);
    setRandWidth(Math.floor(Math.random() * 4) + 2);
    setRandMobileWidth(Math.floor(Math.random() * 8) + 2);
    setRandPadding(Math.floor(Math.random() * (10 - randWidth)) + 3);
  }, [ref]);
  // style={{ transform: `translate(${randX}rem, ${randY}rem)` }}
  return (
    <figure
      className={`${
        randWidth !== 10 ? `w-${randWidth}/10` : "w-full"
      } ${`md:px-${randPadding}`} mx-mobile md:mx-desktop  mb-1em`}
      ref={ref}
      style={{ paddingTop: `${`${randY}em`}` }}
    >
      {fluidProps ? (
        <motion.div>
          <Img className="relative z-10" fluid={fluidProps} alt={alt} defaultFadeIn={200} />
          {caption && <figcaption className="mt-1 text-sm">{caption}</figcaption>}
        </motion.div>
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
