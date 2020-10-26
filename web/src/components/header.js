import { PageLink } from "../components/link";
import React, { useState, useEffect } from "react";
import Icon from "./icon";
import CircleButton from "./global/circleButton";
import GridRow from "./grid/grid-row";

const Header = ({ mainMenu, onHideNav, onShowNav, showNav, siteTitle, onLoaded, footerMenu }) => {
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);
  const [loaded, setLoaded] = useState(false);
  const menu = mainMenu !== undefined ? mainMenu.edges[0].node.items : null;
  const menuFooter = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;
  // console.log(mainMenu);

  useEffect(() => {
    // setLoaded(true);
    setTimeout(function () {
      setLoaded(true);
    }, 3000);
  }, []);

  return (
    <>
      <header className="fixed z-50 w-full left-0">
        <div
          className={`${
            showNav ? "h-full" : ""
          } flex container pb-0 w-full nav md:bg-transparent md:relative justify-between md:justify-center md:justify-between items-center content-center`}
        >
          <GridRow scroll={false} hide={1} className="flex w-full justify-between md:hidden">
            <h1 style={{ top: ".05em" }} className="md:hidden relative logo">
              <PageLink to="/">
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
                    <PageLink onClick={onHideNav} to="/">
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
