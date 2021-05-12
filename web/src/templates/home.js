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
    main: { modules, slug, title },
    meta,
  } = page._rawContent;
  const homeModules = page._rawHomeModules;
  const specs = page._rawSpecSheet;
  const units = page._rawUnits;
  const unitsTitle = page.unitsTitle;
  const unitsSubtitle = page.unitsSubtitle;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout isHome={slug.current}>
      <SEO
        title={title}
      />
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
                          style={{ paddingTop: "0.35em" }}
                          className={`${item.sold == 1 ? "opacity-25" : ""} ${
                            isExpanded ? "text-black" : "text-black"
                          } relative flex h-2em  pl-1/2em border-none`}
                        >
                          {item.unit && (
                            <span className="w-1/4 text-left m-0  md:mt-0 homes-accordion-header-main">
                              <span>Unit </span>
                              {item.unit}
                            </span>
                          )}
                          {item.bedrooms && (
                            <span className="w-1/6 text-left m-0  text-mobileCaption md:text-base  md:mt-0 homes-accordion-header-small">
                              {item.bedrooms}
                            </span>
                          )}
                          {item.price && (
                            <span className="w-1/5 text-left text-mobileCaption md:text-base text-left m-0  md:mt-0 homes-accordion-header-small">
                              {item.price}
                            </span>
                          )}
                          {item.sold == 1 ? (
                            <span className="w-1/6 text-left md:left-0 md:relative text-mobileCaption md:text-base md:mt-0 homes-accordion-header-small">
                              Sold
                            </span>
                          ) : (
                            <span className="w-1/4 text-left md:left-0 md:relative text-mobileCaption md:text-base -mt-1/4em md:mt-0 homes-accordion-header-small">
                              Coming Soon
                            </span>
                          )}

                          {!item.sold && (
                            <div
                              style={{ marginTop: "-0.15em" }}
                              className="right-0 absolute pr-1em md:mt-0 homes-accordion-header-plus"
                            >
                              {isExpanded ? "–" : "+"}
                            </div>
                          )}
                        </AccordionHeader>
                        <AccordionPanel className="pb-1em">
                          <div>
                            {item.text && (
                              <div className="md:inline-block big-text align-top text-desktopCaptionSpecial md:w-4/12">
                                <PortableText blocks={item.text} />
                              </div>
                            )}
                            {item.floorPlan && (
                              <div className={`${item.floorPlanMobile ? "hidden" : "inline-block"} mb-0 mt-8 md:mt-0 text-left md:text-right floor-plan md:inline-block md:w-8/12`}>
                                <Figure className="" node={item.floorPlan} />

                              </div>
                            )}
                            {item.floorPlanMobile && (
                              <div className="mb-0 mt-8 md:mt-0 text-left md:text-right floor-plan inline-block md:hidden md:w-8/12">
                                <Figure className="" node={item.floorPlanMobile} />

                              </div>
                            )}
                            {item.floorPlanCaption && (
                              <div className="mb-1em text-left md:text-right px-2 floor-plan-cap text-desktopCaptionSpecial mt-0">
                                <PortableText blocks={item.floorPlanCaption} />
                              </div>
                            )}
                            {item.sold !== 1 && (
                              <PageLink
                                className="box mt-2em box-black rounded-md w-full block text-center leading-none h-2em flex items-center justify-center text-mobileBody md:text-desktopBody "
                                to={`/checkout/membership`}
                              >
                                Hold your spot
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

      </Container>
    </Layout>
  );
};

export default HomeTemplate;
