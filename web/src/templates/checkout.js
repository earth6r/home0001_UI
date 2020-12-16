// web/src/templates/checkout.js

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { graphql } from "gatsby";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import CheckoutCreate from "../components/checkout-create";
import GridRow from "../components/grid/grid-row";
import PaymentContext from "../lib/payment-context";

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
            bitPayID
            bitPayIDDiscounted
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

const CheckoutOptions = ({ ssr, children }) => {
  if (!ssr) return null;
  return <>{children}</>;
};

const CheckoutActions = ({ unit, children }) => {
  if (unit && unit.sold) return <Unavailable />;
  return <>{children}</>;
};

const CheckoutDescription = ({ unit, modules, children }) => {
  if (unit) {
    return (
      <>
        <div className="flex flex-wrap w-full">
          {RenderModules([modules[0]]) /* Only render header */}
          <div className="w-full relative z-20" style={{ marginLeft: "-.04em" }}>
            <h1>Reserve unit {unit.title}</h1>
          </div>
        </div>
        {children}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap w-full">{RenderModules(modules)}</div>
      {children}
    </>
  );
};

const CheckoutTemplate = (props) => {
  const { data, errors } = props;
  const page = data && data.checkout;
  const ssr = typeof window !== `undefined`;
  const {
    main: { modules, slug },
    meta,
  } = page._rawContent;
  const { _rawGdpr } = data.checkout;

  let home;
  let unit;
  let sku;
  let bitPayID;
  let bitPayIDDiscounted;

  if (ssr) {
    const searchParams = new URLSearchParams(window.location.search);

    sku = searchParams.get("sku");
    bitPayID = searchParams.get("bitPayID");

    const homes = (data.homes.edges || []).map(({ node }) => node);

    if (sku) {
      // Select the requested unit based on query string params,
      // since routes aren't set up for specific units. If there is
      // no unit, or the unit is unavailable, the checkout renders
      // the default membership item
      home = homes.find(({ units }) => {
        unit = units.find((unit) => unit.stripeSKU === sku);
        return unit;
      });

      bitPayIDDiscounted = unit.bitPayIDDiscounted;
    }

    // Set default membership item
    if (!sku || !home || !unit) {
      sku = "MEMB001";
      // TODO add generic membership id
      // TODO add generic discounted membership id
      bitPayID = "ABCDEFG";
      bitPayIDDiscounted = "xxxxx";
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
        <CheckoutOptions ssr={ssr}>
          <CheckoutActions unit={unit}>
            <CheckoutDescription unit={unit} modules={modules}>
              <PaymentContext.Consumer>
                {({ discount, discountCode }) => (
                  <CheckoutCreate
                    home={home}
                    unit={unit}
                    sku={sku}
                    bitPayID={discount ? bitPayIDDiscounted : bitPayID}
                    discount={discount}
                    discountCode={discountCode}
                    stripePromise={stripePromise}
                  />
                )}
              </PaymentContext.Consumer>
            </CheckoutDescription>
          </CheckoutActions>
        </CheckoutOptions>

        <GridRow />
      </Container>
    </Layout>
  );
};

export default CheckoutTemplate;
