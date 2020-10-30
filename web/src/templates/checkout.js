import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
// import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
// import { InlineWidget } from "react-calendly";
import getMemberPrice from "../utils/get-member-price";
import CheckoutForm from "../components/checkout-form";
import GridRow from "../components/grid/grid-row";

export const query = graphql`
  query CheckoutQuery($id: String!) {
    checkout: sanityCheckout(id: { eq: $id }) {
      _rawGdpr(resolveReferences: { maxDepth: 10 })
      _rawContent(resolveReferences: { maxDepth: 20 })
    }
  }
`;

const CheckoutTemplate = (props) => {
  console.log(props);
  const { data, errors } = props;
  const page = data && data.checkout;
  const {
    main: { modules, slug },
    meta,
  } = page._rawContent;
  const {_rawGdpr} = data.checkout;
  // console.log(data);
  

  return (
    <Layout>
      {/*<SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
        image={meta.openImage}
      />*/}
      <Container>
        <div className="flex flex-wrap w-full">{RenderModules(modules)}</div>
        <CheckoutForm
          price={getMemberPrice(false)}
          terms={_rawGdpr}
          onSuccessfulCheckout={() => Router.push("/success")}
        />
        
        <GridRow />
      </Container>
    </Layout>
  );
};

export default CheckoutTemplate;
