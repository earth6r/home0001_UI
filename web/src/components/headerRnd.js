import { PageLink } from "../components/link";
import React, { useState, useEffect } from "react";
import Icon from "./icon";
import CircleButton from "./global/circleButton";
import GridRow from "./grid/grid-row";
import ReactHtmlParser from "react-html-parser";
import PortableText from "./portableText";
import MailChimpForm from "./mailchimp-form";
import instagramLogo from "./image.png";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";
import { set } from "react-ga";

// this is the floating header for the R & D site

const HeaderRnd = ({
  mainMenu,
  infoSection = null,
  infoSectionBelow = null,
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
  thinBanner,
}) => {
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState(false);
  const [scrollUp, setScrollUp] = useState(true);
  const [scrollStart, setScrollStart] = useState(0);

  // change state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolly = document.getElementById("page-content-wrapper").scrollTop
      //Isa: I am not sure why there is so much logic here, I think we could set isScrolled on State and use that and get rid of scrollUp
      const isScrolled = scrolly > scrollStart && scrolly > 60;
      setScrollStart(isScrolled);
      // console.log(document.getElementById("page-content-wrapper").scrollTop)
      if (isScrolled) {
        setScrollUp(false);
        setScrollStart(scrolly)
      }else{
        setScrollUp(true);
        setScrollStart(scrolly)
      }
    };
    document.getElementById("page-content-wrapper").addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      // clean up the event handler when the component unmounts
      document.getElementById("page-content-wrapper").removeEventListener('scroll', handleScroll);
    };
  }, [scrollUp, scrollStart]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  function handleShowInfo() {
    if (info) {
      setInfo(false);
    } else {
      setInfo(true);
    }
  }
  const menu = rMenu !== undefined ? rMenu.edges[0].node.items : null;
  const submenu = subMenu && subMenu.edges[0] !== undefined ? subMenu.edges[0].node.items : null;
  const menuFooter = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;

  function makeTitle(slug) {
    var words = slug.split("-");
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words.join(" ");
  }

  return (
    <>
      {/* isHome is undefined, this never shows
      {isHome && submenu && (
        <div
          style={{
            zIndex: "51",
            minWidth: "30vw",
            width: "calc(100% - 1.5rem)",
            borderRadius: "22px",
          }}
          className={`${
            showNav ? "hidden" : ""
          } sub-menu absolute mt-10 lg:mt-16 mx-3 lg:mx-5 box-menu px-5 py-2 top-0 right-0 lg:w-auto`}
        >
          {submenu &&
            submenu.map((item, index) => (
              <div key={index + "first"}>
                {item.link && isHome == item.link.content.main.slug.current && (
                  <div
                    className="cursor-pointer"
                    onClick={showSubNav ? onHideSubNav : onShowSubNav}
                  >
                    <li className="block">
                      {item.title}{" "}
                      <span className="float-right">
                        <svg
                          style={{ top: "10px" }}
                          className={`${showSubNav ? "flip" : ""} relative`}
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                        >
                          <path
                            d="M0.969269 0.955238L1.67451 0.25L5.90593 4.48143L5.2007 5.18667L0.969269 0.955238Z"
                            fill="black"
                          />
                          <path
                            d="M5.2007 5.18667L4.49546 4.48143L8.72689 0.25L9.43212 0.955238L5.2007 5.18667Z"
                            fill="black"
                          />
                        </svg>
                      </span>
                    </li>
                  </div>
                )}
              </div>
            ))}

          {submenu &&
            submenu.map((item, index) => (
              <div key={index + "second"} className={`${index == submenu.length - 1 ? "" : ""}`}>
                <li
                  className={`${
                    showSubNav && item.link && isHome != item.link.content.main.slug.current
                      ? " h-auto"
                      : "h-0"
                  } block overflow-hidden`}
                  key={item._key}
                >
                  <PageLink
                    className="md:pt-1/2em inline-block overflow-hidden"
                    onClick={onHideSubNav}
                    to={item.link ? "/home/" + item.link.content.main.slug.current : " "}
                  >
                    {item.title}
                  </PageLink>
                </li>
                {!item.link && (
                  <li
                    className={`${
                      showSubNav ? " h-auto" : "h-0"
                    } hidden md:block overflow-hidden opacity-50`}
                  >
                    {item.title}
                  </li>
                )}
              </div>
            ))}
        </div>
      )} */}
      <header className={`r-d-menu block fixed z-50 w-full left-0 ${
              scrollStart < 60
                ? ""
                : "hidden"
            } `}>
        <div
          className={`r-d-nav-text-desktop flex container pb-0 w-full md:bg-transparent md:relative justify-between items-center content-center`}
        >
          <GridRow scroll={false} hide={1} className="flex w-full justify-between md:hidden">
            <h1
              style={{ top: ".05em" }}
              className="r-d-nav-text-mobile r-d-tagline-mobile md:hidden relative cursor-default"
            >
              <span className="earth-svg block">
                EARTH is a multi-disciplinary collective working across architecture, technology,
                design, and art.
              </span>
            </h1>

            <li onClick={onOpen} className="block md:block cursor-pointer">
              <span className="r-d-nav-text-mobile uppercase relative info-menu-mobile md:pt-1/2em inline-block">
                {info && infoSection ? "Close" : "Info"}
              </span>
            </li>
          </GridRow>

          <nav
            className={`${
              showNav
                ? "block z-40 bg-white box md:shadow-none transition-none rounded-lg"
                : "hidden"
            } fixed left-0 top-0 md:relative w-full md:block`}
          >
            <div className="mx-mobile md:mx-0">
              <ul className="flex pt-2em md:pt-0 flex-wrap relative mt-1 container p-0 m-0 md:flex md:flex-no-wrap w-full justify-center md:justify-between">
                <li className="absolute md:relative left-0 top-0 pt-2 r-d-tagline cursor-default">
                  <span className="">
                    EARTH is a multi-disciplinary collective working across architecture,
                    technology, design, and art.
                  </span>
                </li>

                <li
                  onClick={onOpen}
                  className="absolute md:relative left-0 top-0 pt-2 cursor-pointer"
                >
                  <span className="uppercase">{info && infoSection ? "Close" : "Info"}</span>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {/* <div
        style={{ zIndex: "45" }}
        onClick={showNav ? onHideNav : onShowNav}
        className={`${
          showNav ? " h-full bg-black opacity-75 pointer-events-auto" : "opacity-0"
        } fixed hidden transition-opacity duration-150 left-0 top-0  pointer-events-none w-full`}
      ></div>
      <div
        style={{ zIndex: "40" }}
        className={`${
          scrollUp ? "fixed" : ""
        }  w-full h-12 md:h-18 pointer-events-none top-0 left-0`}
      ></div> */}
      {/* info is set to false, this never renders
      {infoSection && info && (
        <div style={{ zIndex: "44" }} className="fixed info-section left-0 bg-white px-6 pt-10">
          <PortableText blocks={infoSection} />
        </div>
      )} */}
      <Modal className="rounded-md" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay opacity={0.75} />
        <ModalContent className="rounded-md">
          <ModalHeader className="info-rnd-content font-normal mb-0 pb-0">
            <div className="info-rd">
              {" "}
              <PortableText blocks={infoSection} />{" "}
            </div>
            <h5 className="mt-1em uppercase">Newsletter</h5>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="rnd-mailchimp mb-0 pb-0 pt-1/2em">
            <MailChimpForm rnd={true} />
          </ModalBody>

          {infoSectionBelow && (
            <ModalHeader className="font-normal pb-1em pt-2">
              <div className="text-flagDt">
                {" "}
                <PortableText blocks={infoSectionBelow} />{" "}
              </div>
            </ModalHeader>
          )}
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

export default HeaderRnd;
