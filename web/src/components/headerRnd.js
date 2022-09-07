import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/core";
import React, { useState, useEffect } from "react";
import GridRow from "./grid/grid-row";
import Icon from "./icon";
import MailChimpForm from "./mailchimp-form";
import PortableText from "./portableText";
import { PageLink } from "../components/link";

// this is the floating header for the R & D site
const HeaderRnd = ({
  mainMenu,
  infoSection = null,
  infoSectionBelow = null,
  newsletter,
  rMenu,
  subMenu,
  onHideNav,
  onShowNav,
  onHideSubNav,
  onShowSubNav,
  showNav,
  showSubNav,
  siteTitle,
  onLoaded,
  footerMenu,
  isHome,
  showThinBanner,
  thinBanner
}) => {
  const [info, setInfo] = useState(false);
  const [scrollUp, setScrollUp] = useState(true);
  const [scrollStart, setScrollStart] = useState(0);
  const [currentUri, setCurrentUri] = useState("");

  useEffect(() => {
    let uri = window.location.href.split("http://")[1];
    if (!uri) {
      uri = window.location.href.split("https://")[1];
    }
    setCurrentUri(uri);
  }, []);

  // change state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      //Isa: I am not sure why there is so much logic here, I think we could set isScrolled on State and use that and get rid of scrollUp
      const isScrolled = scrollY > scrollStart && scrollY > 60;
      setScrollStart(isScrolled);
      if (isScrolled) {
        setScrollUp(false);
        setScrollStart(scrollY);
      } else {
        setScrollUp(true);
        setScrollStart(scrollY);
      }
    };
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      // clean up the event handler when the component unmounts
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrollUp, scrollStart]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const menu = rMenu !== undefined ? rMenu.edges[0].node.items : null;
  const submenu = subMenu && subMenu.edges[0] !== undefined ? subMenu.edges[0].node.items : null;
  const menuFooter = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;

  return (
    <>
      <header
        className={`r-d-menu r-d-nav-text-desktop block fixed z-50 w-full left-0 top-0 ${
          scrollStart < 60 ? "" : "md:hidden"
        } ${showNav ? "bg-white" : ""}`}
      >
        <nav
          className={`mx-mobile md:mx-6 z-40 transition-none rounded-lg md:relative r-d-menu-nav ${
            showNav ? "bg-white" : ""
          }`}
        >
          <div className="flex justify-between relative">
            <div className="r-d-tagline cursor-default">
              <PageLink onClick={onHideNav} to="/">
                <span className="earth-rnd-logo">
                  <Icon symbol="earthRndLogo" />
                </span>
                <span className="earth-rnd-logo-mobile">
                  <Icon symbol="earthRndLogoMobile" />
                </span>
              </PageLink>
            </div>

            <div className="hidden md:flex rnd-md-menu absolute top-0">
              {menu &&
                menu.map((item, index) => (
                  <div key={index}>
                    <PageLink
                      key={item._key}
                      className={`${
                        currentUri !== "" &&
                        currentUri.includes(item.link.content.main.slug.current)
                          ? "rnd-current-nav-link " + item.link.content.main.slug.current
                          : " "
                      } md:pt-1/2em inline-block`}
                      onClick={onHideNav}
                      to={`/${item.link.content.main.slug.current}`}
                    >
                      {item.title + ",\u00A0"}
                    </PageLink>
                  </div>
                ))}
              <div className="cursor-pointer md:pt-1/2em" onClick={onOpen}>
                <span className="uppercase">Newsletter</span>
              </div>
            </div>
            <button
              className="md:hidden outline-none flex content-start items-center"
              onClick={showNav ? onHideNav : onShowNav}
              role="button"
              aria-label="Open the menu"
            >
              <div className="rnd-menu-button">
                {showNav ? <Icon symbol="closeBlack" /> : <Icon symbol="hamburger" />}
              </div>
            </button>
          </div>
          {showNav ? (
            <div className="md:hidden mt-40 text-left rnd-mobile-menu">
              {menu &&
                menu.map((item, index) => (
                  <>
                    <div onClick={onHideNav} className="my-3em" key={item._key}>
                      <PageLink
                        className={`py-1/2em block cursor-pointer rnd-mobile-nav`}
                        onClick={onHideNav}
                        to={`/${item.link.content.main.slug.current}`}
                      >
                        <span
                          className={`${
                            currentUri && currentUri.includes(item.link.content.main.slug.current)
                              ? "rnd-current-nav-link " + item.link.content.main.slug.current
                              : " "
                          }`}
                        >
                          {item.title}
                        </span>
                      </PageLink>
                    </div>
                  </>
                ))}
              <div
                onClick={() => {
                  onOpen();
                  onHideNav();
                }}
                className="my-3em"
              >
                <span className="cursor-pointer py-1/2em block rnd-mobile-nav uppercase">
                  Newsletter
                </span>
              </div>
            </div>
          ) : null}
        </nav>
      </header>
      <div
        className={`fixed w-full h-12 md:h-18 z-30 gradient-to-b3-mobile pointer-events-none top-0 left-0`}
      ></div>
      <Modal className="rounded-md" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay opacity={0.75} />
        <ModalContent className="rounded-md">
          <ModalHeader className="font-normal mb-0">
            <h5 style={{ color: "black" }} className="uppercase text-base">
              Newsletter
            </h5>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="rnd-mailchimp py-6">
            <MailChimpForm newsletter={newsletter} rnd={true} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HeaderRnd;
