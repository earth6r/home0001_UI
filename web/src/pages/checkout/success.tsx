import * as React from "react";
import Container from "../../components/container";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";
export default () => (
  <Layout>
    <SEO title={"success"} description={"success"} keywords={[]} />
    <Container>
      <h1>Success!</h1>
    </Container>
  </Layout>
);
