import React from "react";
import { Checkout } from "gatsby-theme-stripe-checkout-button";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";

const CheckoutPage = (props) => {
  return (
    <Layout>
      <SEO title={"checkout"} description={"checkout"} keywords={[]} />
      <Container>
        <h1>Purchase Now</h1>
        <p>
          By purchasing now, we’ll take a reservation deposit and then setup an appointment to
          discuss how to buy the home.
        </p>
        <Checkout
          button={<button type="submit" text="Buy Now!" />}
          sku="sku_123"
          quantity={1}
          customerEmail={`customer@email.com`}
        />
      </Container>
    </Layout>
  );
};

export default CheckoutPage;
