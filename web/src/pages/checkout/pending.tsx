import * as React from "react";
import Container from "../../components/container";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";
import { Link } from "gatsby";
import ReactGA from 'react-ga';

export default () => {
  // Collect CTA analytics
  ReactGA.event({
    category: 'Conversion',
    action: 'Bitpay Pending',
    label: typeof window != `undefined` && window.location.search ? window.location.search : "",
  });

  return (
    <Layout>
      <SEO title={"pending"} description={"pending"} keywords={[]} />
      <Container>
        <div className="standard-text">
          <h1>Thank you. Your order is currently pending.</h1>
          <p>
            If you completed the checkout process, you will receive an email notification once the transaction has been processed.
            <br />
            <br />
            If you closed the checkout before you finished and you need to start the process over
            again, <Link to="/checkout/membership">click here</Link> to return to the checkout page.
          </p>
        </div>
      </Container>
    </Layout>
  )
};
