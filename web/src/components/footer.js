import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import { StaticQuery, graphql } from "gatsby";
import PortableText from "./portableText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

/*

*/

const Footer = () => {
  const query = "";
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          allSanityGallery {
            edges {
              node {
                name
                hours {
                  open
                  day
                  closed
                }
                slug {
                  current
                }
                _rawLocation
              }
            }
          }
        }
      `}
      render={(data) => {
        console.log(data);
        const galleries = data.allSanityGallery.edges;
        const galleryList = [];
        const locations = ["New York", "London", "Paris", "Hong Kong"];

        return (
          <footer className="container text-white text-center">
            <div className="bg-darkGray">
              <Tabs>
                <TabList className="flex justify-center py-desktop">
                  <Tab className="tab mx-2">New York</Tab>
                  <Tab className="tab mx-2">London</Tab>
                  <Tab className="tab mx-2">Paris</Tab>
                  <Tab className="tab mx-2">Hong Kong</Tab>
                </TabList>

                {/*
               {galleries &&
                  galleries.map((gallery) =>
                    locations.map((location) => {
                      if (gallery.node.name.indexOf(location) > -1) {
                        return (
                          <TabPanel>
                            {gallery.node.slug.current && (
                              <>
                                <Link to={`/galleries/${gallery.node.slug.current}`}>
                                  <h1>{gallery.node.name}</h1>
                                </Link>
                                <address className="text-gray not-italic">
                                  <PortableText blocks={gallery.node._rawLocation} />
                                </address>
                              </>
                            )}
                          </TabPanel>
                        );
                      }
                    })
                  )}
                                */}

                {locations.map((location) => (
                  <TabPanel>
                    <div className="md:flex justify-center md:px-desktop">
                      {galleries &&
                        galleries.map((gallery, i) => {
                          if (gallery.node.name.indexOf(location) > -1) {
                            return (
                              <div className="md:px-desktop py-10 my-5 md;h-40 border-b md:border-b-0 md:border-r border-dark tab-content">
                                {gallery.node.slug.current && (
                                  <>
                                    <Link to={`/galleries/${gallery.node.slug.current}`}>
                                      <h1>{gallery.node.name}</h1>
                                    </Link>
                                    <address className="text-gray not-italic">
                                      <PortableText blocks={gallery.node._rawLocation} />
                                    </address>
                                  </>
                                )}
                              </div>
                            );
                          }
                        })}
                    </div>
                  </TabPanel>
                ))}
              </Tabs>
              <ul className="md:flex justify-center border-t border-b border-dark py-2 mt-desktop">
                <li className="mx-3">Twitter</li>
                <li className="mx-3">Facebook</li>
                <li className="mx-3">Instagram</li>
                <li className="mx-3">Weibo</li>
                <li className="mx-3">WeChat</li>
              </ul>
              <div className="border-b  border-dark py-desktop">
                <button className="button button--dark">Newsletter</button>
              </div>
              <ul className="text-sm flex justify-center py-4">
                <li className="mx-2">
                  <a href="#">David Zwirner</a>, All rights reserved {new Date().getFullYear()},
                </li>
                <li className="mx-2">Terms &amp; Conditions</li>
                <li className="mx-2">Privacy Policy</li>
              </ul>
            </div>
          </footer>
        );
      }}
    />
  );
};

export default Footer;
