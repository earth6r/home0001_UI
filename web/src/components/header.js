import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import GridRow from "./grid/grid-row";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className="container nav pb-0">
    <div className="flex w-full fixed bg-white md:bg-transparent md:relative justify-between md:justify-center md:justify-between items-center content-center">
      <GridRow className="flex justify-between md:hidden">
        <span class="grid-marker"></span>
        <h1 className="md:hidden logo py-6">
          <Link to="/">{siteTitle}</Link>
        </h1>
        <button
          className="lg:hidden px-mobile py-6"
          onClick={showNav ? onHideNav : onShowNav}
          role="button"
          aria-label="Open the menu"
        >
          <div className="box px-4 -mt-1">
            <Icon symbol="hamburger" />
          </div>
        </button>
      </GridRow>
      <nav className="hidden w-full lg:block text-nav">
        <ul className="flex w-full justify-between">
          <li>
            <h1 className="logo">
              <Link to="/">{siteTitle}</Link>
            </h1>
          </li>
          <li>
            <Link to="/how-it-works">How it Works</Link>
          </li>
          <li>
            <Link to="/homes">View Homes</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
