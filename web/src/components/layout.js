import React from "react";
import Header from "./header";
import HeaderRnd from "./headerRnd";
import Footer from "./footer";
import GridRow from "./grid/grid-row"

const Layout = ({ mainMenu,infoSection, rMenu, rnd = false, subMenu, footerMenu, children, onHideNav, onShowNav, showNav,  onHideSubNav, onShowSubNav, showSubNav, siteTitle, isHome, thinBanner, showThinBanner, bannerUrl, bannerUrlTitle }) => (
  <div className="flex flex-col justify-between h-full">
   {rnd ?
    (<HeaderRnd
      showThinBanner={showThinBanner}
      thinBanner={thinBanner}
      mainMenu={mainMenu}
      siteTitle={siteTitle}
      infoSection={infoSection}
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
    />) :
    (<Header
      showThinBanner={showThinBanner}
      thinBanner={thinBanner}
      mainMenu={mainMenu}
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
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
      )
   }
   <div className={`${showThinBanner && !rnd ? "mt-16":"mt-8"} container pb-1/2em absolute`} >
   <GridRow />
   </div>
    <div className={`${showThinBanner && !rnd ? "mt-8":""} container pb-1/2em`}>{children}</div>
    <Footer footerMenu={footerMenu} />
  </div>
);

export default Layout;
