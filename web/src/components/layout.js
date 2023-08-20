import React, { useState, useEffect, useRef, useContext } from "react";
import FooterHomes from "../components/redesign/Footer";
import GridRow from "./grid/grid-row";
import Header from "./header";
import HeaderRnd from "./headerRnd";
import FooterRnd from "./footerRnd";
import { HomesContext } from "./context/HomesContext";

const Layout = ({
  bannerUrl,
  bannerUrlTitle,
  blackFooter,
  blackHeader,
  children,
  footerMenu,
  infoSection,
  infoSectionBelow,
  isHome,
  mainMenu,
  newsletter,
  onHideNav,
  onHideSubNav,
  onShowNav,
  onShowSubNav,
  pillColor,
  rMenu,
  rnd = false,
  homes = false,
  rndFooterMenu,
  homesFooterMenu,
  showNav,
  showPopupNewsletter,
  showSubNav,
  showThinBanner,
  siteTitle,
  strikeColor,
  subMenu,
  thinBanner,
  pathname
}) => {
  const { menuOpened, selectedCity } = useContext(HomesContext);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setShowPage(true);
  }, []);

  useEffect(() => {
    function atFooter(el) {
      const footer = document.getElementById("footer");
      return footer && el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    function calculateIntercomBottom(el) {
      return Math.min(77, window.innerHeight - el.getBoundingClientRect().bottom) + 20 + "px";
    }

    function positionIntercomBubble() {
      let pageWrapper = document.getElementById("page-content-wrapper");
      let intercomBubble = document.querySelector(
        ".intercom-lightweight-app-launcher, .intercom-launcher-frame"
      );
      if (intercomBubble) {
        if (pageWrapper && atFooter(pageWrapper)) {
          intercomBubble.style.bottom = calculateIntercomBottom(pageWrapper);
        } else {
          intercomBubble.style.bottom = "20px";
        }
      }
    }

    /* INTERCOM BUBBLE */
    if (typeof window != `undefined`) {
      /* Check because window is undefined during build */
      // If rnd page is shown intercom messanger icon is hidden
      if (rnd) {
        document.body.classList.add("hide-intercom");
      }

      if (window.innerWidth > 767) {
        /* Don't move intercom bubble on mobile*/
        positionIntercomBubble();
        document.addEventListener("scroll", positionIntercomBubble);
      }
    }
    /* END INTERCOM BUBBLE */

    return () => document.removeEventListener("scroll", positionIntercomBubble);
  });

  const showHomesFooter = pathname !== "/homes" || selectedCity?.id;

  return (
    <div className="flex flex-col justify-between h-full">
      {rnd ? (
        <HeaderRnd
          showThinBanner={showThinBanner}
          thinBanner={thinBanner}
          mainMenu={mainMenu}
          siteTitle={siteTitle}
          infoSection={infoSection}
          infoSectionBelow={infoSectionBelow}
          newsletter={newsletter}
          onHideNav={onHideNav}
          onShowNav={onShowNav}
          showNav={showNav}
          onHideSubNav={onHideSubNav}
          onShowSubNav={onShowSubNav}
          showSubNav={showSubNav}
          footerMenu={footerMenu}
          subMenu={subMenu}
          rMenu={rMenu}
          isHome={isHome}
        />
      ) : (
        <Header
          showThinBanner={showThinBanner}
          thinBanner={thinBanner}
          blackHeader={blackHeader}
          mainMenu={mainMenu}
          siteTitle={siteTitle}
          onHideNav={onHideNav}
          onShowNav={onShowNav}
          showNav={showNav}
          pillColor={pillColor}
          strikeColor={strikeColor}
          infoSection={infoSection}
          onHideSubNav={onHideSubNav}
          onShowSubNav={onShowSubNav}
          bannerUrl={bannerUrl}
          bannerUrlTitle={bannerUrlTitle}
          showSubNav={showSubNav}
          footerMenu={footerMenu}
          subMenu={subMenu}
          rMenu={rMenu}
          isHome={isHome}
          pathname={pathname}
        />
      )}
      <div
        className={`${
          showThinBanner && !rnd ? "mt-16 md:mt-20" : "mt-8"
        } hidden md:block container pb-1/2em absolute`}
      >
        <GridRow />
      </div>
      <div
        id="page-content-wrapper"
        className={`${showThinBanner && !rnd ? "mt-16 md:mt-12md:mt-16" : "mt-0"} ${
          blackHeader ? " dark-theme " : ""
        } ${
          rnd ? "px-special mobile-padding" : ""
        } container pb-0 transition-opacity duration-[350ms] ease-linear ${
          showPage || !menuOpened ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
      {rnd ? (
        <FooterRnd blackFooter={blackFooter} footerMenu={rndFooterMenu} />
      ) : homes && showHomesFooter ? (
        <FooterHomes footerMenu={homesFooterMenu} />
      ) : null}
    </div>
  );
};

export default Layout;
