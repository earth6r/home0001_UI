import React from "react";
import { PageLink } from "../link";

export const InternalLink = (props) => {
  const { title, link } = props;
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
    <div className="w-full">
      {title && link && (
        <PageLink
          className="box w-full block text-center pt-3"
          to={`${uri}/${link.content.main.slug.current}`}
        >
          {title}
        </PageLink>
      )}
    </div>
  );
};
