import { PageLink } from "../link";
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const ObroundButton = ({ title, url, linkHome, linkRnd, textColor, customColor }) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();
  let uri = "";
  let myUrl = url && url.content ? url.content.main.slug.current : "";
  let realColor = customColor;
  let realTextColor = textColor;

  let styleObj = {
    color: realTextColor,
    backgroundColor: realColor,
  };

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

  if (linkHome) {
    myUrl = "/collective";
  } else if (linkRnd) {
    myUrl = "/";
  } else {
    myUrl = uri + "/" + myUrl;
  }
  // top-1/2 -translate-y-1/2 right-0 z-20
  return (
    <div className={`left-0 w-full`}>
      {myUrl && (
        <PageLink
          style={styleObj}
          className="relative text-center pt-2 rounded-full w-full block leading-none h-3em md:h-2em justify-center text-mobileBody md:text-desktopBody"
          to={`${myUrl}`}
        >
          {title}
        </PageLink>
      )}
    </div>
  );
};

export default ObroundButton;
