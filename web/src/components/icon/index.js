import React from "react";
import EarthLogo from "./earth-rnd-logo";
import EarthLogoMobile from "./earth-rnd-logo-mobile";
import HamburgerIcon from "./hamburger";
import HamburgerRedIcon from "./hamburgerRed";
import Close from "./close";
import CloseBlack from "./closeBlack";

function Icon(props) {
  switch (props.symbol) {
    case "earthRndLogo":
      return <EarthLogo />;
    case "earthRndLogoMobile":
      return <EarthLogoMobile />;
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
