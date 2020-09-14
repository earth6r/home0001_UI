import React from "react";
import Figure from "./Figure";

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    artistReference: ({ node }) => <span>{node.artist.name}</span>,
    mainImage: Figure,
  },
};

export default serializers;
