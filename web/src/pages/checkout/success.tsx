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
        <div className="pt-6 pb-6">
          Deposit received – thank you.
        </div>


        <CalendlyScheduler />
      </Container>
    </Layout>
  )
};
