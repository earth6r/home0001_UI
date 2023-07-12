import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from "@chakra-ui/core";
import { InventoryTable } from "./InventoryTable";

export const InventorModule = ({ data, title, propertyType }) => {
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
        <ModalContent className="mx-mobile max-w-special md:mx-desktop p-4 pt-6 md:p-10 text-mobile-body md:text-desktop-body">
          <CloseButton propertyType={propertyType} title={title} onClose={onClose} />
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

      <button
        onClick={onOpen}
        className="border-b border-dashed mt-10 md:mt-20 text-mobile-body md:text-desktop-body"
      >
        View Inventory
      </button>
    </div>
  );
};

const CloseButton = ({ onClose, title, propertyType }) => {
  return (
    <div className="flex justify-between items-center mb-24 md:mb-16 text-mobile-body md:text-desktop-body">
      <div>
        {title && <p className="uppercase">{title}</p>}{" "}
        {propertyType && <p>{propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}</p>}{" "}
      </div>
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
