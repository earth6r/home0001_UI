/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/css/index.css";
import React from "react";
import "focus-visible/dist/focus-visible";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY,
  {apiVersion: "2020-08-27"});
import { CartProvider } from "use-shopping-cart";
import LoadingScreen from "./src/components/loading-screen";
const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://earth6r.com/fonts/GerstnerProgramm-Regular.woff2",
    },
  ],
};

export const wrapRootElement = ({ element, props }) => {
  return (
    <Elements options={ELEMENTS_OPTIONS} stripe={stripePromise} {...props}>
      <CartProvider mode="checkout-session" stripe={stripePromise} currency="USD">
        <LoadingScreen />
        {element}
      </CartProvider>
    </Elements>
  );
};
