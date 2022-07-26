import cx from "classnames";
import React, { useState, useLayoutEffect, useRef } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET
};

const builder = imageUrlBuilder(sanityConfig);

export const Image = ({
  imageId,
  className,
  width,
  alt,
  src,
  caption
}: {
  imageId?: string;
  width?: number;
  alt?: string;
  className?: string;
  src?: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  const [randWidth, setRandWidth] = useState(0);
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
    clamp: false
  });

  useLayoutEffect(() => {
    setRandX(Math.floor(Math.random() * 4));
    setRandY(Math.floor(Math.random() * 4));
    setRandSpeed(Math.random() * (0.3 - 0.2) - 0.2);
    setRandWidth(Math.floor(Math.random() * 7) + 3);
    setRandPadding(Math.floor(Math.random() * 4));
  }, [ref]);

  return (
    <figure
      className={`${
        randWidth !== 10 ? `w-${4}/10` : "w-full"
      } ${`mx-${3}/10`} md:mx-1/10  mb-1em z-40`}
      ref={ref}
    >
      {fluidProps ? (
        <motion.div style={{}}>
          <Img
            className="relative z-20"
            fluid={fluidProps}
            alt={alt}
            imgStyle={{ objectFit: "contain", maxWidth: "none" }}
            defaultFadeIn={200}
          />
          {caption && <figcaption className="mt-1 text-sm">{caption}</figcaption>}
        </motion.div>
      ) : (
        <img
          alt={alt}
          imgStyle={{ objectFit: "contain", maxWidth: "none" }}
          src={src ? src : undefined}
          className={cx("x y block", {
            "is-loaded": loaded
          })}
          onLoad={() => {
            setLoaded(true);
          }}
        />
      )}
    </figure>
  );
};
