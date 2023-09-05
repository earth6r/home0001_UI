import React, { useState, useEffect, useContext } from "react";
import ReactHtmlParser from "react-html-parser";
import Icon from "./icon";
import CircleButton from "./global/circleButton";
import GridRow from "./grid/grid-row";
import { PageLink } from "../components/link";
import { HomesContext } from "./context/HomesContext";
import { CSSTransition } from "react-transition-group";

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
  bannerUrlTitle,
  pathname = ""
}) => {
  const [forwarder, setForwarder] = useState("");
  const menu = mainMenu !== undefined ? mainMenu.edges[0].node.items : null;
  const submenu = subMenu && subMenu.edges[0] !== undefined ? subMenu.edges[0].node.items : null;
  const menuFooter = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;
  const {
    setCity: setSelectedCity,
    setProperty: setSelectedProperty,
    setPropertyType: setSelectedPropertyType,
    setReserveHomeForm: setShowReserveHomeForm
  } = useContext(HomesContext);

  let currentUri = "";
  let uri = "";
  if (bannerUrl !== undefined && bannerUrl !== null) {
    switch (bannerUrl._type) {
      case "home":
        uri = "/locations";
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
      title: "About",
      slug: "/about"
    },
    {
      title: "How It Works",
      slug: "/how-it-works"
    },
    {
      title: "Newsletter",
      slug: "/newsletter"
    },
    {
      title: "Contact",
      slug: "/contact"
    },
    {
      title: "Legal",
      slug: "/legal"
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
        } ${showNav ? "z-70" : "z-50"} fixed w-full left-0 top-0 select-none`}
      >
        <div
          className={`${
            showNav ? "h-full" : ""
          } flex w-full md:bg-transparent md:relative justify-between md:justify-between items-center content-center`}
        >
          <nav className="flex justify-between items-center w-full px-4 pt-6 md:pt-10 md:px-10">
            <h1 className="relative menu z-50 md:h-10">
              <PageLink
                onClick={() => {
                  onHideNav();
                  setSelectedCity({
                    title: "",
                    id: null
                  });
                  setSelectedProperty({ id: null });
                  setSelectedPropertyType(null);
                  setShowReserveHomeForm(false);
                }}
                to="/"
                className="flex items-center h-full p-1 -m-1"
              >
                <div className="flex items-center h-3">
                  <p className="tracking-caps leading-none uppercase text-mobile-body md:text-desktop-body mt-[-1px]">
                    HOME0001
                  </p>
                </div>
                <span className={`${forwarder == "new-eelam" ? "" : "hidden"} new-eelam-header`}>
                  [FKA New Eelam]
                </span>
              </PageLink>
            </h1>
            <div className="h-3 w-3 md:h-10 md:w-10 relative z-50">
              <button
                style={{ borderColor: "#000000" }}
                className={`outline-none flex items-center justify-center absolute h-10 w-10 ${
                  showNav ? "-left-[0.875rem]" : "-left-[1.65rem]"
                } -top-[0.9rem] md:left-0 md:top-[-0.25rem]`}
                onClick={showNav ? onHideNav : onShowNav}
                role="button"
                aria-label="Open the menu"
              >
                <p
                  className={`${
                    showNav ? "hidden" : ""
                  } tracking-caps leading-none uppercase text-mobile-body md:text-desktop-body`}
                >
                  Menu
                </p>
                <span className={`${showNav ? "" : "hidden"}`}>
                  <span className="hidden md:block h-10 w-10 rounded-xl">
                    <Icon symbol="closeMenu" />
                  </span>
                  <span className="md:hidden block h-3 w-3 md:my-0">
                    <Icon symbol="closeMenuMobile" />
                  </span>
                </span>
              </button>
            </div>
          </nav>

          <CSSTransition in={showNav} timeout={500} classNames="fade" unmountOnExit>
            <nav
              className={`${
                showThinBanner && thinBanner ? "mt-16 md:mt-4" : ""
              } overflow-auto z-40 bg-white md:shadow-none fixed top-0 pt-[4.875rem] md:pt-[9.125rem] left-0 w-full h-full`}
            >
              <ul className="px-4 md:px-10 flex flex-col gap-10 w-full">
                {newMenu.map((item, index) => {
                  return (
                    <li
                      onClick={onHideNav}
                      className="text-start text-mobile-body md:text-desktop-body uppercase tracking-caps leading-none w-full"
                      key={index}
                    >
                      <PageLink onClick={onHideNav} to={`${item.slug}`}>
                        <span className="pr-10 -mr-10 pt-2 -mt-2 pb-2 -mb-2">{item.title}</span>
                      </PageLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </CSSTransition>
        </div>
      </header>
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
