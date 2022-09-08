import React from "react";
import PortableText from "../portableText";

export interface StandardTextProps {
  data: {
    cssClassInject: string;
    text: any[];
  };
}

export const StandardText = ({ data }: StandardTextProps) => {
  const { text } = data;

  return (
    <>
      <div
        className={`${data.cssClassInject ? data.cssClassInject : "w-full"} standard-text ararar`}
      >
        <PortableText blocks={text} />
      </div>
      <div className="sm:w-5/6"></div>
    </>
  );
};
