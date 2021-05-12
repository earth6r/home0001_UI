import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Marker from "../icon/marker";

const GridRow = ({ hide = 0, children, className = "", scroll = true, style = {} }) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0.5, 1], {
    clamp: false,
  });

  useLayoutEffect(() => {
    //if (!scroll) return false;
    const element = ref.current;
    setElementTop(element.offsetTop);
  }, [ref]);

  return (
    <>
      {scroll ? (
        <div
          ref={ref}
          className={`grid-row py-1em text-nav relative z-30 md:text-base pointer-events-none ${
            className ? className : ""
          }`}
        >
          {children}
          {hide !== 1 && <div className="grid-marker grid-marker-1" />}
          <motion.div className="grid-marker opacity-0 grid-marker-2" />
          <motion.div className="grid-marker opacity-0 grid-marker-3" />
        </div>
      ) : (
        <div
          ref={ref}
          className={`grid-row py-2 md:py-1em relative text-base ${className ? className : ""}`}
        >
          {children}
          {hide !== 1 && <div className="grid-marker grid-marker-1" />}
          <div className="grid-marker opacity-0 grid-marker-2" />
          <div className="grid-marker opacity-0 grid-marker-3" />
        </div>
      )}
    </>
  );
};

export default GridRow;
