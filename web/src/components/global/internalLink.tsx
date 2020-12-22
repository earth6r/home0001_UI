import React from "react";
import { trimSlashes } from "../../lib/helpers";
import { PageLink } from "../link";

interface Slug {
  current: string;
}

interface Main {
  slug: Slug;
}

interface Content {
  main: Main;
}

interface Link {
  _type: string;
  content?: Content;
  current?: string;
}

interface InternalLinkProps {
  link: Link;
  title?: string;
  color?: string;
}

interface StyledPageLinkProps {
  color?: string;
  uri: string;
  slug: string;
  title: string;
}

export const StyledPageLink = ({ color, uri, slug, title }: StyledPageLinkProps) => (
  <span className="max-w-4xl block w-full md:pl-1/10">
    <PageLink
      className={`${
        color === "black" ? "bg-black hover:bg-black text-white" : ""
      } box rounded-md w-full block text-center leading-none h-2em  flex items-center justify-center text-mobileBody md:text-desktopBody uppercase`}
      to={`${trimSlashes(uri)}/${slug}`}
    >
      <span className="-mt-1/4em md:mt-0">{title}</span>
    </PageLink>
  </span>
);

export const InternalLink = (props: InternalLinkProps) => {
  const { title, link, color } = props;

  let slug =
    link !== undefined
      ? link.content !== undefined
        ? link.content.main.slug.current
        : link.current
      : null;

  let uri = "";
  if (link !== undefined && title) {
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

    return <StyledPageLink color={color} uri={uri} slug={slug} title={title} />;
  } else {
    return <></>;
  }
};
