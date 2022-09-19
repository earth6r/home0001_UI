import { PageLink } from "../link";
import React, { createRef } from "react";
import ReactHtmlParser from "react-html-parser";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/core";
import MailChimpForm from "../mailchimp-form";

const RdObroundButton = ({
  openSignupModal,
  title,
  url,
  modalTitle,
  modalSubtitle,
  linkHome,
  linkRnd,
  textColor,
  customColor,
  color
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let uri = "";
  let myUrl = url && url.content ? url.content.main.slug.current : "";
  let realColor = customColor ? customColor : color;
  let realTextColor = textColor ? textColor : "black";
  if (!customColor) {
    realTextColor = color == "black" ? "white" : "black";
  }

  let styleObj = {
    color: realTextColor,
    backgroundColor: realColor
  };

  if (url !== undefined) {
    switch (url._type) {
      case "home":
        uri = "/homes/locations";
        //   alert("set home");
        break;
      case "checkout":
        uri = "/homes/checkout";
        break;
      default:
        uri = "";
        break;
    }
  }

  if (linkHome) {
    myUrl = "/homes";
  } else if (linkRnd) {
    myUrl = "/";
  } else {
    myUrl = uri + "/" + myUrl;
  }

  return (
    <>
      <div className={`right-0 ml-1em z-20 self`}>
        <div className={`mx-1/4em right-0 rdObround-width relative`}>
          <div className="square">
            {url && url.content ? (
              <PageLink
                className="m-0 h-full flex items-center justify-center text-nav leading-none text-center top-1/2 uppercase px-1em md:px-1/2em w-full"
                to={`${myUrl}`}
              >
                <h2
                  style={styleObj}
                  className={`background-obround rounded-full m-0 font-normal px-10 py-4  leading-none`}
                >
                  {ReactHtmlParser(title)}
                </h2>
              </PageLink>
            ) : (
              title && (
                <div className="m-0 h-full flex items-center justify-center text-nav leading-none text-center top-1/2 uppercase px-1em md:px-1/2em w-full">
                  <h2
                    onClick={() => (openSignupModal ? onOpen() : undefined)}
                    style={styleObj}
                    className={`background-obround cursor-pointer rounded-full m-0 font-normal px-10 py-4  leading-none`}
                  >
                    {ReactHtmlParser(title)}
                  </h2>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered finalFocusRef={createRef()}>
        <ModalOverlay opacity={0.75} />
        <ModalContent>
          <ModalHeader className="font-normal mb-0">
            <h5 style={{ color: "black" }} className="uppercase text-base">
              {modalTitle}
            </h5>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="rnd-mailchimp py-6">
            <MailChimpForm newsletter={modalSubtitle} rnd={true} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RdObroundButton;
