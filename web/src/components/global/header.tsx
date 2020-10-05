import React from "react";
import { PageLink } from "../link";

export const Header = (props) => {
  const { title, number } = props;
  return (
    <div className="w-full">
      {title && (
        <h2
          style={{ marginLeft: ".1em" }}
          className=" text-mobileCaption md:text-desktopCaption my-1em relative z-20"
        >
          {title}
          {number && (
            <span className="text-mobileCaption md:text-desktopCaption normal-case absolute left-3">
              {number}
            </span>
          )}
        </h2>
      )}
    </div>
  );
};
