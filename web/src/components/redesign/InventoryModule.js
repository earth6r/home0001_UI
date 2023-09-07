import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <div className="py-6 md:py-10 md:px-10 h-full flex flex-col">
          <p className="px-4 md:px-0">SAMPLE INVENTORY</p>
          <div className="mt-10 uppercase tracking-caps px-4 md:px-0">
            {title && <p className="uppercase">{title}</p>}{" "}
            {propertyType == "two-bedrooms"
              ? "3-STORY TOWNHOUSE"
              : propertyType && (
                  <p>
                    {propertyType
                      .replace("one-bedroom", "1 bedroom")
                      .replace("studio-max", "studio max")}
                  </p>
                )}{" "}
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
        className="border-b-[1.5px] border-solid text-mobile-body md:text-desktop-body"
      >
        {viewInventoryText}
      </button>
    </>
  );
};
