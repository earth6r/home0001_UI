import * as React from "react";
import { PopupText } from "react-calendly";
import Container from "../../components/container";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";

export default () => (
  <Layout>
    <SEO title={"success"} description={"success"} keywords={[]} />
    <Container>
      <h1>Success!</h1>

      <PopupText
        text="Click here to schedule a time to discuss your purchase"
        url="https://calendly.com/earthcollective?text_color=000000&primary_color=000000"
      />
    </Container>
  </Layout>
);
