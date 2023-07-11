import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`rte text-mobile-body md:text-desktop-body md:text-[1rem] tracking-body pt-[5.25rem] md:pt-40 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
