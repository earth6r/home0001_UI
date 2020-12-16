import React from "react";
import { trimSlashes } from "../../lib/helpers";
import { PageLink } from "../link";

export const InternalLink = (props) => {
  const { title, link, color } = props;
  let slug =
    link !== undefined
      ? link.content !== undefined
        ? link.content.main.slug.current
        : link.current
      : null;

  let uri = "";
  if (link !== undefined) {
    switch (link._type) {
      case "home":
        uri = "/home";
        break;
      case "checkout":
        uri = "/checkout";
        break;
      default:
        uri = "/";
        break;
    }

    return (
      <span className="max-w-4xl block w-full md:pl-1/10">
        {title && link && (
          <PageLink
            className={`${
              color === "black" ? "bg-black hover:bg-black text-white" : ""
            } box rounded-md w-full block text-center leading-none h-2em  flex items-center justify-center text-mobileBody md:text-desktopBody`}
            to={`${trimSlashes(uri)}/${slug}`}
          >
            <span className="-mt-1/4em md:mt-0">{title}</span>
          </PageLink>
        )}
      </span>
    );
  } else {
    return <></>;
  }
};
