import { PageLink } from "../components/link";
import React, { useState, useEffect } from "react";
import Icon from "./icon";
import CircleButton from "./global/circleButton";
import GridRow from "./grid/grid-row";
import ReactHtmlParser from "react-html-parser"
import PortableText from "./portableText"
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

const HeaderRnd = ({ mainMenu, infoSection = null, infoSectionBelow = null, rMenu, subMenu, onHideNav, onShowNav,onHideSubNav, onShowSubNav, showNav,showSubNav, siteTitle, onLoaded, footerMenu, isHome, showThinBanner, thinBanner }) => {
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState(false);
    const [scrollUp, setScrollUp] = useState(true);
  const [scrollStart, setScrollStart] = useState(0);

// change state on scroll
  useEffect(() => {

    // const handleScroll = () => {
    //   const scrolly = document.getElementById("page-content-wrapper").scrollTop
    //   const isScrolled = scrolly > scrollStart && scrolly > 60;
    //   console.log(document.getElementById("page-content-wrapper").scrollTop)
    //   if (isScrolled) {
    //     setScrollUp(false);
    //     setScrollStart(scrolly)
    //   }else{
    //     setScrollUp(true);
    //     setScrollStart(scrolly)
    //   }
    // };

    // document.getElementById("page-content-wrapper").addEventListener('scroll', handleScroll, { passive: true });

    // return () => {
    //   // clean up the event handler when the component unmounts
    //   document.getElementById("page-content-wrapper").removeEventListener('scroll', handleScroll);
    // };
  }, [scrollUp, scrollStart]);


  const { isOpen, onOpen, onClose } = useDisclosure();
  function handleShowInfo() {
    if(info){
      setInfo(false);
    }else{
      setInfo(true);
    }
    

  }
  const menu = rMenu !== undefined ? rMenu.edges[0].node.items : null;
  const submenu = subMenu && subMenu.edges[0] !== undefined ? subMenu.edges[0].node.items : null;
  const menuFooter = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;
  // console.log(mainMenu);
  function makeTitle(slug) {
  var words = slug.split('-');

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
}


 
  return (
    <>
    
      {isHome && submenu && 
      <div style={{ zIndex: "51", minWidth: "30vw", width:"calc(100% - 1.5rem)", borderRadius:"22px" }} className={`${showNav ? "hidden":""} sub-menu absolute mt-10 lg:mt-16 mx-3 lg:mx-5 box-menu px-5 py-2 top-0 right-0 lg:w-auto`} >
        {submenu &&
          submenu.map((item, index) => (
            <div key={index + "first"}>
            {item.link && isHome == item.link.content.main.slug.current &&
            <div className="cursor-pointer" onClick={showSubNav ? onHideSubNav : onShowSubNav}><li className="block">{item.title} <span className="float-right"><svg style={{top:"10px"}} className={`${showSubNav ? "flip" : ""} relative`} width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M0.969269 0.955238L1.67451 0.25L5.90593 4.48143L5.2007 5.18667L0.969269 0.955238Z" fill="black"/><path d="M5.2007 5.18667L4.49546 4.48143L8.72689 0.25L9.43212 0.955238L5.2007 5.18667Z" fill="black"/></svg></span></li></div>
            }
             </div>
            ))
         
        }
         
        {submenu &&
          submenu.map((item, index) => (
            <div key={index + "second"} className={`${index==submenu.length-1 ? "":""}`}>
            <li className={`${
          showSubNav && item.link && isHome != item.link.content.main.slug.current ? " h-auto" : "h-0"
        } block overflow-hidden`} key={item._key}>
            
              <PageLink
                className="md:pt-1/2em inline-block overflow-hidden"
                onClick={onHideSubNav}
                to={item.link ? "/home/"+item.link.content.main.slug.current : " "}
              >
                {item.title} 
              </PageLink>

             
              
            </li>
            { !item.link &&
              <li className={`${
          showSubNav ? " h-auto" : "h-0"
        } hidden md:block overflow-hidden opacity-50`}>{item.title}</li>
            }
          </div>
     
          ))}
      </div>
    }
      <header className={`${scrollUp ? "" :""} md:block fixed z-50 w-full left-0`}>
        <div
          className={`${
            showNav ? "h-full" : ""
          } flex container pb-0 w-full nav md:bg-transparent md:relative justify-between md:justify-center md:justify-between items-center content-center`}
        >
          <GridRow scroll={false} hide={1} className="flex w-full justify-between md:hidden">
            <h1 style={{ top: ".05em" }} className="md:hidden relative logo">
              <PageLink to="/">
                <span className="earth-svg block text-mobileNav md:text-desktopNav"><svg viewBox="0 0 45 11" fill="none">
<path d="M0 0H7.4747V1.25196H1.52952V4.65937H7.2752V5.91134H1.52952V9.68014H7.621V10.9321H0V0Z" fill="black"/>
<path d="M12.4756 0H14.4574L18.7799 10.9321H17.1174L15.8672 7.67957H11.0259L9.78899 10.9321H8.12646L12.4756 0ZM15.415 6.45342L13.4465 1.29068L11.4914 6.45342H15.415Z" fill="black"/>
<path d="M19.897 0H24.5653C26.9993 0 28.3027 1.07127 28.3027 2.86532C28.3027 4.67228 27.0658 5.33053 26.454 5.43378C27.4648 5.61448 28.2362 6.15657 28.2362 7.52469V9.21549C28.2362 9.77048 28.316 10.3255 28.9012 10.9321H27.1589C26.7333 10.4416 26.6801 9.89955 26.6801 9.40909V7.76992C26.6801 6.47924 25.9486 6.15657 24.7116 6.15657H21.4132V10.9192H19.897V0ZM24.6185 4.9046C26.5338 4.9046 26.7599 3.5881 26.7599 2.95567C26.7599 1.94893 26.0949 1.25196 24.5121 1.25196H21.4132V4.9046H24.6185Z" fill="black"/>
<path d="M32.8912 1.25196H29.3135V0H38.0251V1.25196H34.434V10.9321H32.8912V1.25196Z" fill="black"/>
<path d="M44.8217 10.9321H43.2523V5.89843H37.2539V4.64646H43.2523V0H44.8217V10.9321Z" fill="black"/>
</svg></span>
              </PageLink>
            </h1>

            <li onClick={onOpen} className="block
            md:block cursor-pointer">
                      <span className="uppercase relative info-menu-mobile md:pt-1/2em inline-block">
                        {info && infoSection ? "Close" : "Info"}
                      </span>
                    </li>
          </GridRow>

          <nav
            className={`${
              showNav
                ? "block z-40 bg-white box md:shadow-none transition-none rounded-lg"
                : "hidden"
            } fixed left-0 top-0 md:relative w-full md:block text-mobileNav md:text-desktopNav`}
          >
            <div className="mx-mobile md:mx-0">
              <ul
                style={{}}
                className="flex pt-2em md:pt-0 flex-wrap relative mt-1 leading-none container p-0 m-0 md:flex md:flex-no-wrap w-full text-mobileNav md:text-desktopNav justify-center md:justify-between"
              >
                <li className="absolute md:relative left-0 top-0 pt-2">
                  <h1 className="logo ">
                    <PageLink onClick={onHideNav} to="/">
                      <span className="earth-svg"><svg viewBox="0 0 45 11" fill="none">
<path d="M0 0H7.4747V1.25196H1.52952V4.65937H7.2752V5.91134H1.52952V9.68014H7.621V10.9321H0V0Z" fill="black"/>
<path d="M12.4756 0H14.4574L18.7799 10.9321H17.1174L15.8672 7.67957H11.0259L9.78899 10.9321H8.12646L12.4756 0ZM15.415 6.45342L13.4465 1.29068L11.4914 6.45342H15.415Z" fill="black"/>
<path d="M19.897 0H24.5653C26.9993 0 28.3027 1.07127 28.3027 2.86532C28.3027 4.67228 27.0658 5.33053 26.454 5.43378C27.4648 5.61448 28.2362 6.15657 28.2362 7.52469V9.21549C28.2362 9.77048 28.316 10.3255 28.9012 10.9321H27.1589C26.7333 10.4416 26.6801 9.89955 26.6801 9.40909V7.76992C26.6801 6.47924 25.9486 6.15657 24.7116 6.15657H21.4132V10.9192H19.897V0ZM24.6185 4.9046C26.5338 4.9046 26.7599 3.5881 26.7599 2.95567C26.7599 1.94893 26.0949 1.25196 24.5121 1.25196H21.4132V4.9046H24.6185Z" fill="black"/>
<path d="M32.8912 1.25196H29.3135V0H38.0251V1.25196H34.434V10.9321H32.8912V1.25196Z" fill="black"/>
<path d="M44.8217 10.9321H43.2523V5.89843H37.2539V4.64646H43.2523V0H44.8217V10.9321Z" fill="black"/>
</svg></span>
                    </PageLink>
                  </h1>
                </li>
                <li className="absolute left-0 top-0 pointer-events-none w-full md:hidden">
                  <GridRow hide={1} />
                </li>
                {menu &&
                  menu.map((item, index) => (
                    <li className="hidden md:block" key={item._key}>
                      <PageLink
                        className="md:pt-1/2em inline-block"
                        onClick={onHideNav}
                        to={`/${item.link.content.main.slug.current}`}
                      >
                        {item.title}
                      </PageLink>
                    </li>
                  ))}
                    <li className="hidden mt-1em mb-1/2em mx-auto" >
                      <CircleButton title={"Info"} url={"/about"} float={true} />
                    </li>

                    <li onClick={onOpen} className="hidden md:block cursor-pointer">
                      <span className="uppercase md:pt-1/2em inline-block">
                        {info && infoSection ? "Close" : "Info"}
                      </span>
                    </li>
                
              </ul>
              
            </div>
          </nav>
        </div>
      </header>
      <div
        style={{ zIndex: "45" }}
        onClick={showNav ? onHideNav : onShowNav}
        className={`${
          showNav ? " h-full bg-black opacity-75 pointer-events-auto" : "opacity-0"
        } fixed hidden transition-opacity duration-150 left-0 top-0  pointer-events-none w-full`}
      ></div>
      <div style={{zIndex: "40" }} className={`${scrollUp ? "fixed" :""} md:fixed w-full h-12 md:h-18 pointer-events-none top-0 left-0`}></div>
      {infoSection && info &&
        <div style={{zIndex: "44" }} className="fixed info-section left-0 bg-white px-6 pt-10"><PortableText blocks={infoSection} /></div>
      }
      <Modal className="rounded-md" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay opacity={0.75} />
        <ModalContent className="rounded-md">
          <ModalHeader className="font-normal mb-0 pb-0">
            <div className="info-rd text-mobileCaption md:text-desktopCaption "> <PortableText blocks={infoSection} /> </div>
            <h5 className=" text-mobileCaption md:text-desktopCaption mt-1em uppercase">
              Newsletter
            </h5>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="rnd-mailchimp mb-0 pb-0 pt-1/2em">
            <MailChimpForm />
          </ModalBody>

          {infoSectionBelow &&
            <ModalHeader className="font-normal pb-1em pt-2">
            <div className="info-rd text-mobileCaption md:text-desktopCaption "> <PortableText blocks={infoSectionBelow} /> </div>
            </ModalHeader>
          }
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
