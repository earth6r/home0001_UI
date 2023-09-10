import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { AllenData, LAData } from "./ExtendedInfoData";

export const ExtendedInfoModule = data => {
  const { type, sqft } = data.data;
  console.log("sqft:", sqft);
  console.log("type:", type);

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
          <p className="px-4 md:px-0 uppercase">Technical Information</p>
          <div className="mt-10 tracking-caps px-4 md:px-0">
            <p className="uppercase">
              {type == "studio" || type == "studio max" || type == "1 bedroom"
                ? "48 ALLEN ST"
                : "1308 DOUGLAS ST"}
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
      <div className="pr-mobile-menu md:pr-0">
        <button
          onClick={onOpenModal}
          className="mb-9 text-center outline-none mt-9 tracking-caps uppercase block w-full h-12 max-h-12 py-2 px-3 text-left uppercase border border-[#000] text-mobile-body md:text-desktop-body bg-white text-black mb-10"
        >
          VIEW EXTENDED INFORMATION
        </button>
      </div>

      <div>
        <p>THE 0001 HOUSING NETWORK</p>
        <p>
          Home0001 is a distributed housing collective: in addition to community dinners and events,
          homeowners get access to 0001 homes in other cities for free. No nightly rate; just a
          cleaning fee each time. Own one home; live flexibly between multiple locations.
        </p>
      </div>
    </>
  );
};
