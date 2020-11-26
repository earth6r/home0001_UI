import React from "react";
import Figure from "./Figure";
import PopoverModule from "./popover-module";
import CircleButton from "./global/circleButton";
// import { InternalLink } from "./global/internalLink";
import { PageLink } from "./link";

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    partnerReference: ({ node }) => {
      // console.log(node);
      return (
        <React.Fragment>
          {node.partner.name && node.partner.name !== "Earth" ? (
            <PopoverModule
              logo={node.partner.logo}
              text={node.partner.name}
              content={node.partner.bio}
            />
          ) : (
            <span className="earth">E</span>
          )}
        </React.Fragment>
      );
    },
    mainImage: Figure,
  },
  marks: {
    buttonLink: ({ mark, children }) => {
      // console.log(mark);
      // console.log(children);
      return (
        <button className="box-menu">
          <a href={mark.href}>{children}</a>
        </button>
      );
    },
    circleLink: ({ mark, children }) => {
      console.log(mark);
      console.log(children);
      return (
        <CircleButton title={children} url={mark.href} color={mark.color}></CircleButton>
      );
    },
    partner: ({ mark, children }) => <div>partner</div>,
    internalLink: ({ mark, children }) => {
      // console.log(mark.reference.content.main.slug);
      if (mark) {
        if (mark.reference && mark.reference.content) {
          return (
            <PageLink
              title={mark.reference.content.main.title}
              to={`/${mark.reference.content.main.slug.current}`}
            >
              {children}
            </PageLink>
          );
        } else {
          return <></>;
        }
      } else {
        return <></>;
      }
    },
  },
};

export default serializers;
