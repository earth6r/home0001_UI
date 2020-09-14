import React from "react";
import { graphql } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import PortableText from "../components/portableText";
import { Link } from "gatsby";

export const query = graphql`
  query StaffPageQuery {
    posts: allSanityStaff {
      edges {
        node {
          id
          staff: _rawStaff(resolveReferences: { maxDepth: 10 })
          slug {
            current
          }
        }
      }
    }
  }
`;

const StaffPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);
  const staff = postNodes[0] && postNodes[0].staff;
  console.log(staff);

  return (
    <Layout>
      <SEO title="Staff" />
      <Container className="flex flex-col md:flex-row">
        <aside className="bg-aside md:w-2/6">
          <div className="px-desktop">
            <div className="spacer" />
            <h1>Staff</h1>
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
        <div className="px-desktop py-desktop md:py-0 md:w-4/6 flex-1">
          {staff &&
            staff.length > 0 &&
            staff.map((node) => {
              console.log(node);
              return (
                <div>
                  <div className="spacer" />
                  <h2>{node.title}</h2>
                  <PortableText blocks={node.description} />
                </div>
              );
            })}
        </div>
      </Container>
    </Layout>
  );
};

export default StaffPage;
