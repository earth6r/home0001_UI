import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const GridRow = ({ children, className, scroll = true }) => {
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
          className={`grid-row py-1em text-nav md:text-base ${className ? className : ""}`}
        >
          {children}
          <motion.div className="grid-marker grid-marker-1"></motion.div>
          <motion.div className="grid-marker grid-marker-2"></motion.div>
          <motion.div className="grid-marker grid-marker-3"></motion.div>
        </div>
      ) : (
        <div
          ref={ref}
          className={`grid-row py-2 md:py-1em text-base ${className ? className : ""}`}
        >
          {children}
          <div className="grid-marker grid-marker-1"></div>
          <div className="grid-marker grid-marker-2"></div>
          <div className="grid-marker grid-marker-3"></div>
        </div>
      )}
    </>
  );
};

export default GridRow;
