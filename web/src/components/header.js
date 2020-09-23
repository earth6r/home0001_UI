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
          <GridRow scroll={false} className="flex w-full justify-between md:hidden">
            <h1 className="pl-10 md:hidden logo">
              <Link to="/">
                <span className="earth block pt-1 text-nav">E</span>
              </Link>
            </h1>
            <button
              className="box lg:hidden py-0 relative"
              onClick={showNav ? onHideNav : onShowNav}
              role="button"
              aria-label="Open the menu"
            >
              <div className=" px-4 py-1 -mt-1">
                <Icon symbol="hamburger" />
              </div>
            </button>
          </GridRow>

          <nav
            className={`${
              showNav ? "block h-full bg-white z-50" : "hidden"
            } fixed left-0 top-0 md:relative w-full md:block text-nav`}
          >
            <GridRow className="" scroll={false}>
              <ul className="container md:px-0 md:flex w-full text-nav md:mb-1em justify-between">
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
    </>
  );
};

export default Header;
