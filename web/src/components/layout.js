import React, { useState, useEffect,useRef } from "react";
import Header from "./header";
import HeaderRnd from "./headerRnd";
import Footer from "./footer";
import GridRow from "./grid/grid-row"

const Layout = ({ mainMenu,infoSection,newsletter,strikeColor,pillColor,infoSectionBelow, rMenu, rnd = false, subMenu, footerMenu, children, onHideNav, onShowNav, showNav,  onHideSubNav, onShowSubNav, showSubNav, siteTitle, isHome, thinBanner, showThinBanner, bannerUrl, bannerUrlTitle }) => {

  const myRef = useRef({
    location: null,
  })
    
 const [isClient, setClient] = useState(false);
 useEffect(() => {
    


    setClient(true)
    if(typeof window != `undefined`){
       
      
     
 
    }
  })
  if ( !isClient ) return null;

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
    />) :
    (<Header
      showThinBanner={showThinBanner}
      thinBanner={thinBanner}
      mainMenu={mainMenu}
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
      pillColor = {pillColor}
      strikeColor = {strikeColor}
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
   <div className={`${showThinBanner && !rnd ? "mt-8 md:mt-16":"mt-8"} hidden md:block container pb-1/2em absolute`} >
   <GridRow />
   </div>
    <div id='page-content-wrapper' className={`${showThinBanner && !rnd ? "mt-8 md:mt-12 md:mt-8":""} ${rnd ? "px-special" : ""} container pb-1 `}>{children}</div>
    {!rnd &&
      <Footer newsletter={newsletter} footerMenu={footerMenu} />
    }
  </div>
)
}

export default Layout;
