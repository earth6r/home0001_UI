import { Link } from "gatsby";
import React from "react";
import GridRow from "./grid/grid-row";
import MailChimpForm from "./mailchimp-form";
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

const Footer = ({ footerMenu }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const query = "";
  // console.log(footerMenu);
  const menu = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;
  return (
    <>
      <footer className="pt-2em md:pt-0 pb-1em md:pb-desktop container text-nav md:text-desktopNav uppercase md:-mt-1em left-0 flex flex-col-reverse md:block">
        <GridRow />
        <nav className="relative pt-2">
          <ul className="flex flex-wrap md:flex-row md:justify-between relative">
            <li className="mr-1em">
              <button onClick={onOpen} className="uppercase" role="Open newsletter">
                Newsletter
              </button>
            </li>
            {menu &&
              menu.map((item) => {
                switch (item._type) {
                  case "internalLink":
                    return (
                      <li className="mr-1em" key={item._key}>
                        <Link to={`/${item.link.content.main.slug.current}`}>
                          {item.link.content.main.title}
                        </Link>
                      </li>
                    );
                  case "externalLink":
                    return (
                      <li className="mr-1em" key={item._key}>
                        {item.url !== undefined && (
                          <a href={item.url} title={item.title} target="_blank">
                            {item.title}
                          </a>
                        )}
                      </li>
                    );
                }
              })}
            <li>
              @<span className="earth">e</span>6r
            </li>
            {/*<li>
              <span>&copy;2020</span>
            </li>*/}
          </ul>
        </nav>
      </footer>
      <Modal className="rounded-md" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="rounded-md">
          <ModalHeader className="font-normal mb-0 pb-0">
            <h5 className=" text-mobileCaption md:text-desktopCaption mt-1/4em uppercase">
              Newsletter
            </h5>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="mb-1em pt-2em">
            <MailChimpForm />
          </ModalBody>

          {/*<ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>*/}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Footer;
