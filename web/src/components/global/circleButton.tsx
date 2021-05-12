import { PageLink } from "../link";
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const CircleButton = ({ title, url, linkHome, linkRnd, float = true, color }) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();
  let randPadding = Math.random() * 10;
  let uri = "";
  let myUrl = url && url.content ? url.content.main.slug.current : ""
  
  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0.9, 1], {
    clamp: false,
  });

  if (url !== undefined) {
    switch (url._type) {
      case "home":
        uri = "/home";
        //   alert("set home");
        break;
      case "checkout":
        uri = "/checkout";
        break;
      default:
        uri = "";
        break;
    }
  }

 if(linkHome){
    myUrl = "/collective"
  }else if(linkRnd){
    myUrl = "/"
  }else{
    myUrl = uri + "/" + myUrl
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
          className={`box-circle mx-1/4em right-0 circle-width self`}
          style={{ margin: `${randPadding} .5rem` }}
        >
          <div className="">
            <div className="square relative">
              <div
                className={`background-circle ${
                  color === "black" ? "bg-black hover:bg-black text-white" : ""
                }`}
              />
              {myUrl  ? (
                <PageLink
                  className="m-0 h-full flex items-center justify-center text-nav leading-none text-center top-1/2 uppercase absolute px-1em md:px-1/2em transform -translate-y-1/2 w-full"
                  to={`${myUrl}`}
                >
                  <h2 className={`${color === "black" ? "text-white ": ""} m-0 p-0 leading-none font-bold`}>
                    {ReactHtmlParser(title)}
                  </h2>
                </PageLink>
              ) : (
                title && (
                  <h2 className={`${color === "black" ? "text-white ": ""}m-0 font-bold leading-none text-center top-1/2 uppercase absolute px-1em md:px-1/2em transform -translate-y-1/2 w-full`}>
                    {ReactHtmlParser(title)}
                  </h2>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={`box-circle mx-1/4em right-0 circle-width relative`}>
          <motion.div className="">
            <motion.div className="square">
              <div
                className={`background-circle ${
                  color === "black" ? "bg-black hover:bg-black text-white" : ""
                }`}
              />
              {url && url.content ? (
                <PageLink
                  className="m-0 h-full flex items-center justify-center text-nav leading-none text-center top-1/2 uppercase absolute px-1em md:px-1/2em transform -translate-y-1/2 w-full"
                  to={`${myUrl}`}
                >
                  <h2
                    className={`m-0 font-bold p-0  leading-none ${
                      color === "black" ? " text-white " : ""
                    }`}
                  >
                    {ReactHtmlParser(title)}
                  </h2>
                </PageLink>
              ) : (
                title && (
                  <h2
                    className={`m-0 font-bold leading-none text-center top-1/2 uppercase absolute px-1em md:px-1/2em transform -translate-y-1/2 w-full ${
                      color === "black" ? " text-white " : ""
                    }`}
                  >
                    {ReactHtmlParser(title)}
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
