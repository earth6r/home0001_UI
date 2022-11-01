import React from "react";

const Container = ({ children, className = "" }) => {
  return <div className={`rte pt-24 ${className}`}>{children}</div>;
};

export default Container;
