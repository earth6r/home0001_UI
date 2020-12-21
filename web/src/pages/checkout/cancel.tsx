import * as React from "react";
import Container from "../../components/container";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";

export default () => (
  <Layout>
    <SEO title={"cancel"} description={"cancel"} keywords={[]} />
    <Container>
      <p>Your purchase has been cancelled.</p>
    </Container>
  </Layout>
);
