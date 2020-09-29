/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
import { CartProvider } from "use-shopping-cart";

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
        {element}
      </CartProvider>
    </Elements>
  );
};
