import React from "react";
import { PageLink } from "../link";

export const InternalLink = (props) => {
  const { title, link, color } = props;
  console.log(props);
  let slug =
    link !== undefined
      ? link.content !== undefined
        ? link.content.main.slug.current
        : link.current
      : null;
  // console.log(props);
  let uri = "";
  if (link !== undefined) {
    switch (link._type) {
      case "home":
        uri = "/home";
        //   alert("set home");
        break;
      case "checkout":
        uri = "/checkout";
        //   alert("set home");
        break;
      default:
        uri = "";
        break;
    }
    //   alert(uri);
    return (
      <span className="max-w-4xl block w-full md:pl-1/10">
        {title && link && (
          <PageLink
            className={`${
              color === "black" ? "bg-black hover:bg-black text-white" : ""
            } box rounded-md w-full block text-center leading-none h-2em pt-1/4em flex items-center justify-center text-mobileBody md:text-desktopBody`}
            to={`${uri}/${slug}`}
          >
            <span className=" -mt-1/4em md:mt-0">{title}</span>
          </PageLink>
        )}
      </span>
    );
  } else {
    return <></>;
  }
};
