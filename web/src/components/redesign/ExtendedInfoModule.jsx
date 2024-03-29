import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { AllenData, LAData } from "./ExtendedInfoData";
import { fireViewFactSheetEvent } from "../../utils/googleAnalyticsEvents";
export const ExtendedInfoModule = data => {
  const { type, sqft } = data.data;

  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = type => {
    // fireViewFactSheetEvent(type);
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
          <p className="px-4 md:px-0 uppercase">Fact Sheet</p>
          <div className="mt-10 tracking-caps px-4 md:px-0">
            <p className="uppercase">
              {type == "studio"
                ? "STUDIO - UNIT 3B"
                : type == "studio-max"
                ? "STUDIO MAX - UNIT 4A"
                : type == "one-bedroom"
                ? "1 BEDROOM - UNIT 6B"
                : "TOWNHOUSE – #6"}
            </p>
            <p className="uppercase mt-4">
              {type == "studio" || type == "studio-max" || type == "one-bedroom"
                ? "48 ALLEN ST"
                : "1322 DOUGLAS ST"}
            </p>
          </div>
          {type == "two-bedrooms" || type == "penthouse" ? (
            <LAData type={type} sqft={sqft} />
          ) : (
            <AllenData type={type} sqft={sqft} />
          )}
        </div>
      </Modal>
      <div className="pr-mobile-menu md:pr-0">
        <button
          onClick={() => onOpenModal(type)}
          className="text-center outline-none mt-9 mb-9 tracking-caps uppercase block w-full h-12 max-h-12 py-2 px-3 text-left uppercase border border-[#000] text-mobile-body md:text-desktop-body bg-white text-black"
        >
          fact sheet
        </button>
      </div>
    </>
  );
};
