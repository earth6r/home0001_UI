import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import Icon from "./icon";
import CircleButton from "./global/circleButton";
import GridRow from "./grid/grid-row";
import EarthLogoMobile from "../components/images/logos/earth-logo-mobile.svg";
import { PageLink } from "../components/link";

const Header = ({
  mainMenu,
  rMenu,
  pillColor,
  blackHeader,
  strikeColor,
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
  bannerUrl,
  bannerUrlTitle
}) => {
  const [forwarder, setForwarder] = useState("");
  const menu = mainMenu !== undefined ? mainMenu.edges[0].node.items : null;
  const submenu = subMenu && subMenu.edges[0] !== undefined ? subMenu.edges[0].node.items : null;
  const menuFooter = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;

  let currentUri = "";
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
    var words = slug.split("-");

    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words.join(" ");
  }

  if (typeof window != `undefined`) {
    currentUri = window.location.href.split("http://")[1];
    if (!currentUri) {
      currentUri = window.location.href.split("https://")[1];
    }
    if (currentUri && currentUri.includes("homes.")) {
      currentUri = currentUri.split("homes.")[1];
    }
    if (currentUri) {
      let stringLength = currentUri.length;
      if (currentUri.charAt(stringLength - 1) == "/") {
        currentUri = currentUri.slice(0, -1);
      }
    }
  }

  useEffect(() => {
    // setLoaded(true);
    currentUri = window.location.href.split("http://")[1];
    if (!currentUri) {
      currentUri = window.location.href.split("https://")[1];
    }

    if (currentUri) {
      let stringLength = currentUri.length;
      if (currentUri.charAt(stringLength - 1) == "/") {
        currentUri = currentUri.slice(0, -1);
      }
    }
  }, [currentUri]);

  let buttonStyle = {
    background: pillColor
  };

  storeNewEelamDomainOrigin();

  function storeNewEelamDomainOrigin() {
    useEffect(() => {
      if (currentUri && currentUri.split("?")[1]) {
        if (currentUri.split("?")[1] == "new-eelam") {
          sessionStorage.setItem("forwarder", "new-eelam");
          setForwarder("new-eelam");
        }
      }

      if (
        sessionStorage.getItem("forwarder") &&
        sessionStorage.getItem("forwarder") == "new-eelam"
      ) {
        setForwarder("new-eelam");
      }
    });
  }

  const newMenu = [
    {
      title: "How It Works",
      slug: "/homes/how-it-works-redesign",
      _key: "gasdgasgasd212"
    },
    {
      title: "About",
      slug: "/homes/about",
      _key: "gasdgfasfs125125asgasd212"
    },
    {
      title: "Newsletter",
      slug: "/homes/newsletter",
      _key: "gasdgfasfsfsfs125125asgasd212"
    },

    {
      title: "Legal",
      slug: "/homes/legal",
      _key: "gasdgfasfsfasf1125125asgasd212"
    }
  ];
  return (
    <>
      {showThinBanner && thinBanner && (
        <div className="fixed w-full z-50" id="thin-banner">
          <div className="marquee">
            <div className="marquee-track">
              <div className="marquee-content ">
                <span id="thin-banner-wrapper">{ReactHtmlParser(thinBanner)}</span>
                {bannerUrl && (
                  <PageLink
                    style={buttonStyle}
                    to={`${uri}/${bannerUrl.content.main.slug.current}`}
                  >
                    {bannerUrlTitle}
                  </PageLink>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <header
        className={`${showThinBanner && thinBanner ? "mt-16 md:mt-8" : ""} ${
          blackHeader ? "black-header " : ""
        } ${showNav ? "z-70" : "z-50"} fixed w-full left-0 top-0`}
      >
        <div
          className={`${
            showNav ? "h-full" : ""
          } flex  w-full   md:bg-transparent md:relative justify-between md:justify-between items-center content-center`}
        >
          <nav className="flex justify-between items-center w-full px-4 py-6 md:px-10 md:py-12">
            <h1 className="relative menu z-50 md:h-10">
              <PageLink to="/homes/home-redesign" className="flex items-center h-full">
                <div className="flex items-center h-3 md:h-4">
                  <EarthLogoMobile className="hidden md:block" height="14" />
                  <EarthLogoMobile className="md:hidden" height="12" width="48" />
                </div>
                <span className={`${forwarder == "new-eelam" ? "" : "hidden"} new-eelam-header`}>
                  [FKA New Eelam]
                </span>
              </PageLink>
            </h1>
            <button
              style={{ borderColor: "#000000" }}
              className="outline-none relative z-50 flex items-center"
              onClick={showNav ? onHideNav : onShowNav}
              role="button"
              aria-label="Open the menu"
            >
              <p className={`${showNav ? "hidden" : ""} uppercase text-[0.875rem] md:text-base`}>
                Menu
              </p>
              <span className={`${showNav ? "" : "hidden"} `}>
                <svg
                  className="h-5 w-5 md:h-10 md:w-10"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 8L32 32M32 8L8 32" stroke="black" />
                </svg>
              </span>
            </button>
          </nav>

          <nav
            className={`${showThinBanner && thinBanner ? "mt-16 md:mt-4" : ""} ${
              showNav
                ? "block overflow-auto  z-40 bg-white md:shadow-none transition-none"
                : "hidden"
            } fixed top-0 pt-[4.25rem] md:pt-[9.375rem] left-0 w-full h-full`}
          >
            <ul className="px-4 md:px-10 flex flex-col gap-10 mt-4 md:mt-0">
              {menu &&
                newMenu.map((item, index) => {
                  return (
                    <li
                      onClick={onHideNav}
                      className="text-start text-[0.875rem] md:text-base uppercase leading-[120%] tracking-normal"
                      key={index++}
                    >
                      <PageLink onClick={onHideNav} to={`${item.slug}`}>
                        <span>{item.title}</span>
                      </PageLink>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
      </header>
      <div
        style={{ zIndex: "45" }}
        className={`${
          showNav ? "h-full bg-black opacity-75 pointer-events-auto" : "opacity-0"
        } fixed transition-opacity duration-150 left-0 top-0 pointer-events-none w-full`}
      />
      <div
        className={`${
          showThinBanner && thinBanner ? "mt-12 md:mt-12" : ""
        } fixed w-full h-20 z-30 ${
          blackHeader ? "gradient-to-black " : ""
        } pointer-events-none top-0 left-0`}
      />
    </>
  );
};

export default Header;
