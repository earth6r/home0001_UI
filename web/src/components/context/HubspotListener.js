import { useEffect, createContext } from "react";

export const HubspotContext = createContext();

export function HubspotTrackingLister() {
  let _hsq = (window._hsq = window._hsq || []);

  const sendPageView = location => {
    _hsq.push(["setPath", location.pathname]);
    _hsq.push(["trackPageView"]);
  };

  useEffect(() => {
    sendPageView(location);
  }, [location.pathname]);

  return <HubspotContext.Provider>{children}</HubspotContext.Provider>;
}
