import React from "react";

const strokeStyle = { vectorEffect: "non-scaling-stroke" };

const CloseBlack = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="0" x2="14" y2="14" stroke="black" strokeWidth="2" />
    <line x1="14" y1="0" x2="0" y2="14" stroke="black" strokeWidth="2" />
  </svg>
);

export default CloseBlack;
