import { PageLink } from "../link";
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const CircleButton = ({ title, url, float = true }) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();
  let randPadding = Math.random() * 10;
  let uri = "";

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0.9, 1], {
    clamp: false,
  });

  if (url !== undefined) {
    switch (url._type) {
      case "home":
        uri = "/home";
        //   alert("set home");
        break;
      default:
        uri = "";
        break;
    }
  }

  useLayoutEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
  }, [ref]);
  // top-1/2 -translate-y-1/2 right-0 z-20
  return (
    <div ref={ref} className={`${!float ? "right-0 ml-1em z-20 self" : ""}`}>
      {float ? (
        <div
          className={`box-circle mx-1/4em right-0 w-32 h-32 md:w-40 md:h-40 self`}
          style={{ margin: `${randPadding} .5rem` }}
        >
          <div className="">
            <div className="square relative">
              <div className="background-circle" />
              {url && url.content ? (
                <PageLink
                  className="m-0 h-full flex items-center justify-center text-nav leading-none text-center top-1/2 uppercase absolute px-2em md:px-1/2em transform -translate-y-1/2 w-full"
                  to={`${uri}/${url.content.main.slug.current}`}
                >
                  <h2 className="m-0 p-0 text-nav leading-none">{title}</h2>
                </PageLink>
              ) : (
                title && (
                  <h2 className="m-0 text-nav leading-none text-center top-1/2 uppercase absolute px-2em md:px-1/2em transform -translate-y-1/2 w-full">
                    {title}
                  </h2>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={`box-circle relative right-0 w-32 h-32 md:w-40 md:h-40`}>
          <motion.div className="">
            <motion.div className="square">
              <div className="background-circle" />
              {url && url.content ? (
                <PageLink
                  className="m-0 h-full flex items-center justify-center text-nav leading-none text-center top-1/2 uppercase absolute px-2em md:px-1/2em transform -translate-y-1/2 w-full"
                  to={`${uri}/${url.content.main.slug.current}`}
                >
                  <h2 className="m-0 p-0 text-nav leading-none">{title}</h2>
                </PageLink>
              ) : (
                title && (
                  <h2 className="m-0 text-nav leading-none text-center top-1/2 uppercase absolute px-2em md:px-1/2em transform -translate-y-1/2 w-full">
                    {title}
                  </h2>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CircleButton;
