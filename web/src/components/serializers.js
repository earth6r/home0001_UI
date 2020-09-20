import React from "react";
import Figure from "./Figure";
import PopoverModule from "./popover-module";

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    partnerReference: ({ node }) => (
      <PopoverModule trigger={node.partner.name} content={node.partner.bio} />
    ),
    mainImage: Figure,
  },
  marks: {
    partner: ({ mark, children }) => <div>partner</div>,
  },
};

export default serializers;
