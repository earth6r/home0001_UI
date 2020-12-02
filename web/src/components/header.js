import { PageLink } from "../components/link";
import React, { useState, useEffect } from "react";
import Icon from "./icon";
import CircleButton from "./global/circleButton";
import GridRow from "./grid/grid-row";
import ReactHtmlParser from "react-html-parser"

const Header = ({ mainMenu, rMenu, subMenu, onHideNav, onShowNav,onHideSubNav, onShowSubNav, showNav,showSubNav, siteTitle, onLoaded, footerMenu, isHome, showThinBanner, thinBanner }) => {
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);
  const [loaded, setLoaded] = useState(false);
  const menu = mainMenu !== undefined ? mainMenu.edges[0].node.items : null;
  const submenu = subMenu && subMenu.edges[0] !== undefined ? subMenu.edges[0].node.items : null;
  const menuFooter = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;
  // console.log(mainMenu);
  function makeTitle(slug) {
  var words = slug.split('-');

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
}

  useEffect(() => {
    // setLoaded(true);
    setTimeout(function () {
      setLoaded(true);
    }, 3000);
  }, []);
  console.log(showThinBanner)
  return (
    <>
    {showThinBanner && thinBanner &&
        <div className="fixed w-full z-50 bg-black text-white" id="thin-banner"><div className="marquee"><div className="marquee-track"><div className="marquee-content text-white">{ReactHtmlParser(thinBanner)}&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;{ReactHtmlParser(thinBanner)}&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;{ReactHtmlParser(thinBanner)}&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;{ReactHtmlParser(thinBanner)}&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;{ReactHtmlParser(thinBanner)}&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;{ReactHtmlParser(thinBanner)}&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;{ReactHtmlParser(thinBanner)}&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;{ReactHtmlParser(thinBanner)}&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;{ReactHtmlParser(thinBanner)}&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;{ReactHtmlParser(thinBanner)}</div></div></div></div>
    }
      {isHome && submenu && 
      <div style={{ zIndex: "51", minWidth: "30vw", width:"calc(100% - 1.5rem)", borderRadius:"22px" }} className={`${showNav ? "hidden":""} sub-menu absolute mt-10 lg:mt-16 mx-3 lg:mx-5 box-menu px-5 py-2 top-0 right-0 lg:w-auto`} >
        {submenu &&
          submenu.map((item, index) => (
            <div key={index + "first"}>
            {item.link && isHome == item.link.content.main.slug.current &&
            <div className="cursor-pointer" onClick={showSubNav ? onHideSubNav : onShowSubNav}><li className="block">{item.title} <span className="float-right"><svg style={{top:"10px"}} className={`${showSubNav ? "flip" : ""} relative`} width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M0.969269 0.955238L1.67451 0.25L5.90593 4.48143L5.2007 5.18667L0.969269 0.955238Z" fill="black"/><path d="M5.2007 5.18667L4.49546 4.48143L8.72689 0.25L9.43212 0.955238L5.2007 5.18667Z" fill="black"/></svg></span></li></div>
            }
             </div>
            ))
         
        }
         
        {submenu &&
          submenu.map((item, index) => (
            <div key={index + "second"} className={`${index==submenu.length-1 ? "":""}`}>
            <li className={`${
          showSubNav && item.link && isHome != item.link.content.main.slug.current ? " h-auto" : "h-0"
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
          showSubNav ? " h-auto" : "h-0"
        } hidden md:block overflow-hidden opacity-50`}>{item.title}</li>
            }
          </div>
     
          ))}
      </div>
    }
      <header className={`${showThinBanner && thinBanner ? "mt-5" : "" } fixed z-50 w-full left-0`}>
        <div
          className={`${
            showNav ? "h-full" : ""
          } flex container pb-0 w-full nav md:bg-transparent md:relative justify-between md:justify-center md:justify-between items-center content-center`}
        >
          <GridRow scroll={false} hide={1} className="flex w-full justify-between md:hidden">
            <h1 style={{ top: ".05em" }} className="md:hidden relative logo">
              <PageLink to="/collective">
                <span className="earth block text-mobileNav md:text-desktopNav">E</span>
              </PageLink>
            </h1>
            <button
              style={{ borderColor: "#000000" }}
              className={`${
                showNav ? "border rounded-full" : "box"
              } lg:hidden py-0 outline-none relative -mt-1 w-12 z-50`}
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
            className={`${
              showNav
                ? "block z-40 bg-white box md:shadow-none transition-none rounded-lg"
                : "hidden"
            } fixed left-0 top-0 md:relative w-full md:block text-mobileNav md:text-desktopNav`}
          >
            <div className="mx-mobile md:mx-0">
              <ul
                style={{}}
                className="flex pt-2em md:pt-0 flex-wrap relative mt-1 leading-none container p-0 m-0 md:flex md:flex-no-wrap w-full text-mobileNav md:text-desktopNav justify-center md:justify-between"
              >
                <li className="absolute md:relative left-0 top-0 pt-2">
                  <h1 className="logo ">
                    <PageLink onClick={onHideNav} to="/collective">
                      <span className="earth">E</span>
                    </PageLink>
                  </h1>
                </li>
                <li className="absolute left-0 top-0 pointer-events-none w-full md:hidden">
                  <GridRow hide={1} />
                </li>
                {menu &&
                  menu.map((item, index) => (
                    <li className="md:hidden mt-1em mb-1/2em mx-auto" key={item._key}>
                      <CircleButton title={item.title} url={item.link} float={true} />
                    </li>
                  ))}

                {menu &&
                  menu.map((item, index) => (
                    <li className="hidden md:block" key={item._key}>
                      <PageLink
                        className="md:pt-1/2em inline-block"
                        onClick={onHideNav}
                        to={`/${item.link.content.main.slug.current}`}
                      >
                        {item.title}
                      </PageLink>
                    </li>
                  ))}
              </ul>
              <GridRow />
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
      <div className="fixed w-full h-12 md:h-18 z-30 gradient-to-b pointer-events-none top-0 left-0"></div>
    </>
  );
};

export default Header;
