import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`rte text-mobile-body md:text-desktop-body md:text-[1rem] tracking-body pt-[4.4rem] md:pt-[8.875rem] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
