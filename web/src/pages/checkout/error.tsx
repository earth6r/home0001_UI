import * as React from "react";
import Container from "../../components/container";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";
export default () => (
  <Layout>
    <SEO title={"error"} description={"error"} keywords={[]} />
    <Container>
      <h1>There was an error processing your payment</h1>
    </Container>
  </Layout>
);
