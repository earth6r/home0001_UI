import { Link } from "gatsby";
import * as React from "react";
import Container from "../../components/container";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";
export default () => (
  <Layout>
    <SEO title={"error"} description={"error"} keywords={[]} />
    <Container>
      <div className="standard-text sm:w-5/6 mt-24">
        <p>There was an error processing your payment.</p>
        <p>
          If you'd like to start the checkout process over again,{" "}
          <Link to="/checkout/membership">click here</Link> to return to the checkout page.
        </p>
      </div>
    </Container>
  </Layout>
);
