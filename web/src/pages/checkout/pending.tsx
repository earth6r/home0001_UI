import * as React from "react";
import Container from "../../components/container";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";
export default () => (
  <Layout>
    <SEO title={"pending"} description={"pending"} keywords={[]} />
    <Container>
      <h1>
        Your order is currently pending. You will receive a notification once the transaction has
        been processed.
      </h1>
    </Container>
  </Layout>
);
