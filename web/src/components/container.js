import React from "react";

const Container = ({ children, className }) => {
  return <div className={`rte pt-20 md:pt-0 ${className}`}>{children}</div>;
};

export default Container;
