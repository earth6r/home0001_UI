import { PageLink } from "../components/link";
import React, { useState, useEffect } from "react";
import Icon from "./icon";
import CircleButton from "./global/circleButton";
import GridRow from "./grid/grid-row";
import ReactHtmlParser from "react-html-parser"

const Header = ({ mainMenu, rMenu, pillColor, blackHeader, strikeColor, subMenu, onHideNav, onShowNav,onHideSubNav, onShowSubNav, showNav,showSubNav, siteTitle, onLoaded, footerMenu, isHome, showThinBanner, thinBanner, bannerUrl, bannerUrlTitle }) => {
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);
  const [loaded, setLoaded] = useState(false);
  const menu = mainMenu !== undefined ? mainMenu.edges[0].node.items : null;
  const submenu = subMenu && subMenu.edges[0] !== undefined ? subMenu.edges[0].node.items : null;
  const menuFooter = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;
 
  let currentUri = ""
  let uri = "";
  if (bannerUrl !== undefined && bannerUrl !== null) {
    switch (bannerUrl._type) {
      case "home":
        uri = "/home";
        //   alert("set home");
        break;
      case "checkout":
        uri = "/checkout";
        break;
      default:
        uri = "";
        break;
    }
  }
  function makeTitle(slug) {
  var words = slug.split('-');

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);

  }

  return words.join(' ');
}
if(typeof window != `undefined`){
   currentUri = window.location.href.split("http://")[1]
   if(!currentUri){
      currentUri = window.location.href.split("https://")[1]
    }
  if(currentUri && currentUri.includes("homes.")){
    currentUri = currentUri.split("homes.")[1];
  }
   if(currentUri){
    let stringLength = currentUri.length
     if(currentUri.charAt(stringLength - 1) =="/"){
      currentUri = currentUri.slice(0, -1)
     }
   }
   
   
}
  useEffect(() => {
    // setLoaded(true);
    currentUri = window.location.href.split("http://")[1]
    if(!currentUri){
      currentUri = window.location.href.split("https://")[1]
    }
    
    if(currentUri){
      let stringLength = currentUri.length
       if(currentUri.charAt(stringLength - 1) =="/"){
        currentUri = currentUri.slice(0, -1)
       }
    }
   
  
    setTimeout(function () {
      setLoaded(true);
    }, 3000);
  }, []);
  let buttonStyle = {
    background: pillColor
  }

  return (
    <>
    {showThinBanner && thinBanner &&
        <div className="fixed w-full z-50" id="thin-banner"><div className="marquee"><div className="marquee-track"><div className="marquee-content "><span id='thin-banner-wrapper'>{ReactHtmlParser(thinBanner)}</span>
          {bannerUrl &&
            <PageLink
                  style={buttonStyle}
                  to={`${uri}/${bannerUrl.content.main.slug.current}`}
                >
                {bannerUrlTitle}
            </PageLink>
          }
        </div></div></div></div>
    }
      

      <header className={`${showThinBanner && thinBanner ? "mt-16 md:mt-8" : "" } ${blackHeader ? "black-header ":""} fixed z-50 w-full left-0 text-mobileNav md:text-desktopNav`}>
        <div className={`${showNav ? "h-full" : ""} flex container pb-0 w-full nav md:bg-transparent md:relative justify-between md:justify-center md:justify-between items-center content-center`}>
          <nav className="flex w-full justify-between md:hidden">
            <h1 className="md:hidden relative">
              <PageLink className={`${currentUri && currentUri.includes('/')  ? "": "current-nav-link"}`} to="/">
                Earth
              </PageLink>
            </h1>
            <button
              style={{ borderColor: "#000000" }}
              className="lg:hidden py-0 outline-none relative -mt-1 w-12 z-50 py-3"
              onClick={showNav ? onHideNav : onShowNav}
              role="button"
              aria-label="Open the menu"
            >
              <div
                style={{ marginTop: ".5px" }}
                className={`${showNav ? "hidden" : ""}  px-4 flex justify-center h-full w-full items-center absolute top-0 ml-1`}
              >
                <Icon symbol="hamburgerRed" />
              </div>
              <div
                style={{ marginTop: ".5px" }}
                className={`${showNav ? "" : "hidden"}  px-4 flex justify-center h-full w-full items-center absolute top-0 left-0`}
              >
                <Icon symbol="close" />
              </div>
            </button>
          </nav>

          <nav
          className={`
          ${showThinBanner && thinBanner ? "mt-16 md:mt-4" : "" } 
          ${showNav ? "block z-40 bg-white md:shadow-none transition-none" : "hidden"} 
          fixed md:relative top-0 left-0 w-full md:block h-full`}>
            <div className="nav-box mx-mobile md:mx-0">
              <ul
                style={{}}
                className="flex pt-2em md:pt-0 flex-wrap relative mt-1 container p-0 m-0 md:flex md:flex-no-wrap w-full justify-center md:justify-between"
              >
                <li className="absolute md:relative left-0 top-0 pt-2">
                  <h1 className="">
                    <PageLink className={`${currentUri && currentUri.includes('/')  ? "": "current-nav-link"}`} onClick={onHideNav} to="/">
                      Earth
                    </PageLink>
                  </h1>
                </li>
                <li className="absolute left-0 top-0 pointer-events-none w-full md:hidden">
                  <GridRow hide={1} />
                </li>
                <div className="md:hidden flow-root text-left w-full">
                  {menu &&
                    menu.map((item, index) => (
                      <li onClick={onHideNav} className="md:hidden mt-7em mb-1/2em mx-auto" key={item._key}>
                        <PageLink
                        className={`${currentUri && currentUri.includes(item.link.content.main.slug.current) || (currentUri && currentUri.includes('home') && item.link.content.main.slug.current.includes("home")) ? "current-nav-link "+item.link.content.main.slug.current : " "} md:pt-1/2em inline-block cursor-pointer`} 
                        onClick={onHideNav}
                        to={`/${item.link.content.main.slug.current}`}>
                          {item.title}
                        </PageLink>
                      </li>
                    ))}
                </div>

                {menu &&
                  menu.map((item, index) => (
                    <li className="hidden md:block" key={item._key}>
                      <PageLink
                        className={`${currentUri && currentUri.includes(item.link.content.main.slug.current) || (currentUri && currentUri.includes('home') && item.link.content.main.slug.current.includes("home")) ? "current-nav-link "+item.link.content.main.slug.current : " "} md:pt-1/2em inline-block`} 
                        onClick={onHideNav}
                        to={`/${item.link.content.main.slug.current}`}
                      >
                        {item.title}
                      </PageLink>
                    </li>
                  ))}
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
        } fixed transition-opacity duration-150 left-0 top-0  pointer-events-none w-full`}
      ></div>
      <div className={`${showThinBanner && thinBanner ? "mt-12 md:mt-12" : "" } fixed w-full h-12 md:h-18 z-30 ${blackHeader ? "gradient-to-black ":"gradient-to-b3 "} pointer-events-none top-0 left-0`}></div>
    </>
  );
};

export default Header;
