import React from "react";

const GridGrow = ({ children, className }) => (
  <div className={`grid-row py-2 ${className}`}>
    {children}
    <span className="grid-marker"></span>
  </div>
);

export default GridGrow;
