import { useEffect, useState } from "react";
import Modal from "./Modal";

export const ExtendedInfoModule = data => {
  const { title, propertyType } = data;
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
          <p className="px-4 md:px-0">Additional Information</p>
          <div className="mt-10 uppercase tracking-caps px-4 md:px-0">
            {title && <p className="uppercase">{title}</p>}
            {propertyType == "two-bedrooms"
              ? "3-STORY TOWNHOUSE"
              : propertyType && (
                  <p>
                    {propertyType
                      .replace("one-bedroom", "1 bedroom")
                      .replace("studio-max", "studio max")}
                  </p>
                )}{" "}
            <div className="mt-10 uppercase tracking-caps px-4 md:px-0">Overview</div>
            <div className="mt-10 uppercase tracking-caps px-4 md:px-0">Schools</div>
          </div>
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
