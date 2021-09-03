import React from "react";
import PortableText from "../portableText";

export interface StandardTextProps {
  data: {
    text: any[];
  };
}

export const StandardText = ({ data }: StandardTextProps) => {
  const { text } = data;

  return (
    <div 
    className={`${data.cssClassInject ? data.cssClassInject : "w-full"} standard-text ararar`} 
    style={{ marginLeft: "-.04em" }}>
      <PortableText blocks={text} />
    </div>
  );
};
