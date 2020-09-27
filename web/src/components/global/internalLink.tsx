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
          className="box  rounded-lg w-full block text-center leading-none py-1/2em pb-1/4em"
          to={`${uri}/${link.content.main.slug.current}`}
        >
          {title}
        </PageLink>
      )}
    </div>
  );
};
