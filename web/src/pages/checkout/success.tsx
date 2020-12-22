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
        Deposit received – thank you. Next, let us know a bit more about what you’re looking for.
      </h1>


      <CalendlyScheduler />
    </Container>
  </Layout>
);
