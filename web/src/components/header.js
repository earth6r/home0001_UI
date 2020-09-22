import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import GridRow from "./grid/grid-row";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => {
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);

  return (
    <>
      <header className="fixed z-50 w-full">
        <div
          className={`${
            showNav ? "h-full" : ""
          } flex container pb-0 w-full nav md:bg-transparent md:relative justify-between md:justify-center md:justify-between items-center content-center`}
        >
          <GridRow scroll={false} className="flex justify-between md:hidden">
            <h1 className="pl-10 md:hidden logo">
              <Link to="/">
                <span className="earth block pt-1/2">E</span>
              </Link>
            </h1>
            <button
              className="lg:hidden px-mobile py-0 relative"
              onClick={showNav ? onHideNav : onShowNav}
              role="button"
              aria-label="Open the menu"
            >
              <div className="box px-4 py-1 -mt-1">
                <Icon symbol="hamburger" />
              </div>
            </button>
          </GridRow>
          <nav
            className={`${
              showNav ? "block h-full bg-white z-50" : "hidden"
            } fixed left-0 top-0 md:relative w-full md:block text-nav`}
          >
            <GridRow scroll={false}>
              <ul className="container md:px-0 md:flex w-full md:mb-1em justify-between">
                <li>
                  <h1 className="logo">
                    <Link onClick={onHideNav} to="/">
                      <span className="earth">E</span>
                    </Link>
                  </h1>
                </li>

                <li>
                  <Link onClick={onHideNav} to="/how-it-works">
                    How it Works
                  </Link>
                </li>

                <li>
                  <Link onClick={onHideNav} to="/homes">
                    View Homes
                  </Link>
                </li>

                <li>
                  <Link onClick={onHideNav} to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </GridRow>
          </nav>
        </div>
      </header>
      <div className="fixed w-full h-5em z-10 from-white bg-gradient-to-b top-0 left-0"></div>
    </>
  );
};

export default Header;
