import * as React from "react";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
export default () => (
  <Layout>
    <SEO title={site.title} description={site.description} keywords={site.keywords} />
    <Container>
      <h1>Success!</h1>
    </Container>
  </Layout>
);
