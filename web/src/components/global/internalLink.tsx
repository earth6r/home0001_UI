import React from "react";
import { PageLink } from "../link";

export const InternalLink = (props) => {
  const { title, link } = props;
  let slug = link.content !== undefined ? link.content.main.slug.current : link.current;
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
    <span className="w-full block">
      {title && link && (
        <PageLink
          className="box  rounded-lg w-full block text-center leading-none h-3em flex items-center justify-center"
          to={`${uri}/${slug}`}
        >
          <span>{title}</span>
        </PageLink>
      )}
    </span>
  );
};
