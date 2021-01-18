import { PageLink } from "../components/link";
import React, { useState, useEffect } from "react";
import Icon from "./icon";
import CircleButton from "./global/circleButton";
import GridRow from "./grid/grid-row";
import ReactHtmlParser from "react-html-parser"

const Header = ({ mainMenu, rMenu, subMenu, onHideNav, onShowNav,onHideSubNav, onShowSubNav, showNav,showSubNav, siteTitle, onLoaded, footerMenu, isHome, showThinBanner, thinBanner, bannerUrl, bannerUrlTitle }) => {
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);
  const [loaded, setLoaded] = useState(false);
  const menu = mainMenu !== undefined ? mainMenu.edges[0].node.items : null;
  const submenu = subMenu && subMenu.edges[0] !== undefined ? subMenu.edges[0].node.items : null;
  const menuFooter = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;
 
  let currentUri = ""
  let uri = "";
  if (bannerUrl !== undefined && bannerUrl !== null) {
    switch (bannerUrl._type) {
      case "home":
        uri = "/home";
        //   alert("set home");
        break;
      case "checkout":
        uri = "/checkout";
        break;
      default:
        uri = "";
        break;
    }
  }
  function makeTitle(slug) {
  var words = slug.split('-');

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);

  }

  return words.join(' ');
}
if(typeof window != `undefined`){
   currentUri = window.location.href.split("http://")[1]
   if(!currentUri){
      currentUri = window.location.href.split("https://")[1]
    }
   if(currentUri){
    let stringLength = currentUri.length
     if(currentUri.charAt(stringLength - 1) =="/"){
      currentUri = currentUri.slice(0, -1)
     }
   }
   
   
}
  useEffect(() => {
    // setLoaded(true);
    currentUri = window.location.href.split("http://")[1]
    if(!currentUri){
      currentUri = window.location.href.split("https://")[1]
    }
    
    if(currentUri){
      let stringLength = currentUri.length
       if(currentUri.charAt(stringLength - 1) =="/"){
        currentUri = currentUri.slice(0, -1)
       }
    }
   
    console.log(currentUri)
    setTimeout(function () {
      setLoaded(true);
    }, 3000);
  }, []);

  return (
    <>
    {showThinBanner && thinBanner &&
        <div className="fixed w-full z-50" id="thin-banner"><div className="marquee"><div className="marquee-track"><div className="marquee-content ">{ReactHtmlParser(thinBanner)}
          {bannerUrl &&
            <PageLink
                  to={`${uri}/${bannerUrl.content.main.slug.current}`}
                >
                {bannerUrlTitle}
            </PageLink>
          }
        </div></div></div></div>
    }
      {isHome && submenu && 
      <div id="sub-menu" style={{ zIndex: "31", minWidth: "30vw", width:"calc(100% - 1.5rem)", borderRadius:"22px" }} className={`${showNav ? "hidden":""} ${showSubNav == 1 ? "myanimate":""} ${showSubNav == 2 ? "noanimate":""} sub-menu absolute ${showThinBanner && thinBanner ? "mt-20 md:mt-20 lg:mt-24" : "mt-16 lg:mt-20" } mx-3 lg:mx-5 box-menu px-5 py-2 lg:w-auto`} >
        {submenu &&
          submenu.map((item, index) => (
            <>
            {item.link && isHome == item.link.content.main.slug.current &&
              <div key={index + "first"}>
            <div className="cursor-pointer" onClick={showSubNav == 1 ? onHideSubNav : onShowSubNav}><li className="block">{item.title} <span className="float-right"><svg style={{top:"10px"}} className={`${showSubNav == 1 ? "flip" : ""} relative`} width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M0.969269 0.955238L1.67451 0.25L5.90593 4.48143L5.2007 5.18667L0.969269 0.955238Z" fill="black"/><path d="M5.2007 5.18667L4.49546 4.48143L8.72689 0.25L9.43212 0.955238L5.2007 5.18667Z" fill="black"/></svg></span></li></div>
            </div>
            }
             </>
            ))
         
        }
         
        {submenu &&
          submenu.map((item, index) => (
            <div key={index + "second"} className={`${index==submenu.length-1 ? "":""}`}>
            <li className={`${
            item.link && isHome != item.link.content.main.slug.current ? " h-auto" : "h-0"
        } block overflow-hidden`} key={item._key}>
            
              <PageLink
                className="md:pt-1/2em inline-block overflow-hidden"
                onClick={onHideSubNav}
                to={item.link ? "/home/"+item.link.content.main.slug.current : " "}
              >
                {item.title} 
              </PageLink>

             
              
            </li>
            { !item.link &&
              <li className={`${
          showSubNav == 1 ? " h-auto" : "h-auto"
        } block md:block overflow-hidden opacity-50`}><span className="block md:pt-1/2em pb-1/4em md:pb-1/2em">{item.title}</span></li>
            }
          </div>
     
          ))

        }


      </div>
    }
{submenu && (showSubNav == 1) &&

            <div onClick={onHideSubNav} className="click-area z-30"></div>

        }
      <header className={`${showThinBanner && thinBanner ? "mt-8 md:mt-8" : "" } fixed z-50 w-full left-0`}>
        <div
          className={`${
            showNav ? "h-full" : ""
          } flex container pb-0 w-full nav md:bg-transparent md:relative justify-between md:justify-center md:justify-between items-center content-center`}
        >
          <GridRow scroll={false} hide={1} className="flex w-full justify-between md:hidden">
            <h1 style={{ top: ".05em" }} className="md:hidden relative logo">
              <PageLink to="/">
                <span className="earth-svg block text-mobileNav md:text-base">
<svg viewBox="0 0 45 11" fill="none">
<path d="M0 0H7.4747V1.25196H1.52952V4.65937H7.2752V5.91134H1.52952V9.68014H7.621V10.9321H0V0Z" fill="black"/>
<path d="M12.4756 0H14.4574L18.7799 10.9321H17.1174L15.8672 7.67957H11.0259L9.78899 10.9321H8.12646L12.4756 0ZM15.415 6.45342L13.4465 1.29068L11.4914 6.45342H15.415Z" fill="black"/>
<path d="M19.897 0H24.5653C26.9993 0 28.3027 1.07127 28.3027 2.86532C28.3027 4.67228 27.0658 5.33053 26.454 5.43378C27.4648 5.61448 28.2362 6.15657 28.2362 7.52469V9.21549C28.2362 9.77048 28.316 10.3255 28.9012 10.9321H27.1589C26.7333 10.4416 26.6801 9.89955 26.6801 9.40909V7.76992C26.6801 6.47924 25.9486 6.15657 24.7116 6.15657H21.4132V10.9192H19.897V0ZM24.6185 4.9046C26.5338 4.9046 26.7599 3.5881 26.7599 2.95567C26.7599 1.94893 26.0949 1.25196 24.5121 1.25196H21.4132V4.9046H24.6185Z" fill="black"/>
<path d="M32.8912 1.25196H29.3135V0H38.0251V1.25196H34.434V10.9321H32.8912V1.25196Z" fill="black"/>
<path d="M44.8217 10.9321H43.2523V5.89843H37.2539V4.64646H43.2523V0H44.8217V10.9321Z" fill="black"/></svg>
                </span>
              </PageLink>
            </h1>
            <button
              style={{ borderColor: "#000000" }}
              className={`${
                showNav ? "border rounded-full" : "box"
              } lg:hidden py-0 outline-none relative -mt-1 w-12 z-50 py-3`}
              onClick={showNav ? onHideNav : onShowNav}
              role="button"
              aria-label="Open the menu"
            >
              <div
                style={{ marginTop: ".5px" }}
                className="px-4 flex justify-center h-full w-full items-center absolute top-0 left-0"
              >
                <Icon symbol="hamburger" />
              </div>
            </button>
          </GridRow>

          <nav
            className={`${showThinBanner && thinBanner ? "mt-special-nav md:mt-0" : "" } ${
              showNav
                ? "block z-40 bg-white box md:shadow-none transition-none rounded-lg"
                : "hidden"
            } fixed left-0 top-0 md:relative w-full md:block text-mobileNav md:text-base`}
          >
            <div className="mx-mobile md:mx-0">
              <ul
                style={{}}
                className="flex pt-2em md:pt-0 flex-wrap relative mt-1 leading-none container p-0 m-0 md:flex md:flex-no-wrap w-full text-mobileNav md:text-base justify-center md:justify-between"
              >
                <li className="absolute md:relative left-0 top-0 pt-2">
                  <h1 className="logo ">
                    <PageLink className={`${currentUri && currentUri.includes('/')  ? "": "current-nav-link"}`} onClick={onHideNav} to="/">
                      <span className="earth-svg">
<svg viewBox="0 0 45 11" fill="none">
<path d="M0 0H7.4747V1.25196H1.52952V4.65937H7.2752V5.91134H1.52952V9.68014H7.621V10.9321H0V0Z" fill="black"/>
<path d="M12.4756 0H14.4574L18.7799 10.9321H17.1174L15.8672 7.67957H11.0259L9.78899 10.9321H8.12646L12.4756 0ZM15.415 6.45342L13.4465 1.29068L11.4914 6.45342H15.415Z" fill="black"/>
<path d="M19.897 0H24.5653C26.9993 0 28.3027 1.07127 28.3027 2.86532C28.3027 4.67228 27.0658 5.33053 26.454 5.43378C27.4648 5.61448 28.2362 6.15657 28.2362 7.52469V9.21549C28.2362 9.77048 28.316 10.3255 28.9012 10.9321H27.1589C26.7333 10.4416 26.6801 9.89955 26.6801 9.40909V7.76992C26.6801 6.47924 25.9486 6.15657 24.7116 6.15657H21.4132V10.9192H19.897V0ZM24.6185 4.9046C26.5338 4.9046 26.7599 3.5881 26.7599 2.95567C26.7599 1.94893 26.0949 1.25196 24.5121 1.25196H21.4132V4.9046H24.6185Z" fill="black"/>
<path d="M32.8912 1.25196H29.3135V0H38.0251V1.25196H34.434V10.9321H32.8912V1.25196Z" fill="black"/>
<path d="M44.8217 10.9321H43.2523V5.89843H37.2539V4.64646H43.2523V0H44.8217V10.9321Z" fill="black"/>
</svg>
                      </span>
                    </PageLink>
                  </h1>
                </li>
                <li className="absolute left-0 top-0 pointer-events-none w-full md:hidden">
                  <GridRow hide={1} />
                </li>
                {menu &&
                  menu.map((item, index) => (
                    <li onClick={onHideNav} className="md:hidden mt-1em mb-1/2em mx-auto" key={item._key}>
                      <CircleButton title={item.title} url={item.link} float={true} />
                    </li>
                  ))}

                {menu &&
                  menu.map((item, index) => (
                    <li className="hidden md:block" key={item._key}>
                      <PageLink
                        className={`${currentUri && currentUri.includes(item.link.content.main.slug.current) || (currentUri && currentUri.includes('home') && item.link.content.main.slug.current.includes("home")) ? "current-nav-link "+item.link.content.main.slug.current : " "} md:pt-1/2em inline-block`} 
                        onClick={onHideNav}
                        to={`/${item.link.content.main.slug.current}`}
                      >
                        {item.title}
                      </PageLink>
                    </li>
                  ))}
              </ul>
              
            </div>
          </nav>
        </div>
      </header>
      <div
        style={{ zIndex: "45" }}
        onClick={showNav ? onHideNav : onShowNav}
        className={`${
          showNav ? " h-full bg-black opacity-75 pointer-events-auto" : "opacity-0"
        } fixed transition-opacity duration-150 left-0 top-0  pointer-events-none w-full`}
      ></div>
      <div className={`${showThinBanner && thinBanner ? "mt-6 md:mt-8" : "" } fixed w-full h-12 md:h-18 z-30 gradient-to-b3 pointer-events-none top-0 left-0`}></div>
    </>
  );
};

export default Header;
