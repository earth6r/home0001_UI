import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { AllenData, LAData } from "./ExtendedInfoData";

export const ExtendedInfoModule = data => {
  const { type, sqft } = data.data;

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
          <p className="px-4 md:px-0 uppercase">Fact Sheet</p>
          <div className="mt-10 tracking-caps px-4 md:px-0">
            <p className="uppercase">
              {type == "studio" || type == "studio-max" || type == "one-bedroom"
                ? "48 ALLEN ST"
                : "1322 DOUGLAS ST"}
            </p>
            <p className="uppercase">{type}</p>
          </div>
          {type == "two-bedrooms" || type == "penthouse" ? (
            <LAData type={type} sqft={sqft} />
          ) : (
            <AllenData type={type} sqft={sqft} />
          )}
        </div>
      </Modal>
      <div className="pr-mobile-menu md:pr-0 pb-4">
        <button
          onClick={onOpenModal}
          className="hover:font-bold border-b-[1.5px] border-solid text-mobile-body md:text-desktop-body"
        >
          View fact sheet
        </button>
      </div>
    </>
  );
};
