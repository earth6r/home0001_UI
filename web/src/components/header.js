import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import GridRow from "./grid/grid-row";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <header className="fixed z-50 w-full">
    <div
      className={`${
        showNav ? "h-full" : ""
      } flex container pb-0 w-full nav bg-white md:bg-transparent md:relative justify-between md:justify-center md:justify-between items-center content-center`}
    >
      <GridRow className="flex justify-between md:hidden">
        <span className="grid-marker"></span>
        <h1 className="pl-10 md:hidden logo py-2">
          <Link to="/">{siteTitle}</Link>
        </h1>
        <button
          className="lg:hidden px-mobile py-2"
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
        <ul className="container py-1em md:flex w-full justify-between">
          <li>
            <h1 className="logo">
              <Link onClick={onHideNav} to="/">
                {siteTitle}
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
      </nav>
    </div>
  </header>
);

export default Header;
