import React from "react";
import { graphql, Link } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
//import BlogPostPreviewGrid from "../components/blog-post-preview-grid";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import PortableText from "../components/portableText";
import { Accordion, AccordionItem, AccordionItemBody } from "react-accordion-container";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

export const query = graphql`
  query GalleriesPageQuery {
    posts: allSanityGallery(
      sort: { fields: [name], order: DESC }
      filter: { slug: { current: { ne: null } } }
    ) {
      edges {
        node {
          id
          image {
            ...SanityImage
            alt
          }
          _key
          name
          _rawLocation
          _rawHoursInformation
          _rawDescription
          _rawContact
          _rawHours
          slug {
            current
          }
        }
      }
    }
  }
`;

const GalleriesPage = (props) => {
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
      <SEO title="Galleries" />
      <Container className="flex flex-col md:flex-row">
        <aside className="bg-aside md:w-2/6">
          <div className="px-desktop">
            <div className="spacer" />
            <h1>Galleries</h1>
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
              data.posts.edges.map((gallery) => {
                const g = gallery.node;
                return (
                  <AccordionItem key={g.id}>
                    {({ isActive, onClick }) => (
                      <div className="border-b border-black">
                        <div className="px-desktop">
                          <div role="button" className="py-desktop" onClick={onClick}>
                            <h2>{g.name}</h2>
                            <PortableText blocks={g._rawLocation} />
                          </div>

                          <AccordionItemBody>
                            {g.image && g.image.asset && (
                              <div className="pb-desktop mb-desktop">
                                <img
                                  src={imageUrlFor(buildImageObj(g.image))
                                    .width(1200)
                                    .height(Math.floor((9 / 16) * 1200))
                                    .fit("crop")
                                    .auto("format")
                                    .url()}
                                  alt={g.image.alt}
                                />
                                <div className="spacer" />
                                <div>
                                  <h3>Hours</h3>
                                  <PortableText blocks={g._rawHoursInformation} />
                                </div>
                                <div className="spacer" />
                                <div>
                                  <h3>Contact</h3>
                                  <ul>
                                    {g._rawContact.phone && (
                                      <li>
                                        <a href={`tel:${g._rawContact.phone}`}>
                                          {g._rawContact.phone}
                                        </a>
                                      </li>
                                    )}
                                    {g._rawContact.email && (
                                      <li>
                                        <a href={`mailto:${g._rawContact.email}`}>
                                          {g._rawContact.email}
                                        </a>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            )}
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

export default GalleriesPage;
