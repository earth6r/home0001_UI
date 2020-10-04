import React, { useRef } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { RenderModules } from "../utils/renderModules";
import { RichTable } from "../components/global/richTable";
import {
  Modal,
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
    }
  }
`;

const HomeTemplate = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef();
  const { data, errors } = props;
  const page = data && data.page;
  const {
    main: { modules, slug },
    meta,
  } = page._rawContent;
  const specs = page._rawSpecSheet;
  console.log(specs);
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
      <Container className="rte">
        <div className="flex flex-wrap w-full">{RenderModules(modules)}</div>
        {specs && (
          <button
            mt={4}
            onClick={onOpen}
            className=" box-circle w-32 h-32 md:w-40 md:h-40 fixed bottom-0 right-0 z-40 m-mobile md:m-desktop"
          >
            <div className="square relative text-mobileCaption md:text-desktopCaption">
              <div className="background-circle" />
              <span className="m-0 h-full flex items-center justify-center text-nav leading-none text-center top-1/2 uppercase absolute px-2em md:px-1/2em transform -translate-y-1/2 w-full">
                View Spec Sheet
              </span>
            </div>
          </button>
        )}
        {specs && (
          <Modal
            preserveScrollBarGap
            finalFocusRef={finalRef}
            isCentered={true}
            closeOnOverlayClick={false}
            size="full"
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton zIndex={10} />
              <ModalBody style={{ maxHeight: "75vh" }} className="overflow-auto">
                {specs && specs.map((spec) => <RichTable key={spec._key} data={spec} />)}
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </Layout>
  );
};

export default HomeTemplate;
