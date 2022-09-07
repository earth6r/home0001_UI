import React from "react";
import HamburgerIcon from "./hamburger";
import HamburgerRedIcon from "./hamburgerRed";
import Close from "./close";
import CloseBlack from "./closeBlack";

function Icon(props) {
  switch (props.symbol) {
    case "hamburger":
      return <HamburgerIcon />;
    case "hamburgerRed":
      return <HamburgerRedIcon />;
    case "close":
      return <Close />;
    case "closeBlack":
      return <CloseBlack />;
    default:
      return <span>Unknown icon: {props.symbol}</span>;
  }
}

export default Icon;
