/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/css/index.css";
import React from "react";
import "focus-visible/dist/focus-visible";
// import LoadingScreen from "./src/components/loading-screen";
import PaymentContext from "./src/lib/payment-context";
import { DISCOUNT_CODES } from "./src/lib/constants";
import { trimSlashes } from "./src/lib/helpers";

//stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
const ELEMENTS_OPTIONS = {
  fonts: [
    {
      // cssSrc: "https://earth6r.com/fonts/GerstnerProgramm-Regular.woff2",
    },
  ],
};

export const wrapRootElement = ({ element, props }) => {
  const qs = new URLSearchParams(window.location.search);

  let discount = false;
  let discountCode = "";

  if (qs.has("discount") && DISCOUNT_CODES.has(qs.get("discount"))) {
    discount = true;
    discountCode = qs.get("discount");
  }

  // Handle redirects
  const { host, search } = window.location;
  const pathname = trimSlashes(window.location.pathname);
  const title = document.getElementsByTagName("title")[0].innerText;

  let animate = false;

  // if (host === "homes.earth6r.com" && pathname === "collective") {
  //   window.history.replaceState({}, title, "/");
  // } else if (host === "homes.earth6r.com" && pathname === "") {
  //   animate = false;
  //   window.location.replace(`https://homes.earth6r.com/collective`);
  // } else if (host === "earth6r.com" && pathname !== "") {
  //   animate = false;
  //   window.location.replace(`https://homes.earth6r.com/${pathname}${search}`);
  // }

  return (
    <PaymentContext.Provider value={{ discount, discountCode }}>
      <Elements options={ELEMENTS_OPTIONS} stripe={stripePromise} {...props}>
  //      <LoadingScreen animate={animate} />
        {element}
      </Elements>
    </PaymentContext.Provider>
  );
};
