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
       
      
      if( document.getElementById("page-content-wrapper") && (document.getElementById("page-content-wrapper").scrollHeight > 100) && (document.getElementById("page-content-wrapper").scrollHeight - window.innerHeight <= 0)){
          
           console.log('hey')
           console.log(document.getElementById("page-content-wrapper").scrollHeight)
          let el =document.getElementsByClassName("intercom-lightweight-app-launcher")

          for (var i = el.length - 1; i >= 0; i--) {
            el[i].style.marginBottom = "65px"
          }

          let el2 =document.getElementsByClassName("intercom-launcher-frame")
          // el.style.position = "relative"
          for (var i = el2.length - 1; i >= 0; i--) {
            el2[i].style.marginBottom = "65px"
          }
           let el3 =document.getElementsByClassName("intercom-messenger-frame")
          // el.style.position = "relative"
         
          for (var i = el3.length - 1; i >= 0; i--) {
            el3[i].style.marginBottom = "65px"
          }

           let el4 =document.getElementsByClassName("intercom-launcher-discovery-frame")
          // el.style.position = "relative"
          for (var i = el4.length - 1; i >= 0; i--) {
            el4[i].style.marginBottom = "65px"
          }

             let el5 =document.getElementById("intercom-frame")
          // el.style.position = "relative"
          if(el5){
            el5.style.marginBottom = "65px"
          }

          

       }else {
        let el =document.getElementsByClassName("intercom-lightweight-app-launcher")

          for (var i = el.length - 1; i >= 0; i--) {
            el[i].style.marginBottom = "0px"
          }

          let el2 =document.getElementsByClassName("intercom-launcher-frame")
          // el.style.position = "relative"
          for (var i = el2.length - 1; i >= 0; i--) {
            el2[i].style.marginBottom = "0px"
          }
           let el3 =document.getElementsByClassName("intercom-messenger-frame")
          // el.style.position = "relative"
         
          for (var i = el3.length - 1; i >= 0; i--) {
            el3[i].style.marginBottom = "0px"
          }

           let el4 =document.getElementsByClassName("intercom-launcher-discovery-frame")
          // el.style.position = "relative"
          for (var i = el4.length - 1; i >= 0; i--) {
            el4[i].style.marginBottom = "0px"
          }

             let el5 =document.getElementById("intercom-frame")
          // el.style.position = "relative"
          if(el5){
            el5.style.marginBottom = "0px"
          }
       }
      document.addEventListener('scroll', function(){
        let footer = document.getElementById('footer')
        if(footer){
          footer = footer.scrollHeight

        }        
       if( (window.innerWidth <= 768 && (document.documentElement.scrollHeight - document.documentElement.scrollTop - 1024) <= footer) || (window.innerWidth > 768 && (document.documentElement.scrollHeight - document.documentElement.scrollTop - 800) <= footer) ){
          

          let el =document.getElementsByClassName("intercom-lightweight-app-launcher")

          for (var i = el.length - 1; i >= 0; i--) {
            el[i].style.marginBottom = "65px"
          }

          let el2 =document.getElementsByClassName("intercom-launcher-frame")
          // el.style.position = "relative"
          for (var i = el2.length - 1; i >= 0; i--) {
            el2[i].style.marginBottom = "65px"
          }
           let el3 =document.getElementsByClassName("intercom-messenger-frame")
          // el.style.position = "relative"
         
          for (var i = el3.length - 1; i >= 0; i--) {
            el3[i].style.marginBottom = "65px"
          }

           let el4 =document.getElementsByClassName("intercom-launcher-discovery-frame")
          // el.style.position = "relative"
          for (var i = el4.length - 1; i >= 0; i--) {
            el4[i].style.marginBottom = "65px"
          }

             let el5 =document.getElementById("intercom-frame")
          // el.style.position = "relative"
          if(el5){
            el5.style.marginBottom = "65px"
          }

          

       }else{
        
          let el =document.getElementsByClassName("intercom-lightweight-app-launcher")

          for (var i = el.length - 1; i >= 0; i--) {
            el[i].style.marginBottom = "0"
          }

          let el2 =document.getElementsByClassName("intercom-launcher-frame")
          // el.style.position = "relative"
          for (var i = el2.length - 1; i >= 0; i--) {
            el2[i].style.marginBottom = "0"
          }
           let el3 =document.getElementsByClassName("intercom-messenger-frame")
          // el.style.position = "relative"
          for (var i = el3.length - 1; i >= 0; i--) {
            el3[i].style.marginBottom = "0"
          }
           let el4 =document.getElementsByClassName("intercom-launcher-discovery-frame")
          // el.style.position = "relative"
          for (var i = el4.length - 1; i >= 0; i--) {
            el4[i].style.marginBottom = "0"
          }
            let el5 =document.getElementById("intercom-frame")
          // el.style.position = "relative"
          if(el5){
            el5.style.marginBottom = "0"
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
