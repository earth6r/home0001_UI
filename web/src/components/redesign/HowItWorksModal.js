import React, { useEffect, useState } from "react";
import HowItWorksComponent from "./HowItWorksComponent";
import { CSSTransition } from "react-transition-group";
import Modal from "./Modal";

export const HowItWorksModal = ({ data }) => {
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
    <div>
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <div className="px-4 md:px-10">
          <HowItWorksComponent
            data={{
              sanityHowItWorksPage: data
            }}
            hasPadding
          />
        </div>
      </Modal>

      <button
        onClick={onOpenModal}
        className="border-b-[2px] border-solid mt-4 text-mobile-body md:text-desktop-body"
      >
        {data.title ?? "How it works"}
      </button>
    </div>
  );
};
