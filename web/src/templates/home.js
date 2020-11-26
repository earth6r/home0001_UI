import React, { useRef, useState } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import PortableText from "../components/portableText";
import { PageLink } from "../components/link";
import GridRow from "../components/grid/grid-row";
import { RichTable } from "../components/global/richTable";
import Figure from "../components/Figure";
import { Header } from "../components/global/header";

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Modal,
  Collapse,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";
// import { InlineWidget } from "react-calendly";

export const query = graphql`
  query HomeQuery($id: String!) {
    page: sanityHome(id: { eq: $id }) {
      _rawContent(resolveReferences: { maxDepth: 20 })
      _rawSpecSheet(resolveReferences: { maxDepth: 10 })
      _rawUnits(resolveReferences: { maxDepth: 10 })
      _rawHomeModules(resolveReferences: { maxDepth: 10 })
      unitsSubtitle
      unitsTitle
    }
  }
`;

const HomeTemplate = (props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef();
  const { data, errors } = props;
  const page = data && data.page;
  const {
    main: { modules, slug },
    meta,
  } = page._rawContent;
  const homeModules = page._rawHomeModules;
  const specs = page._rawSpecSheet;
  const units = page._rawUnits;
  const unitsTitle = page.unitsTitle;
  const unitsSubtitle = page.unitsSubtitle;
  // \console.log(data);

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout isHome={slug.current}>
      {/*<SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
        image={meta.openImage}
      />*/}
      <Container className="flex flex-col">
        <div className="flex flex-wrap w-full pt-12 lg:pt-10">{RenderModules(modules, specs)}</div>
        <>{unitsTitle && unitsSubtitle && <Header title={unitsTitle} number={unitsSubtitle} />}</>

        <Accordion allowMultiple={false} className="max-w-4xl w-full">
          {units &&
            units.map((item) => {
              return (
                <React.Fragment key={item._key}>
                  <AccordionItem
                    defaultIsOpen={false}
                    className={`${
                      item.sold == 1 ? "pointer-events-none" : ""
                    } border-none relative block box accordion accordion-home rounded-md mb-1em`}
                  >
                    {({ isExpanded }) => (
                      <>
                        <AccordionHeader
                          className={`${item.sold == 1 ? "opacity-25" : ""} ${
                            isExpanded ? "text-black" : ""
                          } relative flex h-2em p-0 pt-1/4em pl-1/2em border-none`}
                        >
                          <h3 className={` m-0 mr-1em -mt-1/4em md:mt-0`}>{item.title}</h3>
                          {item.unit && (
                            <span className=" m-0 mr-1em -mt-1/4em md:mt-0">
                              <span>Unit </span>
                              {item.unit}
                            </span>
                          )}
                          {item.bedrooms && (
                            <span className=" m-0 mr-1em text-mobileCaption md:text-desktopBody -mt-1/4em md:mt-0">
                              {item.bedrooms}
                            </span>
                          )}
                          {item.price && (
                            <span className="text-mobileCaption md:text-desktopBody text-left m-0 mr-1em -mt-1/4em md:mt-0">
                              {item.price}
                            </span>
                          )}
                          {item.sold == 1 ? (
                            <span className=" md:left-0 md:relative text-mobileCaption md:text-desktopBody -mt-1/4em md:mt-0">
                              Sold
                            </span>
                          ) : (
                            <span className=" md:left-0 md:relative text-mobileCaption md:text-desktopBody -mt-1/4em md:mt-0">
                              Available
                            </span>
                          )}

                          {!item.sold && (
                            <div
                              style={{ marginTop: "-0.15em" }}
                              className="right-0 absolute pr-1em md:mt-0"
                            >
                              {isExpanded ? "–" : "+"}
                            </div>
                          )}
                        </AccordionHeader>
                        <AccordionPanel className="pb-1em">
                          <div>
                            {item.text && <PortableText blocks={item.text} />}
                            {item.floorPlan && (
                              <div className="max-w-sm mx-auto mb-2em">
                                <Figure node={item.floorPlan} />
                              </div>
                            )}
                            {item.floorPlanCaption && (
                              <div className="mb-1em">
                                <PortableText blocks={item.floorPlanCaption} />
                              </div>
                            )}
                            {item.sold !== 1 && (
                              <PageLink
                                className="box box-black rounded-md w-full block text-center leading-none h-2em pt-1/4em flex items-center justify-center text-mobileBody md:text-desktopBody "
                                to={`/checkout/${slug.current}/?sku=HOME123`}
                              >
                                Reserve Now
                              </PageLink>
                            )}
                          </div>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </React.Fragment>
              );
            })}
        </Accordion>

        {homeModules && (
          <div className="pt-1em flex flex-wrap w-full">
            <GridRow />
            {RenderModules(homeModules, specs)}
          </div>
        )}
        <GridRow />
      </Container>
    </Layout>
  );
};

export default HomeTemplate;
