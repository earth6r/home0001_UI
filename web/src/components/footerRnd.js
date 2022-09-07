import { Link } from "gatsby";
import React from "react";
import GridRow from "./grid/grid-row";

const FooterRnd = ({ footerMenu, blackFooter }) => {
  const menu = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;
  return (
    <footer
      id="footer"
      className={`rnd-footer ${
        blackFooter ? "black-footer text-white" : ""
      } pt-5 md:pt-8 pb-1em md:pb-desktop container flex flex-col uppercase left-0 md:block`}
    >
      <nav className="display-block w-full relative">
        <ul className="flex text-left relative font-normal" style={{ color: "black" }}>
          {menu &&
            menu.map(item => {
              switch (item._type) {
                case "internalLink":
                  if (item.link) {
                    return (
                      <li
                        className="text-left mb-1em md:mb-0 display-block md:mr-1em"
                        key={item._key}
                      >
                        {item.link && (
                          <Link to={`/${item.link.content.main.slug.current}`}>
                            {item.link.content.main.title}
                          </Link>
                        )}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="text-left mb-1em md:mb-0 display-block md:mr-1em"
                        key={item._key}
                      >
                        <span>{item.title}</span>
                      </li>
                    );
                  }

                case "externalLink":
                  return (
                    <li
                      className="text-left mb-1em md:mb-0 display-block md:mr-1em"
                      key={item._key}
                    >
                      {item.url !== undefined && (
                        <a href={item.url} title={item.title} target="_blank">
                          {item.title == "Instagram" ? (
                            <>
                              <span className="hidden md:inline-block">{item.title}</span>
                              <div className="md:hidden w-full pl-1">IG</div>
                            </>
                          ) : (
                            <>{item.title}</>
                          )}
                        </a>
                      )}
                    </li>
                  );
              }
            })}
        </ul>
      </nav>
    </footer>
  );
};

export default FooterRnd;
