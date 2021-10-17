import { PageLink } from "../components/link";
import React, { useState, useEffect } from "react";
import Icon from "./icon";
import CircleButton from "./global/circleButton";
import GridRow from "./grid/grid-row";
import ReactHtmlParser from "react-html-parser";

const Header = ({ mainMenu, rMenu, pillColor, blackHeader, strikeColor, subMenu, onHideNav, onShowNav,onHideSubNav, onShowSubNav, showNav,showSubNav, siteTitle, onLoaded, footerMenu, isHome, showThinBanner, thinBanner, bannerUrl, bannerUrlTitle }) => {
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);
  const [loaded, setLoaded] = useState(false);
  const [forwarder, setForwarder] = useState('');
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
    }, [currentUri]);
    let buttonStyle = {
      background: pillColor
    }

  storeNewEelamDomainOrigin();

  function storeNewEelamDomainOrigin() {
    useEffect(() => {
      if(currentUri && currentUri.split('?')[1]) {
        if(currentUri.split('?')[1] == 'new-eelam') {
          sessionStorage.setItem('forwarder', 'new-eelam')
          setForwarder('new-eelam');
        }
      }
  
      if(sessionStorage.getItem('forwarder') && sessionStorage.getItem('forwarder') == 'new-eelam') {
        setForwarder('new-eelam');
      }
    });
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
      

      <header className={`${showThinBanner && thinBanner ? "mt-16 md:mt-8" : "" } ${blackHeader ? "black-header ":""} ${showNav ? "z-70 ":"z-50"} fixed w-full left-0`}>
        <div className={`${showNav ? "h-full" : ""} flex container pb-0 w-full px-5 nav md:bg-transparent md:relative justify-between md:justify-center md:justify-between items-center content-center`}>
          <nav className="flex w-full justify-between md:hidden">
            <h1 className="md:hidden relative menu-earth-button">
              <PageLink className={`${currentUri && currentUri.includes('/')  ? "": ""}`} to="/">
                <svg className="earth-svg blockx" width="47" height="11" viewBox="0 0 47 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.324219 11H8.23422V8.95598H2.70422V6.53399H7.40822V4.64398H2.70422V2.57198H8.13622V0.583984H0.324219V11Z" fill="#FF0000"/>
                  <path d="M9.38113 11H11.7751L12.4191 9.01198H16.1991L16.8571 11H19.3771L15.6111 0.583984H13.1331L9.38113 11ZM13.6231 5.35798C13.9591 4.33598 14.3231 2.58598 14.3231 2.58598H14.3511C14.3511 2.58598 14.5751 3.92999 15.0231 5.35798L15.6531 7.30398H12.9791L13.6231 5.35798Z" fill="#FF0000"/>
                  <path d="M20.8517 11H23.2317V7.02398H24.9957C26.1437 7.02398 26.6617 7.55598 26.7877 8.59198C26.9137 9.73998 26.8857 10.846 27.1657 11H29.5177V10.888C29.1817 10.748 29.2657 9.57199 29.0697 8.15798C28.9297 7.03798 28.4677 6.46398 27.4317 6.14198V6.09998C28.7617 5.66598 29.3637 4.78398 29.3637 3.56598C29.3637 1.66198 27.8377 0.583984 25.8077 0.583984H20.8517V11ZM23.2317 2.47398H25.4157C26.4657 2.47398 26.9837 3.03398 26.9837 3.88798C26.9837 4.71398 26.4097 5.25998 25.3457 5.25998H23.2317V2.47398Z" fill="#FF0000"/>
                  <path d="M30.7072 2.61398H33.8012V11H36.1952V2.61398H39.3032V0.583984H30.7072V2.61398Z" fill="#FF0000"/>
                  <path d="M40 6.63198V4.64398L44.62 4.60198V0.583984H47V11H44.62V6.58998L40 6.63198Z" fill="#FF0000"/>
                </svg>
                <span className={`${forwarder=='new-eelam' ? "": "hidden"} new-eelam-header`}>[FKA New Eelam]</span>
              </PageLink>
            </h1>
            <button
              style={{ borderColor: "#000000" }}
              className="lg:hidden outline-none relative -mt-1 pb-6 pl-2 w-12 z-50"
              onClick={showNav ? onHideNav : onShowNav}
              role="button"
              aria-label="Open the menu"
            >
              <div
                style={{ marginTop: ".5px" }}
                className={`${showNav ? "hidden" : ""} pl-6 flex justify-center h-full w-full items-center absolute top-0 ml-1`}
              >
                <Icon symbol="hamburgerRed" />
              </div>
              <div
                style={{ marginTop: ".5px" }}
                className={`${showNav ? "" : "hidden"} pl-6 flex justify-center h-full w-full items-center absolute top-0 left-0 ml-1`}
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
                className="flex pt-2em md:pt-0 flex-wrap relative mt-1 container p-0 m-0 md:px-2 md:flex md:flex-no-wrap w-full justify-center md:justify-between"
              >
                <li className="absolute md:relative left-0 top-0 pt-2">
                  <h1 className="menu-earth-button">
                    <PageLink className={`${currentUri && currentUri.includes('/')  ? "": ""}`} onClick={onHideNav} to="/">
                      <svg className="earth-svg blockx" width="47" height="11" viewBox="0 0 47 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.324219 11H8.23422V8.95598H2.70422V6.53399H7.40822V4.64398H2.70422V2.57198H8.13622V0.583984H0.324219V11Z" fill="#FF0000"/>
                        <path d="M9.38113 11H11.7751L12.4191 9.01198H16.1991L16.8571 11H19.3771L15.6111 0.583984H13.1331L9.38113 11ZM13.6231 5.35798C13.9591 4.33598 14.3231 2.58598 14.3231 2.58598H14.3511C14.3511 2.58598 14.5751 3.92999 15.0231 5.35798L15.6531 7.30398H12.9791L13.6231 5.35798Z" fill="#FF0000"/>
                        <path d="M20.8517 11H23.2317V7.02398H24.9957C26.1437 7.02398 26.6617 7.55598 26.7877 8.59198C26.9137 9.73998 26.8857 10.846 27.1657 11H29.5177V10.888C29.1817 10.748 29.2657 9.57199 29.0697 8.15798C28.9297 7.03798 28.4677 6.46398 27.4317 6.14198V6.09998C28.7617 5.66598 29.3637 4.78398 29.3637 3.56598C29.3637 1.66198 27.8377 0.583984 25.8077 0.583984H20.8517V11ZM23.2317 2.47398H25.4157C26.4657 2.47398 26.9837 3.03398 26.9837 3.88798C26.9837 4.71398 26.4097 5.25998 25.3457 5.25998H23.2317V2.47398Z" fill="#FF0000"/>
                        <path d="M30.7072 2.61398H33.8012V11H36.1952V2.61398H39.3032V0.583984H30.7072V2.61398Z" fill="#FF0000"/>
                        <path d="M40 6.63198V4.64398L44.62 4.60198V0.583984H47V11H44.62V6.58998L40 6.63198Z" fill="#FF0000"/>
                      </svg>
                      <span className={`${forwarder=='new-eelam' ? "": "hidden"} new-eelam-header`}>[FKA New Eelam]</span>
                    </PageLink>
                  </h1>
                </li>
                <li className="absolute left-0 top-0 pointer-events-none w-full md:hidden">
                  <GridRow hide={1} />
                </li>
                <div className="md:hidden flow-root text-left w-full">
                  {menu &&
                    menu.map((item, index) => (
                      <li onClick={onHideNav} className="md:hidden mt-6em  mx-auto" key={item._key}>
                        <PageLink
                        className={` md:pt-1/2em pt-1em pb-1/2em block cursor-pointer text-mobileNav`} 
                        onClick={onHideNav}
                        to={`/${item.link.content.main.slug.current}`}>
                          <span className={`${currentUri && currentUri.includes(item.link.content.main.slug.current) || (currentUri && currentUri.includes('homes') && item.link.content.main.slug.current.includes("home")) ? "current-nav-link "+item.link.content.main.slug.current : " "}`}>{item.title}</span>
                        </PageLink>
                      </li>
                    ))}
                </div>

                {menu &&
                  menu.map((item, index) => (
                    <li className="hidden md:block" key={item._key}>
                      <PageLink
                        className={`${currentUri && currentUri.includes(item.link.content.main.slug.current) || (currentUri && currentUri.includes('homes') && item.link.content.main.slug.current.includes("home")) ? "current-nav-link "+item.link.content.main.slug.current : " "} md:pt-1/2em inline-block`} 
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
        className={`${
          showNav ? " h-full bg-black opacity-75 pointer-events-auto" : "opacity-0"
        } fixed transition-opacity duration-150 left-0 top-0  pointer-events-none w-full`}
      ></div>
      <div className={`${showThinBanner && thinBanner ? "mt-12 md:mt-12" : "" } fixed w-full h-12 md:h-18 z-30 ${blackHeader ? "gradient-to-black ":"gradient-to-b3 "} pointer-events-none top-0 left-0`}></div>
    </>
  );
};

export default Header;
