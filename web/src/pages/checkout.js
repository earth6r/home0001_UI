import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
// import CartOverview from "../components/cart-overview";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
import CheckoutForm from "../components/checkout-form";

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query CheckoutPageQuery {
    sanityCheckout {
      _rawContent(resolveReferences: { maxDepth: 10 })
    }
  }
`;

const CheckoutPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const {
    main: { modules, slug },
    meta,
  } = data.sanityCheckout._rawContent;

  return (
    <Layout>
      <SEO title={"checkout"} description={"checkout"} keywords={[]} />
      <Container>
        <div className="flex flex-wrap">{RenderModules(modules)}</div>
        <Elements options={ELEMENTS_OPTIONS} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Container>
    </Layout>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "fonts/fonts.css",
    },
  ],
};

export default CheckoutPage;
