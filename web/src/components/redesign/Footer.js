import { Link } from "gatsby";
import React from "react";

const Footer = ({ footerMenu }) => {
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
                    let title = item.link.content?.main?.title;
                    let slug = item.link.content?.main?.slug?.current;

                    if (!title) {
                      title = item.link.title;
                    }

                    if (!slug) {
                      slug = {
                        About: "this-is-not-an-exit/about",
                        Contact: "this-is-not-an-exit/contact",
                        FAQ: "this-is-not-an-exit/faq",
                        Home: "this-is-not-an-exit",
                        "How It Works": "this-is-not-an-exit/how-it-works",
                        Legal: "this-is-not-an-exit/legal",
                        Newsletter: "this-is-not-an-exit/newsletter"
                      }[title];
                    }

                    return (
                      <li
                        className="text-start text-mobile-body md:text-desktop-body uppercase tracking-caps leading-none"
                        key={item._key}
                      >
                        <Link to={`/${slug}`}>{title}</Link>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="text-start text-mobile-body md:text-desktop-body uppercase tracking-caps leading-none"
                        key={item._key}
                      >
                        <span>{item.title}</span>
                      </li>
                    );
                  }

                case "externalLink":
                  return (
                    <li
                      className="text-start text-mobile-body md:text-desktop-body uppercase tracking-caps leading-none"
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
      <p className="text-mobile-body md:text-desktop-body my-20">&copy; 2023 EARTH</p>
    </div>
  );
};

export default Footer;
