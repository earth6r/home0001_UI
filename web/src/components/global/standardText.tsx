import React, { useRef, useEffect, useState } from "react";
import PortableText from "../portableText";
import { StickyContainer, Sticky } from "react-sticky";

export interface StandardTextProps {
  data: {
    text: any[];
  };
}

export const StandardText = ({ data }: StandardTextProps) => {
  const { text } = data;
  const ref = useRef();
  const [height, setHeight] = useState(0);
  //console.log(text);
  useEffect(() => {
    if (ref.current !== undefined) {
      setHeight(ref.current.offsetHeight);
      if (typeof window) {
        window.addEventListener("resize", function () {
          setHeight(ref.current.offsetHeight);
        });
      }
    }
  }, [ref]);
  return (
    <div
      ref={ref}
      className="standard-text w-full relative z-20 hover:z-40"
      style={{ marginLeft: "-.04em" }}
    >
      <StickyContainer>
        <Sticky topOffset={-80} bottomOffset={height}>
          {({
            style,

            // the following are also available but unused in this example
            isSticky,
            wasSticky,
            distanceFromTop,
            distanceFromBottom,
            calculatedHeight,
          }) => (
            <div style={style} className="fixed pointer-events-none top-0 w-full top-0 left-0">
              <div
                className={`${
                  isSticky ? "opacity-1" : "opacity-0"
                } from-white duration-200 ease-in-out transition-opacity bg-gradient-to-b absolute h-20 w-full`}
              ></div>
            </div>
          )}
        </Sticky>
      </StickyContainer>
      <PortableText blocks={text} />
    </div>
  );
};
