import React, { useState, useEffect } from "react";
import Header from "./header";
import HeaderRnd from "./headerRnd";
import Footer from "./footer";
import GridRow from "./grid/grid-row"

const Layout = ({ mainMenu,infoSection,infoSectionBelow, rMenu, rnd = false, subMenu, footerMenu, children, onHideNav, onShowNav, showNav,  onHideSubNav, onShowSubNav, showSubNav, siteTitle, isHome, thinBanner, showThinBanner, bannerUrl, bannerUrlTitle }) => {
  const [scrollUp, setScrollUp] = useState(true);
  const [scrollStart, setScrollStart] = useState(0);
  return(
  <div className="flex flex-col justify-between h-full">
   {rnd ?
    (<HeaderRnd
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
      scrollUp={scrollUp}
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
   <div className={`${showThinBanner && !rnd ? "mt-16":"mt-8"} hidden md:block container pb-1/2em absolute`} >
   <GridRow />
   </div>
    <div onTouchStart={
      event => {
        setScrollStart(event.changedTouches[0].screenY);
      }
    } onTouchEnd={
      event=> {
        let end = event.changedTouches[0].screenY;

        if(end - scrollStart > 0)
        {
            setScrollUp(true)
        }
        else if(end - scrollStart < 0)
        {
            setScrollUp(false)
        }
      }
    } onWheel={ event => {
   if (event.nativeEvent.wheelDelta > 0) {
     setScrollUp(true)
   } else {
     setScrollUp(false)
   }
 }} className={`${showThinBanner && !rnd ? "mt-8":""} ${rnd ? "px-special" : ""} container pb-1/2em`}>{children}</div>
    {!rnd &&
      <Footer footerMenu={footerMenu} />
    }
  </div>
)
}

export default Layout;
