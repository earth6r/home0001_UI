import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/core";
import { createRef } from "react";
import MailChimpForm from "./mailchimp-form";

const ContactModal = ({ children, title, subtitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <span onClick={onOpen} className="cursor-pointer popup-button">
        {children}
      </span>
      <Modal isOpen={isOpen} onClose={onClose} isCentered finalFocusRef={createRef()}>
        <ModalOverlay opacity={0.75} />
        <ModalContent>
          {title && title !== "" ? (
            <ModalHeader className="font-normal mb-0">
              <h5 style={{ color: "black" }} className="uppercase text-base">
                {title}
              </h5>
            </ModalHeader>
          ) : null}
          <ModalCloseButton />
          <ModalBody className="rnd-mailchimp py-6">
            {subtitle}
            <MailChimpForm signup />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactModal;
