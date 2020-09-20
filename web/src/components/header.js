import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className="container nav pb-0">
    <div className="flex w-full fixed bg-white lg:bg-transparent lg:relative justify-center lg:justify-between items-center content-center py-4">
      <button
        className="lg:hidden absolute left-0 px-mobile py-desktop"
        onClick={showNav ? onHideNav : onShowNav}
        role="button"
        aria-label="Open the menu"
      >
        <Icon symbol="hamburger" />
      </button>

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
