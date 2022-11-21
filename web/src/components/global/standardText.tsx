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
    <div className={`${data.cssClassInject ? data.cssClassInject : "w-full"} standard-text`}>
      <PortableText blocks={text} />
    </div>
  );
};
