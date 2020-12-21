import * as React from "react";
import Container from "../../components/container";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";
import CalendlyScheduler from "../../components/CalendlyScheduler";

export default () => (
  <Layout>
    <SEO title={"success"} description={"success"} keywords={[]} />
    <Container>
      <h1>
        Deposit received – thank you. 
      </h1>
      <p>Next, let us know a bit more about what you’re looking for.</p>

      <CalendlyScheduler />
    </Container>
  </Layout>
);
