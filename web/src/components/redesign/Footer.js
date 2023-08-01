import { Link } from "gatsby";
import React, { useContext } from "react";
import { HomesContext } from "../context/HomesContext";

const Footer = ({ footerMenu }) => {
  const { selectedCity } = useContext(HomesContext);

  if (!selectedCity.id) {
    return null;
  }

  const menu = footerMenu !== undefined ? footerMenu.edges[0].node.items : null;

  return (
    <div className="animate-in px-4 md:px-10 mt-10">
      <nav>
        <ul className="flex flex-col gap-10">
          {menu &&
            menu.map(item => {
              switch (item._type) {
                case "internalLink":
                  if (item.link) {
                    return (
                      <li
                        className="text-start text-mobile-body md:text-desktop-body uppercase leading-none"
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
                        className="text-start text-mobile-body md:text-desktop-body uppercase leading-none"
                        key={item._key}
                      >
                        <span>{item.title}</span>
                      </li>
                    );
                  }

                case "externalLink":
                  return (
                    <li
                      className="text-start text-mobile-body md:text-desktop-body uppercase leading-none"
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
      <p className="text-mobile-body md:text-desktop-body my-20">@2023 EARTH</p>
    </div>
  );
};

export default Footer;
