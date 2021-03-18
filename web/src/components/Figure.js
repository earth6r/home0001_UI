import React from 'react'
import Img from 'gatsby-image'
import {getFluidGatsbyImage, getFixedGatsbyImage} from 'gatsby-source-sanity'
import clientConfig from '../../client-config'
import imageUrlBuilder from '@sanity/image-url'
// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(clientConfig.sanity)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source)
}

function getFixedWithCrop({ assetId, fixed, crop }) {
  let newFixed = { ...fixed };
  const [, , dimensions] = assetId._id.split('-');
  // Get the original width and height
  const [width, height] = dimensions.split('x');

  // Let's calculate the rect query string to crop the image
  const { left, top, right, bottom } = crop;
  const effectiveWidth = Math.ceil((1 - left - right) * width);
  const effectiveHeight = Math.ceil((1 - top - bottom) * height);

  // rect=x,y,width,height
  // (each is in absolute PX, that's why we refer to width and height)
  const cropQueryStr = `&rect=${Math.floor(left * width)},${Math.floor(
    top * height,
  )},${effectiveWidth},${effectiveHeight}`;

  /*
    cdn.sanity.io/...?w=100&h=94&fit=crop 1x,
    cdn.sanity.io/...?w=150&h=94&fit=crop 1.5x,
    */
  function addToSrcset(srcSet) {
    return (
      srcSet
        .split(',')
        // Map over each individual declaration (divided by ,)
        .map((declaration) => {
          // And get their URLs for further modification
          const [url, multiplier] = declaration.split(' ');
         console.log(url.split('?')[0])

          return `${url.split('?')[0]+"?"}${cropQueryStr} ${multiplier}`;
        })
        // and finally turn this back into a string
        .join(',')
    );
  }
  // Add the rect query string we created to all src declarations

  newFixed.src = fixed.src.split('&fit=crop')[0] + cropQueryStr;
  
  newFixed.srcWebp = fixed.srcWebp + cropQueryStr;
  newFixed.srcSet = addToSrcset(fixed.srcSet);
  newFixed.srcSetWebp = addToSrcset(fixed.srcSetWebp);
  newFixed.height = null



  return newFixed;
}

export const getFixedProps = ({ assetId, crop }, options) => {
   
  let fixed = getFluidGatsbyImage(assetId, {maxWidth: 1024}, clientConfig.sanity);
  // If we have a crop, let's add it to every URL in the fixed object
if(assetId == "image-1603581fb45c036e5ad0501587769b03b1ef9ecc-1485x1707-jpg"){
  console.log("hi", crop)
}
  if (crop && crop.top != `undefined`) {
    
    return getFixedWithCrop({ assetId, fixed, crop });
  }

  
  return fixed;
};


const Figure = ({node}) => {

  if (!node || !node.asset || !node.asset._id) { return null }
  console.log(node.asset._id, node.alt)
  const fluidProps = getFixedProps({assetId: node.asset, crop: node.crop},
    {maxWidth: 2048, fit: 'none', quality: 90}
  )
  console.log(fluidProps)

  return (
    <figure>
      <img src={fluidProps.src} alt={node.alt} srcSet={fluidProps.srcSet} srcWebp={fluidProps.srcWebp} srcSetWebp={fluidProps.srcSetWebp} />

    </figure>
  )
}

export default Figure;
