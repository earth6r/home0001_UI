import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { InlineWidget } from "react-calendly";
import GridRow from "../components/grid/grid-row";

export const query = graphql`
  query BookingPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    allSanityLanding {
      edges {
        node {
          _rawContent(resolveReferences: { maxDepth: 20 })
        }
      }
    }
  }
`;

const BookingPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const {
    main: { modules, slug },
    meta,
  } = data.allSanityLanding.edges[0].node._rawContent;

  

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
        image={meta.openImage}
      />
      <Container className="rte-large">
        <GridRow>
          <InlineWidget
            pageSettings={{
              backgroundColor: "ffffff",
              hideEventTypeDetails: true,
              hideLandingPageDetails: true,
              primaryColor: "000000",
              textColor: "000000",
              font: "GP",
              fontWeight: "normal",
            }}
            prefill={{
              customAnswers: {
                a1: "",
                a10: "a10",
                a2: "a2",
                a3: "a3",
                a4: "a4",
                a5: "a5",
                a6: "a6",
                a7: "a7",
                a8: "a8",
                a9: "a9",
              },
              email: "test@test.com",
              firstName: "Jon",
              lastName: "Snow",
              name: "Jon Snow",
            }}
            styles={{
              height: "1000px",
              color: "#000000",
              textColor: "#000000",
              primaryColor: "#000000",
            }}
            url="https://calendly.com/earthcollective?text_color=000000&primary_color=000000"
            utm={{
              utmCampaign: "Signup",
              utmContent: "Shoe and Shirts",
              utmMedium: "Ad",
              utmSource: "Facebook",
              utmTerm: "Spring",
            }}
          />
        </GridRow>
        <GridRow />
      </Container>
    </Layout>
  );
};

export default BookingPage;
