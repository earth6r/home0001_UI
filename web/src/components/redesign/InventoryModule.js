import React, { useState } from "react";
import { InventoryTable } from "./InventoryTable";
import Modal from "./Modal";

export const InventoryModule = ({ data, title, propertyType, viewInventoryText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    setIsOpen(true);
  };

  const onCloseModal = () => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <div className="py-6 md:py-10 h-full flex flex-col">
          <div>
            {title && <p className="uppercase">{title}</p>}{" "}
            {propertyType && <p>{propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}</p>}{" "}
          </div>
          <div className="flex flex-col gap-20 h-full">
            {data._rawInventory &&
              data._rawInventory.map((data, index) => {
                return <InventoryTable data={data} key={index} />;
              })}
          </div>
        </div>
      </Modal>

      <button
        onClick={onOpenModal}
        className="border-b border-dashed text-mobile-body md:text-desktop-body"
      >
        {viewInventoryText}
      </button>
    </>
  );
};
