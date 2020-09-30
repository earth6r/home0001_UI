import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import GridRow from "./grid/grid-row";

const Header = ({ mainMenu, onHideNav, onShowNav, showNav, siteTitle }) => {
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);
  const menu = mainMenu !== undefined ? mainMenu.edges[0].node.items : null;
  console.log(mainMenu);
  return (
    <>
      <header className="fixed z-50 w-full">
        <div
          className={`${
            showNav ? "h-full" : ""
          } flex container pb-0 w-full nav md:bg-transparent md:relative justify-between md:justify-center md:justify-between items-center content-center`}
        >
          <GridRow scroll={false} className="flex w-full justify-between md:hidden">
            <h1 style={{ marginTop: "0.05em" }} className="pl-1/10 md:hidden logo">
              <Link to="/">
                <span className="earth block text-mobileNav md:text-desktopNav">E</span>
              </Link>
            </h1>
            <button
              style={{ borderColor: "#000000" }}
              className={`${
                showNav ? "border rounded-full" : "box"
              } lg:hidden py-0 outline-none relative w-12 z-50`}
              onClick={showNav ? onHideNav : onShowNav}
              role="button"
              aria-label="Open the menu"
            >
              <div className="px-4 flex   justify-center h-full w-full items-center absolute top-0 left-0">
                <Icon symbol="hamburger" />
              </div>
            </button>
          </GridRow>

          <nav
            className={`${
              showNav ? "block h-full bg-white z-40" : "hidden"
            } fixed left-0 top-0 md:relative w-full md:block text-mobileNav md:text-desktopNav`}
          >
            <div className="mx-mobile md:mx-0">
              <ul
                style={{}}
                className="relative mt-1  leading-none container p-0 m-0 md:flex w-full text-mobileNav md:text-desktopNav justify-between"
              >
                <li className="pt-2 md:pl-1/10">
                  <h1 style={{ marginTop: "0.05em" }} className="logo ">
                    <Link onClick={onHideNav} to="/">
                      <span className="earth">E</span>
                    </Link>
                  </h1>
                </li>

                {menu &&
                  menu.map((item) => (
                    <li key={item._key}>
                      <Link
                        className="pt-1/2em inline-block"
                        onClick={onHideNav}
                        to={`/${item.link.content.main.slug.current}`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
              </ul>
              <GridRow />
            </div>
          </nav>
        </div>
      </header>
      <div className="fixed w-full h-12 md:h-18 z-30 gradient-to-b pointer-events-none top-0 left-0"></div>
    </>
  );
};

export default Header;
