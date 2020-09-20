import React from "react";
import PortableText from "../portableText";

export interface StandardTextProps {
  data: {
    text: any[];
  };
}

export const StandardText = ({ data }: StandardTextProps) => {
  const { text } = data;
  console.log(text);
  return (
    <div style={{ marginLeft: "-.06em" }}>
      <PortableText blocks={text} />
    </div>
  );
};
