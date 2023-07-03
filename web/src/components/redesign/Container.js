import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`rte leading-[130%] md:leading-[135%] text-[0.875rem] md:text-[1rem] tracking-body pt-[5.25rem] md:pt-40 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
