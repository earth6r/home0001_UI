import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`rte text-mobile-body md:text-desktop-body md:text-[1rem] tracking-body pt-[88px] md:pt-[126px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
