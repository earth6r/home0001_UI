import { Link } from "gatsby";
import React from "react";
import GridRow from "./grid/grid-row";
import MailChimpForm from "./mailchimp-form";
import instagramLogo from'./image.png';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";

const NewsletterPopup = ({ newsletter }) => {
  const { isOpen, onClose, onOpen} = useDisclosure( {defaultIsOpen:true} );

  

  return (
    <>
    {isOpen &&
        <div className="newsletter-popup rounded-md bottom-0 w-full md:max-w-md left-0 fixed md:ml-10 py-4 px-8 top-auto bg-white ">
          <ModalHeader className="font-normal mb-0 pl-0 pb-0">
            <h5 className=" text-mobileCaption md:text-desktopCaption mt-1/4em uppercase">
              Newsletter
            </h5>
          </ModalHeader>
          <button onClick={onClose} aria-label="Close" type="button" className="newsletter-close">
          <svg viewBox="0 0 24 24" focusable="false" role="presentation" aria-hidden="true"><path fill="currentColor" d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"></path></svg></button>
          <div className="mb-1em pt-2em">
            <MailChimpForm newsletter={newsletter} />
          </div>

    
        </div>
       }
    </>
  );
};

export default NewsletterPopup;
