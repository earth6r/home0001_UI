import React from "react";
import LogoIcon from "./icon/logo";

const LoadingScreen = ({ animate }) => {
  return (
    <div
      style={{ zIndex: "9999" }}
      className="w-full pointer-events-none fixed top-0 left-0 h-screen"
    >
      <div
        className={`${
          animate !== false ? "load-animation" : ""
        } mx-mobile md:mx-desktop mt-mobile md:mt-desktop z-10 relative}mx-mobile md:mx-desktop mt-mobile md:mt-desktop z-10 relative`}
      >
        <LogoIcon />
      </div>

      <div
        className={`${
          animate !== false ? "animate-out1s" : ""
        } w-full pointer-events-none absolute top-0 left-0 h-screen bg-white z-0`}
      ></div>
    </div>
  );
};

export default LoadingScreen;
