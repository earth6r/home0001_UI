import React from "react";
import { graphql } from "gatsby";
import { Checkout } from "gatsby-theme-stripe-checkout-button";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";

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

  const site = (data || {}).site;
  // const {
  //   main: { modules, slug },
  //   meta,
  // } = data.allSanityHome.edges[0].node._rawContent;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1>Purchase Now</h1>
        <p>
          By purchasing now, we’ll take a reservation deposit and then setup an appointment to
          discuss how to buy the home.
        </p>
        <Checkout
        button={<MyCustomButton type="submit" text="Buy Now!"/>}
        sku='sku_123'
        quantity={1}
        customerEmail={customer@email.com}
    />
      </Container>
    </Layout>
  );
};

export default CheckoutPage;
