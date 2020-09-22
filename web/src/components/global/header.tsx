import React from "react";
import { PageLink } from "../link";

export const Header = (props) => {
  const { title, number } = props;
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-sm my-1em relative">
          {title}
          {number && <span className="text-sm absolute left-3">{number}</span>}
        </h2>
      )}
    </div>
  );
};
