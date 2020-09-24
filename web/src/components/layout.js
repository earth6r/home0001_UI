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
    />
    <div className="container">{children}</div>
    <div className="spacer" />
    <Footer footerMenu={footerMenu} />
  </div>
);

export default Layout;
