import React, { useState, useEffect } from "react";
import Header from "./header";
import HeaderRnd from "./headerRnd";
import Footer from "./footer";
import GridRow from "./grid/grid-row"

const Layout = ({ mainMenu,infoSection,newsletter,infoSectionBelow, rMenu, rnd = false, subMenu, footerMenu, children, onHideNav, onShowNav, showNav,  onHideSubNav, onShowSubNav, showSubNav, siteTitle, isHome, thinBanner, showThinBanner, bannerUrl, bannerUrlTitle }) => {


    
 const [isClient, setClient] = useState(false);
 useEffect(() => {
    setClient(true)
    if(typeof window != `undefined`){
      document.addEventListener('scroll', function(){
       if(document.documentElement.scrollHeight - document.documentElement.scrollTop < 940){
          let el =document.getElementsByClassName("intercom-lightweight-app-launcher")[0]
          // el.style.position = "relative"
          if(el){
            el.style.marginBottom = "65px"
          }



          let el2 =document.getElementsByClassName("intercom-launcher-frame")[0]
          // el.style.position = "relative"
          if(el2){
            el2.style.marginBottom = "65px"
          }
           let el3 =document.getElementsByClassName("intercom-messenger-frame")[0]
          // el.style.position = "relative"
          if(el3){
            el3.style.marginBottom = "65px"
          }

           let el4 =document.getElementsByClassName("intercom-launcher-discovery-frame")[0]
          // el.style.position = "relative"
          if(el4){
            el4.style.marginBottom = "65px"
          }

          

       }else{
        
          let el =document.getElementsByClassName("intercom-lightweight-app-launcher")[0]
          // el.style.position = "relative"
          if(el){
            el.style.marginBottom = "0"
          }
           let el2 =document.getElementsByClassName("intercom-launcher-frame")[0]
          // el.style.position = "relative"
          if(el2){
            el2.style.marginBottom = "0"
          }
           let el3 =document.getElementsByClassName("intercom-messenger-frame")[0]
          // el.style.position = "relative"
          if(el3){
            el3.style.marginBottom = "0"
          }
           let el4 =document.getElementsByClassName("intercom-launcher-discovery-frame")[0]
          // el.style.position = "relative"
          if(el4){
            el4.style.marginBottom = "0"
          }

       
       }
    
      });
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
