import React from "react";
import { PageLink } from "../link";

export const InternalLink = (props) => {
  const { title, link } = props;
  let slug =
    link !== udefined && link.content !== undefined ? link.content.main.slug.current : link.current;
  console.log(props);
  let uri = "";
  //   console.log(link);
  //   alert(link._type);
  switch (link._type) {
    case "home":
      uri = "/home";
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
          className="box rounded-lg w-full block text-center leading-none h-2em pt-1/4em flex items-center justify-center text-mobileBody md:text-desktopBody "
          to={`${uri}/${slug}`}
        >
          {title}
        </PageLink>
      )}
    </span>
  );
};
