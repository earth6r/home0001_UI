import React from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

const CloseButton = ({ onClose }) => {
  return (
    <div className="z-50 absolute top-4 right-4 md:top-10 md:right-10 text-mobile-body md:text-desktop-body">
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

export default function Modal({ isOpen, onClose, children }) {
  const content = (
    <CSSTransition in={isOpen} timeout={250} classNames="fade" unmountOnExit>
      <div
        className="fixed inset-0 flex items-center justify-center z-[9999] md:p-10 bg-[#00000066] bg-opacity-75"
        onClick={onClose}
      >
        <div
          className="relative bg-white text-mobile-body md:text-desktop-body w-full h-full overflow-auto"
          onClick={e => e.stopPropagation()}
        >
          <CloseButton onClose={onClose} />
          {children}
        </div>
      </div>
    </CSSTransition>
  );

  return createPortal(content, document.body);
}
