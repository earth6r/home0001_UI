import { Link } from "gatsby";
import React from "react";

/*

*/

const Footer = ({ footerMenu }) => {
  const query = "";
  const menu = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;
  return (
    <footer className="pb-4em md:pb-desktop container text-sm">
      <nav>
        <ul className="flex flex-wrap md:flex-row relative">
          <li className="mr-1em mb-1em md:mb-0 w-full md:w-auto">
            <small>
              <Link to="/" className="earth">
                E
              </Link>
              , &copy; {new Date().getFullYear()}.
            </small>
          </li>
          <li className="mr-1em">
            <button role="Open newsletter">Newsletter</button>
          </li>
          {menu &&
            menu.map((item) => {
              switch (item._type) {
                case "internalLink":
                  return (
                    <li className="mr-1em" key={item._key}>
                      <Link to={`/${item.link.content.main.slug.current}`}>
                        {item.link.content.main.title}
                      </Link>
                    </li>
                  );
                case "externalLink":
                  return (
                    <li className="mr-1em" key={item._key}>
                      {item.url !== undefined && (
                        <a href={item.url} title={item.title} target="_blank">
                          {item.title}
                        </a>
                      )}
                    </li>
                  );
              }
            })}
          <li className="hidden md:block bottom-0 md:left-3 md:absolute">
            <button role="Open newsletter">TOP</button>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
