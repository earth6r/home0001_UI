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
    <div className="w-full relative z-20" style={{ marginLeft: "-.04em" }}>
      <PortableText blocks={text} />
    </div>
  );
};
