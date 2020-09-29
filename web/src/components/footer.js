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
/*

*/

const Footer = ({ footerMenu }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const query = "";
  console.log(footerMenu);
  const menu = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;
  return (
    <>
      <footer className="pb-1em md:pb-desktop container text-nav md:text-desktopNav uppercase -mt-1em">
        <nav className="relative">
          <div className="mb-2em relative">
            <a
              target="_blank"
              className=" text-mobileCaption md:text-desktopCaption inline-block"
              href="https://www.instagram.com"
              title="Earth Instagram"
            >
              @<span className="earth">e</span>6r
            </a>
            <span className="absolute bottom-0  text-mobileCaption md:text-desktopCaption left-3 inline-block">
              &copy;2020
            </span>
          </div>
          <ul className="flex flex-wrap md:flex-row relative">
            {/*<li className="mr-1em mb-1em md:mb-0 w-full md:w-auto">
            <small>
              <Link to="/" className="earth">
                E
              </Link>
              , &copy; {new Date().getFullYear()}.
            </small>
  </li>*/}
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
          </ul>
        </nav>
        <GridRow />
      </footer>
      <Modal className="rounded-md" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="rounded-md">
          <ModalHeader className="font-normal">
            <h5 className=" text-mobileCaption md:text-desktopCaption">Newsletter</h5>
            <br />
            <p className="text-base">
              Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
              consequat.
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="mb-1em">
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
