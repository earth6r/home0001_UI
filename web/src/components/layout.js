import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ mainMenu, footerMenu, children, onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className="flex flex-col justify-between h-full">
    <Header
      mainMenu={mainMenu}
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
      footerMenu={footerMenu}
    />
    <div className="container pb-1/2em">{children}</div>
    <Footer footerMenu={footerMenu} />
  </div>
);

export default Layout;
