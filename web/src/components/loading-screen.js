import React from "react";
import LogoIcon from "./icon/logo";

const LoadingScreen = () => {
  return (
    <div
      style={{ zIndex: "9999" }}
      className="w-full pointer-events-none fixed top-0 left-0 h-screen"
    >
      <div className="mx-mobile md:mx-desktop mt-mobile md:mt-desktop load-animation z-10 relative">
        <LogoIcon />
      </div>
      <div className="w-full pointer-events-none absolute top-0 left-0 h-screen animate-out1s bg-white  z-0"></div>
    </div>
  );
};

export default LoadingScreen;
