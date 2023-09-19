import React, { useEffect, useState } from "react";
import { InventoryTableV2 } from "./InventoryTableV2";
import { fireViewInventoryEvent } from "../../utils/googleAnalyticsEvents";
import Modal from "./Modal";
import { sendHubspotClickEvent } from "../../utils/hubspotEvents";

export const InventoryModule = ({ data, title, propertyType, viewInventoryText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => {
    sendHubspotClickEvent("clicked view inventory", propertyType);
    fireViewInventoryEvent(propertyType);
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
        <div className="pb-10">
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
            <InventoryTableV2 data={propertyType} />
          </div>
        </div>
      </Modal>

      <button
        onClick={onOpenModal}
        className="hover:font-bold border-b-[1.5px] border-solid text-mobile-body md:text-desktop-body"
      >
        {viewInventoryText}
      </button>
    </>
  );
};
