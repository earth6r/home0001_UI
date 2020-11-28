// web/src/templates/checkout.js

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
  query CheckoutAndHomes($id: String!) {
    checkout: sanityCheckout(id: { eq: $id }) {
      _rawGdpr(resolveReferences: { maxDepth: 10 })
      _rawContent(resolveReferences: { maxDepth: 20 })
    }

    homes: allSanityHome {
      edges {
        node {
          units {
            stripeSKU
            sold
            text {
              _rawChildren
            }
            title
            bedrooms
            checkoutId
            price
            _rawFloorPlan
            _rawFloorPlanCaption
            _rawText
            _type
            _key
          }
          unitsSubtitle
          unitsTitle
        }
      }
    }
  }
`;

const Unavailable = () => (
  <div className="w-full relative z-20 pt-1em pb-1em">
    <p>That unit is currently unavailable. Please select another unit</p>
  </div>
);

const CheckoutTemplate = (props) => {
  console.log(props);
  const { data, errors } = props;
  const page = data && data.checkout;
  const ssr = typeof window !== `undefined`;
  const {
    main: { modules, slug },
    meta,
  } = page._rawContent;
  const { _rawGdpr } = data.checkout;

  let sku;
  let checkoutId;

  if (ssr) {
    const searchParams = new URLSearchParams(window.location.search);

    sku = searchParams.get("sku");
    checkoutId = searchParams.get("checkoutId");
    const discount = searchParams.get("discount") === "balaji";

    const homes = (data.homes.edges || []).map(({ node }) => node);

    let home;
    let unit;
    if (sku) {
      // Select the requested unit based on query string params,
      // since routes aren't set up for specific units. If there is
      // no unit, or the unit is unavailable, the checkout renders
      // the default membership item
      home = homes.find(({ units }) => {
        unit = units.find((unit) => unit.stripeSKU === sku);
        return unit;
      });
    }

    // Set default membership item
    if (!sku || !home || !unit) {
      sku = "MEMB123";
      checkoutId = "ABCDEFG";
    }
  }

  return (
    <Layout>
      <SEO
        title={"EARTH Membership"}
        description={"Join the EARTH collective"}
        keywords={["Earth", "Membership"]}
      />
      <Container>
        <div className="flex flex-wrap w-full">{RenderModules(modules)}</div>

        {ssr && (
          <>
            {unit && unit.sold ? (
              <Unavailable />
            ) : (
              <CheckoutCreate
                home={home}
                unit={unit}
                sku={sku}
                checkoutId={checkoutId}
                discount={discount}
                stripePromise={stripePromise}
              />
            )}
          </>
        )}

        <GridRow />
      </Container>
    </Layout>
  );
};

export default CheckoutTemplate;
