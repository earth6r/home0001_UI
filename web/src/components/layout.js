import Footer from "./footer";
import GridRow from "./grid/grid-row";
import Header from "./header";
import HeaderRnd from "./headerRnd";
import React, { useState, useEffect, useRef } from "react";

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
  showNav,
  showPopupNewsletter,
  showSubNav,
  showThinBanner,
  siteTitle,
  strikeColor,
  subMenu,
  thinBanner,
}) => {
  const myRef = useRef({
    location: null,
  });
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
    /* INTERCOM BUBBLE */
    if (typeof window != `undefined`) { /* check because window is undefined during build */
      //if rnd page is shown intercom messanger icon is hidden
      if (rnd) {
        window.Intercom("update", {
          hide_default_launcher: true,
        });
      } else {
        window.Intercom("update", {
          hide_default_launcher: false,
        });
      }
      function atFooter(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
      }
      function calculateIntercomBottom(el){
        return Math.min(77, window.innerHeight-el.getBoundingClientRect().bottom)+20+"px";
      }
      function positionIntercomBubble() {
        let pageWrapper = document.getElementById("page-content-wrapper");
        let intercomBubble = document.querySelector(".intercom-lightweight-app-launcher, .intercom-launcher-frame");
        if(intercomBubble){
          if (pageWrapper && atFooter(pageWrapper)) {
            intercomBubble.style.bottom = calculateIntercomBottom(pageWrapper);
          }
          else {
            intercomBubble.style.bottom = "20px";
          }
        }
      }
      if(window.innerWidth > 767){ /* Don't move intercom bubble on mobile*/
        positionIntercomBubble();
        document.addEventListener("scroll", function () {
          positionIntercomBubble();
        });
      }
    }
    /* END INTERCOM BUBBLE */
  });

  if (!isClient) return null;

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
        } ${rnd ? "px-special" : ""} container  px-5 md:px-7 pb-0 `}
      >
        {children}
      </div>
      {!rnd && (
        <Footer
          blackFooter={blackFooter}
          showPopupNewsletter={showPopupNewsletter}
          newsletter={newsletter}
          footerMenu={footerMenu}
        />
      )}
    </div>
  );
};

export default Layout;
