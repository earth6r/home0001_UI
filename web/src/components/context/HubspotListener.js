import React, { useEffect, createContext } from "react";
import { globalHistory } from "@reach/router";

export function HubspotTrackingLister({ children }) {
  useEffect(() => {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.id = "hs-script-loader";
    script.async = true;
    script.defer = true;
    script.src = "//js.hs-scripts.com/39987214.js";

    document.body.appendChild(script);

    const sendPageView = () => {
      let _hsq = (window._hsq = window._hsq || []);
      _hsq.push(["setPath", window.location.pathname]);
      _hsq.push(["trackPageView"]);
      console.log("set new path: ", window.location.pathname);
    };
    sendPageView();
    return globalHistory.listen(({ action }) => {
      if (action === "PUSH") sendPageView();
    });
  }, []);

  return <>{children}</>;
}
