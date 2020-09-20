import React from "react";

const Container = ({ children, className }) => {
  return <div className={`rte pt-16 md:pt-410em ${className}`}>{children}</div>;
};

export default Container;
