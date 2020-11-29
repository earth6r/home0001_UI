import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ mainMenu, subMenu, footerMenu, children, onHideNav, onShowNav, showNav,  onHideSubNav, onShowSubNav, showSubNav, siteTitle, isHome, thinBanner, showThinBanner }) => (
  <div className="flex flex-col justify-between h-full">
    <Header
      showThinBanner={showThinBanner}
      thinBanner={thinBanner}
      mainMenu={mainMenu}
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
      onHideSubNav={onHideSubNav}
      onShowSubNav={onShowSubNav}
      showSubNav={showSubNav}
      footerMenu={footerMenu}
      subMenu={subMenu}
      isHome={isHome}
    />
    <div className="container pb-1/2em">{children}</div>
    <Footer footerMenu={footerMenu} />
  </div>
);

export default Layout;
