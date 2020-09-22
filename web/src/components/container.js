import React from "react";

const Container = ({ children, className }) => {
  return <div className={`rte pt-10 md:pt-4em ${className}`}>{children}</div>;
};

export default Container;
