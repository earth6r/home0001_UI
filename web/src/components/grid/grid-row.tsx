import React from "react";

const GridGrow = ({ children, className }) => (
  <div className={`grid-row ${className}`}>
    {children}
    <span className="grid-marker"></span>
  </div>
);

export default GridGrow;
