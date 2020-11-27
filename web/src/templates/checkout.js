import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { graphql } from "gatsby";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
// import getMemberPrice from "../utils/get-member-price";
// import CheckoutForm from "../components/checkout-form";
import CheckoutCreate from "../components/checkout-create";
import GridRow from "../components/grid/grid-row";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
export const query = graphql`
  query CheckoutQuery($id: String!) {
    checkout: sanityCheckout(id: { eq: $id }) {
      _rawGdpr(resolveReferences: { maxDepth: 10 })
      _rawContent(resolveReferences: { maxDepth: 20 })
    }
  }
`;

const CheckoutTemplate = (props) => {
  const { path, data, errors } = props;
  const page = data && data.checkout;
  const {
    main: { modules, slug },
    meta,
  } = page._rawContent;
  const { _rawGdpr } = data.checkout;
  if(typeof window !== `undefined`){
    const searchParams = new URLSearchParams(window.location.search);
    const membershipRoute = path.replace(/(?:^\/|\/$)/g, "") === "checkout/membership";
    const sku = membershipRoute ? "MEMB123" : searchParams.get("sku");
    const checkoutId = membershipRoute ? "ABCDEFG" : searchParams.get("checkoutId");

  } else{
    const sku = ""
    const checkoutId = ""
  }
  // TODO membership SKU/checkoutId
 
  // const membershipRoute = path.replace(/(?:^\/|\/$)/g, "") === "checkout/membership";
  // const { sku, checkoutId } = membershipRoute
  //   ? { sku: "MEMB123", checkoutId: "ABCDEFG" }
  //   : location.state;

  return (
    <Layout>
      <SEO
        title={"EARTH Membership"}
        description={"Join the EARTH collective"}
        keywords={["Earth", "Membership"]}
      />
      <Container>
        <div className="flex flex-wrap w-full">{RenderModules(modules)}</div>

        {/* <CheckoutForm
          price={getMemberPrice(false)}
          terms={_rawGdpr}
          onSuccessfulCheckout={() => Router.push("/success")}
        /> */}

        <CheckoutCreate sku={sku} checkoutId={checkoutId} stripePromise={stripePromise} />

        <GridRow />
      </Container>
    </Layout>
  );
};

export default CheckoutTemplate;
