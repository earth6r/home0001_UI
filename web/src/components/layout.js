import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle }) => (
  <>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <div className="container">{children}</div>
    <div className="spacer" />
    <Footer />
  </>
);

export default Layout;
