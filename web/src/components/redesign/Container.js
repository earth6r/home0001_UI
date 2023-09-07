import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`rte text-mobile-body md:text-desktop-body md:text-[1rem] tracking-body pt-[5rem] md:pt-[7rem] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
