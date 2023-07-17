import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from "@chakra-ui/core";
import HowItWorksComponent from "./HowItWorksComponent";

export const HowItWorksModal = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Modal
        preserveScrollBarGap
        isCentered={true}
        size="full"
        scrollBehavior="inside"
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay onClick={onClose} opacity={0.75} />
        <ModalContent className="mx-mobile max-w-special md:mx-desktop p-4 pt-6 md:p-10 text-mobile-body md:text-desktop-body">
          <CloseButton onClose={onClose} />
          <ModalBody className="p-0">
            <HowItWorksComponent
              data={{
                sanityHowItWorksPage: data
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <button
        onClick={onOpen}
        className="border-b border-dashed mt-10 text-mobile-body md:text-desktop-body"
      >
        How It Works
      </button>
    </div>
  );
};

const CloseButton = ({ onClose }) => {
  return (
    <div className="z-50 absolute top-4 right-4 md:top-10 md:right-10 text-mobile-body md:text-desktop-body">
      <button onClick={onClose}>
        <svg
          className="hidden md:block"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L25 25M25 1L1 25" stroke="black" />
        </svg>
        {/* mobile  */}
        <svg
          className="md:hidden"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 15L25 25M25 15L15 25" stroke="black" />
        </svg>
      </button>
    </div>
  );
};
