import React, { useState, useEffect } from "react";
import { PageLink } from "../components/link";
import EarthLogo from "../components/images/earth-rnd-logo.png";
import EarthLogoMobile from "../components/images/earth-rnd-logo-mobile.png";

// this is the floating header for the R & D site
const HeaderRnd = ({
  mainMenu,
  infoSection = null,
  infoSectionBelow = null,
  newsletter,
  rMenu,
  subMenu,
  onHideNav,
  onShowNav,
  onHideSubNav,
  onShowSubNav,
  showNav,
  showSubNav,
  siteTitle,
  onLoaded,
  footerMenu,
  isHome,
  showThinBanner,
  thinBanner
}) => {
  const [info, setInfo] = useState(false);
  const [currentUri, setCurrentUri] = useState("");

  useEffect(() => {
    let uri = window.location.href.split("http://")[1];
    if (!uri) {
      uri = window.location.href.split("https://")[1];
    }
    setCurrentUri(uri);
  }, []);

  const menu = rMenu !== undefined ? rMenu.edges[0].node.items : null;
  const submenu = subMenu && subMenu.edges[0] !== undefined ? subMenu.edges[0].node.items : null;
  const menuFooter = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;

  return (
    <>
      <header
        className={`r-d-menu r-d-nav-text-desktop block fixed z-50 w-full left-0 top-0 ${
          showNav ? "bg-white" : ""
        }`}
      >
        <nav
          className={`z-40 transition-none rounded-lg md:relative r-d-menu-nav ${
            showNav ? "bg-white" : ""
          }`}
        >
          <div className="flex justify-between items-start relative">
            <div className="r-d-tagline cursor-default">
              <PageLink onClick={onHideNav} to="/">
                <div className="earth-rnd-logo">
                  <img src={EarthLogo} alt="Earth Logo" />
                </div>
                <span className="earth-rnd-logo-mobile">
                  <img src={EarthLogoMobile} alt="Earth Logo" />
                </span>
              </PageLink>
            </div>

            <div className="flex rnd-md-menu">
              {menu &&
                menu.map((item, index) => (
                  <div key={index}>
                    <PageLink
                      key={item._key}
                      className={`${
                        currentUri !== "" &&
                        currentUri.includes(item.link.content.main.slug.current)
                          ? "rnd-current-nav-link " + item.link.content.main.slug.current
                          : " "
                      } md:pt-1/2em inline-block`}
                      onClick={onHideNav}
                      to={`/${item.link.content.main.slug.current}`}
                    >
                      {item.title + (index < menu.length - 1 ? ",\u00A0" : "")}
                    </PageLink>
                  </div>
                ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderRnd;
