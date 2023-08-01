import React, { useState } from "react";
import HowItWorksComponent from "./HowItWorksComponent";
import { CSSTransition } from "react-transition-group";
import Modal from "./Modal";

export const HowItWorksModal = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };

  const onCloseModal = () => {
    document.body.style.overflow = "";
    setIsOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <HowItWorksComponent
          data={{
            sanityHowItWorksPage: data
          }}
          hasPadding
        />
      </Modal>

      <button
        onClick={onOpenModal}
        className="border-b border-dashed mt-10 text-mobile-body md:text-desktop-body"
      >
        How It Works
      </button>
    </div>
  );
};
