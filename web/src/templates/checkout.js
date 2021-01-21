import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { graphql, Link } from "gatsby";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import CheckoutCreate from "../components/checkout-create";
import GridRow from "../components/grid/grid-row";
import PaymentContext from "../lib/payment-context";
import MembershipPrice from "../components/global/membershipPrice";

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

const DiscountNotice = ({ discountCode }) => {
  if (!discountCode || discountCode !== "balaji") return (
    <div className="discount-container mb-1">
      <div className="spring-green-line"></div>
      <span className="spring-green">$300</span>
    </div>
    );
  return (<div className="discount-container mb-1">
    <div className="spring-green-line"></div>
    <span className="spring-green">$200</span>
    </div>)
};

const ValueAdded = ({ discount, discountCode, unitTitle }) => (
  <>
    <h1 className="mb-0">Membership Deposit: <MembershipPrice discount={discount} />{" "}
    <DiscountNotice discountCode={discountCode} />
    <br />
    </h1>
    {unitTitle &&
      <p className="mb-0">Reserve unit {unitTitle}</p>
    }
    <p>
    Deducted from your home purchase.
    <br />
    Fully refundable any time, for any reason.
  </p>
  </>
);

const CheckoutOptions = ({ /*ssr, */ children }) => {
  // if (ssr) return null;
  return <>{children}</>;
};

const CheckoutActions = ({ unit, children }) => {
  if (unit && unit.sold) return <Unavailable />;
  return <>{children}</>;
};

const CheckoutDescription = ({ unit, modules, children, discount, discountCode }) => {
  const [head, ...rest] = modules;

  if (unit) {
    return (
      <>
        <div className="flex flex-wrap w-full standard-text">
          {RenderModules([head])}

          <div className="w-full relative z-20" style={{ marginLeft: "-.04em" }}>
            
            <ValueAdded unitTitle={unit.title} discount={discount} discountCode={discountCode} />
            
          </div>

        </div>
        {children}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap w-full standard-text">
        {RenderModules([head])}

        <div className="w-full relative z-20" style={{ marginLeft: "-.04em" }}>
   
          <ValueAdded discount={discount} discountCode={discountCode} />
        </div>

      </div>
      {children}
    </>
  );
};

const CheckoutModules = ({ unit, modules, children, discount, discountCode }) => {
  const [head, ...rest] = modules;

  if (unit) {
    return (
      <>
        <div className="flex flex-wrap w-full standard-text">
          {RenderModules(rest)}
        </div>
        {children}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap w-full standard-text">
        

       
        {RenderModules(rest)}
      </div>
      {children}
    </>
  );
};

const CheckoutTemplate = (props) => {
  const { data, errors } = props;
  const page = data && data.checkout;
  const ssr = typeof window === "undefined";
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

  if (!ssr) {
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
      bitPayID = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_REGULAR_PRICE;
      bitPayIDDiscounted = process.env.GATSBY_BITPAY_MEMBERSHIP_ID_DISCOUNTED;
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
        <CheckoutOptions>
          <CheckoutActions unit={unit}>
            <PaymentContext.Consumer>
              {({ discount, discountCode }) => (
              <>
                <CheckoutDescription
                  unit={unit}
                  modules={modules}
                  discount={discount}
                  discountCode={discountCode}
                >
                  

                </CheckoutDescription>
                <CheckoutCreate
                    home={home}
                    unit={unit}
                    sku={sku}
                    bitPayID={discount ? bitPayIDDiscounted : bitPayID}
                    discount={discount}
                    discountCode={discountCode}
                    stripePromise={stripePromise}
                  />
                <CheckoutModules
                  unit={unit}
                  modules={modules}
                  discount={discount}
                  discountCode={discountCode}
                >
                  

                </CheckoutModules>
                </>
              )}
            </PaymentContext.Consumer>
          </CheckoutActions>
        </CheckoutOptions>

      </Container>
    </Layout>
  );
};

export default CheckoutTemplate;
