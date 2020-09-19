import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className="container pb-0">
    <div className="flex w-full fixed bg-white lg:bg-transparent lg:relative justify-center lg:justify-between items-center content-center py-4">
      <button
        className="lg:hidden absolute left-0 px-mobile py-desktop"
        onClick={showNav ? onHideNav : onShowNav}
      >
        <Icon symbol="hamburger" />
      </button>

      <nav className="hidden lg:block text-nav">
        <ul className="flex">
          <li>
            <h1 className="text-lg">
              <Link to="/">{siteTitle}</Link>
            </h1>
          </li>
          <li>How it Works</li>
          <li>View Homes</li>
          <li>About</li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
