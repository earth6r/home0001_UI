import React from "react";

const Container = ({ children, className }) => {
  return <div className={`pt-20 lg:pt-0 rte ${className}`}>{children}</div>;
};

export default Container;
