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
  const specs = page._rawSpecSheet;
  const units = page._rawUnits;
  const unitsTitle = page.unitsTitle;
  const unitsSubtitle = page.unitsSubtitle;
  console.log(page);
  // \console.log(data);

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout>
      {/*<SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
        image={meta.openImage}
      />*/}
      <Container className="flex flex-col">
        <div className="flex flex-wrap w-full">{RenderModules(modules)}</div>
        <>{unitsTitle && unitsSubtitle && <Header title={unitsTitle} number={unitsSubtitle} />}</>
        {specs && (
          <Modal
            preserveScrollBarGap
            finalFocusRef={finalRef}
            isCentered={true}
            closeOnOverlayClick={false}
            size="full"
            scrollBehavior="inside"
            isOpen={isOpen}
            onClose={onClose}
            className="rounded-lg"
          >
            <ModalOverlay />
            <ModalContent className="rounded-lg">
              <ModalCloseButton zIndex={10} />
              <ModalBody className="rounded-lg">
                <h3 className="text-mobileBody md:text-desktopBody pb-2em">Specifications</h3>
                <GridRow />
                {specs && specs.map((spec) => <RichTable key={spec._key} data={spec} />)}
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
        <Accordion allowMultiple={false} className="max-w-4xl w-full">
          {units &&
            units.map((item, index) => (
              <React.Fragment key={item._key}>
                <AccordionItem
                  defaultIsOpen={false}
                  className="border-none relative block box rounded-lg"
                >
                  {({ isExpanded }) => (
                    <>
                      <AccordionHeader className="relative flex h-2em p-0 pt-1/4em pl-1/2em border-none">
                        <h3 className="m-0 mr-1em">{item.title}</h3>
                        {item.unit && (
                          <span className="hidden md:hidden lg:block m-0 mr-1em w-2em">
                            {item.unit}
                          </span>
                        )}
                        {item.bedrooms && (
                          <span className="hidden md:hidden lg:block m-0 mr-1em w-1em">
                            {item.bedrooms}
                          </span>
                        )}
                        {item.price && (
                          <span className="text-mobileCaption md:text-desktopBody m-0 mr-1em w-6em">
                            {item.price}
                          </span>
                        )}
                        {item.sold == 1 ? (
                          <span className=" left-3 absolute md:left-0 md:relative text-mobileCaption md:text-desktopBody">
                            Sold
                          </span>
                        ) : (
                          <span className="left-3 absolute md:left-0 md:relative text-mobileCaption md:text-desktopBody">
                            Under offer
                          </span>
                        )}

                        <div style={{ marginTop: "-.075em" }} className="right-0 absolute pr-1em">
                          {isExpanded ? "–" : "+"}
                        </div>
                      </AccordionHeader>
                      <AccordionPanel className="pb-1em">
                        <div>
                          {item.text && <PortableText blocks={item.text} />}
                          <button
                            onClick={handleToggle}
                            className="box mb-1/2em uppercase rounded-lg w-full block text-center leading-none h-2em pt-1/4em flex items-center justify-center text-mobileBody md:text-desktopBody"
                          >
                            View Floorplan
                          </button>
                          {item.floorPlan && (
                            <Collapse className="my-1em" isOpen={show}>
                              <Figure node={item.floorPlan} />
                            </Collapse>
                          )}
                          {item.sold !== 1 && (
                            <PageLink
                              className="box box-black rounded-lg w-full block text-center leading-none h-2em pt-1/4em flex items-center justify-center text-mobileBody md:text-desktopBody "
                              to={`/checkout`}
                            >
                              Join Waitlist
                            </PageLink>
                          )}
                        </div>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
                <div>{index < units.length - 1 && <GridRow />}</div>
              </React.Fragment>
            ))}
        </Accordion>

        {specs && (
          <button
            onClick={onOpen}
            style={{ bottom: "1em" }}
            className="-mt-40 box-circle self-end w-32 h-32 md:w-40 md:h-40 sticky text-right right-0 z-40 mr-mobile md:mr-desktop"
          >
            <div className="square  relative text-mobileCaption md:text-desktopCaption">
              <div className="background-circle" />
              <span className="m-0 h-full flex items-center justify-center text-nav leading-none text-center top-1/2 uppercase absolute px-2em md:px-1/2em transform -translate-y-1/2 w-full">
                View Spec Sheet
              </span>
            </div>
          </button>
        )}
      </Container>
    </Layout>
  );
};

export default HomeTemplate;
