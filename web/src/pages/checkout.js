import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import getMemberPrice from "../utils/get-member-price";
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
        <CheckoutForm
          price={getMemberPrice(false)}
          onSuccessfulCheckout={() => Router.push("/success")}
        />
      </Container>
    </Layout>
  );
};

export default CheckoutPage;
