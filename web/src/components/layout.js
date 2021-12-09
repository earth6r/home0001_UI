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
    if (typeof window != `undefined`) {
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
      function isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
      }
/*      document.addEventListener("scroll", function () {
        let myel = document.getElementById("page-content-wrapper");

        if (myel && isBottom(myel)) {
          let el = document.getElementsByClassName("intercom-lightweight-app-launcher");
          if (el && el.length) {
            for (var i = el.length - 1; i >= 0; i--) {
              el[i].style.marginBottom = "65px";
            }
          }

          let el2 = document.getElementsByClassName("intercom-launcher-frame");
          if (el2 && el2.length) {
            for (var i = el2.length - 1; i >= 0; i--) {
              el2[i].style.marginBottom = "65px";
            }
          }

          let el3 = document.getElementsByClassName("intercom-messenger-frame");
          if (el3 && el3.length) {
            for (var i = el3.length - 1; i >= 0; i--) {
              el3[i].style.marginBottom = "65px";
            }
          }

          let el4 = document.getElementsByClassName("intercom-launcher-discovery-frame");
          if (el4 && el4.length) {
            for (var i = el4.length - 1; i >= 0; i--) {
              el4[i].style.marginBottom = "65px";
            }
          }

          let el5 = document.getElementById("intercom-frame");
          if (el5) {
            el5.style.marginBottom = "65px";
          }
        } else {
          let el = document.getElementsByClassName("intercom-lightweight-app-launcher");
          if (el && el.length) {
            for (var i = el.length - 1; i >= 0; i--) {
              el[i].style.marginBottom = "20px";
            }
          }

          let el2 = document.getElementsByClassName("intercom-launcher-frame");
          if (el2 && el2.length) {
            for (var i = el2.length - 1; i >= 0; i--) {
              el2[i].style.marginBottom = "20px";
            }
          }

          let el3 = document.getElementsByClassName("intercom-messenger-frame");
          if (el3 && el3.length) {
            for (var i = el3.length - 1; i >= 0; i--) {
              el3[i].style.marginBottom = "20px";
            }
          }

          let el4 = document.getElementsByClassName("intercom-launcher-discovery-frame");
          if (el4 && el4.length) {
            for (var i = el4.length - 1; i >= 0; i--) {
              el4[i].style.marginBottom = "20px";
            }
          }

          let el5 = document.getElementById("intercom-frame");
          if (el5) {
            el5.style.marginBottom = "20px";
          }
        }
      });
    }
  }); */
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
