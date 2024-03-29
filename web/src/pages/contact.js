import React from "react";
import Container from "../components/redesign/Container";
import Layout from "../containers/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

export const query = graphql`
  {
    allSanityContactPage {
      nodes {
        title
        _rawDescription(resolveReferences: { maxDepth: 10 })
      }
    }
  }
`;

const ContactPageRedesign = ({ data }) => {
  const content = data.allSanityContactPage.nodes[0];

  return (
    <Layout showPopupNewsletter={true} rnd={false} homes>
      <SEO title={content?.title ?? "Contact"} />
      <Container>
        <div className="text-mobile-body md:text-desktop-body tracking-body md:grid md:grid-cols-3 pr-mobile-menu md:pr-desktop-menu mb-10 md:mb-8">
          <div className="md:col-start-2 md:col-span-1 standard-text">
            <p className="mb-0">Email us:</p>
            <a className="mb-0" href="mailto:collective@home0001.com">
              collective@home0001.com
            </a>
            <p className="mt-9">
              85 Delancey Street,<br></br> New York, NY 10002
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ContactPageRedesign;
