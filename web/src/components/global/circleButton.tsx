import { Link } from "gatsby";
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useViewportScroll, useTransform, useSpring } from "framer-motion";

const rand = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (+max - +min)) + +min;
};

const CircleButton = ({ title, url }) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();
  const [randPadding, setRandPadding] = useState(0);
  const springConfig = {
    damping: 100,
    stiffness: 100,
    mass: rand(1, 3),
  };

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0.9, 1], {
    clamp: false,
  });

  const scale = useSpring(
    useTransform(scrollY, [elementTop - 100, elementTop + 100], [0, 1]),
    springConfig
  );

  useLayoutEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
    setRandPadding(Math.floor(Math.random() * 6));
  }, [ref]);

  return (
    <div ref={ref} className={`box-circle w-4/10 relative z-30 ${`ml-${randPadding}/10`}`}>
      <motion.div className="absolute w-full h-full left-1/2 top-1/2">
        <motion.div className="square" style={{ y }}>
          {/* <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> */}
          {title && (
            <h2 className="m-0 text-nav md:text-baseDesktop text-center top-1/2 absolute px-2em md:px-1/2em transform -translate-y-1/2 w-full">
              {title}
            </h2>
          )}
          {/* </motion.button> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CircleButton;
