import React, { useEffect, useState } from "react";
import { trimSlashes } from "../lib/helpers";
import LogoIcon from "./icon/logo";

const LoadingScreen = ({ animate }) => {
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const { host } = window.location;
    const pathname = trimSlashes(window.location.pathname);
    const title = document.getElementsByTagName("title")[0].innerText;

    if (host === "homes.earth6r.com" && pathname === "collective") {
      window.history.replaceState({}, title, "/");
      setAnim(true);
    }
  }, []);

  return (
    <div
      style={{ zIndex: "9999" }}
      className="w-full pointer-events-none fixed top-0 left-0 h-screen"
    >
      <div
        className={`${
          animate !== false || anim ? "load-animation" : ""
        } mx-mobile md:mx-desktop mt-mobile md:mt-desktop z-10 relative}mx-mobile md:mx-desktop mt-mobile md:mt-desktop z-10 relative`}
      >
        <LogoIcon />
      </div>

      <div
        className={`${
          animate !== false || anim ? "animate-out1s" : ""
        } w-full pointer-events-none absolute top-0 left-0 h-screen bg-white z-0`}
      ></div>
    </div>
  );
};

export default LoadingScreen;
