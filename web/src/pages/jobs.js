import React from "react";
import { graphql, Link } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import PortableText from "../components/portableText";
import { Accordion, AccordionItem, AccordionItemBody } from "react-accordion-container";

export const query = graphql`
  query JobsPageQuery {
    posts: allSanityJob {
      edges {
        node {
          id
          _key
          name
          _rawDescription
          location {
            name
          }
          slug {
            current
          }
        }
      }
    }
  }
`;

const JobsPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);
  console.log(data);

  return (
    <Layout>
      <SEO title="Jobs" />
      <Container className="flex flex-col md:flex-row">
        <aside className="bg-aside md:w-2/6">
          <div className="px-desktop">
            <div className="spacer" />
            <h1>Jobs</h1>
            <nav>
              <ul>
                <li className="border-b border-black py-2">
                  <Link to="/galleries">Locations</Link>
                </li>
                <li className="border-b border-black py-2">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="border-b border-black py-2">
                  <Link to="/staff">Our Staff</Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <div className="md:w-4/6 flex-1">
          <Accordion>
            {data.posts.edges &&
              data.posts.edges.map((job) => {
                const g = job.node;
                console.log(g.location);
                return (
                  <AccordionItem key={g.id}>
                    {({ isActive, onClick }) => (
                      <div className="border-b border-black py-desktop">
                        <div className="px-desktop">
                          <div role="button" onClick={onClick}>
                            <h2>
                              <span>{g.name}</span>
                              {g.location.name && (
                                <span className="text-subtitle pt-1 block text-lg">
                                  {g.location.name}
                                </span>
                              )}
                            </h2>
                          </div>

                          <AccordionItemBody>
                            <div>
                              <PortableText blocks={g._rawDescription} />
                            </div>
                          </AccordionItemBody>
                        </div>
                      </div>
                    )}
                  </AccordionItem>
                );
              })}
          </Accordion>
        </div>
      </Container>
    </Layout>
  );
};

export default JobsPage;
