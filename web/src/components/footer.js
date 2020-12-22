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

const Footer = ({ footerMenu }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const query = "";
  
  const menu = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;
  return (
    <>

      <footer className="pt-1em md:pt-0 pb-1em md:pb-desktop container text-nav md:text-desktopNav flex flex-col uppercase left-0 md:block">
        <GridRow></GridRow>
        <nav className="relative">
          <ul className="flex flex-wrap md:flex-row md:justify-between justify-between  relative">
            <li className="md:mr-1em mb-1em md:mb-0 md:w-auto">
              <button onClick={onOpen} className="uppercase" role="Open newsletter">
                Newsletter
              </button>
            </li>
            {menu &&
              menu.map((item) => {
                switch (item._type) {
                  case "internalLink":
                    return (
                      <li className="md:mr-1em" key={item._key}>
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
                  
                            {item.title == "Instagram" ?
                               <>
                              <span className="hidden md:inline-block">{item.title}</span>
                              <div className="md:hidden w-full pl-1" >IG</div>
                              </>
                            : 
                            <>{item.title}</>
                            }
                          </a>
                        )}
                      </li>
                    );
                }
              })}
          </ul>
        </nav>
        <div className="hidden">
          <GridRow />
        </div>
      </footer>
      <Modal className="rounded-md" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay opacity={0.75} />
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
