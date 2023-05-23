import React, { useRef } from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from "@chakra-ui/core";
import { InventoryTable } from "./InventoryTable";

export const InventorModule = ({ data }) => {
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
        className="rounded-lg"
      >
        <ModalOverlay onClick={onClose} opacity={0.75} />
        <ModalContent className="mx-mobile max-w-special md:mx-desktop p-10">
          <CloseButton onClose={onClose} />
          <ModalBody className="rounded-lg p-0 ">
            <div className="flex flex-col gap-20 ">
              {data._rawInventory &&
                data._rawInventory.map((data, index) => {
                  return <InventoryTable data={data} key={index} />;
                })}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <button onClick={onOpen} className="border-b border-dashed  mt-20 text-base">
        View Inventory
      </button>
    </div>
  );
};

const CloseButton = ({ onClose }) => {
  return (
    <div className="flex justify-between items-center mb-16">
      <div className="text-base">
        <p className="uppercase">49 ORCHARD ST.</p>
        <p>Studio</p>
      </div>
      <button onClick={onClose}>
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L25 25M25 1L1 25" stroke="black" />
        </svg>
      </button>
    </div>
  );
};
