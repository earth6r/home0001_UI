import { Link } from "gatsby";
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const CircleButton = ({ title, url, float = true }) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();
  const [randPadding, setRandPadding] = useState(0);

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0.9, 1], {
    clamp: false,
  });

  useLayoutEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
    setRandPadding(Math.floor(Math.random() * 4));
  }, [ref]);

  return (
    <div ref={ref} className={`${!float ? "absolute right-0 bottom-4em z-20" : ""}`}>
      {float ? (
        <div className={`box-circle w-4/10 relative z-40 ${`ml-${randPadding}/10`}`}>
          <motion.div className="absolute w-full h-full left-1/2 top-1/2">
            <motion.div className="square" style={{ y }}>
              {/* <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> */}
              {title && (
                <h2 className="m-0 text-nav md:text-baseLg text-center top-1/2 uppercase absolute px-2em md:px-1/2em transform -translate-y-1/2 w-full">
                  {title}
                </h2>
              )}
              {/* </motion.button> */}
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <div className={`box-circle right-0 w-32 h-32 md:w-40 md:h-40`}>
          <motion.div className="">
            <motion.div className="square" style={{ y }}>
              <div className="background-circle" />
              {/* <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> */}
              {title && (
                <h2 className="m-0 text-nav leading-none text-center top-1/2 uppercase absolute px-2em md:px-1/2em transform -translate-y-1/2 w-full">
                  {title}
                </h2>
              )}
              {/* </motion.button> */}
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CircleButton;
