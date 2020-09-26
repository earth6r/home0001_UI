import React, { useState } from "react";
// import { graphql } from "gatsby";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import MailChimpForm from "../components/mailchimp-form";

const WaitlistPage = (props) => {
  return (
    <Layout>
      <Container>
        <MailChimpForm />
      </Container>
    </Layout>
  );
};

export default WaitlistPage;
