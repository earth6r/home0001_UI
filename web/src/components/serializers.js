import React from "react";
import Figure from "./Figure";
import PopoverModule from "./popover-module";

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    partnerReference: ({ node }) => (
      <React.Fragment>
        {node.partner.name && node.partner.name !== "Earth" ? (
          <PopoverModule
            logo={node.partner._rawLogo}
            text={node.partner.name}
            content={node.partner.bio}
          />
        ) : (
          <span className="earth">E</span>
        )}
      </React.Fragment>
    ),
    mainImage: Figure,
  },
  marks: {
    partner: ({ mark, children }) => <div>partner</div>,
  },
};

export default serializers;
