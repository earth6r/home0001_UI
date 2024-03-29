import { PageLink } from "../link";
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import GridRow from "../grid/grid-row";
import { RichTable } from "./richTable";
import { RowLinkTable } from "./rowLinkTable";
import { ColumnHeaderTable } from "./columnHeaderTable";
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

const SpecButton = ({ title, url, color, float = true, callibrationMark, specs }) => {
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
        uri = "/homes/locations";
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
            size="full"
            scrollBehavior="inside"
            blockScrollOnMount={true}
            isOpen={isOpen}
            onClose={onClose}
            className="rounded-lg"
          >
            <ModalOverlay onClick={onClose} opacity={0.75} />
            <ModalContent className="mx-mobile max-w-special md:mx-desktop">
              <ModalCloseButton zIndex={10} />
              <ModalBody className="rounded-lg">
                {specs[0]._type === 'richTable' && specs.map((spec) => <RichTable key={spec._key} data={spec} />)}
                {specs[0]._type === 'rowLinkTable' && specs.map((spec) => <RowLinkTable key={spec._key} data={spec} />)}
                {specs[0]._type === 'columnHeaderTable' && specs.map((spec) => <ColumnHeaderTable key={spec._key} data={spec} />)}
                <div className="w-full popupgrid">
        <GridRow />
      </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      {specs && (
        <>
          <div className="md:pl-1/10 w-full md:w-2/3 mb-4 ">
          <button
            onClick={onOpen}
            className={`${color === "black" ? " text-white box-black" : "text-black box-white"} box rounded-md w-full block text-center leading-none h-2em flex items-center justify-center  `}
          >
            {title}
          </button>
          </div>
          {callibrationMark &&
            <GridRow/>
          }
          </>
        )}

    </>
  );
};

export default SpecButton;
