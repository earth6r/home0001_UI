import React from "react";

const strokeStyle = { vectorEffect: "non-scaling-stroke" };

const HamburgerIcon = () => (
  <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0.5" y1="1" x2="60" y2="1" stroke="black" strokeWidth="4" />
    <line x1="0.5" y1="20" x2="60" y2="20" stroke="black" strokeWidth="4" />
    <line x1="0.5" y1="39" x2="60" y2="39" stroke="black" strokeWidth="4" />
  </svg>
);

export default HamburgerIcon;
