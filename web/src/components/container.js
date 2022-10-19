import React from "react";

const Container = ({ children, className = "" }) => {
  return <div className={`rte pt-12 md:pt-16 ${className}`}>{children}</div>;
};

export default Container;
