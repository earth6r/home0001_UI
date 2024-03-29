import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";
import clientConfig from "../../client-config";
import imageUrlBuilder from "@sanity/image-url";
// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(clientConfig.sanity);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source);
}

function getFixedWithCrop({ assetId, fixed, crop }) {
  let newFixed = { ...fixed };
  const [, , dimensions] = assetId._id.split("-");
  // Get the original width and height
  const [width, height] = dimensions.split("x");

  // Let's calculate the rect query string to crop the image
  const { left, top, right, bottom } = crop;
  const effectiveWidth = Math.ceil((1 - left - right) * width);
  const effectiveHeight = Math.ceil((1 - top - bottom) * height);

  // rect=x,y,width,height
  // (each is in absolute PX, that's why we refer to width and height)
  const cropQueryStr = `?&rect=${Math.floor(left * width)},${Math.floor(
    top * height
  )},${effectiveWidth},${effectiveHeight}`;

  /*
    cdn.sanity.io/...?w=100&h=94&fit=crop 1x,
    cdn.sanity.io/...?w=150&h=94&fit=crop 1.5x,
    */
  function addToSrcset(srcSet) {
    return (
      srcSet
        .split(",")
        // Map over each individual declaration (divided by ,)
        .map(declaration => {
          // And get their URLs for further modification
          const [url, multiplier] = declaration.split(" ");
          return `${url.split("?")[0] + "?"}${cropQueryStr} ${multiplier}`;
        })
        // and finally turn this back into a string
        .join(",")
    );
  }
  // Add the rect query string we created to all src declarations

  newFixed.src = fixed.src.split("&fit=crop")[0] + cropQueryStr;

  newFixed.srcWebp = fixed.srcWebp + cropQueryStr;
  newFixed.srcSet = addToSrcset(fixed.srcSet);
  newFixed.srcSetWebp = addToSrcset(fixed.srcSetWebp);
  newFixed.height = null;

  return newFixed;
}

export const getFixedProps = (node, options) => {
  const gatsbyImageData = getGatsbyImageData(node, options, clientConfig.sanity);

  return gatsbyImageData;
};

const Figure = ({ node }) => {
  if (!node || !node.asset || !node.asset._id) {
    return null;
  }

  const gatsbyImageData = getFixedProps(node, { maxWidth: 700, fit: "none", quality: 70 });

  return (
    <figure>
      <GatsbyImage loading="eager" image={gatsbyImageData} alt={node.alt} />
    </figure>
  );
};

export default Figure;
