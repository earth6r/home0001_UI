import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import Icon from "./icon";
import CircleButton from "./global/circleButton";
import GridRow from "./grid/grid-row";
import EarthLogo from "../components/images/logos/earth-rnd-logo.svg";
import EarthLogoMobile from "../components/images/logos/earth-rnd-logo-mobile.svg";
import { PageLink } from "../components/link";

const Header = ({ mainMenu, rMenu, pillColor, blackHeader, strikeColor, subMenu, onHideNav, onShowNav, onHideSubNav, onShowSubNav, showNav, showSubNav, siteTitle, onLoaded, footerMenu, isHome, showThinBanner, thinBanner, bannerUrl, bannerUrlTitle }) => {
  const [forwarder, setForwarder] = useState('');
  const menu = mainMenu !== undefined ? mainMenu.edges[0].node.items : null;
  const submenu = subMenu && subMenu.edges[0] !== undefined ? subMenu.edges[0].node.items : null;
  const menuFooter = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;

  let currentUri = ""
  let uri = "";
  if (bannerUrl !== undefined && bannerUrl !== null) {
    switch (bannerUrl._type) {
      case "home":
        uri = "/homes/locations";
        break;
      case "checkout":
        uri = "/homes/checkout";
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

  if (typeof window != `undefined`) {
    currentUri = window.location.href.split("http://")[1]
    if (!currentUri) {
      currentUri = window.location.href.split("https://")[1]
    }
    if (currentUri && currentUri.includes("homes.")) {
      currentUri = currentUri.split("homes.")[1];
    }
    if (currentUri) {
      let stringLength = currentUri.length
      if (currentUri.charAt(stringLength - 1) == "/") {
        currentUri = currentUri.slice(0, -1)
      }
    }
  }

  useEffect(() => {
    // setLoaded(true);
    currentUri = window.location.href.split("http://")[1]
    if (!currentUri) {
      currentUri = window.location.href.split("https://")[1]
    }

    if (currentUri) {
      let stringLength = currentUri.length
      if (currentUri.charAt(stringLength - 1) == "/") {
        currentUri = currentUri.slice(0, -1)
      }
    }
  }, [currentUri]);

  let buttonStyle = {
    background: pillColor
  }

  storeNewEelamDomainOrigin();

  function storeNewEelamDomainOrigin() {
    useEffect(() => {
      if (currentUri && currentUri.split('?')[1]) {
        if (currentUri.split('?')[1] == 'new-eelam') {
          sessionStorage.setItem('forwarder', 'new-eelam')
          setForwarder('new-eelam');
        }
      }

      if (sessionStorage.getItem('forwarder') && sessionStorage.getItem('forwarder') == 'new-eelam') {
        setForwarder('new-eelam');
      }
    });
  }

  return (
    <>
      {showThinBanner && thinBanner &&
        <div className="fixed w-full z-50" id="thin-banner">
          <div className="marquee">
            <div className="marquee-track">
              <div className="marquee-content ">
                <span id='thin-banner-wrapper'>{ReactHtmlParser(thinBanner)}</span>
                {bannerUrl &&
                  <PageLink
                    style={buttonStyle}
                    to={`${uri}/${bannerUrl.content.main.slug.current}`}
                  >
                    {bannerUrlTitle}
                  </PageLink>
                }
              </div>
            </div>
          </div>
        </div>
      }

      <header className={`${showThinBanner && thinBanner ? "mt-16 md:mt-8" : ""} ${blackHeader ? "black-header " : ""} ${showNav ? "z-70 " : "z-50"} fixed w-full left-0 top-0`}>
        <div className={`${showNav ? "h-full" : ""} flex container w-full p-4 md:p-8 nav md:bg-transparent md:relative justify-between md:justify-center md:justify-between items-center content-center`}>
          <nav className="flex w-full justify-between">
            <h1 className="relative menu-earth-button">
              <PageLink className={`${currentUri && currentUri.includes('/') ? "" : ""}`} to="/homes">
                <div className="earth-rnd-logo">
                  <EarthLogo />
                </div>
                <span className="earth-rnd-logo-mobile">
                  <EarthLogoMobile />
                </span>
                <span className={`${forwarder == 'new-eelam' ? "" : "hidden"} new-eelam-header`}>[FKA New Eelam]</span>
              </PageLink>
            </h1>
            <button
              style={{ borderColor: "#000000" }}
              className="outline-none relative w-6 md:w-16 z-50"
              onClick={showNav ? onHideNav : onShowNav}
              role="button"
              aria-label="Open the menu"
            >
              <div
                className={`${showNav ? "hidden" : ""} flex justify-center h-full w-full items-center`}
              >
                <Icon symbol="hamburgerSmall" />
              </div>
              <div
                style={{ marginTop: ".5px" }}
                className={`${showNav ? "" : "hidden"} flex justify-center h-full w-full items-center`}
              >
                <Icon symbol="closeBlack" />
              </div>
            </button>
          </nav>

          <nav
            className={`${showThinBanner && thinBanner ? "mt-16 md:mt-4" : ""} ${showNav ? "block overflow-auto z-40 bg-white md:shadow-none transition-none" : "hidden"} fixed top-0 left-0 w-full h-full`}>
            <div className="nav-box p-4 md:p-8">
              <ul
                className="flex pt-2em flex-wrap mt-1 container p-0 m-0 w-full justify-center"
              >
                <li className="fixed left-0 top-0 p-4 md:p-8">
                  <h1 className="menu-earth-button">
                    <PageLink className={`${currentUri && currentUri.includes('/') ? "" : ""}`} onClick={onHideNav} to="/homes">
                      <div className="earth-rnd-logo">
                        <EarthLogo />
                      </div>
                      <span className="earth-rnd-logo-mobile">
                        <EarthLogoMobile />
                      </span>
                      <span className={`${forwarder == 'new-eelam' ? "" : "hidden"} new-eelam-header`}>[FKA New Eelam]</span>
                    </PageLink>
                  </h1>
                </li>
                <li className="absolute left-0 top-0 pointer-events-none w-full">
                  <GridRow hide={1} />
                </li>
                <div className="flow-root text-left w-full">
                  {menu &&
                    menu.map((item, index) => (
                      <li onClick={onHideNav} className="mt-6em mx-auto" key={item._key}>
                        <PageLink
                          className={`md:pt-1/2em pt-1em pb-1/2em block cursor-pointer header-nav-text normal-case`}
                          onClick={onHideNav}
                          to={`/${item.link.content.main.slug.current}`}>
                          <span className={`${currentUri && currentUri.includes(item.link.content.main.slug.current) || (currentUri && currentUri.includes('locations') && item.link.content.main.slug.current.includes("locations")) ? "homes" : ""}`}>{item.title}</span>
                        </PageLink>
                      </li>
                    ))}
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <div
        style={{ zIndex: "45" }}
        className={`${showNav ? "h-full bg-black opacity-75 pointer-events-auto" : "opacity-0"
          } fixed transition-opacity duration-150 left-0 top-0 pointer-events-none w-full`}
      />
      <div className={`${showThinBanner && thinBanner ? "mt-12 md:mt-12" : ""} fixed w-full h-20 z-30 ${blackHeader ? "gradient-to-black " : "gradient-to-b3"} pointer-events-none top-0 left-0`} />
    </>
  );
};

export default Header;
