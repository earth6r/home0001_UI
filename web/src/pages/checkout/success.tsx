import * as React from "react";
import Container from "../../components/container";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";
import CalendlyScheduler from "../../components/CalendlyScheduler";
// import ReactGA from 'react-ga';

export default () => {
  // Collect CTA analytics
  // ReactGA.event({
  //   category: 'Conversion',
  //   action: 'Stripe Completed',
  //   label: typeof window != `undefined` && window.location.search ? window.location.search : "",
  // });

  return (
    <Layout>
      <SEO title={"success"} description={"success"} keywords={[]} />
      <Container>
        <h1>
          Deposit received – thank you.
        </h1>


        <CalendlyScheduler />
      </Container>
    </Layout>
  )
};
