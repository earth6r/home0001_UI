/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/css/index.css";
import React from "react";
// import { withPrefix } from "gatsby";
import "focus-visible/dist/focus-visible";
// import LoadingScreen from "./src/components/loading-screen";

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

// export const onRenderBody = ({ setPostBodyComponents }) => {
//   setPostBodyComponents([
//     <script src={withPrefix('js/replace.js')} key="replaceURL" />
//   ])
// }

// export const onPreRenderHTML = ({ getPostBodyComponents, replacePostBodyComponents }) => {
//   let postBodyComponents = getPostBodyComponents()
//   postBodyComponents.sort((a, b) => {
//     if (a.key === 'replaceURL') {
//       return 1
//     }
//     if (b.key === 'replaceURL') {
//       return -1
//     }
//     return 0
//   })
//   replacePostBodyComponents(postBodyComponents)
// }

export const wrapRootElement = ({ element, props }) => {
  return (
    <Elements options={ELEMENTS_OPTIONS} stripe={stripePromise} {...props}>
//      <LoadingScreen />
      {element}
    </Elements>
  );
};
