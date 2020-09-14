import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className="container pb-0">
    <div className="flex w-full fixed bg-white lg:bg-transparent lg:relative justify-center lg:justify-between items-center content-center py-4">
      <h1 className="text-lg">
        <Link to="/">{siteTitle}</Link>
      </h1>

      <button
        className="lg:hidden absolute left-0 px-mobile py-desktop"
        onClick={showNav ? onHideNav : onShowNav}
      >
        <Icon symbol="hamburger" />
      </button>

      <nav className="hidden lg:block text-nav">
        <ul className="flex">
          <li className="md:mx-4">
            <Link to="/artists/">Artists</Link>
          </li>
          <li className="md:mx-4">
            <Link to="/exhibitions/">Exhibitions</Link>
          </li>
          <li className="md:mx-4">
            <Link to="/viewing-room/">Viewing Room</Link>
          </li>
          <li className="md:mx-4">
            <a href="https://davidzwirnerbooks.com/" title="Books">
              Books
            </a>
          </li>
          <li className="md:mx-4">
            <Link to="/fairs/">Fairs</Link>
          </li>
          <li className="md:mx-4">
            <Link to="/galleries/">Galleries</Link>
          </li>
          <li className="md:mx-4">
            <Link to="/podcast/">Podcast</Link>
          </li>
          <li className="md:mx-4">
            <Link to="/search/">Search</Link>
          </li>
          <li className="ml-1">
            <a href="https://www.davidzwirner.com.hk/" title="中文">
              中文
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <nav
      style={{ top: "4rem", height: "calc(100% - 4rem)" }}
      className={`text-nav px-mobile fixed left-0 w-full bg-white ${showNav ? "block" : "hidden"}`}
    >
      <span className="text-sm">Menu</span>
      <ul className="block">
        <li className="md:mx-4">
          <Link to="/artists/">Artists</Link>
        </li>
        <li className="md:mx-4">
          <Link to="/exhibitions/">Exhibitions</Link>
        </li>
        <li className="md:mx-4">
          <Link to="/viewing-room/">Viewing Room</Link>
        </li>
        <li className="md:mx-4">
          <a href="https://davidzwirnerbooks.com/" title="Books">
            Books
          </a>
        </li>
        <li className="md:mx-4">
          <Link to="/fairs/">Fairs</Link>
        </li>
        <li className="md:mx-4">
          <Link to="/galleries/">Galleries</Link>
        </li>
        <li className="md:mx-4">
          <Link to="/podcast/">Podcast</Link>
        </li>
        <li className="md:mx-4">
          <Link to="/search/">Search</Link>
        </li>
        <li className="ml-1">
          <a href="https://www.davidzwirner.com.hk/" title="中文">
            中文
          </a>
        </li>
      </ul>
      <div className="pt-4 border-t mt-desktop">
        <button role="button">Newsletter</button>
      </div>
      <ul className="py-4 border-t border-b my-desktop">
        <li>Twitter</li>
        <li>Facebook</li>
        <li>Instagram</li>
        <li>Weibo</li>
        <li>WeChat</li>
      </ul>
      <small>® Copyright David Zwirner 2020</small>
    </nav>
  </div>
);

export default Header;
