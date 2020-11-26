import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { graphql } from "gatsby";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import getMemberPrice from "../utils/get-member-price";
import CheckoutForm from "../components/checkout-form";
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
  console.log("props--", props);

  const { path, data, errors } = props;
  const page = data && data.checkout;
  const {
    main: { modules, slug },
    meta,
  } = page._rawContent;
  const { _rawGdpr } = data.checkout;
  const query = new URLSearchParams(window.location.search);
  const sku =
    path.replace(/(?:^\/|\/$)/g, "") === "checkout/membership" ? "MEMB123" : query.get("sku");

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

        <CheckoutCreate sku={sku} stripePromise={stripePromise} />

        <GridRow />
      </Container>
    </Layout>
  );
};

export default CheckoutTemplate;
