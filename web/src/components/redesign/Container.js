import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`rte text-mobile-body md:text-desktop-body md:text-[1rem] tracking-body pt-20 md:pt-[9.125rem] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
