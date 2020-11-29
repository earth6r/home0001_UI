import { PageLink } from "../link";
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import GridRow from "../grid/grid-row";
import { RichTable } from "./richTable";
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

const SpecButton = ({ title, url, float = true, color, specs = false }) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();
  let randPadding = Math.random() * 10;
  let uri = "";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef();
  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0.9, 1], {
    clamp: false,
  });
  if (url !== undefined) {
    switch (url._type) {
      case "home":
        uri = "/home";
        //   alert("set home");
        break;
      default:
        uri = "";
        break;
    }
  }

 
  // top-1/2 -translate-y-1/2 right-0 z-20
  return (
    <>
    {specs && (
          <Modal
            preserveScrollBarGap
            finalFocusRef={finalRef}
            isCentered={true}
            closeOnOverlayClick={false}
            size="full"
            scrollBehavior="inside"
            blockScrollOnMount={true}
            isOpen={isOpen}
            onClose={onClose}
            className="rounded-lg"
          >
            <ModalOverlay opacity={0.75} />
            <ModalContent className="rounded-lg mx-mobile md:mx-desktop">
              <ModalCloseButton zIndex={10} />
              <ModalBody className="rounded-lg">
                <h3 className="text-mobileBody md:text-desktopBody pb-1em pt-1/4em">
                  Specifications
                </h3>
                <GridRow />
                {specs && specs.map((spec) => <RichTable key={spec._key} data={spec} />)}
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      {specs && (
          <button
            onClick={onOpen}
            style={{ bottom: "1em" }}
            className="mt-0 lg:-mt-48 lg:pt-0 pt-1em box-circle relative self-end w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-right right-0 z-40 mr-mobile md:mr-desktop"
          >
            <div className="square  relative text-mobileCaption md:text-desktopCaption">
              <div className="background-circle" />
              <span className="m-0 h-full font-bold flex items-center justify-center text-mobileNav md:text-desktopNav leading-none text-center top-1/2 uppercase absolute px-2em md:px-1/2em transform -translate-y-1/2 w-full">
                Spec Sheet
              </span>
            </div>
          </button>
        )}
    </>
  );
};

export default SpecButton;